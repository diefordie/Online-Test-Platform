'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState('buatTes');
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
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


      <div className="bg-[#78AED6] p-4 sm:p-8 rounded-md mx-auto" style={{ maxWidth: '1150px', height: 'auto', marginTop: '20px' }}>
        <h2 className="text-black text-xl mb-6 text-center">Syarat & Ketentuan</h2>
        <div className="text-black mb-4">
          <p>1. Soal yang dipublikasikan harus orisinal dan tidak melanggar hak cipta. Jika terjadi pelanggaran hak cipta, author bertanggung jawab penuh atas segala tuntutan hukum yang mungkin timbul.</p>
          <p>2. Soal harus memenuhi standar kualitas, kejelasan, kebenaran jawaban, dan relevansi dengan topik.</p>
          <p>3. Tim platform berhak melakukan penyuntingan atau meminta revisi atas soal yang diajukan jika ditemukan kesalahan atau ketidaksesuaian dengan standar yang berlaku.</p>
          <p>4. Platform berhak menghapus soal yang telah dipublikasikan jika ditemukan adanya pelanggaran ketentuan tanpa pemberitahuan sebelumnya kepada author.</p>
          <p>5. Author bertanggung jawab atas keakuratan soal dan akibat dari kesalahan soal.</p>
          <p>6. Soal tidak boleh mengandung SARA, pornografi, atau konten ilegal.</p>
          <p>7. Dengan mempublikasikan soal, author memberikan lisensi non-eksklusif kepada aplikasi untuk menggunakan, memodifikasi, dan menampilkan soal tersebut kepada pengguna aplikasi. Hak cipta tetap dimiliki oleh author, namun aplikasi berhak menggunakannya untuk kepentingan aplikasi.</p>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="setujui"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="setujui" className="text-black">Setujui syarat dan ketentuan publikasi soal</label>
        </div>
        <div className="flex justify-end">
          <Link href="/publik" legacyBehavior>
            <a
              className={`bg-white text-black py-2 px-4 rounded-lg border border-black flex items-center justify-center shadow-md font-bold font-poppins hover:bg-[#0B61AA] hover:text-white ${isChecked ? '' : 'opacity-50 cursor-not-allowed'}`}
              aria-disabled={!isChecked}
            >
              Selanjutnya
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
