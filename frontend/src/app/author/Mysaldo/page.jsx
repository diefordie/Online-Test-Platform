'use client'
import React, { useState } from 'react';

const DashboardAuthor = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // For initial validation notification
  const [showProcessNotification, setShowProcessNotification] = useState(false); // For "Sedang Diproses" notification
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const recipientName = "Abellia Putri Dwi Masita"; // Nama penerima tetap
  const recipientAccount = "1328811353"; // Rekening tujuan tetap
  const serviceFee = 1000; // Biaya layanan tetap

  const banks = ['BNI', 'BRI', 'BCA', 'MANDIRI', 'BANK LAINNYA'];
  
  const handleBankSelect = (e) => {
    setSelectedBank(e.target.value);
  };
  // Toggle withdrawal form
  const handleWithdrawClick = () => {
    setIsOpen(prev => !prev);
  };

  // Submit withdrawal and show notification
  const handleSubmit = () => {
    setShowNotification(true);
    // setIsOpen(false);
    setIsClicked(true);
  };

  const textStyle ={
    color: isClicked ? 'black' : '#d5cccc'
  }

  // Close initial notification
  const handleOutsideClick = () => {
    setShowNotification(false);
    setShowProcessNotification(false); // Close both notifications
    setIsOpen(false);

    setSelectedBank('');
    setAccountNumber('');
    setWithdrawAmount('');

    setTimeout(() => {
      setShowProcessNotification(false);
      setIsClicked(false); // Atur ulang isClicked ke false
    },);
  };

  // Handle "Selanjutnya" click to show process notification
  const handleProcessClick = () => {
    setShowNotification(false); // Close validation notification
    setShowProcessNotification(true); // Show process notification


  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // Hitung total penarikan
  const totalAmount = Number(withdrawAmount) + serviceFee;

  return (
    <div className="dashboard flex h-screen bg-[#f8f9fa] font-poppins">
      <aside className="sidebar fixed top-0 left-0 w-[363px] h-full bg-[#78aed6] p-5 z-50 md:w-[300px] sm:w-[250px] xs:w-[200px]">
        <div className="logo mb-8 flex justify-start">
          <img src="/img/Vector.png" alt="Logo" className="w-[196px] h-[56px]" />
        </div>
        <div className='flex justify-center mb-5'>
          <button className=" w-[161px] h-[54px] new-button bg-[#0b61aa]  text-[24px] text-[#fff] font-bold p-2.5 rounded-[15px] border-none cursor-pointer mb-5">+ NEW</button>
        </div>
          <nav className="navigation text-white text-[24px] font-semibold">
            <ul className="list-none p-0">
              <li className="mb-2 p-3">Home</li>
              <li className="mb-2 p-3">Analisis Soal</li>
              <li className="mb-2 active bg-[#0B61AA] rounded-[30px] p-3">MySaldo</li>
            </ul>
          </nav>
      </aside>

      <main className="relative main-content flex-grow bg-white ml-[363px] md:ml-[300px] sm:ml-[250px] xs:ml-[200px]">
        <header className="header bg-[#0b61aa] top-0 text-white p-4 flex justify-end items-center">
          <span className="text-[26px] font-bold pr-6 mr-2"> Hai, Abeliaaa!</span>
          <div className='w-[35px] h-[35px] flex justify center items-center'>
            <img src="/img/layer_1.png" alt="profile"/>
          </div> 
        </header>

        <div className='mt-4 mb-4 px-8'>
            <div className='flex items-center mb-4'>
                <img
                    src="/img/saldo.png" // Ganti dengan path gambar Anda
                    alt="Icon"
                    className="w-10 h-10 mr-3" // Sesuaikan ukuran gambar sesuai kebutuhan
                />
                <span className='text-black text-[48px] font-normal'>Saldo Saya</span>
            </div>
            <section className="saldo-section bg-[#f1f1f1] rounded-lg p-5 shadow-md w-full">
                <div className="saldo-container flex items-center justify-between mb-5 px-8">
                    <div className="saldo-amount text-[48px] md:text-[45px] sm:text-[24px] font-normal whitespace-nowrap text-[#0B61AA]">
                    {/* Memformat Saldo dengan titik pemisah ribuan */}
                    Rp {Number(1000000).toLocaleString('id-ID')}.00,-
                    </div>
                    <button
                    onClick={handleWithdrawClick}
                    className="withdraw-button bg-[#0B61AA] text-white py-2 px-12 rounded-[15px] font-bold text-[16px] shadow-md ml-5 hover:bg-[#2C9BD1] sm:mt-4 sm:text-[14px]">
                    Tarik Dana
                    </button>
                </div>
            </section>
            {isOpen && (
                <section className="bg-[#f1f1f1] rounded-lg p-5 mt-5 shadow-lg w-full">
                <h3 className="border-b-2 border-gray-300 mb-5 pb-5 text-[32px]">Detail Penarikan</h3>
                <div className="flex flex-col gap-4 border-b-2 border-gray-300 mb-5 pb-5">
                    {/* Nama Bank */}
                    <div className="flex items-center justify-between">
                    <label className="w-1/3 mr-2 text-[24px]">Nama Bank</label>
                    <div className='flex items-center'>
                        <select
                        value={selectedBank}
                        onChange={handleBankSelect}
                        className="w-[250px] p-3 rounded-[20px] text-[24px] pl-8 border border-black"
                        >
                        <option value="">Pilih Nama Bank</option>
                        {banks.map((bank, index) => (
                            <option key={index} value={bank}>
                            {bank}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>

                    {/* Nomor Rekening */}
                    <div className="flex items-center">
                    <label className="w-1/3 mr-2 text-[24px]">Nomor Rekening</label>
                    <input
                        type="text"
                        placeholder="Masukkan nomor rekening"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className={`w-[413px] p-2 rounded-[15px] ml-auto text-[24px] border border-black italic placeholder ${
                        accountNumber ? 'text-left' : 'text-center'
                        }`}
                    />
                    </div>

                    {/* Nominal Penarikan */}
                    <div className="flex items-start">
                    <label className="w-1/3 mr-2 text-[24px]">Nominal Penarikan</label>
                    <div className='flex flex-col ml-auto'>
                        <input
                        type="text"
                        placeholder="Masukkan nominal penarikan"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className={`border border-black w-[413px] p-2 rounded-[15px] ml-auto text-[24px] italic placeholder ${
                            withdrawAmount ? 'text-left' : 'text-center'
                        }`}
                        />
                        <span className='mt-1 ml-2 text-sm font font-light text-[16px]'>Example : 1500 </span>
                    </div>
                    </div>
                </div>

                <h4 className="border-b-2 border-gray-300 pb-2 mb-4 text-[32px]">Rincian Penarikan</h4>

                <div className ="border-b-2 border-gray-300 pb-5 mb-5">
                    <div className="flex justify-between mt-2">
                    <p className='text-[24px]'>Nominal Penarikan:</p>
                    <p className="font-bold text-[#d5cccc] text-[24px]" style={textStyle}>
                        Rp. {withdrawAmount ? Number(withdrawAmount).toLocaleString('id-ID') : '0,00'}
                    </p>
                    </div>

                    <div className="flex justify-between mt-2 text-[24px]">
                    <p>Biaya Layanan:</p>
                    <p className="font-bold text-[#d5cccc]" style={textStyle}>Rp. {serviceFee.toLocaleString('id-ID')}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-2 border-b-2 border-gray-300 pb-2 text-[24px]">
                    <p className="font-semibold">Total Penarikan:</p >
                    <p className="font-bold text-[24px] text-[#d5cccc]" style={textStyle}>
                    Rp. {totalAmount.toLocaleString('id-ID')}
                    </p>
                </div>

                <div className="flex justify-end mt-4">
                    <button className="bg-[#0B61AA] w-[131px] h-[50px] text-[24px] text-white px-4 py-2 rounded-[10px]" onClick={handleSubmit}>
                    Tarik
                    </button>
                </div>
                </section>
            )}
            {/* Form Penarikan */}
            <section className="transaction-section bg-[#f1f1f1] rounded-lg p-5 mt-5 shadow-md w-full">
            <div
                className="transaction-history text-lg text-black flex items-center cursor-pointer"
                onClick={toggleHistory}
            >
                <span
                className={`mr-4 text-4xl text-black transform transition-transform duration-300 ${showHistory ? 'rotate-90' : 'rotate-0'}`}
                >
                ›
                </span>
                <span className='text-[32px]'>Riwayat Transaksi</span>
            </div>
            </section>

            {/* Riwayat Transaksi */}
            {showHistory && (
                <div className="history-content relative mt-2 transition-all duration-300">
                <div className="relative mt-5">
                    <table className="min-w-[500] lg:min-w-[969px] mx-8 border-collapse border border-gray-200 text-left rounded-lg bg-white shadow-lg">
                    <thead className='text-[20px]'>
                        <tr className="bg-[#0b61aa] text-white text-center">
                        <th className="p-4 rounded-tl-lg">Tanggal</th>
                        <th className="p-4">Metode Penarikan</th>
                        <th className="p-4">Invoice ID</th>
                        <th className="p-4 rounded-tr-lg">Total</th>
                        </tr>
                    </thead>
                    <tbody className='text-[20px]'>
                        <tr className="border-b">
                        <td className="p-4">20 November 2024</td>
                        <td className="p-4">BNI</td>
                        <td className="p-4">T0004</td>
                        <td className="p-4">IDR 250.000</td>
                        </tr>
                        <tr className="border-b">
                        <td className="p-4">12 Oktober 2024</td>
                        <td className="p-4">BNI</td>
                        <td className="p-4">T0003</td>
                        <td className="p-4">IDR 500.000</td>
                        </tr>
                        <tr className="border-b">
                        <td className="p-4">01 Oktober 2024</td>
                        <td className="p-4">Dana</td>
                        <td className="p-4">T0002</td>
                        <td className="p-4">IDR 100.000</td>
                        </tr>
                        <tr>
                        <td className="p-4">12 September 2024</td>
                        <td className="p-4">Dana</td>
                        <td className="p-4">T0001</td>
                        <td className="p-4">IDR 150.000</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            )}
        </div> 

        {/* Notifikasi Validasi */}
        {showNotification && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={handleOutsideClick}>
            <div
              className="bg-[#78AED6] rounded-lg p-4 text-center w-[496px] relative pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold mb-2 text-[32px]">Validasi</h3>
              <hr className="border-t-1 border-black mb-4" />
              <div className="text-left mb-2 text-[22px]">
                <p className="flex justify-between mb-4">
                    <span>Rekening Tujuan:</span>
                    <strong className='font-normal'>{recipientAccount}</strong>
                </p>
                <p className="flex justify-between mb-4">
                    <span>Nama Penerima:</ span>
                    <strong className='font-normal'>{recipientName}</strong>
                </p>
                <hr className="border-t-1 border-black mb-4" />
                <p className="flex justify-between mb-4">
                    <span>Nominal:</span>
                    <strong className='font-normal'>Rp {withdrawAmount ? Number(withdrawAmount).toLocaleString('id-ID') : '0,00'}</strong>
                </p>
                <p className="flex justify-between mb-4">
                    <span>Biaya Layanan:</span>
                    <strong className='font-normal'>Rp {serviceFee.toLocaleString('id-ID')}</strong>
                </p>
                <p className="flex justify-between mb-4">
                    <span>Total:</span>
                    <strong className='font-normal'>Rp {totalAmount.toLocaleString('id-ID')}</strong>
                </p>
              </div>
              <div className="flex items-center mb-28">
                <label className="block text-sm mr-2 text-[22px]">Kata Sandi</label>
                <input
                    type="password"
                    placeholder="Masukkan kata sandi"
                    className="bg-transparent border-b border-black focus:outline-none focus:border-b-2 focus:border-black flex-grow text-black-500 placeholder-black placeholder-opacity-50 ml-36"
                />
              </div>
              <button className="bg-[#0B61AA] text-[22px] text-black px-4 py-2 rounded-[15px] mt-3 w-[292px] h-[37px] text-center font-medium-bold" style={{lineHeight:'1'}} onClick={handleProcessClick}>
                Selanjutnya
              </button>
            </div>
          </div>
        )}

        {/* Notifikasi Proses */}
        {showProcessNotification && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={handleOutsideClick}>
            <div
              className="bg-[#78aed6] rounded-lg p-4 text-center w-[280px] relative pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/img/checkmark-circle-2.png" // Ganti dengan path gambar Anda
                alt="Success Icon"
                className="w-20 h-20 mb-4 mt-4 mx-auto" // Sesuaikan ukuran gambar sesuai kebutuhan
            />
              <h3 className="text-xl font-bold mb-4">Permintaan Anda <br /> Sedang Diproses</h3>
              <p className="text-justify text-sm mb-10 px-4">
                • Proses penarikan saldo biasanya memakan waktu 1-3 hari kerja.<br />
                • Anda akan menerima notifikasi melalui email ketika saldo berhasil ditransfer ke rekening bank Anda.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardAuthor;