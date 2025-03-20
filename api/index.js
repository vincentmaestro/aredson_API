import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDb from '../db/db.js';
import user from '../routes/user.js';
import { authentication } from '../routes/authentication.js';

const app = express();
app.listen('3000', () => console.log('app started'));
connectToDb();

app.get("/", (req, res) => res.send("\\{^_^}/ hi!"));

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', user);
app.use('/api/auth', authentication);
app.use((ex, req, res) => {
    return res.status(500).send({ message: ex.message });
});
