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

      thumbnails: {
            type: Array,
            required: false,
      },

      color: {
            type: String,
            required: true,
      },

});


const categoriesSchema = new mongoose.Schema({

      dogs: {
            type: {
                  food: {
                        type: {
                              dry: {
                                    type: productsSchema,
                              },
                              wet: {
                                    type: productsSchema,
                              },
                        }
                  },
                  accessories: {
                        type: {
                              collars: {
                                    type: productsSchema,
                              },
                              leashes: {
                                    type: productsSchema,
                              },
                        }
                  },
                  toys: {
                        type: productsSchema,
                        required: true,
                  },
            },
            required: true,

      },
      cats: {
            type: {
                  food: {
                        type: productsSchema,
                        required: true,
                  }
            },
            required: true,

      },

      small_animals: {
            type: {
                  food: {
                        type: productsSchema,
                        required: true,
                  }
            },
            required: true,

      },

});



productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;