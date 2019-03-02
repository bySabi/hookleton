import { useEffect, useMemo, useRef, useState } from 'react';

export default function createHook(useHook, ...initialArgs) {
  return createHookWithClass(Hookleton, useHook, ...initialArgs);
}

export function createHookWithClass(hookletonClass, useHook, ...initialArgs) {
  const hook = new hookletonClass(useHook, initialArgs);
  const useFn = hook.useFn.bind(hook);
  useFn.get = hook._get.bind(hook);
  return useFn;
}

export class Hookleton {
  constructor(useHook, initialArgs) {
    this._useHook = useHook;
    this._args = initialArgs;

    this._hookOut = [];
    this._updaters = new Map();
  }

  useFn(...initialArgs) {
    // First hook call become the 'hookleton'
    const isFirst = useRef(false);
    useMemo(() => this._onInit({ isFirst, initialArgs }), []); // only one `useFn` instance will be true

    if (isFirst.current) {
      // Set shared `hook` output
      this._hookOut = this._useHook(...this._args);

      // Checked at start on 'first' render
      useMemo(() => {
        if (!Array.isArray(this._hookOut)) {
          throw new Error("[Hookleton] provided 'useHook' must return array values");
        }
      }, []);

      // Lifecycle hook: `on render first`
      return this.useOnFirst(this._args);
    }

    // Lifecycle hook: `on render the rest`
    return this.useOnRest(initialArgs);
  }

  // Here we use a custom function that ignore first render call.
  useOnFirst() {
    useEffect(this.__updateRest.bind(this), [this._hookOut[0]]);
    return this._hookOut;
  }

  useOnRest() {
    // Get 'updater' for, later, force render it.
    // state is ignore because we have only one state set in 'hookleton'
    const [, updater] = useState();

    useEffect(() => {
      // a Map of key/value: updater/updater is useful for some kinds of hooks
      // composed on top of `useFn`
      this._updaters.set(updater, wrapUpdater(updater));
      return () => this._updaters.delete(updater); // on unmount
    }, []);

    return this._hookOut;
  }

  _onInit({ isFirst, initialArgs }) {
    this._onInit = () => {};
    // on Init only
    isFirst.current = true;
    // Passed arguments on `useFn` declaration have more priority than args from first `useFn` call
    this._args = this._args.length > 0 ? this._args : initialArgs;
  }

  _updateRest() {
    // State, `hookOut[0]`, is passed to updater. This value is not use here,
    // but could be useful for libs that extends Hookleton
    this._updaters.forEach(updater => updater(this._hookOut[0]));
  }

  __updateRest() {
    // skip first(unexpected) callback call
    this.__updateRest = this._updateRest;
  }

  _get() {
    return this._hookOut;
  }
}

// Update negating '~' his current state. This force to rerender it
const wrapUpdater = updater => () => updater(forceUpdate);
const forceUpdate = s => ~s;
