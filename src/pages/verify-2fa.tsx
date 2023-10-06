import React, { useState } from 'react';
import axios from "../utils/axiosConfig"

// Explanation
// We're using React functional components and state hooks.
// The handleVerify function makes a POST request to the /verify-2fa API.
// Two text inputs are provided for email and the 6-digit code, and a button triggers the verification.

const Verify2FAPage = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const handleVerify = async () => {
        try {
            const response = await axios.post('auth/verify-2fa', { 
                email, 
                code 
            });
            console.log(response.data);
            // TODO: Redirect to dashboard
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Verify 2FA Code</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerify}>Verify</button>
        </div>
    );
};

export default Verify2FAPage;