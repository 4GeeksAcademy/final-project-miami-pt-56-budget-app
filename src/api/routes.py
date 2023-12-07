"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Group, PiggyBank, Expenses
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, origins='*')

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
    password = request.json.get('password', None)
    new_user = User(email = email, password = password, first_name = first_name, last_name = last_name)
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
    user = User.query.filter_by(email = email, password=password).first()
    if user is None:
        return jsonify({"msg" : "Bad username or password"}), 401
    else:
        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token, "name": user.first_name}), 200

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
        for x in user.groups:
            group_list.append(x.serialize())
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
# @api.route('/friends', methods = ['GET'])
# @jwt_required()
# def handle_get_friends():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)
#     if user is not None:
#         friend_list = []
#         for x in user.friends:
#             friend_list.append(x.serialize())
#         response_body = {
#             "message": "Here is the friend information!",
#             "user": friend_list
#         }
#         return jsonify(response_body), 200
#     else:
#         return jsonify({'msg': 'You must be logged in'}), 401


#Route to add or delete user friends  
@api.route('/friends', methods = ['POST','DELETE'])
@jwt_required()
def manage_friends():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    data = request.get_json()
    friend_id = data.get('friendID')
    friend = User.query.get(friend_id)

    if user and friend:
        if request.method == 'POST':
            user.add_friend(friend)
            message = 'Friend added successfully'
        elif request.method == 'DELETE':
            if friend in user.friends and user in friend.friends:
                user.friends.remove(friend)
                friend.friends.remove(user)
                db.session.commit()
                message = 'Friend removed successfully'
            else:
                return jsonify({'error': 'Friendship not found'}), 404
        else:
            return jsonify({'error': 'Invalid action'}), 400

        friends_list = []
        for x in user.friends:
            friends_list.append(x.serialize())
        user = user.serialize()
        user["friends"] = friends_list

        return jsonify({'message': message, "user":user}), 200
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
        new_piggy = PiggyBank(name = name, user_id = current_user_id)
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
    new_name = request.json.get('newName')
    new_goal = request.json.get('newGoal')
    new_saved = request.json.get('newSaved')
    new_note = request.json.get('newNote')
    new_date = request.json.get('newDate')

    if new_name and piggy:
        piggy.name = new_name
        db.session.commit()
        return jsonify('Changed Name'), 200
    if new_goal and piggy:
        piggy.goal = new_goal
        db.session.commit()
        return jsonify('Changed goal'), 200
    if new_saved and piggy:
        piggy.saved = new_saved
        db.session.commit()
        return jsonify('Changed saved amount'), 200
    if new_note and piggy:
        piggy.notes = new_note
        db.session.commit()
        return jsonify('Changed Note'), 200
    if new_date and piggy:
        piggy.nametarget_date = new_date
        db.session.commit()
        return jsonify('Changed date'), 200
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
        # friend_of = [friend.email for friend in user.friend_of]

        return jsonify({'groups': groups, 'friends': friends}), 200
    else:
        return jsonify({'msg': 'User not found'}), 404

#Route to create expense
@api.route('/expense', methods = ['POST'])
@jwt_required()
def add_expenses():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    name = request.json.get('name', None)
    group = request.json.get("group")
    friend = request.json.get("friend")
    amount = request.json.get("amount")
    date = request.json.get("date")
    type = request.json.get("type")
    print(request.json)

    if user and (group is None and friend is None):
        new_expenses = Expenses(name = name, user_id = current_user_id, amount = amount, date = date, type = type)
        db.session.add(new_expenses)
        db.session.commit()
        return jsonify('Added expenses'), 200
    if user and group:
        group_id = Group.query.filter_by(name = group).first()
        print(group_id)
        new_expenses = Expenses(name = name, group_id = group_id.id, user_id = current_user_id, amount = amount, date = date, type = type )
        db.session.add(new_expenses)
        db.session.commit()
        return jsonify('Added expenses'), 200
    if user and friend:
        friend_id = User.query.filter_by(email = friend).first()
        print(friend_id)
        new_expenses = Expenses(name = name, friend_id = friend_id.id, user_id = current_user_id, amount = amount, date = date, type = type )
        db.session.add(new_expenses)
        db.session.commit()
        return jsonify('Added expenses'), 200
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
            return jsonify('Expense updated'), 200
        
    elif method == 'DELETE':
        expense_to_delete = Expenses.query.filter_by(id = expenses_id, user_id = user.id).first()
        
        if expense_to_delete:
            db.session.delete(expense_to_delete)
            db.session.commit()
            return jsonify("Expense deleted"), 200
    
   

#Route to modify expense
# @api.route('/expenses/<int:expenses_id>', methods = ['PUT'])
# @jwt_required()
# def change_expenses(expenses_id):
#     expense = Expenses.query.get(expenses_id)