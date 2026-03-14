"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ParticleBatsman(){

const mountRef = useRef<HTMLDivElement>(null)

useEffect(()=>{

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / 500,
0.1,
1000
)

camera.position.z = 200

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setSize(window.innerWidth,500)

mountRef.current?.appendChild(renderer.domElement)

const particles = 30000

const geometry = new THREE.BufferGeometry()

const positions = new Float32Array(particles * 3)

for(let i=0;i<particles;i++){

const i3 = i * 3

// human-like shape distribution
const radius = Math.random()*80

const theta = Math.random()*Math.PI*2
const phi = Math.random()*Math.PI

positions[i3] =
radius * Math.sin(phi) * Math.cos(theta)

positions[i3+1] =
radius * Math.sin(phi) * Math.sin(theta)

positions[i3+2] =
radius * Math.cos(phi)

}

geometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
)

const material = new THREE.PointsMaterial({
color:0xffffff,
size:1.2
})

const points = new THREE.Points(
geometry,
material
)

scene.add(points)

function animate(){

requestAnimationFrame(animate)

points.rotation.y += 0.002
points.rotation.x += 0.001

renderer.render(scene,camera)

}

animate()

},[])

return(

<div
ref={mountRef}
className="w-full flex justify-center"
/>

)

}
