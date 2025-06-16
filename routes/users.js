//here user related work is done

const express=require("express");

const{handle_user_signup,handle_user_login}=require("../controllers/users")

const router=express.Router();

router.post("/",handle_user_signup);
router.post("/login",handle_user_login);


module.exports=router;
