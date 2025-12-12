import requests
import json

def sentiment_analyzer(text_to_analyse):
    # URL of the sentiment analysis service
    url = 'https://sn-watson-sentiment-bert.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/SentimentPredict'

    # Constructing the request payload
    myobj = { "raw_document": { "text": text_to_analyse } }

    # Custom header specifying the model ID
    header = {"grpc-metadata-mm-model-id": "sentiment_aggregated-bert-workflow_lang_multi_stock"}

    # Sending a POST request
    response = requests.post(url, json=myobj, headers=header)

    # ERROR HANDLING: Check if the request was successful (Status 200)
    if response.status_code == 200:
        # Parsing the JSON response
        formatted_response = json.loads(response.text)

        # Extracting sentiment label and score
        label = formatted_response['documentSentiment']['label']
        score = formatted_response['documentSentiment']['score']
    
    # If the API fails (e.g., status 500), return None or a neutral label
    else:
        label = None
        score = None

    # Returning a dictionary
    return {'label': label, 'score': score}