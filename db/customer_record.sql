CREATE TABLE customer_record
(
    nickname varchar(50),
    content TEXT(2000),
    revisit_date date,
    revisit INT,
    store_name varchar(50),

    store_type varchar(20),
    google FLOAT,
    baedal FLOAT,
    mean_rate FLOAT,
    review_count INT,

    photo_count INT,
    nickname_only varchar(20),
    customer_id INT
);