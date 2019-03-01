import { useState } from 'react';
import createHook from 'hookleton';

// useCounter is a useState but global
const useCounter = createHook(useState);

const Increment = () => {
  const [, update] = useCounter();
  const increment = () => update(s => s + 1);
  return <button onClick={increment}>+</button>;
};

const Decrement = () => {
  const [, update] = useCounter();
  const decrement = () => update(s => s - 1);
  return <button onClick={decrement}>-</button>;
};

const Value = () => {
  const [count] = useCounter(0);
  return <span>{count}</span>;
};

export default () => (
  <div>
    <Value />
    <Increment />
    <Decrement />
  </div>
);
