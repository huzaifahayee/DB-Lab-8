// ============================================================================
// LOGIN COMPONENT - Separate File Version
// Save as: src/components/Login.jsx
// ============================================================================

import React, { useState } from 'react';

function Login({ onLogin }) {
    // useState hooks for form inputs (Task 3)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Form submission handler
    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setMessage('Please enter both email and password');
            return;
        }
        
        setIsLoading(true);
        setMessage('');
        
        try {
            // Send POST request to Node.js backend
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                onLogin(data.user);
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            setMessage('Cannot connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Rozgar Pakistan</h1>
            <p>E-Resume Builder Portal</p>
            
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
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}

export default Login;
