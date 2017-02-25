const assert = require('assert');

const map = (list, fn) => {
    const results = [];

    for (i = 0; i < list.length; i++) {
        results.push(fn(list[i], i));
    }

    return results;
};

const filter = (list, fn) => {
    const results = [];

    for (i = 0; i < list.length; i++) {
        if (fn(list[i], i)) {
            results.push(list[i]);
        }
    }

    return results;
};

const reduce = (list, fn, acc) => {
    var start = 0;

    if (acc === undefined) {
        start = 1;
        acc = list[0];
    }

    for (i = start; i < list.length ; i++) {
        acc = fn(acc, list[i], i);
    }

    return acc;
};

assert.deepEqual(map(['a', 'b', 'c'], (s, idx) => s + idx), ['a0', 'b1', 'c2']);

assert.deepEqual(filter(['a', 'b', 'c'], (s, idx) => idx > 0), ['b', 'c']);

assert.deepEqual(filter(['a', 'b', , 'c'], (x) => x), ['a', 'b', 'c']);

assert.deepEqual(reduce(['a', 'b', 'c'], (acc, s) => acc + s, ''), 'abc');

assert.deepEqual(reduce([1, 2, 3], (acc, i) => acc + i, 6), 12);

assert.deepEqual(reduce([1, 2, 3], (acc, i) => acc + i), 6);
