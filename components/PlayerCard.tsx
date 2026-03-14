import Image from "next/image"

export default function PlayerCard({player}:any){

return (

<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:scale-105 transition duration-300 shadow-xl">

<Image
src={player.image}
alt={player.name}
width={200}
height={200}
className="rounded-xl mx-auto"
/>

<h3 className="text-center text-xl font-bold mt-4">
{player.name}
</h3>

<p className="text-center text-purple-400">
{player.role}
</p>

<div className="flex justify-between mt-4 text-sm text-gray-400">

<span>
Runs: {player.runs}
</span>

<span>
Wkts: {player.wickets}
</span>

</div>

</div>

)

}
