import pandas as pd
import numpy as np


def formatter(x):
    if x == '---':
        return np.nan
    if x == np.nan:
        return np.nan
    if type(x) is float:
        return round(x, 4)
    if '/' in x:
        ss = x.split('/')
        return '-'.join(ss)
    return x


df = pd.read_csv('raw.csv')
df = df.applymap(formatter)
df.to_csv('data.csv', index=False)
