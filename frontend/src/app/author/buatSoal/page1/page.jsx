'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MembuatSoal = () => {
  const router = useRouter();
  const [testId, setTestId] = useState('');
  const [multiplechoiceId, setMultiplechoiceId] = useState('');
  const [id, setId] = useState('');
  const [question, setQuestion] = useState('');
  const [number, setNumber] = useState('');
  const [questionPhoto, setQuestionPhoto] = useState(null);
  const [weight, setWeight] = useState();
  const [discussion, setDiscussion] = useState('');
  const [options, setOptions] = useState([{ optionDescription: '', isCorrect: false }]);
  const [pages, setPages] = useState([{ questions: [] }]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const [labelCount, setlabelCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const testIdFromUrl = params.get("testId");
    const multiplechoiceIdFromUrl = params.get("multiplechoiceId");

    console.log("Fetched testId:", testIdFromUrl); 
    console.log("Fetched multiplechoiceId:", multiplechoiceIdFromUrl); 

    if (testIdFromUrl) {
      setTestId(testIdFromUrl);
    }
    if (multiplechoiceIdFromUrl) {
      setMultiplechoiceId(multiplechoiceIdFromUrl); 
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2000/api/multiplechoice/question/${multiplechoiceId}`);
        if (!response.ok) {
          const errorMessage = await response.text(); // Dapatkan pesan kesalahan dari server
          throw new Error(`Error: ${response.status} - ${errorMessage}`);
        }
        const data = await response.json();
        console.log('Response dari API:', data);
        setWeight(data.weight);
        setNumber(data.number);
        setQuestion(data.question);
        setOptions(data.option);
        setDiscussion(data.discussion);
        
      } catch (error) {
        console.error('Error fetching question:', error);
        setError('Terjadi kesalahan saat memuat data: ' + error.message);
      }
    };
  
    fetchData();
  }, [multiplechoiceId]);
  
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
      allowedTags: [], 
      allowedAttributes: {},
    });
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  }

  const loadPagesFromLocalStorage = () => {
    if (testId && typeof window !== 'undefined') {
        const savedPages = localStorage.getItem(`pages_${testId}`);
        if (savedPages) {
            return JSON.parse(savedPages);
        }
    }
    return null;
};

  // Di komponen halaman buat soal
  useEffect(() => {
      const savedPages = loadPagesFromLocalStorage();
      if (savedPages) {
          setPages(savedPages);
      }
  }, [testId]); 

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus soal ini?")) {
        try {
            const response = await fetch(`http://localhost:2000/api/multiplechoice/question/${multiplechoiceId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Gagal menghapus soal dari database');
            }

            // Update state lokal
            setPages(prevPages => {
                const updatedPages = prevPages.map(page => ({
                    ...page,
                    questions: page.questions.filter(q => q !== multiplechoiceId)
                }));
                
                // Simpan ke localStorage
                if (testId && typeof window !== 'undefined') {
                    localStorage.setItem(`pages_${testId}`, JSON.stringify(updatedPages));
                }
                
                return updatedPages;
            });

            console.log('Soal berhasil dihapus');
            
            // Navigasi kembali ke halaman buat soal
            router.push(`/author/buatSoal?testId=${testId}`);
        } catch (error) {
            console.error('Error saat menghapus soal:', error);
            alert('Terjadi kesalahan saat menghapus soal. Silakan coba lagi.');
        }
    }
};


  // const [jawabanBenar, setJawabanBenar] = useState(null);

  // const handleJawabanBenarChange = (index) => {
  //   setJawabanBenar(index);
  // };

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const initialNumber = params.get('number');
  //   if (initialNumber) {
  //     setNumber(initialNumber);
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      testId: testId,
      questions: [
        {
          question: cleanHtml(question), 
          number: parseInt(number), 
          questionPhoto: questionPhoto || "",
          weight: parseInt(weight), 
          discussion: cleanHtml(discussion), 
          options 
        }
      ]
    };

    try {
      const response = await fetch('http://localhost:2000/api/multiplechoice/add-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log('Response dari API:', result); // Tambahkan ini untuk melihat seluruh data
        const MultiplechoiceId = result.data[0].id;
        console.log('MultiplechoiceId:', MultiplechoiceId);
    
        if (MultiplechoiceId) {
          router.push(`/author/buatSoal?testId=${testId}`);        
        } else {
          console.error('MultiplechoiceId is undefined');
        }
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
            <a className="w-[120px] h-[40px] text-center font-bold font-poppins mb-0.5 
            hover:bg-[#CAE6F9] hover:text-black bg-white text-black rounded-full border border-white 
            shadow-lg transition-all duration-300 flex items-center justify-center">
              Buat Soal
            </a>
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
            <span>Tes Potensi Skolastik {number}</span>
          </div>
        </header>
  
        <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md w-full mb-4">
          <div className='mb-4'>
            <label htmlFor="soal">No.      </label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
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
                    onChange={handleWeightChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
              </div>
              <ReactQuill value={question} onChange={setQuestion} modules={modules}
                className='bg-white shadow-md rounded-md border border-gray-500'
                style={{ maxWidth: '1220px', height: '150px', overflow: 'hidden' }} />
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
                <input
                  type="text"
                  value={option.optionDescription}
                  onChange={(e) => handleOptionChange(index, 'optionDescription', e.target.value)}
                  placeholder="Tulis jawaban untuk opsi"
                  className="p-2 w-full"
                  theme='snow'
                  required
                />
                <label>
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                  />
                  Benar
                </label>
              </div>
            ))}
            <button type="button" onClick={addOption} className="bg-[#7bb3b4] hover:bg-[#8CC7C8] text-black font-bold py-2 px-4 rounded-[15px] border border-black">
              + Tambah
            </button>
          </div>
  
          <div className="mb-4">
            <label className="block mb-2">Pembahasan</label>
            <ReactQuill value={discussion} onChange={setDiscussion} modules={modules}
              placeholder='Tulis kunci jawaban di sini...' />
          </div>
          {/* <div className='mt-4 flex justify-start space-x-4'>
            <button
              onClick={handleDelete}
              className="bg-[#E58A7B] border border-black px-4 py-2 hover:text-white font-poppins rounded-[15px]"
            >
              Hapus
            </button>
          </div> */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleDelete}
              className="bg-[#E58A7B] border border-black px-4 py-2 hover:text-white font-poppins rounded-[15px]"
            >
              Hapus
            </button>
            <div className="flex space-x-2">
              <button type="button" onClick={handleSubmit} className="bg-[#E8F4FF] border border-black px-4 py-2 hover:text-white font-poppins rounded-[15px]">Simpan</button>
              <button
                onClick={handleSubmit}
                className="bg-[#A6D0F7] border border-black px-4 py-2 hover:text-white font-poppins rounded-[15px]"
              >
                Kembali
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  ); 
};

export default MembuatSoal;