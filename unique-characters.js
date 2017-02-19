const assert = require('assert');

const isUnique = (string) => {
    const buffer = Array(127).fill(0)

    for (i = 0; i < string.length; i++) {
        buffer[string.charCodeAt(i)]++;

        if (buffer[string.charCodeAt(i)] > 1) {
            return false;
        }
    }

    return true;
};

assert.equal(isUnique('abc'), true);

assert.equal(isUnique('aab'), false);

assert.equal(isUnique('aba'), false);
