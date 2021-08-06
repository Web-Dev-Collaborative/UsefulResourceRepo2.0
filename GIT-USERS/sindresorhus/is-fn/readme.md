# is-fn

> Check if a value is a function

In Node.js, just use `typeof fn` which works exactly the same. This module can be useful in the browser where `typeof fn` has a myriad of [bugs](https://github.com/lodash/lodash/blob/8f621b38bfc67f64a9bf7af347e3398477790a39/lodash.js#L8171-L8173).

## Install

```
$ npm install is-fn
```

## Usage

```js
import isFunction from 'is-fn';

isFunction(() => {});
//=> true

isFunction('unicorn');
//=> false
```

## Related

- [@sindresorhus/is](https://github.com/sindresorhus/is) - Type check values
