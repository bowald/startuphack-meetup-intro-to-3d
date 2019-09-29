import * as BABYLON from 'babylonjs'
import {Player} from './player'
import {World} from './world'

export class Game {
    private canvas: HTMLCanvasElement
    private engine: BABYLON.Engine
    private scene: BABYLON.Scene
    private player: Player
    private world: World

    constructor(canvasElement: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasElement)
        this.engine = new BABYLON.Engine(this.canvas)
        this.scene = new BABYLON.Scene(this.engine)
        this.player = new Player(this.scene)
        this.world = new World(this.scene)
    }

    public init(): void {
        this._setupEventListners()
        this.scene.clearColor = new BABYLON.Color4(0.95, 0.95, 0.95, 1)
        this.world.init(50, 50)
        this.player.init()
    }

    public run(): void {
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    private _setupEventListners() {
        window.addEventListener("resize", () => {
            this.engine.resize()
        })

        window.addEventListener('keypress', e => {
            if (e.keyCode === 13) {
                this.engine.enterFullscreen(true)
            }
        })

        // window.addEventListener("click", e => {
        //     // We try to pick an object
        //     console.log(e.which)
        //     const pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY)
        //     if (pickResult && pickResult.hit && pickResult.distance < 8 && pickResult.pickedMesh) {
        //         pickResult.pickedMesh.dispose()
        //     }
        // })
    }
}
