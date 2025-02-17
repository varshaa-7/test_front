import React from 'react';

const QuestionCard = React.memo(({ question, onAnswerChange }) => {
    const handleOptionChange = (event) => {
        onAnswerChange(question._id, event.target.value);
    };

    return (
        <div className='border border-slate-600 bg-slate-800 w-full p-5 rounded-lg my-4 shadow-md shadow-slate-700 transition-transform transform hover:scale-105 hover:shadow-lg duration-200'>
            <h3 className='border-b pb-3 mb-4 border-slate-600 text-lg font-semibold text-white'>{question.questionText}</h3>
            <div className='flex flex-col md:flex-row justify-evenly gap-5'>
                {question.options.map((option) => (
                    <label 
                        key={option._id} 
                        className='flex gap-3 cursor-pointer items-center p-2 rounded-lg transition-colors duration-200 hover:bg-slate-700'
                    >
                        <input
                            type='radio'
                            name={question._id}
                            value={option._id}
                            onChange={handleOptionChange}
                            className='accent-purple-500 scale-110'
                        />
                        <span className='text-white'>{option.text}</span>
                    </label>
                ))}
            </div>
        </div>
    );
});

export default QuestionCard;
