import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { useRouter } from 'next/router';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Check if there is a token in the URL
  if (router.query.token && typeof router.query.token === 'string') {
    setToken(router.query.token);
  }

  const handlePasswordResetRequest = async () => {
    try {
      const response = await axios.post('auth/password/password-reset/request', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handlePasswordResetConfirm = async () => {
    try {
      const response = await axios.post('auth/password/password-reset/confirm', { token, new_password: newPassword });
      setMessage(response.data.message);
      if (response.data.message === 'Password reset successfully.') {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      {token ? (
        <div>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordResetConfirm}>Reset Password</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handlePasswordResetRequest}>Request Password Reset</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetPage;

// import React, { useState } from 'react';
// import axios from '../utils/axiosConfig';
// import { useRouter } from 'next/router';

// const PasswordResetPage = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handlePasswordResetRequest = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('auth/password-reset/request/', { email });
//             setMessage(response.data.message);
//             console.log(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div>
//             <h1>Request Password Reset</h1>
//             <form onSubmit={handlePasswordResetRequest}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <button type="submit">Request Password Reset</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default PasswordResetPage;
