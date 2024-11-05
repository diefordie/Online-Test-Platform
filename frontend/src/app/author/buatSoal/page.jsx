'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const KotakNomor = () => {
  const router = useRouter();
  const [pages, setPages] = useState([{ questions: [], title: "Beri Nama TES" }]);
  const [testId, setTestId] = useState('cm2i7ml8i0001wrlj72zolmrj');
  const [multiplechoiceId, setMultiplechoiceId] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isRenaming, setIsRenaming] = useState(null); 
  const [renameValue, setRenameValue] = useState('');
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const testIdFromUrl = params.get("testId");
    const multiplechoiceIdFromUrl = params.get("multiplechoiceId");

    console.log("Fetched testId:", testIdFromUrl);
    console.log("Fetched multiplechoiceId:", multiplechoiceIdFromUrl);

    if (testIdFromUrl) {
      setTestId(testIdFromUrl);
      // Load pages for this specific testId
      if (typeof window !== 'undefined') {
        const savedPages = localStorage.getItem(`pages_${testIdFromUrl}`);
        if (savedPages) {
          setPages(JSON.parse(savedPages));
        } else {
          setPages([{ questions: [] }]);
        }
      }
    }
    if (multiplechoiceIdFromUrl) {
      setMultiplechoiceId(multiplechoiceIdFromUrl);
    }
  }, []);

  useEffect(() => {
    if (testId && typeof window !== 'undefined') {
      localStorage.setItem(`pages_${testId}`, JSON.stringify(pages));
    }
  }, [pages, testId]);

  const addQuestion = (pageIndex) => {
    setPages((prevPages) => {
      const currentQuestions = prevPages[pageIndex].questions;
      const newQuestionNumber = currentQuestions.length > 0 
          ? Math.max(...currentQuestions) + 1
          : 1;
  
      const updatedPage = {
        ...prevPages[pageIndex],
        questions: [...currentQuestions, newQuestionNumber],
      };
  
      // Update nomor soal untuk semua halaman
      const newPages = prevPages.map((page, index) => {
        // Hanya update nomor soal di halaman yang sama
        if (index === pageIndex) {
          return updatedPage;
        } else {
          // Update nomor soal di halaman lain
          const updatedQuestions = page.questions.map((q) => (q >= newQuestionNumber ? q + 1 : q));
          return { ...page, questions: updatedQuestions };
        }
      });
  
      return newPages;
    });
  };
  

  const addPage = () => {
    const lastQuestionNumber = pages.reduce((acc, curr) => acc + curr.questions.length, 0);
    const newPageNumber = pages.length + 1;
    const newPage = { 
      pageNumber: newPageNumber, 
      questions: [lastQuestionNumber + 1],
      title: "Beri Nama TES", 
      isDropdownOpen: false 
    };
    setPages([...pages, newPage]);
  };

  const toggleDropdown = (pageIndex) => {
    setPages((prevPages) => {
      return prevPages.map((page, index) => {
        if (index === pageIndex) {
          return { ...page, isDropdownOpen: !page.isDropdownOpen };
        }
        return { ...page, isDropdownOpen: false };
      });
    });
  };

  const handleRename = (pageIndex) => {
    setIsRenaming(pageIndex);
    setRenameValue(pages[pageIndex].title);
  };

  const saveRename = (pageIndex) => {
      setPages((prevPages) => {
          const updatedPages = prevPages.map((page, index) => {
              if (index === pageIndex) {
                  return { ...page, title: renameValue };
              }
              return page;
          });
          return updatedPages;
      });
      setIsRenaming(null); 
  };

  const deletePage = (pageIndex) => {
    if (confirm("Apakah Anda yakin ingin menghapus tes ini?")) {
        setPages((prevPages) => prevPages.filter((_, index) => index !== pageIndex));
    }
  };

  const fetchMultipleChoiceId = async (testId, number) => {
    try {
      const response = await fetch(`http://localhost:2000/api/multiplechoice/${testId}/${number}`);
  
      if (response.status === 404) {
        console.warn('No multiplechoiceId found. It may not be created yet.');
        return null; 
      }
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.id; 
    } catch (error) {
      console.error('Error fetching multiplechoiceId:', error);
      return null; 
    }
  };  

  const handleQuestionSelect = async (questionNumber) => {
    if (!testId) {
      console.error("testId is null. Cannot navigate.");
      return; 
    }
  
    const multiplechoiceId = await fetchMultipleChoiceId(testId, questionNumber);
  
    if (multiplechoiceId === null) {
      console.log("multiplechoiceId not found. You can create a new one.");
      router.push(`/author/buatSoal/buatPilgan?testId=${testId}&multiplechoiceId=${multiplechoiceId}&nomor=${questionNumber}`);
    }
  
    setSelectedNumber(questionNumber);
    
    router.push(`/author/buatSoal/buatPilgan?testId=${testId}&multiplechoiceId=${multiplechoiceId}&nomor=${questionNumber}`);
  };  
  
