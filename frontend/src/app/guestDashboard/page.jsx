'use client';

import Link from 'next/link';
import  { useState, useEffect } from 'react';

export default function Dashboard() {
  const [popularTests, setPopularTests] = useState([]);
  const [freeTests, setFreeTests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState (['']);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState([null]);

  useEffect(() => {
    const fetchPopularTests = async () => {
      try {
        const response = await fetch('http://localhost:2000/dashboard/popular-tests');
        if (!response.ok) {
          throw new Error('Failed to fetch popular tests');
        }
        const data = await response.json();
        setPopularTests(data);
      } catch (error) {
        console.error('Error fetching popular tests:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTests();
  }, []);

  useEffect(() => {
    const fetchFreeTests = async () => {
      try {
        const response = await fetch('http://localhost:2000/dashboard/free-tests');
        if (!response.ok) {
          throw new Error('Failed to fetch free tests');
        }
        const data = await response.json();
        setFreeTests(data);
      } catch (error) {
        console.error('Error fetching free tests:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFreeTests();
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
      <header className="bg-deepBlue text-white p-6 font-poppins ">
      <div className="container mx-auto flex justify-between items-center font-poppins">
        {/* Logo */}
        <div className="">
          <Link href="/">
            <img 
              src="/images/etamtest.png" 
              alt="EtamTest" 
              className="h-10" 
            />
          </Link>
        </div>

        {/* Navigation Bar */}
        <nav className="space-x-7 font-poppins ">
          <Link href="/dashboard" legacyBehavior>
          <a className="hover:text-orange font-bold font-poppins ">Home</a>
          </Link>
          <Link href="/favorite" legacyBehavior >
            <a className="hover:text-orange font-bold font-poppins ">Favorit</a>
          </Link>
          <Link href="/transaction"legacyBehavior>
            <a className="hover:text-orange font-bold font-poppins ">Transaksi</a>
          </Link>
          <Link href="/faq"legacyBehavior>
            <a className="hover:text-orange font-bold font-poppins ">FAQ</a>
          </Link>
          <Link href="/login" legacyBehavior>
            <a className="hover:text-orange text-xs font-poppins m-4">Masuk</a>
          </Link>
          <Link href="/registrasi"legacyBehavior >
            <a className="hover:bg-orange hover:text-deepBlue text-deepBlue bg-paleBlue p-2  rounded-2xl text-xs font-poppins">Daftar</a>
          </Link>
        </nav>
      </div>
    </header>

    <section className="bg-gradient-custom p-20 font-poppins">
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
          <section className="bg-putih p-5 font-poppins">
          <div className="container  mx-auto mt-5 font-bold font-poppins text-deepBlue font-poppins">
            Hasil Pencarian
          </div>
          <Link href="/login"legacyBehavior >
              <a className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 font-poppins">
                {searchResults.map((test) => (
                  <div key={test.testId} className="bg-abumuda shadow-lg relative font-poppins ">
                    <div className="flex justify-between items-center font-poppins">
                      <div className="flex items-center space-x-2 font-bold text-deepBlue font-poppins">
                        <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4 font-poppins" />
                        <span className="text-sm font-poppins">{test.accessCount}</span>
                      </div>
                      <div className="flex items-center space-x-2 font-poppins">
                        <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                        <img src="/images/more-icon.png" alt="More" className="h-7/2 " />
                      </div>
                    </div>

                    <div className="flex justify-center mt-4 bg-abumuda font-poppins ">
                      <img src="/images/tes.png" alt={test.category} className="h-20 w-20 " />
                    </div>

                    <div className="flex justify-center mt-4 text-deepBlue font-poppins">
                      <h3 className="text-center text-lg font-bold mt-2 font-poppins">{test.category}</h3>
                    </div>

                    <div className="bg-deepBlue text-white p-2  mt-4 font-poppins">
                      <div className="flex items-center space-x-2 justify-between font-poppins">
                        <h3 className="text-left text-base font-bold mt-2 font-poppins ">{test.title}</h3>
                        <img src="/images/fav-icon.png" alt="More" className="h-7/2 " />
                      </div>

                      <p className="text-left text-sm leading-relaxed ">Prediksi kemiripan {test.similarity}</p>
                      <p className="text-xs leading-relaxed">Dibuat Oleh :</p>
                      
                      <div className="flex justify-between space-x-2 justify-between leading-relaxed mt-1">
                      <div className='flex text-left leading-relaxed space-x-4 '>
                        <img src={test.author.authorPhoto} alt={test.author.name} className="h-5 w-5 leading-relaxed " />
                        <span className="text-sm font-semibold leading-relaxed ">{test.author.name}</span>
                      </div>

                        <span className="text-sm font-semibold leading-relaxed">
                          {test.price ? (
                            <img src="/images/lock.png" alt="Berbayar" className="h-9/2 inline-block" />
                          ) : (
                            'Gratis'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </a>
            </Link>
        </section>
        )}

      {/* Bagian Katagori */}
      <section className="p-5 text-deepBlue ">
       <div className="container mt-5 font-bold font-poppins text-deepBlue font-poppins" >
        Kategori
        <div className='container grid grid-cols-4 sm:grid-cols-1 lg:grid-cols-4 gap-2 mt-3 font-poppins'>
          <Link href="/pemrograman"legacyBehavior >
              <a className="hover:text-gray-300 ">
                  <img 
                    src="/images/pemrograman.png" 
                    alt="pemrograman" 
                    className="h-250" 
                  /> 
              </a>
            </Link>
            <Link href="/cpns"legacyBehavior >
              <a className="hover:text-gray-300">
                  <img 
                    src="/images/cpns.png" 
                    alt="pemrograman" 
                    className="h-250 " 
                  /> 
              </a>
            </Link>
            <Link href="/psikotes"legacyBehavior >
              <a className="hover:text-gray-300">
                  <img 
                    src="/images/psikotes.png" 
                    alt="psikotes" 
                    className="h-250 "   
                  /> 
              </a>
            </Link>
            <Link href="/utbk"legacyBehavior >
              <a className="hover:text-gray-300">
                  <img 
                    src="/images/utbk.png" 
                    alt="pemrograman" 
                    className="h-250 "  
                  /> 
              </a>
            </Link>
          </div>
        </div>

        <link rel="stylesheet" href="login"
        
        />

        {/* Bagian Paling Populer */}
        {popularTests.length > 0 && (
          <section className="bg-putih p-5 font-poppins">
          <div className="container  mx-auto mt-5 font-bold font-poppins text-deepBlue font-poppins">
            Paling Populer
          </div>
          <Link href="/login"legacyBehavior >
              <a className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 font-poppins">
                {popularTests.map((test) => (
                  <div key={test.testId} className="bg-abumuda shadow-lg relative font-poppins ">
                    <div className="flex justify-between items-center font-poppins">
                      <div className="flex items-center space-x-2 font-bold text-deepBlue font-poppins">
                        <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4 font-poppins" />
                        <span className="text-sm font-poppins">{test.accessCount}</span>
                      </div>
                      <div className="flex items-center space-x-2 font-poppins">
                        <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                        <img src="/images/more-icon.png" alt="More" className="h-7/2 " />
                      </div>
                    </div>

                    <div className="flex justify-center mt-4 bg-abumuda font-poppins ">
                      <img src="/images/tes.png" alt={test.category} className="h-20 w-20 " />
                    </div>

                    <div className="flex justify-center mt-4 text-deepBlue font-poppins">
                      <h3 className="text-center text-lg font-bold mt-2 font-poppins">{test.category}</h3>
                    </div>

                    <div className="bg-deepBlue text-white p-2  mt-4 font-poppins">
                      <div className="flex items-center space-x-2 justify-between font-poppins">
                        <h3 className="text-left text-base font-bold mt-2 font-poppins ">{test.title}</h3>
                        <img src="/images/fav-icon.png" alt="More" className="h-7/2 " />
                      </div>

                      <p className="text-left text-sm leading-relaxed ">Prediksi kemiripan {test.similarity}</p>
                      <p className="text-xs leading-relaxed">Dibuat Oleh :</p>
                      
                      <div className="flex justify-between space-x-2 justify-between leading-relaxed mt-1">
                      <div className='flex text-left leading-relaxed space-x-4 '>
                        <img src={test.author.authorPhoto} alt={test.author.name} className="h-5 w-5 leading-relaxed " />
                        <span className="text-sm font-semibold leading-relaxed ">{test.author.name}</span>
                      </div>

                        <span className="text-sm font-semibold leading-relaxed">
                          {test.price ? (
                            <img src="/images/lock.png" alt="Berbayar" className="h-9/2 inline-block" />
                          ) : (
                            'Gratis'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </a>
            </Link>
        </section>
        )}

        {/* Bagian Gratis */}
        {freeTests.length > 0 && (
          <section className="bg-putih p-5">
          <div className="container mx-auto font-bold font-poppins text-deepBlue">
            Gratis
          </div>
          <Link href="/login"legacyBehavior > 
            <a className="">
              <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 mt-8">
            
              {freeTests.map((test) => (
                  <div key={test.testId} className="bg-abumuda shadow-lg relative">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 font-bold text-deepBlue">
                        <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4" />
                        <span className="text-sm">{test.accessCount}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                        <img src="/images/more-icon.png" alt="More" className="h-7/2" />
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <img src="/images/tes.png" alt={test.category} className="h-20 w-20" />
                    </div>
                    <div className="flex justify-center mt-4 text-deepBlue">
                      <h3 className="text-center text-lg font-bold mt-2">{test.category}</h3>
                    </div>

                    <div className="bg-deepBlue text-white p-2 mt-4">
                      <div className="flex items-center space-x-2 justify-between">
                        <h3 className="text-left text-base font-bold mt-2">{test.title}</h3>
                        <img src="/images/fav-icon.png" alt="More" className="h-7/2" />
                      </div>

                      <p className="text-left text-sm leading-relaxed">Prediksi kemiripan {test.similarity}</p>
                      <p className="text-xs leading-relaxed">Dibuat Oleh :</p>
                      
                      <div className="flex space-x-2 justify-between leading-relaxed mt-1">
                        <div className="flex text-left space-x-4">
                          <img src={test.author.authorPhoto} alt={test.author.name} className="h-5 w-5" />
                          <span className="text-sm font-semibold">{test.author.name}</span>
                        </div>
                        <span className="text-sm font-semibold">Gratis</span>
                      </div>
                    </div>
                  </div>
                ))}
              
              </div>
            </a> 
          </Link>
        </section>
        )}
      </section>
    </>
  );
}