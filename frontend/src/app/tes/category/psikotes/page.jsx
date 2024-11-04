'use client';

import Link from 'next/link';
import  { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function psikotes() {
  const [popularTestsByCategory, setPopularTestsByCategory] = useState([]);
  const [freeTestsByCategory, setFreeTestsByCategory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState (['']);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState([null]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldGdHM2UXl4SGZWRnEzc0pXWXpyOHZXR0RzbTEiLCJlbWFpbCI6ImNoYXNjaHl5QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzI5Nzc2MjgyLCJleHAiOjE3Mjk3Nzk4ODJ9.0ka1wkLGztzgopxjhlvl77JSE7l5quPTMixKdlBFF0c';

  useEffect(() => {
    const fetchPopularTestsByCategory = async () => {
      try {
        const response = await fetch('http://localhost:2000/dashboard/popular-tests-by-category?category=Psikotes');
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
        const response = await fetch('http://localhost:2000/dashboard/free-tests-by-category?category=Psikotes');
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
      const response = await fetch(`http://localhost:2000/dashboard/search-tests-by-category?title=${encodeURIComponent(searchQuery)}&category=Psikotes`);
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

  const [searchcurrentIndex, searchsetCurrentIndex] = useState(0);
  const [searchitemsToShow, setSearchItemsToShow] = useState(2);
  
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
        setSearchItemsToShow(4); // Tampilkan 4 item di desktop
      } else {
        setSearchItemsToShow(2); // Tampilkan 2 item di mobile
      }
    };
  
    // Jalankan saat component dimuat
    updateItemsToShow();
  
    // Tambahkan event listener untuk mendeteksi perubahan ukuran layar
    window.addEventListener('resize', updateItemsToShow);
  
    // Bersihkan event listener saat component dilepas
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);
  
  const searchnextSlide = () => {
    if (searchcurrentIndex < searchResults.length - searchitemsToShow) {
      searchsetCurrentIndex(searchcurrentIndex + 1);
    }
  };
  
  const searchprevSlide = () => {
    if (searchcurrentIndex > 0) {
      searchsetCurrentIndex(searchcurrentIndex - 1);
    }
  };

  const [populercurrentIndex, populersetCurrentIndex] = useState(0);
  const [populeritemsToShow, setPopulerItemsToShow] = useState(2); 

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
        setPopulerItemsToShow(4); // Tampilkan 4 item di desktop
      } else {
        setPopulerItemsToShow(2); // Tampilkan 2 item di mobile
      }
    };
  
    // Jalankan saat component dimuat
    updateItemsToShow();
  
    // Tambahkan event listener untuk mendeteksi perubahan ukuran layar
    window.addEventListener('resize', updateItemsToShow);
  
    // Bersihkan event listener saat component dilepas
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const populernextSlide = () => {
      if (populercurrentIndex < popularTestsByCategory.length - populeritemsToShow) {
        populersetCurrentIndex(populercurrentIndex + 1);
      }
  };

  const populerprevSlide = () => {
      if (populercurrentIndex > 0) {
        populersetCurrentIndex(populercurrentIndex - 1);
      }
  };


    // fungsi slider section gratis
    const [gratiscurrentIndex, gratissetCurrentIndex] = useState(0);
    const [gratisitemsToShow, setGratisItemsToShow] = useState(2); 

    useEffect(() => {
      const updateItemsToShow = () => {
        if (window.innerWidth >= 1024) {
          setGratisItemsToShow(4); // Tampilkan 4 item di desktop
        } else {
          setGratisItemsToShow(2); // Tampilkan 2 item di mobile
        }
      };
    
      // Jalankan saat component dimuat
      updateItemsToShow();
    
      // Tambahkan event listener untuk mendeteksi perubahan ukuran layar
      window.addEventListener('resize', updateItemsToShow);
    
      // Bersihkan event listener saat component dilepas
      return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    const gratisnextSlide = () => {
        if (gratiscurrentIndex < freeTestsByCategory.length - gratisitemsToShow) {
          gratissetCurrentIndex(gratiscurrentIndex + 1);
        }
    };

    const gratisprevSlide = () => {
        if (gratiscurrentIndex > 0) {
          gratissetCurrentIndex(gratiscurrentIndex - 1);
        }
    };

  const menus = [
    {href:'/', text: "Home"},
    {href:'/fav', text: "Favorit"},
    {href:'/transaksi', text: "Transaksi"},
    {href:'/faq', text: "FAQ"},

  ]

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };
  
  // State untuk mengelola apakah "Love" di-like atau tidak
  const [isLiked, setIsLiked] = useState(false);

  // Fungsi untuk toggle status "Love"
  const toggleLike = () => {
    setIsLiked(!isLiked);
  }; 
  
  const [likedSearchItems, setLikedSearchItems] = useState({});
const [likedPopulerItems, setLikedPopulerItems] = useState({});
const [likedGratisItems, setLikedGratisItems] = useState({});

const toggleLikeSearch = async (id) => {
  const isLiked = likedSearchItems[id]; // Cek status apakah sudah di-like

  try {
    if (isLiked) {
      // Jika sudah di-like, lakukan DELETE request
      await fetch(`http://localhost:2000/api/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Gunakan token yang sudah didefinisikan
        },
        body: JSON.stringify({ testId: id }),
      });
    } else {
      // Jika belum di-like, lakukan POST request
      await fetch(`http://localhost:2000/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Gunakan token yang sudah didefinisikan
        },
        body: JSON.stringify({ testId: id }),
      });
    }

    // Update state setelah permintaan berhasil
    setLikedSearchItems((prevLikedItems) => ({
      ...prevLikedItems,
      [id]: !prevLikedItems[id], // Toggle status like
    }));
  } catch (error) {
    console.error("Error handling favorite:", error);
  }
};

const toggleLikePopuler = async (id) => {
  const isLiked = likedPopulerItems[id]; // Cek status apakah sudah di-like

  try {
    if (isLiked) {
      // Jika sudah di-like, lakukan DELETE request
      await fetch(`http://localhost:2000/api/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Gunakan token yang sudah didefinisikan
        },
        body: JSON.stringify({ testId: id }),
      });
    } else {
      // Jika belum di-like, lakukan POST request
      await fetch(`http://localhost:2000/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Gunakan token yang sudah didefinisikan
        },
        body: JSON.stringify({ testId: id }),
      });
    }

    // Update state setelah permintaan berhasil
    setLikedPopulerItems((prevLikedItems) => ({
      ...prevLikedItems,
      [id]: !prevLikedItems[id], // Toggle status like
    }));
  } catch (error) {
    console.error("Error handling favorite:", error);
  }
};

