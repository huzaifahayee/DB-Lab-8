-- ============================================================================
-- TASK 1: SECURE LOGIN PROCEDURE (sp_LoginUser)
-- ============================================================================
-- REQUIREMENT: 
-- Write a Stored Procedure named 'sp_LoginUser' that takes @Email and @Password.
-- It should SELECT the user's UserID and FullName if credentials match.
-- ============================================================================
-- 
-- ARCHITECTURE:
--   React Login Component 
--       -> fetch('/api/login') 
--           -> Node.js Express API 
--               -> sp_LoginUser (THIS PROCEDURE)
--                   -> Returns UserID, FullName
-- ============================================================================

USE RozgarDB;
GO

-- Drop the procedure if it already exists (allows re-running)
IF OBJECT_ID('sp_LoginUser', 'P') IS NOT NULL
    DROP PROCEDURE sp_LoginUser;
GO

-- ============================================================================
-- SOLUTION: sp_LoginUser Stored Procedure
-- ============================================================================

CREATE PROCEDURE sp_LoginUser
    @Email VARCHAR(100),        -- Input: User's email address
    @Password VARCHAR(100)      -- Input: User's password
AS
BEGIN
    -- ========================================
    -- EXPLANATION FOR STUDENTS:
    -- ========================================
    -- This procedure is called by the Node.js backend
    -- when React sends a login request.
    -- 
    -- Flow:
    -- 1. React sends email/password to Node.js
    -- 2. Node.js calls this procedure
    -- 3. This procedure checks the Users table
    -- 4. If match found: Returns UserID and FullName
    -- 5. If no match: Returns empty result (0 rows)
    -- 6. Node.js sends response back to React
    -- ========================================
    
    SELECT 
        UserID,
        FullName
    FROM 
        Users
    WHERE 
        Email = @Email 
        AND PasswordHash = @Password;
    
    -- ========================================
    -- SECURITY NOTE:
    -- In real applications, passwords should be HASHED!
    -- Never store plain text passwords in a database.
    -- Use bcrypt or similar in your Node.js backend.
    -- ========================================
END;
GO

-- ============================================================================
-- TEST THE PROCEDURE
-- ============================================================================

PRINT '===== TEST 1: Valid Login (Should return UserID and FullName) =====';
EXEC sp_LoginUser 
    @Email = 'ali.raza@email.com', 
    @Password = 'password123';

PRINT '';
PRINT '===== TEST 2: Invalid Password (Should return empty result) =====';
EXEC sp_LoginUser 
    @Email = 'ali.raza@email.com', 
    @Password = 'wrongpassword';

PRINT '';
PRINT '===== TEST 3: Non-existent User (Should return empty result) =====';
EXEC sp_LoginUser 
    @Email = 'nobody@email.com', 
    @Password = 'anypassword';

GO

-- ============================================================================
-- EXPECTED OUTPUT:
-- ============================================================================
-- TEST 1: Returns -> UserID: 1, FullName: Ali Raza
-- TEST 2: Returns -> (0 rows - no match)
-- TEST 3: Returns -> (0 rows - no match)
-- ============================================================================
