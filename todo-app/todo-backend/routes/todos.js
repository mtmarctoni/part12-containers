const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {MONGO_URL} = require('../util/config')

/* GET todos listing. */
router.get('/', async (_, res) => {
  try {
    console.log(MONGO_URL);
    
    const todos = await Todo.find({})
    res.send(todos);
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error fetching todos' })
    }
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
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

const findByIdAndUpdateMiddleware = async (req, res, next) => {
  const id = req.todo._id
  req.todo = await Todo.findByIdAndUpdate(id, req.body, { new: true })
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
  const todo = req.todo

  if(todo){
    return res.json(todo)
  }
   
  res.sendStatus(405);
});

/* PUT todo. */
singleRouter.put('/', findByIdAndUpdateMiddleware, async (req, res) => {
  const todo = req.todo
  if (todo) {
    return res.json(todo)
  }
  res.sendStatus(405);
   
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
