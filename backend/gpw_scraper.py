import pandas as pd
from datetime import datetime
import os


def get_stock_data(ticker):
    filename = f"data/{ticker}.csv"
    if os.path.exists(filename):
        df = pd.read_csv(filename)
        if datetime.now().weekday() in [5,6] or (df['Date'] == datetime.now().strftime('%Y-%m-%d')).any():
            return df.tail(10).to_dict(orient='records')

    print(f"Downloading data for {ticker}")
    url = f"https://stooq.com/q/d/l/?s={ticker}&i=d"
    df = pd.read_csv(url)
    df.to_csv(filename, index=False)
    return df.tail(10).to_dict(orient='records')
