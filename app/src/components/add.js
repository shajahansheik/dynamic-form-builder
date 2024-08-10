import React,{useState} from 'react';

const initialState = {
    name: '',
    age: '',
    gender: ''
}

function Add() {
    const [userData, setUserData] = useState(initialState);

    const handler=(event)=>{
        console.log("-->",event);
    }

    return (
        <div className='p-2 space-y-4  shadow-md mx-56 h-screen flex-flex-col items-center justify-center'>
            <h1 className='text-xl font-bold'>Add User</h1>
            <form className='space-y-2'>
                <div className='flex flex-col space-y-2 mx-52'>
                    <label htmlFor="name">Name</label>
                    <input className='border hover:border-black rounded-md px-1 py-2 ' type="text" id="name" name="name" placeholder='Enter Your Full Name' onClick={(e)=>handler(e)} />
                </div>
                <div className='flex flex-col space-y-2 mx-52'>
                    <label htmlFor="gender">Gender</label>
                    <select className='border hover:border-black rounded-md px-1 py-2 ' onChange={(e)=>handler(e)}>
                        <option value="">Select</option>
                        <option value="Male" >Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='flex flex-col space-y-2 mx-52'>
                    <label htmlFor="age">Age:</label>
                    <input className='border hover:border-black rounded-md px-1 py-2 ' type='date' id='age' name='age' onChange={(e)=>handler(e)} />
                </div>
                <div className='mx-52 flex items-center justify-end space-x-3'>
                <button className='px-4 py-2 bg-gray-300 rounded-md hover:bg-red-300 '>Cancel</button>
                    <button className='px-4 py-2 bg-gray-300 rounded-md hover:bg-green-300 '>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Add;