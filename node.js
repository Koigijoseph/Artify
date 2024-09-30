const express = require('express');
const OpenAI = require('openai'); // Ensure OpenAI package is installed
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON body
app.use(express.json());

// Serve the HTML page on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Ensure 'index.html' is in the root directory
});

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Ensure the key is stored in a .env file
});

// Route to handle image generation
app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Generate image using OpenAI's image API
    const completion = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    });

    const imageUrl = completion.data[0].url;
    res.json({ imageUrl });

  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
