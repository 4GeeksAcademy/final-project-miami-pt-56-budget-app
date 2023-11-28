from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_friend= db.Table('user_friend',
    db.Column('user_1', db.Integer, db.ForeignKey('user.id')),
    db.Column('user_2', db.Integer, db.ForeignKey('user.id')))

group_member = db.Table('group_member',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')))

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(80), nullable=False)
    friends = db.relationship("User", secondary=user_friend, 
                              primaryjoin=id == user_friend.c.user_1 ,
                              secondaryjoin=id == user_friend.c.user_2, 
                              back_populates="friends")
                      
    groups = db.relationship("Group", secondary=group_member, back_populates="members")

    def __repr__(self):
        return f'<User {self.email}>'
    
    def add_friend(self, friend):
        if friend not in self.friends:
            self.friends.append(friend)
            friend.friends.append(self)
            db.session.commit()

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            # "groups": list(map(lambda x: x.serialize(), self.groups))
            # do not serialize the password, it's a security breach
        }

class Group(db.Model):
    __tablename__ = 'group'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    members = db.relationship("User", secondary=group_member, back_populates="groups")

    def __repr__(self):
        return f'<Group {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "members": list(map(lambda x: x.serialize(), self.members))
        }