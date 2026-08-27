import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CheckCircle, XCircle } from 'lucide-react';

const TopDoctors = () => {

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className='flex flex-col items-center gap-4 my-12 text-slate-800 md:mx-10'>
            <h1 className='text-3xl font-bold'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-slate-500'>
                Simply browse through our extensive list of trusted doctors.
            </p>
            <div className='w-full grid grid-cols-auto gap-6 pt-5 gap-y-8 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }} className='border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white shadow-sm hover:shadow-md' key={index}>
                        <img className='w-full h-48 object-cover bg-indigo-50' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-xs font-semibold ${item.available ? 'text-emerald-500' : 'text-red-500'}`}>
                                {item.available ? <CheckCircle className='w-3.5 h-3.5' /> : <XCircle className='w-3.5 h-3.5' />}
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-slate-900 font-bold text-lg mt-1'>{item.name}</p>
                            <p className='text-slate-500 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }} className='bg-indigo-50 text-primary font-semibold px-12 py-3 rounded-full mt-10 hover:bg-primary hover:text-white transition-all shadow-sm'>
                more doctors
            </button>
        </div>
    );
};

export default TopDoctors;
