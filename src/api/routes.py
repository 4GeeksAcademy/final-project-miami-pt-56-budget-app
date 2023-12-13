"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_bcrypt import Bcrypt
from api.models import db, User, Group, PiggyBank, Expenses
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

import plaid
from plaid.api import plaid_api
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from plaid.model.transactions_sync_request import TransactionsSyncRequest
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
import os
import json
import time
from dotenv import load_dotenv

load_dotenv()

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, origins='*')

#Bcrypt to hash passwords stored in DB
bcrypt = Bcrypt()

#Plaid config
def empty_to_none(field):
    value = os.getenv(field)
    if value is None or len(value) == 0:
        return None
    return value

host = plaid.Environment.Sandbox

PLAID_CLIENT_ID = os.getenv('PLAID_CLIENT_ID')
PLAID_SECRET = os.getenv('PLAID_SECRET')
PLAID_PRODUCTS = os.getenv('PLAID_PRODUCTS', 'transactions').split(',')
PLAID_COUNTRY_CODES = os.getenv('PLAID_COUNTRY_CODES', 'US').split(',')
PLAID_ENV = os.getenv('PLAID_ENV', 'sandbox')
PLAID_REDIRECT_URI = empty_to_none('PLAID_REDIRECT_URI')

# print(PLAID_PRODUCTS, PLAID_COUNTRY_CODES)

configuration = plaid.Configuration(
    host=host,
    api_key={
        'clientId': PLAID_CLIENT_ID,
        'secret': PLAID_SECRET,
        'plaidVersion': '2020-09-14'
    }
)

api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)

products = []
for product in PLAID_PRODUCTS:
    products.append(Products(product))


# Routes

# Get a list of all users
# For Development use only, delete later
@api.route('/users', methods = ['GET'])
def handle_hello():
    users=User.query.all()
    serialized_users = []
    for user in users:
        friends_list = []
        group_list = []
        for x in user.friends:
            friends_list.append(x.serialize())
        for x in user.groups:
            group_list.append(x.serialize())
        user = user.serialize()
        user["friends"] = friends_list
        user["groups"] = group_list
        serialized_users.append(user)
    response_body = {
        "message": "These are all of the users",
        "users": serialized_users
    }
    return jsonify(response_body), 200

#Route for signing up for BetterBudget
@api.route('/signup', methods = ['POST'])
def handle_signup():
    print(request.json)
    email = request.json.get('email', None)
    first_name = request.json.get('first_name', None)
    last_name = request.json.get('last_name', None)

    #hashing password being passed by user
    password = request.json.get('password', None)
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email = email, password = hashed_password, first_name = first_name, last_name = last_name)
    if User.query.filter_by(email = email).first() == None:
        db.session.add(new_user)
        db.session.commit()
        return jsonify('Added User'), 200
    else:
        return jsonify('That email is already in use'), 412    

#Route to signin to BetterBudget account 
@api.route('/signin', methods = ['POST'])
def handle_signin():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # user = User.query.filter_by(email = email, password=password).first()
    # checking for hashed password match
    user = User.query.filter_by(email = email).first()
    if  user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        expenses = user.expenses
        serialized_expenses=[]
        for expense in expenses:
            serialized_expenses.append(expense.serialize())
        user_serialized = user.serialize()
        groups = user.groups
        serialized_groups=[]
        for group in groups:
            serialized_groups.append(group.serialize())
        user_serialized = user.serialize()
        user_serialized["expenses"]=serialized_expenses
        user_serialized["groups"]=serialized_groups
        return jsonify({"token": access_token, "name": user.first_name, "user":user_serialized}), 200
    elif user is None:
        return jsonify({"msg" : "Bad username or password"}), 401
    elif email is None or password is None:
        return jsonify({"msg" : "Email and Password required"}), 400


