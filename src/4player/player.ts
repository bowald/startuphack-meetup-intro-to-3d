import * as BABYLON from 'babylonjs'

export class Player {
    public camera: BABYLON.UniversalCamera
    private scene: BABYLON.Scene
    private canvas: any

    constructor(scene: BABYLON.Scene) {
        this.scene = scene
        this.canvas = scene.getEngine().getRenderingCanvas()
        this.camera = new BABYLON.UniversalCamera('player_camera', new BABYLON.Vector3(0, 2.5, 0), this.scene)
        this.camera.attachControl(this.canvas, true)
        this.camera.minZ = 0.05
        this.camera.fov = Math.PI / (Math.PI + Math.E)

        // FPS camera specific attribs
        this.scene.gravity = new BABYLON.Vector3(0, -9.81, 0)
        this.scene.collisionsEnabled = true

        this.camera.applyGravity = true
        this.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        this.camera.checkCollisions = true
        this.camera.speed = 0.25
    }

    public init(): void { }
}
