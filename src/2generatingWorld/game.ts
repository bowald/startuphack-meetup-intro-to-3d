import * as BABYLON from 'babylonjs'
import { Player } from './player'
import { World } from './world'
import { Light } from './light'

export class Game {
    private canvas: HTMLCanvasElement
    private engine: BABYLON.Engine
    private scene: BABYLON.Scene
    private player: Player
    private world: World
    private light: Light


    constructor(canvasElement: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasElement)
        this.engine = new BABYLON.Engine(this.canvas)
        this.scene = new BABYLON.Scene(this.engine)
        this.player = new Player(this.scene)
        this.world = new World(this.scene)
        this.light = new Light(this.scene)
    }

    public init(): void {
        this._setupEventListners()
        this.scene.clearColor.set(0.1529411764705882, 0.1568627450980392, 0.1333333333333333, 1)
        this.world.init()
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
    }
}
