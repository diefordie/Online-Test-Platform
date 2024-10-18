'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const TopScore = () => {
    // State untuk menyimpan data score
    const [scores, setScores] = useState([]);

    // useEffect untuk simulasi pengambilan data
    useEffect(() => {
        // Simulasi fetching data, bisa diubah sesuai kebutuhan (misalnya dari API)
        const fetchScores = async () => {
            const sampleScores = [
                { rank: 1, date: '04 - 09 - 2025', name: 'Abelia Putri Dwi 🏅', correct: 146, wrong: 4, total: '932,4' },
                { rank: 1, date: '08 - 09 - 2025', name: 'Wahyu Fadilla S. 🏅', correct: 145, wrong: 5, total: '922,4' },
                { rank: 2, date: '15 - 09 - 2025', name: 'Ardhi Iwantara S', correct: 145, wrong: 5, total: '922,4' },
                { rank: 2, date: '24 - 09 - 2025', name: 'Brandon Salim', correct: 145, wrong: 5, total: '922,4' },
                { rank: 3, date: '04 - 08 - 2025', name: 'Ayu Ting Ting', correct: 145, wrong: 5, total: '922,4' },
                { rank: 4, date: '17 - 09 - 2025', name: 'Ji Chang Wook', correct: 145, wrong: 5, total: '922,4' },
                { rank: 5, date: '27 - 07 - 2025', name: 'Bernadya', correct: 145, wrong: 5, total: '922,4' },
                { rank: 6, date: '14 - 09 - 2025', name: 'Juicy Lucy', correct: 145, wrong: 5, total: '922,4' },
                { rank: 7, date: '05 - 09 - 2025', name: 'Ngantuk Ahmad', correct: 145, wrong: 5, total: '922,4' },
                { rank: 8, date: '17 - 09 - 2025', name: 'Aulia Sahda', correct: 145, wrong: 5, total: '922,4' },
            ];
            // Simulasikan jeda waktu, misal loading dari server
            setTimeout(() => {
                setScores(sampleScores);
            }, 1000);
        };

        fetchScores();
    }, []); // Kosong berarti hanya berjalan sekali saat komponen pertama kali di-render

    return (
        <div className="min-h-screen bg-[#FFFFFF] font-sans">
            {/* Header */}
            <header className="w-full bg-[#0B61AA] text-white p-4" style={{ maxWidth: '1440px', height: '90px' }}>
                <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap">
                    <div>
                        <img 
                            src="/img/etamtest.png" 
                            alt="Etamtest" 
                            className="h-6 sm:h-auto sm:max-h-[52px] w-auto max-w-[216px] md:max-h-[52px] md:max-w-[216px]" 
                            style={{ height: '45px', width: '120px' }} 
                        />
                    </div>

                    {/* Title and breadcrumb */}
                    <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-center whitespace-nowrap font-poppins">
                            Top Score
                        </h1>

                        {/* Profil icon hanya muncul pada ukuran sm ke atas */}
                        <img src="/img/Profil.png" alt="Profil" className="h-10 w-10 hidden sm:block ml-2" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto mt-6 px-4 sm:px-0">
                {/* Top Score Section */}
                <div className="flex items-center justify-center" style={{ maxWidth: '1018px', height: '160px', margin: '0 auto' }}>
                    <div className="bg-[#F3F3F3] p-6 rounded-[30px] shadow-md w-full flex flex-col items-center justify-center">
                        <div className="text-center">
                            <p className="text-2xl text-[#0B61AA] font-bold mb-2 font-poppins">Top Score</p>
                            <p className="text-2xl text-[#0B61AA] font-bold font-poppins">TRY OUT UTBK 2025 #3</p>
                        </div>
                    </div>
                </div>

                {/* Kontainer untuk scrollbar */}
                <div className="overflow-x-auto" style={{ maxHeight: '350px' }}>

                    {/* Scores Table Section */}
                    <div className="mt-6">
                        <div className="max-w-full p-6 rounded-lg shadow-md bg-[#F3F3F3]">
                            <table className="min-w-full text-left table-auto border-collapse">
                                <thead className="bg-[#CAE6F9] text-black">
                                    <tr>
                                        <th className="px-2 py-2 text-center sticky top-0 bg-[#CAE6F9] font-poppins">Rangking</th>
                                        <th className="px-2 py-2 text-left text-center sticky top-0 bg-[#CAE6F9] font-poppins">Tanggal</th>
                                        <th className="px-2 py-2 text-left text-center sticky top-0 bg-[#CAE6F9] font-poppins">Nama</th>
                                        <th className="px-2 py-2 text-center sticky top-0 bg-[#CAE6F9] font-poppins">Benar</th>
                                        <th className="px-2 py-2 text-center sticky top-0 bg-[#CAE6F9] font-poppins">Salah</th>
                                        <th className="px-2 py-2 text-center sticky top-0 bg-[#CAE6F9] font-poppins">Nilai Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 font-poppins">Loading...</td>
                                        </tr>
                                    ) : (
                                        scores.map((score, index) => (
                                            <tr key={index} className={`border ${index === 0 ? 'rounded-t-[30px]' : ''} ${index === scores.length - 1 ? 'rounded-b-[30px]' : ''}`}>
                                                <td className={`border px-2 py-2 text-center ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'} rounded-tl-[30px] ${index === 0 ? 'rounded-tl-[30px]' : ''} ${index === scores.length - 1 ? 'rounded-bl-[30px]' : ''} font-poppins`}>
                                                    {score.rank}
                                                </td>
                                                <td className={`border px-2 py-2 text-left ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'} font-poppins`}>
                                                    {score.date}
                                                </td>
                                                <td className={`border px-2 py-2 text-left ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'} font-poppins`}>
                                                    {score.name}
                                                </td>
                                                <td className={`border px-2 py-2 text-center ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'} font-poppins`}>
                                                    {score.correct}
                                                </td>
                                                <td className={`border px-2 py-2 text-center ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'} font-poppins`}>
                                                    {score.wrong}
                                                </td>
                                                <td className={`border px-2 py-2 text-center rounded-tr-[30px] rounded-br-[30px] ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'} ${index === 0 ? 'rounded-tr-[30px]' : ''} ${index === scores.length - 1 ? 'rounded-br-[30px]' : ''} font-poppins`}>
                                                    {score.total}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TopScore;
