import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt';

const sampleDoctors = [
    {
        name: "Dr. Richard James",
        email: "richard@prescripto.com",
        speciality: "General physician",
        degree: "MBBS, MD",
        experience: "4 Years",
        about: "Dr. Richard James has a commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 50,
        address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80",
        available: true
    },
    {
        name: "Dr. Emily Larson",
        email: "emily@prescripto.com",
        speciality: "Gynecologist",
        degree: "MBBS, MS",
        experience: "3 Years",
        about: "Dr. Emily Larson specializes in women's reproductive health, prenatal care, and gynecological surgery with compassionate care.",
        fees: 60,
        address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&w=500&q=80",
        available: true
    },
    {
        name: "Dr. Sarah Patel",
        email: "sarah@prescripto.com",
        speciality: "Dermatologist",
        degree: "MBBS, DVD",
        experience: "1 Year",
        about: "Dr. Sarah Patel is an expert in clinical dermatology, skin care treatments, and cosmetic procedures with modern techniques.",
        fees: 40,
        address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
        available: true
    },
    {
        name: "Dr. Christopher Lee",
        email: "christopher@prescripto.com",
        speciality: "Pediatricians",
        degree: "MBBS, DCH",
        experience: "5 Years",
        about: "Dr. Christopher Lee provides complete child healthcare from infancy through adolescence, ensuring healthy growth and development.",
        fees: 55,
        address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
        available: true
    },
    {
        name: "Dr. Jennifer Garcia",
        email: "jennifer@prescripto.com",
        speciality: "Neurologist",
        degree: "MBBS, DM",
        experience: "10+ Years",
        about: "Dr. Jennifer Garcia specializes in diagnosing and treating complex neurological disorders, brain health, and nerve diseases.",
        fees: 80,
        address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&w=500&q=80",
        available: true
    },
    {
        name: "Dr. Andrew Williams",
        email: "andrew@prescripto.com",
        speciality: "Gastroenterologist",
        degree: "MBBS, DNB",
        experience: "4 Years",
        about: "Dr. Andrew Williams offers advanced digestive system diagnosis, endoscopic procedures, and liver disease management.",
        fees: 70,
        address: { line1: "67th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80",
        available: true
    }
];

export const seedDoctors = async () => {
    try {
        const count = await doctorModel.countDocuments();
        if (count === 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("doctor123", salt);

            const doctorsToInsert = sampleDoctors.map(doc => ({
                ...doc,
                password: hashedPassword,
                date: Date.now(),
                slots_booked: {}
            }));

            await doctorModel.insertMany(doctorsToInsert);
            console.log("Seeded initial doctors data successfully");
        }
    } catch (err) {
        console.log("Seeding error:", err.message);
    }
};
