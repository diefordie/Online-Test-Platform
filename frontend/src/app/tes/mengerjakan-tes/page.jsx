'use client'
import React, { useState, useEffect } from "react";

const AuthorPilgan = () => {
    const [questions, setQuestions] = useState([]); // State untuk soal
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentOption, setCurrentOption] = useState(1);
    // const [question, setCurrentQuestion] = useState(1);
    const [markedReview, setMarkedReview] = useState([]);
    const [resultId, setResultId] = useState(); // ID result untuk update draft
    const [answers, setAnswers] = useState({});
    const [title, setTitle] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNkYUFxT1NPcTZmUzF3ell2NHViUTdrM01lejIiLCJlbWFpbCI6InVzZXIwNEBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyODMwMDk3MiwiZXhwIjoxNzI4MzA0NTcyfQ.9ywNsc3ue9rrQq9oBZaRkLtL1nfGy1VU-fX9Zyz_3aM'; // Sesuaikan token Anda di sini
    const testId = 'cm1ta40xn0002lpkmiv6wy0nv'; // Sesuaikan `testId` dengan nilai sebenarnya

    //Fetch data soal saat komponen dimuat
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:2000/api/tests/get-test/${testId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Gagal mengambil data test');
                }

                const data = await response.json();
                const { title: testTitle, multiplechoice } = data.data;

                // Menyimpan judul test di state
                setTitle(testTitle);

                // Menyesuaikan struktur data soal dengan format yang dapat digunakan
                const formattedQuestions = multiplechoice.map((question) => ({
                    id: question.id,
                    questionText: question.question,
                    testId: testId,
                    options: question.option.map((opt) => ({
                        id: opt.id,
                        label: opt.optionDescription, // Gunakan `optionDescription` sebagai label yang ditampilkan
                        value: opt.optionDescription, // Gunakan `optionDescription` sebagai value yang disimpan
                    })),
                }));

                setQuestions(formattedQuestions); // Mengisi state `questions` dengan data yang terformat
                setResultId(data.resultId || null); // Jika `resultId` ada di respons, simpan di state
            } catch (error) {
                console.error('Gagal mengambil data soal:', error);
            }
        };
        fetchQuestions();
    }, [testId]);

    const saveDraftAnswer = async (testId, optionId, selectedOption) => {
        try {
            const response = await fetch(`http://localhost:2000/answer/tests/${testId}/temp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    testId,
                    answers: [{ optionId, selectedOption }],
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response dari server:', errorData);
                throw new Error('Gagal menyimpan draft jawaban');
            }
    
            const data = await response.json();
            console.log('Response dari saveDraftAnswer:', data);
            return data.resultId; // Pastikan resultId dikembalikan
        } catch (error) {
            console.error('Kesalahan saat memperbarui draft jawaban:', error);
            throw new Error(`Gagal memperbarui draft jawaban: ${error.message}`);
        }
        
    };
    
    // Fungsi untuk memperbarui draft jawaban
    const updateDraftAnswer = async (resultId, optionId, newAnswer) => {
        console.log('testId:', testId);
        try {
            // Log resultId dan optionId sebelum pengiriman
            console.log('Sending resultId:', resultId);
            console.log('Sending optionId:', optionId);
            console.log('Sending newAnswer:', newAnswer);
    
            const response = await fetch(`http://localhost:2000/answer/tests/${testId}/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    resultId,
                    oldOptionId: optionId, // Ini adalah optionId yang ingin Anda ganti
                    newOptionId: optionId,  // Pastikan ini adalah optionId baru jika diperlukan
                    newAnswer: String(newAnswer), // Pastikan newAnswer dikonversi menjadi string
                }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal memperbarui draft jawaban');
            }
    
            const responseData = await response.json();
            console.log('Jawaban berhasil diperbarui:', responseData.message);
            console.log('Result ID dari respons:', responseData.resultId);
    
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    };
    
    const handleoption = async (optionId, optionLabel, question) => {
        setSelectedOption(optionLabel);
    
        // Check if the answer already exists
        if (!answers[question.id]) {
            try {
                const newResultId = await saveDraftAnswer(question.testId, optionId, optionLabel);
                setResultId(newResultId);
    
                // Update the answer state with the new answer
                setAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [question.id]: { optionId, optionLabel, resultId: newResultId },
                }));
    
                if (newResultId) {
                    // Try to update the draft after saving
                    await updateDraftAnswer(newResultId, optionId, optionLabel);
                }
            } catch (error) {
                console.error('Error saving answer:', error);
            }
        } else {
            const previousAnswer = answers[question.id];
    
            // If the previous answer differs from the current, update it
            if (previousAnswer.optionId !== optionId) {
                const currentResultId = previousAnswer.resultId || resultId;
                if (currentResultId) {
                    try {
                        await updateDraftAnswer(currentResultId, previousAnswer.optionId, optionLabel);
                        setAnswers((prevAnswers) => ({
                            ...prevAnswers,
                            [question.id]: { optionId, optionLabel, resultId: currentResultId },
                        }));
                    } catch (error) {
                        console.error('Error updating answer:', error);
                    }
                } else {
                    console.error('Result ID is not available for updating the answer');
                }
            }
        }
    };
       
        // Fungsi untuk berpindah ke soal selanjutnya
    const handlenextquestion = () => {
        // Berpindah ke soal berikutnya
        setCurrentOption((prev) => prev + 1);
        // Set jawaban yang sudah disimpan sebelumnya jika ada
        setSelectedOption(answers[questions[currentOption]?.id] || null);
    };

    // Fungsi untuk berpindah ke soal sebelumnya
    const handleprevquestion = () => {
        if (currentOption > 1) {
            setCurrentOption((prev) => prev - 1);
            // Set jawaban yang sudah disimpan sebelumnya jika ada
            setSelectedOption(answers[questions[currentOption - 2]?.id] || null);
        }
    };

    // Fungsi untuk menandai soal yang perlu ditinjau
    const handlemarkreview = () => {
        if (!markedReview.includes(currentOption)) {
            setMarkedReview((prev) => [...prev, currentOption]);
        }
    };

    // Pastikan untuk hanya mengambil `currentQuestion` jika `questions` memiliki elemen
    const currentQuestion = questions.length > 0 ? questions[currentOption - 1] : null;

    return (
        <div className="min-h-screen flex flex-col p-6 bg-white font-sans">
            {/* Header */}
            <div className="w-full bg-[#0B61AA] text-white p-4 text-center" style={{ maxWidth: '1440px', height: '70px' }}>
                <h1 className="text-3xl font-bold">EtamTest</h1>
            </div>

            {/* Question and Timer section */}
            <div className="flex flex-col lg:flex-row mt-6 lg:space-x-6 rounded-[15px]">
                <div className="w-full lg:w-3/4 bg-[#0B61AA] p-6 rounded-lg shadow-lg" style={{ maxWidth: '994x', height: '784px' }}>
                    <div className="flex justify-between items-center mb-4">
                        {/* Menampilkan judul test dari state `title` */}
                        <h2 className="text-xl font-bold text-white">{title}</h2>
                        <p className="text-white font-bold">{currentOption}/{questions.length}</p>
                        <div className="bg-[#0B61AA] text-white px-4 py-2 rounded-[10px] border border-white font-bold">00:00:00</div>
                    </div>

                    {/* Pastikan untuk hanya menampilkan pertanyaan jika `currentQuestion` ada */}
                    {currentQuestion && (
                        <div className="mb-6 bg-white p-4 rounded-[15px] shadow">
                            {/* Pembungkus untuk soal dan jawaban */}
                            <div className="bg-white p-4 mb-4 rounded-lg shadow-lg">
                                <p className="text-lg mb-6">{currentQuestion.questionText}</p>
                            </div>   

                            {/* Jawaban */}
                            {currentQuestion.options.map((option) => (
                                <div key={option.id} className="mb-4 bg-white p-4 rounded-lg shadow-lg">
                                    <input
                                        type="radio"
                                        id={`option${option.label}`}
                                        name="option"
                                        value={option.label}
                                        checked={selectedOption === option.label}
                                        onChange={() => handleoption(option.id, option.label, currentQuestion)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`option${option.label}`} className="text-lg">{`${option.label}`}</label>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-between mt-6">
                        <div className="bg-white mb-4 p-4 rounded-[15px] shadow w-full">
                            <div className="flex justify-between items-center" style={{ height: '70px' }}>
                                <button
                                    className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700"
                                    style={{ height: '40px' }}
                                    onClick={handleprevquestion}
                                >
                                    Soal sebelumnya
                                </button>
                                <button
                                    className="bg-[#F8B75B] text-black px-4 py-2 rounded-[15px] hover:bg-yellow-500"
                                    style={{ height: '40px' }}
                                    onClick={handlemarkreview}
                                >
                                    Ragu-Ragu
                                </button>
                                <button
                                    className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700"
                                    style={{ height: '40px' }}
                                    onClick={handlenextquestion}
                                >
                                    Soal Selanjutnya
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Question navigation */}
                <div className="w-full lg:w-1/4 mt-6 lg:mt-0 bg-[#F3F3F3] rounded-[20px] shadow-lg">
                    <div className="bg-[#0B61AA] p-4 rounded-[10px]" style={{ height: '50px' }}></div>
                    <div className="p-6">
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((_, i) => (
                                <button
                                    key={i + 1}
                                    className={`w-10 h-10 text-lg font-bold rounded border border-[#0B61AA] ${markedReview.includes(i + 1) ? 'bg-yellow-500 text-white' : 'bg-gray-200'} hover:bg-gray-300`}
                                    onClick={() => setCurrentOption(i + 1)}
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

export default AuthorPilgan;


    

    // Fungsi untuk menyimpan draft jawaban backup
    // const saveDraftAnswer = async (testId, optionId, selectedOption) => {
    //     try {
    //         const response = await fetch(`http://localhost:2000/api/tests/${testId}/temp`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             body: JSON.stringify({
    //                 testId,
    //                 answers: [{ optionId, selectedOption }],
    //             }),
    //         });
    //         if (!response.ok) {
    //             throw new Error('Gagal menyimpan draft jawaban');
    //         }
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // };
