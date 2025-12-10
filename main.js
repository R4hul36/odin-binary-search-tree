import { Tree } from "./BinarySearchTree.js";

function createRandomArr (size) {
  let arr = []
  for(let i =0; i<size; i++) {
    arr.push(Math.floor(Math.random()*100))
  }
  return arr.sort()
}

const tree = new Tree(createRandomArr(10))
console.log(tree.isBalanced(tree.root))

// tree.levelOrderForEach((value) => console.log(value)
// , tree.root)

process.stdout.write("Pre-order: ")
tree.preOrder((value)=> process.stdout.write(`${value.toString()}, `), tree.root)
console.log("\n");

process.stdout.write("In-order: ")
tree.inOrder((value)=> process.stdout.write(`${value.toString()}, `), tree.root)
console.log("\n");

process.stdout.write("Post-order: ")
tree.postOrder((value)=> process.stdout.write(`${value.toString()}, `), tree.root)
console.log("\n");


tree.insert(tree.root, 111)
tree.insert(tree.root, 113)
tree.insert(tree.root, 115)
tree.insert(tree.root, 135)
tree.insert(tree.root, 151)


console.log(tree.isBalanced(tree.root))

tree.rebalance()


console.log(tree.isBalanced(tree.root))

process.stdout.write("Pre-order: ")
tree.preOrder((value)=> process.stdout.write(`${value.toString()}, `), tree.root)
console.log("\n");

process.stdout.write("In-order: ")
tree.inOrder((value)=> process.stdout.write(`${value.toString()}, `), tree.root)
console.log("\n");

process.stdout.write("Post-order: ")
tree.postOrder((value)=> process.stdout.write(`${value.toString()}, `), tree.root)
console.log("\n");


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