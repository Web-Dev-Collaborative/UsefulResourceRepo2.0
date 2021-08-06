---
title: "Self Supervised Representation Learning in NLP"
date: 2020-05-23T16:53:30-04:00
last_modified_at: 2020-09-27T00:00-00:00
categories:
  - nlp
  - self-supervised-learning
tags:
  - pre-text tasks
classes: wide
excerpt: An overview of self-supervised pretext tasks in Natural Language Processing
header:
  og_image: /images/nlp-ssl.png
  teaser: "/images/nlp-ssl.png"
---

While Computer Vision is making [amazing progress](https://amitness.com/2020/02/illustrated-self-supervised-learning/) on self-supervised learning only in the last few years, self-supervised learning has been a first-class citizen in NLP research for quite a while. Language Models have existed since the 90's even before the phrase "self-supervised learning" was termed. The Word2Vec paper from 2013 popularized this paradigm and the field has rapidly progressed applying these self-supervised methods across many problems.

At the core of these self-supervised methods lies a framing called "**pretext task**" that allows us to use the data itself to generate labels and use supervised methods to solve unsupervised problems. These are also referred to as "**auxiliary task**" or "**pre-training task**". The representations learned by performing this task can be used as a starting point for our downstream supervised tasks.  
![Pipeline of pre-training and downstream tasks](/images/nlp-ssl.png){: .align-center}

In this post, I will provide an overview of the various pretext tasks that researchers have designed to learn representations from text corpus without explicit data labeling. The focus of the article will be on the task formulation rather than the architectures implementing them.

## Self-Supervised Formulations

## 1. Center Word Prediction

In this formulation, we take a small chunk of the text of a certain window size and our goal is to predict the center word given the surrounding words.

![Interactive example of center word prediction](/images/nlp-ssl-center-word-prediction.gif){: .align-center}

For example, in the below image, we have a window of size of one and so we have one word each on both sides of the center word. Using these neighboring words, we need to predict the center word.

![Relation of center word, window size and context word](/images/nlp-ssl-cbow-explained.png){: .align-center}

This formulation has been used in the famous "**Continuous Bag of Words**" approach of the [Word2Vec](https://arxiv.org/abs/1301.3781) paper.

## 2. Neighbor Word Prediction

In this formulation, we take a span of the text of a certain window size and our goal is to predict the surrounding words given the center word.

![Example of Neighbor Word Prediction](/images/nlp-ssl-neighbor-word-prediction.gif){: .align-center}

This formulation has been implemented in the famous "**skip-gram**" approach of the [Word2Vec](https://arxiv.org/abs/1301.3781) paper.

## 3. Neighbor Sentence Prediction

In this formulation, we take three consecutive sentences and design a task in which given the center sentence, we need to generate the previous sentence and the next sentence. It is similar to the previous skip-gram method but applied to sentences instead of words.

![Example of Neighbor Sentence Prediction](/images/nlp-ssl-neighbor-sentence.gif){: .align-center}

This formulation has been used in the [Skip-Thought Vectors](https://arxiv.org/abs/1506.06726) paper.

## 4. Auto-regressive Language Modeling

In this formulation, we take large corpus of unlabeled text and setup a task to predict the next word given the previous words. Since we already know what word should come next from the corpus, we don't need manually-annotated labels.

![Auto-Regressive Language Modeling](/images/nlp-ssl-causal-language-modeling.gif){: .align-center}

For example, we could setup the task as left-to-right language modeling by predicting <span style="color: #439f47;">next words</span> given the previous words.

![Predicting future word from past](/images/nlp-ssl-causal-language-modeling-steps.png){: .align-center}

We can also formulate this as predicting the <span style="color: #439f47;">previous words</span> given the future words. The direction will be from right to left.

![Right-to-left language modeling](/images/nlp-ssl-causal-rtl.png){: .align-center}

This formulation has been used in many papers ranging from n-gram models to neural network models such as [Neural Probabilistic Language Model](http://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf)(Bengio et al., 2003) to [GPT](https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf).

## 5. Masked Language Modeling

In this formulation, words in a text are randomly masked and the task is to predict them. Compared to the auto-regressive formulation, we can use context from both previous and next words when predicting the masked word.

![Masked Language Modeling](/images/nlp-ssl-masked-lm.png){: .align-center}

This formulation has been used in the [BERT](https://arxiv.org/abs/1810.04805), [RoBERTa](https://arxiv.org/abs/1907.11692) and [ALBERT](https://arxiv.org/abs/1909.11942) papers. Compared to the auto-regressive formulation, in this task, we predict only a small subset of masked words and so the amount of things learned from each sentence is lower.

## 6. Next Sentence Prediction

In this formulation, we take two consecutive sentences present in a document and another sentence from a random location in the same document or a different document.

![Next Sentence Prediction data preparation](/images/nlp-ssl-nsp-sampling.png){: .align-center}

Then, the task is to classify whether two sentences can come one after another or not.

![Next Sentence Prediction task](/images/nlp-ssl-next-sentence-prediction.png){: .align-center}

It was used in the [BERT](https://arxiv.org/abs/1810.04805) paper to improve performance on downstream tasks that requires an understanding of sentence relations such as Natural Language Inference(NLI) and Question Answering. However, later works have questioned its effectiveness.

## 7. Sentence Order Prediction

In this formulation, we take pairs of consecutive sentences from the document. Another pair is also created where the positions of the two sentences are interchanged.

![Sentence Order Prediction Text Sampling](/images/nlp-ssl-sop-sampling.png){: .align-center}

The goal is to classify if a pair of sentences are in the correct order or not.

![Example of Sentence Order Prediction](/images/nlp-ssl-sop-example.png){: .align-center}

It was used in the [ALBERT](https://arxiv.org/abs/1909.11942) paper to replace the "Next Sentence Prediction" task.

## 8. Sentence Permutation

In this formulation, we take a continuous span of text from the corpus and break the sentences present there. Then, the sentences positions are shuffled randomly and the task is to recover the original order of the sentences.

![Sentence Permutation Prediction](/images/nlp-ssl-sentence-permutation.gif){: .align-center}

It has been used in the [BART](https://arxiv.org/abs/1910.13461) paper as one of the pre-training tasks.

## 9. Document Rotation

In this formulation, a random token in the document is chosen as the rotation point. Then, the document is rotated such that this token becomes the starting word. The task is to recover the original sentence from this rotated version.

![Document Rotation Pre-training](/images/nlp-ssl-document-rotation.gif){: .align-center}

It has been used in the [BART](https://arxiv.org/abs/1910.13461) paper as one of the pre-training tasks. The intuition is that this will train the model to identify the start of a document.

## 10. Emoji Prediction

This formulation was used in the [DeepMoji](https://arxiv.org/abs/1708.00524) paper and exploits the idea that we use emoji to express the emotion of the thing we are tweeting. As shown below, we can use the emoji present in the tweet as the label and formulate a supervised task to predict the emoji when given the text.

![Emoji Prediction from Tweets](/images/nlp-ssl-deepmoji.gif){: .align-center}

Authors of [DeepMoji](https://arxiv.org/abs/1708.00524) used this concept to perform pre-training of a model on 1.2 billion tweets and then fine-tuned it on emotion-related downstream tasks like sentiment analysis, hate speech detection and insult detection.

## 11. Gap Sentence Generation

This pretext task was proposed in the [PEGASUS](https://arxiv.org/abs/1912.08777) paper. The pre-training task was specifically designed to improve performance on the downstream task of abstractive summarization.

The idea is to take a input document and mask the important sentences. Then, the model has to generate the missing sentences concatenated together.

![](/images/pegasus-pretext-task.gif){:.align-center}

Source: [Google AI Blog](https://ai.googleblog.com/2020/06/pegasus-state-of-art-model-for.html)
{: .text-center}

## References

- Ryan Kiros, et al. ["Skip-Thought Vectors"](https://arxiv.org/abs/1506.06726)
- Tomas Mikolov, et al. ["Efficient Estimation of Word Representations in Vector Space"](https://arxiv.org/abs/1301.3781)
- Alec Radford, et al. ["Improving Language Understanding by Generative Pre-Training"](https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf)
- Jacob Devlin, et al. ["BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"](https://arxiv.org/abs/1810.04805)
- Yinhan Liu, et al. ["RoBERTa: A Robustly Optimized BERT Pretraining Approach"](https://arxiv.org/abs/1907.11692)
- Zhenzhong Lan, et al. ["ALBERT: A Lite BERT for Self-supervised Learning of Language Representations"](https://arxiv.org/abs/1909.11942)
- Mike Lewis, et al. ["BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension"](https://arxiv.org/abs/1910.13461)
- Bjarke Felbo, et al. ["Using millions of emoji occurrences to learn any-domain representations for detecting sentiment, emotion and sarcasm"](https://arxiv.org/abs/1708.00524)
