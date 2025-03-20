import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import { User, validateUser } from '../models/user.js';
import { validateSignin } from './authentication.js';
import authorization from '../middlewares/authorize.js'
import admin from '../middlewares/admin.js';
import welcome from '../email/welcome.js';
import logout from '../middlewares/logout.js';

const user = express.Router();

user.get('/', [authorization, admin], async (req, res) => {
    const request = await User.find()
                    .select('-__v -bookings -location -username -password -refreshTokens')
                    .sort('name');
    const users = request.filter(user => user.isAdmin == false);
    return res.send(users);
});

user.get('/getuser/:id', [authorization, admin], async (req, res) => {
    const requestedUserId = req.params.id;

    const requestedUser = await User.findById(requestedUserId);
    if(!requestedUser) return res.status(404).send({ message: 'user not found' });

    res.send(_.omit(requestedUser.toObject(), ['__v', '_id', 'refreshTokens', 'password']));
});

user.get('/me', [cors({ origin: 'https://aredson.vercel.app', methods: 'GET', exposedHeaders: ['x-auth-token'], credentials: true }), authorization], async (req, res) => {
    const id = req.user.id;
    const user = await User.findById(id);

    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(_.omit(user.toObject(), ['_id', '__v', 'createdAt', 'isDisabled', 'password', 'refreshTokens']));
});

user.post('/logout', cors({ origin: 'https://aredson.vercel.app', methods: 'post', credentials: true }), logout);

user.post('/', cors({ origin: 'https://aredson.vercel.app', methods: 'post', allowedHeaders: 'Content-Type' }), async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send({ message: 'user already exists' });

    user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: {
            country: req.body.country,
            city: req.body.city
        },
        bookings: {
            priceRange: req.body.priceRange,
            motivation: req.body.motivation
        }
    });
    await user.save();

    return res.status(201).send( {message: 'Request has been submitted and will be reviewed. \n You will receive an email if your application was approved.' });
});

user.put('/completeregistration', cors({ origin: 'https://aredson.vercel.app', methods: 'put', allowedHeaders: 'Content-Type', credentials: true }), async (req, res) => {
    const { error } = validateSignin(req.body);
    if(error) return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.user });
    if(!user) return res.status(400).send();

    if(user.isDisabled) return res.status(403).send({ message: 'Pending Approval.'});
    if(user.password) return res.status(403).send({ message: 'Not allowed'});
    
    if(req.body.username) {
        const usernameTaken = await User.findOne({ username: req.body.username });
        if(usernameTaken) return res.status(400).send({ message: `Username \"${req.body.username}\" is already taken` });

        user.username = req.body.username;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;

    const refreshToken = user.generateRefreshToken();
    await user.save();
    res.cookie('refT', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 2678400000 });

    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(_.omit(user.toObject(), ['_id', '__v', 'createdAt', 'isDisabled', 'password', 'refreshTokens']));
});

user.put('/enableuser/:id', [authorization, admin], async (req, res) => {
    const selectedUserId = req.params.id;
    if(!selectedUserId) return res.status(400).send();

    const user = await User.findByIdAndUpdate(selectedUserId, { isDisabled: false }, { new: true });
    if(!user) return res.status(400).send();

    const info = await welcome(user.email, user.name);
    if(info.response !== '250 2.0.0 Ok: queued') return res.status(400).send({ message: 'sending mail failed. kindly retry' });

    return res.send({ message: 'User activated and Onboarding email sent' });
});

user.put('/disableuser/:id', [authorization, admin], async (req, res) => {
    const selectedUserId = req.params.id;
    if(!selectedUserId) return res.status(400).send();

    const user = await User.findByIdAndUpdate(selectedUserId, { isDisabled: true }, { new: true });
    if(!user) return res.status(400).send();

    return res.status(200).send({ message: 'user disabled' });
});

user.put('/updateuser/:id', [authorization, admin], async (req, res) => {
    if(!req.query.name) return res.status(400).send({ message: 'name is required' });
    if(!req.query.phone) return res.status(400).send({ message: 'phone is required' });

    const selectedUserId = req.params.id;
    if(!selectedUserId) return res.status(400).send();

    const updatedUser = await User.findByIdAndUpdate(selectedUserId, {
        name: req.query.name,
        phone: req.query.phone,
    }, { new: true });

    if(!updatedUser) return res.status(400).send({ message: 'user may have been updated' });

    res.send(_.omit(updatedUser.toObject(), ['__v', '_id', 'refreshTokens', 'password']));
});

user.delete('/deleteuser/:id', [authorization, admin], async (req, res) => {
    const selectedUserID = req.params.id;
    if(!selectedUserID) return res.status(400).send({ message: 'no user selected' });

    const deletedUser = await User.findByIdAndDelete(selectedUserID);
    if(!deletedUser) return res.status(404).send({ message: 'user not found or may have already been deleted' });

    res.send({ message: 'user deleted successfully' });
});

export default user;
