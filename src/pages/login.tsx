import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [show2FA, setShow2FA] = useState(false);
    const [code, setCode] = useState('');
    // const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('auth/login/login', { 
                email, 
                password 
            });
            setMessage(response.data.message);
            if (response.data.status === '2fa_sent') {
                setShow2FA(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handle2FAVerification = async () => {
        try {
            const response = await axios.post('auth/login/verify-2fa', { 
                email, 
                code
            });
            if (response.data.status === 'success') {
                localStorage.setItem('jwt_token', response.data.token);
                router.push('/dashboard');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const handlePasswordResetRequest = async () => {
    //     try {
    //         const response = await axios.post('auth/password-reset/request/', { email });
    //         setMessage("A password reset link has been sent to your email.");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div>
            <h1>Login to Your Account</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            <Link href="/password-reset">Forgot Password?</Link>
            {/* <Link href="#" onClick={() => setShowResetPasswordForm(true)}>Forgot Password?</Link>
            {showResetPasswordForm && (
                <div>
                    <input
                        type="email"
                        placeholder="Enter your email for password reset"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handlePasswordResetRequest}>Send Reset Link</button>
                </div>
            )} */}
            {show2FA && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter 2FA code" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={handle2FAVerification}>Verify</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginPage;

// import React, { useState } from 'react';
// import axios from '../utils/axiosConfig';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [show2FA, setShow2FA] = useState(false);
//     const [code, setCode] = useState('');
//     const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

//     const router = useRouter();

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('auth/login', { 
//                 email, 
//                 password 
//             });
//             setMessage(response.data.message);
//             if (response.data.status === '2fa_sent') {
//                 setShow2FA(true);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handle2FAVerification = async () => {
//         try {
//             const response = await axios.post('auth/verify-2fa', { 
//                 email, 
//                 code
//             });
//             if (response.data.status === 'success') {
//                 localStorage.setItem('jwt_token', response.data.token);
//                 router.push('/dashboard');
//             } else {
//                 setMessage(response.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handlePasswordResetRequest = async () => {
//         try {
//             const response = await axios.post('auth/password-reset/request/', { email });
//             setMessage("A password reset link has been sent to your email.");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div>
//             <h1>Login to Your Account</h1>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <Link href="#" onClick={() => setShowResetPasswordForm(true)}>Forgot Password?</Link>
//             {showResetPasswordForm && (
//                 <div>
//                     <input
//                         type="email"
//                         placeholder="Enter your email for password reset"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <button onClick={handlePasswordResetRequest}>Send Reset Link</button>
//                 </div>
//             )}
//             {show2FA && (
//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Enter 2FA code" 
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                     />
//                     <button onClick={handle2FAVerification}>Verify</button>
//                 </div>
//             )}
//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default LoginPage;

////////////////////////


// import React, { useState } from 'react';
// import axios from '../utils/axiosConfig';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState("");
//     const [show2FA, setShow2FA] = useState(false);
//     const [code, setCode] = useState("");
    
//     const router = useRouter();

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('auth/login', { 
//                 email, 
//                 password 
//             });
//             setMessage(response.data.message);
//             if (response.data.status === '2fa_sent') {
//                 setShow2FA(true);
//             }
//             console.log(response.data);
//             // TODO: Redirect to 2FA page
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handle2FAVerification = async () => {
//         try {
//             console.log("Payload being sent:", { email, code });
//             const response = await axios.post('auth/verify-2fa', { 
//                 email, 
//                 code
//             });
//             if (response.data.status === 'success') {
//                  // Store the received JWT token in the local storage
//                 localStorage.setItem('jwt_token', response.data.token);
//                 router.push('/dashboard');
//             } else {
//                 setMessage(response.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div>
//             <h1>Login to Your Account</h1>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <Link href="/forgot-password">Forgot Password?</Link> {/* Add this line */}
//             {show2FA && (
//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Enter 2FA code" 
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                     />
//                     <button onClick={handle2FAVerification}>Verify</button>
//                 </div>
//             )}
//             {message && <p>{message}</p>}
//         </div>
//     );
// }


// export default LoginPage;





// import React, { useState } from 'react';
// import axios from '../utils/axiosConfig';
// import { useRouter } from 'next/router';


// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState("");
//     const [show2FA, setShow2FA] = useState(false);
    
//     const router = useRouter();

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('auth/login', { 
//                 email, 
//                 password 
//             });
//             setMessage(response.data.message);
//             if (response.data.status === '2fa_sent') {
//             setShow2FA(true);
//             }

//             console.log(response.data);
//             // TODO: Redirect to 2FA page
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div>
//             <h1>Login to Your Account</h1>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>
//             {show2FA && <input type="text" placeholder="Enter 2FA code" />}
//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default LoginPage;

// Explanation
// We're using React functional components and state hooks.
// The handleLogin function makes a POST request to the /login API.
// Two text inputs are provided for email and password, and a button triggers the login.