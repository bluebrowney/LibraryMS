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

CREATE VIEW role_table as
SELECT member, librarian, a.member_id as admin
FROM (SELECT m.member_ID as member, l.member_id as librarian
from Member as m LEFT OUTER JOIN librarians as l on m.member_id = l.member_id) as ml LEFT OUTER JOIN admins as a ON ml.member = a.member_id;

SELECT Count(member) as Is_Member, Count(librarian) as Is_Librarian, Count(admin) as Is_Admin
FROM role_table
where member=5;

SELECT * 
FROM role_table;

SELECT Count(member) as Is_Member, Count(librarian) as Is_Librarian, Count(admin) as Is_Admin 
                      FROM role_table
                      WHERE member IN 
                            (SELECT Member_ID 
                             FROM Member
                             WHERE (Email='brian.smith@gmail.com' OR Phone_Number='') AND passwd='briandgoat55');