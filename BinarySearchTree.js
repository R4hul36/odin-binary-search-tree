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

  insert(root, value) {
    if (root === null) {
      return new Node(value)
    }

    if (value < root.value) {
      root.left = this.insert(root.left, value)
    } else {
      root.right = this.insert(root.right, value)
    }

    return root
  }

  getPredecessor(preNode) {
    preNode = preNode.left
    while (preNode !== null && preNode.right !== null) {
      preNode = preNode.left
    }
    return preNode
  }

  delete(root, value) {
    if (root === null) {
      return root
    }
    if (root.value > value) {
      root.left = this.delete(root.left, value)
    } else if (root.value < value) {
      root.right = this.delete(root.right, value)
    } else {
      if (root.left === null) {
        return root.right
      }
      if (root.right === null) {
        return root.left
      }
      const predecessor = this.getPredecessor(root)
      root.value = predecessor.value
      root.left = delete (root.left, predecessor.value)
    }
    return root
  }
}

const tree = new Tree([1, 2, 3, 4, 5, 6, 9])

tree.insert(tree.root, 11)

// tree.delete(tree.root, 2)
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
