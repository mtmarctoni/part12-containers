const express = require('express');
const redis = require('../routes')
const router = express.Router();

const configs = require('../util/config')
const { getAddedTodoCount } = require('../redis/todoCount')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  try {
    const todoCounter = await getAddedTodoCount()
    res.json({ "added_todos": todoCounter })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error fetching statistics' })
  }
});

module.exports = router;
