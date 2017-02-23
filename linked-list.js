const assert = require('assert');

const addNode = (i, node) => {
    if (node === undefined) {
        return {val: i};
    }

    if (node.next) {
        addNode(i, node.next);
    } else {
        node.next = {val: i};
    }

    return node;
};

assert.deepEqual(addNode(6, addNode(5)), {val: 5, next: {val: 6}});

const list = addNode(3, addNode(2, addNode(3, addNode(6, addNode(5)))));

const tail = (node, n, level) => {
    if (level === undefined) {
        level = 0;
    }

    if (level === n) {
        return node;
    }

    return tail(node.next, n, level + 1);
};

assert.deepEqual(tail(list, 2), {val: 3, next: {val: 2, next: {val: 3}}});

const deleteNodeInPlace = (node) => {
    node.val = node.next.val;
    node.next = node.next.next;
};

deleteNodeInPlace(list.next.next);
assert.deepEqual(list, {val: 5, next: {val: 6, next: {val: 2, next: {val: 3}}}});

const x = addNode(5, addNode(1, addNode(3)));
const y = addNode(2, addNode(9, addNode(5)));

const sum = (x, y, result) => {
    const xVal = x === undefined ? 0 : x.val,
        yVal = y === undefined ? 0 : y.val;

    const val = (xVal + yVal) % 10,
        overflow = xVal + yVal >= 10 ? 1 : 0;

    result = addNode(val, result);

    if (x.next) {
        if (overflow > 0) {
            x.next.val += overflow;
        }

        sum(x.next, y.next, result);
    } else if (x.next === undefined && y.next === undefined && overflow) {
        addNode({val: overflow}, result);
    }

    return result;
};

assert.deepEqual(sum(x, y), {val: 8, next: {val: 0, next: {val: 8}}});
