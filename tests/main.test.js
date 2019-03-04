import { useState } from 'react';
import { act, cleanup, renderHook } from 'react-hooks-testing-library';
import { createHook } from '../src';

let useCounter;
let useCounter2;

beforeEach(() => {
  useCounter = createHook(useState);
  useCounter2 = createHook(useState, 1);
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
  const { unmount } = renderHook(() => useCounter(1)); // render Hookleton Host
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
