import logging
import os
import sys

import bcrypt
import yaml
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from utils.gpw_scraper import get_stock_data
from flask_cors import CORS
from flasgger import Swagger
from utils.stocks import Stocks
from user_model import db, User, Wallet
from flask_migrate import Migrate

from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.DEBUG,  # lub INFO
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
    force=True,  # nadpisuje wcześniejszą konfigurację
)

app = Flask(__name__)
app.config['SWAGGER'] = {
    'title': 'API GPW Dashboard',
    'uiversion': 3,
    'version': '1.0',
    'description': 'Dokumentacja API do pobierania danych z GPW'
}
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'CHANGE_ME')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI', 'sqlite:///users.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS', 'False') == 'True'

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
swagger = Swagger(app)
CORS(app)  # pozwala na komunikację z Reactem
# CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}}, supports_credentials=False)

# Utworzenie tabel w bazie danych
with app.app_context():
    db.create_all()


@app.route('/register', methods=['POST'])
def register():
    """
    Register a new user
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          properties:
            email:
              type: string
            password:
              type: string
    responses:
      201:
        description: User created successfully
      400:
        description: User already exists or invalid data
    """
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify(msg='Email and password are required'), 400

    # Sprawdź czy użytkownik już istnieje
    if User.query.filter_by(email=email).first():
        return jsonify(msg='User already exists'), 400

    # Zahashuj hasło
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Utwórz nowego użytkownika
    new_user = User(email=email, password_hash=password_hash.decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify(msg='User created successfully'), 201


@app.route('/login', methods=['POST'])
def login():
    """
    Login user
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          properties:
            email:
              type: string
            password:
              type: string
    responses:
      200:
        description: Login successful
      401:
        description: Invalid credentials
    """
    email = request.json.get('email')
    password = request.json.get('password')

    # Znajdź użytkownika w bazie
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200

    return jsonify(msg='Invalid credentials'), 401


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/api/stocks')
@jwt_required()
def stocks():
    """
    Example endpoint returning a simple message
    ---
    responses:
      200:
        description: A successful response
        examples:
          text: "Hello World!"
    """
    print("Auth:", request.headers.get('Authorization'))
    print("Identity:", get_jwt_identity())
    identity = get_jwt_identity()
    user = User.query.filter_by(email=identity).first()
    wallets = user.wallets
    print(f"{wallets=}")
    tickers = Stocks("1234").get_stocks()
    print(f"{tickers=}")
    return tickers


@app.route('/api/stocks/<ticker>')
def stock_info(ticker):
    """
    Return data for a stock
    ---
    parameters:
    - name: ticker
    responses:
      200:
        description: A successful response
        examples:
          text: "Hello World!"
    """
    data = get_stock_data(ticker)
    return jsonify(data)


@app.route('/api/wallets', methods=['GET'])
@jwt_required()
def list_wallets():
    # get_jwt_identity zwraca identity ustawione przy tworzeniu tokenu (np. email)
    identity = get_jwt_identity()
    user = User.query.filter_by(email=identity).first()
    if not user:
        return jsonify(msg='User not found'), 404

    wallets = user.wallets
    return jsonify([
        {
            'id': w.id,
            'code': w.code,
            'file_path': w.file_path,
            'created_at': w.created_at.isoformat(),
        }
        for w in wallets
    ]), 200


@app.route('/api/wallets', methods=['POST'])
@jwt_required()
def create_wallet():
    identity = get_jwt_identity()
    user = User.query.filter_by(email=identity).first()
    if not user:
        return jsonify(msg='User not found'), 404

    data = request.get_json() or {}
    code = (data.get('code') or '').strip()
    if not code:
        return jsonify(msg='code is required'), 400

    # Bazowy katalog na pliki portfeli
    base_dir = os.path.join(app.root_path, 'data', 'wallets')
    os.makedirs(base_dir, exist_ok=True)

    # Zbuduj bezpieczną ścieżkę (ochrona przed ../)
    file_path = os.path.normpath(os.path.join(base_dir, f'{code}.yaml'))
    if not file_path.startswith(os.path.normpath(base_dir) + os.sep):
        return jsonify(msg='Invalid code'), 400

    # Jeśli plik nie istnieje, utwórz prosty szablon
    if not os.path.exists(file_path):
        with open(file_path, 'w', encoding='utf-8') as f:
            yaml.safe_dump({'tickers': []}, f, sort_keys=False, allow_unicode=True)

    # Dodaj wpis w DB
    wallet = Wallet(code=code, file_path=file_path, user_id=user.id)
    db.session.add(wallet)
    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify(msg='Wallet already exists for this user'), 400

    return jsonify({'id': wallet.id, 'code': wallet.code}), 201


@app.route('/api/stocks/<ticker>/add')
def stock_add(ticker):
    Stocks("1234").add_stock(ticker)
    return jsonify({'message': f'Dodano {ticker}'})


@app.route('/api/stocks/<ticker>/delete', methods=['POST'])
def stock_delete(ticker):
    Stocks("1234").delete_stock(ticker)
    return jsonify({'message': f'Usunieto {ticker}'})


@app.route('/api/message', methods=['GET', 'POST'])
def get_message():
    import datetime
    t = str(datetime.datetime.now())
    data = request.get_json()
    ticker = data.get('ticker')
    Stocks("1234").add_stock(ticker)
    return jsonify({'message': f'Backend: {t} {ticker} was added'})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
