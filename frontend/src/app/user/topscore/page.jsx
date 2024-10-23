'use client';
import Link from 'next/link';
import { useState } from 'react';

const TopScore = () => {
    // Sample data for the table
    const scores = [
        { rank: 1, date: '04 - 09 - 2025', name: 'Abelia Putri Dwi 🏅', correct: 146, wrong: 4, total: '932,4' },
        { rank: 2, date: '08 - 09 - 2025', name: 'Wahyu Fadilla S. 🏅', correct: 145, wrong: 5, total: '922,4' },
        { rank: 3, date: '15 - 09 - 2025', name: 'Ardhi Iwantara S', correct: 145, wrong: 5, total: '922,4' },
        { rank: 4, date: '24 - 09 - 2025', name: 'Brandon Salim', correct: 145, wrong: 5, total: '922,4' },
        { rank: 5, date: '17 - 09 - 2025', name: 'Ayu Ting Ting', correct: 145, wrong: 5, total: '922,4' },
        { rank: 6, date: '17 - 09 - 2025', name: 'Ji Chang Wook', correct: 145, wrong: 5, total: '922,4' },
        { rank: 7, date: '27 - 09 - 2025', name: 'Bernadya', correct: 145, wrong: 5, total: '922,4' },
        { rank: 8, date: '14 - 09 - 2025', name: 'Juicy Lucy', correct: 145, wrong: 5, total: '922,4' },
        { rank: 9, date: '05 - 09 - 2025', name: 'Ngantuk Ahmad', correct: 145, wrong: 5, total: '922,4' },
        { rank: 10, date: '17 - 09 - 2025', name: 'Aulia Sahda', correct: 145, wrong: 5, total: '922,4' },
    ];

    return (
        <div className="min-h-screen bg-[#FFFFFF] font-sans">
            {/* Header */}
            <header className="bg-[#0B61AA] text-white p-4" style={{ maxWidth: '1440px', height: '110px' }}>
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold mt-4">Top Score</h1>
                        <p className="text-sm text-white mt-2">Home / Try Out UTBK / Top Score</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <img src="/img/Vector.png" alt="Etamtest" className="h-6" style={{ maxWidth: '216px', height: '52px' }} />
                        <img src="/img/Profil.png" alt="profil" className="h-6" style={{ maxWidth: '50px', height: '50px' }} />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto mt-6">
                {/* Top Score Section */}
                <div className="flex items-center justify-center" style={{ maxWidth: '1018px', height: '160px', margin: '0 auto' }}>
                    <div className="bg-[#F3F3F3] p-6 rounded-[30px] shadow-md w-full flex flex-col items-center justify-center">
                        <div className="text-center">
                            <p className="text-2xl text-[#0B61AA] font-bold mb-2">Top Score</p>
                            <p className="text-2xl text-[#0B61AA] font-bold">TRY OUT UTBK 2025 #3</p>
                        </div>
                    </div>
                </div>

                {/* Scores Table Section */}
                <div className="mt-6">
                    <div className="max-w-full p-6 rounded-lg shadow-md bg-[#F3F3F3]">
                        <table className="min-w-full text-left table-auto border-collapse" style={{ maxWidth: '1088px' }}>
                            <thead className="bg-[#CAE6F9] text-black">
                                <tr>
                                    <th className="px-4 py-2 text-center">Rangking</th>
                                    <th className="px-4 py-2 text-center">Tanggal</th>
                                    <th className="px-4 py-2 text-center">Nama</th>
                                    <th className="px-4 py-2 text-center">Benar</th>
                                    <th className="px-4 py-2 text-center">Salah</th>
                                    <th className="px-4 py-2 text-center">Nilai Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map((score, index) => (
                                    <tr key={index} className={`border ${index === 0 ? 'rounded-t-[30px]' : ''} ${index === scores.length - 1 ? 'rounded-b-[30px]' : ''}`}>
                                        <td className={`border px-4 py-2 text-center ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'} rounded-tl-[30px] ${index === 0 ? 'rounded-tl-[30px]' : ''} ${index === scores.length - 1 ? 'rounded-bl-[30px]' : ''}`}>
                                            {score.rank}
                                        </td>
                                        <td className={`border px-4 py-2 text-center ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'}`}>
                                            {score.date}
                                        </td>
                                        <td className={`border px-4 py-2 text-center ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'}`}>
                                            {score.name}
                                        </td>
                                        <td className={`border px-4 py-2 text-center ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'}`}>
                                            {score.correct}
                                        </td>
                                        <td className={`border px-4 py-2 text-center ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'}`}>
                                            {score.wrong}
                                        </td>
                                        <td className={`border px-4 py-2 text-center rounded-tr-[30px] rounded-br-[30px] ${index % 2 === 0 ? 'bg-[#C5CBCA]-100' : 'bg-white'} ${index === 0 ? 'rounded-tr-[30px]' : ''} ${index === scores.length - 1 ? 'rounded-br-[30px]' : ''}`}>
                                            {score.total}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TopScore;
