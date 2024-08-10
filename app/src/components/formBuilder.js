import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialQuestions = {
    title: 'Title',
    description: 'Description',
    questions: [
        {
            question: '',
            type: '',
            answer: '',
            options: []
        }
    ]
};

function FormBuilder() {
    const [questions, setQuestions] = useState(initialQuestions);
    const [option, setOption] = useState('');
    const navigator = useNavigate();
    const addQuestion = () => {
        setQuestions({
            ...questions,
            questions: [...questions.questions, { question: 'Question', type: '', answer: '', options: [] }]
        });
    };

    const deleteQuestion = (idx) => {
        setQuestions({
            ...questions,
            questions: questions.questions.filter((_, index) => index !== idx)
        });
    };

    const deleteOption = (qstIdx, optIdx) => {
        setQuestions({
            ...questions,
            questions: questions.questions.map((qst, index) => {
                if (index === qstIdx) {
                    return {
                        ...qst,
                        options: qst.options.filter((_, i) => i !== optIdx)
                    };
                }
                return qst;
            })
        });
    };

    const addField = (e, idx) => {
        setQuestions({
            ...questions,
            questions: questions.questions.map((qst, index) => {
                if (index === idx) {
                    return { ...qst, [e.target.name]: e.target.value };
                }
                return qst;
            })
        });
    };

    const addOption = (idx) => {
        setQuestions({
            ...questions,
            questions: questions.questions.map((qst, index) => {
                if (index === idx) {
                    return {
                        ...qst,
                        options: [...qst.options, option]
                    };
                }
                return qst;
            })
        });
        setOption('');
    };

    const save = () => {
        axios.post('http://localhost:5001/forms/create', questions)
            .then(res => {
                setQuestions(initialQuestions);
                setOption('');
                navigator('/')
            })
            .catch(err => console.log('err', err));
    };

    return (
        <div className='px-4 py-4 space-y-5 bg-gray-50'>
            <div className='flex space-x-3 items-center justify-end'>
                <button
                    className='px-4 py-2 bg-green-400 text-white rounded-md'
                    onClick={save}
                >
                    Save Form
                </button>
            </div>
            <div className='space-y-5 '>
                <div className='space-y-1 bg-white px-2 py-2 rounded-md'>
                    <div>
                        <input
                            type="text"
                            name='title'
                            className='text-2xl px-2 py-2 outline-none border-b hover:border-black-300 w-full'
                            onChange={(e) => setQuestions({ ...questions, title: e.target.value })}
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='description'
                            className='px-2 py-2 outline-none border-b hover:border-black-300 w-full'
                            onChange={(e) => setQuestions({ ...questions, description: e.target.value })}
                            placeholder="Description"
                        />
                    </div>
                </div>
                <div className=' flex flex-col space-y-3 '>
                    {questions?.questions.map((qst, index) => (
                        <div key={index} className='space-y-2 bg-white  px-2 py-2 rounded-md'>
                            <div className='flex space-x-3'>
                                <input
                                    type="text"
                                    className='px-2 py-2 rounded-md outline-none border hover:border-black-300 w-full'
                                    name='question'
                                    onChange={(e) => addField(e, index)}
                                    placeholder="Question"
                                />
                                <select
                                    className='px-2 py-2 rounded-md outline-none border hover:border-black-300 w-full'
                                    name='type'
                                    onChange={(e) => addField(e, index)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="text">Text</option>
                                    <option value="select">Dropdown</option>
                                    <option value="date">Date</option>
                                </select>
                            </div>
                            <div>
                                {qst.type === 'select' && (
                                    <div className='space-x-3'>

                                        <div className='flex space-x-2 w-1/2'>
                                            <div>
                                                <input
                                                    type="text"
                                                    className='px-2 py-2 rounded-md outline-none border hover:border-black-300 w-full'
                                                    value={option}
                                                    placeholder="Option"
                                                    onChange={(e) => setOption(e.target.value)}
                                                />
                                            </div>
                                            <button
                                                className='px-4 py-2 bg-gray-300 hover:bg-blue-500 text-white rounded-md'
                                                onClick={() => addOption(index)}
                                            >
                                                Add Option
                                            </button>
                                            <div className='flex items-center space-x-3'>
                                                {qst.options.map((opt, id) => (
                                                    <div className='flex  space-x-2 bg-gray-100 rounded-md px-2 py-2'>
                                                        <div key={id}>{opt}</div>
                                                        <button
                                                            className=''
                                                            onClick={() => deleteOption(index, id)}
                                                        >
                                                            <svg width="20px" height="20px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                                <title>cancel</title>
                                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <g id="work-case" fill="#000000" transform="translate(91.520000, 91.520000)">
                                                                        <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">

                                                                        </polygon>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    className='px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md'
                                    onClick={() => deleteQuestion(index)}
                                >
                                    Delete Option
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='flex space-x-3'>
                        <button
                            className='px-4 py-2 bg-gray-500 hover:bg-blue-500 text-white rounded-md'
                            onClick={addQuestion}
                        >
                            Add Question
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormBuilder;




// import React, { useState } from 'react';
// import axios from 'axios';

// const initialQuestions = {
//     title: 'Title',
//     description: 'Description',
//     questions: [
//         {
//             question: '',
//             type: '',
//             answer: '',
//             options: []
//         }
//     ]
// };

// function FormBuilder() {
//     const [questions, setQuestions] = useState(initialQuestions);
//     const [options, setOptions] = useState([]);
//     const [option, setOption] = useState('');

//     const addQuestion = () => {
//         setQuestions({
//             ...questions,
//             questions: [...questions.questions, { question: 'Question', type: '', answer: '', options: [] }]
//         });
//     };

//     const addField = (e, idx) => {
//         setQuestions({
//             ...questions,
//             questions: questions.questions.map((qst, index) => {
//                 if (index === idx) {
//                     return { ...qst, [e.target.name]: e.target.value };
//                 }
//                 return qst;
//             })
//         });
//     };

//     const addOption = (idx) => {
//         setQuestions({
//             ...questions,
//             questions: questions.questions.map((qst, index) => {
//                 if (index === idx) {
//                     return {
//                         ...qst,
//                         options: [...qst.options, option]
//                     };
//                 }
//                 return qst;
//             })
//         });
//         setOptions([...options, option]);
//         setOption('');
//     };

//     const save = () => {
//         axios.post('http://localhost:5001/formdata', questions)
//             .then(res => {
//                 console.log('data', res)
//                 setOptions([]);
//             }
//             )
//             .catch(err => console.log('err', err));
//     };

//     return (
//         <div className='px-4 py-4 space-y-5 bg-gray-50'>
//             <div className='flex space-x-3 items-center justify-end'>

//                 <button
//                     className='px-4 py-2 bg-green-400 text-white rounded-md'
//                     onClick={save}
//                 >
//                     Save Form
//                 </button>
//             </div>
//             <div className='space-y-5 '>
//                 <div className='space-y-1 bg-white px-2 py-2 rounded-md'>
//                     <div>
//                         <input
//                             type="text"
//                             name='title'
//                             className='text-2xl px-2 py-2 outline-none border-b hover:border-black-300 w-full'
//                             onChange={(e) => setQuestions({ ...questions, title: e.target.value })}
//                             placeholder="Title"
//                         />
//                     </div>
//                     <div>
//                         <input
//                             type="text"
//                             name='description'
//                             className='px-2 py-2 outline-none border-b hover:border-black-300 w-full'
//                             onChange={(e) => setQuestions({ ...questions, description: e.target.value })}
//                             placeholder="Description"
//                         />
//                     </div>
//                 </div>
//                 <div className=' flex flex-col space-y-3 '>
//                     {questions?.questions.map((qst, index) => (
//                         <div key={index} className='space-y-2 bg-white  px-2 py-4 rounded-md' >
//                             <div className='flex space-x-3'>
//                                 <input
//                                     type="text"
//                                     className='px-2 py-2 rounded-md outline-none border hover:border-black-300 w-full'
//                                     name='question'
//                                     onChange={(e) => addField(e, index)}
//                                     placeholder="Question"
//                                 />
//                                 <select
//                                     className='px-2 py-2 rounded-md outline-none border hover:border-black-300 w-full'
//                                     name='type'
//                                     onChange={(e) => addField(e, index)}
//                                 >
//                                     <option value="">Select Type</option>
//                                     <option value="text">Text</option>
//                                     <option value="select">Dropdown</option>
//                                     <option value="date">Date</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 {qst.type === 'select' && (
//                                     <div className='space-x-3 px-5'>

//                                         <div className='flex space-x-2 w-1/2'>
//                                             <div>
//                                                 <input
//                                                     type="text"
//                                                     className='px-2 py-2 rounded-md outline-none border hover:border-black-300 w-full'
//                                                     value={option}
//                                                     placeholder="Option"
//                                                     onChange={(e) => setOption(e.target.value)}
//                                                 />
//                                             </div>
//                                             <button
//                                                 className='px-4 py-2 bg-gray-300 hover:bg-blue-500 text-white rounded-md'
//                                                 onClick={() => addOption(index)}
//                                             >
//                                                 Add Option
//                                             </button>
//                                             <div >
//                                                 <div className='flex  space-x-4'>
//                                                 {qst.options.filter((item)=>item != '').map((opt, id) => (
//                                                     <div key={id} className=' bg-gray-100 rounded-md px-2 py-2'>
//                                                         {opt}
//                                                     </div>
//                                                 ))}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                     <div className='flex space-x-3 '>
//                         <button
//                             className='px-4 py-2 bg-gray-500 hover:bg-blue-500 text-white rounded-md'
//                             onClick={addQuestion}
//                         >
//                             Add Question
//                         </button>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FormBuilder;