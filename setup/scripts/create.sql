/*Indivisually Run each through mysqlsh or vscode MySQL Extension by Weijan Chen*/
CREATE TABLE Member (
    Member_ID INT AUTO_INCREMENT PRIMARY KEY,
    FName VARCHAR(50),
    MInit CHAR(1),
    LName VARCHAR(50),
    Email VARCHAR(100),
    Phone_Number VARCHAR(15),
    passwd VARCHAR(26)
);

CREATE TABLE Admins (
    Member_ID INT PRIMARY KEY,
    Clearance VARCHAR(50),
    FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID) 
);


CREATE TABLE Librarians (
    Member_ID INT PRIMARY KEY,
    Salary DECIMAL(10, 2),
    AdminMem_ID INT,
    FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID),
    FOREIGN KEY (AdminMem_ID) REFERENCES Admins(Member_ID) 
);


CREATE TABLE Product (
    Product_ID INT AUTO_INCREMENT PRIMARY KEY,
    Price DECIMAL(10, 2),
    Genre VARCHAR(50),
    Available_Ct INT,
    Leased_Ct INT,
    Request_Ct INT,
    Request INT
);

CREATE TABLE Movie (
    Product_ID INT,
    ISAN VARCHAR(20),
    Rating VARCHAR(5),
    FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID),
    PRIMARY KEY (Product_ID)
);

CREATE INDEX 3nf_movies ON Movie(ISAN);


CREATE TABLE Movie_Details (
    ISAN VARCHAR(20) PRIMARY KEY, 
    Runtime INT,
    Title VARCHAR(100),
    Studio VARCHAR(100),
    Release_Date DATE,
    FOREIGN KEY(ISAN) REFERENCES Movie(ISAN) 
);


CREATE TABLE Book (
    Product_ID INT PRIMARY KEY,
    ISBN VARCHAR(20) UNIQUE,
    FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID)
);

CREATE TABLE Book_Details (
  ISBN VARCHAR(20) PRIMARY KEY,
    Page_Count INT,
    Publisher VARCHAR(100),
    Title VARCHAR(100),
    FOREIGN KEY (ISBN) REFERENCES Book(ISBN)
);


CREATE TABLE Hold_Charge (
    Hold_Type VARCHAR(50) PRIMARY KEY,
    Charge_Price DECIMAL(10, 2)
);


CREATE TABLE Hold (
    Member_ID INT,
    Hold_Type VARCHAR(50),
    Init_Date DATE,
    Resolve_Deadline DATE,
    PRIMARY KEY (Member_ID, Hold_Type),
    FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID),
    FOREIGN KEY (Hold_Type) REFERENCES Hold_Charge(Hold_Type)
);


CREATE TABLE Transaction (
    Transaction_ID INT AUTO_INCREMENT PRIMARY KEY,
    Member_ID INT,
    Product_ID INT,
    Copy_Number INT,
    Date DATE,
    FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID),
    FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID)
);


CREATE TABLE Permissions (
    LibraryMem_ID INT,
    Permission_Type VARCHAR(50),
    PRIMARY KEY (LibraryMem_ID, Permission_Type),
    FOREIGN KEY (LibraryMem_ID) REFERENCES Member(Member_ID)
);


CREATE TABLE Product_Copy (
    Product_ID INT,
    Copy_Number INT AUTO_INCREMENT UNIQUE,
    Copy_Condition VARCHAR(50) DEFAULT' New',
    Member_ID INT DEFAULT NULL,
    PRIMARY KEY (Product_ID, Copy_Number),
    FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID),
    FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID)  
);

CREATE TABLE Cast (
    Product_ID INT,
    Cast_Name VARCHAR(50),
    PRIMARY KEY (Product_ID, Cast_Name),
    FOREIGN KEY (Product_ID) REFERENCES Movie(Product_ID)
);

CREATE TABLE Director (
    Product_ID INT,
    DName VARCHAR(50),
    PRIMARY KEY (Product_ID, DName),
    FOREIGN KEY (Product_ID) REFERENCES Movie(Product_ID)
);