from flask import Flask, jsonify, request
from gpw_scraper import get_stock_data
from flask_cors import CORS
from flasgger import Swagger
from utils.stocks import Stocks

app = Flask(__name__)
app.config['SWAGGER'] = {
    'title': 'Moje API GPW',
    'uiversion': 3,
    'version': '1.0',
    'description': 'Dokumentacja API do pobierania danych z GPW'
}
swagger = Swagger(app)
CORS(app)  # pozwala na komunikację z Reactem

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
    """Desc"""
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
    return jsonify({'message': f'Witaj z backendu! {t} {ticker}'})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
