const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function seedDatabase() {
  let client;
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }
    
    client = await MongoClient.connect(process.env.MONGODB_URI);
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

    // Hardware
    const hardware = [
      { name: 'Intel Core i7-11700K', type: 'CPU', description: 'High-performance CPU', investedPrice: 350, soldPrice: 400 },
      { name: 'NVIDIA RTX 3080', type: 'GPU', description: 'Powerful graphics card', investedPrice: 700, soldPrice: 800 },
      { name: 'Corsair Vengeance 32GB', type: 'RAM', description: 'High-capacity memory', investedPrice: 150, soldPrice: 180 },
      { name: 'Samsung 970 EVO Plus 1TB', type: 'Storage', description: 'Fast NVMe SSD', investedPrice: 150, soldPrice: 180 },
      { name: 'ASUS ROG Strix Z590-E', type: 'Motherboard', description: 'Feature-rich motherboard', investedPrice: 300, soldPrice: 350 },
    ];

    // Software
    const software = [
      { name: 'Windows 11 Pro', version: '21H2', licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX', investedPrice: 200 },
      { name: 'Microsoft Office 2021', version: 'Professional', licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX', investedPrice: 250 },
      { name: 'Adobe Photoshop', version: '2023', licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX', investedPrice: 300 },
      { name: 'AutoCAD', version: '2023', licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX', investedPrice: 1000 },
      { name: 'Norton 360', version: 'Deluxe', licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX', investedPrice: 50 },
    ];

    // Users
    const users = [
      { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', amountSpent: 2000, finnAccountName: 'johndoe123', finnProfileLink: 'https://www.finn.no/user/johndoe123', dateCreated: new Date() },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', amountSpent: 1500, finnAccountName: 'janesmith456', finnProfileLink: 'https://www.finn.no/user/janesmith456', dateCreated: new Date() },
      { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-555-5555', amountSpent: 3000, finnAccountName: 'bobjohnson789', finnProfileLink: 'https://www.finn.no/user/bobjohnson789', dateCreated: new Date() },
    ];

    // Sales
    const sales = [
      { userId: '', userName: 'John Doe', computerId: '', computerName: 'Custom Gaming PC', price: 1500, date: new Date() },
      { userId: '', userName: 'Jane Smith', computerId: '', computerName: 'Office Workstation', price: 1000, date: new Date() },
      { userId: '', userName: 'Bob Johnson', computerId: '', computerName: 'High-End Workstation', price: 2500, date: new Date() },
    ];

    // Insert data into collections
    console.log('Inserting hardware types...');
    await db.collection('hardware_types').insertMany(hardwareTypes);
    console.log('Inserting hardware...');
    await db.collection('hardware').insertMany(hardware);
    console.log('Inserting software...');
    await db.collection('software').insertMany(software);
    console.log('Inserting users...');
    await db.collection('users').insertMany(users);
    console.log('Inserting sales...');
    await db.collection('sales').insertMany(sales);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

seedDatabase();