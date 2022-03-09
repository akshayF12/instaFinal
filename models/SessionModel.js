/**
 * Encrypted Mongo Model to persist sessions across restarts.
 */
 const mongoose = require('mongoose');
 const { Schema } = mongoose;

const sessionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
});

const SessionModel = mongoose.model("SHOP", sessionSchema);

module.exports = SessionModel;
