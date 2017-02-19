const assert = require('assert');

const isAnagram = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }

    const aSorted = a.split('').sort().join(''),
        bSorted = b.split('').sort().join('');

    return aSorted === bSorted;
};

assert.equal(isAnagram('abc', 'aba'), false);

assert.equal(isAnagram('abc', 'cba'), true);

assert.equal(isAnagram('abcd', 'dcab'), true);
