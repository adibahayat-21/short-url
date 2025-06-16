
const{v4:uuidv4}=require("uuid");
const User=require("../models/users")
const { setUser }=require("../service/auth");

async function handle_user_signup(req,res)
{
    const{name,email,password}=req.body;
    await User.create({name,email,password})
    return res.redirect("/");
}

async function handle_user_login(req,res)
{
    const{email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user)
        return res.render("login",{ error:"Invalid username or password" })
    // const session_id=uuidv4();
    // setUser(session_id,user);
    
    const token=setUser(user);
    // res.cookie("uid",session_id);
    res.cookie("uid",token);
    return res.redirect("/");
}

module.exports={
    handle_user_signup,
    handle_user_login,
}