import React from 'react';
import { ArrowRight, Calendar, ShieldCheck, Users } from 'lucide-react';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-3xl px-6 md:px-12 lg:px-20 py-12 text-white shadow-xl overflow-hidden relative'>
            
            {/* Left Side */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-6 z-10'>
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/20'>
                    <ShieldCheck className='w-4 h-4 text-emerald-300' /> Certified Trusted Specialists
                </div>
                <h1 className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight'>
                    Book Appointment <br /> With Trusted Doctors
                </h1>
                <p className='text-indigo-100 text-sm md:text-base max-w-lg font-light leading-relaxed'>
                    Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free, and take control of your healthcare journey today.
                </p>
                <a href='#speciality' className='flex items-center gap-2 bg-white text-slate-800 px-8 py-3.5 rounded-full font-semibold text-sm hover:scale-105 transition-all shadow-lg'>
                    Book appointment <ArrowRight className='w-4 h-4 text-primary' />
                </a>
            </div>

            {/* Right Side / Decorative Graphic */}
            <div className='md:w-1/2 flex items-center justify-center relative mt-6 md:mt-0'>
                <div className='w-72 h-72 lg:w-96 lg:h-96 bg-white/10 rounded-full flex items-center justify-center border border-white/20 p-6 backdrop-blur-sm'>
                    <div className='text-center flex flex-col items-center gap-4'>
                        <div className='bg-white text-primary p-4 rounded-2xl shadow-lg'>
                            <Calendar className='w-12 h-12' />
                        </div>
                        <p className='font-bold text-xl'>100+ Top Doctors</p>
                        <p className='text-xs text-indigo-100 px-6'>Instant Slot Booking • Instant Confirmations • 24/7 Access</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;
