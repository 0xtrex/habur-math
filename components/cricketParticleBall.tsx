"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function CricketParticleBall(){

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

camera.position.z = 90

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setSize(width,height)
renderer.setPixelRatio(window.devicePixelRatio)

mountRef.current?.appendChild(renderer.domElement)


// BALL GROUP

const ball = new THREE.Group()
scene.add(ball)


// PARTICLE BALL

const count = 9000
const geometry = new THREE.BufferGeometry()
const positions = new Float32Array(count*3)

for(let i=0;i<count;i++){

const r = 14
const theta = Math.random()*Math.PI*2
const phi = Math.acos((Math.random()*2)-1)

positions[i*3] = r*Math.sin(phi)*Math.cos(theta)
positions[i*3+1] = r*Math.sin(phi)*Math.sin(theta)
positions[i*3+2] = r*Math.cos(phi)

}

geometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
)

const material = new THREE.PointsMaterial({
color:0xff3333,
size:0.9
})

const particles = new THREE.Points(geometry,material)
ball.add(particles)


// SEAM (6 rows)

for(let i=-3;i<=3;i++){

const seam = new THREE.Mesh(
new THREE.TorusGeometry(14.5 + i*0.15,0.05,8,200),
new THREE.MeshBasicMaterial({color:0xffffff})
)

seam.rotation.x = Math.PI/2
ball.add(seam)

}


// DUST PARTICLES

const dustGroup = new THREE.Group()
scene.add(dustGroup)

function createDust(x:number,y:number){

for(let i=0;i<40;i++){

const geo = new THREE.SphereGeometry(0.2,6,6)

const mat = new THREE.MeshBasicMaterial({
color:0xffffff,
transparent:true,
opacity:0.8
})

const p = new THREE.Mesh(geo,mat)

p.position.set(x,y,0)

p.userData = {
vx:(Math.random()-0.5)*1.5,
vy:Math.random()*1.5,
life:60
}

dustGroup.add(p)

}

}


// PHYSICS

let x = 0
let y = 10

let vx = (Math.random()-0.5)*1.2
let vy = 1.8

const gravity = -0.05

const floor = -28
const wall = 45


function animate(){

requestAnimationFrame(animate)

vy += gravity

x += vx
y += vy


// FLOOR BOUNCE

if(y < floor){

y = floor

vy *= -0.92   // keeps bouncing longer

createDust(x,y)

}


// WALL BOUNCE

if(x > wall || x < -wall){

vx *= -1

}


// UPDATE BALL

ball.position.x = x
ball.position.y = y

ball.rotation.y += 0.05
ball.rotation.x += 0.03


// UPDATE DUST

for(let i=dustGroup.children.length-1;i>=0;i--){

const p:any = dustGroup.children[i]

p.position.x += p.userData.vx
p.position.y += p.userData.vy

p.userData.vy -= 0.03

p.userData.life--

p.material.opacity = p.userData.life/60

if(p.userData.life <= 0){

dustGroup.remove(p)

}

}


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
