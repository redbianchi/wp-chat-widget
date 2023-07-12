const express = require('express');
const app = express();
const cors = require('cors');
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



  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
