javascript
Copy code
// Import required packages
const express = require('express');
const mongoose = require('mongoose');

// Create an instance of the Express app
const app = express();

// Set up middleware
app.use(express.json());

// Set up database connection
mongoose.connect('mongodb://localhost/nft-marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define routes
app.get('/', function(req, res) {
  res.send('Welcome to the NFT marketplace!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
