"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function SpaceTravelBackground(){

const mountRef = useRef<HTMLDivElement>(null)

useEffect(()=>{

const width = window.innerWidth
const height = window.innerHeight

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
width/height,
0.1,
4000
)

camera.position.z = 5

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setSize(width,height)
renderer.setPixelRatio(window.devicePixelRatio)

mountRef.current?.appendChild(renderer.domElement)


// ⭐ STARS

const starCount = 12000

const starGeometry = new THREE.BufferGeometry()

const starPositions = new Float32Array(starCount*3)

for(let i=0;i<starCount;i++){

starPositions[i*3] = (Math.random()-0.5)*3000
starPositions[i*3+1] = (Math.random()-0.5)*3000
starPositions[i*3+2] = -Math.random()*3000

}

starGeometry.setAttribute(
"position",
new THREE.BufferAttribute(starPositions,3)
)

const starMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:1
})

const stars = new THREE.Points(
starGeometry,
starMaterial
)

scene.add(stars)


// 🌌 GALAXY CLOUD

const galaxyParticles = 4000

const galaxyGeo = new THREE.BufferGeometry()

const galaxyPos = new Float32Array(galaxyParticles*3)

for(let i=0;i<galaxyParticles;i++){

const radius = Math.random()*800
const angle = Math.random()*Math.PI*2

galaxyPos[i*3] = Math.cos(angle)*radius
galaxyPos[i*3+1] = (Math.random()-0.5)*200
galaxyPos[i*3+2] = -Math.random()*2500

}

galaxyGeo.setAttribute(
"position",
new THREE.BufferAttribute(galaxyPos,3)
)

const galaxyMaterial = new THREE.PointsMaterial({
color:0x88aaff,
size:1.5,
transparent:true,
opacity:0.6
})

const galaxy = new THREE.Points(
galaxyGeo,
galaxyMaterial
)

scene.add(galaxy)


// 🪐 PLANETS

const planets: THREE.Mesh[] = []

for(let i=0;i<6;i++){

const geometry = new THREE.SphereGeometry(
Math.random()*5+3,
32,
32
)

const material = new THREE.MeshStandardMaterial({
color:new THREE.Color(
0.3+Math.random()*0.7,
0.3+Math.random()*0.7,
0.3+Math.random()*0.7
),
roughness:1
})

const planet = new THREE.Mesh(geometry,material)

planet.position.set(
(Math.random()-0.5)*400,
(Math.random()-0.5)*200,
-Math.random()*3000
)

scene.add(planet)

planets.push(planet)

}


// ☄️ ASTEROIDS

const asteroids: THREE.Mesh[] = []

for(let i=0;i<60;i++){

const geometry = new THREE.DodecahedronGeometry(
Math.random()*2
)

const material = new THREE.MeshStandardMaterial({
color:0x888888,
roughness:1
})

const asteroid = new THREE.Mesh(geometry,material)

asteroid.position.set(
(Math.random()-0.5)*600,
(Math.random()-0.5)*400,
-Math.random()*3000
)

scene.add(asteroid)

asteroids.push(asteroid)

}


// 💡 LIGHT

const light = new THREE.PointLight(0xffffff,2)
light.position.set(0,0,100)

scene.add(light)


// 🎮 mouse parallax

let mouseX = 0
let mouseY = 0

window.addEventListener("mousemove",(e)=>{

mouseX = (e.clientX-width/2)*0.00004
mouseY = (e.clientY-height/2)*0.00004

})


// 🚀 SPACE TRAVEL ANIMATION

function animate(){

requestAnimationFrame(animate)

const starArray = starGeometry.attributes.position.array as Float32Array

for(let i=0;i<starCount;i++){

starArray[i*3+2] += 6

if(starArray[i*3+2] > 10){
starArray[i*3+2] = -3000
}

}

starGeometry.attributes.position.needsUpdate = true


planets.forEach(p=>{

p.position.z += 1.5
p.rotation.y += 0.003

if(p.position.z > 50){
p.position.z = -3000
}

})

asteroids.forEach(a=>{

a.position.z += 3
a.rotation.x += 0.01
a.rotation.y += 0.01

if(a.position.z > 50){
a.position.z = -3000
}

})

scene.rotation.y += mouseX
scene.rotation.x += mouseY

renderer.render(scene,camera)

}

animate()

},[])

return (

<div
ref={mountRef}
className="absolute inset-0 -z-10"
/>

)

}
