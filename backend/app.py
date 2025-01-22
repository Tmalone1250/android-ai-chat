from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from serpapi import GoogleSearch
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    
    # Use SerpAPI to get search results
    search = GoogleSearch({
        "q": user_message,
        "api_key": os.getenv('SERPAPI_KEY')
    })
    results = search.get_dict()
    
    # Extract relevant information from search results
    organic_results = results.get('organic_results', [])
    if organic_results:
        response = organic_results[0].get('snippet', 'I could not find a relevant answer.')
    else:
        response = "I'm sorry, I couldn't find any relevant information."
    
    return jsonify({
        "response": response,
        "success": True
    })

@app.route('/api/speech-to-text', methods=['POST'])
def speech_to_text():
    # Placeholder for speech-to-text functionality
    # Will be implemented with Google Cloud Speech-to-Text
    return jsonify({
        "text": "Speech to text conversion will be implemented here",
        "success": True
    })

@app.route('/api/text-to-speech', methods=['POST'])
def text_to_speech():
    # Placeholder for text-to-speech functionality
    # Will be implemented with Google Cloud Text-to-Speech
    return jsonify({
        "audioUrl": "Text to speech conversion will be implemented here",
        "success": True
    })

if __name__ == '__main__':
    app.run(debug=True)
