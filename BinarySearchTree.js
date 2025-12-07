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
      preNode = preNode.right
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
      root.left = this.delete(root.left, predecessor.value)
    }
    return root
  }
  find(root, value) {
    if (root === null) {
      return null
    }

    if (root.value === value) {
      //console.log(root.value)
      return root
    }

    if (root.value > value) {
      return this.find(root.left, value)
    } else {
      return this.find(root.right, value)
    }
    // console.log(root);
  }
  levelOrderForEach(callback, root) {
    if (root === null) {
      return
    }
    let queue = []
    queue.push(root)
    while (queue.length > 0) {
      let frontNode = queue.shift()
      callback(frontNode.value)
      if (frontNode.left !== null) {
        queue.push(frontNode.left)
      }
      if (frontNode.right !== null) {
        queue.push(frontNode.right)
      }
    }
  }

  levelOrderForEachRecursion(callback, queue = [this.root]) {
    if (queue.length === 0) {
      return
    }
    let frontNode = queue.shift()
    callback(frontNode.value)
    if (frontNode.left !== null) {
      queue.push(frontNode.left)
    }
    if (frontNode.right !== null) {
      queue.push(frontNode.right)
    }
    this.levelOrderForEachRecursion(callback, queue)
  }

  preOrder(callback, root = this.root) {
    if (root === null) {
      return
    }
    callback(root.value)
    this.preOrder(callback, root.left)
    this.preOrder(callback, root.right)
  }

  inOrder(callback, root = this.root) {
    if (root === null) {
      return
    }

    this.inOrder(callback, root.left)
    callback(root.value)
    this.inOrder(callback, root.right)
  }

  postOrder(callback, root = this.root) {
    if (root === null) {
      return
    }
    this.postOrder(callback, root.left)

    this.postOrder(callback, root.right)
    callback(root.value)
  }

  depth(root, value, count = 0) {
    if (root === null) {
      return null
    }
    if (root.value === value) {
      return count
    }
    if (value < root.value) {
      return this.depth(root.left, value, count + 1)
    } else if (value > root.value) {
      return this.depth(root.right, value, count + 1)
    }
  }
  findHeight(root) {
    if(root === null) {
      return -1
    }

    let leftHeight = this.findHeight(root.left)+1
    let rightHeight = this.findHeight(root.right)+1
    // console.log(leftHeight);
    
    return Math.max(leftHeight, rightHeight)

  }

  height(root, value) {
    if (root === null) {
      return null
    }
    if(value<root.value) {
      return this.height(root.left, value)
    }else if(value > root.value) {
      return this.height(root.right, value)
    }
    
    return this.findHeight(root)
    
  }

}

const tree = new Tree([1, 2, 3, 4, 5, 6, 9])

tree.insert(tree.root, 11)
// let findRoot = tree.find(tree.root, 2)
// console.log(findRoot)

tree.postOrder((value) => {
  // console.log(value)
})

// tree.preOrder((value) => console.log(value), tree.root)
// tree.delete(tree.root, 3)

console.log(tree.height(tree.root, 11))
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
