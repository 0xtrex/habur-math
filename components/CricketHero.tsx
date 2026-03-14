"use client"

import { motion } from "framer-motion"

export default function CricketHero() {

return (

<div className="flex justify-center mt-16">

<svg
width="700"
height="300"
viewBox="0 0 700 300"
className="overflow-visible"
>

{/* Pitch */}
<rect x="0" y="200" width="700" height="100" fill="#1e7f3b" />

{/* Bowler (triangle figure) */}

<motion.polygon
points="80,160 60,200 100,200"
fill="#ffffff"
animate={{ x: [0, 220] }}
transition={{ duration: 1.5 }}
/>

{/* Batsman body */}

<polygon
points="520,160 500,200 540,200"
fill="#ffffff"
/>

{/* Bat */}

<polygon
points="540,160 560,130 565,135 545,170"
fill="#cccccc"
/>

{/* Ball */}

<motion.circle
cx="100"
cy="190"
r="6"
fill="red"
animate={{
cx:[100,520,650],
cy:[190,180,80]
}}
transition={{
duration:2,
delay:1.2
}}
/>

</svg>

</div>

)

}
