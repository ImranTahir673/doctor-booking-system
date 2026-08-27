import bcrypt from 'bcrypt';

const initialDoctors = [
    {
        _id: "doc1",
        name: "Dr. Richard James",
        email: "richard@prescripto.com",
        password: "",
        speciality: "General physician",
        degree: "MBBS, MD",
        experience: "4 Years",
        about: "Dr. Richard James has a commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 50,
        address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80",
        available: true,
        date: Date.now(),
        slots_booked: {}
    },
    {
        _id: "doc2",
        name: "Dr. Emily Larson",
        email: "emily@prescripto.com",
        password: "",
        speciality: "Gynecologist",
        degree: "MBBS, MS",
        experience: "3 Years",
        about: "Dr. Emily Larson specializes in women's reproductive health, prenatal care, and gynecological surgery with compassionate care.",
        fees: 60,
        address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&w=500&q=80",
        available: true,
        date: Date.now(),
        slots_booked: {}
    },
    {
        _id: "doc3",
        name: "Dr. Sarah Patel",
        email: "sarah@prescripto.com",
        password: "",
        speciality: "Dermatologist",
        degree: "MBBS, DVD",
        experience: "1 Year",
        about: "Dr. Sarah Patel is an expert in clinical dermatology, skin care treatments, and cosmetic procedures with modern techniques.",
        fees: 40,
        address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
        available: true,
        date: Date.now(),
        slots_booked: {}
    },
    {
        _id: "doc4",
        name: "Dr. Christopher Lee",
        email: "christopher@prescripto.com",
        password: "",
        speciality: "Pediatricians",
        degree: "MBBS, DCH",
        experience: "5 Years",
        about: "Dr. Christopher Lee provides complete child healthcare from infancy through adolescence, ensuring healthy growth and development.",
        fees: 55,
        address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
        available: true,
        date: Date.now(),
        slots_booked: {}
    },
    {
        _id: "doc5",
        name: "Dr. Jennifer Garcia",
        email: "jennifer@prescripto.com",
        password: "",
        speciality: "Neurologist",
        degree: "MBBS, DM",
        experience: "10+ Years",
        about: "Dr. Jennifer Garcia specializes in diagnosing and treating complex neurological disorders, brain health, and nerve diseases.",
        fees: 80,
        address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&w=500&q=80",
        available: true,
        date: Date.now(),
        slots_booked: {}
    },
    {
        _id: "doc6",
        name: "Dr. Andrew Williams",
        email: "andrew@prescripto.com",
        password: "",
        speciality: "Gastroenterologist",
        degree: "MBBS, DNB",
        experience: "4 Years",
        about: "Dr. Andrew Williams offers advanced digestive system diagnosis, endoscopic procedures, and liver disease management.",
        fees: 70,
        address: { line1: "67th Cross, Richmond", line2: "Circle, Ring Road, London" },
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80",
        available: true,
        date: Date.now(),
        slots_booked: {}
    },
    {
        _id: "doc7",
        name: "Dr. Sophia Martinez",
        email: "sophia@prescripto.com",
        password: "",
        speciality: "Dermatologist",
        degree: "MBBS, MD Dermatology",
        experience: "6 Years",
        about: "Dr. Sophia Martinez specializes in cosmetic dermatology, laser treatments, and acne solutions.",
        fees: 65,
        address: { line1: "12th Avenue, Central Park", line2: "New York" },
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
        available: true,
        date: Date.now(),
        slots_booked: {}
    },
    {
        _id: "doc8",
        name: "Dr. Michael Chen",
        email: "michael@prescripto.com",
        password: "",
        speciality: "General physician",
        degree: "MBBS, FACP",
        experience: "8 Years",
        about: "Dr. Michael Chen is an expert general physician dedicated to family health and preventive wellness.",
        fees: 55,
        address: { line1: "88 Market St", line2: "San Francisco" },
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80",
        available: true,
        date: Date.now(),
        slots_booked: {}
    }
];

class MemoryStore {
    constructor() {
        this.users = [];
        this.doctors = [...initialDoctors];
        this.appointments = [];
        this.initPassword();
    }

    async initPassword() {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash("doctor123", salt);
        this.doctors.forEach(d => d.password = hashed);
    }
}

export const memoryStore = new MemoryStore();
