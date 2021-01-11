import express from 'express';

import TodoController from '../controller/todo'

import uploadFileMiddleware from '../middleware/uploadFile'

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    target: 'side API',
  });
});

router.get('/todos', TodoController.get)
router.get('/todo/:todoID', TodoController.getOne)
router.post('/todo', TodoController.post)
router.post('/todo/file', uploadFileMiddleware, TodoController.postFile)
router.get('/todo/:todoID', TodoController.put)
router.get('/todo/:todoID', TodoController.del)


export default router;
