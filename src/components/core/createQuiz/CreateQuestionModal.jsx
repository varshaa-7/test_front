import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { IoAdd, IoClose } from "react-icons/io5";
import { createQuestion } from '../../../services/operations/questionAPIs';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const CreateQuestionModal = ({ quiz, setQuestions, setCreateQuestionModalData }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOption, setCurrentOption] = useState('');
  const [isCurrentOptionCorrect, setIsCurrentOptionCorrect] = useState(false);
  const [optionError, setOptionError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useSelector(state => state.auth);

  const submitHandler = async (data) => {
    if (!options.some(option => option.isCorrect)) {
      setOptionError("There must be at least one correct option.");
      return;
    }
    setLoading(true);
    data.options = options;
    data.quizId = quiz._id;

    try {
      const response = await createQuestion(data, token);

      if (response) {
        setQuestions(prevQuestions => [...prevQuestions, response]);
        setCreateQuestionModalData(null);
      }

    } catch (e) {
      console.error("ERROR WHILE CREATING THE QUESTION:", e);
      toast.error("Question cannot be created");
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    if (isCurrentOptionCorrect && options.some(option => option.isCorrect)) {
      alert("There can be only one correct option.");
      return;
    }
    setOptions([...options, { text: currentOption, isCorrect: isCurrentOptionCorrect }]);
    if (isCurrentOptionCorrect) {
      setOptionError("");
    }
    setCurrentOption('');
    setIsCurrentOptionCorrect(false);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className='fixed inset-0 flex items-center justify-center bg-black/50'
    >
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
        className='p-6 w-[90%] max-w-[500px] bg-slate-800 rounded-lg border border-slate-600 shadow-lg shadow-slate-700 relative'
      >
        <h3 className='text-2xl font-semibold text-white text-center mb-4'>Create a Question</h3>

        <form onSubmit={handleSubmit(submitHandler)} className='w-full flex flex-col gap-5'>

          {/* Question Input */}
          <div className='flex flex-col gap-2'>
            <label className='text-white text-sm' htmlFor="questionText">Enter Question</label>
            <input
              type="text"
              placeholder='Enter question here...'
              className='py-2 px-3 text-base placeholder-gray-400 text-slate-950 rounded-lg outline-none bg-slate-300 focus:ring-2 focus:ring-blue-500 transition-all'
              {...register("questionText", { required: "Question is required" })}
            />
            {errors.questionText && <p className='text-red-500 text-sm'>{errors.questionText.message}</p>}
          </div>

          {/* Options Input */}
          <div className='flex flex-col gap-2'>
            <label className='text-white text-sm' htmlFor="options">Add Options</label>
            <div className='flex flex-col gap-2'>
              <input
                type="text"
                placeholder='Create option...'
                className='py-2 px-3 text-base placeholder-gray-400 text-slate-950 rounded-lg outline-none bg-slate-300 focus:ring-2 focus:ring-blue-500 transition-all'
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
              />
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                  <input
                    type="checkbox"
                    id="isCorrect"
                    checked={isCurrentOptionCorrect}
                    onChange={() => setIsCurrentOptionCorrect(!isCurrentOptionCorrect)}
                  />
                  <label htmlFor="isCorrect" className='text-white text-sm'>Correct option?</label>
                </div>
                <button 
                  onClick={addOption} 
                  type='button'
                  className='bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all'
                >
                  <IoAdd size={20}/> Add
                </button>
              </div>
            </div>
          </div>

          {/* Display Added Options */}
          <div className='flex flex-col gap-2'>
            {options.map((option, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className='flex items-center justify-between bg-slate-700 p-2 rounded-lg'
              >
                <p className='text-white'>{option.text}</p>
                <div className='flex items-center gap-2'>
                  {option.isCorrect && <span className='text-green-400 font-semibold'>(Correct)</span>}
                  <button 
                    type='button' 
                    onClick={() => removeOption(index)} 
                    className='text-red-500 hover:text-red-400 transition-all'
                  >
                    <IoClose size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {optionError && <p className='text-red-500 text-sm'>{optionError}</p>}

          {/* Buttons */}
          <div className='flex justify-end gap-3'>
            <Button 
              onClick={() => setCreateQuestionModalData(null)} 
              className='w-max h-max bg-gray-600 hover:bg-gray-500 text-white' 
              active={false}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading} 
              className='w-max h-max bg-green-600 hover:bg-green-500 text-white' 
              active
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>

        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateQuestionModal;
