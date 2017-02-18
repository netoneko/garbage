const {toArray, toTree} = require('./binary-tree');

const depthFirstSearch = (node, path) => {
    if (path === undefined) {
        path = [];
    }

    if (node === undefined) {
        return;
    }

    path.push(node.val);

    if (node.right) {
        depthFirstSearch(node.right, path);
    }

    if (node.left) {
        depthFirstSearch(node.left, path);
    }

    return path;
};

const tree = toTree([0, 1, 2, 3, 4, 5, 6]);

console.log(depthFirstSearch(tree));
