/*Load File Currently Does Not Load in Bulk, indivisually run SQL Queries through mysqlsh*/
LOAD DATA INFILE 'Member.dat' INTO TABLE Member FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Admins.dat' INTO TABLE Admins FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Librarians.dat' INTO TABLE Librarians FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Product.dat' INTO TABLE Product FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Movie_Product.dat' INTO TABLE Movie_Product FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Movie.dat' INTO TABLE Movie FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Book.dat' INTO TABLE Book FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Book_Details.dat' INTO TABLE Book_Details FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'HoldChange.dat' INTO TABLE HoldChange FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Hold.dat' INTO TABLE Hold FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Transaction.dat' INTO TABLE Transaction FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Permissions.dat' INTO TABLE Permissions FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Product_Copy.dat' INTO TABLE Product_Copy FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Cast.dat' INTO TABLE Cast FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;
LOAD DATA INFILE 'Director.dat' INTO TABLE Director FIELDS TERMINATED BY '\t\t' LINES TERMINATED BY '\n' IGNORE 1 LINES;



INSERT INTO Member (FName, MInit, LName, Email, Phone_Number, passwd) VALUES
('Alice', 'K', 'Johnson', 'alice.johnson@gmail.com', '945-077-0112', 'ajswag33'),
('Brian', 'T', 'Smith', 'brian.smith@gmail.com', '800-555-0765', 'briandgoat55'),
('Catherine', 'R', 'Williams', 'catherine.williams@gmail.com', '520-633-0987', 'willynilly32'),
('David', 'L', 'Brown', 'david.brown@gmail.com', '469-845-3784', 'davidbrownpassword');

INSERT INTO Admins (Member_ID, Clearance) VALUES
(1, 'High'),
(2, 'Medium'),
(3, 'Low');

INSERT INTO Librarians (Member_ID, Salary, AdminMem_ID) VALUES
(2, 55000.00, 1),
(3, 62000.00, 1),
(4, 48000.00, 2);

INSERT INTO Product (Price, Genre, Available_Ct, Leased_Ct, Request_Ct, Request) VALUES
(25.50, 'Fiction', 8, 3, 1, 0),
(15.75, 'Science', 5, 2, 2, 1),
(35.00, 'History', 10, 1, 3, 1),
(20.00, 'Biography', 6, 4, 0, 1);

INSERT INTO Movie (Product_ID, ISAN, Rating) VALUES
(2, 'ISAN9876543210', 'PG-13'),
(3, 'ISAN1234567890', 'R');

INSERT INTO Movie_Details (ISAN, Runtime, Title, Studio, Release_Date) VALUES
('ISAN9876543210', 135, 'Epic Adventure', 'Universal', '2024-05-15'),
('ISAN1234567890', 120, 'Mystery Unfolds', 'Sony', '2024-06-20');

INSERT INTO Book (Product_ID, ISBN) VALUES
(1, '978-1-56619-909-4'),
(4, '978-3-16-148410-0');

INSERT INTO Book_Details (ISBN, Page_Count, Publisher) VALUES
('978-1-56619-909-4', 250, 'Penguin Random House'),
('978-3-16-148410-0', 450, 'Simon & Schuster');

INSERT INTO Hold_Charge (Hold_Type, Charge_Price) VALUES
('Reservation', 7.50),
('Request', 12.00),
('Pending', 3.25),
('On Hold', 4.75);

INSERT INTO Hold (Member_ID, Hold_Type, Init_Date, Resolve_Deadline) VALUES
(1, 'Reservation', '2024-04-01', '2024-04-15'),
(2, 'Request', '2024-04-02', '2024-04-16'),
(3, 'Pending', '2024-04-03', '2024-04-17'),
(4, 'On Hold', '2024-04-04', '2024-04-18');

INSERT INTO Transaction (Member_ID, Product_ID, Copy_Number, Date) VALUES
(1, 1, 2, '2024-03-05'),
(2, 2, 1, '2024-03-06'),
(3, 3, 3, '2024-03-07'),
(4, 4, 2, '2024-03-08');

INSERT INTO Permissions (LibraryMem_ID, Permission_Type) VALUES
(1, 'Read'),
(2, 'Write'),
(3, 'Execute'),
(4, 'Admin');

INSERT INTO Product_Copy (Product_ID, Copy_Condition, Member_ID) VALUES
(1, 'New', 1),
(2, 'Used', 2),
(3, 'Damaged', 3),
(4, 'Like New', 4);

INSERT INTO Cast (Product_ID, Cast_Name) VALUES
(2, 'Emma Thompson'),
(2, 'Tom Hardy'),
(3, 'Leonardo DiCaprio'),
(3, 'Kate Winslet');

INSERT INTO Director (Product_ID, DName) VALUES
(2, 'Martin Scorsese'),
(3, 'Christopher Nolan');



