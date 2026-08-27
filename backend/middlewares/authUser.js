import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login again." });
        }
        const jwtSecret = process.env.JWT_SECRET || "supersecretjwtkey_doctorbooking_2026";
        const token_decode = jwt.verify(token, jwtSecret);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: error.message });
    }
};

export default authUser;
