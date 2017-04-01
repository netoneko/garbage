const assert = require('assert');

const increment = (acc, value) => {
    return acc + value;
};

const mulpiply = (acc, value) => {
    return acc * value;
};

const substract = (acc, value) => {
    return acc - value;
};

const divide = (acc, value) => {
    return acc / value;
};

const operations = {
    '+': increment,
    '*': mulpiply,
    '-': substract,
    '/': divide
};

const f = (allArgs) => {
    var operation = operations[allArgs[0]],
        args = allArgs.slice(1).map((x) => parseInt(x, 10));

    return args.reduce(operation);
};

const compute = (str) => {
    return f(str.split(' '));
};

assert.deepEqual(compute('+ 2 3'), 5);

assert.deepEqual(compute('+ 2 3 10'), 15);

assert.deepEqual(compute('- 2 3 -10'), 9);

assert.deepEqual(compute('* 2 3'), 6);

assert.deepEqual(compute('/ 1 0'), Infinity);
