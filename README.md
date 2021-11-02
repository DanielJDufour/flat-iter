# flat-iter
Deeply Iterate over Arrays.  Like calling `array.flat()[Symbol.iterator]()`, but without the memory cost.

## what's wrong with flat()?
There's nothing "wrong" with flat for most cases, but if you have a really large array of numbers, running flat() will create a new array
potentially greatly increasing your memory consumption and crashing your application.

# what's the solution?
Create an iterator that iterates over a nested array's values one by one without creating a new array.

# install
```bash
npm install flat-iter
```

# usage
```js
import flatIter from "flat-iter";

const data = [
  [123, 342, 452, 533, ...],
  [1263, 432, 234, 542, ...]
];

const iterator = flatIter(data, depth);

// get max of all the values
// while barely increasing memory cost
import fastMax from "fast-max";
const result = fastMax(iterator);
```


