import { Router } from 'express';

import appointmentsRouter from './appointments.router';
import usersRouter from './users.route';
import sessionsRouter from './sessions.routers';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
