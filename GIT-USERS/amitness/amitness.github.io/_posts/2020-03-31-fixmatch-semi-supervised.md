---
title: "The Illustrated FixMatch for Semi-Supervised Learning"
date: 2020-03-31T10:00:30-04:00
last_modified_at: 2020-10-21T00:00:00-00:00
categories:
  - semi-supervised-learning
classes: wide
excerpt: Learn how to leverage unlabeled data using FixMatch for semi-supervised learning
header:
  og_image: /images/fixmatch-pipeline.png
  teaser: /images/fixmatch-pipeline.png
---

Deep Learning has shown very promising results in the area of Computer Vision. But when applying it to practical domains such as medical imaging, lack of labeled data is a major hurdle.

In practical settings, labeling data is a time consuming and expensive process. Though, you have a lot of images, only a small portion of them can be labeled due to resource constraints. In such settings, we could wonder:

> How can we leverage the remaining unlabeled images along with the labeled images to improve the performance of our model

The answer lies in a field called semi-supervised learning. FixMatch is a recent semi-supervised approach by _Sohn et al._ from Google Brain that improved the state of the art in semi-supervised learning(SSL). It is a simpler combination of previous methods such as UDA and ReMixMatch.

In this post, we will understand FixMatch and also see how it got 78% median accuracy and 84% maximum accuracy on CIFAR-10 with just 10 labeled images.

## Intuition behind FixMatch

Suppose we're doing a cat vs dog classification where we have limited labeled data and a lot of unlabelled images of cats and dogs.

![Example of Labeled vs Unlabeled Images](/images/fixmatch-labeled-vs-unlabeled.png){: .align-center}

Our usual _supervised learning_ approach would be to just train a classifier on labeled images and ignore the unlabelled images.

![Usual Supervised Learning Approach](/images/fixmatch-supervised-part.png){: .align-center}

We know that a model should be able to handle perturbations of an image to improve generalization. So, instead of ignoring unlabeled images, we could instead apply the below approach:

> What if we create augmented versions of unlabeled images and make the supervised model predict those images. Since it's the same image, the predicted labels should be the same for both.

![Concept of FixMatch](/images/fixmatch-unlabeled-augment-concept.png){: .align-center}

Thus, even without knowing their correct labels, we can use the unlabeled images as a part of our training pipeline. This is the core idea behind FixMatch and many preceding papers it builds upon.

## The FixMatch Pipeline

With the intuition clear, let's see how FixMatch is applied in practice. The overall pipeline is summarized by the following figure:

![End to End Pipeline of FixMatch paper](/images/fixmatch-pipeline.png){: .align-center}

**Synopsis:**

As seen, we train a supervised model on our labeled images with cross-entropy loss. For each unlabeled image, <span style="color:#97621f">weak augmentation</span> and <span style="color: #3fb536">strong augmentations</span> are applied to get two images. The <span style="color:#97621f;">weakly augmented image</span> is passed to our model and we get prediction over classes.

The probability for the most confident class is compared to a <span style="color: #CC0066">threshold</span>. If it is above the <span style="color: #CC0066">threshold</span>, then we take that class as the ground label i.e. <span style="color: #b35ae0;">pseudo-label</span>. Then, the <span style="color: #3fb536">strongly augmented</span> image is passed through our model to get a prediction over classes. This <span style="color: #56a2f3;">probability distribution</span> is compared to ground truth <span style="color: #b35ae0;">pseudo-label</span> using cross-entropy loss. Both the losses are combined and the model is tuned.

## Pipeline Components

### 1. Training Data and Augmentation

FixMatch borrows this idea from UDA and ReMixMatch to apply different augmentation i.e weak augmentation on unlabeled image for the pseudo-label generation and strong augmentation on unlabeled image for prediction.

**a. Weak Augmentation**  
For weak augmentation, the paper uses a standard flip-and-shift strategy. It includes two simple augmentations:

- **Random Horizontal Flip**

  ![Example of Random Horizontal Flip](/images/fixmatch-horizontal-flip-gif){: .align-center}

  This augmentation is applied with a probability of 50%. This is skipped for the SVHN dataset since those images contain digits for which horizontal flip is not relevant. In PyTorch, this can be performed using [transforms](https://pytorch.org/docs/stable/torchvision/transforms.html) as:

  ```python
  from PIL import Image
  import torchvision.transforms as transforms

  im = Image.open('dog.png')
  weak_im = transforms.RandomHorizontalFlip(p=0.5)(im)
  ```

- **Random Vertical and Horizontal Translation**

  ![Example of Random Vertical and Horizontal Translation](/images/fixmatch-translate.gif){: .align-center}

  This augmentation is applied up to 12.5%. In PyTorch, this can be implemented using the following code where 32 is the size of the image needed:

  ```python
  import torchvision.transforms as transforms
  from PIL import Image

  im = Image.open('dog.png')
  resized_im = transforms.Resize(32)(im)
  translated = transforms.RandomCrop(size=32,
                                     padding=int(32*0.125),
                                     padding_mode='reflect')(resized_im)
  ```

**b. Strong Augmentation**

These include augmentations that output heavily distorted versions of the input images. FixMatch applies either RandAugment or CTAugment and then applies CutOut augmentation.

**1. Cutout**

This augmentation randomly removes a square part of the image and fills it with gray or black color.

![Example of Cutout Augmentation](/images/fixmatch-cutout.gif){: .align-center}

PyTorch doesn't have a built-in implementation of Cutout but we can reuse its `RandomErasing` transformation to apply the CutOut effect.

```python
import torch
import torchvision.transforms as transforms

# Image of 520*520
im = torch.rand(3, 520, 520)

# Fill cutout with gray color
gray_code = 127

# ratio=(1, 1) to set aspect ratio of square
# p=1 means probability is 1, so always apply cutout
# scale=(0.01, 0.01) means we want to get cutout of 1% of image area
# Hence: Cuts out gray square of 52*52
cutout_im = transforms.RandomErasing(p=1,
                                     ratio=(1, 1),
                                     scale=(0.01, 0.01),
                                     value=gray_code)(im)
```

**2. AutoAugment Variants**

Previous SSL work used _AutoAugment_, which trained a Reinforcement Learning algorithm to find augmentations that leads to the best accuracy on a proxy task(e.g. CIFAR-10). This is problematic since we require some labeled dataset to learn the augmentation and also due to resource requirements associated with RL.

So, FixMatch uses one among two variants of AutoAugment:

**a. RandAugment**  
The idea of Random Augmentation(RandAugment) is very simple.

- First, you have a list of 14 possible augmentations with a range of their possible magnitudes.

![Pool of Augmentations in RandAugment](/images/fixmatch-randaug-pool.png){: .align-center}

- You select random N augmentations from this list. Here, we are selecting any two from the list.

![Random Selection of Augmentations in RandAugment](/images/fixmatch-randaug-random-N.png){: .align-center}

- Then you select a random magnitude M ranging from 1 to 10. We can select a magnitude of 5. This means a magnitude of 50% in terms of percentage as maximum possible M is 10 and so percentage = 5/10 = 50%.

![Random Magnitude Selection in RandAugment](/images/fixmatch-randaug-mag-calculation.png){: .align-center}

- Now, the selected augmentations are applied to an image in the sequence. Each augmentation has a 50% probability of being applied.

![Applying RandAugment to Images](/images/fixmatch-randaugment-sequence.png){: .align-center}

- The values of N and M can be found by hyper-parameter optimization on a validation set with a grid search. In the paper, they use random magnitude from a pre-defined range at each training step instead of a fixed magnitude.

![Grid Search to Find Optimal Configuration in RandAugment](/images/fixmatch-randaugment-grid-search.png){: .align-center}

**b. CTAugment**  
CTAugment was an augmentation technique introduced in the ReMixMatch paper and uses ideas from control theory to remove the need for Reinforcement Learning in AutoAugment. Here's how it works:

- We have a set of 18 possible transformations similar to RandAugment
- Magnitude values for transformations are divided into bins and each bin is assigned a weight. Initially, all bins weigh 1.
- Now two transformations are selected at random with equal chances from this set and their sequence forms a pipeline. This is similar to RandAugment.
- For each transformation, a magnitude bin is selected randomly with a probability according to the normalized bin weights
- Now, a labeled example is augmented with these two transformations and passed to the model to get a prediction
- Based on how close the model predictions were to the actual label, the magnitude bins weights for these transformations are updated.
- Thus, it learns to choose augmentations that the model has a high chance to predict a correct label and thus augmentation that fall within the network tolerance.

> Thus, we see that unlike RandAugment, CTAugment can learn magnitude for each transformation dynamically during training. So, we don't need to optimize it on some supervised proxy task and it has no sensitive hyperparameters to optimize.

Thus, this is very suitable for the semi-supervised setting where labeled data is scarce.

### 2. Model Architecture

The paper uses wider and shallower variants of ResNet called [Wide Residual Networks](https://arxiv.org/abs/1605.07146) as the base architecture.

The exact variant used is Wide-Resnet-28-2 with a depth of 28 and a widening factor of 2. This model is two times wider than the ResNet. It has a total of 1.5 million parameters. The model is stacked with an output layer with nodes equal to the number of classes needed(e.g. 2 classes for cat/dog classification).

### 3. Model Training and Loss Function

- **Step 1: Preparing batches**

  We prepare batches of the labeled images of size B and unlabeled images of batch size $$\color{#774cc3}{\mu} B$$. Here $$\color{#774cc3}{\mu}$$ is a hyperparameter that decides the relative size of labeled: unlabeled images in a batch. For example, $$\color{#774cc3}{\mu}=2$$ means that we use twice the number of unlabeled images compared to labeled images.

  ![Ratio of Labeled to Unlabeled Images](/images/fixmatch-batch-sizes.png){: .align-center}

  The paper tried increasing values of $$\color{#774cc3}{\mu}$$ and found that as we increased the number of unlabeled images, the error rate decreases. The paper uses $$\color{#774cc3}{\mu} = 7$$ for evaluation datasets.

  ![Impact of increasing unlabeled data on error rate](/images/fixmatch-effect-of-mu.png){: .align-center}
    <p class="text-center">Source: FixMatch paper</p>

- **Step 2: Supervised Learning**  
  For the supervised part of the pipeline which is trained on <span style="color: #8c5914">labeled image</span>s, we use the regular <span style="color:#9A0007">cross-entropy loss H()</span> for classification task. The total loss for a batch is defined by $$l_s$$ and is calculated by taking average of <span style="color:#9A0007">cross-entropy loss</span> for <span style="color: #8c5914">each image</span> in the batch.

      ![Supervised Part of FixMatch](/images/fixmatch-supervised-loss.png){: .align-center}

      $$
      l_s = \frac{1}{B} \sum_{b=1}^{B} \color{#9A0007}{H(}\ \color{#7ead16}{p_{b}}, \color{#5CABFD}{p_{m}(}\ y\ | \color{#FF8A50}{\alpha(} \color{#8c5914}{x_b}  \color{#FF8A50}{)}\ \color{#5CABFD}{)} \color{#9A0007}{)}
      $$

- **Step 3: Pseudolabeling**  
  For the unlabeled images, first we apply <span style="color: #8C5914">weak augmentation</span> to the <span style="color: #007C91">unlabeled image</span> and get the <span style="color: #866694">highest predicted class</span> by applying <span style="color: #48A999">argmax</span>. This is the <span style="color: #866694">pseudo-label</span> that will be compared with output of model on strongly augmented image.

      ![Generating Pseudolabels in FixMatch](/images/fixmatch-pseudolabel.png){: .align-center}

      $$
      \color{#5CABFD}{q_b} = p_m(y | \color{#8C5914}{\alpha(} \color{#007C91}{u_b} \color{#8C5914}{)} )
      $$

      $$
      \color{#866694}{\hat{q_b}} = \color{#48A999}{argmax(}\color{#5CABFD}{q_b} \color{48A999}{)}
      $$

- **Step 4: Consistency Regularization**  
  Now, the same <span style="color: #007C91">unlabeled image</span> is <span style="color: #25561F">strongly augmented</span> and it's output is compared to our <span style="color: #866694">pseudolabel</span> to compute <span style="color: #9A0007;">cross-entropy loss H()</span>. The total unlabeled batch loss is denoted by $$l_u$$ and given by:

      ![Consistency Regularization in FixMatch](/images/fixmatch-strong-aug-loss.png){: .align-center}

      $$
      l_u = \frac{1}{\mu B} \sum_{b=1}^{\mu B} 1(max(q_b) >= \color{#d11e77}{\tau})\ \color{#9A0007}{H(} \color{#866694}{\hat{q_b}}, p_m(y | \color{#25561F}{A(} \color{#007C91}{u_b} \color{#25561F}{)} \ \color{#9A0007}{)}
      $$

      Here $$\color{#d11e77}{\tau}$$ denotes the <span style="color: #d11e77;">threshold</span> above which we take a pseudo-label. This loss is similar to the pseudo-labeling loss. The difference is that we're using weak augmentation to generate labels and strong augmentation for loss.

- **Step 5: Curriculum Learning**  
  We finally combine these two losses to get a total loss that we optimize to improve our model. $$\lambda_u$$ is a fixed scalar hyperparameter that decides how much both the unlabeled image loss contribute relative to the labeled loss.

      $$
      loss = l_s + \lambda_u l_u
      $$

      An interesting result comes from $$\lambda_u$$. Previous works have shown that increasing weight during training is good. But, in FixMatch, this is present in the algorithm itself.

      Since initially, the model is not confident on labeled data, so its output predictions on unlabeled data will be below the threshold. As such, the model will be trained only on labeled data. But as the training progress, the model becomes more confident in labeled data and as such, predictions on unlabeled data will also start to cross the threshold. As such, the loss will soon start incorporating predictions on unlabeled images as well. This gives us a free form of curriculum learning.

      ![Free Curriculum Learning in FixMatch](/images/fixmatch-curriculum-learning.png){: .align-center}

      Intuitively, this is similar to how we're taught in childhood. In the early years, we learn easy concepts such as alphabets and what they represent before moving on to complex topics like word formation, sentence formation, and then essays.

## Paper Insights

## Q. Can we learn with just one image per class?

The authors performed a really interesting experiment on the CIFAR-10 dataset. They trained a model on CIFAR-10 using only 10 labeled images i.e. 1 labeled example of each class.

- They created 4 datasets by randomly selecting 1 example per class from the dataset and trained on each dataset 4 times. They reached a test accuracy between 48.58% to 85.32% with a median accuracy of 64.28%. This variability in the accuracy was caused due to the quality of labeled examples. It is difficult for a model to learn each class effectively when provided with low-quality examples.
  ![Learning with just 1 image per class](/images/fixmatch-1-label-example.png){: .align-center}
- To test this, they created 8 training datasets with examples ranging from most representative to the least representative. They followed the ordering from [Carlini et al.](https://arxiv.org/abs/1910.13427) and created 8 buckets. The first bucket would contain the most representative images while the last bucket would contain outliers. Then, they took one example of each class randomly from each bucket to create 8 labeled training sets and trained the FixMatch model. Results were:
  - **Most representative bucket**: 78% median accuracy with a maximum accuracy of 84%
  - **Middle bucket**: 65% accuracy
  - **Outlier bucket**: Fails to converge completely with only 10% accuracy

## Evaluation and Results

The authors ran evaluations on datasets commonly used for SSL such as CIFAR-10, CIFAR-100, SVHN, STL-10, and ImageNet.

- **CIFAR-10 and SVHN:**  
  FixMatch achieves the state of the art results on CIFAR-10 and SVHN benchmarks. They use 5 different folds for each dataset.

      ![FixMatch SOTA on CIFAR-10 and SVHN](/images/fixmatch-cifar-10-svhn.png){: .align-center}

- **CIFAR-100**  
  On CIFAR-100, ReMixMatch is a bit superior to FixMatch. To understand why the authors borrowed various components from ReMixMatch to FixMatch and measured their impact on performance.

      ![ReMixMatch is better than FixMatch on CIFAR-100](/images/fixmatch-cifar-100.png){: .align-center}

      They found that the *Distribution Alignment(DA)* component which encourages the model to emit all classes with equal probability was the cause. So, when they combined FixMatch with DA, they achieved a 40.14% error rate compared to a 44.28% error rate of ReMixMatch.

- **STL-10:**  
  STL-10 dataset consists of 100,000 unlabeled images and 5000 labeled images. We need to predict 10 classes(airplane, bird, car, cat, deer, dog, horse, monkey, ship, truck.). It is a more representative evaluation for semi-supervised learning because its unlabeled set has out-of-distribution images.

      ![FixMatch gets SOTA on STL-10 dataset](/images/fixmatch-stl-10.png){: .align-center}

      FixMatch achieves the lowest error rate with CTAugment when evaluated on 5-folds of 1000 labeled images each among all methods.

- **ImageNet**  
  The authors also evaluate the model on ImageNet to verify if it works on large and complex datasets. They take 10% of the training data as labeled images and all remaining 90% as unlabeled. Also, the architecture used is ResNet-50 instead of WideResNet and RandAugment is used as a strong augmentation.

      They achieve a top-1 error rate of $$28.54\pm0.52%$$ which is $$2.68\%$$ better than UDA. The top-5 error rate is $$10.87\pm0.28\%$$.

## Code Implementation

The official implementation of FixMatch in Tensorflow by the paper authors is available [here](https://github.com/google-research/fixmatch).

Unofficial implementations of FixMatch paper in PyTorch are available on GitHub ([first](https://github.com/kekmodel/FixMatch-pytorch), [second](https://github.com/CoinCheung/fixmatch), [third](https://github.com/valencebond/FixMatch_pytorch)). They use RandAugment and are evaluated on CIFAR-10 and CIFAR-100.

The paper is available here: [FixMatch on Arxiv](https://arxiv.org/abs/2001.07685).

## Citation Info (BibTex)

If you found this blog post useful, please consider citing it as:

```
@misc{chaudhary2020fixmatch,
  title   = {The Illustrated FixMatch for Semi-Supervised Learning},
  author  = {Amit Chaudhary},
  year    = 2020,
  note    = {\url{https://amitness.com/2020/03/illustrated-fixmatch}}
}
```

## References

- [FixMatch: Simplifying Semi-Supervised Learning with Consistency and Confidence](https://arxiv.org/abs/2001.07685)
- [ReMixMatch: Semi-Supervised Learning with Distribution Alignment and Augmentation Anchoring](https://arxiv.org/abs/1911.09785)
- [Unsupervised data augmentation for consistency training](https://arxiv.org/abs/1904.12848)
- [Mixmatch: A holistic approach to semi-supervised learning](https://arxiv.org/abs/1905.02249)
- [RandAugment: Practical automated data augmentation with a reduced search space](https://arxiv.org/abs/1909.13719)
- [Improved Regularization of Convolutional Neural Networks with Cutout](https://arxiv.org/abs/1708.04552)