#Route for user to change password
@api.route('/user/<int:user_id>', methods = ['POST'])
@jwt_required()
def handle_account(user_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if current_user_id == user.id:
        new_password = request.json.get('newPassword', None)
        user.password = new_password
        db.session.commit()
        return jsonify('New password'), 200
    else:
        return jsonify('Error'), 401
    
@api.route('/get-user', methods = ['GET'])
@jwt_required()
def fetch_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    expenses = user.expenses
    serialized_expenses=[]
    for expense in expenses:
        serialized_expenses.append(expense.serialize())
    user_serialized = user.serialize()
    groups = user.groups
    serialized_groups=[]
    for group in groups:
        serialized_groups.append(group.serialize())
    user_serialized = user.serialize()
    user_serialized["expenses"]=serialized_expenses
    user_serialized["groups"]=serialized_groups
    return jsonify({user:user_serialized})

#Route for user home page, gets all user information  
@api.route('/home', methods = ['GET'])
@jwt_required()
def handle_home():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        friends_list = []
        group_list = []
        for x in user.friends:
            friends_list.append(x.serialize())
        for group in user.groups:
            expense_list = []
            for expense in group.expenses:
                expense_list.append(expense.serialize())
            group = group.serialize()
            group["expenses"] = expense_list
            group_list.append(group)
        user = user.serialize()
        user['groups'] = group_list
        user["friends"] = friends_list
        serialized_user = []
        serialized_user.append(user)
        response_body = {
            "message": "Here is the user information!",
            "user": serialized_user
        }
        return jsonify(response_body), 200
    else:
        return jsonify({'msg': 'You must be logged in'}), 401

# #Route to get user friends
@api.route('/friends', methods = ['GET'])
@jwt_required()
def handle_get_friends():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is not None:
        friend_list = []
        for x in user.friends:
            friend_list.append(x.serialize())
        response_body = {
            "message": "Here is the friend information!",
            "user": friend_list
        }
        return jsonify(response_body), 200
    else:
        return jsonify({'msg': 'You must be logged in'}), 401


#Route to add or delete user friends  
@api.route('/friends', methods = ['POST','DELETE'])
@jwt_required()
def manage_friends():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id = current_user_id).first()
    print(user.friends)
    data = request.get_json()
    friend_email = data.get('friendEmail')
    friend = User.query.filter_by(email=friend_email).first()
    print(friend.friends)
    if user and friend:
        if request.method == 'POST':
            if user.friends is None:
                user.friends = []
            if friend.friends is None:
                friend.friends = []
            if friend in user.friends or user in friend.friends:
                message = 'This user is already a friend'
                return jsonify({'message' : message}), 409
            friend.friends.append(user)
            user.friends.append(friend)
            db.session.commit()
            user = User.query.filter_by(id = current_user_id).first()
            serialized_friends = [] 
            for x in user.friends: 
                serialized_friends.append(x.serialize())
            user = user.serialize()
            user["friends"] = serialized_friends
            message = "Friend sucessfully added"
            return jsonify({'message': message, "user":user}), 200
        elif request.method == 'DELETE':
            if friend in user.friends and user in friend.friends:
                user.friends.remove(friend)
                friend.friends.remove(user)
                db.session.commit()
                user = User.query.filter_by(id = current_user_id).first()
                serialized_friends = [] 
                for x in user.friends: 
                    serialized_friends.append(x.serialize())
                user = user.serialize()
                user["friends"] = serialized_friends
                message = 'Friend removed successfully'
                return jsonify({'message': message, "user":user}), 200
            else:
                return jsonify({'error': 'Friendship not found'}), 404
        else:
            return jsonify({'error': 'Invalid action'}), 400
    else:
        return jsonify({'error': 'User or friend not found'}), 404

#Route to get group information 
# @api.route('/groups', methods = ['GET'])
# @jwt_required()
# def handle_get_groups():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)
#     if user is not None:
#         group_list = []
#         for x in user.groups:
#             print(x.members)
#             group_list.append(x.serialize())
#         response_body = {
#             "message": "Here is the group information!",
#             "group list": group_list
#         }
#         return jsonify(response_body), 200
#     else:
#         return jsonify({'msg': 'You must be logged in'}), 401

#Route to create new group, adds creating user to group
@api.route('/groups', methods = ['POST'])
@jwt_required()
def handle_add_groups():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is not None:
        member_list = []
        member_list.append(user)
        name = request.json.get('name', None)
        new_group = Group(name = name, members = member_list)
        db.session.add(new_group)
        db.session.commit()
        groups = Group.query.all()
        groups_serialized = []
        for x in groups:
            if user in x.members:
                groups_serialized.append(x.serialize())
        payload = {"msg": "added group", "groups": groups_serialized}
        return jsonify(payload), 200
    else:
        return jsonify({'msg': 'You must be logged in'}), 401

#Route to add or remove members from existing group    
@api.route('/groups/<int:group_id>', methods = ['PUT'])
@jwt_required()
def handle_add_group_member(group_id):
    new_member = User.query.get(request.json.get('newMember'))
    member_to_delete = User.query.get(request.json.get('oldMember'))
    group = Group.query.get(group_id)

    if member_to_delete and group.members:
        group.members.remove(member_to_delete)
        db.session.commit()
        return jsonify('Deleted Member'), 200

    if new_member and group:
        if group.members is None:
            group.members = []
        group.members.append(new_member)
        db.session.commit()
        return jsonify('Added Member'), 200
    else:
        return jsonify({'msg': 'You must be logged in'}), 401

