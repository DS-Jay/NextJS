import React, { useState } from 'react';
import axios from "../utils/axiosConfig"


const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('job_hunter'); //Default role
    const [message, setMessage] = useState("");


    const handleRegister = async () => {
        try {
            const response = await axios.post('auth/register/register', { 
                email, 
                password,
                role
            });
            setMessage(response.data.message);

            console.log(response.data);
            // TOD: Implement what happens next (e.g., redirect to login) 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="job_hunter">Job Hunter</option>
                <option value="business">Business</option>
                <option value="recruiter">Recruiter</option>
            </select>
            <button onClick={handleRegister}>Register</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterPage;

// Explanation
// Again, we use React functional components and state hooks.
// The handleRegister function is responsible for making a POST request to the /register API.
// We include email, password, and role as form fields, and a button triggers the registration.