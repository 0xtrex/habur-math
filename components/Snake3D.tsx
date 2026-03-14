"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Snake3D(){

const mountRef = useRef<HTMLDivElement>(null)

useEffect(()=>{

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
)

camera.position.set(0,25,40)
camera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true})

renderer.setSize(window.innerWidth,window.innerHeight)

mountRef.current?.appendChild(renderer.domElement)


// lighting

scene.add(new THREE.AmbientLight(0xffffff,0.7))

const light = new THREE.PointLight(0xffffff,1)
light.position.set(20,40,20)
scene.add(light)


// ground grid

const grid = new THREE.GridHelper(40,40,0x555555,0x222222)
scene.add(grid)


// snake

const snake:any[] = []

const snakeMaterial = new THREE.MeshStandardMaterial({
color:0x44ff88
})

function createSegment(x:number,z:number){

const geo = new THREE.SphereGeometry(0.9,16,16)

const mesh = new THREE.Mesh(geo,snakeMaterial)

mesh.position.set(x,1,z)

scene.add(mesh)

return mesh

}

snake.push(createSegment(0,0))
snake.push(createSegment(-1,0))
snake.push(createSegment(-2,0))


// food

const foodGeo = new THREE.SphereGeometry(0.8,16,16)

const foodMat = new THREE.MeshStandardMaterial({
color:0xff4444
})

const food = new THREE.Mesh(foodGeo,foodMat)

scene.add(food)

function randomFood(){

food.position.set(
(Math.floor(Math.random()*20)-10),
1,
(Math.floor(Math.random()*20)-10)
)

}

randomFood()


// movement

let dir = {x:1,z:0}

window.addEventListener("keydown",(e)=>{

if(e.key==="ArrowUp") dir={x:0,z:-1}
if(e.key==="ArrowDown") dir={x:0,z:1}
if(e.key==="ArrowLeft") dir={x:-1,z:0}
if(e.key==="ArrowRight") dir={x:1,z:0}

})


// touch control

window.addEventListener("click",(e)=>{

const x = e.clientX/window.innerWidth

if(x<0.25) dir={x:-1,z:0}
else if(x>0.75) dir={x:1,z:0}
else dir={x:0,z:-1}

})


// game loop

let step = 0

function update(){

step++

if(step>15){

step=0

const head = snake[0]

const newX = head.position.x + dir.x
const newZ = head.position.z + dir.z

const newHead = createSegment(newX,newZ)

snake.unshift(newHead)


// eat food

if(
Math.abs(newX-food.position.x)<1 &&
Math.abs(newZ-food.position.z)<1
){

randomFood()

}else{

const tail = snake.pop()

scene.remove(tail)

}

}

renderer.render(scene,camera)

requestAnimationFrame(update)

}

update()

},[])

return(

<div
ref={mountRef}
className="absolute inset-0"
/>

)

}
