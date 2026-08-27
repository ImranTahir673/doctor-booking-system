import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Users, Calendar, UserCheck, XCircle } from 'lucide-react';

const Dashboard = () => {

    const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    return dashData && (
        <div className='m-5 text-slate-800'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex items-center gap-4 bg-white p-5 border border-slate-200 min-w-56 rounded-2xl shadow-xs'>
                    <div className='p-3 bg-indigo-50 text-primary rounded-xl'>
                        <UserCheck className='w-8 h-8' />
                    </div>
                    <div>
                        <p className='text-2xl font-bold'>{dashData.doctors}</p>
                        <p className='text-slate-500 text-xs font-semibold uppercase tracking-wider'>Doctors</p>
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
                        <p className='text-slate-500 text-xs font-semibold uppercase tracking-wider'>Patients</p>
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
                            <img className='rounded-xl w-12 h-12 object-cover border bg-indigo-50' src={item.docData.image} alt="" />
                            <div className='flex-1 text-sm'>
                                <p className='text-slate-900 font-bold'>{item.docData.name}</p>
                                <p className='text-slate-500 text-xs'>Booking on {item.slotDate}</p>
                            </div>
                            {item.cancelled ? (
                                <span className='text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full'>Cancelled</span>
                            ) : item.isCompleted ? (
                                <span className='text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full'>Completed</span>
                            ) : (
                                <button onClick={() => cancelAppointment(item._id)} className='text-xs font-semibold text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all'>
                                    <XCircle className='w-5 h-5' />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
