import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local")
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// @ts-ignore
if (!global._mongoClientPromise) {

  client = new MongoClient(uri)

  // @ts-ignore
  global._mongoClientPromise = client.connect()

}

 // @ts-ignore
clientPromise = global._mongoClientPromise

export async function connectDB() {
  const client = await clientPromise
  return client.db("haburmath")
}
