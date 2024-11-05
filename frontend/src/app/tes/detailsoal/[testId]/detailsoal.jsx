import Head from "next/head";

// Komponen untuk Header
const Header = () => (
  <header className="bg-[#0B61AA] p-5 flex justify-between items-center text-white font-poppins">
    <div className="flex items-center">
      <a href="#" className="mr-5">
        <img src="/image/logo.png" alt="Logo" className="h-auto w-36" />
      </a>
    </div>
    <div className="flex items-center gap-5">
      <h1 className="text-2xl font-bold font-libre-bodoni">Detail Soal</h1>
      <div>
        <img src="/image/userpic.png" alt="Profile Icon" className="h-10 w-10 mr-2" />
      </div>
    </div>
  </header>
);

// Komponen untuk informasi soal
const TestInfo = ({ title, duration, questions }) => (
  <div className="flex justify-between items-center p-3 mb-3">
    <p className="text-gray-500">{title}</p>
    <div className="flex items-center gap-2 text-gray-500">
      <img src="/image/clock.png" alt="Clock Icon" className="w-5 h-5" />
      <span>{duration}</span>|
      <img src="/image/paper.png" alt="Paper Icon" className="w-5 h-5" />
      <span>{questions}</span>
    </div>
  </div>
);

// Komponen untuk Deskripsi Tes
const TestDescription = () => (
  <div className="border border-gray-300 rounded-lg p-4 bg-gray-200 mb-4">
    <p className="text-gray-600 font-bold text-justify text-sm">
      Tes Ujian Tulis Berbasis Komputer (UTBK) adalah ujian seleksi yang dirancang untuk mengukur kemampuan akademik dan potensi siswa dalam melanjutkan pendidikan ke perguruan tinggi. Tes ini mencakup berbagai jenis soal yang menguji pemahaman konsep, keterampilan analitis, dan kemampuan pemecahan masalah di berbagai bidang studi.
    </p>
  </div>
);

// Komponen untuk Tombol
const StartButton = () => (
  <button
    className="block w-1/2 mx-auto py-2 bg-[#0B61AA] text-white rounded-full text-center mt-5 hover:bg-blue-800"
    onClick={() => alert("Are You Sure?")}
  >
    Mulai Try Out Sekarang
  </button>
);

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>Detail Soal - Etamtest</title>
      </Head>

      <div className="max-w-3xl mx-auto px-5">
        <Header />

        <main className="bg-gray-100 rounded-lg p-5 text-center mt-5 font-poppins">
          <h2 className="text-blue-900 text-2xl mb-1">Detail Soal</h2>
          <h3 className="text-gray-600 text-lg mb-5">TRY OUT UTBK 2025 #1</h3>
        </main>

        <div className="bg-gray-100 rounded-lg p-5 mt-5 font-poppins">
          <TestDescription />
          <TestInfo title="Tes Potensi Skolastik" duration="90 menit" questions="90 soal" />
          <hr className="border-t mb-3" />
          <TestInfo title="Tes Literasi Bahasa" duration="47 menit" questions="45 soal" />
          <hr className="border-t mb-3" />
          <TestInfo title="Tes Penalaran Matematika" duration="37 menit" questions="20 soal" />
          <StartButton />
        </div>
      </div>
    </>
  );
}
