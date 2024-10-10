'use client';

import Link from 'next/link';
import  { useState, useEffect } from 'react';

export default function CPNS() {
  const [popularTestsByCategory, setPopularTestsByCategory] = useState([]);
  const [freeTestsByCategory, setFreeTestsByCategory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState (['']);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState([null]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchPopularTestsByCategory = async () => {
      try {
        const response = await fetch('http://localhost:2000/dashboard/popular-tests-by-category?category=CPNS');
        if (!response.ok) {
          throw new Error('Failed to fetch popular tests by category');
        }
        const data = await response.json();
        setPopularTestsByCategory(data);
      } catch (error) {
        console.error('Error fetching popular tests by category:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTestsByCategory();
  }, []);

  useEffect(() => {
    const fetchFreeTestsByCategory = async () => {
      try {
        const response = await fetch('http://localhost:2000/dashboard/free-tests-by-category?category=CPNS');
        if (!response.ok) {
          throw new Error('Failed to fetch free tests by category');
        }
        const data = await response.json();
        setFreeTestsByCategory(data);
      } catch (error) {
        console.error('Error fetching free tests by category:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFreeTestsByCategory();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const response = await fetch(`http://localhost:2000/dashboard/search-tests?title=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to search tests');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching tests:', error);
      setError(error.message);
    }
  };

  if (loading && !error) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <>
      <header className="bg-deepBlue text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      <div className="container mx-auto">
      {/* Judul besar */}
      <h5 className="text-3xl font-bold font-bodoni ">Latihan Soal Tes CPNS</h5>
          {/* Breadcrumb di bawah h2 */}
          <nav className="mt-2">
            <ol className="list-reset flex space-x-2 ">
              <li>
                <Link href="/userDashboard" legacyBehavior>
                  <a className="hover:text-orange font-bodoni font-bold">Home</a>
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/CPNS" legacyBehavior>
                  <a className="hover:text-orange font-bodoni font-bold ">Latihan Tes CPNS</a>
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        {/* Logo */}
        <div className="flex space-x-5">
          <Link href="/">
            <img 
              src="/images/etamtest.png" 
              alt="EtamTest" 
              className="h-14 mr-9 p-1" 
            />
          </Link>
        </div>
        {/* Profile */}
      <div className="relative inline-block">
        <img 
          src="/images/profile.png" 
          alt="profile" 
          className="h-14 cursor-pointer mr-7 p-0"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        />

        {/* Dropdown */}
        {isDropdownOpen && (
          <div 
            className="absolute right-0 mt-1 w-37 bg-white rounded-lg shadow-lg z-10 p-1
                       before:content-[''] before:absolute before:-top-4 before:right-8 before:border-8 
                       before:border-transparent before:border-b-white"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link legacyBehavior href="/profile-edit">
              <a className="block px-4 py-1 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md border-abumuda">
                Ubah Profil
              </a>
            </Link>
            <Link legacyBehavior href="/logout">
              <a className="block px-4 py-1 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md">
                Logout
              </a>
            </Link>
          </div>
        )}
      </div>
      </div>
    </header>

    <section className="bg-gradient-custom p-20">
       {/* Search Bar */}
       <div className="container mx-auto mt-4 ">
            <form onSubmit={handleSearch} className="flex mx-auto items-center p-1 rounded-2xl bg-white max-w-[610px] font-poppins  ">
            <input 
              type="text" 
              placeholder="Cari Tes Soal" 
              className="flex-grow p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-powderBlue font-poppins"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              />
               <button 
                type="submit" 
                className="ml-auto p-2 text-deepBlue font-bold rounded-2xl hover:bg-gray-200 font-poppins">
                <img 
                  src="/images/search-bar.png" 
                  alt="Search Icon" 
                  className="h-6 w-6" 
                /> 
              </button>
            </form>
        </div>
    </section>

    {searchResults.length > 0 && (
        <section className="bg-putih p-5 text-bold">
        <div className="container  mx-auto mt-5 font-bold font-poppins text-deepBlue ">
          Hasil Pencarian
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
      {searchResults.map((test) => (
          <div key={test.testId} className="bg-abumuda shadow-lg p-1 relative group">
            {/* Overlay background abu-abu yang muncul saat hover */}
            <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>

            <div className="flex justify-between items-center relative z-20 group-hover:blur-sm transition duration-300">
              <div className="flex items-center space-x-2 font-bold text-deepBlue">
                <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4" />
                <span className="text-sm">{test.accessCount}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                <img src="/images/more-icon.png" alt="More" className="h-7/2" />
              </div>
            </div>

            <div className="flex justify-center mt-4 relative z-20 group-hover:blur-sm transition duration-300">
              <Link href={`/tes/${test.testId}`}>
                <img src="/images/tes.png" alt={test.category} className="h-20 w-20 cursor-pointer" />
              </Link>
            </div>

            <div className="flex justify-center mt-4 text-deepBlue relative z-20 group-hover:blur-sm transition duration-300">
              <h3 className="text-center text-lg font-bold mt-2">{test.category}</h3>
            </div>

            <div className="bg-deepBlue text-white p-2 mt-4 relative z-20 group-hover:blur-sm transition duration-300">
              <div className="flex items-center space-x-2 justify-between">
                <h3 className="text-left text-base font-bold mt-2">{test.title}</h3>
                <img src="/images/fav-icon.png" alt="More" className="h-7/2" />
              </div>

              <p className="text-left text-sm leading-relaxed">Prediksi kemiripan {test.similarity}</p>
              <p className="text-xs leading-relaxed">Dibuat Oleh :</p>

              <div className="flex justify-between space-x-2 leading-relaxed mt-1">
              <div className='flex text-left leading-relaxed space-x-4 '>
                <img src={test.author.authorPhoto} alt={test.author.name} className="h-5 w-5 leading-relaxed " />
                <span className="text-sm font-semibold leading-relaxed ">{test.author.name}</span>
              </div>
              <span className="text-sm font-semibold">
                {Number(test.price) === 0 ? 'Gratis' : <img src="/images/lock.png" alt="Berbayar" className="h-9/2 inline-block" />}
                </span>
              </div>
            </div>

            {/* Tombol yang berada di bagian paling bawah */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 p-2">
              <a href="/user/mengerjakanKuis/detailsoal" className="bg-paleBlue text-deepBlue text-bold px-7 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">Mulai</a>
              <a href="/user/mengerjakanKuis/topscore" className="bg-paleBlue text-deepBlue text-bold px-4 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">Top Score</a>
              </div>
          </div>
    ))}
        </div>

      </section>
      )}
    {/* Bagian Paling Populer */}
      {popularTestsByCategory.length > 0 && (
        <section className="bg-putih p-5">
        <div className="container  mx-auto mt-5 font-bold font-poppins text-deepBlue ">
          Paling Populer
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
      {popularTestsByCategory.map((test) => (
          <div key={test.testId} className="bg-abumuda shadow-lg p-1 relative group">
            {/* Overlay background abu-abu yang muncul saat hover */}
            <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>

            <div className="flex justify-between items-center relative z-20 group-hover:blur-sm transition duration-300">
              <div className="flex items-center space-x-2 font-bold text-deepBlue">
                <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4" />
                <span className="text-sm">{test.accessCount}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                <img src="/images/more-icon.png" alt="More" className="h-7/2" />
              </div>
            </div>

            <div className="flex justify-center mt-4 relative z-20 group-hover:blur-sm transition duration-300">
              <Link href={`/tes/${test.testId}`}>
                <img src="/images/tes.png" alt={test.category} className="h-20 w-20 cursor-pointer" />
              </Link>
            </div>

            <div className="flex justify-center mt-4 text-deepBlue relative z-20 group-hover:blur-sm transition duration-300">
              <h3 className="text-center text-lg font-bold mt-2">{test.category}</h3>
            </div>

            <div className="bg-deepBlue text-white p-2 mt-4 relative z-20 group-hover:blur-sm transition duration-300">
              <div className="flex items-center space-x-2 justify-between">
                <h3 className="text-left text-base font-bold mt-2">{test.title}</h3>
                <img src="/images/fav-icon.png" alt="More" className="h-7/2" />
              </div>

              <p className="text-left text-sm leading-relaxed">Prediksi kemiripan {test.similarity}</p>
              <p className="text-xs leading-relaxed">Dibuat Oleh :</p>

              <div className="flex justify-between space-x-2 leading-relaxed mt-1">
              <div className='flex text-left leading-relaxed space-x-4 '>
                <img src={test.author.authorPhoto} alt={test.author.name} className="h-5 w-5 leading-relaxed " />
                <span className="text-sm font-semibold leading-relaxed ">{test.author.name}</span>
              </div>
              <span className="text-sm font-semibold">
                {Number(test.price) === 0 ? 'Gratis' : <img src="/images/lock.png" alt="Berbayar" className="h-9/2 inline-block" />}
                </span>
              </div>
            </div>

            {/* Tombol yang berada di bagian paling bawah */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 p-2">
              <a href="/user/mengerjakanKuis/detailsoal" className="bg-paleBlue text-deepBlue text-bold px-7 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">Mulai</a>
              <a href="/user/mengerjakanKuis/topscore" className="bg-paleBlue text-deepBlue text-bold px-4 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">Top Score</a>
              </div>
          </div>
    ))}
        </div>

      </section>
      )}

      {/* Bagian Gratis */}
      {freeTestsByCategory.length > 0 && (
        <section className="bg-putih p-5">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
        {freeTestsByCategory.map((test) => (
            <div key={test.testId} className="bg-abumuda shadow-lg p-1 relative group">
              {/* Overlay background abu-abu yang muncul saat hover */}
              <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>
  
              <div className="flex justify-between items-center relative z-20 group-hover:blur-sm transition duration-300">
                <div className="flex items-center space-x-2 font-bold text-deepBlue">
                  <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4" />
                  <span className="text-sm">{test.accessCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                  <img src="/images/more-icon.png" alt="More" className="h-7/2" />
                </div>
              </div>
  
              <div className="flex justify-center mt-4 relative z-20 group-hover:blur-sm transition duration-300">
                <Link href={`/tes/${test.testId}`}>
                  <img src="/images/tes.png" alt={test.category} className="h-20 w-20 cursor-pointer" />
                </Link>
              </div>
  
              <div className="flex justify-center mt-4 text-deepBlue relative z-20 group-hover:blur-sm transition duration-300">
                <h3 className="text-center text-lg font-bold mt-2">{test.category}</h3>
              </div>
  
              <div className="bg-deepBlue text-white p-2 mt-4 relative z-20 group-hover:blur-sm transition duration-300">
                <div className="flex items-center space-x-2 justify-between">
                  <h3 className="text-left text-base font-bold mt-2">{test.title}</h3>
                  <img src="/images/fav-icon.png" alt="More" className="h-7/2" />
                </div>
  
                <p className="text-left text-sm leading-relaxed">Prediksi kemiripan {test.similarity}</p>
                <p className="text-xs leading-relaxed">Dibuat Oleh :</p>
  
                <div className="flex justify-between space-x-2 leading-relaxed mt-1">
                <div className="flex text-left space-x-4">
                  <img src={test.author.authorPhoto} alt={test.author.name} className="h-5 w-5" />
                  <span className="text-sm font-semibold">{test.author.name}</span>
                </div>
                <span className="text-sm font-semibold">
                {Number(test.price) === 0 ? 'Gratis' : <img src="/images/lock.png" alt="Berbayar" className="h-9/2 inline-block" />}
                </span>
                </div>
              </div>
  
              {/* Tombol yang berada di bagian paling bawah */}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 p-2">
              <a href="/user/mengerjakanKuis/detailsoal" className="bg-paleBlue text-deepBlue text-bold px-7 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">Mulai</a>
              <a href="/user/mengerjakanKuis/topscore" className="bg-paleBlue text-deepBlue text-bold px-4 py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue">Top Score</a>
            </div>
  
            </div>
      ))}
          </div>
        </section>
      )}
       
    </>
  );

}