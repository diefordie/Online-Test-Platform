'use client'
import React, { useState } from "react"; // Pastikan useState diimpor
import { useRouter } from 'next/navigation';
import Image from "next/image";
import gambar1 from '@/app/assets/registrasi.png';// Pastikan import useRouter benar

const Persyaratan = () => {
    const router = useRouter(); // Inisialisasi useRouter

    // Fungsi untuk menangani klik tombol
    const handleButtonClick = () => {
        try {
            router.push('/login'); // Arahkan ke halaman login ketika tombol diklik
        } catch (error) {
            console.error("Failed to navigate:", error);
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
                        top: '23%',
                    }}
                />
            </div>

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full max-w-sm p-8 bg-secondary shadow-md rounded-3xl ml-20 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-6 text-black text-center">Persyaratan</h2>
                <p>Untuk mendaftar sebagai author, silakan lengkapi persyaratan berikut:</p>
                <ul className="list-disc list-inside mt-4">
                    <li>1. Scan identitas diri (KTP/SIM) asli</li>
                    <li>2. Scan Kartu Keluarga asli</li>
                    <li>3. Curriculum Vitae (CV)</li>
                    <li>4. Pas foto berwarna ukuran 3x4</li>
                </ul>
                <p className="mt-4">Buatlah file .zip berisi dokumen-dokumen persyaratan di atas lalu kirim ke alamat e-mail EtamTest@gmail.com dan tunggu pemberitahuan selanjutnya.</p>
                
                {/* Container untuk tombol */}
                <div className="flex justify-center mt-8 w-full">
                    <button
                        type="button" // Ubah type dari 'submit' menjadi 'button'
                        onClick={handleButtonClick} // Tambahkan event handler
                        className="bg-birutua text-putih py-2 px-10 rounded-2xl shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Persyaratan;
