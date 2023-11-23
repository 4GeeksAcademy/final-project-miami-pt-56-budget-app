"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Group
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Routes
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

@api.route('/signup', methods = ['POST'])
def handle_signup():
    email = request.json.get('email', None)
    first_name = request.json.get('first_name', None)
    last_name = request.json.get('last_name', None)
    password = request.json.get('password', None)
    verifypassword = request.json.get('verifypassword', None)
    newUser = User(email = email, password = password, first_name = first_name, last_name = last_name)
    if password != verifypassword:
        return jsonify('Passwords do not match'), 406
    if User.query.filter_by(email = email).first() == None:
        db.session.add(newUser)
        db.session.commit()
        return jsonify('Added User'), 200
    else:
        return jsonify('That email is already in use'), 412    
    
@api.route('/signin', methods = ['POST'])
def handle_signin():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email, password=password).first()
    if user is None:
        return jsonify({"msg" : "Bad username or password"}), 401
    else:
        access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200

@api.route('/home', methods = ['GET'])
@jwt_required()
def handle_home():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is not None:
        group_list = []
        for x in user.groups:
            group_list.append(x.serialize())
        user = user.serialize()
        user['groups'] = group_list
        serialized_user = []
        serialized_user.append(user)
        response_body = {
            "message": "Here is the user information!",
            "user": serialized_user
        }
        return jsonify(response_body), 200
    else:
        return jsonify({'msg': 'You must be logged in'}), 401

@api.route('/groups', methods = ['GET'])
@jwt_required()
def handle_get_groups():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is not None:
        group_list = []
        for x in user.groups:
            group_list.append(x.serialize())
        response_body = {
            "message": "Here is the group information!",
            "user": group_list
        }
        return jsonify(response_body), 200
    else:
        return jsonify({'msg': 'You must be logged in'}), 401

@api.route('/groups', methods = ['POST'])
@jwt_required()
def handle_add_groups():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is not None:
        name = request.json.get('name', None)
        newGroup = Group(name = name)
        db.session.add(newGroup)
        db.session.commit()
        return jsonify('Added Group'), 200
    else:
        return jsonify({'msg': 'You must be logged in'}), 401

@api.route('/groups/<int:group_id>', methods = ['DELETE'])
@jwt_required()
def handle_delete_groups(group_id):
    groupList = Group.query.all()
    toDelete = None
    for item in groupList:
        if item.serialize()['id'] == group_id:
            toDelete = item
        if toDelete == None:
            return jsonify("Invalid group ID"), 400
        else:
            db.session.delete(toDelete)
            db.session.commit()
            return jsonify("Group deleted"), 200

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
    
@api.route('/friends', methods = ['POST','DELETE'])
@jwt_required()
def manage_friends():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    data = request.get_json()
    friend_id = data.get('friend_id')
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
            
# @api.route('/user/<int:user_id>', methods = ['POST'])
# @jwt_required()
# def handle_account(user_id):


# @api.route('/groups', methods=['POST','DELETE'])
# @jwt_required()
# def manage_groups():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)

#     data = request.get_json()
#     friend_id = data.get('friend_id')
#     friend = User.query.get(friend_id)

#     if user and friend:
#         if request.method == 'POST':
#             user.add_friend(friend)
#             message = 'Friend added successfully'
#         elif request.method == 'DELETE':
#             if friend in user.friends and user in friend.friends:
#                 user.friends.remove(friend)
#                 friend.friends.remove(user)
#                 db.session.commit()
#                 message = 'Friend removed successfully'
#             else:
#                 return jsonify({'error': 'Friendship not found'}), 404
#         else:
#             return jsonify({'error': 'Invalid action'}), 400

#         friends_list = []
#         for x in user.friends:
#             friends_list.append(x.serialize())
#         user = user.serialize()
#         user["friends"] = friends_list

#         return jsonify({'message': message, "user":user}), 200
#     else:
#         return jsonify({'error': 'User or friend not found'}), 404
