const assert = require('assert');

const sort = (array) => {
    var swapped = true;

    while(swapped) {
        swapped = false;

        for (i = 1; i < array.length; i++) {
            var a = array[i],
                b = array[i - 1];

            if (a < b) {
                array[i] = b;
                array[i - 1] = a;
                swapped = true;
            }
        }
    }

    return array;
};

assert.deepEqual(sort([1, -2, 3, 15]), [-2, 1, 3, 15]);
assert.deepEqual(sort([1, -2, -3, 4, 2]), [-3, -2, 1, 2, 4]);
