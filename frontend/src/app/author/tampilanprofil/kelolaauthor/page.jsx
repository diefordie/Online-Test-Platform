"use client";
import React from "react";
import Link from 'next/link';

const VerifikasiAuthor1 = () => {
  const author = [
    {
      id: 1,
      nama: "Dilla Ayu Puspitasari",
      role: "Administrator",
    },
  ];

  return (
    <>
      {author.map((author, index) => (
        <div key={index} className="flex h-screen">
          <div className="flex h-screen">
            <div className="w-[250px] lg:w-[350px] bg-[#78AED6] p-4 flex flex-col items-center">
              <div className="mb-5 flex items-center justify-center w-full">
                <img src="/img/etamtest.png" alt="Etam Test Logo" className="object-contain lg:h-[50px]" />
              </div>
              <div className="mb-5 flex items-center">
                <img src="/img/profil.png" alt="User Profile" className="rounded-full lg:w-[80px] w-[31px] object-contain" />
                <div className="ml-3 text-white">
                  <h3 className="font-poppins text-[24px] font-semibold text-basic text-black text-[10px] lg:text-[24px]">
                    {author.nama}
                  </h3>
                  <p className="text-[0.6rem] text-[18px] font-poppins font-semibold m-0">{author.role}</p>
                </div>
              </div>
              <div className="justify-start w-full">
                <nav className="navigation text-white text-sm font-semibold">
                  <ul className="list-none">
                    <li className="block font-poppins w-full py-2 px-2 hover:bg-[#0B61AA] hover:bg-opacity-50 rounded-[30px] transition duration-300 lg:text-lg mb-2 text-left">Home</li>
                    <li className="block font-poppins w-full py-2 px-2 hover:bg-[#0B61AA] hover:bg-opacity-50 rounded-[30px] transition duration-300 lg:text-lg text-left">Kelola Author</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <nav className="bg-[#0B61AA] p-4 flex justify-end items-center">
              <div className="flex items-center pr-5">
                <span className="text-white font-poppins font-bold mr-3">Hai, {author.nama}!</span>
              </div>
            </nav>

            <div className="block lg:flex-1 lg:flex justify-center items-center bg-white">
              <div className="block lg:flex justify-center items-center bg-[#F3F3F3] lg:w-[837px] w-[210px] h-[440px] lg:h-[463px]">
                {/* Box 1 */}
                <div className="w-[124px] lg:w-[190px] lg:h-[200px] text-center p-3 bg-[#CAE6F9] hover:bg-newHeaderColor m-3 rounded-lg flex flex-col justify-center items-center text-[#0B61AA] text-lg font-bold">
                  <img src="/img/author.png" alt="Data Author" className="w-25 lg:w-50 object-contain" />
                  <p className="mt-3">Data Author</p>
                </div>

                <div className="w-[124px] lg:w-[190px] lg:h-[200px] text-center p-3 bg-[#CAE6F9] hover:bg-newHeaderColor m-3 rounded-lg flex flex-col justify-center items-center text-[#0B61AA] text-lg font-bold">
                  <Link legacyBehavior href="/verifikasiAuthor2" passHref>
                    <a className="w-full h-full flex flex-col justify-center items-center">
                      <img src="/img/author.png" alt="Verifikasi Author" className="w-25 lg:w-50 object-contain" />
                      <p className="mt-3">Verifikasi Author</p>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default VerifikasiAuthor1;
