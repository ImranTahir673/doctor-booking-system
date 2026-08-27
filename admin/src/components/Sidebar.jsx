import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, UserPlus, Users, UserCheck } from 'lucide-react';

const Sidebar = () => {

    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return (
        <div className='min-h-screen bg-white border-r border-slate-200 w-64 flex-shrink-0 pt-5'>
            {aToken && (
                <ul className='text-slate-600 font-medium text-sm flex flex-col gap-1'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-6 cursor-pointer border-r-4 ${isActive ? 'bg-indigo-50 border-primary text-primary font-bold' : 'border-white hover:bg-slate-50'}`} to={'/admin-dashboard'}>
                        <LayoutDashboard className='w-5 h-5' />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-6 cursor-pointer border-r-4 ${isActive ? 'bg-indigo-50 border-primary text-primary font-bold' : 'border-white hover:bg-slate-50'}`} to={'/all-appointments'}>
                        <Calendar className='w-5 h-5' />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-6 cursor-pointer border-r-4 ${isActive ? 'bg-indigo-50 border-primary text-primary font-bold' : 'border-white hover:bg-slate-50'}`} to={'/add-doctor'}>
                        <UserPlus className='w-5 h-5' />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-6 cursor-pointer border-r-4 ${isActive ? 'bg-indigo-50 border-primary text-primary font-bold' : 'border-white hover:bg-slate-50'}`} to={'/doctor-list'}>
                        <Users className='w-5 h-5' />
                        <p>Doctors List</p>
                    </NavLink>
                </ul>
            )}

            {dToken && (
                <ul className='text-slate-600 font-medium text-sm flex flex-col gap-1'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-6 cursor-pointer border-r-4 ${isActive ? 'bg-indigo-50 border-primary text-primary font-bold' : 'border-white hover:bg-slate-50'}`} to={'/doctor-dashboard'}>
                        <LayoutDashboard className='w-5 h-5' />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-6 cursor-pointer border-r-4 ${isActive ? 'bg-indigo-50 border-primary text-primary font-bold' : 'border-white hover:bg-slate-50'}`} to={'/doctor-appointments'}>
                        <Calendar className='w-5 h-5' />
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-6 cursor-pointer border-r-4 ${isActive ? 'bg-indigo-50 border-primary text-primary font-bold' : 'border-white hover:bg-slate-50'}`} to={'/doctor-profile'}>
                        <UserCheck className='w-5 h-5' />
                        <p>Profile</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
