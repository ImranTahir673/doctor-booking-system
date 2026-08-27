import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { CheckCircle, XCircle } from 'lucide-react';

const DoctorsList = () => {

    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    return (
        <div className='m-5 max-h-[90vh] overflow-y-auto'>
            <h1 className='text-xl font-bold text-slate-800 mb-4'>All Doctors</h1>
            <div className='w-full grid grid-cols-auto gap-4 gap-y-6 pt-2'>
                {doctors.map((item, index) => (
                    <div className='border border-slate-200 rounded-2xl overflow-hidden group hover:border-primary transition-all bg-white shadow-xs' key={index}>
                        <img className='w-full h-44 object-cover bg-indigo-50 group-hover:scale-105 transition-all duration-500' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <p className='text-slate-900 font-bold text-base'>{item.name}</p>
                            <p className='text-slate-500 text-xs font-medium mb-3'>{item.speciality}</p>
                            <div className='flex items-center gap-2 text-xs'>
                                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} className='cursor-pointer accent-primary w-4 h-4' />
                                <span className={item.available ? 'text-emerald-600 font-semibold' : 'text-red-500 font-semibold'}>
                                    {item.available ? 'Available' : 'Unavailable'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
