"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const VerifikasiAuthor2 = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("semua"); // Filter untuk verifikasi
  const [data, setData] = useState([]); // Data dengan kelengkapan dokumen

  // Fetch authors from the backend
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:2000/author/get-author");
        if (Array.isArray(response.data.data)) {
          const fetchedAuthors = response.data.data.map((author) => ({
            ...author,
            dokumenKelengkapan: "--", // Default untuk kelengkapan dokumen di frontend
            status: "Belum Disetujui", // Status awal
          }));
          setAuthors(fetchedAuthors);
          setData(fetchedAuthors); // Simpan data dengan tambahan kolom dokumen
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  // Fungsi untuk menghitung jumlah sudah dan belum verifikasi
  const getVerificationCounts = () => {
    let sudahVerifikasi = 0;
    let belumVerifikasi = 0;

    data.forEach((item) => {
      if (item.isApproved) {
        sudahVerifikasi++;
      } else {
        belumVerifikasi++;
      }
    });

    return { sudahVerifikasi, belumVerifikasi, total: data.length };
  };

  const { sudahVerifikasi, belumVerifikasi, total } = getVerificationCounts();

  // Fungsi untuk mengupdate status berdasarkan kelengkapan dokumen dan verifikasi
  const updateStatus = (index) => {
    const updatedData = [...data];
    const item = updatedData[index];

    if (item.dokumenKelengkapan === '--' && !item.isApproved) {
      item.status = 'Belum Disetujui';
    } else if (item.dokumenKelengkapan === 'Tidak Lengkap') {
      item.status = 'Tidak Disetujui';
    } else if (item.dokumenKelengkapan === 'Lengkap' && item.isApproved) {
      item.status = 'Disetujui';
    } else {
      item.status = 'Belum Disetujui'; // Default status
    }

    setData(updatedData); // Update data state
  };

  // Fungsi untuk memfilter data berdasarkan jenis verifikasi
  const filteredData = () => {
    if (filter === "belumVerifikasi") {
      return data.filter((item) => !item.isApproved);
    }
    if (filter === "sudahVerifikasi") {
      return data.filter((item) => item.isApproved);
    }
    return data; // Tampilkan semua data
  };

  // Fungsi untuk mengupdate verifikasi author (nanti disesuaikan dengan endpoint)
  const handleUpdateVerifikasi = async (index, newVerifikasiStatus) => {
    const updatedData = [...data];
    updatedData[index].isApproved = newVerifikasiStatus === "Yes"; // Update status verifikasi di frontend
    setData(updatedData);
    updateStatus(index);
  
    try {
      // Panggil service untuk update verifikasi author di backend
      const response = await axios.patch(`http://localhost:2000/author/edit-author/${updatedData[index].id}/status`, {
        id: updatedData[index].id, // Kirim ID author yang akan di-update
        isApproved: updatedData[index].isApproved, // Kirim status verifikasi
      });
  
      if (response.status === 200) {
        console.log("Verifikasi berhasil diupdate:", response.data);
      } else {
        console.error("Gagal memperbarui verifikasi:", response);
      }
    } catch (error) {
      console.error("Error updating verifikasi:", error);
    }
  };

  const admin = [
    {
      id: 1,
      nama: "Desti Nur Irawati",
      role: "Administrator",
    }
  ];
  

  return (
    <>
      {admin.map((admin, index) => (
        <div className="flex h-screen" key={index}>
          <div className="flex h-screen">
            <div className="w-[131px] lg:w-[350px] bg-[#78AED6] p-4 flex flex-col items-center">
              <div className="mb-5 flex items-center justify-center w-full">
                <img src="/images/etamtest.png" alt="Etam Test Logo" className="object-contain lg:h-[50px]" />
              </div>
              <div className="mb-5 flex items-center">
                <img src="/images/profile-white.png" alt="User Profile" className="rounded-full lg:w-[80px] w-[31px] object-contain" />
                <div className="ml-3 text-white">
                  <h3 className="font-poppins font-medium text-basic text-black text-[10px] lg:text-[24px] ">{admin.nama}</h3>
                  <p className="text-sm font-poppins m-0">{admin.role}</p>
                </div>
              </div>
              <div className="justify-start w-full">
                <button className="block font-poppins w-full py-2 px-2 hover:bg-deepBlue text-white rounded-full text-sm lg:text-lg mb-4 text-left">Home</button>
                <button className="block font-poppins w-full py-2 px-2 hover:bg-deepBlue text-white rounded-full text-sm lg:text-lg text-left">Kelola Author</button>
              </div>
            </div>
          </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <nav className="bg-[#0B61AA] p-4 flex justify-end items-center">
            <div className="flex items-center pr-5">
              <span className="text-white font-poppins font-bold mr-3">Hai, Admin!</span>
            </div>
          </nav>

          {/* Search Bar Section */}
          <div className="flex items-center px-8 py-5 bg-white gap-4">
            <div className="flex justify-end items-center w-2/3 max-w-lg bg-white px-4 py-2 rounded-full shadow">
              <Image src="/images/search-bar.png" alt="Search Icon" width={24} height={24} />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 border-none outline-none ml-4 text-lg"
              />
            </div>

            <div className="flex gap-2 item-center">
              <button
                onClick={() => setFilter("semua")}
                className={`px-5 py-2 ${filter === "semua" ? "bg-blue-500 text-white" : "bg-abumuda text-black"} rounded-full`}
              >
                Semua ({total})
              </button>
              <button
                onClick={() => setFilter("belumVerifikasi")}
                className={`px-5 py-2 ${filter === "belumVerifikasi" ? "bg-blue-500 text-white" : "bg-abumuda text-black"} rounded-full`}
              >
                Belum Verifikasi ({belumVerifikasi})
              </button>
              <button
                onClick={() => setFilter("sudahVerifikasi")}
                className={`px-5 py-2 ${filter === "sudahVerifikasi" ? "bg-blue-500 text-white" : "bg-abumuda text-black"} rounded-full`}
              >
                Sudah Verifikasi ({sudahVerifikasi})
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="px-8 py-5 overflow-x-auto">
            <table className="min-w-full border-collapse bg-white shadow-lg">
              <thead>
                <tr className="bg-powderBlue text-white">
                  <th className="border p-2 sm:p-3">Tanggal</th>
                  <th className="border p-2 sm:p-3">ID</th>
                  <th className="border p-2 sm:p-3">Nama</th>
                  <th className="border p-2 sm:p-3">Email</th>
                  <th className="border p-2 sm:p-3">Kelengkapan Dokumen</th>
                  <th className="border p-2 sm:p-3">Verifikasi</th>
                  <th className="border p-2 sm:p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData().map((item, rowIndex) => (
                  <tr key={item.id}>
                    <td className="border p-2 sm:p-3 text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="border p-2 sm:p-3 text-center">{item.id}</td>
                    <td className="border p-2 sm:p-3 text-center">{item.name}</td>
                    <td className="border p-2 sm:p-3 text-center">{item.email}</td>
                    <td className="border p-2 sm:p-3 text-center">
                      <select
                        value={item.dokumenKelengkapan}
                        onChange={(e) => {
                          const updatedData = [...data];
                          updatedData[rowIndex].dokumenKelengkapan = e.target.value;
                          setData(updatedData);
                          updateStatus(rowIndex);
                        }}
                      >
                        <option value="Lengkap">Lengkap</option>
                        <option value="Tidak Lengkap">Tidak Lengkap</option>
                        <option value="--">--</option>
                      </select>
                    </td>
                    <td className="border p-2 sm:p-3 text-center">
                      <select
                        value={item.isApproved ? "Yes" : "No"}
                        onChange={(e) => handleUpdateVerifikasi(rowIndex, e.target.value)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td className="border p-2 sm:p-3 text-center">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ))}
    </>
  );
};

export default VerifikasiAuthor2;
