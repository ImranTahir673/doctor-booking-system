import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { User, LogOut, Calendar, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {

    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-200'>
            <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer font-bold text-2xl text-primary'>
                <span className='bg-primary text-white px-3 py-1 rounded-lg shadow-md'>P</span> Prescripto
            </div>
            
            <ul className='hidden md:flex items-center gap-6 font-medium text-slate-700'>
                <NavLink to='/'>
                    <li className='py-1 hover:text-primary transition-all'>HOME</li>
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1 hover:text-primary transition-all'>ALL DOCTORS</li>
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1 hover:text-primary transition-all'>ABOUT</li>
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1 hover:text-primary transition-all'>CONTACT</li>
                </NavLink>
                <a href='http://localhost:5174' target='_blank' rel='noreferrer' className='text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full border hover:bg-slate-200 transition-all font-semibold'>
                    ADMIN / DOCTOR PORTAL
                </a>
            </ul>

            <div className='flex items-center gap-4'>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-9 h-9 rounded-full object-cover border-2 border-primary' src={userData.image} alt="" />
                            <ChevronDown className='w-4 h-4 text-slate-500' />
                            <div className='absolute top-full right-0 mt-2 hidden group-hover:block z-20'>
                                <div className='min-w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 text-slate-600 flex flex-col gap-1'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:bg-slate-50 hover:text-primary px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer'>
                                        <User className='w-4 h-4' /> My Profile
                                    </p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:bg-slate-50 hover:text-primary px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer'>
                                        <Calendar className='w-4 h-4' /> My Appointments
                                    </p>
                                    <hr className='my-1 border-slate-100' />
                                    <p onClick={logout} className='hover:bg-red-50 hover:text-red-500 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer text-red-600'>
                                        <LogOut className='w-4 h-4' /> Logout
                                    </p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className='bg-primary text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-indigo-700 transition-all'>
                            Create account
                        </button>
                }
            </div>
        </div>
    );
};

export default Navbar;
