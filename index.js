const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();


// Enable CORS
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// Handle POST request to /ask endpoint
app.post('/ask', async (req, res) => {
  const { question, context } = req.body;

  const prompt = `${context}\n\nQ: ${question}\nA:`;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt,
      max_tokens: 200,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    // Extract the answer from the response
    const answer = response.data.choices[0].text;

    res.json({ answer });
  } catch (error) {
    console.error('ChatGPT API call failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
