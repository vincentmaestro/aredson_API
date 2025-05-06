import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDb from '../db/db.js';
import user from '../routes/user.js';
import { authentication } from '../routes/authentication.js';

const app = express();
app.listen('3000', () => console.log('app started'));
connectToDb();

app.get("/", (req, res) => res.send("\\{^_^}/ hi!"));

const whitelist = ['http://localhost:5173', 'https://aredson.com'];
function validateOrigin(origin, callback) {
    if(whitelist.indexOf(origin) !== -1) {
        callback(null, true);
    }
    else {
        callback(new Error('Not allowed by CORS'));
    }
}

app.use(cors({ origin: validateOrigin, allowedHeaders: ['Content-Type', 'x-auth-token'], exposedHeaders: ['x-auth-token'], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', user);
app.use('/api/auth', authentication);
app.use((ex, req, res) => {
    return res.status(500).send({ message: ex.message });
});
