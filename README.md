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
```

# case study: calculating statistics
The [calc-stats](https://github.com/danieljdufour/calc-stats) library calculates
statistics of an iterable of numbers.  It works on flat arrays or any iterable that
returns numbers.  It expects each call of next to return a number,
not an array of numbers (like a row).  By using flatIter we can calculate statistics
for a table of numbers (2-D arrays).

```js
// calculate statistics for 2-D Data
import calcStats from "calc-stats";

// new memory-safe way
const stats = calcStats(flatIter(data));

// old way, risking memory blowing up
const stats = calcStats(data.flat());
```