import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import CONFIG from "../../environments/config.js";

const productsCollection = CONFIG.MONGO_COLLECTIONS.products;

const productVariantSchema = new mongoose.Schema({
      size: {
            type: String,
            required: true,
      },
      color: {
            type: String,
            required: true,
      },
      stock: {
            type: Number,
            required: true,
            min: 0, // Asegura que el stock no sea negativo
      },
});

const productSizeSchema = new mongoose.Schema({
      size: {
            type: String,
            required: true,
      },
      variants: [productVariantSchema], // Array de variantes, combinando color y stock
}, {
      _id: false
});

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
            unique: true, // Asegura que el código del producto sea único
      },
      price: {
            type: Number,
            required: true,
      },
      status: {
            type: Boolean,
            required: true,
            default: true,
      },
      sizes: [productSizeSchema] // Usa el esquema de tamaño aquí
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