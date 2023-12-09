-- Create the Users table
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Username VARCHAR(255) UNIQUE,
    Password VARCHAR(255)
);

-- Create the Books table
CREATE TABLE Books (
    BookID INT PRIMARY KEY AUTO_INCREMENT,
    BookName VARCHAR(255),
    BookDatabaseID VARCHAR(255) UNIQUE
);

-- Create the Collections table
CREATE TABLE Collections (
    CollectionID INT PRIMARY KEY AUTO_INCREMENT,
    CollectionName VARCHAR(255),
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create the Reviews table
CREATE TABLE Reviews (
    ReviewID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    BookID INT,
    Rating INT,
    WrittenReview TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- Create the UserBooks table (to track book purchases)
CREATE TABLE UserBooks (
    UserID INT,
    BookID INT,
    HaveNotBought BOOLEAN,
    PRIMARY KEY (UserID, BookID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- Create the ReadingPositions table
CREATE TABLE ReadingPositions (
    UserID INT,
    BookID INT,
    Position INT,
    PRIMARY KEY (UserID, BookID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);