/**
 * Encrypted Mongo Model to persist sessions across restarts.
 */
 const mongoose = require('mongoose');
 const { Schema } = mongoose;

const TaggingModel = new Schema({
  shop: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  image_id: {
    type: String,
    required: true,
  },
  img_url:{
     type: String,
     required: true,
  },
  product:{
     type: Object,
     required: false 
  }
});

const ProductTagingModel = mongoose.model("PRODUCT_TAGGING", TaggingModel);

module.exports = ProductTagingModel;
