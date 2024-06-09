from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from module.visualization import calculate_rate, make_graph, return_numbers
import os
import base64
import time
app = Flask(__name__)
CORS(app)

@app.route('/send_url', methods=['POST'])
def receive_url():
    data = request.json
    if 'url' in data:
        received_url = data['url']
        print("Received URL:", received_url)
        image_path = 'mnt/data/1234.png'  # Make sure the path is correct and absolute
        if os.path.exists(image_path):
            with open(image_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                store = '한식'
                response_data = {
                    'image': encoded_string,
                    'store': store,
                    'numbers': [4, 300, 36],
                    'others': ['은하식당', '송사부수제쌀고로케 홈플러스 영통점', '던킨도넛 영통홈플러스점']
                }
                time.sleep(5)
                return jsonify(response_data)
        else:
            print("Image file not found.")
            return jsonify({'error': 'Image file not found'}), 404
    else:
        return jsonify({'error': 'No URL provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
