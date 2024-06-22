from flask import Flask, request, jsonify
from flask_cors import CORS
from module.visualization import list_name_type, calculate_rate, make_graph, return_numbers
from module.clustering import load_sql, make_clusters, extract_top_stores_by_cluster, show_5_stores
import os
import base64
import pandas as pd
import matplotlib.pyplot as plt
plt.rc('font', family='Pretendard')

app = Flask(__name__)
CORS(app)

def sequantial_visualization(host, user, password, database, store_list, after_date):
    
    rate_df = calculate_rate(host, user, password, database, store_list[1], after_date)
    make_graph(store_list[0], rate_df)
    return return_numbers(store_list[0], rate_df)

def sequential_clustering(host, user, password, database):
    result = load_sql(host,user,password,database)
    cluster_df = make_clusters(result)
    top_cluster = extract_top_stores_by_cluster(cluster_df)
    return top_cluster

def whether_in_cluster(test_name, top_cluster):
    if test_name in set(top_cluster['store_name']):
        return show_5_stores(test_name,top_cluster)
    else:
        return " "

@app.route('/send_url', methods=['POST'])
def receive_url():
    host = 'localhost'
    user = 'root'
    password = '1234'
    database = 'practice'
    data = request.json
    ago_date = pd.Timestamp.today().date() - pd.DateOffset(months=4)
    ago_date = str(ago_date.date())
    try:
        if 'title' in data:
            received_title = data['title']
            received_title = received_title[:-9]
            print("Received URL:", received_title)
            store_list = list_name_type(host,user,password,database,received_title)
            numbers = sequantial_visualization(host, user, password, database, store_list, ago_date)
            top_cluster = sequential_clustering(host, user, password, database)
            others = whether_in_cluster(received_title, top_cluster)
            image_path = 'mnt/data/my_graph.png'
            #clustering_path = 'mnt/data/my_graph2.png'  
            if os.path.exists(image_path):
                with open(image_path, "rb") as image_file:
                    print('hey')
                    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                    store = store_list[1]
                    print(store, numbers,others)
                # with open(clustering_path, 'rb') as clustering_file:
                #     encoded_clustering = base64.b64decode(clustering_file.read()).decode('utf-8')

                    response_data = {
                                'image': encoded_string,
                                'store': store,
                                'numbers': numbers,
                                'others': others
                    }
                return jsonify(response_data)
            else:
                print("Image file not found.")
                return jsonify({'error': 'Image file not found'}), 404
        else:
            return jsonify({'error': 'No URL provided'}), 400
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'No Store'}), 400
if __name__ == '__main__':

    app.run(debug=True)
