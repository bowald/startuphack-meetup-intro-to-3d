import * as BABYLON from 'babylonjs'

export class World {
    private scene: BABYLON.Scene
    private dirtBlock: BABYLON.Mesh

    constructor(scene: BABYLON.Scene) {
        this.scene = scene
        this.dirtBlock = this.generateDirtBlock()
    }

    public init(width: number, depth: number): void {
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), this.scene)
        
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < depth; z++) {
                const block = this.dirtBlock.createInstance(`instance_${z + x * depth}`)
                block.position.set(x - Math.floor(width / 2), 0, z - Math.floor(depth / 2))
            }
        }
        
    }

    private generateDirtBlock(): BABYLON.Mesh {
        const options: any = {
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
