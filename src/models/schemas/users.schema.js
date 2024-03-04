import mongoose from 'mongoose';
import CONFIG from '../../environments/config.js';

const usersCollection = CONFIG.MONGO_COLLECTIONS.users;

const usersSchema = new mongoose.Schema({

      first_name: {
            type: String,
            required: [true, 'First name is required'],
      },

      last_name: {
            type: String,
            required: [true, 'Last name is required'],
      },

      email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exists'],
      },

      password: {
            type: String,
            required: [true, 'Password is required'],
      },

      shipping_addresses: {
            type: [{
                  state: {
                        type: String,
                        required: [true, 'State is required'],
                  },
                  location: {
                        type: String,
                        required: [true, 'Location is required'],
                  },
                  address: {
                        type: String,
                        required: [true, 'Address is required'],
                  },
                  phone: {
                        type: String,
                        required: [true, 'Contact phone is required'],
                  },
                  name: {
                        type: String,
                        required: [true, 'Contact name is required'],
                  },
                  commentary: {
                        type: String,
                  }
            }],
            validate: [shippingLimit, '{PATH} exceeds the limit of 3'],
      },

      billing_address: {
            type: [{
                  state: {
                        type: String,
                        required: [true, 'State is required'],
                  },
                  location: {
                        type: String,
                        required: [true, 'Location is required'],
                  },
                  address: {
                        type: String,
                        required: [true, 'Address is required'],
                  },
                  phone: {
                        type: String,
                        required: [true, 'Contact phone is required'],
                  },
                  name: {
                        type: String,
                        required: [true, 'Contact name is required'],
                  },
            }],
            validate: [billingLimit, '{PATH} exceeds the limit of 1'],
      },

      date_created: {
            type: Date,
            default: Date.now,
      },

      password_reset_token: {
            type: String,
      },

      password_reset_expires: {
            type: Date,
      },

      last_activity: {
            type: Date,
            required: [true, 'Last activity is required'],
      },

});

function shippingLimit(val) {
      return val.length <= 3;
}

function billingLimit(val) {
      return val.length <= 1;
}

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;