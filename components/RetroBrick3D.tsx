"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function RetroBrick3D(){

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

camera.position.set(0,25,90)

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
})

renderer.setSize(width,height)

mountRef.current?.appendChild(renderer.domElement)


// lighting

scene.add(new THREE.AmbientLight(0xffffff,0.7))

const light = new THREE.PointLight(0xffffff,1)
light.position.set(50,80,50)

scene.add(light)


// cube

const geo = new THREE.BoxGeometry(2,2,2)

function mat(){

return new THREE.MeshStandardMaterial({
color:new THREE.Color(
0.6+Math.random()*0.4,
0.3,
1
)
})

}


// tetris shapes

const shapes = [

[[0,0],[1,0],[2,0],[3,0]],
[[0,0],[1,0],[0,1],[1,1]],
[[0,0],[1,0],[2,0],[1,1]],
[[0,0],[0,1],[1,1],[2,1]],
[[2,0],[0,1],[1,1],[2,1]],
[[1,0],[2,0],[0,1],[1,1]],
[[0,0],[1,0],[1,1],[2,1]]

]


const falling:any[] = []
const settled:any[] = []

const FLOOR = -20
const CEILING = 40


function spawn(){

const shape = shapes[Math.floor(Math.random()*shapes.length)]

const baseX = (Math.random()-0.5)*70

const piece:any = {
meshes:[],
vx:0,
vy:-0.3
}

shape.forEach((b:any)=>{

const cube = new THREE.Mesh(geo,mat())

cube.position.set(
baseX + b[0]*2,
CEILING,
b[1]*2
)

scene.add(cube)

piece.meshes.push(cube)

})

falling.push(piece)

}


// spawn continuously

setInterval(()=>{

spawn()
spawn()

},700)



function ceilingBreak(){

settled.forEach((cube:any)=>{

cube.vx = (Math.random()-0.5)*1.5
cube.vy = Math.random()*1.5

})

}


function animate(){

requestAnimationFrame(animate)


// falling pieces

for(let i=falling.length-1;i>=0;i--){

const piece = falling[i]

let hit = false

piece.meshes.forEach((cube:any)=>{

cube.position.y += piece.vy

if(cube.position.y <= FLOOR){

hit = true

}

})


if(hit){

piece.meshes.forEach((cube:any)=>{

cube.position.y = FLOOR

settled.push(cube)

})

falling.splice(i,1)

}

}


// check ceiling

let highest = -999

settled.forEach((c:any)=>{

if(c.position.y > highest){
highest = c.position.y
}

})

if(highest > CEILING-10){

ceilingBreak()

}


// explosion physics

settled.forEach((cube:any)=>{

if(cube.vx !== undefined){

cube.position.x += cube.vx
cube.position.y += cube.vy

cube.vy -= 0.05

}

})


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
