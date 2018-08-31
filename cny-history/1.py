import pandas as pd

df = pd.read_csv('data.csv')
df = df[['date', 'USD/CNY']]
df.rename(columns={'USD/CNY': 'value'}, inplace=True)
df.to_json('usd.json', orient='records')
