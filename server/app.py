# app.py

import os

from flask import jsonify, make_response, request, session
# from flask_migrate import Migrate
from flask_restful import Resource
from datetime import datetime

# from models import db, Bird

from config import app, db, api

from models import User, Comment, Reply, Like, user_schema, users_schema, comment_schema, comments_schema, reply_schema, replies_schema, like_schema, likes_schema



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

    # def get(self):
    #     users = [user.to_dict() for user in User.query.all()]
    #     return make_response(jsonify(users), 200)
    
    def get(self):

        users = User.query.all()
        response = users_schema.dump(users), 200
        return response

api.add_resource(Users, '/users')

# class BirdByID(Resource):
#     def get(self, id):
#         bird = Bird.query.filter_by(id=id).first().to_dict()
#         return make_response(jsonify(bird), 200)

# api.add_resource(BirdByID, '/birds/<int:id>')

class UsersByID(Resource):
    # def get(self, id):
    #     user = User.query.filter_by(id=id).first().to_dict()
    #     return make_response(jsonify(user), 200)
    
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        response = make_response(user_schema.dump(user), 200)
        return response

api.add_resource(UsersByID, '/users/<int:id>')

class Comments(Resource):

    # def get(self):

    #     user = User.query.filter_by(id=session['user_id']).first()
    #     comments = Comment.query.order_by(Comment.created_date.desc()).all()
    #     user_followed = [followed.id for followed in user.followed]
    #     user_followed.append(user.id)
    #     filtered_comments = [comment for comment in comments if comment.commenter.id in user_followed]
    #     # comments = Comment.query.all()
    #     response = comments_schema.dump(filtered_comments), 200
    #     return response
    
    def get(self):

        comments = Comment.query.all()
        response = comments_schema.dump(comments), 200
        return response
    
    # def post(self):
    #     try:
    #         data = request.get_json()
    #         comment = Comment(
    #             comment = data['comment'],
    #             commenter_id = data['commenter_id']
    #         )
    #         comment.created_date = datetime.now()
    #         db.session.add(comment)
    #         db.session.commit()
    #         response = make_response(comment_schema.dump(comment), 201)
    #         return response
    #     except Exception as e:
    #         response_body = {'errors': [str(e)]}
    #         return response_body, 400

api.add_resource(Comments,'/comments')

class CommentsByID(Resource):

    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()
        response = comment_schema.dump(comment), 200
        return  response
    
    # def patch(self, id):
    #     comment = Comment.query.filter_by(id=id).first()
    #     data = request.get_json()
    #     if comment:
    #         for attr, value, in data.items():
    #             setattr(comment, attr, value)
    #         db.session.add(comment)
    #         db.session.commit()
    #         response = make_response(comment_schema.dump(comment), 202)
    #         return response
    #     else:
    #         response_body = {'error': 'Comment not found'}
    #         return response_body, 404
        
    # def delete(self, id):
    #     comment = Comment.query.filter_by(id=id).first()
    #     if comment:
    #         db.session.delete(comment)
    #         db.session.commit()
    #         response_body= ''
    #         return response_body, 204
    #     else: 
    #         response_body = {'error': 'Comment not found'}
    #         return response_body, 404

api.add_resource(CommentsByID,'/comments/<int:id>')

class Replies(Resource):

    def get(self):

        replies = Reply.query.order_by(Reply.created_date.desc()).all()
        response = replies_schema.dump(replies), 200
        return response
    
    # def post(self):
    #     try:
    #         data = request.get_json()
    #         reply = Reply(
    #             reply = data['reply'],
    #             comment_id = data['comment_id'],
    #             replier_id = data['replier_id']
    #         )
    #         reply.created_date = datetime.now()
    #         db.session.add(reply)
    #         db.session.commit()
    #         response = make_response(reply_schema.dump(reply), 201)
    #         return response
    #     except Exception as e:
    #         response_body = {'errors': [str(e)]}
    #         return response_body, 400
    
api.add_resource(Replies,'/replies')

class RepliesByID(Resource):

    def get(self, id):
        reply = Reply.query.filter_by(id=id).first()
        response = reply_schema.dump(reply), 200
        return response
    
    # def patch(self, id):
    #     reply = Reply.query.filter_by(id=id).first()
    #     data = request.get_json()
    #     if reply:
    #         for attr, value, in data.items():
    #             setattr(reply, attr, value)
    #         db.session.add(reply)
    #         db.session.commit()
    #         response = make_response(reply_schema.dump(reply), 202)
    #         return response
    #     else:
    #         response_body = {'error': 'Reply not found'}
    #         return response_body, 404

    # def delete(self, id):
    #     reply = Reply.query.filter_by(id=id).first()
    #     if reply:
    #         db.session.delete(reply)
    #         db.session.commit()
    #         response_body= ''
    #         return response_body, 204
    #     else: 
    #         response_body = {'error': 'Reply not found'}
    #         return response_body, 404
    
api.add_resource(RepliesByID,'/replies/<int:id>')

class Likes(Resource):

    def post(self):
        try:
            data = request.get_json()
            like = Like(
                comment_liker_id = data['comment_liker_id'],
                liked_comment_id = data['liked_comment_id']
            )
            like.created_date = datetime.now()
            db.session.add(like)
            db.session.commit()
            response = make_response(like_schema.dump(like), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400
    
api.add_resource(Likes,'/likes')

class LikesByID(Resource):

    def delete(self, id):
        like = Like.query.filter_by(id=id).first()
        if like:
            db.session.delete(like)
            db.session.commit()
            response_body= ''
            return response_body, 204
        else: 
            response_body = {'error': 'Like not found'}
            return response_body, 404
    
api.add_resource(LikesByID,'/likes/<int:id>')