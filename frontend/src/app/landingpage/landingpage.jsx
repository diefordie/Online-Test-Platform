'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// Data Testimoni
const testimonials = [
    {
        name: 'Bang Joko',
        status: 'Mahasiswa',
        rating: 5,
        review: 'Seru banget tes soal di sini, soal-soalnya update banget dan sangat mirip dengan soal aslinya. Slebew!',
        image: '/path-to-joko-image.png',
    },
    {
        name: 'Dewi Cahaya',
        status: 'Pelajar',
        rating: 4,
        review: 'Platform ini bener-bener membantu untuk belajar. Banyak soal yang cocok untuk persiapan ujian.',
        image: '/path-to-dewi-image.png',
    },
    {
        name: 'Rizki Satria',
        status: 'Guru',
        rating: 5,
        review: 'Sebagai guru, saya sangat terbantu dalam memberikan tes yang berkualitas untuk murid-murid saya.',
        image: '/path-to-rizki-image.png',
    },
];

const TestimonialsSection = () => {
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    const handleNext = () => {
        setCurrentTestimonialIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentTestimonialIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const { name, status, rating, review, image } = testimonials[currentTestimonialIndex];

    return (
        <div id="testimoni" className="bg-gray-50 py-20 px-4 text-center min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-10">Apa Kata Pengguna?</h1>

            <div className="flex justify-center items-center mb-6">
                <button onClick={handlePrev} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                    <span className="text-2xl">‹</span>
                </button>

                <div className="mx-4 opacity-50">
                    <img
                        src={testimonials[(currentTestimonialIndex - 1 + testimonials.length) % testimonials.length].image}
                        alt={testimonials[(currentTestimonialIndex - 1 + testimonials.length) % testimonials.length].name}
                        className="w-16 h-16 rounded-full object-cover mx-auto"
                    />
                    <p className="text-gray-700">{testimonials[(currentTestimonialIndex - 1 + testimonials.length) % testimonials.length].name}</p>
                </div>

                <div className="mx-4">
                    <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover mx-auto mb-2" />
                    <p className="text-lg font-semibold text-gray-800">{name}</p>
                    <p className="text-gray-600">{status}</p>
                    <div className="flex justify-center mb-2">
                        {Array(rating).fill(0).map((_, index) => (
                            <span key={index} className="text-yellow-400">★</span>
                        ))}
                    </div>
                    <p className="text-gray-700 italic">"{review}"</p>
                </div>

                <div className="mx-4 opacity-50">
                    <img
                        src={testimonials[(currentTestimonialIndex + 1) % testimonials.length].image}
                        alt={testimonials[(currentTestimonialIndex + 1) % testimonials.length].name}
                        className="w-16 h-16 rounded-full object-cover mx-auto"
                    />
                    <p className="text-gray-700">{testimonials[(currentTestimonialIndex + 1) % testimonials.length].name}</p>
                </div>

                <button onClick={handleNext} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                    <span className="text-2xl">›</span>
                </button>
            </div>
        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Website Name */}
                    <div className="text-2xl font-bold text-gray-800">Etam Code</div>

                    {/* Menu Items */}
                    <ul className="flex space-x-6">
                        <li>
                            <a href="#beranda" className="text-gray-800 hover:text-gray-600">
                                Beranda
                            </a>
                        </li>
                        <li>
                            <a href="#kategori" className="text-gray-800 hover:text-gray-600">
                                Kategori
                            </a>
                        </li>
                        <li>
                            <a href="#cara-kerja" className="text-gray-800 hover:text-gray-600">
                                Cara Kerja
                            </a>
                        </li>
                        <li>
                            <a href="#tentang-kami" className="text-gray-800 hover:text-gray-600">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#testimoni" className="text-gray-800 hover:text-gray-600">
                                Testimoni
                            </a>
                        </li>
                    </ul>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                        <Link href="/login">
                            <button className="bg-white text-green-600 border border-green-600 py-2 px-4 rounded-md shadow-sm hover:bg-gray-100">
                                Masuk
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="bg-green-600 text-green py-2 px-4 rounded-md shadow-sm hover:bg-green-700">
                                Daftar
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div id="beranda" className="flex-grow bg-gray-50 flex flex-col justify-center items-center text-center py-20 px-4 mt-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Tingkatkan Kemampuanmu dengan Tes Soal Online Terlengkap
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                    Platform komunitas untuk membuat dan mengikuti tes pilihan ganda. Buat soal sendiri atau tantang diri dengan soal dari pengguna lain!
                </p>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <Link href="/mulai-test">
                        <button className="bg-green-600 text-green py-3 px-6 rounded-md shadow-md hover:bg-green-700">
                            Mulai Test Sekarang
                        </button>
                    </Link>
                    <Link href="/buat-test">
                        <button className="bg-white text-green-600 border border-green-600 py-3 px-6 rounded-md shadow-md hover:bg-gray-100">
                            Buat Test Sendiri
                        </button>
                    </Link>
                </div>
            </div>

            {/* Kategori Section */}
            <div id="kategori" className="bg-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Kategori Etamtest</h1>
                    <p className="text-lg text-gray-600 mb-10">
                        Tes soal dikelompokkan berdasarkan kategori yang dibuat oleh author terpercaya dan berkualitas. 
                        Temukan kategori tes soal yang kamu butuhkan atau buat soal baru di kategori yang ada!
                    </p>

                    {/* Kategori Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-800">Kategori 1</h2>
                            <p className="text-gray-600 mt-2">Deskripsi singkat untuk kategori 1.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-800">Kategori 2</h2>
                            <p className="text-gray-600 mt-2">Deskripsi singkat untuk kategori 2.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-800">Kategori 3</h2>
                            <p className="text-gray-600 mt-2">Deskripsi singkat untuk kategori 3.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-800">Kategori 4</h2>
                            <p className="text-gray-600 mt-2">Deskripsi singkat untuk kategori 4.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cara Kerja Section */}
            <div id="cara-kerja" className="bg-gray-50 py-20 px-4">
                <div className="container mx-auto flex flex-col lg:flex-row items-center">
                    {/* Gambar di kiri */}
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                        <img src="/path-to-your-image.png" alt="Cara Kerja" className="w-full h-auto" />
                    </div>

                    {/* Teks di kanan */}
                    <div className="lg:w-2/3">
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">Cara Kerja Platform Komunitas</h1>
                        
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <span className="text-green-600 text-xl font-bold mr-3">✓</span>
                                <span className="text-gray-800 text-lg">
                                    <strong>Daftar Akun:</strong> Buat akun gratis dan mulai membuat atau mengikuti tes.
                                </span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-600 text-xl font-bold mr-3">✓</span>
                                <span className="text-gray-800 text-lg">
                                    <strong>Buat Soal atau Pilih Tes:</strong> Pilih untuk membuat soal baru di kategori yang tersedia atau ikuti tes yang sudah ada.
                                </span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-600 text-xl font-bold mr-3">✓</span>
                                <span className="text-gray-800 text-lg">
                                    <strong>Kolaborasi dan Evaluasi:</strong> Kamu dapat mencoba soal dari berbagai author, dan memberikan review!
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Tentang Kami Section */}
            <div id="tentang-kami" className="bg-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-10">Keuntungan Bergabung dengan Komunitas Kami</h1>

                    {/* Baris 1 */}
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
                        {/* Teks di kiri */}
                        <div className="lg:w-1/2 text-left">
                            <h2 className="text-xl font-semibold text-gray-800">Tes Dibuat oleh Author</h2>
                            <p className="text-gray-600 mt-2">Semua tes dibuat oleh author, memastikan soal yang relevan dan beragam.</p>
                        </div>
                        {/* Kotak gambar di kanan */}
                        <div className="lg:w-1/2 lg:ml-10 bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg">
                            <img src="/path-to-your-image1.png" alt="Tes Dibuat oleh Author" className="w-full h-48 object-cover" />
                        </div>
                    </div>

                    {/* Baris 2 */}
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
                        {/* Kotak gambar di kiri */}
                        <div className="lg:w-1/2 lg:mr-10 bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg">
                            <img src="/path-to-your-image2.png" alt="Membuat Soal" className="w-full h-48 object-cover" />
                        </div>
                        {/* Teks di kanan */}
                        <div className="lg:w-1/2 text-left">
                            <h2 className="text-xl font-semibold text-gray-800">Membuat Soal</h2>
                            <p className="text-gray-600 mt-2">Buat soal untuk membantu komunitas atau tingkatkan kemampuanmu dengan soal dari author berkualitas.</p>
                        </div>
                    </div>

                    {/* Baris 3 */}
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
                        {/* Teks di kiri */}
                        <div className="lg:w-1/2 text-left">
                            <h2 className="text-xl font-semibold text-gray-800">Penilaian Otomatis</h2>
                            <p className="text-gray-600 mt-2">Dapatkan skor secara otomatis dan pelajari pembahasan soal yang dibuat oleh author.</p>
                        </div>
                        {/* Kotak gambar di kanan */}
                        <div className="lg:w-1/2 lg:ml-10 bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg">
                            <img src="/path-to-your-image3.png" alt="Penilaian Otomatis" className="w-full h-48 object-cover" />
                        </div>
                    </div>

                    {/* Baris 4 */}
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
                        {/* Kotak gambar di kiri */}
                        <div className="lg:w-1/2 lg:mr-10 bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg">
                            <img src="/path-to-your-image4.png" alt="Akses Fleksibilitas" className="w-full h-48 object-cover" />
                        </div>
                        {/* Teks di kanan */}
                        <div className="lg:w-1/2 text-left">
                            <h2 className="text-xl font-semibold text-gray-800">Akses Fleksibilitas</h2>
                            <p className="text-gray-600 mt-2">Akses soal kapan saja dan di mana saja, melalui perangkat apa pun.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimoni Section */}
            <TestimonialsSection />
            {/* Footer */}
            <footer className="bg-gray-800 py-6 text-center text-white">
                <p>&copy; 2024 Etam Code. All Rights Reserved.</p>
            </footer>

        </div>


    );
};

export default LandingPage;
