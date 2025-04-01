# app.py

import os

from flask import jsonify, make_response
# from flask_migrate import Migrate
from flask_restful import Resource

# from models import db, Bird

from config import app, db, api

from models import User



# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

# migrate = Migrate(app, db)
# db.init_app(app)

# api = Api(app)

# class Birds(Resource):

#     def get(self):
#         birds = [bird.to_dict() for bird in Bird.query.all()]
#         return make_response(jsonify(birds), 200)

# api.add_resource(Birds, '/birds')

@app.route('/')
def index():
    return '<h1>Shoutout Server</h1>'

class Users(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)

api.add_resource(Users, '/users')

# class BirdByID(Resource):
#     def get(self, id):
#         bird = Bird.query.filter_by(id=id).first().to_dict()
#         return make_response(jsonify(bird), 200)

# api.add_resource(BirdByID, '/birds/<int:id>')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(user), 200)

api.add_resource(UserByID, '/users/<int:id>')