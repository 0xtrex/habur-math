"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"

export default function TossPage() {

const [result,setResult] = useState("")
const [flipping,setFlipping] = useState(false)

function tossCoin(){

if(flipping) return

setFlipping(true)
setResult("")

setTimeout(()=>{

const array = new Uint32Array(1)
window.crypto.getRandomValues(array)

const toss = array[0] % 2 === 0 ? "HEADS" : "TAILS"

setResult(toss)
setFlipping(false)

},2500)

}

return(

<main className="min-h-screen flex flex-col items-center justify-center text-white">

<Navbar/>

<h1 className="text-5xl font-bold mb-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
Cricket Toss
</h1>

{/* Coin */}

<motion.div
animate={flipping ? { rotateY: 1440 } : { rotateY: 0 }}
transition={{ duration: 2.5 }}
className="text-[120px] mb-10"
>
🪙
</motion.div>

{/* Toss Button */}

<button
onClick={tossCoin}
className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-bold hover:scale-110 transition shadow-lg"
>
TOSS COIN
</button>

{/* Result */}

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
