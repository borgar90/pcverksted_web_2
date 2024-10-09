const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function seedDatabase() {
  let client;
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    
    client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 60000, // Increase timeout to 60 seconds
      connectTimeoutMS: 60000,
      socketTimeoutMS: 60000,
    });

    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('inventory_management');

    // Hardware Types
    const hardwareTypes = [
      { name: 'CPU', customFields: [{ label: 'Cores', value: '' }, { label: 'Clock Speed', value: '' }] },
      { name: 'GPU', customFields: [{ label: 'VRAM', value: '' }, { label: 'Core Clock', value: '' }] },
      { name: 'RAM', customFields: [{ label: 'Capacity', value: '' }, { label: 'Speed', value: '' }] },
      { name: 'Storage', customFields: [{ label: 'Capacity', value: '' }, { label: 'Type', value: '' }] },
      { name: 'Motherboard', customFields: [{ label: 'Socket', value: '' }, { label: 'Form Factor', value: '' }] },
    ];

    console.log('Inserting hardware types...');
    const result = await db.collection('hardware_types').insertMany(hardwareTypes);
    console.log('Hardware types inserted:', result.insertedCount);

    // Add more data insertion here...

    console.log('Database seeded successfully');
  } catch (error) {
    console.log('Error seeding database:', error);
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

seedDatabase().then(() => {
  console.log('Seed script completed');
  process.exit(0);
}).catch((error) => {
  console.log('Seed script failed:', error);
  process.exit(1);
});

// Force exit after 70 seconds if the script hasn't completed
setTimeout(() => {
  console.log('Script timed out after 70 seconds');
  process.exit(1);
}, 70000);