import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

/* GET EVENTS */

export async function GET(){

const db = await connectDB()

const events = await db.collection("events")
.find()
.sort({createdAt:-1})
.toArray()

return NextResponse.json(events)

}

/* ADD EVENT */

export async function POST(req:Request){

const body = await req.json()

if(body.password !== "rexunity"){
return NextResponse.json({error:"Unauthorized"},{status:401})
}

const db = await connectDB()

await db.collection("events").insertOne({
title: body.title,
date: body.date,
description: body.description,
image: body.image,
createdAt: new Date()
})

return NextResponse.json({success:true})

}

/* DELETE EVENT */

export async function DELETE(req:Request){

const {id,password} = await req.json()

if(password !== "rexunity"){
return NextResponse.json({error:"Unauthorized"},{status:401})
}

const db = await connectDB()

await db.collection("events").deleteOne({
_id:new ObjectId(id)
})

return NextResponse.json({success:true})

}

/* UPDATE EVENT */

export async function PUT(req:Request){

const body = await req.json()

if(body.password !== "rexunity"){
return NextResponse.json({error:"Unauthorized"},{status:401})
}

const db = await connectDB()

await db.collection("events").updateOne(
{_id:new ObjectId(body.id)},
{
$set:{
title:body.title,
date:body.date,
description:body.description,
image:body.image
}
}
)

return NextResponse.json({success:true})

}
