-- ============================================================================
-- TASK 2: CRUD PROCEDURES (sp_GetExperience & sp_AddExperience)
-- ============================================================================
-- REQUIREMENT:
-- 1. sp_GetExperience: Takes @UserID, returns all work experiences for that user
-- 2. sp_AddExperience: Takes @UserID, @JobTitle, @CompanyName, @YearsWorked
--                      and inserts a new record into Experience table
-- ============================================================================
--
-- ARCHITECTURE:
--   React ExperienceTable Component
--       -> useEffect() calls fetch('/api/getExp')
--           -> Node.js Express API
--               -> sp_GetExperience (READ)
--
--   React handleSave() function
--       -> fetch('/api/addExp', {method: 'POST'})
--           -> Node.js Express API
--               -> sp_AddExperience (CREATE)
-- ============================================================================

USE RozgarDB;
GO

-- ============================================================================
-- PROCEDURE 1: sp_GetExperience (READ Operation)
-- ============================================================================

-- Drop if exists
IF OBJECT_ID('sp_GetExperience', 'P') IS NOT NULL
    DROP PROCEDURE sp_GetExperience;
GO

CREATE PROCEDURE sp_GetExperience
    @UserID INT              -- Input: The user whose experience we want to fetch
AS
BEGIN
    -- ========================================
    -- EXPLANATION FOR STUDENTS:
    -- ========================================
    -- This is a READ operation in CRUD.
    -- Called by React's useEffect hook via Node.js API.
    -- 
    -- React Flow:
    --   useEffect(() => {
    --     fetch('/api/getExp/1')
    --       .then(res => res.json())
    --       .then(data => setExperience(data));
    --   }, []);
    -- ========================================
    
    SELECT 
        ExpID,               -- Experience ID (Primary Key)
        JobTitle,            -- Job title
        CompanyName,         -- Company name
        YearsWorked,         -- Years of experience
        IsCurrentJob         -- Is this the current job? (1=Yes, 0=No)
    FROM 
        Experience
    WHERE 
        UserID = @UserID     -- Filter by the specific user
    ORDER BY 
        ExpID DESC;          -- Show newest entries first
END;
GO

-- ============================================================================
-- PROCEDURE 2: sp_AddExperience (CREATE Operation)
-- ============================================================================

-- Drop if exists
IF OBJECT_ID('sp_AddExperience', 'P') IS NOT NULL
    DROP PROCEDURE sp_AddExperience;
GO

CREATE PROCEDURE sp_AddExperience
    @UserID INT,                    -- Input: Which user is adding this experience
    @JobTitle VARCHAR(100),         -- Input: Job title
    @CompanyName VARCHAR(100),      -- Input: Company name
    @YearsWorked INT                -- Input: Years worked at this job
AS
BEGIN
    -- ========================================
    -- EXPLANATION FOR STUDENTS:
    -- ========================================
    -- This is a CREATE operation in CRUD.
    -- Called by React's handleSave() function via Node.js API.
    -- 
    -- React Flow:
    --   const handleSave = async () => {
    --     await fetch('/api/addExp', {
    --       method: 'POST',
    --       headers: {'Content-Type': 'application/json'},
    --       body: JSON.stringify({UserID, JobTitle, CompanyName, YearsWorked})
    --     });
    --   };
    -- ========================================
    
    INSERT INTO Experience (UserID, JobTitle, CompanyName, YearsWorked, IsCurrentJob)
    VALUES (@UserID, @JobTitle, @CompanyName, @YearsWorked, 0);
    
    -- Return the newly created record to confirm insertion
    SELECT 
        'Experience added successfully!' AS Message,
        SCOPE_IDENTITY() AS NewExpID;    -- Returns the ID of the new record
END;
GO

-- ============================================================================
-- TEST THE PROCEDURES
-- ============================================================================

PRINT '===== TEST sp_GetExperience: Get all experience for UserID = 1 (Ali) =====';
EXEC sp_GetExperience @UserID = 1;

PRINT '';
PRINT '===== TEST sp_GetExperience: Get all experience for UserID = 2 (Fatima) =====';
EXEC sp_GetExperience @UserID = 2;

PRINT '';
PRINT '===== TEST sp_AddExperience: Add new experience for UserID = 1 =====';
EXEC sp_AddExperience 
    @UserID = 1, 
    @JobTitle = 'Tech Lead', 
    @CompanyName = 'Google Pakistan', 
    @YearsWorked = 1;

PRINT '';
PRINT '===== VERIFY: Check if new experience was added for UserID = 1 =====';
EXEC sp_GetExperience @UserID = 1;

GO

-- ============================================================================
-- EXPECTED OUTPUT:
-- ============================================================================
-- sp_GetExperience for Ali: Returns 3 records (PTCL, Systems Ltd, Netsol)
-- sp_GetExperience for Fatima: Returns 2 records (Engro, Jazz)
-- sp_AddExperience: Returns success message with new ExpID
-- Final sp_GetExperience for Ali: Returns 4 records (including new Google entry)
-- ============================================================================
