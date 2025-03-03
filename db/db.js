import mongoose from 'mongoose'

export default async function() {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING);
        console.log('connected to mongodb');
    }
    catch(ex) {
        console.error(ex.message);
    }
}