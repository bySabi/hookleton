export default class Benchmark {
  constructor({ count }) {
    this._c = count;
    this.done = false;
  }
  start() {
    this._start = true;
    global.gc && global.gc();
    this.startTime = Date.now();
  }
  discount() {
    this._start && this._dec();
  }
  _dec() {
    --this._c === 0 && this._end();
  }
  _end() {
    this.endTime = Date.now();
    this.elapsed = this.endTime - this.startTime;
    this.done = true;
    this._start = false;
  }
}
