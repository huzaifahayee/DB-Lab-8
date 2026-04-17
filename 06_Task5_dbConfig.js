// ============================================================================
// TASK 5: NODE.JS DATABASE CONNECTION (dbConfig)
// ============================================================================
// REQUIREMENT:
// Write a Node.js dbConfig object using the 'mssql' package format.
// Configure it to connect to the 'RozgarDB' database on localhost
// using credentials: user: 'sa', password: '123'
// ============================================================================

const sql = require('mssql');

// ============================================================================
// SOLUTION: Database Configuration Object
// ============================================================================

const dbConfig = {
    // ========================================
    // SQL Server Authentication
    // ========================================
    user: 'sa',                 // SQL Server username
    password: '123',            // SQL Server password
    
    // ========================================
    // Server Connection
    // ========================================
    server: 'localhost',        // Server name
    // server: 'localhost\\SQLEXPRESS',  // For SQL Express
    
    database: 'RozgarDB',       // Database name
    
    // ========================================
    // Connection Options
    // ========================================
    options: {
        encrypt: true,
        trustServerCertificate: true  // Required for local development
    },
    
    // ========================================
    // Connection Pool (Optional)
    // ========================================
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// ============================================================================
// CONNECTION FUNCTION
// ============================================================================

async function connectToDatabase() {
    try {
        await sql.connect(dbConfig);
        console.log('Connected to SQL Server successfully!');
        return true;
    } catch (err) {
        console.error('Connection failed:', err.message);
        return false;
    }
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = { dbConfig, sql, connectToDatabase };

/*
============================================================================
HOW TO USE:
============================================================================
1. Save as dbConfig.js in your backend folder
2. Import in server.js:
   const { dbConfig, sql } = require('./dbConfig');
3. Connect:
   await sql.connect(dbConfig);
============================================================================
*/
