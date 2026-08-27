import validator from 'validator';
import bcrypt from 'bcrypt';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';
import appointmentModel from '../models/appointmentModel.js';
import jwt from 'jsonwebtoken';
import { memoryStore } from '../config/memoryStore.js';
import mongoose from 'mongoose';

const isDbConnected = () => mongoose.connection.readyState === 1;

// Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add Doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing required details" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let parsedAddress = address;
        if (typeof address === 'string') {
            try {
                parsedAddress = JSON.parse(address);
            } catch (e) {
                parsedAddress = { line1: address, line2: '' };
            }
        }

        const doctorData = {
            _id: "doc_" + Date.now(),
            name,
            email,
            password: hashedPassword,
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80",
            speciality,
            degree,
            experience,
            about,
            fees: Number(fees),
            address: parsedAddress,
            available: true,
            date: Date.now(),
            slots_booked: {}
        };

        if (isDbConnected()) {
            const newDoctor = new doctorModel(doctorData);
            await newDoctor.save();
        } else {
            memoryStore.doctors.push(doctorData);
        }

        res.status(201).json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Doctors for Admin
const allDoctors = async (req, res) => {
    try {
        let doctors = [];
        if (isDbConnected()) {
            doctors = await doctorModel.find({}).select('-password');
        } else {
            doctors = memoryStore.doctors;
        }

        if (!doctors || doctors.length === 0) {
            doctors = memoryStore.doctors;
        }

        res.status(200).json({ success: true, doctors });
    } catch (error) {
        res.status(200).json({ success: true, doctors: memoryStore.doctors });
    }
};

// Change Doctor Availability
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        if (isDbConnected()) {
            const docData = await doctorModel.findById(docId);
            if (docData) {
                await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
            }
        } else {
            const doc = memoryStore.doctors.find(d => d._id === docId);
            if (doc) doc.available = !doc.available;
        }

        res.status(200).json({ success: true, message: 'Doctor availability updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Appointments for Admin
const appointmentsAdmin = async (req, res) => {
    try {
        let appointments = [];
        if (isDbConnected()) {
            appointments = await appointmentModel.find({});
        } else {
            appointments = memoryStore.appointments;
        }

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin Cancel Appointment
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        if (isDbConnected()) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        } else {
            const apt = memoryStore.appointments.find(a => a._id === appointmentId);
            if (apt) apt.cancelled = true;
        }

        res.status(200).json({ success: true, message: 'Appointment Cancelled' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin Dashboard Stats
const adminDashboard = async (req, res) => {
    try {
        let doctors = [];
        let users = [];
        let appointments = [];

        if (isDbConnected()) {
            doctors = await doctorModel.find({});
            users = await userModel.find({});
            appointments = await appointmentModel.find({});
        } else {
            doctors = memoryStore.doctors;
            users = memoryStore.users;
            appointments = memoryStore.appointments;
        }

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: [...appointments].reverse().slice(0, 5)
        };

        res.status(200).json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { loginAdmin, addDoctor, allDoctors, changeAvailability, appointmentsAdmin, appointmentCancel, adminDashboard };