#Route to delete a group
@api.route('/groups/<int:group_id>', methods = ['DELETE'])
@jwt_required()
def handle_delete_groups(group_id):
    group_to_delete = Group.query.filter_by(id = group_id).first()
    if group_to_delete:
        group_to_delete.members = []
        db.session.commit()
        group_to_delete.expenses = []
        db.session.commit()
        db.session.delete(group_to_delete)
        db.session.commit()

        return jsonify("group deleted"), 200
    
#Route to get just piggybank
@api.route('/piggybank', methods = ['GET'])
@jwt_required()
def handle_piggys():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        piggys = []
        for x in user.piggybanks:
            piggys.append(x.serialize())
        return jsonify(piggys), 200

#Route to create piggybank
@api.route('/piggybank', methods = ['POST'])
@jwt_required()
def add_piggys():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        name = request.json.get('name', None)
        goal = request.json.get('goal', None)
        saved = request.json.get('saved', None)
        date = request.json.get('date', None)
        notes = request.json.get('notes', None)
        new_piggy = PiggyBank(name = name, goal = goal, saved = saved, target_date = date, notes = notes, user_id = current_user_id)
        db.session.add(new_piggy)
        db.session.commit()
        return jsonify('Added PiggyBank'), 200
    else:
        return jsonify({'msg': 'You must be logged in'}), 401

#Route to delete piggybank
@api.route('/piggybank/<int:piggy_id>', methods = ['DELETE'])
@jwt_required()
def handle_delete_piggy(piggy_id):
    piggy_to_delete = PiggyBank.query.filter_by(id = piggy_id).first()
    if piggy_to_delete:
        db.session.delete(piggy_to_delete)
        db.session.commit()

        return jsonify("Piggy deleted"), 200

#Route to modify piggybank
#Only changes one element at a time
@api.route('/piggybank/<int:piggy_id>', methods = ['PUT'])
@jwt_required()
def handle_change_piggy(piggy_id):
    piggy = PiggyBank.query.get(piggy_id)
    name = request.json.get('name', None)
    goal = request.json.get('goal', None)
    saved = request.json.get('saved', None)
    date = request.json.get('date', None)
    notes = request.json.get('notes', None)

    if piggy:
        piggy.name = name
        piggy.goal = goal
        piggy.saved = saved
        piggy.target_date = date
        piggy.notes = notes
        db.session.commit()
        return jsonify('saved piggy'), 200
    else:
        return jsonify({'msg': 'You must be logged in'}), 401

#Route to get just individual expenses
@api.route('/expenses', methods = ['GET'])
@jwt_required()
def handle_expenses():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        expenses = []
        for x in user.expenses:
            expenses.append(x.serialize())
        return jsonify(expenses), 200

#Route to show user groups and friends on the expenses modal
@api.route('/user-rel', methods=['GET'])
@jwt_required()
def get_user_details():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        groups = [group.name for group in user.groups]
        friends = [friend.email for friend in user.friends]

        serialized_relationships = [group.serialize() for group in user.groups]
        serialized_relationships += [friend.serialize() for friend in user.friends]

        return jsonify({'groups': groups, 'friends': friends, "relationships": serialized_relationships}), 200
    else:
        return jsonify({'msg': 'User not found'}), 404

#Route to create expense
@api.route('/expense', methods = ['POST'])
@jwt_required()
def add_expenses():
    current_user_id = get_jwt_identity()
    print(current_user_id)
    user = User.query.get(current_user_id)
    name = request.json.get('name', None)
    group = request.json.get("group")
    friend = request.json.get("friend")
    amount = request.json.get("amount")
    date = request.json.get("date")
    type = request.json.get("type")
    # print('expenses post', request.json)

    if user and (group is None and friend is None):
        new_expenses = Expenses(name = name, user_id = current_user_id, amount = amount, date = date, type = type)
        db.session.add(new_expenses)
        db.session.commit()
        expenses = Expenses.query.all()
        serialized_expenses = []
        for expense in expenses:
            serialized_expenses.append(expense.serialize())
        return jsonify({'message': 'Expense Added', 'expenses' : serialized_expenses}), 200
    if user and group:
        group_id = Group.query.filter_by(name = group).first()
        print('group_id', group_id)
        new_expenses = Expenses(name = name, group_id = group_id.id, user_id = current_user_id, amount = amount, date = date, type = type )
        db.session.add(new_expenses)
        db.session.commit()
        expenses = Expenses.query.all()
        serialized_expenses = []
        for expense in expenses:
            serialized_expenses.append(expense.serialize())
        return jsonify({'message': 'Expense Added', 'expenses' : serialized_expenses}), 200
    if user and friend:
        friend_id = User.query.filter_by(email = friend).first()
        print('friend_id', friend_id)
        new_expenses = Expenses(name = name, friend_id = friend_id.id, user_id = current_user_id, amount = amount, date = date, type = type )
        db.session.add(new_expenses)
        db.session.commit()

        expenses = Expenses.query.all()
        serialized_expenses = []
        for expense in expenses:
            serialized_expenses.append(expense.serialize())
        return jsonify({'message': 'Expense Added', 'expenses' : serialized_expenses}), 200
    
    else:
        return jsonify({'msg': 'You must be logged in'}), 401

