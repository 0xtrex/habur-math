"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ParticleWave(){

const mountRef = useRef<HTMLDivElement>(null)

useEffect(()=>{

const width = window.innerWidth
const height = window.innerHeight

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
60,
width/height,
1,
1000
)

camera.position.z = 80

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setSize(width,height)
renderer.setPixelRatio(window.devicePixelRatio)

mountRef.current?.appendChild(renderer.domElement)

const particles = []

const geometry = new THREE.BufferGeometry()

const count = 12000

const positions = new Float32Array(count*3)

for(let i=0;i<count;i++){

const x = (Math.random()-0.5)*200
const z = (Math.random()-0.5)*200
const y = 0

positions[i*3] = x
positions[i*3+1] = y
positions[i*3+2] = z

particles.push({x,z})

}

geometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
)

const material = new THREE.PointsMaterial({
color:0x8b5cf6,
size:1.5
})

const points = new THREE.Points(geometry,material)

scene.add(points)

let time = 0

function animate(){

requestAnimationFrame(animate)

time += 0.03

const pos = geometry.attributes.position.array

for(let i=0;i<count;i++){

const p = particles[i]

pos[i*3+1] =
Math.sin(p.x*0.05 + time) * 3 +
Math.cos(p.z*0.05 + time) * 3

}

geometry.attributes.position.needsUpdate = true

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
