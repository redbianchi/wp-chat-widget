const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const cheerio = require('cheerio');

const app = express();


// Enable CORS
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// Handle POST request to /ask endpoint
app.post('/ask', async (req, res) => {
    const { question, url } = req.body; // Access the URL from the request payload
  
    try {
      // Fetch the webpage content using the provided URL
      const response = await axios.get(url);
  
      // Extract the desired text from the webpage using cheerio or any other parsing library
      const $ = cheerio.load(response.data);
      const text = $('body').text();
  
      // Include the text in the prompt for question-answering
      const prompt = `${text}\n\nQ: ${question}\nA:`;
  
      // Perform the question-answering process using OpenAI or any other API
      // ...
  
      // Send the response back to the client
      res.json({ answer: 'Answer goes here' });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
