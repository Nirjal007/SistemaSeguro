const mongoose = require ("mongoose");

const dbConnect = async () => {
    try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log(`Database connected : ${connect.connection.host}, ${connect.connection.name}`);
    } catch (err) {
        console.log(err);
        process.exit(1); // Stop the server if DB connection fails

    }
};
module.exports = dbConnect;