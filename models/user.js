import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

function validateUser(input) {
    const inputSChema = Joi.object({
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(30).required().email(),
        password: Joi.string().min(6).max(15),
        phone: Joi.string().min(10).max(15).required(),
        country: Joi.string().min(3).max(20).required(),
        city: Joi.string().min(3).max(20).required(),
        priceRange: Joi.string().min(2).max(11).required(),
        motivation: Joi.string().min(5).max(30).required()
    });

    return inputSChema.validate({
        name: input.name,
        email: input.email,
        password: input.password,
        phone: input.phone,
        country: input.country,
        city: input.city,
        priceRange: input.priceRange,
        motivation: input.motivation
    });
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 30,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 10,
        maxlength: 128
    },
    username: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 12
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 15,
        required: true
    },
    location: {
        country: {
            type: String,
            minlength: 3,
            maxlength: 20,
            required: true
        },
        city: {
            type: String,
            minlength: 3,
            maxlength: 20,
            required: true
        }
    },
    bookings: [{
        priceRange: {
            type: String,
            enum: [ '200M - 400M', '500M - 1B', '1B - 3B', 'Above 3B' ],
            required: true
        },
        motivation: {
            type: String,
            minlength: 5,
            maxlength: 30,
            required: true
        }
    }],
    isDisabled: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    refreshTokens: [String]
});

userSchema.methods.generateAuthToken = function() {
   return jwt.sign({ id: this._id }, process.env.AREDSON_AUTH_TOKEN, { expiresIn: '1h' });
}
userSchema.methods.generateRefreshToken = function() {
    const refreshToken = jwt.sign({ id: this._id }, process.env.AREDSON_REFRESH_TOKEN, { expiresIn: '30d' });
    this.refreshTokens.push(refreshToken);
    return refreshToken;
}

const User = mongoose.model('user', userSchema);

export { User, validateUser };