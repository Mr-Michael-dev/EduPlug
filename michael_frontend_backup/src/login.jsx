// Login.jsx
import React, { useState } from 'react';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to user dashboard
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      {/* Login form */}
    </div>
  );
}

export default Login;
