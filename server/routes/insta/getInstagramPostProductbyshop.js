import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const InstaProductbyshop = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
InstaProductbyshop.post('/gdpr/insta/getInstaProduct/shop', bodyParser(), UserController.getInstagramPostProductbyshop, async (ctx) => {

});

export default InstaProductbyshop;