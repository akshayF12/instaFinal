import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const getselected_user = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
getselected_user.post('/gdpr/insta/get_seletcted_user', bodyParser(), UserController.getinstapostbyselecteduser, async (ctx) => {
});

export default getselected_user;