import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const InstaPostbyShop = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
InstaPostbyShop.post('/gdpr/insta/getinstapost/shop', bodyParser(), UserController.getInstagramPostByShopName, async (ctx) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
});

export default InstaPostbyShop;