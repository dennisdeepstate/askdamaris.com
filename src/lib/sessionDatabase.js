import { createClient } from 'redis';
import { createWriteStream } from 'fs';

const expiry = 60 * 60 * 24;
const logFile = "errorlogs/sessiondb.txt";

async function connectToSessionDatabase(callBack, data){
    try{
        const client = createClient();
        await client.connect();
        await callBack(client, data);
    }catch(err){
        const stream = createWriteStream(logFile,{flags: "a"});
        stream.write(`${Math.round(+new Date()/1000)}: $lib/sessionDatabase.js: err: ${err} \n`)
    }
}

export { connectToSessionDatabase, expiry }