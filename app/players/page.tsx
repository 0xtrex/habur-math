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

  useEffect(() => {
    fetchPlayers()
  }, [])

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

  const glow:any = {
    Diamond: "shadow-[0_0_50px_rgba(0,200,255,0.7)]",
    Gold: "shadow-[0_0_50px_rgba(255,215,0,0.7)]",
    Silver: "shadow-[0_0_40px_rgba(200,200,200,0.6)]",
    Copper: "shadow-[0_0_40px_rgba(255,120,50,0.6)]",
    Iron: "shadow-[0_0_30px_rgba(120,120,120,0.6)]"
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

  const savePlayer = async () => {
    if (!editing) return

    let image = editing.image

    if (file) {
      const form = new FormData()
      form.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form
      })

      const data = await res.json()
      image = data.url
    }

    const method = editing._id ? "PUT" : "POST"

    await fetch("/api/players", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editing, image })
    })

    setEditing(null)
    setFile(null)
    fetchPlayers()
  }

  return (
    <div className="min-h-screen text-white px-6 md:px-16 py-24">

      <Navbar />

      <h1 className="text-5xl font-semibold text-center mb-12 tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Players
      </h1>

      <div className="flex justify-center mb-8 gap-3">
        <input
          type="password"
          placeholder="Admin password"
          className="px-4 py-2 bg-white/10 rounded-lg"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button
          onClick={()=>password==="rexunity" && setAdmin(true)}
          className="px-4 py-2 bg-purple-500 rounded-lg"
        >
          Admin
        </button>
      </div>

      {admin && (
        <div className="text-center mb-10">
          <button
            onClick={()=>setEditing({
              name:"",role:"",batting:"",bowling:"",
              power:50,strength:"",best:"",weakness:"",team:"",image:""
            })}
            className="px-6 py-3 bg-green-500 rounded-xl"
          >
            + Add Player
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

        {players.map((p,i)=>{

          const tier = getTier(p.power)

          return (
            <Tilt key={i} tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.03} glareEnable glareMaxOpacity={0.25}>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`relative rounded-2xl overflow-hidden backdrop-blur-xl border ${glow[tier]}`}
              >

                {/* SHIMMER */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -left-1/2 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 animate-[shimmer_3s_linear_infinite]" />
                </div>

                {/* TEXTURE */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none 
                bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]"/>

                {/* IMAGE */}
                <div className="relative h-64">
                  <img src={p.image} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"/>
                </div>

                {/* CONTENT */}
                <div className="p-5 relative z-10">

                  <div className="flex justify-between items-center mb-2">

                    <h2 className={`text-lg font-semibold ${nameColor[tier]}`}>
                      {p.name}
                    </h2>

                    {p.team && (
                      <img src={`/${p.team.toLowerCase()}.png`} className="h-7 w-7"/>
                    )}

                  </div>

                  <p className="text-xs text-gray-300 mb-3">{p.role}</p>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>Bat</span><span>{p.batting}</span></div>
                    <div className="flex justify-between"><span>Ball</span><span>{p.bowling}</span></div>
                    <div className="flex justify-between"><span>Best</span><span>{p.best}</span></div>
                    <div className="flex justify-between text-green-400"><span>Strength</span><span>{p.strength}</span></div>
                    <div className="flex justify-between text-red-400"><span>Weakness</span><span>{p.weakness}</span></div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs">
                      <span>Power</span>
                      <span>{p.power}</span>
                    </div>

                    <div className="h-2 bg-white/10 rounded mt-1">
                      <div
                        className={`h-2 bg-gradient-to-r ${barColor[tier]} rounded`}
                        style={{width:`${p.power}%`}}
                      />
                    </div>
                  </div>

                  {admin && (
                    <div className="flex gap-2 mt-4">
                      <button onClick={()=>setEditing(p)} className="flex-1 bg-white/10 py-1 rounded">Edit</button>
                      <button onClick={async ()=>{
                        await fetch("/api/players",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:p._id})})
                        fetchPlayers()
                      }} className="flex-1 bg-red-500 py-1 rounded">Delete</button>
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
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">

          <div className="bg-zinc-900 p-6 rounded-xl w-96 space-y-3">

            {["name","role","batting","bowling","best","strength","weakness"].map(field=>(
              <input key={field}
                value={(editing as any)[field]}
                onChange={(e)=>setEditing({...editing,[field]:e.target.value})}
                className="w-full p-2 bg-white/10 rounded"
                placeholder={field}
              />
            ))}

            <div className="relative">
              <select
                value={editing.team || ""}
                onChange={(e)=>setEditing({...editing,team:e.target.value})}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white appearance-none"
              >
                <option value="" className="bg-black">Select Team</option>
                {teams.map(t=>(
                  <option key={t} value={t} className="bg-black">{t}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</div>
            </div>

            <input type="number"
              value={editing.power}
              onChange={(e)=>setEditing({...editing,power:Number(e.target.value)})}
              className="w-full p-2 bg-white/10 rounded"
            />

            <input type="file" onChange={(e)=>{
              const f = e.target.files?.[0]
              if(f) setFile(f)
            }}/>

            <button onClick={savePlayer} className="w-full bg-green-500 py-2 rounded">Save</button>
            <button onClick={()=>setEditing(null)} className="w-full bg-red-500 py-2 rounded">Cancel</button>

          </div>

        </div>
      )}

    </div>
  )
}
