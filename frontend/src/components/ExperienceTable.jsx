// ============================================================================
// EXPERIENCE TABLE COMPONENT - Separate File Version
// Save as: src/components/ExperienceTable.jsx
// ============================================================================

import React from 'react';

// ExperienceTable component receives 'data' as a prop (Task 4)
function ExperienceTable({ data, onDelete, onEdit }) {
    // Handle empty data
    if (!data || data.length === 0) {
        return (
            <div className="empty-state">
                <p>No work experience added yet.</p>
            </div>
        );
    }

    return (
        <table className="experience-table">
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Years</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* Use .map() to generate table rows (Task 4) */}
                {data.map((job) => (
                    <tr key={job.ExpID}>
                        <td><strong>{job.JobTitle}</strong></td>
                        <td>{job.CompanyName}</td>
                        <td>{job.YearsWorked} year{job.YearsWorked > 1 ? 's' : ''}</td>
                        <td>
                            <span className={`badge ${job.IsCurrentJob ? 'current' : 'past'}`}>
                                {job.IsCurrentJob ? 'Current' : 'Past'}
                            </span>
                        </td>
                        <td>
                            <button onClick={() => onEdit(job)}>Edit</button>
                            <button onClick={() => onDelete(job.ExpID)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ExperienceTable;
