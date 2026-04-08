"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import { useEffect, useState } from "react"
import Tilt from "react-parallax-tilt"

interface Player {
  _id?: string
  name: string
  role: string
  batting: string
  bowling: string
  power: number
  strength: string
  best: string
  weakness: string
  team?: string
  image: string
}

const teams = ["RR","PBKS","RCB","DC","SRH","LSG","MI","KKR","GT","CSK"]

export default function Players() {

  const [players, setPlayers] = useState<Player[]>([])
  const [admin, setAdmin] = useState(false)
  const [password, setPassword] = useState("")
  const [editing, setEditing] = useState<Player | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchPlayers() }, [])

  const fetchPlayers = async () => {
    const res = await fetch("/api/players")
    const data = await res.json()
    setPlayers(data)
  }

  const getTier = (power:number) => {
    if (power >= 95) return "Diamond"
    if (power >= 85) return "Gold"
    if (power >= 70) return "Silver"
    if (power >= 50) return "Copper"
    return "Iron"
  }

  const nameColor:any = {
    Diamond: "bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent",
    Gold: "bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent",
    Silver: "bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent",
    Copper: "bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent",
    Iron: "text-gray-400"
  }

  const barColor:any = {
    Diamond: "from-cyan-300 to-blue-500",
    Gold: "from-yellow-300 to-yellow-600",
    Silver: "from-gray-200 to-gray-500",
    Copper: "from-orange-400 to-orange-700",
    Iron: "from-gray-500 to-gray-800"
  }

  const glow:any = {
    Diamond: "shadow-[0_0_60px_rgba(0,200,255,0.8)]",
    Gold: "shadow-[0_0_60px_rgba(255,215,0,0.8)]",
    Silver: "shadow-[0_0_50px_rgba(200,200,200,0.7)]",
    Copper: "shadow-[0_0_50px_rgba(255,120,50,0.7)]",
    Iron: "shadow-[0_0_40px_rgba(120,120,120,0.7)]"
  }

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })

  const savePlayer = async () => {
    if (!editing) return
    setLoading(true)

    let image = editing.image
    if (file) image = await toBase64(file)

    const method = editing._id ? "PUT" : "POST"

    await fetch("/api/players", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editing, image })
    })

    setLoading(false)
    setEditing(null)
    setFile(null)
    fetchPlayers()
  }

  return (
    <div className="min-h-screen text-white px-6 md:px-16 py-24">

      <Navbar />

      <h1 className="text-5xl text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Players
      </h1>

      {/* ADMIN */}
      <div className="flex justify-center mb-8 gap-3">
        <input type="password" placeholder="Admin password"
          className="px-4 py-2 bg-white/10 rounded-lg border border-white/20"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button onClick={()=>password==="rexunity" && setAdmin(true)}
          className="px-4 py-2 bg-purple-500 rounded-lg">
          Admin
        </button>
      </div>

      {admin && (
        <div className="text-center mb-10">
          <button onClick={()=>setEditing({
            name:"",role:"",batting:"",bowling:"",
            power:50,strength:"",best:"",weakness:"",team:"",image:""
          })}
          className="px-6 py-3 bg-green-500 rounded-xl">
            + Add Player
          </button>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

        {players.map((p,i)=>{
          const tier = getTier(p.power)

          return (
            <Tilt key={i} tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.05}>
              <motion.div
                whileHover={{ scale: 1.06 }}
                className={`rounded-2xl overflow-hidden border backdrop-blur-xl ${glow[tier]}`}
              >

                <div className="relative h-64">
                  <img src={p.image} className="w-full h-full object-cover"/>
                </div>

                <div className="p-5">
                  <div className="flex justify-between">
                    <h2 className={`${nameColor[tier]} font-semibold`}>
                      {p.name}
                    </h2>
                    {p.team && <img src={`/${p.team.toLowerCase()}.png`} className="h-6"/>}
                  </div>

                  <p className="text-xs text-gray-300 mb-2">{p.role}</p>

                  <div className="text-sm">
                    <p>Bat: {p.batting}</p>
                    <p>Ball: {p.bowling}</p>
                    <p>Best: {p.best}</p>
                    <p className="text-green-400">{p.strength}</p>
                    <p className="text-red-400">{p.weakness}</p>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs">
                      <span>Power</span>
                      <span>{p.power}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded">
                      <div className={`h-2 bg-gradient-to-r ${barColor[tier]} rounded`}
                        style={{width:`${p.power}%`}}/>
                    </div>
                  </div>

                  {admin && (
                    <div className="flex gap-2 mt-3">
                      <button onClick={()=>setEditing(p)} className="flex-1 bg-white/10 py-1">Edit</button>
                      <button onClick={async ()=>{
                        await fetch("/api/players",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:p._id})})
                        fetchPlayers()
                      }} className="flex-1 bg-red-500 py-1">Delete</button>
                    </div>
                  )}

                </div>
              </motion.div>
            </Tilt>
          )
        })}
      </div>

      {/* MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center">

          <div className="bg-zinc-900 p-6 rounded-xl w-96 space-y-3">

            {[
              ["name","Name"],
              ["role","Role"],
              ["batting","Batting Style"],
              ["bowling","Bowling Style"],
              ["best","Best Skill"],
              ["strength","Strength"],
              ["weakness","Weakness"]
            ].map(([field,label])=>(
              <input key={field}
                placeholder={label}
                value={(editing as any)[field]}
                onChange={(e)=>setEditing({...editing,[field]:e.target.value})}
                className="w-full p-3 bg-white/10 rounded border border-white/20 placeholder-gray-400"
              />
            ))}

            {/* FIXED DROPDOWN */}
            <select
              value={editing.team || ""}
              onChange={(e)=>setEditing({...editing,team:e.target.value})}
              className="w-full p-3 bg-zinc-800 text-white rounded border border-white/20"
            >
              <option value="">Select Team</option>
              {teams.map(t=>(
                <option key={t} value={t} className="bg-zinc-800">{t}</option>
              ))}
            </select>

            <input type="number"
              placeholder="Power"
              value={editing.power}
              onChange={(e)=>setEditing({...editing,power:Number(e.target.value)})}
              className="w-full p-3 bg-white/10 rounded border border-white/20"
            />

            <input type="file"
              className="text-sm text-gray-300"
              onChange={(e)=>{
                const f = e.target.files?.[0]
                if(f) setFile(f)
              }}
            />

            {/* SAVE BUTTON WITH LOADING */}
            <button
              onClick={savePlayer}
              className="w-full bg-green-500 py-2 rounded flex justify-center items-center"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button onClick={()=>setEditing(null)}
              className="w-full bg-red-500 py-2 rounded">
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  )
}
