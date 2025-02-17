import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import RequiredError from '../components/RequiredError'
import { login } from '../services/operations/AuthAPIs'
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const LogIn = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Logging in...")
    try {
      const response = await login(data, dispatch)
      if (response) {
        navigate("/dashboard")
      }
    } catch (e) {
      console.log("ERROR WHILE LOGGING IN:", e);
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center relative">
      {/* Blurry Glass Effect */}
      <div className="absolute inset-0 backdrop-blur-md"></div>

      <motion.div 
  initial={{ opacity: 0, y: 50 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.8, ease: "easeOut" }} 
  className="relative z-10 bg-white/10 backdrop-blur-lg shadow-xl border border-gray-700 rounded-xl p-10 max-w-md w-full text-white shadow-blue-500/50"
>

        <h3 className="text-4xl font-bold text-center tracking-wide">Log In</h3>

        {loading && (
          <p className="text-center text-red-500 text-sm mt-2">
            First-time login may take a moment. Please wait!
          </p>
        )}

        <form 
          onSubmit={handleSubmit(submitHandler)} 
          className="flex flex-col gap-5 mt-6"
        >
          
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-lg">Email</label>
            <motion.input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full border border-gray-600 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && <RequiredError>{errors.email.message}</RequiredError>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-lg">Password</label>
            <div className="relative w-full">
              <motion.input
                id="password"
                type={hidePassword ? "password" : "text"}
                placeholder="Enter your password"
                className="p-3 w-full border border-gray-600 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
                {...register("password", { required: "Password is required" })}
              />
              <span 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? <TbEyeClosed /> : <TbEyeCheck />}
              </span>
            </div>
            {errors?.password && <RequiredError>{errors.password.message}</RequiredError>}
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="mt-5 bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white py-3 rounded-lg font-semibold text-lg tracking-wide"
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Submit"}
          </motion.button>

          {/* Sign Up Link */}
          <p className="text-center mt-4 text-gray-300">
            Don't have an account? 
            <span 
              onClick={() => navigate("/signup")} 
              className="cursor-pointer text-blue-400 hover:underline ml-1"
            >
              Sign Up
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default LogIn
