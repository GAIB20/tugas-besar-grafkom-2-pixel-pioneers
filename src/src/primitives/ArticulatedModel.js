import { Component } from "./Component.js";
import { Mesh } from "./Mesh.js";
import { Rig } from "./Rig.js";
import { PhongMaterial } from "../material/PhongMaterial.js";
import { BasicMaterial } from "../material/BasicMaterial.js";
import { BoxGeometry } from "../geometry/BoxGeometry.js";
import { Color } from "../primitives/Color";

export class ArticulatedModel extends Component {
  _rigs = {};
  _materials = {};

  addRig(...rigs) {
    rigs.forEach((rig) => {
      if (rig.getId() in this._rigs) {
        throw new Error(`Rig with id ${rig.getId()} already exists in model.`);
      }
      this._rigs[rig.getId()] = rig;
    });
    return this;
  }

  removeRig(rig) {
    delete this._rigs[rig.getId()];
  }

  get type() {
    return "ArticulatedModel";
  }

  getRigs() {
    return this._rigs;
  }

  getMaterials() {
    return this._materials;
  }

  getTree() {
    const traverse = (component) => {
      const data = {
        component,
        children: [],
      };
      if (component instanceof Rig || component instanceof Mesh) {
        component.getChildren().forEach((child) => {
          data.children.push(traverse(child));
        });
      }
      return data;
    };
    return traverse(this);
  }

  static getRigs(obj) {
    let rigs = {};
    obj.getChildren().forEach((child) => {
      rigs = {
        ...rigs,
        ...this.getRigs(child),
      };
      if (child instanceof Rig) {
        if (child.getId() in rigs)
          throw new Error(
            `Rig with id ${child.getId()} already exists in model.`
          );
        rigs[child.getId()] = child;
      }
    });
    return rigs;
  }

  static fromModel(modelDefinition, model = null, parent = null) {
    if (!model) model = new ArticulatedModel();
    Object.keys(modelDefinition).forEach((objName) => {
      let child = null;
      const md = modelDefinition[objName];
      if (objName[0] == "R") {
        child = new Rig(objName.substring(1));
        model.addRig(child);
      } else if (objName[0] == "P") {
        model._materials[objName] = [
          new BasicMaterial("Basic" + objName[0], new Color(0, 0, 0, 0.7)),
        ];
        child = new Mesh(
          new BoxGeometry(1, 1, 1),
          model._materials[objName][0]
        );
      } else {
        throw new Error(`Invalid object name ${objName}`);
      }
      child.name = objName;
      if (parent) parent.add(child);
      else model.add(child);
      if (md.options)
        Object.keys(md.options).forEach((optionName) => {
          child[optionName].set(...md.options[optionName]);
        });
      if (md.children) this.fromModel(md.children, model, child);
    });
    return model;
  }

  toJSON() {
    const data = super.toJSON();

    // Remove material information from mesh objects
    const trimMaterial = (obj) => {
      if (obj.type === "Mesh") {
        delete obj.material;
      }
      if (obj.children) {
        obj.children.forEach(trimMaterial);
      }
    };
    trimMaterial(data);

    return {
      ...data,
      rigs: Object.keys(this._rigs),
      materials: this._materials,
      type: "ArticulatedModel",
    };
  }

  static fromJSON(json, obj = null) {
    if (!obj) obj = new ArticulatedModel();
    super.fromJSON(json, obj);

    // Restore rigs
    const rigsTemp = this.getRigs(obj);
    json.rigs.forEach((rigId) => {
      if (!(rigId in rigsTemp)) {
        throw new Error(`Rig with id ${rigId} not found in model.`);
      }
      obj.addRig(rigsTemp[rigId]);
    });

    // Restore materials
    Object.entries(json.materials).forEach(([matName, mats]) => {
      obj._materials[matName] = mats.map(DeserializeMaterial);
    });

    // Attach materials to mesh objects
    const attachMaterial = (obj) => {
      if (obj.type === "Mesh") {
        obj.material = obj._materials[obj.name][0];
      }
      if (obj.children) {
        obj.children.forEach(attachMaterial);
      }
    };
    attachMaterial(obj);

    return obj;
  }
}
