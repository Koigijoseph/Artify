const completion = await openai.images.generate({
  prompt: prompt,
  n: 1,
  size: "1024x1024"
});

const imageUrl = completion.data[0].url;
res.json({ imageUrl });

