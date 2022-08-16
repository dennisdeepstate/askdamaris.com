import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { createWriteStream } from 'fs';

dotenv.config();

const logFile = "errorlogs/db.txt";
const uri = process.env['MONGODB_URI'];
const dbName = process.env['DB_NAME'];
const client = new MongoClient(uri);

const connectToDatabase = async(callBack) => {
    try {
        await client.connect();
        await callBack(client.db(dbName))   
    }catch(err){
        const stream = createWriteStream(logFile,{flags: "a"});
        stream.write(`${Math.round(+new Date()/1000)}: ${err} \n`)
    }finally{
        await client.close()
    }
}

export default connectToDatabase;