const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  let client;
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    console.log('Successfully connected to MongoDB');
    const db = client.db('inventory_management');
    const collections = await db.listCollections().toArray();
    console.log('Collections in the database:', collections.map(c => c.name));
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    if (error.stack) {
      console.log('Error stack:', error.stack);
    }
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
    process.exit(0);
  }
}

testConnection().catch(console.log);

// Force exit after 10 seconds if the script hasn't completed
setTimeout(() => {
  console.log('Script timed out after 10 seconds');
  process.exit(1);
}, 10000);