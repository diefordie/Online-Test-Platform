'use client';
import React, { useState } from "react"; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Inisialisasi state error
    const [showPopup, setShowPopup] = useState(false); 
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error sebelum mencoba login
    
        try {
            const response = await fetch('http://localhost:2000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email, 
                    password 
                }),
            });
    
            // Dapatkan data respons
            const data = await response.json();
    
            // Periksa apakah respons tidak ok
            if (!response.ok) {
                // Tangani kesalahan berdasarkan status
                if (response.status === 400) {
                    throw new Error(data.error || 'Data yang Anda masukkan tidak valid.');
                } else if (response.status === 401) {
                    throw new Error('Kredensial tidak valid. Silakan coba lagi.');
                } else if (response.status === 403) {
                    throw new Error('Akses sebagai Author ditolak. Anda tidak memiliki hak akses, pastikan anda telah mengirimkan persyaratan yang dibutuhkan, dan tunggu sampai admin memverifikasi.');
                } else {
                    throw new Error('Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.');
                }
            }
    
            console.log("Login berhasil:", data);
            localStorage.setItem('token', data.token);
            
            // Redirect berdasarkan role
            if (data.role === 'AUTHOR') {
                router.push('/author/dashboard'); // Ganti dengan jalur dashboard author
            } else {
                router.push('/user/dashboard'); // Ganti dengan jalur dashboard user
            }
        } catch (err) {
            console.error("Kesalahan login", err);
    
            // Menampilkan pesan kesalahan sebagai popup
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message, 
            }).then(() => {
                router.push('/auth/syarat');
            });
    
            setError(err.message); // Simpan pesan error di state (opsional, jika perlu)
        }
    };

    return (
        <div className="relative min-h-screen flex items-center bg-white">
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', padding: '20px' }}></div>

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full max-w-sm p-8 bg-secondary shadow-md rounded-3xl ml-20">
                <h2 className="text-3xl font-bold mb-6 text-black text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-birutua text-putih py-2 px-10 rounded-2xl shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                            Login
                        </button>
                    </div>
                    <p className="text-center mt-4 text-sm">
                        Belum memiliki akun? <Link href="/auth/registrasi" className="text-white font-bold hover:underline">Daftar</Link>
                    </p>
                </form>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold">Login Berhasil!</h3>
                        <p className="mt-2">Selamat! Anda berhasil login.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
