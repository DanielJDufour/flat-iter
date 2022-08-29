export default function flatIter(data: any, depth?: number): { next: () => { value: any, done: false } | { done: true, value: undefined } };
export function flatIter(data: any, depth?: number): { next: () => { value: any, done: false } | { done: true, value: undefined } };
