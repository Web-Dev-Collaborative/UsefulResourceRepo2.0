Title: Finding Labeling Errors with Noisy Label Learning
Date: 2020-02-10 03:00
Modified: 2020-02-10 03:00
Category: nlp
Slug: noisy-label-learning
Summary: ...
Status: draft
Authors: Amit Chaudhary


```python
from cleanlab.latent_estimation import estimate_cv_predicted_probabilities
from cleanlab.pruning import get_noise_indices

# Find the indices of label errors in 2 lines of code.

# pred = pipeline.predict(x)
probabilities = estimate_cv_predicted_probabilities(
    pipeline.steps[0][1].transform(x), 
    np.array(y), 
    clf=pipeline.steps[1][1]
)
label_error_indices = get_noise_indices(
    s = np.array(y), 
    psx = probabilities, 
)
```

```python
from cleanlab.classification import LearningWithNoisyLabels

# Learning with noisy labels in 3 lines of code.

# Wrap around any classifier. Works with sklearn/pyTorch/Tensorflow/FastText/etc.
lnl = LearningWithNoisyLabels(clf=pipeline)
lnl.fit(X = np.array(x), s = np.array(y))
# Estimate the predictions you would have gotten by training with *no* label errors.
lnl.score(x, y)
```