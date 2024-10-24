'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const router = useRouter(); 

  useEffect(() => {
    const fetchUserData = () => {
      // Menggunakan data dummy
      setFormData({
        firstName: 'Dilla Ayu',
        lastName: 'Puspitasari',
        email: 'dillaayubpp@gmail.com',
        password: 'dillalucu', 
      });
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert('Profile saved');
  };

  // Fungsi untuk pindah ke dashboard ketika klik gambar keluar
  const handleLogout = async () => {
    await router.push('/user/page');
  };  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-0 md:px-0" style={{ maxWidth: '1440px' }}>
      {/* Header */}
      <div className="w-full bg-[#0B61AA] p-4 text-white flex justify-between items-center rounded-md">
        <div className="flex-shrink-0">
          <img src="/img/etamtest.png" alt="Etamtest" className="h-6 object-contain" style={{ maxWidth: '216px', height: '52px' }} />
        </div>
        <div className="flex-shrink-0">
          {/* Tambahkan event onClick ke gambar keluar */}
          <img src="/img/keluar.png" alt="Home" className="max-w-[44px] h-[22px]" onClick={handleLogout} />
        </div>
      </div>

      {/* Profil Header */}
      <div className="min-h-screen flex flex-col p-8 bg-[#FFFFFF] font-sans">
        <div className="w-full max-w-[1228px] h-[88px] mx-auto mt-2 p-4 bg-[#0B61AA] text-white flex items-center justify-between rounded-md">
          {/* Profile section */}
          <div className="flex items-center">
          <div className="w-16 h-16 rounded-full flex justify-center items-center relative">
            <img src="/img/Profil.png" alt="Profil" className="h-16 w-16 rounded-full" />
            <img src="/img/kamera.png" alt="Kamera" className="h-6 w-6 absolute bottom-0 right-1" />
          </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold font-poppins">{`${formData.firstName} ${formData.lastName}`}</h3>
              <p className="font-poppins">{formData.email}</p>
            </div>
          </div>

          {/* Actions section */}
          <div className="actions flex items-center justify-end space-x-2">
            <div className="flex items-center justify-center w-[29px] h-[29px] bg-white rounded-[10px]">
              <img src="/img/sampah.png" alt="sampah" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-[1228px] mx-auto mt-0 p-4 bg-white shadow-md border border-black rounded-md">
          <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="relative">
              <label className="block text-gray-700 font-poppins">Nama Depan</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded-[15px] mt-1 font-poppins"
              />
              <img src="/img/edit.png" alt="Edit" className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 mt-3" />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-poppins">Nama Belakang</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded-[15px] mt-1 pr-10 font-poppins"
              />
              <img src="/img/edit.png" alt="Edit" className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 mt-3" />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-poppins">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded-[15px] mt-1 pr-10 font-poppins"
              />
              <img src="/img/edit.png" alt="Edit" className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 mt-3" />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-poppins">Ubah Kata Sandi</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded-[15px] mt-1 font-poppins"
              />
              <img src="/img/edit.png" alt="Edit" className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 mt-3" />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] font-poppins">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
