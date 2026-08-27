import React from 'react';
import { Mail, Phone, MapPin, Building } from 'lucide-react';

const Contact = () => {
    return (
        <div className='py-6 text-slate-700'>
            <div className='text-center text-2xl font-bold text-slate-800 pt-4'>
                <p>CONTACT <span className='text-primary'>US</span></p>
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-10 justify-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm items-center'>
                <div className='w-full md:w-1/2 bg-indigo-50 p-8 rounded-2xl flex flex-col gap-6'>
                    <div className='flex items-center gap-3 text-slate-800 font-bold text-lg'>
                        <Building className='w-6 h-6 text-primary' /> OUR OFFICE
                    </div>
                    <div className='flex items-start gap-3 text-sm text-slate-600'>
                        <MapPin className='w-5 h-5 text-primary flex-shrink-0 mt-0.5' />
                        <p>54709 Willms Station <br /> Suite 350, Washington, USA</p>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-slate-600'>
                        <Phone className='w-5 h-5 text-primary flex-shrink-0' />
                        <p>Tel: (415) 555-0132</p>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-slate-600'>
                        <Mail className='w-5 h-5 text-primary flex-shrink-0' />
                        <p>Email: admin@prescripto.com</p>
                    </div>
                </div>

                <div className='flex-1 flex flex-col gap-4 text-slate-600'>
                    <b className='text-slate-900 text-lg'>CAREERS AT PRESCRIPTO</b>
                    <p className='text-sm text-slate-500'>Learn more about our teams and job openings.</p>
                    <button className='border border-slate-900 text-slate-900 text-sm font-bold px-8 py-3.5 rounded-xl hover:bg-slate-900 hover:text-white transition-all self-start shadow-xs'>
                        Explore Jobs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;
