"use client"

import { useState } from "react"

export default function PremiumImage({
  src,
  alt,
  className
}:{
  src:string
  alt?:string
  className?:string
}){

const [loaded,setLoaded] = useState(false)

return(

<div className={`relative overflow-hidden ${className}`}>

{/* Blur placeholder */}

<div
className={`
absolute inset-0
bg-gradient-to-br
from-gray-700/30
to-gray-900/40
animate-pulse
transition-opacity duration-700
${loaded ? "opacity-0" : "opacity-100"}
`}
></div>

{/* Image */}

<img
src={src}
alt={alt}
onLoad={()=>setLoaded(true)}
className={`
w-full h-full object-cover
transition-all duration-700
${loaded ? "blur-0 scale-100 opacity-100" : "blur-xl scale-110 opacity-60"}
`}
/>

</div>

)
}
