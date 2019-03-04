import { useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react';

export function createHook(useHook, ...initialArgs) {
  return createHookWithClass(Hookleton, useHook, ...initialArgs);
}

export function createHookWithClass(HookletonClass, useHook, ...initialArgs) {
  const hookleton = new HookletonClass(useHook, initialArgs);
  const use = hookleton.use.bind(hookleton);
  use.get = () => hookleton._o;
  return use;
}

export class Hookleton {
  constructor(useHook, initialArgs) {
    this._hook = useHook;
    this._a = initialArgs;
    this._up = new Map(); // non-Host updaters container
    this._h = false; // have 'Host' flag
    /* this._o = [] is "The source of Truth" */
  }

  use(...initialArgs) {
    // refUse can have 3 states when a componet call `use Hook`
    //  undefined --> when called the first time, `use Hook` is still unset
    //       true --> `use Hook` is set and the current component is the hookleton 'Host'
    // a function --> current component is a user, a non-Host, of the hookleton
    const refUse = useRef(false);

    // `_init` change when Host is unmounted and a new Host must be promote
    useMemo(() => this._init({ refUse, initialArgs }), []);

    // This is the hookleton Host
    if (refUse.current) {
      // The call to provided `useHook`
      this._o = this._hook(...this._arg); // return "The source of truth"

      // Checked on 'first' render
      useMemo(() => {
        if (!Array.isArray(this._o)) {
          throw new Error('[Hookleton] provided Hook must return array values');
        }
      }, []);

      // Reset `_host` flag on unmount
      useLayoutEffect(() => () => (this._h = false), []);

      // Lifecycle hook: `on render Host`
      return this.useHost(this._arg);
    }

    // Lifecycle hook: `on render non-Host`
    return this.useNonHost(initialArgs);
  }

  // Here we use a custom function `_notify2` that ignore first render call,
  // that is defined on `this._init`
  useHost() {
    useEffect(() => this._notify2(), [this._o[0]]);
    return this._o;
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

    return this._o;
  }

  _init({ refUse, initialArgs }) {
    if (this._h === false) {
      // we have 'Host'
      this._h = true;

      // init "The source of truth"
      this._o = [];

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
    // `out[0]` is passed to updater. This value is not use here,
    // but could be useful for libs that extends Hookleton
    // by CONVENTION `out[0]` it is assumed that is the state
    this._up.forEach(updater => updater(this._o[0]));
  }
}

// Update negating '~' his current state. This force to rerender it
const wrapUpdater = updater => () => updater(forceUpdate);
const forceUpdate = s => ~s;
