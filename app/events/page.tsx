"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"

export default function Events(){

const [events,setEvents] = useState<any[]>([])
const [showForm,setShowForm] = useState(false)
const [editing,setEditing] = useState<any>(null)

const [password,setPassword] = useState("")
const [title,setTitle] = useState("")
const [date,setDate] = useState("")
const [desc,setDesc] = useState("")
const [image,setImage] = useState("")

/* LOAD EVENTS */

async function loadEvents(){
const res = await fetch("/api/events")
const data = await res.json()
setEvents(data)
}

useEffect(()=>{
loadEvents()
},[])

/* IMAGE TO BASE64 */

function handleFile(e:any){

const file = e.target.files[0]
if(!file) return

const reader = new FileReader()

reader.onloadend = ()=>{
setImage(reader.result as string)
}

reader.readAsDataURL(file)

}

/* ADD OR UPDATE */

async function saveEvent(){

if(password !== "rexunity"){
alert("Wrong password")
return
}

if(editing){

await fetch("/api/events",{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
id:editing._id,
title,
date,
description:desc,
image,
password
})
})

}else{

await fetch("/api/events",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
title,
date,
description:desc,
image,
password
})
})

}

resetForm()
loadEvents()

}

/* DELETE */

async function deleteEvent(id:string){

if(password !== "rexunity"){
alert("Enter password first")
return
}

await fetch("/api/events",{
method:"DELETE",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id,password})
})

loadEvents()

}

/* EDIT */

function editEvent(e:any){

setEditing(e)
setTitle(e.title)
setDate(e.date)
setDesc(e.description)
setImage(e.image)
setShowForm(true)

}

/* RESET */

function resetForm(){
setEditing(null)
setShowForm(false)
setTitle("")
setDate("")
setDesc("")
setImage("")
}

/* UI */

return(

<div className="min-h-screen text-white px-6 md:px-16 py-28">

<Navbar/>

<h1 className="text-6xl text-center mb-16 font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
Events
</h1>


{/* PASSWORD */}

<div className="max-w-md mx-auto mb-10">

<input
type="password"
placeholder="Admin Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full p-3 rounded bg-black/40"
/>

</div>


{/* ADD BUTTON */}

<div className="flex justify-center mb-12">

<button
onClick={()=>setShowForm(true)}
className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:scale-105 transition shadow-lg"
>
+ Create Event
</button>

</div>


{/* FORM */}

{showForm && (

<motion.div
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4"
>

<input
placeholder="Event Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="w-full p-3 rounded bg-black/40"
/>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
className="w-full p-3 rounded bg-black/40"
/>

<textarea
placeholder="Description"
value={desc}
onChange={(e)=>setDesc(e.target.value)}
className="w-full p-3 rounded bg-black/40"
/>

<input
type="file"
accept="image/*"
onChange={handleFile}
/>

{image && <img src={image} className="h-40 rounded"/>}

<button
onClick={saveEvent}
className="w-full py-3 rounded bg-gradient-to-r from-green-400 to-blue-500 font-bold"
>
{editing ? "Update Event" : "Publish Event"}
</button>

</motion.div>

)}


{/* EVENTS GRID */}

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">

{events.map((e)=>{

return(

<motion.div
key={e._id}
whileHover={{scale:1.05}}
className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10"
>

<img src={e.image} className="h-60 w-full object-cover"/>

<div className="p-6">

<h2 className="text-2xl font-bold">{e.title}</h2>

<p className="text-gray-400 mt-2">{e.description}</p>

<p className="text-purple-400 mt-4">
{new Date(e.date).toDateString()}
</p>


{/* ADMIN CONTROLS */}

<div className="flex gap-3 mt-4">

<button
onClick={()=>editEvent(e)}
className="px-4 py-2 bg-yellow-500 rounded"
>
Edit
</button>

<button
onClick={()=>deleteEvent(e._id)}
className="px-4 py-2 bg-red-500 rounded"
>
Delete
</button>

</div>

</div>

</motion.div>

)

})}

</div>

</div>

)
}
