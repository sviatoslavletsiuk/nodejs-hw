import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'No file');
    }

    const { buffer } = req.file;
    const userId = req.user._id.toString();
    const uploadResult = await saveFileToCloudinary(buffer, userId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: uploadResult.secure_url },
      { returnDocument: 'after' },
    );

    return res.status(200).json({ url: updatedUser.avatar });
  } catch (error) {
    next(error);
  }
};
