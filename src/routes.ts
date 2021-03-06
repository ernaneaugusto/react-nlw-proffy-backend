import express, { response } from 'express';
import ClassController from './controllers/ClassesController';


// configura as rotas do express
const routes = express.Router();

const classesController = new ClassController();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

export default routes;