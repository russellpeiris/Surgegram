import jwt from 'jsonwebtoken';
//has to be placed before the last login in the route
export const verifyToken = async(req, res, next)=>{

    try {
        let token  = req.header("Authorization");

        if(!token){
            return res.status(403).send("Please SignIn first!");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}