"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"

export default function Achievements(){

const [data,setData] = useState<any[]>([])
const [loading,setLoading] = useState(true)
const [showForm,setShowForm] = useState(false)
const [editing,setEditing] = useState<any>(null)

const [password,setPassword] = useState("")
const [title,setTitle] = useState("")
const [date,setDate] = useState("")
const [desc,setDesc] = useState("")
const [image,setImage] = useState("")

/* LOAD */

async function load(){
setLoading(true)
const res = await fetch("/api/achievements")
const d = await res.json()
setData(d)
setLoading(false)
}

useEffect(()=>{
load()
},[])

/* IMAGE */

function handleFile(e:any){

const file = e.target.files[0]
if(!file) return

const reader = new FileReader()

reader.onloadend = ()=>{
setImage(reader.result as string)
}

reader.readAsDataURL(file)

}

/* SAVE */

async function save(){

if(password !== "rexunity"){
alert("Wrong password")
return
}

if(editing){

await fetch("/api/achievements",{
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

await fetch("/api/achievements",{
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

reset()
load()

}

/* DELETE */

async function remove(id:string){

if(password !== "rexunity"){
alert("Enter password")
return
}

await fetch("/api/achievements",{
method:"DELETE",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id,password})
})

load()

}

/* EDIT */

function edit(a:any){
setEditing(a)
setTitle(a.title)
setDate(a.date)
setDesc(a.description)
setImage(a.image)
setShowForm(true)
}

/* RESET */

function reset(){
setEditing(null)
setShowForm(false)
setTitle("")
setDate("")
setDesc("")
setImage("")
}

/* SKELETON LOADER */

function SkeletonCard(){
return(
<div className="animate-pulse rounded-2xl overflow-hidden bg-white/5 border border-white/10">
  <div className="h-60 bg-white/10"></div>
  <div className="p-6 space-y-3">
    <div className="h-6 bg-white/10 w-2/3 rounded"></div>
    <div className="h-4 bg-white/10 w-full rounded"></div>
    <div className="h-4 bg-white/10 w-1/2 rounded"></div>
  </div>
</div>
)
}

/* UI */

return(

<div className="min-h-screen text-white px-6 md:px-16 py-28">

<Navbar/>

<h1 className="text-6xl text-center mb-16 font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
Achievements
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
className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 font-semibold hover:scale-105 transition shadow-lg"
>
+ Add Achievement
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
placeholder="Title"
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

<input type="file" accept="image/*" onChange={handleFile}/>

{image && <img src={image} className="h-40 rounded object-cover"/>}

<button
onClick={save}
className="w-full py-3 rounded bg-gradient-to-r from-green-400 to-blue-500 font-bold"
>
{editing ? "Update" : "Publish"}
</button>

</motion.div>

)}

{/* GRID */}

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">

{loading
? Array.from({length:6}).map((_,i)=>(<SkeletonCard key={i}/>))
: data.map((a)=>(

<motion.div
key={a._id}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}
whileHover={{scale:1.05}}
className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10"
>

<img
src={a.image}
className="h-60 w-full object-cover"
/>

<div className="p-6">

<h2 className="text-2xl font-bold">{a.title}</h2>

<p className="text-gray-400 mt-2">{a.description}</p>

<p className="text-yellow-400 mt-4">
{new Date(a.date).toDateString()}
</p>

<div className="flex gap-3 mt-4">

<button
onClick={()=>edit(a)}
className="px-4 py-2 bg-yellow-500 rounded"
>
Edit
</button>

<button
onClick={()=>remove(a._id)}
className="px-4 py-2 bg-red-500 rounded"
>
Delete
</button>

</div>

</div>

</motion.div>

))
}

</div>

</div>

)
}
