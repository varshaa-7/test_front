import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import RequiredError from '../components/RequiredError';
import toast from 'react-hot-toast';
import { createQuiz, updateQuiz } from '../services/operations/QuizAPIs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setEdit, setQuiz } from '../slices/QuizSlice';
import { IoMdArrowForward } from "react-icons/io";

const CreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { edit, quiz } = useSelector((state) => state.quiz);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: quizId } = useParams();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      if (edit) {
        const response = await updateQuiz(data, token, quizId);
        if (response) {
          setValue("title", "");
          setValue("description", "");
          setValue("timer", "");
        }
        navigate("/dashboard/create-quiz/" + response._id);
        return;
      }

      const response = await createQuiz(data, token);
      if (response) {
        setValue("title", "");
        setValue("description", "");
        setValue("timer", "");
        dispatch(setQuiz(response));
        navigate("/dashboard/create-quiz/" + response._id);
        toast.success("Quiz Created Successfully");
      } else {
        throw new Error("Quiz cannot be created at this moment");
      }
    } catch (e) {
      console.log(e);
      toast.error("Quiz cannot be created at this moment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (edit && quiz) {
      setValue("title", quiz.title);
      setValue("description", quiz.description);
      setValue("timer", quiz.timer);
    }
    if (location.pathname === "/dashboard/create-quiz" && edit) {
      dispatch(setEdit(false));
      dispatch(setQuiz(null));
      reset();
    }
  }, [edit, quiz, setValue, location.pathname]);

  return (
    <motion.div
      className="min-h-[70vh] flex flex-col items-center gap-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h3 
        className="text-4xl font-semibold text-center text-blue-400"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {edit ? "Edit Quiz" : "Create Quiz"}
      </motion.h3>

      <motion.form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-[480px] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 text-white py-10 flex flex-col gap-5 p-10 rounded-lg shadow-xl shadow-blue-500"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {/* Title */}
        <span className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg">Title</label>
          <motion.input
            type="text"
            placeholder="Enter Title"
            id="title"
            className="py-2 text-base text-slate-950 rounded-lg px-3 outline-none bg-gray-200 transition-all focus:ring-2 focus:ring-blue-400 xl:text-lg"
            {...register("title", { required: "Title is required" })}
            whileFocus={{ scale: 1.02 }}
          />
          {errors.title && <RequiredError>{errors.title.message}</RequiredError>}
        </span>

        {/* Description */}
        <span className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg">Description</label>
          <motion.textarea
            placeholder="Enter Description"
            id="description"
            rows={4}
            className="py-2 text-base resize-none text-slate-950 rounded-lg px-3 outline-none bg-gray-200 transition-all focus:ring-2 focus:ring-blue-400 xl:text-lg"
            {...register("description")}
            whileFocus={{ scale: 1.02 }}
          />
          {errors.description && <RequiredError>{errors.description.message}</RequiredError>}
        </span>

        {/* Timer */}
        <span className="flex flex-col gap-2">
          <label htmlFor="timer" className="text-lg">Time (minutes)</label>
          <motion.input
            type="number"
            placeholder="5"
            id="timer"
            min={5}
            max={60}
            className="py-2 text-base text-slate-950 rounded-lg px-3 outline-none bg-gray-200 transition-all focus:ring-2 focus:ring-blue-400 xl:text-lg"
            {...register("timer", { required: "Time is required" })}
            whileFocus={{ scale: 1.02 }}
          />
          {errors.timer && <RequiredError>{errors.timer.message}</RequiredError>}
        </span>

        {/* Submit Button */}
        <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button disabled={loading} type="submit">
            {loading ? "Processing..." : edit ? "Update Quiz" : "Create Quiz"}
          </Button>
        </motion.span>

        {/* Skip Button (if editing) */}
        {edit && (
          <motion.button
            type="button"
            className="flex items-center gap-3 justify-center text-blue-300 hover:text-blue-500 transition-all"
            onClick={() => navigate("/dashboard/create-quiz/" + quiz._id)}
            whileHover={{ scale: 1.05 }}
          >
            Skip <IoMdArrowForward />
          </motion.button>
        )}
      </motion.form>
    </motion.div>
  );
};

export default CreateQuiz;
