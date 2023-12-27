import mongoose, { ConnectOptions } from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log('DB Connected before', mongoose.connection.readyState);
        return;
    }

    const _Host: string = process.env.DB_HOST || '';
    const _Port: number = Number(process.env.DB_PORT) || 27017;
    const _User: string = process.env.DB_USERNAME || '';
    const _Pass: string = process.env.DB_PASSW || '';
    const _Database: string = process.env.DB_SCHEMA || '';
    const _ConnectTimeout: number = Number(process.env.DB_CONNECT_TIMEOUT || 5000);

    const HOST = `${_Host}:${_Port}`;
    const Options: ConnectOptions = {
        user: _User,
        pass: _Pass,
        dbName: _Database,
        authSource: _Database,
        connectTimeoutMS: _ConnectTimeout,
        maxPoolSize: 5,
        minPoolSize: 1,
        maxIdleTimeMS: 10000
    };
    
    await mongoose.connect(HOST, Options)
        .then(con => console.log('DB Connected Successfully'))
        .catch(error => console.error('Error connecting db -> ', error));
};

export default dbConnect;