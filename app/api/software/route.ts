import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/db'

export async function GET() {
  try {
    const collection = await getCollection('software')
    const software = await collection.find({}).toArray()
    return NextResponse.json(software)
  } catch (error) {
    console.error('Error fetching software:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const collection = await getCollection('software')
    const result = await collection.insertOne(body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error adding software:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}