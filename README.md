# Prescripto - Doctor Appointment Booking System (MERN Stack)

Prescripto is an enterprise-grade full-stack Doctor Appointment Booking web application built with MongoDB, Express.js, React.js, and Node.js. It features a complete 3-tier Role-Based Access Control (RBAC) architecture separating Patients, Doctors, and Administrators.

---

## 🌐 Live Demo Links

- 🔗 **Patient Web App:** [https://frontend-gamma-gilt-15.vercel.app](https://frontend-gamma-gilt-15.vercel.app)
- 🔗 **Admin & Doctor Portal:** [https://admin-black-eta.vercel.app](https://admin-black-eta.vercel.app)

---

## 🌟 Key Features

### 👨‍⚕️ Patient Web App (`/frontend`)
- **Speciality Browsing & Doctor Search:** Filter doctors by 6 medical specialities (General physician, Gynecologist, Dermatologist, Pediatricians, Neurologist, Gastroenterologist).
- **Interactive Booking Calendar:** Dynamic 7-day slot generator with 30-minute intervals. Auto-disables booked slots.
- **User Profile Management:** Edit personal details, avatar, contact information, and address.
- **My Appointments Management:** View appointment status, complete dummy online payments, or cancel scheduled slots.

### 🛡️ Admin & Doctor Portal (`/admin`)
- **Dual-Role Portal Access:** Toggleable login interface for Administrators and Doctors.
- **Admin Features:**
  - **Dashboard Metrics:** Total doctors, total appointments, total patients, and real-time latest booking feeds.
  - **Doctor Management:** Add new doctors with custom fees, credentials, images, and specialities.
  - **Availability Toggle:** Enable/disable doctor availability instantly across the patient network.
  - **System Appointments Control:** Monitor and cancel any appointment system-wide.
- **Doctor Features:**
  - **Doctor Dashboard:** Total earnings tracking, patient count, appointment stats.
  - **Appointment Management:** Mark appointments as "Completed" or "Cancelled".
  - **Profile Management:** Update consultation fees, availability status, and address.

---

## 🗄️ Relational Data Model (4+ Mongoose Collections)

1. **`users` Collection:** Stores patient credentials, profile details, and address objects.
2. **`doctors` Collection:** Stores doctor credentials, speciality, degree, experience, fees, slots_booked, and availability.
3. **`appointments` Collection:** Connects `userId` and `docId` with appointment date, slot time, amount, cancelled state, and completion state.
4. **`admins` / Auth Layer:** Managed via secure JWT token authorization and env credentials.

---

## 🔒 Role-Based Authentication (RBAC)

- `authUser` Middleware: Verifies `token` header for Patient routes.
- `authDoctor` Middleware: Verifies `dtoken` header for Doctor routes.
- `authAdmin` Middleware: Verifies `atoken` header for Admin routes.

---

## 🚀 Getting Started

### 1. Installation
Run `npm install` inside all three directories (`backend`, `frontend`, `admin`).

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

### 2. Environment Variables
Create `.env` inside `/backend`:
```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/doctor-booking
JWT_SECRET=supersecretjwtkey_doctorbooking_2026
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=admin123
```

### 3. Running the Applications

#### Start Backend Server (Port 4000):
```bash
cd backend
npm run dev
```

#### Start Patient Frontend App (Port 5173):
```bash
cd frontend
npm run dev
```

#### Start Admin & Doctor Portal (Port 5174):
```bash
cd admin
npm run dev
```

---

## 🧪 Verification & API Contract

Default Credentials for Testing:
- **Admin Login:** `admin@prescripto.com` / `admin123`
- **Doctor Login:** `richard@prescripto.com` / `doctor123`
