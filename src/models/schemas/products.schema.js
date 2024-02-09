import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import CONFIG from "../../environments/config.js";

const productsCollection = CONFIG.MONGO_COLLECTIONS.products;

const productsSchema = new mongoose.Schema({

      title: {
            type: String,
            required: true,
      },

      description: {
            type: String,
            required: true,
      },

      code: {
            type: String,
            required: true,
      },

      price: {
            type: Number,
            required: true,
      },

      discount: {
            type: String,
      },

      status: {
            type: Boolean,
            required: true,
            default: true,
      },

      stock: {
            type: Number,
            required: true,
      },

      section: {
            type: String,
            required: true,
      },

      category: {
            type: String,
            required: true,
      },

      color: {
            type: String,
      },

      thumbnails: {
            type: Array,
            required: false,
      },

});


productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;