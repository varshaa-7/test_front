import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import RequiredError from '../components/RequiredError'
import { signUp } from '../services/operations/AuthAPIs'
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";
import { motion } from 'framer-motion'

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState({ password: true, confirmPassword: true })
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const navigate = useNavigate();

  useEffect(() => { setValue("role", "user") }, [setValue])

  const submitHandler = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Loading...")
    try {
      const response = await signUp(data)
      if (response) navigate("/login")
    } catch (e) {
      console.log("ERROR WHILE SIGNING UP:", e);
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center relative">
      {/* Blurry Glass Effect */}
      <div className="absolute inset-0  backdrop-blur-md"></div>

      <motion.div 
  initial={{ opacity: 0, y: 50 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.8, ease: "easeOut" }} 
  className="relative z-10 bg-white/10 backdrop-blur-lg shadow-xl border border-gray-700 rounded-xl p-10 max-w-md w-full text-white shadow-blue-500/50"
>

        <h3 className="text-4xl font-bold text-center tracking-wide">Create Your Account</h3>

        {loading && (
          <p className="text-center text-red-500 text-sm mt-2">
            First-time loading may take a moment. Please wait!
          </p>
        )}

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-5 mt-6">
          
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-medium text-lg">Username</label>
            <motion.input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="p-3 w-full border border-gray-600 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
              {...register("username", { required: "Username is required" })}
            />
            {errors?.username && <RequiredError>{errors.username.message}</RequiredError>}
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-lg">Password</label>
            <div className="relative w-full">
              <motion.input
                id="password"
                type={hidePassword.password ? "password" : "text"}
                placeholder="Enter your password"
                className="p-3 w-full border border-gray-600 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
                {...register("password", { required: "Password is required" })}
              />
              <span 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                onClick={() => setHidePassword((prev) => ({ ...prev, password: !hidePassword.password }))}
              >
                {hidePassword.password ? <TbEyeClosed /> : <TbEyeCheck />}
              </span>
            </div>
            {errors?.password && <RequiredError>{errors.password.message}</RequiredError>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="font-medium text-lg">Confirm Password</label>
            <div className="relative w-full">
              <motion.input
                id="confirmPassword"
                type={hidePassword.confirmPassword ? "password" : "text"}
                placeholder="Re-enter your password"
                className="p-3 w-full border border-gray-600 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
                {...register("confirmPassword", { required: "Re-enter your password" })}
              />
              <span 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                onClick={() => setHidePassword((prev) => ({ ...prev, confirmPassword: !hidePassword.confirmPassword }))}
              >
                {hidePassword.confirmPassword ? <TbEyeClosed /> : <TbEyeCheck />}
              </span>
            </div>
            {errors?.confirmPassword && <RequiredError>{errors.confirmPassword.message}</RequiredError>}
          </div>

          {/* Role Selection */}
          <div className="flex gap-3 border border-gray-600 p-2 rounded-lg">
            <button
              type="button"
              className={`${role === "user" ? "bg-blue-700 text-white" : "bg-transparent"} px-3 py-1 rounded-lg`}
              onClick={() => { setValue("role", "user"); setRole("user") }}
            >
              User
            </button>
            <button
              type="button"
              className={`${role === "admin" ? "bg-blue-700 text-white" : "bg-transparent"} px-3 py-1 rounded-lg`}
              onClick={() => { setValue("role", "admin"); setRole("admin") }}
            >
              Admin
            </button>
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="mt-5 bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white py-3 rounded-lg font-semibold text-lg tracking-wide"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>

          {/* Login Redirect */}
          <p className="text-center mt-4 text-gray-300">
            Already have an account? 
            <span 
              onClick={() => navigate("/login")} 
              className="cursor-pointer text-blue-400 hover:underline ml-1"
            >
              Log in
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default SignUp
