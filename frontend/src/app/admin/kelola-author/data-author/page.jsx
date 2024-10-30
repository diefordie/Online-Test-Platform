"use client"; 
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';


const VerifikasiAuthor2 = () => {
  const [data, setData] = useState([]); // State for backend data
  const [filter, setFilter] = useState("semua"); // State for filtering
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:2000/author/get-author');
        if (response.data && response.data.data) {
          setAuthors(response.data.data);
        } else {
          throw new Error('Data tidak sesuai format yang diharapkan');
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data author');
        console.error('Error fetching authors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyData = [
          { tanggal: '2024-07-13', id: '0001', nama: 'Sisilia Putri', email: 'sisiliaputrii@gmail.com', tesDiterbitkan: 22, status: 'Aktif' },
          { tanggal: '2024-09-02', id: '0002', nama: 'Syifa Maulida', email: 'syfaa010@gmail.com', tesDiterbitkan: 18, status: 'Nonaktif' },
          { tanggal: '2024-10-02', id: '0003', nama: 'Desti Nur Irawati', email: 'destini@gmail.com', tesDiterbitkan: 25, status: 'Aktif' },
        ];
        setData(dummyData); // Save dummy data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter data based on status
  const filteredData = () => {
    if (filter === "aktif") {
      return data.filter(item => item.status === 'Aktif');
    }
    if (filter === "nonaktif") {
      return data.filter(item => item.status === 'Nonaktif');
    }
    return data; // Show all data
  };

  const getStatusCount = () => {
    let aktif = 0;
    let nonaktif = 0;

    data.forEach(item => {
      if (item.status === 'Aktif') aktif++;
      if (item.status === 'Nonaktif') nonaktif++;
    });

    return { aktif, nonaktif, total: data.length };
  };

  const { aktif, nonaktif, total } = getStatusCount();

  const admin = [
    {
      id: 1,
      nama: "Ji Chang Wook",
      role: "Administrator",
    }
  ];

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Implementasikan logika untuk mengubah status author
      // Misalnya, panggil API untuk mengupdate status
      await axios.patch(`http://localhost:2000/author/edit-author/${id}/status`, { isApproved: newStatus === 'Aktif' });
      
      // Update state lokal
      setAuthors(authors.map(author => 
        author.id === id ? { ...author, isApproved: newStatus === 'Aktif' } : author
      ));
    } catch (error) {
      console.error('Error updating author status:', error);
      // Handle error (e.g., show error message to user)
    }
  };

 
  return (
    <>
      {admin.map((admin, index) => (
       <div className="flex h-screen " key={index}>
       <div className="flex h-screen">
         <div className="w-[131px]  lg:w-[350px] bg-[#78AED6] p-4 flex flex-col items-center">
           <div className="mb-5 flex items-center justify-center w-full">
             <img src="/images/etamtest.png" alt="Etam Test Logo" className="object-contain lg:h-[50px]" />
           </div>
           <div className="mb-5 flex items-center">
             <img src="/images/profile-white.png" alt="User Profile" className="rounded-full lg:w-[80px] w-[31px] object-contain" />
             <div className="ml-3 text-white">
               <h3 className="font-poppins font-bold text-basic text-black text-[10px] lg:text-[24px] ">{admin.nama}</h3>
               <p className="text-[18px] font-poppins m-0">{admin.role}</p>
             </div>
           </div>
           <div className="justify-start w-full">
             <Link href="/admin/dashboard">
               <button className="block font-poppins font-bold w-full py-2 px-2 hover:bg-deepBlue text-white rounded-full text-sm lg:text-lg text-left">
                 Home
               </button>
             </Link>
             <Link href="/verifikasiAuthor"> 
               <button className="block font-poppins font-bold w-full py-2 px-2 bg-deepBlue bg-opacity-50  hover:bg-deepBlue text-white rounded-full text-sm lg:text-lg text-left">
                 Kelola Author
               </button>
             </Link>
           </div>
         </div>
       </div>

          {/* Main content */}
          <div className="flex flex-col flex-1">
            <nav className="bg-[#0B61AA] p-4 flex justify-center items-center">
              <div className="flex items-center pr-5">
                <span className="text-white text-[32px] font-poppins font-semibold mr-3">Data Author</span>
              </div>
            </nav>

            {/* Search Bar Section */}
            <div className="flex items-center px-8 py-5 bg-white gap-4 font-poppins">
              <div className="flex justify-end items-center w-2/3 max-w-lg bg-white px-4 py-2 rounded-full shadow">
                <Image src="/images/search-bar.png" alt="Search Icon" width={24} height={24} />
                <input
                  type="text"
                  placeholder="Cari Berdasarkan Nama atau Email"
                  className="flex-1 border-none outline-none ml-4 text-lg"
                />
              </div>

              <div className="flex gap-4 items-center font-poppins">
                <button
                  onClick={() => setFilter("semua")}
                  className={`flex items-center justify-between w-[130px] px-4 py-2 text-black rounded-full ${filter === "semua" ? "bg-paleBlue" : "bg-abumuda"}`}
                >
                  <span>Semua</span>
                  <span className="text-red-600 font-semibold">{total}</span>
                </button>
                
                <button
                  onClick={() => setFilter("aktif")}
                  className={`flex items-center justify-between w-[130px] px-4 py-2 text-black rounded-full ${filter === "aktif" ? "bg-paleBlue" : "bg-abumuda"}`}
                >
                  <span>Aktif</span>
                  <span className="text-red-600 font-semibold">{aktif}</span>
                </button>
                
                <button
                  onClick={() => setFilter("nonaktif")}
                  className={`flex items-center justify-between  w-[130px] px-4 py-2 text-black rounded-full ${filter === "nonaktif" ? "bg-paleBlue" : "bg-abumuda"}`}
                >
                  <span>Nonaktif</span>
                  <span className="text-red-600 font-semibold">{nonaktif}</span>
                </button>
              </div>

            </div>

            {/* Table Section */}
            <div className="px-8 py-5 overflow-x-auto font-poppins">
              <table className="min-w-full border-collapse bg-white shadow-lg">
                <thead>
                  <tr className="bg-powderBlue text-black">
                    <th className="border p-2 sm:p-3">Tanggal</th>
                    <th className="border p-2 sm:p-3">ID</th>
                    <th className="border p-2 sm:p-3">Nama</th>
                    <th className="border p-2 sm:p-3">Email</th>
                    <th className="border p-2 sm:p-3">Tes Diterbitkan</th>
                    <th className="border p-2 sm:p-3">Status Akun</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((author, rowIndex) => (
                    <tr key={author.id}>
                      <td className="border p-2 sm:p-3 text-center">{new Date(author.createdAt).toLocaleDateString()}</td>
                      <td className="border p-2 sm:p-3 text-center">{author.id}</td>
                      <td className="border p-2 sm:p-3 text-center">{author.name}</td>
                      <td className="border p-2 sm:p-3 text-center">{author.email}</td>
                      <td className="border p-2 sm:p-3 text-center">{author.publishedTestCount}</td>
                      <td className="border p-2 sm:p-3 text-center">
                        <select
                          value={author.isApproved ? 'Aktif' : 'Nonaktif'}
                          onChange={(e) => handleStatusChange(author.id, e.target.value)}
                          className={`inline-block w-[151px] px-2 py-1 rounded-full text-white ${author.isApproved ? 'bg-[#228804]' : 'bg-[#CF0000]'}`}
                        >
                          <option value="Aktif">Aktif</option>
                          <option value="Nonaktif">Nonaktif</option>
                        </select>
                      </td>
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
