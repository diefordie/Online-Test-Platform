import Link from 'next/link';

const testData = [
  {
    id: 1,
    kategori : "Try Out UTBK",
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
    author: " Desti Nur Irawati",
    free: false, // ubah ke false untuk tes menampilkan gambar kunci
    imageUrl: "/images/tes.png",
    authorProfile : " /images/authorProfile.png"
  },
  {
    id: 3,
    kategori : "Try Out PSIKOTEST",
    judul: "TRY OUT PSIKOTEST 2025#2",
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
    judul: "TRY OUT PSIKOTEST 2025#2",
    prediksi_kemiripan: "Prediksi kemiripan 70%",
    views: 1994,
    author: " Oh Sehun",
    free: false, // ubah ke false untuk tes menampilkan kunci
    imageUrl: "/images/tes.png",
    authorProfile : " /images/authorProfile.png"
  },
];

export default function Dashboard() {
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
            <form className="flex mx-auto items-center p-1 rounded-2xl bg-white max-w-[610px] font-poppins  ">
            <input 
              type="text" 
              placeholder="Cari Tes Soal" 
              className="flex-grow p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-powderBlue font-poppins"/>
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
        <section className="bg-putih p-5 font-poppins">
          <div className="container  mx-auto mt-5 font-bold font-poppins text-deepBlue font-poppins">
            Paling Populer
          </div>
          <Link href="/login"legacyBehavior >
              <a className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 font-poppins">
                {testData.map((test) => (
                  <div key={test.id} className="bg-abumuda shadow-lg p-1 relative font-poppins ">
                    <div className="flex justify-between items-center font-poppins">
                      <div className="flex items-center space-x-2 font-bold text-deepBlue font-poppins">
                        <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4 font-poppins" />
                        <span className="text-sm font-poppins">{test.views}</span>
                      </div>
                      <div className="flex items-center space-x-2 font-poppins">
                        <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                        <img src="/images/more-icon.png" alt="More" className="h-7/2 " />
                      </div>
                    </div>

                    <div className="flex justify-center mt-4 bg-abumuda font-poppins ">
                      <img src={test.imageUrl} alt={test.kategori } className="h-20 w-20 " />
                    </div>

                    <div className="flex justify-center mt-4 text-deepBlue font-poppins">
                      <h3 className="text-center text-lg font-bold mt-2 font-poppins">{test.kategori}</h3>
                    </div>

                    <div className="bg-deepBlue text-white p-2  mt-4 font-poppins">
                      <div className="flex items-center space-x-2 justify-between font-poppins">
                        <h3 className="text-left text-base font-bold mt-2 font-poppins ">{test.judul}</h3>
                        <img src="/images/fav-icon.png" alt="More" className="h-7/2 " />
                      </div>

                      <p className="text-left text-sm leading-relaxed ">{test.prediksi_kemiripan}</p>
                      <p className="text-xs leading-relaxed">Dibuat Oleh :</p>
                      
                      <div className="flex justify-between space-x-2 justify-between leading-relaxed mt-1">
                        <div className='flex text-left leading-relaxed space-x-4 '>
                          <img src={test.authorProfile} alt={test.kategori} className="h-5 w-5 leading-relaxed " />
                          <span className="text-sm font-semibold leading-relaxed ">{test.author}</span>
                        </div>
                        <span className="text-sm font-semibold leading-relaxed">
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
        {/* Bagian Gratis */}
        <section className="bg-putih p-5">
          <div className="container mx-auto font-bold font-poppins text-deepBlue">
            Gratis
          </div>
          <Link href="/login"legacyBehavior > 
            <a className="">
              <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 mt-8">
            
              {testData
                .filter((test) => test.free) // Filter hanya data dengan free = true
                .map((test) => (

                  <div key={test.id} className="bg-abumuda shadow-lg p-1 relative">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 font-bold text-deepBlue">
                        <img src="/images/eye-icon.png" alt="Views" className="h-4 w-4" />
                        <span className="text-sm">{test.views}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <img src="/images/share-icon.png" alt="Share" className="h-3 w-3" />
                        <img src="/images/more-icon.png" alt="More" className="h-7/2" />
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <img src={test.imageUrl} alt={test.kategori} className="h-20 w-20" />
                    </div>
                    <div className="flex justify-center mt-4 text-deepBlue">
                      <h3 className="text-center text-lg font-bold mt-2">{test.kategori}</h3>
                    </div>

                    <div className="bg-deepBlue text-white p-2 mt-4">
                      <div className="flex items-center space-x-2 justify-between">
                        <h3 className="text-left text-base font-bold mt-2">{test.judul}</h3>
                        <img src="/images/fav-icon.png" alt="More" className="h-7/2" />
                      </div>

                      <p className="text-left text-sm leading-relaxed">{test.prediksi_kemiripan}</p>
                      <p className="text-xs leading-relaxed">Dibuat Oleh :</p>
                      
                      <div className="flex space-x-2 justify-between leading-relaxed mt-1">
                        <div className="flex text-left space-x-4">
                          <img src={test.authorProfile} alt={test.kategori} className="h-5 w-5" />
                          <span className="text-sm font-semibold">{test.author}</span>
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
      </section>
    </>
  );
}
