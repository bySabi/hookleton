import { useReducer, useEffect } from 'react';
import { createHook } from 'hookleton';

const initialState = { count: 0 };

export const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const useCounter = createHook(useReducer);

const Counter = () => {
  const [store, dispatch] = useCounter(reducer, initialState);
  return (
    <div>
      <p>You clicked {store.count} times</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
};

let c = 0;
const Any = () => {
  useEffect(() => () => (c = 0), []);
  return <p style={{ color: 'red' }}>I should be rendered ONE time but: {++c}</p>;
};

export default () => (
  <>
    <Any />
    <Counter />
  </>
);
