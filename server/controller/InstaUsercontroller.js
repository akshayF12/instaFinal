// const { isNullableType } = require("graphql");
import Shopify, { ApiVersion, DataType } from "@shopify/shopify-api";
const User = require("../../models/InstaUser");
const SessionModel = require("../../models/SessionModel");
const ProductTaggingModel = require("../../models/ProductTagging")
const InstapostModel = require("../../models/InstaUser")
const Cryptr = require("cryptr");
const cryption = new Cryptr(process.env.ENCRYPTION_STRING || "akshay12") ;

class UserController {
  async getInstagramPostByShopName(ctx) {
    const shop_name = ctx.request.body.shop_name;
    const data = await User.findOne({
      shop_name: shop_name,
    });
    if (!data) {
      ctx.body= false;
    } else {
      const result = {
        code: 200,
        data,
      };
      ctx.body = result;
    }
  }

  async getInstaPost(ctx) {
    const shop_name = ctx.request.body.shop_name;
    const data = await User.find({
      shop_name: shop_name,
    });
    if (!data) {
      ctx.body= false;
    } else {
      const result = {
        code: 200,
        data,
      };
      ctx.body = result;
    }
  }


  async getInstapostByshopid(ctx) {
    const shop_id = ctx.request.body.shop_id;
    const data = await User.findOne({
      shop_id: shop_id,
    });
    if (!data) {
      ctx.body= false
    } else {
      const result = {
        code: 200,
        data,
      };
      ctx.body = result;
    }
  }

  async getinstapostbyselecteduser(ctx){
    const shop_name = ctx.request.body.shop_name;
    const user_name = ctx.request.body.user_name;
    const data = await User.findOne({shop_name: shop_name, user_name: user_name});
    if (!data) {
      ctx.body= false
    } else {
      const result = {
        code: 200,
        data,
      };
      ctx.body = result;
    }
  }


  async getInstagramPostProductbyshop(ctx) {
    const shop_name = ctx.request.body.shop_name;
    console.log(shop_name)
    const data = await ProductTaggingModel.find({
      shop_name: shop_name,
    });
    if (!data) {
      ctx.body= false
    } else {
      const result = {
        code: 200,
        data,
      };
      ctx.body = result;
    }
  }

  async delScriptTagbyid(ctx) {
    const script_id = ctx.request.body.script_id;
    const shop =ctx.request.body.shop_name;
  try {
  const result = await SessionModel.findOne({ shop: shop });
  const shop_data = result.content;
  const decryptedString = cryption.decrypt(shop_data);
  const shop_obj = JSON.parse(decryptedString);
  const Token = shop_obj.accessToken;

  const client = new Shopify.Clients.Rest(shop, Token);
  const data = await client.delete({
    path: `script_tags/${script_id}`,
  });
  ctx.body = data;
  } catch (error) {
    ctx.body = error.message
  }
  ctx.status = 200;
  }


  async updateInstapost(ctx) {
    const _id = ctx.request.body._id;
    try {
      const data = await User.findById({ _id }).exec();
      if (data) {
        const update_post = await User.findOneAndUpdate(
          { _id: _id },
          ctx.request.body,
          { new: false }
        );
        const res = {
          code: 200,
          data: { update: true },
        };
        ctx.body = res;
        ctx.status = 200;
      }
    } catch (error) {
      const result = {
        code: 400,
        data: "Connect Your Instagram Account",
      };
      ctx.body = result;
      ctx.status = 400;
    }
  }

