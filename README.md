<h1 align="center">
  <img src="https://raw.githubusercontent.com/bySabi/hookleton/master/images/Hookleton.png" width="200"/>
  <br/>
  <p align="center" style="font-size: 0.5em">The globalizer Hook Pattern</p>
</h1>

[![npm](https://img.shields.io/npm/v/hookleton.svg)](https://www.npmjs.com/package/hookleton)
[![npm downloads](https://img.shields.io/npm/dm/hookleton.svg?style=flat-square)](https://www.npmjs.com/package/hookleton)
[![size](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/hookleton/lib/index.js?compression=gzip)](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/hookleton/lib/index.js)
[![Coverage Status](https://coveralls.io/repos/github/bySabi/hookleton/badge.svg?branch=master)](https://coveralls.io/github/bySabi/hookleton?branch=master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/bySabi/10)

> globalize your React Hooks without fear using the Hookleton Pattern

_Hookleton_ convert any React Hook in a global hook. A global hook is a function that returns always the same result every time its called. Let's call this result, the hook runtime _interface_.

When this Hook is **use***d* for the first time its `host` component will become a **Singleton** of it, hence the name **Hookleton**. Naming is hard!, you know.

That said, it might sound a bit complicated but it is not. `Hookleton` was created thinking about the ease of use even for an occasional user with the minimum effort. It is likely that when you try it you will not want to use something else because there simply is nothing easier out there.

Does _Hookleton_ make your life a little more easy? Consider <a href="https://www.buymeacoffee.com/4H8KhlSxM" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Benefits

- Zero dependencies (only React Hook)
- Small size [![size](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/hookleton/lib/index.js?compression=gzip)](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/hookleton/lib/index.js)
- Simple API
- Low Memory Consumption and CPU Usage
- Very fast, as fast as the React Hook _runtime_
- Works in any environment that supports React Hook: _React Native_, _React Server-Side Rendering ([next.js](https://github.com/zeit/next.js/))_, _[Proto Native](https://github.com/kusti8/proton-native)_, ...
- Extensible by advanced users
- Very low cognitive load

## Install

- NPM: `npm i hookleton`
- Yarn: `yarn add hookleton`

## a simple API

The Hookleton package exposes `createHook` function that does all.

`createHook(useHook, initial?): useHookleton`

- `useHook` is the user provide Hook
- `initial` any params that _useHook_ will accept
- `useHookleton` returned Hookleton

### a single convention

By **convention** Hookleton inspect for changes in element **1** of _array_ returned by _useHook_ before notify(_force render_) to users components of the hookleton.
Make sure you update that value, `hook Output[0]`, if you want the changes to be notified.

An example, in case it has not been clear:

```javascript
const useExample = createHook(() => {
  const [, setState] = useState(0);
  return ['any value', setState];
});
```

If you do something like this, when `setState` update state the hookleton **host** will be rendered but **Hookleton** will not see any change cause element **1** is a constant value, `any value`, hence the rest of users component will not be rendered.

## usage Example

A simple example is worth a thousand words

[page](https://bysabi.github.io/hookleton/counter/) | [source](./example/pages/counter.js)

```javascript
import { useState } from 'react';
import { createHook } from 'hookleton';

// useCounter is a useState but global
const useCounter = createHook(useState);

const Increment = () => {
  const [, update] = useCounter();
  const increment = () => update(s => s + 1);
  return <button onClick={increment}>+</button>;
};

const Decrement = () => {
  const [, update] = useCounter();
  const decrement = () => update(s => s - 1);
  return <button onClick={decrement}>-</button>;
};

const Value = () => {
  const [count] = useCounter(0);
  return <span>{count}</span>;
};

export default () => (
  <div>
    <Value />
    <Increment />
    <Decrement />
  </div>
);
```

The `Value` component is the **host** of `useCounter` hookleton for being the first component of the hierarchy that _use_ it.
Remember that `useCounter` is **composing** a `useState` which is where all the logic happens. It could have been any Hook that return an **Array**

## more Examples

Examples [page](https://bysabi.github.io/hookleton/) include:

- _Todo App_ [page](https://bysabi.github.io/hookleton/todo/) | [source](./example/pages/todo.js)
- a _Mouse_ event listener that notify `{x,y}` position to 600 components in Real Time [page](https://bysabi.github.io/hookleton/mouse/) | [source](./example/pages/mouse.js)
- basic _Counter_ showed above [page](https://bysabi.github.io/hookleton/counter/) | [source](./example/pages/counter.js)
- 5 counters in 25 components. Include a basic `global store` [page](https://bysabi.github.io/hookleton/counters5x5/) | [source](./example/pages/counters5x5.js)
- 5 counters in 400 components. Default non-blocking renderer [page](https://bysabi.github.io/hookleton/counters10x40/) | [source](./example/pages/counters10x40.js)
- 5 counters in 400 components. With a custom blocking renderer [page](https://bysabi.github.io/hookleton/counters10x40blocking/) | [source](./example/pages/counters10x40blocking.js)
- 10 counters in multiple nested context [page](https://bysabi.github.io/hookleton/counterNested/) | [source](./example/pages/counterNested.js)
- showing Fetched 10 random users data in 16 components [page](https://bysabi.github.io/hookleton/fetch/) | [source](./example/pages/fetch.js)

How would it be with React Context vs Hookletons?

- _Counter_ based on React Context [page](https://bysabi.github.io/hookleton/counterContext/) | [source](/example/pages/counterContext.js)
- _Counter_ with Hookletons [page](https://bysabi.github.io/hookleton/counterHookleton/) | [source](/example/pages/counterHookleton.js)
- _Mouse_ based on React Context [page](https://bysabi.github.io/hookleton/mouseContext/) | [source](/example/pages/mouseContext.js)
- _Mouse_ with Hookletons [page](https://bysabi.github.io/hookleton/mouseHookleton/) | [source](/example/pages/mouseHookleton.js)

## How it works

The idea is very simple. The first time that a user component of the Hook is instantiated the hookleton is created and the result of the call to `user Hook` will be _linked_ to the `host` of the hookleton. The `user Hook` is the one you want to _globalize_.
The result to the calls to the hookleton in the `host` component will become `The source of truth`. The rest of user components will receive a reference to _The source of truth_ on each **re-render**.
As we said the `host` of the hookleton is the first component instance that _use_ it or _call_ it. This is important for two reasons:

- First, initial state of the Hook only can be defined in the `host` or in the creation moment with `createHook`. Any _initial_ value from the rest of components will be ignored.
- Second, when the host component is unmounted `non-host` will retain the state but you can not update it until a new component that will be designated `Host` is mounted

This is all that you need about _Hookletons_ before start to use it

# Why and When use Hookletons

The first reason is _simplicity_, but obviously this explanation is not enough. Let's do some history. <br/>
A cloudy day googling I was looking for the simplest possible alternative to _Redux_. For a toy project I needed to share a couple of values between components in the simplest way possible. I found several packages but I did not like any, mainly for two reasons.

- They force you to use **Providers**, **Context** objects or **HOC** wrappers
- They usually implement **complex logics** to update the state and avoid unnecessary _rerenders_

This does not mean that they are badly constructed, just that they were not built on top of React Hook, they are prior to it or do not benefit at all of the **"Hook engine"**

Hookleton solves it elegantly. Actually _Hookleton_ does not know anything about the `useHook` that want to be global, it only matters that the hook returns an _array_ of any size, its runtime `interface`. This means that its utility is to share the _interface_ of the hook not only its state.

### When and Where use it

---

Hookletons can be used in all kinds of projects, both large and small. Remember that Hookleton does not impose anything, it's just a wrapper to [useYourImagination](https://reactjs.org/docs/hooks-custom.html#useyourimagination)

- Wherever you need share `logic` and `data` between _related_ and _non-related_ components
- With _sites_, _landing pages_ and _MVP_ projects that do not require `immutable` data and complex boilerplates
- When complex logics and `immutable` data are a requirement, Hooks can be **composed** using Hookletons

## Pitfalls

1. If element **1** of the returned _array_ does not change, the users of the hookleton will not be notified
2. There are two ways to set the initial value of the hookleton. When created with `createHook` and when it is called from the host component.
   - The value passed in `createHook` creation has priority
   - If it is `undefined` in _createHook_, the value set in the `host` component will be used. There is only one _host_ component, **the first one**
3. `initial` values passed to **non-host** components will be **ignored**
4. If the host component is **unmounted**, the calls to state `setter` will fail. To ensure that this does not happen, you can create a component that acts as the host of the hookleton or several of them at the top of the component hierarchy, Ex:

```javascript

const Hookletons = () => {
  useExample1(0);
  useExample2('one');
  useExample3({ three: 3 });
  return null
}

const App = () => (
  <Hookletons />
  <rest of the components ...>

)

```

## Performance

The speed of Hookleton depends completely on the implementation of React Hook. If you compare it with any implementation based on Hooks, it should have a similar performance.

If you compare it with other non-Hook based solutions, I do not know that it's the fastest thing out there. But the fair comparison would be against the React Hooks himself.

You can see how the _rerender_ behave in the above provide examples: _Mouse_, _Counters_, and _Fetch data_

## advanced users API

Hookleton is implemented in an class with lifecycle methods that can be extended or replaced.

`import { Hookleton, createHookWithClass } from 'hookleton'`

- `Hookleton` it is the class that implements everything
- `createHookWithClass` is a function for instantiate derived `Hookleton` classes and do some setup.

**\*createHook** is a _createHookWithClass_ function

## Credits

### author

- Félix A.A. <> [@bySabi](https://github.com/bySabi)

## Contributing

- Documentation improvement
- Feel free to send any PR

## License

[MIT](./LICENSE)
