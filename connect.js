
// MongoDB se jodne wali file

const mongoose=require("mongoose");

async function connect_mongodb(url)
{
    return mongoose.connect(url);
}
// Ye function mongoose.connect() ko call karta hai — ab tumhara app MongoDB ke short-url naam ke database se jud gaya.

// mongoose.connect() MongoDB se jodta hai

// Ye ek reusable function hai jo hum index.js me call karte hain


module.exports={
    connect_mongodb,
}