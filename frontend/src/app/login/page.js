'use client';

import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import gambar1 from '@/app/assets/elipss.png'; 
import gambar2 from '@/app/assets/login.png'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showPopup, setShowPopup] = useState(false); // Tambahkan state untuk pop-up
    const router = useRouter();
    const auth = getAuth(); // Initialize Firebase Auth
    const db = getFirestore(); // Initialize Firestore

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError('');
        setError('');

        if (!validateEmail(email)) {
            setEmailError('Login tidak valid, silahkan coba lagi');
            return;
        }

        try {
            // Sign in with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user data from Firestore
            const userDoc = doc(db, 'users', user.uid);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                const { isApproved, role } = userData;

                // Logika berdasarkan isApproved dan role
                if (isApproved && role === 'author') {
                    // Jika user adalah author dan isApproved true, redirect ke dashboard author
                    router.push('/dashboard-author');
                } else if (!isApproved && role === 'author') {
                    // Jika user adalah author tapi belum disetujui, tampilkan pop-up
                    setShowPopup(true);
                } else if (isApproved && role === 'user') {
                    // Jika user adalah user biasa dan isApproved true, redirect ke dashboard user
                    router.push('/userDashboard');
                } else {
                    setError('Role tidak dikenali atau belum disetujui.');
                }
            } else {
                setError('User does not exist.');
            }
        } catch (err) {
            console.error("Login failed", err);
            setError('Login gagal, periksa email dan password anda!');
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
                <div className="relative w-3/4 h-3/4">
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
                        {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
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
                        Belum memiliki akun? <Link href="/registrasi" className="text-white font-bold hover:underline">Daftar</Link>
                    </p>
                </form>
            </div>

            {/* Pop-up untuk pemberitahuan status persetujuan */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold">Tidak dapat masuk!</h3>
                        <p className="mt-2">Pastikan Anda telah mengirimkan berkas persyaratan ke email Admin. Tunggu sampai Admin menyetujui dan mengirimkan email konfirmasi ke Email Anda. Setelah itu, Anda dapat login menggunakan email dan kata sandi yang telah didaftarkan.</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 bg-birutua text-white py-2 px-4 rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
