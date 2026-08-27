import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Upload, UserPlus } from 'lucide-react';

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            if (docImg) formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { atoken: aToken } });

            if (data.success) {
                toast.success(data.message);
                setDocImg(false);
                setName('');
                setEmail('');
                setPassword('');
                setFees('');
                setAbout('');
                setDegree('');
                setAddress1('');
                setAddress2('');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full max-w-4xl text-sm'>
            <p className='mb-4 text-xl font-bold text-slate-800'>Add New Doctor</p>

            <div className='bg-white p-8 border border-slate-200 rounded-3xl shadow-xs space-y-6'>
                <div className='flex items-center gap-4 text-slate-500'>
                    <label htmlFor="doc-img" className='cursor-pointer flex items-center gap-3 bg-indigo-50 border border-indigo-100 p-4 rounded-2xl hover:bg-indigo-100 transition-all'>
                        {docImg ? (
                            <img className='w-16 h-16 rounded-xl object-cover' src={URL.createObjectURL(docImg)} alt="" />
                        ) : (
                            <Upload className='w-8 h-8 text-primary' />
                        )}
                        <div>
                            <p className='font-bold text-slate-800 text-sm'>Upload Doctor Picture</p>
                            <p className='text-xs text-slate-400'>JPG, PNG or WEBP (Optional)</p>
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <p className='font-medium mb-1'>Doctor Name</p>
                        <input className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary' type="text" placeholder='Dr. Richard James' onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>

                    <div>
                        <p className='font-medium mb-1'>Doctor Email</p>
                        <input className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary' type="email" placeholder='doctor@prescripto.com' onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>

                    <div>
                        <p className='font-medium mb-1'>Doctor Password</p>
                        <input className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary' type="password" placeholder='Min 8 characters' onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>

                    <div>
                        <p className='font-medium mb-1'>Experience</p>
                        <select className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary bg-white' onChange={(e) => setExperience(e.target.value)} value={experience}>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>
                            <option value="3 Years">3 Years</option>
                            <option value="4 Years">4 Years</option>
                            <option value="5 Years">5 Years</option>
                            <option value="10+ Years">10+ Years</option>
                        </select>
                    </div>

                    <div>
                        <p className='font-medium mb-1'>Fees ($)</p>
                        <input className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary' type="number" placeholder='50' onChange={(e) => setFees(e.target.value)} value={fees} required />
                    </div>

                    <div>
                        <p className='font-medium mb-1'>Speciality</p>
                        <select className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary bg-white' onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div>
                        <p className='font-medium mb-1'>Education / Degree</p>
                        <input className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary' type="text" placeholder='MBBS, MD' onChange={(e) => setDegree(e.target.value)} value={degree} required />
                    </div>

                    <div>
                        <p className='font-medium mb-1'>Address Line 1</p>
                        <input className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary' type="text" placeholder='Address line 1' onChange={(e) => setAddress1(e.target.value)} value={address1} required />
                    </div>
                </div>

                <div>
                    <p className='font-medium mb-1'>About Doctor</p>
                    <textarea className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary rows=4' placeholder='Write a brief summary of the doctor...' onChange={(e) => setAbout(e.target.value)} value={about} required></textarea>
                </div>

                <button type='submit' className='bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2'>
                    <UserPlus className='w-4 h-4' /> Add Doctor
                </button>
            </div>
        </form>
    );
};

export default AddDoctor;
