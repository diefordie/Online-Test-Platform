'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const KotakNomor = () => {
  const router = useRouter();
  const [testId, setTestId] = useState('cm2nkbnro0003q7tw36hs4sfq');
  const [pages, setPages] = useState([{ pageNumber: 1, questions: [1], pageName: 'Beri Nama Tes'}]);
  const [multiplechoiceId, setMultiplechoiceId] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isRenaming, setIsRenaming] = useState(null); 
  const [renameValue, setRenameValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!testId) return;

      try {
        const response = await fetch(`http://localhost:2000/api/multiplechoice/questions?testId=${testId}`);
        if (response.ok) {
          const data = await response.json();
          setPages(data); 
        } else {
          console.error('Error loading data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [testId]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const testIdFromUrl = params.get("testId");
    const multiplechoiceIdFromUrl = params.get("multiplechoiceId");
    const pageNameFromUrl = params.get("pageName") || localStorage.getItem('pageName');

    console.log("Fetched testId:", testIdFromUrl);
    console.log("Fetched multiplechoiceId:", multiplechoiceIdFromUrl);

    if (testIdFromUrl) {
      setTestId(testIdFromUrl);

      if (typeof window !== 'undefined') {
        const savedPages = localStorage.getItem(`pages_${testIdFromUrl}`);
        if (savedPages) {
          setPages(JSON.parse(savedPages));
        } else {
          setPages([{ questions: [] }]);
          fetchPagesFromDB(testIdFromUrl);
        }
      }
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

  useEffect(() => {
    if (testId && typeof window !== 'undefined') {
      localStorage.setItem(`pages_${testId}`, JSON.stringify(pages));
    }
  }, [pages, testId]);

  const addQuestion = (pageIndex) => {
    setPages((prevPages) => {
      const updatedPage = {
        
        ...prevPages[pageIndex],
        questions: [...prevPages[pageIndex].questions, prevPages[pageIndex].questions.length + prevPages[pageIndex].questions[0]]
      };

      let newPages = prevPages.map((page, index) => {
        if (index === pageIndex) {
          return updatedPage;
        } else if (index > pageIndex) {
          const previousPage = index === 0 ? updatedPage : prevPages[index - 1];
          const firstQuestionNumber = previousPage.questions[previousPage.questions.length - 1] + 1;
          const updatedQuestions = page.questions.map((_, questionIndex) => firstQuestionNumber + questionIndex);
          return {
            ...page,
            questions: updatedQuestions
          };
        }
        return page;
      });

      newPages = newPages.map((page, index) => {
        if (index > pageIndex) {
          const previousPage = newPages[index - 1];
          const previousLastQuestion = previousPage.questions[previousPage.questions.length - 1];
          const updatedQuestions = page.questions.map((_, questionIndex) => previousLastQuestion + 1 + questionIndex);
          return {
            ...page,
            questions: updatedQuestions
          };
        }
        return page;
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
      pageName: 'Beri Nama Tes',
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
    setRenameValue(pages[pageIndex]);
  };

  const saveRename = async (pageIndex) => {
    try {
      await fetch(`http://localhost:2000/api/multiplechoice/update-pageName`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId: testId,
          pageIndex: pageIndex,
          pageName: renameValue,
        }),
      });

      setPages((prevPages) => {
        const updatedPages = prevPages.map((page, index) => {
          if (index === pageIndex) {
            return { ...page, pageName: renameValue };
          }
            return page;
          });
          return updatedPages;
        });
      setIsRenaming(null); 
    } catch (error) {
      console.error("Error updating pageName:", error);
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
            {page.questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
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
            onClick={handleSave} // Memanggil fungsi handleSave saat tombol diklik
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