  async createUser(ctx) {
    const userid = ctx.request.body.user_id;
    const shop_name = ctx.request.body.shop_name;
    console.log(shop_name);
    try {
      let findbyshop = await User.findOne({ shop_name: shop_name });
      if (findbyshop) {
        const result = await User.findOneAndUpdate(
          { shop_name: shop_name },
          ctx.request.body,
          { new: false }
        );
        const update = {
          code: 201,
          result,
        };
        // console.log("updated",update);
        ctx.body = result;
        return;
      }
      const data = await new User(ctx.request.body).save();
      const newdataUser = {
        code: 200,
        data,
      };
      ctx.body = newdataUser;
    } catch (error) {
      const err = {
        code: 400,
        data_err: error.message,
      };
      ctx.body = err;
    }
  }

async addNewFeedUser(ctx){
  const userid = ctx.request.body.user_id;
  const shop_name = ctx.request.body.shop_name;
  try {
    let findbyshop = await User.findOne({ shop_name: shop_name, user_id: userid });
    if (findbyshop) {
      const user_id_c  = findbyshop.user_id;
      if (userid == user_id_c) {
        const _id = findbyshop._id;
      const data = await User.findOneAndUpdate(
        { _id: _id },
        ctx.request.body,
        { new: true }
      );
      const update = {
        code: 201,
        data,
      };
      ctx.body = update;
      }
      return;
    }
    const data = await new User(ctx.request.body).save();
    const newdataUser = {
      code: 200,
      data,
    };
    ctx.body = newdataUser;
  } catch (error) {
    const err = {
      code: 400,
      data_err: error.message,
    };
    ctx.body = err;
  }
 }


async deleteinstaUsers(ctx){
      const _id = ctx.request.body._id;
      console.log(_id)
      try {
      
        let delinsta = await User.deleteMany( {
          _id: {
            $in: _id
          }
        },);
        ctx.body = delinsta;
      } catch (error) {
       ctx.body = error.message; 
      }
   
  }



  // async deleteUser(ctx){
  //     const data = await User.findByIdAndRemove(ctx.params.id)
  //     if(!data){
  //         ctx.throw(404, "user does not exist")
  //     }
  //     const result = {
  //         code: 200,
  //         data
  //     }
  //     ctx.body = result
  // }

  async getSettingsProduct(ctx){
    const shop = ctx.request.body.shop_domain;
    const image_id = ctx.request.body.image_id;
    const result = await SessionModel.findOne({ shop: shop });
    const shop_data = result.content;
    const decryptedString = cryption.decrypt(shop_data);
    const shop_obj = JSON.parse(decryptedString);
    const Token = shop_obj.accessToken;
    const insta_post_data = await InstapostModel.findOne({shop_name: shop })
    const productSettings = insta_post_data.instagramLayoutSettings.photoSetings.productSettings.product;
    if (productSettings != undefined) {
      if (productSettings===false) {
        ctx.status = 200;
      ctx.body = {
        status: "EMPTY_SETTINGS",
        data: undefined,
      };
      return;
    }
    }

    const findProduct = await ProductTaggingModel.findOne({image_id: image_id})
   
    if (findProduct) {
      ctx.body = {
        status: "OK_SETTINGS",
        data: findProduct.product.product_detail,
      };
      ctx.status = 200;
    }
    else{
      console.log("find product without img id",findProduct)
      ctx.status = 200;
      ctx.body = {
        status: "EMPTY_SETTINGS",
        data: undefined,
      };
      return;
    }  
  }


  async setSettingsProduct(ctx){
    const shop = ctx.request.body.shop_domain;
    const image_id = ctx.request.body.image_id;
    console.log("on save image is", image_id);
    const user_id= ctx.request.body.user_id;
    const img_url= ctx.request.body.img_url;
    const result = await SessionModel.findOne({ shop: shop });
    const shop_data = result.content;
    const decryptedString = cryption.decrypt(shop_data);
    const shop_obj = JSON.parse(decryptedString);
    const Token = shop_obj.accessToken;

    const productIdStruct = ctx.request.body.productId.split("/");
    const productId = productIdStruct[productIdStruct.length - 1];

  
  

    const client = new Shopify.Clients.Rest(shop, Token);

    const productDetails = await client.get({
      path: `products/${productId}`,
      type: DataType.JSON,
    });

    const product_detail = productDetails.body.product
    const findProduct = await ProductTaggingModel.findOne({image_id: image_id})
    if (findProduct) {
      const update_product = await ProductTaggingModel.findOneAndUpdate(
        {image_id: image_id},
        {product: {productId: productId, product_detail}},
        { new: true }
      );
      // console.log("update",update_product)
    }
    else{
      console.log("save")
      const save_product = await new ProductTaggingModel({shop: shop, user_id: user_id, image_id: image_id, img_url: img_url, product:{productId: productId, product_detail}}).save();
      // console.log("tagging", save_product)
    }
     
    ctx.body = {
      status: "OK_SETTINGS",
      data: productDetails.body.product,
    };
    ctx.status = 200;   
}

}

module.exports = new UserController();
