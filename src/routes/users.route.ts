import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticaated from '../middlewares/ensureAuthenticate';
// Rota: Receberuma requisição, chamar outro arquivo, devolver uma resposta
// SoC:

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const CreateUser = new CreateUserService();

    const user = await CreateUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticaated,
  upload.single('avatar'),
  async (request, response) => {
    console.log(request.file);
    response.json({ ok: true });
  },
);

export default usersRouter;
