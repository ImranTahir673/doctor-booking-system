import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            return res.status(401).json({ success: false, message: "Not Authorized. Token missing." });
        }
        const jwtSecret = process.env.JWT_SECRET || "supersecretjwtkey_doctorbooking_2026";
        const adminEmail = process.env.ADMIN_EMAIL || "admin@prescripto.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        const token_decode = jwt.verify(atoken, jwtSecret);
        if (token_decode !== adminEmail + adminPassword) {
            return res.status(403).json({ success: false, message: "Not Authorized as Admin." });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: error.message });
    }
};

export default authAdmin;
