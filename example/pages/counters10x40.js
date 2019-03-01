import { useState } from 'react';
import createHook from 'hookleton';

const stores = new Map();

function createStore(store, ...initial) {
  stores.set(store, createHook(useState, ...initial));
}

function useStore(store, ...initial) {
  const hook = stores.get(store);
  return hook && hook(...initial);
}

function getStore(store) {
  const hook = stores.get(store);
  return hook;
}

createStore('1', 0);
createStore('2', 1);
createStore('3', 2);
createStore('4', 3);
createStore('5', 4);

const Counters = () => {
  // 'tup' is tuple [count, setCount]
  const tup1 = useStore('1');
  const tup2 = useStore('2');
  const tup3 = useStore('3');
  const tup4 = useStore('4');
  const tup5 = useStore('5');

  const increment = set => c => set(c => c + 1);
  const decrement = set => c => set(c => c - 1);
  const reset = () => (tup1[1](0), tup2[1](0), tup3[1](0), tup4[1](0), tup5[1](0));

  return (
    <ul style={{ listStyle: 'none', borderStyle: 'solid' }}>
      {[tup1, tup2, tup3, tup4, tup5].map((tup, idx) => (
        <li key={idx}>
          <span>{tup[0]}</span>
          <button onClick={decrement(tup[1])}>-</button>
          <button onClick={increment(tup[1])}>+</button>
          <br />
        </li>
      ))}
      <li>
        <button onClick={reset}>reset</button>
      </li>
    </ul>
  );
};

// put <Counters /> in a table of 1x10 cells
const TableCounters = () => (
  <table>
    <tbody>
      <tr>
        {Array.from({ length: 10 }).map((_, idx) => (
          <td key={idx}>
            <Counters />
          </td>
        ))}
      </tr>
    </tbody>
  </table>
);

// This component don't "use" the stores, will not rendered on changes,
// destructured standalone setters will rerender components that "use" the stores.
const SetDefaults = () => {
  const set = (store, value) => {
    const [, set] = getStore(store).get();
    set(value);
  };

  return (
    <button onClick={() => (set('1', 0), set('2', 1), set('3', 2), set('4', 3), set('5', 4))}>
      SET defaults
    </button>
  );
};

// Repeat `TableCounters` component 40 times
export default () => (
  <ul style={{ listStyle: 'none' }}>
    <li>
      <SetDefaults />
    </li>
    {Array.from({ length: 40 }).map((_, idx) => (
      <li key={idx}>
        <TableCounters />
      </li>
    ))}
  </ul>
);
