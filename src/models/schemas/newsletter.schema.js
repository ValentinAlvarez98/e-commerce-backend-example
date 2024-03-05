import mongoose from "mongoose";

const newsletterCollection = "newsletter";

const newsletterSchema = new mongoose.Schema({
      email: {
            type: String,
            required: true,
            unique: true, // Asegura que cada email solo se suscriba una vez
      },
      is_subscribed: {
            type: Boolean,
            required: true,
            default: true, // Asume que cualquier nueva entrada desea suscribirse inicialmente
      },
      date_subscribed: {
            type: Date,
            default: Date.now,
      },
      user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false, // Este campo es opcional para permitir suscripciones de no usuarios
      }
});

const NewsletterModel = mongoose.model(newsletterCollection, newsletterSchema);

export default NewsletterModel;