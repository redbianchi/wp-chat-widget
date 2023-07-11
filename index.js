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
  
      // Call the OpenAI API to get the answer
      const openAIResponse = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt,
        max_tokens: 200,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      });
  
      const answer = openAIResponse.data.choices[0].text.trim();
  
      // Send the answer back to the client
      res.json({ answer });
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
