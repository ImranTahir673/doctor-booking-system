import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { backendUrl, token, setToken } = useContext(AppContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    toast.success("Account created successfully!");
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    toast.success("Logged in successfully!");
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center py-10'>
            <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-[400px] border border-slate-200 rounded-3xl text-slate-600 text-sm shadow-xl bg-white'>
                <p className='text-2xl font-bold text-slate-900'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
                <p className='text-xs text-slate-500'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>

                {state === 'Sign Up' && (
                    <div className='w-full'>
                        <p className='font-medium mb-1'>Full Name</p>
                        <input className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>
                )}

                <div className='w-full'>
                    <p className='font-medium mb-1'>Email</p>
                    <input className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>

                <div className='w-full'>
                    <p className='font-medium mb-1'>Password</p>
                    <input className='border border-slate-200 rounded-xl w-full p-2.5 outline-primary' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </div>

                <button type='submit' className='bg-primary text-white w-full py-3 rounded-xl font-bold text-base hover:bg-indigo-700 transition-all shadow-md mt-2'>
                    {state === 'Sign Up' ? 'Create account' : 'Login'}
                </button>

                {state === 'Sign Up' ? (
                    <p className='text-xs'>
                        Already have an account?{' '}
                        <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer font-semibold'>
                            Login here
                        </span>
                    </p>
                ) : (
                    <p className='text-xs'>
                        Create a new account?{' '}
                        <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer font-semibold'>
                            Click here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;
