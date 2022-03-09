import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion , DataType } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
var cors = require('koa-cors');
import userRoutes from './routes';
import  cronjob from "./cron";

dotenv.config();
cronjob();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();
// session and database 
const Cryptr = require("cryptr");
const cryption = new Cryptr(process.env.ENCRYPTION_STRING || "akshay12");
const host_ngrok = process.env.HOST;
const mongoose = require("mongoose");
const Insta_user = require("../models/InstaUser");
const sessionStorage = require("../utils/sessionStorage.js");
const SessionModel = require("../models/SessionModel.js");

// MARK:- MongoDB Connection
const mongoUrl =process.env.MONGO_URL ;
mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("--> There was an error connecting to MongoDB:", err.message);
    } else {
      console.log("--> Connected to MongoDB");
    }
  }
);

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\/|\/$/g, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        console.log(ctx.state.shopify);
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.get("/api/init_fauna", async (ctx) => {
  const shop = ctx.query.shop || (await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res))?.shop;
  const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
  console.log("s",session.id)
  const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const script_tag = await client.get({
      path: 'script_tags',
    });
    const getscript_tag = script_tag.body.script_tags;
    console.log(getscript_tag);

  const result = await SessionModel.findOne({ shop: session.shop });
  if (result === null) {
    await SessionModel.create({
      id: session.id,
      content: cryption.encrypt(JSON.stringify(session)),
      shop: session.shop,
    });
  } else {
    await SessionModel.findOneAndUpdate(
      { shop: session.shop },
      {
        content: cryption.encrypt(JSON.stringify(session)),
        id: session.id,
      }
    );
  }
  try {
    const result = await SessionModel.findOne({ shop: shop });
    const shop_data = result.content;
    const decryptedString = cryption.decrypt(shop_data);
    const shop_obj = JSON.parse(decryptedString);
    const Token = shop_obj.accessToken;
    const client = new Shopify.Clients.Rest(shop, Token);
    ctx.body = await client.get({
    path: 'shop',
   });
   ctx.status = 200;
    } catch (error) {
      ctx.body = error.message
    }
  return true;
  });

  router.get("/api/theme", async (ctx) => {
    const shop = ctx.query.shop || (await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res))?.shop;
    const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
    
    const result = await SessionModel.findOne({ shop: session.shop });
    try {
      const result = await SessionModel.findOne({ shop: shop });
      const shop_data = result.content;
      const decryptedString = cryption.decrypt(shop_data);
      const shop_obj = JSON.parse(decryptedString);
      const Token = shop_obj.accessToken;
      const client = new Shopify.Clients.Rest(shop, Token);
      const themes = await client.get({
      path: 'themes',
     });
     const themeId = themes.body.themes.filter(({ role }) => role === "main")[0].id;
     const assetURL = `https://${shop}/admin/themes/${themeId}/editor?context=apps`;
     ctx.body = assetURL;
     ctx.status = 200;
      } catch (error) {
        ctx.body = error.message
      }
    return true;
    });

  router.get("/instagram/shop/redirect_url", async (ctx) => {
    ctx.body="redirecting..."
  });

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", async (ctx) => {
  const shop = ctx.query.shop ;
    console.log("rS",shop)
    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  server.use(router.allowedMethods());
  server.use(router.routes()).use(router.allowedMethods())
  server.use(cors());
  server.use(userRoutes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});