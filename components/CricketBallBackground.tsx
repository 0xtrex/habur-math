"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function CricketBallBackground(){

const mountRef = useRef<HTMLDivElement>(null)

useEffect(()=>{

const width = window.innerWidth
const height = window.innerHeight

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
70,
width/height,
0.1,
1000
)

camera.position.z = 40

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setSize(width,height)

mountRef.current?.appendChild(renderer.domElement)


// lights

const light1 = new THREE.PointLight(0xffffff,1.2)
light1.position.set(50,50,60)
scene.add(light1)

const light2 = new THREE.PointLight(0xff4444,0.8)
light2.position.set(-40,-30,40)
scene.add(light2)

const ambient = new THREE.AmbientLight(0x404040)
scene.add(ambient)


// cricket ball

const ballGeometry = new THREE.SphereGeometry(8,64,64)

const ballMaterial = new THREE.MeshPhysicalMaterial({
color:0x8b0000,
metalness:0.2,
roughness:0.5,
clearcoat:1,
clearcoatRoughness:0.1
})

const ball = new THREE.Mesh(ballGeometry,ballMaterial)

scene.add(ball)


// seam

const seamGeometry = new THREE.TorusGeometry(8.1,0.15,16,100)

const seamMaterial = new THREE.MeshStandardMaterial({
color:0xffffff
})

const seam = new THREE.Mesh(seamGeometry,seamMaterial)

seam.rotation.x = Math.PI/2

scene.add(seam)


// floating particles

const particleCount = 500

const particlesGeometry = new THREE.BufferGeometry()

const positions = new Float32Array(particleCount*3)

for(let i=0;i<particleCount;i++){

positions[i*3] = (Math.random()-0.5)*120
positions[i*3+1] = (Math.random()-0.5)*80
positions[i*3+2] = (Math.random()-0.5)*80

}

particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
)

const particlesMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:0.5
})

const particles = new THREE.Points(
particlesGeometry,
particlesMaterial
)

scene.add(particles)


// mouse interaction

let mouseX = 0
let mouseY = 0

window.addEventListener("mousemove",(e)=>{

mouseX = (e.clientX-width/2)*0.0005
mouseY = (e.clientY-height/2)*0.0005

})


// animation

function animate(){

requestAnimationFrame(animate)

ball.rotation.y += 0.002
seam.rotation.z += 0.002

scene.rotation.y += mouseX
scene.rotation.x += mouseY

renderer.render(scene,camera)

}

animate()

},[])

return(

<div
ref={mountRef}
className="absolute inset-0 -z-10"
/>

)

}
