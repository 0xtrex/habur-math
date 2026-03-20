import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

/* GET */

export async function GET(){

const db = await connectDB()

const data = await db.collection("achievements")
.find()
.sort({createdAt:-1})
.toArray()

return NextResponse.json(data)

}

/* POST */

export async function POST(req:Request){

const body = await req.json()

if(body.password !== "rexunity"){
return NextResponse.json({error:"Unauthorized"},{status:401})
}

const db = await connectDB()

await db.collection("achievements").insertOne({
title: body.title,
description: body.description,
date: body.date,
image: body.image,
createdAt: new Date()
})

return NextResponse.json({success:true})

}

/* DELETE */

export async function DELETE(req:Request){

const {id,password} = await req.json()

if(password !== "rexunity"){
return NextResponse.json({error:"Unauthorized"},{status:401})
}

const db = await connectDB()

await db.collection("achievements").deleteOne({
_id:new ObjectId(id)
})

return NextResponse.json({success:true})

}

/* UPDATE */

export async function PUT(req:Request){

const body = await req.json()

if(body.password !== "rexunity"){
return NextResponse.json({error:"Unauthorized"},{status:401})
}

const db = await connectDB()

await db.collection("achievements").updateOne(
{_id:new ObjectId(body.id)},
{
$set:{
title:body.title,
description:body.description,
date:body.date,
image:body.image
}
}
)

return NextResponse.json({success:true})

}
