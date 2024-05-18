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

  addRig(...rig) {
    if (rig.length > 1) {
      rig.forEach((rig) => {
        this.addRig(rig);
      });
      return this;
    }
    if (rig.length === 0) return this;

    const curRig = rig[0];
    if (curRig.getId() in this._rigs) {
      throw new Error(`Rig with id ${curRig.getId()} already exists in model.`);
    }
    this._rigs[curRig.getId()] = curRig;
    return this;
  }

  removeRig(rig) {
    if (rig.getId() in this._rigs) {
      delete this._rigs[rig.getId()];
    }
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
    function getComponentTree(children) {
      const components = {};
      children.forEach((child) =>
         {
        if (child instanceof Rig || child instanceof Mesh) {
          components[child.name] = {};
          components[child.name].children = getComponentTree(
            child.children
          );
          components[child.name].component = child;
        }
      });
      return components;
    }
    return getComponentTree(this.children);
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
}
