"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function StadiumAtmosphere(){

const mountRef = useRef<HTMLDivElement>(null)

useEffect(()=>{

const width = window.innerWidth
const height = window.innerHeight

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x020308)

scene.fog = new THREE.FogExp2(0x020308,0.003)

const camera = new THREE.PerspectiveCamera(
60,
width/height,
0.1,
2000
)

camera.position.z = 80

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setSize(width,height)
renderer.setPixelRatio(window.devicePixelRatio)

mountRef.current?.appendChild(renderer.domElement)


// stadium light towers

const towers = []

for(let i=0;i<8;i++){

const group = new THREE.Group()

const poleGeometry = new THREE.CylinderGeometry(0.5,0.8,60,8)
const poleMaterial = new THREE.MeshStandardMaterial({color:0x444444})

const pole = new THREE.Mesh(poleGeometry,poleMaterial)

group.add(pole)


// light panels

for(let j=0;j<6;j++){

const panelGeometry = new THREE.BoxGeometry(6,2,0.5)

const panelMaterial = new THREE.MeshBasicMaterial({
color:0xffffff
})

const panel = new THREE.Mesh(panelGeometry,panelMaterial)

panel.position.y = 30
panel.position.x = (j-3)*7

group.add(panel)

const light = new THREE.PointLight(0xffffff,2,200)

light.position.set((j-3)*7,30,10)

group.add(light)

}

const angle = (i/8)*Math.PI*2

group.position.x = Math.cos(angle)*120
group.position.z = Math.sin(angle)*120

group.rotation.y = -angle

scene.add(group)

towers.push(group)

}


// floating dust

const particleCount = 6000

const geometry = new THREE.BufferGeometry()

const positions = new Float32Array(particleCount*3)

for(let i=0;i<particleCount;i++){

positions[i*3] = (Math.random()-0.5)*500
positions[i*3+1] = (Math.random()-0.5)*200
positions[i*3+2] = (Math.random()-0.5)*500

}

geometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
)

const material = new THREE.PointsMaterial({
color:0xffffff,
size:0.6,
transparent:true,
opacity:0.5
})

const dust = new THREE.Points(geometry,material)

scene.add(dust)


// subtle ground

const groundGeometry = new THREE.CircleGeometry(200,64)

const groundMaterial = new THREE.MeshStandardMaterial({
color:0x0a2a0a,
roughness:1
})

const ground = new THREE.Mesh(groundGeometry,groundMaterial)

ground.rotation.x = -Math.PI/2
ground.position.y = -30

scene.add(ground)


// ambient lighting

const ambient = new THREE.AmbientLight(0x404040)
scene.add(ambient)


// animation

function animate(){

requestAnimationFrame(animate)

dust.rotation.y += 0.0005

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
