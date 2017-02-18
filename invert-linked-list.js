const assert = require('assert');

const createList = () => {
    const a = {
            val: 1
        },
        b = {
            val: 2
        },
        c = {
            val: 3
        },
        d = {
            val: 4
        };

    a.next = b;
    b.next = c;
    c.next = d;

    return a;
};

const printList = (list) => {
    if (list === undefined) {
        return;
    }

    console.log(list.val);

    return printList(list.next);
};

const toArray = (list, array) => {
    if (array === undefined) {
        array = [];
    }

    if (list === undefined) {
        return array;
    }

    if (list.val) {
        array.push(list.val);
    }

    return toArray(list.next, array);
};

const invertList = (list, prevList) => {
    if (list === undefined) {
        return prevList;
    }

    const oldNext = list.next;
    list.next = prevList;

    return invertList(oldNext, list);
};

assert.deepEqual(toArray(createList()), toArray(createList()), 'Check equality of arrays');

assert.deepEqual(toArray(createList()), [1, 2, 3, 4], 'Check specific array');

console.log(toArray(createList()));
console.log(toArray(invertList(createList())));

assert.deepEqual(toArray(invertList(createList())), [4, 3, 2, 1], 'Check inverted list');
