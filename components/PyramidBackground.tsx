"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function PyramidBackground(){

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

camera.position.z = 140

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setSize(width,height)
renderer.setPixelRatio(window.devicePixelRatio)

mountRef.current?.appendChild(renderer.domElement)


// Lighting (stronger shine)

const light1 = new THREE.PointLight(0xffffff,1.5)
light1.position.set(80,80,120)
scene.add(light1)

const light2 = new THREE.PointLight(0x6d5cff,1.2)
light2.position.set(-80,-50,100)
scene.add(light2)

const ambient = new THREE.AmbientLight(0x404040)
scene.add(ambient)


// Pyramid geometry

const geometry = new THREE.ConeGeometry(5,10,4)

const pyramids: THREE.Mesh[] = []

for(let i=0;i<35;i++){

const material = new THREE.MeshPhysicalMaterial({
color:0x7c6cff,
metalness:0.6,
roughness:0.25,
clearcoat:1,
clearcoatRoughness:0.1
})

const pyramid = new THREE.Mesh(geometry,material)

pyramid.position.x = (Math.random()-0.5)*200
pyramid.position.y = (Math.random()-0.5)*120
pyramid.position.z = (Math.random()-0.5)*100

pyramid.rotation.y = Math.random()*Math.PI

scene.add(pyramid)
pyramids.push(pyramid)

}


// mouse interaction

let mouseX = 0
let mouseY = 0

window.addEventListener("mousemove",(e)=>{

mouseX = (e.clientX - width/2)*0.00005
mouseY = (e.clientY - height/2)*0.00005

})


// animation loop

function animate(){

requestAnimationFrame(animate)

pyramids.forEach(p=>{

// VERY slow rotation

p.rotation.y += 0.0006
p.rotation.x += 0.0002

// gentle floating

p.position.y += Math.sin(Date.now()*0.0003 + p.position.x)*0.002

})

// slow camera parallax

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
