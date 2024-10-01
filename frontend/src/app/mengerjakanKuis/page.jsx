'use client'
import React, { useState } from "react";
import axios from "axios";

const AuthorPilgan = () => {
    const[selectedoption, setSelectedoption] = useState(null);
    const[currentoption, setCurrentoption] = useState(1);
    const[markedreview, setMarkedreview] = useState([]);

    const handleoption = (option) => {
        setSelectedoption(option);
    };

    const handlenextquestion =() => {
        setCurrentoption (currentoption + 1);
        setSelectedoption(null);
    };

    const handleprevquestion = () => {
        if (currentoption > 1){
            setCurrentoption(currentoption -1);
            setSelectedoption(null);
        }
    };

    const handlemarkreview = () => {
        if (!markedreview.includes(currentoption)){
            setMarkedreview([...markedreview, currentoption]);
        }
    };

    return (
        <div className="min-h-screen flex flex-col p-6 bg-white font-sans">
            {/* Header */}
            <div className="w-full bg-[#0B61AA] text-white p-4 text-center" style={{ maxWidth: '1440px', height: '70px' }}>
                <h1 className="text-3xl font-bold">EtamTest</h1>
            </div>

            {/* Question and Timer section */}
            <div className="flex flex-col lg:flex-row mt-6 lg:space-x-6 rounded-[15px]">
                <div className="w-full lg:w-3/4 bg-[#0B61AA] p-6 rounded-lg shadow-lg"style={{ maxWidth: '994x', height: '784px' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white ">Soal CPNS - High Level</h2> 
                        <p className="text-white font-bold">{currentoption}/40</p>
                        <div className="bg-[#0B61AA] text-white px-4 py-2 rounded-[10px] border border-white font-bold">00:00:00</div>
                    </div>

                    {/* Question */}
                    <div className="mb-6 bg-white p-4 rounded-[15px] shadow">
                        {/* Pembungkus untuk soal dan jawaban */}
                        <div className="bg-white p-4 mb-4 rounded-lg shadow-lg">
                            {/* Soal */}
                            <p className="text-lg mb-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Dolores magni nisi quaerat vero iusto, tenetur illo placeat et, 
                                similique obcaecati error mollitia odio aperiam maxime officiis 
                                repudiandae dolorum dignissimos animi.
                            </p>
                        </div>   

                        {/* Jawaban */}
                        <div className="mb-4 bg-white p-4 rounded-lg shadow-lg">
                            <input 
                                type="radio" 
                                id="optionA"
                                name="option"
                                value={'A'}
                                    checked={selectedoption === 'A'}
                                    onChange={() => handleoption('A')}
                                    className="mr-2"
                            />
                            <label htmlFor="optionA" className="text-lg">A. XXXXXXXXXXXXXXXXXXXXXXXXX</label>
                        </div>
                        <div className="mb-4 bg-white p-4 rounded-lg shadow-lg">
                            <input 
                                type="radio" 
                                id="optionB"
                                name="option"
                                value={'B'}
                                checked={selectedoption === 'B'}
                                onChange={() => handleoption('B')}
                                className="mr-2"
                            />
                            <label htmlFor="optionB" className="text-lg">B. XXXXXXXXXXXXXXXXXXXXXXXXX</label>
                        </div>
                        <div className="mb-4 bg-white p-4 rounded-lg shadow-lg">
                            <input 
                                type="radio" 
                                id="optionC"
                                name="option"
                                value={'C'}
                                checked={selectedoption === 'C'}
                                onChange={() => handleoption('C')}
                                className="mr-2"
                            />
                            <label htmlFor="optionC" className="text-lg">C. XXXXXXXXXXXXXXXXXXXXXXXXX</label>
                        </div>
                        <div className="mb-4 bg-white p-4 rounded-lg shadow-lg">
                            <input 
                                type="radio" 
                                id="optionD"
                                name="option"
                                value={'D'}
                                checked={selectedoption === 'D'}
                                onChange={() => handleoption('D')}
                                className="mr-2"
                            />
                            <label htmlFor="optionD" className="text-lg">D. XXXXXXXXXXXXXXXXXXXXXXXXX</label>
                        </div>
                    </div>


                    {/* Action buttons */}
                    <div className="flex justify-between mt-6">
                        <div className="bg-white mb-4 p-4 rounded-[15px] shadow w-full">
                            <div className="flex justify-between items-center" style={{ height: '70px' }}>
                                <button 
                                    className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700"
                                    style={{height:'40px'}}
                                    onClick={handleprevquestion}
                                >
                                    Soal sebelumnya
                                </button>
                                <button 
                                    className="bg-[#F8B75B] text-black px-4 py-2 rounded-[15px] hover:bg-yellow-500"
                                    style={{height:'40px'}}
                                    onClick={handlemarkreview}
                                >
                                    Ragu-Ragu
                                </button>
                                <button 
                                    className="bg-[#0B61AA] text-white px-4 py-2 rounded-[15px] hover:bg-blue-700"
                                    style={{height:'40px'}}
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
                    <div className="bg-[#0B61AA] p-4 rounded-[10px]" style={{height:'50px'}}></div> {/* Header biru di dalam div bg-white */}
                    <div className="p-6">
                        <div className="grid grid-cols-5 gap-2">
                            {Array.from({ length: 40 }, (_, i) => (
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

// 'use client'
// import React, { useState } from "react";

// const AuthorPilgan = () => {
//     const[selectedoption, setSelectedoption] = useState(null);
//     const[currentoption, setCurrentoption] = useState(1);
//     const[markedreview, setMarkedreview] = useState([]);

//     const handleoption = (option) => {
//         setSelectedoption(option);
//     };

//     const handlenextquestion =() => {
//         setCurrentoption (currentoption + 1);
//         setSelectedoption(null);
//     };

//     const handleprevquestion = () => {
//         if (currentoption > 1){
//             setCurrentoption(currentoption -1);
//             setSelectedoption(null);
//         }
//     };

//     const handlemarkreview = () => {
//         if (!markedreview.includes(currentoption)){
//             setMarkedreview([...markedreview, currentoption]);
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col p-6 bg-blue-50 font-sans">
//             {/* Header */}
//             <div className="w-full bg-blue-900 text-white p-4 text-center">
//                 <h1 className="text-3xl font-bold">EtamTest</h1>
//             </div>

//             {/* Question and Timer section */}
//             <div className="flex flex-col lg:flex-row mt-6 lg:space-x-6">
//                 <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-semibold">Soal CPNS - High Level</h2> 
//                         <p>{currentoption}/40</p>
//                         <div className="bg-blue-500 text-white px-4 py-2 rounded">00:00:00</div>
//                     </div>

//                     {/* Question */}
//                     <div className="mb-6">
//                         <p className="text-lg">
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//                             Dolores magni nisi quaerat vero iusto, tenetur illo placeat et, 
//                             similique obcaecati error mollitia odio aperiam maxime officiis 
//                             repudiandae dolorum dignissimos animi.
//                         </p>
//                     </div>

//                     {/* Option */}
//                     <div>
//                         <div className="mb-4">
//                             <input 
//                                 type="radio" 
//                                 id="optionA"
//                                 name="option"
//                                 value={'A'}
//                                 checked={selectedoption === 'A'}
//                                 onChange={() => handleoption('A')}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="optionA" className="text-lg">A. XXXXXXXXXXXXXXXXXXXXXXXXX</label>
//                         </div>
//                         <div className="mb-4">
//                             <input 
//                                 type="radio" 
//                                 id="optionB"
//                                 name="option"
//                                 value={'B'}
//                                 checked={selectedoption === 'B'}
//                                 onChange={() => handleoption('B')}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="optionB" className="text-lg">B. XXXXXXXXXXXXXXXXXXXXXXXXX</label>
//                         </div>
//                         <div className="mb-4">
//                             <input 
//                                 type="radio" 
//                                 id="optionC"
//                                 name="option"
//                                 value={'C'}
//                                 checked={selectedoption === 'C'}
//                                 onChange={() => handleoption('C')}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="optionC" className="text-lg">C. XXXXXXXXXXXXXXXXXXXXXXXXX</label>
//                         </div>
//                         <div className="mb-4">
//                             <input 
//                                 type="radio" 
//                                 id="optionD"
//                                 name="option"
//                                 value={'D'}
//                                 checked={selectedoption === 'D'}
//                                 onChange={() => handleoption('D')}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="optionD" className="text-lg">D. XXXXXXXXXXXXXXXXXXXXXXXXX</label>
//                         </div>
//                     </div>

//                     {/* Action buttons */}
//                     <div className="flex justify-between mt-6">
//                         <button 
//                             className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
//                             onClick={handleprevquestion}
//                         >
//                             Soal sebelumnya
//                         </button>
//                         <button 
//                             className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
//                             onClick={handlemarkreview}
//                         >
//                             Ragu-Ragu
//                         </button>
//                         <button 
//                             className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
//                             onClick={handlenextquestion}
//                         >
//                             Soal Selanjutnya
//                         </button>
//                     </div>
//                 </div>

//                 {/* Question navigation */}
//                 <div className="w-full lg:w-1/4 mt-6 lg:mt-0 bg-white p-6 rounded-lg shadow-lg">
//                     <div className="grid grid-cols-5 gap-2">
//                         {Array.from({ length: 40 }, (_, i) => (
//                             <button
//                                 key={i + 1}
//                                 className={`w-10 h-10 text-lg font-semibold rounded ${markedreview.includes(i + 1) ? 'bg-yellow-500 text-white' : 'bg-gray-200'} hover:bg-gray-300`}
//                                 onClick={() => setCurrentoption(i + 1)}
//                             >
//                                 {i + 1}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthorPilgan;
