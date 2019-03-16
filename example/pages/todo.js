import { useState } from 'react';
import { createHook } from 'hookleton';

const initial = ['Do one', 'Do two', 'Do three'];

const useStore = createHook(init => {
  const [state, setState] = useState(init);

  const add = todo => setState(state.concat(todo));
  const remove = todo => setState(state.filter(i => i !== todo));

  return [state, { add, remove }];
});

const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const [, { add }] = useStore.use(initial);

  const handleTodoChange = e => setTodo(e.target.value);
  const handleTodoAdd = () => {
    add(todo);
    setTodo(''); // clean form
  };

  return (
    <>
      <input value={todo} onChange={handleTodoChange} />
      <button onClick={handleTodoAdd}>Add</button>
    </>
  );
};

const TodoHeader = () => {
  const [todos] = useStore();

  return (
    <>
      {todos.length === 0 ? (
        <h4>All todos are done! </h4>
      ) : (
        <div>
          <span>
            Todo List, remain: <span>{todos.length}</span> todos.
          </span>
        </div>
      )}
    </>
  );
};

const TodoList = () => {
  const [todos, { remove }] = useStore();
  return (
    <ul>
      {todos.map((todo, idx) => (
        <li key={idx}>
          {todo}
          <button onClick={() => remove(todo)}>Complete</button>
        </li>
      ))}
    </ul>
  );
};

export default () => (
  <>
    <TodoForm />
    <TodoHeader />
    <TodoList />
  </>
);
