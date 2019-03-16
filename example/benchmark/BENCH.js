// components
const NUM = [10, 50, 100, 500, 1000, 5000, 10000];

const INITIAL_BENCH_INSTANCE = Object.freeze({
  discount() {},
});

const BENCH = () => NUM.reduce((out, n) => [...out, { n }], []);

const LEN_BENCH = BENCH().length;

export { BENCH, LEN_BENCH, INITIAL_BENCH_INSTANCE, NUM };
