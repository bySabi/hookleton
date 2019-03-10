import React from 'react';
import { act, cleanup, render, fireEvent } from 'react-testing-library';
import { renderHook } from 'react-hooks-testing-library';
import { createHook } from '../src';

let useCounter;
let useCounter2;
let useCounter3;
let useCounter4;
let CounterCtx;
let CounterCtx2;
let CounterCtx3;
let CounterCtx4;
let Count;
let Count2;
let Count4;
let Counter;

const counter = (initial = 0) => {
  const [count, setCount] = React.useState(initial);
  const increment = (amount = 1) => setCount(count + amount);
  const decrement = (amount = 1) => setCount(count - amount);
  return [count, setCount, { increment, decrement }];
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

const initialState = { count: 0 };

beforeEach(() => {
  useCounter = createHook(React.useState);
  useCounter2 = createHook(React.useState, 1);
  useCounter3 = createHook(counter);
  useCounter4 = createHook(({ reducer, initialState }) => React.useReducer(reducer, initialState));

  CounterCtx = useCounter.Provider;
  CounterCtx2 = useCounter2.Provider;
  CounterCtx3 = useCounter3.Provider;
  CounterCtx4 = useCounter4.Provider;

  Count = () => <>Count: {useCounter()[0]}</>;
  Count2 = ({ id }) => <span data-testid={id}>Count2: {useCounter2()[0]}</span>;
  Count4 = ({ id }) => <span data-testid={id}>Count4: {useCounter4()[0].count}</span>;

  Counter = ({ id }) => {
    const [count, setCount, { increment, decrement }] = useCounter3();
    const updateState = () => setCount(100);
    return (
      // prettier-ignore
      <div>
        <span data-testid={`${id}-count`}>Count: {count}</span>
        <button data-testid={`${id}-dec`} onClick={() => decrement()}>-</button>
        <button data-testid={`${id}-inc`} onClick={() => increment()}>+</button>
        <button data-testid={`${id}-set`} onClick={updateState}>set</button>
      </div>
    );
  };
});

const useNonCompliant = createHook(() => null);

afterEach(cleanup);

test('should return initial counter value', () => {
  let count;
  renderHook(() => ([count] = useCounter(8)));
  expect(count).toBe(8);
});

test('should increase/decrease counter value', () => {
  let count, setCount;
  renderHook(() => ([count, setCount] = useCounter(0)));
  expect(count).toBe(0);

  act(() => {
    setCount(1);
  });
  expect(count).toBe(1);
});

test('should increase/decrease counter value from standalone', () => {
  let count;
  renderHook(() => ([count] = useCounter(0)));
  expect(count).toBe(0);

  const [, setCount] = useCounter.get();
  act(() => {
    setCount(1);
  });
  expect(count).toBe(1);
});

test('should shared hook output', () => {
  let out1;
  renderHook(() => (out1 = useCounter(1)));
  let out2;
  renderHook(() => (out2 = useCounter()));
  expect(out1).toBe(out2);

  const [, setCount] = out1;
  act(() => {
    setCount(2);
  });
  const [count] = out2;
  expect(count).toBe(2);
  expect(out1).toBe(out2);
});

test('should apply initial params policy', () => {
  let count;
  renderHook(() => ([count] = useCounter2(2))); // useCounter2 = createHook(useState, 1);
  expect(count).toBe(1);
});

test('should ignore initial param from a non-first hook call', () => {
  let count1;
  renderHook(() => ([count1] = useCounter(1)));
  let count2;
  renderHook(() => ([count2] = useCounter(2))); // ignore non-host initial
  expect(count1).toBe(1);
  expect(count1).toBe(count2);
});

test('should console.error on call setter with the Host unmounted', () => {
  const spy = spyOn(console, 'error');

  const { unmount } = renderHook(() => useCounter(1)); // render Hookleton Host
  let setCount;
  renderHook(() => ([, setCount] = useCounter())); // render Hookleton non-host

  unmount(); // Host

  act(() => setCount(0));
  expect(spy).toHaveBeenCalled(); // React should complaint with no-op over `setCount` call
});

test('should set new Host on Host unmount', () => {
  const { unmount } = renderHook(() => useCounter(8)); // render Hookleton Host
  unmount(); // Host

  let count;
  let setCount;
  renderHook(() => ([count, setCount] = useCounter(2))); // the new host

  expect(count).toBe(2);
  act(() => setCount(4));
  expect(count).toBe(4);
});

test('should non-Host continue life after Host unmount and new Host is mounted', () => {
  const { unmount } = renderHook(() => useCounter(1)); // render Hookleton Host

  let count;
  let setCount;
  const { rerender } = renderHook(() => ([count, setCount] = useCounter())); // a non-Host
  expect(count).toBe(1);
  unmount(); // Host

  // 'non-Host' still have state but setCount cannot be called, a new Host is needed
  expect(count).toBe(1);

  let newsetCount;
  renderHook(() => ([, newsetCount] = useCounter(2))); // the new Host

  rerender(); // new 'Host' new rules
  expect(count).toBe(2);

  // setCount and newsetCount are setters of the same Hookleton
  act(() => setCount(4));
  expect(count).toBe(4);
  act(() => newsetCount(8));
  expect(count).toBe(8);
});

test('should throw error when useHook not return a array', () => {
  spyOn(console, 'error');
  expect(() => renderHook(useNonCompliant)).toThrowError(
    '[Hookleton] provided Hook must return array values'
  );
});

test('should return initial counter different that Counter ctx', () => {
  render(<CounterCtx initial={3} />);
  let count;
  renderHook(() => ([count] = useCounter(8)));
  expect(count).toBe(8);
});

test('should return initial counter from Counter context', () => {
  const { getByText } = render(
    <CounterCtx initial={3}>
      <Count />
    </CounterCtx>
  );
  expect(getByText(/^Count:/).textContent).toBe('Count: 3');
});

test('should return first value from initial array param from Counter context', () => {
  const { getByText } = render(
    <CounterCtx initial={[3]}>
      <Count />
    </CounterCtx>
  );
  expect(getByText(/^Count:/).textContent).toBe('Count: 3');
});

test('should return first value array from initial array param from Counter context', () => {
  const { getByText } = render(
    <CounterCtx initial={[[3, 5, 6], 4]}>
      <Count />
    </CounterCtx>
  );
  // JSX {[3,5,6]} output => 356
  expect(getByText(/^Count:/).textContent).toBe('Count: 356');
});

test('should pass context props like a initial object to hook', () => {
  const { getByText } = render(
    <CounterCtx4 reducer={reducer} initialState={initialState}>
      <Count4 />
    </CounterCtx4>
  );
  expect(getByText(/^Count4:/).textContent).toBe('Count4: 0');
});

test('should apply initial context params policy', () => {
  const utils = render(
    <CounterCtx2>
      <Count2 id="count1" />
    </CounterCtx2>
  );
  expect(utils.getByTestId('count1').textContent).toBe('Count2: 1');

  const utils2 = render(
    <CounterCtx2 initial={3}>
      <Count2 id="count2" />
    </CounterCtx2>
  );
  expect(utils.getByTestId('count2').textContent).toBe('Count2: 3');
});

test('should return initial counter from Counter and nested Counter2 context', () => {
  const { getByText } = render(
    <CounterCtx initial={3}>
      <span>
        <Count />
      </span>
      <CounterCtx2>
        <span>
          <Count2 />
        </span>
      </CounterCtx2>
    </CounterCtx>
  );
  expect(getByText(/^Count:/).textContent).toBe('Count: 3');
  expect(getByText(/^Count2:/).textContent).toBe('Count2: 1');
});

test('should incresase/decrease counter in a context', () => {
  const { getByText } = render(
    <CounterCtx3 initial={3}>
      <Counter />
    </CounterCtx3>
  );

  expect(getByText(/^Count:/).textContent).toBe('Count: 3');

  fireEvent.click(getByText('+'));
  fireEvent.click(getByText('+'));
  expect(getByText(/^Count:/).textContent).toBe('Count: 5');

  fireEvent.click(getByText('-'));
  expect(getByText(/^Count:/).textContent).toBe('Count: 4');

  fireEvent.click(getByText('set'));
  expect(getByText(/^Count:/).textContent).toBe('Count: 100');
});

test('should incresase/decrease counter in a nested context', () => {
  const { getByText, getByTestId } = render(
    <CounterCtx3 initial={4}>
      <Counter />
      <CounterCtx3 initial={1}>
        <Counter id="nested" />
      </CounterCtx3>
    </CounterCtx3>
  );

  expect(getByTestId('nested-count').textContent).toBe('Count: 1');

  fireEvent.click(getByTestId('nested-inc'));
  fireEvent.click(getByTestId('nested-inc'));
  expect(getByTestId('nested-count').textContent).toBe('Count: 3');

  fireEvent.click(getByTestId('nested-dec'));
  expect(getByTestId('nested-count').textContent).toBe('Count: 2');

  fireEvent.click(getByTestId('nested-set'));
  expect(getByTestId('nested-count').textContent).toBe('Count: 100');

  expect(getByText(/^Count:/).textContent).toBe('Count: 4');
});

test('should return initial counter from siblings Counter context', () => {
  const { getByTestId } = render(
    <>
      <CounterCtx3>
        <Counter id="counter1" />
      </CounterCtx3>
      <CounterCtx3 initial={2}>
        <Counter id="counter2" />
      </CounterCtx3>
      <CounterCtx3 initial={3}>
        <Counter id="counter3" />
      </CounterCtx3>
    </>
  );
  expect(getByTestId('counter1-count').textContent).toBe('Count: 0');
  expect(getByTestId('counter2-count').textContent).toBe('Count: 2');
  expect(getByTestId('counter3-count').textContent).toBe('Count: 3');
});
