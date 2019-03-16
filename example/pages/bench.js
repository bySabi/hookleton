import { useState, useEffect } from 'react';
import Table from '../benchmark/component/Table';
import Chart from '../benchmark/component/Chart';
import APPS from '../benchmark/apps';
import { LEN_BENCH, INITIAL_BENCH_INSTANCE } from '../benchmark/BENCH';
import { getBenchResult } from '../benchmark/util';

const LEN_APPS = APPS.length;

const ButtonStart = ({ enable, start }) =>
  enable ? <button onClick={start}>Start Benchmarks</button> : <p>Benchmark in progress ...</p>;

const dummyBench = { instance: INITIAL_BENCH_INSTANCE };
const dummyApp = () => <p> ******************** </p>;

// initial bench
const benchState = {
  enable: true,
  start: false,
  /* */
  app: dummyApp,
  bench: dummyBench,
  /* */
  summary: [],
};

const resetBenchState = () => {
  benchState.app = dummyApp;
  benchState.bench = dummyBench;
};

export default () => {
  const [, update] = useState();
  const { enable, app: _app, bench, summary } = benchState;

  useEffect(() => {
    if (benchState.doneAll) {
      benchState.enable = true;
      // all results here
    } else if (benchState.app !== dummyApp) {
      if (benchState.start) {
        getBenchResult(benchState.bench).then(result => {
          bench.result.push(result);

          updateBenchCounts(benchState);
          setupBench(benchState);

          if (benchState.doneLoop) {
            benchState.loop = benchState.bench.loop;
            summary.push(
              resultFn({ name: benchState.name, n: bench.n, median: medianTime(bench.result) })
            );
          }

          if (benchState.doneBench) {
            resetBenchState();
            benchState.start = false;
          }

          update(s => ~s);
        });
      }
    } else {
      if (benchState.appIdx !== undefined) {
        setupBench(benchState);
        benchState.start = true;
      }
      update(s => ~s);
    }
  }, [benchState.start, benchState.loop, benchState.app]);

  return (
    <div>
      <Table style={{ align: 'right' }}>
        <td>
          <ButtonStart enable={enable} start={() => (initialBench(benchState), update(s => ~s))} />
        </td>
      </Table>
      <Table>
        <td>
          <_app benchState={benchState} />
        </td>
      </Table>
      <Chart data={summary} />
    </div>
  );
};

function initialBench(benchState) {
  benchState.enable = false;
  benchState.appIdx = 0;
  benchState.benchIdx = 0;
  setupBench(benchState);
  benchState.loop = benchState.bench.loop;
  benchState.start = true;
}

function setupBench(benchState) {
  const { appIdx, benchIdx } = benchState;
  benchState.app = APPS[appIdx].app;
  benchState.name = APPS[appIdx].name;
  benchState.bench = APPS[appIdx].bench[benchIdx];
  APPS.setupInstance(benchState.bench);
}

function updateBenchCounts(benchState) {
  --benchState.loop;
  if (benchState.loop === 0) {
    /* loop end */
    benchState.doneLoop = true;
    benchState.appIdx = ++benchState.appIdx % LEN_APPS;
    if (benchState.appIdx === 0) {
      /* bench end, all apps ends for bench[benchIdx] */
      benchState.doneBench = true;
      benchState.benchIdx = ++benchState.benchIdx % LEN_BENCH;
      if (benchState.benchIdx === 0) {
        /* all bench end */
        benchState.doneAll = true;
        // reset benchState
      } else {
        benchState.doneAll = false;
      }
    } else {
      benchState.doneBench = false;
    }
  } else {
    benchState.doneLoop = false;
  }
}

function medianTime(result) {
  return result.sort()[Math.round(result.length / 2)];
}

const resultFn = ({ name, n, median }) => ({ n, median, name });
