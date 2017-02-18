const {toArray, toTree} = require('./binary-tree');

const widthFirstSearch = (node, path, queue) => {
    if (path === undefined) {
        path = [];
    }

    if (queue === undefined) {
        queue = [];
    }

    if (node === undefined) {
        return;
    }

    path.push(node.val);

    queue.push(node.right, node.left);

    for(;n = queue.shift();) {
        widthFirstSearch(n, path, queue);
    }

    return path;
};

const tree = toTree([0, 1, 2, 3, 4, 5, 6]);

console.log(widthFirstSearch(tree));
