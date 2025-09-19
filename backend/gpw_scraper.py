import pandas as pd

def get_stock_data(ticker):
    url = f"https://stooq.com/q/d/l/?s={ticker}&i=d"
    df = pd.read_csv(url)
    return df.tail(5).to_dict(orient='records')
