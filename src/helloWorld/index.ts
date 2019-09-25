import * as BABYLON from 'babylonjs'

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
const engine = new BABYLON.Engine(canvas, true)

const scene = new BABYLON.Scene(engine)

const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene)
camera.attachControl(canvas, true)

const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene)

const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2}, scene)

camera.target = sphere.position

engine.runRenderLoop(() => {
    scene.render()
})

window.addEventListener('resize', () => {
    engine.resize()
})