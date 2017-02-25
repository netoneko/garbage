const assert = require('assert');

const fib = (n) => {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
};

assert.deepEqual(Array(9).fill().map((_, idx) => fib(idx)), [0, 1, 1, 2, 3, 5, 8, 13, 21]);
