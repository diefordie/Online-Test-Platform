'use client'
import React, { useState } from "react";

const MengerjakanTes = () => {
    const totalQuestions = 40; // Pindahkan deklarasi totalQuestions ke atas
    const [selectedoption, setSelectedoption] = useState(null);
    const [currentoption, setCurrentoption] = useState(1);
    const [markedreview, setMarkedreview] = useState(Array(totalQuestions).fill(false));
    const [showNav, setShowNav] = useState(false);

    const handleoption = (option) => {
        setSelectedoption(option);
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

    const handlemarkreview = () => {
        const updatedMarkedReview = [...markedreview];
        updatedMarkedReview[currentoption - 1] = !updatedMarkedReview[currentoption - 1]; // Toggle the current question review status
        setMarkedreview(updatedMarkedReview);
    };

    const handleSubmit = () => {
        alert("Submit jawaban berhasil!");
    };


    return (
        <div className="min-h-screen flex flex-col p-6 bg-white font-sans">
            {/* Header */}
            <div className="w-full bg-[#0B61AA] text-white p-4 text-center flex items-center" style={{ height: '70px' }}>
                <button className="block md:block lg:hidden text-white bg-red-500 px-4 py-2 rounded-lg" 
                onClick={() => setShowNav(!showNav)}>
                    {showNav ? 'Tutup Menu' : 'Menu'}
                </button>
                <h1 className="text-3xl font-bold ml-4">EtamTest</h1>
            </div>
            
            {/* Navigasi untuk mobile */}
            {showNav && (
                <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 lg:hidden" />
            )}
            {showNav && (
                <div className="fixed inset-y-0 left-0 bg-[#fff] z-50 flex flex-col lg:hidden ">
                    <div className=" p-6 flex justify-between items-center">
                        <button 
                            className="text-red-500 bg-[#F3F3F3] px-2 py-1 rounded"
                            onClick={() => setShowNav(false)}>
                            Tutup
                        </button>
                    </div>
                    <div className="mt-2 bg-[#F3F3F3] rounded-[20px] shadow-lg p-2 mx-4">
                        <div className="bg-[#0B61AA] p-2 rounded-[10px]" style={{ height: '50px' }}></div>
                        <div className="p-2 flex-grow">
                            <div className="grid grid-cols-5 gap-1">
                                {Array.from({ length: totalQuestions }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`w-8 h-8 text-lg font-bold rounded border border-[#0B61AA] ${markedreview[i] ? 'bg-yellow-500 text-white' : 'bg-gray-200'} hover:bg-gray-300`}
                                        onClick={() => setCurrentoption(i + 1)}
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
            <div className="flex flex-col lg:flex-row mt-6 lg:space-x-6 rounded-[15px]">
                <div className="w-full lg:w-3/4 bg-[#0B61AA] p-6 sm:p-4 rounded-lg shadow-lg" style={{ maxWidth: '994x', height: 'auto' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className=" lg:text-lg md:text-lg text-xs font-bold text-white ">Soal CPNS - High Level</h2>
                        <div className="flex items-center justify-center space-x-2 flex-grow">
                            <p className="text-white font-bold lg:text-lg md:text-lg text-sm">{currentoption}/{totalQuestions}</p>
                        </div>
                        <div className="bg-[#0B61AA] text-white px-4 sm:px-2 py-2 sm:py-1 rounded-[10px] border border-white font-bold lg:text-lg md:text-lg text-xs">00:00:00</div>
                    </div>

                    {/* Question */}
                    <div className="mb-6 sm:mb-4 bg-white p-4 sm:p2 rounded-[15px] shadow">
                        {/* Soal */}
                        <div className="bg-white p-4 sm:p2 mb-4 rounded-lg shadow-lg">
                            <p className="text-lg mb-6 sm:mb-4">
                            Dalam penyusunan kebijakan publik, prinsip "checks and balances" sangat penting untuk memastikan 
                            bahwa kekuasaan tidak terpusat pada satu pihak. Prinsip ini terutama diterapkan dalam hubungan 
                            antara lembaga eksekutif, legislatif, dan yudikatif. Manakah dari pilihan berikut yang merupakan 
                            contoh penerapan prinsip "checks and balances" di Indonesia?
                            </p>
                        </div>

                        {/* Jawaban */}
                        <div className="mb-4 sm:mb-2 bg-white p-4 sm:p-2 rounded-lg shadow-lg">
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
                        <div className="mb-4 sm:mb-2 bg-white p-4 sm:p-2 rounded-lg shadow-lg">
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
                        <div className="mb-4 sm:mb-2 bg-white p-4 sm:p-2 rounded-lg shadow-lg">
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
                        <div className="mb-4 sm:mb-2 bg-white p-4 sm:p-2 rounded-lg shadow-lg">
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
                                        className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700"
                                        style={{ height: '40px', flex: '1', marginRight: '8px' }}
                                        onClick={handleprevquestion}
                                        disabled={currentoption === 1} // Disable if first question
                                    >
                                        Soal sebelumnya
                                    </button>
                                    <button
                                    className={`bg-[#F8B75B] text-black px-4 py-2 rounded-[15px] hover:bg-yellow-500 mb-2 md:mb-0 md:mx-4 flex-1  ${markedreview[currentoption - 1] ? 'bg-yellow-500' : ''} md:block hidden`}
                                    style={{ height: '40px', width: '100%', maxWidth: '200px', margin: '0 auto' }}
                                    onClick={handlemarkreview}
                                    >
                                        Ragu-Ragu
                                    </button>
                                    {currentoption === totalQuestions ? (
                                        <button
                                            className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700 mb-2 md:mb-0 md:ml-4 flex-1"
                                            style={{ height: '40px' }}
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    ) : (
                                        <button
                                                className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700"
                                                style={{ height: '40px',flex: '1', marginLeft: '8px' }}
                                                onClick={handlenextquestion}
                                            >
                                                Soal Selanjutnya
                                            </button>
                                        )}
                                </div>
                                <div className=" block md:hidden w-full">
                                    <button
                                        className={`bg-[#F8B75B] text-black px-4 py-2 rounded-[15px] hover:bg-yellow-500 w-full ${markedreview[currentoption - 1] ? 'bg-yellow-500' : ''}`}
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
                        <div className="grid grid-cols-5 gap-2">
                            {Array.from({ length: totalQuestions }, (_, i) => (
                                <button
                                    key={i + 1}
                                    className={`w-10 h-10 text-lg font-bold rounded border border-[#0B61AA] ${markedreview[i] ? 'bg-yellow-500 text-white' : 'bg-gray-200'} hover:bg-gray-300`}
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
    );
};

export default MengerjakanTes;
