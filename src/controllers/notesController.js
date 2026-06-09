import createHttpError from 'http-errors';
import Note from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const query = Note.find();

    if (tag) {
      query.where('tag').equals(tag);
    }

    if (search) {
      query.where({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      });
    }

    const totalNotes = await Note.countDocuments(query.getFilter());
    const totalPages = Math.ceil(totalNotes / perPage);

    const notes = await query
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const created = await Note.create(req.body);
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const deleted = await Note.findByIdAndDelete(noteId);
    if (!deleted) {
      throw createHttpError(404, 'Note not found');
    }
    return res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const updated = await Note.findByIdAndUpdate(noteId, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!updated) {
      throw createHttpError(404, 'Note not found');
    }
    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
