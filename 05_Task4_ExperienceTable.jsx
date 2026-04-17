// ============================================================================
// TASK 4: BUILD THE REACT EXPERIENCE TABLE COMPONENT
// ============================================================================
// REQUIREMENT:
// Write a functional React component named 'ExperienceTable'.
// It should accept an array of objects called 'data' via props.
// Use the .map() function in JSX to generate an HTML <tr> (table row)
// for every job in the array, displaying the Job Title and Company.
// ============================================================================

import React from 'react';

// ============================================================================
// SOLUTION: ExperienceTable Component
// ============================================================================

function ExperienceTable({ data }) {
    // ========================================
    // EXPLANATION FOR STUDENTS:
    // ========================================
    // Props (properties) are how we pass data from parent to child components.
    // 
    // { data } is destructuring - extracting 'data' from props object
    // Same as writing: function ExperienceTable(props) { const data = props.data; }
    // 
    // The .map() function creates a new array by transforming each element.
    // We use it to convert each job object into a <tr> element.
    // ========================================
    
    // Handle case when data is empty or undefined
    if (!data || data.length === 0) {
        return (
            <div className="empty-state">
                <p>No work experience added yet.</p>
                <p>Add your first experience below!</p>
            </div>
        );
    }

    return (
        <table className="experience-table">
            {/* Table Header */}
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Years</th>
                    <th>Status</th>
                </tr>
            </thead>
            
            {/* Table Body - Generated using .map() */}
            <tbody>
                {/* 
                    ========================================
                    THE .map() FUNCTION - KEY CONCEPT!
                    ========================================
                    data.map((job) => ...) loops through each job object
                    and returns a <tr> element for each one.
                    
                    'key' prop is REQUIRED in React for lists.
                    It helps React identify which items changed.
                    Use a unique identifier like ExpID.
                    ========================================
                */}
                {data.map((job) => (
                    <tr key={job.ExpID}>
                        <td><strong>{job.JobTitle}</strong></td>
                        <td>{job.CompanyName}</td>
                        <td>{job.YearsWorked} year{job.YearsWorked > 1 ? 's' : ''}</td>
                        <td>
                            {job.IsCurrentJob ? (
                                <span className="badge current">Current</span>
                            ) : (
                                <span className="badge past">Past</span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// Export the component
export default ExperienceTable;

// ============================================================================
// SIMPLE VERSION (Minimum Required for Task)
// ============================================================================
/*
function ExperienceTable({ data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>
                {data.map((job) => (
                    <tr key={job.ExpID}>
                        <td>{job.JobTitle}</td>
                        <td>{job.CompanyName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
*/

// ============================================================================
// EXAMPLE: How Parent Component Uses ExperienceTable
// ============================================================================
/*
import React, { useState, useEffect } from 'react';
import ExperienceTable from './ExperienceTable';

function Dashboard() {
    const [experience, setExperience] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/api/getExp/1')
            .then(res => res.json())
            .then(result => setExperience(result.data));
    }, []);
    
    return (
        <div>
            <h2>My Work Experience</h2>
            <ExperienceTable data={experience} />
        </div>
    );
}
*/

// ============================================================================
// SAMPLE DATA STRUCTURE (What 'data' prop looks like):
// ============================================================================
/*
const sampleData = [
    { ExpID: 103, JobTitle: 'Senior Software Engineer', CompanyName: 'Netsol', YearsWorked: 3, IsCurrentJob: true },
    { ExpID: 101, JobTitle: 'Junior Developer', CompanyName: 'Systems Ltd', YearsWorked: 2, IsCurrentJob: false },
    { ExpID: 100, JobTitle: 'Intern', CompanyName: 'PTCL', YearsWorked: 1, IsCurrentJob: false }
];

// Usage: <ExperienceTable data={sampleData} />
*/

// ============================================================================
// HOW TO USE THIS COMPONENT:
// ============================================================================
// 1. Save this file as ExperienceTable.jsx in src/components folder
// 2. Import it in your parent component:
//    import ExperienceTable from './components/ExperienceTable';
// 3. Pass data as a prop:
//    <ExperienceTable data={experienceArray} />
// ============================================================================
