"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function CricketAnimation() {

const [hit,setHit] = useState(false)

function startPlay(){
setHit(true)
setTimeout(()=>setHit(false),4000)
}

return (

<div className="flex flex-col items-center justify-center mt-20">

{/* Pitch */}

<div className="relative w-[600px] h-[250px] bg-green-700 rounded-xl overflow-hidden">

{/* Batsman */}

<div className="absolute right-16 bottom-10 text-5xl">
🏏
</div>

{/* Bowler */}

<motion.div
animate={hit ? {x:200} : {x:0}}
transition={{duration:1}}
className="absolute left-10 bottom-10 text-5xl"
>
🏃
</motion.div>

{/* Ball */}

{hit && (

<motion.div
initial={{x:80,y:120}}
animate={{
x:[80,250,420],
y:[120,110,20]
}}
transition={{duration:2}}
className="absolute text-2xl"
>
⚪
</motion.div>

)}

</div>

<button
onClick={startPlay}
className="mt-10 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
>
Play Shot
</button>

</div>

)
}
