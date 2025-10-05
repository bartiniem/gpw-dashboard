import logging

import holidays
import pandas as pd
from datetime import datetime
import os


logger = logging.getLogger(__name__)

def is_it_working_day(date):
    # date in format 'YYYY-MM-DD'
    dt = date.strftime("%Y-%m-%d")
    pl_holidays = holidays.Poland()
    return date.weekday() < 5 and dt not in pl_holidays


def get_stock_data(ticker):
    filename = f"data/{ticker}.csv"
    logger.info(f"Loading data for {ticker}")
    if os.path.exists(filename):
        df = pd.read_csv(filename)
        if not is_it_working_day(datetime.now()) or (df['Date'] == datetime.now().strftime('%Y-%m-%d')).any():
            return df.tail(10).to_dict(orient='records')

    logger.info(f"Downloading data for {ticker}")
    url = f"https://stooq.com/q/d/l/?s={ticker}&i=d"
    df = pd.read_csv(url)
    df.to_csv(filename, index=False)
    return df.tail(10).to_dict(orient='records')
