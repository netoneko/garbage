const assert = require('assert');

const list = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4
            }
        }
    }
};

const traverse = (list, n, level) => {
    if (level === undefined) {
        level = 0;
    }

    if (n === level) {
        return list;
    }

    return list.next ? traverse(list.next, n, level + 1) : undefined;
};

const isLooped = (list) => {
    for (i = 0, j = 1; true; i++, j += 2) {
        var firstTraversal = traverse(list, i),
            secondTraversal = traverse(list, j);

        if (!firstTraversal || !secondTraversal) {
            return false;
        } else if (firstTraversal.val === secondTraversal.val) {

            break;
        }
    }

    return true;
};

assert.equal(isLooped(list), false);

list.next.next.next.next = list;

assert.equal(isLooped(list), true);

delete list.next.next.next.next;

assert.equal(isLooped(list), false);
