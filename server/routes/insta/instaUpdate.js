import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const instaUpdateUser = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
instaUpdateUser.post('/gdpr/insta/update_insta_post', bodyParser(), UserController.updateInstapost, async (ctx) => {
});

export default instaUpdateUser;