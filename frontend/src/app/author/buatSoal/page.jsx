'use client';

import { useState } from "react";
import Link from 'next/link';
import MembuatSoal from '../buatSoal/page1';

const KotakNomor = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showMembuatSoal, setShowMembuatSoal] = useState(false);

  const number = Array.from({ length: questions.length + 1 }, (_, i) => i + 1);
  
  const handleClick = (number) => {
    setSelectedNumber(number);
    setShowMembuatSoal(true);
  };
  
  const [pages, setPages] = useState([{ pageNumber: 1, question: [1] }]);

  const addQuestion = (pageIndex) => {
    const newPages = [...pages];
    const newNumber = newPages[pageIndex].question.length + 1;
    newPages[pageIndex].question.push(newNumber);
    setPages(newPages);
  };

  const addPage = () => {
    const newPageNumber = pages.length + 1;
    const newPage = { pageNumber: newPageNumber, question: [1] };
    setPages([...pages, newPage]);
  };

  return (
    <div className="w-full p-4">
      {/* Header bagian atas dengan dua navigasi */}
      <header className="bg-[#0B61AA] text-white p-4 sm:p-6 font-poppins" style={{ maxWidth: '1443px', height: '108px' }}>
        <div className="container mx-auto flex justify-start items-center p-4">
          <Link href="/">
            <img src="/img/menu.png" alt="Menu" className="h-7" style={{ maxWidth: '69px', height: '70px' }} />
          </Link>
          <Link href="/">
            <img src="/img/Vector.png" alt="Vector" className="h-6 ml-4" style={{ maxWidth: '279px', height: '50px' }} />
          </Link>
        </div>
      </header>

      {/* Header Baru dengan Tombol */}
      <header className="bg-white text-black-500 p-1 sm:p-2" style={{ maxWidth: '1440px', height: '71px' }}>
        <div className="container mx-auto flex justify-start items-center p-4">
          <nav className="flex w-full justify-start space-x-4">
            <Link href="/Buat Soal" legacyBehavior>
              <a className="w-[120px] h-[40px] text-center font-bold font-poppins mb-0.5 
                hover:bg-[#CAE6F9] hover:text-black bg-white text-black rounded-full border border-white 
                shadow-lg transition-all duration-300 flex items-center justify-center">
                Buat Soal
              </a>
            </Link>
            <Link href="/Publikasi" legacyBehavior>
              <a className="w-[120px] h-[40px] text-center font-bold font-poppins mb-0
                hover:bg-[#CAE6F9] hover:text-black bg-white text-black rounded-full border border-white 
                shadow-lg transition-all duration-300 flex items-center justify-center">
                Publikasi
              </a>
            </Link>
          </nav>
        </div>
      </header>

      {/* Bagian Page */}
      {showMembuatSoal ? (
        <MembuatSoal nomor={selectedNumber} />
      ) : (
        pages.map((page, pageIndex) => (
        <div key={page.pageNumber} className="my-4">
          <div className="flex justify-between items-center bg-[#0B61AA] text-white p-2" style={{ maxWidth: '1376px', height: '61px' }}>
            <h2 className="text-lg">Tes Potensi Skolastik {page.pageNumber}</h2>
          </div>

          <div className="mt-4"></div>

          {/* Soal bertambah ke samping dengan layout yang lebih efisien */}
          <div>
            <div className="flex flex-row flex-wrap p-4 gap-3 justify-start border" style={{ maxWidth: '100%', padding: '0 2%' }}>
              {page.question.map((number) => (
                <button
                  key={number}
                  onClick={() => handleClick(number)} // Panggil goToMembuatSoal saat kotak soal diklik
                  className="flex flex-col items-center border border-gray-300 p-2 bg-white rounded-lg shadow-md"
                  style={{ width: '80px', height: '80px' }} // Ukuran kotak tetap kecil
                >
                  <span className="bg-white border rounded-full w-8 h-8 flex items-center justify-center mb-2 rounded-[15px]">
                    {number}
                  </span>
                </button>
              ))}
            </div>
            {selectedNumber && <MembuatSoal nomor={selectedNumber}/>}
          </div>

            {/* Button tambah soal di kotak paling akhir */}
            <div>
            <div className="flex items-center">
              <button
                onClick={() => addQuestion(pageIndex)}
                className="bg-[#A6D0F7] text-black px-4 py-2 rounded-[15px] shadow-lg"
              >
                + Soal
              </button>
            </div>
          </div>
        </div>
      )))}

      {/* Button Tambah Page dan Simpan */}
      <div className="flex justify-between mt-4">
        <button
          onClick={addPage}
          className="bg-[#0B61AA] border border-black flex items-center space-x-2 px-4 py-2 hover:text-white font-poppins rounded-[15px] shadow-lg"
        >
          + Tambah Page
        </button>
        <div className="flex justify-end space-x-2 mr-4">
          <Link href="/simpan" legacyBehavior>
            <a className="bg-[#E8F4FF] border border-black flex items-center space-x-2 px-4 py-2 hover:text-black font-poppins rounded-[15px] shadow-lg">
              Simpan
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KotakNomor;