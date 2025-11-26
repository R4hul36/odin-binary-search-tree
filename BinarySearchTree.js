class Node {
  constructor(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr)
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    // console.log(start, end)

    if (start > end) {
      return null
    }
    let mid = Math.floor((start + end) / 2)
    // console.log(mid)

    let rootNode = new Node(arr[mid])

    rootNode.left = this.buildTree(arr, start, mid - 1)
    rootNode.right = this.buildTree(arr, mid + 1, end)
    // console.log(rootNode)
    return rootNode
  }
}

const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 22])

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return
  }
  if (node.right !== null) {
    //console.log(node.right, 'rightt')
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}

console.log(prettyPrint(tree.root))
