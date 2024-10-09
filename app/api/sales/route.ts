import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/db'

export async function GET() {
  const collection = await getCollection('sales')
  const sales = await collection.find({}).toArray()
  return NextResponse.json(sales)
}

export async function POST(request: Request) {
  const body = await request.json()
  const collection = await getCollection('sales')
  const result = await collection.insertOne(body)
  return NextResponse.json(result)
}