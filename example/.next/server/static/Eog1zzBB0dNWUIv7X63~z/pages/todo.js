module.exports=function(e){var t=require("../../../ssr-module-cache.js");function n(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}},o=!0;try{e[r].call(u.exports,u,u.exports,n),o=!1}finally{o&&delete t[r]}return u.l=!0,u.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)n.d(r,u,function(t){return e[t]}.bind(null,u));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}({7:function(e,t,n){e.exports=n("bzsV")},"J3/a":function(e,t){e.exports=require("core-js/library/fn/get-iterator")},R2Q7:function(e,t){e.exports=require("core-js/library/fn/array/is-array")},XXOK:function(e,t,n){e.exports=n("J3/a")},YlwS:function(e,t){e.exports=require("hookleton")},bzsV:function(e,t,n){"use strict";n.r(t);var r=n("doui"),u=n("cDcd"),o=n.n(u),a=n("YlwS"),l=["Do one","Do two","Do three"],c=n.n(a)()(function(e){var t=Object(u.useState)(e),n=Object(r.a)(t,2),o=n[0],a=n[1];return[o,{add:function(e){return a(o.concat(e))},remove:function(e){return a(o.filter(function(t){return t!==e}))}}]}),i=function(){var e=Object(u.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1],i=c(l),f=Object(r.a)(i,2)[1].add;return o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{value:n,onChange:function(e){return a(e.target.value)}}),o.a.createElement("button",{onClick:function(){f(n),a("")}},"Add"))},f=function(){var e=c(),t=Object(r.a)(e,1)[0];return o.a.createElement(o.a.Fragment,null,0===t.length?o.a.createElement("h4",null,"All todos are done! "):o.a.createElement("div",null,o.a.createElement("span",null,"Todo List, remain: ",o.a.createElement("span",null,t.length)," todos.")))},s=function(){var e=c(),t=Object(r.a)(e,2),n=t[0],u=t[1].remove;return o.a.createElement("ul",null,n.map(function(e,t){return o.a.createElement("li",{key:t},e,o.a.createElement("button",{onClick:function(){return u(e)}},"Complete"))}))};t.default=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(i,null),o.a.createElement(f,null),o.a.createElement(s,null))}},cDcd:function(e,t){e.exports=require("react")},doui:function(e,t,n){"use strict";var r=n("p0XB"),u=n.n(r);var o=n("XXOK"),a=n.n(o);function l(e,t){return function(e){if(u()(e))return e}(e)||function(e,t){var n=[],r=!0,u=!1,o=void 0;try{for(var l,c=a()(e);!(r=(l=c.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){u=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(u)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,"a",function(){return l})},p0XB:function(e,t,n){e.exports=n("R2Q7")}});