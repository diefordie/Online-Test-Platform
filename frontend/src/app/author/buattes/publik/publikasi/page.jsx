'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function PublikasiPage() {
  const [namaTes, setNamaTes] = useState('');
  const [testId, setTestId] = useState(null);
  const [durasiTes, setDurasiTes] = useState('');
  // const [acakPertanyaan, setAcakPertanyaan] = useState({
  //   waktu: false,
  //   acak: false,
  // });
  // const [maksimumPercobaan, setMaksimumPercobaan] = useState('');
  const [hargaTes, setHargaTes] = useState('');
  const [prediksiKemiripan, setPrediksiKemiripan] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // const handleCheckboxChange = (event) => {
  //   setAcakPertanyaan({ ...acakPertanyaan, [event.target.name]: event.target.checked });
  // };

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const testIdFromUrl = params.get("testId");
  
    console.log("Fetched testId:", testIdFromUrl); // Cek nilai testId yang diambil
  
    if (testIdFromUrl) {
      setTestId(testIdFromUrl);
    }
  }, []);

  const handlePublish = async () => {
    const [hours, minutes] = durasiTes.split(':').map(Number);
    const totalMinutes = (hours || 0) * 60 + (minutes || 0);

    const payload = {
        price: hargaTes,
        similarity: parseFloat(prediksiKemiripan),
        worktime: totalMinutes
    };

    // Validasi input
    if (!payload.price || isNaN(payload.similarity) || isNaN(payload.worktime)) {
        alert("Semua field harus diisi untuk publikasi.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:2000/test/tests/${testId}/publish`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('Tes berhasil disimpan!');
            setShowSuccessPopup(true); 
            setShowErrorPopup(false);   
        } else {
            console.error('Gagal menyimpan tes.', await response.text());
            setShowErrorPopup(true);   
            setShowSuccessPopup(false);  
        }
    } catch (error) {
        console.error('Error:', error);
        setShowErrorPopup(true);      
        setShowSuccessPopup(false);     
    }
};

  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };
  const [activeTab, setActiveTab] = useState('publikasi');
  return (
    <div>
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

    <div className="flex justify-center items-center h-full">
      <div className="w-[341px] h-[344px] sm:w-[1343px] sm:h-[816px] bg-[#78AED6] p-8 rounded-md text-sm sm:text-lg">
        <div className="flex flex-row lg:flex-row justify-between pr-9">
          {/* Bagian Kiri, Teks Rata Kanan */}
          <div className="text-right pr-5 mb-5 lg:mb-0">
            <h3 className="font-poppins text-black text-sm sm:text-lg pt-4 mb-10 sm:pt-8">Nama Tes</h3>
            <h3 className="font-poppins text-black text-sm sm:text-lg pt-2 mb-12 sm:pt-7">Durasi Tes</h3>
            {/* <h3 className="font-poppins text-black text-sm sm:text-lg mb-10 pt-18">Acak Pertanyaan</h3>
            <h3 className="font-poppins text-black text-sm sm:text-lg mb-10 pt-4">Maksimum Percobasan Kuis</h3> */}
            <h3 className="font-poppins text-black text-sm sm:text-lg pt-2 mb-12 sm:pt-10">Harga Tes</h3>
            <h3 className="font-poppins text-black text-sm sm:text-lg pt-2 mb-10 sm:pt-12">Prediksi Kemiripan</h3>
          </div>

          {/* Bar putih di samping */}
          <div className="w-[187px] h-[288px] sm:w-[902px] sm:h-[654px] bg-white p-6 rounded-md shadow-lg flex-grow lg:flex-shrink-0 text-sm sm:text-lg relative">
            {/* Input Nama Tes */}
            <div className="mb-4 pt-1">
              <input
                type="text"
                className="w-[150px] h-[15px] sm:w-[615px] sm:h-[35px] border border-black p-2 rounded-full bg-[#78AED6] placeholder:text-black text-sm sm:text-lg"
                value={namaTes}
                onChange={(e) => setNamaTes(e.target.value)}
                placeholder="Nama Tes"
              />
            </div>

            {/* Input Durasi Tes */}
            <div className="mb-5 pt-12">
              <input
                type="text"
                className="w-[51px] h-[15px] sm:w-[141px] sm:h-[28px] border border-black p-2 rounded-full bg-[#78AED6] placeholder:text-black text-sm sm:text-lg"
                value={durasiTes}
                onChange={(e) => setDurasiTes(e.target.value)}
                placeholder="hh:mm"
              />
            </div>

            {/* Checkbox Acak Pertanyaan */}
            {/* <div className="mb-4 pt-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="waktu"
                  name="waktu"
                  checked={acakPertanyaan.waktu}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="waktu" className="text-black text-sm sm:text-lg">Peserta akan memiliki waktu untuk menyelesaikan seluruh kuis.</label>
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
                <label htmlFor="acak" className="text-black text-sm sm:text-lg">Pertanyaan akan ditampilkan secara acak kepada setiap responden.</label>
              </div>
            </div> */}

            {/* Input Maksimum Percobaan Kuis
            <div className="mb-2 pt-9">
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded-full bg-white text-gray-500"
                  value={maksimumPercobaan}
                  onChange={(e) => setMaksimumPercobaan(e.target.value)}
                  placeholder="Maksimum Percobaan Kuis"
              />
            </div> */}

            {/* Dropdown Harga Tes */}
            <div className="mb-7 pt-16">
              <input
                type="number"
                step="0.01" // Mengizinkan input nilai desimal
                className="w-[396px] h-[38px] border rounded-full border-black bg-[#78AED6] placeholder:text-black pl-2 text-sm sm:text-lg"
                value={hargaTes}
                onChange={(e) => setHargaTes(e.target.value)}
                placeholder="Harga Tes"
              />
            </div>

            {/* Dropdown Prediksi Kemiripan */}
            <div className="mb-4 pt-16">
              <select
                className="w-[175px] h-[32px] border rounded-full border-black bg-[#78AED6] pl-1"
                value={prediksiKemiripan}
                onChange={(e) => setPrediksiKemiripan(e.target.value)}
              >
                <option value="" disabled>Kemiripan Soal</option>
                <option value="0.85">45%</option>
                <option value="0.65">65%</option>
                <option value="0.80">80%</option>
              </select>
            </div>
          </div>
        </div>

        <div className='flex justify-end mr-8 p-2'>
          <button
            onClick={handlePublish}
            className="w-[102px] h-[30px] sm:w-[223px] sm:h-[54px] bg-white text-black text-sm sm:text-lg py-2 px-4 rounded-lg border border-black flex items-center justify-center shadow-md font-poppins font-semibold hover:bg-[#0B61AA]"
          >
            Publikasi
          </button>
        </div>
      </div>

        {/* Pop-up Sukses */}
        {showSuccessPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50  text-sm sm:text-lg">
        <div className="w-[90%] max-w-[619px] bg-[#78AED6] text-black p-4 rounded-lg text-center  text-sm sm:text-lg">
          <h2 className="font-bold bg-[#0B61AA] text-white p-4 rounded-t-lg">
            Tes Berhasil Di Publikasikan
          </h2>
          <p className="my-4">
            Tes kamu sekarang bisa diakses oleh peserta
          </p>
          <button
            className="bg-white text-black px-4 py-2 rounded-md mt-4"
            onClick={closePopup}
          >
            Oke
          </button>
        </div>
      </div>
    )}

    {/* Pop-up Gagal */}
    {showErrorPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50  text-sm sm:text-lg">
        <div className="w-[90%] max-w-[619px] bg-[#78AED6] text-black p-4 rounded-lg text-center  text-sm sm:text-lg">
          <h2 className="font-bold bg-[#0B61AA] text-white p-4 rounded-t-lg">
            Publikasi Gagal
          </h2>
          <p className="my-4">
            Pastikan semua data telah diisi dengan lengkap
          </p>
          <button
            className="bg-white text-black px-4 py-2 rounded-md mt-4"
            onClick={closePopup}
          >
            Oke
          </button>
        </div>
      </div>
    )}
      </div>
      </div>
  );
}