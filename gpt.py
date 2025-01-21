from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load pre-trained GPT-2 model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

# Function to generate chatbot response
def generate_response(prompt):
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(inputs, max_length=100, num_return_sequences=1, no_repeat_ngram_size=2)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]
    response = generate_response(user_message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
