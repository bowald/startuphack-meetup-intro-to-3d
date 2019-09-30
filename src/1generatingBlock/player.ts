import * as BABYLON from 'babylonjs'

export class Player {
    public camera: BABYLON.ArcRotateCamera
    private scene: BABYLON.Scene
    private canvas: any

    constructor(scene: BABYLON.Scene) {
        this.scene = scene
        this.canvas = scene.getEngine().getRenderingCanvas()
        this.camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 0), this.scene)
        this.camera.attachControl(this.canvas, true)
        this.camera.position = new BABYLON.Vector3(3,1,2)
        this.camera.wheelPrecision = 20
    }
}
