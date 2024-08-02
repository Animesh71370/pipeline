const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan'); // Import morgan
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Use morgan for logging HTTP requests
app.use(morgan('combined', { stream: accessLogStream })); // Log HTTP requests to access.log

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
