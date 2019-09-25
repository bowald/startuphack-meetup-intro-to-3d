import * as BABYLON from 'babylonjs'

function createTexturedBox(scene: BABYLON.Scene): BABYLON.Mesh {
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
    
    const mesh = BABYLON.MeshBuilder.CreateBox('box', options, scene)

    const material = new BABYLON.PBRMetallicRoughnessMaterial("boxMat", scene)
    material.baseTexture = new BABYLON.Texture("/assets/dirtblock.png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
    mesh.material = material
    return mesh
}

function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene{
    const scene = new BABYLON.Scene(engine)
    const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene)
    camera.attachControl(canvas, true)
    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene)
    for(let i=0; i < 4; i++) {
        const cube = createTexturedBox(scene)
        cube.position = new BABYLON.Vector3(i * 1.3, 0, 0)
    }

    camera.target = new BABYLON.Vector3(2.6,0,0 )
    return scene
}


const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
const engine = new BABYLON.Engine(canvas, true)
const scene = createScene(engine, canvas)


engine.runRenderLoop(() => {
    scene.render()
})

window.addEventListener('resize', () => {
    engine.resize()
})
