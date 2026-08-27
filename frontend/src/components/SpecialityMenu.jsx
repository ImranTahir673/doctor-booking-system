import React from 'react';
import { Link } from 'react-router-dom';

const specialityData = [
    { speciality: 'General physician', icon: '🩺' },
    { speciality: 'Gynecologist', icon: '🤰' },
    { speciality: 'Dermatologist', icon: '🧴' },
    { speciality: 'Pediatricians', icon: '👶' },
    { speciality: 'Neurologist', icon: '🧠' },
    { speciality: 'Gastroenterologist', icon: '🧪' }
];

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 text-slate-800' id='speciality'>
            <h1 className='text-3xl font-bold'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm text-slate-500'>
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
            <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto no-scrollbar px-4'>
                {specialityData.map((item, index) => (
                    <Link onClick={() => window.scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300 group' key={index} to={`/doctors/${item.speciality}`}>
                        <div className='w-20 h-20 sm:w-24 sm:h-24 bg-indigo-50 group-hover:bg-primary rounded-full flex items-center justify-center text-3xl shadow-sm border border-indigo-100 transition-colors'>
                            {item.icon}
                        </div>
                        <p className='pt-3 font-medium text-slate-700 group-hover:text-primary'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
