import database from '$lib/database.js';
let users;
const getUsers = async(db) =>{
    users = await db.collection('users').find({name: "gilly"}).toArray();
}
database(getUsers);
export async function get({request}) {
    return {
        status: 200,
        body: {
            users
        }
    }
}

