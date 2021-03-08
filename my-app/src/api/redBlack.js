class Node {
    constructor(data, left=null, right=null, parent=null, color='red', offset=0, key = 0) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.color = color;
        this.offset = offset;
        this.key = key;
    }
}

export default class Tree {
    constructor() {
        this.root = null;
        this.sentinel = new Node(null, this.sentinel, this.sentinel, this.sentinel, "black", 0, 0);
        this.sentinel.parent = this.sentinel;
        this.sentinel.left = this.sentinel;
        this.sentinel.right = this.sentinel;
        this.ledger = [];
        this.count = 0;
    }

    insert(data) {
        let new_node;
        if (this.root !== null) {
            new_node = this._put(data, this.root);
            this._rb_insert_fixup(new_node);
        } else {
            this.root = new Node(data, this.sentinel, this.sentinel, this.sentinel, 'red', 0, this.count);
            this.count++;
            new_node = this.root;
            this._rb_insert_fixup(new_node);
        }
        return new_node;
    }

    _put(data, current_node) {
        let new_node;
        if (data < current_node.data) {
            if (current_node.left !== this.sentinel) {
                new_node = this._put(data, current_node.left);
            } else {
                new_node = new Node(data, this.sentinel, this.sentinel, current_node, 'red', 0, this.count);
                this.count++;
                current_node.left = new_node;
            }
        } else {
            if (current_node.right !== this.sentinel) {
                new_node = this._put(data, current_node.right);
            } else {
                new_node = new Node(data, this.sentinel, this.sentinel, current_node, 'red', 0, this.count);
                this.count++;
                current_node.right = new_node;
            }
        }
        return new_node;
    }

    _rb_insert_fixup(z) {
        
        while (z.parent.color === 'red') {
            
            if (z.parent === z.parent.parent.left) {
                let y = z.parent.parent.right;
                
                if (y.color === 'red') {
                    
                    z.parent.color = 'black';
                    y.color = 'black';
                    z.parent.parent.color = 'red';
                    z = z.parent.parent;
                } else if (z === z.parent.right) {
                    
                    z = z.parent;
                    this.left_rotate(z);
                } else {
                    
                    z.parent.color = 'black';
                    z.parent.parent.color = 'red';
                    this.right_rotate(z.parent.parent);
                }
            } else {
                
                let y = z.parent.parent.left;
                if (y.color === 'red') {
                    
                    z.parent.color = 'black';
                    y.color ='black';
                    z.parent.parent.color = 'red';
                    z = z.parent.parent;
                } else if (z === z.parent.left) {
                    
                    z = z.parent;
                    this.right_rotate(z);
                } else {
                    
                    z.parent.color = 'black';
                    z.parent.parent.color = 'red';
                    this.left_rotate(z.parent.parent);
                }
            }
        }
        this.root.color = 'black';
    }

    left_rotate(current_node) {
        let child = current_node.right;
        current_node.right = child.left;
        if (child.left !== this.sentinel) {
            child.left.parent = current_node;
        }
        child.parent = current_node.parent;
        if (current_node.parent === this.sentinel) {
            this.root = child;
        } else if (current_node === current_node.parent.left) {
            current_node.parent.left = child;
        } else {
            current_node.parent.right = child;
        }
        child.left = current_node;
        current_node.parent = child;
    }

    right_rotate(current_node) {
        let child = current_node.left;
        current_node.left = child.right;
        if (child.right !== this.sentinel) {
            child.right.parent = current_node;
        }
        child.parent = current_node.parent;
        if (current_node.parent === this.sentinel) {
            this.root = child;
        } else if (current_node === current_node.parent.left) {
            current_node.parent.left = child;
        } else {
            current_node.parent.right = child;
        }
        child.right = current_node;
        current_node.parent = child;
    }

    inorder(in_node) {
        if (in_node !== this.sentinel) {
            in_node.offset = in_node.parent.offset + 80;
            this.inorder(in_node.left);
            this.ledger.push({ value: in_node.data, color: in_node.color, offset: in_node.offset, key: in_node.key})
            this.inorder(in_node.right);
        }
    }

    traverse() {
        this.ledger = [];
        this.inorder(this.root);
        return this.ledger;
    }
}