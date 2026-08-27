import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Save, Edit3 } from 'lucide-react';

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
    const { currency } = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available
            };

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dtoken: dToken } });
            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken]);

    return profileData && (
        <div className='m-5 max-w-2xl text-sm'>
            <div className='bg-white p-8 border border-slate-200 rounded-3xl shadow-xs space-y-6'>
                <div className='flex items-center gap-6'>
                    <img className='w-28 h-28 rounded-2xl object-cover bg-indigo-50 border-2 border-primary' src={profileData.image} alt="" />
                    <div>
                        <h2 className='text-2xl font-bold text-slate-900'>{profileData.name}</h2>
                        <p className='text-slate-500 font-medium'>{profileData.degree} - {profileData.speciality}</p>
                        <span className='bg-indigo-50 text-primary text-xs px-3 py-1 rounded-full font-bold inline-block mt-2 border border-indigo-100'>
                            {profileData.experience} Experience
                        </span>
                    </div>
                </div>

                <div className='border-t border-slate-100 pt-4 space-y-3'>
                    <p className='font-bold text-slate-900 text-base'>About Doctor:</p>
                    <p className='text-slate-500 leading-relaxed'>{profileData.about}</p>
                </div>

                <div className='border-t border-slate-100 pt-4 space-y-4'>
                    <div className='flex items-center gap-4'>
                        <p className='font-bold text-slate-900'>Appointment Fee:</p>
                        {isEdit ? (
                            <input className='border border-slate-300 rounded-lg px-2 py-1 outline-primary w-24' type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} />
                        ) : (
                            <p className='text-primary font-bold'>{currency}{profileData.fees}</p>
                        )}
                    </div>

                    <div className='flex items-center gap-3'>
                        <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} type="checkbox" checked={profileData.available} disabled={!isEdit} className='w-4 h-4 accent-primary' />
                        <label className='font-semibold text-slate-700'>Available for Appointments</label>
                    </div>
                </div>

                <div className='border-t border-slate-100 pt-4'>
                    {isEdit ? (
                        <button onClick={updateProfile} className='bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-sm'>
                            <Save className='w-4 h-4' /> Save Changes
                        </button>
                    ) : (
                        <button onClick={() => setIsEdit(true)} className='border border-primary text-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center gap-2 shadow-xs'>
                            <Edit3 className='w-4 h-4' /> Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
