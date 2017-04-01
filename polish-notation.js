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

    if (operation === undefined) {
        return allArgs;
    }

    if (args.length === 0) {
        return operation();
    }

    return args.reduce(operation);
};

const convertToStack = (str, f) => {
    const chars = str.split(' '),
        stack = [],
        hasTransformFunction = typeof(f) === 'function';

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

            if (hasTransformFunction) {
                var value = f(currentStack);
                currentStack = stack.shift();
                currentStack[currentStack.length - 1] = value;
            } else {
                currentStack = stack.shift();
            }
        } else {
            currentStack.push(char);
        }
    }

    if (level !== 0) {
        return;
    }

    if (hasTransformFunction) {
        return f(currentStack);
    }

    return currentStack;
};

const compute = (str) => {
    return convertToStack(str, f);
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

assert.deepEqual(compute('* 1 2 ( + 5 2 )'), 14);

assert.deepEqual(compute('* 1 2 ( + 5 2 ) -2'), -28);

assert.deepEqual(compute('( * 1 2 ( + 5 2 ) -2 )'), [-28]);

assert.deepEqual(compute('( )'), [[]]);
