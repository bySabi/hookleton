(window.webpackJsonp=window.webpackJsonp||[]).push([["f79a"],{bzsV:function(e,t,n){"use strict";n.r(t);var a=n("doui"),r=n("q1tI"),u=n.n(r),l=n("56h1"),o=["Do one","Do two","Do three"],c=Object(l.createHook)(function(e){var t=Object(r.useState)(e),n=Object(a.default)(t,2),u=n[0],l=n[1];return[u,{add:function(e){return l(u.concat(e))},remove:function(e){return l(u.filter(function(t){return t!==e}))}}]}),i=function(){var e=Object(r.useState)(""),t=Object(a.default)(e,2),n=t[0],l=t[1],i=c.use(o),d=Object(a.default)(i,2)[1].add;return u.a.createElement(u.a.Fragment,null,u.a.createElement("input",{value:n,onChange:function(e){return l(e.target.value)}}),u.a.createElement("button",{onClick:function(){d(n),l("")}},"Add"))},d=function(){var e=c(),t=Object(a.default)(e,1)[0];return u.a.createElement(u.a.Fragment,null,0===t.length?u.a.createElement("h4",null,"All todos are done! "):u.a.createElement("div",null,u.a.createElement("span",null,"Todo List, remain: ",u.a.createElement("span",null,t.length)," todos.")))},f=function(){var e=c(),t=Object(a.default)(e,2),n=t[0],r=t[1].remove;return u.a.createElement("ul",null,n.map(function(e,t){return u.a.createElement("li",{key:t},e,u.a.createElement("button",{onClick:function(){return r(e)}},"Complete"))}))};t.default=function(){return u.a.createElement(u.a.Fragment,null,u.a.createElement(i,null),u.a.createElement(d,null),u.a.createElement(f,null))}},q3Wk:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/todo",function(){var e=n("bzsV");return{page:e.default||e}}])}},[["q3Wk","5d41","9da1"]]]);