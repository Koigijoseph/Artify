<script>
    async function generateImage() {
        const prompt = document.getElementById('promptInput').value;
        const imageContainer = document.getElementById('imageContainer');

        if (prompt.trim() === "") {
            imageContainer.innerHTML = "<p>Please enter a description to generate an image.</p>";
            return;
        }

        imageContainer.innerHTML = "<p>Generating your image, please wait...</p>";

        try {
            const response = await fetch('http://localhost:5000/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();
            if (data.imageUrl) {
                imageContainer.innerHTML = `<img src="${data.imageUrl}" alt="Generated Image">`;
            } else {
                throw new Error('Failed to generate image');
            }

        } catch (error) {
            imageContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }
</script>
