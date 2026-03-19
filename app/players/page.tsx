"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"

const players = [
{
name:"Dipankar",
role:"Batsman",
batting:"Right Hand",
bowling:"Nil",
power:99.99,
strength:"Big hitting",
best:"102*",
weakness:"Short ball",
image:"/players/dipankar.jpg"
},
{
name:"Pritam Chakraborty",
role:"All Rounder",
batting:"Right Hand",
bowling:"Medium",
power:99.98,
strength:"Cover drive",
best:"88",
weakness:"Fast Wide Line",
image:"/players/pritam-chakraborty.png"
},
{
name:"Sunny",
role:"All rounder",
batting:"Right Hand",
bowling:"Super fast",
power:10000,
strength:"Fast Ball",
best:"310*",
weakness:"Nothing",
image:"/players/sunny.jpg"
},
{
name:"Chandan",
role:"All Rounder",
batting:"Right Hand",
bowling:"Right Arm Fast",
power:90,
strength:"Consistency",
best:"67 & 5W",
weakness:"Pressure",
image:"/players/chandan.png"
},
{
name:"Keshab",
role:"All rounder",
batting:"Right Hand",
bowling:"Right arm fast",
power:89,
strength:"Timing",
best:"92",
weakness:"Bouncer",
image:"/players/keshab.png"
},
{
name:"arjun",
role:"Batsman",
batting:"Right Hand",
bowling:"Nil",
power:65,
strength:"Big hitting",
best:"59*",
weakness:"Leg break",
image:"/players/arjun.jpg"
},
{
name:"Debraj",
role:"WK/Batsman",
batting:"Right Hand",
bowling:"Right arm slow",
power:86,
strength:"Classic Shorts",
best:"73*",
weakness:"Dot Ball",
image:"/players/debraj.png"
},
{
name:"Pritam",
role:"All Rounder",
batting:"Right Hand",
bowling:"Right Arm medium",
power:85,
strength:"Power Hitting",
best:"94",
weakness:"Cutter",
image:"/players/pritam.png"
},
{
name:"Sandip",
role:"Batsman",
batting:"Right Hand",
bowling:"Nil",
power:45,
strength:"Fielding",
best:"49",
weakness:"Length Ball",
image:"/players/sandip.png"
},
{
name:"Shovon",
role:"All rounder",
batting:"Right Hand",
bowling:"Right Arm Under Hand",
power:79,
strength:"Ground Touching Ball",
best:"91*",
weakness:"Leg Swing",
image:"/players/shovon.jpg"
},
{
name:"Sujoy",
role:"Batsman",
batting:"Right Hand",
bowling:"Nil",
power:56,
strength:"Test",
best:"55",
weakness:"Length Ball",
image:"/players/sujoy.png"
},
{
name:"Vicky",
role:"Batsman",
batting:"Right Hand",
bowling:"Right Hand",
power:81,
strength:"Big hitting",
best:"90",
weakness:"Short ball",
image:"/players/vicky.png"
},
{
name:"Roni",
role:"Batsman",
batting:"Right Hand",
bowling:"Right Arm",
power:40,
strength:"Garrulous",
best:"30",
weakness:"Sayan Mota",
image:"/players/roni.png"
},
{
name:"Sayan",
role:"All Rounder",
batting:"Right Hand",
bowling:"Right Arm Leg Break",
power:88,
strength:"Running Between Wickets",
best:"89",
weakness:"Chandan",
image:"/players/sayan.png"
},
{
name:"Soumya",
role:"Batsman",
batting:"Right Hand",
bowling:"Right Arm Throw",
power:40,
strength:"Full Toss Ball",
best:"31",
weakness:"Every Ball",
image:"/players/soumya.png"
},
{
name:"Pradipta",
role:"All Rounder",
batting:"Right Hand",
bowling:"Hyper Extended Right Arm Fast",
power:95,
strength:"Late Cut/Eye Sight",
best:"85*",
weakness:"Chandan",
image:"/players/pradipta.jpg"
},
{
name:"Choto",
role:"Batsman",
batting:"Right Hand",
bowling:"Nil",
power:65,
strength:"Survival",
best:"58*",
weakness:"Sayan Mota",
image:"/players/x.jpg"
},
{
name:"Milan",
role:"Batsman",
batting:"Right Hand",
bowling:"Nil",
power:60,
strength:"Hitting",
best:"45*",
weakness:"Weight",
image:"/players/x.jpg"
},
{
name:"Rupam",
role:"All Rounder",
batting:"Right Hand",
bowling:"Right Arm Cutter/Air Swing",
power:80,
strength:"Big hitting+Air Swing",
best:"83*",
weakness:"Short Ball",
image:"/players/x.jpg"
},
{
name:"Saheb",
role:"All Rounder",
batting:"Right Hand",
bowling:"In Swing",
power:87,
strength:"Snake Sweep",
best:"76",
weakness:"Dot Ball",
image:"/players/saheb.jpg"
},
{
name:"Aniket",
role:"Batsman",
batting:"Right Hand",
bowling:"Right Arm",
power:50,
strength:"Same short",
best:"69",
weakness:"Run Out",
image:"/players/x.jpg"
}


]

export default function Players(){

return(

<div className="min-h-screen text-white px-6 md:px-16 py-28">

<Navbar/>

<h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
Players
</h1>


{/* GRID */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">


{players.map((p,i)=>(

<motion.div
key={i}
whileHover={{scale:1.05}}
className="
relative
rounded-2xl
overflow-hidden
bg-white/5
backdrop-blur-xl
border border-white/10
shadow-xl
group
"
>

{/* IMAGE */}

<div className="relative h-64 overflow-hidden">

<img
src={p.image}
className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
/>

{/* GRADIENT OVERLAY */}

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

</div>


{/* INFO */}

<div className="p-6">

<h2 className="text-xl font-bold">
{p.name}
</h2>

<p className="text-sm text-gray-400 mb-4">
{p.role}
</p>


{/* STATS */}

<div className="space-y-2 text-sm">

<div className="flex justify-between">
<span>Batting</span>
<span>{p.batting}</span>
</div>

<div className="flex justify-between">
<span>Bowling</span>
<span>{p.bowling}</span>
</div>

<div className="flex justify-between">
<span>Best</span>
<span>{p.best}</span>
</div>

<div className="flex justify-between">
<span>Strength</span>
<span className="text-green-400">{p.strength}</span>
</div>

<div className="flex justify-between">
<span>Weakness</span>
<span className="text-red-400">{p.weakness}</span>
</div>

</div>


{/* POWER BAR */}

<div className="mt-5">

<div className="flex justify-between text-xs mb-1">
<span>Power</span>
<span>{p.power}</span>
</div>

<div className="w-full h-2 bg-white/10 rounded-full">

<div
className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
style={{width:`${p.power}%`}}
/>

</div>

</div>

</div>

</motion.div>

))}

</div>

</div>

)
}
