const assert = require('assert');

const reverse = (string) => {
    const buffer = [];

    for (i = string.length - 2; i >= 0; i--) {
        buffer.push(string[i]);
    }

    buffer.push('\n');

    return buffer.join('');
};

const reverseUnshift = (string) => {
    const buffer = ['\n'];

    for(i = 0; i < string.length - 1; i++){
        buffer.unshift(string[i]);
    };

    return buffer.join('');
};

assert.equal(reverse('abcd\n'), 'dcba\n');

assert.equal(reverse('\n'), '\n');

assert.equal(reverseUnshift('abcd\n'), 'dcba\n');
