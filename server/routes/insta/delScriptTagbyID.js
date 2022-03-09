import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
const delScript = new Router();
// import verifyWebhook from '../../middleware/verifyWebhook';    //use this webhook for shopify originate only
const UserController = require("../../controller/InstaUsercontroller");
delScript.post('/gdpr/insta/delscript', bodyParser(), UserController.delScriptTagbyid, async (ctx) => {

});

export default delScript;