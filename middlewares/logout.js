import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export default async function (req, res) {
    const refreshToken = req.cookies['refT'];
    const payload = jwt.verify(refreshToken, process.env.AREDSON_REFRESH_TOKEN);
    const user = await User.findById(payload.id);

    res.clearCookie('refT');
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    await user.save();

    res.status(204).send();
}