const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  let client;
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // 30 second timeout
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
    if (error.code) {
      console.log('Error code:', error.code);
    }
    if (error.codeName) {
      console.log('Error codeName:', error.codeName);
    }
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

testConnection().then(() => {
  console.log('Test connection script completed');
  process.exit(0);
}).catch((error) => {
  console.log('Test connection script failed:', error);
  process.exit(1);
});

// Force exit after 35 seconds if the script hasn't completed
setTimeout(() => {
  console.log('Script timed out after 35 seconds');
  process.exit(1);
}, 35000);