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

    console.log(allArgs)

    return args.reduce(operation);
};

const convertToStack = (str, f) => {
    const chars = str.split(' '),
        stack = [];

    var level = 0,
        currentStack = [];

    for (i = 0; i < chars.length; i++) {
        var char = chars[i];

        if (char === '(') {
            level++;

            var newCurrentStack = [];
            currentStack.push(newCurrentStack);
            stack.unshift(currentStack);
            currentStack = newCurrentStack;
        } else if (char === ')') {
            level--;

            currentStack = stack.shift();
        } else {
            currentStack.push(char);
        }
    }

    if (level !== 0) {
        return;
    }

    return currentStack;
};

const compute = (str) => {
    return f(str.split(' '));
};

assert.deepEqual(compute('+ 2 3'), 5);

assert.deepEqual(compute('+ 2 3 10'), 15);

assert.deepEqual(compute('- 2 3 -10'), 9);

assert.deepEqual(compute('* 2 3'), 6);

assert.deepEqual(compute('/ 1 0'), Infinity);

assert.deepEqual(convertToStack('1 0'), ['1', '0']);

assert.deepEqual(convertToStack('( 1 0 )'), [['1', '0']]);

assert.deepEqual(convertToStack('( 1 0 ( 2 3 ) )'), [['1', '0', ['2', '3']]]);

assert.deepEqual(convertToStack('( 1 0 ( 2 3 ) 7 )'), [['1', '0', ['2', '3'], '7']]);

// assert.deepEqual(convertToStack('* 1 2 ( + 5 1 )', f), 14);

//assert.deepEqual(convertToStack('(2 (1 0))'), [2, [1, 0]]);
