---
title: "A Visual Guide to Recurrent Layers in Keras"
date: 2020-04-23T02:22:30-04:00
categories:
  - nlp
  - tensorflow
classes: wide
excerpt: Understand how to use Recurrent Layers like RNN, GRU, and LSTM in Keras with diagrams
header:
  og_image: /images/rnn-default-keras.png
  teaser: /images/rnn-default-keras.png
---

Keras provides a powerful abstraction for recurrent layers such as RNN, GRU, and LSTM for Natural Language Processing. When I first started learning about them from the documentation, I couldn't clearly understand how to prepare input data shape, how various attributes of the layers affect the outputs, and how to compose these layers with the provided abstraction.

Having learned it through experimentation, I wanted to share my understanding of the API with visualizations so that it's helpful for anyone else having troubles.

## Single Output

Let's take a simple example of encoding the meaning of a whole sentence using an RNN layer in Keras.

![I am Groot Sentence](/images/i-am-groot-sentence.png){: .align-center}
Credits: Marvel Studios
{: .text-center}

To use this sentence in an RNN, we need to first convert it into numeric form. We could either use one-hot encoding, pretrained word vectors, or learn word embeddings from scratch. For simplicity, let's assume we used some word embedding to convert each word into 2 numbers.

![Embedding for I am Groot](/images/i-am-groot-embedding.png){: .align-center}

Now, to pass these words into an RNN, we treat each word as a time-step and the embedding as features. Let's build an RNN layer to pass these into

```python
model = Sequential()
model.add(SimpleRNN(4, input_shape=(3, 2)))
```

![How SimpleRNN works](/images/rnn-default-keras.png){: .align-center}
As seen above, here is what the various parameters means and why they were set as such:

- **input_shape=(<span style="color: #9e74b3;">3</span>, <span style="color: #5aa397;">2</span>)**:
  - We have <span style="color: #9e74b3;font-weight: bold;">3</span> words: <span style="color: #9e74b3;font-weight: bold;">I</span>, <span style="color: #9e74b3;font-weight: bold;">am</span>, <span style="color: #9e74b3;font-weight: bold;">groot</span>. So, number of time-steps is 3. The RNN block unfolds 3 times, and so we see 3 blocks in the figure.
  - For each word, we pass the <span style="color: #5aa397;font-weight: bold;">word embedding</span> of size <span style="color: #5aa397;font-weight: bold;">2</span> to the network.
- **SimpleRNN(<span style="color: #84b469;">4</span>, ...)**:
  - This means we have <span style="color: #84b469; font-weight: bold;">4 units</span> in the hidden layer.
  - So, in the figure, we see how a <span style="color: #84b469; font-weight: bold;">hidden state of size 4</span> is passed between the RNN blocks
  - For the first block, since there is no previous output, so previous hidden state is set to **[0, 0, 0, 0]**

Thus for a whole sentence, we get a vector of size 4 as output from the RNN layer as shown in the figure. You can verify this by printing the shape of the output from the layer.

```python
import tensorflow as tf
from tensorflow.keras.layers import SimpleRNN

x = tf.random.normal((1, 3, 2))

layer = SimpleRNN(4, input_shape=(3, 2))
output = layer(x)

print(output.shape)
# (1, 4)
```

As seen, we create a random batch of input data with 1 sentence having 3 words and each word having an embedding of size 2. After passing through the LSTM layer, we get back a representation of size 4 for that one sentence.

This can be combined with a Dense layer to build an architecture for something like sentiment analysis or text classification.

```python
model = Sequential()
model.add(SimpleRNN(4, input_shape=(3, 2)))
model.add(Dense(1))
```

## Multiple Output

Keras provides a `return_sequences` parameter to control output from the RNN cell. If we set it to `True`, what it means is that the output from each unfolded RNN cell is returned instead of only the last cell.

```python
model = Sequential()
model.add(SimpleRNN(4, input_shape=(3, 2),
                    return_sequences=True))
```

![Multiple output from SimpleRNN](/images/rnn-return-sequences.png){: .align-center}

As seen above, we get an <span style="color: #49a4aa; font-weight: bold;">output vector</span> of size <span style="color: #49a4aa; font-weight: bold;">4</span> for each word in the sentence.

This can be verified by the below code where we send one sentence with 3 words and embedding of size 2 for each word. As seen, the layer gives us back 3 outputs with a vector of size 4 for each word.

```python
import tensorflow as tf
from tensorflow.keras.layers import SimpleRNN

x = tf.random.normal((1, 3, 2))

layer = SimpleRNN(4, input_shape=(3, 2), return_sequences=True)
output = layer(x)

print(output.shape)
# (1, 3, 4)
```

## TimeDistributed Layer

Suppose we want to recognize entities in a text. For example, in our text "I am <span style="color: #4a820d;">Groot</span>", we want to identify <span style="color: #4a820d;">"Groot"</span> as a <span style="color: #4a820d;">name</span>.
![Identifying entity in text](/images/keras-groot-ner.png){: .align-center}

We have already seen how to get output for each word in the sentence in the previous section. Now, we need some way to apply classification on the output vector from the RNN cell on each word. For simple cases such as text classification, you know how we use the `Dense()` layer with `softmax` activation as the last layer.

Similar to that, we can apply <span style="color: #5fb9e0; font-weight: bold;">Dense()</span> layer on <span style="color: #49a4aa; font-weight: bold;">multiple outputs</span> from the RNN layer through a wrapper layer called TimeDistributed(). It will apply the <span style="color: #5fb9e0; font-weight: bold;">Dense</span> layer on <span style="color: #49a4aa; font-weight: bold;">each output</span> and give us class probability scores for the entities.

```python
model = Sequential()
model.add(SimpleRNN(4, input_shape=(3, 2),
                    return_sequences=True))
model.add(TimeDistributed(Dense(4, activation='softmax')))
```

![TimeDistributed Layer in Keras](/images/keras-time-distributed.png){: .align-center}

As seen, we take a 3 word sentence and classify output of RNN for each word into 4 classes using <span style="color: #5fb9e0; font-weight: bold;">Dense layer</span>. These classes can be the entities like name, person, location etc.

## Stacking Layers

We can also stack multiple recurrent layers one after another in Keras.

```python
model = Sequential()
model.add(SimpleRNN(4, input_shape=(3, 2), return_sequences=True))
model.add(SimpleRNN(4))
```

We can understand the behavior of the code with the following figure:

![Behavior of Stacked RNNs in Keras](/images/rnn-stacked.png){: .align-center}

<div class="notice--info">
<h4 class="no_toc">Insight: Why do we usually set return_sequences to True for all layers except the final?</h4> 
<br>
<p>
Since the second layer needs inputs from the first layer, we set return_sequence=True for the first SimpleRNN layer. For the second layer, we usually set it to False if we are going to just be doing text classification. If out task is NER prediction, we can set it to True in the final layer as well.
</p>
</div>

## References

- [Recurrent Layers - Keras Documentation](https://keras.io/layers/recurrent/)
