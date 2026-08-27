import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CheckCircle, XCircle } from 'lucide-react';

const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
];

const Doctors = () => {

    const { speciality } = useParams();
    const { doctors } = useContext(AppContext);
    const [filterDoc, setFilterDoc] = useState([]);
    const navigate = useNavigate();

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    return (
        <div>
            <p className='text-slate-600 font-medium'>Browse through the doctors specialist.</p>
            <div className='flex flex-col sm:flex-row items-start gap-8 mt-5'>
                {/* Speciality Filter sidebar */}
                <div className='flex flex-col gap-3 text-sm text-slate-600 w-full sm:w-64 flex-shrink-0'>
                    {specialities.map((item, index) => (
                        <p
                            key={index}
                            onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
                            className={`w-full pl-4 py-2.5 pr-16 border border-slate-200 rounded-xl cursor-pointer transition-all font-medium ${speciality === item ? 'bg-primary text-white border-primary shadow-sm' : 'hover:bg-slate-100'}`}
                        >
                            {item}
                        </p>
                    ))}
                </div>

                {/* Doctors Grid */}
                <div className='w-full grid grid-cols-auto gap-6 gap-y-8'>
                    {filterDoc.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/appointment/${item._id}`)}
                            className='border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white shadow-sm'
                        >
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
        </div>
    );
};

export default Doctors;
