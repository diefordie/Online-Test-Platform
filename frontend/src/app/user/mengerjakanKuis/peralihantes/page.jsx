'use client';

import React, { useEffect, useState } from 'react';


const CountdownNotification = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white font-sans">
        {/* Header */}
        <div className="w-full bg-[#0B61AA] text-white p-4 text-center flex items-center" style={{ height: '70px' }}>
            <h1 className="text-3xl font-bold ml-4">EtamTest</h1>
        </div>
    
        {/* ini bagian kotak  peralihan tes! */}
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-[370px] text-center border border-gray-300">
                <div className="bg-[#0b61aa] text-white rounded-t-lg p-4 shadow-xl border border-gray-300">
                    <h2 className="text-xl font-bold">TES SELANJUTNYA</h2>
                    <h3 className="text-lg">- TIU -</h3>
                </div>
                {/* Kotak abu-abu yang membungkus p dan timer */}
                <div className="bg-[#f1f1f1] p-4 rounded-b-lg">
                    <p className="text-gray-700">
                        Persiapkan dirimu!<br />
                        Tes berikutnya akan dimulai dalam {seconds} detik.
                    </p>
                {/* Timer dengan ukuran lebih kecil dan border hitam */}
                    <div className="mt-10 mb-6 border border-black rounded-[10px] p-2 text-sm w-[80px] mx-auto shadow-2xl">
                        {`00 : ${seconds < 10 ? `0${seconds}` : seconds}`}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CountdownNotification;
