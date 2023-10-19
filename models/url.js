import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  urlId: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  origUrl: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model('Url', urlSchema);
export default Url;
