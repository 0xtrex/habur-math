"use client"

import PremiumImage from "@/components/PremiumImage"

const players = [
{ name:"Dipankar", image:"/players/dipankar.jpg" },
{ name:"Pritam Chakraborty", image:"/players/pritam-chakraborty.png" },
{ name:"Sunny", image:"/players/sunny.jpg" },
{ name:"Chandan", image:"/players/chandan.png" },
{ name:"Keshab", image:"/players/keshab.jpg" },
{ name:"Arjun", image:"/players/arjun.jpg" },
{ name:"Choto", image:"/players/choto.jpg" },
{ name:"Debraj", image:"/players/debraj.jpg" },
{ name:"Soumya", image:"/players/soumya.jpg" },
{ name:"Milan", image:"/players/milan.jpg" },
{ name:"Pradipta", image:"/players/pradipta.jpg" },
{ name:"Pritam", image:"/players/pritam.jpg" },
{ name:"Roni", image:"/players/roni.jpg" },
{ name:"Rupam", image:"/players/rupam.jpg" },
{ name:"Saheb", image:"/players/saheb.jpg" },
{ name:"Sandip", image:"/players/sandip.jpg" },
{ name:"Sayan", image:"/players/sayan.jpg" },
{ name:"Shovon", image:"/players/shovon.jpg" },
{ name:"Vicky", image:"/players/vicky.jpg" },
{ name:"Arghya", image:"/players/arghya.jpg" },
{ name:"Kaushik", image:"/players/kaushik.jpg" }
]

export default function Players(){

return(

<div className="min-h-screen text-white px-6 md:px-16 py-28">

<h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
Players
</h1>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{players.map((p,i)=>(
<div
key={i}
className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition duration-500 hover:shadow-xl hover:shadow-purple-500/10"
>

<PremiumImage
src={p.image}
className="w-full h-64"
/>

<div className="p-5">

<h2 className="text-xl font-semibold">
{p.name}
</h2>

<p className="text-sm text-gray-400">
All Rounder
</p>

</div>

</div>
))}

</div>

</div>

)
}
