// ============================================================================
// TASK 7: REACT useEffect (READ Operation)
// ============================================================================
// REQUIREMENT:
// Inside a React component, write a useEffect hook that uses fetch() API
// to call '/api/getExp'. Take the JSON response and log it to console.
// ============================================================================

import React, { useState, useEffect } from 'react';

// ============================================================================
// SOLUTION: React Component with useEffect for Data Fetching
// ============================================================================

function ExperienceLoader() {
    // ========================================
    // EXPLANATION FOR STUDENTS:
    // ========================================
    // useState: Stores the data we fetch from the database
    // useEffect: Runs code when component loads (like componentDidMount)
    // 
    // useEffect(() => { ... }, []):
    //   - First argument: function to run
    //   - Second argument: dependency array
    //   - Empty [] means: run only once when component mounts
    // ========================================
    
    const [experience, setExperience] = useState([]);  // Store fetched data
    const [loading, setLoading] = useState(true);       // Track loading state
    const [error, setError] = useState(null);           // Track errors

    // ========================================
    // useEffect HOOK - Fetches data on component load
    // ========================================
    useEffect(() => {
        // Define an async function inside useEffect
        const fetchData = async () => {
            try {
                // Call the Node.js backend API
                const response = await fetch('http://localhost:5000/api/getExp/1');
                
                // Parse the JSON response
                const result = await response.json();
                
                // Log to console (as required by the task)
                console.log('===== DATA FROM DATABASE =====');
                console.log('Success:', result.success);
                console.log('Experience Records:', result.data);
                console.log('Number of records:', result.data?.length || 0);
                
                // Save data to state
                if (result.success) {
                    setExperience(result.data);
                } else {
                    setError(result.message);
                }
                
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to connect to server');
            } finally {
                setLoading(false);
            }
        };
        
        // Call the async function
        fetchData();
        
    }, []);  // Empty dependency array = run once on mount

    // ========================================
    // RENDER UI
    // ========================================
    if (loading) {
        return <div>Loading experience data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Work Experience</h2>
            <p>Loaded {experience.length} records (check console for details)</p>
            <ul>
                {experience.map((job) => (
                    <li key={job.ExpID}>
                        {job.JobTitle} at {job.CompanyName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExperienceLoader;

// ============================================================================
// SIMPLE VERSION (Minimum Required for Task)
// ============================================================================
/*
function ExperienceLoader() {
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/getExp/1')
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Log to console as required
                setExperience(data.data);
            });
    }, []);

    return (
        <ul>
            {experience.map((job) => (
                <li key={job.ExpID}>{job.JobTitle} at {job.CompanyName}</li>
            ))}
        </ul>
    );
}
*/

// ============================================================================
// ALTERNATIVE: Using .then() instead of async/await
// ============================================================================
/*
useEffect(() => {
    fetch('http://localhost:5000/api/getExp/1')
        .then(response => response.json())
        .then(data => {
            console.log('Data from API:', data);
            setExperience(data.data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}, []);
*/

// ============================================================================
// EXPECTED CONSOLE OUTPUT:
// ============================================================================
/*
===== DATA FROM DATABASE =====
Success: true
Experience Records: (3) [{...}, {...}, {...}]
Number of records: 3
*/

// ============================================================================
// HOW TO USE:
// ============================================================================
// 1. Save this as ExperienceLoader.jsx in src/components
// 2. Import in App.js: import ExperienceLoader from './components/ExperienceLoader';
// 3. Use in JSX: <ExperienceLoader />
// 4. Open browser console (F12) to see the logged data
// ============================================================================
