import { useNavigate } from 'react-router-dom';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Button from '../../Button';

const AttemptCard = ({ item }) => {
    const navigate = useNavigate();

    // Derive quiz completion status
    const isQuizCompleted = item?.isCompleted || (item?.score !== undefined || item?.submissionTime !== undefined);

    return (
        <div className='border border-slate-600 p-5 rounded-lg flex flex-col gap-3'>
            {/* Quiz Details */}
            <span>
                <h3 className='text-lg md:text-xl font-semibold line-clamp-2'>{item?.quizId?.title}</h3>
                <p className='text-xs md:text-base line-clamp-2 font-thin text-slate-200'>{item?.quizId?.description}</p>
                <span className='text-xs md:text-base text-end font-thin text-slate-300'>
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </span>
            </span>

            {/* Show Quiz Completion Status */}
            <span className='mt-3'>
                {isQuizCompleted ? (
                    <h3 className='text-blue-500 text-sm md:text-base font-semibold'>Quiz Completed</h3>
                ) : (
                    <h3 className='text-red-500 text-sm md:text-base font-semibold'>Quiz Not Completed</h3>
                )}
            </span>

            {/* Optional Retry Button */}
            {/* <Button onClick={() => navigate(`../../quiz/${item?.quizId?._id}`)}>
                {isQuizCompleted ? 'View Results' : 'Attempt Again'}
            </Button> */}
        </div>
    );
};

export default AttemptCard;
