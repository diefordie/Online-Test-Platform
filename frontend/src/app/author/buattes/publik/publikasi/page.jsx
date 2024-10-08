'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function PublikasiPage() {
  const [namaTes, setNamaTes] = useState('');
  const [durasiTes, setDurasiTes] = useState('');
  const [acakPertanyaan, setAcakPertanyaan] = useState({
    waktu: false,
    acak: false,
  });
  const [maksimumPercobaan, setMaksimumPercobaan] = useState('');
  const [hargaTes, setHargaTes] = useState('');
  const [prediksiKemiripan, setPrediksiKemiripan] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCheckboxChange = (event) => {
    setAcakPertanyaan({ ...acakPertanyaan, [event.target.name]: event.target.checked });
  };

  const handlePublish = () => {
    if (namaTes && durasiTes && maksimumPercobaan && hargaTes && prediksiKemiripan) {
      // Logic to publish the test goes here
      setShowSuccessPopup(true);
    } else {
      setShowErrorPopup(true);
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };
  const [activeTab, setActiveTab] = useState('publikasi');
  return (
    <div className="max-w-full">
      {/* Header dengan Warna Biru Kustom */}
    <header className="bg-[#0B61AA] text-white p-4 sm:p-6">
        <div className="container flex justify-between items-center">
          <div className="flex space-x-4 w-full">
            <Link href="/">
              <img src="/images/menu.png" alt="Menu" className="h-7 sm:h-9 w-full-[50px]" />
            </Link>
            <Link href="/">
              <img src="/images/Vector.png" alt="Vector" className="h-6 sm:h-9" style={{ maxWidth: '279px' }} />
            </Link>
          </div>
        </div>
      </header>

      {/* Navigasi */}
      <nav className="bg-[#FFFF] text-black p-4 sm:p-6">
        <ul className="flex space-x-6 sm:space-x-20">
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

      <div className="bg-[#78AED6] p-8 rounded-md mx-auto" style={{ maxWidth: '1150px', height: '800px', marginTop: '20px' }}>
        <div className="flex flex-row  lg:flex-row  justify-between pr-9">
          {/* Bagian Kiri, Teks Rata Kanan */}
          <div className="text-right pr-5 mb-5 lg:mb-0">
            <h3 className="font-poppins text-black text-lg mb-4 mt-7">Nama Tes</h3>
            <h3 className="font-poppins text-black text-lg mb-4 mt-7">Durasi Tes</h3>
            <h3 className="font-poppins text-black text-lg mb-4 mt-7">Acak Pertanyaan</h3>
            <h3 className="font-poppins text-black text-lg mb-4 mt-7">Maksimum Percobaan Kuis</h3>
            <h3 className="font-poppins text-black text-lg mb-4 mt-7">Harga Tes</h3>
            <h3 className="font-poppins text-black text-lg mb-4 mt-7">Prediksi Kemiripan</h3>
          </div>

          {/* Bar putih di samping */}
          <div className="bg-white p-6 rounded-md shadow-lg flex-grow lg:flex-shrink-0" style={{ maxWidth: '902px', height: '654px' }}>
            {/* Input Nama Tes */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                value={namaTes}
                onChange={(e) => setNamaTes(e.target.value)}
                placeholder="Nama Tes"
              />
            </div>

            {/* Input Durasi Tes */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                value={durasiTes}
                onChange={(e) => setDurasiTes(e.target.value)}
                placeholder="hh:mm"
              />
            </div>

            {/* Checkbox Acak Pertanyaan */}
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="waktu"
                  name="waktu"
                  checked={acakPertanyaan.waktu}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="waktu" className="text-gray-700">Peserta akan memiliki waktu untuk menyelesaikan seluruh kuis.</label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="acak"
                  name="acak"
                  checked={acakPertanyaan.acak}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="acak" className="text-gray-700">Pertanyaan akan ditampilkan secara acak kepada setiap responden.</label>
              </div>
            </div>

            {/* Input Maksimum Percobaan Kuis */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                value={maksimumPercobaan}
                onChange={(e) => setMaksimumPercobaan(e.target.value)}
                placeholder="Maksimum Percobaan Kuis"
              />
            </div>

            {/* Dropdown Harga Tes */}
            <div className="mb-4">
              <select
                className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                value={hargaTes}
                onChange={(e) => setHargaTes(e.target.value)}
              >
                <option value="" disabled>Harga Tes</option>
                <option value="Berbayar">Berbayar</option>
                <option value="Gratis">Gratis</option>
              </select>
            </div>

            {/* Dropdown Prediksi Kemiripan */}
            <div className="mb-4">
              <select
                className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                value={prediksiKemiripan}
                onChange={(e) => setPrediksiKemiripan(e.target.value)}
              >
                <option value="" disabled>Kemiripan Soal</option>
                <option value="45%">45%</option>
                <option value="65%">65%</option>
                <option value="80%">80%</option>
              </select>
            </div>
          </div>
        </div>

        <div className='pt-10 flex justify-end pr-10'>
          <button
            onClick={handlePublish}
            className="bg-white text-black py-2 px-4 rounded-lg hover:bg-[#0B61AA] hover:text-white"
          >
            Publikasi
          </button>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-[#2E8EC5] p-6 rounded-lg shadow-lg text-center">
            <div className="bg-[#78AED6] p-4 rounded-t-lg text-white ">
              <h2 className="text-lg font-semibold">Tes Berhasil Di Publikasikan</h2>
            </div>
            <div className="bg-[#2E8EC5] p-4 text-black">
              <p>Tes kamu sekarang bisa diakses oleh peserta.</p>
            </div>
            <button
              onClick={closePopup}
              className="mt-4 bg-white text-black py-1 px-4 rounded-lg"
            >
              Oke
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-[#2E8EC5] p-6 rounded-lg shadow-lg text-center">
            <div className="bg-[#78AED6] p-4 rounded-t-lg text-white ">
              <h2 className="text-lg font-semibold">Publikasi Gagal</h2>
            </div>
            <div className="bg-[#2E8EC5] p-4 text-black">
              <p>Pastikan semua data telah diisi dengan lengkap.</p>
            </div>
            <button
              onClick={closePopup}
              className="mt-4 bg-white text-black py-1 px-4 rounded-lg"
            >
              Oke
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
