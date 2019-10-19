module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("eJQc");


/***/ }),

/***/ "Cg2A":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("y6vh");

/***/ }),

/***/ "FbiP":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Gf4D");

/***/ }),

/***/ "Gf4D":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/freeze");

/***/ }),

/***/ "J3/a":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/get-iterator");

/***/ }),

/***/ "Kjtv":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/is-iterable");

/***/ }),

/***/ "O40h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _asyncToGenerator; });
/* harmony import */ var _core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eVuF");
/* harmony import */ var _core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    _core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "R+ss":
/***/ (function(module, exports) {

module.exports = require("constate");

/***/ }),

/***/ "R2Q7":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/array/is-array");

/***/ }),

/***/ "TUA0":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "XXOK":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("J3/a");

/***/ }),

/***/ "YlwS":
/***/ (function(module, exports) {

module.exports = require("hookleton");

/***/ }),

/***/ "aC71":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/promise");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cu1A":
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),

/***/ "d04V":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("r7XW");

/***/ }),

/***/ "doui":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("p0XB");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js

function _arrayWithHoles(arr) {
  if (is_array_default()(arr)) return arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js
var get_iterator = __webpack_require__("XXOK");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = get_iterator_default()(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _slicedToArray; });



function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

/***/ }),

/***/ "eJQc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("doui");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// CONCATENATED MODULE: ./benchmark/component/Table.js

