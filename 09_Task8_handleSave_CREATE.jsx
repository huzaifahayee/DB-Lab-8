// ============================================================================
// TASK 8: REACT FORM SUBMISSION (CREATE Operation)
// ============================================================================
// REQUIREMENT:
// Write a function inside React named handleSave().
// Use fetch() API with method set to 'POST'.
// Pass a JSON body containing JobTitle: 'Software Engineer' and 
// CompanyName: 'Systems Ltd' to your backend.
// ============================================================================

import React, { useState } from 'react';

// ============================================================================
// SOLUTION: React Component with handleSave Function
// ============================================================================

function AddExperience() {
    // State for form inputs
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [yearsWorked, setYearsWorked] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ========================================
    // handleSave FUNCTION - TASK SOLUTION
    // ========================================
    const handleSave = async () => {
        // ========================================
        // EXPLANATION FOR STUDENTS:
        // ========================================
        // This function sends data to the Node.js backend
        // using the fetch() API with POST method.
        // 
        // Key parts:
        // 1. method: 'POST' - tells server we're sending data
        // 2. headers: 'Content-Type: application/json' - data format
        // 3. body: JSON.stringify({...}) - the actual data
        // ========================================
        
        setIsSubmitting(true);
        setMessage('');
        
        try {
            // Send POST request to Node.js backend
            const response = await fetch('http://localhost:5000/api/addExp', {
                method: 'POST',                              // HTTP method
                headers: {
                    'Content-Type': 'application/json'       // Tell server we're sending JSON
                },
                body: JSON.stringify({                       // Convert JS object to JSON string
                    UserID: 1,                               // Hardcoded for demo
                    JobTitle: jobTitle || 'Software Engineer',    // From input or default
                    CompanyName: companyName || 'Systems Ltd',    // From input or default
                    YearsWorked: parseInt(yearsWorked) || 2       // From input or default
                })
            });
            
            // Parse the JSON response
            const result = await response.json();
            
            // Log result to console
            console.log('===== SAVE RESULT =====');
            console.log('Success:', result.success);
            console.log('Message:', result.message);
            console.log('Data:', result.data);
            
            if (result.success) {
                setMessage('Experience saved successfully!');
                // Clear form
                setJobTitle('');
                setCompanyName('');
                setYearsWorked('');
            } else {
                setMessage('Error: ' + result.message);
            }
            
        } catch (error) {
            console.error('Save error:', error);
            setMessage('Failed to save. Is the backend running?');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ========================================
    // SIMPLE VERSION (As specified in task)
    // ========================================
    const handleSaveSimple = async () => {
        const response = await fetch('http://localhost:5000/api/addExp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserID: 1,
                JobTitle: 'Software Engineer',      // As specified in task
                CompanyName: 'Systems Ltd'          // As specified in task
            })
        });
        
        const data = await response.json();
        console.log('Result:', data);
    };

    // ========================================
    // RENDER UI
    // ========================================
    return (
        <div className="add-experience-form">
            <h2>Add New Experience</h2>
            
            <div className="form-group">
                <label>Job Title</label>
                <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Software Engineer"
                />
            </div>
            
            <div className="form-group">
                <label>Company Name</label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Systems Ltd"
                />
            </div>
            
            <div className="form-group">
                <label>Years Worked</label>
                <input
                    type="number"
                    value={yearsWorked}
                    onChange={(e) => setYearsWorked(e.target.value)}
                    placeholder="e.g., 2"
                    min="1"
                    max="50"
                />
            </div>
            
            {/* Save Button - calls handleSave on click */}
            <button 
                onClick={handleSave}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Saving...' : 'Save Experience'}
            </button>
            
            {/* Button for simple demo version */}
            <button 
                onClick={handleSaveSimple}
                style={{ marginLeft: '10px' }}
            >
                Quick Demo Save
            </button>
            
            {/* Display message */}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddExperience;

// ============================================================================
// MINIMUM CODE REQUIRED FOR TASK
// ============================================================================
/*
const handleSave = async () => {
    await fetch('http://localhost:5000/api/addExp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            JobTitle: 'Software Engineer',
            CompanyName: 'Systems Ltd'
        })
    });
};

// Call with: <button onClick={handleSave}>Save</button>
*/

// ============================================================================
// HOW IT WORKS:
// ============================================================================
/*
1. User fills form and clicks "Save Experience"
2. handleSave() is called
3. fetch() sends POST request to http://localhost:5000/api/addExp
4. Node.js backend receives the data in req.body
5. Backend calls sp_AddExperience stored procedure
6. Database inserts new record
7. Backend sends response back to React
8. React shows success/error message
*/

// ============================================================================
// HOW TO USE:
// ============================================================================
// 1. Save as AddExperience.jsx in src/components
// 2. Import in App.js: import AddExperience from './components/AddExperience';
// 3. Use in JSX: <AddExperience />
// ============================================================================
