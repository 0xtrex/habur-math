import { connectDB } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

// GET
export async function GET() {
  const db = await connectDB()
  const players = await db.collection("players").find().toArray()
  return NextResponse.json(players)
}

// ADD
export async function POST(req: Request) {
  const db = await connectDB()
  const body = await req.json()

  const result = await db.collection("players").insertOne(body)

  return NextResponse.json({
    ...body,
    _id: result.insertedId.toString()
  })
}

// UPDATE
export async function PUT(req: Request) {
  const db = await connectDB()
  const body = await req.json()

  const id = new ObjectId(body._id)
  const { _id, ...data } = body

  await db.collection("players").updateOne(
    { _id: id },
    { $set: data }
  )

  return NextResponse.json({ success: true })
}

// DELETE
export async function DELETE(req: Request) {
  const db = await connectDB()
  const { id } = await req.json()

  await db.collection("players").deleteOne({
    _id: new ObjectId(id)
  })

  return NextResponse.json({ success: true })
}
