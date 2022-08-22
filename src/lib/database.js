import { MongoClient } from 'mongodb';
import { createWriteStream } from 'fs';
import { MONGODB_URI, DB_NAME} from '$env/static/private';

const logFile = "errorlogs/db.txt";
const uri = MONGODB_URI;
const dbName = DB_NAME;
const client = new MongoClient(uri);

const connectToDatabase = async(callBack) => {
    try {
        await client.connect();
        await callBack(client.db(dbName));
    }catch(err){
        const stream = createWriteStream(logFile,{flags: "a"});
        stream.write(`${Math.round(+new Date()/1000)}: ${err} \n`)
    }finally{
        await client.close()
    }
}

export default connectToDatabase;