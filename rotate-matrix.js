const assert = require('assert');

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const rotate = (data) => {
    const result = [];

    for (i = data.length - 1; i >= 0; i--) {
        const row = [];

        for (j = 0; j < data.length; j++) {
            row.push(data[j][i]);
        }

        result.push(row);
    }

    return result;
};

assert.deepEqual(rotate(matrix), [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7]
]);
