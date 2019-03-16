export const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

function predicateAsyncFn(period, fn, ...args) {
  return new Promise((resolve, reject) => {
    const task = () => fn(...args);
    const interval = setInterval(() => {
      const { status, result } = task();
      if (status === STATE.FULFILLED) {
        resolve(result);
        clearInterval(interval);
      } else if (status === STATE.REJECTED) {
        reject(result);
        clearInterval(interval);
      }
    }, period);
  });
}

const getElapsed = instance => ({
  status: instance.done ? STATE.FULFILLED : STATE.PENDING,
  result: instance.elapsed,
});

export async function getBenchResult(bench) {
  const { instance, period } = bench;
  return predicateAsyncFn(period, getElapsed, instance);
}
