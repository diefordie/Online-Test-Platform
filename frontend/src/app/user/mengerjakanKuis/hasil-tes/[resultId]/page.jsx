'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function Pemrograman() {
  const { resultId } = useParams();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    score: 0, // score sebagai angka
    userName: '',
    testTitle: '',
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const scores = [
    { rank: 1, date: '04 - 09 - 2025', name: 'Abelia Putri Dwi 🏅', correct: 146, wrong: 4, total: '932,4' },
    { rank: 2, date: '08 - 09 - 2025', name: 'Wahyu Fadilla S. 🏅', correct: 145, wrong: 5, total: '922,4' },
    { rank: 3, date: '15 - 09 - 2025', name: 'Ardhi Iwantara S', correct: 145, wrong: 5, total: '922,4' },
  ];


  useEffect(() => {
    const fetchTestData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await fetch(`http://localhost:2000/api/tests/test-result/${resultId}`); 
        const data = await response.json();

        setUserData({
          score: data.score,
          userName: data.userName,
          testTitle: data.testTitle,
          correctAnswers: data.correctAnswers,
          wrongAnswers: data.wrongAnswers,
        });
      } catch (error) {
        console.error('Error fetching test result:', error);
      }
    };

    fetchTestData();
  }, [resultId]);

  // Fungsi untuk menghitung lebar progress bar
  const getProgressWidth = () => {
    const maxScore = 100; // Anggap score maksimal adalah 1000
    const percentage = (userData.score / maxScore) * 100;
    return `${Math.min(percentage , 100)}%`; // Batasan maksimal lebar 100%
  };

  return (
    <>
      <header className="bg-deepBlue text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h5 className="text-3xl font-bold">Hasil Tes</h5>
          <nav className="hidden lg:flex">
            <ol className="list-reset flex space-x-2 text-white">
              <li>
                <Link href="/user/dashboard" className="hover:text-orange font-bodoni font-bold">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/pemrograman" className="hover:text-orange font-bodoni font-bold">
                  Hasil Tes
                </Link>
              </li>
            </ol>
          </nav>
          <img
            src="/images/profile.png"
            alt="profile"
            className="h-14 cursor-pointer"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          />
        </div>
      </header>

      <div className="text-center font-poppins font-bold text-deepBlue p-5">
        <h2 className="text-3xl font-bold">Halo {userData.userName || 'User'}!!</h2>
        <p className="text-lg"><span className="font-semibold">{userData.testTitle || 'Judul Tes'}</span></p>
      </div>

      <section className="bg-white p-5 rounded-lg shadow-lg">
        <main className="bg-abumuda p-5 rounded-lg shadow-lg mt-4">
          <div className="my-4 bg-deepBlue p-9 rounded-lg relative">
            <div className="w-full bg-white h-10 rounded-full overflow-hidden">
              <div
                className="bg-paleBlue h-full flex items-center justify-center text-deepBlue font-bold text-lg transition-all duration-300"
                style={{ width: getProgressWidth() }}
              >
                {userData.score || 'Loading...'}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 pt-0 items-center">
            <div className="bg-abumuda p-6 flex-1 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Performa</h3>
              <div className="flex items-center gap-4 mt-4">
                <div className="text-red-600 text-xl font-semibold bg-white p-2 rounded-lg">❌ {userData.wrongAnswers} Salah</div>
                <div className="text-green-600 text-xl font-semibold bg-white p-2 rounded-lg"> ✔ {userData.correctAnswers} Benar</div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-gray-600 text-lg bg-white p-2 rounded-lg">⏱ 42:26 Waktu</div>
                <div className="text-gray-600 text-lg bg-white p-2 rounded-lg">📊 114 Peringkat</div>
                <div className="text-blue-600 text-xl font-semibold bg-white p-2 rounded-lg">{userData.score || 'Nilai'}</div>
              </div>
            </div>

            <div className="bg-white p-2 flex-1 rounded-lg shadow-md">
              <h2 className="text-center text-2xl text-[#0B61AA] font-bold mb-6">Top Score</h2>
              <div className="overflow-auto">
                <table className="w-full text-left table-auto border-collapse">
                  <thead className="bg-[#0B61AA] text-white">
                    <tr>
                      <th className="px-4 py-2">Rangking</th>
                      <th className="px-4 py-2">Tanggal</th>
                      <th className="px-4 py-2">Nama</th>
                      <th className="px-4 py-2">Benar</th>
                      <th className="px-4 py-2">Salah</th>
                      <th className="px-4 py-2">Nilai Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                        <td className="border px-4 py-2 text-center text-sm">{score.rank}</td>
                        <td className="border px-4 py-2 text-center text-sm">{score.date}</td>
                        <td className="border px-4 py-2 text-sm">{score.name}</td>
                        <td className="border px-4 py-2 text-center text-sm">{score.correct}</td>
                        <td className="border px-4 py-2 text-center text-sm">{score.wrong}</td>
                        <td className="border px-4 py-2 text-center text-sm">{score.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <Link href="/tes" className="bg-red-300 text-white text-lg px-6 py-2 rounded-full inline-block hover:bg-red-400">
              Unduh Pembahasan Soal
            </Link>
            <Link href="/topScore" className="bg-blue-300 text-white text-lg px-6 py-2 rounded-full inline-block hover:bg-blue-400">
              Lihat Top Score
            </Link>
          </div>
        </main>
      </section>
    </>
  );
}