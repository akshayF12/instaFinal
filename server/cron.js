var cron = require("node-cron");
const Cryptr = require("cryptr");
const cryption = new Cryptr(process.env.ENCRYPTION_STRING || "akshay12") ;
const mongoose = require("mongoose");
const Insta_user = require("../models/InstaUser");
const axios = require("axios");
const cronjob = async () => {
  cron.schedule('00 00 12 * * 0-6',  async() => {
    console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
    const data = await Insta_user.find({});
    if (data) {
      function ourFunc(val, index, arr){
        userdata(val.long_live_access, val._id)
      }
      
      const newArray = data.map(ourFunc);
    }
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
  });

 

  const userdata = async (token, _id) => {
    const insta = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,permalink,timestamp,caption,like_count&access_token=${token}&limit=100`,
      {
        method: "GET",
      }
    );
    if (!insta.ok) {
      const message = `An error has occured: ${insta.status}`;
      return new Error(message);
    }
    const values = await insta.json();
    if (values) {
      const instapost = JSON.stringify(values.data);
      //  console.log(instapost);
      const update_post = await Insta_user.findOneAndUpdate(
        { _id: _id },
        { insta_post: instapost },
        { new: true }
      );
      if (update_post) {
        console.log("post Updated");
        console.log(update_post)
      }
    }
  };
};
export default cronjob;
