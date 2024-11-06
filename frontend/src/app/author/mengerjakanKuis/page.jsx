'use client'
import React, { useState } from "react";
import Link from 'next/link';
import axios from "axios";


const MengerjakanTes = () => {
    const totalQuestions = 40;
    const [selectedoption, setSelectedoption] = useState(null);
    const [currentoption, setCurrentoption] = useState(1);
    const [markedreview, setMarkedreview] = useState(Array(totalQuestions).fill(false)); //perbarui
    const [showNav, setShowNav] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState([]); //perbarui untuk merubah warna nomor soal

    const handleoption = (option) => {
        setSelectedoption(option);

        if (!answeredQuestions.includes(currentoption)) {
            setAnsweredQuestions([...answeredQuestions, currentoption]);

            // Hapus ragu-ragu jika sudah memiliki opsi jawaban
            setMarkedreview(prevMarkedReview => {
                const updatedMarkedReview = [...prevMarkedReview];
                updatedMarkedReview[currentoption - 1] = false; // update setelah klik jawaban
                return updatedMarkedReview;
            });
        }
    };

    //handle ini aktif kl sudah import navigation
    const handleNavigation = () => {
        router.push('/tujuan'); 
    };

    const handlenextquestion = () => {
        if (currentoption < totalQuestions) {
            setCurrentoption(currentoption + 1);
            setSelectedoption(null);
        }
    };

    const handleprevquestion = () => {
        if (currentoption > 1) {
            setCurrentoption(currentoption - 1);
            setSelectedoption(null);
        }
    };

    //untuk menandai ragu" dan telah dimperbarui
    const handlemarkreview = () => {
        setMarkedreview(prevMarkedReview => {
            const updatedMarkedReview = [...prevMarkedReview];
            updatedMarkedReview[currentoption - 1] = !updatedMarkedReview[currentoption - 1];
            return updatedMarkedReview;
        });
    };

    const handleMenuClick = () => {
        setShowNav(!showNav);
        console.log("showNav: ", !showNav);
    };

    const handleSubmit = () => {
        setShowCountdown(true);

    };

    return (
        <div className="max-w-full font-poppins">
            {/* Header */}
            <div className=" bg-[#0B61AA] text-white p-8 flex items-center" style={{ maxWidth: '1440px', height: '90px' }}>
                <button onClick={handleMenuClick} className="block lg:hidden">
                    <img src="/img/menu.png" alt="Menu" className="h-7" style={{ maxWidth: '30px', height: '35px' }} />
                </button>
                <div>
                    <img src="/img/Vector.png" alt="Etamtest" className="h-6" style={{ maxWidth: '212px', height: '45px' }} />
                </div>
                <div className="ml-auto flex items-center">
                    <h2 className="lg:text-lg md:text-lg text-xs font-bold text-white font-poppins">Try Out CPNS</h2>
                </div>
                <style jsx>{`
                    @media (max-width: 424px) {
                        h2 {
                            width: 238px; /* Ukuran untuk tampilan desktop */
                            height: 45px; /* Ukuran untuk tampilan desktop */
                        }
                    }

                    @media (max-width: 423px) {
                            h2 {
                                width: 106px; /* Ukuran untuk tampilan mobile */
                                height: 20px; /* Ukuran untuk tampilan mobile */
                        }
                    }

                        .vector-image 
                            width: 85px; 
                            height: 25px;
                        }
                    }
                `}</style>
            </div>
            
            {/* Navigasi untuk mobile */}
            {showNav && (
                <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 lg:hidden" onClick={() => setShowNav(false)} />
            )}
            {showNav && (
                <div className="fixed inset-y-0 left-0 bg-[#fff] z-50 flex flex-col lg:hidden">
                    <div className="p-6 flex justify-between items-center">
                        <button onClick={() => setShowNav(false)}>
                            <img src="/img/menu.png" alt="Menu" className="h-7" style={{ maxWidth: '30px', height: '24px' }} />
                        </button>
                    </div>
                    <div className="mt-2 bg-[#F3F3F3] rounded-[20px] shadow-lg p-2 mx-4">
                        <div className="bg-[#0B61AA] p-2 rounded-[10px]" style={{ height: '50px' }}>
                            <h2 className="text-white text-lg font-bold font-poppins">Nomor Soal</h2>
                        </div>
                        <div className="p-2 flex-grow">
                            <div className="grid grid-cols-5 gap-1">
                                {Array.from({ length: totalQuestions }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`w-8 h-8 text-lg font-bold rounded border border-[#0B61AA] 
                                            ${markedreview[i] ? 'bg-yellow-500 text-white' : ''} 
                                            ${!markedreview[i] && answeredQuestions.includes(i + 1) ? 'bg-gray-700' : ''} 
                                            hover:bg-gray-300`}
                                        onClick={() => {
                                            setCurrentoption(i + 1);
                                            setShowNav(false); // Tutup navigasi setelah memilih soal
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Question and Timer section */}
            <div className="min-h-screen flex flex-col p-8 bg-[#FFFFFF] font-sans">
                <div className="flex flex-col lg:flex-row mt-4 lg:space-x-6 rounded-[15px]">
                    <div className="w-full lg:w-3/4 bg-[#0B61AA] p-6 sm:p-4 rounded-lg shadow-lg" style={{ maxWidth: '344x', height: '562' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className=" lg:text-lg md:text-lg text-xs font-bold text-white font-poppins">Try Out CPNS</h2>
                            <div className="flex items-center justify-center space-x-2 flex-grow">
                                <p className="text-white font-bold lg:text-lg md:text-lg text-sm">{currentoption}/{totalQuestions}</p>
                            </div>
                            <div className="bg-[#0B61AA] text-white px-4 sm:px-2 py-2 sm:py-1 rounded-[10px] border border-white font-bold lg:text-lg md:text-lg text-xs">00:00:00</div>
                        </div>

                        {/* Question */}
                        <div className="mb-6 sm:mb-4 bg-white p-4 sm:p2 rounded-lg shadow-lg">
                            {/* Soal */}
                            <div className="bg-white p-4 sm:p2 mb-4 rounded-lg shadow-lg">
                                <p className="text-lg mb-6 sm:mb-4 font-poppins">
                                Dalam penyusunan kebijakan publik, prinsip sangat penting untuk memastikan 
                                bahwa kekuasaan tidak terpusat pada satu pihak. Prinsip ini terutama diterapkan dalam hubungan 
                                antara lembaga eksekutif, legislatif, dan yudikatif. Manakah dari pilihan berikut yang merupakan 
                                contoh penerapan prinsip di Indonesia?
                                </p>
                            </div>

                            {/* Jawaban */}
                            <div className="mb-4 sm:mb-2 bg-white p-4 sm:p-2 rounded-lg shadow-lg font-poppins">
                                <input 
                                    type="radio" 
                                    id="optionA"
                                    name="option"
                                    value={'A'}
                                    checked={selectedoption === 'A'}
                                    onChange={() => handleoption('A')}
                                    className="mr-2"
                                />
                                <label htmlFor="optionA" className="text-lg">A. Presiden berhak mengeluarkan peraturan pemerintah pengganti undang-undang (Perppu)</label>
                            </div>
                            <div className="mb-4 sm:mb- 2 bg-white p-4 sm:p-2 rounded-lg shadow-lg font-poppins">
                                <input 
                                    type="radio" 
                                    id="optionB"
                                    name="option"
                                    value={'B'}
                                    checked={selectedoption === 'B'}
                                    onChange={() => handleoption('B')}
                                    className="mr-2"
                                />
                                <label htmlFor="optionB" className="text-lg">B. Mahkamah Konstitusi dapat membatalkan undang-undang yang dianggap bertentangan dengan UUD 1945</label>
                            </div>
                            <div className="mb-4 sm:mb-2 bg-white p-4 sm:p-2 rounded-lg shadow-lg font-poppins">
                                <input 
                                    type="radio" 
                                    id="optionC"
                                    name="option"
                                    value={'C'}
                                    checked={selectedoption === 'C'}
                                    onChange={() => handleoption('C')}
                                    className="mr-2"
                                />
                                <label htmlFor="optionC" className="text-lg">C. DPR memiliki hak interpelasi untuk meminta keterangan dari presiden</label>
                            </div>
                            <div className="mb-4 sm:mb-2 bg-white p-4 sm:p-2 rounded-lg shadow-lg font-poppins">
                                <input 
                                    type="radio" 
                                    id="optionD"
                                    name="option"
                                    value={'D'}
                                    checked={selectedoption === 'D'}
                                    onChange={() => handleoption('D')}
                                    className="mr-2"
                                />
                                <label htmlFor="optionD" className="text-lg"> D. Komisi Yudisial memberikan rekomendasi calon hakim agung kepada DPR</label>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col md:flex-row justify-between mt-6">
                            <div className="bg-white mb-4 p-4 rounded-[15px] shadow w-full">
                                <div className="flex flex-col md:flex-row justify-between items-center">
                                    <div className="flex justify-between w-full mb-2">
                                        <button
                                            className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700 font-poppins"
                                            style={{ height: '40px', flex: '1', marginRight: '8px' }}
                                            onClick={handleprevquestion}
                                            disabled={currentoption === 1} 
                                        >
                                            Soal sebelumnya
                                        </button>
                                        <button
                                        className={`bg-[#F8B75B] text-black px-4 py-2 rounded-[15px] hover:bg-yellow-500 mb-2 md:mb-0 md:mx-4 flex-1 font-poppins ${markedreview[currentoption - 1] ? 'bg-yellow-500' : ''} md:block hidden`}
                                        style={{ height: '40px', width: '100%', maxWidth: '200px', margin: '0 auto' }}
                                        onClick={handlemarkreview}
                                        >
                                            Ragu-Ragu
                                        </button>
                                        {currentoption === totalQuestions ? (
                                            <button
                                                className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700 mb-2 md:mb-0 md:ml-4 flex-1 font-poppins"
                                                style={{ height: '40px' }}
                                                onClick={handleSubmit}
                                            >
                                                Kumpulkan
                                            </button>
                                        ) : (
                                            <button
                                                    className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700 font-poppins"
                                                    style={{ height: '40px',flex: '1', marginLeft: '8px' }}
                                                    onClick={handlenextquestion}
                                             >
                                                    Soal Selanjutnya
                                            </button>
                                        )}
                                    </div>
                                    <div className=" block md:hidden w-full">
                                        <button
                                            className={`bg-[#F8B75B] text-black px-4 py-2 rounded-[15px] hover:bg-yellow-500 w-full font-poppins ${markedreview[currentoption - 1] ? 'bg-yellow-500' : ''}`}
                                            style={{ height: '40px' }}
                                            onClick={handlemarkreview}
                                        >
                                            Ragu-Ragu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question navigation */}
                    <div className=" hidden lg:block lg:w-1/4 mt-6 lg:mt-0 bg-[#F3F3F3] rounded-[20px] shadow-lg">
                        <div className="bg-[#0B61AA] p-4 rounded-[10px]" style={{ height: '50px' }}></div>
                        <div className="p-6">
                            <div className ="grid grid-cols-5 gap-2">
                                {Array.from({ length: totalQuestions }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`w-10 h-10 text-lg font-bold rounded border border-[#0B61AA] 
                                            ${markedreview[i] ? 'bg-yellow-500 text-white' : ''} 
                                            ${!markedreview[i] && answeredQuestions.includes(i + 1) ? 'bg-gray-700' : ''} 
                                            hover:bg-gray-300`}
                                        onClick={() => setCurrentoption(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tampilkan CountdownNotification setelah klik submit */}
            {showCountdown && <CountdownNotification />}
        </div>
    );
};

export default MengerjakanTes;