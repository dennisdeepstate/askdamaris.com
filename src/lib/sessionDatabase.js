import { createClient } from 'redis';
import { createWriteStream } from 'fs';

const expiry = 60 * 60 * 24;
const logFile = "errorlogs/sessiondb.txt";

async function connectToSessionDatabase(callBack){
    try{
        const client = createClient();
        await client.connect();
        await callBack(client);
    }catch(err){
        const stream = createWriteStream(logFile,{flags: "a"});
        stream.write(`${Math.round(+new Date()/1000)}: ${err} \n`)
    }
}



export { connectToSessionDatabase, expiry }