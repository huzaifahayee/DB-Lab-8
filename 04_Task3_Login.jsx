// ============================================================================
// TASK 3: BUILD THE REACT LOGIN COMPONENT
// ============================================================================
// REQUIREMENT:
// Write a functional React component named 'Login'.
// Use useState hook to manage 'email' and 'password' states.
// Create a simple JSX form with inputs mapped to these states, and a submit button.
// ============================================================================

import React, { useState } from 'react';

// ============================================================================
// SOLUTION: Login Component
// ============================================================================

function Login() {
    // ========================================
    // EXPLANATION FOR STUDENTS:
    // ========================================
    // useState is a React Hook that lets you add state to functional components.
    // 
    // Syntax: const [stateValue, setStateFunction] = useState(initialValue);
    // 
    // - email: stores the current value of the email input
    // - setEmail: function to update the email value
    // - useState(''): starts with empty string
    // ========================================
    
    // Declaring state variables for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // ========================================
    // FORM SUBMISSION HANDLER
    // ========================================
    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent page refresh
        
        // Validate inputs
        if (!email || !password) {
            setMessage('Please enter both email and password');
            return;
        }
        
        setIsLoading(true);
        setMessage('');
        
        try {
            // Send login request to Node.js backend
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setMessage(`Welcome, ${data.user.FullName}!`);
                console.log('Login successful:', data.user);
                // In real app: redirect to dashboard or save user to context
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Cannot connect to server. Is backend running?');
        } finally {
            setIsLoading(false);
        }
    };

    // ========================================
    // JSX RETURN (The UI)
    // ========================================
    return (
        <div className="login-container">
            <h2>Rozgar Pakistan</h2>
            <p>E-Resume Builder Portal</p>
            
            {/* Form element with onSubmit handler */}
            <form onSubmit={handleLogin}>
                
                {/* Email Input */}
                {/* 
                    value={email} - displays current state value
                    onChange={(e) => setEmail(e.target.value)} - updates state when user types
                */}
                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                
                {/* Password Input */}
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                
                {/* Submit Button */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                
                {/* Display message (success or error) */}
                {message && (
                    <p className="message">{message}</p>
                )}
            </form>
            
            {/* Demo credentials for testing */}
            <div className="demo-info">
                <p><strong>Demo:</strong> ali.raza@email.com / password123</p>
            </div>
        </div>
    );
}

// Export the component so it can be imported in other files
export default Login;

// ============================================================================
// SIMPLE VERSION (Minimum Required for Task)
// ============================================================================
/*
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h2>User Login</h2>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
            />
            <button onClick={() => console.log("Login:", email, password)}>
                Login
            </button>
        </div>
    );
}
*/

// ============================================================================
// HOW TO USE THIS COMPONENT:
// ============================================================================
// 1. Save this file as Login.jsx in your React project's src/components folder
// 2. Import it in App.js:
//    import Login from './components/Login';
// 3. Use it in your JSX:
//    <Login />
// 4. Make sure the Node.js backend is running on port 5000
// ============================================================================