const toggleLikeGratis = async (id) => {
  const isLiked = likedGratisItems[id]; // Cek status apakah sudah di-like

  try {
    if (isLiked) {
      // Jika sudah di-like, lakukan DELETE request
      await fetch(`http://localhost:2000/api/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pastikan kamu punya token JWT
        },
        body: JSON.stringify({ testId: id }),
      });
    } else {
      // Jika belum di-like, lakukan POST request
      await fetch(`http://localhost:2000/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pastikan kamu punya token JWT
        },
        body: JSON.stringify({ testId: id }),
      });
    }

    // Update state setelah permintaan berhasil
    setLikedGratisItems((prevLikedItems) => ({
      ...prevLikedItems,
      [id]: !prevLikedItems[id], // Toggle status like
    }));
  } catch (error) {
    console.error("Error handling favorite:", error);
  }
};

  return (
    <>
    <header className="relative flex w-full bg-deepBlue text-white p-3 items-center z-50">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center p-2 lg:ml-9">
          
              <button onClick={toggleSidebar}>
                <img 
                  src="/images/menu-white.png" 
                  alt="Menu" 
                  className="h-[20px] lg:h-[30px] lg:hidden" 
                />
              </button>
  
              <Link href="/">
                <img 
                  src="/images/etamtest.png" 
                  alt="EtamTest" 
                  className="lg:h-14 h-8 mr-3 object-contain" 
                />
              </Link> 
      
        </div>

        <div className="relative flex inline-block items-center ">
          <div className="mx-auto">
              {/* Judul besar */}
              <h5 className="text-sm lg:text-3xl font-bold font-bodoni lg:mr-8">Latihan Soal Tes Psikotes</h5>
                  {/* Breadcrumb di bawah h5 */}
                  <nav className="hidden lg:block mt-2">
                      <ol className="list-reset flex space-x-2 ">
                      <li>
                          <Link href="/user/dashboard" legacyBehavior>
                          <a className="hover:text-orange font-poppins font-bold">Home</a>
                          </Link>
                      </li>
                      <li>/</li>
                      <li>
                          <Link href="/tes/category/Psikotes" legacyBehavior>
                          <a className="hover:text-orange font-poppins font-bold">Latihan Tes Psikotes</a>
                          </Link>
                      </li>
                      </ol>
                  </nav>
          </div>
            <div className='hidden lg:block'>
              <img 
                src="/images/profile.png" 
                alt="profile" 
                className="h-14 cursor-pointer mr-3"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              />
              {/* Dropdown */}
              {isDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-35 bg-white rounded-lg shadow-lg z-10 p-1
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
      </div>
    </header>


    {/* Sidebar ketika tampilan mobile */}
    <aside className={`fixed top-17 pt-5 left-0 w-64 bg-white h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden z-40`}>
      <ul className="p-4 space-y-4 text-deepblue round-lg">
        <div className="flex flex-col items-center">
          <li>
            <img 
              src="/images/profile-black.png" 
              alt="profile" 
              className="h-14 cursor-pointer mb-2" 
            />
          </li>
          <p className="font-bold">Desti Nur Irawati</p>
        </div>
        {menus.map((menu, index) => (
          <li key={index}>
            <Link legacyBehavior href={menu.href}>
              <a className="block hover:text-deepBlue hover:bg-paleBlue font-bold p-2">{menu.text}</a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>

    {/* Overlay untuk menutup sidebar */}
    {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
    )}

    {/* Search Bar */}
    <section className="bg-gradient-custom p-20 lg:pt-20 pt-25">
      <div className="container justify-between mt-2 lg:mt-4 lg:max-w-[610px] max-w-full ">
        <form 
          onSubmit={handleSearch} 
          className="flex items-center p-1 rounded-2xl bg-white w-full font-poppins"
        >
          <input 
            type="text" 
            placeholder="Cari Tes Soal" 
            className="flex-grow p-1 lg:p-2  rounded-2xl focus:outline-none focus:ring-2 focus:ring-powderBlue font-poppins max-w-[130px] lg:max-w-[610px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="p-1 lg:p-2 text-deepBlue font-bold rounded-2xl hover:bg-gray-200 font-poppins "
          >
            <img 
              src="/images/search-bar.png" 
              alt="Search Icon" 
              className="h-5 w-5"
            />
          </button>
        </form>
      </div>

    </section>
    
    {/* Bagian search bar */}
    {searchResults.length > 0 && (
        <section className="block mx-auto p-5 font-poppins relative">
        <div className="mx-auto mt-5 font-bold font-poppins text-deepBlue">
            Hasil Pencarian
          {/* Container untuk kategori, menambahkan grid layout yang konsisten */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {searchResults.slice(searchcurrentIndex, searchcurrentIndex + searchitemsToShow).map((test) => (
              <div key={test.testId} className="bg-abumuda shadow-lg p-1 relative group">
                {/* Overlay background abu-abu yang muncul saat hover */}
                <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>

                <div className="flex justify-between items-center group-hover:blur-[2px] transition-opacity duration-300 z-10">
                  <div className="flex items-center space-x-2 font-bold text-deepBlue">
                    <img src="/images/eye-icon.png" alt="Views" className="h-3 lg:h-4 object-contain" />
                    <span className="text-[0.6rem] lg:text-sm font-poppins">{test.accessCount}</span>
                  </div>
                </div>

                <div className="flex justify-center mt-2 lg:mt-4 relative z-20 group-hover:blur-[2px] transition duration-300">
                  <img src="/images/tes.png" alt={test.category} className="h-9 lg:h-20 object-contain" />
                </div>

                <div className="flex justify-center mt-2 lg:mt-4 text-deepBlue relative z-20 group-hover:blur-[2px] transition duration-300">
                  <h3 className="text-center text-[0.8rem] lg:text-lg font-bold mt-0 lg:mt-2 font-poppins">{test.category}</h3>
                </div>

                <div className="bg-deepBlue text-white p-1 lg:p-2  mt-4 relative z-20 group-hover:blur-[2px] transition duration-300">
                  <div className="flex items-center space-x-2 justify-between">
                    <h3 className="text-left text-[0.625rem] lg:text-base font-bold mt-2">{test.title}</h3>
                  </div>

                  <p className="text-left text-[0.5rem] lg:text-sm leading-relaxed">Prediksi kemiripan {test.similarity}%</p>
                  <p className="text-[0.4rem] lg:text-xs leading-relaxed">Dibuat Oleh:</p>

                  <div className="flex justify-between space-x-2 leading-relaxed mt-1">
                    <div className="flex text-left space-x-1 lg:space-x-4">
                      <img src={test.author.authorPhoto || '/images/profile.png'} alt={test.category} className="h-3 lg:h-5 object-contain" />
                      <span className="text-[0.375rem] lg:text-sm font-semibold">{test.author.name}</span>
                    </div>
                    <span className="text-[0.375rem] lg:text-sm font-semibold">
                    {Number(test.price) === 0 ? 'Gratis' : <img src="/images/lock.png" alt="Berbayar" className="h-2 lg:h-4 inline-block object-contain" />}
                    </span>
                  </div>
                </div>

                <div className="absolute gap-1 bottom-5 left-0 right-0 flex justify-center items-center lg:justify-center lg:space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 p-1 w-full">
                    <a href={`/tes/detailsoal/${test.id}`} className="w-3/4 lg:w-1/4 text-xs lg:text-base text-center bg-paleBlue text-deepBlue py-3 lg:py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue mb-2 lg:mb-0">
                      Mulai
                    </a>
                    <a href="/user/topScore" className="w-3/4 lg:w-2/5 text-xs lg:text-base text-center bg-paleBlue text-deepBlue py-1 lg:py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue mb-2 lg:mb-0">
                      <i className="fa-solid fa-medal"></i>
                       <span className="ml-1">Top Score</span>
                    </a>
                    <button 
                      onClick={() => toggleLikeSearch(test.id)} 
                      className="lg:block text-center bg-paleBlue text-deepBlue inline-block px-3 py-2 rounded-full hover:bg-orange hover:text-deepBlue mb-2 lg:mb-0"
                    >
                      <i className={`fa${likedSearchItems[test.id] ? "s" : "r"} fa-heart ${likedSearchItems[test.id] ? "text-red-500" : "text-deepBlue"}`}></i>
                    </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol panah kiri */}
          <button 
              onClick={searchprevSlide} 
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${searchcurrentIndex === 0 ? 'hidden' : ''}`}
            >
              &#10094; {/* Simbol panah kiri */}
            </button>
            {/* Tombol panah kanan */}
            <button 
              onClick={searchnextSlide} 
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${searchcurrentIndex >= searchResults.length - searchitemsToShow? 'hidden' : ''}`}
            >
              &#10095; {/* Simbol panah kanan */}
            </button>
        </div>
      </section>
      )}

    {/* Bagian Paling Populer */}
    <section className="mx-auto p-5 font-poppins relative">
        <div className="mx-auto mt-5 font-bold font-poppins text-deepBlue">
          Paling Populer
          {/* Container untuk kategori, menambahkan grid layout yang konsisten */}
          <div className=" mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTestsByCategory.slice(populercurrentIndex, populercurrentIndex + populeritemsToShow).map((test) => (
              <div key={test.testId} className="bg-abumuda shadow-lg p-1 relative group">
                
                  {/* Overlay background abu-abu yang muncul saat hover */}
                  <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>

                  <div className="flex justify-between items-center group-hover:blur-[2px] transition-opacity duration-300 z-10">
                    <div className="flex items-center space-x-2 font-bold text-deepBlue">
                      <img src="/images/eye-icon.png" alt="Views" className="h-3 lg:h-4 object-contain" />
                      <span className="text-[0.6rem] lg:text-sm font-poppins">{test.accessCount}</span>
                    </div>
                  </div>

                  <div className="flex justify-center mt-2 lg:mt-4 relative z-20 group-hover:blur-[2px] transition duration-300">
                    <img src="/images/tes.png" alt={test.category} className="h-9 lg:h-20 object-contain" />
                  </div>

                  <div className="flex justify-center mt-2 lg:mt-4 text-deepBlue relative z-20 group-hover:blur-[2px] transition duration-300">
                    <h3 className="text-center text-[0.8rem] lg:text-lg font-bold mt-0 lg:mt-2 font-poppins">{test.category}</h3>
                  </div>

                  <div className="bg-deepBlue text-white p-1 lg:p-2  mt-4 relative z-20 group-hover:blur-[2px] transition duration-300">
                    <div className="flex items-center space-x-2 justify-between">
                      <h3 className="text-left text-[0.625rem] lg:text-base font-bold mt-2">{test.title}</h3>
                    </div>

                    <p className="text-left text-[0.5rem] lg:text-sm leading-relaxed">Prediksi kemiripan {test.similarity}%</p>
                    <p className="text-[0.4rem] lg:text-xs leading-relaxed">Dibuat Oleh:</p>

                    <div className="flex justify-between space-x-2 leading-relaxed mt-1">
                      <div className="flex text-left space-x-1 lg:space-x-4">
                        <img src={test.author.authorPhoto || '/images/profile.png'} alt={test.author.name} className="h-3 lg:h-5 object-contain" />
                        <span className="text-[0.375rem] lg:text-sm font-semibold">{test.author.name}</span>
                      </div>
                      <span className="text-[0.375rem] lg:text-sm font-semibold">
                        {Number(test.price) === 0 ? 'Gratis' : <img src="/images/lock.png" alt="Berbayar" className="h-2 lg:h-4 inline-block object-contain" />}
                      </span>
                    </div>
                  </div>

                  <div className="absolute gap-1 bottom-5 left-0 right-0 flex justify-center items-center lg:justify-center lg:space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 p-1 w-full">
                    <a href={`/tes/detailsoal/${test.id}`} className="w-3/4 lg:w-1/4 text-xs lg:text-base text-center bg-paleBlue text-deepBlue py-3 lg:py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue mb-2 lg:mb-0">
                      Mulai
                    </a>
                    <a href={`/user/topscore/${test.id}`} className="w-3/4 lg:w-2/5 text-xs lg:text-base text-center bg-paleBlue text-deepBlue py-1 lg:py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue mb-2 lg:mb-0">
                      <i className="fa-solid fa-medal"></i>
                       <span className="ml-1">Top Score</span>
                    </a>
                    <button 
                      onClick={() => toggleLikePopuler(test.id)} 
                      className="lg:block text-center bg-paleBlue text-deepBlue inline-block px-3 py-2 rounded-full hover:bg-orange hover:text-deepBlue mb-2 lg:mb-0"
                    >
                      <i className={`fa${likedPopulerItems[test.id] ? "s" : "r"} fa-heart ${likedPopulerItems[test.id] ? "text-red-500" : "text-deepBlue"}`}></i>
                    </button>
                  </div>

              </div>
            ))}
          </div>

          {/* Tombol panah kiri */}
          <button
            onClick={populerprevSlide}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${populercurrentIndex === 0 ? 'hidden' : ''}`}
          >
            &#10094;
          </button>

          {/* Tombol panah kanan */}
          <button
            onClick={populernextSlide}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${populercurrentIndex >= popularTestsByCategory.length - populeritemsToShow ? 'hidden' : ''}`}
          >
            &#10095;
          </button>
        </div>
    </section>

    {/* Bagian gratis */}
    <section className="block mx-auto p-5 font-poppins relative">
        <div className="mx-auto mt-5 font-bold font-poppins text-deepBlue">
          Gratis
          {/* Container untuk kategori, menambahkan grid layout yang konsisten */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {freeTestsByCategory.slice(gratiscurrentIndex, gratiscurrentIndex + gratisitemsToShow).map((test) => (
              <div key={test.testId} className="bg-abumuda shadow-lg p-1 relative group">
                {/* Overlay background abu-abu yang muncul saat hover */}
                <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>

                <div className="flex justify-between items-center group-hover:blur-[2px] transition-opacity duration-300 z-10">
                  <div className="flex items-center space-x-2 font-bold text-deepBlue">
                    <img src="/images/eye-icon.png" alt="Views" className="h-3 lg:h-4 object-contain" />
                    <span className="text-[0.6rem] lg:text-sm font-poppins">{test.accessCount}</span>
                  </div>
                </div>

                <div className="flex justify-center mt-2 lg:mt-4 relative z-20 group-hover:blur-[2px] transition duration-300">
                  <img src="/images/tes.png" alt={test.category} className="h-9 lg:h-20 object-contain" />
                </div>

                <div className="flex justify-center mt-2 lg:mt-4 text-deepBlue relative z-20 group-hover:blur-[2px] transition duration-300">
                  <h3 className="text-center text-[0.8rem] lg:text-lg font-bold mt-0 lg:mt-2 font-poppins">{test.category}</h3>
                </div>

                <div className="bg-deepBlue text-white p-1 lg:p-2  mt-4 relative z-20 group-hover:blur-[2px] transition duration-300">
                  <div className="flex items-center space-x-2 justify-between">
                    <h3 className="text-left text-[0.625rem] lg:text-base font-bold mt-2">{test.title}</h3>
                  </div>

                  <p className="text-left text-[0.5rem] lg:text-sm leading-relaxed">Prediksi kemiripan {test.similarity}%</p>
                  <p className="text-[0.4rem] lg:text-xs leading-relaxed">Dibuat Oleh:</p>

                  <div className="flex justify-between space-x-2 leading-relaxed mt-1">
                    <div className="flex text-left space-x-1 lg:space-x-4">
                      <img src={test.author.authorPhoto || '/images/profile.png'} alt={test.author.name} className="h-3 lg:h-5 object-contain" />
                      <span className="text-[0.375rem] lg:text-sm font-semibold">{test.author.name}</span>
                    </div>
                    <span className="text-[0.375rem] lg:text-sm font-semibold">
                      {Number(test.price) === 0 ? 'Gratis' : <img src="/images/lock.png" alt="Berbayar" className="h-2 lg:h-4 inline-block object-contain" />}
                    </span>
                  </div>
                </div>

                <div className="absolute gap-1 bottom-5 left-0 right-0 flex justify-center items-center lg:justify-center lg:space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 p-1 w-full">
                    <a href={`/tes/detailsoal/${test.id}`} className="w-3/4 lg:w-1/4 text-xs lg:text-base text-center bg-paleBlue text-deepBlue py-3 lg:py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue mb-2 lg:mb-0">
                      Mulai
                    </a>
                    <a href={`/user/topscore/${test.id}`} className="w-3/4 lg:w-2/5 text-xs lg:text-base text-center bg-paleBlue text-deepBlue py-1 lg:py-2 rounded-full inline-block hover:bg-orange hover:text-deepBlue mb-2 lg:mb-0">
                      <i className="fa-solid fa-medal"></i>
                      <span className="ml-1">Top Score</span>
                    </a>
                    <button 
                      onClick={() => toggleLikeGratis(test.id)} 
                      className="lg:block text-center bg-paleBlue text-deepBlue inline-block px-3 py-2 rounded-full hover:bg-orange hover:text-deepBlue mb-2 lg:mb-0"
                    >
                      <i className={`fa${likedGratisItems[test.id] ? "s" : "r"} fa-heart ${likedGratisItems[test.id] ? "text-red-500" : "text-deepBlue"}`}></i>
                    </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol panah kiri */}
          <button
            onClick={gratisprevSlide}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${gratiscurrentIndex === 0 ? 'hidden' : ''}`}
          >
            &#10094;
          </button>

          {/* Tombol panah kanan */}
          <button
            onClick={gratisnextSlide}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${gratiscurrentIndex >= freeTestsByCategory.length - gratisitemsToShow ? 'hidden' : ''}`}
          >
            &#10095;
          </button>
        </div>
    </section>

    </>
  );

}