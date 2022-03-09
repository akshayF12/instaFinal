/**
 * Encrypted Mongo Model .
 */
 const { truncate } = require('lodash');
const mongoose = require('mongoose');
 const { Schema } = mongoose;

const Insta_post_modelSchema = new Schema({
  shop_id: {
    type: Number,
    required: true,
  },
  shop_name: {
    type: String,
    required: true, 
  },
  user_id:{
    type: Number,
    required: true,
  },
  user_name: {
      type: String,
      required: false,
  },
  short_code:{
    type: String,
    required: true,
    default: '1'
  },
  long_live_access:{
    type: String,
    required: true,
    default: '1'
  },
  insta_post:{
      type: String,
      required: true,
  },
  insta_status:{
    type: Boolean,
    required: true,
    default: true
  },
  instagramLayoutSettings: {
    basicLayoutSettings: {
      feedTitle:{
        type: String,
        required: true,
        default: "Feed Title"
      },
      alignment:{
        type: String,
        required: true,
        default: "right"
      },
      size:{
        type: Number,
        required: true,
        default: 10
      }
    },
    photoSetings: {
      layout:{
        type: String,
        required: true,
        default: "Grid"
      },
      imageSpacing:{
        type: Number,
        required: true,
        default: 0
      },
      onImageClick:{
        type: String,
        required: true,
        default: "Do Nothing"
      },
      rows:{
        type: Number,
        required: true,
        default: 1
      },
      coulumns:{
        type: Number,
        required: true,
        default: 1
      },
      productSettings:{
          product:{
            type: Boolean,
            required:  true,
            default: false
          }
      }
    }
  }
 
});

const InstaModel = mongoose.model("Insta_Post", Insta_post_modelSchema);

module.exports = InstaModel;
