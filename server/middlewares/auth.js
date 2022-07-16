const admin = require("../firebase");

exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        console.log("Firebase user in authcheck", firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (error) {
        console.log("Err...", error);
        res.status(401).json({ err: "Invalid or expired token" });
        return;
    }
};
