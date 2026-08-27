import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { CheckCircle, XCircle } from 'lucide-react';

const DoctorAppointments = () => {

    const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
    const { calculateAge, currency } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-4 text-xl font-bold text-slate-800'>Doctor Appointments</p>

            <div className='bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs text-sm'>
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_2fr] grid-flow-col py-3.5 px-6 border-b bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                <div className='divide-y divide-slate-100'>
                    {appointments.map((item, index) => (
                        <div className='flex flex-col sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_2fr] items-center text-slate-700 py-3.5 px-6 gap-2 hover:bg-slate-50/80 transition-all' key={index}>
                            <p className='hidden sm:block font-semibold text-slate-400'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-8 h-8 rounded-full object-cover bg-indigo-50 border' src={item.userData.image} alt="" />
                                <p className='font-bold text-slate-900'>{item.userData.name}</p>
                            </div>
                            <p className='hidden sm:block text-slate-500'>{calculateAge(item.userData.dob)}</p>
                            <p className='text-xs font-semibold bg-indigo-50 text-primary px-2.5 py-1 rounded-lg self-start sm:self-center'>
                                {item.slotDate} | {item.slotTime}
                            </p>
                            <p className='font-bold text-slate-900'>{currency}{item.amount}</p>
                            
                            {item.cancelled ? (
                                <span className='text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full'>Cancelled</span>
                            ) : item.isCompleted ? (
                                <span className='text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full'>Completed</span>
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <button onClick={() => cancelAppointment(item._id)} className='text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all'>
                                        <XCircle className='w-5 h-5' />
                                    </button>
                                    <button onClick={() => completeAppointment(item._id)} className='text-emerald-500 hover:bg-emerald-50 p-2 rounded-xl transition-all'>
                                        <CheckCircle className='w-5 h-5' />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointments;
