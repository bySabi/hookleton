import { useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react';

export function createHook(useHook, ...initialArgs) {
  return createHookWithClass(Hookleton, useHook, ...initialArgs);
}

export function createHookWithClass(HookletonClass, useHook, ...initialArgs) {
  const hookleton = new HookletonClass(useHook, initialArgs);
  const use = hookleton.use.bind(hookleton);
  use.get = () => hookleton._out; // inject a 'get' for use it standalone
  return use;
}

export class Hookleton {
  constructor(useHook, initialArgs) {
    this._hook = useHook; // a const value. Don't mutate it
    this._a = initialArgs; // a const value. Don't mutate it
    this._up = new Map(); // non-Host updaters container
    this._h = false; // the have 'Host' flag
    /* this._out is "The source of Truth", create on _init */
  }

  use(...initialArgs) {
    // refUse.current could have two states
    // 'true' --> Host  and  'false' --> non-Host
    const refUse = useRef(false);

    // create 'The source of truth', init '_arg' and setup Host
    // will run on 'first' render only
    useMemo(() => this._init({ refUse, initialArgs }), []);

    // This is the hookleton Host
    if (refUse.current) {
      // The call to provided `useHook`
      this._out = this._hook(...this._arg); // return "The source of truth"

      // Checked on 'first' render only
      useMemo(() => {
        if (!Array.isArray(this._out)) {
          throw new Error('[Hookleton] provided Hook must return array values');
        }
      }, []);

      // Reset have 'Host' flag on unmount
      useLayoutEffect(() => () => (this._h = false), []);

      // Lifecycle hook: `on render Host`
      return this.useHost(this._arg);
    }

    // Lifecycle hook: `on render non-Host`
    // non-Host initial is ignore but this value could be use by extenders
    return this.useNonHost(initialArgs);
  }

  // Use a custom function `_notify2` that ignore first render, defined on '_init'
  useHost() {
    // notify non-host on each `_o[0` update
    useEffect(() => this._notify2(), [this._out[0]]);
    return this._out;
  }

  useNonHost() {
    // Get 'updater' for, later, force render it.
    // state is ignore because we have only one state already set in 'hookleton'
    const [, updater] = useState();

    useLayoutEffect(() => {
      // a Map of updater|updater is useful for some kinds of hooks composed on top of `use Hook`
      this._up.set(updater, wrapUpdater(updater));
      return () => this._up.delete(updater); // on unmount
    }, []);

    return this._out;
  }

  _init({ refUse, initialArgs }) {
    if (!this._h) {
      // we have 'Host'
      this._h = true;

      // init "The source of truth"
      this._out = [];

      // now current `use Hook` component is the hookleton 'Host'
      refUse.current = true;

      // Passed arguments on `use Hook` creation have more priority than args from Host `use Hook` call
      this._arg = this._a.length > 0 ? this._a : initialArgs;

      // setup a custom function for skip first(unexpected) callback call
      this._notify2 = function() {
        this._notify2 = this._notify;
      };
    }
  }

  _notify() {
    // `_out[0]` is passed to updater. This value is not use here,
    // but could be useful for libs that extends Hookleton
    // by CONVENTION `out[0]` it is assumed that is the state
    this._up.forEach(updater => updater(this._out[0]));
  }
}

// Update negating '~' his current state. This force to rerender it
const wrapUpdater = updater => () => updater(forceUpdate);
const forceUpdate = s => ~s;
