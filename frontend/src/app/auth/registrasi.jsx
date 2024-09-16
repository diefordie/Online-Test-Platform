'use client'
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config'; // Import auth
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import gambar1 from '@/app/assets/registrasi.png';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const Registrasi = () => {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [isApproved, setIsApproved] = useState('false');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use createUserWithEmailAndPassword from firebase/auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            const db = getFirestore();

            const status = role == 'author' ? 'false' : 'true';
            await setDoc(doc(db, 'users', user.uid), {
                nama,
                email,
                role,
                isApproved: status,
            });

            console.log("Akun berhasil didaftarkan", user);

            router.push('/');
        } catch (err) {
            console.error("Gagal Registrasi", err);
        }
    };

    return (
      <div className="relative min-h-screen flex items-center bg-white">
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
          <Image
            alt="gambar1"
            src={gambar1}
            sizes="100vw"
            style={{
              width: '40%',
              height: 'auto',
              position: 'absolute',
              top:'23%',
            }}
          />
    </div>

        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full max-w-sm p-8 bg-secondary shadow-md rounded-3xl ml-20">
        <h2 className="text-3xl font-bold mb-6 text-black text-center">Daftar</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
              <label htmlFor='nama' className="block text-sm font-medium text-black">Nama:</label>
              <input 
                type="text" 
                id="nama"
                name="nama"
                onChange={(e) => setNama(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
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
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-black">Role:</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                {/* <option value="admin">Admin</option> */}
                <option value="author">Author</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex justify-center">
            <button 
              type="submit" 
              className="bg-birutua text-putih py-2 px-10 rounded-2xl shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              Kirim
            </button>
            </div>
            <p className="text-center mt-4 text-sm">
              Sudah memiliki akun? <Link href="/auth/login" className="text-white font-bold hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  };

export default Registrasi;