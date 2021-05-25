const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tag: {
    hex: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.statics.getCardById = async function(id) {
  try {
    return await this.findById(id);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      throw new Error('Invalid Card ID');
    }
    console.error(error);
    throw new Error('Internal Server Error');
  }
}

module.exports = { Card: mongoose.model('Card', cardSchema), cardSchema};
