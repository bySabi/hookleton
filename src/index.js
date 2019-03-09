import React from 'react';

export function createHook(useHook, ...initial) {
  return createHookWithClass(Hookleton, useHook, ...initial);
}

export function createHookWithClass(HookletonClass, useHook, ...initial) {
  const hookleton = new HookletonClass(useHook, initial);
  const use = hookleton.use.bind(hookleton);
  // 'get' for use it standalone. Works only with default context
  use.get = () => hookleton._ctx.out;
  // context 'Provider'
  use.Provider = provider(hookleton.ctx.Provider, use);
  return use;
}

function provider(Provider, use) {
  return function HookletonCtx({ initial, children }) {
    const value = { initial }; // hookleton ctx object
    return React.createElement(
      Provider,
      { value },
      React.createElement(_hookleton, { use }),
      children
    );
  };
}

const _hookleton = ({ use }) => (use(), null);

export class HookletonCore {
  constructor(useHook, initial) {
    this._hook = useHook;
    this._arg = initial;
    this._ctx = {}; // default context object
  }

  _use(ctx) {
    ctx.out = this._hook(...ctx.arg); // return "The source of truth"

    // Checked on 'first' render only
    React.useMemo(() => {
      if (!Array.isArray(ctx.out)) {
        throw new Error('[Hookleton] provided Hook must return array values');
      }
    }, []);

    return this.useHost(ctx);
  }

  /* "Public" methods */

  useHost(ctx) {
    // notify to all non-host on each `out[0]` update
    React.useEffect(() => ctx.notify(), [ctx.out[0]]);
    return ctx.out;
  }

  useNonHost(ctx) {
    // Get 'updater' for, later, force render it.
    // state is ignore because we have only one state already set in 'hookleton'
    const [, updater] = React.useState();

    React.useLayoutEffect(() => {
      // a Map of updater|updater is useful for some kinds of hooks composed on top of `use Hook`
      ctx.up.set(updater, wrapUpdater(updater));
      return () => ctx.up.delete(updater); // on unmount
    }, []);

    return ctx.out;
  }
}

export class Hookleton extends HookletonCore {
  constructor(useHook, initial) {
    super(useHook, initial);
    // if a context Provider is not found use: HookletonCore '_ctx' object
    this.ctx = React.createContext(this._ctx);
  }

  use(...initial) {
    const ctx = React.useContext(this.ctx);
    const refUse = React.useRef(false);

    React.useMemo(() => this._init({ ctx, initial, refUse }), []);

    if (refUse.current) {
      // Reset 'Host' flag on unmount
      React.useLayoutEffect(() => () => (ctx.h = false), []);
      // HookletonCore '_use'
      return this._use(ctx);
    }

    return this.useNonHost(ctx, initial);
  }

  _init({ ctx, initial, refUse }) {
    if (!ctx.up) {
      ctx.up = new Map();
      ctx.notify = () => (ctx.notify = () => notify(ctx)); // for skip first(unexpected) callback call
    }

    if (!ctx.h) {
      // we have 'Host'
      ctx.h = true;

      // now current `use Hook` component is the hookleton 'Host'
      refUse.current = true;

      // This 'initial' come from <hookleton context Provider initial={}> and always has priority
      if (ctx.initial !== undefined) {
        // **IMPORTANT** 'initial' is passed like array of arguments. Ex
        //   <Counter initial={[reducer, initialState]}> is untouched.
        //   <Counter initial="example"> is converted to ["example"]
        // When a user need to pass an array has to be done this way
        //   <Counter initial={[[1,2,4]]} >
        ctx.arg = Array.isArray(ctx.initial) ? ctx.initial : [ctx.initial];
      } else {
        // Passed arguments on `use Hook` creation have more priority than args from Host `use Hook` call
        ctx.arg = this._arg.length > 0 ? this._arg : initial;
      }

      // init "The source of truth"
      ctx.out = [];
    }
  }
}

// Update negating '~' his current state. This force to rerender it
const wrapUpdater = updater => () => updater(forceUpdate);
const forceUpdate = s => ~s;

// `out[0]` is passed to updater. This value is not use here,
// but could be useful for libs that extends Hookleton
// by CONVENTION `out[0]` it is assumed that is the state
function notify(ctx) {
  ctx.up.forEach(updater => updater(ctx.out[0]));
}
