import { useMemo, useReducer, useLayoutEffect } from 'react';

export function createHook(useHook, ...initial) {
  const hookleton = new Hookleton(useHook, initial);
  // non-Host hook
  function useFn() {
    return hookleton.use.apply(hookleton, arguments);
  }
  // Host hook
  useFn.use = function() {
    return hookleton._useHost.apply(hookleton, arguments);
  };
  // for use standalone
  useFn.get = function() {
    return hookleton.get.call(hookleton);
  };
  return useFn;
}

export class Hookleton {
  constructor(useHook, initial) {
    this._hook = useHook;
    this._arg = initial;
    // default context object initialized with `out:[]` useful when not Host is present
    this._ctx = { out: [] };
  }

  _useHost() {
    // this._ctx is default context
    !this._ctx.up && this._init({ ctx: this._ctx, initial: arguments });
    return this._use(this._ctx);
  }

  _init({ ctx, initial }) {
    ctx.up = new Map();
    // Passed arguments on `use Hook` creation have more priority than args from Host `use Hook` call
    ctx.arg = this._arg.length > 0 ? this._arg : initial;
  }

  _use(ctx) {
    ctx.out = this._hook.apply(this, ctx.arg); // return "The source of truth"
    return this.useHost(ctx);
  }

  /* "Public" methods */

  useHost(ctx) {
    // notify to all non-host on each update
    // `out` is passed to updater. This value is not use here,
    // but could be useful for libs that extends Hookleton
    useMemo(() => ctx.up.forEach(updater => updater(ctx.out)), [ctx.out]);
    return ctx.out;
  }

  use() {
    return this.useNonHost(this._ctx, arguments);
  }

  useNonHost(ctx) {
    // state is ignore because we have only one state already set in 'hookleton'
    const [, updater] = useReducer(forceUpdate);
    useLayoutEffect(() => {
      if (ctx.up) {
        ctx.up.set(updater, updater);
        return () => ctx.up.delete(updater);
      }
      console.error("[Hookleton] missing 'Host'");
    }, []);
    return ctx.out;
  }

  get() {
    return this._ctx.out;
  }
}

// Update negating '~' his current state. This force to rerender it
const forceUpdate = s => ~s;
