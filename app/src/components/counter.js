import React from 'react';
import { decrement, increment } from '../redux-store/actions';
import { useDispatch, useSelector } from 'react-redux';
function Counter() {
    const count = useSelector(state=>state.count)

    const dispatch = useDispatch();
    return (
        <div className='space-x-4 w-full flex items-center justify-center py-4'>
            <button className='px-4 py-2 bg-red-400' onClick={()=>dispatch(decrement())} >-</button>
            <span className='text-xl'>{count}</span>
            <button className='px-4 py-2 bg-green-400' onClick={()=>dispatch(increment())}>+</button>
        </div>
    );
}

export default Counter;