'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode'; // Pastikan Anda menginstal jsonwebtoken jika belum ada

export default function EditProfile({ params }) {
  const { userId } = params;
  const [currentPassword, setCurrentPassword] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    password: '',
    profileImage: '', // Tambahkan state untuk menyimpan gambar profil
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Fungsi untuk mengambil data profil pengguna dari backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Ambil token dari localStorage
      if (!token) {
        console.error('Token tidak tersedia');
        return;
      }

      const response = await fetch(`http://localhost:2000/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Sertakan token JWT di header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          firstName: data.name.split(' ')[0] || '',
          lastName: data.name.split(' ')[1] || '',
          email: data.email || '',
          currentPassword: '',
          password: '', // Kosongkan password untuk keamanan
          profileImage: data.profileImage || '', // Tambahkan gambar profil dari data
        });
      } else {
        console.error('Failed to fetch user data');
        setError('Gagal mengambil data profil');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(); // Panggil API saat komponen pertama kali dimuat
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result }); // Set gambar profil
      };
      reader.readAsDataURL(file); // Baca file sebagai URL
    }
  };

  const handleDeleteProfileImage = () => {
    setFormData({ ...formData, profileImage: '' });
  };

const handleSave = async (event) => {
    event.preventDefault(); // Pastikan preventDefault() dipanggil pada event yang terdefinisi

    try {
        const token = localStorage.getItem("token");

        // Update user profile
        const profileResponse = await fetch(`http://localhost:2000/user/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                profileImage: formData.profileImage,
            }),
        });

        if (!profileResponse.ok) {
            throw new Error("Gagal memperbarui profil");
        }

        // Update password only if it's provided
        if (formData.password) {
            // Di sini kita akan menggunakan currentPassword yang sudah didapat sebelumnya
            const currentPassword = 'your_current_password'; // Gantilah ini dengan mekanisme untuk mendapatkan currentPassword
            
            const passwordResponse = await fetch(`http://localhost:2000/user/profile/change-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: currentPassword, // Kirimkan currentPassword
                    newPassword: formData.password,
                }),
            });

            if (!passwordResponse.ok) {
                throw new Error("Gagal memperbarui password");
            }
        }

        alert("Profil dan password berhasil diperbarui!");
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Gagal memperbarui profil.");
    }
};
  
  const handleDashboard = () => {
    // localStorage.removeItem('token'); // Hapus token saat logout
    router.push('/user/dashboard'); // Arahkan ke halaman login
  };

  if (loading) {
    return <p>Loading...</p>; // Tampilkan loading saat data sedang diambil
  }

  if (error) {
    return <p>{error}</p>; // Tampilkan pesan error jika ada
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-0 md:px-0" style={{ maxWidth: '1440px' }}>
      {/* Header */}
      <div className="w-full bg-[#0B61AA] p-4 text-white flex justify-between items-center rounded-md">
        <div className="flex-shrink-0">
          <img src="/images/etamtest.png" alt="Etamtest" className="h-6 object-contain" style={{ maxWidth: '216px', height: '52px' }} />
        </div>
        <div className="flex-shrink-0">
          <img src="/images/back.png" alt="Home" className="max-w-[44px] h-[22px]" onClick={handleDashboard} />
        </div>
      </div>

      {/* Profil Header */}
      <div className="min-h-screen flex flex-col p-8 bg-[#FFFFFF] font-sans">
        <div className="w-full max-w-[1228px] h-[88px] mx-auto mt-2 p-4 bg-[#0B61AA] text-white flex items-center justify-between rounded-md">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full flex justify-center items-center relative">
              <img src={formData.profileImage || "/images/profil.png"} alt="Profil" className="h-16 w-16 rounded-full" />
              <img
                src="/images/camera.png"
                alt="Kamera"
                className="h-6 w-6 absolute bottom-0 right-1 cursor-pointer"
                onClick={() => document.getElementById('uploadProfileImage').click()} // Memicu klik input file
              />
              <input
                type="file"
                id="uploadProfileImage"
                style={{ display: 'none' }} // Sembunyikan input file
                onChange={handleFileChange} // Tangani perubahan file
                accept="image/*" // Hanya terima file gambar
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold font-poppins">{`${formData.firstName} ${formData.lastName}`}</h3>
              <p className="font-poppins">{formData.email}</p>
            </div>
          </div>
        </div>

                  {/* Actions section */}
                  <div className="actions flex items-center justify-end space-x-2">
            <div className="flex items-center justify-center w-[29px] h-[29px] bg-white rounded-[10px]">
              <img src="/img/trash.png" alt="sampah" className="w-5 h-5 cursor-pointer" onClick={handleDeleteProfileImage} />
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-[1228px] mx-auto mt-0 p-4 bg-white shadow-md border border-black rounded-md">
        <form className="space-y-4 mt-4" onSubmit={(event) => handleSave(event)}>

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
                name="currentPassword"
                value={formData.currentPassword}
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
