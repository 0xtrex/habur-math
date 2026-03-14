"use client"

import { useState } from "react"
import PremiumImage from "@/components/PremiumImage"

export default function GalleryClient({images}:{images:string[]}){

const [selected,setSelected] = useState<number | null>(null)

return(

<div className="min-h-screen text-white px-6 md:px-16 py-28">

<h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
Gallery
</h1>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{images.map((src,i)=>(

<div
key={i}
onClick={()=>setSelected(i)}
className="cursor-pointer overflow-hidden rounded-xl border border-white/10 group hover:scale-[1.03] transition duration-500"
>

<PremiumImage
src={src}
className="w-full h-64"
/>

</div>

))}

</div>

{/* FULLSCREEN VIEW */}

{selected !== null && (

<div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

<button
onClick={()=>setSelected(null)}
className="absolute top-8 right-10 text-4xl text-white"
>
✕
</button>

<img
src={images[selected]}
className="max-h-[90vh] max-w-[90vw] rounded-xl animate-fade"
/>

</div>

)}

</div>

)
}
