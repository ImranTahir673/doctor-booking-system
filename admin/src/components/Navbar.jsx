import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck } from 'lucide-react';

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext);

    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
        dToken && setDToken('');
        dToken && localStorage.removeItem('dToken');
    };

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white border-slate-200'>
            <div className='flex items-center gap-3 text-xs'>
                <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer font-bold text-xl text-primary'>
                    <span className='bg-primary text-white px-2.5 py-0.5 rounded-lg shadow-sm'>P</span> Prescripto
                </div>
                <span className='border px-2.5 py-0.5 rounded-full border-slate-300 text-slate-600 font-semibold uppercase tracking-wider text-[10px]'>
                    {aToken ? 'Admin Portal' : 'Doctor Portal'}
                </span>
            </div>

            <button onClick={logout} className='bg-primary text-white text-sm px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-xs'>
                <LogOut className='w-4 h-4' /> Logout
            </button>
        </div>
    );
};

export default Navbar;
