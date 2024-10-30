'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const KotakNomor = () => {
  const router = useRouter();
  const [testId, setTestId] = useState('');
  const [pages, setPages] = useState([]);
  const [multiplechoiceId, setMultiplechoiceId] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isRenaming, setIsRenaming] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  useEffect(() => {
    const savedPages = localStorage.getItem(`pages-${testId}`);
    if (savedPages) {
      setPages(JSON.parse(savedPages));
    } else {
      const initialPages = [{ pageNumber: 1, questions: [1], pageName: 'Beri Nama Tes' }];
      setPages(initialPages);
      localStorage.setItem(`pages-${testId}`, JSON.stringify(initialPages));
    }
  }, [testId]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const testIdFromUrl = params.get("testId");
    const multiplechoiceIdFromUrl = params.get("multiplechoiceId");
    const pageNameFromUrl = params.get("pageName") || localStorage.getItem('pageName');

    if (testIdFromUrl) {
      setTestId(testIdFromUrl);
    }

    if (multiplechoiceIdFromUrl) {
      setMultiplechoiceId(multiplechoiceIdFromUrl);
    }

    if (pageNameFromUrl) {
      setPages((prevPages) => prevPages.map((page) => ({
        ...page,
        pageName: decodeURIComponent(pageNameFromUrl),
      })));
    }

  }, []);

  const addQuestion = (pageIndex) => {
    setPages(prevPages => {
      // Buat salinan pages yang ada
      const updatedPages = [...prevPages];
      
      // Ambil page yang akan diupdate
      const currentPage = {...updatedPages[pageIndex]};
      
      // Tambah satu nomor saja ke array questions
      currentPage.questions = [...currentPage.questions, currentPage.questions.length + 1];
      
      // Update page di array pages
      updatedPages[pageIndex] = currentPage;

      // Simpan ke localStorage
      localStorage.setItem(`pages-${testId}`, JSON.stringify(updatedPages));
      
      // Log untuk debugging
      console.log('Current questions after update:', currentPage.questions);
      
      return updatedPages;
    });
  };

  const addPage = () => {
    setPages(prevPages => {
      const lastPage = prevPages[prevPages.length - 1];
      const lastQuestions = lastPage?.questions || [];
      const lastQuestionNumber = lastQuestions.length > 0 
        ? Math.max(...lastQuestions)
        : 0;
      
      const updatedPages = [...prevPages, {
        pageNumber: prevPages.length + 1,
        questions: [lastQuestionNumber + 1],
        pageName: 'Beri Nama Tes',
        isDropdownOpen: false
      }];

      localStorage.setItem(`pages-${testId}`, JSON.stringify(updatedPages));
      return updatedPages;
    });
  };

  // Function to clear storage (useful for testing or reset functionality)
  const clearStorage = () => {
    localStorage.removeItem(`pages-${testId}`);
    setPages([{ pageNumber: 1, questions: [1], pageName: 'Beri Nama Tes' }]);
  };

  const toggleDropdown = (pageIndex) => {
    setPages(prevPages => 
      prevPages.map((page, index) => ({
        ...page,
        isDropdownOpen: index === pageIndex ? !page.isDropdownOpen : false
      }))
    );
  };

  const handleRename = (pageIndex) => {
    setIsRenaming(pageIndex);
    setRenameValue(pages[pageIndex]);
  };

  const saveRename = async (pageIndex) => {
    console.log("Starting saveRename with value:", renameValue); // Debug log

    // Validasi yang lebih ketat
    if (!renameValue || renameValue.trim() === '') {
      alert("Please enter a page name");
      return;
    }

    try {
      const requestData = {
        testId: testId,
        pageIndex: pageIndex,
        newPageName: renameValue.trim()
      };
      
      console.log("Sending data:", requestData); // Debug log

      const response = await fetch(`http://localhost:2000/api/multiplechoice/update-pageName`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update page name');
      }

      setPages((prevPages) => {
        const updatedPages = prevPages.map((page, index) => {
          if (index === pageIndex) {
            return { ...page, pageName: renameValue.trim() };
          }
          return page;
        });
        return updatedPages;
      });
      setIsRenaming(null);
      setRenameValue(''); // Reset nilai setelah berhasil
    } catch (error) {
      console.error("Error details:", error);
      alert(error.message);
    }
};

  const deletePage = (pageIndex) => {
    if (confirm("Apakah Anda yakin ingin menghapus tes ini?")) {
        setPages((prevPages) => prevPages.filter((_, index) => index !== pageIndex));
    }
  };

  const fetchPagesFromDB = async (testId) => {
    try {
      const response = await fetch(`http://localhost:2000/api/multiplechoice/getPages?testId=${testId}`);
      const data = await response.json();

      if (response.ok) {
        setPages(data.pages);
      } else {
        console.error('Failed to fetch pages:', data.message);
      }
    } catch (error) {
      console.error("Failed to fetch pages from DB:", error);
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

  const handleQuestionSelect = async (questionNumber, pageIndex) => {
    if (!testId) {
      console.error("testId is null. Cannot navigate.");
      return;  
    }
    
    const multiplechoiceId = await fetchMultipleChoiceId(testId, questionNumber);
    const pageName = pages[pageIndex]?.pageName || '';
  
    if (multiplechoiceId === null) {
      console.log("multiplechoiceId not found. You can create a new one.");
      router.push(`/author/buatSoal/page1?testId=${testId}&multiplechoiceId=${multiplechoiceId}&nomor=${questionNumber}&pageName=${pageName}`);
    }
  
    setSelectedNumber(questionNumber);
    
    router.push(`/author/buatSoal/page1?testId=${testId}&multiplechoiceId=${multiplechoiceId}&nomor=${questionNumber}&pageName=${pageName}`);
  };  
  
const handleSave = () => {
  if (!testId) {
    console.error("testId is null. Cannot navigate.");
    return; 
  }

  router.push(`/author/buattes/publik/syarat?testId=${testId}`);
};

  return (
    <div className="w-full p-4">
      <header className="bg-[#0B61AA] text-white p-4 sm:p-6 font-poppins" style={{ maxWidth: '1443px', height: '108px' }}>
        <div className="container mx-auto flex justify-start items-center p-4">
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

      {Array.isArray(pages) && pages.map((page, pageIndex) => (
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
              <h2 className="text-lg">{page.pageName}</h2>
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
                  className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg z-10 p-1
                  before:content-[''] before:absolute before:-top-4 before:right-5 before:border-8
                  before:border-transparent before:border-b-white"
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
            {Array.isArray(page.questions) && page.questions.map((question, questionIndex) => (
              <div
                key={`${pageIndex}-${question}`}
                className="flex flex-col items-center border border-gray-300 p-2 bg-white rounded-lg shadow-md cursor-pointer"
                style={{ width: '80px', height: '80px' }}
                onClick={() => handleQuestionSelect(question, pageIndex)} 
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
            onClick={handleSave} 
            className="bg-[#E8F4FF] border border-black flex items-center space-x-2 px-4 py-2 hover:text-black font-poppins rounded-[15px] shadow-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default KotakNomor;