import { useState, useEffect } from 'react';
import { createHook } from 'hookleton';

function counter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(count + 1);
  return [count, increment];
}

const useCounter = createHook(counter);
const CounterContainer = useCounter.Provider;

function Button() {
  const [, increment] = useCounter();
  return <button onClick={increment}>+</button>;
}

function Count() {
  const [count] = useCounter();
  return <span>{count}</span>;
}

export default () => (
  <>
    <Count />
    <Button />
    <CounterContainer initial={3}>
      <Count />
      <Button />
    </CounterContainer>
    <CounterContainer>
      <Count />
      <Button />
      <CounterContainer>
        <Count />
        <Button />
        <CounterContainer initial={4}>
          <Count />
          <Button />
          <CounterContainer initial={4}>
            <Count />
            <Button />
            <CounterContainer initial={4}>
              <Count />
              <Button />
              <CounterContainer initial={4}>
                <Count />
                <Button />
              </CounterContainer>
            </CounterContainer>
          </CounterContainer>
        </CounterContainer>
      </CounterContainer>
    </CounterContainer>
    <CounterContainer>
      <Count />
      <Button />
      <CounterContainer initial={3}>
        <Count />
        <Button />
      </CounterContainer>
    </CounterContainer>
  </>
);
