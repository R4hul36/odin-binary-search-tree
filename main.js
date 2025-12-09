import { Tree } from "./BinarySearchTree.js";

// const tree = new Tree([1, 2, 3, 4, 5, 6, 9])

// tree.insert(tree.root, 11)
// tree.insert(tree.root, 12)
// let findRoot = tree.find(tree.root, 2)
// console.log(findRoot)

// tree.postOrder((value) => {
//   // console.log(value)
// })


// tree.delete(tree.root, 3)

// console.log(tree.isBalanced(tree.root))
// tree.rebalance()

// console.log(tree.height(tree.root, 11))

function createArray() {
    let newArr = []
    for(let i =0; i<10; i++) {
        newArr.push(Math.floor(Math.random()*100))
    }
    const newSet = new Set(newArr)
    return [...newSet]
}

// console.log(createArray());


const tree = new Tree(createArray())

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return
  }

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}

console.log(prettyPrint(tree.root))