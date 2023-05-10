const {MongoClient} = require('mongodb');

// Connection URI
const uri =
    "mongodb+srv://agne:qwerty1234@notes.nwwk5fi.mongodb.net/todos";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}