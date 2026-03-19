"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CricketParticleBall from "@/components/CricketParticleBall"

export default function Home(){

const audioRef = useRef<HTMLAudioElement | null>(null)

function playSound(){

if(!audioRef.current){
audioRef.current = new Audio("/jai-shree-ram.mp3")
}

audioRef.current.currentTime = 0
audioRef.current.play().catch(()=>{})

}

return(

<main className="relative min-h-screen text-white overflow-hidden">

{/* Background */}
<CricketParticleBall />

<Navbar />

<section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
className="text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text"
>
HABUR MATH
</motion.h1>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.5}}
className="mt-6 text-xl text-gray-300 max-w-xl"
>
A community playground where cricket, football and friendship
create unforgettable memories.
</motion.p>

<motion.button
onClick={playSound}
whileHover={{scale:1.1}}
whileTap={{scale:0.95}}
className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-semibold shadow-lg shadow-purple-500/30"
>
Explore Playground
</motion.button>

</section>

<section className="py-32 text-center">

<h2 className="text-4xl font-bold mb-16">
Our Sports
</h2>

<div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto px-6">

<div className="p-10 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
<h3 className="text-2xl font-semibold mb-4">
Cricket
</h3>
<p className="text-gray-400">
Cricket is the main sport played at HABUR MATH.
</p>
</div>

<div className="p-10 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
<h3 className="text-2xl font-semibold mb-4">
Football
</h3>
<p className="text-gray-400">
Football is also played frequently by the community.
</p>
</div>

</div>

</section>

<Footer />

</main>

)
}
