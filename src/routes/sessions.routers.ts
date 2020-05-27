import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import AuthenticateUserService from '../services/AuthenticateUserSession';
// Rota: Receberuma requisição, chamar outro arquivo, devolver uma resposta
// SoC:

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;
    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
