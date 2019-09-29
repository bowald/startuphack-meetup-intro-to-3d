import * as BABYLON from 'babylonjs'

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
const engine = new BABYLON.Engine(canvas, true)

const scene = new BABYLON.Scene(engine)
scene.clearColor = new BABYLON.Color4(0.0, 0.0, 0.0, 1) // Color of background... ish
// Create the camera
const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene)
camera.attachControl(canvas, true)

// Create the light
new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene)

// Create the mesh, sphere geometry
const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2}, scene)

// Create and set the material
const material = new BABYLON.PBRMetallicRoughnessMaterial('sphere_material', scene)
material.baseTexture = new BABYLON.Texture('assets/world.jpg', scene) // No Mipmap, invertY
sphere.material = material

// Camera looks at sphere
camera.target = sphere.position

// Define and run the render loop
engine.runRenderLoop(() => {
    update(engine.getDeltaTime())
    scene.render()
})

function update(delta) {
    sphere.rotation.y += delta / 2000
}

window.addEventListener('resize', () => {
    engine.resize()
})