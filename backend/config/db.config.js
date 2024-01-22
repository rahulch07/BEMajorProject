// backend/config/db.config.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user1:135792468@cluster0.keoo882.mongodb.net/yoga_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
});
console.log("Connected Sucessfully")

const db = mongoose.connection;



// Event handling for successful connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event handling for connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Event handling for disconnection
db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Close the MongoDB connection when the Node.js process is terminated
// process.on('SIGINT', () => {
//   db.close(() => {
//     console.log('MongoDB connection closed due to application termination');
//     process.exit(0);
//   });
// });

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});