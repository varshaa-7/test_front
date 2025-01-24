import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import quizi from '../assests/qimg.png'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between py-3'>
            <Link to={"/"} className='flex items-center'>
  <img
    src={quizi} // Replace this with your imported image path
    alt="Quizzy Logo"
    className="w-40 h-auto" // Increase "w-20" to "w-40" for a larger image
  />
</Link>

            <div className='flex gap-5'>
                <NavLink to={"/"} className={({ isActive }) => isActive === true ? "text-blue-600" : "text-white"}>
                    Home
                </NavLink>
                <NavLink to={"/dashboard"} className={({ isActive }) => isActive === true ? "text-blue-600" : "text-white"}>
                    Dashboard
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar