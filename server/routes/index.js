/**
 * Combine all routers here
 */

import combineRouters from 'koa-combine-routers';
import instaCreateuser from './insta/InstaCreate';
import instaFinduser from './insta/InstaFind';
import instaUpdateUser from './insta/instaUpdate';
import getSettings from './insta/getSettings';
import setSettings from './insta/setSettings';
import getInstaPostByShop from './insta/getInstaPostByShop';
import InstaProductbyshop from './insta/getInstagramPostProductbyshop';
import delScript from './insta/delScriptTagbyID';
import addNewFeed from './insta/addFeed';
import getInstaPost from './insta/getallInstagramPost';
import deleteInstagramUsers from './insta/deleteInstagramUsers';
import getselected_user from './insta/getSelectedUser';
import instaPostFrontend from './insta/getinstapostFrontend';

const userRoutes = combineRouters(
  instaCreateuser,
  instaFinduser,
  instaUpdateUser,
  getSettings,
  setSettings,
  getInstaPostByShop,
  InstaProductbyshop,
  delScript,
  addNewFeed,
  getInstaPost,
  deleteInstagramUsers,
  getselected_user,
  instaPostFrontend
  // triggerOauth
);

export default userRoutes;
