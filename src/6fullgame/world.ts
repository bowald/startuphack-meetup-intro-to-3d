import * as BABYLON from 'babylonjs'

export class World {
    private scene: BABYLON.Scene
    private dirtBlock: BABYLON.Mesh

    constructor(scene: BABYLON.Scene) {
        this.scene = scene
        this.dirtBlock = this.generateDirtBlock()
    }

    public init(width: number, depth: number): void {
        this.scene.gravity = new BABYLON.Vector3(0, -9.81, 0)
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), this.scene)

        this._createSky()

        for (let x = 0; x < width; x++) {
            for (let z = 0; z < depth; z++) {
                const block = this.dirtBlock.createInstance("i" + z + x * depth)
              
                // without instances
                // const block = this.generateDirtBlock()
                // block.isVisible = true
                // -- end
                block.checkCollisions = true
                block.position.set( x - Math.floor(width / 2), 0, z - Math.floor(depth / 2))
                this._setupBlockActions(block)
            }
        }
    }

    private generateDirtBlock(): BABYLON.Mesh {
        const options: any = {
            faceUV: [
                new BABYLON.Vector4(0, 0, 0.5, 0.5),
                new BABYLON.Vector4(0, 0, 0.5, 0.5),
                new BABYLON.Vector4(0, 0, 0.5, 0.5),
                new BABYLON.Vector4(0, 0, 0.5, 0.5),
                new BABYLON.Vector4(0.5, 0, 1, 0.5),
                new BABYLON.Vector4(0, 0.5, 0.5, 1)],
            size: 1,
            wrap: true
        }

        const mesh = BABYLON.MeshBuilder.CreateBox('box', options, this.scene)

        const material = new BABYLON.PBRMetallicRoughnessMaterial("boxMat", this.scene)
        material.baseTexture = new BABYLON.Texture("/assets/dirtblock.png", this.scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        mesh.material = material
        mesh.isVisible = false
        return mesh
    }

    public _setupBlockActions(block: BABYLON.AbstractMesh) {
        block.actionManager = new BABYLON.ActionManager(this.scene);
        block.actionManager.registerAction(this._rightPickAction())
        block.actionManager.registerAction(this._leftPickAction())
    }

    private _rightPickAction(): BABYLON.ExecuteCodeAction {
      return new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, e => {
          const pickResult = this.scene.pick(e.pointerX, e.pointerY)
          if (pickResult && pickResult.hit && pickResult.distance < 8 && pickResult.pickedMesh) {
            const pickedNormal = pickResult.getNormal(true)
              if (pickedNormal) {
                  const newPosition = pickResult.pickedMesh.position.add(pickedNormal)
                  if (this._isFree(newPosition)) {
                      const block = this.dirtBlock.createInstance("")

                      // without instances
                      // const block = this.generateDirtBlock()
                      // block.isVisible = true
                      // -- end
                      block.checkCollisions = true
                      block.position = newPosition
                      this._setupBlockActions(block)
                  }
              }
          }
        })
    }

    private _leftPickAction(): BABYLON.ExecuteCodeAction {
        return new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, e => {
            const pickResult = this.scene.pick(e.pointerX, e.pointerY)
            if (pickResult && pickResult.hit && pickResult.distance < 8 && pickResult.pickedMesh) {
                pickResult.pickedMesh.dispose()
            }
        })
    }

    private _isFree(position: BABYLON.Vector3): boolean {
        return true
    }

    private _createSky() {
        const skysphere = BABYLON.MeshBuilder.CreateSphere('skySphere', { segments: 16, diameter: 50 }, this.scene)
        skysphere.isPickable = false
        skysphere.position = BABYLON.Vector3.Zero()
        skysphere.infiniteDistance = true

        const skyboxmaterial = new BABYLON.StandardMaterial('skyBox', this.scene)
        skyboxmaterial.backFaceCulling = false
        skyboxmaterial.disableLighting = true
        skyboxmaterial.emissiveTexture = new BABYLON.Texture('assets/MinecraftSkyDay.png', this.scene, true, false)
        skyboxmaterial.emissiveTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE
        skyboxmaterial.backFaceCulling = false
        skysphere.material = skyboxmaterial
    }
}
