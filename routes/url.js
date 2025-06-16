const express=require("express");


//below line: importing
const {handle_gen_new_shorturl, handle_get_analytics}=require("../controllers/url");

// ➡️ POST /url/ ke liye handle_gen_new_shorturl() chalega
// ➡️ GET /url/analytics/:short_id ke liye handle_get_analytics() chalega
// Ye dono functions kahaan se aaye? — Controllers se.

// [Jump to File 3: controllers/url.js]
// Jaise hi client (ya postman) POST request bhejta hai:
// 2.1 Controller Trigger
// handle_gen_new_shorturl(req, res) execute hota hai.


const router= express.Router();

router.post("/",handle_gen_new_shorturl);


//here we will make a route that analyse the time of visiting means how many time it is visited

// Client ya admin call karta hai:for eg:GET /url/analytics/abc123xy
// Route Trigger
router.get("/analytics/:short_id", handle_get_analytics);
//go to controller function

module.exports=router;
