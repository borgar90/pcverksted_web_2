import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/db'

export async function GET() {
  const collection = await getCollection('users')
  const users = await collection.find({}).toArray()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const collection = await getCollection('users')
  const result = await collection.insertOne(body)
  return NextResponse.json(result)
}