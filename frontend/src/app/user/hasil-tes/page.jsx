'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Pemrograman() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    score: '',
    userName: '',
    testTitle: '',
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
        const response = await fetch(`http://localhost:2000/answer/tests/${testId}/submit`); // Replace `123` with the actual user ID
        const data = await response.json();
        
        setUserData({
          score: data.score,
          userName: data.userName,
          testTitle: data.testTitle,
        });
      } catch (error) {
        console.error('Error fetching test result:', error);
      }
    };

    fetchTestData();
  }, []);

  return (
    <>
      <header className="bg-deepBlue text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="container mx-auto">
            <h5 className="text-s lg:text-3xl font-bold font-bodoni">Hasil Tes</h5>
            <nav className="mt-2 hidden lg:flex">
              <ol className="list-reset flex space-x-2">
                <li>
                  <Link href="/userDashboard" legacyBehavior>
                    <a className="hover:text-orange font-bodoni font-bold">Home</a>
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/pemrograman" legacyBehavior>
                    <a className="hover:text-orange font-bodoni font-bold">Hasil Tes</a>
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex space-x-5">
            <Link href="/">
              <img src="/images/etamtest.png" alt="EtamTest" className="h-12 lg:h-10 object-contain" />
            </Link>
          </div>
          <div className="relative inline-block">
            <img 
              src="/images/profile.png" 
              alt="profile" 
              className="h-14 cursor-pointer mr-7 p-0 hidden lg:block"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            />

            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-1 w-37 bg-white rounded-lg shadow-lg z-10 p-1
                          before:content-[''] before:absolute before:-top-4 before:right-8 before:border-8 
                          before:border-transparent before:border-b-white"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link legacyBehavior href="/profile-edit">
                  <a className="block px-4 py-1 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md">
                    Ubah Profil
                  </a>
                </Link>
                <Link legacyBehavior href="/logout">
                  <a className="block px-4 py-1 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md">
                    Logout
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="text-center font-poppins font-bold text-deepBlue p-5"> 
        <h2 className="text-2xl font-bold">Halo {userData.userName || 'User'}!!</h2>
        <p>Hasil TRY OUT UTBK 2025 #1</p>
        <p><span className="font-semibold">{userData.testTitle || 'Judul Tes'}</span></p>
      </div>

      <section className="bg-white p-5 text-bold">
        <div>
          <main className="bg-abumuda p-5 rounded-lg shadow-lg mt-4">
            <div className="my-4 bg-deepBlue p-9 rounded-lg">
              <div className="w-full bg-white h-8 rounded-full overflow-hidden">
                <div className="bg-paleBlue h-8 w-[75%] flex items-center justify-center text-deepBlue font-bold">
                  {userData.score || 'Loading...'}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8 pt-0 items-center">
              <div className="bg-abumuda p-6 flex-1">
                <h3 className="text-xl font-semibold">Performa</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-red-500 text-lg font-semibold bg-white p-2">120 Salah</div>
                  <div className="text-green-500 text-lg font-semibold bg-white p-2">25 Benar</div>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <div className="text-gray-500 bg-white p-2">⏱ 42:26 Waktu</div>
                  <div className="text-gray-500 bg-white p-2">📊 114 Peringkat</div>
                  <div className="text-blue-700 text-lg font-semibold bg-white p-2">{userData.score || 'Nilai'}</div>
                </div>
              </div>

              <div className="bg-white p-2 flex-1 rounded-lg shadow-md">
                <h2 className="text-center text-2xl text-[#0B61AA] font-bold mb-6">Top Score</h2>
                <div className="overflow-auto">
                  <table className="w-full text-left table-auto border-collapse">
                    <thead className="bg-[#0B61AA] text-white">
                      <tr>
                        <th className="px-2 py-1">Rangking</th>
                        <th className="px-2 py-1">Tanggal</th>
                        <th className="px-2 py-1">Nama</th>
                        <th className="px-2 py-1">Benar</th>
                        <th className="px-2 py-1">Salah</th>
                        <th className="px-2 py-1">Nilai Total</th>
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

            <div className="flex space-x-3 group-hover:opacity-100 transition-opacity duration-300 z-30 p-2">
              <a href="/tes" className="bg-[#FCB7B7] text-deepBlue text-bold px-7 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">
                Uduk Pembahasan Soal
              </a>
              <a href="/topScore" className="bg-paleBlue text-deepBlue text-bold px-4 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">
                Lihat Top Score
              </a>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
