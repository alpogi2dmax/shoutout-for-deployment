import os

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_cors import CORS
# from flask_session import Session
from flask_marshmallow import Marshmallow
from datetime import timedelta

app = Flask(__name__)
# app = Flask(__name__, static_folder='client/build', static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret_key'
# app.config['SESSION_TYPE'] = 'filesystem'
# app.config["SESSION_PERMANENT"] = True  # Ensures sessions persist
# app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=1)  # Adjust as needed
app.json.compact = False

app.config.update(
    SESSION_COOKIE_SAMESITE='None',
    SESSION_COOKIE_SECURE=True
)

# Session config
app.permanent_session_lifetime = timedelta(days=7)

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Session(app)

bcrypt = Bcrypt(app)

ma = Marshmallow(app)

api = Api(app)

# Instantiate CORS
# CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

CORS(app, supports_credentials=True, origins=["https://shoutout-for-deployment-1.onrender.com"])
