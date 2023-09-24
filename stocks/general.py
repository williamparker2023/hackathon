import tensorflow as tf
from keras.models import Sequential
from keras.layers import LSTM, Dense
import matplotlib.pyplot as plt
import pandas as pd

data = pd.read_csv('Stonks - Sheet1-2.csv', header=0, index_col=0)
new_file = open('new_stonks.csv', 'w+')
new_file.close()
'''data = data.drop(["date"], axis=1)'''
data = data.drop(["NASDAQ"], axis=1)

df_max_scaled = data.copy()
resize = []

# apply normalization techniques
for column in df_max_scaled.columns:
    resize.append(df_max_scaled[column].abs().max())
    df_max_scaled[column] = ((df_max_scaled[column]) /
                             (df_max_scaled[column].abs().max()))

i=0
for column in df_max_scaled.columns:
    values = df_max_scaled[column].values

    # specify columns to plot
    n_train_hours = 2068
    train = values[:n_train_hours]
    test = values[n_train_hours:]

    # split into input and outputs
    train_X, train_y = train[:], train[:]
    # reshape input to be 3D [samples, timesteps, features]
    train_X = train_X.reshape((train_X.shape[0], 1))

    model = Sequential()
    model.add(LSTM(50, input_shape=(1, 1)))
    model.add(Dense(1))
    model.compile(loss='mse', optimizer='adam')
    length = 20
    model.fit(train_X, train_y, epochs=500, batch_size=50, verbose=1, shuffle=False)
    # plot history
    prediction_null = 0
    predictions = []
    for j in range(length):
        test_X = train_X[len(train_X) - 100 + j:len(train_X) - 1]
        print(test_X)
        if j == 0:
            value = test_X
        else:
            value = tf.concat((test_X, prediction_null), axis=0)
        prediction = model(value)
        prediction_null = tf.convert_to_tensor([prediction[len(prediction)-1]])
        resized = prediction * resize[i]
        predictions.append(resized[0])
    predictions = tf.convert_to_tensor(predictions)
    predictions = predictions + ((data[column][len(data[column])-1]) - predictions[0])
    plt.plot([x for x in range(61)], data[column][2007:])
    plt.plot([x for x in range(60, 60 + length, 1)], predictions)
    plt.title(data.columns[i])
    plt.savefig(f'figures/{column}.png')
    plt.close()
    if i==0:
        predictions = pd.DataFrame(predictions, columns=[column])
        predictions.to_csv('new_stonks.csv')
    else:
        new_file = pd.read_csv('new_stonks.csv', header=0, index_col=0)
        new_file[column] = predictions
        new_file.to_csv('new_stonks.csv')
    i+=1
