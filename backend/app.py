from flask import Flask, jsonify
from gpw_scraper import get_stock_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # pozwala na komunikację z Reactem

@app.route('/api/stocks')
def stocks():
    return ["cdr", "pko", "lpp"]

@app.route('/api/stocks/<ticker>')
def stock_info(ticker):
    data = get_stock_data(ticker)
    return jsonify(data)

@app.route('/api/stocks/<ticker>/add')
def stock_add(ticker):
    data = get_stock_data(ticker)
    return jsonify(data)

@app.route('/api/message', methods=['GET'])
def get_message():
    import datetime
    t = str(datetime.datetime.now())
    return jsonify({'message': f'Witaj z backendu! {t}'})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
