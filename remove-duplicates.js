const assert = require('assert');

const removeDuplicates = (input) => {
    const string = input.split('');

    for(i = 0; i < string.length; i++) {
        var idx = string.indexOf(string[i], i + 1);

        if (idx > -1) {
            string[idx] = '';
        }
    }

    return string.join('');
};

assert.equal(removeDuplicates('abcdeffga'), 'abcdefg');
