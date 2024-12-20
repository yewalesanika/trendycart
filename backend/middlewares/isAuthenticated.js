import jwt from "jsonwebtoken"

export const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(400).json({
                message:"You are not logged in",
                success:false
            })
        }

        const decode = await jwt.verify(token,process.env.JWTTOKENSECRETKEY)

        if(!decode)
        {
            return res.status(401).json({
                message: 'Invalid token',
                success : false
            })
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        console.log("IsAuthenticated error",error);
    }
}