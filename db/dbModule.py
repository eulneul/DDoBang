import mysql.connector
import pandas as pd

df = pd.read_csv("dup.csv", encoding = 'utf-8-sig', index_col = 0)
df.fillna(0, inplace=True)

mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = '1234',
    database = "practice"
)

sql = "insert into customer_record values(%s, %s, %s, %s, %s, %s, %s,%s, %s, %s, %s, %s, %s)"

mycursor = mydb.cursor(buffered = True)  #cursor 생성

for i,row in df.iterrows(): 
     mycursor.execute(sql,tuple(row)) #tuple(row)를 sql에 대입
     #print(tuple(row)) #sql에 들어갈 tuple(row)를 하나씩 출력
     mydb.commit() 
     #반복문으로 실행한 것이 바로 db에 적용되지 않고, commit() 하는 순간 적용됨
     #commit()을 반복문 안에 넣으면 반복중 오류가 나더라도 오류 전까지는 db에 적용됨, 반복문 안에 있지 않으면 오류가 나면 db에는 아무것도 적용 안됨