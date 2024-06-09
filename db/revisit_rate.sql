WITH FilteredData AS (
    SELECT store_name, revisit, customer_id
    FROM customer_record
    WHERE store_type = %s AND revisit_date > %s
),
VisitCounts AS (
    SELECT store_name, COUNT(DISTINCT customer_id) AS total_customers
    FROM FilteredData
    GROUP BY store_name
),
RevisitCounts AS (
    SELECT store_name, COUNT(DISTINCT customer_id) AS revisits
    FROM FilteredData
    WHERE revisit > 1
    GROUP BY store_name
),
TotalCustomers AS (
    SELECT store_name, COUNT(DISTINCT customer_id) AS total_customers
    FROM FilteredData
    GROUP BY store_name
),
RevisitRate AS (
    SELECT 
        t.store_name,
        CASE 
            WHEN r.revisits IS NULL THEN 0
            ELSE r.revisits
        END AS revisits,
        t.total_customers,
        COALESCE((CAST(r.revisits AS FLOAT) / t.total_customers) * 100, 0) AS revisit_rate
    FROM TotalCustomers t
    LEFT JOIN RevisitCounts r ON t.store_name = r.store_name
)

SELECT *
FROM RevisitRate;