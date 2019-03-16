import React, { useState, useEffect, useContext } from 'react';

/* React Context */
const BenchContext = React.createContext();

const Bench = ({ benchState, children }) => {
  const [state, updater] = useState();
  useEffect(() => {
    if (benchState.start) {
      benchState.bench.instance.start();
      updater(s => ~s);
    }
  }, [benchState.start, benchState.loop]);
  return <BenchContext.Provider value={state}>{children}</BenchContext.Provider>;
};

const Comp = ({ benchState }) => (
  useContext(BenchContext), benchState.bench.instance.discount(), null
);

export default ({ benchState }) => (
  <div>
    <p>React Context Bench</p>
    <p />
    <Bench benchState={benchState}>
      {Array.from({ length: benchState.bench.n }).map((_, idx) => (
        <Comp key={idx} benchState={benchState} />
      ))}
    </Bench>
  </div>
);
