// ============================================================================
// TASK 6: BACKEND API FOR ADDING DATA (Express POST Endpoint)
// ============================================================================
// REQUIREMENT:
// Write a Node.js/Express POST endpoint (app.post('/api/addExp'))
// Use mssql pool request to execute sp_AddExperience stored procedure
// Pass dummy data: UserID 1, 'Software Engineer', 'Systems Ltd'
// ============================================================================

const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());           // Allow React to communicate with this server
app.use(express.json());   // Parse JSON request bodies

// ============================================================================
// DATABASE CONFIGURATION (From Task 5)
// ============================================================================

const dbConfig = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    database: 'RozgarDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// ============================================================================
// SOLUTION: POST API ENDPOINT FOR ADDING EXPERIENCE
// ============================================================================

app.post('/api/addExp', async (req, res) => {
    // ========================================
    // EXPLANATION FOR STUDENTS:
    // ========================================
    // This endpoint is called when React sends a POST request
    // to add new work experience.
    // 
    // Flow:
    // 1. React calls: fetch('/api/addExp', {method: 'POST', body: JSON.stringify(data)})
    // 2. Express receives the request here
    // 3. We extract data from req.body
    // 4. We call the sp_AddExperience stored procedure
    // 5. We send the result back to React
    // ========================================
    
    try {
        // Step 1: Get data from request body (sent by React)
        const { UserID, JobTitle, CompanyName, YearsWorked } = req.body;
        
        // Step 2: Validate the data
        if (!UserID || !JobTitle || !CompanyName || !YearsWorked) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: UserID, JobTitle, CompanyName, YearsWorked'
            });
        }
        
        // Step 3: Connect to database
        let pool = await sql.connect(dbConfig);
        
        // Step 4: Execute the stored procedure
        // ========================================
        // pool.request() - creates a new request
        // .input() - adds input parameters for the procedure
        // .execute() - runs the stored procedure
        // ========================================
        let result = await pool.request()
            .input('UserID', sql.Int, UserID)
            .input('JobTitle', sql.VarChar(100), JobTitle)
            .input('CompanyName', sql.VarChar(100), CompanyName)
            .input('YearsWorked', sql.Int, YearsWorked)
            .execute('sp_AddExperience');
        
        // Step 5: Send success response back to React
        res.json({
            success: true,
            message: 'Experience added successfully!',
            data: result.recordset[0]
        });
        
    } catch (err) {
        // Step 6: Handle errors
        console.error('Error adding experience:', err);
        res.status(500).json({
            success: false,
            message: 'Error adding experience to database',
            error: err.message
        });
    }
});

// ============================================================================
// EXAMPLE WITH DUMMY DATA (As specified in task)
// ============================================================================

app.post('/api/addExpDemo', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        
        // Using dummy data as specified in the task
        let result = await pool.request()
            .input('UserID', sql.Int, 1)                           // UserID 1
            .input('JobTitle', sql.VarChar(100), 'Software Engineer')  // Dummy job
            .input('CompanyName', sql.VarChar(100), 'Systems Ltd')     // Dummy company
            .input('YearsWorked', sql.Int, 2)
            .execute('sp_AddExperience');
        
        res.json({
            success: true,
            message: 'Demo experience added!',
            data: result.recordset[0]
        });
        
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ============================================================================
// START SERVER
// ============================================================================

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log('Endpoints:');
    console.log('  POST /api/addExp - Add experience (with body)');
    console.log('  POST /api/addExpDemo - Add demo experience');
});

/*
============================================================================
TESTING WITH POSTMAN OR CURL:
============================================================================
POST http://localhost:5000/api/addExp
Content-Type: application/json

{
    "UserID": 1,
    "JobTitle": "Software Engineer",
    "CompanyName": "Systems Ltd",
    "YearsWorked": 2
}

EXPECTED RESPONSE:
{
    "success": true,
    "message": "Experience added successfully!",
    "data": { "Message": "...", "NewExpID": 105 }
}
============================================================================
*/
