import { it, expect } from 'vitest';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

it('todo has text and done fields', async () => {
  console.log(apiUrl);
  
  const res = await fetch(`${apiUrl}todos`);
  const todos = await res.json();
  const todo = todos[0];
  expect(todo.text).toBe('Write code');
  expect(todo.done).toBe(true);

});
