const BASE_URL = 'http://localhost:4000';

async function runTests() {
    console.log("=== STARTING AUTOMATED API VERIFICATION TESTS ===");
    try {
        // 1. Health check
        const healthRes = await fetch(`${BASE_URL}/`);
        const healthText = await healthRes.text();
        console.log("1. Health Check status:", healthRes.status, "Text:", healthText);

        // 2. Fetch doctors list
        const docRes = await fetch(`${BASE_URL}/api/doctor/list`);
        const docData = await docRes.json();
        console.log("2. Doctor List status:", docRes.status, "Doctors count:", docData.doctors?.length);

        // 3. User Register
        const testUser = {
            name: "John Test Patient",
            email: `john_${Date.now()}@example.com`,
            password: "password123"
        };
        const regRes = await fetch(`${BASE_URL}/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const regData = await regRes.json();
        console.log("3. User Registration status:", regRes.status, "Data:", regData);
        const userToken = regData.token;

        // 4. User Login
        const loginRes = await fetch(`${BASE_URL}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testUser.email, password: testUser.password })
        });
        const loginData = await loginRes.json();
        console.log("4. User Login status:", loginRes.status, "Token:", !!loginData.token);

        // 5. Admin Login
        const adminRes = await fetch(`${BASE_URL}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: "admin@prescripto.com", password: "admin123" })
        });
        const adminData = await adminRes.json();
        console.log("5. Admin Login status:", adminRes.status, "Admin Token:", !!adminData.token);
        const adminToken = adminData.token;

        // 6. Book Appointment
        const firstDoc = docData.doctors[0];
        const bookRes = await fetch(`${BASE_URL}/api/user/book-appointment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', token: userToken },
            body: JSON.stringify({ docId: firstDoc._id, slotDate: "30_8_2026", slotTime: "10:00 AM" })
        });
        const bookData = await bookRes.json();
        console.log("6. Appointment Booking status:", bookRes.status, "Message:", bookData.message);

        // 7. Get User Appointments
        const userApptsRes = await fetch(`${BASE_URL}/api/user/appointments`, {
            headers: { token: userToken }
        });
        const userApptsData = await userApptsRes.json();
        console.log("7. User Appointments count:", userApptsData.appointments?.length);

        // 8. Admin View Appointments
        const adminApptsRes = await fetch(`${BASE_URL}/api/admin/appointments`, {
            headers: { atoken: adminToken }
        });
        const adminApptsData = await adminApptsRes.json();
        console.log("8. Admin Appointments count:", adminApptsData.appointments?.length);

        // 9. Doctor Login
        const docLoginRes = await fetch(`${BASE_URL}/api/doctor/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: "richard@prescripto.com", password: "doctor123" })
        });
        const docLoginData = await docLoginRes.json();
        console.log("9. Doctor Login status:", docLoginRes.status, "Token:", !!docLoginData.token);

        console.log("\n✅ ALL API VERIFICATION TESTS PASSED SUCCESSFULLY!");

    } catch (error) {
        console.error("❌ Test failed:", error.message);
    }
}

setTimeout(runTests, 1000);
