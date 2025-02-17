import { useLocation } from 'react-router-dom';
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, User, ClipboardList, PlusCircle, History } from 'lucide-react';
import Button from '../components/Button';
import { logout } from '../services/operations/AuthAPIs';
import { useDispatch, useSelector } from 'react-redux';

const DashboardLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(state => state.auth);

    return (
        <section className="p-5">
            <div className="flex py-4 px-6 justify-between items-center bg-slate-900 bg-opacity-80 shadow-lg rounded-xl border border-slate-700 backdrop-blur-md">
                <span className="space-x-3 text-sm md:text-base flex items-center gap-3">
                    <NavLink to="/dashboard" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-slate-700 ${location.pathname === "/dashboard" && "bg-slate-600"}`}>
                        <User size={20} /> Profile
                    </NavLink>
                    {
                        user.role === "admin" ? (
                            <>
                                <Link to="/dashboard/create-quiz" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-slate-700 ${location.pathname.includes("create") && "bg-slate-600"}`}>
                                    <PlusCircle size={20} /> Create
                                </Link>
                                <Link to="/dashboard/quizes" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-slate-700 ${location.pathname.includes("quizes") && "bg-slate-600"}`}>
                                    <ClipboardList size={20} /> Quizzes
                                </Link>
                            </>
                        ) : (
                            <Link to="/dashboard/history" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-slate-700 ${location.pathname.includes("history") && "bg-slate-600"}`}>
                                <History size={20} /> History
                            </Link>
                        )
                    }
                </span>
                <span>
                    <Button active={false} onClick={() => logout(dispatch, navigate)} className="flex items-center gap-2">
                        <LogOut size={20} /> Logout
                    </Button>
                </span>
            </div>
            <div className="mt-5">
                {children}
            </div>
        </section>
    );
};

export default DashboardLayout;
