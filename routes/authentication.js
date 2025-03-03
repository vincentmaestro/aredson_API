import Joi from 'joi';
import express from 'express';
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import { User } from '../models/user.js';

const authentication = express.Router();

authentication.post('/', async (req, res) => {
    const { error } = validateSignin(req.body);
    if(error) return res.status(400).send({ message: error.details[0].message });

    const emailPattern = /^\w+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2,4})?$/;
    const emailAuth = emailPattern.test(req.body.user);


    let user = emailAuth ? await User.findOne({ email: req.body.user }) : await User.findOne({ username: req.body.user });
    if(!user) return res.status(400).send({ message: 'Incorrect credentials' });

    if(user.isDisabled || !user.password) return res.status(403).send({ message: 'Pending Approval.'});

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) return res.status(400).send({ message: 'Incorrect credentials' });

    const refreshToken = user.generateRefreshToken();
    await user.save();
    res.cookie('refT', refreshToken, { httpOnly: true, maxAge: 2678400000, secure: true });
    
    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(_.omit(user.toObject(), ['_id', '__v', 'createdAt', 'isDisabled', 'password', 'refreshTokens']));
});

function validateSignin(input) {
    const inputSChema = Joi.object({
        user: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(6).max(15).required(),
        username: Joi.string().min(3).max(12)
    });

    return inputSChema.validate({
        user: input.user,
        password: input.password
    });
}

export { authentication, validateSignin };