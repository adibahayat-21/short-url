// const session_id_to_user_map=new Map();
const jwt=require("jsonwebtoken")
const secret="adiba8299";
function setUser(user)      
{
    // session_id_to_user_map.set(id,user);
    return jwt.sign({
         _id:user._id,
         email:user.email,
         role:user.role,   // include role in token
    },secret);         //this particular function makes token for us.
}

function getUser(token)
{
    // return session_id_to_user_map.get(id);
    if(!token)
        return null;
    try{
    return jwt.verify(token,secret);
    }catch(error)
    {
        return null;
    }
}

module.exports={
    setUser,
    getUser,
}