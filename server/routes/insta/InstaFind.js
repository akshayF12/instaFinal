import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const instaFinduser = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
instaFinduser.post('/gdpr/insta/find_by_user_id', bodyParser(), UserController.getInstapostByshopid, async (ctx) => {
  ctx.status = 200;
});

export default instaFinduser;