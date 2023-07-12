const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit-url', (req, res) => {
  const { url } = req.body;
  // Process the URL or perform any desired actions with it
  console.log('Received URL:', url);
  res.send('URL received');
});



  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
