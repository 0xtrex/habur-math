"use client"

import { useState } from "react"

export default function Events(){

const [events,setEvents] = useState([
{
title:"Friendly Match",
date:"2026-04-01",
description:"Habur Math vs Tigers XI",
image:"/events/event1.jpg"
},
{
title:"Weekend Practice",
date:"2026-03-20",
description:"Team practice session",
image:"/events/event2.jpg"
}
])

return(

<div className="min-h-screen text-white px-6 md:px-16 py-28">

<h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
Events
</h1>

<div className="grid md:grid-cols-3 gap-10">

{events.map((e,i)=>{

const target = new Date(e.date).getTime()
const now = new Date().getTime()
const diff = target-now

const days = Math.floor(diff/(1000*60*60*24))

return(

<div
key={i}
className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition"
>

<img
src={e.image}
className="w-full h-60 object-cover"
/>

<div className="p-6">

<h2 className="text-2xl font-semibold">
{e.title}
</h2>

<p className="text-gray-400 mt-2">
{e.description}
</p>

<p className="text-purple-400 mt-4">
{days} days remaining
</p>

</div>

</div>

)

})}

</div>

</div>

)
}
