"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function JaiShreeRamButton(){

const [active,setActive] = useState(false)

function trigger(){

setActive(true)

const audio = new Audio("/jai-shree-ram.mp3")
audio.play().catch(()=>{})

setTimeout(()=>{
setActive(false)
},4000)

}

/* controlled particle lanes */

const columns = 7
const rows = 3

const particles = []

for(let i=0;i<columns;i++){
for(let j=0;j<rows;j++){

particles.push({
left:(i+0.5)*(100/columns),
delay:j*0.35 + Math.random()*0.2,
size:26 + Math.random()*10
})

}
}

return(

<>

{/* FLOATING BUTTON */}

<button
onClick={trigger}
className="
fixed bottom-8 right-8 z-50
px-6 py-3
rounded-full
bg-orange-500 hover:bg-orange-600
text-white font-bold
shadow-xl shadow-orange-500/40
hover:scale-110
transition
"
>
🕉 JAI SHREE RAM
</button>


{/* FLOATING DIVINE TEXTS */}

<AnimatePresence>

{active && particles.map((p,i)=>(

<motion.div
key={i}

initial={{
opacity:0,
y:40,
scale:0.9
}}

animate={{
opacity:[0,1,1,0],
y:-220,
scale:[0.9,1,1]
}}

exit={{opacity:0}}

transition={{
duration:3.5,
delay:p.delay,
ease:"easeOut"
}}

className="
fixed
pointer-events-none
select-none
text-center
font-bold
text-orange-400
drop-shadow-[0_0_10px_rgba(255,140,0,0.8)]
"

style={{
left:`${p.left}%`,
top:"75%",
fontSize:p.size
}}

>

<div className="leading-none">
<div>जय श्री</div>
<div className="text-3xl font-extrabold">राम</div>
</div>

</motion.div>

))}

</AnimatePresence>

</>

)

}
