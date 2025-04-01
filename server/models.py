# models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

# class Bird(db.Model, SerializerMixin):
#     __tablename__ = 'birds'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     species = db.Column(db.String)

#     def __repr__(self):
#         return f'<Bird {self.name} | Species: {self.species}>'
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    # _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    profile_pic = db.Column(db.String)