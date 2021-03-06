<h1 align="center">
  <img src="https://raw.githubusercontent.com/bySabi/hookleton/master/images/Hookleton.png" width="200"/>
  <br/>
  <p align="center" style="font-size: 0.5em">The globalizer Hook Pattern</p>
</h1>

[![npm](https://img.shields.io/npm/v/hookleton.svg)](https://www.npmjs.com/package/hookleton)
[![gzip size](http://img.badgesize.io/https://npmcdn.com/hookleton/lib/index.js?compression=gzip)]()
[![Coverage Status](https://coveralls.io/repos/github/bySabi/hookleton/badge.svg?branch=master)](https://coveralls.io/github/bySabi/hookleton?branch=master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/bySabi/10)

> globalize your React Hooks without fear using the Hookleton Pattern

_Hookleton_ convert any React Hook in a global hook. A global hook is a function that always returns the same result to each place where it is called. Let's call this result, the hook runtime _interface_.

When this Hook is **use***d* for the first time its `host` component will become a **Singleton** of it, hence the name **Hookleton**. Naming is hard!, you know.

That said, it might sound a bit complicated but it is not. `Hookleton` was created thinking about the ease of use even for an occasional user with the minimum effort. It is likely that when you try it you will not want to use something else because there simply is nothing easier out there.

Does _Hookleton_ make your life a little more easy? Consider <a href="https://www.buymeacoffee.com/4H8KhlSxM" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Design pattern definition

The _Hookleton Pattern_ is a software design pattern that restricts the calls to a provided React Hook to a single component and uses a pub/sub mechanism to manage communication with the rest of user components of the hook

## Benefits

- Zero dependencies (only React Hook)
- Small size, ~50 _LOC_ [![gzip size](http://img.badgesize.io/https://npmcdn.com/hookleton/lib/index.js?compression=gzip)]()
- Simple API
- Low Memory Consumption and CPU Usage
- Very fast, as fast as the React Hook _runtime_
- 👉 without using React Context
- 👉 not complex user _memoizations_ needed. Out of the box performance
- Works in any environment that supports React Hook: _React Native_, _React Server-Side Rendering ([next.js](https://github.com/zeit/next.js/))_, _[Proto Native](https://github.com/kusti8/proton-native)_, ...
- Extensible
- Very low cognitive load

## Installation

```bash
# NPM
npm i hookleton

# Yarn
yarn add hookleton

```

## a simple API

The Hookleton package exposes `createHook` function that does all.

`createHook(useHook, ...initial?): useHookleton`

### Parameters

- `useHook` is the user provide Hook
- `initial` any number of params that _useHook_ will accept

### Returns

- `useHookleton` returned Hookleton. Called by _non-host_ components
- `useHookleton.use` returned Hookleton. Called by **the host** component
- `useHookleton.get` function that get the current output of the Hookleton.
  For standalone use

### a single convention

Only one component, the `host`, can call created _hookleton_ `use` hook and this component must be at the top of the component hierarchy.

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

// The host component
const Value = () => {
  const [count] = useCounter.use(0);
  return <span>{count}</span>;
};

// Value componet must be at the top
export default () => (
  <div>
    <Value />
    <Increment />
    <Decrement />
  </div>
);
```

The `Value` component is the **host** of `useCounter` hookleton for being the first component of the hierarchy that call `useCounter.use`.
Remember that `useCounter` is **composing** a `useState` which is where all the logic happens.

## hookleton based modules

The Hookleton library includes only the minimal _core_ code needed to maintain state synchronization between the users of the hookleton but was designed to be fully extensible. Take a look at these projects, it could be useful:

- [Garfio](https://github.com/bySabi/garfio) for extending Hookleton Pattern namespaces and more

## more Examples

Examples [page](https://bysabi.github.io/hookleton/) include:

- _Todo App_ [page](https://bysabi.github.io/hookleton/todo/) | [source](./example/pages/todo.js)
- a _Mouse_ event listener that notify `{x,y}` position to 1200 components in Real Time [page](https://bysabi.github.io/hookleton/mouse/) | [source](./example/pages/mouse.js)
- basic _Counter_ showed above [page](https://bysabi.github.io/hookleton/counter/) | [source](./example/pages/counter.js)
- showing Fetched 10 random users data in 16 components [page](https://bysabi.github.io/hookleton/fetch/) | [source](./example/pages/fetch.js)

How would it be with React Context vs Hookletons?

- _Counter_ based on React Context [page](https://bysabi.github.io/hookleton/counterContext/) | [source](/example/pages/counterContext.js)
- _Counter_ with Hookletons [page](https://bysabi.github.io/hookleton/counterHookleton/) | [source](/example/pages/counterHookleton.js)
- _Mouse_ based on React Context [page](https://bysabi.github.io/hookleton/mouseContext/) | [source](/example/pages/mouseContext.js)
- _Mouse_ with Hookletons [page](https://bysabi.github.io/hookleton/mouseHookleton/) | [source](/example/pages/mouseHookleton.js)

## External resources

- Medium: [Introduccing Hookleton: How to avoid the “Coupling of Concerns(CoC)” in React Apps](https://medium.com/introduccing-hookleton-a-simple-solution-to-coc/introduccing-hookleton-how-to-avoid-the-coupling-of-concerns-coc-in-react-apps-383322e5bc3)

## How it works

The idea is very simple. The first time that a user component of the Hook is instantiated the hookleton is created and the result of the call to `user Hook` will be _linked_ to the `host` of the hookleton. The `user Hook` is the one you want to _globalize_.
The result to the calls to the hookleton in the `host` component will become `The source of truth`. The rest of user components will receive a reference to _The source of truth_ on each **re-render**.
As we said the `host` of the hookleton is the first component instance that call `.use` hook. This is important because:

- Initial state of the Hook only can be defined in the `host` or in the creation moment with `createHook`. Any _initial_ value from the rest of components will be ignored.

This is all that you need about _Hookletons_ before start to use it

# Why and When use Hookletons

The first reason is _simplicity_, but obviously this explanation is not enough. Let's do some history. <br/>
A cloudy day googling I was looking for the simplest possible alternative to _Redux_. For a toy project I needed to share a couple of values between components in the simplest way possible. I found several packages but I did not like any, mainly for two reasons.

- They force you to use **Providers**, **Context** objects or **HOC** wrappers
- They usually implement **complex logics** to update the state and avoid unnecessary _rerenders_

This does not mean that they are badly constructed, just that they were not built on top of React Hook, they are prior to it or do not benefit at all of the **"Hook engine"**

Hookleton solves it elegantly. Actually _Hookleton_ does not know anything about the `useHook` that want to be global. This means that its utility is to share the _interface_ of the hook not only its state.

### When and Where use it

---

Hookletons can be used in all kinds of projects, both large and small. Remember that Hookleton does not impose anything, it's just a wrapper to [useYourImagination](https://reactjs.org/docs/hooks-custom.html#useyourimagination)

- Wherever you need share `logic` and `data` between _related_ and _non-related_ components
- With _sites_, _landing pages_ and _MVP_ projects that do not require `immutable` data and complex boilerplates
- When complex logics and `immutable` data are a requirement, Hooks can be **composed** using Hookletons

## Pitfalls

1. There are two ways to set the initial value of the hookleton. When created with `createHook` and when it is called from the host component.
   - The value passed in `createHook` creation has priority
   - If it is `undefined` in _createHook_, the value set in the `host` component will be used. There is only one _host_ component.
2. `initial` values passed to **non-host** components will be **ignored**
3. If the host component is **unmounted**, the calls to state `setter` will fail. To ensure that this does not happen, you can create a component that acts as the host of the hookleton or several of them at the top of the component hierarchy, Ex:

```javascript

const Hookletons = () => {
  useExample1.use(0);
  useExample2.use('one');
  useExample3.use({ three: 3 });
  return null
}

const App = () => (
  <Hookletons />
  <rest of the components ...>

)

```

4. When standalone API,`.get()`, the return value will be an **empty** array if it is called before render the component that _host_ the _hookleton_

## Performance

The speed of Hookleton depends completely on the implementation of React Hook. If you compare it with any implementation based on Hooks, it should have a similar performance.

If you compare it with other non-Hook based solutions, I do not know that it's the fastest thing out there. But the fair comparison would be against the React Hooks himself.

You can see how the _rerender_ behave in the above provide examples: _Mouse_, _Counters_, and _Fetch data_

## Credits

### author

- Félix A.A. <> [@bySabi](https://github.com/bySabi)

## Contributing

- Documentation improvement
- Feel free to send any PR

## License

[MIT](./LICENSE)
