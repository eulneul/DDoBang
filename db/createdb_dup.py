import mysql.connector
import pandas as pd
#dataset_with_id 저장 & 초기화

mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = '1234',
    charset = 'utf8mb4',
    database = 'practice'
)


mycursor = mydb.cursor() 

sql1 = open('db/customer_record.sql').read()
sql0 = 'DROP TABLE customer_record;'
mycursor.execute(sql0)
mycursor.execute(sql1)
df = pd.read_csv("datasets/dup.csv", encoding = 'utf-8-sig', index_col = 0)
df.fillna(0, inplace=True)

sql2 = "insert into customer_record values(%s, %s, %s, %s, %s, %s, %s,%s, %s, %s, %s, %s, %s)"

mycursor = mydb.cursor(buffered = True)  #cursor 생성

num = 0
for i,row in df.iterrows(): 
     mycursor.execute(sql2,tuple(row))
     print("Processing: {0} / {1}".format(num,len(df)))
     num+=1 
     mydb.commit() 


mydb.close()