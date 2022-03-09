import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const instaCreateuser = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
instaCreateuser.post('/gdpr/insta/user_create', bodyParser(), UserController.createUser, async (ctx) => {
//   console.log(ctx.request.body);
//   ctx.response.body = { response: 'New Insta Post Created ' };
  ctx.status = 200;
  
});

export default instaCreateuser;