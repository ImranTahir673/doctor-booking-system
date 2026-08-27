import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

const Appointment = () => {

    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const navigate = useNavigate();

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const fetchDocInfo = async () => {
        const doc = doctors.find((doc) => doc._id === docId);
        setDocInfo(doc);
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);

        // Get current date
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const isSlotAvailable = docInfo?.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true;

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]));
        }
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Please login to book an appointment');
            return navigate('/login');
        }

        if (!slotTime) {
            toast.warn('Please select a time slot');
            return;
        }

        try {
            const date = docSlots[slotIndex][0].datetime;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = day + "_" + month + "_" + year;

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo();
        }
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);

    return docInfo && (
        <div className='py-6'>
            {/* Doctor Details Card */}
            <div className='flex flex-col sm:flex-row gap-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm'>
                <div>
                    <img className='w-full sm:w-72 rounded-2xl bg-indigo-50 border object-cover' src={docInfo.image} alt={docInfo.name} />
                </div>

                <div className='flex-1 flex flex-col justify-between'>
                    <div>
                        <div className='flex items-center gap-3'>
                            <h2 className='text-2xl font-bold text-slate-900'>{docInfo.name}</h2>
                            <CheckCircle2 className='w-5 h-5 text-primary' />
                        </div>
                        <div className='flex items-center gap-2 mt-1 text-sm text-slate-600 font-medium'>
                            <p>{docInfo.degree} - {docInfo.speciality}</p>
                            <span className='bg-indigo-50 text-primary text-xs px-2.5 py-0.5 rounded-full border border-indigo-100 font-semibold'>{docInfo.experience}</span>
                        </div>
                        <div className='mt-4'>
                            <p className='font-bold text-sm text-slate-800 mb-1'>About Doctor:</p>
                            <p className='text-slate-500 text-sm leading-relaxed'>{docInfo.about}</p>
                        </div>
                    </div>

                    <div className='mt-6 pt-4 border-t border-slate-100 flex items-center justify-between'>
                        <p className='text-slate-700 font-medium text-lg'>
                            Appointment fee: <span className='text-primary font-bold'>{currencySymbol}{docInfo.fees}</span>
                        </p>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${docInfo.available ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            {docInfo.available ? 'Accepting Patients' : 'Currently Unavailable'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Booking Slots */}
            <div className='mt-8 sm:ml-4 font-medium text-slate-700'>
                <p className='text-xl font-bold text-slate-900 mb-4'>Booking Slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-auto no-scrollbar py-2'>
                    {docSlots.length > 0 && docSlots.map((item, index) => (
                        <div
                            onClick={() => setSlotIndex(index)}
                            className={`text-center py-4 px-6 min-w-20 rounded-2xl cursor-pointer transition-all border ${slotIndex === index ? 'bg-primary text-white border-primary shadow-md scale-105' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                            key={index}
                        >
                            <p className='text-xs font-semibold'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-lg font-bold'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-auto no-scrollbar mt-5 py-2'>
                    {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                        <p
                            onClick={() => setSlotTime(item.time)}
                            className={`text-xs font-semibold flex-shrink-0 px-5 py-2.5 rounded-xl cursor-pointer transition-all border ${item.time === slotTime ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                            key={index}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button
                    onClick={bookAppointment}
                    className='bg-primary text-white font-bold text-sm px-10 py-3.5 rounded-full mt-8 hover:bg-indigo-700 transition-all shadow-md'
                >
                    Book an appointment
                </button>
            </div>

            {/* Listing Related Doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    );
};

export default Appointment;
