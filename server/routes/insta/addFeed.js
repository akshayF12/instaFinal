import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const addNewFeed = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
addNewFeed.post('/gdpr/insta/add_new_feed', bodyParser(), UserController.addNewFeedUser, async (ctx) => {
});

export default addNewFeed;