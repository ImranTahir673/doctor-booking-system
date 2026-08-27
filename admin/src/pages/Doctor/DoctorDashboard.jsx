import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { DollarSign, Calendar, Users, CheckCircle, XCircle } from 'lucide-react';

const DoctorDashboard = () => {

    const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
    const { currency } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getDashData();
        }
    }, [dToken]);

    return dashData && (
        <div className='m-5 text-slate-800'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex items-center gap-4 bg-white p-5 border border-slate-200 min-w-56 rounded-2xl shadow-xs'>
                    <div className='p-3 bg-emerald-50 text-emerald-600 rounded-xl'>
                        <DollarSign className='w-8 h-8' />
                    </div>
                    <div>
                        <p className='text-2xl font-bold'>{currency}{dashData.earnings}</p>
                        <p className='text-slate-500 text-xs font-semibold uppercase tracking-wider'>Earnings</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-white p-5 border border-slate-200 min-w-56 rounded-2xl shadow-xs'>
                    <div className='p-3 bg-indigo-50 text-primary rounded-xl'>
                        <Calendar className='w-8 h-8' />
                    </div>
                    <div>
                        <p className='text-2xl font-bold'>{dashData.appointments}</p>
                        <p className='text-slate-500 text-xs font-semibold uppercase tracking-wider'>Appointments</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-white p-5 border border-slate-200 min-w-56 rounded-2xl shadow-xs'>
                    <div className='p-3 bg-indigo-50 text-primary rounded-xl'>
                        <Users className='w-8 h-8' />
                    </div>
                    <div>
                        <p className='text-2xl font-bold'>{dashData.patients}</p>
                        <p className='text-slate-500 text-xs font-semibold uppercase tracking-wider'>Unique Patients</p>
                    </div>
                </div>
            </div>

            <div className='bg-white border border-slate-200 rounded-2xl shadow-xs mt-10 overflow-hidden'>
                <div className='flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 font-bold text-slate-900 bg-slate-50/50'>
                    <Calendar className='w-5 h-5 text-primary' />
                    <p>Latest Bookings</p>
                </div>

                <div className='divide-y divide-slate-100'>
                    {dashData.latestAppointments.map((item, index) => (
                        <div className='flex items-center px-6 py-3.5 gap-4 hover:bg-slate-50/80 transition-all' key={index}>
                            <img className='rounded-xl w-12 h-12 object-cover border bg-indigo-50' src={item.userData.image} alt="" />
                            <div className='flex-1 text-sm'>
                                <p className='text-slate-900 font-bold'>{item.userData.name}</p>
                                <p className='text-slate-500 text-xs'>Slot: {item.slotDate} | {item.slotTime}</p>
                            </div>
                            {item.cancelled ? (
                                <span className='text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full'>Cancelled</span>
                            ) : item.isCompleted ? (
                                <span className='text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full'>Completed</span>
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

export default DoctorDashboard;
