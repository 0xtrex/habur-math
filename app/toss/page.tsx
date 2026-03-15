"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"

export default function TossPage(){

const [result,setResult] = useState<"HEADS"|"TAILS"|null>(null)
const [flipping,setFlipping] = useState(false)
const [rotation,setRotation] = useState(0)

const audioRef = useRef<HTMLAudioElement | null>(null)

/* toss */

function tossCoin(){

if(flipping) return

setFlipping(true)
setResult(null)

/* play coin flip sound */

if(!audioRef.current){
audioRef.current = new Audio("/toss.mp3")
}

audioRef.current.currentTime = 0
audioRef.current.play().catch(()=>{})

const spins = 1800

const random = new Uint32Array(1)
window.crypto.getRandomValues(random)

const toss = random[0] % 2 === 0 ? "HEADS" : "TAILS"

/* calculate final rotation */

const finalAngle = spins + (toss === "HEADS" ? 0 : 180)

setRotation(finalAngle)

/* reveal result after spin */

setTimeout(()=>{

setResult(toss)
setFlipping(false)

/* reset stable position */

setRotation(toss === "HEADS" ? 0 : 180)

},2200)

}

return(

<main className="min-h-screen flex flex-col items-center justify-center text-white">

<Navbar/>

<h1 className="text-5xl font-bold mb-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
Cricket Toss
</h1>


{/* COIN */}

<motion.div
animate={{ rotateY: rotation }}
transition={{ duration:2.2, ease:"easeInOut" }}
className="w-40 h-40 mb-12 relative"
style={{ transformStyle:"preserve-3d" }}
>

{/* HEADS */}

<img
src="/toss/heads.png"
className="absolute w-full h-full object-contain"
style={{ backfaceVisibility:"hidden" }}
/>

{/* TAILS */}

<img
src="/toss/tails.png"
className="absolute w-full h-full object-contain"
style={{
transform:"rotateY(180deg)",
backfaceVisibility:"hidden"
}}
/>

</motion.div>


{/* BUTTON */}

<button
onClick={tossCoin}
className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-bold hover:scale-110 transition shadow-lg"
>
TOSS COIN
</button>


{/* RESULT */}

{result && (

<motion.div
initial={{opacity:0,scale:0.5}}
animate={{opacity:1,scale:1}}
className="mt-12 text-5xl font-bold text-yellow-400"
>
{result}
</motion.div>

)}

</main>

)
}
