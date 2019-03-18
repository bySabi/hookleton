import React from 'react';
import { act, cleanup, renderHook } from 'react-hooks-testing-library';
import { createHook } from '../src';

let useCounter;
let useCounter2;
let useCounter3;

beforeEach(() => {
  useCounter = createHook(React.useState);
  useCounter2 = createHook(React.useState, 1);
  useCounter3 = createHook(i => {
    const [s, set] = React.useState(i);
    return { count: s, setCount: set };
  });
});

afterEach(cleanup);

test('should return initial counter value', () => {
  let count;
  renderHook(() => ([count] = useCounter.use(8)));
  expect(count).toBe(8);
});

test('should increase/decrease counter value', () => {
  let count, setCount;
  renderHook(() => ([count, setCount] = useCounter.use(0)));
  expect(count).toBe(0);

  act(() => {
    setCount(1);
  });
  expect(count).toBe(1);
});

test('should increase/decrease counter value from standalone', () => {
  let count;
  renderHook(() => ([count] = useCounter.use(0)));
  expect(count).toBe(0);

  const [, setCount] = useCounter.get();
  act(() => {
    setCount(1);
  });
  expect(count).toBe(1);
});

test('should shared hook output', () => {
  let out1;
  renderHook(() => (out1 = useCounter.use(1)));
  let out2;
  renderHook(() => (out2 = useCounter()));
  expect(out1).toBe(out2);

  let [count] = out2;
  expect(count).toBe(1);

  const [, setCount] = out1;
  act(() => {
    setCount(2);
  });
  [count] = out2;
  expect(count).toBe(2);
  expect(out1).toBe(out2);
});

test('should shared hook output#2', () => {
  let out1;
  renderHook(() => (out1 = useCounter3.use(1)));
  let out2;
  renderHook(() => (out2 = useCounter3()));
  expect(out1).toBe(out2);

  let { count } = out2;
  expect(count).toBe(1);

  const { setCount } = out1;
  act(() => {
    setCount(2);
  });

  count = out2.count;
  expect(count).toBe(2);

  expect(out1).toBe(out2);
});

test('should reset non-Host Map when more than one Host is called', () => {
  let out1;
  renderHook(() => (out1 = useCounter.use(1)));
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

  renderHook(() => (out1 = useCounter.use(10)));

  act(() => {
    setCount(4);
  });
  expect(count).toBe(2);
});

test('should apply initial params policy', () => {
  let count;
  renderHook(() => ([count] = useCounter2.use(2))); // useCounter2 = createHook(useState, 1);
  expect(count).toBe(1);
});

test('should ignore initial param from a non-first hook call', () => {
  let count1;
  renderHook(() => ([count1] = useCounter.use(1)));
  let count2;
  renderHook(() => ([count2] = useCounter(2))); // ignore non-host initial
  expect(count1).toBe(1);
  expect(count1).toBe(count2);
});

test('should console.error on call setter with the Host unmounted', () => {
  const spy = spyOn(console, 'error');

  const { unmount } = renderHook(() => useCounter.use(1)); // render Hookleton Host
  let setCount;
  renderHook(() => ([, setCount] = useCounter())); // render Hookleton non-host

  unmount(); // Host

  act(() => setCount(0));
  expect(spy).toHaveBeenCalled(); // React should complaint with no-op over `setCount` call
});

test('should non-Host continue life after Host unmount', () => {
  const { unmount } = renderHook(() => useCounter.use(1)); // render Hookleton Host

  let count;
  let setCount;
  const { rerender } = renderHook(() => ([count, setCount] = useCounter())); // a non-Host
  expect(count).toBe(1);
  unmount(); // Host

  // 'non-Host' still have state but setCount cannot be called, a new Host is needed
  expect(count).toBe(1);
});

test('should console.error on call hook without Host', () => {
  const spy = spyOn(console, 'error');
  renderHook(() => useCounter()); // render Hookleton non-host
  expect(spy).toHaveBeenCalled();
});
