import mongoose from 'mongoose';

const templeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    city: String,
    state: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  history: {
    type: String,
    required: true
  },
  timings: {
    opening: String,
    closing: String,
    specialDarshanTimings: [{
      name: String,
      time: String
    }]
  },
  images: [String],
  festivals: [{
    name: String,
    date: String,
    description: String
  }],
  contact: {
    phone: String,
    email: String,
    website: String
  }
});

export const Temple = mongoose.model('Temple', templeSchema);