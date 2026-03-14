"use client"

import { useState } from "react"

export default function GalleryClient({images}:{images:string[]}){

const [selected,setSelected] = useState<number | null>(null)

function next(){
if(selected===null) return
setSelected((selected+1)%images.length)
}

function prev(){
if(selected===null) return
setSelected((selected-1+images.length)%images.length)
}

return(

<div className="min-h-screen text-white px-6 md:px-16 py-28">

<h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
Gallery
</h1>

{/* GRID */}

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{images.map((src,i)=>(

<div
key={i}
onClick={()=>setSelected(i)}
className="cursor-pointer overflow-hidden rounded-xl border border-white/10 group"
>

<img
src={src}
className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
/>

</div>

))}

</div>


{/* LIGHTBOX */}

{selected !== null && (

<div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

{/* CLOSE */}

<button
onClick={()=>setSelected(null)}
className="absolute top-8 right-10 text-4xl text-white"
>
✕
</button>

{/* PREVIOUS */}

<button
onClick={prev}
className="absolute left-8 text-4xl text-white"
>
‹
</button>

{/* IMAGE */}

<img
src={images[selected]}
className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
/>

{/* NEXT */}

<button
onClick={next}
className="absolute right-8 text-4xl text-white"
>
›
</button>

</div>

)}

</div>

)
}
