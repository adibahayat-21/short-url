const express = require("express");
// express ek node.js ka framework hai — jisse hum server banate hain.
//iske through hum routes, middleware, and servers handle karte hain.

const path=require("path");   //path is a built-in module in node.js 

const cookieParser=require("cookie-parser");

const {check_for_authentication,restrict_to}= require("./middlewares/auth")
const { connect_mongodb } = require("./connect");
// MongoDB se connection wala function import kiya.



const URL=require("./models/url");
// ➡️ URL: Yeh MongoDB model hai jiska schema define kiya gaya hai — iska kaam database mein data save/lookup/update karna hoga.


const url_route = require("./routes/url");
// ➡️ url_route: Yeh wo route file hai jahan par tumne POST / aur GET /analytics/:short_id define kiye hain.
// ➡️ Ye route file hume url ko short karne aur analytics data fetch karne ke liye kaam aata hai

const static_route=require("./routes/static_router");

const user_route=require("./routes/users");

const PORT = 8001;

const app = express();
app.use(express.json()); // Move this line here to parse JSON request bodies

// Express ka object bana rahe hain aur express.json() ka matlab hai:
// Jab client se koi JSON data aayega ({ "url": "https://..." }) toh wo handle ho jaaye.

app.use(express.urlencoded({ extended:false}))

app.use(cookieParser());

app.use(check_for_authentication);


app.use(express.static('public'));

//in below line we are telling the server that we are using view engine ejs (means we are setting the view engine here)
app.set("view engine","ejs");         
//we also make a views folder in which we can make ejs files, ejs files are basically html files.
//and in that ejs file we simply write html code.
//we make the ejs file and now we will also tell the server that where the file is located. but to tell it the
//path firstly we have to use the module for this then only we are able to give the path here.

//const path = require("path"); like this, but we have to declare this above where all the modules are required.

app.set("views",path.resolve("./views"));
//here we tell our express that all the views files are inside the views folder. by writing there directory 
//like: ./views


app.get("/test",async (req,res)=>{
    const all_url=await URL.find({});
    // return res.end(
    //     // `
    //     // <html>
    //     // <head></head>
    //     // <body>
    //     // <ol>
    //     // ${all_url.map(url=>`<li>${url.short_id}-${url.redirect_url}-${url.visit_history.length}</li>`).join('')}
    //     // </ol>
    //     // </body>
    //     // </html>
    //     // `
    // );

    //now we dont need to write the html here becuause now we have ejs file for this we simply render it like:
    return res.render("home",
        {
            //we can also send data like this 
            urls:all_url,
        }
    );   //because our ejs file name is home.ejs that's why we pass home here
})

//above,is a one of the method of writing html codes inside this but it is not a good practise to write there
//  because if we write all the html codes here then route have to handle all this.and it also become very 
// difficult because we have to different things like making navbar add styling with css so it is not good 
// practise to do it here, so we have to use some engines for this. like ejs, pug, hbs etc.

 
connect_mongodb("mongodb://localhost:27017/short-url")
    .then(() => console.log("mongo db connected"));
    // [Jump to File 2: connect.js]



 

app.use("/url",restrict_to(["NORMAL"]),url_route); // Add the missing comma here
//url se start hone wali request ko routes/url.js handle karega.
// ➡️ Ab jab bhi koi request /url se start hogi, control chala jaayega routes/url.js file mein.
// [Jump to File 5: routes/url.js]

app.use("/",static_route);    //it means that if anything is starts from this / then it will be handled by static_route

app.use("/user",user_route);

app.get("/url/:short_id",async (req,res)=>{
     const short_id=req.params.short_id;
    //  ➡️ URL me jo bhi last part hai (e.g., abc123xy) wo extract ho gaya.

    const entry= await URL.findOneAndUpdate(
        {
          short_id
        },{
            $push:
            {
                visit_history:{
                    timestamp:Date.now(),
                },
            },
        }
     )

    //  ➡️ MongoDB se wo record dhoondha jaata hai jiska short_id = abc123xy
// ➡️ Aur uske visit_history me ek naya entry add hota hai — current time ka timestamp

    if(entry && entry.redirect_url)                   //yeh redirect_url present h jaha schema define kiya hai.
    //                                                   url.js models m...
     res.redirect(entry.redirect_url)   
    
    //  🚀 Agar data mila aur usmein redirect URL bhi hai, toh user ko uss URL par redirect kar do.
    
    else 
    res.status(404).send("Not found");

//     ❌ Agar data nahi mila ya redirect_url missing hai,

// toh browser ko 404 Not Found bhej do (jaise jab koi page nahi milta).

// Aur ek message bhi show karo: "Short URL not found"

})                                       

// ➡️ Jaise hi match milta hai, user ko redirect kar diya jaata hai

// Agar user browser me localhost:8001/abc123 likhe:

// MongoDB me abc123 search hoga

// Visit timestamp record hoga

// Fir original URL pe redirect kar diya jaayega


app.listen(PORT, () => { // Correct the function call here
    console.log(`server started at port:${PORT}`);
});
