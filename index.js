const express = require('express');
const cors = require('cors');
require('dotenv').config();
const openai = require('openai');
const axios = require('axios');
const app = express();

app.use(cors());



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit-url', (req, res) => {
    const { url, content } = req.body;
  // Process the URL or perform any desired actions with it
  console.log('Received URL:', url);
  console.log('Received content:', content);
  res.send('URL and content received');
});

app.post('/ask-question', async (req, res) => {
    const { content, question } = req.body;
    const prompt = `I've just read the 5 key insights from a non-fiction book. ere they are: ${content}. Now, to answer your question: ${question}`;
  
    try {
        const gptResponse = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: prompt,
            max_tokens: 200
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.send(gptResponse.data.choices[0].text.trim());
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
