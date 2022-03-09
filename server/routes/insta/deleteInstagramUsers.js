import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const deleteinstausers = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
deleteinstausers.delete('/gdpr/insta/delete_insta_users', bodyParser(), UserController.deleteinstaUsers, async (ctx) => {
});

export default deleteinstausers;