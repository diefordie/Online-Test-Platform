'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Pemrograman() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const {resultId} = useParams();
  const [workTime, setWorkTime] = useState(0);
  const [userData, setUserData] = useState({
    
    score: 0, // score sebagai angka
    userName: '',
    testTitle: '',
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    if (!resultId) return;  // Pastikan resultId tersedia sebelum melakukan apa pun

    // Ambil workTime dari localStorage berdasarkan resultId
    const savedWorkTime = localStorage.getItem(`workTime_${resultId}`);
    if (savedWorkTime) {
      setWorkTime(parseInt(savedWorkTime)); // Konversi ke angka dan simpan di state
    }
  }, [resultId]); // Efek ini dijalankan ulang setiap kali resultId berubah


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Menghitung menit
    const remainingSeconds = seconds % 60;    // Menghitung detik sisa
    return `${minutes} menit ${remainingSeconds} detik`;
  };


  const user = [
    {
      nama: "Ardhi",
      judul: "TRY OUT UTBK 2025#1",
      date: "15 - November - 2024",
      correct: "25",
      wrong: "120",
      time: "42:26",
      total: 900,
      maxTotal: 1000,
      rank: 114,
    }
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

  const getProgressWidth = () => {
    const maxScore = 100; // Anggap score maksimal adalah 100
    const percentage = (userData.score / maxScore) * 100;
    return `${Math.min(percentage , 100)}% `; // Batasan maksimal lebar 100%
  };

  const scores = [
    { rank: 1, date: '04 - 09 - 2025', name: 'Abelia Putri Dwi 🏅', correct: 146, wrong: 4, total: '932,4' },
    { rank: 2, date: '08 - 09 - 2025', name: 'Wahyu Fadilla S. 🏅', correct: 145, wrong: 5, total: '922,4' },
    { rank: 3, date: '15 - 09 - 2025', name: 'Ardhi Iwantara S', correct: 145, wrong: 5, total: '922,4' },
    { rank: 4, date: '15 - 09 - 2025', name: 'Ardhi Iwantara S', correct: 145, wrong: 5, total: '922,4' },
    { rank: 5, date: '15 - 09 - 2025', name: 'Ardhi Iwantara S', correct: 145, wrong: 5, total: '922,4' },
  ];

  const closeModal = () => setModalOpen(false);

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    // Kirim feedback ke server atau simpan di local state
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    closeModal(); // Tutup modal setelah mengirim feedback
    // Reset rating dan feedback setelah pengiriman
    setRating(0);
    setFeedback("");
  };

  const Modal = () => (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
      onClick={closeModal} // Tambahkan event handler untuk menutup modal
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()} // Mencegah penutupan modal saat klik di dalam modal
      >
        <h2 className="text-lg font-semibold mb-4 text-center">Seberapa Puas Anda dengan Layanan Kami?</h2>
  
        {/* Star Rating */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleRatingClick(star)}
              xmlns="http://www.w3.org/2000/svg"
              fill={rating >= star ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-8 h-8 cursor-pointer ${rating >= star ? "text-yellow-400" : "text-gray-400"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          ))}
        </div>
  
        {/* Feedback Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Apa yang Bisa Kami Tingkatkan?
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          rows="3"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Masukkan masukan Anda di sini"
        ></textarea>
  
        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={feedback === ""}
        >
          Kirim
        </button>
      </div>
    </div>
  );
  

  return (
    <>
      <header className="relative flex w-full bg-deepBlue text-white p-3 items-center z-50">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center p-2 lg:ml-9">
            <Link href="/">
              <img 
                src="/images/etamtest.png" 
                alt="EtamTest" 
                className="lg:h-14 h-8 mr-3 object-contain" 
              />
            </Link> 
          </div>

          <div className="relative flex inline-block items-center">
            <div className="mx-auto">
              <h5 className="text-xl lg:text-3xl font-bold font-bodoni lg:mr-8">Hasil Tes</h5>
              <nav className="mt-0 lg:mt-1">
                <ol className="list-reset flex space-x-2">
                  <li>
                    <Link href="/user/dasboard" legacyBehavior>
                      <a className="text-[0.6rem] lg:text-sm hover:text-orange font-poppins font-bold">Home</a>
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/CPNS" legacyBehavior>
                      <a className="text-[0.6rem] lg:text-sm hover:text-orange font-poppins font-bold">Hasil Tes</a>
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
            <div className='hidden lg:block'>
              <img 
                src="/images/profile.png" 
                alt="profile" 
                className="h-14 cursor-pointer mr-3"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              />
              {/* Dropdown */}
              {isDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-35 bg-white rounded-lg shadow-lg z-10 p-1
                              before:content-[''] before:absolute before:-top-4 before:right-8 before:border-8 
                              before:border-transparent before:border-b-white"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link legacyBehavior href="/profile-edit">
                    <a className="block px-4 py-1 text-deepBlue text-sm  hover:bg-deepBlue hover:text-white rounded-md border-abumuda">
                      Ubah Profil
                    </a>
                  </Link>
                  <Link legacyBehavior href="/logout">
                    <a className="block px-4 py-1 text-deepBlue text-sm  hover:bg-deepBlue hover:text-white rounded-md">
                      Logout
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Tampilkan modal jika state isModalOpen true */}
      {isModalOpen && <Modal />}

      {/* judul hasil tes */}
      {user.map((user, index) => (
        <div className='text-center font-poppins font-bold text-deepBlue p-5'> 
          <h2 className="text-2xl font-bold ">Halo {userData.userName}!!</h2>
            <p>
              Hasil {userData.testTitle}
            </p>
            <p>
            <span className="font-semibold">{user.date}</span>
            </p>
        </div>
      ))}
    
      <section className='bg-white p-8 text-bold'>
        <div>
          {/* Main Content */}
          <main className="bg-abumuda p-1 pt-0 rounded-lg shadow-lg mt-0">

            {/* Score Progress Bar */}
            <div className='mb-4 bg-deepBlue p-5 lg:p-8 rounded-lg'>
              {user.map((user,index)=> (
                <div className="w-full bg-white h-8 rounded-full overflow-hidden ">
                  <div
                    className="bg-paleBlue h-8 flex relative items-center justify-center text-deepBlue font-bold text-lg transition-all duration-300"
                    style={{ width: getProgressWidth() }} // width sesuai dengan persentase
                  > 
                    <div className='absolute right-0 bg-white text-deepBlue p-2 border border-grey shadow '>
                    {userData.score} {/* Menampilkan nilai total */}
                    </div>
                  </div>
                </div>
                
              ))}
            </div>

            {/* Flex container for Performance and Top Score */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 pt-0 text-center">
              {/* Performance Section */}
              {user.map((user, index) => (
                <div className="bg-abumuda p-6 flex-1 flex flex-col items-center pr-5 pb-8">
                  <h3 className="text-4xl font-semibold text-deepBlue">Performa</h3>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex text-sm lg:text-2xl items-center text-black block font-semibold bg-white p-2 pr-8 rounded-lg">
                      <ul>
                        <li><i className=" fa-solid fa-xmark text-red-500"></i> {userData.wrongAnswers} </li>
                        <li>Salah</li>
                      </ul>
                    </div>
                    <div className="text-black text-sm lg:text-2xl font-semibold bg-white p-2 pr-8 rounded-lg ">
                      <ul>
                        <li><i className=" fa-solid fa-check text-green"></i> {userData.correctAnswers} </li>
                        <li>Benar</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-black mt-2 flex items-center gap-4">
                    <div className="text-sm lg:text-2xl bg-white p-2 font-semibold rounded-lg">
                      <ul>
                        <li><i className="fa-solid fa-clock text-grey "></i> {formatTime(workTime)} </li>
                        <li> Waktu</li>
                      </ul>
                    </div>
                    <div className="text-sm lg:text-2xl bg-white p-2 font-semibold rounded-lg">
                      <ul>
                        <li>{user.rank} </li>
                        <li>Peringkat</li>
                      </ul>
                    </div>
                    <div className="text-sm lg:text-2xl font-semibold bg-white px-5 p-2 rounded-lg">
                      <ul>
                        <li>{userData.score} </li>
                        <li>Nilai</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex space-x-3 group-hover:opacity-100 transition-opacity duration-300 z-30 pt-4">
                  <a href="/tes" className="bg-white border border-deepBlue text-[0.5rem] lg:text-lg text-deepBlue text-bold px-2  lg:px-2 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">
                    Unduh Pembahasan Soal
                  </a>
                  <a href="/topScore" className="bg-paleBlue border border-deepBlue text-[0.5rem] lg:text-lg text-deepBlue text-bold px-6  lg:px-7 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">
                    Lihat Top Score
                  </a>
                </div>
                </div>
                
              ))}

              {/* Top Score Section */}
              <div className="bg-white hidden lg:block p-2 flex-1 rounded-lg shadow-md">
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
                      {scores.slice(0, 3).map((score, index) => (
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
            
          </main>
            
        </div>
      </section>
    </>
  );
}
