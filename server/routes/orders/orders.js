import Router from '@koa/router';
import { verifyRequest } from '@shopify/koa-shopify-auth';
import Shopify from '@shopify/shopify-api';
const ordersRoute = new Router();
import verifySessionActive from '../../middleware/verifySessionActive';

ordersRoute.get('/api/orders', verifyRequest({ returnHeader: true }), verifySessionActive(), async (ctx) => {
  try {
    console.log('All orders route hit');
    const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const orders = await client.get({
      path: 'orders',
    });
    console.log('Orders:');
    console.log(orders.body.orders);
    ctx.response.body = orders.body.orders;
  } catch (err) {
    console.log(err);
    ctx.throw(500, 'Server thrown error inside Orders route');
  }
});

export default ordersRoute;
