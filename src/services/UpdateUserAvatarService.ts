import { getRepository } from 'typeorm';
import path from 'path';

import fs from 'fs';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';
import User from '../models/Users';

interface Request {
  user_id: string;
  avatarfilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarfilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only autenticated can change avatar', 401);
    }
    if (user.avatar) {
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.diretory, user.avatar);
      const userAvatarFileExixts = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExixts) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarfilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
