// src/Auth.tsx
import React, { useState } from 'react';
import { auth } from './firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      alert(`Signup successful: ${user.user.email}`);
    } catch (err: any) {
      alert(`Signup failed: ${err.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      alert(`Login successful: ${user.user.email}`);
    } catch (err: any) {
      alert(`Login failed: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Firebase Auth</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Auth;
