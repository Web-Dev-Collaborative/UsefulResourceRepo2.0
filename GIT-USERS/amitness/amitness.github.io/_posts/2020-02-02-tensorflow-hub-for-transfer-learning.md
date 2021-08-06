---
title: "Transfer Learning in NLP with Tensorflow Hub and Keras"
date: 2020-02-02T19:00:30-04:00
categories:
  - nlp
  - tensorflow
classes: wide
excerpt: Learn how to integrate and finetune tensorflow-hub modules in Tensorflow 2.0
header:
  og_image: /images/clickbait-or-not-illustration.png
  teaser: "/images/clickbait-or-not-illustration.png"
---

Tensorflow 2.0 introduced Keras as the default high-level API to build models. Combined with pretrained models from Tensorflow Hub, it provides a dead-simple way for transfer learning in NLP to create good models out of the box.

![Clickbait Title Illustration](/images/clickbait-or-not-illustration.png){: .align-center}

To illustrate the process, let's take an example of classifying if the title of an article is clickbait or not.

## Data Preparation

We will use the dataset from the paper ['Stop Clickbait: Detecting and Preventing Clickbaits in Online News Media'](https://people.mpi-sws.org/~achakrab/papers/chakraborty_clickbait_asonam16.pdf) available [here](https://github.com/bhargaviparanjape/clickbait).

Since the goal of this article is to illustrate transfer learning, we will directly load an already pre-processed dataset into a pandas dataframe.

```python
import pandas as pd
df = pd.read_csv('http://bit.ly/clickbait-data')
```

The dataset consists of page titles and labels. The label is 1 if the title is clickbait.

![Rows of training data for clickbait detection](/images/clickbait-pandas-dataframe.png){: .align-center}

Let's split the data into 70% training data and 30% validation data.

```python
from sklearn.model_selection import train_test_split

x_train, x_test, y_train, y_test = train_test_split(df['title'],
                                                    df['label'],
                                                    test_size=0.3,
                                                    stratify=df['label'],
                                                    random_state=42)
```

## Model Architecture

Now, we install tensorflow and tensorflow-hub using pip.

```bash
pip install tensorflow-hub
pip install tensorflow==2.1.0
```

To use text data as features for models, we need to convert it into a numeric form. Tensorflow Hub provides various [modules](https://tfhub.dev/s?module-type=text-embedding&q=tf2) for converting the sentences into embeddings such as BERT, NNLM and Wikiwords.

Universal Sentence Encoder is one of the popular module for generating sentence embeddings. It gives back a 512 fixed-size vector for the text.
Below is an example of how we can use tensorflow hub to capture embeddings for the sentence "Hello World".

![Universal Sentence Encoder applied on Hello World](/images/use-on-hello-world.png){: .align-center}

```python
import tensorflow_hub as hub

encoder = hub.load('https://tfhub.dev/google/universal-sentence-encoder/4')
encoder(['Hello World'])
```

![Universal Sentence Encodings Output](/images/use-output.png){: .align-center}

In Tensorflow 2.0, using these embeddings in our models is a piece of cake thanks to the new [hub.KerasLayer](https://www.tensorflow.org/hub/api_docs/python/hub/KerasLayer) module. Let's design a tf.keras model for the binary classification task of clickbait detection.

First import the required libraries.

```python
import tensorflow as tf
import tensorflow_hub as hub
```

Then, we create a sequential model that will encapsulate our layers.

```python
model = tf.keras.models.Sequential()
```

The first layer will be a hub.KerasLayer from where we can loading models available at [tfhub.dev](https://tfhub.dev/). We will be loading [Universal Sentence Encoder](https://tfhub.dev/google/universal-sentence-encoder/4).

```python
model.add(hub.KerasLayer('https://tfhub.dev/google/universal-sentence-encoder/4',
                        input_shape=[],
                        dtype=tf.string,
                        trainable=True))
```

Here are what the different parameters used mean:

- `/4`: It denotes the variant of Universal Sentence Encoder on hub. We're using the `Deep Averaging Network (DAN)` variant. We also have [Transformer architecture](https://tfhub.dev/google/universal-sentence-encoder-large/5) and other [variants](https://tfhub.dev/google/collections/universal-sentence-encoder/1).
- `input_shape=[]`: Since our data has no features but the text itself, so there feature dimension is empty.
- `dtype=tf.string`: Since we'll be passing raw text itself to the model
- `trainable=True`: Denotes whether we want to finetune USE or not. We set it to True, the embeddings present in USE are finetuned based on our downstream task.

Next, we add a Dense layer with single node to output probability of clickbait between 0 and 1.

```python
model.add(tf.keras.layers.Dense(1, activation='sigmoid'))
```

In summary, we have a model that takes text data, projects it into 512-dimension embedding and passed that through a feedforward neural network with sigmoid activation to give a clickbait probability.

![Keras Model Architecture for Clickbait Detection](/images/clickbait-keras-model.png){: .align-center}

Alternatively, we can implement the exact above architecture using the tf.keras functional API as well.

```python
x = tf.keras.layers.Input(shape=[], dtype=tf.string)
y = hub.KerasLayer('https://tfhub.dev/google/universal-sentence-encoder/4',
                    trainable=True)(x)
z = tf.keras.layers.Dense(1, activation='sigmoid')(y)
model = tf.keras.models.Model(x, z)
```

The output of the model summary is

```python
model.summary()
```

![Model summary from Keras model](/images/clickbait-model-summary.png){: .align-center}

The number of trainable parameters is `256,798,337` because we're finetuning Universal Sentence Encoder.

## Training the model

Since we're performing a binary classification task, we use a binary cross entropy loss along with ADAM optimizer and accuracy as the metric.

```python
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])
```

Now, let's train the model for

```python
model.fit(x_train,
          y_train,
          epochs=2,
          validation_data=(x_test, y_test))
```

We reach a training accuracy of 99.62% and validation accuracy of 98.46% with only 2 epochs.

## Inference

Let's test the model on a few examples.

```python
# Clickbait
>> model.predict(["21 Pictures That Will Make You Feel Like You're 99 Years Old"])
array([[0.9997924]], dtype=float32)

# Not Clickbait
>> model.predict(['Google announces TensorFlow 2.0'])
array([[0.00022611]], dtype=float32)
```

## Conclusion

Thus, with a combination of Tensorflow Hub and tf.keras, we can leverage transfer learning easily and build high-performance models for any of our downstream tasks.

## Data Credits

`Abhijnan Chakraborty, Bhargavi Paranjape, Sourya Kakarla, and Niloy Ganguly. "Stop Clickbait: Detecting and Preventing Clickbaits in Online News Media”. In Proceedings of the 2016 IEEE/ACM International Conference on Advances in Social Networks Analysis and Mining (ASONAM), San Fransisco, US, August 2016`
