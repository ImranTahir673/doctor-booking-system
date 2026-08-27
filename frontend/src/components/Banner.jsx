import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Banner = () => {

    const navigate = useNavigate();

    return (
        <div className='flex bg-primary rounded-3xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 text-white shadow-xl relative overflow-hidden'>
            {/* Left Side */}
            <div className='flex-1 py-8 sm:py-12 md:py-16 lg:py-24 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-tight'>
                    <p>Book Appointment</p>
                    <p className='mt-2'>With 100+ Trusted Doctors</p>
                </div>
                <button onClick={() => { navigate('/login'); window.scrollTo(0, 0); }} className='bg-white text-slate-800 font-bold px-8 py-3.5 rounded-full mt-6 hover:scale-105 transition-all text-sm shadow-md flex items-center gap-2'>
                    <UserPlus className='w-4 h-4 text-primary' /> Create account
                </button>
            </div>
        </div>
    );
};

export default Banner;
