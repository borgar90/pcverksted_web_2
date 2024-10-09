import clientPromise from './mongodb'

export async function getCollection(collectionName: string) {
  const client = await clientPromise
  const db = client.db('inventory_management')
  return db.collection(collectionName)
}