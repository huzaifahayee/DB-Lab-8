// ============================================================================
// ADD EXPERIENCE COMPONENT - Separate File Version
// Save as: src/components/AddExperience.jsx
// ============================================================================

import React, { useState } from 'react';

function AddExperience({ userId, onSave }) {
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [yearsWorked, setYearsWorked] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // handleSave function (Task 8)
    const handleSave = async () => {
        if (!jobTitle || !companyName || !yearsWorked) {
            setMessage('Please fill in all fields');
            return;
        }
        
        setIsSubmitting(true);
        setMessage('');
        
        try {
            // POST request to backend (Task 8)
            const response = await fetch('http://localhost:5000/api/addExp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    UserID: userId,
                    JobTitle: jobTitle,
                    CompanyName: companyName,
                    YearsWorked: parseInt(yearsWorked)
                })
            });
            
            const result = await response.json();
            console.log('Save result:', result);
            
            if (result.success) {
                setMessage('Experience added successfully!');
                setJobTitle('');
                setCompanyName('');
                setYearsWorked('');
                onSave();  // Refresh the list
            } else {
                setMessage('Error: ' + result.message);
            }
        } catch (error) {
            setMessage('Failed to save experience');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-form-container">
            <h3>Add New Experience</h3>
            <div className="add-form">
                <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Job Title"
                />
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name"
                />
                <input
                    type="number"
                    value={yearsWorked}
                    onChange={(e) => setYearsWorked(e.target.value)}
                    placeholder="Years Worked"
                    min="1"
                />
                <button onClick={handleSave} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Add Experience'}
                </button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddExperience;
