const {getAsync, setAsync} = require('./index');

const incrementTodoCounter = async () => {
    const todoCounter = await getAddedTodoCount()
    await setAsync("count", todoCounter + 1)
  }
  
  const getAddedTodoCount = async () => {
    return Number( await getAsync("count") || 0 )
}
  
module.exports = {
    incrementTodoCounter,
    getAddedTodoCount
}