//                         Making schema

const mongoose=require("mongoose");
//➡️ Yahaan hum mongoose library ko import kar rahe hain.
// Mongoose ek ODM (Object Data Modeling) library hai jo MongoDB ke saath kaam karne mein madad karti hai 
// using JavaScript objects.


//meaning of below code is:Yahaan hum url_schema naam ka ek schema object bana rahe hain using 
// mongoose.Schema().Schema batata hai ki hamare database ke document (record) ka structure kaisa hoga 
// — kaunse fields rahenge, unka type kya hoga, required hain ya optional, etc.

const url_schema=new mongoose.Schema(
    {
        short_id:{
            type:String,
            required:true,
            unique:true,
        },
        redirect_url:{          //redirect_url wo original bada URL hai jisko short URL se redirect karenge.
            type:String,
            required:true,
        },
            visit_history:[{                                         //visit_history will be array of objects type
                timestamp:{type:Number}  // Iska matlab jab koi short URL visit karta hai, toh us waqt ka timestamp hum store karte hain.
            }],
    
            createdBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user",
            }
        },
    {
        timestamps:true
        //timestamps: true ka matlab hai MongoDB khud-ba-khud do fields add karega:

    //createdAt: document kab banaya gaya
    //updatedAt: document kab last update hua
    }
)

const URL=mongoose.model("url",url_schema);

// Yahaan hum schema se ek model bana rahe hain jiska naam hai "url".
// Ye model hum MongoDB ke collection se interact karne ke liye use karte hain.
// Model ka naam "url" diya gaya hai, toh MongoDB mein collection ka naam automatically "urls" ban jaayega.

module.exports=URL;
// ➡️ Hum URL model ko export kar rahe hain taaki isse kisi aur file mein require karke use kar sakein.


// 🔚 Final Summary:
// Yeh pura code ek URL shortener app ke liye MongoDB model define karta hai:

// Har short URL ka unique ID (short_id) hota hai.

// Original full URL (redirect_url) store hota hai.

// Jab bhi koi short URL access karta hai, uska timestamp visit history mein store hota hai.

// Created and updated time automatically MongoDB handle karta hai.