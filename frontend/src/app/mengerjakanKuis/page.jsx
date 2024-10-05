'use client'
import React, { useState, useEffect } from "react";

const AuthorPilgan = () => {
    const [questions, setQuestions] = useState([]); // State untuk soal
    const [selectedoption, setSelectedoption] = useState(null);
    const [currentoption, setCurrentoption] = useState(1);
    const [markedreview, setMarkedreview] = useState([]);
    const [resultId, setResultId] = useState(); // ID result untuk update draft
    const [answers, setAnswers] = useState({});
    const [title, setTitle] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik16djhXRXByWW5oRWpGTDh5UVFkOTU1eDZpbzIiLCJlbWFpbCI6ImFycnJAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mjc5NzE2NDcsImV4cCI6MTcyNzk3NTI0N30.g4FR7unXgd0Qugm1GefeocxJwMRUeHbkgLZ2Lb4rH2M'; // Sesuaikan token Anda di sini
    const testId = 'cm1rbf0ko000awadmnc0aq289'; // Sesuaikan `testId` dengan nilai sebenarnya

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
                setResultId(data.data.resultId || null); // Jika `resultId` ada di respons, simpan di state
            } catch (error) {
                console.error('Gagal mengambil data soal:', error);
            }
        };
        fetchQuestions();
    }, [testId]);

    
    

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

    const saveDraftAnswer = async (testId, optionId, selectedOption) => {
        try {
            const response = await fetch(`http://localhost:2000/api/tests/${testId}/temp`, {
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
                throw new Error('Gagal menyimpan draft jawaban');
            }
    
            const data = await response.json();
            console.log('Response dari saveDraftAnswer:', data); // Cek apakah resultId tersedia di respons
            return data.resultId; // Pastikan resultId dikembalikan
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };
    
    

    // Fungsi untuk memperbarui draft jawaban
    const updateDraftAnswer = async (resultId, optionId, newAnswer) => {
        try {
            const response = await fetch(`http://localhost:2000/api/tests/${testId}/updateTemp`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    resultId,
                    optionId,
                    newAnswer,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal memperbarui draft jawaban');
            }
    
            const responseData = await response.json();
            console.log('Jawaban berhasil diperbarui:', responseData.message);
            console.log('Result ID dari respons:', responseData.resultId); // Cek apakah resultId dikembalikan dengan benar
            
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    };
    
    

    const handleoption = (optionId, optionLabel, question) => {
        setSelectedoption(optionLabel);
    
        // Cek jika jawaban sudah pernah disimpan sebelumnya
        if (!answers[question.id]) {
            // Jika jawaban belum pernah disimpan, simpan sebagai draft
            saveDraftAnswer(question.testId, optionId, optionLabel)
                .then((newResultId) => {
                    // Simpan resultId ke state setelah draft berhasil disimpan
                    setResultId(newResultId); 
    
                    // Setelah menyimpan draft dan resultId, simpan jawaban di state answers
                    setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [question.id]: { optionId, optionLabel },
                    }));
    
                    // Setelah state resultId di-set, panggil updateDraftAnswer jika diperlukan
                    if (newResultId) {
                        updateDraftAnswer(newResultId, optionId, optionLabel)
                            .then(() => {
                                console.log('Jawaban berhasil diupdate setelah menyimpan resultId');
                            })
                            .catch((error) => console.error('Gagal memperbarui draft setelah menyimpan resultId:', error));
                    }
                })
                .catch((error) => console.error('Gagal menyimpan draft:', error));
        } else {
            const previousAnswer = answers[question.id];
    
            // Jika jawaban sudah ada dan berbeda, lakukan update
            if (previousAnswer.optionId !== optionId) {
                if (resultId) {
                    updateDraftAnswer(resultId, optionId, optionLabel)
                        .then(() => {
                            setAnswers((prevAnswers) => ({
                                ...prevAnswers,
                                [question.id]: { optionId, optionLabel },
                            }));
                        })
                        .catch((error) => console.error('Gagal memperbarui draft:', error));
                } else {
                    console.error('Result ID belum tersedia untuk memperbarui jawaban');
                }
            }
        }
    };
    
    

    // Fungsi untuk berpindah ke soal selanjutnya
    const handlenextquestion = () => {
        // Berpindah ke soal berikutnya
        setCurrentoption((prev) => prev + 1);
        // Set jawaban yang sudah disimpan sebelumnya jika ada
        setSelectedoption(answers[questions[currentoption]?.id] || null);
    };

    // Fungsi untuk berpindah ke soal sebelumnya
    const handleprevquestion = () => {
        if (currentoption > 1) {
            setCurrentoption((prev) => prev - 1);
            // Set jawaban yang sudah disimpan sebelumnya jika ada
            setSelectedoption(answers[questions[currentoption - 2]?.id] || null);
        }
    };

    // Fungsi untuk menandai soal yang perlu ditinjau
    const handlemarkreview = () => {
        if (!markedreview.includes(currentoption)) {
            setMarkedreview((prev) => [...prev, currentoption]);
        }
    };

    // Pastikan untuk hanya mengambil `currentQuestion` jika `questions` memiliki elemen
    const currentQuestion = questions.length > 0 ? questions[currentoption - 1] : null;

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
                        <p className="text-white font-bold">{currentoption}/{questions.length}</p>
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
                                        checked={selectedoption === option.label}
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
                                    className={`w-10 h-10 text-lg font-bold rounded border border-[#0B61AA] ${markedreview.includes(i + 1) ? 'bg-yellow-500 text-white' : 'bg-gray-200'} hover:bg-gray-300`}
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

export default AuthorPilgan;
