import openai

openai.api_key = "https://openai.com/dall-e-2/"

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="1024x1024"
        )
        image_url = response['data'][0]['url']
        return jsonify({"imageUrl": image_url})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
