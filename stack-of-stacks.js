const assert = require('assert');

const stackOfStacks = () => {
    const stacks = [
            []
        ],
        MAX_ELEMENTS = 3;

    const cleanUp = (stack, idx) => {
        if (stack && stack.length === 0 && stacks.length > 1) {
            stacks.splice(idx, 1);
        }
    };

    /**
    ** Here we go from deep elements to shallow, which makes no
    ** sense, but I am to tired to fix it
    **/
    const popAt = (idx) => {
        const stack = stacks[idx],
            val = stack ? stack.pop() : undefined;

        cleanUp(stack, idx);

        return val;
    };

    const push = (val) => {
        const stack = stacks[stacks.length - 1];

        if (stack.length === MAX_ELEMENTS) {
            stacks.push([val]);
            return (stacks.length - 1) * MAX_ELEMENTS + 1;
        }

        return (stacks.length - 1) * MAX_ELEMENTS + stack.push(val);
    };

    return {
        push,
        popAt,
        pop: () => popAt(stacks.length - 1),
        stacks: () => stacks
    };
};

const stack = stackOfStacks();
Array(11).fill().forEach((_, idx) => stack.push(idx));

assert.deepEqual(stack.stacks(), [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 9, 10 ] ])

assert.deepEqual(stack.pop(), 10);

assert.deepEqual(stack.pop(), 9);

assert.deepEqual(stack.stacks(), [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ]]);

assert.deepEqual(stack.popAt(1), 5);

assert.deepEqual(stack.stacks(), [ [ 0, 1, 2 ], [ 3, 4 ], [ 6, 7, 8 ]])

stack.popAt(0);
stack.popAt(0);
stack.popAt(0);

assert.deepEqual(stack.popAt(0), 4);

assert.deepEqual(stack.stacks(), [[3], [ 6, 7, 8 ]])
