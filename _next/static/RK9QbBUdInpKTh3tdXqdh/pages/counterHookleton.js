(window.webpackJsonp=window.webpackJsonp||[]).push([["1d3d"],{iPAA:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/counterHookleton",function(){var e=n("q7HY");return{page:e.default||e}}])},q7HY:function(e,t,n){"use strict";n.r(t),n.d(t,"reducer",function(){return i});var r=n("doui"),u=n("q1tI"),c=n.n(u),o=n("56h1"),a={count:0},i=function(e,t){switch(t.type){case"reset":return a;case"increment":return{count:e.count+1};case"decrement":return{count:e.count-1};default:return e}},l=Object(o.createHook)(u.useReducer),d=function(){var e=l.use(i,a),t=Object(r.default)(e,2),n=t[0],u=t[1];return c.a.createElement("div",null,c.a.createElement("p",null,"You clicked ",n.count," times"),c.a.createElement("button",{onClick:function(){return u({type:"increment"})}},"+"),c.a.createElement("button",{onClick:function(){return u({type:"decrement"})}},"-"),c.a.createElement("button",{onClick:function(){return u({type:"reset"})}},"Reset"))},f=0,s=function(){return Object(u.useEffect)(function(){return function(){return f=0}},[]),c.a.createElement("p",{style:{color:"red"}},"I should be rendered ONE time but: ",++f)};t.default=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement(s,null),c.a.createElement(d,null))}}},[["iPAA","5d41","9da1"]]]);