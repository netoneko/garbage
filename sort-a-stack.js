const assert = require('assert');

const stack = () => {
    const data = [];

    return {
        push: (val) => data.push(val),
        peek: () => data[data.length - 1],
        pop: () => data.pop(),
        isEmpty: () => data.length === 0,
        data: data
    };
};

const insertSorted = (s, val) => {
    const temp = stack();
    var inserted = false;

    while(!s.isEmpty()) {
        if (val > s.peek()) {
            s.push(val);
            inserted = true;
            break;
        } else {
            temp.push(s.pop());
        }
    }

    if (!inserted) {
        s.push(val);
    }

    while(!temp.isEmpty()) {
        s.push(temp.pop());
    }

    return s;
};

const sort = (s) => {
    const results = stack();

    while(!s.isEmpty()) {
        var val = s.pop();

        while (!results.isEmpty() && results.peek() > val) {
            s.push(results.pop());
        }

        results.push(val);
    }

    return results;
};

const s = stack();
s.push(3);
s.push(2);
s.push(8);
s.push(-1);

assert.deepEqual(s.data, [3, 2, 8, -1]);

const y = stack();
insertSorted(y, 1);
insertSorted(y, -1);
insertSorted(y, 3);

assert.deepEqual(y.data, [-1, 1, 3]);
assert.deepEqual(sort(s).data, [-1, 2, 3, 8]);
