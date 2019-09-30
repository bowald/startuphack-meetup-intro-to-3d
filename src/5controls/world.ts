import * as BABYLON from 'babylonjs'

export class World {
    private scene: BABYLON.Scene
    private WIDTH = 50
    private DEPTH = 50
    private dirtBlock: BABYLON.Mesh

    constructor(scene: BABYLON.Scene) {
        this.scene = scene
        this.dirtBlock = this.generateDirtBlock()
    }

    public init(): void {
        for (let x = 0; x < this.WIDTH; x++) {
            for (let z = 0; z < this.DEPTH; z++) {
                const block = this.dirtBlock.createInstance(`instance_${z + x * this.DEPTH}`)
                block.position.set(x - Math.floor(this.WIDTH / 2), 0, z - Math.floor(this.DEPTH / 2))
                block.checkCollisions = true
                this.setupBlockActions(block)
            }
        }
    }

    public setupBlockActions(block: BABYLON.AbstractMesh) {
        block.actionManager = new BABYLON.ActionManager(this.scene);
        block.actionManager.registerAction(this.leftPickAction())
        block.actionManager.registerAction(this.rightPickAction())
    }

    private leftPickAction(): BABYLON.ExecuteCodeAction {
        return new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, e => {
            const pickResult = this.scene.pick(e.pointerX, e.pointerY)
            if (pickResult && pickResult.hit && pickResult.distance < 8 && pickResult.pickedMesh) {
                pickResult.pickedMesh.dispose()
            }
        })
    }

    private rightPickAction(): BABYLON.ExecuteCodeAction {
        return new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, e => {
            const pickResult = this.scene.pick(e.pointerX, e.pointerY)
            if (pickResult && pickResult.hit && pickResult.distance < 8 && pickResult.pickedMesh) {
                const pickedNormal = pickResult.getNormal(true)
                if (pickedNormal) {
                    const newPosition = pickResult.pickedMesh.position.add(pickedNormal)
                    const block = this.dirtBlock.createInstance("")
                    block.checkCollisions = true
                    block.position = newPosition
                    this.setupBlockActions(block)
                }
            }
        })
    }

    private generateDirtBlock(): BABYLON.Mesh {
        const options = {
            faceUV: [
                new BABYLON.Vector4(0, 0, 0.5, 0.5), // side
                new BABYLON.Vector4(0, 0, 0.5, 0.5), // side
                new BABYLON.Vector4(0, 0, 0.5, 0.5), // side
                new BABYLON.Vector4(0, 0, 0.5, 0.5), // side
                new BABYLON.Vector4(0.5, 0, 1, 0.5), // top
                new BABYLON.Vector4(0, 0.5, 0.5, 1)], // bottom
            wrap: true,
            size: 1
        }

        const mesh = BABYLON.MeshBuilder.CreateBox('box', options, this.scene)
        const material = new BABYLON.PBRMetallicRoughnessMaterial("boxMat", this.scene)
        material.baseTexture = new BABYLON.Texture("/assets/dirtblock.png", this.scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        mesh.material = material
        mesh.isVisible = false
        return mesh
    }
}
