import { User } from '../models/user.js';

export default async function(req, res, next) {
    const user = await User.findById(req.user.id);
    if(!user.isAdmin) return res.status(403).send({ message: 'you do not have the permission to view this resource' });

    next();
}