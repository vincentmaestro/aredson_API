// import cors from 'cors';
import jwt from 'jsonwebtoken';
import refreshToken from './refreshToken.js';

export default function(req, res, next) {
    try {
        const authToken = req.header('x-auth-token');
        if(!authToken) return refreshToken(req, res, next);
    
        const user = jwt.verify(authToken, process.env.AREDSON_AUTH_TOKEN);
        req.user = user;
    
        next();
    }
    catch(ex) {
        switch(ex.message) {
            case 'jwt expired': return refreshToken(req, res, next);
            case 'invalid signature': return res.status(403).send({ message: ex.message });
            case 'invalid token': return res.status(403).send({ message: ex.message });
            case 'jwt malformed': return res.status(400).send();
        }
    }
}