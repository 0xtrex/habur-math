"use client"

const players = [
{ name:"Dipankar", role:"All Rounder", image:"/players/dipankar.jpg" },
{ name:"Pritam Chakraborty", role:"All Rounder", image:"/players/pritam-chakraborty.png" },
{ name:"Sunny", role:"All Rounder", image:"/players/sunny.jpg" },
{ name:"Chandan", role:"All Rounder", image:"/players/chandan.png" },
{ name:"Keshab", role:"All Rounder", image:"/players/keshab.jpg" },
{ name:"Arjun", role:"All Rounder", image:"/players/arjun.jpg" },
{ name:"Choto", role:"All Rounder", image:"/players/choto.jpg" },
{ name:"Debraj", role:"All Rounder", image:"/players/debraj.jpg" },
{ name:"Soumya", role:"All Rounder", image:"/players/soumya.jpg" },
{ name:"Milan", role:"All Rounder", image:"/players/milan.jpg" },
{ name:"Pradipta", role:"All Rounder", image:"/players/pradipta.jpg" },
{ name:"Pritam", role:"All Rounder", image:"/players/pritam.jpg" },
{ name:"Pritam 2", role:"All Rounder", image:"/players/pritam2.jpg" },
{ name:"Roni", role:"All Rounder", image:"/players/roni.jpg" },
{ name:"Rupam", role:"All Rounder", image:"/players/rupam.jpg" },
{ name:"Saheb", role:"All Rounder", image:"/players/saheb.jpg" },
{ name:"Sandip", role:"All Rounder", image:"/players/sandip.jpg" },
{ name:"Sayan", role:"All Rounder", image:"/players/sayan.jpg" },
{ name:"Shovon", role:"All Rounder", image:"/players/shovon.jpg" },
{ name:"Vicky", role:"All Rounder", image:"/players/vicky.jpg" },
{ name:"Arghya", role:"All Rounder", image:"/players/arghya.jpg" },
{ name:"Kaushik", role:"All Rounder", image:"/players/kaushik.jpg" },
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
className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition duration-300"
>

<img
src={p.image}
className="w-full h-60 object-cover"
onError={(e)=>{
(e.target as HTMLImageElement).src="/players/default.jpg"
}}
/>

<div className="p-5">

<h2 className="text-xl font-semibold">
{p.name}
</h2>

<p className="text-sm text-gray-400">
{p.role}
</p>

</div>

</div>
))}

</div>

</div>

)
}
