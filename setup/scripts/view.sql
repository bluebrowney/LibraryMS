-- Active: 1731976479173@@127.0.0.1@3306@libraryms2

/*RUN IN ORDER*/

create View
detailed_movies as 
SELECT *
FROM Movie NATURAL JOIN Movie_Details;

create View
detailed_books as 
SELECT *
FROM Book NATURAL JOIN Book_Details;


create view
temp_table as 
SELECT  dm.Product_ID, 
        dm.Title,
        dm.ISAN, 
        dm.Runtime, 
        dm.Studio, 
        dm.Release_Date, 
        dm.Rating, 
        db.ISBN,
        db.Page_Count, 
        db.Publisher
FROM detailed_movies as dm LEFT JOIN detailed_books as db ON dm.`Product_ID`=db.`Product_ID` AND dm.Title=db.Title
UNION
SELECT  db.Product_ID,
        db.Title, 
        dm.ISAN,
        dm.Runtime, 
        dm.Studio, 
        dm.Release_Date, 
        dm.Rating, 
        db.ISBN, 
        db.Page_Count, 
        db.Publisher 
FROM detailed_movies as dm RIGHT JOIN detailed_books as db ON dm.`Product_ID`=db.`Product_ID`;

SELECT *
From temp_table;


create view search_table AS
select * from product natural join temp_table;

select * from search_table;