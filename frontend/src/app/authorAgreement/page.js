import Link from 'next/link';

export default function Register() {
  return (
    <div className="flex justify-between items-center">
      {/* Img 1 - Kiri */}
      <img 
        src="/images/polygon.png" 
        alt="Img 1" 
        className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain"
      />

      <div className="rounded-lg max-w-4xl flex items-center relative z-10 -ml-25 mr-24 shadow-2xl shadow-customShadow">
        {/* Bagian Kiri (Persyaratan) */}
        <div className="bg-powderBlue p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-center">Persyaratan</h2>
          <p className="text-sm mb-4">
            Untuk mendaftar sebagai author, silakan lengkapi persyaratan berikut:
          </p>
          <ul className="text-sm list-decimal list-inside mb-4 space-y-2 items-start">
            <li>Scan identitas diri (KTP/SIM) asli</li>
            <li>Scan Kartu Keluarga asli</li>
            <li>Curriculum Vitae (CV)</li>
            <li>Pas foto berwarna ukuran 3x4</li>
          </ul>
          <p className="text-sm mb-6">
            Buatlah file .zip berisi dokumen-dokumen persyaratan di atas lalu kirim ke alamat e-mail
            EtamTest@gmail.com dan tunggu pemberitahuan selanjutnya.
          </p>
          <Link href="/registrasi" legacyBehavior>
            <a className="hover:bg-orange hover:text-deepBlue text-deepBlue bg-paleBlue p-2 rounded-2xl text-xs font-poppins">
              Selesai
            </a>
          </Link>
        </div>
      </div>
      {/* Img 2 - Kanan */}
      <img 
        src="/images/mobilepassword.png" 
        alt="Img 2" 
        className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain"
      />
    </div>
  );
}
