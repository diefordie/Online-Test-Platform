'use client';

import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image
import gambar1 from '@/app/assets/elipss.png'; 
import gambar2 from '@/app/assets/login.png'; // Pastikan path ini benar

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const auth = getAuth(); // Initialize Firebase Auth
    const db = getFirestore(); // Initialize Firestore

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Sign in with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user data from Firestore
            const userDoc = doc(db, 'users', user.uid);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                if (userData.isApproved) {
                    // Redirect to dashboard if approved
                    router.push('/dashboard');
                } else {
                    // Show error message if not approved
                    setError('Your account is not approved yet.');
                }
            } else {
                setError('User does not exist.');
            }
        } catch (err) {
            console.error("Login failed", err);
            setError('Login failed. Please check your email and password.');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center bg-white">
            <div className="absolute top-0 right-0" style={{ width: '26%', height: '100%' }}>
                <Image
                    src={gambar1}
                    alt="gambar1"
                    layout="fill"  
                    objectFit="cover"
                />
            </div>
            <div className="absolute top-0 right-1/4 transform translate-x-1/2 w-1/2 h-full">
                <div className="relative w-3/4 h-3/4 ">
                    <Image
                        src={gambar2}
                        alt="gambar2"
                        layout="fill"  
                        objectFit="contain"
                    />
                </div>
            </div>

            <div className="relative w-full max-w-sm p-8 bg-secondary shadow-md rounded-3xl ml-20 md:h-[450px]">
                <h2 className="text-2xl font-bold mb-6 text-black text-center">Masuk</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email' className="block text-sm font-medium text-black">Alamat Email:</label>
                        <input 
                            type="text" 
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className="block text-sm font-medium text-black">Kata Sandi:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="mt-1 text-right">
                        <a href="/lupa-password" className="text-sm text-birutua text-bold hover:underline">Lupa kata sandi?</a>
                    </div>
                    <div className="flex justify-center">
                        <button 
                            type="submit" 
                            className="bg-birutua text-white py-2 px-10 rounded-2xl shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                            Masuk
                        </button>
                    </div>
                    <p className="text-center mt-4 text-sm">
                        Belum memiliki akun? <Link href="/auth/register" className="text-white font-bold hover:underline">Daftar</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