#Route to update and delete expense
@api.route('/expenses/<int:expenses_id>', methods = ['PUT','DELETE'])
@jwt_required()
def individual_expenses(expenses_id):
    method = request.method
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if method == 'PUT':
        expense_to_update = Expenses.query.filter_by(id = expenses_id, user_id = user.id).one()
        
        if expense_to_update:
            new_name = request.json.get('name')
            new_amount = request.json.get('amount')
            new_date = request.json.get('date')
            new_type = request.json.get('type')

            if new_name:
                expense_to_update.name = new_name
            if new_amount:
                expense_to_update.amount = new_amount
            if new_date:
                expense_to_update.date = new_date
            if new_type:
                expense_to_update.type = new_type

            db.session.commit()
            expenses = Expenses.query.all()
            serialized_expenses = []
            for expense in expenses:
                serialized_expenses.append(expense.serialize())
            return jsonify({'message': 'Expense updated', 'expenses' : serialized_expenses}), 200
        
    elif method == 'DELETE':
        expense_to_delete = Expenses.query.filter_by(id = expenses_id, user_id = user.id).first()
        
        if expense_to_delete:
            db.session.delete(expense_to_delete)
            db.session.commit()
            expenses = Expenses.query.all()
            serialized_expenses = []
            for expense in expenses:
                serialized_expenses.append(expense.serialize())
            return jsonify({'message': 'Expense deleted', 'expenses' : serialized_expenses}), 200
    
# Plaid
#Plaid Create Link Token
@api.route('/create_link_token', methods=['POST'])
@jwt_required()
def create_link_token():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        user_id = str(user.id)

        products = [Products(product) for product in PLAID_PRODUCTS]

        request = LinkTokenCreateRequest(
            products=products,
            client_name='Better Budget',
            country_codes=list(map(lambda x: CountryCode(x), PLAID_COUNTRY_CODES)),
            language='en',
            user=LinkTokenCreateRequestUser(
                client_user_id=user_id
            )
        )
        if PLAID_REDIRECT_URI!=None:
            request['redirect_uri']=PLAID_REDIRECT_URI
    # create link token
        response = client.link_token_create(request)
        print('create link respone', response)
        return jsonify(response.to_dict())
    except plaid.ApiException as e:
        return json.loads(e.body)

#Plaid Exchange Public token for Link token  
@api.route('/set_access_token', methods=['POST'])
@jwt_required()
def get_access_token():
    access_token = None
    item_id = None

    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        public_token = request.json.get('public_token')
        print('public_token', public_token)
        exchange_request = ItemPublicTokenExchangeRequest(
            public_token=public_token)        
        exchange_response = client.item_public_token_exchange(exchange_request)
        
        access_token = exchange_response['access_token']
        item_id = exchange_response['item_id']
        
        user.access_token = access_token
        user.item_id = item_id
        db.session.commit()
        
        print('exchange response', exchange_response, access_token, item_id )
        
        return jsonify(exchange_response.to_dict())
    
    except plaid.ApiException as e:
        return json.loads(e.body)                 

#Plaid Sync Transactions
@api.route('/transactions', methods=['POST'])
@jwt_required()
def transactions_sync():
    access_token = None
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    # cursor = user.get_latest_cursor_or_none(item_id)
    access_token = user.access_token
    print('access_token', access_token)
    print('item_id', user.item_id)

    count = 5

    request = TransactionsSyncRequest(
            access_token=access_token,
            count=count,
        )

    try:
        response = client.transactions_sync(request)
        transaction_added = response.get('added')
        modified = response.get('modified')
        removed = response.get('removed')
        has_more = response.get('has_more', False)

        for transaction in transaction_added:
            name = transaction['name']
            merchant_name = transaction['merchant_name']
            amount = transaction['amount']
            date = transaction['date']
        
            print('added transactions', response)
            upcoming_expenses = Expenses(name = name, user_id = current_user_id, amount = amount, date = date)
            db.session.add(upcoming_expenses)
            db.session.commit()
            expenses = Expenses.query.all()
            serialized_expenses = []
            for expense in expenses:
                serialized_expenses.append(expense.serialize())
        
        return jsonify({'message': 'Expense Added', 'expenses' : serialized_expenses}), 200   

        # return jsonify(response.to_dict())
    except plaid.ApiException as e:
        return jsonify({'error': str(e)})

