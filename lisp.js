const assert = require('assert');

const increment = (acc, value) => {
    if (value === undefined) {
        value = 1;
    }

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
    '/': divide,
    'inc': increment
};

const parsePrimitives = (input) => {
    const int = parseInt(input, 10);
    return int || input;
};

const f = (allArgs) => {
    var op = allArgs[0],
        operation, args,
        isFn = op === 'map';

    if (isMap) {
        allArgs.shift();
        op = allArgs[0];
    }

    operation = operations[op];
    args = allArgs.slice(1).map(parsePrimitives);

    if (operation === undefined) {
        return allArgs;
    }

    if (args.length === 1) {
        return operation(args[0]);
    } else if (args.length === 0) {
        return operation();
    }

    return isMap ? args.map((x) => operation(x)) : args.reduce(operation);
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

assert.deepEqual(compute('( inc 1 2 )'), [3]);

assert.deepEqual(compute('inc 1'), 2);

assert.deepEqual(compute('map inc 1 2'), [2, 3]);
