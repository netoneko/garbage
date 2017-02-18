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

const addNode = (root, val, node) => {
    if (node === undefined) {
        node = root;
    }

    if (node.val > val) {
        node.left ? addNode(root, val, node.left) : (node.left = {val});
    } else if (node.val < val) {
        node.right ? addNode(root, val, node.right) : (node.right = {val});
    }

    return root;
};

const removeNode = (root, val, node, parent, direction) => {
    if (node === undefined) {
        node = root;
    }

    if (node.val === val) {
        const oldLeft = node.left,
            oldRight = node.right;

        delete parent[direction];

        /**
        * Dirty hack
        **/
        const subtree = toArray(node);
        subtree.shift();
        subtree.sort().forEach((i) => {
            addNode(parent, i);
        });
    } else if (node.val > val) {
        removeNode(root, val, node.left, node, 'left');
    } else if (node.val < val) {
        removeNode(root, val, node.right, node, 'right');
    }

    return root;
};

console.log(toTree([0, 1, 2, 3, 4, 5, 6]));

console.log(toArray(toTree([0, 1, 2, 3, 4, 5, 6])));

const tree = toTree([0]);
addNode(tree, 7);
addNode(tree, 5);
addNode(tree, 12);
addNode(tree, -9);
addNode(tree, -22);
addNode(tree, -3);

/**
      0
  -9     7
-22 -3  5 12
**/
console.log(tree);

removeNode(tree, -9);
removeNode(tree, 5);

/**
      0
  -22     7
-3         12
**/
console.log(tree);

module.exports = {
    toTree, toArray
};
