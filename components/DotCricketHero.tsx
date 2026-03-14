"use client"

import { useEffect, useRef } from "react"

export default function DotCricketHero(){

const canvasRef = useRef<HTMLCanvasElement>(null)

useEffect(()=>{

const canvas = canvasRef.current
if(!canvas) return

const ctx = canvas.getContext("2d")
if(!ctx) return

canvas.width = window.innerWidth
canvas.height = 450

const centerX = canvas.width / 2
const centerY = 250

// silhouette points for batsman
const points:number[][] = []

// head
for(let i=0;i<360;i+=10){
points.push([
centerX + Math.cos(i)*12,
centerY - 140 + Math.sin(i)*12
])
}

// body
for(let y=0;y<90;y+=8){
points.push([centerX, centerY - 120 + y])
}

// left arm
for(let i=0;i<50;i+=6){
points.push([centerX - i, centerY - 90 + i])
}

// right arm holding bat
for(let i=0;i<70;i+=6){
points.push([centerX + i, centerY - 90 - i])
}

// bat
for(let i=0;i<80;i+=8){
points.push([centerX + 70 + i*0.2, centerY - 160 - i])
}

// legs
for(let i=0;i<80;i+=8){
points.push([centerX - 20 - i*0.2, centerY - 30 + i])
points.push([centerX + 20 + i*0.2, centerY - 30 + i])
}

let time = 0

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

time +=0.02

points.forEach((p,i)=>{

const x = p[0] + Math.sin(time + i)*1.5
const y = p[1]

ctx.beginPath()
ctx.arc(x,y,2.5,0,Math.PI*2)
ctx.fillStyle = "white"
ctx.fill()

})

requestAnimationFrame(draw)

}

draw()

},[])

return(

<canvas
ref={canvasRef}
className="opacity-80"
/>

)

}
