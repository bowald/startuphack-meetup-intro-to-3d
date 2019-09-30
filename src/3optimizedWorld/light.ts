import * as BABYLON from 'babylonjs'

export class Light {
    private scene: BABYLON.Scene

    constructor(scene: BABYLON.Scene) {
        this.scene = scene
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), this.scene)
    }
}
