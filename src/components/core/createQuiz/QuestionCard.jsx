import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../Button';

const QuestionCard = ({ question, deleteQuestionHandler }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.95 }} 
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className='rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700 hover:shadow-2xl transition-all duration-300'
    >
      <div className='space-y-4'>
        <div className='flex justify-between items-center border-b pb-3 border-slate-700'>
          <h4 className='text-xl font-semibold text-white truncate'>{question.questionText}</h4>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {question.options.map((option) => (
            <motion.div 
              key={option._id} 
              whileHover={{ scale: 1.05 }} 
              className={`border-2 rounded-lg py-3 px-5 text-sm md:text-base text-white transition-all duration-200 ${option.isCorrect ? "border-green-500 bg-green-900/20" : "border-red-500 bg-red-900/20"}`}
            >
              {option?.text}
            </motion.div>
          ))}
        </div>
        <div className='flex justify-end'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => deleteQuestionHandler(question)}
              className='bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200'
              active={false}
            >
              Delete
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;