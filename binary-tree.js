const toTree = (array, index) => {
    if (index === undefined) {
        index = 0;
    }

    const val = array[index];

    if (val !== undefined) {
        return {
            val: val,
            left: toTree(array, 2 * index + 1),
            right: toTree(array, 2 * index + 2)
        };
    }

    return undefined;
};

const toArray = (node, array, index) => {
    if (index === undefined) {
        index = 0;
    }

    if (array === undefined) {
        array = [];
    }

    if (node === undefined) {
        return array;
    } else {
        array[index] = node.val;
    }

    if (node.left) {
        toArray(node.left, array, 2 * index + 1);
    }

    if (node.right) {
        toArray(node.right, array, 2 * index + 2);
    }

    return array;
};

console.log(toTree([0, 1, 2, 3, 4, 5, 6]));

console.log(toArray(toTree([0, 1, 2, 3, 4, 5, 6])));

module.exports = {
    toTree, toArray
};
