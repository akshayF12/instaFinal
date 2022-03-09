import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const getproductSettings = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
getproductSettings.post('/gdpr/insta/product_settings', bodyParser(), UserController.getSettingsProduct, async (ctx) => {
});

export default getproductSettings;