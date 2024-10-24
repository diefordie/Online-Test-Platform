'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import  { useState, useEffect } from 'react';


export default function Dashboard() {
  const [popularTests, setPopularTests] = useState([]);
  const [freeTests, setFreeTests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState (['']);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState([null]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  const testData = [
    {
      id: 1,
      kategori : "Try Out UTBK  ",
      judul : "TRY OUT UTBK 2025#1",
      prediksi_kemiripan: "Prediksi kemiripan 45%",
      views: 1386,
      author: " Rania Suyati",
      free: true,
      imageUrl: "/images/tes.png",
      authorProfile : " /images/authorProfile.png"
    },
    {
      id: 2,
      kategori : "Try Out PSIKOTEST",
      judul: "TRY OUT PSIKOTEST 2025#2",
      prediksi_kemiripan: "Prediksi kemiripan 50%",
      views: 2000,
      author: "Dilla Ayu",
      free: true, // ubah ke false untuk tes menampilkan gambar kunci
      imageUrl: "/images/tes.png",
      authorProfile : " /images/authorProfile.png"
    },
    {
      id: 3,
      kategori : "Try Out PSIKOTEST",
      judul: "TRY OUT PSIKOTEST 2025#3",
      prediksi_kemiripan: "Prediksi kemiripan 55%",
      views: 2000,
      author: "Zhang Yixing",
      free: true, // ubah ke false untuk tes menampilkan gambar kuci
      imageUrl: "/images/tes.png",
      authorProfile : " /images/authorProfile.png"
    },
    {
      id: 4,
      kategori : "Try Out PSIKOTEST",
      judul: "TRY OUT PSIKOTEST 2025#4",
      prediksi_kemiripan: "Prediksi kemiripan 70%",
      views: 1994,
      author: " Oh Sehun",
      free: true, // ubah ke false untuk tes menampilkan kunci
      imageUrl: "/images/tes.png",
      authorProfile : " /images/authorProfile.png"
    },
  ];

  // fungsi slider section populer
  const [populercurrentIndex, populersetCurrentIndex] = useState(0); // Mengganti penamaan state
    const populeritemsToShow = 3; // Jumlah item yang ingin ditampilkan sekaligus

    const populernextSlide = () => {
        if (populercurrentIndex < testData.length - populeritemsToShow) {
          populersetCurrentIndex(populercurrentIndex + 1);
        }
    };

    const populerprevSlide = () => {
        if (populercurrentIndex > 0) {
          populersetCurrentIndex(populercurrentIndex - 1);
        }
    };

  // fungsi slider section gratis
  const [gratiscurrentIndex, gratissetCurrentIndex] = useState(0); // Mengganti penamaan state
    const gratisitemsToShow = 3; // Jumlah item yang ingin ditampilkan sekaligus

    const gratisnextSlide = () => {
        if (gratiscurrentIndex < testData.length - gratisitemsToShow) {
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

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const categories = [
    { href: '/pemrograman', src: '/images/pemrograman.png', alt: 'pemrograman' },
    { href: '/cpns', src: '/images/cpns.png', alt: 'cpns' },
    { href: '/psikotes', src: '/images/psikotes.png', alt: 'psikotes' },
    { href: '/utbk', src: '/images/utbk.png', alt: 'utbk' },
  ];

  // fungsi untuk slider katagori
  const [currentIndex, setCurrentIndex] = useState(0);
  const categoriesToShow = 3; // Jumlah kategori yang ingin ditampilkan sekaligus

  const nextSlide = () => {
    if (currentIndex < categories.length - categoriesToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="fixed p-3 mx-auto bg-deepBlue text-white mx-auto w-full font-poppins md:max-w-3xl lg:max-w-screen-2xl lg:p-6 max-w-full z-50">
        <div className="container mx-auto flex justify-between items-center font-poppins">
          {/* Logo */}
          <div className="flex justify-between">
            {/* Ikon Menu untuk mobile */}
            <button onClick={toggleSidebar}>
              <img 
                src="/images/menu-white.png" 
                alt="Menu" 
                className="h-[30px] lg:hidden" 
              />
            </button>

            {/* Logo utama */}
            <Link href="/">
              <img 
                src="/images/etamtest.png" 
                alt="EtamTest" 
                className="h-[60px] lg:h-20 pl-3" 
              />
            </Link>
          </div>

          {/* Navigation Bar untuk desktop */}
          <nav className="md:block lg:block flex">
            <ul className="flex lg:space-x-7 md:space-x-4">
              {menus.map((menu, index) => (
                <li key={index}>
                  <Link legacyBehavior href={menu.href}>
                    <a className="hidden hover:text-orange font-bold lg:block">{menu.text}</a>
                  </Link>
                </li>
              ))}
              <div className="pl-2 flex">
                <li>
                  <Link href="/login" legacyBehavior>
                    <a className="hover:text-orange text-xs font-poppins m-4">Masuk</a>
                  </Link>
                </li>
                <li>
                  <Link href="/registrasi" legacyBehavior>
                    <a className="hover:bg-orange hover:text-deepBlue text-deepBlue bg-paleBlue p-1 lg:p-2 rounded-2xl text-xs font-poppins">Daftar</a>
                  </Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </header>

      {/* Sidebar ketika tampilan mobile */}
      <aside className={`fixed top-10 pt-5 left-0 w-64 bg-white h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden z-40`}>
        <ul className="p-4 space-y-4 text-deepblue round-lg">
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

    <section className="bg-gradient-custom p-20 lg:pt-40 pt-30">
       {/* Search Bar */}
       <div className="container justify-between mt-10 lg:mt-4 lg:max-w-[610px] max-w-full ">
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
          <section className="bg-putih p-5 font-poppins">
          <div className="container mx-auto mt-5 font-bold font-poppins text-deepBlue font-poppins">
            Hasil Pencarian
          </div>
          <Link href="/login"legacyBehavior >
              <a className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 font-poppins">
                {searchResults.map((test) => (
                  <div key={test.testId} className="bg-abumuda shadow-lg p-1 relative font-poppins ">
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
                        <img src={test.author.authorPhoto} alt={test.author.nama} className="h-5 w-5 leading-relaxed " />
                        <span className="text-sm font-semibold leading-relaxed ">{test.author.nama}</span>
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

      {/* Bagian Katagori tampilan desktop*/}
      <section className="container hidden lg:flex mx-auto p-5 text-deepBlue ">
        <div className="font-bold font-poppins text-deepBlue">
          Kategori
          <div className='grid grid-cols-3 lg:grid-cols-4 gap-8 mt-6 font-poppins max-w-7xl'>
            {categories.map((category, index) => (
              <Link key={index} href={category.href} legacyBehavior>
                <a className="hover:text-gray-300">
                  <img 
                    src={category.src} 
                    alt={category.alt} 
                    className="h-400" 
                  /> 
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian Katagori saat tampilan mobile */}
      <section className="container block lg:hidden mx-auto p-5 text-deepBlue">
      <div className="font-bold font-poppins text-deepBlue">
        Kategori
        <div className="relative mt-5">
          {/* Container untuk kategori, hanya 3 kategori yang akan ditampilkan */}
          <div className="flex overflow-hidden w-full">
            {categories.slice(currentIndex, currentIndex + categoriesToShow).map((category, index) => (
              <Link key={index} href={category.href} legacyBehavior>
                <a className="hover:text-gray-300 mx-2">
                  <img src={category.src} alt={category.alt} className="h-300" />
                </a>
              </Link>
            ))}
          </div>

          {/* Tombol panah kiri */}
          <button 
            onClick={prevSlide} 
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${currentIndex === 0 ? 'hidden' : ''}`}
          >
            &#10094; {/* Simbol panah kiri */}
          </button>

          {/* Tombol panah kanan */}
          <button 
            onClick={nextSlide} 
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${currentIndex >= categories.length - categoriesToShow ? 'hidden' : ''}`}
          >
            &#10095; {/* Simbol panah kanan */}
          </button>
        </div>
      </div>
      </section>

      {/* Bagian Paling Populer tampilan desktop*/}
      <section className="container hidden lg:block mx-auto p-5 text-deepBlue"> 
        <div className="mx-auto font-bold font-poppins text-deepBlue">
          Paling Populer
          <Link href="/" legacyBehavior>
            <a className="">
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-8"> 
                {testData.map((test) => (
                  <div key={test.id} className="bg-abumuda shadow-lg p-1 relative font-poppins">
                    <div className="flex justify-between items-center font-poppins">
                      <div className="flex items-center space-x-2 font-bold text-deepBlue font-poppins">
                        <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4 font-poppins" />
                        <span className="text-xs lg:text-sm font-poppins">{test.views}</span>
                      </div>
                      <div className="flex items-center space-x-2 font-poppins">
                        <img src="/images/share-icon.png" alt="Share" className="h-2 lg:h-3 lg:w-3" />
                        <img src="/images/more-icon.png" alt="More" className="h-2 lg:h-3" />
                      </div>
                    </div>

                    <div className="flex justify-center mt-4 bg-abumuda font-poppins">
                      <img src={test.imageUrl} alt={test.kategori} className="h-10 lg:h-20 object-contain" />
                    </div>

                    <div className="flex justify-center mt-4 text-deepBlue font-poppins">
                      <h3 className="text-center text-[0.625rem] lg:text-lg font-bold mt-2 font-poppins">{test.kategori}</h3>
                    </div>

                    <div className="bg-deepBlue text-white p-1 lg:p-2 mt-4 font-poppins">
                      <div className="flex items-center space-x-2 justify-between font-poppins">
                        <h3 className="text-left text-xs lg:text-base font-bold mt-2 font-poppins">{test.judul}</h3>
                        <img src="/images/fav-icon.png" alt="More" className="h-2 lg:h-7/2 object-contain" />
                      </div>

                      <p className="text-left text-[0.3rem] lg:text-sm leading-relaxed">{test.prediksi_kemiripan}</p>
                      <p className="text-[0.2rem] lg:text-xs leading-relaxed">Dibuat Oleh :</p>

                      <div className="flex justify-between space-x-2 leading-relaxed mt-1">
                        <div className="flex text-left space-x-1 lg:space-x-4">
                          <img src={test.authorProfile} alt={test.kategori} className="h-3 lg:h-5 object-contain" />
                          <span className="text-[0.375rem] lg:text-sm font-semibold">{test.author}</span>
                        </div>
                        <span className="text-[0.375rem] lg:text-sm font-semibold">
                          {test.free ? (
                            'Gratis'
                          ) : (
                            <img src="/images/lock.png" alt="Berbayar" className="h-2 lg:h-4 inline-block object-contain" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </a>
          </Link>
        </div>
      </section>


    {/* Bagian Paling Populer tampilan mobile */}
    <section className="container block lg:hidden mx-auto p-5 font-poppins relative">
      <div className="mx-auto mt-5 font-bold font-poppins text-deepBlue">
        Paling Populer
        {/* Container untuk kategori, menambahkan grid layout yang konsisten */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {testData.slice(populercurrentIndex, populercurrentIndex + populeritemsToShow).map((test) => (
            <a href="/" key={test.id} className="">
              <div className="bg-abumuda shadow-lg p-1 relative">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 font-bold text-deepBlue">
                    <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4" />
                    <span className="text-xs lg:text-sm">{test.views}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src="/images/share-icon.png" alt="Share" className="h-2 lg:h-3 lg:w-3" />
                    <img src="/images/more-icon.png" alt="More" className="h-2 lg:h-3" />
                  </div>
                </div>

                <div className="flex justify-center mt-4 bg-abumuda">
                  <img src={test.imageUrl} alt={test.kategori} className="h-10 lg:h-20 object-contain" />
                </div>

                <div className="flex justify-center mt-4 text-deepBlue">
                  <h3 className="text-center text-[0.625rem] lg:text-lg font-bold mt-2">{test.kategori}</h3>
                </div>

                <div className="bg-deepBlue text-white p-1 lg:p-2 mt-4">
                  <div className="flex items-center space-x-2 justify-between">
                    <h3 className="text-left text-xs lg:text-base font-bold mt-2">{test.judul}</h3>
                    <img src="/images/fav-icon.png" alt="Fav" className="h-2 lg:h-7/2 object-contain" />
                  </div>

                  <p className="text-left text-[0.3rem] lg:text-sm leading-relaxed">{test.prediksi_kemiripan}</p>
                  <p className="text-[0.2rem] lg:text-xs leading-relaxed">Dibuat Oleh:</p>

                  <div className="flex justify-between space-x-2 mt-1">
                    <div className="flex text-left space-x-1 lg:space-x-4">
                      <img src={test.authorProfile} alt={test.kategori} className="h-3 lg:h-5 object-contain" />
                      <span className="text-[0.375rem] lg:text-sm font-semibold">{test.author}</span>
                    </div>
                    <span className="text-[0.375rem] lg:text-sm font-semibold">
                      {test.free ? 'Gratis' : <img src="/images/lock.png" alt="Berbayar" className="h-2 lg:h-9/2 inline-block object-contain" />}
                    </span>
                  </div>
                </div>
              </div>
            </a>
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
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${populercurrentIndex >= testData.length - populeritemsToShow ? 'hidden' : ''}`}
        >
          &#10095;
        </button>
      </div>
    </section>

      {/* Bagian Gratis */}
      <section className="container hidden lg:block bg-putih p-5">
          <div className="mx-auto font-bold font-poppins text-deepBlue">
            Gratis
          </div>
          <Link href="/"legacyBehavior > 
            <a className="">
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {testData
                  .filter((test) => test.free) // Filter hanya data dengan free = true
                  .map((test) => (
                    <div key={test.id} className="bg-abumuda shadow-lg p-1 relative font-poppins ">
                      <div className="flex justify-between items-center font-poppins">
                        <div className="flex items-center space-x-2 font-bold text-deepBlue font-poppins">
                          <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4 font-poppins" />
                          <span className="text-xs lg:text-sm font-poppins">{test.views}</span>
                        </div>
                        <div className="flex items-center space-x-2 font-poppins">
                          <img src="/images/share-icon.png" alt="Share" className="h-2 lg:h-3 lg:w-3" />
                          <img src="/images/more-icon.png" alt="More" className="h-2 lg:h-3" />
                        </div>
                      </div>

                      <div className="flex justify-center mt-4 bg-abumuda font-poppins ">
                        <img src={test.imageUrl} alt={test.kategori } className="h-10 lg:h-20 object-contain" />
                      </div>

                      <div className="flex justify-center mt-4 text-deepBlue font-poppins">
                        <h3 className="text-center text-[0.625rem] lg:text-lg font-bold mt-2 font-poppins">{test.kategori}</h3>
                      </div>

                      <div className="bg-deepBlue text-white p-1 lg:p-2  mt-4 font-poppins">
                        <div className="flex items-center space-x-2 justify-between font-poppins">
                          <h3 className="text-left text-xs lg:text-base font-bold mt-2 font-poppins ">{test.judul}</h3>
                          <img src="/images/fav-icon.png" alt="More" className="h-2 lg:h-7/2 object-contain" />
                        </div>

                        <p className="text-left text-[0.3rem] lg:text-sm  leading-relaxed ">{test.prediksi_kemiripan}</p>
                        <p className="text-[0.2rem] lg:text-xs leading-relaxed">Dibuat Oleh :</p>
                        
                        <div className="flex justify-between space-x-2 justify-between leading-relaxed mt-1">
                          <div className='flex text-left leading-relaxed space-x-1 lg:space-x-4 '>
                            <img src={test.authorProfile} alt={test.kategori} className="h-3 lg:h-5 object-contain leading-relaxed " />
                            <span className="text-[0.375rem] lg:text-sm font-semibold leading-relaxed ">{test.author}</span>
                          </div>
                          <span className="text-[0.375rem] lg:text-sm font-semibold leading-relaxed">
                            {test.free ? (
                              'Gratis'
                            ) : (
                              <img src="/images/lock.png" alt="Berbayar" className="h-9/2 inline-block" />
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

    {/* Bagian Paling Populer tampilan mobile */}
    <section className="container block lg:hidden mx-auto p-5 font-poppins relative">
      <div className="mx-auto mt-5 font-bold font-poppins text-deepBlue">
        Gratis
        {/* Container untuk kategori, menambahkan grid layout yang konsisten */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {testData.slice(gratiscurrentIndex, gratiscurrentIndex + gratisitemsToShow)
          .filter((test) => test.free) // Filter hanya data dengan free = true
          .map((test) => (
            <a href="/" key={test.id} className="">
              <div className="bg-abumuda shadow-lg p-1 relative">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 font-bold text-deepBlue">
                    <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4" />
                    <span className="text-xs lg:text-sm">{test.views}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src="/images/share-icon.png" alt="Share" className="h-2 lg:h-3 lg:w-3" />
                    <img src="/images/more-icon.png" alt="More" className="h-2 lg:h-3" />
                  </div>
                </div>

                <div className="flex justify-center mt-4 bg-abumuda">
                  <img src={test.imageUrl} alt={test.kategori} className="h-10 lg:h-20 object-contain" />
                </div>

                <div className="flex justify-center mt-4 text-deepBlue">
                  <h3 className="text-center text-[0.625rem] lg:text-lg font-bold mt-2">{test.kategori}</h3>
                </div>

                <div className="bg-deepBlue text-white p-1 lg:p-2 mt-4">
                  <div className="flex items-center space-x-2 justify-between">
                    <h3 className="text-left text-xs lg:text-base font-bold mt-2">{test.judul}</h3>
                    <img src="/images/fav-icon.png" alt="Fav" className="h-2 lg:h-7/2 object-contain" />
                  </div>

                  <p className="text-left text-[0.3rem] lg:text-sm leading-relaxed">{test.prediksi_kemiripan}</p>
                  <p className="text-[0.2rem] lg:text-xs leading-relaxed">Dibuat Oleh:</p>

                  <div className="flex justify-between space-x-2 mt-1">
                    <div className="flex text-left space-x-1 lg:space-x-4">
                      <img src={test.authorProfile} alt={test.kategori} className="h-3 lg:h-5 object-contain" />
                      <span className="text-[0.375rem] lg:text-sm font-semibold">{test.author}</span>
                    </div>
                    <span className="text-[0.375rem] lg:text-sm font-semibold">
                      {test.free ? 'Gratis' : <img src="/images/lock.png" alt="Berbayar" className="h-2 lg:h-9/2 inline-block object-contain" />}
                    </span>
                  </div>
                </div>
              </div>
            </a>
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
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 ${gratiscurrentIndex >= testData.length - gratisitemsToShow ? 'hidden' : ''}`}
        >
          &#10095;
        </button>
      </div>
    </section>

      
      
    </>
  );
}
