import pandas as pd
from pandas import read_csv
import tensorflow as tf
from pandas import DataFrame
from pandas import concat
from keras.models import Sequential
from keras.layers import LSTM, Dense, Input
import matplotlib.pyplot as plt
# load dataset

dataset = read_csv('Stonks - Sheet1-2.csv', header=0, index_col=0)
new_data = read_csv('new_stonks.csv', header=0, index_col=0)
dataset = pd.concat([dataset, new_data], axis=0)
dataset.to_csv('together.csv')
dataset = read_csv('together.csv', header=0, index_col=0)
y_compare = dataset['NASDAQ'].values
y_compare_resized = (dataset['NASDAQ'] - dataset['NASDAQ'].abs().min())/(dataset['NASDAQ'].abs().max() - dataset['NASDAQ'].abs().min())
resize = dataset['NASDAQ'].abs().max()
add = dataset['NASDAQ'][:2068].abs().min()
dataset = dataset.drop(["NASDAQ"], axis=1)


# specify columns to plot
'''groups = [x for x in range(len(dataset.columns))]
i = 1
# plot each column
plt.figure()
for group in groups:
 plt.subplot(len(groups), 1, i)
 plt.plot(values[:, group])
 plt.title(dataset.columns[group], y=0.5, loc='right')
 i += 1
plt.show()
'''
df_max_scaled = dataset.copy()

# apply normalization techniques
for column in df_max_scaled.columns:
    df_max_scaled[column] = (df_max_scaled[column]/df_max_scaled[column].abs().max())

"df_max_scaled.plot(kind = 'line')"
'plt.show()'

values = df_max_scaled.values

# specify columns to plot
n_train_hours = 2066
train = values[:n_train_hours, :]
y_train = y_compare_resized[:n_train_hours]
test = values[n_train_hours-1500:, :]
print(test)


# split into input and outputs
train_X, train_y = train[:, :], y_train[:]
test_X, test_y = test[:, :], test[:, -1]
# reshape input to be 3D [samples, timesteps, features]
train_X = train_X.reshape((train_X.shape[0], 1, train_X.shape[1]))
test_X = test_X.reshape((test_X.shape[0], 1, test_X.shape[1]))
print(train_X.shape, train_y.shape, test_X.shape, test_y.shape)



model = Sequential()
model.add(LSTM(50, input_shape=(train_X.shape[1], train_X.shape[2])))
model.add(Dense(1))
model.compile(loss='mae', optimizer='adam')

history = model.fit(train_X, train_y, epochs=800, batch_size=50, verbose=1, shuffle=False)
# plot history


predictions = model(test_X)
predictions_r = predictions[predictions.shape[0]-20:] * resize
predictions_r = predictions_r + (y_compare[2066] - predictions_r[0])
plt.plot([x for x in range(0, 100, 1)], y_compare[n_train_hours-99:2067])
plt.plot([x for x in range(99, 99 + len(predictions_r), 1)], predictions_r)
plt.title("NASDAQ")
plt.savefig('figures/NASDAQ.png')
new_data.insert(0, 'NASDAQ', predictions_r)
new_data.to_csv('new_stonks.csv')

