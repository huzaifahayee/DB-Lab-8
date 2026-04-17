// ============================================================================
// COMPLETE REACT FRONTEND - App.js
// Rozgar Pakistan - E-Resume Builder
// ============================================================================
// This is the main App component that combines all features
// ============================================================================

import React, { useState, useEffect } from 'react';
import './App.css';

// ============================================================================
// LOGIN COMPONENT (Task 3)
// ============================================================================

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setMessage('Please enter both email and password');
            return;
        }
        
        setIsLoading(true);
        setMessage('');
        
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                onLogin(data.user);  // Pass user to parent
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            setMessage('Cannot connect to server. Is backend running on port 5000?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Rozgar Pakistan</h1>
                <p className="subtitle">E-Resume Builder Portal</p>
                
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    <button type="submit" disabled={isLoading} className="btn-login">
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    
                    {message && <p className="message error">{message}</p>}
                </form>
                
                <div className="demo-info">
                    <p><strong>Demo Credentials:</strong></p>
                    <p>Email: ali.raza@email.com</p>
                    <p>Password: password123</p>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// EXPERIENCE TABLE COMPONENT (Task 4)
// ============================================================================

function ExperienceTable({ data, onDelete, onEdit }) {
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
                            <button className="btn-edit" onClick={() => onEdit(job)}>Edit</button>
                            <button className="btn-delete" onClick={() => onDelete(job.ExpID)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// ============================================================================
// ADD EXPERIENCE FORM COMPONENT (Task 8)
// ============================================================================

function AddExperienceForm({ userId, onSave }) {
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
                    placeholder="Job Title (e.g., Software Engineer)"
                />
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name (e.g., Systems Ltd)"
                />
                <input
                    type="number"
                    value={yearsWorked}
                    onChange={(e) => setYearsWorked(e.target.value)}
                    placeholder="Years Worked"
                    min="1"
                    max="50"
                />
                <button onClick={handleSave} disabled={isSubmitting} className="btn-add">
                    {isSubmitting ? 'Saving...' : 'Add Experience'}
                </button>
            </div>
            {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
        </div>
    );
}

// ============================================================================
// DASHBOARD COMPONENT
// ============================================================================

function Dashboard({ user, onLogout }) {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect to fetch data (Task 7)
    useEffect(() => {
        fetchExperience();
    }, [user.UserID]);

    const fetchExperience = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/getExp/${user.UserID}`);
            const result = await response.json();
            
            console.log('Fetched experience:', result);
            
            if (result.success) {
                setExperience(result.data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (expId) => {
        if (!window.confirm('Delete this experience?')) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/deleteExp/${expId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            
            if (result.success) {
                fetchExperience();  // Refresh list
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleEdit = async (job) => {
        const newTitle = prompt('Enter new job title:', job.JobTitle);
        if (!newTitle) return;
        
        const newCompany = prompt('Enter new company:', job.CompanyName);
        if (!newCompany) return;
        
        const newYears = prompt('Enter years worked:', job.YearsWorked);
        if (!newYears) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/updateExp/${job.ExpID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    JobTitle: newTitle,
                    CompanyName: newCompany,
                    YearsWorked: parseInt(newYears),
                    IsCurrentJob: job.IsCurrentJob
                })
            });
            
            const result = await response.json();
            if (result.success) {
                fetchExperience();
            }
        } catch (error) {
            console.error('Edit error:', error);
        }
    };

    return (
        <div className="dashboard">
            <header className="header">
                <h1>Rozgar Pakistan</h1>
                <div className="user-info">
                    <span>Welcome, <strong>{user.FullName}</strong></span>
                    <button onClick={onLogout} className="btn-logout">Logout</button>
                </div>
            </header>
            
            <main className="main-content">
                <div className="card">
                    <div className="card-header">
                        <h2>Work Experience</h2>
                        <button onClick={fetchExperience} className="btn-refresh">Refresh</button>
                    </div>
                    
                    {loading ? (
                        <div className="loading">Loading experience data...</div>
                    ) : (
                        <ExperienceTable 
                            data={experience}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    )}
                </div>
                
                <div className="card">
                    <AddExperienceForm 
                        userId={user.UserID}
                        onSave={fetchExperience}
                    />
                </div>
            </main>
        </div>
    );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

function App() {
    const [user, setUser] = useState(() => {
        const savedUser = window.localStorage.getItem('rozgar-user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleLogin = (userData) => {
        setUser(userData);
        window.localStorage.setItem('rozgar-user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('rozgar-user');
    };

    return (
        <div className="App">
            {user ? (
                <Dashboard user={user} onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
