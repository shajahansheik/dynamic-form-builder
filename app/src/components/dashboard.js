import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';
import Counter from './counter';

import { Provider } from 'react-redux';
import {createStore} from 'redux'
import reducer from '../redux-store/reducer';

function Dashboard() {
    const store= createStore(reducer)
    const [formsData, setFormData] = useState([])
    const navigator = useNavigate();
    useEffect(() => {
        getForms();
    }, [])
    const getForms = () => {
        axios.get('http://localhost:5001/forms').then(res => {
            console.log('res', res.data)
            setFormData(res.data)
        }).catch(err => console.log('err', err));
    }
    const deleteForm = (id) => {
        axios.delete(`http://localhost:5001/forms/${id}`).then(res => {
            console.log('res', res.data)
            getForms();
        }).catch(err => console.log('err', err));
    }

    const viewForm = (id) => {
        navigator(`/forms/${id}`)
    }
    return (
        <Provider store={store} >
        <div>
            <Counter />
            {/* {
                formsData && formsData?.map((form, idx) => (
                    <div key={idx} className='px-4 py-2 flex  space-x-5 bg-gray-50'>
                        <div>{idx + 1}</div>
                        <div className='flex items-center justify-between w-full'>

                            <div>
                                <div className='text-2xl'>{form?.title}</div>
                                <div>{form?.description}</div>
                            </div>
                            <div className='space-x-3 '>
                                <button className='px-2 py-2 bg-blue-500 text-white rounded-md' onClick={() => viewForm(form?.formId)} >View</button>
                                <button className='px-2 py-2 bg-red-500 text-white rounded-md' onClick={() => deleteForm(form?.formId)} >Delete</button>
                            </div>

                        </div>

                    </div>
                ))
            } */}
        </div>
        </Provider>
    );
}

export default Dashboard;