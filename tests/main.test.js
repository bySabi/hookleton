import { useState } from 'react';
import { act, cleanup, renderHook } from 'react-hooks-testing-library';
import createHook from '../src';

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
  renderHook(() => ([count] = useCounter2(2)));
  expect(count).toBe(1);
});

test('should ignore initial param from a non-first hook call', () => {
  let count1;
  renderHook(() => ([count1] = useCounter(1)));
  let count2;
  renderHook(() => ([count2] = useCounter(2)));

  expect(count1).toBe(1);
  expect(count1).toBe(count2);
});

test('should throw error when useHook not return a array', () => {
  spyOn(console, 'error');
  expect(() => renderHook(useNonCompliant)).toThrowError(
    "Hookleton] provided 'useHook' must return array values"
  );
});
