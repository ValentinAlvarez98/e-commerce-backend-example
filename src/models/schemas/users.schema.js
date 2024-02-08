import mongoose from 'mongoose';

const usersCollection = 'users-test';

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

      age: {
            type: Number,
            required: [true, 'Age is required'],
      },

      password: {
            type: String,
            required: [true, 'Password is required'],
      },

      role: {
            type: String,
            enum: ['ADMIN', 'USER', 'PREMIUM'],
            default: 'USER',
      },

      phone: {
            type: String,
      },

      addresses: {
            type: [{
                  street: {
                        type: String,
                        required: [true, 'Street is required'],
                  },
                  number: {
                        type: String,
                  },
                  city: {
                        type: String,
                        required: [true, 'City is required'],
                  },
                  state: {
                        type: String,
                        required: [true, 'State is required'],
                  },
                  location: {
                        type: String,
                        required: [true, 'Location is required'],
                  },
                  zip: {
                        type: String,
                        required: [true, 'Zip is required'],
                  },
            }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
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

      documents: {
            type: [{
                  name: {
                        type: String,
                        required: [true, 'Document Name is required']
                  },
                  reference: {
                        type: String,
                        required: [true, 'Document Reference is required']
                  },
                  extension: {
                        type: String,
                        required: [true, 'Document Extension is required']
                  },
            }]
      },

      last_connection: {
            last_login: {
                  type: Date,
                  default: null,
            },
            last_logout: {
                  type: Date,
                  default: null,
            },
            last_modification: {
                  type: Date,
                  default: Date.now,
            }
      },

});

function arrayLimit(val) {
      return val.length <= 3;
}

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;