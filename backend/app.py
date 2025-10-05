from datetime import datetime

import bcrypt
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from gpw_scraper import get_stock_data
from flask_cors import CORS
from flasgger import Swagger
from utils.stocks import Stocks

app = Flask(__name__)
app.config['SWAGGER'] = {
    'title': 'API GPW Dashboard',
    'uiversion': 3,
    'version': '1.0',
    'description': 'Dokumentacja API do pobierania danych z GPW'
}
app.config['JWT_SECRET_KEY'] = 'super-secret-key'
jwt = JWTManager(app)
swagger = Swagger(app)
CORS(app)  # pozwala na komunikację z Reactem

users = {'test@test.com': 'pass'}  # przykładowa baza

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    if users.get(email) == password:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    return jsonify(msg='Invalid credentials'), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/api/stocks')
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
    return Stocks().get_stocks()

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

@app.route('/api/stocks/<ticker>/add')
def stock_add(ticker):
    Stocks().add_stock(ticker)
    return jsonify({'message': f'Dodano {ticker}'})

@app.route('/api/stocks/<ticker>/delete', methods=['POST'])
def stock_delete(ticker):
    Stocks().delete_stock(ticker)
    return jsonify({'message': f'Usunieto {ticker}'})

@app.route('/api/message', methods=['GET', 'POST'])
def get_message():
    import datetime
    t = str(datetime.datetime.now())
    data = request.get_json()
    ticker = data.get('ticker')
    Stocks().add_stock(ticker)
    return jsonify({'message': f'Backend: {t} {ticker} was added'})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
