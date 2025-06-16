
const { getUser }=require("../service/auth")

function check_for_authentication(req,res,next)
{
    const token = req.cookies.uid;  // Read token from cookie named "uid"
    req.user = null;

    if(!token)
        return next();

    const user = getUser(token);

    req.user = user;
    return next();
}

function restrict_to(roles=[])
{
     return function(req,res,next)
     {
        if(!req.user)             //this condition check if you are not already logged in then you will redirect to login page
        return res.redirect("./login");

        if(!roles.includes(req.user.role))
            return res.end("Unauthorized");
    
        return next();
     }
}

module.exports={
    check_for_authentication,
    restrict_to,
}