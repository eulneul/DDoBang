import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sqlalchemy import create_engine

plt.rc('font', family="Malgun Gothic")

def calculate_rate(host, user, password, database, store_type, after_date):
    try:
        engine_url = f'mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8'
        engine = create_engine(engine_url)
        print('ok')
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
    plt.fill_between(x_numeric, 0, y_values, color="skyblue", alpha=0.4)

    # 원하는 특정 가게만 barplot
    store_index = sorted_df.index[sorted_df['store_name'] == target_name]
    store_name = sorted_df['store_name'].iloc[store_index]
    store_value = sorted_df['revisit_rate'].iloc[store_index]
    bar = plt.bar(x_numeric[store_index], store_value, color='orange', label=f'Bar for {store_name}')
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
    
    print(store_index[0])

def return_numbers(target_name, rate_df):
    sorted_df = rate_df.sort_values(by='revisit_rate')
    sorted_df.reset_index(inplace=True, drop=True)
    store_index = sorted_df.index[sorted_df['store_name'] == target_name]
    return [store_index[0], sorted_df['total_customers'].iloc[store_index[0]], sorted_df['revisits'].iloc[store_index[0]]]
    
host = 'localhost'
user = 'root'
password = '1234'
database = 'practice'
result = calculate_rate(host, user, password, database, '한식', '2024-02-01')

print(result)
make_graph('보영만두 영통직영점', result)
print(return_numbers('보영만두 영통직영점', result))