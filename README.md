# Hookleton
[![npm](https://img.shields.io/npm/v/hookleton.svg)](https://www.npmjs.com/package/hookleton)
[![npm downloads](https://img.shields.io/npm/dm/hookleton.svg?style=flat-square)](https://www.npmjs.com/package/hookleton)
[![Minzip Size](https://img.shields.io/bundlephobia/minzip/hookleton.svg?style=flat)](https://www.npmjs.com/package/hookleton)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/bySabi/10)


> globalize your React Hooks without fear using the Hookleton Pattern


*Hookleton* convert any React Hook in a global hook. A global hook is a function that returns always the same result every time its called. Let's call this result, the hook runtime *interface*.

When this Hook is **use***d* for the first time its `host` component will become a **Singleton** of it, hence the name **Hookleton**. *Naming is hard!, you know.*

That said, it might sound a bit complicated but it is not. `Hookleton` was created thinking about the ease of use even for an occasional user with the minimum effort. It is likely that when you try it you will not want to use something else because there simply is nothing easier out there.


 **Hookleton* make your live a little more easy? Consider
 <style>.bmc-button img{width: 23px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{line-height: 36px !important;height:37px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#BB5794 !important;border-radius: 3px !important;border: 1px solid transparent !important;padding: 0px 9px !important;font-size: 17px !important;letter-spacing:-0.08px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:'Lato', sans-serif !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/4H8KhlSxM"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">Buy me a coffee</span></a>

Benefits
----
* Zero dependencies (only React Hook)
* Small size [![Minzip Size](https://img.shields.io/bundlephobia/minzip/hookleton.svg?style=flat)](https://www.npmjs.com/package/hookleton)
* Simple API
* Low Memory Consumption and CPU Usage
* Very fast, as fast as the React Hook *runtime*
* Works in any environment that supports React Hook: *React Native*, *React Server-Side Rendering ([next.js](https://github.com/zeit/next.js/))*, *[Proto Native](https://github.com/kusti8/proton-native)*, ...
* Extensible by advanced users

Install
---

- NPM: `npm install hookleton`
- Yarn: `yarn add hookleton`


How it works
---------

The idea is very simple. The first time that a user component of the Hook is instantiated the hookleton is created and the result of the call to `user Hook` will be *linked* to the `host` of the hookleton. The `user Hook` is the one you want to *globalize*.
The result to the calls to the hookleton in the `host` component will become `the source of truth`. The rest of user components will receive a reference to *the source of truth* on each **re-render**.
 As we said the `host` of the hookleton is the first component instance that *use* it or *call* it. This is important for two reasons:
* First, initial state of the Hook only can be defined in the `host` or in the creation moment with `createHook`. Any *initial* value from the rest of components will be ignored.
* Second, when the host component is unmounted all references to `the source of truth` will be **undefined**

This is all that you need about *Hookletons* before start to use it

a simple API
-------
The Hookleton package exposes a default function that does all.

`createHook(useHook, initial?): useHookleton`

* `useHook` is the user provide Hook
* `initial` any params that *useHook* will accept
* `useHookleton` returned Hookleton

a single convention
--------
By **convention** Hookleton inspect for changes in element **1** of *array* returned by *useHook* before notify(*force render*) to users components of the hookleton.
Make sure you update that value, `hookOut[0]`, if you want the changes to be notified.

An example, in case it has not been clear:

```
const useExample = createHook(() => {
   const [, setState] = useState(0);
   return ['any value', setState];
});
```

If you do something like this, when `setState` update state the hookleton **host** will be rendered but **Hookleton** will not see any change cause element **1** is a constant value, `any value`, hence the rest of users component will not be rendered.

usage Example
-----

A simple example is worth a thousand words

[page](https://yvjkpvn95v.sse.codesandbox.io/counter) | [source](./example/pages/counter.js)
```
import { useState } from 'react';
import createHook from 'hookleton';

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

The `Value` component is the **host** of `useCounter` hookleton for being the first component of the hierarchy that *use* it.
Remember that `useCounter` is **composing** a `useState` which is where all the logic happens. It could have been any Hook that return an **Array**

more Examples
------------
Examples [page](https://yvjkpvn95v.sse.codesandbox.io/) | [codesandbox](https://codesandbox.io/s/yvjkpvn95v), include:
* *Todo App* [page](https://yvjkpvn95v.sse.codesandbox.io/todo) | [source](./example/pages/todo.js)
* a *Mouse* event listener that notify `{x,y}` position to 600 components in Real Time [page](https://ox615lq106.sse.codesandbox.io/mouse) | [source](./example/pages/mouse.js)
* basic *Counter* showed above [page](https://yvjkpvn95v.sse.codesandbox.io/counter) | [source](./example/pages/counter.js)
* 5 counters in 25 components. Include a basic `global store` [page](https://yvjkpvn95v.sse.codesandbox.io/counters5x5) | [source](./example/pages/counters5x5.js)
* 5 counters in 400 components. Default non-blocking renderer [page](https://yvjkpvn95v.sse.codesandbox.io/counters10x40) | [source](./example/pages/counters10x40.js)
*  5 counters in 400 components. With a custom blocking renderer [page](https://yvjkpvn95v.sse.codesandbox.io/counters10x40blocking) | [source](./example/pages/counters10x40blocking.js)
* showing Fetched 10 random users data in 16 components [page](https://yvjkpvn95v.sse.codesandbox.io/fetch) | [source](./example/pages/fetch.js)


# Why and When use Hookletons

The first reason is *simplicity*, but obviously this explanation is not enough. Let's do some history:
A cloudy day googling I was looking for the simplest possible alternative to *Redux*. For a toy project I needed to share a couple of values between components in the simplest way possible. I found several packages but I did not like any, mainly for two reasons.
* They force you to use **Providers**, **Context** objects or **HOC** wrappers
* They usually implement **complex logics** to update the state and avoid unnecessary *rerenders*

This does not mean that they are badly constructed, just that they were not built on top of React Hook, they are prior to it or do not benefit at all of the **"Hook engine"**

Hookleton solves it elegantly. Actually *Hookleton* does not know anything about the `useHook` that want to be global, it only matters that the hook returns an *array* of any size, its runtime `interface`. This means that its utility is to share the *interface* of the hook not only its state.

### When and Where use it
----
Hookletons can be used in all kinds of projects, both large and small. Remember that Hookleton does not impose anything, it's just a wrapper to [useYourImagination](https://reactjs.org/docs/hooks-custom.html#useyourimagination)

* Wherever you need share `logic` and `data` between *related* and *non-related* components
* With *sites*, *landing pages* and *MVP* projects that do not require `immutable` data and complex boilerplates
* When complex logics and `immutable` data are a requirement, Hooks can be **composed** using Hookletons

Pitfalls
-----
1. If element **1** of the returned *array* does not change, the users of the hookleton will not be notified
2. There are two ways to set the initial value of the hookleton. When created with `createHook` and when it is called from the host component.
 * The value passed in `createHook` creation has priority
 * If it is `undefined` in *createHook*, the value set in the `host` component will be used. There is only one *host* component, **the first one**
3. `initial` values passed to **non-host** components will be **ignored**
4. If the host component is **unmounted**, the references to the array, `the source of truth`, will be undefined. To ensure that this does not happen, you can create a component that acts as the host of the hookleton or several of them at the top of the component hierarchy, Ex:

```

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

Performance
-------
The speed of Hookleton depends completely on the implementation of React Hook. If you compare it with any implementation based on Hooks, it should have a similar performance.

If you compare it with other non-Hook based solutions, I do not know that it's the fastest thing out there. But the fair comparison would be against the React Hooks himself.

You can see how the *rerender* behave in the above provide examples: *Mouse*, *Counters*, and *Fetch data*


advanced users API
----
Hookleton is implemented in an class with lifecycle methods that can be extended or replaced.

`import { Hookleton, createHookWithClass } from 'hookleton'`

* `Hookleton` it is the class that implements everything
* `createHookWithClass` is a function for instantiate derived `Hookleton` classes and do some setup.

Default **createHook** is a *createHookWithClass* function

Credits
----


### author
* Félix A.A. <> [@bySabi](https://github.com/bySabi)

Contributing
----

* Documentation improvement
* Feel free to send any PR


License
---
[MIT](./LICENSE)
