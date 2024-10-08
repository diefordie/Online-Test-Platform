'use client';

import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const KotakNomor = () => {
  const router = useRouter();
  const [pages, setPages] = useState([{ pageNumber: 1, questions: [1] }]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isRenaming, setIsRenaming] = useState(null); 
  const [renameValue, setRenameValue] = useState(''); 

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
    const newPage = { pageNumber: newPageNumber, questions: [lastQuestionNumber + 1], isDropdownOpen: false };
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
    setIsRenaming(pageIndex); // Mengaktifkan mode rename untuk page yang dipilih
    setRenameValue(pages[pageIndex].title); // Set nilai input dengan judul yang ada
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
      setIsRenaming(null); // Menonaktifkan mode rename
  };

  const deletePage = (pageIndex) => {
    if (confirm("Apakah Anda yakin ingin menghapus tes ini?")) {
        setPages((prevPages) => prevPages.filter((_, index) => index !== pageIndex));
    }
  };

  const handleQuestionSelect = (questionNumber) => {
    setSelectedNumber(questionNumber);
    router.push(`/buatSoal/page1?nomor=${questionNumber}`);
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
              // <h2 className="text-lg">Tes</h2>
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
          <Link href="/simpan" legacyBehavior>
            <a className="bg-[#E8F4FF] border border-black flex items-center space-x-2 px-4 py-2 hover:text-black font-poppins rounded-[15px] shadow-lg">
              Simpan
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KotakNomor;