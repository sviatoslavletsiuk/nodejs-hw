import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true, default: '' },
    tag: { type: String, enum: TAGS, default: 'Todo', index: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
  },
  { timestamps: true },
);

const Note = model('Note', noteSchema);

export default Note;
