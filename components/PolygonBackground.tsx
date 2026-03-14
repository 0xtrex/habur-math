"use client"

import { useEffect, useRef } from "react"

export default function PolygonBackground() {

const svgRef = useRef<SVGSVGElement>(null)

useEffect(() => {

const svg = svgRef.current
if(!svg) return

const width = window.innerWidth
const height = window.innerHeight

const triangleCount = 35

for(let i=0;i<triangleCount;i++){

const poly = document.createElementNS("http://www.w3.org/2000/svg","polygon")

const x1 = Math.random()*width
const y1 = Math.random()*height

const x2 = x1 + Math.random()*200
const y2 = y1 + Math.random()*200

const x3 = x1 - Math.random()*200
const y3 = y1 + Math.random()*200

poly.setAttribute(
"points",
`${x1},${y1} ${x2},${y2} ${x3},${y3}`
)

poly.setAttribute(
"fill",
"rgba(255,255,255,0.05)"
)

poly.style.transition = "transform 10s ease-in-out"
poly.style.transform = `translateY(${Math.random()*40}px)`

svg.appendChild(poly)

setInterval(()=>{

poly.style.transform =
`translateY(${Math.random()*80}px)`

},6000)

}

},[])

return (

<svg
ref={svgRef}
className="absolute inset-0 w-full h-full -z-10"
style={{
background:
"linear-gradient(135deg,#0b0f2f 0%,#1c1b4f 40%,#2a1e6b 100%)"
}}
>

</svg>

)

}
