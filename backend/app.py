from flask import Flask, jsonify
from gpw_scraper import get_stock_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # pozwala na komunikację z Reactem

@app.route('/api/stocks/<ticker>')
def stock_info(ticker):
    data = get_stock_data(ticker)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
