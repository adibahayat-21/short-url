
const {nanoid}=require("nanoid");
//✅ Yahaan hum nanoid package se function import kar rahe hain.

const URL=require("../models/url");
//✅ Hum URL model import kar rahe hain jo pehle wali file (url.js) mein banaya gaya tha.
// Iska use hoga MongoDB ke saath interact karne mein — naye documents create karne ke liye.


//below line explanation:
//Yeh file ek function define karti hai handle_gen_new_shorturl, jo request se URL leta hai, uska short ID 
// banata hai, database mein save karta hai, aur response mein short ID return karta hai.

async function handle_gen_new_shorturl(req,res)
{
    const body=req.body;
    //✅ Request ka body extract kar rahe hain. Ye assume karta hai ki req.body mein client ne JSON bheja hoga jisme URL hoga.

    if(!body.url)
        return res.status(400).json({error:"url is required"})
    // Agar user ne url nahi diya hai request mein, toh 400 Bad Request return hota hai JSON response ke andar 
    // error message: "url is required" aa jaega


      const cr_short_id=nanoid(8);
      // ➡️ Ek 8-character ka unique short_id banta hai — jise hum abc123xy maan lete hain.

      await URL.create({     // MongoDB me Save Karo
        // Field ka naam wahi hota hai jo tumne schema mein diya hai
// 🔸 short_id, redirect_url, visit_history — yeh exact keys use karni padegi kyuki schema define karte waqt 
//humne yhi use kiya tha 

        short_id:cr_short_id,       //uper jaha nanoid(8) ke liye variable use kiya hai whi yaha pr bhi use karna pdega
        redirect_url:body.url,
        visit_history:[],
        createdBy:req.user._id,
      })

      // [Jump to File 4: models/url.js]

// return res.json({
//  id:cr_short_id
//  });   

      //✅ Jab short URL create ho jata hai, tab response bhej rahe hain client ko 
      //but the thing is that here we are returnring response in json format but for UI (as we are working with
      //UI also) so we need to print this generated shirt url in homepage instead in json format so we can do 
      //this:


      return res.render("home",
        {
          id:cr_short_id,          //now we are able to render(show) this url in our web page because now we 
        //                            render it...
        }
      )

}



async function handle_get_analytics(req,res)
{
  const short_id=req.params.short_id;
  const result=await URL.findOne({short_id});
  return res.json({
    total_clicks:result.visit_history.length, 
    analytics:result.visit_history

    // ➡️ MongoDB se data fetch hota hai
    // // ➡️ Kitni baar link pe click hua — uska count (visit_history.length)
    // ➡️ Kab kab click hua — uska record (analytics: [...])
  })
}

//export
module.exports={                   
    handle_gen_new_shorturl,
    handle_get_analytics,
}
//✅ Hum handle_gen_new_shorturl function ko export kar rahe hain taaki isse Express app ke routes mein use kiya ja sake.


// 🔚 Final Summary:
// Ye function kya karta hai:

// Client se URL input leta hai.

// Check karta hai ki URL diya gaya hai ya nahi.

// Ek unique short ID banata hai.

// MongoDB mein data save karta hai.

// Client ko short ID return karta hai.