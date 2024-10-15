'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from "react";

const MengerjakanTes = () => {
    const { testId } = useParams(); // Ambil testId dari URL path
    const [questions, setQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentOption, setCurrentOption] = useState(1);
    const [markedReview, setMarkedReview] = useState([]);
    const [showNav, setShowNav] = useState(false);
    const [resultId, setResultId] = useState(null);
    const [answers, setAnswers] = useState({});
    const [title, setTitle] = useState('');
    const [remainingTime, setRemainingTime] = useState(0);
    const [workTime, setWorkTime] = useState(0); 
    const [timerActive, setTimerActive] = useState(false);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkJXbTg5aGpxTzhoTTE2R05YY0F5Z0RieG5pVjIiLCJlbWFpbCI6InVzZXIxNEBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyODU2OTM4OCwiZXhwIjoxNzI4NTcyOTg4fQ.bsOCRTG7Ljg6qEFzYTwRMhKMv5ghDBYWIemA_rsbr_Y'; // Ganti dengan token yang sesuai

    useEffect(() => {
        const fetchWorkTime = async () => {
            try {
                const response = await fetch(`http://localhost:2000/timer/${testId}/worktime`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch worktime');

                const data = await response.json();
                console.log('Fetched worktime:', data); // Log the full response

                const { hours, minutes, seconds } = data; // Destructure the response

                // Convert total time to seconds for remaining time calculation
                const totalWorkTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

                // Set remaining time only if it's greater than zero
                if (totalWorkTimeInSeconds > 0) {
                    setRemainingTime(totalWorkTimeInSeconds);
                    setTimerActive(true); // Activate the timer if there is time remaining
                } else {
                    setRemainingTime(0); // Ensure remainingTime is set to 0
                    alert("Waktu sudah habis!"); // Alert if the time is already zero
                }
            } catch (error) {
                console.error('Failed to fetch worktime:', error);
                alert("Gagal mengambil waktu kerja."); // Add an alert for fetch error
            }
        };

        fetchWorkTime();
    }, [testId]);

    const formatRemainingTime = (timeInSeconds) => {
        if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds) || timeInSeconds < 0) {
            return '00:00:00'; // Fallback to default format
        }

        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Format waktu yang tersisa untuk ditampilkan
    const remainingTimeFormatted = formatRemainingTime(remainingTime);

    // Timer countdown effect
    useEffect(() => {
        let timer;
        if (timerActive && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        alert("Waktu habis!"); // Show alert when time is up
                        setTimerActive(false); // Stop the timer
                        return 0; // Ensure remainingTime does not go below 0
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer); // Cleanup function
    }, [timerActive, remainingTime]);

    useEffect(() => {
        if (!testId) return; // Tunggu hingga testId tersedia dari URL path

        const fetchQuestionsAndAnswers = async () => {
            try {
                const savedResultId = localStorage.getItem('resultId');
                if (savedResultId) {
                    setResultId(savedResultId);
                    await fetchAnswersByResultId(savedResultId);
                }

                const response = await fetch(`http://localhost:2000/api/tests/get-test/${testId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Gagal mengambil data test');

                const data = await response.json();
                const { title: testTitle, multiplechoice } = data.data;
                setTitle(testTitle);

                const formattedQuestions = multiplechoice.map((question) => ({
                    id: question.id,
                    questionText: question.question,
                    options: question.option.map((opt) => ({
                        id: opt.id,
                        label: opt.optionDescription,
                        value: opt.optionDescription,
                    })),
                }));

                setQuestions(formattedQuestions);
                setMarkedReview(Array(formattedQuestions.length).fill(false));

                const currentQuestionId = formattedQuestions[currentOption - 1]?.id;
                if (currentQuestionId && answers[currentQuestionId]) {
                    setSelectedOption(answers[currentQuestionId].optionLabel);
                }
            } catch (error) {
                console.error('Gagal mengambil data soal atau jawaban:', error);
            }
        };

        fetchQuestionsAndAnswers();
    }, [testId]);

    const fetchAnswersByResultId = async (resultId) => {
        try {
            const response = await fetch(`http://localhost:2000/answer/tests/${resultId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Gagal mengambil data jawaban');

            const data = await response.json();
            const formattedAnswers = data.reduce((acc, answer) => {
                acc[answer.option.questionId] = { optionId: answer.optionId, optionLabel: answer.userAnswer };
                return acc;
            }, {});

            setAnswers(formattedAnswers);

            const currentQuestionId = questions[currentOption - 1]?.id;
            if (currentQuestionId && formattedAnswers[currentQuestionId]) {
                setSelectedOption(formattedAnswers[currentQuestionId].optionLabel);
            }
        } catch (error) {
            console.error('Kesalahan saat mengambil jawaban:', error);
        }
    };

    useEffect(() => {
        const currentQuestionId = questions[currentOption - 1]?.id;
        if (currentQuestionId && answers[currentQuestionId]) {
            setSelectedOption(answers[currentQuestionId].optionLabel);
        } else {
            setSelectedOption(null);
        }
    }, [currentOption, answers, questions]);


    const saveDraftAnswer = async (testId, optionId, selectedOption) => {
        try {
            const response = await fetch(`http://localhost:2000/answer/tests/${testId}/temp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ testId, answers: [{ optionId, selectedOption }] }),
            });

            if (!response.ok) throw new Error('Gagal menyimpan draft jawaban');

            const data = await response.json();
            return data.resultId;
        } catch (error) {
            console.error('Kesalahan saat memperbarui draft jawaban:', error);
        }
    };

    // Update existing draft answers
    const updateDraftAnswer = async (resultId, oldOptionId, newOptionId, newAnswer) => {
        try {
            console.log('Updating draft answer:', { resultId, oldOptionId, newOptionId, newAnswer });

            const response = await fetch(`http://localhost:2000/answer/tests/${testId}/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    resultId,
                    oldOptionId,
                    newOptionId,
                    newAnswer,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Response error:', errorData);
                throw new Error('Gagal memperbarui draft jawaban');
            }

            const responseData = await response.json();
            console.log('Draft updated successfully:', responseData);
            return responseData.resultId;
        } catch (error) {
            console.error('Error in updateDraftAnswer:', error.message);
        }
    };

    // Fungsi untuk submit jawaban akhir
    const submitFinalAnswers = async () => {
        try {
            // Kirim permintaan ke endpoint backend untuk submit jawaban final
            const response = await fetch(`http://localhost:2000/answer/tests/${testId}/submit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            // Cek apakah respons berhasil
            if (!response.ok) {
                throw new Error('Gagal mengirim jawaban final');
            }

            const data = await response.json();
            alert('Jawaban final berhasil dikirimkan. Skor Anda: ' + data.result.score);
        } catch (error) {
            console.error('Error saat mengirim jawaban final:', error);
            alert('Terjadi kesalahan saat mengirim jawaban final: ' + error.message);
        }
    };



    const handleOption = async (optionId, optionLabel, question) => {
        setSelectedOption(optionLabel);
        const previousAnswer = answers[question.id];
        let currentResultId = resultId || localStorage.getItem('resultId');  // Ambil resultId dari localStorage jika tidak tersedia
    
        if (previousAnswer) {
            // Jika jawaban sebelumnya ada dan jawaban baru berbeda
            if (previousAnswer.optionId !== optionId || previousAnswer.optionLabel !== optionLabel) {
                if (currentResultId) {
                    try {
                        // Memperbarui jawaban yang sudah ada dengan resultId yang valid
                        await updateDraftAnswer(currentResultId, previousAnswer.optionId, optionId, optionLabel);
                        setAnswers((prevAnswers) => ({
                            ...prevAnswers,
                            [question.id]: { optionId, optionLabel },
                        }));
                        console.log('Jawaban berhasil diperbarui');
                    } catch (error) {
                        console.error('Gagal memperbarui draft:', error);
                    }
                } else {
                    console.error('Result ID belum tersedia, tidak bisa memperbarui jawaban');
                }
            }
        } else {
            // Jika ini adalah pertama kali menjawab soal
            try {
                const newResultId = await saveDraftAnswer(testId, optionId, optionLabel);  // Menyimpan draft jawaban pertama kali
                setResultId(newResultId);  // Simpan resultId dari respons backend
                localStorage.setItem('resultId', newResultId);  // Simpan ke localStorage
                setAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [question.id]: { optionId, optionLabel },
                }));
                console.log('Jawaban disimpan sebagai draft baru dengan resultId:', newResultId);
            } catch (error) {
                console.error('Gagal menyimpan draft:', error);
            }
        }
    };
    
    

    const handlenextquestion = () => {
        if (currentOption < questions.length) {
            setCurrentOption((prev) => prev + 1);
            const nextQuestionId = questions[currentOption]?.id;
            if (answers[nextQuestionId]) {
                setSelectedOption(answers[nextQuestionId].optionLabel);
            } else {
                setSelectedOption(null);
            }
        }
    };

    const handleprevquestion = () => {
        if (currentOption > 1) {
            setCurrentOption((prev) => prev - 1);
            const prevQuestionId = questions[currentOption - 2]?.id;
            if (answers[prevQuestionId]) {
                setSelectedOption(answers[prevQuestionId].optionLabel);
            } else {
                setSelectedOption(null);
            }
        }
    };

    const handlemarkreview = () => {
        const updatedMarkedReview = [...markedReview];
        updatedMarkedReview[currentOption - 1] = !updatedMarkedReview[currentOption - 1];
        setMarkedReview(updatedMarkedReview);
    };

    // Panggil `submitFinalAnswers` ketika tombol "Submit" diklik
    const handleSubmit = async () => {
        const confirmSubmit = window.confirm('Apakah Anda yakin ingin mengirim jawaban akhir?');
        if (confirmSubmit) {
            await submitFinalAnswers();
        }
    };

    const currentQuestion = questions.length > 0 ? questions[currentOption - 1] : null;

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
                        <button className="text-red-500 bg-[#F3F3F3] px-2 py-1 rounded"
                            onClick={() => setShowNav(false)}>
                            Tutup
                        </button>
                    </div>
                    <div className="mt-2 bg-[#F3F3F3] rounded-[20px] shadow-lg p-2 mx-4">
                        <div className="bg-[#0B61AA] p-2 rounded-[10px]" style={{ height: '50px' }}></div>
                        <div className="p-2 flex-grow">
                            <div className="grid grid-cols-5 gap-1">
                                {Array.from({ length: questions.length }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`w-8 h-8 text-lg font-bold rounded border border-[#0B61AA] ${markedReview[i] ? 'bg-yellow-500 text-white' : 'bg-gray-200'} hover:bg-gray-300`}
                                        onClick={() => setCurrentOption(i + 1)}>
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
                <div className="w-full lg:w-3/4 bg-[#0B61AA] p-6 sm:p-4 rounded-lg shadow-lg" style={{ maxWidth: '994px', height: 'auto' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className=" lg:text-lg md:text-lg text-xs font-bold text-white ">{title}</h2>
                        <div className="flex items-center justify-center space-x-2 flex-grow">
                            <p className="text-white font-bold lg:text-lg md:text-lg text-sm">{currentOption}/{questions.length}</p>
                        </div>
                        <div className="bg-[#0B61AA] text-white px-4 sm:px-2 py-2 sm:py-1 rounded-[10px] border border-white font-bold lg:text-lg md:text-lg text-xs">Waktu Tersisa: {remainingTimeFormatted}</div>
                    </div>

                    {/* Soal dan Opsi */}
                    {currentQuestion && (
                        <>
                            <div className="mb-6 sm:mb-4 bg-white p-4 sm:p2 rounded-[15px] shadow">
                                <p className="text-lg mb-6 sm:mb-4">{currentQuestion.questionText}</p>
                            </div>

                            {currentQuestion.options.map((option) => (
                                <div key={option.id} className="mb-4 sm:mb-2 bg-white p-4 sm:p-2 rounded-lg shadow-lg">
                                    <input
                                        type="radio"
                                        id={option.id}
                                        name="option"
                                        value={option.value}
                                        checked={selectedOption === option.label}  // Opsi terpilih sesuai jawaban dari backend
                                        onChange={() => handleOption(option.id, option.label, currentQuestion)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={option.id} className="text-lg">{option.label}</label>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-col md:flex-row justify-between mt-6">
                        <div className="bg-white mb-4 p-4 rounded-[15px] shadow w-full">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className="flex justify-between w-full mb-2">
                                    <button
                                        className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700"
                                        style={{ height: '40px', flex: '1', marginRight: '8px' }}
                                        onClick={handleprevquestion}
                                        disabled={currentOption === 1}>
                                        Soal sebelumnya
                                    </button>
                                    <button
                                        className={`bg-[#F8B75B] text-black px-4 py-2 rounded-[15px] hover:bg-yellow-500 mb-2 md:mb-0 md:mx-4 flex-1  ${markedReview[currentOption - 1] ? 'bg-yellow-500' : ''} md:block hidden`}
                                        style={{ height: '40px', width: '100%', maxWidth: '200px', margin: '0 auto' }}
                                        onClick={handlemarkreview}>
                                        Ragu-Ragu
                                    </button>
                                    {currentOption === questions.length ? (
                                        <button
                                            className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700 mb-2 md:mb-0 md:ml-4 flex-1"
                                            style={{ height: '40px' }}
                                            onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700"
                                            style={{ height: '40px', flex: '1', marginLeft: '8px' }}
                                            onClick={handlenextquestion}>
                                            Soal Selanjutnya
                                        </button>
                                    )}
                                </div>
                                <div className=" block md:hidden w-full">
                                    <button
                                        className={`bg-[#F8B75B] text-black px-4 py-2 rounded-[15px] hover:bg-yellow-500 w-full ${markedReview[currentOption - 1] ? 'bg-yellow-500' : ''}`}
                                        style={{ height: '40px' }}
                                        onClick={handlemarkreview}>
                                        Ragu-Ragu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Question navigation */}
                <div className="hidden lg:block lg:w-1/4 mt-6 lg:mt-0 bg-[#F3F3F3] rounded-[20px] shadow-lg">
                    <div className="bg-[#0B61AA] p-4 rounded-[10px]" style={{ height: '50px' }}></div>
                    <div className="p-6">
                        <div className="grid grid-cols-5 gap-2">
                            {Array.from({ length: questions.length }, (_, i) => (
                                <button
                                    key={i + 1}
                                    className={`w-10 h-10 text-lg font-bold rounded border border-[#0B61AA] 
                                        ${markedReview[i] ? 'bg-yellow-500 text-white' : 'bg-gray-200'} 
                                        ${currentOption === i + 1 ? 'bg-[#0B61AA] text-white' : ''} 
                                        hover:bg-gray-300 transition duration-200`}
                                    onClick={() => setCurrentOption(i + 1)}
                                    aria-label={`Question ${i + 1}`}
                                    title={`Go to Question ${i + 1}`}>
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