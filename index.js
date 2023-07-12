const express = require('express');
const cors = require('cors');
require('dotenv').config();
const openai = require('openai');
const app = express();

app.use(cors());

openai.apiKey = process.env.OPENAI_API_KEY;

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
    const prompt = `I read this article: ${content}. ${question}`;
  
    try {
      const gptResponse = await openai.Completion.create({
        engine: 'text-davinci-002',
        prompt: prompt,
        max_tokens: 60
      });
  
      res.send(gptResponse.choices[0].text.strip());
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
