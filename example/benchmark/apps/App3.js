import createContainer from 'constate';
import React, { useState, useEffect, useContext } from 'react';

// constate
const BenchContainer = createContainer(useState);

const Bench = ({ benchState }) => {
  const [, updater] = useContext(BenchContainer.Context);
  useEffect(() => {
    if (benchState.start) {
      benchState.bench.instance.start();
      updater(s => ~s);
    }
  }, [benchState.start, benchState.loop]);
  return null;
};

const Comp = ({ benchState }) => (
  useContext(BenchContainer.Context), benchState.bench.instance.discount(), null
);

const Any = () => (Array.from({ length: 1000 }).map(Math.random), null);

export default ({ benchState }) => (
  <div>
    <p>constate Bench</p>
    <p />
    <BenchContainer.Provider>
      <Bench benchState={benchState} />
      {Array.from({ length: benchState.bench.n }).map((_, idx) => (
        <Comp key={idx} benchState={benchState} />
      ))}
      <Any />
    </BenchContainer.Provider>
  </div>
);
