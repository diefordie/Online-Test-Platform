'use client';
import React, { useState, useEffect } from 'react';

const AuthorPilgan = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentOption, setCurrentOption] = useState(1);
    const [markedReview, setMarkedReview] = useState([]);
    const [resultId, setResultId] = useState(null);
    const [answers, setAnswers] = useState({});
    const [title, setTitle] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik16djhXRXByWW5oRWpGTDh5UVFkOTU1eDZpbzIiLCJlbWFpbCI6ImFycnJAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjgzMTQyMTEsImV4cCI6MTcyODMxNzgxMX0.1V_hWPtD1UBHH7QulWk4zTxKwN3R7qVxhDRLKgKe0E8';
    const testId = 'cm1rbf0ko000awadmnc0aq289';

    // Fetch questions and answers from the backend on load
    useEffect(() => {
        const fetchQuestionsAndAnswers = async () => {
            try {
                // Fetch questions and answers from backend
                const response = await fetch(`http://localhost:2000/api/tests/get-test/${testId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Gagal mengambil data test');

                const data = await response.json();
                const { title: testTitle, multiplechoice, resultId, answers: draftAnswers } = data.data;

                // Set title, questions, and resultId in state
                setTitle(testTitle);
                setResultId(resultId || null);

                // Format questions
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

                // Format answers from backend and store them in `answers` state
                if (draftAnswers) {
                    const formattedAnswers = draftAnswers.reduce((acc, answer) => {
                        acc[answer.questionId] = { optionId: answer.optionId, optionLabel: answer.userAnswer };
                        return acc;
                    }, {});
                    setAnswers(formattedAnswers); // Save the draft answers to state

                    // Set the selected option based on the current question
                    const currentQuestionId = formattedQuestions[currentOption - 1]?.id;
                    if (currentQuestionId && formattedAnswers[currentQuestionId]) {
                        setSelectedOption(formattedAnswers[currentQuestionId].optionLabel); // Set previously selected option
                    }
                }
            } catch (error) {
                console.error('Gagal mengambil data soal atau draft jawaban:', error);
            }
        };

        fetchQuestionsAndAnswers();
    }, [testId, currentOption]);

    // Save new draft answers
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

    // Handle option selection
    const handleOption = async (optionId, optionLabel, question) => {
        setSelectedOption(optionLabel);  // Set selected option
    
        const previousAnswer = answers[question.id];
    
        // Jika jawaban sudah ada (soal sudah pernah dijawab sebelumnya)
        if (previousAnswer) {
            // Cek apakah jawaban yang dipilih berbeda dari sebelumnya
            if (previousAnswer.optionId !== optionId || previousAnswer.optionLabel !== optionLabel) {
                if (resultId) {
                    try {
                        // Panggil updateDraftAnswer untuk memperbarui jawaban di backend
                        await updateDraftAnswer(resultId, previousAnswer.optionId, optionId, optionLabel);
    
                        // Perbarui jawaban di state `answers`
                        setAnswers((prevAnswers) => ({
                            ...prevAnswers,
                            [question.id]: { optionId, optionLabel },
                        }));
                        console.log('Jawaban berhasil diperbarui');
                    } catch (error) {
                        console.error('Gagal memperbarui draft:', error);
                    }
                } else {
                    console.error('Result ID belum tersedia untuk memperbarui jawaban');
                }
            }
        } else {
            // Jika tidak ada jawaban sebelumnya, simpan sebagai draft baru
            if (resultId) {
                try {
                    await updateDraftAnswer(resultId, null, optionId, optionLabel);  // `null` untuk oldOptionId karena tidak ada jawaban lama
                    setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [question.id]: { optionId, optionLabel },
                    }));
                    console.log('Jawaban berhasil disimpan sebagai update pertama kali');
                } catch (error) {
                    console.error('Gagal memperbarui draft:', error);
                }
            } else {
                // Simpan draft baru
                saveDraftAnswer(testId, optionId, optionLabel)
                    .then((newResultId) => {
                        setResultId(newResultId);  // Simpan resultId yang baru
                        setAnswers((prevAnswers) => ({
                            ...prevAnswers,
                            [question.id]: { optionId, optionLabel },  // Simpan jawaban baru
                        }));
                        console.log('Jawaban disimpan sebagai draft baru');
                    })
                    .catch((error) => console.error('Gagal menyimpan draft:', error));
            }
        }
    };
    
    

    // Handle moving to the next question
   // Handle moving to the next question
// Handle moving to the next question
const handlenextquestion = () => {
    // Pindahkan ke soal berikutnya tanpa memanggil update
    setCurrentOption((prev) => prev + 1);

    // Ambil id soal berikutnya
    const nextQuestionId = questions[currentOption]?.id;

    // Jika jawaban untuk soal berikutnya sudah ada, set jawaban sebagai terpilih
    if (answers[nextQuestionId]) {
        setSelectedOption(answers[nextQuestionId].optionLabel);
    } else {
        // Jika tidak ada jawaban sebelumnya, kosongkan selectedOption
        setSelectedOption(null);
    }
};

// Handle moving to the previous question
const handleprevquestion = () => {
    // Pastikan tidak pindah ke soal sebelum soal pertama
    if (currentOption > 1) {
        // Pindahkan ke soal sebelumnya tanpa memanggil update
        setCurrentOption((prev) => prev - 1);

        // Ambil id soal sebelumnya
        const prevQuestionId = questions[currentOption - 2]?.id;

        // Jika jawaban untuk soal sebelumnya sudah ada, set jawaban sebagai terpilih
        if (answers[prevQuestionId]) {
            setSelectedOption(answers[prevQuestionId].optionLabel);
        } else {
            // Jika tidak ada jawaban sebelumnya, kosongkan selectedOption
            setSelectedOption(null);
        }
    }
};



    // Handle marking a question for review
    const handlemarkreview = () => {
        if (!markedReview.includes(currentOption)) {
            setMarkedReview((prev) => [...prev, currentOption]);
        } else {
            setMarkedReview((prev) => prev.filter((q) => q !== currentOption));
        }
    };

    const currentQuestion = questions.length > 0 ? questions[currentOption - 1] : null;

    return (
        <div className="min-h-screen flex flex-col p-6 bg-white font-sans">
            <div className="w-full bg-[#0B61AA] text-white p-4 text-center" style={{ maxWidth: '1440px', height: '70px' }}>
                <h1 className="text-3xl font-bold">EtamTest</h1>
            </div>

            <div className="flex flex-col lg:flex-row mt-6 lg:space-x-6 rounded-[15px]">
                <div className="w-full lg:w-3/4 bg-[#0B61AA] p-6 rounded-lg shadow-lg" style={{ maxWidth: '994px', height: '784px' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">{title}</h2>
                        <p className="text-white font-bold">{currentOption}/{questions.length}</p>
                        <div className="bg-[#0B61AA] text-white px-4 py-2 rounded-[10px] border border-white font-bold">00:00:00</div>
                    </div>

                    {currentQuestion && (
                        <div className="mb-6 bg-white p-4 rounded-[15px] shadow">
                            <div className="bg-white p-4 mb-4 rounded-lg shadow-lg">
                                <p className="text-lg mb-6">{currentQuestion.questionText}</p>
                            </div>
                            {currentQuestion.options.map((option) => (
                                <div key={option.id} className="mb-4 bg-white p-4 rounded-lg shadow-lg">
                                    <input
                                        type="radio"
                                        id={`option${option.label}`}
                                        name="option"
                                        value={option.label}
                                        checked={selectedOption === option.label} // Set checked based on selectedOption
                                        onChange={() => handleOption(option.id, option.label, currentQuestion)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`option${option.label}`} className="text-lg">{`${option.label}`}</label>
                                </div>
                            ))}
                        </div>
                    )}

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

                <div className="w-full lg:w-1/4 mt-6 lg:mt-0 bg-[#F3F3F3] rounded-[20px] shadow-lg">
                    <div className="bg-[#0B61AA] p-4 rounded-[10px]" style={{ height: '50px' }}></div>
                    <div className="p-6">
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((_, i) => (
                                <button
                                    key={i + 1}
                                    className={`w-10 h-10 text-lg font-bold rounded border border-[#0B61AA] 
                                    ${markedReview.includes(i + 1) ? 'bg-yellow-500 text-white' : 'bg-gray-200'}
                                    ${currentOption === i + 1 ? 'bg-blue-500 text-white' : ''}`}
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
