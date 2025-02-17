import React, { useState } from 'react'
import Score from './Score';
import { IoIosArrowUp } from "react-icons/io";
import Button from '../../Button';
import { useDispatch } from 'react-redux';
import { setEdit, setQuiz } from '../../../slices/QuizSlice';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ quiz, handleDeleteQuiz }) => {

    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditQuiz = () => {
        dispatch(setQuiz(quiz))
        dispatch(setEdit(true))
        navigate(`/dashboard/edit-quiz/${quiz._id}`)
    }

    return (
        <div className='p-5 border border-slate-700 bg-slate-900 hover:border-blue-500 transition-all duration-300 rounded-lg relative shadow-md hover:shadow-blue-500/50'>
            {/* Header */}
            <div 
                onClick={() => setShowDetails(!showDetails)} 
                className='cursor-pointer pb-3 mb-3 flex justify-between items-center border-b border-slate-600 transition-all duration-300'
            >
                <h3 className='text-xl font-semibold text-white'>📌 {quiz.title}</h3>
                <p className={`${!showDetails ? "rotate-180" : "rotate-0"} transition-all duration-300 text-blue-400`}>
                    <IoIosArrowUp size={20} />
                </p>
            </div>

            {/* Details Section */}
            <div className='flex flex-col md:flex-row gap-y-3 justify-between text-gray-300'>
                <div>
                    <p className='font-light'><span className='text-blue-400 font-medium'>📝 Description:</span> {quiz.description}</p>
                    <p className='font-light'><span className='text-blue-400 font-medium'>⏳ Time:</span> {quiz.timer} minutes</p>
                </div>
                
                {/* Action Buttons */}
                <div className='flex gap-3 justify-end items-center'>
                    <Button onClick={() => handleDeleteQuiz(quiz._id)} className='w-max bg-red-600 hover:bg-red-500' active={false}>🗑 Delete</Button>
                    <Button onClick={handleEditQuiz} className='w-max bg-green-600 hover:bg-green-500' active>✏ Edit</Button>
                </div>
            </div>

            {/* Show Score Section */}
            {showDetails && <Score quiz={quiz} />}
        </div>
    )
}

export default QuizCard;
