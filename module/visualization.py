import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sqlalchemy import create_engine
from matplotlib.path import Path
from matplotlib.patches import PathPatch



plt.rc('font', family='Pretendard')

def list_name_type(host, user, password, database, store_name):
    try:
        engine_url = f'mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8'
        engine = create_engine(engine_url)
        # SQL query directly in the function
        query = """
        WITH STORE_LIST AS (
            SELECT store_name, store_type
            FROM customer_record
            GROUP BY store_name, store_type
        ),
        RESULT_LIST AS (
            SELECT store_name, store_type
            FROM STORE_LIST
            WHERE store_name = %s
        )
        SELECT *
        FROM RESULT_LIST;
        """
        # Run query with parameters
        df = pd.read_sql_query(query, engine, params=(store_name,))
        return list(df.iloc[0])
    except Exception as e:
        print(f"Error: {e}")
        return None

def calculate_rate(host, user, password, database, store_type, after_date):
    try:
        engine_url = f'mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8'
        engine = create_engine(engine_url)
        # SQL query directly in the function
        with open('db/revisit_rate.sql', 'r', encoding= 'utf-8') as file:
            query = file.read()
        # Run query with parameters
        df = pd.read_sql_query(query, engine, params=(store_type, after_date))
        return df
    except Exception as e:
        print(f"Error: {e}")
        return None

def make_graph(target_name, rate_df):

    #오름차순으로 정렬
    sorted_df = rate_df.sort_values(by='revisit_rate')
    sorted_df.reset_index(inplace=True, drop=True)

    # X축과 y축 설정
    x_numeric = np.arange(len(sorted_df['store_name']))
    y_values = sorted_df['revisit_rate'].to_numpy()
    
    # shaded 그래프 생성
    plt.figure(figsize=(10, 6))
    fig, ax = plt.subplots()
    ax.plot(x_numeric, y_values, color="#287548", marker='o')
    plt.fill_between(x_numeric, 0, y_values, color='#a8e063', alpha=0.4)
    

    # 원하는 특정 가게만 barplot
    store_index = sorted_df.index[sorted_df['store_name'] == target_name]
    store_name = sorted_df['store_name'].iloc[store_index]
    store_value = sorted_df['revisit_rate'].iloc[store_index]
    bar = plt.bar(x_numeric[store_index], store_value, color='#56ab2f', label=f'Bar for {store_name}')
    for rect in bar:
        height = rect.get_height()
        plt.text(rect.get_x()+rect.get_width()/2.0,height,  "{:.1f}%".format(height), ha = 'center',va='bottom',size=20)
    # Customizing the plot
    plt.xticks(x_numeric[store_index], store_name, fontsize=20)  # Hide x-axis labels
    plt.title('3개월 간 재방문율(%)', fontsize=30)
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.tight_layout()
    plt.tick_params(axis='y', labelsize=20)
    plt.savefig('mnt/data/my_graph.png', bbox_inches='tight')
    

def return_numbers(target_name, rate_df):
    sorted_df = rate_df.sort_values(by='revisit_rate')
    sorted_df.reset_index(inplace=True, drop=True)
    store_index = sorted_df.index[sorted_df['store_name'] == target_name]
    return [len(sorted_df) - int(store_index[0]), int(sorted_df['total_customers'].iloc[store_index[0]]), int(sorted_df['revisits'].iloc[store_index[0]])]
    
