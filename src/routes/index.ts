import { Router } from 'express';
import appointmentsRouter from './appointments.router';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Baima' }),
);

export default routes;
