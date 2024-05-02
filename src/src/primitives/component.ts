import { Vector3 } from "./vector3";
import { Matrix } from "./matrix";

export class Component {
    private _position: Vector3 = new Vector3();
    private _rotation: Vector3 = new Vector3();
    private _scale: Vector3 = new Vector3(1, 1, 1);
    private _localMatrix: Matrix = Matrix.identity();
    private _worldMatrix: Matrix = Matrix.identity();
    private _parent?: Component;
    private _children: Component[] = []
    visible=true


    // Public getter, prevent re-instance new object
    get position() { return this._position; }
    get rotation() { return this._rotation; }
    get scale() { return this._scale; }
    get parent() { return this._parent; }
    get localMatrix() { return this._localMatrix; }
    get worldMatrix() { return this._worldMatrix; }
    get children() { return this._children; }


    // Public setter
    // Should update world matrix if parent changed
    set parent(parent) {
        if (this._parent !== parent) {
            this._parent = parent;
            this.computeWorldMatrix(false, true);
        }
    }


    computeLocalMatrix() {
        this._localMatrix = Matrix.mul(
            Matrix.translation3d(this._position),
            Matrix.rotation3d(this._rotation),
            Matrix.scale3d(this._scale)
        );
    }


    computeWorldMatrix(updateParent=true, updateChildren=true) {
        // If updateParent, update world matrix of our ancestors
        // (.parent, .parent.parent, .parent.parent.parent, ...)
        if (updateParent && this.parent)
            this.parent.computeWorldMatrix(true, false);
        // Update this node
        this.computeLocalMatrix();
        if (this.parent) {
            this._worldMatrix = Matrix.mul(
                this.parent.worldMatrix,
                this._localMatrix
            );
        } else {
            this._worldMatrix = this._localMatrix.clone();
        }
        // If updateChildren, update our children
        // (.children, .children.children, .children.children.children, ...)
        if (updateChildren)
            for (let i = 0; i < this._children.length; i++)
                this._children[i].computeWorldMatrix(false, true);
    }
 
    /**
     * Tambah node sebagai child dari node ini.
     *
     * Jika node sudah memiliki parent, maka node akan
     * dilepas dari parentnya terlebih dahulu.
     */
    add(node: Component): Component {
        if (node.parent !== this) {
            node.removeFromParent();
            node.parent = this;
        }
        this.children.push(node);
        return this;
    }


    remove(node: Component): void {
        const index = this._children.indexOf(node);
        if (index !== -1) {
            this._children.splice(index, 1);
            node.parent = undefined;
        }
    }
    


    removeFromParent() {
        if (this.parent) this.parent.remove(this);
        return this;
    }
}
