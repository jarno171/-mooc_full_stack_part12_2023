const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { setAsync, getAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/statistics', async (_, res) => {
  const addedTodos = await getAsync('added_todos');

  let returnTodos;

  if (addedTodos === null) {
    returnTodos = 0;
  } else {
    returnTodos = parseInt(addedTodos);
  }

  res.json({ added_todos: returnTodos });
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const addedTodos = await getAsync('added_todos');

  if (addedTodos === null) {
    setAsync('added_todos', 1);
  } else {
    setAsync('added_todos', parseInt(addedTodos) + 1);
  }

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  return res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res, next) => {
  const todoUpdate = {
    text: req.body.text,
    done: req.body.done
  };

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, todoUpdate, {new: true});
    res.status(201).json(updatedTodo);
  } catch (exception) {
    next(exception);
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
