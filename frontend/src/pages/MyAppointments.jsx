import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar, Clock, MapPin, XCircle, CheckCircle } from 'lucide-react';

const MyAppointments = () => {

    const { backendUrl, token, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });

            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getDoctorsData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    return (
        <div className='py-6'>
            <p className='pb-3 text-xl font-bold text-slate-800 border-b border-slate-200'>My Appointments</p>
            <div className='mt-6 flex flex-col gap-4'>
                {appointments.map((item, index) => (
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 border border-slate-200 bg-white rounded-2xl shadow-sm items-start sm:items-center justify-between' key={index}>
                        <div className='flex gap-4 items-center'>
                            <img className='w-24 h-24 bg-indigo-50 rounded-xl object-cover border' src={item.docData.image} alt="" />
                            <div>
                                <p className='text-slate-900 font-bold text-lg'>{item.docData.name}</p>
                                <p className='text-xs font-semibold text-primary mb-2'>{item.docData.speciality}</p>
                                
                                <div className='text-xs text-slate-500 flex flex-col gap-1'>
                                    <p className='flex items-center gap-1.5 font-medium'>
                                        <MapPin className='w-3.5 h-3.5 text-slate-400' />
                                        Address: {item.docData.address.line1}, {item.docData.address.line2}
                                    </p>
                                    <p className='flex items-center gap-1.5 font-semibold text-slate-700 mt-1'>
                                        <Calendar className='w-3.5 h-3.5 text-primary' /> Date & Time: 
                                        <span className='bg-indigo-50 text-primary px-2 py-0.5 rounded-md'>{item.slotDate} | {item.slotTime}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 w-full sm:w-48 text-xs font-medium'>
                            {!item.cancelled && !item.isCompleted && (
                                <button className='py-2 px-4 border border-primary text-primary hover:bg-primary hover:text-white rounded-xl transition-all font-semibold shadow-xs'>
                                    Pay Online (${item.amount})
                                </button>
                            )}

                            {!item.cancelled && !item.isCompleted && (
                                <button onClick={() => cancelAppointment(item._id)} className='py-2 px-4 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold'>
                                    Cancel appointment
                                </button>
                            )}

                            {item.cancelled && (
                                <span className='py-2 px-4 border border-red-200 bg-red-50 text-red-600 rounded-xl text-center font-bold flex items-center justify-center gap-1.5'>
                                    <XCircle className='w-4 h-4' /> Cancelled
                                </span>
                            )}

                            {item.isCompleted && (
                                <span className='py-2 px-4 border border-emerald-200 bg-emerald-50 text-emerald-600 rounded-xl text-center font-bold flex items-center justify-center gap-1.5'>
                                    <CheckCircle className='w-4 h-4' /> Completed
                                </span>
                            )}
                        </div>
                    </div>
                ))}

                {appointments.length === 0 && (
                    <div className='text-center py-16 bg-white rounded-3xl border border-slate-200'>
                        <p className='text-slate-500 font-medium'>No appointments booked yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
