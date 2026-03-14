"use client"

import { useEffect, useRef } from "react"

export default function RetroBrickBackground(){

const canvasRef = useRef<HTMLCanvasElement>(null)

useEffect(()=>{

const canvas = canvasRef.current
if(!canvas) return

const ctx = canvas.getContext("2d")
if(!ctx) return

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const size = 28
const cols = Math.floor(canvas.width/size)
const rows = Math.floor(canvas.height/size)

let grid:number[][] = Array.from({length:rows},()=>Array(cols).fill(0))

const shapes = [
[[1,1],[1,1]],
[[1,1,1,1]],
[[1,0],[1,1],[0,1]],
[[0,1],[1,1],[1,0]],
[[1,1,1],[0,1,0]]
]

const pieces:any[] = []

function spawn(){

const shape = shapes[Math.floor(Math.random()*shapes.length)]

pieces.push({
shape,
x:Math.floor(Math.random()*(cols-3)),
y:-3
})

}

setInterval(()=>{
spawn()
spawn()
spawn()
},700)

function collision(piece:any){

for(let r=0;r<piece.shape.length;r++){

for(let c=0;c<piece.shape[r].length;c++){

if(piece.shape[r][c]){

const y = piece.y+r
const x = piece.x+c

if(y>=rows || grid[y]?.[x]){

return true

}

}

}

}

return false

}

function merge(piece:any){

piece.shape.forEach((row:any,r:number)=>{

row.forEach((cell:number,c:number)=>{

if(cell){

const y = piece.y+r
const x = piece.x+c

if(y>=0 && y<rows && x>=0 && x<cols){

grid[y][x]=1

}

}

})

})

}

function clearBottom(){

// remove bottom row slowly to prevent freezing

if(Math.random()<0.01){

grid.shift()

grid.push(Array(cols).fill(0))

}

}

function drawBlock(x:number,y:number){

const gradient = ctx.createLinearGradient(0,0,size,size)

gradient.addColorStop(0,"#8b5cf6")
gradient.addColorStop(1,"#3b82f6")

ctx.fillStyle = gradient

ctx.fillRect(x*size,y*size,size,size)

ctx.strokeStyle="rgba(255,255,255,0.1)"

ctx.strokeRect(x*size,y*size,size,size)

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

grid.forEach((row,y)=>{

row.forEach((cell,x)=>{

if(cell){

drawBlock(x,y)

}

})

})

pieces.forEach(piece=>{

piece.shape.forEach((row:any,r:number)=>{

row.forEach((cell:number,c:number)=>{

if(cell){

drawBlock(piece.x+c,piece.y+r)

}

})

})

})

}

function update(){

for(let i=pieces.length-1;i>=0;i--){

const p = pieces[i]

p.y += 1

if(collision(p)){

p.y--

merge(p)

pieces.splice(i,1)

}

}

clearBottom()

draw()

requestAnimationFrame(update)

}

update()

},[])

return(

<canvas
ref={canvasRef}
className="absolute inset-0 -z-10 opacity-40"
/>

)

}
