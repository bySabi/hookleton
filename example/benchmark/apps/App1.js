import { useState, useEffect } from 'react';
import { createHook } from 'hookleton';

/* Hookleton */
const useBench = createHook(useState);

const Bench = ({ benchState }) => {
  const [, updater] = useBench.use();
  useEffect(() => {
    if (benchState.start) {
      benchState.bench.instance.start();
      updater(s => ~s);
    }
  }, [benchState.start, benchState.loop]);
  return null;
};

const Comp = ({ benchState }) => (useBench(), benchState.bench.instance.discount(), null);

export default ({ benchState }) => (
  <div>
    <p>Hookleton Bench</p>
    <p />
    <Bench benchState={benchState} />
    {Array.from({ length: benchState.bench.n }).map((_, idx) => (
      <Comp key={idx} benchState={benchState} />
    ))}
  </div>
);
