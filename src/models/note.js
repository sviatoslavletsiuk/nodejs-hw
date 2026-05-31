import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const allowedTags = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
  'Todo',
];

const noteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true, default: '' },
    tag: { type: String, enum: allowedTags, default: 'Todo' },
  },
  { timestamps: true },
);

const Note = model('Note', noteSchema);

export default Note;
