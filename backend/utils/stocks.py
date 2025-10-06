import yaml


class Stocks:

    def __init__(self, wallet_name: str):
        self._filename = f"data/wallets/{wallet_name}.yaml"

    def get_stocks(self):
        with open(self._filename) as f:
            d = yaml.load(f, Loader=yaml.FullLoader)
        return d['tickers']

    def add_stock(self, ticker):
        with open(self._filename) as f:
            d = yaml.load(f, Loader=yaml.FullLoader)
        if ticker not in d['tickers']:
            d['tickers'].append(ticker)
            with open(self._filename, "w") as f:
                yaml.dump(d, f)
        return d

    def delete_stock(self, ticker):
        with open(self._filename) as f:
            d = yaml.load(f, Loader=yaml.FullLoader)
        if ticker in d['tickers']:
            d['tickers'].remove(ticker)
            with open(self._filename, "w") as f:
                yaml.dump(d, f)
        return d
