import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const getAllPost = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
getAllPost.post('/gdpr/insta/get_insta_post_user', bodyParser(), UserController.getInstaPost, async (ctx) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
});

export default getAllPost;