from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_friend = db.Table(
    "user_friend",
    db.Column("user_id", db.ForeignKey("user.id")),
    db.Column("friend_id", db.ForeignKey("friend.id")),
)

user_group = db.Table(
    "user_group",
    db.Column("user_id", db.ForeignKey("user.id")),
    db.Column("group_id", db.ForeignKey("group.id")),
    db.Column("friend_id", db.ForeignKey("friend.id"))
)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    friends = db.relationship('Friend', secondary=user_friend)
    groups = db.relationship('Group', secondary=user_group)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": f'{self.first_name} {self.last_name}',
            # do not serialize the password, it's a security breach
        }

class Group(db.Model):
    __tablename__ = 'group'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    members = db.relationship('Friend', secondary=user_group)

    def __repr__(self):
        return f'<Group {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "members": [friend.serialize() for friend in self.members],
        }

class Friend(db.Model):
    __tablename__ = 'friend'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<Friend {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            # do not serialize the password, it's a security breach
        }
