---
title: "Back Translation for Text Augmentation with Google Sheets"
date: 2020-02-19T16:13:30-04:00
last_modified_at: 2020-09-27T00:00-00:00
categories:
  - nlp
  - data augmentation
classes: wide
excerpt: Learn how to augment existing labeled text data for free using Google Sheets.
header:
  og_image: /images/backtranslation-en-fr.png
  teaser: /images/backtranslation-en-fr.png
---


When working on Natural Language Processing applications such as Text Classification, collecting enough labeled examples for each category manually can be difficult. In this article, I will go over an interesting technique to augment your existing text data automatically called back translation.

## Introduction to Back Translation
The key idea of back translation is very simple. We create augmented version of a sentence using the following steps:

1. You take the original text written in English  
2. You convert it into another language (say French) using Google Translate  
3. You convert the translated text back into English using Google Translate   
4. Keep the augmented text if the original text and the back-translated text are different. 

![Backtranslation with English and French](/images/backtranslation-en-fr.png){: .align-center}
Figure: Back Translation
{: .text-center}

## Using Back Translation in Google Sheets
We need a machine translation service to perform the translation to a different language and back to English. Google Translate is the most popular service for this purpose, but you need to get an API key to use it and it is a paid service. 

Luckily, Google provides a handy feature in their Google Sheets web app, which we can leverage for our purpose.

### Step 1: Load your data
Let's assume we are building a sentiment analysis model and our dataset has sentences and their associated labels. We can load it into Google Sheets by importing the Excel/CSV file directly.

![Loading Files in Google Sheets](/images/backtranslation-sheets-step-1.png){: .align-center}

## Step 2: Add a column to hold augmented data
Add a new column and use the `GOOGLETRANSLATE()` function to translate from English to French and back to English.

![Add column for translation](/images/backtranslation-sheets-step-2.png){: .align-center}

The command to place in the column is

```js
=GOOGLETRANSLATE(GOOGLETRANSLATE(A2, "en", "fr"), "fr", "en")
```

Once the command is placed, press Enter and you will see the translation.

![Run translation on cells](/images/backtranslation-sheets-step-2.2.png){: .align-center}

Now, select the first cell of "Backtranslated" column and drag the small square at the bottom right side below to apply this formula over the whole column 

![Drag translation to all cells](/images/backtranslation-sheets-step-2.3.png){: .align-center}

This should apply to all your training texts and you will get back the augmented version.

![Example of translated rows](/images/backtranslation-sheets-step-2.4.png){: .align-center}

## Step 3: Filter out duplicated data
For texts where the original text and what get back from `back translation` are the same, we can filter them out programmatically by comparing the original text column and the augmented column. Then, only keep responses that have `True` value in the `Changed` column.

![Filter out same translation](/images/backtranslation-sheets-step-3.2.png){: .align-center}

## Step 4: Export your data
You can download your data as a CSV file and augment your existing training data.

## Example Sheet
Here is a [Google Sheet](https://docs.google.com/spreadsheets/d/1pE9RAukrc4S9jf22RxVr_vEBqN9_DyZaRY8QQRek8Fs/edit#gid=2000059744) demonstrating all the four steps above. You can refer to that and make a copy of it to test things out.

## Conclusion
Back translation offers an interesting approach when you've small training data but want to improve the performance of your model.