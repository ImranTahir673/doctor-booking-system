import React from 'react';
import { ShieldCheck, Clock, Award } from 'lucide-react';

const About = () => {
    return (
        <div className='py-6 text-slate-700'>
            <div className='text-center text-2xl font-bold text-slate-800 pt-4'>
                <p>ABOUT <span className='text-primary'>US</span></p>
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-12 items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm'>
                <div className='w-full md:w-1/2 bg-indigo-50 p-8 rounded-2xl flex flex-col gap-4 text-slate-600'>
                    <h3 className='text-xl font-bold text-primary'>Welcome to Prescripto</h3>
                    <p>Your trusted partner in managing your healthcare needs conveniently and efficiently.</p>
                    <p>At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
                </div>
                <div className='flex-1 flex flex-col gap-4 text-slate-600 leading-relaxed'>
                    <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.</p>
                    <b className='text-slate-900'>Our Vision</b>
                    <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
                </div>
            </div>

            <div className='text-xl font-bold text-slate-800 my-4'>
                <p>WHY <span className='text-primary'>CHOOSE US</span></p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-6'>
                <div className='border border-slate-200 p-8 rounded-2xl bg-white hover:border-primary transition-all shadow-xs flex flex-col gap-3'>
                    <ShieldCheck className='w-8 h-8 text-primary' />
                    <b className='text-slate-900 text-lg'>EFFICIENCY</b>
                    <p className='text-sm text-slate-500'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>
                <div className='border border-slate-200 p-8 rounded-2xl bg-white hover:border-primary transition-all shadow-xs flex flex-col gap-3'>
                    <Clock className='w-8 h-8 text-primary' />
                    <b className='text-slate-900 text-lg'>CONVENIENCE</b>
                    <p className='text-sm text-slate-500'>Access to a network of trusted healthcare professionals in your area.</p>
                </div>
                <div className='border border-slate-200 p-8 rounded-2xl bg-white hover:border-primary transition-all shadow-xs flex flex-col gap-3'>
                    <Award className='w-8 h-8 text-primary' />
                    <b className='text-slate-900 text-lg'>PERSONALIZATION</b>
                    <p className='text-sm text-slate-500'>Tailored reminders and health insights to help you stay on top of your health.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
