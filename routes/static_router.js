const express=require("express");
const URL=require("../models/url");
const { restrict_to } = require("../middlewares/auth");
const router=express.Router();

router.get("/",restrict_to(["NORMAL"]), async (req,res)=>{
    const all_urls=await URL.find({createdBy:req.user._id});
    res.render("home",{urls:all_urls});
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.get("/login",(req,res)=>{
    return res.render("login");
})
module.exports=router;
