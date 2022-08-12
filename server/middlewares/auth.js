import jwt from "jsonwebtoken";
import config from "config";
async function authMiddleware(req,res,next) {
    try {
        let decoded = jwt.verify(req.headers["auth-token"], config.get("SECRET_KEYS.JWT"));
        req.user = decoded;// passing parameter to the next middleware.
        next();
    } catch (error) {
        // console.log(error);
        return res.status(401).json({ error: 'Unauthorised or Token Expired' });
    }
}

export default authMiddleware; 


// Middlewares are basically the actions occuring in between the request and response cycle.
//Note : Sharing variables between middleware is only possibe via req obj
