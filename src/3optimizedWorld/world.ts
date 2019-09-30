import * as BABYLON from 'babylonjs'

export class World {
    private scene: BABYLON.Scene
    private WIDTH = 1
    private DEPTH = 3
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
            }
        }
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
