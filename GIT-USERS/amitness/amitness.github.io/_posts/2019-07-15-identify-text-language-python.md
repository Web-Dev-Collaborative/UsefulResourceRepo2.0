---
title: "Identify the Language of Text using Python"
date: 2019-07-15T10:44:30-04:00
last_modified_at: 2020-10-24T00:00:00-00:00
categories:
  - nlp
classes: wide
excerpt: Learn how to predict the language of a given piece of text using Natural Language Processing.
header:
  og_image: /images/google_translate_popup.png
  teaser: /images/google_translate_popup.png
---

Text Language Identification is the process of predicting the language of a given piece of text. You might have encountered it when Chrome shows a popup to translate a webpage when it detects that the content is not in English. Behind the scenes, Chrome is using a model to predict the language of text used on a webpage.

![Google Translate Popup on Chrome](/images/google_translate_popup.png){: .align-center}

When working with a dataset for NLP, the corpus may contain a mixed set of languages. Here, language identification can be useful to either filter out a few languages or to translate the corpus to a single language and then use it for your downstream tasks.

In this post, I will explain the working mechanism and usage of various language detection libraries.

## Facebook's Fasttext library

![Fasttext Logo](/images/fastText_logo.png){: .align-center}

[Fasttext](https://fasttext.cc/) is an open-source library in Python for word embeddings and text classification. It is built for production use cases rather than research and hence is optimized for performance and size. It extends the [Word2Vec](https://en.wikipedia.org/wiki/Word2vec) model with ideas such as using [subword information](https://arxiv.org/abs/1607.04606) and [model compression](https://arxiv.org/abs/1612.03651).

For our purpose of language identification, we can use the pre-trained fasttext language identification models. The model was trained on a dataset drawn from [Wikipedia](https://www.wikipedia.org/), [Tatoeba](https://tatoeba.org/eng/), and [SETimes](http://nlp.ffzg.hr/resources/corpora/setimes/). The basic idea is to prepare training data of (text, language) pairs and then train a classifier on it.

![Language Training Data Example](/images/lang_training_data.png){: .align-center}

The benchmark below shows that these pre-trained language detection models are better than [langid.py](https://github.com/saffsd/langid.py), another popular python language detection library. Fasttext has better accuracy and also the inference time is very fast. It supports a wide variety of languages including French, German, English, Spanish, Chinese.

![Benchmarks of Fasttext vs langid](/images/fasttext_benchmark.png){: .align-center}

## Using Fasttext for Language Detection

- Install the `Fasttext` library using pip.

```shell
pip install fasttext
```

- There are two versions of the pre-trained models. Choose the model which fits your memory and space requirements:

  - [lid.176.bin](https://dl.fbaipublicfiles.com/fasttext/supervised-models/lid.176.bin): faster and slightly more accurate but 126MB in size
  - [lid.176.ftz](https://dl.fbaipublicfiles.com/fasttext/supervised-models/lid.176.ftz): a compressed version of the model, with a file size of 917kB

- Download the pre-trained model from Fasttext to some location. You'll need to specify this location later in the code. In our example, we download it to the /tmp directory.

```
wget -O /tmp/lid.176.bin https://dl.fbaipublicfiles.com/fasttext/supervised-models/lid.176.bin
```

- Now, we import fasttext and then load the model from the pretrained path we downloaded earlier.

```python
import fasttext

PRETRAINED_MODEL_PATH = '/tmp/lid.176.bin'
model = fasttext.load_model(PRETRAINED_MODEL_PATH)
```

- Let's take an example sentence in French which means 'I eat food'. To detect language with fasttext, just pass a list of sentences to the predict function. The sentences should be in the UTF-8 format.

![French to English Translation Training Data](/images/french_to_english_translation.png)

```python
sentences = ['je mange de la nourriture']
predictions = model.predict(sentences)
print(predictions)

# ([['__label__fr']], array([[0.96568173]]))
```

- The model returns two tuples. One of them is an array of language labels and the other is the confidence for each sentence. Here `fr` is the `ISO 639` code for French. The model is 96.56% confident that the language is French.

- Fasttext returns the ISO code for the most probable one among the 170 languages. You can refer to the page on [ISO 639](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) codes to find language for each symbol.

```
af als am an ar arz as ast av az azb ba bar bcl be bg bh bn bo bpy br bs bxr ca cbk ce ceb ckb co cs cv cy da de diq dsb dty dv el eml en eo es et eu fa fi fr frr fy ga gd gl gn gom gu gv he hi hif hr hsb ht hu hy ia id ie ilo io is it ja jbo jv ka kk km kn ko krc ku kv kw ky la lb lez li lmo lo lrc lt lv mai mg mhr min mk ml mn mr mrj ms mt mwl my myv mzn nah nap nds ne new nl nn no oc or os pa pam pfl pl pms pnb ps pt qu rm ro ru rue sa sah sc scn sco sd sh si sk sl so sq sr su sv sw ta te tg th tk tl tr tt tyv ug uk ur uz vec vep vi vls vo wa war wuu xal xmf yi yo yue zh
```

- To programmatically convert language symbols back to the language name, you can use [pycountry](https://pypi.org/project/pycountry/) package. Install the package using pip.

```python
pip install pycountry
```

- Now, pass the symbol to pycountry and you will get back the language name.

```python
from pycountry import languages

lang_name = languages.get(alpha_2='fr').name
print(lang_name)
# french
```

## Google Compact Language Detector v3 (CLD3)

Google also provides a compact pretrained model for language identification called [cld3](https://github.com/google/cld3). It supports 107 languages.

To use it, first install `gcld3` from pip as:

```shell
pip install gcld3
```

After installation, you can initialize the model as shown below.

```python
import gcld3

detector = gcld3.NNetLanguageIdentifier(min_num_bytes=0,
                                        max_num_bytes=1000)
```

### Feature 1: Predict Single Language

Once loaded, the model can be used to predict the language of a text as shown below:

```python
text = "This text is written in English"
result = detector.FindLanguage(text=text)
```

From the returned result, you can get the language BCP-47 style language code. The mapping of code to language is available [here](https://github.com/google/cld3#supported-languages).

```python
print(result.language)
```

```python
'en'
```

You can also get the confidence of the model from the result.

```python
print(result.probability)
```

```python
0.9996357560157776
```

You can also get the reliability of the prediction from the result object.

```python
print(result.is_reliable)
```

```python
True
```

### Feature 2: Get the top-N predicted languages

Instead of predicting a single language, `gcld3` also provides a method to get confidence over multiple languages.

For example, we can get the top-2 predicted languages as:

```python
import gcld3

detector = gcld3.NNetLanguageIdentifier(min_num_bytes=0,
                                        max_num_bytes=1000)
text = "This text is written in English"
results = detector.FindTopNMostFreqLangs(text=text, num_langs=2)

for result in results:
    print(result.language, result.probability)
```

```python
en 0.9996357560157776
und 0.0
```

## Conclusion

Thus, we learned how pretrained models can be used for language detection in Python. This is very useful to filter out non-English responses in NLP projects and handle them.
