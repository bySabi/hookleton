import Benchmark from '../Benchmark';
import { BENCH } from '../BENCH';
import App1 from './App1';
import App2 from './App2';
import App3 from './App3';

const APPS = [
  { app: App1, name: 'hookleton' },
  { app: App2, name: 'context' },
  { app: App3, name: 'constate' },
].map(item => {
  item.bench = BENCH();
  return item;
});

// set 'period' in `ms` for interval check
APPS.forEach(app => app.bench.map(bench => (bench.period = 100)));

// set 'loop'
APPS.forEach(app => app.bench.map(bench => (bench.loop = 5)));

// set 'result'
APPS.forEach(app => app.bench.map(bench => (bench.result = [])));

APPS.setupResult = bench => (bench.result = []);
APPS.setupInstance = bench => {
  const { n } = bench;
  bench.instance = new Benchmark({ count: n });
};

export default APPS;
