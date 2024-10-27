'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const BuatTes = () => {
  const router = useRouter();
  const [jenisTes, setJenisTes] = useState('');
  const [kategoriTes, setKategoriTes] = useState('');
  const [namaTes, setNamaTes] = useState(''); 
  const [deskripsi, setDeskripsi] = useState('');

  const [showJenisDropdown, setShowJenisDropdown] = useState(false);
  const [showKategoriDropdown, setShowKategoriDropdown] = useState(false);

  const [activeTab, setActiveTab] = useState('buatTes');

  const jenisDropdownRef = useRef(null);
  const kategoriDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (jenisDropdownRef.current && !jenisDropdownRef.current.contains(event.target)) {
        setShowJenisDropdown(false);
      }
      if (kategoriDropdownRef.current && !kategoriDropdownRef.current.contains(event.target)) {
        setShowKategoriDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newTest = {
      authorId: 'cm2g50m8r00014ke0ayiwbxue',
      type: jenisTes,
      category: kategoriTes,
      title: namaTes,
      testDescription: deskripsi
    };
  
    try {
      const response = await fetch('http://localhost:2000/test/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTest)
      });
  
      if (response.ok) {
        console.log('Tes berhasil disimpan!');
        const result = await response.json();
        const testId = result.id;  // Menggunakan 'id' dari respons
        if (testId) {
          router.push(`/author/buatSoal?testId=${testId}`);
        } else {
          console.error('Test ID tidak ditemukan dalam respons:', result);
        }
      } else {
        console.error('Gagal menyimpan tes.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  return (
    <>
    {/* Header dengan Warna Biru Kustom */}
    <header className="bg-[#0B61AA] text-white p-4 sm:p-6">
        <div className="container flex justify-between items-start">
          <div className="flex space-x-4 w-full">
            <Link href="/">
              <img src="/images/Vector.png" alt="Vector" className="h-6 sm:h-9 w-[85px] h-[26px] sm:w-[279px] sm:h-[55px]"/>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigasi */}
      <nav className="bg-[#FFFF] text-black p-4 sm:p-6">
        <ul className="flex space-x-6 sm:space-x-20 ml-6">
          <li>
            <button
              className={`w-[120px] sm:w-[220px] h-[48px] rounded-[20px] shadow-md font-bold font-poppins ${activeTab === 'buatTes' ? 'bg-[#78AED6]' : ''}`}
              onClick={() => setActiveTab('buatTes')}
              >
              Buat Soal
            </button>
          </li>
          <li>
            <button
              className={`w-[120px] sm:w-[220px] h-[48px] rounded-[20px] shadow-md font-bold font-poppins ${activeTab === 'publikasi' ? 'bg-[#78AED6]' : ''}`}
              onClick={() => setActiveTab('publikasi')}
              >
              Publikasi
            </button>
          </li>
        </ul>
      </nav>
      <div className='bg-white p-4'>
      {/* Konten Utama */}
      <div className="flex justify-center items-start mt-4">
        {activeTab === 'buatTes' && (
          <div className="bg-[#78AED6] p-8 mx-4 rounded-md w-[375px] h-[506px] sm:w-[1343px] sm:h-[880px]">
            <div className="flex justify-between  pr-9">
              {/* Bagian Kiri, Teks Rata Kanan */}
              <div className="text-right ml-auto pr-5 ">
                <h3 className="font-poppins text-black text-sm sm:text-lg mb-6 mt-7 sm:pt-4 ">Jenis</h3>
                <h3 className="font-poppins text-black text-sm sm:text-lg mb-4 mt-7 sm:pt-12">Kategori</h3>
                <h3 className="font-poppins text-black text-sm sm:text-lg mb-4 mt-7 sm:pt-12">Nama</h3>
                <h3 className="font-poppins text-black text-sm sm:text-lg mb-4 mt-7 sm:pt-12">Deskripsi</h3>
              </div>

              {/* Bar putih di samping */}
              <div className="bg-white p-6 rounded-md w-[224px] h-[373px] sm:w-[902px] sm:h-[677px] shadow-lg">
                {/* Dropdown Jenis Tes */}
                <div className="mb-4 sm:pt-4">
                  <div className="relative" ref={jenisDropdownRef}>
                    <button
                      className="w-[135px] h-[26px] sm:w-[160px] sm:h-[32px] border border-gray-300 p-2 rounded-full flex justify-between items-center bg-white"
                      onClick={() => setShowJenisDropdown(!showJenisDropdown)}
                    >
                      <span className="font-poppins text-sm sm:text-lg text-gray-500 italic">{jenisTes || 'Jenis Tes'}</span>
                      <svg
                        className="w-4 h-4 ml-2 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {showJenisDropdown && (
                    <div className="absolute z-10 w-[115px] h-[87px] sm:w-[194px] sm:h-[185px] mt-1 border border-gray-300 bg-white rounded-md shadow-lg">
                      <ul className="absolute z-10 w-[115px] h-[87px] sm:w-[194px] sm:h-[185px] mt-1 border border-gray-300 bg-white rounded-md shadow-lg">
                        <li>
                        <button
                            className="font-poppins  text-left px-4 py-2 text-sm sm:text-lg text-gray-700 italic hover:bg-gray-100"
                            onClick={() => { setJenisTes('Pilihan Ganda'); setShowJenisDropdown(false); }}
                          >
                            Pilihan Ganda
                          </button>
                        </li>
                        <li>
                        <button
                            className="font-poppins w-full text-left px-4 py-2 text-sm sm:text-lg text-gray-700 italic hover:bg-gray-100"
                            onClick={() => { setJenisTes('Essay'); setShowJenisDropdown(false); }}
                          >
                            Essay
                          </button>
                        </li>
                        <li>
                          <button
                          className="font-poppins w-full text-left px-4 py-2 text-sm sm:text-lg text-gray-700 italic hover:bg-gray-100"
                          onClick={() => { setJenisTes('Psikotes'); setShowJenisDropdown(false); }}
                          >
                            Psikotes
                          </button>
                        </li>
                      </ul>
                    </div>
                    )}

                  </div>
                </div>

                {/* Dropdown Kategori Tes */}
                <div className="mb-4 sm:pt-14">
                  <div className="relative" ref={kategoriDropdownRef}>
                    <button
                      className="w-[135px] h-[26px] sm:w-[194px] sm:h-[32px] border border-gray-300 p-2 rounded-full flex justify-between items-center bg-white"
                      onClick={() => setShowKategoriDropdown(!showKategoriDropdown)}
                    >
                      <span className="font-poppins text-sm sm:text-lg text-gray-500 italic">{kategoriTes || 'Kategori Tes'}</span>
                      <svg
                        className="w-4 h-4 ml-2 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {showKategoriDropdown && (
                    <div className="absolute z-10 w-[114px] h-[119px] sm:w-[223px] sm:h-[184px] mt-1 border border-gray-300 bg-white rounded-md shadow-lg">
                      <ul className="absolute z-10w-[114px] h-[119px] sm:w-[223px] sm:h-[184px] mt-1 border border-gray-300 bg-white rounded-md shadow-lg">
                        <li>
                          <button
                            className="font-poppins w-full text-left px-4 py-2 text-sm sm:text-lg text-gray-700 italic hover:bg-gray-100"
                            onClick={() => { setKategoriTes('CPNS'); setShowKategoriDropdown(false); }}
                          >
                            CPNS
                          </button>
                        </li>
                        <li>
                          <button
                            className="font-poppins w-full text-left px-4 py-2 text-sm sm:text-lg text-gray-700 italic hover:bg-gray-100"
                            onClick={() => { setKategoriTes('UTBK'); setShowKategoriDropdown(false); }}
                          >
                            UTBK
                          </button>
                        </li>
                        <li>
                          <button
                            className="font-poppins w-full text-left px-4 py-2 text-sm sm:text-lg text-gray-700 italic hover:bg-gray-100"
                            onClick={() => { setKategoriTes('Psikotes'); setShowKategoriDropdown(false); }}
                          >
                            Psikotes
                          </button>
                        </li>
                        <li>
                          <button
                            className="font-poppins w-full text-left px-4 py-2 text-sm sm:text-lg text-gray-700 italic hover:bg-gray-100"
                            onClick={() => { setKategoriTes('Pemrograman'); setShowKategoriDropdown(false); }}
                          >
                            Pemrograman
                          </button>
                        </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Nama Tes */}
                <div className="mb-4 sm:pt-16">
                  <input
                    type="text"
                    className="w-[173px] h-[26px] sm:w-[615px] sm:[38px] border border-gray-300 p-2 rounded-full"
                    placeholder="Nama Tes"
                    value={namaTes} // Diubah di sini
                    onChange={(e) => setNamaTes(e.target.value)} 
                  />
                </div>

                {/* Input Deskripsi */}
                <div className="mb-4 sm:pt-6">
                  <textarea
                    className="w-[173px] h-[58px] sm:w-[615px] sm:h-[38px] border border-gray-300 p-2 rounded-full"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                  <p className="font-poppins text-black mt-2 text-sm sm:text-lg">Deskripsikan secara singkat menegenai tes soal yang dibuat</p>
                </div>

                {/* Tombol Simpan */}
                <div className="relative min-h-[170px] sm:min-h-[370px]">
                  <div className="absolute bottom-0 right-0 pb-10 mr-[-20px]">
                    <button
                      className="bg-white text-black w-[98px] h-[27px] sm:w-[223px] sm:h-[54px] font-poppins font-semibold text-[0.5rem] sm:text-lg border border-black px-6 py-2 rounded-md hover:bg-[#0B61AA] hover:text-white transition duration-300" 
                      onClick={handleSubmit}>
                      Selanjutnya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'publikasi' && (
          <div className="bg-[#465C6F] p-6 rounded-md">
            <h2 className="text-white text-xl">Halaman Publikasi</h2>
          </div>
        )}
      </div>
      </div>
      
    </>
  );
}

export default BuatTes;