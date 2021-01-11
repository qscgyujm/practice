import shortid from 'shortid';

import model from '../model';

const get = async (req, res) => {
  try {

    const todoList = await model.TodoModel.findAll();

    console.log('todoList', todoList)

    res.status(200).json({data: todoList})
    
  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
}


const getOne = async (req, res) => {
  try {
    const { todoID } = req.params;

    const todoList = await model.TodoModel.findOne({ where: { id: todoID } })

    console.log('todoList', todoList)

    res.status(200).json({data: todoList})
    
  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
}

const post = async (req, res) => {
  try {
    const replacements = {
      id: shortid.generate(),
      ...req.body,
    }

    console.log('replacements', replacements)

    const createRes = await model.TodoModel.create(replacements)

    console.log('createRes', createRes)

    res.status(200).json({ message: 'success' })

  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
}

const postFile = async (req, res) => {
  try {
    const { file } = req;

    console.log(file)

    res.status(200).json({ ...file })

  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
}


const put = async (req, res) => {
  try {

    
  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
}

const del = async (req, res) => {
  try {

    
  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
}

export default {
  get,
  getOne,
  post,
  postFile,
  put,
  del,
}