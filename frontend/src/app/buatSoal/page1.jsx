'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';

const FIXCREATE = () => {
  const [questions, setQuestions] = useState([{
    question: '',
    weight: 10,
    answers: [''],
    explanations: [''],
    correctAnswerIndex: null,
    shuffleOptions: false
  }]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [labelCount, setlabelCount] = useState(1);

  const handleSave = () => {
    console.log(questions);
  };

  const handleCancel = () => {
    setQuestions([{
      question: '',
      weight: 10,
      answers: [''],
      explanations: [''],
      correctAnswerIndex: null,
      shuffleOptions: false
    }]);
    setCurrentPage(0);
    setTotalPages(1);
  };

  const handleLabel = () => {
    setlabelCount(labelCount+1);
    setCurrentPage(0);
  }

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const handleExplanationChange = (questionIndex, explanationIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].explanations[explanationIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerAdd = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push('');
    // newQuestions[questionIndex].explanations.push('');
    setQuestions(newQuestions);
  };

  const handleAnswerRemove = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    newQuestions[questionIndex].explanations.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  const handleAddPage = () => {
    const newQuestions = [...questions, {
      question: '',
      weight: 10,
      answers: [''],
      explanations: [''],
      correctAnswerIndex: null,
      shuffleOptions: false
    }];
    setQuestions(newQuestions);
    setTotalPages(totalPages + 1);
    setCurrentPage(totalPages);
  };

  const handlePageChange = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);


  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ header: [1, 2, 3, false] }],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <>
      <div className="container mx-auto p-4" style={{ maxWidth: '1440px' }}></div>

      {/* Header dengan Warna Biru Kustom */}
      <header className="bg-[#0B61AA] text-white p-4 sm:p-6 font-poppins" style={{ maxWidth: '1440px', height: '108px' }}>
        <div className="container mx-auto flex justify-start items-center p-0">
          <Link href="/">
            <img src="/img/menu.png" alt="Menu" className="h-7" style={{ maxWidth: '69px', height: '70px' }} />
          </Link>
          <Link href="/">
            <img src="/img/Vector.png" alt="Vector" className="h-6 ml-4" style={{ maxWidth: '279px', height: '50px' }} />
          </Link>
        </div>
      </header>

      {/* Header Baru dengan Tombol */}
      <header className="bg-white text-black-500 p-1 sm:p-2" style={{ maxWidth: '1440px', height: '71px' }}>
      <div className="container mx-auto flex justify-start items-center p-4">
        {/* Navigation Bar */}
        <nav className="flex w-full justify-start space-x-4">
          <Link href="/Buat Soal" legacyBehavior>
            <a className="w-[120px] h-[40px] text-center font-bold font-poppins mb-0.5 
              hover:bg-[#CAE6F9] hover:text-black bg-white text-black rounded-full border border-white 
              shadow-lg transition-all duration-300 flex items-center justify-center">
              Buat Soal
            </a>
          </Link>
          <Link href="/Publikasi" legacyBehavior>
            <a className="w-[120px] h-[40px] text-center font-bold font-poppins mb-0
              hover:bg-[#CAE6F9] hover:text-black bg-white text-black rounded-full border border-white 
              shadow-lg transition-all duration-300 flex items-center justify-center">
              Publikasi
            </a>
          </Link>
        </nav>
      </div>
    </header>


      {/* Formulir Buat Pertanyaan */}
      <div className="container mx-auto p-2 sm:p-4 w-full" style={{ maxWidth: '1309px', height: '1153px' }}>
      <header className='bg-[#0B61AA] font-bold font-poppins text-white p-4'>
        <div className="flex items-center justify-between">
          <span>Tes Potensi Skolastik {labelCount}</span>
          
          <div className="relative inline-block">
      {/* Button */}
      <button
        className="w-14 h-14 text-white  rounded-full flex items-center justify-center cursor-pointer border-none"
        onClick={() => setDropdownOpen(prev => !prev)}
      >
        <span className="text-3xl">:</span> {/* Simbol dua titik */}
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-10 p-1
          before:content-[''] before:absolute before:-top-4 before:right-5 before:border-8
          before:border-transparent before:border-b-white"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link href="/profile-edit" legacyBehavior>
            <a className="block px-4 py-2 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md border-abumuda">
              Rename
            </a>
          </Link>
          <Link href="/logout" legacyBehavior>
            <a className="block px-4 py-2 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md">
              Delete page
            </a>
          </Link>
        </div>
      )}
    </div>
    </div>
        </header>
        <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md w-full mb-6 " style={{height:''} }>
          <span> Nomor {currentPage + 1} </span>

          {/* Navigasi Halaman */}
          {/* <div className="flex justify-between mb-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Next
            </button>
          </div> */}

          {questions.map((q, questionIndex) => (
            <div key={questionIndex} className={`bg-[#FFFFFF] p-4 rounded-lg shadow-md  mb-6 ${questionIndex !== currentPage ? 'hidden' : ''}`}>
              {/* Input Pertanyaan dengan ReactQuill */}
              <div className="m">
                <div className="border border-black bg-[#D9D9D9] p-2 rounded mb-4" style={{ maxWidth: '1309px', height: '250px' }}>
                  {/* Bobot */}
                  <div className="p-4 flex justify-between items-center mb-0.5 w-full">
                    <div className="flex items-center">
                    <Link href="/Soal Pilihan Ganda" legacyBehavior>
                        <a className="hover:text-orange font-medium-bold font-poppins ">Soal pilihan ganda</a>
                    </Link>
                    </div>
                    <div className="flex items-center ">
                    <Link href="/Bobot" legacyBehavior>
                        <a className="hover:text-orange font-poppins mb-0 mr-2 ">Bobot</a>
                    </Link>
                      <input
                        type="number"
                        value={q.weight}
                        onChange={(e) => handleQuestionChange(questionIndex, 'weight', Number(e.target.value))}
                        className="w-20 sm:w-16 p-2 border border-black rounded ml-2 align-middle"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  {/* Input Pertanyaan */}
                  <ReactQuill
                    value={q.question}
                    onChange={(value) => handleQuestionChange(questionIndex, 'question', value)}
                    modules={modules}
                    theme="snow"
                    className="bg-[#fcfafa] border border-black rounded"
                    style={{ maxWidth: '1220px', height: '150px', overflow:'hidden' }}
                    placeholder='Anda sekarang harus mengerjakan soal Tes CPNS'
                  />
                </div>
              </div>

              {/* Acak Pilihan */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <Link href="/Jawaban" legacyBehavior>
                    <a className="hover:text-orange font-medium-bold font-poppins mb-0 p-1 ">Jawaban</a>
                </Link>
                <div className="flex items-center ml-auto p-2 space-x-2">
                <Link href="/Acak pilihan" legacyBehavior>
                    <a className="hover:text-orange font-medium-bold font-poppins mb-0 ">Acak pilihan</a>
                </Link>
                  <input
                    type="checkbox"
                    checked={q.shuffleOptions}
                    onChange={() => handleQuestionChange(questionIndex, 'shuffleOptions', !q.shuffleOptions)}
                    className="ml-2"
                  />
                </div>
              </div>

              {/* Input Jawaban */}
              <div className="mb-4 space-y-4">
                {q.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="flex space-x-4 items-center">
                    <div className="w-full">
                      <ReactQuill
                        value={answer}
                        onChange={(value) => handleAnswerChange(questionIndex, answerIndex, value)}
                        modules={modules}
                        theme="snow"
                        className="bg-[#fcfafa] border border-black rounded"
                      />
                    </div>
                    <div className="border border-black rounded-[15px] p-2 flex items-center space-x-2 bg-white">
                      <input
                        type="radio"
                        name={`correctAnswer-${questionIndex}`}
                        checked={q.correctAnswerIndex === answerIndex}
                        onChange={() => handleQuestionChange(questionIndex, 'correctAnswerIndex', answerIndex)}
                      />
                      <Link href="/Benar" legacyBehavior>
                          <a className="hover:text-orange font-bold font-poppins text-sm mb-0 ">Benar</a>
                      </Link>
                    </div>
                    <button onClick={() => handleAnswerRemove(questionIndex, answerIndex)} className="border-0 bg-transparent p-0">
                      <img src="/img/cancel.png" alt="cancel" className="h-7" style={{ maxWidth: '130px', height: '20px' }} />
                    </button>
                  </div>
                ))}
                <div className="flex flex-col space-y-4 mt-4">
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => handleAnswerAdd(questionIndex)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                      <img src="/img/Group 266.png" alt="Tambah" className="h-8" />
                      <span>Tambah Jawaban</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Input Pembahasan */}
              <div className="mb-4 space-y-4">
                {q.explanations.map((explanation, explanationIndex) => (
                  <div key={explanationIndex} className="flex space-x-4 mb-4 items-center">
                    <div className="w-full">
                      <Link href="/Pembahasan" legacyBehavior>
                          <a className="hover:text-orange font-medium-bold font-poppins mb-2 ">Pembahasan</a>
                      </Link>
                      <ReactQuill
                        value={explanation}
                        onChange={(value) => handleExplanationChange(questionIndex, explanationIndex, value)}
                        modules={modules}
                        theme="snow"
                        className="bg-[#fcfafa] border border-black rounded mt-4"
                      />
                    </div>
                    <div className='w-[135px]'></div>
                  </div>
                ))}
              </div>
            </div>
            
          ))}

          {/* Tombol Simpan, Batal, dan Tambah Soal */}
          <div className="flex flex-col space-y-4">
          <div className="flex justify-end mt-4 space-x-2 mr-4">
            <Link href="/hapus" legacyBehavior>
                <a className='bg-[#E58A7B] border border-black flex items-center space-x-2 px-4 py-2 hover:text-white font-poppins rounded-[15px]'> 
                  Hapus</a>
            </Link>
            <div className="flex justify-end space-x-2 mr-4">
            <Link href="/simpan" legacyBehavior>
                <a className='bg-[#E8F4FF] border border-black flex items-center space-x-2 px-4 py-2 hover:text-white font-poppins rounded-[15px]'> 
                  Simpan</a>
            </Link>
          </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FIXCREATE;