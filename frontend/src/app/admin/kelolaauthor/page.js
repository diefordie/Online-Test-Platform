'use client';


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KelolaAuthor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerification, setSelectedVerification] = useState('all');

  // Fetch authors from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:2000/author/get-author");
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle approval change
  const handleApprovalChange = async (id, value) => {
    try {
      await axios.patch(`http://localhost:2000/author/edit-author/${id}/status`, {
        isApproved: value === 'true',
      });
      setUsers(users.map(user =>
        user.id === id ? { ...user, isApproved: value === 'true' } : user
      ));
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  // Filter the authors based on search and selected verification status
  const filteredAuthors = users.filter(user =>
    (selectedVerification === 'all' || (user.isApproved ? 'true' : 'false') === selectedVerification) &&
    (user.nama.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-1/5 bg-blue-900 text-white p-5">
        <div className="text-2xl font-bold mb-6">
          Etamtest
        </div>
        <div className="flex flex-col items-center mb-10">
          <img src="https://via.placeholder.com/150" alt="Admin Avatar" className="w-24 h-24 rounded-full mb-4"/>
          <p className="text-lg">Wony</p>
          <p>Administrator</p>
        </div>
        <nav className="space-y-4">
          <a href="#" className="block py-2 px-4 text-lg bg-gray-200 text-blue-900 rounded">Dashboard</a>
          <a href="#" className="block py-2 px-4 text-lg bg-gray-200 text-blue-900 rounded">Kelola Author</a>
          <a href="#" className="block py-2 px-4 text-lg bg-gray-200 text-blue-900 rounded">Kelola Tes</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 p-4 lg:p-8">
        <h1 className="text-2xl lg:text-4xl font-bold text-blue-900 mb-6">Kelola Author</h1>
        
        {/* Search and Filter */}
        <div className="mb-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-2/3 p-3 border rounded"
          />
          <select
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
            className="p-3 border rounded w-full lg:w-1/3"
          >
            <option value="all">Semua status verifikasi</option>
            <option value="false">Belum terverifikasi</option>
            <option value="true">Terverifikasi</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 px-4">Id</th>
                <th className="py-3 px-4">Nama</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Verifikasi</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                filteredAuthors.length > 0 ? (
                  filteredAuthors.map((user, index) => (
                    <tr key={user.id} className="text-center border-b">
                      <td className="py-2 px-4">{String(index + 1).padStart(6, '0')}</td>
                      <td className="py-2 px-4">{user.nama}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">Author</td>
                      <td className="py-2 px-4">
                        <select
                          value={user.isApproved ? 'true' : 'false'}
                          onChange={(e) => handleApprovalChange(user.id, e.target.value)}
                          className="p-2 border rounded"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td className="py-2 px-4">
                        {user.isApproved ? (
                          <span className="px-4 py-1 bg-lime-500 text-white rounded">Disetujui</span>
                        ) : (
                          <span className="px-4 py-1 bg-red-500 text-white rounded">Belum Disetujui</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No authors found</td>
                  </tr>
                )
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default KelolaAuthor;
