'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import sanitizeHtml from 'sanitize-html';
import Link from 'next/link';

const MembuatSoal = () => {
  const [testId, setTestId] = useState('');
  const [question, setQuestion] = useState('');
  const [number, setNumber] = useState('');
  const [questionPhoto, setQuestionPhoto] = useState('');
  const [weight, setWeight] = useState('');
  const [discussion, setDiscussion] = useState('');
  const [options, setOptions] = useState([{ optionDescription: '', isCorrect: false }]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [labelCount, setlabelCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const addOption = () => {
    setOptions([...options, { optionDescription: '', isCorrect: false }]);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const cleanHtml = (html) => {
    return sanitizeHtml(html, {
      allowedTags: [], // Kosongkan jika tidak ingin ada tag
      allowedAttributes: {},
    });
  };

  const [jawabanBenar, setJawabanBenar] = useState(null);

const handleJawabanBenarChange = (index) => {
  setJawabanBenar(index);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      testId: 'cm1rb82i20002atqkcil4ub2z',
      questions: [
        {
          question: cleanHtml(question), // Ambil dari input
          number: parseInt(number), // Pastikan menjadi integer
          questionPhoto: questionPhoto || "",
          weight: parseInt(weight), // Pastikan menjadi integer
          discussion: cleanHtml(discussion), // Ambil dari input
          options 
        }
      ]
    };

    console.log(JSON.stringify(data, null, 2));

    try {
      const response = await fetch('http://localhost:2000/multiplechoice/add-questions', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        console.error('Failed to submit:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
    <div className="container mx-auto p-0" style={{ maxWidth: '1440px' }}>
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

      <div className="container mx-auto lg: p-2 p-4 w-full" style={{ maxWidth: '1309px' }}>
        <header className='bg-[#0B61AA] font-bold font-poppins text-white p-4'>
          <div className="flex items-center justify-between">
            <span>Tes Potensi Skolastik {labelCount}</span>
          </div>
        </header>

        <div className="bg-[#FFFFFF] border border-black p-4 rounded-lg shadow-md w-full mb-6 " >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="number">Nomor 1</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value )}
                required
                
              />
            </div>
            <div className='m'>
              <div className='border border-black bg-[#D9D9D9] p-2 rounded mb-4' style={{ maxWidth: '1309px', height: '250px' }}>
                <div className='p-4 flex justify-between items-center mb-0.5 w-full'>
                  <div className='flex items-center'>
                    <label className="block mb-2">Soal Pilihan Ganda</label>
                  </div>
                  <div className='flex items-center'>
                    <label className="font-medium-bold mr-2">Bobot</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                </div>
                <ReactQuill 
                value={question} 
                onChange={setQuestion} 
                modules={modules}
                placeholder='Anda sekarang harus mengerjakan soal Tes CPNS'
                className='bg-white shadow-md rounded-md border border-gray-500'
                style={{ maxWidth: '1220px', height: '150px', overflow: 'hidden' }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Unggah Photo Soal</label>
              <input
                type="file"
                value={questionPhoto}
                onChange={(e) => setQuestionPhoto(e.target.value)}
                className="border p-2 w-full"
                accept="image/*"
              />
            </div>
            
            <div>
              <h2 className="text-lg font-semi-bold mb-2">Jawaban</h2>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <ReactQuill
                    type="text"
                    value={option.optionDescription}
                    onChange={(e) => handleOptionChange(index, 'optionDescription', e.target.value)}
                    placeholder="Tulis jawaban untuk opsi"
                    className=" w-full bg-white shadow-md rounded-md border border-gray-500"
                    theme='snow'
                    required
                  />
                  <div className="flex flex-col items-center">
                      <button
                      type="button"
                      className="flex items-center justify-between text-black font-bold px-4 rounded-[15px] border border-black space-x-2"
                    >
                      <input
                        type="radio"
                        id={`jawaban-${index}`}
                        name="jawabanBenar"
                        value={index}
                        checked={jawabanBenar === index}
                        onChange={() => handleJawabanBenarChange(index)}
                        className="w-4 h-4"
                      />
                      <span>Benar</span>
                      </button>
                    </div>
                </div>
              ))}
              <button type="button" onClick={addOption} className="bg-[#7bb3b4] hover:bg-[#8CC7C8] text-black font-bold py-2 px-4 rounded-[15px] border border-black">
                + Tambah
              </button>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Pembahasan</label>
              <ReactQuill value={discussion} 
              onChange={setDiscussion} 
              modules={modules}
              placeholder='Tulis kunci jawaban di sini...'
              className='w-full bg-white shadow-md rounded-md border border-gray-500'
              />
            </div>
            </form>
          </div>
        </div>
        <div className='mt-4 flex justify-end space-x-4 -mr-2'>
              <div className="flex justify-end space-x-2">
                  <button className="bg-[#E58A7B] border border-black px-4 py-2 hover:text-white font-poppins rounded-[15px]">Hapus</button>
              </div>
              <div className="flex justify-end space-x-2">
                  <button type="submit" className="bg-[#E8F4FF] border border-black px-4 py-2 hover:text-white font-poppins rounded-[15px]">Simpan</button>
              </div>  
            </div>
      </div>
  );
};

export default MembuatSoal;