const handleSave = () => {
  if (!testId) {
    console.error("testId is null. Cannot navigate.");
    return; 
  }

  router.push(`/author/buattes/publik/syarat?testId=${testId}`);
};

return (
  <div className="container mx-auto p-0" style={{ maxWidth: '1440px' }}>
    <header className="bg-[#0B61AA] text-white p-4 sm:p-6 font-poppins" style={{ height: '90px' }}>
      <div className="flex items-center justify-start h-full">
        <Link href="/">
          <img src="/img/Vector.png" alt="Vector" className="h-[50px]" style={{ maxWidth: '179px' }} />
        </Link>
      </div>
    </header>

    <div className="w-full p-0">
      <nav className="bg-[#FFFF] text-black p-4 sm:p-6">
        <ul className="flex space-x-6 sm:space-x-20">
          <li>
            <button
              className={`w-[120px] sm:w-[220px] h-[48px] rounded-[20px] shadow-md font-bold font-poppins ${activeTab === 'buatTes' ? 'bg-[#78AED6]' : ''}`}
              onClick={() => setActiveTab('buatTes')}
            >
              Buat Soal
            </button>
          </li>
          <li>
            <button
              className={`w-[120px] sm:w-[220px] h-[48px] rounded-[20px] shadow-md font-bold font-poppins ${activeTab === 'publikasi' ? 'bg-[#78AED6]' : ''}`}
              onClick={() => setActiveTab('publikasi')}
            >
              Publikasi
            </button>
          </li>
        </ul>
      </nav>

      <div className="w-full p-4">
        {pages.map((page, pageIndex) => (
          <div key={page.pageNumber} className="my-4">
            <div className="flex justify-between items-center bg-[#0B61AA] text-white p-2" style={{ maxWidth: '1376px', height: '61px' }}>
              {isRenaming === pageIndex ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    className="text-black p-1 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => saveRename(pageIndex)}
                    className="ml-2 bg-white text-black px-2 py-1 rounded-md"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <h2 className="text-lg">{page.title}</h2>
              )}

              <div className="relative">
                <button 
                  className="text-white font-bold text-2xl mr-2"
                  onClick={() => toggleDropdown(pageIndex)}
                >
                  :
                </button>

                {page.isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-10 p-1 before:content-[''] before:absolute before:-top-4 before:right-5 before:border-8 before:border-transparent before:border-b-white"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleRename(pageIndex)}
                      className="block px-4 py-2 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md"
                    >
                      Rename
                    </button>
                    <button
                      onClick={() => deletePage(pageIndex)}
                      className="block px-4 py-2 text-deepBlue text-sm text-gray-700 hover:bg-deepBlue hover:text-white rounded-md"
                    >
                      Delete page
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4"></div>
            <div className="flex flex-row flex-wrap p-4 gap-3 justify-start border" style={{ maxWidth: '100%', padding: '0 2%' }}>
              {page.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="flex flex-col items-center border border-gray-300 p-2 bg-white rounded-lg shadow-md cursor-pointer"
                  style={{ width: '80px', height: '80px' }}
                  onClick={() => handleQuestionSelect(question)} // Tambahkan logika untuk memilih soal
                >
                  <span className="bg-white border rounded-full w-8 h-8 flex items-center justify-center mb-2 rounded-[15px]">
                    {question}
                  </span>
                </div>
              ))}

              <div className="flex items-center">
                <button
                  onClick={() => addQuestion(pageIndex)}
                  className="bg-[#A6D0F7] text-black px-4 py-2 rounded-[15px] shadow-lg"
                >
                  + Soal
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            onClick={addPage}
            className="bg-[#0B61AA] border border-black flex items-center space-x-2 px-4 py-2 hover:text-white font-poppins rounded-[15px] shadow-lg"
          >
            + Tambah Page
          </button>
          
          <div className="flex justify-end space-x-2 mr-4">
            <button
              onClick={handleSave} // Memanggil fungsi handleSave saat tombol diklik
              className="bg-[#E8F4FF] border border-black flex items-center space-x-2 px-4 py-2 hover:text-black font-poppins rounded-[15px] shadow-lg"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default KotakNomor;
