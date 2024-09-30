const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Store your API key securely in an environment variable
});

app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Generate image using OpenAI API
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
