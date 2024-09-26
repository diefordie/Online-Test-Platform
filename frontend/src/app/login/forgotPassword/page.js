'use client'
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '@/app/firebase/config';


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const auth = getAuth(); // Initialize Firebase Auth

    // Function to handle form submit
    const handleSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
    .then(() => {
        setMessage('Email reset password telah dikirim!');
    })
    .catch((error) => {
        const errorMessage = error.message;
        setMessage(`Error: ${errorMessage}`);
    });
};

    return (
        <div>
        <form id="forgot-password-form" onSubmit={handleSubmit}>
        <input
            type="email"
            id="email"
            placeholder="Masukkan email kamu" required
            value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
            <button type="submit">Reset Password</button>
        </form>
      <div id="message">{message}</div> {/* Display message */}
    </div>
);
};

export default ForgotPasswordPage;
