"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Navbar(){

const pathname = usePathname()
const [open,setOpen] = useState(false)

const links = [
{ name:"Home", href:"/" },
{ name:"Players", href:"/players" },
{ name:"Toss", href:"/toss" },
{ name:"Achievements", href:"/achievements" },
{ name:"Events", href:"/events" },
{ name:"Gallery", href:"/gallery" }
]

return(

<nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

{/* LOGO */}

<Link
href="/"
className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
>
HABUR MATH
</Link>


{/* DESKTOP MENU */}

<div className="hidden md:flex items-center space-x-8 text-sm">

{links.map((link)=>{

const active = pathname === link.href

return(

<Link
key={link.href}
href={link.href}
className={`relative transition 
${active ? "text-white" : "text-gray-400 hover:text-white"}`}
>

{link.name}

<span
className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-purple-400 to-blue-400 transition 
${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
></span>

</Link>

)

})}

</div>


{/* MOBILE BUTTON */}

<button
onClick={()=>setOpen(!open)}
className="md:hidden text-white"
>
☰
</button>

</div>


{/* MOBILE MENU */}

{open && (

<div className="md:hidden px-6 pb-6 space-y-4">

{links.map(link=>(

<Link
key={link.href}
href={link.href}
className="block text-gray-300 hover:text-white"
>
{link.name}
</Link>

))}

</div>

)}

</nav>

)
}
