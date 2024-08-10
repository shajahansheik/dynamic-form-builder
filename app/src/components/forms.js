import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

const formdata = {
    "title": "fjkhb",
    "description": "mjdfghskhjdb",
    "questions": [
        {
            "question": "q1",
            "type": "select",
            "answer": "",
            "options": [
                "male",
                "female"
            ]
        },
        {
            "question": "q2",
            "type": "text",
            "answer": "",
            "options": []
        }
    ]
}
function Forms() {
    const [formData, setFormData] = useState()
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5001/forms/${id}`).then(res => {
            console.log('res', res.data)
            setFormData(res.data)
        }).catch(err => console.log('err', err));
    }, [])
    console.log('formData', formData)


    return (
        <div className='px-4 py-4 space-y-5 bg-gray-50'>
            <div className='text-2xl'>{formData?.title}</div>
            <div> description : {formData?.description}</div>
            <div>
                {formData?.questions?.map((question, idx) => {
                    return (
                        <div key={idx} className='space-y-2'>
                            <div>{question.question}</div>
                            {
                                question.type === 'select' ? <select className='px-2 py-2 rounded-md outline-none border hover:border-black-300 w-full'>
                                    <option value="">Select</option>
                                    {question?.options?.map((opt, index) => (
                                        <option key={index} value={opt}>{opt}</option>
                                    ))}
                                </select> : <input type={question.type} placeholder={question.question} name={question.question} className=' px-2 py-2 rounded-md outline-none border hover:border-black-300 w-full' />
                            }


                        </div>
                    )
                })}
            </div>
            <div className='flex items-center justify-end'>
                <button className='px-2 py-2 bg-blue-500 text-white rounded-md'>Submit</button>
            </div>
        </div>
    );
}

export default Forms;