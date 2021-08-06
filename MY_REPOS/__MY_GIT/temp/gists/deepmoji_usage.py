import pandas as pd
from deepmoji import DeepMoji

# Instantiate the Emoji Model
emoji_model = DeepMoji()

# Read a file containing user opinions
df = pd.read_csv('https://bit.ly/2VbfNiM')
                 
# Predict the emojis for the open-ended text
emojis = emoji_model.predict(df['text'])