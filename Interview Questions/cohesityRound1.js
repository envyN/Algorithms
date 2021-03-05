// Given a binary tree, serialize it so that the serialized form is of smallest possible size.
// Assume each node in tree is a single digit number.


class Node {
    value;
    left;
    right;

    constructor(value) {
        this.value = value;
    }
}

function serializeTree(rootNode) {
    let serialized = '';
    const queue    = rootNode ? [rootNode] : [];
    while (queue.length) {
        const pop = queue.shift();
        if (pop) {
            serialized += pop.value;
            queue.push(pop.left || null);
            queue.push(pop.right || null);
        } else {
            serialized += '*';
        }
    }
    return serialized || null;
}

function deserializeTree(serializedtreeString) {
    const nodeVals       = serializedtreeString ? serializedtreeString.split('') : [];
    let tree             = null;
    let unProcessedNodes = [];
    let currentNode      = null;
    if (nodeVals.length) {
        const pop   = nodeVals.shift();
        tree        = new Node(pop);
        currentNode = tree;
        while (currentNode) {
            const left  = nodeVals.shift();
            const right = nodeVals.shift();
            if (left === '*') {
                currentNode.left = null;
            } else {
                const ln         = new Node(left);
                currentNode.left = ln;
                unProcessedNodes.push(ln);
            }
            if (right === '*') {
                currentNode.right = null;
            } else {
                const rn          = new Node(right);
                currentNode.right = rn;
                unProcessedNodes.push(rn);
            }
            currentNode = unProcessedNodes.shift() || null;
        }
    }
    return tree;
}

const testCases = ['2*34***', null, '234****', '234*56*****'];
testCases.forEach((tc, index) => {
    const tree   = deserializeTree(tc);
    const result = tc === serializeTree(tree);
    console.log(`test case#${index + 1} : ${tc} : ${result ? 'PASSED' : '!!FAILED!!'}`, tree);
});
