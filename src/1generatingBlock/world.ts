import * as BABYLON from 'babylonjs'

export class World {
    private scene: BABYLON.Scene

    constructor(scene: BABYLON.Scene) {
        this.scene = scene
    }

    public init(): void {
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), this.scene)
        this.generateDirtBlock()
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
        return mesh
    }
}
