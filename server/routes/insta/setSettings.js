import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const setproductSettings = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
setproductSettings.post('/gdpr/insta/product_settings_set', bodyParser(), UserController.setSettingsProduct, async (ctx) => {
});

export default setproductSettings;