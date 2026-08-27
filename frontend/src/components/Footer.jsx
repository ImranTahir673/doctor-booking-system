import React from 'react';

const Footer = () => {
    return (
        <div className='md:mx-10 mt-20 border-t border-slate-200 pt-10 text-slate-600 text-sm'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10'>
                <div>
                    <div className='flex items-center gap-2 font-bold text-2xl text-primary mb-5'>
                        <span className='bg-primary text-white px-3 py-1 rounded-lg shadow-md'>P</span> Prescripto
                    </div>
                    <p className='w-full md:w-2/3 text-slate-500 leading-6'>
                        Prescripto is a premier healthcare appointment booking platform designed to connect patients seamlessly with top verified doctors across multiple medical specialities.
                    </p>
                </div>

                <div>
                    <p className='text-slate-900 font-bold text-lg mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2'>
                        <li className='hover:text-primary cursor-pointer'>Home</li>
                        <li className='hover:text-primary cursor-pointer'>About us</li>
                        <li className='hover:text-primary cursor-pointer'>Contact us</li>
                        <li className='hover:text-primary cursor-pointer'>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-slate-900 font-bold text-lg mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2'>
                        <li>+1-212-456-7890</li>
                        <li>support@prescripto.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr className='border-slate-200' />
                <p className='py-5 text-xs text-center text-slate-400'>Copyright 2026 @ Prescripto - All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
