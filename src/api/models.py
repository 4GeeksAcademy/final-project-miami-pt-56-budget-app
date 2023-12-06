from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_friend = db.Table(
    'user_friend',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('friend_id', db.Integer, db.ForeignKey('user.id')),
    db.UniqueConstraint('user_id', 'friend_id', name='unique_user_friend'))

group_member = db.Table('group_member',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')))

class Expenses(db.Model):
    __tablename__ = 'expenses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Numeric(scale = 2), nullable=False)
    date = db.Column(db.Date, nullable=False)
    type = db.Column(db.String(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    friend_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))
    
    user = db.relationship("User", foreign_keys=[user_id])
    friend = db.relationship("User", foreign_keys=[friend_id])
    group = db.relationship('Group', back_populates='expenses')
    

    def __repr__(self):
        return f'<Expenses {self.name}>'

    def serialize(self, include_user=True):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "date": self.date,
            "type": self.type,
            "user": self.user.serialize() if self.user and include_user else None,
            "friend": self.friend.serialize() if self.friend else None,
            "group": self.group.serialize() if self.group else None,
        }


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(120), nullable=False, unique=False)
    last_name = db.Column(db.String(120), nullable=False, unique=False)
    password = db.Column(db.String(80), nullable=False, unique=False)
    
    friends = db.relationship(
        "User",
        secondary=user_friend,
        primaryjoin=id == user_friend.c.user_id,
        secondaryjoin=id == user_friend.c.friend_id,
        back_populates="friend_of",
    )
    friend_of = db.relationship(
        "User",
        secondary=user_friend,
        primaryjoin=id == user_friend.c.friend_id,
        secondaryjoin=id == user_friend.c.user_id,
        back_populates="friends",
    )                   
    groups = db.relationship("Group", secondary=group_member, back_populates="members")
    piggybanks = db.relationship("PiggyBank", backref="user_piggybank")
    expenses = db.relationship("Expenses", backref="user_expense",  foreign_keys="[Expenses.user_id]")

    def __repr__(self):
        return f'<User {self.email}>'
    
    def add_friend(self, friend):
        if friend != self and friend not in self.friends:
            self.friends.append(friend)
            friend.friends.append(self)
            db.session.commit()

    def serialize(self, include_expenses=True):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            # "expenses": list(map(lambda y: y.serialize(include_user=False), self.expenses)) if include_expenses else [],
            # "piggybanks": list(map(lambda x: x.serialize(), self.piggybanks))
        }

class Group(db.Model):
    __tablename__ = 'group'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    members = db.relationship("User", secondary=group_member, back_populates="groups")
    expenses = db.relationship("Expenses", backref="group_expense")

    def __repr__(self):
        return f'<Group {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "members": list(map(lambda x: x.serialize(), self.members)),
            "expenses": list(map(lambda y: y.serialize(), self.expenses))
        }

class PiggyBank(db.Model):
    __tablename__ = 'piggybank'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    goal = db.Column(db.Numeric(scale = 2), nullable=False)
    saved = db.Column(db.Numeric(scale = 2), nullable=False)
    target_date = db.Column(db.String(120), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<PiggyBank {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "goal": self.goal,
            "saved": self.saved,
            "notes": self.notes,
            "target date": self.target_date
        }
