-- ============================================================================
-- LAB 08: ROZGAR PAKISTAN - E-Resume Builder Database
-- ReactJS Integration, Node.js & CRUD Operations
-- ============================================================================
-- INSTRUCTIONS FOR STUDENTS:
-- 1. Open SQL Server Management Studio (SSMS)
-- 2. Connect to your local SQL Server
-- 3. Open this file (File -> Open -> File)
-- 4. Click "Execute" or press F5 to run the entire script
-- 5. Verify tables are created by expanding RozgarDB in Object Explorer
-- ============================================================================

-- =================================
-- STEP 1: CREATE THE DATABASE
-- =================================
-- This creates a new database called 'RozgarDB' if it doesn't already exist

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'RozgarDB')
BEGIN
    CREATE DATABASE RozgarDB;
    PRINT 'Database RozgarDB created successfully!';
END
ELSE
BEGIN
    PRINT 'Database RozgarDB already exists.';
END
GO

-- Switch to use the RozgarDB database
USE RozgarDB;
GO

-- =================================
-- STEP 2: CREATE TABLES
-- =================================

-- Drop tables if they exist (to allow re-running the script)
IF OBJECT_ID('Experience', 'U') IS NOT NULL DROP TABLE Experience;
IF OBJECT_ID('Users', 'U') IS NOT NULL DROP TABLE Users;

-- ---------------------------------
-- USERS TABLE
-- ---------------------------------
-- This table stores user login information
-- Used for: Login functionality (Task 1)
-- Called from: React Login component -> Node.js API -> sp_LoginUser

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),    -- Auto-incrementing ID
    Email VARCHAR(100) UNIQUE NOT NULL,       -- User's email (must be unique)
    PasswordHash VARCHAR(100) NOT NULL,       -- Password (should be hashed in real apps!)
    FullName VARCHAR(100) NOT NULL,           -- User's full name
    CreatedAt DATETIME DEFAULT GETDATE()      -- When account was created
);

PRINT 'Users table created successfully!';

-- ---------------------------------
-- EXPERIENCE TABLE
-- ---------------------------------
-- This table stores work experience for resumes
-- Used for: CRUD operations (Tasks 2-8)
-- Called from: React ExperienceTable component -> Node.js API -> Stored Procedures

CREATE TABLE Experience (
    ExpID INT PRIMARY KEY IDENTITY(100,1),    -- Auto-incrementing ID starting from 100
    UserID INT NOT NULL,                       -- Links to Users table
    JobTitle VARCHAR(100) NOT NULL,            -- Job title
    CompanyName VARCHAR(100) NOT NULL,         -- Company name
    YearsWorked INT NOT NULL,                  -- Years of experience
    IsCurrentJob BIT DEFAULT 0,                -- Is this current job? (1=Yes, 0=No)
    
    -- Foreign Key: Links Experience to Users
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

PRINT 'Experience table created successfully!';

-- =================================
-- STEP 3: INSERT SAMPLE DATA
-- =================================

-- Insert Sample Users (for testing login via React)
INSERT INTO Users (Email, PasswordHash, FullName) VALUES
('ali.raza@email.com', 'password123', 'Ali Raza'),
('fatima.khan@email.com', 'securepass', 'Fatima Khan');

PRINT 'Sample users inserted!';

-- Insert Sample Work Experience for Ali (UserID = 1)
INSERT INTO Experience (UserID, JobTitle, CompanyName, YearsWorked, IsCurrentJob) VALUES
(1, 'Software Engineering Intern', 'PTCL', 1, 0),
(1, 'Junior Developer', 'Systems Ltd', 2, 0),
(1, 'Senior Software Engineer', 'Netsol Technologies', 3, 1);

-- Insert Sample Work Experience for Fatima (UserID = 2)
INSERT INTO Experience (UserID, JobTitle, CompanyName, YearsWorked, IsCurrentJob) VALUES
(2, 'Marketing Executive', 'Engro Corp', 2, 0),
(2, 'Marketing Manager', 'Jazz Pakistan', 4, 1);

PRINT 'Sample experience records inserted!';

-- =================================
-- STEP 4: VERIFY DATA
-- =================================

PRINT '';
PRINT '===== USERS TABLE DATA =====';
SELECT * FROM Users;

PRINT '';
PRINT '===== EXPERIENCE TABLE DATA =====';
SELECT * FROM Experience;

PRINT '';
PRINT 'Setup completed successfully!';
PRINT 'You can now proceed with the lab tasks.';
PRINT '';
PRINT 'Architecture Flow:';
PRINT '  React (Frontend) -> Node.js (Backend) -> SQL Server (Database)';
GO
