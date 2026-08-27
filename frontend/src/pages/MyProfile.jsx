import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User, Phone, MapPin, Calendar, Edit3, Save } from 'lucide-react';

const MyProfile = () => {

    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return userData && (
        <div className='max-w-lg flex flex-col gap-4 text-sm py-6'>
            <div className='flex items-center gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm'>
                <img className='w-24 h-24 rounded-2xl object-cover border-2 border-primary' src={userData.image} alt="" />
                <div>
                    {isEdit ? (
                        <input className='bg-slate-50 text-xl font-bold border border-slate-300 rounded-lg px-2 py-1 outline-primary' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                    ) : (
                        <p className='font-bold text-2xl text-slate-900'>{userData.name}</p>
                    )}
                    <p className='text-slate-500 font-medium'>{userData.email}</p>
                </div>
            </div>

            <hr className='border-slate-200 my-2' />

            <div className='bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col gap-4'>
                <p className='text-slate-800 font-bold text-base uppercase tracking-wider text-xs text-primary'>Contact Information</p>

                <div className='grid grid-cols-[1fr_3fr] gap-y-3 font-medium text-slate-600'>
                    <p className='flex items-center gap-1.5'><Phone className='w-4 h-4 text-slate-400' /> Phone:</p>
                    {isEdit ? (
                        <input className='bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 outline-primary' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                    ) : (
                        <p className='text-primary font-semibold'>{userData.phone}</p>
                    )}

                    <p className='flex items-center gap-1.5'><MapPin className='w-4 h-4 text-slate-400' /> Address:</p>
                    {isEdit ? (
                        <div className='flex flex-col gap-1'>
                            <input className='bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 outline-primary' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <input className='bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 outline-primary' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                        </div>
                    ) : (
                        <p className='text-slate-700'>{userData.address.line1}<br />{userData.address.line2}</p>
                    )}
                </div>

                <p className='text-slate-800 font-bold text-base uppercase tracking-wider text-xs text-primary mt-2'>Basic Information</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 font-medium text-slate-600'>
                    <p>Gender:</p>
                    {isEdit ? (
                        <select className='bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 outline-primary' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p className='text-slate-700'>{userData.gender}</p>
                    )}

                    <p className='flex items-center gap-1.5'><Calendar className='w-4 h-4 text-slate-400' /> Birthday:</p>
                    {isEdit ? (
                        <input className='bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 outline-primary' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                    ) : (
                        <p className='text-slate-700'>{userData.dob}</p>
                    )}
                </div>

                <div className='mt-4 flex gap-4'>
                    {isEdit ? (
                        <button onClick={updateUserProfileData} className='bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-sm'>
                            <Save className='w-4 h-4' /> Save Information
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

export default MyProfile;
