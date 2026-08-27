import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Not Authorized. Doctor token missing." });
        }
        const jwtSecret = process.env.JWT_SECRET || "supersecretjwtkey_doctorbooking_2026";
        const token_decode = jwt.verify(dtoken, jwtSecret);
        req.body.docId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: error.message });
    }
};

export default authDoctor;