/* harmony default export */ var Table = (function (_ref) {
  var children = _ref.children,
      style = _ref.style;
  return external_react_default.a.createElement("table", {
    style: {
      align: 'right'
    }
  }, external_react_default.a.createElement("tbody", null, external_react_default.a.createElement("tr", null, children)));
});
// EXTERNAL MODULE: external "victory"
var external_victory_ = __webpack_require__("wL32");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("p0XB");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (is_array_default()(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/from.js
var from = __webpack_require__("d04V");
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js
var is_iterable = __webpack_require__("yLu3");
var is_iterable_default = /*#__PURE__*/__webpack_require__.n(is_iterable);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js


function _iterableToArray(iter) {
  if (is_iterable_default()(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return from_default()(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/freeze.js
var freeze = __webpack_require__("FbiP");
var freeze_default = /*#__PURE__*/__webpack_require__.n(freeze);

// CONCATENATED MODULE: ./benchmark/BENCH.js


// components
var NUM = [10, 50, 100, 500, 1000, 5000, 10000];

var INITIAL_BENCH_INSTANCE = freeze_default()({
  discount: function discount() {}
});

var BENCH_BENCH = function BENCH() {
  return NUM.reduce(function (out, n) {
    return [].concat(_toConsumableArray(out), [{
      n: n
    }]);
  }, []);
};

var LEN_BENCH = BENCH_BENCH().length;

// CONCATENATED MODULE: ./benchmark/component/Chart.js



/* harmony default export */ var Chart = (function (_ref) {
  var data = _ref.data;
  return external_react_default.a.createElement("div", null, external_react_default.a.createElement(external_victory_["VictoryChart"], {
    theme: external_victory_["VictoryTheme"].material,
    width: 600,
    height: 260
  }, external_react_default.a.createElement(external_victory_["VictoryGroup"], {
    vertical: true,
    offset: 10,
    style: {
      data: {
        width: 6
      }
    },
    colorScale: ['brown', 'tomato', 'gold']
  }, external_react_default.a.createElement(external_victory_["VictoryBar"], {
    data: data.filter(function (i) {
      return i.name === 'hookleton';
    }).map(function (i) {
      return {
        x: i.n.toString(),
        y: i.median
      };
    })
  }), external_react_default.a.createElement(external_victory_["VictoryBar"], {
    data: data.filter(function (i) {
      return i.name === 'context';
    }).map(function (i) {
      return {
        x: i.n.toString(),
        y: i.median
      };
    })
  }), external_react_default.a.createElement(external_victory_["VictoryBar"], {
    data: data.filter(function (i) {
      return i.name === 'constate';
    }).map(function (i) {
      return {
        x: i.n.toString(),
        y: i.median
      };
    })
  }))));
});
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/date/now.js
var now = __webpack_require__("Cg2A");
var now_default = /*#__PURE__*/__webpack_require__.n(now);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("hfKm");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    define_property_default()(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: ./benchmark/Benchmark.js




var Benchmark_Benchmark =
/*#__PURE__*/
function () {
  function Benchmark(_ref) {
    var count = _ref.count;

    _classCallCheck(this, Benchmark);

    this._c = count;
    this.done = false;
  }

  _createClass(Benchmark, [{
    key: "start",
    value: function start() {
      this._start = true;
      global.gc && global.gc();
      this.startTime = now_default()();
    }
  }, {
    key: "discount",
    value: function discount() {
      this._start && this._dec();
    }
  }, {
    key: "_dec",
    value: function _dec() {
      --this._c === 0 && this._end();
    }
  }, {
    key: "_end",
    value: function _end() {
      this.endTime = now_default()();
      this.elapsed = this.endTime - this.startTime;
      this.done = true;
      this._start = false;
    }
  }]);

  return Benchmark;
}();


// EXTERNAL MODULE: external "hookleton"
var external_hookleton_ = __webpack_require__("YlwS");

// CONCATENATED MODULE: ./benchmark/apps/App1.js





/* Hookleton */

var useBench = Object(external_hookleton_["createHook"])(external_react_["useState"]);

var App1_Bench = function Bench(_ref) {
  var benchState = _ref.benchState;

  var _useBench$use = useBench.use(),
      _useBench$use2 = Object(slicedToArray["a" /* default */])(_useBench$use, 2),
      updater = _useBench$use2[1];

  Object(external_react_["useEffect"])(function () {
    if (benchState.start) {
      benchState.bench.instance.start();
      updater(function (s) {
        return ~s;
      });
    }
  }, [benchState.start, benchState.loop]);
  return null;
};

var App1_Comp = function Comp(_ref2) {
  var benchState = _ref2.benchState;
  return useBench(), benchState.bench.instance.discount(), null;
};

/* harmony default export */ var App1 = (function (_ref3) {
  var benchState = _ref3.benchState;
  return external_react_default.a.createElement("div", null, external_react_default.a.createElement("p", null, "Hookleton Bench"), external_react_default.a.createElement("p", null), external_react_default.a.createElement(App1_Bench, {
    benchState: benchState
  }), from_default()({
    length: benchState.bench.n
  }).map(function (_, idx) {
    return external_react_default.a.createElement(App1_Comp, {
      key: idx,
      benchState: benchState
    });
  }));
});
// CONCATENATED MODULE: ./benchmark/apps/App2.js



/* React Context */

var BenchContext = external_react_default.a.createContext();

var App2_Bench = function Bench(_ref) {
  var benchState = _ref.benchState,
      children = _ref.children;

  var _useState = Object(external_react_["useState"])(),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      state = _useState2[0],
      updater = _useState2[1];

  Object(external_react_["useEffect"])(function () {
    if (benchState.start) {
      benchState.bench.instance.start();
      updater(function (s) {
        return ~s;
      });
    }
  }, [benchState.start, benchState.loop]);
  return external_react_default.a.createElement(BenchContext.Provider, {
    value: state
  }, children);
};

var App2_Comp = function Comp(_ref2) {
  var benchState = _ref2.benchState;
  return Object(external_react_["useContext"])(BenchContext), benchState.bench.instance.discount(), null;
};

/* harmony default export */ var App2 = (function (_ref3) {
  var benchState = _ref3.benchState;
  return external_react_default.a.createElement("div", null, external_react_default.a.createElement("p", null, "React Context Bench"), external_react_default.a.createElement("p", null), external_react_default.a.createElement(App2_Bench, {
    benchState: benchState
  }, from_default()({
    length: benchState.bench.n
  }).map(function (_, idx) {
    return external_react_default.a.createElement(App2_Comp, {
      key: idx,
      benchState: benchState
    });
  })));
});
// EXTERNAL MODULE: external "constate"
var external_constate_ = __webpack_require__("R+ss");
var external_constate_default = /*#__PURE__*/__webpack_require__.n(external_constate_);

// CONCATENATED MODULE: ./benchmark/apps/App3.js



 // constate

var BenchContainer = external_constate_default()(external_react_["useState"]);

var App3_Bench = function Bench(_ref) {
  var benchState = _ref.benchState;

  var _useContext = Object(external_react_["useContext"])(BenchContainer.Context),
      _useContext2 = Object(slicedToArray["a" /* default */])(_useContext, 2),
      updater = _useContext2[1];

  Object(external_react_["useEffect"])(function () {
    if (benchState.start) {
      benchState.bench.instance.start();
      updater(function (s) {
        return ~s;
      });
    }
  }, [benchState.start, benchState.loop]);
  return null;
};

var App3_Comp = function Comp(_ref2) {
  var benchState = _ref2.benchState;
  return Object(external_react_["useContext"])(BenchContainer.Context), benchState.bench.instance.discount(), null;
};

var App3_Any = function Any() {
  return from_default()({
    length: 1000
  }).map(Math.random), null;
};

/* harmony default export */ var App3 = (function (_ref3) {
  var benchState = _ref3.benchState;
  return external_react_default.a.createElement("div", null, external_react_default.a.createElement("p", null, "constate Bench"), external_react_default.a.createElement("p", null), external_react_default.a.createElement(BenchContainer.Provider, null, external_react_default.a.createElement(App3_Bench, {
    benchState: benchState
  }), from_default()({
    length: benchState.bench.n
  }).map(function (_, idx) {
    return external_react_default.a.createElement(App3_Comp, {
      key: idx,
      benchState: benchState
    });
  }), external_react_default.a.createElement(App3_Any, null)));
});
// CONCATENATED MODULE: ./benchmark/apps/index.js





var APPS = [{
  app: App1,
  name: 'hookleton'
}, {
  app: App2,
  name: 'context'
}, {
  app: App3,
  name: 'constate'
}].map(function (item) {
  item.bench = BENCH_BENCH();
  return item;
}); // set 'period' in `ms` for interval check

APPS.forEach(function (app) {
  return app.bench.map(function (bench) {
    return bench.period = 100;
  });
}); // set 'loop'

APPS.forEach(function (app) {
  return app.bench.map(function (bench) {
    return bench.loop = 5;
  });
}); // set 'result'

APPS.forEach(function (app) {
  return app.bench.map(function (bench) {
    return bench.result = [];
  });
});

APPS.setupResult = function (bench) {
  return bench.result = [];
};

APPS.setupInstance = function (bench) {
  var n = bench.n;
  bench.instance = new Benchmark_Benchmark({
    count: n
  });
};

/* harmony default export */ var apps = (APPS);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/regenerator/index.js
var regenerator = __webpack_require__("ln6h");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("O40h");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("eVuF");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// CONCATENATED MODULE: ./benchmark/util.js



var STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};

function predicateAsyncFn(period, fn) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return new promise_default.a(function (resolve, reject) {
    var task = function task() {
      return fn.apply(void 0, args);
    };

    var interval = setInterval(function () {
      var _task = task(),
          status = _task.status,
          result = _task.result;

      if (status === STATE.FULFILLED) {
        resolve(result);
        clearInterval(interval);
      } else if (status === STATE.REJECTED) {
        reject(result);
        clearInterval(interval);
      }
    }, period);
  });
}

var getElapsed = function getElapsed(instance) {
  return {
    status: instance.done ? STATE.FULFILLED : STATE.PENDING,
    result: instance.elapsed
  };
};

function getBenchResult(_x) {
  return _getBenchResult.apply(this, arguments);
}

function _getBenchResult() {
  _getBenchResult = Object(asyncToGenerator["a" /* default */])(
  /*#__PURE__*/
  regenerator_default.a.mark(function _callee(bench) {
    var instance, period;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            instance = bench.instance, period = bench.period;
            return _context.abrupt("return", predicateAsyncFn(period, getElapsed, instance));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getBenchResult.apply(this, arguments);
}
// CONCATENATED MODULE: ./pages/bench.js








var LEN_APPS = apps.length;

var bench_ButtonStart = function ButtonStart(_ref) {
  var enable = _ref.enable,
      start = _ref.start;
  return enable ? external_react_default.a.createElement("button", {
    onClick: start
  }, "Start Benchmarks") : external_react_default.a.createElement("p", null, "Benchmark in progress ...");
};

var dummyBench = {
  instance: INITIAL_BENCH_INSTANCE
};

var bench_dummyApp = function dummyApp() {
  return external_react_default.a.createElement("p", null, " ******************** ");
}; // initial bench


var bench_benchState = {
  enable: true,
  start: false,

  /* */
  app: bench_dummyApp,
  bench: dummyBench,

  /* */
  summary: []
};

var resetBenchState = function resetBenchState() {
  bench_benchState.app = bench_dummyApp;
  bench_benchState.bench = dummyBench;
};

/* harmony default export */ var pages_bench = __webpack_exports__["default"] = (function () {
  var _useState = Object(external_react_["useState"])(),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      update = _useState2[1];

  var enable = bench_benchState.enable,
      _app = bench_benchState.app,
      bench = bench_benchState.bench,
      summary = bench_benchState.summary;
  Object(external_react_["useEffect"])(function () {
    if (bench_benchState.doneAll) {
      bench_benchState.enable = true; // all results here
    } else if (bench_benchState.app !== bench_dummyApp) {
      if (bench_benchState.start) {
        getBenchResult(bench_benchState.bench).then(function (result) {
          bench.result.push(result);
          updateBenchCounts(bench_benchState);
          setupBench(bench_benchState);

          if (bench_benchState.doneLoop) {
            bench_benchState.loop = bench_benchState.bench.loop;
            summary.push(resultFn({
              name: bench_benchState.name,
              n: bench.n,
              median: medianTime(bench.result)
            }));
          }

          if (bench_benchState.doneBench) {
            resetBenchState();
            bench_benchState.start = false;
          }

          update(function (s) {
            return ~s;
          });
        });
      }
    } else {
      if (bench_benchState.appIdx !== undefined) {
        setupBench(bench_benchState);
        bench_benchState.start = true;
      }

      update(function (s) {
        return ~s;
      });
    }
  }, [bench_benchState.start, bench_benchState.loop, bench_benchState.app]);
  return external_react_default.a.createElement("div", null, external_react_default.a.createElement(Table, {
    style: {
      align: 'right'
    }
  }, external_react_default.a.createElement("td", null, external_react_default.a.createElement(bench_ButtonStart, {
    enable: enable,
    start: function start() {
      return initialBench(bench_benchState), update(function (s) {
        return ~s;
      });
    }
  }))), external_react_default.a.createElement(Table, null, external_react_default.a.createElement("td", null, external_react_default.a.createElement(_app, {
    benchState: bench_benchState
  }))), external_react_default.a.createElement(Chart, {
    data: summary
  }));
});

function initialBench(benchState) {
  benchState.enable = false;
  benchState.appIdx = 0;
  benchState.benchIdx = 0;
  setupBench(benchState);
  benchState.loop = benchState.bench.loop;
  benchState.start = true;
}

function setupBench(benchState) {
  var appIdx = benchState.appIdx,
      benchIdx = benchState.benchIdx;
  benchState.app = apps[appIdx].app;
  benchState.name = apps[appIdx].name;
  benchState.bench = apps[appIdx].bench[benchIdx];
  apps.setupInstance(benchState.bench);
}

function updateBenchCounts(benchState) {
  --benchState.loop;

  if (benchState.loop === 0) {
    /* loop end */
    benchState.doneLoop = true;
    benchState.appIdx = ++benchState.appIdx % LEN_APPS;

    if (benchState.appIdx === 0) {
      /* bench end, all apps ends for bench[benchIdx] */
      benchState.doneBench = true;
      benchState.benchIdx = ++benchState.benchIdx % LEN_BENCH;

      if (benchState.benchIdx === 0) {
        /* all bench end */
        benchState.doneAll = true; // reset benchState
      } else {
        benchState.doneAll = false;
      }
    } else {
      benchState.doneBench = false;
    }
  } else {
    benchState.doneLoop = false;
  }
}

function medianTime(result) {
  return result.sort()[Math.round(result.length / 2)];
}

var resultFn = function resultFn(_ref2) {
  var name = _ref2.name,
      n = _ref2.n,
      median = _ref2.median;
  return {
    n: n,
    median: median,
    name: name
  };
};

/***/ }),

/***/ "eVuF":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("aC71");

/***/ }),

/***/ "hfKm":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("TUA0");

/***/ }),

/***/ "ln6h":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cu1A");


/***/ }),

/***/ "p0XB":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("R2Q7");

/***/ }),

/***/ "r7XW":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/array/from");

/***/ }),

/***/ "wL32":
/***/ (function(module, exports) {

module.exports = require("victory");

/***/ }),

/***/ "y6vh":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/date/now");

/***/ }),

/***/ "yLu3":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Kjtv");

/***/ })

/******/ });