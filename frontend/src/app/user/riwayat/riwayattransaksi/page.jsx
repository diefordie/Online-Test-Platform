'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RiwayatTransaksiHeader() {
  const [activeTab, setActiveTab] = useState('Belum Bayar');
  const [menuOpen, setMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fungsi untuk mengambil riwayat transaksi dari backend
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token'); // Ambil token dari localStorage
      if (!token) {
        console.error('Token tidak tersedia');
        return;
      }

      const response = await fetch('http://localhost:2000/api/riwayat-transaksi', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Sertakan token JWT di header Authorization
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTransactions(data);
      } else {
        console.error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(); // Panggil API saat komponen pertama kali dimuat
  }, []);

  // Fungsi untuk mendapatkan data sesuai dengan tab yang aktif
  const getDataByTab = () => {
    return transactions.filter((item) => item.status === activeTab);
  };

  return (
    <>
      {/* Header Utama */}
      <header className="w-[375px] h-[48px] sm:w-[1440px] sm:h-[115px] bg-[#0B61AA] text-white p-4 py-2 sm:py-8 relative z-50">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          {/* Bagian Kiri: Ikon Menu dan Gambar dengan tulisan Etamtest (Vector.png) */}
          <div className="flex items-center space-x-4 mb-4 sm:mb-0 w-full sm:w-auto justify-start">
            {/* Ikon Menu */}
            <button onClick={toggleMenu} className="sm:hidden">
              <img
                src="/images/menu_putih.png"
                alt="Menu"
                className="h-8 w-auto"
              />
            </button>
            <Link href="/">
              <img
                src="/images/Vector.png"
                alt="Etamtest"
                className="w-[85px] h-[25px] sm:w-[190px] sm:h-[43px]"
              />
            </Link>
          </div>

          {/* Bagian Kanan: Menu Home, Favorit, Transaksi, FAQ, dan gambar profil */}
          <div className="hidden sm:flex flex-wrap justify-center sm:justify-end items-center space-x-4">
            <Link href="/" className="hover:text-gray-200 text-2xl">
              Home
            </Link>
            <Link href="/favorit" className="hover:text-gray-200 text-2xl">
              Favorit
            </Link>
            <Link href="/transaksi" className="text-black font-bold text-2xl">
              Transaksi
            </Link>
            <Link href="/faq" className="hover:text-gray-200 text-2xl">
              FAQ
            </Link>
            <Link href="/profile">
              <img
                src="/images/profil.png"
                alt="Profil"
                className="h-15 w-15 rounded-full"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Bar Putih di Sebelah Kiri */}
          <div className="bg-white w-[174px] h-[592px] absolute top-[50px] z-50">
            {/* Bagian atas menu untuk profil */}
            <div className="flex flex-col items-center p-4 border-b">
              <img
                src="/images/Profile.png"
                alt="Profil"
                className="h-20 w-20 rounded-full mb-2"
              />
              <span className="text-sm font-semibold">Abellia Putri Dwi Masita</span>
            </div>
            {/* Menu */}
            <div className="flex flex-col p-4 space-y-4">
              <Link href="/" className="text-sm text-[#0B61AA]">
                Home
              </Link>
              <Link href="/favorit" className="text-sm text-[#0B61AA]">
                Favorit
              </Link>
              <Link href="/transaksi" className="text-sm text-[#0B61AA] font-bold">
                Transaksi
              </Link>
              <Link href="/faq" className="text-sm text-[#0B61AA]">
                FAQ
              </Link>
              <Link href="/profile">
                <img
                  src="/images/profil.png"
                  alt="Profil"
                  className="h-10 w-10 rounded-full"
                />
              </Link>
            </div>
          </div>
          {/* Latar Belakang untuk menutup menu */}
          <div className="flex-1 bg-black opacity-50 z-30" onClick={toggleMenu}></div>
        </div>
      )}

      {/* Tab Menu di Bawah Header */}
      <nav className="w-[375px] h-[51px] sm:w-[1440px] sm:h-[68px] bg-white shadow-md">
        <div className="container mx-auto flex flex-wrap justify-center sm:justify-start space-x-2 py-4">
          {['Belum Bayar', 'Berhasil', 'Selesai', 'Tidak Berhasil'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg px-4 pb-2 text-xs sm:text-lg ${
                activeTab === tab ? 'text-[#0B61AA] border-b-4 border-[#0B61AA]' : 'text-gray-500'
              } hover:text-[#0B61AA]`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Konten Berdasarkan Tab yang Aktif */}
      <div className="container mx-auto p-4 space-y-4 flex justify-center items-center">
        {loading ? (
          <p>Loading...</p> // Menampilkan loading jika data masih diambil
        ) : (
          getDataByTab().map((item) => (
            <div key={item.id} className="w-[354px] h-[141px] sm:w-[1374px] sm:h-[231px] bg-[#F3F3F3] shadow-md p-4 flex flex-col justify-between rounded-lg h-72">
              <div className="flex-shrink-0 flex items-start">
                <img
                  src={item.image}
                  alt={item.test.title}
                  className="w-[75px] h-[85px] sm:w-[150px] sm:h-[168px]"
                />
                <div className="ml-4 text-left sm:text-left">
                  <h3 className="pt-2 text-sm sm:text-xl font-semibold text-[#0B61AA]">{item.test.title}</h3>
                  <p className="text-[#0B61AA] text-xs sm:text-sm">Prediksi Kemiripan {item.test.similarity}%</p>
                  <div className="flex items-center pt-2 sm:pt-10">
                    <img
                      src="/images/foto.png"
                      alt="Foto Pembuat"
                      className="h-6 w-6 sm:h-10 sm:w-10 rounded-full mr-2"
                    />
                    <div className="text-[#0B61AA] ml-1">
                      <p className="mb-1 text-xs sm:text-sm">Dibuat Oleh:</p>
                      <strong className="block text-xs sm:text-sm">{item.test.author?.name || 'Penulis Tidak Diketahui'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tautan berdasarkan status */}
              <div className="flex justify-end mt-auto space-x-2">
                {item.status === 'Belum Bayar' && (
                  <Link href="/bayar" className="bg-[#0B61AA] text-white px-4 py-2 rounded-lg text-center text-xs sm:text-sm">
                    Bayar
                  </Link>
                )}
                {item.status === 'Berhasil' && (
                  <Link href="/mulai" className="bg-[#0B61AA] text-white px-4 py-2 rounded-lg text-center text-xs sm:text-sm">
                    Mulai
                  </Link>
                )}
                {item.status === 'Selesai' && (
                  <Link href="/score" className="bg-[#0B61AA] text-white px-4 py-2 rounded-lg text-center text-xs sm:text-sm">
                    Score
                  </Link>
                )}
                {item.status === 'Tidak Berhasil' && (
                  <Link href="/beli lagi" className="bg-[#0B61AA] text-white px-4 py-2 rounded-lg text-center text-xs sm:text-sm">
                    Beli lagi
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
