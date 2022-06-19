import test from "flug";
import flatIter from "./index";

const data1D = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const data2D = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
const data3D = [
  [[1, 2], [3]],
  [[4, 5], [6]],
  [[7, 8], [9]]
];

const mixed = ["1", "a", 2, "B", 3, "c", ["4F", 5, ["J"]]];

test("simple iteration", ({ eq }) => {
  const results: any[] = [];
  const iter = flatIter(data1D);

  let it;
  while (((it = iter.next()), !it.done)) {
    results.push(it.value);
  }
  eq(results, data1D);
  eq(iter.next(), { done: true });
});

test("1-D iteration with higher max depth", ({ eq }) => {
  const results: any[] = [];
  const iter = flatIter(data1D, 10);
  let it;
  while (((it = iter.next()), !it.done)) {
    results.push(it.value);
  }
  eq(results, data1D);
  eq(iter.next(), { done: true });
});

test("2-D iteration", ({ eq }) => {
  const results: any[] = [];
  const iter = flatIter(data2D);
  let it;
  while (((it = iter.next()), !it.done)) {
    results.push(it.value);
  }
  eq(results, data1D);
  eq(iter.next(), { done: true });
});

test("3-D iteration with depth 0", ({ eq }) => {
  const results: any[] = [];
  const depth = 0;
  const iter = flatIter(data3D, depth);
  let it;
  while (((it = iter.next()), !it.done)) {
    results.push(it.value);
  }
  eq(results, data3D);
  eq(iter.next(), { done: true });
});

test("3-D iteration with depth 1", ({ eq }) => {
  const results: any[] = [];
  const depth = 1;
  const iter = flatIter(data3D, depth);
  let it;
  while (((it = iter.next()), !it.done)) {
    results.push(it.value);
  }
  eq(results, data3D.flat(1));
  eq(iter.next(), { done: true });
});

test("3-D iteration with depth 2", ({ eq }) => {
  const results: any[] = [];
  const depth = 2;
  const iter = flatIter(data3D, depth);
  let it;
  while (((it = iter.next()), !it.done)) {
    results.push(it.value);
  }
  eq(results, data1D);
  eq(iter.next(), { done: true });
});

test("mix of numbers and strings with default depth", ({ eq }) => {
  const results: any[] = [];
  const iter = flatIter(mixed);
  let it;
  while (((it = iter.next()), !it.done)) {
    results.push(it.value);
  }
  eq(results, ["1", "a", 2, "B", 3, "c", "4F", 5, ["J"]]);
  eq(iter.next(), { done: true });
});

test("mix of numbers and strings with depth 0", ({ eq }) => {
  const results: any[] = [];
  const iter = flatIter(mixed, 0);
  let it;
  while (((it = iter.next()), !it.done)) {
    results.push(it.value);
  }
  eq(results, mixed);
  eq(iter.next(), { done: true });
});

test("mix of numbers and strings with Infinity depth", ({ eq }) => {
  const results: any[] = [];
  const iter = flatIter(mixed, Infinity);
  let it;
  while (((it = iter.next()), !it.done)) {
    results.push(it.value);
  }
  eq(results, ["1", "a", 2, "B", 3, "c", "4F", 5, "J"]);
  eq(iter.next(), { done: true });
});
