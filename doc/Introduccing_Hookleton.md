# Introduccing Hookleton: How to avoid the "Coupling of Concerns(CoC)" in React Apps 

Too often, articles or comments are published on how to use `React Context` for global state management as an alternative to *Redux*, *MobX* or other existing package. It seems a growing trend.

Before going on to explain why this is a bad idea I would like to present [Hookleton](https://github.com/bySabi/hookleton). A library with a unique function, `createHook`, that returns a globalized Hook ready to use. You could have a look at the documentation [here](https://github.com/bySabi/hookleton), but it's not necessary, you know everything you need to know about it.

Done the presentations, let's see how we can solve a simple Global State management problem in the classic `Counter` example in two different ways, with React Context and with Hookletons.

I recommend a quick look at the examples to familiarize ourselves with the code:

>   Context-based Counter [code file](https://github.com/bySabi/hookleton/blob/master/example/pages/counterContext.js)   |    Hookleton Counter [code file](https://github.com/bySabi/hookleton/blob/master/example/pages/counterHookleton.js)



# A global *Counter* with React Context vs Hookleton Counter

Let's make a side by side comparison of the two examples. We will go step by step describing the similarities and differences in the code taken by the two approaches.

We assume that the user has some minimal knowledge of React Context and React Hooks. Although the example does not go beyond the basic information you can find in the official documentation or introductory tutorial.


## Initial state and reducer

Let's define the initial state `initialState` and a `reducer` function that will be responsible for managing the state of the **Counter**


```javascript
const initialState = { count: 0 };

export const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};
```

As you can see *initialState*, and *reducer* function are identical in the two examples.


## Creation of the global context, *the store* 


With React Context the next thing would be to define the context.

```javascript
  const CounterContext = React.context();
```

Although Hookleton does not use React Context, it does create a context object of its own which would be defined in this way.

```javascript
  const useCounter = createHook(useReducer);
```

Comparing the two lines of code above we find an important difference, the newly created hook, `useCounter`, is already shaped, we know that it as *useReducer*. In contrast we don't know anything about `CounterContext`, it can still be anything.

> These three definitions `initState`, `reduce` and `CounterContext | useCounter` could be in a module of its own and be imported from several modules. It is assumed that the Counter's status and logic is global. In this example for simplicity we will keep everything in one place.


## `Counter` component
The *Counter* component is very similar in the two versions of the example. The code is mixed this time to make it easier to visualize.
```javascript
const Counter = () => {
  // CONTEXT version
  const { store, dispatch } = useContext(CounterContext);
  
  // HOOKLETON version
  const [store, dispatch] = useCounter(reducer, initialState);
  
  return (
    <div>
      <p>You clicked {store.count} times</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
};
```


### Open vs Closed components

The Counter based on Hookletons is completely defined, it is a `useReducer` initialized with the `reducer` function and `initialState` object. The component is already fully operational, it is `Closed` 

On the other hand, the Counter based on React Context can not be used yet. We will have to inject the logic (*reduce*) and the data (*store*) when we go to use it. It could be argued that this is good because the Counter is not *coupled* and can be reused, something in which I completely agree. We will say that this component is `Open`

The most obvious difference between *Closed* and *Open* components is that the *Closed* component are **self-contained**, it can be used as it is. On the other hand, the *Open* component still has to be injected with the data, it is **non self-contained**

The goodness of the *self-contained* components is that they are easy to understand and `use`. On the other hand *non self-contained* components such as this of which we do not know *how* and *where* the logic and the data will be provide, are easy to `reuse` but not so easy to `use`

### the `use`

The Context-based Counter still has to be injected with the data to be able to `use` it and it turns out to be the hardest part of everything, when it should be the easiest.

```javascript
export default function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <CounterContext.Provider value={{ store, dispatch }}>
      <Counter />
    </CounterContext.Provider>
  );
}
```

*Let's talk a bit about this code*

First we have to define a component that will contain the provider of logic and data(store) for the *Counter*, in this case a **useReducer**

```javascript
const [store, dispatch] = useReducer(reducer, initialState);
```

Then we inject the result of the *useReducer* into the Context using the `prop` *value*

```javascript
<CounterContext.Provider value={{ store, dispatch }}>
   <Counter />
</CounterContext.Provider>
```

All instances of components such as **Counter** that need this object `{store, dispatch}` in particular must be descendants of the component `<CounterContext.Provider>`. In practice what is usually done is to put the Context Provider in the top of the hierarchy of components and make the whole application or an important part descendant, *children*,  of it.

### Coupling of Concerns(CoC)

Placing *<CounterContext.Provider>* at the top of the hierarchy causes a new problem which we can call `Coupling of Concerns`. Which refers to the fact that a component has been coupled to a logic that does not [concern](https://en.wikipedia.org/wiki/Separation_of_concerns) it. This is very common when we use Context, even The React Team does [not recommend](https://reactjs.org/docs/context.html#before-you-use-context) it. Its use beyond *Authentication*, *Theming*, or *i18n* it can be considered an `anti-pattern` 

On the example [page](https://bysabi.github.io/hookleton/counterContext/) of the context-based Counter, the text `should be rendered ONE time but:` showed by ["Any"](https://github.com/bySabi/hookleton/blob/master/example/pages/counterContext.js#L42) it is an example of a component that does not **concern** the state of the Counter but is still affected when it changes.

### Cognitive load and The Magical number [7 ± 2](https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two)

At first glance `<Counter />` looks like a **Closed** component. How can it work if we have not passed any `prop`?. Well that is part of the magic of the *Context*. It is enough that it is a child of the right context for the magic to occur. The bad thing is when the magic turns against you, in which case you are finished. BAMP!

<h1 align="center">
  <img src="https://66.media.tumblr.com/tumblr_lp6a7eVRxx1qgqu32.gif" width="500"/>
  <br/>
  <p align="center" style="font-size: 0.45em">a magic less moment</p>
</h1>


The reality is that it is very easy for this to happen. Look at everything you have to remember just to `use` your brand new Counter.

* First and very important: where you will put the `useReducer` that handle the Counter?
* Second: where will you put the `<CounterContext.Provider>. ` parent of all instances of `<Counter />`?
* Third: you have to couple the output of **useReducer** to the prop `value` of *<CounterContext.Provider>*. In the case of *useReducer* the names do not matter because the output is an array but `<Counter />` is waiting for an object with properties `{store, dispatch}`. Be careful not to make a typo here.
* Fourth: if you have several Context objects you will have to know which `value` correspond to each one.
* Fifth: `<Counter />` must be child of the right context.

And this is where we hit the *High Cognitive Load* of the Context, you must remember these points in order to make it work. But the Law of *The Magical number [7 ± 2](https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two)* applies to all of us, my friend. The solutions that require a lot of cognitive load are the most error-prone and are the ones that you should use less frequently. 

If this is so complicated with a single Context object imagine the nightmare of placing more than one. A priori it does not seem complicated, it would be enough to nest one Context inside another but the problem is where you place the **true providers**, which feed the *prop* `value` of the `<Counter.Provider>`?. This is one of the reasons why React Context do **not scale**

React Context based components are easy to `reuse` but not so easy to `use`. If you go too far beyond it is intended purpose you may have a problem of **Overenginering**

## and what about Hookleton Counter, how I use it ?

Well ...

```javascript
export default () => (
  <>
    <Counter />
  </>
);
```
That's all you need!. Remember that Hookleton `Counter` is a *Closed* component.

The Hookletons have no cognitive load, what you see is what you get, there is nothing to remember. And they do not generate *Coupling of Concerns* to the other components either.

# Conclusion

Use React Context as little as possible, only in cases where it is strictly necessary: Authentication, Theming, i18n, or tasks that concern the whole application; beyond that it can be considered an anti-pattern. They are difficult to use and do not scale well.

The problem with **CoC** has always been there, linked to the React Contexts, but perhaps it has not been considered as such in the absence of a term to describe it. CoC could be the right term and *Hookleton Pattern* one of the solutions. Time will tell.

But the most important question is whether you are more concerned with `using` or `reusing` your components. Everywhere it is recommended to develop for reuse but I do not think anyone recommends something like this.

Hookleton solves the problem of `use` creating Closed components. Has a very low cognitive load and, if that were not enough, it also solves the CoC. If you want to know more you can go [here](https://github.com/bySabi/hookleton) and ask its author.

# TL;DR

Use React Context as little as possible, if you need to handle global data, consider the Hookletons.
1. They are easy to create
2. They are easy to use and understand
3. They are easy to reuse
4. They are implemented with React Hooks and are fast and light

Go and [try it](https://github.com/bySabi/hookleton) and tell me how it went.
