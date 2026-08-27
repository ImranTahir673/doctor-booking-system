import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import { memoryStore } from '../config/memoryStore.js';
import mongoose from 'mongoose';

const isDbConnected = () => mongoose.connection.readyState === 1;

// User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Enter a strong password (min 8 chars)" });
        }

        if (isDbConnected()) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "User already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new userModel({ name, email, password: hashedPassword });
            const user = await newUser.save();

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(201).json({ success: true, token });
        } else {
            // Memory Store Fallback
            const existingUser = memoryStore.users.find(u => u.email === email);
            if (existingUser) {
                return res.status(400).json({ success: false, message: "User already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = {
                _id: "usr_" + Date.now(),
                name,
                email,
                password: hashedPassword,
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
                address: { line1: "123 Main St", line2: "City Center" },
                gender: "Not Selected",
                dob: "2000-01-01",
                phone: "0000000000"
            };

            memoryStore.users.push(user);
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(201).json({ success: true, token });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user;

        if (isDbConnected()) {
            user = await userModel.findOne({ email });
        } else {
            user = memoryStore.users.find(u => u.email === email);
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get User Profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        let userData;

        if (isDbConnected()) {
            userData = await userModel.findById(userId).select('-password');
        } else {
            userData = memoryStore.users.find(u => u._id === userId);
        }

        if (userData) {
            const { password, ...safeUser } = userData;
            res.status(200).json({ success: true, userData: safeUser });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;

        let parsedAddress = address;
        if (typeof address === 'string') {
            try {
                parsedAddress = JSON.parse(address);
            } catch (e) {
                parsedAddress = { line1: address, line2: '' };
            }
        }

        if (isDbConnected()) {
            await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender });
        } else {
            const user = memoryStore.users.find(u => u._id === userId);
            if (user) {
                user.name = name || user.name;
                user.phone = phone || user.phone;
                user.address = parsedAddress || user.address;
                user.dob = dob || user.dob;
                user.gender = gender || user.gender;
            }
        }

        res.status(200).json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Book Appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        let docData;
        let userData;

        if (isDbConnected()) {
            docData = await doctorModel.findById(docId).select('-password');
            userData = await userModel.findById(userId).select('-password');
        } else {
            docData = memoryStore.doctors.find(d => d._id === docId);
            userData = memoryStore.users.find(u => u._id === userId);
        }

        if (!docData) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        if (!docData.available) {
            return res.status(400).json({ success: false, message: 'Doctor not available' });
        }

        let slots_booked = docData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({ success: false, message: 'Slot not available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const appointmentData = {
            _id: "apt_" + Date.now(),
            userId,
            docId,
            userData: userData || { name: "Patient", email: "patient@example.com" },
            docData: { name: docData.name, speciality: docData.speciality, image: docData.image, address: docData.address },
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
            cancelled: false,
            payment: false,
            isCompleted: false
        };

        if (isDbConnected()) {
            const newAppointment = new appointmentModel(appointmentData);
            await newAppointment.save();
            await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        } else {
            docData.slots_booked = slots_booked;
            memoryStore.appointments.push(appointmentData);
        }

        res.status(201).json({ success: true, message: 'Appointment Booked Successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// List User Appointments
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        let appointments = [];

        if (isDbConnected()) {
            appointments = await appointmentModel.find({ userId });
        } else {
            appointments = memoryStore.appointments.filter(a => a.userId === userId);
        }

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel Appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        if (isDbConnected()) {
            const appointmentData = await appointmentModel.findById(appointmentId);
            if (appointmentData && appointmentData.userId === userId) {
                await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
                const { docId, slotDate, slotTime } = appointmentData;
                const doctorData = await doctorModel.findById(docId);
                let slots_booked = doctorData.slots_booked;
                slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
                await doctorModel.findByIdAndUpdate(docId, { slots_booked });
            }
        } else {
            const apt = memoryStore.appointments.find(a => a._id === appointmentId && a.userId === userId);
            if (apt) {
                apt.cancelled = true;
                const doc = memoryStore.doctors.find(d => d._id === apt.docId);
                if (doc && doc.slots_booked[apt.slotDate]) {
                    doc.slots_booked[apt.slotDate] = doc.slots_booked[apt.slotDate].filter(e => e !== apt.slotTime);
                }
            }
        }

        res.status(200).json({ success: true, message: 'Appointment Cancelled' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };
