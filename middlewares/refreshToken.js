import jwt from 'jsonwebtoken';
// import _ from 'lodash';
import { User } from "../models/user.js";


export default async function(req, res, next) {
    const refreshToken = req.cookies['refT'];
    if(!refreshToken) return res.status(403).send({ message: 'no token provided' });

    try {
        const payload = jwt.verify(refreshToken, process.env.AREDSON_REFRESH_TOKEN);
        const { id } = payload;
        const user = await User.findById(id);

        if(!user.refreshTokens.includes(refreshToken)) return res.status(401).send({ message: 'session revoked. re-authenticate' });

        req.user = payload;

        const authToken = user.generateAuthToken();
        res.header('x-auth-token', authToken);
        
        next();
    }
    catch(ex) {
        const payload = jwt.decode(refreshToken);
        const userId = payload.id;
        const user = await User.findById(userId);

        switch(ex.message) {
            case 'jwt expired': {
                const validRefreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
                user.refreshTokens = validRefreshTokens;
                res.clearCookie('refT');
                await user.save();

                return res.status(401).send({ message: 'token expired, re-authenticate' });
            }
            case 'invalid signature': return res.status(403).send({ message: ex.message });
            case 'invalid token': return res.status(403).send({ message: ex.message });
            case 'jwt malformed': return res.status(403).send({ message: ex.message });

            default: return res.status(403).send({ message: ex.message });;
        }
    }
}