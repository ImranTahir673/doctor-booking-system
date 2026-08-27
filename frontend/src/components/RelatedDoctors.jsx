import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const [relDoc, setRelDocs] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDocs(doctorsData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-slate-900 md:mx-10'>
            <h1 className='text-3xl font-bold'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm text-slate-500'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-6 pt-5 gap-y-8 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }} className='border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white shadow-sm' key={index}>
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
        </div>
    );
};

export default RelatedDoctors;
