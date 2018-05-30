/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/js/App.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/electron/index.js":
/*!****************************************!*\
  !*** ./node_modules/electron/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var fs = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js")
var path = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js")

var pathFile = path.join(__dirname, 'path.txt')

if (fs.existsSync(pathFile)) {
  module.exports = path.join(__dirname, fs.readFileSync(pathFile, 'utf-8'))
} else {
  throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again')
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./node_modules/node-libs-browser/mock/empty.js":
/*!******************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/empty.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/client/js/App.js":
/*!******************************!*\
  !*** ./src/client/js/App.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/jquery.js */ "./src/client/js/lib/jquery.js");
/* harmony import */ var _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_bchaddr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/bchaddr.js */ "./src/client/js/lib/bchaddr.js");
/* harmony import */ var _lib_bchaddr_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_bchaddr_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_bitcoincash_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/bitcoincash.js */ "./src/client/js/lib/bitcoincash.js");
/* harmony import */ var _lib_bitcoincash_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_bitcoincash_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_pnglib_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/pnglib.js */ "./src/client/js/lib/pnglib.js");
/* harmony import */ var _lib_pnglib_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_pnglib_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_identicon_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/identicon.js */ "./src/client/js/lib/identicon.js");
/* harmony import */ var _lib_identicon_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_identicon_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_socket_io_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/socket.io.js */ "./src/client/js/lib/socket.io.js");
/* harmony import */ var _lib_socket_io_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lib_socket_io_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_sha512_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/sha512.js */ "./src/client/js/lib/sha512.js");
/* harmony import */ var _lib_sha512_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lib_sha512_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lib_webtorrent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/webtorrent.js */ "./src/client/js/lib/webtorrent.js");
/* harmony import */ var _lib_webtorrent_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lib_webtorrent_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Utilities */ "./src/client/js/Utilities.js");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Popup */ "./src/client/js/Popup.js");
/* harmony import */ var _Transaction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Transaction */ "./src/client/js/Transaction.js");
/* harmony import */ var _Transaction__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_Transaction__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _TransactionManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TransactionManager */ "./src/client/js/TransactionManager.js");
/* harmony import */ var _Post__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Post */ "./src/client/js/Post.js");
/* harmony import */ var _Post__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_Post__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _PostManager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PostManager */ "./src/client/js/PostManager.js");
/* harmony import */ var _Name__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Name */ "./src/client/js/Name.js");
/* harmony import */ var _Name__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_Name__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _NameManager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./NameManager */ "./src/client/js/NameManager.js");
/* harmony import */ var _NameManager__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_NameManager__WEBPACK_IMPORTED_MODULE_15__);
/**
 * Unite Client Implementation
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * This script provides the frameworks for the implementation of the Unite
 * protocol which is outlined in the protocol documentation.
 *
 * @file Provides the App class.
 */


window.jQuery = _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default.a
window.$ = _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default.a


window.bch = _lib_bitcoincash_js__WEBPACK_IMPORTED_MODULE_2___default.a



window.io = _lib_socket_io_js__WEBPACK_IMPORTED_MODULE_5___default.a




window.Utilities = _Utilities__WEBPACK_IMPORTED_MODULE_8__["default"]

window.Popup = _Popup__WEBPACK_IMPORTED_MODULE_9__["default"]

window.Transaction = _Transaction__WEBPACK_IMPORTED_MODULE_10___default.a

window.TransactionManager = _TransactionManager__WEBPACK_IMPORTED_MODULE_11__["default"]

window.Post = _Post__WEBPACK_IMPORTED_MODULE_12___default.a

window.PostManager = _PostManager__WEBPACK_IMPORTED_MODULE_13__["default"]

window.Name = _Name__WEBPACK_IMPORTED_MODULE_14___default.a

window.NameManager = _NameManager__WEBPACK_IMPORTED_MODULE_15___default.a

// set up some useful global constants
const CENTRAL_CONTENT_ADDRESS     = '1HBqvcE3jArLxTe4p2KRaDsRHHtEaqG66z'
const CENTRAL_PROFILE_ADDRESS     = '1B4wyiAP3xYx2H8AqMqrwdMfbw7YwFd4C3'
const CENTRAL_GROUPS_ADDRESS      = '14F1NbudfgRyEzau29HpexQPzHkghbWUKR'
const CENTRAL_REPORT_ADDRESS      = '12xemQTP98jgkAUGuGqHghdVSufqR7htjY'

const DUST_LIMIT_SIZE = 547;
const FEE_RATIO = 1.95;

const DEBUG_MODE = false

class App {

	constructor () {
		this.userPrivateKey
		this.userAddress
		this.userDisplayName
		this.insightBaseURL
		this.websock
		this.highestZIndexUsed = 2
    this.preformStartup()
	}

  preformStartup(){
    // check to see if the user has logged in yet
		if(sessionStorage.privateKey !== undefined){

			this.insightBaseURL = sessionStorage.insightBaseURL
			this.userPrivateKey = bch.PrivateKey.fromWIF(sessionStorage.privateKey)
			this.userAddress = this.userPrivateKey.toAddress()

			// Check that the localStorage data structures were defined
			if(localStorage.names == undefined){
				var names = [];
				localStorage.names = JSON.stringify(names);
			}

			if(localStorage.posts == undefined){
				var posts = [];
				localStorage.posts = JSON.stringify(posts);
			}

			if(localStorage.transactions == undefined){
				var transactions = [];
				localStorage.transactions = JSON.stringify(transactions);
			}

			// Acquire notification permissions
			if(Notification.permission == 'default'
          && localStorage.notification == undefined){
				localStorage.notification = 1;
        var p = new _Popup__WEBPACK_IMPORTED_MODULE_9__["default"]()
        p.setTitle('ALLOW NOTIFICATIONS')
        p.addText('Notifications let you know when your friends send you tips ')
        p.addText('or replies')
        p.show()
				Notification.requestPermission(function(permission){
          _Utilities__WEBPACK_IMPORTED_MODULE_8__["default"].goBack();
          if(permission != 'granted'){
            var p = new _Popup__WEBPACK_IMPORTED_MODULE_9__["default"]()
            p.setTitle('NOTIFICATIONS')
            p.addText('Unite will work without notifications, but you might ')
            p.addText('miss out when things happen.')
            p.show()
					}else{
						new SuccessBanner('We\'ll let you know when things happen!').show()
					}
				});
			}

			// connect to the WebSocket
			websock = _lib_socket_io_js__WEBPACK_IMPORTED_MODULE_5___default()(sessionStorage.webSocketEndpoint);
			websock.on('connect', function(){

				// subscribe to the relevant channels
				// TODO only subscribe to channels for addresses the user indicates
				websock.emit('subscribe', 'inv');

				// begin listening on the WebSocket
				socket_listen(websock);

				// if it exists call the function on the host page for the connect event
				if(typeof ws_connect != 'undefined'){
					ws_connect();
				}

			});

			// go back or close dialog when user presses escape/back
			_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keydown', function(e) {
				if (e.keyCode == 27){
					_Utilities__WEBPACK_IMPORTED_MODULE_8__["default"].goBack();
				}
			});

			// listen for submit events from forms which are on the host page
			listen_forms();

			// call the data loading function present on host pages responsible for
			// displaying dynamic content
			if(typeof load_data != 'undefined'){
				load_data();
			}

		}else{ // In case the user was not logged in

			if(window.location.pathname.split('/').pop() != 'login.html'){
				// redirect the user to login.html unless they were already there
				window.location.href = 'login.html';
			}

		}

  }

	// Provides a standard way of displaying error banners.
	display_error(error, time=5000){
		boink();
		// get a random ID
		var randID = sha512('potato'+new Date().toTimeString()+error).substr(0, 16);
		var newString = '<div class="banner error" id="'+randID+'">'+error;
		newString += '<button onclick="$(\'#'+randID+'\').slideUp(\'fast\');" ';
		newString += 'class="UICloseBannerButton">×</button></div>';
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('body').append(newString);
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#'+randID).hide();
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#'+randID).slideToggle('fast');
		setTimeout(function(){
			_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#'+randID).slideUp('fast');
		}, time);
	}

		// Provides a way of displaying success and notification banners.
		/* TODO:
		- Add a customizable click event so the user can be directed to the source
  	of the notification or alert.
		*/
	display_success(message, time=5000){
		// get a random ID
		var randID = sha512('tomato'+new Date().toTimeString()+error).substr(0, 16);
		var newString = '<div class="banner success" id="'+randID+'">'+message;
		newString += '<button onclick="$(\'#'+randID+'\').slideUp(\'fast\');" ';
		newString += 'class="UICloseBannerButton">×</button></div>';
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('body').append(newString);
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#'+randID).hide();
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#'+randID).slideToggle('fast');
		setTimeout(function(){
			_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#'+randID).slideUp('fast');
		}, time);
	}

		// Displays an alert from an HTML template present on the host page
	display_html_alert(tag){
		pop();
		var randID = sha512('tomato'+new Date().toTimeString()+tag).substr(0, 16);
		var newString = '<div style="z-index:'+highestZIndexUsed+';" class="UIDimmedBackground" id="';
		newString += randID+'a" onclick="$(\''+tag+'\').fadeOut(100);';
		newString += '$(\'#'+randID+'a\').fadeOut(100);woosh();setTimeout(function(){';
		newString += '$(\'#'+randID+'a\').remove();}, 150);"></div>';
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('body').append(newString);
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#'+randID+'a').hide();
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#'+randID+'a').fadeIn(100);
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()(tag).slideDown(100);
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()(tag).attr('style', 'z-index:'+(highestZIndexUsed+1)+';');
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()(tag).css('display', 'inline');
		document.activeElement.blur();
		highestZIndexUsed += 2;
	}

		// Parses a notification out of a post, then displays the notification.
		/* TODO:
		- Add an optional "on click" callback on the banner and/or notification to allow
  	the user to get to the source of the message if desired.
		*/
	parse_notification(post){
		if(post.type == '5501'){
			display_notification(post.name.name, post.data);
		}
		if(post.type == '5504'){
			display_notification(post.sender.substr(0, 6), 'Changed name to ' + post.name.name);
		}
	}

	// displays a notification if the document is not in focus, or a banner if it is.
	/* TODO:
	- Add an optional "on click" callback on the notification to allow
  the user to get to the source of the message/action if desired.
	*/
	display_notification(title, text){
		if(!document.hasFocus()){ // the user is not using the application
			var n = new Notification(title, {icon: './res/icon.png', body: text});
			n.onclick = function(ev){
				parent.focus();
				if("function" != undefined){
					var win = __webpack_require__(/*! electron */ "./node_modules/electron/index.js").remote.getCurrentWindow();
					win.show();
					win.setAlwaysOnTop(true);
					win.focus();
					win.setAlwaysOnTop(false);
				}
			};
		}else{ // the user is using the application
			display_success(title + '   ' + text);
		}
		pop();
	}

		//////////   WEBSOCKET FUNCTIONS

		// listens to the WebSocket for incoming transactions.
		/* TODO:
		- only subscribe to the rooms for addresses this user follows or shows interest in
		*/
		socket_listen(socket){
			socket.on('tx', function(data){
				get_tx(data.txid).then(function(tx){
					if(tx != -1){
						parse_tx(tx, 1);
					}
				});
			});
		}

		// returns GET parameters from the URL
		find_get_parameter(parameterName) {
    	var result = null,
        	tmp = [];
    	var items = location.search.substr(1).split("&");
    	for (var index = 0; index < items.length; index++) {
        	tmp = items[index].split("=");
        	if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    	}
    	return result;
		}

		//////////   FORMS AND EVENTS RELATED TO HOST PAGE

		// listen for form submission and related events
		listen_forms(){
			// log out when a log out button ls clicked
			_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#logout').on('click', function(ev){
				ev.preventDefault();
				_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('*').fadeOut(1000);
				delete sessionStorage.privateKey;
				delete sessionStorage.insightBaseURL;
				setTimeout(function(){
					window.location.href = 'login.html';
				}, 1100);
			});

			_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#backbutton').on('click', function(){
				history.back();
			});

			// send post when a send post button is clicked
			_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#sendpost').on('submit', function(ev){
				ev.preventDefault();
				var post_text = _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#newpost').val();
				if(post_text.length < 1 || post_text.length > 77){
					display_alert('[TEMPORARY] There is a temporary character limit of 77 characters for all posts. This will be removed soon!');
				}else{
					find_utxo(address.toString()).then(function(utxo){
						if(utxo == -1){
							var newString = '<h1>ACCOUNT BALANCE</h1>';
							newString += '<p>Check that you\'ve funded your account before posting!</p>';
							newString += '<p>We\'re working on a way to fund new users\' posts, it\'ll be ';
							newString += 'out soon!</p><p>In the meantime, here are some ways to fund your account: </p>';
							newString += '<ul><li>Ask a friend to send you some Bitcoin Cash to your Unite address</li>';
							newString += '<li>You can get some from the free.bitcoin.com faucet</li>';
							newString += '<li>You can trade any cryptocurrency for Bitcoin Cash on ShapeShift</li>';
							newString += '<li>You can be tipped on sites like yours.org or Reddit (r/btc)</li>';
							newString += '<li>You can buy some on sites like coinbase.com or kraken.com</li></ul>';
							display_alert(newString);
						}else{
							// create dummy tx to find approximate actual TX size with fee
							transaction = new bch.Transaction();
							transaction.from(utxo);
							transaction.to(address.toString(), utxo.satoshis - 768); // approximate
							transaction.to(central_posts_address, dustLimitSize)
							transaction.addData(hex2a('5501')+post_text)
							transaction.sign(privateKey);
							var tx_size = parseInt(transaction.toString().length/feeThreshold); // fee threshold
							// recreate transaction with correct fee
							transaction = new bch.Transaction();
							transaction.from(utxo)
							transaction.to(address.toString(), utxo.satoshis - dustLimitSize - tx_size)
							transaction.to(central_posts_address, dustLimitSize)
							transaction.addData(hex2a('5501')+post_text)
							transaction.sign(privateKey);
							broadcast_tx(transaction.toString());
							display_success('Your post has been sent!');
							swooosh();
							_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#newpost').val('');
						}
					});
				}
			});

			// name change form submit listener
			_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#namechangesubmit').on('click', function(){
				var name = _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#newName').val();
				if(name.length < 5 || name.length > 24){
					display_alert("Your name shouldn't be less than 5 or more than 24 characters!");
				}else{
					find_utxo(address.toString()).then(function(utxo){
						// create dummy tx to find approx size with fee
						transaction = new bch.Transaction();
						transaction.from(utxo);
						transaction.to(address.toString(), utxo.satoshis - dustLimitSize - 280); // approximate
						transaction.to(central_profiles_address, dustLimitSize);
						transaction.addData(hex2a('5504')+name);
						transaction.sign(privateKey);
						var tx_size = parseInt(transaction.toString().length/feeThreshold);
						// recreate transaction with correct fee
						transaction = new bch.Transaction();
						transaction.from(utxo);
						transaction.to(address.toString(), utxo.satoshis - dustLimitSize - tx_size);
						transaction.to(central_profiles_address, dustLimitSize);
						transaction.addData(hex2a('5504')+name);
						transaction.sign(privateKey);
						broadcast_tx(transaction.toString());
						display_success('Name updated!');
						_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#newName').val('');
					});
				}
			});

			// send reply when a send reply button is clicked
			_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#sendreply').on('submit', function(ev){
				ev.preventDefault();
				var post_text = _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#newpost').val();
				if(post_text.length < 1 || post_text.length > 45){
					display_alert('[TEMPORARY] There is a temporary character limit of 45 characters for all posts. This will be removed soon!');
				}else{
					find_utxo(address.toString()).then(function(utxo){
						if(utxo == -1){
							var newString = '<h1>ACCOUNT BALANCE</h1>';
							newString += '<p>Check that you\'ve funded your account before posting!</p>';
							newString += '<p>We\'re working on a way to fund new users\' posts, it\'ll be ';
							newString += 'out soon!</p><p>In the meantime, here are some ways to fund your account: </p>';
							newString += '<ul><li>Ask a friend to send you some Bitcoin Cash to your Unite address</li>';
							newString += '<li>You can get some from the free.bitcoin.com faucet</li>';
							newString += '<li>You can trade any cryptocurrency for Bitcoin Cash on ShapeShift</li>';
							newString += '<li>You can be tipped on sites like yours.org or Reddit (r/btc)</li>';
							newString += '<li>You can buy some on sites like coinbase.com or kraken.com</li></ul>';
							display_alert(newString);
						}else{
							// TODO [IMPORTANT!] verify this is set in the URL
							// create dummy tx to find approximate actual TX size with fee
							transaction = new bch.Transaction();
							transaction.from(utxo);
							transaction.to(address.toString(), utxo.satoshis - dustLimitSize - 300); // approximate
							transaction.to(topPost.sender, dustLimitSize)
							transaction.addData(hex2a('5503')+hex2a(topPost.txid)+post_text)
							transaction.sign(privateKey);
							var tx_size = parseInt(transaction.toString().length/feeThreshold); // fee threshold
							// recreate transaction with correct fee
							transaction = new bch.Transaction();
							transaction.from(utxo);
							transaction.to(address.toString(), utxo.satoshis - dustLimitSize - tx_size); // approximate
							transaction.to(topPost.sender, dustLimitSize)
							transaction.addData(hex2a('5503')+hex2a(topPost.txid)+post_text)
							transaction.sign(privateKey);
							broadcast_tx(transaction.toString());
							console.log(transaction.toString());
							display_success('Your reply has been sent!');
							swooosh();
							_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#newpost').val('');
						}
					});
				}
			});

		}

}

window.app = new App()


/***/ }),

/***/ "./src/client/js/Name.js":
/*!*******************************!*\
  !*** ./src/client/js/Name.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Name
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class to store data related to users' names
 *
 * @file Provides the Name class
 */



// Returns the name object given an address. Uses caching, returns first 6 of address if no name.
/* TODO:
- unique immutable hash symbol (color and shape) based on address to deter spoofing
*/
var get_name = function(addr){
	return new Promise(function(resolve, reject){
		var success = false;
		var names = JSON.parse(localStorage.names);
		// declare an empty default name just in case none exists
		var name = {address: addr, name: addr.substr(0, 6), time: 0, hash: get_name_hash(addr)};
		for(var i = 0; i < names.length; i++){
			if(names[i].address == addr){
				success = true;
				resolve(names[i]);
			}
		}
		if(!success){
			get_transactions(addr).then(function(tx_arr){
				var found_name = false;
				for(var j = 0; j < tx_arr.length; j++){
					var input = tx_arr[j];
					var time = input.time;
					for(var i = 0; i < input.vout.length; i++){
						if(!input.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')) continue;
						code = input.vout[i].scriptPubKey.asm.substring(10, 14);
						data = input.vout[i].scriptPubKey.asm.substring(14, input.length);
						data = hex2a(data);
						if(code == '5504'){
							found_name = true;
							set_name(addr, data.substr(0, 24), time);
							//name = data.substr(0, 24);
							get_name(addr).then(function(name){ // this should be re-done
								resolve(name);
							});
						}
					}
				}
				if(!found_name){
					// set_name(addr, addr.substr(0, 6), 0); // uncomment to reduce load on server
					resolve(name);
				}
			});
		}
	});
}

// Sets a users name and decides if the new name should be kept based on timestamp
/* TODO:
- Check for and remove duplicate entries to prevent arbitrary results when cache is queried
*/
var set_name = function(addr, name, time){
	var names = JSON.parse(localStorage.names);
	var doesExist = false;
	for(var i = 0; i < names.length; i++){
		if(names[i].address == addr){
			doesExist = true;
			if(names[i].time < time){ // the stored value is old
				delete names[i];
				var new_name = {address: addr, name: name, time: time, hash: get_name_hash(addr)};
				// change all posts with this sender to the new name
				var posts = JSON.parse(localStorage.posts);
				for(var i = 0; i < posts.length; i++){
					if(posts[i].sender == addr){
						posts[i].name = new_name;
					}
				}
				localStorage.posts = JSON.stringify(posts);
				names[i] = new_name;
			}else{
				if(debug){
					console.log('Not adding name because it already exists.');
				}
			}
		}
	}
	if(!doesExist){
		var new_name = {address: addr, name: name, time: time, hash: get_name_hash(addr)};
		// change all posts with this sender to the new name
		var posts = JSON.parse(localStorage.posts);
		for(var i = 0; i < posts.length; i++){
			if(posts[i].sender == addr){
				posts[i].name = new_name;
			}
		}
		localStorage.posts = JSON.stringify(posts);
		names.push(new_name);
	}
	localStorage.names = JSON.stringify(names);
}

// Returns a unique "identicon" based on the address given
var get_name_hash = function(addr){
	var addr_h = sha512(addr).substr(0, 32);
	var data = new Identicon(addr_h).toString();
	var img = '<img class="UINameIcon" src="data:image/png;base64,' + data + '" alt="Real Address: '+addr+'" poster="Real Address: '+addr+'" />';
	return img;
}


/***/ }),

/***/ "./src/client/js/NameManager.js":
/*!**************************************!*\
  !*** ./src/client/js/NameManager.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/client/js/Popup.js":
/*!********************************!*\
  !*** ./src/client/js/Popup.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Popup; });
/* harmony import */ var _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/jquery.js */ "./src/client/js/lib/jquery.js");
/* harmony import */ var _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utilities */ "./src/client/js/Utilities.js");
/**
 * Popup class
 * Author: The Unite.cash Developers
 * Licence: GNU AGPL v3
 *
 * This file provides a class for showing information in a popup dialog.
 *
 * @file Defines the Popup class
 */





class Popup {

  /**
	 * Constructs a Popup object.
	 *
	 * @constructor
	 */
  constructor (options) {
    if (typeof options === "undefined") {
      options = {}
    }
    if (typeof options.text === "undefined") {
      options.text = ''
    }
    if (typeof options.animationSpeed === "undefined") {
      options.animationSpeed = 100
    }
    if (typeof options.playSound === "undefined") {
      options.playSound = true
    }
    if (typeof options.showCloseButton === "undefined") {
      options.showCloseButton = false
    }
    if (typeof options.centered === "undefined") {
      options.centered = false
    }
    this.options = options
    this.divID = window.Utilities.getRandomChars(16)
    this.backgroundID = window.Utilities.getRandomChars(16)
    if(this.options.showCloseButton) {
      this.closeButtonID = window.Utilities.getRandomChars(16)
    }
    return this
  }

  show () {
    if(this.options.playSound){
      window.Utilities.pop()
    }

    var alertBackground = _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>')
    alertBackground.attr('style', 'z-index: ' + window.app.highestZIndexUsed)
    alertBackground.attr('class', 'UIDimmedBackground hidden')
    alertBackground.attr('id', this.backgroundID)
    _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', '#' + this.backgroundID, () => {
      this.hide()
    })

    var alertHTML = _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>')
    alertHTML.attr('style', 'z-index: ' + (window.app.highestZIndexUsed+1))
    alertHTML.attr('id', this.divID)
    if(this.options.isCentered){
      alertHTML.attr('class', 'UIAlertWindow center-text hidden')
    }else{
      alertHTML.attr('class', 'UIAlertWindow hidden')
    }

    if(this.options.titleText != undefined){
      var alertTitle = _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('<h1></h1>')
      alertTitle.text(this.options.titleText)
      alertHTML.append(alertTitle)
    }

    if(this.options.showCloseButton){
      var closeButton = _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('<button></button>')
      closeButton.attr('class', 'UICloseButton')
      closeButton.attr('id', this.closeButtonID)
      _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', '#' + this.closeButtonID, () => {
        this.hide()
      })
    }

    alertHTML.append(this.options.text)
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('body').append(alertBackground)
    _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('body').append(alertHTML)
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.backgroundID).fadeIn(this.options.animationSpeed)
		_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.divID).slideDown(this.options.animationSpeed)

		document.activeElement.blur()
		window.app.highestZIndexUsed += 2
  }

  // thanks to https://stackoverflow.com/a/7259663/5860286 for this
  hide () {
    if(this.options.playSound) {
      window.Utilities.woosh()
    }
    _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default.a.when(_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.divID).fadeOut(this.options.animationSpeed)).done(function() {
      _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.divID).remove()
    })
    _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default.a.when(_lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.backgroundID).fadeOut(this.options.animationSpeed)).done(function() {
      _lib_jquery_js__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.backgroundID).remove()
    })
  }

  setTitle (title) {
    this.options.titleText = title
    return this
  }

  addText (text) {
    this.options.text += text
    return this
  }

  setText (text) {
    this.options.text = text
    return this
  }

  setAnimationSpeed(speed){
    this.options.animationSpeed = speed
    return this
  }

  setOptions(options){
    this.options = options;
    return this
  }

}


/***/ }),

/***/ "./src/client/js/Post.js":
/*!*******************************!*\
  !*** ./src/client/js/Post.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Post
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for storing data related to the contents of posts
 *
 * @file Provides the Post class
 */

// Adds a post to localStorage cache if it is not there
var add_post_to_db = function(post){
	// get posts from localStorage
	var posts = JSON.parse(localStorage.posts);
	// iterate posts, looking for matching TXIDs
	for(var i = 0; i < posts.length; i++){
		if(posts[i].txid == post.txid){
			if(debug){
				console.log('Not adding post with redundant TXID to database');
			}
			return;
		}
	}
	// no match in DB, we are good to add it
	posts.push(post);
	localStorage.posts = JSON.stringify(posts);
}

// Renders a post to the #posts div
/* TODO:
- elementIndex: indicates where in the HTML the new post is rendered
- replyIndent [limited to 4?]: The level of indentation to apply to the post
*/
/* PARAMS
- pushToTop: boolean indicating if post should (true) or should not (false) be pushed to
  the top of the HTML instead of the bottom (default).
*/
var render_post = function(post, pushToTop = 0, tag = '#posts'){
	if(post.type != 5501 && post.type != 5502 && post.type != 5503 && post.type != 5505) return;
	var uid = post.txid.substr(0, 16);
	var postDiv = $('<div id="'+uid+'div" class="post"></div>');
	var nameText = $('<p id="'+uid+'name" class="name"></p>');
	nameText.text(post.name.name);
	var timeText = $('<p id="'+uid+'time" class="time"></p>');
	timeText.text(post.time);
	var nameHash = $(post.name.hash);
	var container = $('<div></div>');
	container.append(nameText);
	container.append(nameHash);
	container.append(timeText);
	var postText = $('<div id="'+uid+'content" class="postText"></div>');
	var actionBar = $('<div class="actionBar"></div>');
	actionBar.append($('<p id="'+uid+'reply" class="UITextButton">reply</p>'));
	actionBar.append($('<p id="'+uid+'viewreply" class="UITextButton">show replies</p>'));
	actionBar.append($('<p id="'+uid+'tip" class="UITextButton">tip</p>'));
	actionBar.append($('<p id="'+uid+'report" class="UITextButton">report</p>'));
	postText.text(post.displayContent);
	postDiv.append(postText);
	postDiv.prepend(container);
	postDiv.append(actionBar);
	if(pushToTop){
		$(tag).prepend(postDiv);
	}else{
		$(tag).append(postDiv);
	}
	var newString = '<div id="'+uid+'tipwindow" class="UIAlertWindow hidden">';
	newString += '<h1>SEND A TIP</h1>';
	newString += '<p>Show how much you appreciate ' + post.name.name + '\'s post by sending a tip!</p>';
	newString += '<form id="'+uid+'tipform">';
	newString += '<input type="text" id="'+uid+'tipamount" class="UITextField center w90"';
	newString += 'placeholder="Amount (satoshis)" /><br/>';
	newString += '<input type="submit" class="UIButton center w90" value="SEND" />';
	newString += '</form></div>';
	$('body').append($(newString));
	$('#'+uid+'name').on('click', function(){
		window.location.href = 'user.html?address='+post.sender;
	});
	$('#'+uid+'viewreply').on('click', function(){
		window.location.href = 'post.html?post='+post.txid;
	});
	$('#'+uid+'tip').on('click', function(){
		display_html_alert('#'+uid+'tipwindow');
	});
	$('#'+uid+'tipform').on('submit', function(ev){
		ev.preventDefault();
		var tipAmount = $('#'+uid+'tipamount').val();
		document.elementFromPoint(10, 10).click();
		if(post.sender == address.toString()){
			display_alert('<h1>NARCISSISM?</h1><p>You just tried to tip yourself. You failed. Miserably.</p>');
		}else{
			find_utxo(address.toString(), tipAmount).then(function(utxo){
				if(utxo == -1){
					var newString = '<h1>ACCOUNT BALANCE</h1>';
					newString += '<p>Check that you\'ve funded your account before posting!</p>';
					newString += '<p>We\'re working on a way to fund new users\' posts, it\'ll be ';
					newString += 'out soon!</p><p>In the meantime, here are some ways to fund your account: </p>';
					newString += '<ul><li>Ask a friend to send you some Bitcoin Cash to your Unite address</li>';
					newString += '<li>You can get some from the free.bitcoin.com faucet</li>';
					newString += '<li>You can trade any cryptocurrency for Bitcoin Cash on ShapeShift</li>';
					newString += '<li>You can be tipped on sites like yours.org or Reddit (r/btc)</li>';
					newString += '<li>You can buy some on sites like coinbase.com or kraken.com</li></ul>';
					display_alert(newString);
				}else{
					// create dummy tx to find approximate actual TX size with fee
					transaction = new bch.Transaction();
					transaction.from(utxo);
					transaction.to(address.toString(), utxo.satoshis - tipAmount - 300); // approximate
					transaction.to(post.sender, parseInt(tipAmount))
					transaction.addData(hex2a('5503') + hex2a(post.txid));
					transaction.sign(privateKey);
					var tx_size = parseInt(transaction.toString().length/feeThreshold); // fee threshold
					// recreate transaction with correct fee
					transaction = new bch.Transaction();
					transaction.from(utxo);
					transaction.to(address.toString(), utxo.satoshis - tipAmount - tx_size); // approximate
					transaction.to(post.sender, parseInt(tipAmount))
					transaction.addData(hex2a('5503') + hex2a(post.txid));
					transaction.sign(privateKey);
					console.log(transaction.toString());
					//broadcast_tx(transaction.toString());
					display_success('Your tip has been sent!');
					swooosh();
					$('#'+uid+'tipamount').val('');
				}
			});
		}
	});
}

// Given a TXID, returns a post object
var get_post = function(txid){
	return new Promise(function(resolve, reject){
		// check if we have the post already in cache
		var posts = JSON.parse(localStorage.posts);
		var success = false;
		for(var i = 0; i < posts.length; i++){
			if(posts[i].txid == txid){
				success = true;
				resolve(posts[i]);
				return;
			}
		}
		if(!success){
			get_tx(txid).then(function(transaction){
				parse_tx(transaction).then(function(post){
					resolve(post);
				});
			});
		}
	});
}

// Gets posts associated with an address
var get_posts = function(addr){
	get_transactions(addr).then(function(tx_arr){
		for(var i = 0; i < tx_arr.length; i++){ // for each transaction
			parse_tx(tx_arr[i]);
		}
	});
}


// Initial processing of posts. Assigns the name, finds number of replies, replyy depth etc.
var init_post = function(post){
	return new Promise(function(resolve, reject){
		get_name(post.sender).then(function(name){
			post.name = name;
			// notifications for live transactions
			if(post.isLive){
				parse_notification(post);
			}

			// we can also fetch image data, extended messages, parent transactions,
			// number of replies, tips etc in the same way based on tx type

			if(post.type == '5504'){ // set name of sender to their new name
				set_name(post.sender, post.data, post.time);
			}
			if(post.type == '5503'){
				post.displayContent = post.data.substr(46);
			}
			if(post.type == '5501'){
				post.displayContent = post.data;
			}
			if(post.type == '5502'){
				// for this type, the post.data is a magnet link.
				// post.displayContent will be the contents of the torrent. (get it from webtorrent/webseed)
			}

			// pass it to the page we are on, so that page can decide how to display it
			if(typeof handle_new_post != undefined){
				handle_new_post(post);
			}
			resolve(post);
		});
	});
}

// Returns an array of posts which are replies to the given post // incomplete and posibly permanently deprecated
var get_replies = function(post){
	return new Promise(function(resolve, reject){
		var post_arr = [];
		get_posts(post.sender).then(function(posts){
			for(var i = 0; i < posts.length; i++){
				if(posts[i].parent == post.sender){
					if(posts[i].type == 5503){
						console.log(posts[i].data.substr(0, 64));
						console.log(post.txid);
						if(posts[i].data.substr(0, 64) == post.txid){
							post_arr.push(posts[i]);
						}
					}
				}
			}
			resolve(post_arr);
		});
	});
}


/***/ }),

/***/ "./src/client/js/PostManager.js":
/*!**************************************!*\
  !*** ./src/client/js/PostManager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostManager; });
/**
 * PostManager
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for querying, caching, storing, and retrieving Post objects
 *
 * @file Defines the PostManager class
 */

 class PostManager {



 }


/***/ }),

/***/ "./src/client/js/Transaction.js":
/*!**************************************!*\
  !*** ./src/client/js/Transaction.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Transaction
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for storing transaction data
 *
 * @file Provides the Transaction class
 */




// takes a transaction as input and returns a post after adding the post to posts cache
/* PARAMS:
- isLive: a boolean indicating if the transaction came in over WebSocket (true),
  or not (false).
*/
var parse_tx = function(input, isLive){
	return new Promise(function(resolve, reject){

		var time = input.time;
		var tx_from_addr = input.vin[0].addr;
		var parent = 'none', code = 'none', data = 'none';
		for(var i = 0; i < input.vout.length; i++){ // for each output
			if(!input.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')){
				if(parseInt(input.vout[i].value * 100000000) <= dustLimitSize
						&& parseInt(input.vout[i].value * 100000000) != 0){ // this is the parent reference output
					parent = input.vout[i].scriptPubKey.addresses[0];
				}
			}else{ // OP_RETURN data parsing
				code = input.vout[i].scriptPubKey.asm.substring(10, 14);
				data = input.vout[i].scriptPubKey.asm.substring(14, input.length);
				data = hex2a(data);
			}
		}
		if(parent != 'none' && code != 'none' && data != 'none'){
			var post = {
				type: code,
				sender: tx_from_addr,
				parent: parent,
				txid: input.txid,
				time: time,
				data: data,
				isLive: isLive
			};
			init_post(post).then(function(updated_post){
				add_post_to_db(updated_post);
				resolve(updated_post);
			});
		}else{
			resolve(-1);
		}
	});
}


// Returns an array of Unite transactions by address, adding them to cache
/* TODO:
- A better way of handling multiple pages of transactions than just requesting
  the first 1000 from insight
*/
var get_transactions = function(addr){
	return new Promise(function(resolve, reject){
		var tx_arr = [];
		$.ajax({
			type: "GET",
			url: insightBaseURL + 'addr/' + addr + '?from=0&to=1000', // TODO a better solution than a hard limit
			success: function(data){
				for(var i = 0; i < data.transactions.length; i++){ // for each transaction
					get_tx(data.transactions[i]).then(function(tx){
						tx_arr.push(tx);
					});
				}
				resolve(tx_arr);
			}
		});
	});
}

// returns a UTXO suitable for spending given an address
// returns -1 if none are found (insufficient funds)
/* TODO:
- Return multiple small UTXOs if a large one is not found.
- Accept a bitcoincash.js transaction as a parameter, append the relevant UTXOs,
  then return the modified bitcoincash.js "bch.Transaction" object instead of
  just the UTXO.
- Rename the function from find_utxo(address string) to add_utxos(bch.Transaction)
*/
var find_utxo = function(address, amount = 1000){
	return new Promise(function(resolve, reject){
		$.ajax({
			type: "GET",
			url: insightBaseURL + 'addr/' + address.toString() + '/utxo',
			success: function(data){
				var utxo = -1;
				for(var i = 0; i < data.length; i++){
					if(data[i].satoshis > amount){ // TODO other checks, precision
						utxo = {
							txId: data[i].txid,
							outputIndex: data[i].vout,
							address: data[i].address,
							script: data[i].scriptPubKey,
							satoshis: data[i].satoshis
						};
						resolve(utxo);
						i = data.length + 1; // stop loop
					}
				}
				resolve(utxo);
			}
		});
	});
}

// Sends a raw hex bitcoin transaction over the live network
var broadcast_tx = function(tx){
	if(debug){
		console.log('pretend broadcasting transaction (debug):\n\n'+tx+'\n\n');
	}else{
		$.ajax({
			type: "POST",
			url: insightBaseURL + 'tx/send',
			data: {rawtx: tx},
			success: function(data){
				console.log('TX broadcast successful.\nTX:\n\n'+tx+'\n\ntxid:\n\n: ' + data.txid+'\n\n');
			},
			error: function(data){
				var newString = '<h1>BROADCAST FAILURE</h1>';
				newString += '<p>Looks like this action was rejected by tne network for some reason... ';
				newString += 'Please give this to a developer so they can have a look, or post it on Unite ';
				newString += 'or somewhere we\'ll see it.</p><p>This is vary important to us, because it ';
				newString += 'just ruined your experience:</p><div class="UIPanel" style="font-family:monospace;">';
				newString += tx+'</div>'
				display_alert(newString);
			}
		});
	}
}

// Adds transaction to localStorage transactions cache, if it is not already there
var add_tx_to_db = function(tx){
	// get the tx db
	var transactions = JSON.parse(localStorage.transactions);
	// check if it exists
	for(var i = 0; i < transactions.length; i++){
		if(transactions[i].txid == tx.txid){
			if(debug){
				console.log('Not adding transaction, it is a duplicate.');
			}
			return;
		}
	}
	transactions.push(tx);
	localStorage.transactions = JSON.stringify(transactions);
}

// Returns a transaction given a TXID. first searches the cache, then the network
var get_tx = function(txid){
	return new Promise(function(resolve, reject){
		// check if it exists in the DB already
		var transactions = JSON.parse(localStorage.transactions);
		var success = false;
		for(var i = 0; i < transactions.length; i++){
			if(transactions[i].txid == txid){
				success = true;
				resolve(transactions[i]);
				return;
			}
		}
		if(!success){ // now we look it up on the network and then add it to DB.
			$.ajax({
				type: "GET",
				url: insightBaseURL + 'tx/' + txid,
				success: function(transaction){
					if(is_univo_tx(transaction)){
						add_tx_to_db(transaction);
						resolve(transaction);
					}else{
						resolve(-1);
					}
					return;
				}
			});
		}
	});
}

// Determines if the given transaction is a Unite transaction
var is_univo_tx = function(transaction){
	var parent = 'none', code = 'none';
	for(var i = 0; i < transaction.vout.length; i++){ // for each output
		if(!transaction.vout[i].scriptPubKey.asm.startsWith('OP_RETURN')){
			if(parseInt(transaction.vout[i].value * 100000000) <= dustLimitSize
					&& parseInt(transaction.vout[i].value * 100000000) != 0){ // this is the parent reference output
				parent = transaction.vout[i].scriptPubKey.addresses[0];
			}
		}else{ // OP_RETURN data parsing
			code = transaction.vout[i].scriptPubKey.asm.substring(10, 14);
		}
	}
	if(code.startsWith('55') && parent != 'none'){
		return true;
	}else{
		return false;
	}
}


/***/ }),

/***/ "./src/client/js/TransactionManager.js":
/*!*********************************************!*\
  !*** ./src/client/js/TransactionManager.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransactionManager; });
/**
 * TransactionManager
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * A class for managing, parsing, broadcasting and storing Transaction objects
 *
 * @file Defines the TransactionManager class
 */

 class TransactionManager {

   

 }


/***/ }),

/***/ "./src/client/js/Utilities.js":
/*!************************************!*\
  !*** ./src/client/js/Utilities.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Utilities; });
/**
 * Useful utility functions
 * Author: The Unite.cash Developers
 * License: GNU AGPL v3
 *
 * This script provides some useful general utility functions.
 *
 * @file Provides the Utilities class.
 */

class Utilities {

  static pop(){
		new Audio('./audio/pop.wav').play();
	}

	static boink(){
		new Audio('./audio/boink.wav').play();
	}

	static beep(){
		new Audio('./audio/beep.wav').play();
	}

	static woosh(){
		new Audio('./audio/woosh.wav').play();
	}

	static swooosh(){
		new Audio('./audio/swooosh.wav').play();
	}

  // thanks to https://stackoverflow.com/a/3745677/5860286 for this
  static hex2a(hexx) {
		hex = hexx.toString();
		str = '';
		for(i = 0; i < hex.length; i += 2) {
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		}
		return str;
	}

  // thanks to https://stackoverflow.com/a/1349426/5860286 for this
  static getRandomChars(length) {
    var text = "";
    var l = length || 16;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < l; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // thanks to https://stackoverflow.com/a/3277417/5860286 for this
  static goBack(){
     document.elementFromPoint(10, 10).click(); // TODO his is hacky and should be re-done
  }


}


/***/ }),

/***/ "./src/client/js/lib/bchaddr.js":
/*!**************************************!*\
  !*** ./src/client/js/lib/bchaddr.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {var require;var require;/**
 * @license
 * https://github.com/bitcoincashjs/bchaddr
 * Copyright (c) 2018 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */
!function(f){if(true)module.exports=f();else {}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n||e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){var Buffer=require("safe-buffer").Buffer;module.exports=function(ALPHABET){for(var ALPHABET_MAP={},BASE=ALPHABET.length,LEADER=ALPHABET.charAt(0),z=0;z<ALPHABET.length;z++){var x=ALPHABET.charAt(z);if(void 0!==ALPHABET_MAP[x])throw new TypeError(x+" is ambiguous");ALPHABET_MAP[x]=z}function decodeUnsafe(string){if("string"!=typeof string)throw new TypeError("Expected String");if(0===string.length)return Buffer.allocUnsafe(0);for(var bytes=[0],i=0;i<string.length;i++){var value=ALPHABET_MAP[string[i]];if(void 0===value)return;for(var j=0,carry=value;j<bytes.length;++j)carry+=bytes[j]*BASE,bytes[j]=255&carry,carry>>=8;for(;carry>0;)bytes.push(255&carry),carry>>=8}for(var k=0;string[k]===LEADER&&k<string.length-1;++k)bytes.push(0);return Buffer.from(bytes.reverse())}return{encode:function(source){if(0===source.length)return"";for(var digits=[0],i=0;i<source.length;++i){for(var j=0,carry=source[i];j<digits.length;++j)carry+=digits[j]<<8,digits[j]=carry%BASE,carry=carry/BASE|0;for(;carry>0;)digits.push(carry%BASE),carry=carry/BASE|0}for(var string="",k=0;0===source[k]&&k<source.length-1;++k)string+=LEADER;for(var q=digits.length-1;q>=0;--q)string+=ALPHABET[digits[q]];return string},decodeUnsafe:decodeUnsafe,decode:function(string){var buffer=decodeUnsafe(string);if(buffer)return buffer;throw new Error("Non-base"+BASE+" character")}}}},{"safe-buffer":40}],2:[function(require,module,exports){"use strict";exports.byteLength=function(b64){return 3*b64.length/4-placeHoldersCount(b64)},exports.toByteArray=function(b64){var i,l,tmp,placeHolders,arr,len=b64.length;placeHolders=placeHoldersCount(b64),arr=new Arr(3*len/4-placeHolders),l=placeHolders>0?len-4:len;var L=0;for(i=0;i<l;i+=4)tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)],arr[L++]=tmp>>16&255,arr[L++]=tmp>>8&255,arr[L++]=255&tmp;2===placeHolders?(tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4,arr[L++]=255&tmp):1===placeHolders&&(tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2,arr[L++]=tmp>>8&255,arr[L++]=255&tmp);return arr},exports.fromByteArray=function(uint8){for(var tmp,len=uint8.length,extraBytes=len%3,output="",parts=[],i=0,len2=len-extraBytes;i<len2;i+=16383)parts.push(encodeChunk(uint8,i,i+16383>len2?len2:i+16383));1===extraBytes?(tmp=uint8[len-1],output+=lookup[tmp>>2],output+=lookup[tmp<<4&63],output+="=="):2===extraBytes&&(tmp=(uint8[len-2]<<8)+uint8[len-1],output+=lookup[tmp>>10],output+=lookup[tmp>>4&63],output+=lookup[tmp<<2&63],output+="=");return parts.push(output),parts.join("")};for(var lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;function placeHoldersCount(b64){var len=b64.length;if(len%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===b64[len-2]?2:"="===b64[len-1]?1:0}function encodeChunk(uint8,start,end){for(var tmp,num,output=[],i=start;i<end;i+=3)tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2],output.push(lookup[(num=tmp)>>18&63]+lookup[num>>12&63]+lookup[num>>6&63]+lookup[63&num]);return output.join("")}revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63},{}],3:[function(require,module,exports){var bigInt=function(undefined){"use strict";var BASE=1e7,LOG_BASE=7,MAX_INT=9007199254740992,MAX_INT_ARR=smallToArray(MAX_INT),LOG_MAX_INT=Math.log(MAX_INT);function Integer(v,radix){return void 0===v?Integer[0]:void 0!==radix?10==+radix?parseValue(v):parseBase(v,radix):parseValue(v)}function BigInteger(value,sign){this.value=value,this.sign=sign,this.isSmall=!1}function SmallInteger(value){this.value=value,this.sign=value<0,this.isSmall=!0}function isPrecise(n){return-MAX_INT<n&&n<MAX_INT}function smallToArray(n){return n<1e7?[n]:n<1e14?[n%1e7,Math.floor(n/1e7)]:[n%1e7,Math.floor(n/1e7)%1e7,Math.floor(n/1e14)]}function arrayToSmall(arr){trim(arr);var length=arr.length;if(length<4&&compareAbs(arr,MAX_INT_ARR)<0)switch(length){case 0:return 0;case 1:return arr[0];case 2:return arr[0]+arr[1]*BASE;default:return arr[0]+(arr[1]+arr[2]*BASE)*BASE}return arr}function trim(v){for(var i=v.length;0===v[--i];);v.length=i+1}function createArray(length){for(var x=new Array(length),i=-1;++i<length;)x[i]=0;return x}function truncate(n){return n>0?Math.floor(n):Math.ceil(n)}function add(a,b){var sum,i,l_a=a.length,l_b=b.length,r=new Array(l_a),carry=0,base=BASE;for(i=0;i<l_b;i++)carry=(sum=a[i]+b[i]+carry)>=base?1:0,r[i]=sum-carry*base;for(;i<l_a;)carry=(sum=a[i]+carry)===base?1:0,r[i++]=sum-carry*base;return carry>0&&r.push(carry),r}function addAny(a,b){return a.length>=b.length?add(a,b):add(b,a)}function addSmall(a,carry){var sum,i,l=a.length,r=new Array(l),base=BASE;for(i=0;i<l;i++)sum=a[i]-base+carry,carry=Math.floor(sum/base),r[i]=sum-carry*base,carry+=1;for(;carry>0;)r[i++]=carry%base,carry=Math.floor(carry/base);return r}function subtract(a,b){var i,difference,a_l=a.length,b_l=b.length,r=new Array(a_l),borrow=0,base=BASE;for(i=0;i<b_l;i++)(difference=a[i]-borrow-b[i])<0?(difference+=base,borrow=1):borrow=0,r[i]=difference;for(i=b_l;i<a_l;i++){if(!((difference=a[i]-borrow)<0)){r[i++]=difference;break}difference+=base,r[i]=difference}for(;i<a_l;i++)r[i]=a[i];return trim(r),r}function subtractSmall(a,b,sign){var i,difference,l=a.length,r=new Array(l),carry=-b,base=BASE;for(i=0;i<l;i++)difference=a[i]+carry,carry=Math.floor(difference/base),difference%=base,r[i]=difference<0?difference+base:difference;return"number"==typeof(r=arrayToSmall(r))?(sign&&(r=-r),new SmallInteger(r)):new BigInteger(r,sign)}function multiplyLong(a,b){var product,carry,i,a_i,a_l=a.length,b_l=b.length,r=createArray(a_l+b_l),base=BASE;for(i=0;i<a_l;++i){a_i=a[i];for(var j=0;j<b_l;++j)product=a_i*b[j]+r[i+j],carry=Math.floor(product/base),r[i+j]=product-carry*base,r[i+j+1]+=carry}return trim(r),r}function multiplySmall(a,b){var product,i,l=a.length,r=new Array(l),base=BASE,carry=0;for(i=0;i<l;i++)product=a[i]*b+carry,carry=Math.floor(product/base),r[i]=product-carry*base;for(;carry>0;)r[i++]=carry%base,carry=Math.floor(carry/base);return r}function shiftLeft(x,n){for(var r=[];n-- >0;)r.push(0);return r.concat(x)}function multiplySmallAndArray(a,b,sign){return new BigInteger(a<BASE?multiplySmall(b,a):multiplyLong(b,smallToArray(a)),sign)}function square(a){var product,carry,i,a_i,l=a.length,r=createArray(l+l),base=BASE;for(i=0;i<l;i++){a_i=a[i];for(var j=0;j<l;j++)product=a_i*a[j]+r[i+j],carry=Math.floor(product/base),r[i+j]=product-carry*base,r[i+j+1]+=carry}return trim(r),r}function divModSmall(value,lambda){var i,q,remainder,divisor,length=value.length,quotient=createArray(length),base=BASE;for(remainder=0,i=length-1;i>=0;--i)remainder=(divisor=remainder*base+value[i])-(q=truncate(divisor/lambda))*lambda,quotient[i]=0|q;return[quotient,0|remainder]}function divModAny(self,v){var value,quotient,n=parseValue(v),a=self.value,b=n.value;if(0===b)throw new Error("Cannot divide by zero");if(self.isSmall)return n.isSmall?[new SmallInteger(truncate(a/b)),new SmallInteger(a%b)]:[Integer[0],self];if(n.isSmall){if(1===b)return[self,Integer[0]];if(-1==b)return[self.negate(),Integer[0]];var abs=Math.abs(b);if(abs<BASE){quotient=arrayToSmall((value=divModSmall(a,abs))[0]);var remainder=value[1];return self.sign&&(remainder=-remainder),"number"==typeof quotient?(self.sign!==n.sign&&(quotient=-quotient),[new SmallInteger(quotient),new SmallInteger(remainder)]):[new BigInteger(quotient,self.sign!==n.sign),new SmallInteger(remainder)]}b=smallToArray(abs)}var comparison=compareAbs(a,b);if(-1===comparison)return[Integer[0],self];if(0===comparison)return[Integer[self.sign===n.sign?1:-1],Integer[0]];quotient=(value=a.length+b.length<=200?function(a,b){var quotientDigit,shift,carry,borrow,i,l,q,a_l=a.length,b_l=b.length,base=BASE,result=createArray(b.length),divisorMostSignificantDigit=b[b_l-1],lambda=Math.ceil(base/(2*divisorMostSignificantDigit)),remainder=multiplySmall(a,lambda),divisor=multiplySmall(b,lambda);for(remainder.length<=a_l&&remainder.push(0),divisor.push(0),divisorMostSignificantDigit=divisor[b_l-1],shift=a_l-b_l;shift>=0;shift--){for(quotientDigit=base-1,remainder[shift+b_l]!==divisorMostSignificantDigit&&(quotientDigit=Math.floor((remainder[shift+b_l]*base+remainder[shift+b_l-1])/divisorMostSignificantDigit)),carry=0,borrow=0,l=divisor.length,i=0;i<l;i++)carry+=quotientDigit*divisor[i],q=Math.floor(carry/base),borrow+=remainder[shift+i]-(carry-q*base),carry=q,borrow<0?(remainder[shift+i]=borrow+base,borrow=-1):(remainder[shift+i]=borrow,borrow=0);for(;0!==borrow;){for(quotientDigit-=1,carry=0,i=0;i<l;i++)(carry+=remainder[shift+i]-base+divisor[i])<0?(remainder[shift+i]=carry+base,carry=0):(remainder[shift+i]=carry,carry=1);borrow+=carry}result[shift]=quotientDigit}return remainder=divModSmall(remainder,lambda)[0],[arrayToSmall(result),arrayToSmall(remainder)]}(a,b):function(a,b){for(var guess,xlen,highx,highy,check,a_l=a.length,b_l=b.length,result=[],part=[],base=BASE;a_l;)if(part.unshift(a[--a_l]),trim(part),compareAbs(part,b)<0)result.push(0);else{highx=part[(xlen=part.length)-1]*base+part[xlen-2],highy=b[b_l-1]*base+b[b_l-2],xlen>b_l&&(highx=(highx+1)*base),guess=Math.ceil(highx/highy);do{if(compareAbs(check=multiplySmall(b,guess),part)<=0)break;guess--}while(guess);result.push(guess),part=subtract(part,check)}return result.reverse(),[arrayToSmall(result),arrayToSmall(part)]}(a,b))[0];var qSign=self.sign!==n.sign,mod=value[1],mSign=self.sign;return"number"==typeof quotient?(qSign&&(quotient=-quotient),quotient=new SmallInteger(quotient)):quotient=new BigInteger(quotient,qSign),"number"==typeof mod?(mSign&&(mod=-mod),mod=new SmallInteger(mod)):mod=new BigInteger(mod,mSign),[quotient,mod]}function compareAbs(a,b){if(a.length!==b.length)return a.length>b.length?1:-1;for(var i=a.length-1;i>=0;i--)if(a[i]!==b[i])return a[i]>b[i]?1:-1;return 0}function isBasicPrime(v){var n=v.abs();return!n.isUnit()&&(!!(n.equals(2)||n.equals(3)||n.equals(5))||!(n.isEven()||n.isDivisibleBy(3)||n.isDivisibleBy(5))&&(!!n.lesser(25)||void 0))}BigInteger.prototype=Object.create(Integer.prototype),SmallInteger.prototype=Object.create(Integer.prototype),BigInteger.prototype.add=function(v){var n=parseValue(v);if(this.sign!==n.sign)return this.subtract(n.negate());var a=this.value,b=n.value;return n.isSmall?new BigInteger(addSmall(a,Math.abs(b)),this.sign):new BigInteger(addAny(a,b),this.sign)},BigInteger.prototype.plus=BigInteger.prototype.add,SmallInteger.prototype.add=function(v){var n=parseValue(v),a=this.value;if(a<0!==n.sign)return this.subtract(n.negate());var b=n.value;if(n.isSmall){if(isPrecise(a+b))return new SmallInteger(a+b);b=smallToArray(Math.abs(b))}return new BigInteger(addSmall(b,Math.abs(a)),a<0)},SmallInteger.prototype.plus=SmallInteger.prototype.add,BigInteger.prototype.subtract=function(v){var n=parseValue(v);if(this.sign!==n.sign)return this.add(n.negate());var a=this.value,b=n.value;return n.isSmall?subtractSmall(a,Math.abs(b),this.sign):function(a,b,sign){var value;return compareAbs(a,b)>=0?value=subtract(a,b):(value=subtract(b,a),sign=!sign),"number"==typeof(value=arrayToSmall(value))?(sign&&(value=-value),new SmallInteger(value)):new BigInteger(value,sign)}(a,b,this.sign)},BigInteger.prototype.minus=BigInteger.prototype.subtract,SmallInteger.prototype.subtract=function(v){var n=parseValue(v),a=this.value;if(a<0!==n.sign)return this.add(n.negate());var b=n.value;return n.isSmall?new SmallInteger(a-b):subtractSmall(b,Math.abs(a),a>=0)},SmallInteger.prototype.minus=SmallInteger.prototype.subtract,BigInteger.prototype.negate=function(){return new BigInteger(this.value,!this.sign)},SmallInteger.prototype.negate=function(){var sign=this.sign,small=new SmallInteger(-this.value);return small.sign=!sign,small},BigInteger.prototype.abs=function(){return new BigInteger(this.value,!1)},SmallInteger.prototype.abs=function(){return new SmallInteger(Math.abs(this.value))},BigInteger.prototype.multiply=function(v){var abs,l1,l2,n=parseValue(v),a=this.value,b=n.value,sign=this.sign!==n.sign;if(n.isSmall){if(0===b)return Integer[0];if(1===b)return this;if(-1===b)return this.negate();if((abs=Math.abs(b))<BASE)return new BigInteger(multiplySmall(a,abs),sign);b=smallToArray(abs)}return l1=a.length,l2=b.length,new BigInteger(-.012*l1-.012*l2+15e-6*l1*l2>0?function multiplyKaratsuba(x,y){var n=Math.max(x.length,y.length);if(n<=30)return multiplyLong(x,y);n=Math.ceil(n/2);var b=x.slice(n),a=x.slice(0,n),d=y.slice(n),c=y.slice(0,n),ac=multiplyKaratsuba(a,c),bd=multiplyKaratsuba(b,d),product=addAny(addAny(ac,shiftLeft(subtract(subtract(multiplyKaratsuba(addAny(a,b),addAny(c,d)),ac),bd),n)),shiftLeft(bd,2*n));return trim(product),product}(a,b):multiplyLong(a,b),sign)},BigInteger.prototype.times=BigInteger.prototype.multiply,SmallInteger.prototype._multiplyBySmall=function(a){return isPrecise(a.value*this.value)?new SmallInteger(a.value*this.value):multiplySmallAndArray(Math.abs(a.value),smallToArray(Math.abs(this.value)),this.sign!==a.sign)},BigInteger.prototype._multiplyBySmall=function(a){return 0===a.value?Integer[0]:1===a.value?this:-1===a.value?this.negate():multiplySmallAndArray(Math.abs(a.value),this.value,this.sign!==a.sign)},SmallInteger.prototype.multiply=function(v){return parseValue(v)._multiplyBySmall(this)},SmallInteger.prototype.times=SmallInteger.prototype.multiply,BigInteger.prototype.square=function(){return new BigInteger(square(this.value),!1)},SmallInteger.prototype.square=function(){var value=this.value*this.value;return isPrecise(value)?new SmallInteger(value):new BigInteger(square(smallToArray(Math.abs(this.value))),!1)},BigInteger.prototype.divmod=function(v){var result=divModAny(this,v);return{quotient:result[0],remainder:result[1]}},SmallInteger.prototype.divmod=BigInteger.prototype.divmod,BigInteger.prototype.divide=function(v){return divModAny(this,v)[0]},SmallInteger.prototype.over=SmallInteger.prototype.divide=BigInteger.prototype.over=BigInteger.prototype.divide,BigInteger.prototype.mod=function(v){return divModAny(this,v)[1]},SmallInteger.prototype.remainder=SmallInteger.prototype.mod=BigInteger.prototype.remainder=BigInteger.prototype.mod,BigInteger.prototype.pow=function(v){var value,x,y,n=parseValue(v),a=this.value,b=n.value;if(0===b)return Integer[1];if(0===a)return Integer[0];if(1===a)return Integer[1];if(-1===a)return n.isEven()?Integer[1]:Integer[-1];if(n.sign)return Integer[0];if(!n.isSmall)throw new Error("The exponent "+n.toString()+" is too large.");if(this.isSmall&&isPrecise(value=Math.pow(a,b)))return new SmallInteger(truncate(value));for(x=this,y=Integer[1];!0&b&&(y=y.times(x),--b),0!==b;)b/=2,x=x.square();return y},SmallInteger.prototype.pow=BigInteger.prototype.pow,BigInteger.prototype.modPow=function(exp,mod){if(exp=parseValue(exp),(mod=parseValue(mod)).isZero())throw new Error("Cannot take modPow with modulus 0");for(var r=Integer[1],base=this.mod(mod);exp.isPositive();){if(base.isZero())return Integer[0];exp.isOdd()&&(r=r.multiply(base).mod(mod)),exp=exp.divide(2),base=base.square().mod(mod)}return r},SmallInteger.prototype.modPow=BigInteger.prototype.modPow,BigInteger.prototype.compareAbs=function(v){var n=parseValue(v),a=this.value,b=n.value;return n.isSmall?1:compareAbs(a,b)},SmallInteger.prototype.compareAbs=function(v){var n=parseValue(v),a=Math.abs(this.value),b=n.value;return n.isSmall?a===(b=Math.abs(b))?0:a>b?1:-1:-1},BigInteger.prototype.compare=function(v){if(v===1/0)return-1;if(v===-1/0)return 1;var n=parseValue(v),a=this.value,b=n.value;return this.sign!==n.sign?n.sign?1:-1:n.isSmall?this.sign?-1:1:compareAbs(a,b)*(this.sign?-1:1)},BigInteger.prototype.compareTo=BigInteger.prototype.compare,SmallInteger.prototype.compare=function(v){if(v===1/0)return-1;if(v===-1/0)return 1;var n=parseValue(v),a=this.value,b=n.value;return n.isSmall?a==b?0:a>b?1:-1:a<0!==n.sign?a<0?-1:1:a<0?1:-1},SmallInteger.prototype.compareTo=SmallInteger.prototype.compare,BigInteger.prototype.equals=function(v){return 0===this.compare(v)},SmallInteger.prototype.eq=SmallInteger.prototype.equals=BigInteger.prototype.eq=BigInteger.prototype.equals,BigInteger.prototype.notEquals=function(v){return 0!==this.compare(v)},SmallInteger.prototype.neq=SmallInteger.prototype.notEquals=BigInteger.prototype.neq=BigInteger.prototype.notEquals,BigInteger.prototype.greater=function(v){return this.compare(v)>0},SmallInteger.prototype.gt=SmallInteger.prototype.greater=BigInteger.prototype.gt=BigInteger.prototype.greater,BigInteger.prototype.lesser=function(v){return this.compare(v)<0},SmallInteger.prototype.lt=SmallInteger.prototype.lesser=BigInteger.prototype.lt=BigInteger.prototype.lesser,BigInteger.prototype.greaterOrEquals=function(v){return this.compare(v)>=0},SmallInteger.prototype.geq=SmallInteger.prototype.greaterOrEquals=BigInteger.prototype.geq=BigInteger.prototype.greaterOrEquals,BigInteger.prototype.lesserOrEquals=function(v){return this.compare(v)<=0},SmallInteger.prototype.leq=SmallInteger.prototype.lesserOrEquals=BigInteger.prototype.leq=BigInteger.prototype.lesserOrEquals,BigInteger.prototype.isEven=function(){return 0==(1&this.value[0])},SmallInteger.prototype.isEven=function(){return 0==(1&this.value)},BigInteger.prototype.isOdd=function(){return 1==(1&this.value[0])},SmallInteger.prototype.isOdd=function(){return 1==(1&this.value)},BigInteger.prototype.isPositive=function(){return!this.sign},SmallInteger.prototype.isPositive=function(){return this.value>0},BigInteger.prototype.isNegative=function(){return this.sign},SmallInteger.prototype.isNegative=function(){return this.value<0},BigInteger.prototype.isUnit=function(){return!1},SmallInteger.prototype.isUnit=function(){return 1===Math.abs(this.value)},BigInteger.prototype.isZero=function(){return!1},SmallInteger.prototype.isZero=function(){return 0===this.value},BigInteger.prototype.isDivisibleBy=function(v){var n=parseValue(v),value=n.value;return 0!==value&&(1===value||(2===value?this.isEven():this.mod(n).equals(Integer[0])))},SmallInteger.prototype.isDivisibleBy=BigInteger.prototype.isDivisibleBy,BigInteger.prototype.isPrime=function(){var isPrime=isBasicPrime(this);if(void 0!==isPrime)return isPrime;for(var d,t,i,x,n=this.abs(),nPrev=n.prev(),a=[2,3,5,7,11,13,17,19],b=nPrev;b.isEven();)b=b.divide(2);for(i=0;i<a.length;i++)if(!(x=bigInt(a[i]).modPow(b,n)).equals(Integer[1])&&!x.equals(nPrev)){for(t=!0,d=b;t&&d.lesser(nPrev);d=d.multiply(2))(x=x.square().mod(n)).equals(nPrev)&&(t=!1);if(t)return!1}return!0},SmallInteger.prototype.isPrime=BigInteger.prototype.isPrime,BigInteger.prototype.isProbablePrime=function(iterations){var isPrime=isBasicPrime(this);if(void 0!==isPrime)return isPrime;for(var n=this.abs(),t=void 0===iterations?5:iterations,i=0;i<t;i++){if(!bigInt.randBetween(2,n.minus(2)).modPow(n.prev(),n).isUnit())return!1}return!0},SmallInteger.prototype.isProbablePrime=BigInteger.prototype.isProbablePrime,BigInteger.prototype.modInv=function(n){for(var q,lastT,lastR,t=bigInt.zero,newT=bigInt.one,r=parseValue(n),newR=this.abs();!newR.equals(bigInt.zero);)q=r.divide(newR),lastT=t,lastR=r,t=newT,r=newR,newT=lastT.subtract(q.multiply(newT)),newR=lastR.subtract(q.multiply(newR));if(!r.equals(1))throw new Error(this.toString()+" and "+n.toString()+" are not co-prime");return-1===t.compare(0)&&(t=t.add(n)),this.isNegative()?t.negate():t},SmallInteger.prototype.modInv=BigInteger.prototype.modInv,BigInteger.prototype.next=function(){var value=this.value;return this.sign?subtractSmall(value,1,this.sign):new BigInteger(addSmall(value,1),this.sign)},SmallInteger.prototype.next=function(){var value=this.value;return value+1<MAX_INT?new SmallInteger(value+1):new BigInteger(MAX_INT_ARR,!1)},BigInteger.prototype.prev=function(){var value=this.value;return this.sign?new BigInteger(addSmall(value,1),!0):subtractSmall(value,1,this.sign)},SmallInteger.prototype.prev=function(){var value=this.value;return value-1>-MAX_INT?new SmallInteger(value-1):new BigInteger(MAX_INT_ARR,!0)};for(var powersOfTwo=[1];2*powersOfTwo[powersOfTwo.length-1]<=BASE;)powersOfTwo.push(2*powersOfTwo[powersOfTwo.length-1]);var powers2Length=powersOfTwo.length,highestPower2=powersOfTwo[powers2Length-1];function shift_isSmall(n){return("number"==typeof n||"string"==typeof n)&&+Math.abs(n)<=BASE||n instanceof BigInteger&&n.value.length<=1}function bitwise(x,y,fn){y=parseValue(y);for(var xSign=x.isNegative(),ySign=y.isNegative(),xRem=xSign?x.not():x,yRem=ySign?y.not():y,xDigit=0,yDigit=0,xDivMod=null,yDivMod=null,result=[];!xRem.isZero()||!yRem.isZero();)xDigit=(xDivMod=divModAny(xRem,highestPower2))[1].toJSNumber(),xSign&&(xDigit=highestPower2-1-xDigit),yDigit=(yDivMod=divModAny(yRem,highestPower2))[1].toJSNumber(),ySign&&(yDigit=highestPower2-1-yDigit),xRem=xDivMod[0],yRem=yDivMod[0],result.push(fn(xDigit,yDigit));for(var sum=0!==fn(xSign?1:0,ySign?1:0)?bigInt(-1):bigInt(0),i=result.length-1;i>=0;i-=1)sum=sum.multiply(highestPower2).add(bigInt(result[i]));return sum}BigInteger.prototype.shiftLeft=function(n){if(!shift_isSmall(n))throw new Error(String(n)+" is too large for shifting.");if((n=+n)<0)return this.shiftRight(-n);for(var result=this;n>=powers2Length;)result=result.multiply(highestPower2),n-=powers2Length-1;return result.multiply(powersOfTwo[n])},SmallInteger.prototype.shiftLeft=BigInteger.prototype.shiftLeft,BigInteger.prototype.shiftRight=function(n){var remQuo;if(!shift_isSmall(n))throw new Error(String(n)+" is too large for shifting.");if((n=+n)<0)return this.shiftLeft(-n);for(var result=this;n>=powers2Length;){if(result.isZero())return result;result=(remQuo=divModAny(result,highestPower2))[1].isNegative()?remQuo[0].prev():remQuo[0],n-=powers2Length-1}return(remQuo=divModAny(result,powersOfTwo[n]))[1].isNegative()?remQuo[0].prev():remQuo[0]},SmallInteger.prototype.shiftRight=BigInteger.prototype.shiftRight,BigInteger.prototype.not=function(){return this.negate().prev()},SmallInteger.prototype.not=BigInteger.prototype.not,BigInteger.prototype.and=function(n){return bitwise(this,n,function(a,b){return a&b})},SmallInteger.prototype.and=BigInteger.prototype.and,BigInteger.prototype.or=function(n){return bitwise(this,n,function(a,b){return a|b})},SmallInteger.prototype.or=BigInteger.prototype.or,BigInteger.prototype.xor=function(n){return bitwise(this,n,function(a,b){return a^b})},SmallInteger.prototype.xor=BigInteger.prototype.xor;var LOBMASK_I=1<<30,LOBMASK_BI=(BASE&-BASE)*(BASE&-BASE)|LOBMASK_I;function roughLOB(n){var v=n.value,x="number"==typeof v?v|LOBMASK_I:v[0]+v[1]*BASE|LOBMASK_BI;return x&-x}function max(a,b){return a=parseValue(a),b=parseValue(b),a.greater(b)?a:b}function min(a,b){return a=parseValue(a),b=parseValue(b),a.lesser(b)?a:b}function gcd(a,b){if(a=parseValue(a).abs(),b=parseValue(b).abs(),a.equals(b))return a;if(a.isZero())return b;if(b.isZero())return a;for(var d,t,c=Integer[1];a.isEven()&&b.isEven();)d=Math.min(roughLOB(a),roughLOB(b)),a=a.divide(d),b=b.divide(d),c=c.multiply(d);for(;a.isEven();)a=a.divide(roughLOB(a));do{for(;b.isEven();)b=b.divide(roughLOB(b));a.greater(b)&&(t=b,b=a,a=t),b=b.subtract(a)}while(!b.isZero());return c.isUnit()?a:a.multiply(c)}var parseBase=function(text,base){for(var length=text.length,absBase=Math.abs(base),i=0;i<length;i++){if("-"!==(c=text[i].toLowerCase())&&/[a-z0-9]/.test(c)){if(/[0-9]/.test(c)&&+c>=absBase){if("1"===c&&1===absBase)continue;throw new Error(c+" is not a valid digit in base "+base+".")}if(c.charCodeAt(0)-87>=absBase)throw new Error(c+" is not a valid digit in base "+base+".")}}if(2<=base&&base<=36&&length<=LOG_MAX_INT/Math.log(base)){var result=parseInt(text,base);if(isNaN(result))throw new Error(c+" is not a valid digit in base "+base+".");return new SmallInteger(parseInt(text,base))}base=parseValue(base);var digits=[],isNegative="-"===text[0];for(i=isNegative?1:0;i<text.length;i++){var c,charCode=(c=text[i].toLowerCase()).charCodeAt(0);if(48<=charCode&&charCode<=57)digits.push(parseValue(c));else if(97<=charCode&&charCode<=122)digits.push(parseValue(c.charCodeAt(0)-87));else{if("<"!==c)throw new Error(c+" is not a valid character");var start=i;do{i++}while(">"!==text[i]);digits.push(parseValue(text.slice(start+1,i)))}}return parseBaseFromArray(digits,base,isNegative)};function parseBaseFromArray(digits,base,isNegative){var i,val=Integer[0],pow=Integer[1];for(i=digits.length-1;i>=0;i--)val=val.add(digits[i].times(pow)),pow=pow.times(base);return isNegative?val.negate():val}function stringify(digit){var v=digit.value;return"number"==typeof v&&(v=[v]),1===v.length&&v[0]<=35?"0123456789abcdefghijklmnopqrstuvwxyz".charAt(v[0]):"<"+v+">"}function toBase(n,base){if((base=bigInt(base)).isZero()){if(n.isZero())return"0";throw new Error("Cannot convert nonzero numbers to base 0.")}if(base.equals(-1))return n.isZero()?"0":n.isNegative()?new Array(1-n).join("10"):"1"+new Array(+n).join("01");var minusSign="";if(n.isNegative()&&base.isPositive()&&(minusSign="-",n=n.abs()),base.equals(1))return n.isZero()?"0":minusSign+new Array(+n+1).join(1);for(var divmod,out=[],left=n;left.isNegative()||left.compareAbs(base)>=0;){left=(divmod=left.divmod(base)).quotient;var digit=divmod.remainder;digit.isNegative()&&(digit=base.minus(digit).abs(),left=left.next()),out.push(stringify(digit))}return out.push(stringify(left)),minusSign+out.reverse().join("")}function parseStringValue(v){if(isPrecise(+v)){var x=+v;if(x===truncate(x))return new SmallInteger(x);throw"Invalid integer: "+v}var sign="-"===v[0];sign&&(v=v.slice(1));var split=v.split(/e/i);if(split.length>2)throw new Error("Invalid integer: "+split.join("e"));if(2===split.length){var exp=split[1];if("+"===exp[0]&&(exp=exp.slice(1)),(exp=+exp)!==truncate(exp)||!isPrecise(exp))throw new Error("Invalid integer: "+exp+" is not a valid exponent.");var text=split[0],decimalPlace=text.indexOf(".");if(decimalPlace>=0&&(exp-=text.length-decimalPlace-1,text=text.slice(0,decimalPlace)+text.slice(decimalPlace+1)),exp<0)throw new Error("Cannot include negative exponent part for integers");v=text+=new Array(exp+1).join("0")}if(!/^([0-9][0-9]*)$/.test(v))throw new Error("Invalid integer: "+v);for(var r=[],max=v.length,l=LOG_BASE,min=max-l;max>0;)r.push(+v.slice(min,max)),(min-=l)<0&&(min=0),max-=l;return trim(r),new BigInteger(r,sign)}function parseValue(v){return"number"==typeof v?function(v){if(isPrecise(v)){if(v!==truncate(v))throw new Error(v+" is not an integer.");return new SmallInteger(v)}return parseStringValue(v.toString())}(v):"string"==typeof v?parseStringValue(v):v}BigInteger.prototype.toString=function(radix){if(void 0===radix&&(radix=10),10!==radix)return toBase(this,radix);for(var digit,v=this.value,l=v.length,str=String(v[--l]);--l>=0;)digit=String(v[l]),str+="0000000".slice(digit.length)+digit;return(this.sign?"-":"")+str},SmallInteger.prototype.toString=function(radix){return void 0===radix&&(radix=10),10!=radix?toBase(this,radix):String(this.value)},BigInteger.prototype.toJSON=SmallInteger.prototype.toJSON=function(){return this.toString()},BigInteger.prototype.valueOf=function(){return+this.toString()},BigInteger.prototype.toJSNumber=BigInteger.prototype.valueOf,SmallInteger.prototype.valueOf=function(){return this.value},SmallInteger.prototype.toJSNumber=SmallInteger.prototype.valueOf;for(var i=0;i<1e3;i++)Integer[i]=new SmallInteger(i),i>0&&(Integer[-i]=new SmallInteger(-i));return Integer.one=Integer[1],Integer.zero=Integer[0],Integer.minusOne=Integer[-1],Integer.max=max,Integer.min=min,Integer.gcd=gcd,Integer.lcm=function(a,b){return a=parseValue(a).abs(),b=parseValue(b).abs(),a.divide(gcd(a,b)).multiply(b)},Integer.isInstance=function(x){return x instanceof BigInteger||x instanceof SmallInteger},Integer.randBetween=function(a,b){var low=min(a=parseValue(a),b=parseValue(b)),range=max(a,b).subtract(low).add(1);if(range.isSmall)return low.add(Math.floor(Math.random()*range));for(var result=[],restricted=!0,i=range.value.length-1;i>=0;i--){var top=restricted?range.value[i]:BASE,digit=truncate(Math.random()*top);result.unshift(digit),digit<top&&(restricted=!1)}return result=arrayToSmall(result),low.add("number"==typeof result?new SmallInteger(result):new BigInteger(result,!1))},Integer.fromArray=function(digits,base,isNegative){return parseBaseFromArray(digits.map(parseValue),parseValue(base||10),isNegative)},Integer}();void 0!==module&&module.hasOwnProperty("exports")&&(module.exports=bigInt)},{}],4:[function(require,module,exports){},{}],5:[function(require,module,exports){var basex=require("base-x");module.exports=basex("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")},{"base-x":1}],6:[function(require,module,exports){"use strict";var base58=require("bs58"),Buffer=require("safe-buffer").Buffer;module.exports=function(checksumFn){function decodeRaw(buffer){var payload=buffer.slice(0,-4),checksum=buffer.slice(-4),newChecksum=checksumFn(payload);if(!(checksum[0]^newChecksum[0]|checksum[1]^newChecksum[1]|checksum[2]^newChecksum[2]|checksum[3]^newChecksum[3]))return payload}return{encode:function(payload){var checksum=checksumFn(payload);return base58.encode(Buffer.concat([payload,checksum],payload.length+4))},decode:function(string){var payload=decodeRaw(base58.decode(string));if(!payload)throw new Error("Invalid checksum");return payload},decodeUnsafe:function(string){var buffer=base58.decodeUnsafe(string);if(buffer)return decodeRaw(buffer)}}}},{bs58:5,"safe-buffer":40}],7:[function(require,module,exports){"use strict";var createHash=require("create-hash"),bs58checkBase=require("./base");module.exports=bs58checkBase(function(buffer){var tmp=createHash("sha256").update(buffer).digest();return createHash("sha256").update(tmp).digest()})},{"./base":6,"create-hash":15}],8:[function(require,module,exports){"use strict";var base64=require("base64-js"),ieee754=require("ieee754");exports.Buffer=Buffer,exports.SlowBuffer=function(length){+length!=length&&(length=0);return Buffer.alloc(+length)},exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=2147483647;function createBuffer(length){if(length>K_MAX_LENGTH)throw new RangeError("Invalid typed array length");var buf=new Uint8Array(length);return buf.__proto__=Buffer.prototype,buf}function Buffer(arg,encodingOrOffset,length){if("number"==typeof arg){if("string"==typeof encodingOrOffset)throw new Error("If encoding is specified then the first argument must be a string");return allocUnsafe(arg)}return from(arg,encodingOrOffset,length)}function from(value,encodingOrOffset,length){if("number"==typeof value)throw new TypeError('"value" argument must not be a number');return isArrayBuffer(value)?function(array,byteOffset,length){if(byteOffset<0||array.byteLength<byteOffset)throw new RangeError("'offset' is out of bounds");if(array.byteLength<byteOffset+(length||0))throw new RangeError("'length' is out of bounds");var buf;buf=void 0===byteOffset&&void 0===length?new Uint8Array(array):void 0===length?new Uint8Array(array,byteOffset):new Uint8Array(array,byteOffset,length);return buf.__proto__=Buffer.prototype,buf}(value,encodingOrOffset,length):"string"==typeof value?function(string,encoding){"string"==typeof encoding&&""!==encoding||(encoding="utf8");if(!Buffer.isEncoding(encoding))throw new TypeError('"encoding" must be a valid string encoding');var length=0|byteLength(string,encoding),buf=createBuffer(length),actual=buf.write(string,encoding);actual!==length&&(buf=buf.slice(0,actual));return buf}(value,encodingOrOffset):function(obj){if(Buffer.isBuffer(obj)){var len=0|checked(obj.length),buf=createBuffer(len);return 0===buf.length?buf:(obj.copy(buf,0,0,len),buf)}if(obj){if(isArrayBufferView(obj)||"length"in obj)return"number"!=typeof obj.length||numberIsNaN(obj.length)?createBuffer(0):fromArrayLike(obj);if("Buffer"===obj.type&&Array.isArray(obj.data))return fromArrayLike(obj.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(value)}function assertSize(size){if("number"!=typeof size)throw new TypeError('"size" argument must be a number');if(size<0)throw new RangeError('"size" argument must not be negative')}function allocUnsafe(size){return assertSize(size),createBuffer(size<0?0:0|checked(size))}function fromArrayLike(array){for(var length=array.length<0?0:0|checked(array.length),buf=createBuffer(length),i=0;i<length;i+=1)buf[i]=255&array[i];return buf}function checked(length){if(length>=K_MAX_LENGTH)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+K_MAX_LENGTH.toString(16)+" bytes");return 0|length}function byteLength(string,encoding){if(Buffer.isBuffer(string))return string.length;if(isArrayBufferView(string)||isArrayBuffer(string))return string.byteLength;"string"!=typeof string&&(string=""+string);var len=string.length;if(0===len)return 0;for(var loweredCase=!1;;)switch(encoding){case"ascii":case"latin1":case"binary":return len;case"utf8":case"utf-8":case void 0:return utf8ToBytes(string).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*len;case"hex":return len>>>1;case"base64":return base64ToBytes(string).length;default:if(loweredCase)return utf8ToBytes(string).length;encoding=(""+encoding).toLowerCase(),loweredCase=!0}}function swap(b,n,m){var i=b[n];b[n]=b[m],b[m]=i}function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){if(0===buffer.length)return-1;if("string"==typeof byteOffset?(encoding=byteOffset,byteOffset=0):byteOffset>2147483647?byteOffset=2147483647:byteOffset<-2147483648&&(byteOffset=-2147483648),numberIsNaN(byteOffset=+byteOffset)&&(byteOffset=dir?0:buffer.length-1),byteOffset<0&&(byteOffset=buffer.length+byteOffset),byteOffset>=buffer.length){if(dir)return-1;byteOffset=buffer.length-1}else if(byteOffset<0){if(!dir)return-1;byteOffset=0}if("string"==typeof val&&(val=Buffer.from(val,encoding)),Buffer.isBuffer(val))return 0===val.length?-1:arrayIndexOf(buffer,val,byteOffset,encoding,dir);if("number"==typeof val)return val&=255,"function"==typeof Uint8Array.prototype.indexOf?dir?Uint8Array.prototype.indexOf.call(buffer,val,byteOffset):Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset):arrayIndexOf(buffer,[val],byteOffset,encoding,dir);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var i,indexSize=1,arrLength=arr.length,valLength=val.length;if(void 0!==encoding&&("ucs2"===(encoding=String(encoding).toLowerCase())||"ucs-2"===encoding||"utf16le"===encoding||"utf-16le"===encoding)){if(arr.length<2||val.length<2)return-1;indexSize=2,arrLength/=2,valLength/=2,byteOffset/=2}function read(buf,i){return 1===indexSize?buf[i]:buf.readUInt16BE(i*indexSize)}if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++)if(read(arr,i)===read(val,-1===foundIndex?0:i-foundIndex)){if(-1===foundIndex&&(foundIndex=i),i-foundIndex+1===valLength)return foundIndex*indexSize}else-1!==foundIndex&&(i-=i-foundIndex),foundIndex=-1}else for(byteOffset+valLength>arrLength&&(byteOffset=arrLength-valLength),i=byteOffset;i>=0;i--){for(var found=!0,j=0;j<valLength;j++)if(read(arr,i+j)!==read(val,j)){found=!1;break}if(found)return i}return-1}function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;length?(length=Number(length))>remaining&&(length=remaining):length=remaining;var strLen=string.length;if(strLen%2!=0)throw new TypeError("Invalid hex string");length>strLen/2&&(length=strLen/2);for(var i=0;i<length;++i){var parsed=parseInt(string.substr(2*i,2),16);if(numberIsNaN(parsed))return i;buf[offset+i]=parsed}return i}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length)}function asciiWrite(buf,string,offset,length){return blitBuffer(function(str){for(var byteArray=[],i=0;i<str.length;++i)byteArray.push(255&str.charCodeAt(i));return byteArray}(string),buf,offset,length)}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length)}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length)}function ucs2Write(buf,string,offset,length){return blitBuffer(function(str,units){for(var c,hi,lo,byteArray=[],i=0;i<str.length&&!((units-=2)<0);++i)c=str.charCodeAt(i),hi=c>>8,lo=c%256,byteArray.push(lo),byteArray.push(hi);return byteArray}(string,buf.length-offset),buf,offset,length)}function base64Slice(buf,start,end){return 0===start&&end===buf.length?base64.fromByteArray(buf):base64.fromByteArray(buf.slice(start,end))}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);for(var res=[],i=start;i<end;){var secondByte,thirdByte,fourthByte,tempCodePoint,firstByte=buf[i],codePoint=null,bytesPerSequence=firstByte>239?4:firstByte>223?3:firstByte>191?2:1;if(i+bytesPerSequence<=end)switch(bytesPerSequence){case 1:firstByte<128&&(codePoint=firstByte);break;case 2:128==(192&(secondByte=buf[i+1]))&&(tempCodePoint=(31&firstByte)<<6|63&secondByte)>127&&(codePoint=tempCodePoint);break;case 3:secondByte=buf[i+1],thirdByte=buf[i+2],128==(192&secondByte)&&128==(192&thirdByte)&&(tempCodePoint=(15&firstByte)<<12|(63&secondByte)<<6|63&thirdByte)>2047&&(tempCodePoint<55296||tempCodePoint>57343)&&(codePoint=tempCodePoint);break;case 4:secondByte=buf[i+1],thirdByte=buf[i+2],fourthByte=buf[i+3],128==(192&secondByte)&&128==(192&thirdByte)&&128==(192&fourthByte)&&(tempCodePoint=(15&firstByte)<<18|(63&secondByte)<<12|(63&thirdByte)<<6|63&fourthByte)>65535&&tempCodePoint<1114112&&(codePoint=tempCodePoint)}null===codePoint?(codePoint=65533,bytesPerSequence=1):codePoint>65535&&(codePoint-=65536,res.push(codePoint>>>10&1023|55296),codePoint=56320|1023&codePoint),res.push(codePoint),i+=bytesPerSequence}return function(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH)return String.fromCharCode.apply(String,codePoints);var res="",i=0;for(;i<len;)res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH));return res}(res)}exports.kMaxLength=K_MAX_LENGTH,Buffer.TYPED_ARRAY_SUPPORT=function(){try{var arr=new Uint8Array(1);return arr.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===arr.foo()}catch(e){return!1}}(),Buffer.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),Buffer.poolSize=8192,Buffer.from=function(value,encodingOrOffset,length){return from(value,encodingOrOffset,length)},Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,Buffer.alloc=function(size,fill,encoding){return function(size,fill,encoding){return assertSize(size),size<=0?createBuffer(size):void 0!==fill?"string"==typeof encoding?createBuffer(size).fill(fill,encoding):createBuffer(size).fill(fill):createBuffer(size)}(size,fill,encoding)},Buffer.allocUnsafe=function(size){return allocUnsafe(size)},Buffer.allocUnsafeSlow=function(size){return allocUnsafe(size)},Buffer.isBuffer=function(b){return null!=b&&!0===b._isBuffer},Buffer.compare=function(a,b){if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b))throw new TypeError("Arguments must be Buffers");if(a===b)return 0;for(var x=a.length,y=b.length,i=0,len=Math.min(x,y);i<len;++i)if(a[i]!==b[i]){x=a[i],y=b[i];break}return x<y?-1:y<x?1:0},Buffer.isEncoding=function(encoding){switch(String(encoding).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(list,length){if(!Array.isArray(list))throw new TypeError('"list" argument must be an Array of Buffers');if(0===list.length)return Buffer.alloc(0);var i;if(void 0===length)for(length=0,i=0;i<list.length;++i)length+=list[i].length;var buffer=Buffer.allocUnsafe(length),pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(!Buffer.isBuffer(buf))throw new TypeError('"list" argument must be an Array of Buffers');buf.copy(buffer,pos),pos+=buf.length}return buffer},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var len=this.length;if(len%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var i=0;i<len;i+=2)swap(this,i,i+1);return this},Buffer.prototype.swap32=function(){var len=this.length;if(len%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var i=0;i<len;i+=4)swap(this,i,i+3),swap(this,i+1,i+2);return this},Buffer.prototype.swap64=function(){var len=this.length;if(len%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var i=0;i<len;i+=8)swap(this,i,i+7),swap(this,i+1,i+6),swap(this,i+2,i+5),swap(this,i+3,i+4);return this},Buffer.prototype.toString=function(){var length=this.length;return 0===length?"":0===arguments.length?utf8Slice(this,0,length):function(encoding,start,end){var loweredCase=!1;if((void 0===start||start<0)&&(start=0),start>this.length)return"";if((void 0===end||end>this.length)&&(end=this.length),end<=0)return"";if((end>>>=0)<=(start>>>=0))return"";for(encoding||(encoding="utf8");;)switch(encoding){case"hex":return hexSlice(this,start,end);case"utf8":case"utf-8":return utf8Slice(this,start,end);case"ascii":return asciiSlice(this,start,end);case"latin1":case"binary":return latin1Slice(this,start,end);case"base64":return base64Slice(this,start,end);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(encoding+"").toLowerCase(),loweredCase=!0}}.apply(this,arguments)},Buffer.prototype.equals=function(b){if(!Buffer.isBuffer(b))throw new TypeError("Argument must be a Buffer");return this===b||0===Buffer.compare(this,b)},Buffer.prototype.inspect=function(){var str="",max=exports.INSPECT_MAX_BYTES;return this.length>0&&(str=this.toString("hex",0,max).match(/.{2}/g).join(" "),this.length>max&&(str+=" ... ")),"<Buffer "+str+">"},Buffer.prototype.compare=function(target,start,end,thisStart,thisEnd){if(!Buffer.isBuffer(target))throw new TypeError("Argument must be a Buffer");if(void 0===start&&(start=0),void 0===end&&(end=target?target.length:0),void 0===thisStart&&(thisStart=0),void 0===thisEnd&&(thisEnd=this.length),start<0||end>target.length||thisStart<0||thisEnd>this.length)throw new RangeError("out of range index");if(thisStart>=thisEnd&&start>=end)return 0;if(thisStart>=thisEnd)return-1;if(start>=end)return 1;if(start>>>=0,end>>>=0,thisStart>>>=0,thisEnd>>>=0,this===target)return 0;for(var x=thisEnd-thisStart,y=end-start,len=Math.min(x,y),thisCopy=this.slice(thisStart,thisEnd),targetCopy=target.slice(start,end),i=0;i<len;++i)if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i],y=targetCopy[i];break}return x<y?-1:y<x?1:0},Buffer.prototype.includes=function(val,byteOffset,encoding){return-1!==this.indexOf(val,byteOffset,encoding)},Buffer.prototype.indexOf=function(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,!0)},Buffer.prototype.lastIndexOf=function(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,!1)},Buffer.prototype.write=function(string,offset,length,encoding){if(void 0===offset)encoding="utf8",length=this.length,offset=0;else if(void 0===length&&"string"==typeof offset)encoding=offset,length=this.length,offset=0;else{if(!isFinite(offset))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");offset>>>=0,isFinite(length)?(length>>>=0,void 0===encoding&&(encoding="utf8")):(encoding=length,length=void 0)}var remaining=this.length-offset;if((void 0===length||length>remaining)&&(length=remaining),string.length>0&&(length<0||offset<0)||offset>this.length)throw new RangeError("Attempt to write outside buffer bounds");encoding||(encoding="utf8");for(var loweredCase=!1;;)switch(encoding){case"hex":return hexWrite(this,string,offset,length);case"utf8":case"utf-8":return utf8Write(this,string,offset,length);case"ascii":return asciiWrite(this,string,offset,length);case"latin1":case"binary":return latin1Write(this,string,offset,length);case"base64":return base64Write(this,string,offset,length);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError("Unknown encoding: "+encoding);encoding=(""+encoding).toLowerCase(),loweredCase=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var MAX_ARGUMENTS_LENGTH=4096;function asciiSlice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i)ret+=String.fromCharCode(127&buf[i]);return ret}function latin1Slice(buf,start,end){var ret="";end=Math.min(buf.length,end);for(var i=start;i<end;++i)ret+=String.fromCharCode(buf[i]);return ret}function hexSlice(buf,start,end){var len=buf.length;(!start||start<0)&&(start=0),(!end||end<0||end>len)&&(end=len);for(var out="",i=start;i<end;++i)out+=toHex(buf[i]);return out}function utf16leSlice(buf,start,end){for(var bytes=buf.slice(start,end),res="",i=0;i<bytes.length;i+=2)res+=String.fromCharCode(bytes[i]+256*bytes[i+1]);return res}function checkOffset(offset,ext,length){if(offset%1!=0||offset<0)throw new RangeError("offset is not uint");if(offset+ext>length)throw new RangeError("Trying to access beyond buffer length")}function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError("Index out of range")}function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError("Index out of range");if(offset<0)throw new RangeError("Index out of range")}function writeFloat(buf,value,offset,littleEndian,noAssert){return value=+value,offset>>>=0,noAssert||checkIEEE754(buf,0,offset,4),ieee754.write(buf,value,offset,littleEndian,23,4),offset+4}function writeDouble(buf,value,offset,littleEndian,noAssert){return value=+value,offset>>>=0,noAssert||checkIEEE754(buf,0,offset,8),ieee754.write(buf,value,offset,littleEndian,52,8),offset+8}Buffer.prototype.slice=function(start,end){var len=this.length;start=~~start,end=void 0===end?len:~~end,start<0?(start+=len)<0&&(start=0):start>len&&(start=len),end<0?(end+=len)<0&&(end=0):end>len&&(end=len),end<start&&(end=start);var newBuf=this.subarray(start,end);return newBuf.__proto__=Buffer.prototype,newBuf},Buffer.prototype.readUIntLE=function(offset,byteLength,noAssert){offset>>>=0,byteLength>>>=0,noAssert||checkOffset(offset,byteLength,this.length);for(var val=this[offset],mul=1,i=0;++i<byteLength&&(mul*=256);)val+=this[offset+i]*mul;return val},Buffer.prototype.readUIntBE=function(offset,byteLength,noAssert){offset>>>=0,byteLength>>>=0,noAssert||checkOffset(offset,byteLength,this.length);for(var val=this[offset+--byteLength],mul=1;byteLength>0&&(mul*=256);)val+=this[offset+--byteLength]*mul;return val},Buffer.prototype.readUInt8=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,1,this.length),this[offset]},Buffer.prototype.readUInt16LE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,2,this.length),this[offset]|this[offset+1]<<8},Buffer.prototype.readUInt16BE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,2,this.length),this[offset]<<8|this[offset+1]},Buffer.prototype.readUInt32LE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,4,this.length),(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+16777216*this[offset+3]},Buffer.prototype.readUInt32BE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,4,this.length),16777216*this[offset]+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3])},Buffer.prototype.readIntLE=function(offset,byteLength,noAssert){offset>>>=0,byteLength>>>=0,noAssert||checkOffset(offset,byteLength,this.length);for(var val=this[offset],mul=1,i=0;++i<byteLength&&(mul*=256);)val+=this[offset+i]*mul;return val>=(mul*=128)&&(val-=Math.pow(2,8*byteLength)),val},Buffer.prototype.readIntBE=function(offset,byteLength,noAssert){offset>>>=0,byteLength>>>=0,noAssert||checkOffset(offset,byteLength,this.length);for(var i=byteLength,mul=1,val=this[offset+--i];i>0&&(mul*=256);)val+=this[offset+--i]*mul;return val>=(mul*=128)&&(val-=Math.pow(2,8*byteLength)),val},Buffer.prototype.readInt8=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,1,this.length),128&this[offset]?-1*(255-this[offset]+1):this[offset]},Buffer.prototype.readInt16LE=function(offset,noAssert){offset>>>=0,noAssert||checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return 32768&val?4294901760|val:val},Buffer.prototype.readInt16BE=function(offset,noAssert){offset>>>=0,noAssert||checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return 32768&val?4294901760|val:val},Buffer.prototype.readInt32LE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,4,this.length),this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24},Buffer.prototype.readInt32BE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,4,this.length),this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3]},Buffer.prototype.readFloatLE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,4,this.length),ieee754.read(this,offset,!0,23,4)},Buffer.prototype.readFloatBE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,4,this.length),ieee754.read(this,offset,!1,23,4)},Buffer.prototype.readDoubleLE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,8,this.length),ieee754.read(this,offset,!0,52,8)},Buffer.prototype.readDoubleBE=function(offset,noAssert){return offset>>>=0,noAssert||checkOffset(offset,8,this.length),ieee754.read(this,offset,!1,52,8)},Buffer.prototype.writeUIntLE=function(value,offset,byteLength,noAssert){(value=+value,offset>>>=0,byteLength>>>=0,noAssert)||checkInt(this,value,offset,byteLength,Math.pow(2,8*byteLength)-1,0);var mul=1,i=0;for(this[offset]=255&value;++i<byteLength&&(mul*=256);)this[offset+i]=value/mul&255;return offset+byteLength},Buffer.prototype.writeUIntBE=function(value,offset,byteLength,noAssert){(value=+value,offset>>>=0,byteLength>>>=0,noAssert)||checkInt(this,value,offset,byteLength,Math.pow(2,8*byteLength)-1,0);var i=byteLength-1,mul=1;for(this[offset+i]=255&value;--i>=0&&(mul*=256);)this[offset+i]=value/mul&255;return offset+byteLength},Buffer.prototype.writeUInt8=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,1,255,0),this[offset]=255&value,offset+1},Buffer.prototype.writeUInt16LE=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,2,65535,0),this[offset]=255&value,this[offset+1]=value>>>8,offset+2},Buffer.prototype.writeUInt16BE=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,2,65535,0),this[offset]=value>>>8,this[offset+1]=255&value,offset+2},Buffer.prototype.writeUInt32LE=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,4,4294967295,0),this[offset+3]=value>>>24,this[offset+2]=value>>>16,this[offset+1]=value>>>8,this[offset]=255&value,offset+4},Buffer.prototype.writeUInt32BE=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,4,4294967295,0),this[offset]=value>>>24,this[offset+1]=value>>>16,this[offset+2]=value>>>8,this[offset+3]=255&value,offset+4},Buffer.prototype.writeIntLE=function(value,offset,byteLength,noAssert){if(value=+value,offset>>>=0,!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=0,mul=1,sub=0;for(this[offset]=255&value;++i<byteLength&&(mul*=256);)value<0&&0===sub&&0!==this[offset+i-1]&&(sub=1),this[offset+i]=(value/mul>>0)-sub&255;return offset+byteLength},Buffer.prototype.writeIntBE=function(value,offset,byteLength,noAssert){if(value=+value,offset>>>=0,!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit)}var i=byteLength-1,mul=1,sub=0;for(this[offset+i]=255&value;--i>=0&&(mul*=256);)value<0&&0===sub&&0!==this[offset+i+1]&&(sub=1),this[offset+i]=(value/mul>>0)-sub&255;return offset+byteLength},Buffer.prototype.writeInt8=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,1,127,-128),value<0&&(value=255+value+1),this[offset]=255&value,offset+1},Buffer.prototype.writeInt16LE=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,2,32767,-32768),this[offset]=255&value,this[offset+1]=value>>>8,offset+2},Buffer.prototype.writeInt16BE=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,2,32767,-32768),this[offset]=value>>>8,this[offset+1]=255&value,offset+2},Buffer.prototype.writeInt32LE=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,4,2147483647,-2147483648),this[offset]=255&value,this[offset+1]=value>>>8,this[offset+2]=value>>>16,this[offset+3]=value>>>24,offset+4},Buffer.prototype.writeInt32BE=function(value,offset,noAssert){return value=+value,offset>>>=0,noAssert||checkInt(this,value,offset,4,2147483647,-2147483648),value<0&&(value=4294967295+value+1),this[offset]=value>>>24,this[offset+1]=value>>>16,this[offset+2]=value>>>8,this[offset+3]=255&value,offset+4},Buffer.prototype.writeFloatLE=function(value,offset,noAssert){return writeFloat(this,value,offset,!0,noAssert)},Buffer.prototype.writeFloatBE=function(value,offset,noAssert){return writeFloat(this,value,offset,!1,noAssert)},Buffer.prototype.writeDoubleLE=function(value,offset,noAssert){return writeDouble(this,value,offset,!0,noAssert)},Buffer.prototype.writeDoubleBE=function(value,offset,noAssert){return writeDouble(this,value,offset,!1,noAssert)},Buffer.prototype.copy=function(target,targetStart,start,end){if(start||(start=0),end||0===end||(end=this.length),targetStart>=target.length&&(targetStart=target.length),targetStart||(targetStart=0),end>0&&end<start&&(end=start),end===start)return 0;if(0===target.length||0===this.length)return 0;if(targetStart<0)throw new RangeError("targetStart out of bounds");if(start<0||start>=this.length)throw new RangeError("sourceStart out of bounds");if(end<0)throw new RangeError("sourceEnd out of bounds");end>this.length&&(end=this.length),target.length-targetStart<end-start&&(end=target.length-targetStart+start);var i,len=end-start;if(this===target&&start<targetStart&&targetStart<end)for(i=len-1;i>=0;--i)target[i+targetStart]=this[i+start];else if(len<1e3)for(i=0;i<len;++i)target[i+targetStart]=this[i+start];else Uint8Array.prototype.set.call(target,this.subarray(start,start+len),targetStart);return len},Buffer.prototype.fill=function(val,start,end,encoding){if("string"==typeof val){if("string"==typeof start?(encoding=start,start=0,end=this.length):"string"==typeof end&&(encoding=end,end=this.length),1===val.length){var code=val.charCodeAt(0);code<256&&(val=code)}if(void 0!==encoding&&"string"!=typeof encoding)throw new TypeError("encoding must be a string");if("string"==typeof encoding&&!Buffer.isEncoding(encoding))throw new TypeError("Unknown encoding: "+encoding)}else"number"==typeof val&&(val&=255);if(start<0||this.length<start||this.length<end)throw new RangeError("Out of range index");if(end<=start)return this;var i;if(start>>>=0,end=void 0===end?this.length:end>>>0,val||(val=0),"number"==typeof val)for(i=start;i<end;++i)this[i]=val;else{var bytes=Buffer.isBuffer(val)?val:new Buffer(val,encoding),len=bytes.length;for(i=0;i<end-start;++i)this[i+start]=bytes[i%len]}return this};var INVALID_BASE64_RE=/[^+/0-9A-Za-z-_]/g;function toHex(n){return n<16?"0"+n.toString(16):n.toString(16)}function utf8ToBytes(string,units){var codePoint;units=units||1/0;for(var length=string.length,leadSurrogate=null,bytes=[],i=0;i<length;++i){if((codePoint=string.charCodeAt(i))>55295&&codePoint<57344){if(!leadSurrogate){if(codePoint>56319){(units-=3)>-1&&bytes.push(239,191,189);continue}if(i+1===length){(units-=3)>-1&&bytes.push(239,191,189);continue}leadSurrogate=codePoint;continue}if(codePoint<56320){(units-=3)>-1&&bytes.push(239,191,189),leadSurrogate=codePoint;continue}codePoint=65536+(leadSurrogate-55296<<10|codePoint-56320)}else leadSurrogate&&(units-=3)>-1&&bytes.push(239,191,189);if(leadSurrogate=null,codePoint<128){if((units-=1)<0)break;bytes.push(codePoint)}else if(codePoint<2048){if((units-=2)<0)break;bytes.push(codePoint>>6|192,63&codePoint|128)}else if(codePoint<65536){if((units-=3)<0)break;bytes.push(codePoint>>12|224,codePoint>>6&63|128,63&codePoint|128)}else{if(!(codePoint<1114112))throw new Error("Invalid code point");if((units-=4)<0)break;bytes.push(codePoint>>18|240,codePoint>>12&63|128,codePoint>>6&63|128,63&codePoint|128)}}return bytes}function base64ToBytes(str){return base64.toByteArray(function(str){if((str=str.trim().replace(INVALID_BASE64_RE,"")).length<2)return"";for(;str.length%4!=0;)str+="=";return str}(str))}function blitBuffer(src,dst,offset,length){for(var i=0;i<length&&!(i+offset>=dst.length||i>=src.length);++i)dst[i+offset]=src[i];return i}function isArrayBuffer(obj){return obj instanceof ArrayBuffer||null!=obj&&null!=obj.constructor&&"ArrayBuffer"===obj.constructor.name&&"number"==typeof obj.byteLength}function isArrayBufferView(obj){return"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(obj)}function numberIsNaN(obj){return obj!=obj}},{"base64-js":2,ieee754:20}],9:[function(require,module,exports){"use strict";var validate=require("./validation").validate,CHARSET="qpzry9x8gf2tvdw0s3jn54khce6mua7l",CHARSET_INVERSE_INDEX={q:0,p:1,z:2,r:3,y:4,9:5,x:6,8:7,g:8,f:9,2:10,t:11,v:12,d:13,w:14,0:15,s:16,3:17,j:18,n:19,5:20,4:21,k:22,h:23,c:24,e:25,6:26,m:27,u:28,a:29,7:30,l:31};module.exports={encode:function(data){validate(data instanceof Uint8Array,"Invalid data: "+data+".");for(var base32="",i=0;i<data.length;++i){var value=data[i];validate(0<=value&&value<32,"Invalid value: "+value+"."),base32+=CHARSET[value]}return base32},decode:function(string){validate("string"==typeof string,"Invalid base32-encoded string: "+string+".");for(var data=new Uint8Array(string.length),i=0;i<string.length;++i){var value=string[i];validate(value in CHARSET_INVERSE_INDEX,"Invalid value: "+value+"."),data[i]=CHARSET_INVERSE_INDEX[value]}return data}}},{"./validation":12}],10:[function(require,module,exports){"use strict";var base32=require("./base32"),bigInt=require("big-integer"),convertBits=require("./convertBits"),validation=require("./validation"),validate=validation.validate;var ValidationError=validation.ValidationError,VALID_PREFIXES=["bitcoincash","bchtest","bchreg"];function prefixToUint5Array(prefix){for(var result=new Uint8Array(prefix.length),i=0;i<prefix.length;++i)result[i]=31&prefix[i].charCodeAt(0);return result}function concat(a,b){var ab=new Uint8Array(a.length+b.length);return ab.set(a),ab.set(b,a.length),ab}function polymod(data){for(var GENERATOR=[656907472481,522768456162,0xf33e5fb3c4,748107326120,130178868336],checksum=bigInt(1),i=0;i<data.length;++i){var value=data[i],topBits=checksum.shiftRight(35);checksum=checksum.and(34359738367).shiftLeft(5).xor(value);for(var j=0;j<GENERATOR.length;++j)topBits.shiftRight(j).and(1).equals(1)&&(checksum=checksum.xor(GENERATOR[j]))}return checksum.xor(1)}function hasSingleCase(string){return string===string.toLowerCase()||string===string.toUpperCase()}module.exports={encode:function(prefix,type,hash){validate("string"==typeof prefix&&function(prefix){return hasSingleCase(prefix)&&-1!==VALID_PREFIXES.indexOf(prefix.toLowerCase())}(prefix),"Invalid prefix: "+prefix+"."),validate("string"==typeof type,"Invalid type: "+type+"."),validate(hash instanceof Uint8Array,"Invalid hash: "+hash+".");var data,prefixData=concat(prefixToUint5Array(prefix),new Uint8Array(1)),versionByte=function(type){switch(type){case"P2PKH":return 0;case"P2SH":return 8;default:throw new ValidationError("Invalid type: "+type+".")}}(type)+function(hash){switch(8*hash.length){case 160:return 0;case 192:return 1;case 224:return 2;case 256:return 3;case 320:return 4;case 384:return 5;case 448:return 6;case 512:return 7;default:throw new ValidationError("Invalid hash size: "+hash.length+".")}}(hash),payloadData=(data=concat(Uint8Array.of(versionByte),hash),convertBits(data,8,5)),payload=concat(payloadData,function(checksum){for(var result=new Uint8Array(8),i=0;i<8;++i)result[7-i]=checksum.and(31).toJSNumber(),checksum=checksum.shiftRight(5);return result}(polymod(concat(concat(prefixData,payloadData),new Uint8Array(8)))));return prefix+":"+base32.encode(payload)},decode:function(address){validate("string"==typeof address&&hasSingleCase(address),"Invalid address: "+address+".");var pieces=address.toLowerCase().split(":");validate(2===pieces.length,"Missing prefix: "+address+".");var prefix=pieces[0],payload=base32.decode(pieces[1]);validate(function(prefix,payload){return polymod(concat(concat(prefixToUint5Array(prefix),new Uint8Array(1)),payload)).equals(0)}(prefix,payload),"Invalid checksum: "+address+".");var data,payloadData=(data=payload.slice(0,-8),convertBits(data,5,8,!0)),versionByte=payloadData[0],hash=payloadData.slice(1);return validate(function(versionByte){switch(7&versionByte){case 0:return 160;case 1:return 192;case 2:return 224;case 3:return 256;case 4:return 320;case 5:return 384;case 6:return 448;case 7:return 512}}(versionByte)===8*hash.length,"Invalid hash size: "+address+"."),{prefix:prefix,type:function(versionByte){switch(120&versionByte){case 0:return"P2PKH";case 8:return"P2SH";default:throw new ValidationError("Invalid address type in version byte: "+versionByte+".")}}(versionByte),hash:hash}},ValidationError:ValidationError}},{"./base32":9,"./convertBits":11,"./validation":12,"big-integer":3}],11:[function(require,module,exports){"use strict";var validate=require("./validation").validate;module.exports=function(data,from,to,strictMode){for(var length=strictMode?Math.floor(data.length*from/to):Math.ceil(data.length*from/to),mask=(1<<to)-1,result=new Uint8Array(length),index=0,accumulator=0,bits=0,i=0;i<data.length;++i){var value=data[i];for(validate(0<=value&&value>>from==0,"Invalid value: "+value+"."),accumulator=accumulator<<from|value,bits+=from;bits>=to;)bits-=to,result[index]=accumulator>>bits&mask,++index}return strictMode?validate(bits<from&&0==(accumulator<<to-bits&mask),"Input cannot be converted to "+to+" bits without padding, but strict mode was used."):bits>0&&(result[index]=accumulator<<to-bits&mask,++index),result}},{"./validation":12}],12:[function(require,module,exports){"use strict";function ValidationError(message){var error=new Error;this.name=error.name="ValidationError",this.message=error.message=message,this.stack=error.stack}ValidationError.prototype=Object.create(Error.prototype),module.exports={ValidationError:ValidationError,validate:function(condition,message){if(!condition)throw new ValidationError(message)}}},{}],13:[function(require,module,exports){var Buffer=require("safe-buffer").Buffer,Transform=require("stream").Transform,StringDecoder=require("string_decoder").StringDecoder;function CipherBase(hashMode){Transform.call(this),this.hashMode="string"==typeof hashMode,this.hashMode?this[hashMode]=this._finalOrDigest:this.final=this._finalOrDigest,this._final&&(this.__final=this._final,this._final=null),this._decoder=null,this._encoding=null}require("inherits")(CipherBase,Transform),CipherBase.prototype.update=function(data,inputEnc,outputEnc){"string"==typeof data&&(data=Buffer.from(data,inputEnc));var outData=this._update(data);return this.hashMode?this:(outputEnc&&(outData=this._toString(outData,outputEnc)),outData)},CipherBase.prototype.setAutoPadding=function(){},CipherBase.prototype.getAuthTag=function(){throw new Error("trying to get auth tag in unsupported state")},CipherBase.prototype.setAuthTag=function(){throw new Error("trying to set auth tag in unsupported state")},CipherBase.prototype.setAAD=function(){throw new Error("trying to set aad in unsupported state")},CipherBase.prototype._transform=function(data,_,next){var err;try{this.hashMode?this._update(data):this.push(this._update(data))}catch(e){err=e}finally{next(err)}},CipherBase.prototype._flush=function(done){var err;try{this.push(this.__final())}catch(e){err=e}done(err)},CipherBase.prototype._finalOrDigest=function(outputEnc){var outData=this.__final()||Buffer.alloc(0);return outputEnc&&(outData=this._toString(outData,outputEnc,!0)),outData},CipherBase.prototype._toString=function(value,enc,fin){if(this._decoder||(this._decoder=new StringDecoder(enc),this._encoding=enc),this._encoding!==enc)throw new Error("can't switch encodings");var out=this._decoder.write(value);return fin&&(out+=this._decoder.end()),out},module.exports=CipherBase},{inherits:21,"safe-buffer":40,stream:49,string_decoder:50}],14:[function(require,module,exports){(function(Buffer){function objectToString(o){return Object.prototype.toString.call(o)}exports.isArray=function(arg){return Array.isArray?Array.isArray(arg):"[object Array]"===objectToString(arg)},exports.isBoolean=function(arg){return"boolean"==typeof arg},exports.isNull=function(arg){return null===arg},exports.isNullOrUndefined=function(arg){return null==arg},exports.isNumber=function(arg){return"number"==typeof arg},exports.isString=function(arg){return"string"==typeof arg},exports.isSymbol=function(arg){return"symbol"==typeof arg},exports.isUndefined=function(arg){return void 0===arg},exports.isRegExp=function(re){return"[object RegExp]"===objectToString(re)},exports.isObject=function(arg){return"object"==typeof arg&&null!==arg},exports.isDate=function(d){return"[object Date]"===objectToString(d)},exports.isError=function(e){return"[object Error]"===objectToString(e)||e instanceof Error},exports.isFunction=function(arg){return"function"==typeof arg},exports.isPrimitive=function(arg){return null===arg||"boolean"==typeof arg||"number"==typeof arg||"string"==typeof arg||"symbol"==typeof arg||void 0===arg},exports.isBuffer=Buffer.isBuffer}).call(this,{isBuffer:require("../../is-buffer/index.js")})},{"../../is-buffer/index.js":22}],15:[function(require,module,exports){(function(Buffer){"use strict";var inherits=require("inherits"),md5=require("./md5"),RIPEMD160=require("ripemd160"),sha=require("sha.js"),Base=require("cipher-base");function HashNoConstructor(hash){Base.call(this,"digest"),this._hash=hash,this.buffers=[]}function Hash(hash){Base.call(this,"digest"),this._hash=hash}inherits(HashNoConstructor,Base),HashNoConstructor.prototype._update=function(data){this.buffers.push(data)},HashNoConstructor.prototype._final=function(){var buf=Buffer.concat(this.buffers),r=this._hash(buf);return this.buffers=null,r},inherits(Hash,Base),Hash.prototype._update=function(data){this._hash.update(data)},Hash.prototype._final=function(){return this._hash.digest()},module.exports=function(alg){return"md5"===(alg=alg.toLowerCase())?new HashNoConstructor(md5):new Hash("rmd160"===alg||"ripemd160"===alg?new RIPEMD160:sha(alg))}}).call(this,require("buffer").Buffer)},{"./md5":17,buffer:8,"cipher-base":13,inherits:21,ripemd160:39,"sha.js":42}],16:[function(require,module,exports){(function(Buffer){"use strict";var intSize=4,zeroBuffer=new Buffer(intSize);zeroBuffer.fill(0);module.exports=function(buf,fn){var arr=fn(function(buf){if(buf.length%intSize!=0){var len=buf.length+(intSize-buf.length%intSize);buf=Buffer.concat([buf,zeroBuffer],len)}for(var arr=new Array(buf.length>>>2),i=0,j=0;i<buf.length;i+=intSize,j++)arr[j]=buf.readInt32LE(i);return arr}(buf),8*buf.length);buf=new Buffer(16);for(var i=0;i<arr.length;i++)buf.writeInt32LE(arr[i],i<<2,!0);return buf}}).call(this,require("buffer").Buffer)},{buffer:8}],17:[function(require,module,exports){"use strict";var makeHash=require("./make-hash");function core_md5(x,len){x[len>>5]|=128<<len%32,x[14+(len+64>>>9<<4)]=len;for(var a=1732584193,b=-271733879,c=-1732584194,d=271733878,i=0;i<x.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d;b=md5_ii(b=md5_ii(b=md5_ii(b=md5_ii(b=md5_hh(b=md5_hh(b=md5_hh(b=md5_hh(b=md5_gg(b=md5_gg(b=md5_gg(b=md5_gg(b=md5_ff(b=md5_ff(b=md5_ff(b=md5_ff(b,c=md5_ff(c,d=md5_ff(d,a=md5_ff(a,b,c,d,x[i+0],7,-680876936),b,c,x[i+1],12,-389564586),a,b,x[i+2],17,606105819),d,a,x[i+3],22,-1044525330),c=md5_ff(c,d=md5_ff(d,a=md5_ff(a,b,c,d,x[i+4],7,-176418897),b,c,x[i+5],12,1200080426),a,b,x[i+6],17,-1473231341),d,a,x[i+7],22,-45705983),c=md5_ff(c,d=md5_ff(d,a=md5_ff(a,b,c,d,x[i+8],7,1770035416),b,c,x[i+9],12,-1958414417),a,b,x[i+10],17,-42063),d,a,x[i+11],22,-1990404162),c=md5_ff(c,d=md5_ff(d,a=md5_ff(a,b,c,d,x[i+12],7,1804603682),b,c,x[i+13],12,-40341101),a,b,x[i+14],17,-1502002290),d,a,x[i+15],22,1236535329),c=md5_gg(c,d=md5_gg(d,a=md5_gg(a,b,c,d,x[i+1],5,-165796510),b,c,x[i+6],9,-1069501632),a,b,x[i+11],14,643717713),d,a,x[i+0],20,-373897302),c=md5_gg(c,d=md5_gg(d,a=md5_gg(a,b,c,d,x[i+5],5,-701558691),b,c,x[i+10],9,38016083),a,b,x[i+15],14,-660478335),d,a,x[i+4],20,-405537848),c=md5_gg(c,d=md5_gg(d,a=md5_gg(a,b,c,d,x[i+9],5,568446438),b,c,x[i+14],9,-1019803690),a,b,x[i+3],14,-187363961),d,a,x[i+8],20,1163531501),c=md5_gg(c,d=md5_gg(d,a=md5_gg(a,b,c,d,x[i+13],5,-1444681467),b,c,x[i+2],9,-51403784),a,b,x[i+7],14,1735328473),d,a,x[i+12],20,-1926607734),c=md5_hh(c,d=md5_hh(d,a=md5_hh(a,b,c,d,x[i+5],4,-378558),b,c,x[i+8],11,-2022574463),a,b,x[i+11],16,1839030562),d,a,x[i+14],23,-35309556),c=md5_hh(c,d=md5_hh(d,a=md5_hh(a,b,c,d,x[i+1],4,-1530992060),b,c,x[i+4],11,1272893353),a,b,x[i+7],16,-155497632),d,a,x[i+10],23,-1094730640),c=md5_hh(c,d=md5_hh(d,a=md5_hh(a,b,c,d,x[i+13],4,681279174),b,c,x[i+0],11,-358537222),a,b,x[i+3],16,-722521979),d,a,x[i+6],23,76029189),c=md5_hh(c,d=md5_hh(d,a=md5_hh(a,b,c,d,x[i+9],4,-640364487),b,c,x[i+12],11,-421815835),a,b,x[i+15],16,530742520),d,a,x[i+2],23,-995338651),c=md5_ii(c,d=md5_ii(d,a=md5_ii(a,b,c,d,x[i+0],6,-198630844),b,c,x[i+7],10,1126891415),a,b,x[i+14],15,-1416354905),d,a,x[i+5],21,-57434055),c=md5_ii(c,d=md5_ii(d,a=md5_ii(a,b,c,d,x[i+12],6,1700485571),b,c,x[i+3],10,-1894986606),a,b,x[i+10],15,-1051523),d,a,x[i+1],21,-2054922799),c=md5_ii(c,d=md5_ii(d,a=md5_ii(a,b,c,d,x[i+8],6,1873313359),b,c,x[i+15],10,-30611744),a,b,x[i+6],15,-1560198380),d,a,x[i+13],21,1309151649),c=md5_ii(c,d=md5_ii(d,a=md5_ii(a,b,c,d,x[i+4],6,-145523070),b,c,x[i+11],10,-1120210379),a,b,x[i+2],15,718787259),d,a,x[i+9],21,-343485551),a=safe_add(a,olda),b=safe_add(b,oldb),c=safe_add(c,oldc),d=safe_add(d,oldd)}return[a,b,c,d]}function md5_cmn(q,a,b,x,s,t){return safe_add((num=safe_add(safe_add(a,q),safe_add(x,t)))<<(cnt=s)|num>>>32-cnt,b);var num,cnt}function md5_ff(a,b,c,d,x,s,t){return md5_cmn(b&c|~b&d,a,b,x,s,t)}function md5_gg(a,b,c,d,x,s,t){return md5_cmn(b&d|c&~d,a,b,x,s,t)}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|~d),a,b,x,s,t)}function safe_add(x,y){var lsw=(65535&x)+(65535&y);return(x>>16)+(y>>16)+(lsw>>16)<<16|65535&lsw}module.exports=function(buf){return makeHash(buf,core_md5)}},{"./make-hash":16}],18:[function(require,module,exports){function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(arg){return"function"==typeof arg}function isObject(arg){return"object"==typeof arg&&null!==arg}function isUndefined(arg){return void 0===arg}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(n){if("number"!=typeof n||n<0||isNaN(n))throw TypeError("n must be a positive number");return this._maxListeners=n,this},EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(this._events||(this._events={}),"error"===type&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if((er=arguments[1])instanceof Error)throw er;var err=new Error('Uncaught, unspecified "error" event. ('+er+")");throw err.context=er,err}if(isUndefined(handler=this._events[type]))return!1;if(isFunction(handler))switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:args=Array.prototype.slice.call(arguments,1),handler.apply(this,args)}else if(isObject(handler))for(args=Array.prototype.slice.call(arguments,1),len=(listeners=handler.slice()).length,i=0;i<len;i++)listeners[i].apply(this,args);return!0},EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener),this._events[type]?isObject(this._events[type])?this._events[type].push(listener):this._events[type]=[this._events[type],listener]:this._events[type]=listener,isObject(this._events[type])&&!this._events[type].warned&&(m=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners)&&m>0&&this._events[type].length>m&&(this._events[type].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[type].length),"function"==typeof console.trace&&console.trace()),this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError("listener must be a function");var fired=!1;function g(){this.removeListener(type,g),fired||(fired=!0,listener.apply(this,arguments))}return g.listener=listener,this.on(type,g),this},EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;if(length=(list=this._events[type]).length,position=-1,list===listener||isFunction(list.listener)&&list.listener===listener)delete this._events[type],this._events.removeListener&&this.emit("removeListener",type,listener);else if(isObject(list)){for(i=length;i-- >0;)if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}if(position<0)return this;1===list.length?(list.length=0,delete this._events[type]):list.splice(position,1),this._events.removeListener&&this.emit("removeListener",type,listener)}return this},EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[type]&&delete this._events[type],this;if(0===arguments.length){for(key in this._events)"removeListener"!==key&&this.removeAllListeners(key);return this.removeAllListeners("removeListener"),this._events={},this}if(isFunction(listeners=this._events[type]))this.removeListener(type,listeners);else if(listeners)for(;listeners.length;)this.removeListener(type,listeners[listeners.length-1]);return delete this._events[type],this},EventEmitter.prototype.listeners=function(type){return this._events&&this._events[type]?isFunction(this._events[type])?[this._events[type]]:this._events[type].slice():[]},EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;if(evlistener)return evlistener.length}return 0},EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type)}},{}],19:[function(require,module,exports){(function(Buffer){"use strict";var Transform=require("stream").Transform;function HashBase(blockSize){Transform.call(this),this._block=new Buffer(blockSize),this._blockSize=blockSize,this._blockOffset=0,this._length=[0,0,0,0],this._finalized=!1}require("inherits")(HashBase,Transform),HashBase.prototype._transform=function(chunk,encoding,callback){var error=null;try{"buffer"!==encoding&&(chunk=new Buffer(chunk,encoding)),this.update(chunk)}catch(err){error=err}callback(error)},HashBase.prototype._flush=function(callback){var error=null;try{this.push(this._digest())}catch(err){error=err}callback(error)},HashBase.prototype.update=function(data,encoding){if(!Buffer.isBuffer(data)&&"string"!=typeof data)throw new TypeError("Data must be a string or a buffer");if(this._finalized)throw new Error("Digest already called");Buffer.isBuffer(data)||(data=new Buffer(data,encoding||"binary"));for(var block=this._block,offset=0;this._blockOffset+data.length-offset>=this._blockSize;){for(var i=this._blockOffset;i<this._blockSize;)block[i++]=data[offset++];this._update(),this._blockOffset=0}for(;offset<data.length;)block[this._blockOffset++]=data[offset++];for(var j=0,carry=8*data.length;carry>0;++j)this._length[j]+=carry,(carry=this._length[j]/4294967296|0)>0&&(this._length[j]-=4294967296*carry);return this},HashBase.prototype._update=function(data){throw new Error("_update is not implemented")},HashBase.prototype.digest=function(encoding){if(this._finalized)throw new Error("Digest already called");this._finalized=!0;var digest=this._digest();return void 0!==encoding&&(digest=digest.toString(encoding)),digest},HashBase.prototype._digest=function(){throw new Error("_digest is not implemented")},module.exports=HashBase}).call(this,require("buffer").Buffer)},{buffer:8,inherits:21,stream:49}],20:[function(require,module,exports){exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m,eLen=8*nBytes-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,nBits=-7,i=isLE?nBytes-1:0,d=isLE?-1:1,s=buffer[offset+i];for(i+=d,e=s&(1<<-nBits)-1,s>>=-nBits,nBits+=eLen;nBits>0;e=256*e+buffer[offset+i],i+=d,nBits-=8);for(m=e&(1<<-nBits)-1,e>>=-nBits,nBits+=mLen;nBits>0;m=256*m+buffer[offset+i],i+=d,nBits-=8);if(0===e)e=1-eBias;else{if(e===eMax)return m?NaN:1/0*(s?-1:1);m+=Math.pow(2,mLen),e-=eBias}return(s?-1:1)*m*Math.pow(2,e-mLen)},exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c,eLen=8*nBytes-mLen-1,eMax=(1<<eLen)-1,eBias=eMax>>1,rt=23===mLen?Math.pow(2,-24)-Math.pow(2,-77):0,i=isLE?0:nBytes-1,d=isLE?1:-1,s=value<0||0===value&&1/value<0?1:0;for(value=Math.abs(value),isNaN(value)||value===1/0?(m=isNaN(value)?1:0,e=eMax):(e=Math.floor(Math.log(value)/Math.LN2),value*(c=Math.pow(2,-e))<1&&(e--,c*=2),(value+=e+eBias>=1?rt/c:rt*Math.pow(2,1-eBias))*c>=2&&(e++,c/=2),e+eBias>=eMax?(m=0,e=eMax):e+eBias>=1?(m=(value*c-1)*Math.pow(2,mLen),e+=eBias):(m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen),e=0));mLen>=8;buffer[offset+i]=255&m,i+=d,m/=256,mLen-=8);for(e=e<<mLen|m,eLen+=mLen;eLen>0;buffer[offset+i]=255&e,i+=d,e/=256,eLen-=8);buffer[offset+i-d]|=128*s}},{}],21:[function(require,module,exports){"function"==typeof Object.create?module.exports=function(ctor,superCtor){ctor.super_=superCtor,ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function(){};TempCtor.prototype=superCtor.prototype,ctor.prototype=new TempCtor,ctor.prototype.constructor=ctor}},{}],22:[function(require,module,exports){function isBuffer(obj){return!!obj.constructor&&"function"==typeof obj.constructor.isBuffer&&obj.constructor.isBuffer(obj)}module.exports=function(obj){return null!=obj&&(isBuffer(obj)||function(obj){return"function"==typeof obj.readFloatLE&&"function"==typeof obj.slice&&isBuffer(obj.slice(0,0))}(obj)||!!obj._isBuffer)}},{}],23:[function(require,module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return"[object Array]"==toString.call(arr)}},{}],24:[function(require,module,exports){(function(process){"use strict";!process.version||0===process.version.indexOf("v0.")||0===process.version.indexOf("v1.")&&0!==process.version.indexOf("v1.8.")?module.exports=function(fn,arg1,arg2,arg3){if("function"!=typeof fn)throw new TypeError('"callback" argument must be a function');var args,i,len=arguments.length;switch(len){case 0:case 1:return process.nextTick(fn);case 2:return process.nextTick(function(){fn.call(null,arg1)});case 3:return process.nextTick(function(){fn.call(null,arg1,arg2)});case 4:return process.nextTick(function(){fn.call(null,arg1,arg2,arg3)});default:for(args=new Array(len-1),i=0;i<args.length;)args[i++]=arguments[i];return process.nextTick(function(){fn.apply(null,args)})}}:module.exports=process.nextTick}).call(this,require("_process"))},{_process:25}],25:[function(require,module,exports){var cachedSetTimeout,cachedClearTimeout,process=module.exports={};function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(fun){if(cachedSetTimeout===setTimeout)return setTimeout(fun,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(fun,0);try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var currentQueue,queue=[],draining=!1,queueIndex=-1;function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var timeout=runTimeout(cleanUpNextTick);draining=!0;for(var len=queue.length;len;){for(currentQueue=queue,queue=[];++queueIndex<len;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,len=queue.length}currentQueue=null,draining=!1,function(marker){if(cachedClearTimeout===clearTimeout)return clearTimeout(marker);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(marker);try{cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}(timeout)}}function Item(fun,array){this.fun=fun,this.array=array}function noop(){}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)args[i-1]=arguments[i];queue.push(new Item(fun,args)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(name){return[]},process.binding=function(name){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(dir){throw new Error("process.chdir is not supported")},process.umask=function(){return 0}},{}],26:[function(require,module,exports){module.exports=require("./lib/_stream_duplex.js")},{"./lib/_stream_duplex.js":27}],27:[function(require,module,exports){"use strict";var processNextTick=require("process-nextick-args"),objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj)keys.push(key);return keys};module.exports=Duplex;var util=require("core-util-is");util.inherits=require("inherits");var Readable=require("./_stream_readable"),Writable=require("./_stream_writable");util.inherits(Duplex,Readable);for(var keys=objectKeys(Writable.prototype),v=0;v<keys.length;v++){var method=keys[v];Duplex.prototype[method]||(Duplex.prototype[method]=Writable.prototype[method])}function Duplex(options){if(!(this instanceof Duplex))return new Duplex(options);Readable.call(this,options),Writable.call(this,options),options&&!1===options.readable&&(this.readable=!1),options&&!1===options.writable&&(this.writable=!1),this.allowHalfOpen=!0,options&&!1===options.allowHalfOpen&&(this.allowHalfOpen=!1),this.once("end",onend)}function onend(){this.allowHalfOpen||this._writableState.ended||processNextTick(onEndNT,this)}function onEndNT(self){self.end()}Object.defineProperty(Duplex.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed&&this._writableState.destroyed)},set:function(value){void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed=value,this._writableState.destroyed=value)}}),Duplex.prototype._destroy=function(err,cb){this.push(null),this.end(),processNextTick(cb,err)}},{"./_stream_readable":29,"./_stream_writable":31,"core-util-is":14,inherits:21,"process-nextick-args":24}],28:[function(require,module,exports){"use strict";module.exports=PassThrough;var Transform=require("./_stream_transform"),util=require("core-util-is");function PassThrough(options){if(!(this instanceof PassThrough))return new PassThrough(options);Transform.call(this,options)}util.inherits=require("inherits"),util.inherits(PassThrough,Transform),PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk)}},{"./_stream_transform":30,"core-util-is":14,inherits:21}],29:[function(require,module,exports){(function(process,global){"use strict";var processNextTick=require("process-nextick-args");module.exports=Readable;var Duplex,isArray=require("isarray");Readable.ReadableState=ReadableState;require("events").EventEmitter;var EElistenerCount=function(emitter,type){return emitter.listeners(type).length},Stream=require("./internal/streams/stream"),Buffer=require("safe-buffer").Buffer,OurUint8Array=global.Uint8Array||function(){};var util=require("core-util-is");util.inherits=require("inherits");var debugUtil=require("util"),debug=void 0;debug=debugUtil&&debugUtil.debuglog?debugUtil.debuglog("stream"):function(){};var StringDecoder,BufferList=require("./internal/streams/BufferList"),destroyImpl=require("./internal/streams/destroy");util.inherits(Readable,Stream);var kProxyEvents=["error","close","destroy","pause","resume"];function ReadableState(options,stream){Duplex=Duplex||require("./_stream_duplex"),options=options||{},this.objectMode=!!options.objectMode,stream instanceof Duplex&&(this.objectMode=this.objectMode||!!options.readableObjectMode);var hwm=options.highWaterMark,defaultHwm=this.objectMode?16:16384;this.highWaterMark=hwm||0===hwm?hwm:defaultHwm,this.highWaterMark=Math.floor(this.highWaterMark),this.buffer=new BufferList,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.destroyed=!1,this.defaultEncoding=options.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,options.encoding&&(StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this.decoder=new StringDecoder(options.encoding),this.encoding=options.encoding)}function Readable(options){if(Duplex=Duplex||require("./_stream_duplex"),!(this instanceof Readable))return new Readable(options);this._readableState=new ReadableState(options,this),this.readable=!0,options&&("function"==typeof options.read&&(this._read=options.read),"function"==typeof options.destroy&&(this._destroy=options.destroy)),Stream.call(this)}function readableAddChunk(stream,chunk,encoding,addToFront,skipChunkCheck){var er,state=stream._readableState;null===chunk?(state.reading=!1,function(stream,state){if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();chunk&&chunk.length&&(state.buffer.push(chunk),state.length+=state.objectMode?1:chunk.length)}state.ended=!0,emitReadable(stream)}(stream,state)):(skipChunkCheck||(er=function(state,chunk){var er;obj=chunk,Buffer.isBuffer(obj)||obj instanceof OurUint8Array||"string"==typeof chunk||void 0===chunk||state.objectMode||(er=new TypeError("Invalid non-string/buffer chunk"));var obj;return er}(state,chunk)),er?stream.emit("error",er):state.objectMode||chunk&&chunk.length>0?("string"==typeof chunk||state.objectMode||Object.getPrototypeOf(chunk)===Buffer.prototype||(chunk=function(chunk){return Buffer.from(chunk)}(chunk)),addToFront?state.endEmitted?stream.emit("error",new Error("stream.unshift() after end event")):addChunk(stream,state,chunk,!0):state.ended?stream.emit("error",new Error("stream.push() after EOF")):(state.reading=!1,state.decoder&&!encoding?(chunk=state.decoder.write(chunk),state.objectMode||0!==chunk.length?addChunk(stream,state,chunk,!1):maybeReadMore(stream,state)):addChunk(stream,state,chunk,!1))):addToFront||(state.reading=!1));return function(state){return!state.ended&&(state.needReadable||state.length<state.highWaterMark||0===state.length)}(state)}function addChunk(stream,state,chunk,addToFront){state.flowing&&0===state.length&&!state.sync?(stream.emit("data",chunk),stream.read(0)):(state.length+=state.objectMode?1:chunk.length,addToFront?state.buffer.unshift(chunk):state.buffer.push(chunk),state.needReadable&&emitReadable(stream)),maybeReadMore(stream,state)}Object.defineProperty(Readable.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&this._readableState.destroyed},set:function(value){this._readableState&&(this._readableState.destroyed=value)}}),Readable.prototype.destroy=destroyImpl.destroy,Readable.prototype._undestroy=destroyImpl.undestroy,Readable.prototype._destroy=function(err,cb){this.push(null),cb(err)},Readable.prototype.push=function(chunk,encoding){var skipChunkCheck,state=this._readableState;return state.objectMode?skipChunkCheck=!0:"string"==typeof chunk&&((encoding=encoding||state.defaultEncoding)!==state.encoding&&(chunk=Buffer.from(chunk,encoding),encoding=""),skipChunkCheck=!0),readableAddChunk(this,chunk,encoding,!1,skipChunkCheck)},Readable.prototype.unshift=function(chunk){return readableAddChunk(this,chunk,null,!0,!1)},Readable.prototype.isPaused=function(){return!1===this._readableState.flowing},Readable.prototype.setEncoding=function(enc){return StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this._readableState.decoder=new StringDecoder(enc),this._readableState.encoding=enc,this};var MAX_HWM=8388608;function howMuchToRead(n,state){return n<=0||0===state.length&&state.ended?0:state.objectMode?1:n!=n?state.flowing&&state.length?state.buffer.head.data.length:state.length:(n>state.highWaterMark&&(state.highWaterMark=function(n){return n>=MAX_HWM?n=MAX_HWM:(n--,n|=n>>>1,n|=n>>>2,n|=n>>>4,n|=n>>>8,n|=n>>>16,n++),n}(n)),n<=state.length?n:state.ended?state.length:(state.needReadable=!0,0))}function emitReadable(stream){var state=stream._readableState;state.needReadable=!1,state.emittedReadable||(debug("emitReadable",state.flowing),state.emittedReadable=!0,state.sync?processNextTick(emitReadable_,stream):emitReadable_(stream))}function emitReadable_(stream){debug("emit readable"),stream.emit("readable"),flow(stream)}function maybeReadMore(stream,state){state.readingMore||(state.readingMore=!0,processNextTick(maybeReadMore_,stream,state))}function maybeReadMore_(stream,state){for(var len=state.length;!state.reading&&!state.flowing&&!state.ended&&state.length<state.highWaterMark&&(debug("maybeReadMore read 0"),stream.read(0),len!==state.length);)len=state.length;state.readingMore=!1}function nReadingNextTick(self){debug("readable nexttick read 0"),self.read(0)}function resume_(stream,state){state.reading||(debug("resume read 0"),stream.read(0)),state.resumeScheduled=!1,state.awaitDrain=0,stream.emit("resume"),flow(stream),state.flowing&&!state.reading&&stream.read(0)}function flow(stream){var state=stream._readableState;for(debug("flow",state.flowing);state.flowing&&null!==stream.read(););}function fromList(n,state){return 0===state.length?null:(state.objectMode?ret=state.buffer.shift():!n||n>=state.length?(ret=state.decoder?state.buffer.join(""):1===state.buffer.length?state.buffer.head.data:state.buffer.concat(state.length),state.buffer.clear()):ret=function(n,list,hasStrings){var ret;n<list.head.data.length?(ret=list.head.data.slice(0,n),list.head.data=list.head.data.slice(n)):ret=n===list.head.data.length?list.shift():hasStrings?function(n,list){var p=list.head,c=1,ret=p.data;n-=ret.length;for(;p=p.next;){var str=p.data,nb=n>str.length?str.length:n;if(nb===str.length?ret+=str:ret+=str.slice(0,n),0===(n-=nb)){nb===str.length?(++c,p.next?list.head=p.next:list.head=list.tail=null):(list.head=p,p.data=str.slice(nb));break}++c}return list.length-=c,ret}(n,list):function(n,list){var ret=Buffer.allocUnsafe(n),p=list.head,c=1;p.data.copy(ret),n-=p.data.length;for(;p=p.next;){var buf=p.data,nb=n>buf.length?buf.length:n;if(buf.copy(ret,ret.length-n,0,nb),0===(n-=nb)){nb===buf.length?(++c,p.next?list.head=p.next:list.head=list.tail=null):(list.head=p,p.data=buf.slice(nb));break}++c}return list.length-=c,ret}(n,list);return ret}(n,state.buffer,state.decoder),ret);var ret}function endReadable(stream){var state=stream._readableState;if(state.length>0)throw new Error('"endReadable()" called on non-empty stream');state.endEmitted||(state.ended=!0,processNextTick(endReadableNT,state,stream))}function endReadableNT(state,stream){state.endEmitted||0!==state.length||(state.endEmitted=!0,stream.readable=!1,stream.emit("end"))}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++)if(xs[i]===x)return i;return-1}Readable.prototype.read=function(n){debug("read",n),n=parseInt(n,10);var state=this._readableState,nOrig=n;if(0!==n&&(state.emittedReadable=!1),0===n&&state.needReadable&&(state.length>=state.highWaterMark||state.ended))return debug("read: emitReadable",state.length,state.ended),0===state.length&&state.ended?endReadable(this):emitReadable(this),null;if(0===(n=howMuchToRead(n,state))&&state.ended)return 0===state.length&&endReadable(this),null;var ret,doRead=state.needReadable;return debug("need readable",doRead),(0===state.length||state.length-n<state.highWaterMark)&&debug("length less than watermark",doRead=!0),state.ended||state.reading?debug("reading or ended",doRead=!1):doRead&&(debug("do read"),state.reading=!0,state.sync=!0,0===state.length&&(state.needReadable=!0),this._read(state.highWaterMark),state.sync=!1,state.reading||(n=howMuchToRead(nOrig,state))),null===(ret=n>0?fromList(n,state):null)?(state.needReadable=!0,n=0):state.length-=n,0===state.length&&(state.ended||(state.needReadable=!0),nOrig!==n&&state.ended&&endReadable(this)),null!==ret&&this.emit("data",ret),ret},Readable.prototype._read=function(n){this.emit("error",new Error("_read() is not implemented"))},Readable.prototype.pipe=function(dest,pipeOpts){var src=this,state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest)}state.pipesCount+=1,debug("pipe count=%d opts=%j",state.pipesCount,pipeOpts);var endFn=(!pipeOpts||!1!==pipeOpts.end)&&dest!==process.stdout&&dest!==process.stderr?onend:unpipe;function onunpipe(readable,unpipeInfo){debug("onunpipe"),readable===src&&unpipeInfo&&!1===unpipeInfo.hasUnpiped&&(unpipeInfo.hasUnpiped=!0,debug("cleanup"),dest.removeListener("close",onclose),dest.removeListener("finish",onfinish),dest.removeListener("drain",ondrain),dest.removeListener("error",onerror),dest.removeListener("unpipe",onunpipe),src.removeListener("end",onend),src.removeListener("end",unpipe),src.removeListener("data",ondata),cleanedUp=!0,!state.awaitDrain||dest._writableState&&!dest._writableState.needDrain||ondrain())}function onend(){debug("onend"),dest.end()}state.endEmitted?processNextTick(endFn):src.once("end",endFn),dest.on("unpipe",onunpipe);var ondrain=function(src){return function(){var state=src._readableState;debug("pipeOnDrain",state.awaitDrain),state.awaitDrain&&state.awaitDrain--,0===state.awaitDrain&&EElistenerCount(src,"data")&&(state.flowing=!0,flow(src))}}(src);dest.on("drain",ondrain);var cleanedUp=!1;var increasedAwaitDrain=!1;function ondata(chunk){debug("ondata"),increasedAwaitDrain=!1,!1!==dest.write(chunk)||increasedAwaitDrain||((1===state.pipesCount&&state.pipes===dest||state.pipesCount>1&&-1!==indexOf(state.pipes,dest))&&!cleanedUp&&(debug("false write response, pause",src._readableState.awaitDrain),src._readableState.awaitDrain++,increasedAwaitDrain=!0),src.pause())}function onerror(er){debug("onerror",er),unpipe(),dest.removeListener("error",onerror),0===EElistenerCount(dest,"error")&&dest.emit("error",er)}function onclose(){dest.removeListener("finish",onfinish),unpipe()}function onfinish(){debug("onfinish"),dest.removeListener("close",onclose),unpipe()}function unpipe(){debug("unpipe"),src.unpipe(dest)}return src.on("data",ondata),function(emitter,event,fn){if("function"==typeof emitter.prependListener)return emitter.prependListener(event,fn);emitter._events&&emitter._events[event]?isArray(emitter._events[event])?emitter._events[event].unshift(fn):emitter._events[event]=[fn,emitter._events[event]]:emitter.on(event,fn)}(dest,"error",onerror),dest.once("close",onclose),dest.once("finish",onfinish),dest.emit("pipe",src),state.flowing||(debug("pipe resume"),src.resume()),dest},Readable.prototype.unpipe=function(dest){var state=this._readableState,unpipeInfo={hasUnpiped:!1};if(0===state.pipesCount)return this;if(1===state.pipesCount)return dest&&dest!==state.pipes?this:(dest||(dest=state.pipes),state.pipes=null,state.pipesCount=0,state.flowing=!1,dest&&dest.emit("unpipe",this,unpipeInfo),this);if(!dest){var dests=state.pipes,len=state.pipesCount;state.pipes=null,state.pipesCount=0,state.flowing=!1;for(var i=0;i<len;i++)dests[i].emit("unpipe",this,unpipeInfo);return this}var index=indexOf(state.pipes,dest);return-1===index?this:(state.pipes.splice(index,1),state.pipesCount-=1,1===state.pipesCount&&(state.pipes=state.pipes[0]),dest.emit("unpipe",this,unpipeInfo),this)},Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);if("data"===ev)!1!==this._readableState.flowing&&this.resume();else if("readable"===ev){var state=this._readableState;state.endEmitted||state.readableListening||(state.readableListening=state.needReadable=!0,state.emittedReadable=!1,state.reading?state.length&&emitReadable(this):processNextTick(nReadingNextTick,this))}return res},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.resume=function(){var state=this._readableState;return state.flowing||(debug("resume"),state.flowing=!0,function(stream,state){state.resumeScheduled||(state.resumeScheduled=!0,processNextTick(resume_,stream,state))}(this,state)),this},Readable.prototype.pause=function(){return debug("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(debug("pause"),this._readableState.flowing=!1,this.emit("pause")),this},Readable.prototype.wrap=function(stream){var state=this._readableState,paused=!1,self=this;stream.on("end",function(){if(debug("wrapped end"),state.decoder&&!state.ended){var chunk=state.decoder.end();chunk&&chunk.length&&self.push(chunk)}self.push(null)}),stream.on("data",function(chunk){(debug("wrapped data"),state.decoder&&(chunk=state.decoder.write(chunk)),!state.objectMode||null!==chunk&&void 0!==chunk)&&((state.objectMode||chunk&&chunk.length)&&(self.push(chunk)||(paused=!0,stream.pause())))});for(var i in stream)void 0===this[i]&&"function"==typeof stream[i]&&(this[i]=function(method){return function(){return stream[method].apply(stream,arguments)}}(i));for(var n=0;n<kProxyEvents.length;n++)stream.on(kProxyEvents[n],self.emit.bind(self,kProxyEvents[n]));return self._read=function(n){debug("wrapped _read",n),paused&&(paused=!1,stream.resume())},self},Readable._fromList=fromList}).call(this,require("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./_stream_duplex":27,"./internal/streams/BufferList":32,"./internal/streams/destroy":33,"./internal/streams/stream":34,_process:25,"core-util-is":14,events:18,inherits:21,isarray:23,"process-nextick-args":24,"safe-buffer":40,"string_decoder/":50,util:4}],30:[function(require,module,exports){"use strict";module.exports=Transform;var Duplex=require("./_stream_duplex"),util=require("core-util-is");function TransformState(stream){this.afterTransform=function(er,data){return function(stream,er,data){var ts=stream._transformState;ts.transforming=!1;var cb=ts.writecb;if(!cb)return stream.emit("error",new Error("write callback called multiple times"));ts.writechunk=null,ts.writecb=null,null!==data&&void 0!==data&&stream.push(data);cb(er);var rs=stream._readableState;rs.reading=!1,(rs.needReadable||rs.length<rs.highWaterMark)&&stream._read(rs.highWaterMark)}(stream,er,data)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null,this.writeencoding=null}function Transform(options){if(!(this instanceof Transform))return new Transform(options);Duplex.call(this,options),this._transformState=new TransformState(this);var stream=this;this._readableState.needReadable=!0,this._readableState.sync=!1,options&&("function"==typeof options.transform&&(this._transform=options.transform),"function"==typeof options.flush&&(this._flush=options.flush)),this.once("prefinish",function(){"function"==typeof this._flush?this._flush(function(er,data){done(stream,er,data)}):done(stream)})}function done(stream,er,data){if(er)return stream.emit("error",er);null!==data&&void 0!==data&&stream.push(data);var ws=stream._writableState,ts=stream._transformState;if(ws.length)throw new Error("Calling transform done when ws.length != 0");if(ts.transforming)throw new Error("Calling transform done when still transforming");return stream.push(null)}util.inherits=require("inherits"),util.inherits(Transform,Duplex),Transform.prototype.push=function(chunk,encoding){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,chunk,encoding)},Transform.prototype._transform=function(chunk,encoding,cb){throw new Error("_transform() is not implemented")},Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;if(ts.writecb=cb,ts.writechunk=chunk,ts.writeencoding=encoding,!ts.transforming){var rs=this._readableState;(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)&&this._read(rs.highWaterMark)}},Transform.prototype._read=function(n){var ts=this._transformState;null!==ts.writechunk&&ts.writecb&&!ts.transforming?(ts.transforming=!0,this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform)):ts.needTransform=!0},Transform.prototype._destroy=function(err,cb){var _this=this;Duplex.prototype._destroy.call(this,err,function(err2){cb(err2),_this.emit("close")})}},{"./_stream_duplex":27,"core-util-is":14,inherits:21}],31:[function(require,module,exports){(function(process,global){"use strict";var processNextTick=require("process-nextick-args");function CorkedRequest(state){var _this=this;this.next=null,this.entry=null,this.finish=function(){!function(corkReq,state,err){var entry=corkReq.entry;corkReq.entry=null;for(;entry;){var cb=entry.callback;state.pendingcb--,cb(err),entry=entry.next}state.corkedRequestsFree?state.corkedRequestsFree.next=corkReq:state.corkedRequestsFree=corkReq}(_this,state)}}module.exports=Writable;var Duplex,asyncWrite=!process.browser&&["v0.10","v0.9."].indexOf(process.version.slice(0,5))>-1?setImmediate:processNextTick;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var internalUtil={deprecate:require("util-deprecate")},Stream=require("./internal/streams/stream"),Buffer=require("safe-buffer").Buffer,OurUint8Array=global.Uint8Array||function(){};var realHasInstance,destroyImpl=require("./internal/streams/destroy");function nop(){}function WritableState(options,stream){Duplex=Duplex||require("./_stream_duplex"),options=options||{},this.objectMode=!!options.objectMode,stream instanceof Duplex&&(this.objectMode=this.objectMode||!!options.writableObjectMode);var hwm=options.highWaterMark,defaultHwm=this.objectMode?16:16384;this.highWaterMark=hwm||0===hwm?hwm:defaultHwm,this.highWaterMark=Math.floor(this.highWaterMark),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var noDecode=!1===options.decodeStrings;this.decodeStrings=!noDecode,this.defaultEncoding=options.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(er){!function(stream,er){var state=stream._writableState,sync=state.sync,cb=state.writecb;if(function(state){state.writing=!1,state.writecb=null,state.length-=state.writelen,state.writelen=0}(state),er)!function(stream,state,sync,er,cb){--state.pendingcb,sync?(processNextTick(cb,er),processNextTick(finishMaybe,stream,state),stream._writableState.errorEmitted=!0,stream.emit("error",er)):(cb(er),stream._writableState.errorEmitted=!0,stream.emit("error",er),finishMaybe(stream,state))}(stream,state,sync,er,cb);else{var finished=needFinish(state);finished||state.corked||state.bufferProcessing||!state.bufferedRequest||clearBuffer(stream,state),sync?asyncWrite(afterWrite,stream,state,finished,cb):afterWrite(stream,state,finished,cb)}}(stream,er)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new CorkedRequest(this)}function Writable(options){if(Duplex=Duplex||require("./_stream_duplex"),!(realHasInstance.call(Writable,this)||this instanceof Duplex))return new Writable(options);this._writableState=new WritableState(options,this),this.writable=!0,options&&("function"==typeof options.write&&(this._write=options.write),"function"==typeof options.writev&&(this._writev=options.writev),"function"==typeof options.destroy&&(this._destroy=options.destroy),"function"==typeof options.final&&(this._final=options.final)),Stream.call(this)}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len,state.writecb=cb,state.writing=!0,state.sync=!0,writev?stream._writev(chunk,state.onwrite):stream._write(chunk,encoding,state.onwrite),state.sync=!1}function afterWrite(stream,state,finished,cb){finished||function(stream,state){0===state.length&&state.needDrain&&(state.needDrain=!1,stream.emit("drain"))}(stream,state),state.pendingcb--,cb(),finishMaybe(stream,state)}function clearBuffer(stream,state){state.bufferProcessing=!0;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){var l=state.bufferedRequestCount,buffer=new Array(l),holder=state.corkedRequestsFree;holder.entry=entry;for(var count=0,allBuffers=!0;entry;)buffer[count]=entry,entry.isBuf||(allBuffers=!1),entry=entry.next,count+=1;buffer.allBuffers=allBuffers,doWrite(stream,state,!0,state.length,buffer,"",holder.finish),state.pendingcb++,state.lastBufferedRequest=null,holder.next?(state.corkedRequestsFree=holder.next,holder.next=null):state.corkedRequestsFree=new CorkedRequest(state)}else{for(;entry;){var chunk=entry.chunk,encoding=entry.encoding,cb=entry.callback;if(doWrite(stream,state,!1,state.objectMode?1:chunk.length,chunk,encoding,cb),entry=entry.next,state.writing)break}null===entry&&(state.lastBufferedRequest=null)}state.bufferedRequestCount=0,state.bufferedRequest=entry,state.bufferProcessing=!1}function needFinish(state){return state.ending&&0===state.length&&null===state.bufferedRequest&&!state.finished&&!state.writing}function callFinal(stream,state){stream._final(function(err){state.pendingcb--,err&&stream.emit("error",err),state.prefinished=!0,stream.emit("prefinish"),finishMaybe(stream,state)})}function finishMaybe(stream,state){var need=needFinish(state);return need&&(!function(stream,state){state.prefinished||state.finalCalled||("function"==typeof stream._final?(state.pendingcb++,state.finalCalled=!0,processNextTick(callFinal,stream,state)):(state.prefinished=!0,stream.emit("prefinish")))}(stream,state),0===state.pendingcb&&(state.finished=!0,stream.emit("finish"))),need}util.inherits(Writable,Stream),WritableState.prototype.getBuffer=function(){for(var current=this.bufferedRequest,out=[];current;)out.push(current),current=current.next;return out},function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(_){}}(),"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(realHasInstance=Function.prototype[Symbol.hasInstance],Object.defineProperty(Writable,Symbol.hasInstance,{value:function(object){return!!realHasInstance.call(this,object)||object&&object._writableState instanceof WritableState}})):realHasInstance=function(object){return object instanceof this},Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},Writable.prototype.write=function(chunk,encoding,cb){var obj,state=this._writableState,ret=!1,isBuf=(obj=chunk,(Buffer.isBuffer(obj)||obj instanceof OurUint8Array)&&!state.objectMode);return isBuf&&!Buffer.isBuffer(chunk)&&(chunk=function(chunk){return Buffer.from(chunk)}(chunk)),"function"==typeof encoding&&(cb=encoding,encoding=null),isBuf?encoding="buffer":encoding||(encoding=state.defaultEncoding),"function"!=typeof cb&&(cb=nop),state.ended?function(stream,cb){var er=new Error("write after end");stream.emit("error",er),processNextTick(cb,er)}(this,cb):(isBuf||function(stream,state,chunk,cb){var valid=!0,er=!1;return null===chunk?er=new TypeError("May not write null values to stream"):"string"==typeof chunk||void 0===chunk||state.objectMode||(er=new TypeError("Invalid non-string/buffer chunk")),er&&(stream.emit("error",er),processNextTick(cb,er),valid=!1),valid}(this,state,chunk,cb))&&(state.pendingcb++,ret=function(stream,state,isBuf,chunk,encoding,cb){if(!isBuf){var newChunk=function(state,chunk,encoding){state.objectMode||!1===state.decodeStrings||"string"!=typeof chunk||(chunk=Buffer.from(chunk,encoding));return chunk}(state,chunk,encoding);chunk!==newChunk&&(isBuf=!0,encoding="buffer",chunk=newChunk)}var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;ret||(state.needDrain=!0);if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest={chunk:chunk,encoding:encoding,isBuf:isBuf,callback:cb,next:null},last?last.next=state.lastBufferedRequest:state.bufferedRequest=state.lastBufferedRequest,state.bufferedRequestCount+=1}else doWrite(stream,state,!1,len,chunk,encoding,cb);return ret}(this,state,isBuf,chunk,encoding,cb)),ret},Writable.prototype.cork=function(){this._writableState.corked++},Writable.prototype.uncork=function(){var state=this._writableState;state.corked&&(state.corked--,state.writing||state.corked||state.finished||state.bufferProcessing||!state.bufferedRequest||clearBuffer(this,state))},Writable.prototype.setDefaultEncoding=function(encoding){if("string"==typeof encoding&&(encoding=encoding.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((encoding+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+encoding);return this._writableState.defaultEncoding=encoding,this},Writable.prototype._write=function(chunk,encoding,cb){cb(new Error("_write() is not implemented"))},Writable.prototype._writev=null,Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;"function"==typeof chunk?(cb=chunk,chunk=null,encoding=null):"function"==typeof encoding&&(cb=encoding,encoding=null),null!==chunk&&void 0!==chunk&&this.write(chunk,encoding),state.corked&&(state.corked=1,this.uncork()),state.ending||state.finished||function(stream,state,cb){state.ending=!0,finishMaybe(stream,state),cb&&(state.finished?processNextTick(cb):stream.once("finish",cb));state.ended=!0,stream.writable=!1}(this,state,cb)},Object.defineProperty(Writable.prototype,"destroyed",{get:function(){return void 0!==this._writableState&&this._writableState.destroyed},set:function(value){this._writableState&&(this._writableState.destroyed=value)}}),Writable.prototype.destroy=destroyImpl.destroy,Writable.prototype._undestroy=destroyImpl.undestroy,Writable.prototype._destroy=function(err,cb){this.end(),cb(err)}}).call(this,require("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./_stream_duplex":27,"./internal/streams/destroy":33,"./internal/streams/stream":34,_process:25,"core-util-is":14,inherits:21,"process-nextick-args":24,"safe-buffer":40,"util-deprecate":51}],32:[function(require,module,exports){"use strict";var Buffer=require("safe-buffer").Buffer;module.exports=function(){function BufferList(){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,BufferList),this.head=null,this.tail=null,this.length=0}return BufferList.prototype.push=function(v){var entry={data:v,next:null};this.length>0?this.tail.next=entry:this.head=entry,this.tail=entry,++this.length},BufferList.prototype.unshift=function(v){var entry={data:v,next:this.head};0===this.length&&(this.tail=entry),this.head=entry,++this.length},BufferList.prototype.shift=function(){if(0!==this.length){var ret=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,ret}},BufferList.prototype.clear=function(){this.head=this.tail=null,this.length=0},BufferList.prototype.join=function(s){if(0===this.length)return"";for(var p=this.head,ret=""+p.data;p=p.next;)ret+=s+p.data;return ret},BufferList.prototype.concat=function(n){if(0===this.length)return Buffer.alloc(0);if(1===this.length)return this.head.data;for(var src,target,offset,ret=Buffer.allocUnsafe(n>>>0),p=this.head,i=0;p;)src=p.data,target=ret,offset=i,src.copy(target,offset),i+=p.data.length,p=p.next;return ret},BufferList}()},{"safe-buffer":40}],33:[function(require,module,exports){"use strict";var processNextTick=require("process-nextick-args");function emitErrorNT(self,err){self.emit("error",err)}module.exports={destroy:function(err,cb){var _this=this,readableDestroyed=this._readableState&&this._readableState.destroyed,writableDestroyed=this._writableState&&this._writableState.destroyed;readableDestroyed||writableDestroyed?cb?cb(err):!err||this._writableState&&this._writableState.errorEmitted||processNextTick(emitErrorNT,this,err):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(err||null,function(err){!cb&&err?(processNextTick(emitErrorNT,_this,err),_this._writableState&&(_this._writableState.errorEmitted=!0)):cb&&cb(err)}))},undestroy:function(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)}}},{"process-nextick-args":24}],34:[function(require,module,exports){module.exports=require("events").EventEmitter},{events:18}],35:[function(require,module,exports){module.exports=require("./readable").PassThrough},{"./readable":36}],36:[function(require,module,exports){(exports=module.exports=require("./lib/_stream_readable.js")).Stream=exports,exports.Readable=exports,exports.Writable=require("./lib/_stream_writable.js"),exports.Duplex=require("./lib/_stream_duplex.js"),exports.Transform=require("./lib/_stream_transform.js"),exports.PassThrough=require("./lib/_stream_passthrough.js")},{"./lib/_stream_duplex.js":27,"./lib/_stream_passthrough.js":28,"./lib/_stream_readable.js":29,"./lib/_stream_transform.js":30,"./lib/_stream_writable.js":31}],37:[function(require,module,exports){module.exports=require("./readable").Transform},{"./readable":36}],38:[function(require,module,exports){module.exports=require("./lib/_stream_writable.js")},{"./lib/_stream_writable.js":31}],39:[function(require,module,exports){(function(Buffer){"use strict";var inherits=require("inherits"),HashBase=require("hash-base");function RIPEMD160(){HashBase.call(this,64),this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520}function rotl(x,n){return x<<n|x>>>32-n}function fn1(a,b,c,d,e,m,k,s){return rotl(a+(b^c^d)+m+k|0,s)+e|0}function fn2(a,b,c,d,e,m,k,s){return rotl(a+(b&c|~b&d)+m+k|0,s)+e|0}function fn3(a,b,c,d,e,m,k,s){return rotl(a+((b|~c)^d)+m+k|0,s)+e|0}function fn4(a,b,c,d,e,m,k,s){return rotl(a+(b&d|c&~d)+m+k|0,s)+e|0}function fn5(a,b,c,d,e,m,k,s){return rotl(a+(b^(c|~d))+m+k|0,s)+e|0}inherits(RIPEMD160,HashBase),RIPEMD160.prototype._update=function(){for(var m=new Array(16),i=0;i<16;++i)m[i]=this._block.readInt32LE(4*i);var al=this._a,bl=this._b,cl=this._c,dl=this._d,el=this._e;el=fn1(el,al=fn1(al,bl,cl,dl,el,m[0],0,11),bl,cl=rotl(cl,10),dl,m[1],0,14),bl=fn1(bl=rotl(bl,10),cl=fn1(cl,dl=fn1(dl,el,al,bl,cl,m[2],0,15),el,al=rotl(al,10),bl,m[3],0,12),dl,el=rotl(el,10),al,m[4],0,5),dl=fn1(dl=rotl(dl,10),el=fn1(el,al=fn1(al,bl,cl,dl,el,m[5],0,8),bl,cl=rotl(cl,10),dl,m[6],0,7),al,bl=rotl(bl,10),cl,m[7],0,9),al=fn1(al=rotl(al,10),bl=fn1(bl,cl=fn1(cl,dl,el,al,bl,m[8],0,11),dl,el=rotl(el,10),al,m[9],0,13),cl,dl=rotl(dl,10),el,m[10],0,14),cl=fn1(cl=rotl(cl,10),dl=fn1(dl,el=fn1(el,al,bl,cl,dl,m[11],0,15),al,bl=rotl(bl,10),cl,m[12],0,6),el,al=rotl(al,10),bl,m[13],0,7),el=fn2(el=rotl(el,10),al=fn1(al,bl=fn1(bl,cl,dl,el,al,m[14],0,9),cl,dl=rotl(dl,10),el,m[15],0,8),bl,cl=rotl(cl,10),dl,m[7],1518500249,7),bl=fn2(bl=rotl(bl,10),cl=fn2(cl,dl=fn2(dl,el,al,bl,cl,m[4],1518500249,6),el,al=rotl(al,10),bl,m[13],1518500249,8),dl,el=rotl(el,10),al,m[1],1518500249,13),dl=fn2(dl=rotl(dl,10),el=fn2(el,al=fn2(al,bl,cl,dl,el,m[10],1518500249,11),bl,cl=rotl(cl,10),dl,m[6],1518500249,9),al,bl=rotl(bl,10),cl,m[15],1518500249,7),al=fn2(al=rotl(al,10),bl=fn2(bl,cl=fn2(cl,dl,el,al,bl,m[3],1518500249,15),dl,el=rotl(el,10),al,m[12],1518500249,7),cl,dl=rotl(dl,10),el,m[0],1518500249,12),cl=fn2(cl=rotl(cl,10),dl=fn2(dl,el=fn2(el,al,bl,cl,dl,m[9],1518500249,15),al,bl=rotl(bl,10),cl,m[5],1518500249,9),el,al=rotl(al,10),bl,m[2],1518500249,11),el=fn2(el=rotl(el,10),al=fn2(al,bl=fn2(bl,cl,dl,el,al,m[14],1518500249,7),cl,dl=rotl(dl,10),el,m[11],1518500249,13),bl,cl=rotl(cl,10),dl,m[8],1518500249,12),bl=fn3(bl=rotl(bl,10),cl=fn3(cl,dl=fn3(dl,el,al,bl,cl,m[3],1859775393,11),el,al=rotl(al,10),bl,m[10],1859775393,13),dl,el=rotl(el,10),al,m[14],1859775393,6),dl=fn3(dl=rotl(dl,10),el=fn3(el,al=fn3(al,bl,cl,dl,el,m[4],1859775393,7),bl,cl=rotl(cl,10),dl,m[9],1859775393,14),al,bl=rotl(bl,10),cl,m[15],1859775393,9),al=fn3(al=rotl(al,10),bl=fn3(bl,cl=fn3(cl,dl,el,al,bl,m[8],1859775393,13),dl,el=rotl(el,10),al,m[1],1859775393,15),cl,dl=rotl(dl,10),el,m[2],1859775393,14),cl=fn3(cl=rotl(cl,10),dl=fn3(dl,el=fn3(el,al,bl,cl,dl,m[7],1859775393,8),al,bl=rotl(bl,10),cl,m[0],1859775393,13),el,al=rotl(al,10),bl,m[6],1859775393,6),el=fn3(el=rotl(el,10),al=fn3(al,bl=fn3(bl,cl,dl,el,al,m[13],1859775393,5),cl,dl=rotl(dl,10),el,m[11],1859775393,12),bl,cl=rotl(cl,10),dl,m[5],1859775393,7),bl=fn4(bl=rotl(bl,10),cl=fn4(cl,dl=fn3(dl,el,al,bl,cl,m[12],1859775393,5),el,al=rotl(al,10),bl,m[1],2400959708,11),dl,el=rotl(el,10),al,m[9],2400959708,12),dl=fn4(dl=rotl(dl,10),el=fn4(el,al=fn4(al,bl,cl,dl,el,m[11],2400959708,14),bl,cl=rotl(cl,10),dl,m[10],2400959708,15),al,bl=rotl(bl,10),cl,m[0],2400959708,14),al=fn4(al=rotl(al,10),bl=fn4(bl,cl=fn4(cl,dl,el,al,bl,m[8],2400959708,15),dl,el=rotl(el,10),al,m[12],2400959708,9),cl,dl=rotl(dl,10),el,m[4],2400959708,8),cl=fn4(cl=rotl(cl,10),dl=fn4(dl,el=fn4(el,al,bl,cl,dl,m[13],2400959708,9),al,bl=rotl(bl,10),cl,m[3],2400959708,14),el,al=rotl(al,10),bl,m[7],2400959708,5),el=fn4(el=rotl(el,10),al=fn4(al,bl=fn4(bl,cl,dl,el,al,m[15],2400959708,6),cl,dl=rotl(dl,10),el,m[14],2400959708,8),bl,cl=rotl(cl,10),dl,m[5],2400959708,6),bl=fn5(bl=rotl(bl,10),cl=fn4(cl,dl=fn4(dl,el,al,bl,cl,m[6],2400959708,5),el,al=rotl(al,10),bl,m[2],2400959708,12),dl,el=rotl(el,10),al,m[4],2840853838,9),dl=fn5(dl=rotl(dl,10),el=fn5(el,al=fn5(al,bl,cl,dl,el,m[0],2840853838,15),bl,cl=rotl(cl,10),dl,m[5],2840853838,5),al,bl=rotl(bl,10),cl,m[9],2840853838,11),al=fn5(al=rotl(al,10),bl=fn5(bl,cl=fn5(cl,dl,el,al,bl,m[7],2840853838,6),dl,el=rotl(el,10),al,m[12],2840853838,8),cl,dl=rotl(dl,10),el,m[2],2840853838,13),cl=fn5(cl=rotl(cl,10),dl=fn5(dl,el=fn5(el,al,bl,cl,dl,m[10],2840853838,12),al,bl=rotl(bl,10),cl,m[14],2840853838,5),el,al=rotl(al,10),bl,m[1],2840853838,12),el=fn5(el=rotl(el,10),al=fn5(al,bl=fn5(bl,cl,dl,el,al,m[3],2840853838,13),cl,dl=rotl(dl,10),el,m[8],2840853838,14),bl,cl=rotl(cl,10),dl,m[11],2840853838,11),bl=fn5(bl=rotl(bl,10),cl=fn5(cl,dl=fn5(dl,el,al,bl,cl,m[6],2840853838,8),el,al=rotl(al,10),bl,m[15],2840853838,5),dl,el=rotl(el,10),al,m[13],2840853838,6),dl=rotl(dl,10);var ar=this._a,br=this._b,cr=this._c,dr=this._d,er=this._e;er=fn5(er,ar=fn5(ar,br,cr,dr,er,m[5],1352829926,8),br,cr=rotl(cr,10),dr,m[14],1352829926,9),br=fn5(br=rotl(br,10),cr=fn5(cr,dr=fn5(dr,er,ar,br,cr,m[7],1352829926,9),er,ar=rotl(ar,10),br,m[0],1352829926,11),dr,er=rotl(er,10),ar,m[9],1352829926,13),dr=fn5(dr=rotl(dr,10),er=fn5(er,ar=fn5(ar,br,cr,dr,er,m[2],1352829926,15),br,cr=rotl(cr,10),dr,m[11],1352829926,15),ar,br=rotl(br,10),cr,m[4],1352829926,5),ar=fn5(ar=rotl(ar,10),br=fn5(br,cr=fn5(cr,dr,er,ar,br,m[13],1352829926,7),dr,er=rotl(er,10),ar,m[6],1352829926,7),cr,dr=rotl(dr,10),er,m[15],1352829926,8),cr=fn5(cr=rotl(cr,10),dr=fn5(dr,er=fn5(er,ar,br,cr,dr,m[8],1352829926,11),ar,br=rotl(br,10),cr,m[1],1352829926,14),er,ar=rotl(ar,10),br,m[10],1352829926,14),er=fn4(er=rotl(er,10),ar=fn5(ar,br=fn5(br,cr,dr,er,ar,m[3],1352829926,12),cr,dr=rotl(dr,10),er,m[12],1352829926,6),br,cr=rotl(cr,10),dr,m[6],1548603684,9),br=fn4(br=rotl(br,10),cr=fn4(cr,dr=fn4(dr,er,ar,br,cr,m[11],1548603684,13),er,ar=rotl(ar,10),br,m[3],1548603684,15),dr,er=rotl(er,10),ar,m[7],1548603684,7),dr=fn4(dr=rotl(dr,10),er=fn4(er,ar=fn4(ar,br,cr,dr,er,m[0],1548603684,12),br,cr=rotl(cr,10),dr,m[13],1548603684,8),ar,br=rotl(br,10),cr,m[5],1548603684,9),ar=fn4(ar=rotl(ar,10),br=fn4(br,cr=fn4(cr,dr,er,ar,br,m[10],1548603684,11),dr,er=rotl(er,10),ar,m[14],1548603684,7),cr,dr=rotl(dr,10),er,m[15],1548603684,7),cr=fn4(cr=rotl(cr,10),dr=fn4(dr,er=fn4(er,ar,br,cr,dr,m[8],1548603684,12),ar,br=rotl(br,10),cr,m[12],1548603684,7),er,ar=rotl(ar,10),br,m[4],1548603684,6),er=fn4(er=rotl(er,10),ar=fn4(ar,br=fn4(br,cr,dr,er,ar,m[9],1548603684,15),cr,dr=rotl(dr,10),er,m[1],1548603684,13),br,cr=rotl(cr,10),dr,m[2],1548603684,11),br=fn3(br=rotl(br,10),cr=fn3(cr,dr=fn3(dr,er,ar,br,cr,m[15],1836072691,9),er,ar=rotl(ar,10),br,m[5],1836072691,7),dr,er=rotl(er,10),ar,m[1],1836072691,15),dr=fn3(dr=rotl(dr,10),er=fn3(er,ar=fn3(ar,br,cr,dr,er,m[3],1836072691,11),br,cr=rotl(cr,10),dr,m[7],1836072691,8),ar,br=rotl(br,10),cr,m[14],1836072691,6),ar=fn3(ar=rotl(ar,10),br=fn3(br,cr=fn3(cr,dr,er,ar,br,m[6],1836072691,6),dr,er=rotl(er,10),ar,m[9],1836072691,14),cr,dr=rotl(dr,10),er,m[11],1836072691,12),cr=fn3(cr=rotl(cr,10),dr=fn3(dr,er=fn3(er,ar,br,cr,dr,m[8],1836072691,13),ar,br=rotl(br,10),cr,m[12],1836072691,5),er,ar=rotl(ar,10),br,m[2],1836072691,14),er=fn3(er=rotl(er,10),ar=fn3(ar,br=fn3(br,cr,dr,er,ar,m[10],1836072691,13),cr,dr=rotl(dr,10),er,m[0],1836072691,13),br,cr=rotl(cr,10),dr,m[4],1836072691,7),br=fn2(br=rotl(br,10),cr=fn2(cr,dr=fn3(dr,er,ar,br,cr,m[13],1836072691,5),er,ar=rotl(ar,10),br,m[8],2053994217,15),dr,er=rotl(er,10),ar,m[6],2053994217,5),dr=fn2(dr=rotl(dr,10),er=fn2(er,ar=fn2(ar,br,cr,dr,er,m[4],2053994217,8),br,cr=rotl(cr,10),dr,m[1],2053994217,11),ar,br=rotl(br,10),cr,m[3],2053994217,14),ar=fn2(ar=rotl(ar,10),br=fn2(br,cr=fn2(cr,dr,er,ar,br,m[11],2053994217,14),dr,er=rotl(er,10),ar,m[15],2053994217,6),cr,dr=rotl(dr,10),er,m[0],2053994217,14),cr=fn2(cr=rotl(cr,10),dr=fn2(dr,er=fn2(er,ar,br,cr,dr,m[5],2053994217,6),ar,br=rotl(br,10),cr,m[12],2053994217,9),er,ar=rotl(ar,10),br,m[2],2053994217,12),er=fn2(er=rotl(er,10),ar=fn2(ar,br=fn2(br,cr,dr,er,ar,m[13],2053994217,9),cr,dr=rotl(dr,10),er,m[9],2053994217,12),br,cr=rotl(cr,10),dr,m[7],2053994217,5),br=fn1(br=rotl(br,10),cr=fn2(cr,dr=fn2(dr,er,ar,br,cr,m[10],2053994217,15),er,ar=rotl(ar,10),br,m[14],2053994217,8),dr,er=rotl(er,10),ar,m[12],0,8),dr=fn1(dr=rotl(dr,10),er=fn1(er,ar=fn1(ar,br,cr,dr,er,m[15],0,5),br,cr=rotl(cr,10),dr,m[10],0,12),ar,br=rotl(br,10),cr,m[4],0,9),ar=fn1(ar=rotl(ar,10),br=fn1(br,cr=fn1(cr,dr,er,ar,br,m[1],0,12),dr,er=rotl(er,10),ar,m[5],0,5),cr,dr=rotl(dr,10),er,m[8],0,14),cr=fn1(cr=rotl(cr,10),dr=fn1(dr,er=fn1(er,ar,br,cr,dr,m[7],0,6),ar,br=rotl(br,10),cr,m[6],0,8),er,ar=rotl(ar,10),br,m[2],0,13),er=fn1(er=rotl(er,10),ar=fn1(ar,br=fn1(br,cr,dr,er,ar,m[13],0,6),cr,dr=rotl(dr,10),er,m[14],0,5),br,cr=rotl(cr,10),dr,m[0],0,15),br=fn1(br=rotl(br,10),cr=fn1(cr,dr=fn1(dr,er,ar,br,cr,m[3],0,13),er,ar=rotl(ar,10),br,m[9],0,11),dr,er=rotl(er,10),ar,m[11],0,11),dr=rotl(dr,10);var t=this._b+cl+dr|0;this._b=this._c+dl+er|0,this._c=this._d+el+ar|0,this._d=this._e+al+br|0,this._e=this._a+bl+cr|0,this._a=t},RIPEMD160.prototype._digest=function(){this._block[this._blockOffset++]=128,this._blockOffset>56&&(this._block.fill(0,this._blockOffset,64),this._update(),this._blockOffset=0),this._block.fill(0,this._blockOffset,56),this._block.writeUInt32LE(this._length[0],56),this._block.writeUInt32LE(this._length[1],60),this._update();var buffer=new Buffer(20);return buffer.writeInt32LE(this._a,0),buffer.writeInt32LE(this._b,4),buffer.writeInt32LE(this._c,8),buffer.writeInt32LE(this._d,12),buffer.writeInt32LE(this._e,16),buffer},module.exports=RIPEMD160}).call(this,require("buffer").Buffer)},{buffer:8,"hash-base":19,inherits:21}],40:[function(require,module,exports){var buffer=require("buffer"),Buffer=buffer.Buffer;function copyProps(src,dst){for(var key in src)dst[key]=src[key]}function SafeBuffer(arg,encodingOrOffset,length){return Buffer(arg,encodingOrOffset,length)}Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow?module.exports=buffer:(copyProps(buffer,exports),exports.Buffer=SafeBuffer),copyProps(Buffer,SafeBuffer),SafeBuffer.from=function(arg,encodingOrOffset,length){if("number"==typeof arg)throw new TypeError("Argument must not be a number");return Buffer(arg,encodingOrOffset,length)},SafeBuffer.alloc=function(size,fill,encoding){if("number"!=typeof size)throw new TypeError("Argument must be a number");var buf=Buffer(size);return void 0!==fill?"string"==typeof encoding?buf.fill(fill,encoding):buf.fill(fill):buf.fill(0),buf},SafeBuffer.allocUnsafe=function(size){if("number"!=typeof size)throw new TypeError("Argument must be a number");return Buffer(size)},SafeBuffer.allocUnsafeSlow=function(size){if("number"!=typeof size)throw new TypeError("Argument must be a number");return buffer.SlowBuffer(size)}},{buffer:8}],41:[function(require,module,exports){var Buffer=require("safe-buffer").Buffer;function Hash(blockSize,finalSize){this._block=Buffer.alloc(blockSize),this._finalSize=finalSize,this._blockSize=blockSize,this._len=0}Hash.prototype.update=function(data,enc){"string"==typeof data&&(enc=enc||"utf8",data=Buffer.from(data,enc));for(var block=this._block,blockSize=this._blockSize,length=data.length,accum=this._len,offset=0;offset<length;){for(var assigned=accum%blockSize,remainder=Math.min(length-offset,blockSize-assigned),i=0;i<remainder;i++)block[assigned+i]=data[offset+i];offset+=remainder,(accum+=remainder)%blockSize==0&&this._update(block)}return this._len+=length,this},Hash.prototype.digest=function(enc){var rem=this._len%this._blockSize;this._block[rem]=128,this._block.fill(0,rem+1),rem>=this._finalSize&&(this._update(this._block),this._block.fill(0));var bits=8*this._len;if(bits<=4294967295)this._block.writeUInt32BE(bits,this._blockSize-4);else{var lowBits=4294967295&bits,highBits=(bits-lowBits)/4294967296;this._block.writeUInt32BE(highBits,this._blockSize-8),this._block.writeUInt32BE(lowBits,this._blockSize-4)}this._update(this._block);var hash=this._hash();return enc?hash.toString(enc):hash},Hash.prototype._update=function(){throw new Error("_update must be implemented by subclass")},module.exports=Hash},{"safe-buffer":40}],42:[function(require,module,exports){(exports=module.exports=function(algorithm){algorithm=algorithm.toLowerCase();var Algorithm=exports[algorithm];if(!Algorithm)throw new Error(algorithm+" is not supported (we accept pull requests)");return new Algorithm}).sha=require("./sha"),exports.sha1=require("./sha1"),exports.sha224=require("./sha224"),exports.sha256=require("./sha256"),exports.sha384=require("./sha384"),exports.sha512=require("./sha512")},{"./sha":43,"./sha1":44,"./sha224":45,"./sha256":46,"./sha384":47,"./sha512":48}],43:[function(require,module,exports){var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1518500249,1859775393,-1894007588,-899497514],W=new Array(80);function Sha(){this.init(),this._w=W,Hash.call(this,64,56)}function rotl30(num){return num<<30|num>>>2}function ft(s,b,c,d){return 0===s?b&c|~b&d:2===s?b&c|b&d|c&d:b^c^d}inherits(Sha,Hash),Sha.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},Sha.prototype._update=function(M){for(var num,W=this._w,a=0|this._a,b=0|this._b,c=0|this._c,d=0|this._d,e=0|this._e,i=0;i<16;++i)W[i]=M.readInt32BE(4*i);for(;i<80;++i)W[i]=W[i-3]^W[i-8]^W[i-14]^W[i-16];for(var j=0;j<80;++j){var s=~~(j/20),t=0|((num=a)<<5|num>>>27)+ft(s,b,c,d)+e+W[j]+K[s];e=d,d=c,c=rotl30(b),b=a,a=t}this._a=a+this._a|0,this._b=b+this._b|0,this._c=c+this._c|0,this._d=d+this._d|0,this._e=e+this._e|0},Sha.prototype._hash=function(){var H=Buffer.allocUnsafe(20);return H.writeInt32BE(0|this._a,0),H.writeInt32BE(0|this._b,4),H.writeInt32BE(0|this._c,8),H.writeInt32BE(0|this._d,12),H.writeInt32BE(0|this._e,16),H},module.exports=Sha},{"./hash":41,inherits:21,"safe-buffer":40}],44:[function(require,module,exports){var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1518500249,1859775393,-1894007588,-899497514],W=new Array(80);function Sha1(){this.init(),this._w=W,Hash.call(this,64,56)}function rotl5(num){return num<<5|num>>>27}function rotl30(num){return num<<30|num>>>2}function ft(s,b,c,d){return 0===s?b&c|~b&d:2===s?b&c|b&d|c&d:b^c^d}inherits(Sha1,Hash),Sha1.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},Sha1.prototype._update=function(M){for(var num,W=this._w,a=0|this._a,b=0|this._b,c=0|this._c,d=0|this._d,e=0|this._e,i=0;i<16;++i)W[i]=M.readInt32BE(4*i);for(;i<80;++i)W[i]=(num=W[i-3]^W[i-8]^W[i-14]^W[i-16],num<<1|num>>>31);for(var j=0;j<80;++j){var s=~~(j/20),t=rotl5(a)+ft(s,b,c,d)+e+W[j]+K[s]|0;e=d,d=c,c=rotl30(b),b=a,a=t}this._a=a+this._a|0,this._b=b+this._b|0,this._c=c+this._c|0,this._d=d+this._d|0,this._e=e+this._e|0},Sha1.prototype._hash=function(){var H=Buffer.allocUnsafe(20);return H.writeInt32BE(0|this._a,0),H.writeInt32BE(0|this._b,4),H.writeInt32BE(0|this._c,8),H.writeInt32BE(0|this._d,12),H.writeInt32BE(0|this._e,16),H},module.exports=Sha1},{"./hash":41,inherits:21,"safe-buffer":40}],45:[function(require,module,exports){var inherits=require("inherits"),Sha256=require("./sha256"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,W=new Array(64);function Sha224(){this.init(),this._w=W,Hash.call(this,64,56)}inherits(Sha224,Sha256),Sha224.prototype.init=function(){return this._a=3238371032,this._b=914150663,this._c=812702999,this._d=4144912697,this._e=4290775857,this._f=1750603025,this._g=1694076839,this._h=3204075428,this},Sha224.prototype._hash=function(){var H=Buffer.allocUnsafe(28);return H.writeInt32BE(this._a,0),H.writeInt32BE(this._b,4),H.writeInt32BE(this._c,8),H.writeInt32BE(this._d,12),H.writeInt32BE(this._e,16),H.writeInt32BE(this._f,20),H.writeInt32BE(this._g,24),H},module.exports=Sha224},{"./hash":41,"./sha256":46,inherits:21,"safe-buffer":40}],46:[function(require,module,exports){var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],W=new Array(64);function Sha256(){this.init(),this._w=W,Hash.call(this,64,56)}function ch(x,y,z){return z^x&(y^z)}function maj(x,y,z){return x&y|z&(x|y)}function sigma0(x){return(x>>>2|x<<30)^(x>>>13|x<<19)^(x>>>22|x<<10)}function sigma1(x){return(x>>>6|x<<26)^(x>>>11|x<<21)^(x>>>25|x<<7)}function gamma0(x){return(x>>>7|x<<25)^(x>>>18|x<<14)^x>>>3}inherits(Sha256,Hash),Sha256.prototype.init=function(){return this._a=1779033703,this._b=3144134277,this._c=1013904242,this._d=2773480762,this._e=1359893119,this._f=2600822924,this._g=528734635,this._h=1541459225,this},Sha256.prototype._update=function(M){for(var x,W=this._w,a=0|this._a,b=0|this._b,c=0|this._c,d=0|this._d,e=0|this._e,f=0|this._f,g=0|this._g,h=0|this._h,i=0;i<16;++i)W[i]=M.readInt32BE(4*i);for(;i<64;++i)W[i]=0|(x=W[i-2],((x>>>17|x<<15)^(x>>>19|x<<13)^x>>>10)+W[i-7]+gamma0(W[i-15])+W[i-16]);for(var j=0;j<64;++j){var T1=h+sigma1(e)+ch(e,f,g)+K[j]+W[j]|0,T2=sigma0(a)+maj(a,b,c)|0;h=g,g=f,f=e,e=d+T1|0,d=c,c=b,b=a,a=T1+T2|0}this._a=a+this._a|0,this._b=b+this._b|0,this._c=c+this._c|0,this._d=d+this._d|0,this._e=e+this._e|0,this._f=f+this._f|0,this._g=g+this._g|0,this._h=h+this._h|0},Sha256.prototype._hash=function(){var H=Buffer.allocUnsafe(32);return H.writeInt32BE(this._a,0),H.writeInt32BE(this._b,4),H.writeInt32BE(this._c,8),H.writeInt32BE(this._d,12),H.writeInt32BE(this._e,16),H.writeInt32BE(this._f,20),H.writeInt32BE(this._g,24),H.writeInt32BE(this._h,28),H},module.exports=Sha256},{"./hash":41,inherits:21,"safe-buffer":40}],47:[function(require,module,exports){var inherits=require("inherits"),SHA512=require("./sha512"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,W=new Array(160);function Sha384(){this.init(),this._w=W,Hash.call(this,128,112)}inherits(Sha384,SHA512),Sha384.prototype.init=function(){return this._ah=3418070365,this._bh=1654270250,this._ch=2438529370,this._dh=355462360,this._eh=1731405415,this._fh=2394180231,this._gh=3675008525,this._hh=1203062813,this._al=3238371032,this._bl=914150663,this._cl=812702999,this._dl=4144912697,this._el=4290775857,this._fl=1750603025,this._gl=1694076839,this._hl=3204075428,this},Sha384.prototype._hash=function(){var H=Buffer.allocUnsafe(48);function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset),H.writeInt32BE(l,offset+4)}return writeInt64BE(this._ah,this._al,0),writeInt64BE(this._bh,this._bl,8),writeInt64BE(this._ch,this._cl,16),writeInt64BE(this._dh,this._dl,24),writeInt64BE(this._eh,this._el,32),writeInt64BE(this._fh,this._fl,40),H},module.exports=Sha384},{"./hash":41,"./sha512":48,inherits:21,"safe-buffer":40}],48:[function(require,module,exports){var inherits=require("inherits"),Hash=require("./hash"),Buffer=require("safe-buffer").Buffer,K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],W=new Array(160);function Sha512(){this.init(),this._w=W,Hash.call(this,128,112)}function Ch(x,y,z){return z^x&(y^z)}function maj(x,y,z){return x&y|z&(x|y)}function sigma0(x,xl){return(x>>>28|xl<<4)^(xl>>>2|x<<30)^(xl>>>7|x<<25)}function sigma1(x,xl){return(x>>>14|xl<<18)^(x>>>18|xl<<14)^(xl>>>9|x<<23)}function Gamma0(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^x>>>7}function Gamma0l(x,xl){return(x>>>1|xl<<31)^(x>>>8|xl<<24)^(x>>>7|xl<<25)}function Gamma1(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^x>>>6}function Gamma1l(x,xl){return(x>>>19|xl<<13)^(xl>>>29|x<<3)^(x>>>6|xl<<26)}function getCarry(a,b){return a>>>0<b>>>0?1:0}inherits(Sha512,Hash),Sha512.prototype.init=function(){return this._ah=1779033703,this._bh=3144134277,this._ch=1013904242,this._dh=2773480762,this._eh=1359893119,this._fh=2600822924,this._gh=528734635,this._hh=1541459225,this._al=4089235720,this._bl=2227873595,this._cl=4271175723,this._dl=1595750129,this._el=2917565137,this._fl=725511199,this._gl=4215389547,this._hl=327033209,this},Sha512.prototype._update=function(M){for(var W=this._w,ah=0|this._ah,bh=0|this._bh,ch=0|this._ch,dh=0|this._dh,eh=0|this._eh,fh=0|this._fh,gh=0|this._gh,hh=0|this._hh,al=0|this._al,bl=0|this._bl,cl=0|this._cl,dl=0|this._dl,el=0|this._el,fl=0|this._fl,gl=0|this._gl,hl=0|this._hl,i=0;i<32;i+=2)W[i]=M.readInt32BE(4*i),W[i+1]=M.readInt32BE(4*i+4);for(;i<160;i+=2){var xh=W[i-30],xl=W[i-30+1],gamma0=Gamma0(xh,xl),gamma0l=Gamma0l(xl,xh),gamma1=Gamma1(xh=W[i-4],xl=W[i-4+1]),gamma1l=Gamma1l(xl,xh),Wi7h=W[i-14],Wi7l=W[i-14+1],Wi16h=W[i-32],Wi16l=W[i-32+1],Wil=gamma0l+Wi7l|0,Wih=gamma0+Wi7h+getCarry(Wil,gamma0l)|0;Wih=(Wih=Wih+gamma1+getCarry(Wil=Wil+gamma1l|0,gamma1l)|0)+Wi16h+getCarry(Wil=Wil+Wi16l|0,Wi16l)|0,W[i]=Wih,W[i+1]=Wil}for(var j=0;j<160;j+=2){Wih=W[j],Wil=W[j+1];var majh=maj(ah,bh,ch),majl=maj(al,bl,cl),sigma0h=sigma0(ah,al),sigma0l=sigma0(al,ah),sigma1h=sigma1(eh,el),sigma1l=sigma1(el,eh),Kih=K[j],Kil=K[j+1],chh=Ch(eh,fh,gh),chl=Ch(el,fl,gl),t1l=hl+sigma1l|0,t1h=hh+sigma1h+getCarry(t1l,hl)|0;t1h=(t1h=(t1h=t1h+chh+getCarry(t1l=t1l+chl|0,chl)|0)+Kih+getCarry(t1l=t1l+Kil|0,Kil)|0)+Wih+getCarry(t1l=t1l+Wil|0,Wil)|0;var t2l=sigma0l+majl|0,t2h=sigma0h+majh+getCarry(t2l,sigma0l)|0;hh=gh,hl=gl,gh=fh,gl=fl,fh=eh,fl=el,eh=dh+t1h+getCarry(el=dl+t1l|0,dl)|0,dh=ch,dl=cl,ch=bh,cl=bl,bh=ah,bl=al,ah=t1h+t2h+getCarry(al=t1l+t2l|0,t1l)|0}this._al=this._al+al|0,this._bl=this._bl+bl|0,this._cl=this._cl+cl|0,this._dl=this._dl+dl|0,this._el=this._el+el|0,this._fl=this._fl+fl|0,this._gl=this._gl+gl|0,this._hl=this._hl+hl|0,this._ah=this._ah+ah+getCarry(this._al,al)|0,this._bh=this._bh+bh+getCarry(this._bl,bl)|0,this._ch=this._ch+ch+getCarry(this._cl,cl)|0,this._dh=this._dh+dh+getCarry(this._dl,dl)|0,this._eh=this._eh+eh+getCarry(this._el,el)|0,this._fh=this._fh+fh+getCarry(this._fl,fl)|0,this._gh=this._gh+gh+getCarry(this._gl,gl)|0,this._hh=this._hh+hh+getCarry(this._hl,hl)|0},Sha512.prototype._hash=function(){var H=Buffer.allocUnsafe(64);function writeInt64BE(h,l,offset){H.writeInt32BE(h,offset),H.writeInt32BE(l,offset+4)}return writeInt64BE(this._ah,this._al,0),writeInt64BE(this._bh,this._bl,8),writeInt64BE(this._ch,this._cl,16),writeInt64BE(this._dh,this._dl,24),writeInt64BE(this._eh,this._el,32),writeInt64BE(this._fh,this._fl,40),writeInt64BE(this._gh,this._gl,48),writeInt64BE(this._hh,this._hl,56),H},module.exports=Sha512},{"./hash":41,inherits:21,"safe-buffer":40}],49:[function(require,module,exports){module.exports=Stream;var EE=require("events").EventEmitter;function Stream(){EE.call(this)}require("inherits")(Stream,EE),Stream.Readable=require("readable-stream/readable.js"),Stream.Writable=require("readable-stream/writable.js"),Stream.Duplex=require("readable-stream/duplex.js"),Stream.Transform=require("readable-stream/transform.js"),Stream.PassThrough=require("readable-stream/passthrough.js"),Stream.Stream=Stream,Stream.prototype.pipe=function(dest,options){var source=this;function ondata(chunk){dest.writable&&!1===dest.write(chunk)&&source.pause&&source.pause()}function ondrain(){source.readable&&source.resume&&source.resume()}source.on("data",ondata),dest.on("drain",ondrain),dest._isStdio||options&&!1===options.end||(source.on("end",onend),source.on("close",onclose));var didOnEnd=!1;function onend(){didOnEnd||(didOnEnd=!0,dest.end())}function onclose(){didOnEnd||(didOnEnd=!0,"function"==typeof dest.destroy&&dest.destroy())}function onerror(er){if(cleanup(),0===EE.listenerCount(this,"error"))throw er}function cleanup(){source.removeListener("data",ondata),dest.removeListener("drain",ondrain),source.removeListener("end",onend),source.removeListener("close",onclose),source.removeListener("error",onerror),dest.removeListener("error",onerror),source.removeListener("end",cleanup),source.removeListener("close",cleanup),dest.removeListener("close",cleanup)}return source.on("error",onerror),dest.on("error",onerror),source.on("end",cleanup),source.on("close",cleanup),dest.on("close",cleanup),dest.emit("pipe",source),dest}},{events:18,inherits:21,"readable-stream/duplex.js":26,"readable-stream/passthrough.js":35,"readable-stream/readable.js":36,"readable-stream/transform.js":37,"readable-stream/writable.js":38}],50:[function(require,module,exports){"use strict";var Buffer=require("safe-buffer").Buffer,isEncoding=Buffer.isEncoding||function(encoding){switch((encoding=""+encoding)&&encoding.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};function StringDecoder(encoding){var nb;switch(this.encoding=function(enc){var nenc=function(enc){if(!enc)return"utf8";for(var retried;;)switch(enc){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return enc;default:if(retried)return;enc=(""+enc).toLowerCase(),retried=!0}}(enc);if("string"!=typeof nenc&&(Buffer.isEncoding===isEncoding||!isEncoding(enc)))throw new Error("Unknown encoding: "+enc);return nenc||enc}(encoding),this.encoding){case"utf16le":this.text=utf16Text,this.end=utf16End,nb=4;break;case"utf8":this.fillLast=utf8FillLast,nb=4;break;case"base64":this.text=base64Text,this.end=base64End,nb=3;break;default:return this.write=simpleWrite,void(this.end=simpleEnd)}this.lastNeed=0,this.lastTotal=0,this.lastChar=Buffer.allocUnsafe(nb)}function utf8CheckByte(byte){return byte<=127?0:byte>>5==6?2:byte>>4==14?3:byte>>3==30?4:-1}function utf8FillLast(buf){var p=this.lastTotal-this.lastNeed,r=function(self,buf,p){if(128!=(192&buf[0]))return self.lastNeed=0,"�".repeat(p);if(self.lastNeed>1&&buf.length>1){if(128!=(192&buf[1]))return self.lastNeed=1,"�".repeat(p+1);if(self.lastNeed>2&&buf.length>2&&128!=(192&buf[2]))return self.lastNeed=2,"�".repeat(p+2)}}(this,buf,p);return void 0!==r?r:this.lastNeed<=buf.length?(buf.copy(this.lastChar,p,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(buf.copy(this.lastChar,p,0,buf.length),void(this.lastNeed-=buf.length))}function utf16Text(buf,i){if((buf.length-i)%2==0){var r=buf.toString("utf16le",i);if(r){var c=r.charCodeAt(r.length-1);if(c>=55296&&c<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=buf[buf.length-2],this.lastChar[1]=buf[buf.length-1],r.slice(0,-1)}return r}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=buf[buf.length-1],buf.toString("utf16le",i,buf.length-1)}function utf16End(buf){var r=buf&&buf.length?this.write(buf):"";if(this.lastNeed){var end=this.lastTotal-this.lastNeed;return r+this.lastChar.toString("utf16le",0,end)}return r}function base64Text(buf,i){var n=(buf.length-i)%3;return 0===n?buf.toString("base64",i):(this.lastNeed=3-n,this.lastTotal=3,1===n?this.lastChar[0]=buf[buf.length-1]:(this.lastChar[0]=buf[buf.length-2],this.lastChar[1]=buf[buf.length-1]),buf.toString("base64",i,buf.length-n))}function base64End(buf){var r=buf&&buf.length?this.write(buf):"";return this.lastNeed?r+this.lastChar.toString("base64",0,3-this.lastNeed):r}function simpleWrite(buf){return buf.toString(this.encoding)}function simpleEnd(buf){return buf&&buf.length?this.write(buf):""}exports.StringDecoder=StringDecoder,StringDecoder.prototype.write=function(buf){if(0===buf.length)return"";var r,i;if(this.lastNeed){if(void 0===(r=this.fillLast(buf)))return"";i=this.lastNeed,this.lastNeed=0}else i=0;return i<buf.length?r?r+this.text(buf,i):this.text(buf,i):r||""},StringDecoder.prototype.end=function(buf){var r=buf&&buf.length?this.write(buf):"";return this.lastNeed?r+"�".repeat(this.lastTotal-this.lastNeed):r},StringDecoder.prototype.text=function(buf,i){var total=function(self,buf,i){var j=buf.length-1;if(j<i)return 0;var nb=utf8CheckByte(buf[j]);if(nb>=0)return nb>0&&(self.lastNeed=nb-1),nb;if(--j<i)return 0;if((nb=utf8CheckByte(buf[j]))>=0)return nb>0&&(self.lastNeed=nb-2),nb;if(--j<i)return 0;if((nb=utf8CheckByte(buf[j]))>=0)return nb>0&&(2===nb?nb=0:self.lastNeed=nb-3),nb;return 0}(this,buf,i);if(!this.lastNeed)return buf.toString("utf8",i);this.lastTotal=total;var end=buf.length-(total-this.lastNeed);return buf.copy(this.lastChar,0,end),buf.toString("utf8",i,end)},StringDecoder.prototype.fillLast=function(buf){if(this.lastNeed<=buf.length)return buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,buf.length),this.lastNeed-=buf.length}},{"safe-buffer":40}],51:[function(require,module,exports){(function(global){function config(name){try{if(!global.localStorage)return!1}catch(_){return!1}var val=global.localStorage[name];return null!=val&&"true"===String(val).toLowerCase()}module.exports=function(fn,msg){if(config("noDeprecation"))return fn;var warned=!1;return function(){if(!warned){if(config("throwDeprecation"))throw new Error(msg);config("traceDeprecation")?console.trace(msg):console.warn(msg),warned=!0}return fn.apply(this,arguments)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],52:[function(require,module,exports){(function(Buffer){var bs58check=require("bs58check"),cashaddr=require("cashaddrjs"),Format={Legacy:"legacy",Bitpay:"bitpay",Cashaddr:"cashaddr"},Network={Mainnet:"mainnet",Testnet:"testnet"},Type={};function detectAddressFormat(address){return decodeAddress(address).format}function detectAddressNetwork(address){return decodeAddress(address).network}function detectAddressType(address){return decodeAddress(address).type}Type.P2PKH="p2pkh",Type.P2SH="p2sh";var VERSION_BYTE={};function decodeAddress(address){try{return function(address){try{var payload=bs58check.decode(address),versionByte=payload[0],hash=Array.prototype.slice.call(payload,1);switch(versionByte){case VERSION_BYTE[Format.Legacy][Network.Mainnet][Type.P2PKH]:return{hash:hash,format:Format.Legacy,network:Network.Mainnet,type:Type.P2PKH};case VERSION_BYTE[Format.Legacy][Network.Mainnet][Type.P2SH]:return{hash:hash,format:Format.Legacy,network:Network.Mainnet,type:Type.P2SH};case VERSION_BYTE[Format.Legacy][Network.Testnet][Type.P2PKH]:return{hash:hash,format:Format.Legacy,network:Network.Testnet,type:Type.P2PKH};case VERSION_BYTE[Format.Legacy][Network.Testnet][Type.P2SH]:return{hash:hash,format:Format.Legacy,network:Network.Testnet,type:Type.P2SH};case VERSION_BYTE[Format.Bitpay][Network.Mainnet][Type.P2PKH]:return{hash:hash,format:Format.Bitpay,network:Network.Mainnet,type:Type.P2PKH};case VERSION_BYTE[Format.Bitpay][Network.Mainnet][Type.P2SH]:return{hash:hash,format:Format.Bitpay,network:Network.Mainnet,type:Type.P2SH}}}catch(error){}throw new InvalidAddressError}(address)}catch(error){}try{return function(address){if(-1!==address.indexOf(":"))try{return decodeCashAddressWithPrefix(address)}catch(error){}else for(var prefixes=["bitcoincash","bchtest","regtest"],i=0;i<prefixes.length;++i)try{var prefix=prefixes[i];return decodeCashAddressWithPrefix(prefix+":"+address)}catch(error){}throw new InvalidAddressError}(address)}catch(error){}throw new InvalidAddressError}function decodeCashAddressWithPrefix(address){try{var decoded=cashaddr.decode(address),hash=Array.prototype.slice.call(decoded.hash,0),type="P2PKH"===decoded.type?Type.P2PKH:Type.P2SH;switch(decoded.prefix){case"bitcoincash":return{hash:hash,format:Format.Cashaddr,network:Network.Mainnet,type:type};case"bchtest":case"regtest":return{hash:hash,format:Format.Cashaddr,network:Network.Testnet,type:type}}}catch(error){}throw new InvalidAddressError}function InvalidAddressError(){var error=new Error;this.name=error.name="InvalidAddressError",this.message=error.message="Received an invalid Bitcoin Cash address as input.",this.stack=error.stack}VERSION_BYTE[Format.Legacy]={},VERSION_BYTE[Format.Legacy][Network.Mainnet]={},VERSION_BYTE[Format.Legacy][Network.Mainnet][Type.P2PKH]=0,VERSION_BYTE[Format.Legacy][Network.Mainnet][Type.P2SH]=5,VERSION_BYTE[Format.Legacy][Network.Testnet]={},VERSION_BYTE[Format.Legacy][Network.Testnet][Type.P2PKH]=111,VERSION_BYTE[Format.Legacy][Network.Testnet][Type.P2SH]=196,VERSION_BYTE[Format.Bitpay]={},VERSION_BYTE[Format.Bitpay][Network.Mainnet]={},VERSION_BYTE[Format.Bitpay][Network.Mainnet][Type.P2PKH]=28,VERSION_BYTE[Format.Bitpay][Network.Mainnet][Type.P2SH]=40,VERSION_BYTE[Format.Bitpay][Network.Testnet]={},VERSION_BYTE[Format.Bitpay][Network.Testnet][Type.P2PKH]=111,VERSION_BYTE[Format.Bitpay][Network.Testnet][Type.P2SH]=196,InvalidAddressError.prototype=Object.create(Error.prototype),module.exports={Format:Format,Network:Network,Type:Type,detectAddressFormat:detectAddressFormat,detectAddressNetwork:detectAddressNetwork,detectAddressType:detectAddressType,toLegacyAddress:function(address){var decoded=decodeAddress(address);return decoded.format===Format.Legacy?address:function(decoded){var versionByte=VERSION_BYTE[Format.Legacy][decoded.network][decoded.type],buffer=Buffer.alloc(1+decoded.hash.length);return buffer[0]=versionByte,buffer.set(decoded.hash,1),bs58check.encode(buffer)}(decoded)},toBitpayAddress:function(address){var decoded=decodeAddress(address);return decoded.format===Format.Bitpay?address:function(decoded){var versionByte=VERSION_BYTE[Format.Bitpay][decoded.network][decoded.type],buffer=Buffer.alloc(1+decoded.hash.length);return buffer[0]=versionByte,buffer.set(decoded.hash,1),bs58check.encode(buffer)}(decoded)},toCashAddress:function(address){return function(decoded){var prefix=decoded.network===Network.Mainnet?"bitcoincash":"bchtest",type=decoded.type===Type.P2PKH?"P2PKH":"P2SH",hash=Uint8Array.from(decoded.hash);return cashaddr.encode(prefix,type,hash)}(decodeAddress(address))},isLegacyAddress:function(address){return detectAddressFormat(address)===Format.Legacy},isBitpayAddress:function(address){return detectAddressFormat(address)===Format.Bitpay},isCashAddress:function(address){return detectAddressFormat(address)===Format.Cashaddr},isMainnetAddress:function(address){return detectAddressNetwork(address)===Network.Mainnet},isTestnetAddress:function(address){return detectAddressNetwork(address)===Network.Testnet},isP2PKHAddress:function(address){return detectAddressType(address)===Type.P2PKH},isP2SHAddress:function(address){return detectAddressType(address)===Type.P2SH},InvalidAddressError:InvalidAddressError}}).call(this,require("buffer").Buffer)},{bs58check:7,buffer:8,cashaddrjs:10}]},{},[52])(52)});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./src/client/js/lib/bitcoincash.js":
/*!******************************************!*\
  !*** ./src/client/js/lib/bitcoincash.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./src/client/js/lib/identicon.js":
/*!****************************************!*\
  !*** ./src/client/js/lib/identicon.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Identicon.js v1.0
 * http://github.com/stewartlord/identicon.js
 *
 * Requires PNGLib
 * http://www.xarg.org/download/pnglib.js
 *
 * Copyright 2013, Stewart Lord
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license.php
 */

(function() {
    Identicon = function(hash, size, margin){
        this.hash   = hash;
        this.size   = size   || 64;
        this.margin = margin || .02;
    }

    Identicon.prototype = {
        hash:   null,
        size:   null,
        margin: null,

        render: function(){
            var hash    = this.hash,
                size    = this.size,
                margin  = Math.floor(size * this.margin),
                cell    = Math.floor((size - (margin * 2)) / 5),
                image   = new PNGlib(size, size, 256);

            // light-grey background
            var bg      = image.color(0, 0, 34);

            // foreground is last 7 chars as hue at 50% saturation, 70% brightness
            var rgb     = this.hsl2rgb(parseInt(hash.substr(-7), 16) / 0xfffffff, .5, .7),
                fg      = image.color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);

            // the first 15 characters of the hash control the pixels (even/odd)
            // they are drawn down the middle first, then mirrored outwards
            var i, color;
            for (i = 0; i < 15; i++) {
                color = parseInt(hash.charAt(i), 16) % 2 ? bg : fg;
                if (i < 5) {
                    this.rectangle(2 * cell + margin, i * cell + margin, cell, cell, color, image);
                } else if (i < 10) {
                    this.rectangle(1 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                    this.rectangle(3 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                } else if (i < 15) {
                    this.rectangle(0 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                    this.rectangle(4 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                }
            }

            return image;
        },

        rectangle: function(x, y, w, h, color, image) {
            var i, j;
            for (i = x; i < x + w; i++) {
                for (j = y; j < y + h; j++) {
                    image.buffer[image.index(i, j)] = color;
                }
            }
        },

        // adapted from: https://gist.github.com/aemkei/1325937
        hsl2rgb: function(h, s, b){
            h *= 6;
            s = [
                b += s *= b < .5 ? b : 1 - b,
                b - h % 1 * s * 2,
                b -= s *= 2,
                b,
                b + h % 1 * s,
                b + s
            ];

            return[
                s[ ~~h    % 6 ],  // red
                s[ (h|16) % 6 ],  // green
                s[ (h|8)  % 6 ]   // blue
            ];
        },

        toString: function(){
            return this.render().getBase64();
        }
    }

    window.Identicon = Identicon;
})();

/***/ }),

/***/ "./src/client/js/lib/jquery.js":
/*!*************************************!*\
  !*** ./src/client/js/lib/jquery.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){"use strict";var n=[],r=e.document,i=Object.getPrototypeOf,o=n.slice,a=n.concat,s=n.push,u=n.indexOf,l={},c=l.toString,f=l.hasOwnProperty,p=f.toString,d=p.call(Object),h={},g=function e(t){return"function"==typeof t&&"number"!=typeof t.nodeType},y=function e(t){return null!=t&&t===t.window},v={type:!0,src:!0,noModule:!0};function m(e,t,n){var i,o=(t=t||r).createElement("script");if(o.text=e,n)for(i in v)n[i]&&(o[i]=n[i]);t.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[c.call(e)]||"object":typeof e}var b="3.3.1",w=function(e,t){return new w.fn.init(e,t)},T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn=w.prototype={jquery:"3.3.1",constructor:w,length:0,toArray:function(){return o.call(this)},get:function(e){return null==e?o.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=w.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return w.each(this,e)},map:function(e){return this.pushStack(w.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(o.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:n.sort,splice:n.splice},w.extend=w.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||g(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],a!==(r=e[t])&&(l&&r&&(w.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&w.isPlainObject(n)?n:{},a[t]=w.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},w.extend({expando:"jQuery"+("3.3.1"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==c.call(e))&&(!(t=i(e))||"function"==typeof(n=f.call(t,"constructor")&&t.constructor)&&p.call(n)===d)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e){m(e)},each:function(e,t){var n,r=0;if(C(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(C(Object(e))?w.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)(r=!t(e[o],o))!==s&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,s=[];if(C(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&s.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&s.push(i);return a.apply([],s)},guid:1,support:h}),"function"==typeof Symbol&&(w.fn[Symbol.iterator]=n[Symbol.iterator]),w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function C(e){var t=!!e&&"length"in e&&e.length,n=x(e);return!g(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}var E=function(e){var t,n,r,i,o,a,s,u,l,c,f,p,d,h,g,y,v,m,x,b="sizzle"+1*new Date,w=e.document,T=0,C=0,E=ae(),k=ae(),S=ae(),D=function(e,t){return e===t&&(f=!0),0},N={}.hasOwnProperty,A=[],j=A.pop,q=A.push,L=A.push,H=A.slice,O=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},P="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",I="\\["+M+"*("+R+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+R+"))|)"+M+"*\\]",W=":("+R+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+I+")*)|.*)\\)|)",$=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),F=new RegExp("^"+M+"*,"+M+"*"),_=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),z=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),X=new RegExp(W),U=new RegExp("^"+R+"$"),V={ID:new RegExp("^#("+R+")"),CLASS:new RegExp("^\\.("+R+")"),TAG:new RegExp("^("+R+"|[*])"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+W),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+P+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},G=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Q=/^[^{]+\{\s*\[native \w/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,K=/[+~]/,Z=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ee=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},te=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ne=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},re=function(){p()},ie=me(function(e){return!0===e.disabled&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{L.apply(A=H.call(w.childNodes),w.childNodes),A[w.childNodes.length].nodeType}catch(e){L={apply:A.length?function(e,t){q.apply(e,H.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function oe(e,t,r,i){var o,s,l,c,f,h,v,m=t&&t.ownerDocument,T=t?t.nodeType:9;if(r=r||[],"string"!=typeof e||!e||1!==T&&9!==T&&11!==T)return r;if(!i&&((t?t.ownerDocument||t:w)!==d&&p(t),t=t||d,g)){if(11!==T&&(f=J.exec(e)))if(o=f[1]){if(9===T){if(!(l=t.getElementById(o)))return r;if(l.id===o)return r.push(l),r}else if(m&&(l=m.getElementById(o))&&x(t,l)&&l.id===o)return r.push(l),r}else{if(f[2])return L.apply(r,t.getElementsByTagName(e)),r;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!S[e+" "]&&(!y||!y.test(e))){if(1!==T)m=t,v=e;else if("object"!==t.nodeName.toLowerCase()){(c=t.getAttribute("id"))?c=c.replace(te,ne):t.setAttribute("id",c=b),s=(h=a(e)).length;while(s--)h[s]="#"+c+" "+ve(h[s]);v=h.join(","),m=K.test(e)&&ge(t.parentNode)||t}if(v)try{return L.apply(r,m.querySelectorAll(v)),r}catch(e){}finally{c===b&&t.removeAttribute("id")}}}return u(e.replace(B,"$1"),t,r,i)}function ae(){var e=[];function t(n,i){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}return t}function se(e){return e[b]=!0,e}function ue(e){var t=d.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function le(e,t){var n=e.split("|"),i=n.length;while(i--)r.attrHandle[n[i]]=t}function ce(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function fe(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function de(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ie(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function he(e){return se(function(t){return t=+t,se(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function ge(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}n=oe.support={},o=oe.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},p=oe.setDocument=function(e){var t,i,a=e?e.ownerDocument||e:w;return a!==d&&9===a.nodeType&&a.documentElement?(d=a,h=d.documentElement,g=!o(d),w!==d&&(i=d.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",re,!1):i.attachEvent&&i.attachEvent("onunload",re)),n.attributes=ue(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ue(function(e){return e.appendChild(d.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=Q.test(d.getElementsByClassName),n.getById=ue(function(e){return h.appendChild(e).id=b,!d.getElementsByName||!d.getElementsByName(b).length}),n.getById?(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){return e.getAttribute("id")===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),r.find.TAG=n.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=n.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&g)return t.getElementsByClassName(e)},v=[],y=[],(n.qsa=Q.test(d.querySelectorAll))&&(ue(function(e){h.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&y.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||y.push("\\["+M+"*(?:value|"+P+")"),e.querySelectorAll("[id~="+b+"-]").length||y.push("~="),e.querySelectorAll(":checked").length||y.push(":checked"),e.querySelectorAll("a#"+b+"+*").length||y.push(".#.+[+~]")}),ue(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=d.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&y.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&y.push(":enabled",":disabled"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&y.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),y.push(",.*:")})),(n.matchesSelector=Q.test(m=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ue(function(e){n.disconnectedMatch=m.call(e,"*"),m.call(e,"[s!='']:x"),v.push("!=",W)}),y=y.length&&new RegExp(y.join("|")),v=v.length&&new RegExp(v.join("|")),t=Q.test(h.compareDocumentPosition),x=t||Q.test(h.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return f=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e===d||e.ownerDocument===w&&x(w,e)?-1:t===d||t.ownerDocument===w&&x(w,t)?1:c?O(c,e)-O(c,t):0:4&r?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===d?-1:t===d?1:i?-1:o?1:c?O(c,e)-O(c,t):0;if(i===o)return ce(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?ce(a[r],s[r]):a[r]===w?-1:s[r]===w?1:0},d):d},oe.matches=function(e,t){return oe(e,null,null,t)},oe.matchesSelector=function(e,t){if((e.ownerDocument||e)!==d&&p(e),t=t.replace(z,"='$1']"),n.matchesSelector&&g&&!S[t+" "]&&(!v||!v.test(t))&&(!y||!y.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return oe(t,d,null,[e]).length>0},oe.contains=function(e,t){return(e.ownerDocument||e)!==d&&p(e),x(e,t)},oe.attr=function(e,t){(e.ownerDocument||e)!==d&&p(e);var i=r.attrHandle[t.toLowerCase()],o=i&&N.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},oe.escape=function(e){return(e+"").replace(te,ne)},oe.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},oe.uniqueSort=function(e){var t,r=[],i=0,o=0;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(D),f){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return c=null,e},i=oe.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else while(t=e[r++])n+=i(t);return n},(r=oe.selectors={cacheLength:50,createPseudo:se,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Z,ee),e[3]=(e[3]||e[4]||e[5]||"").replace(Z,ee),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||oe.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&oe.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return V.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=a(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Z,ee).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=E[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&E(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=oe.attr(r,e);return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace($," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",y=t.parentNode,v=s&&t.nodeName.toLowerCase(),m=!u&&!s,x=!1;if(y){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?y.firstChild:y.lastChild],a&&m){x=(d=(l=(c=(f=(p=y)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1])&&l[2],p=d&&y.childNodes[d];while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if(1===p.nodeType&&++x&&p===t){c[e]=[T,d,x];break}}else if(m&&(x=d=(l=(c=(f=(p=t)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1]),!1===x)while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===v:1===p.nodeType)&&++x&&(m&&((c=(f=p[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]=[T,x]),p===t))break;return(x-=i)===r||x%r==0&&x/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||oe.error("unsupported pseudo: "+e);return i[b]?i(t):i.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?se(function(e,n){var r,o=i(e,t),a=o.length;while(a--)e[r=O(e,o[a])]=!(n[r]=o[a])}):function(e){return i(e,0,n)}):i}},pseudos:{not:se(function(e){var t=[],n=[],r=s(e.replace(B,"$1"));return r[b]?se(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:se(function(e){return function(t){return oe(e,t).length>0}}),contains:se(function(e){return e=e.replace(Z,ee),function(t){return(t.textContent||t.innerText||i(t)).indexOf(e)>-1}}),lang:se(function(e){return U.test(e||"")||oe.error("unsupported lang: "+e),e=e.replace(Z,ee).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===d.activeElement&&(!d.hasFocus||d.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:de(!1),disabled:de(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return Y.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:he(function(){return[0]}),last:he(function(e,t){return[t-1]}),eq:he(function(e,t,n){return[n<0?n+t:n]}),even:he(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:he(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:he(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:he(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=r.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=fe(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=pe(t);function ye(){}ye.prototype=r.filters=r.pseudos,r.setFilters=new ye,a=oe.tokenize=function(e,t){var n,i,o,a,s,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=r.preFilter;while(s){n&&!(i=F.exec(s))||(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),n=!1,(i=_.exec(s))&&(n=i.shift(),o.push({value:n,type:i[0].replace(B," ")}),s=s.slice(n.length));for(a in r.filter)!(i=V[a].exec(s))||l[a]&&!(i=l[a](i))||(n=i.shift(),o.push({value:n,type:a,matches:i}),s=s.slice(n.length));if(!n)break}return t?s.length:s?oe.error(e):k(e,u).slice(0)};function ve(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function me(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var l,c,f,p=[T,s];if(u){while(t=t[r])if((1===t.nodeType||a)&&e(t,n,u))return!0}else while(t=t[r])if(1===t.nodeType||a)if(f=t[b]||(t[b]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=c[o])&&l[0]===T&&l[1]===s)return p[2]=l[2];if(c[o]=p,p[2]=e(t,n,u))return!0}return!1}}function xe(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function be(e,t,n){for(var r=0,i=t.length;r<i;r++)oe(e,t[r],n);return n}function we(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Te(e,t,n,r,i,o){return r&&!r[b]&&(r=Te(r)),i&&!i[b]&&(i=Te(i,o)),se(function(o,a,s,u){var l,c,f,p=[],d=[],h=a.length,g=o||be(t||"*",s.nodeType?[s]:s,[]),y=!e||!o&&t?g:we(g,p,e,s,u),v=n?i||(o?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r){l=we(v,d),r(l,[],s,u),c=l.length;while(c--)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f))}if(o){if(i||e){if(i){l=[],c=v.length;while(c--)(f=v[c])&&l.push(y[c]=f);i(null,v=[],l,u)}c=v.length;while(c--)(f=v[c])&&(l=i?O(o,f):p[c])>-1&&(o[l]=!(a[l]=f))}}else v=we(v===a?v.splice(h,v.length):v),i?i(null,a,v,u):L.apply(a,v)})}function Ce(e){for(var t,n,i,o=e.length,a=r.relative[e[0].type],s=a||r.relative[" "],u=a?1:0,c=me(function(e){return e===t},s,!0),f=me(function(e){return O(t,e)>-1},s,!0),p=[function(e,n,r){var i=!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,i}];u<o;u++)if(n=r.relative[e[u].type])p=[me(xe(p),n)];else{if((n=r.filter[e[u].type].apply(null,e[u].matches))[b]){for(i=++u;i<o;i++)if(r.relative[e[i].type])break;return Te(u>1&&xe(p),u>1&&ve(e.slice(0,u-1).concat({value:" "===e[u-2].type?"*":""})).replace(B,"$1"),n,u<i&&Ce(e.slice(u,i)),i<o&&Ce(e=e.slice(i)),i<o&&ve(e))}p.push(n)}return xe(p)}function Ee(e,t){var n=t.length>0,i=e.length>0,o=function(o,a,s,u,c){var f,h,y,v=0,m="0",x=o&&[],b=[],w=l,C=o||i&&r.find.TAG("*",c),E=T+=null==w?1:Math.random()||.1,k=C.length;for(c&&(l=a===d||a||c);m!==k&&null!=(f=C[m]);m++){if(i&&f){h=0,a||f.ownerDocument===d||(p(f),s=!g);while(y=e[h++])if(y(f,a||d,s)){u.push(f);break}c&&(T=E)}n&&((f=!y&&f)&&v--,o&&x.push(f))}if(v+=m,n&&m!==v){h=0;while(y=t[h++])y(x,b,a,s);if(o){if(v>0)while(m--)x[m]||b[m]||(b[m]=j.call(u));b=we(b)}L.apply(u,b),c&&!o&&b.length>0&&v+t.length>1&&oe.uniqueSort(u)}return c&&(T=E,l=w),x};return n?se(o):o}return s=oe.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=a(e)),n=t.length;while(n--)(o=Ce(t[n]))[b]?r.push(o):i.push(o);(o=S(e,Ee(i,r))).selector=e}return o},u=oe.select=function(e,t,n,i){var o,u,l,c,f,p="function"==typeof e&&e,d=!i&&a(e=p.selector||e);if(n=n||[],1===d.length){if((u=d[0]=d[0].slice(0)).length>2&&"ID"===(l=u[0]).type&&9===t.nodeType&&g&&r.relative[u[1].type]){if(!(t=(r.find.ID(l.matches[0].replace(Z,ee),t)||[])[0]))return n;p&&(t=t.parentNode),e=e.slice(u.shift().value.length)}o=V.needsContext.test(e)?0:u.length;while(o--){if(l=u[o],r.relative[c=l.type])break;if((f=r.find[c])&&(i=f(l.matches[0].replace(Z,ee),K.test(u[0].type)&&ge(t.parentNode)||t))){if(u.splice(o,1),!(e=i.length&&ve(u)))return L.apply(n,i),n;break}}}return(p||s(e,d))(i,t,!g,n,!t||K.test(e)&&ge(t.parentNode)||t),n},n.sortStable=b.split("").sort(D).join("")===b,n.detectDuplicates=!!f,p(),n.sortDetached=ue(function(e){return 1&e.compareDocumentPosition(d.createElement("fieldset"))}),ue(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||le("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ue(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||le("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ue(function(e){return null==e.getAttribute("disabled")})||le(P,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),oe}(e);w.find=E,w.expr=E.selectors,w.expr[":"]=w.expr.pseudos,w.uniqueSort=w.unique=E.uniqueSort,w.text=E.getText,w.isXMLDoc=E.isXML,w.contains=E.contains,w.escapeSelector=E.escape;var k=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&w(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},D=w.expr.match.needsContext;function N(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var A=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,t,n){return g(t)?w.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?w.grep(e,function(e){return e===t!==n}):"string"!=typeof t?w.grep(e,function(e){return u.call(t,e)>-1!==n}):w.filter(t,e,n)}w.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?w.find.matchesSelector(r,e)?[r]:[]:w.find.matches(e,w.grep(t,function(e){return 1===e.nodeType}))},w.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(w(e).filter(function(){for(t=0;t<r;t++)if(w.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)w.find(e,i[t],n);return r>1?w.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&D.test(e)?w(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init=function(e,t,n){var i,o;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof w?t[0]:t,w.merge(this,w.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:r,!0)),A.test(i[1])&&w.isPlainObject(t))for(i in t)g(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(o=r.getElementById(i[2]))&&(this[0]=o,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):g(e)?void 0!==n.ready?n.ready(e):e(w):w.makeArray(e,this)}).prototype=w.fn,q=w(r);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};w.fn.extend({has:function(e){var t=w(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(w.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&w(e);if(!D.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&w.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?w.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?u.call(w(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(w.uniqueSort(w.merge(this.get(),w(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}w.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return k(e,"parentNode")},parentsUntil:function(e,t,n){return k(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return k(e,"nextSibling")},prevAll:function(e){return k(e,"previousSibling")},nextUntil:function(e,t,n){return k(e,"nextSibling",n)},prevUntil:function(e,t,n){return k(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return N(e,"iframe")?e.contentDocument:(N(e,"template")&&(e=e.content||e),w.merge([],e.childNodes))}},function(e,t){w.fn[e]=function(n,r){var i=w.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=w.filter(r,i)),this.length>1&&(O[e]||w.uniqueSort(i),H.test(e)&&i.reverse()),this.pushStack(i)}});var M=/[^\x20\t\r\n\f]+/g;function R(e){var t={};return w.each(e.match(M)||[],function(e,n){t[n]=!0}),t}w.Callbacks=function(e){e="string"==typeof e?R(e):w.extend({},e);var t,n,r,i,o=[],a=[],s=-1,u=function(){for(i=i||e.once,r=t=!0;a.length;s=-1){n=a.shift();while(++s<o.length)!1===o[s].apply(n[0],n[1])&&e.stopOnFalse&&(s=o.length,n=!1)}e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},l={add:function(){return o&&(n&&!t&&(s=o.length-1,a.push(n)),function t(n){w.each(n,function(n,r){g(r)?e.unique&&l.has(r)||o.push(r):r&&r.length&&"string"!==x(r)&&t(r)})}(arguments),n&&!t&&u()),this},remove:function(){return w.each(arguments,function(e,t){var n;while((n=w.inArray(t,o,n))>-1)o.splice(n,1),n<=s&&s--}),this},has:function(e){return e?w.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=a=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=a=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=[e,(n=n||[]).slice?n.slice():n],a.push(n),t||u()),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!r}};return l};function I(e){return e}function W(e){throw e}function $(e,t,n,r){var i;try{e&&g(i=e.promise)?i.call(e).done(t).fail(n):e&&g(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}w.extend({Deferred:function(t){var n=[["notify","progress",w.Callbacks("memory"),w.Callbacks("memory"),2],["resolve","done",w.Callbacks("once memory"),w.Callbacks("once memory"),0,"resolved"],["reject","fail",w.Callbacks("once memory"),w.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},"catch":function(e){return i.then(null,e)},pipe:function(){var e=arguments;return w.Deferred(function(t){w.each(n,function(n,r){var i=g(e[r[4]])&&e[r[4]];o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&g(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){var o=0;function a(t,n,r,i){return function(){var s=this,u=arguments,l=function(){var e,l;if(!(t<o)){if((e=r.apply(s,u))===n.promise())throw new TypeError("Thenable self-resolution");l=e&&("object"==typeof e||"function"==typeof e)&&e.then,g(l)?i?l.call(e,a(o,n,I,i),a(o,n,W,i)):(o++,l.call(e,a(o,n,I,i),a(o,n,W,i),a(o,n,I,n.notifyWith))):(r!==I&&(s=void 0,u=[e]),(i||n.resolveWith)(s,u))}},c=i?l:function(){try{l()}catch(e){w.Deferred.exceptionHook&&w.Deferred.exceptionHook(e,c.stackTrace),t+1>=o&&(r!==W&&(s=void 0,u=[e]),n.rejectWith(s,u))}};t?c():(w.Deferred.getStackHook&&(c.stackTrace=w.Deferred.getStackHook()),e.setTimeout(c))}}return w.Deferred(function(e){n[0][3].add(a(0,e,g(i)?i:I,e.notifyWith)),n[1][3].add(a(0,e,g(t)?t:I)),n[2][3].add(a(0,e,g(r)?r:W))}).promise()},promise:function(e){return null!=e?w.extend(e,i):i}},o={};return w.each(n,function(e,t){var a=t[2],s=t[5];i[t[1]]=a.add,s&&a.add(function(){r=s},n[3-e][2].disable,n[3-e][3].disable,n[0][2].lock,n[0][3].lock),a.add(t[3].fire),o[t[0]]=function(){return o[t[0]+"With"](this===o?void 0:this,arguments),this},o[t[0]+"With"]=a.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=o.call(arguments),a=w.Deferred(),s=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?o.call(arguments):n,--t||a.resolveWith(r,i)}};if(t<=1&&($(e,a.done(s(n)).resolve,a.reject,!t),"pending"===a.state()||g(i[n]&&i[n].then)))return a.then();while(n--)$(i[n],s(n),a.reject);return a.promise()}});var B=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook=function(t,n){e.console&&e.console.warn&&t&&B.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},w.readyException=function(t){e.setTimeout(function(){throw t})};var F=w.Deferred();w.fn.ready=function(e){return F.then(e)["catch"](function(e){w.readyException(e)}),this},w.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--w.readyWait:w.isReady)||(w.isReady=!0,!0!==e&&--w.readyWait>0||F.resolveWith(r,[w]))}}),w.ready.then=F.then;function _(){r.removeEventListener("DOMContentLoaded",_),e.removeEventListener("load",_),w.ready()}"complete"===r.readyState||"loading"!==r.readyState&&!r.documentElement.doScroll?e.setTimeout(w.ready):(r.addEventListener("DOMContentLoaded",_),e.addEventListener("load",_));var z=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===x(n)){i=!0;for(s in n)z(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,g(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(w(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},X=/^-ms-/,U=/-([a-z])/g;function V(e,t){return t.toUpperCase()}function G(e){return e.replace(X,"ms-").replace(U,V)}var Y=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Q(){this.expando=w.expando+Q.uid++}Q.uid=1,Q.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Y(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[G(t)]=n;else for(r in t)i[G(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][G(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(G):(t=G(t))in r?[t]:t.match(M)||[]).length;while(n--)delete r[t[n]]}(void 0===t||w.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!w.isEmptyObject(t)}};var J=new Q,K=new Q,Z=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ee=/[A-Z]/g;function te(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Z.test(e)?JSON.parse(e):e)}function ne(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(ee,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n=te(n)}catch(e){}K.set(e,t,n)}else n=void 0;return n}w.extend({hasData:function(e){return K.hasData(e)||J.hasData(e)},data:function(e,t,n){return K.access(e,t,n)},removeData:function(e,t){K.remove(e,t)},_data:function(e,t,n){return J.access(e,t,n)},_removeData:function(e,t){J.remove(e,t)}}),w.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=K.get(o),1===o.nodeType&&!J.get(o,"hasDataAttrs"))){n=a.length;while(n--)a[n]&&0===(r=a[n].name).indexOf("data-")&&(r=G(r.slice(5)),ne(o,r,i[r]));J.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){K.set(this,e)}):z(this,function(t){var n;if(o&&void 0===t){if(void 0!==(n=K.get(o,e)))return n;if(void 0!==(n=ne(o,e)))return n}else this.each(function(){K.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){K.remove(this,e)})}}),w.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=J.get(e,t),n&&(!r||Array.isArray(n)?r=J.access(e,t,w.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=w.queue(e,t),r=n.length,i=n.shift(),o=w._queueHooks(e,t),a=function(){w.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return J.get(e,n)||J.access(e,n,{empty:w.Callbacks("once memory").add(function(){J.remove(e,[t+"queue",n])})})}}),w.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?w.queue(this[0],e):void 0===t?this:this.each(function(){var n=w.queue(this,e,t);w._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&w.dequeue(this,e)})},dequeue:function(e){return this.each(function(){w.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=w.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=J.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var re=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ie=new RegExp("^(?:([+-])=|)("+re+")([a-z%]*)$","i"),oe=["Top","Right","Bottom","Left"],ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&w.contains(e.ownerDocument,e)&&"none"===w.css(e,"display")},se=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i};function ue(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return w.css(e,t,"")},u=s(),l=n&&n[3]||(w.cssNumber[t]?"":"px"),c=(w.cssNumber[t]||"px"!==l&&+u)&&ie.exec(w.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)w.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,w.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var le={};function ce(e){var t,n=e.ownerDocument,r=e.nodeName,i=le[r];return i||(t=n.body.appendChild(n.createElement(r)),i=w.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),le[r]=i,i)}function fe(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)(r=e[o]).style&&(n=r.style.display,t?("none"===n&&(i[o]=J.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&ae(r)&&(i[o]=ce(r))):"none"!==n&&(i[o]="none",J.set(r,"display",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}w.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?w(this).show():w(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;function ye(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&N(e,t)?w.merge([e],n):n}function ve(e,t){for(var n=0,r=e.length;n<r;n++)J.set(e[n],"globalEval",!t||J.get(t[n],"globalEval"))}var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===x(o))w.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+w.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;w.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&w.inArray(o,r)>-1)i&&i.push(o);else if(l=w.contains(o.ownerDocument,o),a=ye(f.appendChild(o),"script"),l&&ve(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}!function(){var e=r.createDocumentFragment().appendChild(r.createElement("div")),t=r.createElement("input");t.setAttribute("type","radio"),t.setAttribute("checked","checked"),t.setAttribute("name","t"),e.appendChild(t),h.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",h.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var be=r.documentElement,we=/^key/,Te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ce=/^([^.]*)(?:\.(.+)|)/;function Ee(){return!0}function ke(){return!1}function Se(){try{return r.activeElement}catch(e){}}function De(e,t,n,r,i,o){var a,s;if("object"==typeof t){"string"!=typeof n&&(r=r||n,n=void 0);for(s in t)De(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=ke;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return w().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=w.guid++)),e.each(function(){w.event.add(this,t,i,r,n)})}w.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.get(e);if(y){n.handler&&(n=(o=n).handler,i=o.selector),i&&w.find.matchesSelector(be,i),n.guid||(n.guid=w.guid++),(u=y.events)||(u=y.events={}),(a=y.handle)||(a=y.handle=function(t){return"undefined"!=typeof w&&w.event.triggered!==t.type?w.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||"").match(M)||[""]).length;while(l--)d=g=(s=Ce.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=w.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=w.event.special[d]||{},c=w.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&w.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,r,h,a)||e.addEventListener&&e.addEventListener(d,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),w.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.hasData(e)&&J.get(e);if(y&&(u=y.events)){l=(t=(t||"").match(M)||[""]).length;while(l--)if(s=Ce.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){f=w.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,y.handle)||w.removeEvent(e,d,y.handle),delete u[d])}else for(d in u)w.event.remove(e,d+t[l],n,r,!0);w.isEmptyObject(u)&&J.remove(e,"handle events")}},dispatch:function(e){var t=w.event.fix(e),n,r,i,o,a,s,u=new Array(arguments.length),l=(J.get(this,"events")||{})[t.type]||[],c=w.event.special[t.type]||{};for(u[0]=t,n=1;n<arguments.length;n++)u[n]=arguments[n];if(t.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,t)){s=w.event.handlers.call(this,t,l),n=0;while((o=s[n++])&&!t.isPropagationStopped()){t.currentTarget=o.elem,r=0;while((a=o.handlers[r++])&&!t.isImmediatePropagationStopped())t.rnamespace&&!t.rnamespace.test(a.namespace)||(t.handleObj=a,t.data=a.data,void 0!==(i=((w.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u))&&!1===(t.result=i)&&(t.preventDefault(),t.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,t),t.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?w(i,this).index(l)>-1:w.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(w.Event.prototype,e,{enumerable:!0,configurable:!0,get:g(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[w.expando]?e:new w.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Se()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===Se()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&N(this,"input"))return this.click(),!1},_default:function(e){return N(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},w.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},w.Event=function(e,t){if(!(this instanceof w.Event))return new w.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ee:ke,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&w.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[w.expando]=!0},w.Event.prototype={constructor:w.Event,isDefaultPrevented:ke,isPropagationStopped:ke,isImmediatePropagationStopped:ke,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ee,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ee,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ee,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},w.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&we.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Te.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},w.event.addProp),w.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){w.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||w.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),w.fn.extend({on:function(e,t,n,r){return De(this,e,t,n,r)},one:function(e,t,n,r){return De(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,w(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=ke),this.each(function(){w.event.remove(this,e,n,t)})}});var Ne=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Ae=/<script|<style|<link/i,je=/checked\s*(?:[^=]|=\s*.checked.)/i,qe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e,t){return N(e,"table")&&N(11!==t.nodeType?t:t.firstChild,"tr")?w(e).children("tbody")[0]||e:e}function He(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Oe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Pe(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(J.hasData(e)&&(o=J.access(e),a=J.set(t,o),l=o.events)){delete a.handle,a.events={};for(i in l)for(n=0,r=l[i].length;n<r;n++)w.event.add(t,i,l[i][n])}K.hasData(e)&&(s=K.access(e),u=w.extend({},s),K.set(t,u))}}function Me(e,t){var n=t.nodeName.toLowerCase();"input"===n&&pe.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Re(e,t,n,r){t=a.apply([],t);var i,o,s,u,l,c,f=0,p=e.length,d=p-1,y=t[0],v=g(y);if(v||p>1&&"string"==typeof y&&!h.checkClone&&je.test(y))return e.each(function(i){var o=e.eq(i);v&&(t[0]=y.call(this,i,o.html())),Re(o,t,n,r)});if(p&&(i=xe(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(u=(s=w.map(ye(i,"script"),He)).length;f<p;f++)l=i,f!==d&&(l=w.clone(l,!0,!0),u&&w.merge(s,ye(l,"script"))),n.call(e[f],l,f);if(u)for(c=s[s.length-1].ownerDocument,w.map(s,Oe),f=0;f<u;f++)l=s[f],he.test(l.type||"")&&!J.access(l,"globalEval")&&w.contains(c,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?w._evalUrl&&w._evalUrl(l.src):m(l.textContent.replace(qe,""),c,l))}return e}function Ie(e,t,n){for(var r,i=t?w.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||w.cleanData(ye(r)),r.parentNode&&(n&&w.contains(r.ownerDocument,r)&&ve(ye(r,"script")),r.parentNode.removeChild(r));return e}w.extend({htmlPrefilter:function(e){return e.replace(Ne,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=w.contains(e.ownerDocument,e);if(!(h.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||w.isXMLDoc(e)))for(a=ye(s),r=0,i=(o=ye(e)).length;r<i;r++)Me(o[r],a[r]);if(t)if(n)for(o=o||ye(e),a=a||ye(s),r=0,i=o.length;r<i;r++)Pe(o[r],a[r]);else Pe(e,s);return(a=ye(s,"script")).length>0&&ve(a,!u&&ye(e,"script")),s},cleanData:function(e){for(var t,n,r,i=w.event.special,o=0;void 0!==(n=e[o]);o++)if(Y(n)){if(t=n[J.expando]){if(t.events)for(r in t.events)i[r]?w.event.remove(n,r):w.removeEvent(n,r,t.handle);n[J.expando]=void 0}n[K.expando]&&(n[K.expando]=void 0)}}}),w.fn.extend({detach:function(e){return Ie(this,e,!0)},remove:function(e){return Ie(this,e)},text:function(e){return z(this,function(e){return void 0===e?w.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Re(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Le(this,e).appendChild(e)})},prepend:function(){return Re(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Le(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(w.cleanData(ye(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return w.clone(this,e,t)})},html:function(e){return z(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ae.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=w.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(w.cleanData(ye(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return Re(this,arguments,function(t){var n=this.parentNode;w.inArray(this,e)<0&&(w.cleanData(ye(this)),n&&n.replaceChild(t,this))},e)}}),w.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){w.fn[e]=function(e){for(var n,r=[],i=w(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),w(i[a])[t](n),s.apply(r,n.get());return this.pushStack(r)}});var We=new RegExp("^("+re+")(?!px)[a-z%]+$","i"),$e=function(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},Be=new RegExp(oe.join("|"),"i");!function(){function t(){if(c){l.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",c.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",be.appendChild(l).appendChild(c);var t=e.getComputedStyle(c);i="1%"!==t.top,u=12===n(t.marginLeft),c.style.right="60%",s=36===n(t.right),o=36===n(t.width),c.style.position="absolute",a=36===c.offsetWidth||"absolute",be.removeChild(l),c=null}}function n(e){return Math.round(parseFloat(e))}var i,o,a,s,u,l=r.createElement("div"),c=r.createElement("div");c.style&&(c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",h.clearCloneStyle="content-box"===c.style.backgroundClip,w.extend(h,{boxSizingReliable:function(){return t(),o},pixelBoxStyles:function(){return t(),s},pixelPosition:function(){return t(),i},reliableMarginLeft:function(){return t(),u},scrollboxSize:function(){return t(),a}}))}();function Fe(e,t,n){var r,i,o,a,s=e.style;return(n=n||$e(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||w.contains(e.ownerDocument,e)||(a=w.style(e,t)),!h.pixelBoxStyles()&&We.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function _e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}var ze=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ue={position:"absolute",visibility:"hidden",display:"block"},Ve={letterSpacing:"0",fontWeight:"400"},Ge=["Webkit","Moz","ms"],Ye=r.createElement("div").style;function Qe(e){if(e in Ye)return e;var t=e[0].toUpperCase()+e.slice(1),n=Ge.length;while(n--)if((e=Ge[n]+t)in Ye)return e}function Je(e){var t=w.cssProps[e];return t||(t=w.cssProps[e]=Qe(e)||e),t}function Ke(e,t,n){var r=ie.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ze(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=w.css(e,n+oe[a],!0,i)),r?("content"===n&&(u-=w.css(e,"padding"+oe[a],!0,i)),"margin"!==n&&(u-=w.css(e,"border"+oe[a]+"Width",!0,i))):(u+=w.css(e,"padding"+oe[a],!0,i),"padding"!==n?u+=w.css(e,"border"+oe[a]+"Width",!0,i):s+=w.css(e,"border"+oe[a]+"Width",!0,i));return!r&&o>=0&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))),u}function et(e,t,n){var r=$e(e),i=Fe(e,t,r),o="border-box"===w.css(e,"boxSizing",!1,r),a=o;if(We.test(i)){if(!n)return i;i="auto"}return a=a&&(h.boxSizingReliable()||i===e.style[t]),("auto"===i||!parseFloat(i)&&"inline"===w.css(e,"display",!1,r))&&(i=e["offset"+t[0].toUpperCase()+t.slice(1)],a=!0),(i=parseFloat(i)||0)+Ze(e,t,n||(o?"border":"content"),a,r,i)+"px"}w.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Fe(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=G(t),u=Xe.test(t),l=e.style;if(u||(t=Je(s)),a=w.cssHooks[t]||w.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"==(o=typeof n)&&(i=ie.exec(n))&&i[1]&&(n=ue(e,t,i),o="number"),null!=n&&n===n&&("number"===o&&(n+=i&&i[3]||(w.cssNumber[s]?"":"px")),h.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=G(t);return Xe.test(t)||(t=Je(s)),(a=w.cssHooks[t]||w.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Fe(e,t,r)),"normal"===i&&t in Ve&&(i=Ve[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),w.each(["height","width"],function(e,t){w.cssHooks[t]={get:function(e,n,r){if(n)return!ze.test(w.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?et(e,t,r):se(e,Ue,function(){return et(e,t,r)})},set:function(e,n,r){var i,o=$e(e),a="border-box"===w.css(e,"boxSizing",!1,o),s=r&&Ze(e,t,r,a,o);return a&&h.scrollboxSize()===o.position&&(s-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-Ze(e,t,"border",!1,o)-.5)),s&&(i=ie.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=w.css(e,t)),Ke(e,n,s)}}}),w.cssHooks.marginLeft=_e(h.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Fe(e,"marginLeft"))||e.getBoundingClientRect().left-se(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),w.each({margin:"",padding:"",border:"Width"},function(e,t){w.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+oe[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(w.cssHooks[e+t].set=Ke)}),w.fn.extend({css:function(e,t){return z(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=$e(e),i=t.length;a<i;a++)o[t[a]]=w.css(e,t[a],!1,r);return o}return void 0!==n?w.style(e,t,n):w.css(e,t)},e,t,arguments.length>1)}});function tt(e,t,n,r,i){return new tt.prototype.init(e,t,n,r,i)}w.Tween=tt,tt.prototype={constructor:tt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||w.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(w.cssNumber[n]?"":"px")},cur:function(){var e=tt.propHooks[this.prop];return e&&e.get?e.get(this):tt.propHooks._default.get(this)},run:function(e){var t,n=tt.propHooks[this.prop];return this.options.duration?this.pos=t=w.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):tt.propHooks._default.set(this),this}},tt.prototype.init.prototype=tt.prototype,tt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=w.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){w.fx.step[e.prop]?w.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[w.cssProps[e.prop]]&&!w.cssHooks[e.prop]?e.elem[e.prop]=e.now:w.style(e.elem,e.prop,e.now+e.unit)}}},tt.propHooks.scrollTop=tt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},w.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},w.fx=tt.prototype.init,w.fx.step={};var nt,rt,it=/^(?:toggle|show|hide)$/,ot=/queueHooks$/;function at(){rt&&(!1===r.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(at):e.setTimeout(at,w.fx.interval),w.fx.tick())}function st(){return e.setTimeout(function(){nt=void 0}),nt=Date.now()}function ut(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=oe[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function lt(e,t,n){for(var r,i=(pt.tweeners[t]||[]).concat(pt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ct(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),y=J.get(e,"fxshow");n.queue||(null==(a=w._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,w.queue(e,"fx").length||a.empty.fire()})}));for(r in t)if(i=t[r],it.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!y||void 0===y[r])continue;g=!0}d[r]=y&&y[r]||w.style(e,r)}if((u=!w.isEmptyObject(t))||!w.isEmptyObject(d)){f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=y&&y.display)&&(l=J.get(e,"display")),"none"===(c=w.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=w.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===w.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1;for(r in d)u||(y?"hidden"in y&&(g=y.hidden):y=J.access(e,"fxshow",{display:l}),o&&(y.hidden=!g),g&&fe([e],!0),p.done(function(){g||fe([e]),J.remove(e,"fxshow");for(r in d)w.style(e,r,d[r])})),u=lt(g?y[r]:0,r,p),r in y||(y[r]=u.start,g&&(u.end=u.start,u.start=0))}}function ft(e,t){var n,r,i,o,a;for(n in e)if(r=G(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=w.cssHooks[r])&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function pt(e,t,n){var r,i,o=0,a=pt.prefilters.length,s=w.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=nt||st(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,a=l.tweens.length;o<a;o++)l.tweens[o].run(r);return s.notifyWith(e,[l,r,n]),r<1&&a?n:(a||s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:w.extend({},t),opts:w.extend(!0,{specialEasing:{},easing:w.easing._default},n),originalProperties:t,originalOptions:n,startTime:nt||st(),duration:n.duration,tweens:[],createTween:function(t,n){var r=w.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1);return t?(s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l,t])):s.rejectWith(e,[l,t]),this}}),c=l.props;for(ft(c,l.opts.specialEasing);o<a;o++)if(r=pt.prefilters[o].call(l,e,c,l.opts))return g(r.stop)&&(w._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r;return w.map(c,lt,l),g(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),w.fx.timer(w.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l}w.Animation=w.extend(pt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ue(n.elem,e,ie.exec(t),n),n}]},tweener:function(e,t){g(e)?(t=e,e=["*"]):e=e.match(M);for(var n,r=0,i=e.length;r<i;r++)n=e[r],pt.tweeners[n]=pt.tweeners[n]||[],pt.tweeners[n].unshift(t)},prefilters:[ct],prefilter:function(e,t){t?pt.prefilters.unshift(e):pt.prefilters.push(e)}}),w.speed=function(e,t,n){var r=e&&"object"==typeof e?w.extend({},e):{complete:n||!n&&t||g(e)&&e,duration:e,easing:n&&t||t&&!g(t)&&t};return w.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in w.fx.speeds?r.duration=w.fx.speeds[r.duration]:r.duration=w.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){g(r.old)&&r.old.call(this),r.queue&&w.dequeue(this,r.queue)},r},w.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=w.isEmptyObject(e),o=w.speed(t,n,r),a=function(){var t=pt(this,w.extend({},e),o);(i||J.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=w.timers,a=J.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&ot.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||w.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=J.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=w.timers,a=r?r.length:0;for(n.finish=!0,w.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),w.each(["toggle","show","hide"],function(e,t){var n=w.fn[t];w.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ut(t,!0),e,r,i)}}),w.each({slideDown:ut("show"),slideUp:ut("hide"),slideToggle:ut("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){w.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),w.timers=[],w.fx.tick=function(){var e,t=0,n=w.timers;for(nt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||w.fx.stop(),nt=void 0},w.fx.timer=function(e){w.timers.push(e),w.fx.start()},w.fx.interval=13,w.fx.start=function(){rt||(rt=!0,at())},w.fx.stop=function(){rt=null},w.fx.speeds={slow:600,fast:200,_default:400},w.fn.delay=function(t,n){return t=w.fx?w.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=r.createElement("input"),t=r.createElement("select").appendChild(r.createElement("option"));e.type="checkbox",h.checkOn=""!==e.value,h.optSelected=t.selected,(e=r.createElement("input")).value="t",e.type="radio",h.radioValue="t"===e.value}();var dt,ht=w.expr.attrHandle;w.fn.extend({attr:function(e,t){return z(this,w.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){w.removeAttr(this,e)})}}),w.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?w.prop(e,t,n):(1===o&&w.isXMLDoc(e)||(i=w.attrHooks[t.toLowerCase()]||(w.expr.match.bool.test(t)?dt:void 0)),void 0!==n?null===n?void w.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=w.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!h.radioValue&&"radio"===t&&N(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(M);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),dt={set:function(e,t,n){return!1===t?w.removeAttr(e,n):e.setAttribute(n,n),n}},w.each(w.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ht[t]||w.find.attr;ht[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=ht[a],ht[a]=i,i=null!=n(e,t,r)?a:null,ht[a]=o),i}});var gt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;w.fn.extend({prop:function(e,t){return z(this,w.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[w.propFix[e]||e]})}}),w.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&w.isXMLDoc(e)||(t=w.propFix[t]||t,i=w.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=w.find.attr(e,"tabindex");return t?parseInt(t,10):gt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),h.optSelected||(w.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),w.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){w.propFix[this.toLowerCase()]=this});function vt(e){return(e.match(M)||[]).join(" ")}function mt(e){return e.getAttribute&&e.getAttribute("class")||""}function xt(e){return Array.isArray(e)?e:"string"==typeof e?e.match(M)||[]:[]}w.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).addClass(e.call(this,t,mt(this)))});if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).removeClass(e.call(this,t,mt(this)))});if(!arguments.length)return this.attr("class","");if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])while(r.indexOf(" "+o+" ")>-1)r=r.replace(" "+o+" "," ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e,r="string"===n||Array.isArray(e);return"boolean"==typeof t&&r?t?this.addClass(e):this.removeClass(e):g(e)?this.each(function(n){w(this).toggleClass(e.call(this,n,mt(this),t),t)}):this.each(function(){var t,i,o,a;if(r){i=0,o=w(this),a=xt(e);while(t=a[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else void 0!==e&&"boolean"!==n||((t=mt(this))&&J.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":J.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&(" "+vt(mt(n))+" ").indexOf(t)>-1)return!0;return!1}});var bt=/\r/g;w.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=g(e),this.each(function(n){var i;1===this.nodeType&&(null==(i=r?e.call(this,n,w(this).val()):e)?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=w.map(i,function(e){return null==e?"":e+""})),(t=w.valHooks[this.type]||w.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return(t=w.valHooks[i.type]||w.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(bt,""):null==n?"":n}}}),w.extend({valHooks:{option:{get:function(e){var t=w.find.attr(e,"value");return null!=t?t:vt(w.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!N(n.parentNode,"optgroup"))){if(t=w(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=w.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=w.inArray(w.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),w.each(["radio","checkbox"],function(){w.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=w.inArray(w(e).val(),t)>-1}},h.checkOn||(w.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),h.focusin="onfocusin"in e;var wt=/^(?:focusinfocus|focusoutblur)$/,Tt=function(e){e.stopPropagation()};w.extend(w.event,{trigger:function(t,n,i,o){var a,s,u,l,c,p,d,h,v=[i||r],m=f.call(t,"type")?t.type:t,x=f.call(t,"namespace")?t.namespace.split("."):[];if(s=h=u=i=i||r,3!==i.nodeType&&8!==i.nodeType&&!wt.test(m+w.event.triggered)&&(m.indexOf(".")>-1&&(m=(x=m.split(".")).shift(),x.sort()),c=m.indexOf(":")<0&&"on"+m,t=t[w.expando]?t:new w.Event(m,"object"==typeof t&&t),t.isTrigger=o?2:3,t.namespace=x.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+x.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:w.makeArray(n,[t]),d=w.event.special[m]||{},o||!d.trigger||!1!==d.trigger.apply(i,n))){if(!o&&!d.noBubble&&!y(i)){for(l=d.delegateType||m,wt.test(l+m)||(s=s.parentNode);s;s=s.parentNode)v.push(s),u=s;u===(i.ownerDocument||r)&&v.push(u.defaultView||u.parentWindow||e)}a=0;while((s=v[a++])&&!t.isPropagationStopped())h=s,t.type=a>1?l:d.bindType||m,(p=(J.get(s,"events")||{})[t.type]&&J.get(s,"handle"))&&p.apply(s,n),(p=c&&s[c])&&p.apply&&Y(s)&&(t.result=p.apply(s,n),!1===t.result&&t.preventDefault());return t.type=m,o||t.isDefaultPrevented()||d._default&&!1!==d._default.apply(v.pop(),n)||!Y(i)||c&&g(i[m])&&!y(i)&&((u=i[c])&&(i[c]=null),w.event.triggered=m,t.isPropagationStopped()&&h.addEventListener(m,Tt),i[m](),t.isPropagationStopped()&&h.removeEventListener(m,Tt),w.event.triggered=void 0,u&&(i[c]=u)),t.result}},simulate:function(e,t,n){var r=w.extend(new w.Event,n,{type:e,isSimulated:!0});w.event.trigger(r,null,t)}}),w.fn.extend({trigger:function(e,t){return this.each(function(){w.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return w.event.trigger(e,t,n,!0)}}),h.focusin||w.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){w.event.simulate(t,e.target,w.event.fix(e))};w.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=J.access(r,t);i||r.addEventListener(e,n,!0),J.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=J.access(r,t)-1;i?J.access(r,t,i):(r.removeEventListener(e,n,!0),J.remove(r,t))}}});var Ct=e.location,Et=Date.now(),kt=/\?/;w.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;try{n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(e){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||w.error("Invalid XML: "+t),n};var St=/\[\]$/,Dt=/\r?\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,At=/^(?:input|select|textarea|keygen)/i;function jt(e,t,n,r){var i;if(Array.isArray(t))w.each(t,function(t,i){n||St.test(e)?r(e,i):jt(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==x(t))r(e,t);else for(i in t)jt(e+"["+i+"]",t[i],n,r)}w.param=function(e,t){var n,r=[],i=function(e,t){var n=g(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!w.isPlainObject(e))w.each(e,function(){i(this.name,this.value)});else for(n in e)jt(n,e[n],t,i);return r.join("&")},w.fn.extend({serialize:function(){return w.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=w.prop(this,"elements");return e?w.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!w(this).is(":disabled")&&At.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=w(this).val();return null==n?null:Array.isArray(n)?w.map(n,function(e){return{name:t.name,value:e.replace(Dt,"\r\n")}}):{name:t.name,value:n.replace(Dt,"\r\n")}}).get()}});var qt=/%20/g,Lt=/#.*$/,Ht=/([?&])_=[^&]*/,Ot=/^(.*?):[ \t]*([^\r\n]*)$/gm,Pt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Mt=/^(?:GET|HEAD)$/,Rt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Bt=r.createElement("a");Bt.href=Ct.href;function Ft(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(M)||[];if(g(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function _t(e,t,n,r){var i={},o=e===Wt;function a(s){var u;return i[s]=!0,w.each(e[s]||[],function(e,s){var l=s(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):void 0:(t.dataTypes.unshift(l),a(l),!1)}),u}return a(t.dataTypes[0])||!i["*"]&&a("*")}function zt(e,t){var n,r,i=w.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&w.extend(!0,e,r),e}function Xt(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}function Ut(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}w.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ct.href,type:"GET",isLocal:Pt.test(Ct.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":w.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,w.ajaxSettings),t):zt(w.ajaxSettings,e)},ajaxPrefilter:Ft(It),ajaxTransport:Ft(Wt),ajax:function(t,n){"object"==typeof t&&(n=t,t=void 0),n=n||{};var i,o,a,s,u,l,c,f,p,d,h=w.ajaxSetup({},n),g=h.context||h,y=h.context&&(g.nodeType||g.jquery)?w(g):w.event,v=w.Deferred(),m=w.Callbacks("once memory"),x=h.statusCode||{},b={},T={},C="canceled",E={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s){s={};while(t=Ot.exec(a))s[t[1].toLowerCase()]=t[2]}t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return c?a:null},setRequestHeader:function(e,t){return null==c&&(e=T[e.toLowerCase()]=T[e.toLowerCase()]||e,b[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)E.always(e[E.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||C;return i&&i.abort(t),k(0,t),this}};if(v.promise(E),h.url=((t||h.url||Ct.href)+"").replace(Rt,Ct.protocol+"//"),h.type=n.method||n.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(M)||[""],null==h.crossDomain){l=r.createElement("a");try{l.href=h.url,l.href=l.href,h.crossDomain=Bt.protocol+"//"+Bt.host!=l.protocol+"//"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=w.param(h.data,h.traditional)),_t(It,h,n,E),c)return E;(f=w.event&&h.global)&&0==w.active++&&w.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Mt.test(h.type),o=h.url.replace(Lt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(qt,"+")):(d=h.url.slice(o.length),h.data&&(h.processData||"string"==typeof h.data)&&(o+=(kt.test(o)?"&":"?")+h.data,delete h.data),!1===h.cache&&(o=o.replace(Ht,"$1"),d=(kt.test(o)?"&":"?")+"_="+Et+++d),h.url=o+d),h.ifModified&&(w.lastModified[o]&&E.setRequestHeader("If-Modified-Since",w.lastModified[o]),w.etag[o]&&E.setRequestHeader("If-None-Match",w.etag[o])),(h.data&&h.hasContent&&!1!==h.contentType||n.contentType)&&E.setRequestHeader("Content-Type",h.contentType),E.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+$t+"; q=0.01":""):h.accepts["*"]);for(p in h.headers)E.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(!1===h.beforeSend.call(g,E,h)||c))return E.abort();if(C="abort",m.add(h.complete),E.done(h.success),E.fail(h.error),i=_t(Wt,h,n,E)){if(E.readyState=1,f&&y.trigger("ajaxSend",[E,h]),c)return E;h.async&&h.timeout>0&&(u=e.setTimeout(function(){E.abort("timeout")},h.timeout));try{c=!1,i.send(b,k)}catch(e){if(c)throw e;k(-1,e)}}else k(-1,"No Transport");function k(t,n,r,s){var l,p,d,b,T,C=n;c||(c=!0,u&&e.clearTimeout(u),i=void 0,a=s||"",E.readyState=t>0?4:0,l=t>=200&&t<300||304===t,r&&(b=Xt(h,E,r)),b=Ut(h,b,E,l),l?(h.ifModified&&((T=E.getResponseHeader("Last-Modified"))&&(w.lastModified[o]=T),(T=E.getResponseHeader("etag"))&&(w.etag[o]=T)),204===t||"HEAD"===h.type?C="nocontent":304===t?C="notmodified":(C=b.state,p=b.data,l=!(d=b.error))):(d=C,!t&&C||(C="error",t<0&&(t=0))),E.status=t,E.statusText=(n||C)+"",l?v.resolveWith(g,[p,C,E]):v.rejectWith(g,[E,C,d]),E.statusCode(x),x=void 0,f&&y.trigger(l?"ajaxSuccess":"ajaxError",[E,h,l?p:d]),m.fireWith(g,[E,C]),f&&(y.trigger("ajaxComplete",[E,h]),--w.active||w.event.trigger("ajaxStop")))}return E},getJSON:function(e,t,n){return w.get(e,t,n,"json")},getScript:function(e,t){return w.get(e,void 0,t,"script")}}),w.each(["get","post"],function(e,t){w[t]=function(e,n,r,i){return g(n)&&(i=i||r,r=n,n=void 0),w.ajax(w.extend({url:e,type:t,dataType:i,data:n,success:r},w.isPlainObject(e)&&e))}}),w._evalUrl=function(e){return w.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},w.fn.extend({wrapAll:function(e){var t;return this[0]&&(g(e)&&(e=e.call(this[0])),t=w(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return g(e)?this.each(function(t){w(this).wrapInner(e.call(this,t))}):this.each(function(){var t=w(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=g(e);return this.each(function(n){w(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){w(this).replaceWith(this.childNodes)}),this}}),w.expr.pseudos.hidden=function(e){return!w.expr.pseudos.visible(e)},w.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},w.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var Vt={0:200,1223:204},Gt=w.ajaxSettings.xhr();h.cors=!!Gt&&"withCredentials"in Gt,h.ajax=Gt=!!Gt,w.ajaxTransport(function(t){var n,r;if(h.cors||Gt&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)s[a]=t.xhrFields[a];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(a in i)s.setRequestHeader(a,i[a]);n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.ontimeout=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?o(0,"error"):o(s.status,s.statusText):o(Vt[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=n(),r=s.onerror=s.ontimeout=n("error"),void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){4===s.readyState&&e.setTimeout(function(){n&&r()})},n=n("abort");try{s.send(t.hasContent&&t.data||null)}catch(e){if(n)throw e}},abort:function(){n&&n()}}}),w.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),w.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return w.globalEval(e),e}}}),w.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),w.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(i,o){t=w("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)}),r.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Yt=[],Qt=/(=)\?(?=&|$)|\?\?/;w.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Yt.pop()||w.expando+"_"+Et++;return this[e]=!0,e}}),w.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=!1!==t.jsonp&&(Qt.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Qt.test(t.data)&&"data");if(s||"jsonp"===t.dataTypes[0])return i=t.jsonpCallback=g(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(Qt,"$1"+i):!1!==t.jsonp&&(t.url+=(kt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||w.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){void 0===o?w(e).removeProp(i):e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Yt.push(i)),a&&g(o)&&o(a[0]),a=o=void 0}),"script"}),h.createHTMLDocument=function(){var e=r.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),w.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var i,o,a;return t||(h.createHTMLDocument?((i=(t=r.implementation.createHTMLDocument("")).createElement("base")).href=r.location.href,t.head.appendChild(i)):t=r),o=A.exec(e),a=!n&&[],o?[t.createElement(o[1])]:(o=xe([e],t,a),a&&a.length&&w(a).remove(),w.merge([],o.childNodes))},w.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return s>-1&&(r=vt(e.slice(s)),e=e.slice(0,s)),g(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&w.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?w("<div>").append(w.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},w.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){w.fn[t]=function(e){return this.on(t,e)}}),w.expr.pseudos.animated=function(e){return w.grep(w.timers,function(t){return e===t.elem}).length},w.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l,c=w.css(e,"position"),f=w(e),p={};"static"===c&&(e.style.position="relative"),s=f.offset(),o=w.css(e,"top"),u=w.css(e,"left"),(l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1)?(a=(r=f.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),g(t)&&(t=t.call(e,n,w.extend({},s))),null!=t.top&&(p.top=t.top-s.top+a),null!=t.left&&(p.left=t.left-s.left+i),"using"in t?t.using.call(e,p):f.css(p)}},w.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){w.offset.setOffset(this,e,t)});var t,n,r=this[0];if(r)return r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===w.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===w.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=w(e).offset()).top+=w.css(e,"borderTopWidth",!0),i.left+=w.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-w.css(r,"marginTop",!0),left:t.left-i.left-w.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===w.css(e,"position"))e=e.offsetParent;return e||be})}}),w.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;w.fn[e]=function(r){return z(this,function(e,r,i){var o;if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i},e,r,arguments.length)}}),w.each(["top","left"],function(e,t){w.cssHooks[t]=_e(h.pixelPosition,function(e,n){if(n)return n=Fe(e,t),We.test(n)?w(e).position()[t]+"px":n})}),w.each({Height:"height",Width:"width"},function(e,t){w.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){w.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(!0===i||!0===o?"margin":"border");return z(this,function(t,n,i){var o;return y(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?w.css(t,n,s):w.style(t,n,i,s)},t,a?i:void 0,a)}})}),w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){w.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),w.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),w.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),w.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),g(e))return r=o.call(arguments,2),i=function(){return e.apply(t||this,r.concat(o.call(arguments)))},i.guid=e.guid=e.guid||w.guid++,i},w.holdReady=function(e){e?w.readyWait++:w.ready(!0)},w.isArray=Array.isArray,w.parseJSON=JSON.parse,w.nodeName=N,w.isFunction=g,w.isWindow=y,w.camelCase=G,w.type=x,w.now=Date.now,w.isNumeric=function(e){var t=w.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"=="function"&&__webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){return w}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Jt=e.jQuery,Kt=e.$;return w.noConflict=function(t){return e.$===w&&(e.$=Kt),t&&e.jQuery===w&&(e.jQuery=Jt),w},t||(e.jQuery=e.$=w),w});

/***/ }),

/***/ "./src/client/js/lib/pnglib.js":
/*!*************************************!*\
  !*** ./src/client/js/lib/pnglib.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
* A handy class to calculate color values.
*
* @version 1.0
* @author Robert Eisele <robert@xarg.org>
* @copyright Copyright (c) 2010, Robert Eisele
* @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
* @license http://www.opensource.org/licenses/bsd-license.php BSD License
*
*/

(function() {

	// helper functions for that ctx
	function write(buffer, offs) {
		for (var i = 2; i < arguments.length; i++) {
			for (var j = 0; j < arguments[i].length; j++) {
				buffer[offs++] = arguments[i].charAt(j);
			}
		}
	}

	function byte2(w) {
		return String.fromCharCode((w >> 8) & 255, w & 255);
	}

	function byte4(w) {
		return String.fromCharCode((w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255);
	}

	function byte2lsb(w) {
		return String.fromCharCode(w & 255, (w >> 8) & 255);
	}

	window.PNGlib = function(width,height,depth) {

		this.width   = width;
		this.height  = height;
		this.depth   = depth;

		// pixel data and row filter identifier size
		this.pix_size = height * (width + 1);

		// deflate header, pix_size, block headers, adler32 checksum
		this.data_size = 2 + this.pix_size + 5 * Math.floor((0xfffe + this.pix_size) / 0xffff) + 4;

		// offsets and sizes of Png chunks
		this.ihdr_offs = 0;									// IHDR offset and size
		this.ihdr_size = 4 + 4 + 13 + 4;
		this.plte_offs = this.ihdr_offs + this.ihdr_size;	// PLTE offset and size
		this.plte_size = 4 + 4 + 3 * depth + 4;
		this.trns_offs = this.plte_offs + this.plte_size;	// tRNS offset and size
		this.trns_size = 4 + 4 + depth + 4;
		this.idat_offs = this.trns_offs + this.trns_size;	// IDAT offset and size
		this.idat_size = 4 + 4 + this.data_size + 4;
		this.iend_offs = this.idat_offs + this.idat_size;	// IEND offset and size
		this.iend_size = 4 + 4 + 4;
		this.buffer_size  = this.iend_offs + this.iend_size;	// total PNG size

		this.buffer  = new Array();
		this.palette = new Object();
		this.pindex  = 0;

		var _crc32 = new Array();

		// initialize buffer with zero bytes
		for (var i = 0; i < this.buffer_size; i++) {
			this.buffer[i] = "\x00";
		}

		// initialize non-zero elements
		write(this.buffer, this.ihdr_offs, byte4(this.ihdr_size - 12), 'IHDR', byte4(width), byte4(height), "\x08\x03");
		write(this.buffer, this.plte_offs, byte4(this.plte_size - 12), 'PLTE');
		write(this.buffer, this.trns_offs, byte4(this.trns_size - 12), 'tRNS');
		write(this.buffer, this.idat_offs, byte4(this.idat_size - 12), 'IDAT');
		write(this.buffer, this.iend_offs, byte4(this.iend_size - 12), 'IEND');

		// initialize deflate header
		var header = ((8 + (7 << 4)) << 8) | (3 << 6);
		header+= 31 - (header % 31);

		write(this.buffer, this.idat_offs + 8, byte2(header));

		// initialize deflate block headers
		for (var i = 0; (i << 16) - 1 < this.pix_size; i++) {
			var size, bits;
			if (i + 0xffff < this.pix_size) {
				size = 0xffff;
				bits = "\x00";
			} else {
				size = this.pix_size - (i << 16) - i;
				bits = "\x01";
			}
			write(this.buffer, this.idat_offs + 8 + 2 + (i << 16) + (i << 2), bits, byte2lsb(size), byte2lsb(~size));
		}

		/* Create crc32 lookup table */
		for (var i = 0; i < 256; i++) {
			var c = i;
			for (var j = 0; j < 8; j++) {
				if (c & 1) {
					c = -306674912 ^ ((c >> 1) & 0x7fffffff);
				} else {
					c = (c >> 1) & 0x7fffffff;
				}
			}
			_crc32[i] = c;
		}

		// compute the index into a png for a given pixel
		this.index = function(x,y) {
			var i = y * (this.width + 1) + x + 1;
			var j = this.idat_offs + 8 + 2 + 5 * Math.floor((i / 0xffff) + 1) + i;
			return j;
		}

		// convert a color and build up the palette
		this.color = function(red, green, blue, alpha) {

			alpha = alpha >= 0 ? alpha : 255;
			var color = (((((alpha << 8) | red) << 8) | green) << 8) | blue;

			if (typeof this.palette[color] == "undefined") {
				if (this.pindex == this.depth) return "\x00";

				var ndx = this.plte_offs + 8 + 3 * this.pindex;

				this.buffer[ndx + 0] = String.fromCharCode(red);
				this.buffer[ndx + 1] = String.fromCharCode(green);
				this.buffer[ndx + 2] = String.fromCharCode(blue);
				this.buffer[this.trns_offs+8+this.pindex] = String.fromCharCode(alpha);

				this.palette[color] = String.fromCharCode(this.pindex++);
			}
			return this.palette[color];
		}

		// output a PNG string, Base64 encoded
		this.getBase64 = function() {

			var s = this.getDump();

			var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var c1, c2, c3, e1, e2, e3, e4;
			var l = s.length;
			var i = 0;
			var r = "";

			do {
				c1 = s.charCodeAt(i);
				e1 = c1 >> 2;
				c2 = s.charCodeAt(i+1);
				e2 = ((c1 & 3) << 4) | (c2 >> 4);
				c3 = s.charCodeAt(i+2);
				if (l < i+2) { e3 = 64; } else { e3 = ((c2 & 0xf) << 2) | (c3 >> 6); }
				if (l < i+3) { e4 = 64; } else { e4 = c3 & 0x3f; }
				r+= ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);
			} while ((i+= 3) < l);
			return r;
		}

		// output a PNG string
		this.getDump = function() {

			// compute adler32 of output pixels + row filter bytes
			var BASE = 65521; /* largest prime smaller than 65536 */
			var NMAX = 5552;  /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */
			var s1 = 1;
			var s2 = 0;
			var n = NMAX;

			for (var y = 0; y < this.height; y++) {
				for (var x = -1; x < this.width; x++) {
					s1+= this.buffer[this.index(x, y)].charCodeAt(0);
					s2+= s1;
					if ((n-= 1) == 0) {
						s1%= BASE;
						s2%= BASE;
						n = NMAX;
					}
				}
			}
			s1%= BASE;
			s2%= BASE;
			write(this.buffer, this.idat_offs + this.idat_size - 8, byte4((s2 << 16) | s1));

			// compute crc32 of the PNG chunks
			function crc32(png, offs, size) {
				var crc = -1;
				for (var i = 4; i < size-4; i += 1) {
					crc = _crc32[(crc ^ png[offs+i].charCodeAt(0)) & 0xff] ^ ((crc >> 8) & 0x00ffffff);
				}
				write(png, offs+size-4, byte4(crc ^ -1));
			}

			crc32(this.buffer, this.ihdr_offs, this.ihdr_size);
			crc32(this.buffer, this.plte_offs, this.plte_size);
			crc32(this.buffer, this.trns_offs, this.trns_size);
			crc32(this.buffer, this.idat_offs, this.idat_size);
			crc32(this.buffer, this.iend_offs, this.iend_size);

			// convert PNG to string
			return "\211PNG\r\n\032\n"+this.buffer.join('');
		}
	}

})();

/***/ }),

/***/ "./src/client/js/lib/sha512.js":
/*!*************************************!*\
  !*** ./src/client/js/lib/sha512.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.sha512 = function(str) {
  function int64(msint_32, lsint_32) {
    this.highOrder = msint_32;
    this.lowOrder = lsint_32;
  }

  var H = [new int64(0x6a09e667, 0xf3bcc908), new int64(0xbb67ae85, 0x84caa73b),
      new int64(0x3c6ef372, 0xfe94f82b), new int64(0xa54ff53a, 0x5f1d36f1),
      new int64(0x510e527f, 0xade682d1), new int64(0x9b05688c, 0x2b3e6c1f),
      new int64(0x1f83d9ab, 0xfb41bd6b), new int64(0x5be0cd19, 0x137e2179)];

  var K = [new int64(0x428a2f98, 0xd728ae22), new int64(0x71374491, 0x23ef65cd),
      new int64(0xb5c0fbcf, 0xec4d3b2f), new int64(0xe9b5dba5, 0x8189dbbc),
      new int64(0x3956c25b, 0xf348b538), new int64(0x59f111f1, 0xb605d019),
      new int64(0x923f82a4, 0xaf194f9b), new int64(0xab1c5ed5, 0xda6d8118),
      new int64(0xd807aa98, 0xa3030242), new int64(0x12835b01, 0x45706fbe),
      new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, 0xd5ffb4e2),
      new int64(0x72be5d74, 0xf27b896f), new int64(0x80deb1fe, 0x3b1696b1),
      new int64(0x9bdc06a7, 0x25c71235), new int64(0xc19bf174, 0xcf692694),
      new int64(0xe49b69c1, 0x9ef14ad2), new int64(0xefbe4786, 0x384f25e3),
      new int64(0x0fc19dc6, 0x8b8cd5b5), new int64(0x240ca1cc, 0x77ac9c65),
      new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
      new int64(0x5cb0a9dc, 0xbd41fbd4), new int64(0x76f988da, 0x831153b5),
      new int64(0x983e5152, 0xee66dfab), new int64(0xa831c66d, 0x2db43210),
      new int64(0xb00327c8, 0x98fb213f), new int64(0xbf597fc7, 0xbeef0ee4),
      new int64(0xc6e00bf3, 0x3da88fc2), new int64(0xd5a79147, 0x930aa725),
      new int64(0x06ca6351, 0xe003826f), new int64(0x14292967, 0x0a0e6e70),
      new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
      new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, 0x9d95b3df),
      new int64(0x650a7354, 0x8baf63de), new int64(0x766a0abb, 0x3c77b2a8),
      new int64(0x81c2c92e, 0x47edaee6), new int64(0x92722c85, 0x1482353b),
      new int64(0xa2bfe8a1, 0x4cf10364), new int64(0xa81a664b, 0xbc423001),
      new int64(0xc24b8b70, 0xd0f89791), new int64(0xc76c51a3, 0x0654be30),
      new int64(0xd192e819, 0xd6ef5218), new int64(0xd6990624, 0x5565a910),
      new int64(0xf40e3585, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
      new int64(0x19a4c116, 0xb8d2d0c8), new int64(0x1e376c08, 0x5141ab53),
      new int64(0x2748774c, 0xdf8eeb99), new int64(0x34b0bcb5, 0xe19b48a8),
      new int64(0x391c0cb3, 0xc5c95a63), new int64(0x4ed8aa4a, 0xe3418acb),
      new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, 0xd6b2b8a3),
      new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
      new int64(0x84c87814, 0xa1f0ab72), new int64(0x8cc70208, 0x1a6439ec),
      new int64(0x90befffa, 0x23631e28), new int64(0xa4506ceb, 0xde82bde9),
      new int64(0xbef9a3f7, 0xb2c67915), new int64(0xc67178f2, 0xe372532b),
      new int64(0xca273ece, 0xea26619c), new int64(0xd186b8c7, 0x21c0c207),
      new int64(0xeada7dd6, 0xcde0eb1e), new int64(0xf57d4f7f, 0xee6ed178),
      new int64(0x06f067aa, 0x72176fba), new int64(0x0a637dc5, 0xa2c898a6),
      new int64(0x113f9804, 0xbef90dae), new int64(0x1b710b35, 0x131c471b),
      new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
      new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, 0x9c100d4c),
      new int64(0x4cc5d4be, 0xcb3e42b6), new int64(0x597f299c, 0xfc657e2a),
      new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)];

  var W = new Array(64);
  var a, b, c, d, e, f, g, h, i, j;
  var T1, T2;
  var charsize = 8;

  function utf8_encode(str) {
    return unescape(encodeURIComponent(str));
  }

  function str2binb(str) {
    var bin = [];
    var mask = (1 << charsize) - 1;
    var len = str.length * charsize;

    for (var i = 0; i < len; i += charsize) {
      bin[i >> 5] |= (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32));
    }

    return bin;
  }

  function binb2hex(binarray) {
    var hex_tab = "0123456789abcdef";
    var str = "";
    var length = binarray.length * 4;
    var srcByte;

    for (var i = 0; i < length; i += 1) {
      srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8);
      str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF);
    }

    return str;
  }

  function safe_add_2(x, y) {
    var lsw, msw, lowOrder, highOrder;

    lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
    msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
    lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
    msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
    highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    return new int64(highOrder, lowOrder);
  }

  function safe_add_4(a, b, c, d) {
    var lsw, msw, lowOrder, highOrder;

    lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
    msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
    lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
    msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
    highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    return new int64(highOrder, lowOrder);
  }

  function safe_add_5(a, b, c, d, e) {
    var lsw, msw, lowOrder, highOrder;

    lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) + (e.lowOrder & 0xFFFF);
    msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (lsw >>> 16);
    lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (e.highOrder & 0xFFFF) + (msw >>> 16);
    msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (lsw >>> 16);
    highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

    return new int64(highOrder, lowOrder);
  }

  function maj(x, y, z) {
    return new int64(
      (x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
      (x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
    );
  }

  function ch(x, y, z) {
    return new int64(
      (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
      (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
    );
  }

  function rotr(x, n) {
    if (n <= 32) {
      return new int64(
       (x.highOrder >>> n) | (x.lowOrder << (32 - n)),
       (x.lowOrder >>> n) | (x.highOrder << (32 - n))
      );
    } else {
      return new int64(
       (x.lowOrder >>> n) | (x.highOrder << (32 - n)),
       (x.highOrder >>> n) | (x.lowOrder << (32 - n))
      );
    }
  }

  function sigma0(x) {
    var rotr28 = rotr(x, 28);
    var rotr34 = rotr(x, 34);
    var rotr39 = rotr(x, 39);

    return new int64(
      rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
      rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder
    );
  }

  function sigma1(x) {
    var rotr14 = rotr(x, 14);
    var rotr18 = rotr(x, 18);
    var rotr41 = rotr(x, 41);

    return new int64(
      rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
      rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder
    );
  }

  function gamma0(x) {
    var rotr1 = rotr(x, 1), rotr8 = rotr(x, 8), shr7 = shr(x, 7);

    return new int64(
      rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
      rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
    );
  }

  function gamma1(x) {
    var rotr19 = rotr(x, 19);
    var rotr61 = rotr(x, 61);
    var shr6 = shr(x, 6);

    return new int64(
      rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
      rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
    );
  }

  function shr(x, n) {
    if (n <= 32) {
      return new int64(
       x.highOrder >>> n,
       x.lowOrder >>> n | (x.highOrder << (32 - n))
      );
    } else {
      return new int64(
       0,
       x.highOrder << (32 - n)
      );
    }
  }

  str = utf8_encode(str);
  strlen = str.length*charsize;
  str = str2binb(str);

  str[strlen >> 5] |= 0x80 << (24 - strlen % 32);
  str[(((strlen + 128) >> 10) << 5) + 31] = strlen;

  for (var i = 0; i < str.length; i += 32) {
    a = H[0];
    b = H[1];
    c = H[2];
    d = H[3];
    e = H[4];
    f = H[5];
    g = H[6];
    h = H[7];

    for (var j = 0; j < 80; j++) {
      if (j < 16) {
       W[j] = new int64(str[j*2 + i], str[j*2 + i + 1]);
      } else {
       W[j] = safe_add_4(gamma1(W[j - 2]), W[j - 7], gamma0(W[j - 15]), W[j - 16]);
      }

      T1 = safe_add_5(h, sigma1(e), ch(e, f, g), K[j], W[j]);
      T2 = safe_add_2(sigma0(a), maj(a, b, c));
      h = g;
      g = f;
      f = e;
      e = safe_add_2(d, T1);
      d = c;
      c = b;
      b = a;
      a = safe_add_2(T1, T2);
    }

    H[0] = safe_add_2(a, H[0]);
    H[1] = safe_add_2(b, H[1]);
    H[2] = safe_add_2(c, H[2]);
    H[3] = safe_add_2(d, H[3]);
    H[4] = safe_add_2(e, H[4]);
    H[5] = safe_add_2(f, H[5]);
    H[6] = safe_add_2(g, H[6]);
    H[7] = safe_add_2(h, H[7]);
  }

  var binarray = [];
  for (var i = 0; i < H.length; i++) {
    binarray.push(H[i].highOrder);
    binarray.push(H[i].lowOrder);
  }
  return binb2hex(binarray);
}


/***/ }),

/***/ "./src/client/js/lib/socket.io.js":
/*!****************************************!*\
  !*** ./src/client/js/lib/socket.io.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var url = _dereq_('./url');
var parser = _dereq_('socket.io-parser');
var Manager = _dereq_('./manager');
var debug = _dereq_('debug')('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if (typeof uri == 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }

  return io.socket(parsed.path);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = _dereq_('./manager');
exports.Socket = _dereq_('./socket');

},{"./manager":2,"./socket":4,"./url":5,"debug":14,"socket.io-parser":40}],2:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var eio = _dereq_('engine.io-client');
var Socket = _dereq_('./socket');
var Emitter = _dereq_('component-emitter');
var parser = _dereq_('socket.io-parser');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var debug = _dereq_('debug')('socket.io-client:manager');
var indexOf = _dereq_('indexof');
var Backoff = _dereq_('backo2');

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts){
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' == typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  this.encoder = new parser.Encoder();
  this.decoder = new parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function() {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function(){
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.engine.id;
    }
  }
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function(v){
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function(v){
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function(v){
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function(v){
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function(v){
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function(v){
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function() {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};


/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function(fn){
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function() {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function(data){
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function(){
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function(){
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function(){
  this.lastPing = new Date;
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function(){
  this.emitAll('pong', new Date - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function(data){
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function(packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function(err){
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function(nsp){
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function(){
      socket.id = self.engine.id;
    });

    if (this.autoConnect) {
      // manually call here since connecting evnet is fired before listening
      onConnecting();
    }
  }

  function onConnecting() {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function(socket){
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function(packet){
  debug('writing packet %j', packet);
  var self = this;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function(encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function() {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function(){
  debug('cleanup');

  var sub;
  while (sub = this.subs.shift()) sub.destroy();

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function(){
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' == this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function(reason){
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function(){
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function(){
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function(err){
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function(){
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

},{"./on":3,"./socket":4,"backo2":8,"component-bind":11,"component-emitter":12,"debug":14,"engine.io-client":16,"indexof":32,"socket.io-parser":40}],3:[function(_dereq_,module,exports){

/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function(){
      obj.removeListener(ev, fn);
    }
  };
}

},{}],4:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var parser = _dereq_('socket.io-parser');
var Emitter = _dereq_('component-emitter');
var toArray = _dereq_('to-array');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var debug = _dereq_('debug')('socket.io-client:socket');
var hasBin = _dereq_('has-binary');

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp){
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function() {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function(){
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' == this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function(){
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function(ev){
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var parserType = parser.EVENT; // default
  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
  var packet = { type: parserType, data: args };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' == typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  delete this.flags;

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function(packet){
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function(){
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' != this.nsp) {
    this.packet({ type: parser.CONNECT });
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function(reason){
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function(packet){
  if (packet.nsp != this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function(packet){
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function(id){
  var self = this;
  var sent = false;
  return function(){
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
    self.packet({
      type: type,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function(packet){
  var ack = this.acks[packet.id];
  if ('function' == typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function(){
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function(){
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function(){
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function(){
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function(){
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function(compress){
  this.flags = this.flags || {};
  this.flags.compress = compress;
  return this;
};

},{"./on":3,"component-bind":11,"component-emitter":12,"debug":14,"has-binary":30,"socket.io-parser":40,"to-array":43}],5:[function(_dereq_,module,exports){
(function (global){

/**
 * Module dependencies.
 */

var parseuri = _dereq_('parseuri');
var debug = _dereq_('debug')('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc){
  var obj = uri;

  // default to window.location
  var loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' == typeof uri) {
    if ('/' == uri.charAt(0)) {
      if ('/' == uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' != typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    }
    else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port == obj.port ? '' : (':' + obj.port));

  return obj;
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"debug":14,"parseuri":38}],6:[function(_dereq_,module,exports){
module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}

},{}],7:[function(_dereq_,module,exports){
/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

},{}],8:[function(_dereq_,module,exports){

/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};


},{}],9:[function(_dereq_,module,exports){
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();

},{}],10:[function(_dereq_,module,exports){
(function (global){
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],11:[function(_dereq_,module,exports){
/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};

},{}],12:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],13:[function(_dereq_,module,exports){

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
},{}],14:[function(_dereq_,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":15}],15:[function(_dereq_,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = _dereq_('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":35}],16:[function(_dereq_,module,exports){

module.exports =  _dereq_('./lib/');

},{"./lib/":17}],17:[function(_dereq_,module,exports){

module.exports = _dereq_('./socket');

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = _dereq_('engine.io-parser');

},{"./socket":18,"engine.io-parser":27}],18:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var transports = _dereq_('./transports');
var Emitter = _dereq_('component-emitter');
var debug = _dereq_('debug')('engine.io-client:socket');
var index = _dereq_('indexof');
var parser = _dereq_('engine.io-parser');
var parseuri = _dereq_('parseuri');
var parsejson = _dereq_('parsejson');
var parseqs = _dereq_('parseqs');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Noop function.
 *
 * @api private
 */

function noop(){}

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts){
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' == typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure :
    (global.location && 'https:' == location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ?
       location.port :
       (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;

  // other options for Node.js client
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }
  }

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = _dereq_('./transport');
Socket.transports = _dereq_('./transports');
Socket.parser = _dereq_('engine.io-parser');

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    agent: this.agent,
    hostname: this.hostname,
    port: this.port,
    secure: this.secure,
    path: this.path,
    query: query,
    forceJSONP: this.forceJSONP,
    jsonp: this.jsonp,
    forceBase64: this.forceBase64,
    enablesXDR: this.enablesXDR,
    timestampRequests: this.timestampRequests,
    timestampParam: this.timestampParam,
    policyPort: this.policyPort,
    socket: this,
    pfx: this.pfx,
    key: this.key,
    passphrase: this.passphrase,
    cert: this.cert,
    ca: this.ca,
    ciphers: this.ciphers,
    rejectUnauthorized: this.rejectUnauthorized,
    perMessageDeflate: this.perMessageDeflate,
    extraHeaders: this.extraHeaders
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function() {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function(transport){
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function(){
    self.onDrain();
  })
  .on('packet', function(packet){
    self.onPacket(packet);
  })
  .on('error', function(e){
    self.onError(e);
  })
  .on('close', function(){
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 })
    , failed = false
    , self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen(){
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' == msg.type && 'probe' == msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' == transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' == self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  //Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose(){
    onerror("transport closed");
  }

  //When the socket is closed while we're probing
  function onclose(){
    onerror("socket closed");
  }

  //When the socket is upgraded while we're probing
  function onupgrade(to){
    if (transport && to.name != transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  //Remove all listeners on the transport and on self
  function cleanup(){
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();

};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' == this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(parsejson(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if  ('closed' == this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' == self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function(){
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function() {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' != this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if('function' == typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' == typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' == this.readyState || 'closed' == this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function() {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close() {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i<j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./transport":19,"./transports":20,"component-emitter":26,"debug":14,"engine.io-parser":27,"indexof":32,"parsejson":36,"parseqs":37,"parseuri":38}],19:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var parser = _dereq_('engine.io-parser');
var Emitter = _dereq_('component-emitter');

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' == this.readyState || '' == this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function(packets){
  if ('open' == this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function(data){
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

},{"component-emitter":26,"engine.io-parser":27}],20:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies
 */

var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
var XHR = _dereq_('./polling-xhr');
var JSONP = _dereq_('./polling-jsonp');
var websocket = _dereq_('./websocket');

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts){
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname != location.hostname || port != opts.port;
    xs = opts.secure != isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./polling-jsonp":21,"./polling-xhr":22,"./websocket":24,"xmlhttprequest-ssl":25}],21:[function(_dereq_,module,exports){
(function (global){

/**
 * Module requirements.
 */

var Polling = _dereq_('./polling');
var inherit = _dereq_('component-inherit');

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Callbacks count.
 */

var index = 0;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function(e){
    self.onError('jsonp poll error',e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  }
  else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
  
  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="'+ self.iframeId +'">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch(e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function(){
      if (self.iframe.readyState == 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./polling":23,"component-inherit":13}],22:[function(_dereq_,module,exports){
(function (global){
/**
 * Module requirements.
 */

var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
var Polling = _dereq_('./polling');
var Emitter = _dereq_('component-emitter');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty(){}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts){
  Polling.call(this, opts);

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname != global.location.hostname ||
      port != opts.port;
    this.xs = opts.secure != isSSL;
  } else {
    this.extraHeaders = opts.extraHeaders;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function(opts){
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function(data, fn){
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function(err){
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function(){
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function(data){
    self.onData(data);
  });
  req.on('error', function(err){
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts){
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined != opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function(){
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}
    if (this.supportsBinary) {
      // This has to be done after open because Firefox is stupid
      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
      xhr.responseType = 'arraybuffer';
    }

    if ('POST' == this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.hasXDR()) {
      xhr.onload = function(){
        self.onLoad();
      };
      xhr.onerror = function(){
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function(){
        if (4 != xhr.readyState) return;
        if (200 == xhr.status || 1223 == xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function(){
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function() {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function(){
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function(data){
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function(err){
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function(fromError){
  if ('undefined' == typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch(e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function(){
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response;
    } else {
      if (!this.supportsBinary) {
        data = this.xhr.responseText;
      } else {
        try {
          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
        } catch (e) {
          var ui8Arr = new Uint8Array(this.xhr.response);
          var dataArray = [];
          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
            dataArray.push(ui8Arr[idx]);
          }

          data = String.fromCharCode.apply(null, dataArray);
        }
      }
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function(){
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function(){
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

if (global.document) {
  Request.requestsCount = 0;
  Request.requests = {};
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./polling":23,"component-emitter":26,"component-inherit":13,"debug":14,"xmlhttprequest-ssl":25}],23:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parseqs = _dereq_('parseqs');
var parser = _dereq_('engine.io-parser');
var inherit = _dereq_('component-inherit');
var yeast = _dereq_('yeast');
var debug = _dereq_('debug')('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function() {
  var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function(){
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function(onPause){
  var pending = 0;
  var self = this;

  this.readyState = 'pausing';

  function pause(){
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function(){
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function(){
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function(){
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function(data){
  var self = this;
  debug('polling got data %s', data);
  var callback = function(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' == self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' == packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' != this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' == this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function(){
  var self = this;

  function close(){
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' == this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  var callbackfn = function() {
    self.writable = true;
    self.emit('drain');
  };

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function(data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' == schema && this.port != 443) ||
     ('http' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

},{"../transport":19,"component-inherit":13,"debug":14,"engine.io-parser":27,"parseqs":37,"xmlhttprequest-ssl":25,"yeast":45}],24:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parser = _dereq_('engine.io-parser');
var parseqs = _dereq_('parseqs');
var inherit = _dereq_('component-inherit');
var yeast = _dereq_('yeast');
var debug = _dereq_('debug')('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  try {
    WebSocket = _dereq_('ws');
  } catch (e) { }
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function(){
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var self = this;
  var uri = this.uri();
  var protocols = void(0);
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }

  this.ws = BrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'buffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function(){
  var self = this;

  this.ws.onopen = function(){
    self.onOpen();
  };
  this.ws.onclose = function(){
    self.onClose();
  };
  this.ws.onmessage = function(ev){
    self.onData(ev.data);
  };
  this.ws.onerror = function(e){
    self.onError('websocket error', e);
  };
};

/**
 * Override `onData` to use a timer on iOS.
 * See: https://gist.github.com/mloughran/2052006
 *
 * @api private
 */

if ('undefined' != typeof navigator
  && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
  WS.prototype.onData = function(data){
    var self = this;
    setTimeout(function(){
      Transport.prototype.onData.call(self, data);
    }, 0);
  };
}

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function(packets){
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function(packet) {
      parser.encodePacket(packet, self.supportsBinary, function(data) {
        if (!BrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' == typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        //Sometimes the websocket has already been closed but the browser didn't
        //have a chance of informing us about it yet, in that case send will
        //throw an error
        try {
          if (BrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e){
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done(){
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function(){
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function(){
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function(){
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' == schema && this.port != 443)
    || ('ws' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function(){
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"../transport":19,"component-inherit":13,"debug":14,"engine.io-parser":27,"parseqs":37,"ws":undefined,"yeast":45}],25:[function(_dereq_,module,exports){
// browser shim for xmlhttprequest module
var hasCORS = _dereq_('has-cors');

module.exports = function(opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) { }
  }
}

},{"has-cors":31}],26:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],27:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var keys = _dereq_('./keys');
var hasBinary = _dereq_('has-binary');
var sliceBuffer = _dereq_('arraybuffer.slice');
var base64encoder = _dereq_('base64-arraybuffer');
var after = _dereq_('after');
var utf8 = _dereq_('utf8');

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = navigator.userAgent.match(/Android/i);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = _dereq_('blob');

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if ('function' == typeof supportsBinary) {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if ('function' == typeof utf8encode) {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  // String data
  if (typeof data == 'string' || data === undefined) {
    if (data.charAt(0) == 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      try {
        data = utf8.decode(data);
      } catch (e) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!global.ArrayBuffer) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary == 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data != 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data == '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = ''
    , n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (':' != chr) {
      length += chr;
    } else {
      if ('' == length || (length != (n = Number(length)))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, true);

        if (err.type == packet.type && err.data == packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var ret = callback(packet, i + n, l);
        if (false === ret) return;
      }

      // advance cursor
      i += n;
      length = '';
    }
  }

  if (length != '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  var numberTooLong = false;
  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] == 255) break;

      if (msgLength.length > 310) {
        numberTooLong = true;
        break;
      }

      msgLength += tailArray[i];
    }

    if(numberTooLong) return callback(err, 0, 1);

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./keys":28,"after":6,"arraybuffer.slice":7,"base64-arraybuffer":9,"blob":10,"has-binary":29,"utf8":44}],28:[function(_dereq_,module,exports){

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

},{}],29:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"isarray":33}],30:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      // see: https://github.com/Automattic/has-binary/pull/4
      if (obj.toJSON && 'function' == typeof obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"isarray":33}],31:[function(_dereq_,module,exports){

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

},{}],32:[function(_dereq_,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],33:[function(_dereq_,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],34:[function(_dereq_,module,exports){
(function (global){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],35:[function(_dereq_,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],36:[function(_dereq_,module,exports){
(function (global){
/**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */

var rvalidchars = /^[\],:{}\s]*$/;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rtrimLeft = /^\s+/;
var rtrimRight = /\s+$/;

module.exports = function parsejson(data) {
  if ('string' != typeof data || !data) {
    return null;
  }

  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

  // Attempt to parse using the native JSON parser first
  if (global.JSON && JSON.parse) {
    return JSON.parse(data);
  }

  if (rvalidchars.test(data.replace(rvalidescape, '@')
      .replace(rvalidtokens, ']')
      .replace(rvalidbraces, ''))) {
    return (new Function('return ' + data))();
  }
};
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],37:[function(_dereq_,module,exports){
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

},{}],38:[function(_dereq_,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

},{}],39:[function(_dereq_,module,exports){
(function (global){
/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = _dereq_('isarray');
var isBuf = _dereq_('./is-buffer');

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet){
  var buffers = [];
  var packetData = packet.data;

  function _deconstructPacket(data) {
    if (!data) return data;

    if (isBuf(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isArray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i]);
      }
      return newData;
    } else if ('object' == typeof data && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key]);
      }
      return newData;
    }
    return data;
  }

  var pack = packet;
  pack.data = _deconstructPacket(packetData);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  var curPlaceHolder = 0;

  function _reconstructPacket(data) {
    if (data && data._placeholder) {
      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
      return buf;
    } else if (isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i]);
      }
      return data;
    } else if (data && 'object' == typeof data) {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key]);
      }
      return data;
    }
    return data;
  }

  packet.data = _reconstructPacket(packet.data);
  packet.attachments = undefined; // no longer useful
  return packet;
};

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((global.Blob && obj instanceof Blob) ||
        (global.File && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./is-buffer":41,"isarray":33}],40:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var debug = _dereq_('debug')('socket.io-parser');
var json = _dereq_('json3');
var isArray = _dereq_('isarray');
var Emitter = _dereq_('component-emitter');
var binary = _dereq_('./binary');
var isBuf = _dereq_('./is-buffer');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    encodeAsBinary(obj, callback);
  }
  else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {
  var str = '';
  var nsp = false;

  // first is type
  str += obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    str += obj.attachments;
    str += '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' != obj.nsp) {
    nsp = true;
    str += obj.nsp;
  }

  // immediately followed by the id
  if (null != obj.id) {
    if (nsp) {
      str += ',';
      nsp = false;
    }
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    if (nsp) str += ',';
    str += json.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if ('string' == typeof obj) {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var p = {};
  var i = 0;

  // look up type
  p.type = Number(str.charAt(0));
  if (null == exports.types[p.type]) return error();

  // look up attachments if type binary
  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
    var buf = '';
    while (str.charAt(++i) != '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) != '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' == str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' == c) break;
      p.nsp += c;
      if (i == str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i == str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    try {
      p.data = json.parse(str.substr(i));
    } catch(e){
      return error();
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(data){
  return {
    type: exports.ERROR,
    data: 'parser error'
  };
}

},{"./binary":39,"./is-buffer":41,"component-emitter":42,"debug":14,"isarray":33,"json3":34}],41:[function(_dereq_,module,exports){
(function (global){

module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],42:[function(_dereq_,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],43:[function(_dereq_,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}],44:[function(_dereq_,module,exports){
(function (global){
/*! https://mths.be/utf8js v2.0.0 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw Error(
				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
				' is not a scalar value'
			);
		}
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			checkScalarValue(codePoint);
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, itâ€™s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			var byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				checkScalarValue(codePoint);
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.0.0',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return utf8;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],45:[function(_dereq_,module,exports){
'use strict';

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

},{}]},{},[1])(1)
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/client/js/lib/webtorrent.js":
/*!*****************************************!*\
  !*** ./src/client/js/lib/webtorrent.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {var require;var require;!function(e){if(true)module.exports=e();else { var t; }}(function(){var e;return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return require(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[s]={exports:{}};t[s][0].call(f.exports,function(e){var n=t[s][1][e];return o(n||e)},f,f.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,n){function r(e,t){s.Readable.call(this,t),this.destroyed=!1,this._torrent=e._torrent;var n=t&&t.start||0,r=t&&t.end&&t.end<e.length?t.end:e.length-1,o=e._torrent.pieceLength;this._startPiece=(n+e.offset)/o|0,this._endPiece=(r+e.offset)/o|0,this._piece=this._startPiece,this._offset=n+e.offset-this._startPiece*o,this._missing=r-n+1,this._reading=!1,this._notifying=!1,this._criticalLength=Math.min(1048576/o|0,2)}t.exports=r;var o=e("debug")("webtorrent:file-stream"),i=e("inherits"),s=e("readable-stream");i(r,s.Readable),r.prototype._read=function(){this._reading||(this._reading=!0,this._notify())},r.prototype._notify=function(){var e=this;if(e._reading&&0!==e._missing){if(!e._torrent.bitfield.get(e._piece))return e._torrent.critical(e._piece,e._piece+e._criticalLength);if(!e._notifying){e._notifying=!0;var t=e._piece;e._torrent.store.get(t,function(n,r){if(e._notifying=!1,!e.destroyed){if(n)return e._destroy(n);o("read %s (length %s) (err %s)",t,r.length,n&&n.message),e._offset&&(r=r.slice(e._offset),e._offset=0),e._missing<r.length&&(r=r.slice(0,e._missing)),e._missing-=r.length,o("pushing buffer of length %s",r.length),e._reading=!1,e.push(r),0===e._missing&&e.push(null)}}),e._piece+=1}}},r.prototype.destroy=function(e){this._destroy(null,e)},r.prototype._destroy=function(e,t){this.destroyed||(this.destroyed=!0,this._torrent.destroyed||this._torrent.deselect(this._startPiece,this._endPiece,!0),e&&this.emit("error",e),this.emit("close"),t&&t())}},{debug:30,inherits:41,"readable-stream":82}],2:[function(e,t,n){(function(n){function r(e,t){i.call(this),this._torrent=e,this._destroyed=!1,this.name=t.name,this.path=t.path,this.length=t.length,this.offset=t.offset,this.done=!1;var n=t.offset,r=n+t.length-1;this._startPiece=n/this._torrent.pieceLength|0,this._endPiece=r/this._torrent.pieceLength|0,0===this.length&&(this.done=!0,this.emit("done"))}t.exports=r;var o=e("end-of-stream"),i=e("events").EventEmitter,s=e("./file-stream"),a=e("inherits"),u=e("path"),c=e("render-media"),f=e("readable-stream"),d=e("stream-to-blob"),h=e("stream-to-blob-url"),l=e("stream-with-known-length-to-buffer");a(r,i),Object.defineProperty(r.prototype,"downloaded",{get:function(){if(!this._torrent.bitfield)return 0;for(var e=0,t=this._startPiece;t<=this._endPiece;++t)if(this._torrent.bitfield.get(t))e+=this._torrent.pieceLength;else{var n=this._torrent.pieces[t];e+=n.length-n.missing}return e}}),r.prototype.select=function(e){0!==this.length&&this._torrent.select(this._startPiece,this._endPiece,e)},r.prototype.deselect=function(){0!==this.length&&this._torrent.deselect(this._startPiece,this._endPiece,!1)},r.prototype.createReadStream=function(e){var t=this;if(0===this.length){var r=new f.PassThrough;return n.nextTick(function(){r.end()}),r}var i=new s(t,e);return t._torrent.select(i._startPiece,i._endPiece,!0,function(){i._notify()}),o(i,function(){t._destroyed||t._torrent.destroyed||t._torrent.deselect(i._startPiece,i._endPiece,!0)}),i},r.prototype.getBuffer=function(e){l(this.createReadStream(),this.length,e)},r.prototype.getBlob=function(e){if("undefined"==typeof window)throw new Error("browser-only method");d(this.createReadStream(),this._getMimeType(),e)},r.prototype.getBlobURL=function(e){if("undefined"==typeof window)throw new Error("browser-only method");h(this.createReadStream(),this._getMimeType(),e)},r.prototype.appendTo=function(e,t,n){if("undefined"==typeof window)throw new Error("browser-only method");c.append(this,e,t,n)},r.prototype.renderTo=function(e,t,n){if("undefined"==typeof window)throw new Error("browser-only method");c.render(this,e,t,n)},r.prototype._getMimeType=function(){return c.mime[u.extname(this.name).toLowerCase()]},r.prototype._destroy=function(){this._destroyed=!0,this._torrent=null}}).call(this,e("_process"))},{"./file-stream":1,_process:66,"end-of-stream":33,events:34,inherits:41,path:63,"readable-stream":82,"render-media":83,"stream-to-blob":100,"stream-to-blob-url":99,"stream-with-known-length-to-buffer":101}],3:[function(e,t,n){function r(e,t){var n=this;n.id=e,n.type=t,s("new Peer %s",e),n.addr=null,n.conn=null,n.swarm=null,n.wire=null,n.connected=!1,n.destroyed=!1,n.timeout=null,n.retries=0,n.sentHandshake=!1}function o(){}var i=e("unordered-array-remove"),s=e("debug")("webtorrent:peer"),a=e("bittorrent-protocol"),u=e("./webconn");n.createWebRTCPeer=function(e,t){var n=new r(e.id,"webrtc");return n.conn=e,n.swarm=t,n.conn.connected?n.onConnect():(n.conn.once("connect",function(){n.onConnect()}),n.conn.once("error",function(e){n.destroy(e)}),n.startConnectTimeout()),n},n.createTCPIncomingPeer=function(e){var t=e.remoteAddress+":"+e.remotePort,n=new r(t,"tcpIncoming");return n.conn=e,n.addr=t,n.onConnect(),n},n.createTCPOutgoingPeer=function(e,t){var n=new r(e,"tcpOutgoing");return n.addr=e,n.swarm=t,n},n.createWebSeedPeer=function(e,t){var n=new r(e,"webSeed");return n.swarm=t,n.conn=new u(e,t),n.onConnect(),n},r.prototype.onConnect=function(){var e=this;if(!e.destroyed){e.connected=!0,s("Peer %s connected",e.id),clearTimeout(e.connectTimeout);var t=e.conn;t.once("end",function(){e.destroy()}),t.once("close",function(){e.destroy()}),t.once("finish",function(){e.destroy()}),t.once("error",function(t){e.destroy(t)});var n=e.wire=new a;n.type=e.type,n.once("end",function(){e.destroy()}),n.once("close",function(){e.destroy()}),n.once("finish",function(){e.destroy()}),n.once("error",function(t){e.destroy(t)}),n.once("handshake",function(t,n){e.onHandshake(t,n)}),e.startHandshakeTimeout(),t.pipe(n).pipe(t),e.swarm&&!e.sentHandshake&&e.handshake()}},r.prototype.onHandshake=function(e,t){var n=this;if(n.swarm&&!n.destroyed){if(n.swarm.destroyed)return n.destroy(new Error("swarm already destroyed"));if(e!==n.swarm.infoHash)return n.destroy(new Error("unexpected handshake info hash for this swarm"));if(t===n.swarm.peerId)return n.destroy(new Error("refusing to connect to ourselves"));s("Peer %s got handshake %s",n.id,e),clearTimeout(n.handshakeTimeout),n.retries=0;var r=n.addr;!r&&n.conn.remoteAddress&&(r=n.conn.remoteAddress+":"+n.conn.remotePort),n.swarm._onWire(n.wire,r),n.swarm&&!n.swarm.destroyed&&(n.sentHandshake||n.handshake())}},r.prototype.handshake=function(){var e=this,t={dht:!e.swarm.private&&!!e.swarm.client.dht};e.wire.handshake(e.swarm.infoHash,e.swarm.client.peerId,t),e.sentHandshake=!0},r.prototype.startConnectTimeout=function(){var e=this;clearTimeout(e.connectTimeout),e.connectTimeout=setTimeout(function(){e.destroy(new Error("connect timeout"))},"webrtc"===e.type?25e3:5e3),e.connectTimeout.unref&&e.connectTimeout.unref()},r.prototype.startHandshakeTimeout=function(){var e=this;clearTimeout(e.handshakeTimeout),e.handshakeTimeout=setTimeout(function(){e.destroy(new Error("handshake timeout"))},25e3),e.handshakeTimeout.unref&&e.handshakeTimeout.unref()},r.prototype.destroy=function(e){var t=this;if(!t.destroyed){t.destroyed=!0,t.connected=!1,s("destroy %s (error: %s)",t.id,e&&(e.message||e)),clearTimeout(t.connectTimeout),clearTimeout(t.handshakeTimeout);var n=t.swarm,r=t.conn,a=t.wire;t.swarm=null,t.conn=null,t.wire=null,n&&a&&i(n.wires,n.wires.indexOf(a)),r&&(r.on("error",o),r.destroy()),a&&a.destroy(),n&&n.removePeer(t.id)}}},{"./webconn":6,"bittorrent-protocol":14,debug:30,"unordered-array-remove":111}],4:[function(e,t,n){function r(e){var t=this;t._torrent=e,t._numPieces=e.pieces.length,t._pieces=[],t._onWire=function(e){t.recalculate(),t._initWire(e)},t._onWireHave=function(e){t._pieces[e]+=1},t._onWireBitfield=function(){t.recalculate()},t._torrent.wires.forEach(function(e){t._initWire(e)}),t._torrent.on("wire",t._onWire),t.recalculate()}function o(){return!0}t.exports=r,r.prototype.getRarestPiece=function(e){e||(e=o);for(var t=[],n=1/0,r=0;r<this._numPieces;++r)if(e(r)){var i=this._pieces[r];i===n?t.push(r):i<n&&(t=[r],n=i)}return t.length>0?t[Math.random()*t.length|0]:-1},r.prototype.destroy=function(){var e=this;e._torrent.removeListener("wire",e._onWire),e._torrent.wires.forEach(function(t){e._cleanupWireEvents(t)}),e._torrent=null,e._pieces=null,e._onWire=null,e._onWireHave=null,e._onWireBitfield=null},r.prototype._initWire=function(e){var t=this;e._onClose=function(){t._cleanupWireEvents(e);for(var n=0;n<this._numPieces;++n)t._pieces[n]-=e.peerPieces.get(n)},e.on("have",t._onWireHave),e.on("bitfield",t._onWireBitfield),e.once("close",e._onClose)},r.prototype.recalculate=function(){var e;for(e=0;e<this._numPieces;++e)this._pieces[e]=0;var t=this._torrent.wires.length;for(e=0;e<t;++e)for(var n=this._torrent.wires[e],r=0;r<this._numPieces;++r)this._pieces[r]+=n.peerPieces.get(r)},r.prototype._cleanupWireEvents=function(e){e.removeListener("have",this._onWireHave),e.removeListener("bitfield",this._onWireBitfield),e._onClose&&e.removeListener("close",e._onClose),e._onClose=null}},{}],5:[function(e,t,n){(function(n,r){function o(e,t,n){m.call(this),this._debugId="unknown infohash",this.client=t,this.announce=n.announce,this.urlList=n.urlList,this.path=n.path,this._store=n.store||v,this._getAnnounceOpts=n.getAnnounceOpts,this.strategy=n.strategy||"sequential",this.maxWebConns=n.maxWebConns||4,this._rechokeNumSlots=!1===n.uploads||0===n.uploads?0:+n.uploads||10,this._rechokeOptimisticWire=null,this._rechokeOptimisticTime=0,this._rechokeIntervalId=null,this.ready=!1,this.destroyed=!1,this.paused=!1,this.done=!1,this.metadata=null,this.store=null,this.files=[],this.pieces=[],this._amInterested=!1,this._selections=[],this._critical=[],this.wires=[],this._queue=[],this._peers={},this._peersLength=0,this.received=0,this.uploaded=0,this._downloadSpeed=O(),this._uploadSpeed=O(),this._servers=[],this._xsRequests=[],this._fileModtimes=n.fileModtimes,null!==e&&this._onTorrentId(e),this._debug("new torrent")}function i(e,t){return 2+Math.ceil(t*e.downloadSpeed()/T.BLOCK_LENGTH)}function s(e,t,n){return 1+Math.ceil(t*e.downloadSpeed()/n)}function a(e){return Math.random()*e|0}function u(){}t.exports=o;var c,f=e("addr-to-ip-port"),d=e("bitfield"),h=e("chunk-store-stream/write"),l=e("debug")("webtorrent:torrent"),p=e("torrent-discovery"),m=e("events").EventEmitter,g=e("xtend"),y=e("xtend/mutable"),_=e("fs"),v=e("fs-chunk-store"),b=e("simple-get"),w=e("immediate-chunk-store"),E=e("inherits"),k=e("multistream"),x=e("net"),S=e("os"),I=e("run-parallel"),B=e("run-parallel-limit"),A=e("parse-torrent"),C=e("path"),T=e("torrent-piece"),L=e("pump"),U=e("random-iterate"),R=e("simple-sha1"),O=e("speedometer"),M=e("uniq"),P=e("ut_metadata"),j=e("ut_pex"),H=e("./file"),N=e("./peer"),q=e("./rarity-map"),D=e("./server"),W=5e3,z=3*T.BLOCK_LENGTH,F=[1e3,5e3,15e3],V=e("../package.json").version,G="WebTorrent/"+V+" (https://webtorrent.io)";try{c=C.join(_.statSync("/tmp")&&"/tmp","webtorrent")}catch(e){c=C.join("function"==typeof S.tmpdir?S.tmpdir():"/","webtorrent")}E(o,m),Object.defineProperty(o.prototype,"timeRemaining",{get:function(){return this.done?0:0===this.downloadSpeed?1/0:(this.length-this.downloaded)/this.downloadSpeed*1e3}}),Object.defineProperty(o.prototype,"downloaded",{get:function(){if(!this.bitfield)return 0;for(var e=0,t=0,n=this.pieces.length;t<n;++t)if(this.bitfield.get(t))e+=t===n-1?this.lastPieceLength:this.pieceLength;else{var r=this.pieces[t];e+=r.length-r.missing}return e}}),Object.defineProperty(o.prototype,"downloadSpeed",{get:function(){return this._downloadSpeed()}}),Object.defineProperty(o.prototype,"uploadSpeed",{get:function(){return this._uploadSpeed()}}),Object.defineProperty(o.prototype,"progress",{get:function(){return this.length?this.downloaded/this.length:0}}),Object.defineProperty(o.prototype,"ratio",{get:function(){return this.uploaded/(this.received||1)}}),Object.defineProperty(o.prototype,"numPeers",{get:function(){return this.wires.length}}),Object.defineProperty(o.prototype,"torrentFileBlobURL",{get:function(){if("undefined"==typeof window)throw new Error("browser-only property");return this.torrentFile?URL.createObjectURL(new Blob([this.torrentFile],{type:"application/x-bittorrent"})):null}}),Object.defineProperty(o.prototype,"_numQueued",{get:function(){return this._queue.length+(this._peersLength-this._numConns)}}),Object.defineProperty(o.prototype,"_numConns",{get:function(){var e=this,t=0;for(var n in e._peers)e._peers[n].connected&&(t+=1);return t}}),Object.defineProperty(o.prototype,"swarm",{get:function(){return console.warn("WebTorrent: `torrent.swarm` is deprecated. Use `torrent` directly instead."),this}}),o.prototype._onTorrentId=function(e){var t=this;if(!t.destroyed){var r;try{r=A(e)}catch(e){}r?(t.infoHash=r.infoHash,t._debugId=r.infoHash.toString("hex").substring(0,7),n.nextTick(function(){t.destroyed||t._onParsedTorrent(r)})):A.remote(e,function(e,n){if(!t.destroyed)return e?t._destroy(e):void t._onParsedTorrent(n)})}},o.prototype._onParsedTorrent=function(e){var t=this;if(!t.destroyed){if(t._processParsedTorrent(e),!t.infoHash)return t._destroy(new Error("Malformed torrent data: No info hash"));t.path||(t.path=C.join(c,t.infoHash)),t._rechokeIntervalId=setInterval(function(){t._rechoke()},1e4),t._rechokeIntervalId.unref&&t._rechokeIntervalId.unref(),t.emit("_infoHash",t.infoHash),t.destroyed||(t.emit("infoHash",t.infoHash),t.destroyed||(t.client.listening?t._onListening():t.client.once("listening",function(){t._onListening()})))}},o.prototype._processParsedTorrent=function(e){this._debugId=e.infoHash.toString("hex").substring(0,7),this.announce&&(e.announce=e.announce.concat(this.announce)),this.client.tracker&&r.WEBTORRENT_ANNOUNCE&&!this.private&&(e.announce=e.announce.concat(r.WEBTORRENT_ANNOUNCE)),this.urlList&&(e.urlList=e.urlList.concat(this.urlList)),M(e.announce),M(e.urlList),y(this,e),this.magnetURI=A.toMagnetURI(e),this.torrentFile=A.toTorrentFile(e)},o.prototype._onListening=function(){function e(e){i._destroy(e)}function t(e){"string"==typeof e&&i.done||i.addPeer(e)}function n(){i.emit("trackerAnnounce"),0===i.numPeers&&i.emit("noPeers","tracker")}function r(){i.emit("dhtAnnounce"),0===i.numPeers&&i.emit("noPeers","dht")}function o(e){i.emit("warning",e)}var i=this;if(!i.discovery&&!i.destroyed){var s=i.client.tracker;s&&(s=g(i.client.tracker,{getAnnounceOpts:function(){var e={uploaded:i.uploaded,downloaded:i.downloaded,left:Math.max(i.length-i.downloaded,0)};return i.client.tracker.getAnnounceOpts&&y(e,i.client.tracker.getAnnounceOpts()),i._getAnnounceOpts&&y(e,i._getAnnounceOpts()),e}})),i.discovery=new p({infoHash:i.infoHash,announce:i.announce,peerId:i.client.peerId,dht:!i.private&&i.client.dht,tracker:s,port:i.client.torrentPort,userAgent:G}),i.discovery.on("error",e),i.discovery.on("peer",t),i.discovery.on("trackerAnnounce",n),i.discovery.on("dhtAnnounce",r),i.discovery.on("warning",o),i.info?i._onMetadata(i):i.xs&&i._getMetadataFromServer()}},o.prototype._getMetadataFromServer=function(){function e(e,n){function r(r,o,i){if(t.destroyed)return n(null);if(t.metadata)return n(null);if(r)return t.emit("warning",new Error("http error from xs param: "+e)),n(null);if(200!==o.statusCode)return t.emit("warning",new Error("non-200 status code "+o.statusCode+" from xs param: "+e)),n(null);var s;try{s=A(i)}catch(r){}return s?s.infoHash!==t.infoHash?(t.emit("warning",new Error("got torrent file with incorrect info hash from xs param: "+e)),n(null)):(t._onMetadata(s),void n(null)):(t.emit("warning",new Error("got invalid torrent file from xs param: "+e)),n(null))}if(0!==e.indexOf("http://")&&0!==e.indexOf("https://"))return t.emit("warning",new Error("skipping non-http xs param: "+e)),n(null);var o,i={url:e,method:"GET",headers:{"user-agent":G}};try{o=b.concat(i,r)}catch(r){return t.emit("warning",new Error("skipping invalid url xs param: "+e)),n(null)}t._xsRequests.push(o)}var t=this,n=Array.isArray(t.xs)?t.xs:[t.xs],r=n.map(function(t){return function(n){e(t,n)}});I(r)},o.prototype._onMetadata=function(e){var t=this;if(!t.metadata&&!t.destroyed){t._debug("got metadata"),t._xsRequests.forEach(function(e){e.abort()}),t._xsRequests=[];var n;if(e&&e.infoHash)n=e;else try{n=A(e)}catch(e){return t._destroy(e)}t._processParsedTorrent(n),t.metadata=t.torrentFile,t.client.enableWebSeeds&&t.urlList.forEach(function(e){t.addWebSeed(e)}),0!==t.pieces.length&&t.select(0,t.pieces.length-1,!1),t._rarityMap=new q(t),t.store=new w(new t._store(t.pieceLength,{torrent:{infoHash:t.infoHash},files:t.files.map(function(e){return{path:C.join(t.path,e.path),length:e.length,offset:e.offset}}),length:t.length})),t.files=t.files.map(function(e){return new H(t,e)}),t._hashes=t.pieces,t.pieces=t.pieces.map(function(e,n){var r=n===t.pieces.length-1?t.lastPieceLength:t.pieceLength;return new T(r)}),t._reservations=t.pieces.map(function(){return[]}),t.bitfield=new d(t.pieces.length),t.wires.forEach(function(e){e.ut_metadata&&e.ut_metadata.setMetadata(t.metadata),t._onWireWithMetadata(e)}),t._debug("verifying existing torrent data"),t._fileModtimes&&t._store===v?t.getFileModtimes(function(e,n){if(e)return t._destroy(e);if(t.files.map(function(e,r){return n[r]===t._fileModtimes[r]}).every(function(e){return e})){for(var r=0;r<t.pieces.length;r++)t._markVerified(r);t._onStore()}else t._verifyPieces()}):t._verifyPieces(),t.emit("metadata")}},o.prototype.getFileModtimes=function(e){var t=this,n=[];B(t.files.map(function(e,r){return function(o){_.stat(C.join(t.path,e.path),function(e,t){if(e&&"ENOENT"!==e.code)return o(e);n[r]=t&&t.mtime.getTime(),o(null)})}}),2,function(r){t._debug("done getting file modtimes"),e(r,n)})},o.prototype._verifyPieces=function(){var e=this;B(e.pieces.map(function(t,r){return function(t){if(e.destroyed)return t(new Error("torrent is destroyed"));e.store.get(r,function(o,i){return e.destroyed?t(new Error("torrent is destroyed")):o?n.nextTick(t,null):void R(i,function(n){if(e.destroyed)return t(new Error("torrent is destroyed"));if(n===e._hashes[r]){if(!e.pieces[r])return;e._debug("piece verified %s",r),e._markVerified(r)}else e._debug("piece invalid %s",r);t(null)})})}}),2,function(t){if(t)return e._destroy(t);e._debug("done verifying"),e._onStore()})},o.prototype._markVerified=function(e){this.pieces[e]=null,this._reservations[e]=null,this.bitfield.set(e,!0)},o.prototype._onStore=function(){var e=this;e.destroyed||(e._debug("on store"),e.ready=!0,e.emit("ready"),e._checkDone(),e._updateSelections())},o.prototype.destroy=function(e){this._destroy(null,e)},o.prototype._destroy=function(e,t){var n=this;if(!n.destroyed){n.destroyed=!0,n._debug("destroy"),n.client._remove(n),clearInterval(n._rechokeIntervalId),n._xsRequests.forEach(function(e){e.abort()}),n._rarityMap&&n._rarityMap.destroy();for(var r in n._peers)n.removePeer(r);n.files.forEach(function(e){e instanceof H&&e._destroy()});var o=n._servers.map(function(e){return function(t){e.destroy(t)}});n.discovery&&o.push(function(e){n.discovery.destroy(e)}),n.store&&o.push(function(e){n.store.close(e)}),I(o,t),e&&(0===n.listenerCount("error")?n.client.emit("error",e):n.emit("error",e)),n.emit("close"),n.client=null,n.files=[],n.discovery=null,n.store=null,n._rarityMap=null,n._peers=null,n._servers=null,n._xsRequests=null}},o.prototype.addPeer=function(e){var t=this;if(t.destroyed)throw new Error("torrent is destroyed");if(!t.infoHash)throw new Error("addPeer() must not be called before the `infoHash` event");if(t.client.blocked){var n;if("string"==typeof e){var r;try{r=f(e)}catch(n){return t._debug("ignoring peer: invalid %s",e),t.emit("invalidPeer",e),!1}n=r[0]}else"string"==typeof e.remoteAddress&&(n=e.remoteAddress);if(n&&t.client.blocked.contains(n))return t._debug("ignoring peer: blocked %s",e),"string"!=typeof e&&e.destroy(),t.emit("blockedPeer",e),!1}var o=!!t._addPeer(e);return o?t.emit("peer",e):t.emit("invalidPeer",e),o},o.prototype._addPeer=function(e){var t=this;if(t.destroyed)return"string"!=typeof e&&e.destroy(),null;if("string"==typeof e&&!t._validAddr(e))return t._debug("ignoring peer: invalid %s",e),null;var n=e&&e.id||e;if(t._peers[n])return t._debug("ignoring peer: duplicate (%s)",n),"string"!=typeof e&&e.destroy(),null;if(t.paused)return t._debug("ignoring peer: torrent is paused"),"string"!=typeof e&&e.destroy(),null;t._debug("add peer %s",n);var r;return r="string"==typeof e?N.createTCPOutgoingPeer(e,t):N.createWebRTCPeer(e,t),t._peers[r.id]=r,t._peersLength+=1,"string"==typeof e&&(t._queue.push(r),t._drain()),r},o.prototype.addWebSeed=function(e){if(this.destroyed)throw new Error("torrent is destroyed");if(!/^https?:\/\/.+/.test(e))return this.emit("warning",new Error("ignoring invalid web seed: "+e)),void this.emit("invalidPeer",e);if(this._peers[e])return this.emit("warning",new Error("ignoring duplicate web seed: "+e)),void this.emit("invalidPeer",e);this._debug("add web seed %s",e);var t=N.createWebSeedPeer(e,this);this._peers[t.id]=t,this._peersLength+=1,this.emit("peer",e)},o.prototype._addIncomingPeer=function(e){var t=this;return t.destroyed?e.destroy(new Error("torrent is destroyed")):t.paused?e.destroy(new Error("torrent is paused")):(this._debug("add incoming peer %s",e.id),t._peers[e.id]=e,void(t._peersLength+=1))},o.prototype.removePeer=function(e){var t=this,n=e&&e.id||e;(e=t._peers[n])&&(this._debug("removePeer %s",n),delete t._peers[n],t._peersLength-=1,e.destroy(),t._drain())},o.prototype.select=function(e,t,n,r){var o=this;if(o.destroyed)throw new Error("torrent is destroyed");if(e<0||t<e||o.pieces.length<=t)throw new Error("invalid selection ",e,":",t);n=Number(n)||0,o._debug("select %s-%s (priority %s)",e,t,n),o._selections.push({from:e,to:t,offset:0,priority:n,notify:r||u}),o._selections.sort(function(e,t){return t.priority-e.priority}),o._updateSelections()},o.prototype.deselect=function(e,t,n){var r=this;if(r.destroyed)throw new Error("torrent is destroyed");n=Number(n)||0,r._debug("deselect %s-%s (priority %s)",e,t,n);for(var o=0;o<r._selections.length;++o){var i=r._selections[o];if(i.from===e&&i.to===t&&i.priority===n){r._selections.splice(o,1);break}}r._updateSelections()},o.prototype.critical=function(e,t){var n=this;if(n.destroyed)throw new Error("torrent is destroyed");n._debug("critical %s-%s",e,t);for(var r=e;r<=t;++r)n._critical[r]=!0;n._updateSelections()},o.prototype._onWire=function(e,t){var r=this;if(r._debug("got wire %s (%s)",e._debugId,t||"Unknown"),e.on("download",function(e){r.destroyed||(r.received+=e,r._downloadSpeed(e),r.client._downloadSpeed(e),r.emit("download",e),r.client.emit("download",e))}),e.on("upload",function(e){r.destroyed||(r.uploaded+=e,r._uploadSpeed(e),r.client._uploadSpeed(e),r.emit("upload",e),r.client.emit("upload",e))}),r.wires.push(e),t){var o=f(t);e.remoteAddress=o[0],e.remotePort=o[1]}r.client.dht&&r.client.dht.listening&&e.on("port",function(n){if(!r.destroyed&&!r.client.dht.destroyed){if(!e.remoteAddress)return r._debug("ignoring PORT from peer with no address");if(0===n||n>65536)return r._debug("ignoring invalid PORT from peer");r._debug("port: %s (from %s)",n,t),r.client.dht.addNode({host:e.remoteAddress,port:n})}}),e.on("timeout",function(){r._debug("wire timeout (%s)",t),e.destroy()}),e.setTimeout(3e4,!0),e.setKeepAlive(!0),e.use(P(r.metadata)),e.ut_metadata.on("warning",function(e){r._debug("ut_metadata warning: %s",e.message)}),r.metadata||(e.ut_metadata.on("metadata",function(e){r._debug("got metadata via ut_metadata"),r._onMetadata(e)}),e.ut_metadata.fetch()),"function"!=typeof j||r.private||(e.use(j()),e.ut_pex.on("peer",function(e){r.done||(r._debug("ut_pex: got peer: %s (from %s)",e,t),r.addPeer(e))}),e.ut_pex.on("dropped",function(e){var n=r._peers[e];n&&!n.connected&&(r._debug("ut_pex: dropped peer: %s (from %s)",e,t),r.removePeer(e))}),e.once("close",function(){e.ut_pex.reset()})),r.emit("wire",e,t),r.metadata&&n.nextTick(function(){r._onWireWithMetadata(e)})},o.prototype._onWireWithMetadata=function(e){function t(){o.destroyed||e.destroyed||(o._numQueued>2*(o._numConns-o.numPeers)&&e.amInterested?e.destroy():(i=setTimeout(t,W),i.unref&&i.unref()))}function n(){if(e.peerPieces.buffer.length===o.bitfield.buffer.length){for(r=0;r<o.pieces.length;++r)if(!e.peerPieces.get(r))return;e.isSeeder=!0,e.choke()}}var r,o=this,i=null;e.on("bitfield",function(){n(),o._update()}),e.on("have",function(){n(),o._update()}),e.once("interested",function(){e.unchoke()}),e.once("close",function(){clearTimeout(i)}),e.on("choke",function(){clearTimeout(i),i=setTimeout(t,W),i.unref&&i.unref()}),e.on("unchoke",function(){clearTimeout(i),o._update()}),e.on("request",function(t,n,r,i){if(r>131072)return e.destroy();o.pieces[t]||o.store.get(t,{offset:n,length:r},i)}),e.bitfield(o.bitfield),e.interested(),e.peerExtensions.dht&&o.client.dht&&o.client.dht.listening&&e.port(o.client.dht.address().port),"webSeed"!==e.type&&(i=setTimeout(t,W),i.unref&&i.unref()),e.isSeeder=!1,n()},o.prototype._updateSelections=function(){var e=this;e.ready&&!e.destroyed&&(n.nextTick(function(){e._gcSelections()}),e._updateInterest(),e._update())},o.prototype._gcSelections=function(){for(var e=this,t=0;t<e._selections.length;++t){for(var n=e._selections[t],r=n.offset;e.bitfield.get(n.from+n.offset)&&n.from+n.offset<n.to;)n.offset+=1;r!==n.offset&&n.notify(),n.to===n.from+n.offset&&(e.bitfield.get(n.from+n.offset)&&(e._selections.splice(t,1),t-=1,n.notify(),e._updateInterest()))}e._selections.length||e.emit("idle")},o.prototype._updateInterest=function(){var e=this,t=e._amInterested;e._amInterested=!!e._selections.length,e.wires.forEach(function(t){e._amInterested?t.interested():t.uninterested()}),t!==e._amInterested&&(e._amInterested?e.emit("interested"):e.emit("uninterested"))},o.prototype._update=function(){var e=this;if(!e.destroyed)for(var t,n=U(e.wires);t=n();)e._updateWire(t)},o.prototype._updateWire=function(e){function t(t,n,r,o){return function(i){return i>=t&&i<=n&&!(i in r)&&e.peerPieces.get(i)&&(!o||o(i))}}function n(){var t=e.downloadSpeed()||1;if(t>z)return function(){return!0};var n=Math.max(1,e.requests.length)*T.BLOCK_LENGTH/t,r=10,o=0;return function(e){if(!r||s.bitfield.get(e))return!0;for(var i=s.pieces[e].missing;o<s.wires.length;o++){var a=s.wires[o],u=a.downloadSpeed();if(!(u<z)&&(!(u<=t)&&a.peerPieces.get(e)&&!((i-=u*n)>0)))return r--,!1}return!0}}function r(e){for(var t=e,n=e;n<s._selections.length&&s._selections[n].priority;n++)t=n;var r=s._selections[e];s._selections[e]=s._selections[t],s._selections[t]=r}function o(o){if(e.requests.length>=u)return!0;for(var i=n(),a=0;a<s._selections.length;a++){var c,f=s._selections[a];if("rarest"===s.strategy)for(var d=f.from+f.offset,h=f.to,l=h-d+1,p={},m=0,g=t(d,h,p,i);m<l&&!((c=s._rarityMap.getRarestPiece(g))<0);){for(;s._request(e,c,s._critical[c]||o););if(!(e.requests.length<u))return f.priority&&r(a),!0;p[c]=!0,m++}else for(c=f.from+f.offset;c<=f.to;c++)if(e.peerPieces.get(c)&&i(c)){for(;s._request(e,c,s._critical[c]||o););if(!(e.requests.length<u))return f.priority&&r(a),!0}}return!1}var s=this;if(!e.peerChoking){if(!e.downloaded)return function(){if(!e.requests.length)for(var n=s._selections.length;n--;){var r,o=s._selections[n];if("rarest"===s.strategy)for(var i=o.from+o.offset,a=o.to,u=a-i+1,c={},f=0,d=t(i,a,c);f<u&&!((r=s._rarityMap.getRarestPiece(d))<0);){if(s._request(e,r,!1))return;c[r]=!0,f+=1}else for(r=o.to;r>=o.from+o.offset;--r)if(e.peerPieces.get(r)&&s._request(e,r,!1))return}}();var a=i(e,.5);if(!(e.requests.length>=a)){var u=i(e,1);o(!1)||o(!0)}}},o.prototype._rechoke=function(){function e(e,t){return e.downloadSpeed!==t.downloadSpeed?t.downloadSpeed-e.downloadSpeed:e.uploadSpeed!==t.uploadSpeed?t.uploadSpeed-e.uploadSpeed:e.wire.amChoking!==t.wire.amChoking?e.wire.amChoking?1:-1:e.salt-t.salt}var t=this;if(t.ready){t._rechokeOptimisticTime>0?t._rechokeOptimisticTime-=1:t._rechokeOptimisticWire=null;var n=[];t.wires.forEach(function(e){e.isSeeder||e===t._rechokeOptimisticWire||n.push({wire:e,downloadSpeed:e.downloadSpeed(),uploadSpeed:e.uploadSpeed(),salt:Math.random(),isChoked:!0})}),n.sort(e);for(var r=0,o=0;o<n.length&&r<t._rechokeNumSlots;++o)n[o].isChoked=!1,n[o].wire.peerInterested&&(r+=1);if(!t._rechokeOptimisticWire&&o<n.length&&t._rechokeNumSlots){var i=n.slice(o).filter(function(e){return e.wire.peerInterested}),s=i[a(i.length)];s&&(s.isChoked=!1,t._rechokeOptimisticWire=s.wire,t._rechokeOptimisticTime=2)}n.forEach(function(e){e.wire.amChoking!==e.isChoked&&(e.isChoked?e.wire.choke():e.wire.unchoke())})}},o.prototype._hotswap=function(e,t){var n=this,r=e.downloadSpeed();if(r<T.BLOCK_LENGTH)return!1;if(!n._reservations[t])return!1;var o=n._reservations[t];if(!o)return!1;var i,s,a=1/0;for(s=0;s<o.length;s++){var u=o[s];if(u&&u!==e){var c=u.downloadSpeed();c>=z||2*c>r||c>a||(i=u,a=c)}}if(!i)return!1;for(s=0;s<o.length;s++)o[s]===i&&(o[s]=null);for(s=0;s<i.requests.length;s++){var f=i.requests[s];f.piece===t&&n.pieces[t].cancel(f.offset/T.BLOCK_LENGTH|0)}return n.emit("hotswap",i,e,t),!0},o.prototype._request=function(e,t,r){function o(){n.nextTick(function(){a._update()})}var a=this,u=e.requests.length,c="webSeed"===e.type;if(a.bitfield.get(t))return!1;if(u>=(c?Math.min(s(e,1,a.pieceLength),a.maxWebConns):i(e,1)))return!1;var f=a.pieces[t],d=c?f.reserveRemaining():f.reserve();if(-1===d&&r&&a._hotswap(e,t)&&(d=c?f.reserveRemaining():f.reserve()),-1===d)return!1;var h=a._reservations[t];h||(h=a._reservations[t]=[]);var l=h.indexOf(null);-1===l&&(l=h.length),h[l]=e;var p=f.chunkOffset(d),m=c?f.chunkLengthRemaining(d):f.chunkLength(d);return e.request(t,p,m,function n(r,i){if(!a.destroyed){if(!a.ready)return a.once("ready",function(){n(r,i)});if(h[l]===e&&(h[l]=null),f!==a.pieces[t])return o();if(r)return a._debug("error getting piece %s (offset: %s length: %s) from %s: %s",t,p,m,e.remoteAddress+":"+e.remotePort,r.message),c?f.cancelRemaining(d):f.cancel(d),void o();if(a._debug("got piece %s (offset: %s length: %s) from %s",t,p,m,e.remoteAddress+":"+e.remotePort),!f.set(d,i,e))return o();var s=f.flush();R(s,function(e){if(!a.destroyed){if(e===a._hashes[t]){if(!a.pieces[t])return;a._debug("piece verified %s",t),a.pieces[t]=null,a._reservations[t]=null,a.bitfield.set(t,!0),a.store.put(t,s),a.wires.forEach(function(e){e.have(t)}),a._checkDone()&&!a.destroyed&&a.discovery.complete()}else a.pieces[t]=new T(f.length),a.emit("warning",new Error("Piece "+t+" failed verification"));o()}})}}),!0},o.prototype._checkDone=function(){var e=this;if(!e.destroyed){e.files.forEach(function(t){if(!t.done){for(var n=t._startPiece;n<=t._endPiece;++n)if(!e.bitfield.get(n))return;t.done=!0,t.emit("done"),e._debug("file done: "+t.name)}});for(var t=!0,n=0;n<e._selections.length;n++){for(var r=e._selections[n],o=r.from;o<=r.to;o++)if(!e.bitfield.get(o)){t=!1;break}if(!t)break}return!e.done&&t&&(e.done=!0,e._debug("torrent done: "+e.infoHash),e.emit("done")),e._gcSelections(),t}},o.prototype.load=function(e,t){var n=this;if(n.destroyed)throw new Error("torrent is destroyed");if(!n.ready)return n.once("ready",function(){n.load(e,t)});Array.isArray(e)||(e=[e]),t||(t=u);var r=new k(e),o=new h(n.store,n.pieceLength);L(r,o,function(e){if(e)return t(e);n.pieces.forEach(function(e,t){n.pieces[t]=null,n._reservations[t]=null,n.bitfield.set(t,!0)}),n._checkDone(),t(null)})},o.prototype.createServer=function(e){if("function"!=typeof D)throw new Error("node.js-only method");if(this.destroyed)throw new Error("torrent is destroyed");var t=new D(this,e);return this._servers.push(t),t},o.prototype.pause=function(){
this.destroyed||(this._debug("pause"),this.paused=!0)},o.prototype.resume=function(){this.destroyed||(this._debug("resume"),this.paused=!1,this._drain())},o.prototype._debug=function(){var e=[].slice.call(arguments);e[0]="["+this.client._debugId+"] ["+this._debugId+"] "+e[0],l.apply(null,e)},o.prototype._drain=function(){var e=this;if(this._debug("_drain numConns %s maxConns %s",e._numConns,e.client.maxConns),!("function"!=typeof x.connect||e.destroyed||e.paused||e._numConns>=e.client.maxConns)){this._debug("drain (%s queued, %s/%s peers)",e._numQueued,e.numPeers,e.client.maxConns);var t=e._queue.shift();if(t){this._debug("tcp connect attempt to %s",t.addr);var n=f(t.addr),r={host:n[0],port:n[1]},o=t.conn=x.connect(r);o.once("connect",function(){t.onConnect()}),o.once("error",function(e){t.destroy(e)}),t.startConnectTimeout(),o.on("close",function(){if(!e.destroyed){if(t.retries>=F.length)return void e._debug("conn %s closed: will not re-add (max %s attempts)",t.addr,F.length);var n=F[t.retries];e._debug("conn %s closed: will re-add to queue in %sms (attempt %s)",t.addr,n,t.retries+1);var r=setTimeout(function(){var n=e._addPeer(t.addr);n&&(n.retries=t.retries+1)},n);r.unref&&r.unref()}})}}},o.prototype._validAddr=function(e){var t;try{t=f(e)}catch(e){return!1}var n=t[0],r=t[1];return r>0&&r<65535&&!("127.0.0.1"===n&&r===this.client.torrentPort)}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../package.json":122,"./file":2,"./peer":3,"./rarity-map":4,"./server":21,_process:66,"addr-to-ip-port":7,bitfield:13,"chunk-store-stream/write":26,debug:30,events:34,fs:22,"fs-chunk-store":50,"immediate-chunk-store":40,inherits:41,multistream:58,net:21,os:21,"parse-torrent":62,path:63,pump:67,"random-iterate":72,"run-parallel":86,"run-parallel-limit":85,"simple-get":90,"simple-sha1":92,speedometer:94,"torrent-discovery":106,"torrent-piece":107,uniq:110,ut_metadata:114,ut_pex:21,xtend:119,"xtend/mutable":120}],6:[function(e,t,n){function r(e,t){f.call(this),this.url=e,this.webPeerId=c.sync(e),this._torrent=t,this._init()}t.exports=r;var o=e("bitfield"),i=e("safe-buffer").Buffer,s=e("debug")("webtorrent:webconn"),a=e("simple-get"),u=e("inherits"),c=e("simple-sha1"),f=e("bittorrent-protocol"),d=e("../package.json").version;u(r,f),r.prototype._init=function(){var e=this;e.setKeepAlive(!0),e.once("handshake",function(t,n){if(!e.destroyed){e.handshake(t,e.webPeerId);for(var r=e._torrent.pieces.length,i=new o(r),s=0;s<=r;s++)i.set(s,!0);e.bitfield(i)}}),e.once("interested",function(){s("interested"),e.unchoke()}),e.on("uninterested",function(){s("uninterested")}),e.on("choke",function(){s("choke")}),e.on("unchoke",function(){s("unchoke")}),e.on("bitfield",function(){s("bitfield")}),e.on("request",function(t,n,r,o){s("request pieceIndex=%d offset=%d length=%d",t,n,r),e.httpRequest(t,n,r,o)})},r.prototype.httpRequest=function(e,t,n,r){var o,u=this,c=e*u._torrent.pieceLength,f=c+t,h=f+n-1,l=u._torrent.files;if(l.length<=1)o=[{url:u.url,start:f,end:h}];else{var p=l.filter(function(e){return e.offset<=h&&e.offset+e.length>f});if(p.length<1)return r(new Error("Could not find file corresponnding to web seed range request"));o=p.map(function(e){var t=e.offset+e.length-1;return{url:u.url+("/"===u.url[u.url.length-1]?"":"/")+e.path,fileOffsetInRange:Math.max(e.offset-f,0),start:Math.max(f-e.offset,0),end:Math.min(t,h-e.offset)}})}var m,g=0,y=!1;o.length>1&&(m=i.alloc(n)),o.forEach(function(i){function u(e,t){if(e.statusCode<200||e.statusCode>=300)return y=!0,r(new Error("Unexpected HTTP status code "+e.statusCode));s("Got data of length %d",t.length),1===o.length?r(null,t):(t.copy(m,i.fileOffsetInRange),++g===o.length&&r(null,m))}var c=i.url,f=i.start,h=i.end;s("Requesting url=%s pieceIndex=%d offset=%d length=%d start=%d end=%d",c,e,t,n,f,h);var l={url:c,method:"GET",headers:{"user-agent":"WebTorrent/"+d+" (https://webtorrent.io)",range:"bytes="+f+"-"+h}};a.concat(l,function(e,t,n){if(!y)return e?"undefined"==typeof window||c.startsWith(window.location.origin+"/")?(y=!0,r(e)):a.head(c,function(t,n){if(!y){if(t)return y=!0,r(t);if(n.statusCode<200||n.statusCode>=300)return y=!0,r(new Error("Unexpected HTTP status code "+n.statusCode));if(n.url===c)return y=!0,r(e);l.url=n.url,a.concat(l,function(e,t,n){if(!y)return e?(y=!0,r(e)):void u(t,n)})}}):void u(t,n)})})},r.prototype.destroy=function(){f.prototype.destroy.call(this),this._torrent=null}},{"../package.json":122,bitfield:13,"bittorrent-protocol":14,debug:30,inherits:41,"safe-buffer":88,"simple-get":90,"simple-sha1":92}],7:[function(e,t,n){var r=/^\[?([^\]]+)\]?:(\d+)$/,o={},i=0;t.exports=function(e){if(1e5===i&&t.exports.reset(),!o[e]){var n=r.exec(e);if(!n)throw new Error("invalid addr: "+e);o[e]=[n[1],Number(n[2])],i+=1}return o[e]},t.exports.reset=function(){o={},i=0}},{}],8:[function(e,t,n){"use strict";function r(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===e[t-2]?2:"="===e[t-1]?1:0}function o(e){return 3*e.length/4-r(e)}function i(e){var t,n,o,i,s,a,u=e.length;s=r(e),a=new d(3*u/4-s),o=s>0?u-4:u;var c=0;for(t=0,n=0;t<o;t+=4,n+=3)i=f[e.charCodeAt(t)]<<18|f[e.charCodeAt(t+1)]<<12|f[e.charCodeAt(t+2)]<<6|f[e.charCodeAt(t+3)],a[c++]=i>>16&255,a[c++]=i>>8&255,a[c++]=255&i;return 2===s?(i=f[e.charCodeAt(t)]<<2|f[e.charCodeAt(t+1)]>>4,a[c++]=255&i):1===s&&(i=f[e.charCodeAt(t)]<<10|f[e.charCodeAt(t+1)]<<4|f[e.charCodeAt(t+2)]>>2,a[c++]=i>>8&255,a[c++]=255&i),a}function s(e){return c[e>>18&63]+c[e>>12&63]+c[e>>6&63]+c[63&e]}function a(e,t,n){for(var r,o=[],i=t;i<n;i+=3)r=(e[i]<<16)+(e[i+1]<<8)+e[i+2],o.push(s(r));return o.join("")}function u(e){for(var t,n=e.length,r=n%3,o="",i=[],s=0,u=n-r;s<u;s+=16383)i.push(a(e,s,s+16383>u?u:s+16383));return 1===r?(t=e[n-1],o+=c[t>>2],o+=c[t<<4&63],o+="=="):2===r&&(t=(e[n-2]<<8)+e[n-1],o+=c[t>>10],o+=c[t>>4&63],o+=c[t<<2&63],o+="="),i.push(o),i.join("")}n.byteLength=o,n.toByteArray=i,n.fromByteArray=u;for(var c=[],f=[],d="undefined"!=typeof Uint8Array?Uint8Array:Array,h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l=0,p=h.length;l<p;++l)c[l]=h[l],f[h.charCodeAt(l)]=l;f["-".charCodeAt(0)]=62,f["_".charCodeAt(0)]=63},{}],9:[function(e,t,n){(function(e){function n(e,t,n){for(var r=0,o=1,i=t;i<n;i++){var s=e[i];if(s<58&&s>=48)r=10*r+(s-48);else if(i!==t||43!==s){if(i!==t||45!==s){if(46===s)break;throw new Error("not a number: buffer["+i+"] = "+s)}o=-1}}return r*o}function r(t,n,o,i){return null==t||0===t.length?null:("number"!=typeof n&&null==i&&(i=n,n=void 0),"number"!=typeof o&&null==i&&(i=o,o=void 0),r.position=0,r.encoding=i||null,r.data=e.isBuffer(t)?t.slice(n,o):new e(t),r.bytes=r.data.length,r.next())}r.bytes=0,r.position=0,r.data=null,r.encoding=null,r.next=function(){switch(r.data[r.position]){case 100:return r.dictionary();case 108:return r.list();case 105:return r.integer();default:return r.buffer()}},r.find=function(e){for(var t=r.position,n=r.data.length,o=r.data;t<n;){if(o[t]===e)return t;t++}throw new Error('Invalid data: Missing delimiter "'+String.fromCharCode(e)+'" [0x'+e.toString(16)+"]")},r.dictionary=function(){r.position++;for(var e={};101!==r.data[r.position];)e[r.buffer()]=r.next();return r.position++,e},r.list=function(){r.position++;for(var e=[];101!==r.data[r.position];)e.push(r.next());return r.position++,e},r.integer=function(){var e=r.find(101),t=n(r.data,r.position+1,e);return r.position+=e+1-r.position,t},r.buffer=function(){var e=r.find(58),t=n(r.data,r.position,e),o=++e+t;return r.position=o,r.encoding?r.data.toString(r.encoding,e,o):r.data.slice(e,o)},t.exports=r}).call(this,e("buffer").Buffer)},{buffer:24}],10:[function(e,t,n){(function(e){function n(t,r,o){var i=[],s=null;return n._encode(i,t),s=e.concat(i),n.bytes=s.length,e.isBuffer(r)?(s.copy(r,o),r):s}n.bytes=-1,n._floatConversionDetected=!1,n._encode=function(t,r){if(e.isBuffer(r))return t.push(new e(r.length+":")),void t.push(r);if(null!=r)switch(typeof r){case"string":n.buffer(t,r);break;case"number":n.number(t,r);break;case"object":r.constructor===Array?n.list(t,r):n.dict(t,r);break;case"boolean":n.number(t,r?1:0)}};var r=new e("e"),o=new e("d"),i=new e("l");n.buffer=function(t,n){t.push(new e(e.byteLength(n)+":"+n))},n.number=function(t,r){var o=r/2147483648<<0,i=r%2147483648<<0,s=2147483648*o+i;t.push(new e("i"+s+"e")),s===r||n._floatConversionDetected||(n._floatConversionDetected=!0,console.warn('WARNING: Possible data corruption detected with value "'+r+'":','Bencoding only defines support for integers, value was converted to "'+s+'"'),console.trace())},n.dict=function(e,t){e.push(o);for(var i,s=0,a=Object.keys(t).sort(),u=a.length;s<u;s++)i=a[s],null!=t[i]&&(n.buffer(e,i),n._encode(e,t[i]));e.push(r)},n.list=function(e,t){var o=0,s=t.length;for(e.push(i);o<s;o++)null!=t[o]&&n._encode(e,t[o]);e.push(r)},t.exports=n}).call(this,e("buffer").Buffer)},{buffer:24}],11:[function(e,t,n){var r=t.exports;r.encode=e("./encode"),r.decode=e("./decode"),r.byteLength=r.encodingLength=function(e){return r.encode(e).length}},{"./decode":9,"./encode":10}],12:[function(e,t,n){t.exports=function(e,t,n,r,o){var i,s;if(void 0===r)r=0;else if((r|=0)<0||r>=e.length)throw new RangeError("invalid lower bound");if(void 0===o)o=e.length-1;else if((o|=0)<r||o>=e.length)throw new RangeError("invalid upper bound");for(;r<=o;)if(i=r+(o-r>>1),(s=+n(e[i],t,i,e))<0)r=i+1;else{if(!(s>0))return i;o=i-1}return~r}},{}],13:[function(e,t,n){(function(e){function n(e,t){if(!(this instanceof n))return new n(e,t);0===arguments.length&&(e=0),this.grow=t&&(isFinite(t.grow)&&r(t.grow)||t.grow)||0,"number"!=typeof e&&void 0!==e||(e=new o(r(e)),e.fill&&!e._isBuffer&&e.fill(0)),this.buffer=e}function r(e){var t=e>>3;return e%8!=0&&t++,t}var o=void 0!==e?e:"undefined"!=typeof Int8Array?Int8Array:function(e){for(var t=new Array(e),n=0;n<e;n++)t[n]=0};n.prototype.get=function(e){var t=e>>3;return t<this.buffer.length&&!!(this.buffer[t]&128>>e%8)},n.prototype.set=function(e,t){var n=e>>3;t||1===arguments.length?(this.buffer.length<n+1&&this._grow(Math.max(n+1,Math.min(2*this.buffer.length,this.grow))),this.buffer[n]|=128>>e%8):n<this.buffer.length&&(this.buffer[n]&=~(128>>e%8))},n.prototype._grow=function(e){if(this.buffer.length<e&&e<=this.grow){var t=new o(e);if(t.fill&&t.fill(0),this.buffer.copy)this.buffer.copy(t,0);else for(var n=0;n<this.buffer.length;n++)t[n]=this.buffer[n];this.buffer=t}},void 0!==t&&(t.exports=n)}).call(this,e("buffer").Buffer)},{buffer:24}],14:[function(e,t,n){function r(e,t,n,r){this.piece=e,this.offset=t,this.length=n,this.callback=r}function o(){if(!(this instanceof o))return new o;m.Duplex.call(this),this._debugId=l(4).toString("hex"),this._debug("new wire"),this.peerId=null,this.peerIdBuffer=null,this.type=null,this.amChoking=!0,this.amInterested=!1,this.peerChoking=!0,this.peerInterested=!1,this.peerPieces=new u(0,{grow:g}),this.peerExtensions={},this.requests=[],this.peerRequests=[],this.extendedMapping={},this.peerExtendedMapping={},this.extendedHandshake={},this.peerExtendedHandshake={},this._ext={},this._nextExt=1,this.uploaded=0,this.downloaded=0,this.uploadSpeed=p(),this.downloadSpeed=p(),this._keepAliveInterval=null,this._timeout=null,this._timeoutMs=0,this.destroyed=!1,this._finished=!1,this._parserSize=0,this._parser=null,this._buffer=[],this._bufferSize=0,this.on("finish",this._onFinish),this._parseHandshake()}function i(e,t,n,r){for(var o=0;o<e.length;o++){var i=e[o];if(i.piece===t&&i.offset===n&&i.length===r)return s(e,o),i}return null}t.exports=o;var s=e("unordered-array-remove"),a=e("bencode"),u=e("bitfield"),c=e("safe-buffer").Buffer,f=e("debug")("bittorrent-protocol"),d=e("xtend"),h=e("inherits"),l=e("randombytes"),p=e("speedometer"),m=e("readable-stream"),g=4e5,y=c.from("BitTorrent protocol"),_=c.from([0,0,0,0]),v=c.from([0,0,0,1,0]),b=c.from([0,0,0,1,1]),w=c.from([0,0,0,1,2]),E=c.from([0,0,0,1,3]),k=[0,0,0,0,0,0,0,0],x=[0,0,0,3,9,0,0];h(o,m.Duplex),o.prototype.setKeepAlive=function(e){var t=this;t._debug("setKeepAlive %s",e),clearInterval(t._keepAliveInterval),!1!==e&&(t._keepAliveInterval=setInterval(function(){t.keepAlive()},55e3))},o.prototype.setTimeout=function(e,t){this._debug("setTimeout ms=%d unref=%s",e,t),this._clearTimeout(),this._timeoutMs=e,this._timeoutUnref=!!t,this._updateTimeout()},o.prototype.destroy=function(){this.destroyed||(this.destroyed=!0,this._debug("destroy"),this.emit("close"),this.end())},o.prototype.end=function(){this._debug("end"),this._onUninterested(),this._onChoke(),m.Duplex.prototype.end.apply(this,arguments)},o.prototype.use=function(e){function t(){}var n=e.prototype.name;if(!n)throw new Error('Extension class requires a "name" property on the prototype');this._debug("use extension.name=%s",n);var r=this._nextExt,o=new e(this);"function"!=typeof o.onHandshake&&(o.onHandshake=t),"function"!=typeof o.onExtendedHandshake&&(o.onExtendedHandshake=t),"function"!=typeof o.onMessage&&(o.onMessage=t),this.extendedMapping[r]=n,this._ext[n]=o,this[n]=o,this._nextExt+=1},o.prototype.keepAlive=function(){this._debug("keep-alive"),this._push(_)},o.prototype.handshake=function(e,t,n){var r,o;if("string"==typeof e?r=c.from(e,"hex"):(r=e,e=r.toString("hex")),"string"==typeof t?o=c.from(t,"hex"):(o=t,t=o.toString("hex")),20!==r.length||20!==o.length)throw new Error("infoHash and peerId MUST have length 20");this._debug("handshake i=%s p=%s exts=%o",e,t,n);var i=c.from(k);i[5]|=16,n&&n.dht&&(i[7]|=1),this._push(c.concat([y,i,r,o])),this._handshakeSent=!0,this.peerExtensions.extended&&!this._extendedHandshakeSent&&this._sendExtendedHandshake()},o.prototype._sendExtendedHandshake=function(){var e=d(this.extendedHandshake);e.m={};for(var t in this.extendedMapping){var n=this.extendedMapping[t];e.m[n]=Number(t)}this.extended(0,a.encode(e)),this._extendedHandshakeSent=!0},o.prototype.choke=function(){if(!this.amChoking){for(this.amChoking=!0,this._debug("choke");this.peerRequests.length;)this.peerRequests.pop();this._push(v)}},o.prototype.unchoke=function(){this.amChoking&&(this.amChoking=!1,this._debug("unchoke"),this._push(b))},o.prototype.interested=function(){this.amInterested||(this.amInterested=!0,this._debug("interested"),this._push(w))},o.prototype.uninterested=function(){this.amInterested&&(this.amInterested=!1,this._debug("uninterested"),this._push(E))},o.prototype.have=function(e){this._debug("have %d",e),this._message(4,[e],null)},o.prototype.bitfield=function(e){this._debug("bitfield"),c.isBuffer(e)||(e=e.buffer),this._message(5,[],e)},o.prototype.request=function(e,t,n,o){return o||(o=function(){}),this._finished?o(new Error("wire is closed")):this.peerChoking?o(new Error("peer is choking")):(this._debug("request index=%d offset=%d length=%d",e,t,n),this.requests.push(new r(e,t,n,o)),this._updateTimeout(),void this._message(6,[e,t,n],null))},o.prototype.piece=function(e,t,n){this._debug("piece index=%d offset=%d",e,t),this.uploaded+=n.length,this.uploadSpeed(n.length),this.emit("upload",n.length),this._message(7,[e,t],n)},o.prototype.cancel=function(e,t,n){this._debug("cancel index=%d offset=%d length=%d",e,t,n),this._callback(i(this.requests,e,t,n),new Error("request was cancelled"),null),this._message(8,[e,t,n],null)},o.prototype.port=function(e){this._debug("port %d",e);var t=c.from(x);t.writeUInt16BE(e,5),this._push(t)},o.prototype.extended=function(e,t){if(this._debug("extended ext=%s",e),"string"==typeof e&&this.peerExtendedMapping[e]&&(e=this.peerExtendedMapping[e]),"number"!=typeof e)throw new Error("Unrecognized extension: "+e);var n=c.from([e]),r=c.isBuffer(t)?t:a.encode(t);this._message(20,[],c.concat([n,r]))},o.prototype._read=function(){},o.prototype._message=function(e,t,n){var r=n?n.length:0,o=c.allocUnsafe(5+4*t.length);o.writeUInt32BE(o.length+r-4,0),o[4]=e;for(var i=0;i<t.length;i++)o.writeUInt32BE(t[i],5+4*i);this._push(o),n&&this._push(n)},o.prototype._push=function(e){if(!this._finished)return this.push(e)},o.prototype._onKeepAlive=function(){this._debug("got keep-alive"),this.emit("keep-alive")},o.prototype._onHandshake=function(e,t,n){var r=e.toString("hex"),o=t.toString("hex");this._debug("got handshake i=%s p=%s exts=%o",r,o,n),this.peerId=o,this.peerIdBuffer=t,this.peerExtensions=n,this.emit("handshake",r,o,n);var i;for(i in this._ext)this._ext[i].onHandshake(r,o,n);n.extended&&this._handshakeSent&&!this._extendedHandshakeSent&&this._sendExtendedHandshake()},o.prototype._onChoke=function(){for(this.peerChoking=!0,this._debug("got choke"),this.emit("choke");this.requests.length;)this._callback(this.requests.pop(),new Error("peer is choking"),null)},o.prototype._onUnchoke=function(){this.peerChoking=!1,this._debug("got unchoke"),this.emit("unchoke")},o.prototype._onInterested=function(){this.peerInterested=!0,this._debug("got interested"),this.emit("interested")},o.prototype._onUninterested=function(){this.peerInterested=!1,this._debug("got uninterested"),this.emit("uninterested")},o.prototype._onHave=function(e){this.peerPieces.get(e)||(this._debug("got have %d",e),this.peerPieces.set(e,!0),this.emit("have",e))},o.prototype._onBitField=function(e){this.peerPieces=new u(e),this._debug("got bitfield"),this.emit("bitfield",this.peerPieces)},o.prototype._onRequest=function(e,t,n){var o=this;if(!o.amChoking){o._debug("got request index=%d offset=%d length=%d",e,t,n);var s=function(r,s){if(a===i(o.peerRequests,e,t,n))return r?o._debug("error satisfying request index=%d offset=%d length=%d (%s)",e,t,n,r.message):void o.piece(e,t,s)},a=new r(e,t,n,s);o.peerRequests.push(a),o.emit("request",e,t,n,s)}},o.prototype._onPiece=function(e,t,n){this._debug("got piece index=%d offset=%d",e,t),this._callback(i(this.requests,e,t,n.length),null,n),this.downloaded+=n.length,this.downloadSpeed(n.length),this.emit("download",n.length),this.emit("piece",e,t,n)},o.prototype._onCancel=function(e,t,n){this._debug("got cancel index=%d offset=%d length=%d",e,t,n),i(this.peerRequests,e,t,n),this.emit("cancel",e,t,n)},o.prototype._onPort=function(e){this._debug("got port %d",e),this.emit("port",e)},o.prototype._onExtended=function(e,t){if(0===e){var n;try{n=a.decode(t)}catch(e){this._debug("ignoring invalid extended handshake: %s",e.message||e)}if(!n)return;this.peerExtendedHandshake=n;var r;if("object"==typeof n.m)for(r in n.m)this.peerExtendedMapping[r]=Number(n.m[r].toString());for(r in this._ext)this.peerExtendedMapping[r]&&this._ext[r].onExtendedHandshake(this.peerExtendedHandshake);this._debug("got extended handshake"),this.emit("extended","handshake",this.peerExtendedHandshake)}else this.extendedMapping[e]&&(e=this.extendedMapping[e],this._ext[e]&&this._ext[e].onMessage(t)),this._debug("got extended message ext=%s",e),this.emit("extended",e,t)},o.prototype._onTimeout=function(){this._debug("request timed out"),this._callback(this.requests.shift(),new Error("request has timed out"),null),this.emit("timeout")},o.prototype._write=function(e,t,n){for(this._bufferSize+=e.length,this._buffer.push(e);this._bufferSize>=this._parserSize;){var r=1===this._buffer.length?this._buffer[0]:c.concat(this._buffer);this._bufferSize-=this._parserSize,this._buffer=this._bufferSize?[r.slice(this._parserSize)]:[],this._parser(r.slice(0,this._parserSize))}n(null)},o.prototype._callback=function(e,t,n){e&&(this._clearTimeout(),this.peerChoking||this._finished||this._updateTimeout(),e.callback(t,n))},o.prototype._clearTimeout=function(){this._timeout&&(clearTimeout(this._timeout),this._timeout=null)},o.prototype._updateTimeout=function(){var e=this;e._timeoutMs&&e.requests.length&&!e._timeout&&(e._timeout=setTimeout(function(){e._onTimeout()},e._timeoutMs),e._timeoutUnref&&e._timeout.unref&&e._timeout.unref())},o.prototype._parse=function(e,t){this._parserSize=e,this._parser=t},o.prototype._onMessageLength=function(e){var t=e.readUInt32BE(0);t>0?this._parse(t,this._onMessage):(this._onKeepAlive(),this._parse(4,this._onMessageLength))},o.prototype._onMessage=function(e){switch(this._parse(4,this._onMessageLength),e[0]){case 0:return this._onChoke();case 1:return this._onUnchoke();case 2:return this._onInterested();case 3:return this._onUninterested();case 4:return this._onHave(e.readUInt32BE(1));case 5:return this._onBitField(e.slice(1));case 6:return this._onRequest(e.readUInt32BE(1),e.readUInt32BE(5),e.readUInt32BE(9));case 7:return this._onPiece(e.readUInt32BE(1),e.readUInt32BE(5),e.slice(9));case 8:return this._onCancel(e.readUInt32BE(1),e.readUInt32BE(5),e.readUInt32BE(9));case 9:return this._onPort(e.readUInt16BE(1));case 20:return this._onExtended(e.readUInt8(1),e.slice(2));default:return this._debug("got unknown message"),this.emit("unknownmessage",e)}},o.prototype._parseHandshake=function(){var e=this;e._parse(1,function(t){var n=t.readUInt8(0);e._parse(n+48,function(t){var r=t.slice(0,n);if("BitTorrent protocol"!==r.toString())return e._debug("Error: wire not speaking BitTorrent protocol (%s)",r.toString()),void e.end();t=t.slice(n),e._onHandshake(t.slice(8,28),t.slice(28,48),{dht:!!(1&t[7]),extended:!!(16&t[5])}),e._parse(4,e._onMessageLength)})})},o.prototype._onFinish=function(){for(this._finished=!0,this.push(null);this.read(););for(clearInterval(this._keepAliveInterval),this._parse(Number.MAX_VALUE,function(){});this.peerRequests.length;)this.peerRequests.pop();for(;this.requests.length;)this._callback(this.requests.pop(),new Error("wire was closed"),null)},o.prototype._debug=function(){var e=[].slice.call(arguments);e[0]="["+this._debugId+"] "+e[0],f.apply(null,e)}},{bencode:11,bitfield:13,debug:30,inherits:41,randombytes:73,"readable-stream":82,"safe-buffer":88,speedometer:94,"unordered-array-remove":111,xtend:119}],15:[function(e,t,n){(function(n){function r(e){function t(e){n.nextTick(function(){a.emit("warning",e)})}var a=this;if(!(a instanceof r))return new r(e);if(s.call(a),e||(e={}),!e.peerId)throw new Error("Option `peerId` is required");if(!e.infoHash)throw new Error("Option `infoHash` is required");if(!e.announce)throw new Error("Option `announce` is required");if(!n.browser&&!e.port)throw new Error("Option `port` is required");a.peerId="string"==typeof e.peerId?e.peerId:e.peerId.toString("hex"),a._peerIdBuffer=o.from(a.peerId,"hex"),a._peerIdBinary=a._peerIdBuffer.toString("binary"),a.infoHash="string"==typeof e.infoHash?e.infoHash:e.infoHash.toString("hex"),a._infoHashBuffer=o.from(a.infoHash,"hex"),a._infoHashBinary=a._infoHashBuffer.toString("binary"),i("new client %s",a.infoHash),a.destroyed=!1,a._port=e.port,a._getAnnounceOpts=e.getAnnounceOpts,a._rtcConfig=e.rtcConfig,a._userAgent=e.userAgent,a._wrtc="function"==typeof e.wrtc?e.wrtc():e.wrtc;var u="string"==typeof e.announce?[e.announce]:null==e.announce?[]:e.announce;u=u.map(function(e){return e=e.toString(),"/"===e[e.length-1]&&(e=e.substring(0,e.length-1)),e}),u=h(u);var c=!1!==a._wrtc&&(!!a._wrtc||d.WEBRTC_SUPPORT);a._trackers=u.map(function(e){var n=l.parse(e).protocol;return"http:"!==n&&"https:"!==n||"function"!=typeof m?"udp:"===n&&"function"==typeof g?new g(a,e):"ws:"!==n&&"wss:"!==n||!c?(t(new Error("Unsupported tracker protocol: "+e)),null):"ws:"===n&&"undefined"!=typeof window&&"https:"===window.location.protocol?(t(new Error("Unsupported tracker protocol: "+e)),null):new y(a,e):new m(a,e)}).filter(Boolean)}t.exports=r;var o=e("safe-buffer").Buffer,i=e("debug")("bittorrent-tracker:client"),s=e("events").EventEmitter,a=e("xtend"),u=e("inherits"),c=e("once"),f=e("run-parallel"),d=e("simple-peer"),h=e("uniq"),l=e("url"),p=e("./lib/common"),m=e("./lib/client/http-tracker"),g=e("./lib/client/udp-tracker"),y=e("./lib/client/websocket-tracker");u(r,s),r.scrape=function(e,t){if(t=c(t),!e.infoHash)throw new Error("Option `infoHash` is required");if(!e.announce)throw new Error("Option `announce` is required");var n=a(e,{infoHash:Array.isArray(e.infoHash)?e.infoHash[0]:e.infoHash,peerId:o.from("01234567890123456789"),port:6881}),i=new r(n);i.once("error",t),i.once("warning",t);var s=Array.isArray(e.infoHash)?e.infoHash.length:1,u={};return i.on("scrape",function(e){if(s-=1,u[e.infoHash]=e,0===s){i.destroy();var n=Object.keys(u);1===n.length?t(null,u[n[0]]):t(null,u)}}),e.infoHash=Array.isArray(e.infoHash)?e.infoHash.map(function(e){return o.from(e,"hex")}):o.from(e.infoHash,"hex"),i.scrape({infoHash:e.infoHash}),i},r.prototype.start=function(e){var t=this;i("send `start`"),e=t._defaultAnnounceOpts(e),e.event="started",t._announce(e),t._trackers.forEach(function(e){e.setInterval()})},r.prototype.stop=function(e){var t=this;i("send `stop`"),e=t._defaultAnnounceOpts(e),e.event="stopped",t._announce(e)},r.prototype.complete=function(e){var t=this;i("send `complete`"),e||(e={}),e=t._defaultAnnounceOpts(e),e.event="completed",t._announce(e)},r.prototype.update=function(e){var t=this;i("send `update`"),e=t._defaultAnnounceOpts(e),e.event&&delete e.event,t._announce(e)},r.prototype._announce=function(e){this._trackers.forEach(function(t){t.announce(e)})},r.prototype.scrape=function(e){var t=this;i("send `scrape`"),e||(e={}),t._trackers.forEach(function(t){t.scrape(e)})},r.prototype.setInterval=function(e){var t=this;i("setInterval %d",e),t._trackers.forEach(function(t){t.setInterval(e)})},r.prototype.destroy=function(e){var t=this;if(!t.destroyed){t.destroyed=!0,i("destroy");var n=t._trackers.map(function(e){return function(t){e.destroy(t)}});f(n,e),t._trackers=[],t._getAnnounceOpts=null}},r.prototype._defaultAnnounceOpts=function(e){var t=this;return e||(e={}),null==e.numwant&&(e.numwant=p.DEFAULT_ANNOUNCE_PEERS),null==e.uploaded&&(e.uploaded=0),null==e.downloaded&&(e.downloaded=0),t._getAnnounceOpts&&(e=a(e,t._getAnnounceOpts())),e}}).call(this,e("_process"))},{"./lib/client/http-tracker":21,"./lib/client/udp-tracker":21,"./lib/client/websocket-tracker":17,"./lib/common":18,_process:66,debug:30,events:34,inherits:41,once:60,"run-parallel":86,"safe-buffer":88,"simple-peer":91,uniq:110,url:112,xtend:119}],16:[function(e,t,n){function r(e,t){var n=this;o.call(n),n.client=e,n.announceUrl=t,n.interval=null,n.destroyed=!1}t.exports=r;var o=e("events").EventEmitter;e("inherits")(r,o),r.prototype.setInterval=function(e){var t=this;null==e&&(e=t.DEFAULT_ANNOUNCE_INTERVAL),clearInterval(t.interval),e&&(t.interval=setInterval(function(){t.announce(t.client._defaultAnnounceOpts())},e),t.interval.unref&&t.interval.unref())}},{events:34,inherits:41}],17:[function(e,t,n){function r(e,t,n){var r=this;h.call(r,e,t),i("new websocket tracker %s",t),r.peers={},r.socket=null,r.reconnecting=!1,r.retries=0,r.reconnectTimer=null,r.expectingResponse=!1,r._openSocket()}function o(){}t.exports=r;var i=e("debug")("bittorrent-tracker:websocket-tracker"),s=e("xtend"),a=e("inherits"),u=e("simple-peer"),c=e("randombytes"),f=e("simple-websocket"),d=e("../common"),h=e("./tracker"),l={},p=5e4;a(r,h),r.prototype.DEFAULT_ANNOUNCE_INTERVAL=3e4,r.prototype.announce=function(e){var t=this;if(!t.destroyed&&!t.reconnecting){if(!t.socket.connected)return void t.socket.once("connect",function(){t.announce(e)});var n=s(e,{action:"announce",info_hash:t.client._infoHashBinary,peer_id:t.client._peerIdBinary});if(t._trackerId&&(n.trackerid=t._trackerId),"stopped"===e.event||"completed"===e.event)t._send(n);else{var r=Math.min(e.numwant,10);t._generateOffers(r,function(e){n.numwant=r,n.offers=e,t._send(n)})}}},r.prototype.scrape=function(e){var t=this;if(!t.destroyed&&!t.reconnecting){if(!t.socket.connected)return void t.socket.once("connect",function(){t.scrape(e)});var n=Array.isArray(e.infoHash)&&e.infoHash.length>0?e.infoHash.map(function(e){return e.toString("binary")}):e.infoHash&&e.infoHash.toString("binary")||t.client._infoHashBinary,r={action:"scrape",info_hash:n};t._send(r)}},r.prototype.destroy=function(e){function t(){a&&(clearTimeout(a),a=null),s.removeListener("data",t),s.destroy(),s=null}var n=this;if(e||(e=o),n.destroyed)return e(null);n.destroyed=!0,clearInterval(n.interval),clearTimeout(n.reconnectTimer);for(var r in n.peers){var i=n.peers[r];clearTimeout(i.trackerTimeout),i.destroy()}if(n.peers=null,n.socket&&(n.socket.removeListener("connect",n._onSocketConnectBound),n.socket.removeListener("data",n._onSocketDataBound),n.socket.removeListener("close",n._onSocketCloseBound),n.socket.removeListener("error",n._onSocketErrorBound),n.socket=null),n._onSocketConnectBound=null,n._onSocketErrorBound=null,n._onSocketDataBound=null,n._onSocketCloseBound=null,l[n.announceUrl]&&(l[n.announceUrl].consumers-=1),l[n.announceUrl].consumers>0)return e();var s=l[n.announceUrl];if(delete l[n.announceUrl],s.on("error",o),s.once("close",e),!n.expectingResponse)return t();var a=setTimeout(t,d.DESTROY_TIMEOUT);s.once("data",t)},r.prototype._openSocket=function(){var e=this;e.destroyed=!1,e.peers||(e.peers={}),e._onSocketConnectBound=function(){e._onSocketConnect()},e._onSocketErrorBound=function(t){e._onSocketError(t)},e._onSocketDataBound=function(t){e._onSocketData(t)},e._onSocketCloseBound=function(){e._onSocketClose()},e.socket=l[e.announceUrl],e.socket?l[e.announceUrl].consumers+=1:(e.socket=l[e.announceUrl]=new f(e.announceUrl),e.socket.consumers=1,e.socket.once("connect",e._onSocketConnectBound)),e.socket.on("data",e._onSocketDataBound),e.socket.once("close",e._onSocketCloseBound),e.socket.once("error",e._onSocketErrorBound)},r.prototype._onSocketConnect=function(){var e=this;e.destroyed||e.reconnecting&&(e.reconnecting=!1,e.retries=0,e.announce(e.client._defaultAnnounceOpts()))},r.prototype._onSocketData=function(e){var t=this;if(!t.destroyed){t.expectingResponse=!1;try{e=JSON.parse(e)}catch(e){return void t.client.emit("warning",new Error("Invalid tracker response"))}"announce"===e.action?t._onAnnounceResponse(e):"scrape"===e.action?t._onScrapeResponse(e):t._onSocketError(new Error("invalid action in WS response: "+e.action))}},r.prototype._onAnnounceResponse=function(e){var t=this;if(e.info_hash!==t.client._infoHashBinary)return void i("ignoring websocket data from %s for %s (looking for %s: reused socket)",t.announceUrl,d.binaryToHex(e.info_hash),t.client.infoHash);if(!e.peer_id||e.peer_id!==t.client._peerIdBinary){i("received %s from %s for %s",JSON.stringify(e),t.announceUrl,t.client.infoHash);var n=e["failure reason"];if(n)return t.client.emit("warning",new Error(n));var r=e["warning message"];r&&t.client.emit("warning",new Error(r));var o=e.interval||e["min interval"];o&&t.setInterval(1e3*o);var s=e["tracker id"];if(s&&(t._trackerId=s),null!=e.complete){var a=Object.assign({},e,{announce:t.announceUrl,infoHash:d.binaryToHex(e.info_hash)});t.client.emit("update",a)}var u;if(e.offer&&e.peer_id&&(i("creating peer (from remote offer)"),u=t._createPeer(),u.id=d.binaryToHex(e.peer_id),u.once("signal",function(n){var r={action:"announce",info_hash:t.client._infoHashBinary,peer_id:t.client._peerIdBinary,to_peer_id:e.peer_id,answer:n,offer_id:e.offer_id};t._trackerId&&(r.trackerid=t._trackerId),t._send(r)}),u.signal(e.offer),t.client.emit("peer",u)),e.answer&&e.peer_id){var c=d.binaryToHex(e.offer_id);u=t.peers[c],u?(u.id=d.binaryToHex(e.peer_id),u.signal(e.answer),t.client.emit("peer",u),clearTimeout(u.trackerTimeout),u.trackerTimeout=null,delete t.peers[c]):i("got unexpected answer: "+JSON.stringify(e.answer))}}},r.prototype._onScrapeResponse=function(e){var t=this;e=e.files||{};var n=Object.keys(e);if(0===n.length)return void t.client.emit("warning",new Error("invalid scrape response"));n.forEach(function(n){var r=Object.assign(e[n],{announce:t.announceUrl,infoHash:d.binaryToHex(n)});t.client.emit("scrape",r)})},r.prototype._onSocketClose=function(){var e=this;e.destroyed||(e.destroy(),e._startReconnectTimer())},r.prototype._onSocketError=function(e){var t=this;t.destroyed||(t.destroy(),t.client.emit("warning",e),t._startReconnectTimer())},r.prototype._startReconnectTimer=function(){var e=this,t=Math.floor(3e4*Math.random())+Math.min(15e3*Math.pow(2,e.retries),18e5);e.reconnecting=!0,clearTimeout(e.reconnectTimer),e.reconnectTimer=setTimeout(function(){e.retries++,e._openSocket()},t),
e.reconnectTimer.unref&&e.reconnectTimer.unref(),i("reconnecting socket in %s ms",t)},r.prototype._send=function(e){var t=this;if(!t.destroyed){t.expectingResponse=!0;var n=JSON.stringify(e);i("send %s",n),t.socket.send(n)}},r.prototype._generateOffers=function(e,t){function n(){o.length===e&&(i("generated %s offers",e),t(o))}var r=this,o=[];i("generating %s offers",e);for(var s=0;s<e;++s)!function(){var e=c(20).toString("hex");i("creating peer (from _generateOffers)");var t=r.peers[e]=r._createPeer({initiator:!0});t.once("signal",function(t){o.push({offer:t,offer_id:d.hexToBinary(e)}),n()}),t.trackerTimeout=setTimeout(function(){i("tracker timeout: destroying peer"),t.trackerTimeout=null,delete r.peers[e],t.destroy()},p),t.trackerTimeout.unref&&t.trackerTimeout.unref()}();n()},r.prototype._createPeer=function(e){function t(e){r.client.emit("warning",new Error("Connection error: "+e.message)),o.destroy()}function n(){o.removeListener("error",t),o.removeListener("connect",n)}var r=this;e=Object.assign({trickle:!1,config:r.client._rtcConfig,wrtc:r.client._wrtc},e);var o=new u(e);return o.once("error",t),o.once("connect",n),o}},{"../common":18,"./tracker":16,debug:30,inherits:41,randombytes:73,"simple-peer":91,"simple-websocket":93,xtend:119}],18:[function(e,t,n){var r=e("safe-buffer").Buffer,o=e("xtend/mutable");n.DEFAULT_ANNOUNCE_PEERS=50,n.MAX_ANNOUNCE_PEERS=82,n.binaryToHex=function(e){return"string"!=typeof e&&(e=String(e)),r.from(e,"binary").toString("hex")},n.hexToBinary=function(e){return"string"!=typeof e&&(e=String(e)),r.from(e,"hex").toString("binary")},o(n,e("./common-node"))},{"./common-node":21,"safe-buffer":88,"xtend/mutable":120}],19:[function(e,t,n){(function(e){t.exports=function(t,n){function r(t){o.removeEventListener("loadend",r,!1),t.error?n(t.error):n(null,new e(o.result))}if("undefined"==typeof Blob||!(t instanceof Blob))throw new Error("first argument must be a Blob");if("function"!=typeof n)throw new Error("second argument must be a function");var o=new FileReader;o.addEventListener("loadend",r,!1),o.readAsArrayBuffer(t)}}).call(this,e("buffer").Buffer)},{buffer:24}],20:[function(e,t,n){(function(n){function r(e,t){if(!(this instanceof r))return new r(e,t);i.call(this),t||(t={}),"object"==typeof e&&(t=e,e=t.size),this.size=e||512,t.nopad?this._zeroPadding=!1:this._zeroPadding=s(t.zeroPadding,!0),this._buffered=[],this._bufferedBytes=0}var o=e("inherits"),i=e("readable-stream").Transform,s=e("defined");t.exports=r,o(r,i),r.prototype._transform=function(e,t,r){for(this._bufferedBytes+=e.length,this._buffered.push(e);this._bufferedBytes>=this.size;){var o=n.concat(this._buffered);this._bufferedBytes-=this.size,this.push(o.slice(0,this.size)),this._buffered=[o.slice(this.size,o.length)]}r()},r.prototype._flush=function(){if(this._bufferedBytes&&this._zeroPadding){var e=new n(this.size-this._bufferedBytes);e.fill(0),this._buffered.push(e),this.push(n.concat(this._buffered)),this._buffered=null}else this._bufferedBytes&&(this.push(n.concat(this._buffered)),this._buffered=null);this.push(null)}}).call(this,e("buffer").Buffer)},{buffer:24,defined:32,inherits:41,"readable-stream":82}],21:[function(e,t,n){},{}],22:[function(e,t,n){arguments[4][21][0].apply(n,arguments)},{dup:21}],23:[function(e,t,n){(function(t){"use strict";var r=e("buffer"),o=r.Buffer,i=r.SlowBuffer,s=r.kMaxLength||2147483647;n.alloc=function(e,t,n){if("function"==typeof o.alloc)return o.alloc(e,t,n);if("number"==typeof n)throw new TypeError("encoding must not be number");if("number"!=typeof e)throw new TypeError("size must be a number");if(e>s)throw new RangeError("size is too large");var r=n,i=t;void 0===i&&(r=void 0,i=0);var a=new o(e);if("string"==typeof i)for(var u=new o(i,r),c=u.length,f=-1;++f<e;)a[f]=u[f%c];else a.fill(i);return a},n.allocUnsafe=function(e){if("function"==typeof o.allocUnsafe)return o.allocUnsafe(e);if("number"!=typeof e)throw new TypeError("size must be a number");if(e>s)throw new RangeError("size is too large");return new o(e)},n.from=function(e,n,r){if("function"==typeof o.from&&(!t.Uint8Array||Uint8Array.from!==o.from))return o.from(e,n,r);if("number"==typeof e)throw new TypeError('"value" argument must not be a number');if("string"==typeof e)return new o(e,n);if("undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer){var i=n;if(1===arguments.length)return new o(e);void 0===i&&(i=0);var s=r;if(void 0===s&&(s=e.byteLength-i),i>=e.byteLength)throw new RangeError("'offset' is out of bounds");if(s>e.byteLength-i)throw new RangeError("'length' is out of bounds");return new o(e.slice(i,i+s))}if(o.isBuffer(e)){var a=new o(e.length);return e.copy(a,0,0,e.length),a}if(e){if(Array.isArray(e)||"undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return new o(e);if("Buffer"===e.type&&Array.isArray(e.data))return new o(e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")},n.allocUnsafeSlow=function(e){if("function"==typeof o.allocUnsafeSlow)return o.allocUnsafeSlow(e);if("number"!=typeof e)throw new TypeError("size must be a number");if(e>=s)throw new RangeError("size is too large");return new i(e)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{buffer:24}],24:[function(e,t,n){"use strict";function r(e){if(e>X)throw new RangeError("Invalid typed array length");var t=new Uint8Array(e);return t.__proto__=o.prototype,t}function o(e,t,n){if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return u(e)}return i(e,t,n)}function i(e,t,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return e instanceof ArrayBuffer?d(e,t,n):"string"==typeof e?c(e,t):h(e)}function s(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function a(e,t,n){return s(e),e<=0?r(e):void 0!==t?"string"==typeof n?r(e).fill(t,n):r(e).fill(t):r(e)}function u(e){return s(e),r(e<0?0:0|l(e))}function c(e,t){if("string"==typeof t&&""!==t||(t="utf8"),!o.isEncoding(t))throw new TypeError('"encoding" must be a valid string encoding');var n=0|m(e,t),i=r(n),s=i.write(e,t);return s!==n&&(i=i.slice(0,s)),i}function f(e){for(var t=e.length<0?0:0|l(e.length),n=r(t),o=0;o<t;o+=1)n[o]=255&e[o];return n}function d(e,t,n){if(t<0||e.byteLength<t)throw new RangeError("'offset' is out of bounds");if(e.byteLength<t+(n||0))throw new RangeError("'length' is out of bounds");var r;return r=void 0===t&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,t):new Uint8Array(e,t,n),r.__proto__=o.prototype,r}function h(e){if(o.isBuffer(e)){var t=0|l(e.length),n=r(t);return 0===n.length?n:(e.copy(n,0,0,t),n)}if(e){if(V(e)||"length"in e)return"number"!=typeof e.length||G(e.length)?r(0):f(e);if("Buffer"===e.type&&Array.isArray(e.data))return f(e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function l(e){if(e>=X)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+X.toString(16)+" bytes");return 0|e}function p(e){return+e!=e&&(e=0),o.alloc(+e)}function m(e,t){if(o.isBuffer(e))return e.length;if(V(e)||e instanceof ArrayBuffer)return e.byteLength;"string"!=typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(var r=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return q(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return z(e).length;default:if(r)return q(e).length;t=(""+t).toLowerCase(),r=!0}}function g(e,t,n){var r=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if(n>>>=0,t>>>=0,n<=t)return"";for(e||(e="utf8");;)switch(e){case"hex":return L(this,t,n);case"utf8":case"utf-8":return B(this,t,n);case"ascii":return C(this,t,n);case"latin1":case"binary":return T(this,t,n);case"base64":return I(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return U(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0}}function y(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function _(e,t,n,r,i){if(0===e.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,G(n)&&(n=i?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(i)return-1;n=e.length-1}else if(n<0){if(!i)return-1;n=0}if("string"==typeof t&&(t=o.from(t,r)),o.isBuffer(t))return 0===t.length?-1:v(e,t,n,r,i);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):v(e,[t],n,r,i);throw new TypeError("val must be string, number or Buffer")}function v(e,t,n,r,o){function i(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}var s=1,a=e.length,u=t.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return-1;s=2,a/=2,u/=2,n/=2}var c;if(o){var f=-1;for(c=n;c<a;c++)if(i(e,c)===i(t,-1===f?0:c-f)){if(-1===f&&(f=c),c-f+1===u)return f*s}else-1!==f&&(c-=c-f),f=-1}else for(n+u>a&&(n=a-u),c=n;c>=0;c--){for(var d=!0,h=0;h<u;h++)if(i(e,c+h)!==i(t,h)){d=!1;break}if(d)return c}return-1}function b(e,t,n,r){n=Number(n)||0;var o=e.length-n;r?(r=Number(r))>o&&(r=o):r=o;var i=t.length;if(i%2!=0)throw new TypeError("Invalid hex string");r>i/2&&(r=i/2);for(var s=0;s<r;++s){var a=parseInt(t.substr(2*s,2),16);if(G(a))return s;e[n+s]=a}return s}function w(e,t,n,r){return F(q(t,e.length-n),e,n,r)}function E(e,t,n,r){return F(D(t),e,n,r)}function k(e,t,n,r){return E(e,t,n,r)}function x(e,t,n,r){return F(z(t),e,n,r)}function S(e,t,n,r){return F(W(t,e.length-n),e,n,r)}function I(e,t,n){return 0===t&&n===e.length?$.fromByteArray(e):$.fromByteArray(e.slice(t,n))}function B(e,t,n){n=Math.min(e.length,n);for(var r=[],o=t;o<n;){var i=e[o],s=null,a=i>239?4:i>223?3:i>191?2:1;if(o+a<=n){var u,c,f,d;switch(a){case 1:i<128&&(s=i);break;case 2:u=e[o+1],128==(192&u)&&(d=(31&i)<<6|63&u)>127&&(s=d);break;case 3:u=e[o+1],c=e[o+2],128==(192&u)&&128==(192&c)&&(d=(15&i)<<12|(63&u)<<6|63&c)>2047&&(d<55296||d>57343)&&(s=d);break;case 4:u=e[o+1],c=e[o+2],f=e[o+3],128==(192&u)&&128==(192&c)&&128==(192&f)&&(d=(15&i)<<18|(63&u)<<12|(63&c)<<6|63&f)>65535&&d<1114112&&(s=d)}}null===s?(s=65533,a=1):s>65535&&(s-=65536,r.push(s>>>10&1023|55296),s=56320|1023&s),r.push(s),o+=a}return A(r)}function A(e){var t=e.length;if(t<=J)return String.fromCharCode.apply(String,e);for(var n="",r=0;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=J));return n}function C(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;++o)r+=String.fromCharCode(127&e[o]);return r}function T(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;++o)r+=String.fromCharCode(e[o]);return r}function L(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;++i)o+=N(e[i]);return o}function U(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function R(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function O(e,t,n,r,i,s){if(!o.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<s)throw new RangeError('"value" argument is out of bounds');if(n+r>e.length)throw new RangeError("Index out of range")}function M(e,t,n,r,o,i){if(n+r>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function P(e,t,n,r,o){return t=+t,n>>>=0,o||M(e,t,n,4,3.4028234663852886e38,-3.4028234663852886e38),K.write(e,t,n,r,23,4),n+4}function j(e,t,n,r,o){return t=+t,n>>>=0,o||M(e,t,n,8,1.7976931348623157e308,-1.7976931348623157e308),K.write(e,t,n,r,52,8),n+8}function H(e){if(e=e.trim().replace(Y,""),e.length<2)return"";for(;e.length%4!=0;)e+="=";return e}function N(e){return e<16?"0"+e.toString(16):e.toString(16)}function q(e,t){t=t||1/0;for(var n,r=e.length,o=null,i=[],s=0;s<r;++s){if((n=e.charCodeAt(s))>55295&&n<57344){if(!o){if(n>56319){(t-=3)>-1&&i.push(239,191,189);continue}if(s+1===r){(t-=3)>-1&&i.push(239,191,189);continue}o=n;continue}if(n<56320){(t-=3)>-1&&i.push(239,191,189),o=n;continue}n=65536+(o-55296<<10|n-56320)}else o&&(t-=3)>-1&&i.push(239,191,189);if(o=null,n<128){if((t-=1)<0)break;i.push(n)}else if(n<2048){if((t-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function D(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}function W(e,t){for(var n,r,o,i=[],s=0;s<e.length&&!((t-=2)<0);++s)n=e.charCodeAt(s),r=n>>8,o=n%256,i.push(o),i.push(r);return i}function z(e){return $.toByteArray(H(e))}function F(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);++o)t[o+n]=e[o];return o}function V(e){return"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(e)}function G(e){return e!==e}var $=e("base64-js"),K=e("ieee754");n.Buffer=o,n.SlowBuffer=p,n.INSPECT_MAX_BYTES=50;var X=2147483647;n.kMaxLength=X,o.TYPED_ARRAY_SUPPORT=function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()}catch(e){return!1}}(),o.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),"undefined"!=typeof Symbol&&Symbol.species&&o[Symbol.species]===o&&Object.defineProperty(o,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),o.poolSize=8192,o.from=function(e,t,n){return i(e,t,n)},o.prototype.__proto__=Uint8Array.prototype,o.__proto__=Uint8Array,o.alloc=function(e,t,n){return a(e,t,n)},o.allocUnsafe=function(e){return u(e)},o.allocUnsafeSlow=function(e){return u(e)},o.isBuffer=function(e){return null!=e&&!0===e._isBuffer},o.compare=function(e,t){if(!o.isBuffer(e)||!o.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,r=t.length,i=0,s=Math.min(n,r);i<s;++i)if(e[i]!==t[i]){n=e[i],r=t[i];break}return n<r?-1:r<n?1:0},o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return o.alloc(0);var n;if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var r=o.allocUnsafe(t),i=0;for(n=0;n<e.length;++n){var s=e[n];if(!o.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(r,i),i+=s.length}return r},o.byteLength=m,o.prototype._isBuffer=!0,o.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)y(this,t,t+1);return this},o.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)y(this,t,t+3),y(this,t+1,t+2);return this},o.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)y(this,t,t+7),y(this,t+1,t+6),y(this,t+2,t+5),y(this,t+3,t+4);return this},o.prototype.toString=function(){var e=this.length;return 0===e?"":0===arguments.length?B(this,0,e):g.apply(this,arguments)},o.prototype.equals=function(e){if(!o.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===o.compare(this,e)},o.prototype.inspect=function(){var e="",t=n.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,t).match(/.{2}/g).join(" "),this.length>t&&(e+=" ... ")),"<Buffer "+e+">"},o.prototype.compare=function(e,t,n,r,i){if(!o.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),t<0||n>e.length||r<0||i>this.length)throw new RangeError("out of range index");if(r>=i&&t>=n)return 0;if(r>=i)return-1;if(t>=n)return 1;if(t>>>=0,n>>>=0,r>>>=0,i>>>=0,this===e)return 0;for(var s=i-r,a=n-t,u=Math.min(s,a),c=this.slice(r,i),f=e.slice(t,n),d=0;d<u;++d)if(c[d]!==f[d]){s=c[d],a=f[d];break}return s<a?-1:a<s?1:0},o.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)},o.prototype.indexOf=function(e,t,n){return _(this,e,t,n,!0)},o.prototype.lastIndexOf=function(e,t,n){return _(this,e,t,n,!1)},o.prototype.write=function(e,t,n,r){if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(n)?(n>>>=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var o=this.length-t;if((void 0===n||n>o)&&(n=o),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var i=!1;;)switch(r){case"hex":return b(this,e,t,n);case"utf8":case"utf-8":return w(this,e,t,n);case"ascii":return E(this,e,t,n);case"latin1":case"binary":return k(this,e,t,n);case"base64":return x(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return S(this,e,t,n);default:if(i)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),i=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var J=4096;o.prototype.slice=function(e,t){var n=this.length;e=~~e,t=void 0===t?n:~~t,e<0?(e+=n)<0&&(e=0):e>n&&(e=n),t<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e);var r=this.subarray(e,t);return r.__proto__=o.prototype,r},o.prototype.readUIntLE=function(e,t,n){e>>>=0,t>>>=0,n||R(e,t,this.length);for(var r=this[e],o=1,i=0;++i<t&&(o*=256);)r+=this[e+i]*o;return r},o.prototype.readUIntBE=function(e,t,n){e>>>=0,t>>>=0,n||R(e,t,this.length);for(var r=this[e+--t],o=1;t>0&&(o*=256);)r+=this[e+--t]*o;return r},o.prototype.readUInt8=function(e,t){return e>>>=0,t||R(e,1,this.length),this[e]},o.prototype.readUInt16LE=function(e,t){return e>>>=0,t||R(e,2,this.length),this[e]|this[e+1]<<8},o.prototype.readUInt16BE=function(e,t){return e>>>=0,t||R(e,2,this.length),this[e]<<8|this[e+1]},o.prototype.readUInt32LE=function(e,t){return e>>>=0,t||R(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},o.prototype.readUInt32BE=function(e,t){return e>>>=0,t||R(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},o.prototype.readIntLE=function(e,t,n){e>>>=0,t>>>=0,n||R(e,t,this.length);for(var r=this[e],o=1,i=0;++i<t&&(o*=256);)r+=this[e+i]*o;return o*=128,r>=o&&(r-=Math.pow(2,8*t)),r},o.prototype.readIntBE=function(e,t,n){e>>>=0,t>>>=0,n||R(e,t,this.length);for(var r=t,o=1,i=this[e+--r];r>0&&(o*=256);)i+=this[e+--r]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*t)),i},o.prototype.readInt8=function(e,t){return e>>>=0,t||R(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},o.prototype.readInt16LE=function(e,t){e>>>=0,t||R(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},o.prototype.readInt16BE=function(e,t){e>>>=0,t||R(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},o.prototype.readInt32LE=function(e,t){return e>>>=0,t||R(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},o.prototype.readInt32BE=function(e,t){return e>>>=0,t||R(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},o.prototype.readFloatLE=function(e,t){return e>>>=0,t||R(e,4,this.length),K.read(this,e,!0,23,4)},o.prototype.readFloatBE=function(e,t){return e>>>=0,t||R(e,4,this.length),K.read(this,e,!1,23,4)},o.prototype.readDoubleLE=function(e,t){return e>>>=0,t||R(e,8,this.length),K.read(this,e,!0,52,8)},o.prototype.readDoubleBE=function(e,t){return e>>>=0,t||R(e,8,this.length),K.read(this,e,!1,52,8)},o.prototype.writeUIntLE=function(e,t,n,r){if(e=+e,t>>>=0,n>>>=0,!r){O(this,e,t,n,Math.pow(2,8*n)-1,0)}var o=1,i=0;for(this[t]=255&e;++i<n&&(o*=256);)this[t+i]=e/o&255;return t+n},o.prototype.writeUIntBE=function(e,t,n,r){if(e=+e,t>>>=0,n>>>=0,!r){O(this,e,t,n,Math.pow(2,8*n)-1,0)}var o=n-1,i=1;for(this[t+o]=255&e;--o>=0&&(i*=256);)this[t+o]=e/i&255;return t+n},o.prototype.writeUInt8=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,1,255,0),this[t]=255&e,t+1},o.prototype.writeUInt16LE=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},o.prototype.writeUInt16BE=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},o.prototype.writeUInt32LE=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},o.prototype.writeUInt32BE=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},o.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t>>>=0,!r){var o=Math.pow(2,8*n-1);O(this,e,t,n,o-1,-o)}var i=0,s=1,a=0;for(this[t]=255&e;++i<n&&(s*=256);)e<0&&0===a&&0!==this[t+i-1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+n},o.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t>>>=0,!r){var o=Math.pow(2,8*n-1);O(this,e,t,n,o-1,-o)}var i=n-1,s=1,a=0;for(this[t+i]=255&e;--i>=0&&(s*=256);)e<0&&0===a&&0!==this[t+i+1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+n},o.prototype.writeInt8=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},o.prototype.writeInt16LE=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},o.prototype.writeInt16BE=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},o.prototype.writeInt32LE=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},o.prototype.writeInt32BE=function(e,t,n){return e=+e,t>>>=0,n||O(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},o.prototype.writeFloatLE=function(e,t,n){return P(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){return P(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){return j(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){return j(this,e,t,!1,n)},o.prototype.copy=function(e,t,n,r){if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var o,i=r-n;if(this===e&&n<t&&t<r)for(o=i-1;o>=0;--o)e[o+t]=this[o+n];else if(i<1e3)for(o=0;o<i;++o)e[o+t]=this[o+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+i),t);return i},o.prototype.fill=function(e,t,n,r){if("string"==typeof e){if("string"==typeof t?(r=t,t=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===e.length){var i=e.charCodeAt(0);i<256&&(e=i)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!o.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0);var s;if("number"==typeof e)for(s=t;s<n;++s)this[s]=e;else{var a=o.isBuffer(e)?e:new o(e,r),u=a.length;for(s=0;s<n-t;++s)this[s+t]=a[s%u]}return this};var Y=/[^+\/0-9A-Za-z-_]/g},{"base64-js":8,ieee754:39}],25:[function(e,t,n){t.exports={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"}},{}],26:[function(e,t,n){function r(e,t,n){function i(t){a.destroyed||(e.put(u,t),u+=1)}var a=this;if(!(a instanceof r))return new r(e,t,n);if(s.Writable.call(a,n),n||(n={}),!e||!e.put||!e.get)throw new Error("First argument must be an abstract-chunk-store compliant store");if(!(t=Number(t)))throw new Error("Second argument must be a chunk length");a._blockstream=new o(t,{zeroPadding:!1}),a._blockstream.on("data",i).on("error",function(e){a.destroy(e)});var u=0;a.on("finish",function(){this._blockstream.end()})}t.exports=r;var o=e("block-stream2"),i=e("inherits"),s=e("readable-stream");i(r,s.Writable),r.prototype._write=function(e,t,n){this._blockstream.write(e,t,n)},r.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,e&&this.emit("error",e),this.emit("close"))}},{"block-stream2":20,inherits:41,"readable-stream":82}],27:[function(e,t,n){function r(e,t,n){for(var r,i,s,a=1/0,u=0,c=t.length-1;u<=c&&(r=u+(c-u>>1),s=t[r]-e,s<0?u=r+1:s>0&&(c=r-1),s=o(s),s<a&&(a=s,i=r),t[r]!==e););return n?i:t[i]}var o=Math.abs;t.exports=r},{}],28:[function(e,t,n){(function(e){function t(e){return Array.isArray?Array.isArray(e):"[object Array]"===g(e)}function r(e){return"boolean"==typeof e}function o(e){return null===e}function i(e){return null==e}function s(e){return"number"==typeof e}function a(e){return"string"==typeof e}function u(e){return"symbol"==typeof e}function c(e){return void 0===e}function f(e){return"[object RegExp]"===g(e)}function d(e){return"object"==typeof e&&null!==e}function h(e){return"[object Date]"===g(e)}function l(e){return"[object Error]"===g(e)||e instanceof Error}function p(e){return"function"==typeof e}function m(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e}function g(e){return Object.prototype.toString.call(e)}n.isArray=t,n.isBoolean=r,n.isNull=o,n.isNullOrUndefined=i,n.isNumber=s,n.isString=a,n.isSymbol=u,n.isUndefined=c,n.isRegExp=f,n.isObject=d,n.isDate=h,n.isError=l,n.isFunction=p,n.isPrimitive=m,n.isBuffer=e.isBuffer}).call(this,{isBuffer:e("../../is-buffer/index.js")})},{"../../is-buffer/index.js":43}],29:[function(e,t,n){(function(n,r,o){function i(e,t,n){if("function"==typeof t)return i(e,null,t);t=t?I(t):{},a(e,t,function(e,r,o){if(e)return n(e);t.singleFileTorrent=o,l(r,t,n)})}function s(e,t,n){if("function"==typeof t)return s(e,null,t);t=t?I(t):{},a(e,t,n)}function a(e,t,r){function i(){O(e.map(function(e){return function(t){var n={};if(m(e))n.getStream=_(e),n.length=e.size;else if(o.isBuffer(e))n.getStream=v(e),n.length=e.length;else{if(!y(e)){if("string"==typeof e){if("function"!=typeof C.stat)throw new Error("filesystem paths do not work in the browser");var r=a>1||c;return void u(e,r,t)}throw new Error("invalid input type")}n.getStream=w(e,n),n.length=0}n.path=e.path,t(null,n)}}),function(e,t){if(e)return r(e);t=A(t),r(null,t,c)})}if(Array.isArray(e)&&0===e.length)throw new Error("invalid input type");g(e)&&(e=Array.prototype.slice.call(e)),Array.isArray(e)||(e=[e]),e=e.map(function(e){return m(e)&&"string"==typeof e.path&&"function"==typeof C.stat?e.path:e}),1!==e.length||"string"==typeof e[0]||e[0].name||(e[0].name=t.name);var s=null;e.forEach(function(t,n){if("string"!=typeof t){var r=t.fullPath||t.name;r||(r="Unknown File "+(n+1),t.unknownName=!0),t.path=r.split("/"),t.path[0]||t.path.shift(),t.path.length<2?s=null:0===n&&e.length>1?s=t.path[0]:t.path[0]!==s&&(s=null)}}),e=e.filter(function(e){if("string"==typeof e)return!0;var t=e.path[e.path.length-1];return d(t)&&L.not(t)}),s&&e.forEach(function(e){var t=(o.isBuffer(e)||y(e))&&!e.path;"string"==typeof e||t||e.path.shift()}),!t.name&&s&&(t.name=s),t.name||e.some(function(e){return"string"==typeof e?(t.name=S.basename(e),!0):e.unknownName?void 0:(t.name=e.path[e.path.length-1],!0)}),t.name||(t.name="Unnamed Torrent "+Date.now());var a=e.reduce(function(e,t){return e+Number("string"==typeof t)},0),c=1===e.length;if(1===e.length&&"string"==typeof e[0]){if("function"!=typeof C.stat)throw new Error("filesystem paths do not work in the browser");T(e[0],function(e,t){if(e)return r(e);c=t,i()})}else n.nextTick(function(){i()})}function u(e,t,n){f(e,c,function(r,o){if(r)return n(r);o=Array.isArray(o)?A(o):[o],e=S.normalize(e),t&&(e=e.slice(0,e.lastIndexOf(S.sep)+1)),e[e.length-1]!==S.sep&&(e+=S.sep),o.forEach(function(t){t.getStream=b(t.path),t.path=t.path.replace(e,"").split(S.sep)}),n(null,o)})}function c(e,t){t=R(t),C.stat(e,function(n,r){if(n)return t(n);var o={length:r.size,path:e};t(null,o)})}function f(e,t,n){C.stat(e,function(r,o){if(r)return n(r);o.isDirectory()?C.readdir(e,function(r,o){if(r)return n(r);O(o.filter(d).filter(L.not).map(function(n){return function(r){f(S.join(e,n),t,r)}}),n)}):o.isFile()&&t(e,n)})}function d(e){return"."!==e[0]}function h(e,t,n){function r(e){f+=e.length;var t=l;M(e,function(e){c[t]=e,h-=1,u()}),h+=1,l+=1}function i(){p=!0,u()}function s(e){a(),n(e)}function a(){m.removeListener("error",s),g.removeListener("data",r),g.removeListener("end",i),g.removeListener("error",s)}function u(){p&&0===h&&(a(),n(null,o.from(c.join(""),"hex"),f))}n=R(n);var c=[],f=0,d=e.map(function(e){return e.getStream}),h=0,l=0,p=!1,m=new U(d),g=new k(t,{zeroPadding:!1});m.on("error",s),m.pipe(g).on("data",r).on("end",i).on("error",s)}function l(e,n,o){var i=n.announceList;i||("string"==typeof n.announce?i=[[n.announce]]:Array.isArray(n.announce)&&(i=n.announce.map(function(e){return[e]}))),i||(i=[]),r.WEBTORRENT_ANNOUNCE&&("string"==typeof r.WEBTORRENT_ANNOUNCE?i.push([[r.WEBTORRENT_ANNOUNCE]]):Array.isArray(r.WEBTORRENT_ANNOUNCE)&&(i=i.concat(r.WEBTORRENT_ANNOUNCE.map(function(e){return[e]})))),void 0===n.announce&&void 0===n.announceList&&(i=i.concat(t.exports.announceList)),"string"==typeof n.urlList&&(n.urlList=[n.urlList]);var s={info:{name:n.name},"creation date":Math.ceil((Number(n.creationDate)||Date.now())/1e3),encoding:"UTF-8"};0!==i.length&&(s.announce=i[0][0],s["announce-list"]=i),void 0!==n.comment&&(s.comment=n.comment),void 0!==n.createdBy&&(s["created by"]=n.createdBy),void 0!==n.private&&(s.info.private=Number(n.private)),void 0!==n.sslCert&&(s.info["ssl-cert"]=n.sslCert),void 0!==n.urlList&&(s["url-list"]=n.urlList);var a=n.pieceLength||x(e.reduce(p,0));s.info["piece length"]=a,h(e,a,function(t,r,i){if(t)return o(t);s.info.pieces=r,e.forEach(function(e){delete e.getStream}),n.singleFileTorrent?s.info.length=i:s.info.files=e,
o(null,E.encode(s))})}function p(e,t){return e+t.length}function m(e){return"undefined"!=typeof Blob&&e instanceof Blob}function g(e){return"undefined"!=typeof FileList&&e instanceof FileList}function y(e){return"object"==typeof e&&null!=e&&"function"==typeof e.pipe}function _(e){return function(){return new B(e)}}function v(e){return function(){var t=new P.PassThrough;return t.end(e),t}}function b(e){return function(){return C.createReadStream(e)}}function w(e,t){return function(){var n=new P.Transform;return n._transform=function(e,n,r){t.length+=e.length,this.push(e),r()},e.pipe(n),n}}t.exports=i,t.exports.parseInput=s,t.exports.announceList=[["udp://tracker.leechers-paradise.org:6969"],["udp://tracker.coppersurfer.tk:6969"],["udp://tracker.opentrackr.org:1337"],["udp://explodie.org:6969"],["udp://tracker.empire-js.us:1337"],["wss://tracker.btorrent.xyz"],["wss://tracker.openwebtorrent.com"],["wss://tracker.fastcast.nz"]];var E=e("bencode"),k=e("block-stream2"),x=e("piece-length"),S=e("path"),I=e("xtend"),B=e("filestream/read"),A=e("flatten"),C=e("fs"),T=e("is-file"),L=e("junk"),U=e("multistream"),R=e("once"),O=e("run-parallel"),M=e("simple-sha1"),P=e("readable-stream")}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer)},{_process:66,bencode:11,"block-stream2":20,buffer:24,"filestream/read":35,flatten:36,fs:22,"is-file":44,junk:47,multistream:58,once:60,path:63,"piece-length":64,"readable-stream":82,"run-parallel":86,"simple-sha1":92,xtend:119}],30:[function(e,t,n){(function(r){function o(){return!("undefined"==typeof window||!window||void 0===window.process||"renderer"!==window.process.type)||("undefined"!=typeof document&&document&&"WebkitAppearance"in document.documentElement.style||"undefined"!=typeof window&&window&&window.console&&(console.firebug||console.exception&&console.table)||"undefined"!=typeof navigator&&navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function i(e){var t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),t){var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,i=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r)}}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(e){try{null==e?n.storage.removeItem("debug"):n.storage.debug=e}catch(e){}}function u(){var e;try{e=n.storage.debug}catch(e){}return!e&&void 0!==r&&"env"in r&&(e=r.env.DEBUG),e}n=t.exports=e("./debug"),n.log=s,n.formatArgs=i,n.save=a,n.load=u,n.useColors=o,n.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},n.enable(u())}).call(this,e("_process"))},{"./debug":31,_process:66}],31:[function(e,t,n){function r(e){var t,r=0;for(t in e)r=(r<<5)-r+e.charCodeAt(t),r|=0;return n.colors[Math.abs(r)%n.colors.length]}function o(e){function t(){if(t.enabled){var e=t,r=+new Date,o=r-(c||r);e.diff=o,e.prev=c,e.curr=r,c=r;for(var i=new Array(arguments.length),s=0;s<i.length;s++)i[s]=arguments[s];i[0]=n.coerce(i[0]),"string"!=typeof i[0]&&i.unshift("%O");var a=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,function(t,r){if("%%"===t)return t;a++;var o=n.formatters[r];if("function"==typeof o){var s=i[a];t=o.call(e,s),i.splice(a,1),a--}return t}),n.formatArgs.call(e,i);(t.log||n.log||console.log.bind(console)).apply(e,i)}}return t.namespace=e,t.enabled=n.enabled(e),t.useColors=n.useColors(),t.color=r(e),"function"==typeof n.init&&n.init(t),t}function i(e){n.save(e),n.names=[],n.skips=[];for(var t=(e||"").split(/[\s,]+/),r=t.length,o=0;o<r;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function s(){n.enable("")}function a(e){var t,r;for(t=0,r=n.skips.length;t<r;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;t<r;t++)if(n.names[t].test(e))return!0;return!1}function u(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o.debug=o.default=o,n.coerce=u,n.disable=s,n.enable=i,n.enabled=a,n.humanize=e("ms"),n.names=[],n.skips=[],n.formatters={};var c},{ms:57}],32:[function(e,t,n){t.exports=function(){for(var e=0;e<arguments.length;e++)if(void 0!==arguments[e])return arguments[e]}},{}],33:[function(e,t,n){var r=e("once"),o=function(){},i=function(e){return e.setHeader&&"function"==typeof e.abort},s=function(e){return e.stdio&&Array.isArray(e.stdio)&&3===e.stdio.length},a=function(e,t,n){if("function"==typeof t)return a(e,null,t);t||(t={}),n=r(n||o);var u=e._writableState,c=e._readableState,f=t.readable||!1!==t.readable&&e.readable,d=t.writable||!1!==t.writable&&e.writable,h=function(){e.writable||l()},l=function(){d=!1,f||n.call(e)},p=function(){f=!1,d||n.call(e)},m=function(t){n.call(e,t?new Error("exited with error code: "+t):null)},g=function(){return(!f||c&&c.ended)&&(!d||u&&u.ended)?void 0:n.call(e,new Error("premature close"))},y=function(){e.req.on("finish",l)};return i(e)?(e.on("complete",l),e.on("abort",g),e.req?y():e.on("request",y)):d&&!u&&(e.on("end",h),e.on("close",h)),s(e)&&e.on("exit",m),e.on("end",p),e.on("finish",l),!1!==t.error&&e.on("error",n),e.on("close",g),function(){e.removeListener("complete",l),e.removeListener("abort",g),e.removeListener("request",y),e.req&&e.req.removeListener("finish",l),e.removeListener("end",h),e.removeListener("close",h),e.removeListener("finish",l),e.removeListener("exit",m),e.removeListener("end",p),e.removeListener("error",n),e.removeListener("close",g)}};t.exports=a},{once:60}],34:[function(e,t,n){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(e){return"function"==typeof e}function i(e){return"number"==typeof e}function s(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!i(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,n,r,i,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var f=new Error('Uncaught, unspecified "error" event. ('+t+")");throw f.context=t,f}if(n=this._events[e],a(n))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:i=Array.prototype.slice.call(arguments,1),n.apply(this,i)}else if(s(n))for(i=Array.prototype.slice.call(arguments,1),c=n.slice(),r=c.length,u=0;u<r;u++)c[u].apply(this,i);return!0},r.prototype.addListener=function(e,t){var n;if(!o(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,o(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned&&(n=a(this._maxListeners)?r.defaultMaxListeners:this._maxListeners)&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!o(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},r.prototype.removeListener=function(e,t){var n,r,i,a;if(!o(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],i=n.length,r=-1,n===t||o(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(s(n)){for(a=i;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){r=a;break}if(r<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],o(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){return this._events&&this._events[e]?o(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(o(t))return 1;if(t)return t.length}return 0},r.listenerCount=function(e,t){return e.listenerCount(t)}},{}],35:[function(e,t,n){function r(e,t){var n=this;if(!(this instanceof r))return new r(e,t);t=t||{},o.call(this,t),this._offset=0,this._ready=!1,this._file=e,this._size=e.size,this._chunkSize=t.chunkSize||Math.max(this._size/1e3,204800),this.reader=new FileReader,this._generateHeaderBlocks(e,t,function(e,t){if(e)return n.emit("error",e);Array.isArray(t)&&t.forEach(function(e){n.push(e)}),n._ready=!0,n.emit("_ready")})}var o=e("readable-stream").Readable,i=e("inherits"),s=e("typedarray-to-buffer");i(r,o),t.exports=r,r.prototype._generateHeaderBlocks=function(e,t,n){n(null,[])},r.prototype._read=function(){if(!this._ready)return void this.once("_ready",this._read.bind(this));var e=this,t=this.reader,n=this._offset,r=this._offset+this._chunkSize;if(r>this._size&&(r=this._size),n===this._size)return this.destroy(),void this.push(null);t.onload=function(){e._offset=r,e.push(s(t.result))},t.onerror=function(){e.emit("error",t.error)},t.readAsArrayBuffer(this._file.slice(n,r))},r.prototype.destroy=function(){if(this._file=null,this.reader){this.reader.onload=null,this.reader.onerror=null;try{this.reader.abort()}catch(e){}}this.reader=null}},{inherits:41,"readable-stream":82,"typedarray-to-buffer":108}],36:[function(e,t,n){t.exports=function(e,t){function n(e,r){return e.reduce(function(e,o){return Array.isArray(o)&&r<t?e.concat(n(o,r+1)):e.concat(o)},[])}return t="number"==typeof t?t:1/0,t?n(e,1):Array.isArray(e)?e.map(function(e){return e}):e}},{}],37:[function(e,t,n){t.exports=function(){if("undefined"==typeof window)return null;var e={RTCPeerConnection:window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,RTCSessionDescription:window.RTCSessionDescription||window.mozRTCSessionDescription||window.webkitRTCSessionDescription,RTCIceCandidate:window.RTCIceCandidate||window.mozRTCIceCandidate||window.webkitRTCIceCandidate};return e.RTCPeerConnection?e:null}},{}],38:[function(e,t,n){function r(e){if("string"==typeof e&&(e=i.parse(e)),e.protocol||(e.protocol="https:"),"https:"!==e.protocol)throw new Error('Protocol "'+e.protocol+'" not supported. Expected "https:"');return e}var o=e("http"),i=e("url"),s=t.exports;for(var a in o)o.hasOwnProperty(a)&&(s[a]=o[a]);s.request=function(e,t){return e=r(e),o.request.call(this,e,t)},s.get=function(e,t){return e=r(e),o.get.call(this,e,t)}},{http:95,url:112}],39:[function(e,t,n){n.read=function(e,t,n,r,o){var i,s,a=8*o-r-1,u=(1<<a)-1,c=u>>1,f=-7,d=n?o-1:0,h=n?-1:1,l=e[t+d];for(d+=h,i=l&(1<<-f)-1,l>>=-f,f+=a;f>0;i=256*i+e[t+d],d+=h,f-=8);for(s=i&(1<<-f)-1,i>>=-f,f+=r;f>0;s=256*s+e[t+d],d+=h,f-=8);if(0===i)i=1-c;else{if(i===u)return s?NaN:1/0*(l?-1:1);s+=Math.pow(2,r),i-=c}return(l?-1:1)*s*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var s,a,u,c=8*i-o-1,f=(1<<c)-1,d=f>>1,h=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,l=r?0:i-1,p=r?1:-1,m=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,s=f):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),t+=s+d>=1?h/u:h*Math.pow(2,1-d),t*u>=2&&(s++,u/=2),s+d>=f?(a=0,s=f):s+d>=1?(a=(t*u-1)*Math.pow(2,o),s+=d):(a=t*Math.pow(2,d-1)*Math.pow(2,o),s=0));o>=8;e[n+l]=255&a,l+=p,a/=256,o-=8);for(s=s<<o|a,c+=o;c>0;e[n+l]=255&s,l+=p,s/=256,c-=8);e[n+l-p]|=128*m}},{}],40:[function(e,t,n){(function(e){function n(e){if(!(this instanceof n))return new n(e);if(this.store=e,this.chunkLength=e.chunkLength,!this.store||!this.store.get||!this.store.put)throw new Error("First argument must be abstract-chunk-store compliant");this.mem=[]}function r(t,n,r){e.nextTick(function(){t&&t(n,r)})}t.exports=n,n.prototype.put=function(e,t,n){var r=this;r.mem[e]=t,r.store.put(e,t,function(t){r.mem[e]=null,n&&n(t)})},n.prototype.get=function(e,t,n){if("function"==typeof t)return this.get(e,null,t);var o=t&&t.offset||0,i=t&&t.length&&o+t.length,s=this.mem[e];if(s)return r(n,null,t?s.slice(o,i):s);this.store.get(e,t,n)},n.prototype.close=function(e){this.store.close(e)},n.prototype.destroy=function(e){this.store.destroy(e)}}).call(this,e("_process"))},{_process:66}],41:[function(e,t,n){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],42:[function(e,t,n){t.exports=function(e){for(var t=0,n=e.length;t<n;++t)if(e.charCodeAt(t)>127)return!1;return!0}},{}],43:[function(e,t,n){function r(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function o(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&r(e.slice(0,0))}t.exports=function(e){return null!=e&&(r(e)||o(e)||!!e._isBuffer)}},{}],44:[function(e,t,n){"use strict";function r(e){return o.existsSync(e)&&o.statSync(e).isFile()}var o=e("fs");t.exports=function(e,t){if(!t)return r(e);o.stat(e,function(e,n){return e?t(e):t(null,n.isFile())})},t.exports.sync=r},{fs:22}],45:[function(e,t,n){function r(e){return o(e)||i(e)}function o(e){return e instanceof Int8Array||e instanceof Int16Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Uint16Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array}function i(e){return a[s.call(e)]}t.exports=r,r.strict=o,r.loose=i;var s=Object.prototype.toString,a={"[object Int8Array]":!0,"[object Int16Array]":!0,"[object Int32Array]":!0,"[object Uint8Array]":!0,"[object Uint8ClampedArray]":!0,"[object Uint16Array]":!0,"[object Uint32Array]":!0,"[object Float32Array]":!0,"[object Float64Array]":!0}},{}],46:[function(e,t,n){var r={}.toString;t.exports=Array.isArray||function(e){return"[object Array]"==r.call(e)}},{}],47:[function(e,t,n){"use strict";n.re=/^npm-debug\.log$|^\..*\.swp$|^\.DS_Store$|^\.AppleDouble$|^\.LSOverride$|^Icon\r$|^\._.*|^\.Spotlight-V100$|\.Trashes|^__MACOSX$|~$|^Thumbs\.db$|^ehthumbs\.db$|^Desktop\.ini$/,n.is=function(e){return n.re.test(e)},n.not=n.isnt=function(e){return!n.is(e)}},{}],48:[function(e,t,n){(function(n){function r(e){var t={},r=e.split("magnet:?")[1];(r&&r.length>=0?r.split("&"):[]).forEach(function(e){var n=e.split("=");if(2===n.length){var r=n[0],o=n[1];if("dn"===r&&(o=decodeURIComponent(o).replace(/\+/g," ")),"tr"!==r&&"xs"!==r&&"as"!==r&&"ws"!==r||(o=decodeURIComponent(o)),"kt"===r&&(o=decodeURIComponent(o).split("+")),"ix"===r&&(o=Number(o)),t[r])if(Array.isArray(t[r]))t[r].push(o);else{var i=t[r];t[r]=[i,o]}else t[r]=o}});var o;if(t.xt){(Array.isArray(t.xt)?t.xt:[t.xt]).forEach(function(e){if(o=e.match(/^urn:btih:(.{40})/))t.infoHash=o[1].toLowerCase();else if(o=e.match(/^urn:btih:(.{32})/)){var r=i.decode(o[1]);t.infoHash=n.from(r,"binary").toString("hex")}})}return t.infoHash&&(t.infoHashBuffer=n.from(t.infoHash,"hex")),t.dn&&(t.name=t.dn),t.kt&&(t.keywords=t.kt),"string"==typeof t.tr?t.announce=[t.tr]:Array.isArray(t.tr)?t.announce=t.tr:t.announce=[],t.urlList=[],("string"==typeof t.as||Array.isArray(t.as))&&(t.urlList=t.urlList.concat(t.as)),("string"==typeof t.ws||Array.isArray(t.ws))&&(t.urlList=t.urlList.concat(t.ws)),a(t.announce),a(t.urlList),t}function o(e){e=s(e),e.infoHashBuffer&&(e.xt="urn:btih:"+e.infoHashBuffer.toString("hex")),e.infoHash&&(e.xt="urn:btih:"+e.infoHash),e.name&&(e.dn=e.name),e.keywords&&(e.kt=e.keywords),e.announce&&(e.tr=e.announce),e.urlList&&(e.ws=e.urlList,delete e.as);var t="magnet:?";return Object.keys(e).filter(function(e){return 2===e.length}).forEach(function(n,r){(Array.isArray(e[n])?e[n]:[e[n]]).forEach(function(e,o){!(r>0||o>0)||"kt"===n&&0!==o||(t+="&"),"dn"===n&&(e=encodeURIComponent(e).replace(/%20/g,"+")),"tr"!==n&&"xs"!==n&&"as"!==n&&"ws"!==n||(e=encodeURIComponent(e)),"kt"===n&&(e=encodeURIComponent(e)),t+="kt"===n&&o>0?"+"+e:n+"="+e})}),t}t.exports=r,t.exports.decode=r,t.exports.encode=o;var i=e("thirty-two"),s=e("xtend"),a=e("uniq")}).call(this,e("buffer").Buffer)},{buffer:24,"thirty-two":103,uniq:110,xtend:119}],49:[function(e,t,n){function r(e,t){var n=this;if(!(n instanceof r))return new r(e,t);if(!u)throw new Error("web browser lacks MediaSource support");t||(t={}),n._bufferDuration=t.bufferDuration||c,n._elem=e,n._mediaSource=new u,n._streams=[],n.detailedError=null,n._errorHandler=function(){n._elem.removeEventListener("error",n._errorHandler),n._streams.slice().forEach(function(e){e.destroy(n._elem.error)})},n._elem.addEventListener("error",n._errorHandler),n._elem.src=window.URL.createObjectURL(n._mediaSource)}function o(e,t){var n=this;if(s.Writable.call(n),n._wrapper=e,n._elem=e._elem,n._mediaSource=e._mediaSource,n._allStreams=e._streams,n._allStreams.push(n),n._bufferDuration=e._bufferDuration,n._sourceBuffer=null,n._openHandler=function(){n._onSourceOpen()},n._flowHandler=function(){n._flow()},"string"==typeof t)n._type=t,"open"===n._mediaSource.readyState?n._createSourceBuffer():n._mediaSource.addEventListener("sourceopen",n._openHandler);else if(null===t._sourceBuffer)t.destroy(),n._type=t._type,n._mediaSource.addEventListener("sourceopen",n._openHandler);else{if(!t._sourceBuffer)throw new Error("The argument to MediaElementWrapper.createWriteStream must be a string or a previous stream returned from that function");t.destroy(),n._type=t._type,n._sourceBuffer=t._sourceBuffer,n._sourceBuffer.addEventListener("updateend",n._flowHandler)}n._elem.addEventListener("timeupdate",n._flowHandler),n.on("error",function(e){n._wrapper.error(e)}),n.on("finish",function(){if(!n.destroyed&&(n._finished=!0,n._allStreams.every(function(e){return e._finished})))try{n._mediaSource.endOfStream()}catch(e){}})}t.exports=r;var i=e("inherits"),s=e("readable-stream"),a=e("to-arraybuffer"),u="undefined"!=typeof window&&window.MediaSource,c=60;r.prototype.createWriteStream=function(e){return new o(this,e)},r.prototype.error=function(e){var t=this;t.detailedError||(t.detailedError=e);try{t._mediaSource.endOfStream("decode")}catch(e){}},i(o,s.Writable),o.prototype._onSourceOpen=function(){var e=this;e.destroyed||(e._mediaSource.removeEventListener("sourceopen",e._openHandler),e._createSourceBuffer())},o.prototype.destroy=function(e){var t=this;t.destroyed||(t.destroyed=!0,t._allStreams.splice(t._allStreams.indexOf(t),1),t._mediaSource.removeEventListener("sourceopen",t._openHandler),t._elem.removeEventListener("timeupdate",t._flowHandler),t._sourceBuffer&&(t._sourceBuffer.removeEventListener("updateend",t._flowHandler),"open"===t._mediaSource.readyState&&t._sourceBuffer.abort()),e&&t.emit("error",e),t.emit("close"))},o.prototype._createSourceBuffer=function(){var e=this;if(!e.destroyed)if(u.isTypeSupported(e._type)){if(e._sourceBuffer=e._mediaSource.addSourceBuffer(e._type),e._sourceBuffer.addEventListener("updateend",e._flowHandler),e._cb){var t=e._cb;e._cb=null,t()}}else e.destroy(new Error("The provided type is not supported"))},o.prototype._write=function(e,t,n){var r=this;if(!r.destroyed){if(!r._sourceBuffer)return void(r._cb=function(o){if(o)return n(o);r._write(e,t,n)});if(r._sourceBuffer.updating)return n(new Error("Cannot append buffer while source buffer updating"));try{r._sourceBuffer.appendBuffer(a(e))}catch(e){return void r.destroy(e)}r._cb=n}},o.prototype._flow=function(){var e=this;if(!e.destroyed&&e._sourceBuffer&&!e._sourceBuffer.updating&&!("open"===e._mediaSource.readyState&&e._getBufferDuration()>e._bufferDuration)&&e._cb){var t=e._cb;e._cb=null,t()}};o.prototype._getBufferDuration=function(){for(var e=this,t=e._sourceBuffer.buffered,n=e._elem.currentTime,r=-1,o=0;o<t.length;o++){var i=t.start(o),s=t.end(o)+0;if(i>n)break;(r>=0||n<=s)&&(r=s)}var a=r-n;return a<0&&(a=0),a}},{inherits:41,"readable-stream":82,"to-arraybuffer":105}],50:[function(e,t,n){(function(e){function n(e,t){if(!(this instanceof n))return new n(e,t);if(t||(t={}),this.chunkLength=Number(e),!this.chunkLength)throw new Error("First argument must be a chunk length");this.chunks=[],this.closed=!1,this.length=Number(t.length)||1/0,this.length!==1/0&&(this.lastChunkLength=this.length%this.chunkLength||this.chunkLength,this.lastChunkIndex=Math.ceil(this.length/this.chunkLength)-1)}function r(t,n,r){e.nextTick(function(){t&&t(n,r)})}t.exports=n,n.prototype.put=function(e,t,n){if(this.closed)return r(n,new Error("Storage is closed"));var o=e===this.lastChunkIndex;return o&&t.length!==this.lastChunkLength?r(n,new Error("Last chunk length must be "+this.lastChunkLength)):o||t.length===this.chunkLength?(this.chunks[e]=t,void r(n,null)):r(n,new Error("Chunk length must be "+this.chunkLength))},n.prototype.get=function(e,t,n){if("function"==typeof t)return this.get(e,null,t);if(this.closed)return r(n,new Error("Storage is closed"));var o=this.chunks[e];if(!o)return r(n,new Error("Chunk not found"));if(!t)return r(n,null,o);var i=t.offset||0,s=t.length||o.length-i;r(n,null,o.slice(i,s+i))},n.prototype.close=n.prototype.destroy=function(e){if(this.closed)return r(e,new Error("Storage is closed"));this.closed=!0,this.chunks=null,r(e,null)}}).call(this,e("_process"))},{_process:66}],51:[function(e,t,n){(function(t){function r(e,t,n){for(var r=t;r<n;r++)e[r]=0}function o(e,t,n){t.writeUInt32BE(Math.floor((e.getTime()+g)/1e3),n)}function i(e,t,n){t.writeUInt16BE(Math.floor(e)%65536,n),t.writeUInt16BE(Math.floor(256*e*256)%65536,n+2)}function s(e,t,n){t[n]=Math.floor(e)%256,t[n+1]=Math.floor(256*e)%256}function a(e,t,n){e||(e=[0,0,0,0,0,0,0,0,0]);for(var r=0;r<e.length;r++)i(e[r],t,n+4*r)}function u(e,n,r){var o=new t(e,"utf8");o.copy(n,r),n[r+o.length]=0}function c(e){for(var t=new Array(e.length/4),n=0;n<t.length;n++)t[n]=d(e,4*n);return t}function f(e,t){return new Date(1e3*e.readUInt32BE(t)-g)}function d(e,t){return e.readUInt16BE(t)+e.readUInt16BE(t+2)/65536}function h(e,t){return e[t]+e[t+1]/256}function l(e,t,n){var r;for(r=0;r<n&&0!==e[t+r];r++);return e.toString("utf8",t,t+r)}var p=e("./index"),m=e("./descriptor"),g=20828448e5;n.fullBoxes={},["mvhd","tkhd","mdhd","vmhd","smhd","stsd","esds","stsz","stco","stss","stts","ctts","stsc","dref","elst","hdlr","mehd","trex","mfhd","tfhd","tfdt","trun"].forEach(function(e){n.fullBoxes[e]=!0}),n.ftyp={},n.ftyp.encode=function(e,r,o){r=r?r.slice(o):new t(n.ftyp.encodingLength(e));var i=e.compatibleBrands||[];r.write(e.brand,0,4,"ascii"),r.writeUInt32BE(e.brandVersion,4);for(var s=0;s<i.length;s++)r.write(i[s],8+4*s,4,"ascii");return n.ftyp.encode.bytes=8+4*i.length,r},n.ftyp.decode=function(e,t){e=e.slice(t);for(var n=e.toString("ascii",0,4),r=e.readUInt32BE(4),o=[],i=8;i<e.length;i+=4)o.push(e.toString("ascii",i,i+4));return{brand:n,brandVersion:r,compatibleBrands:o}},n.ftyp.encodingLength=function(e){return 8+4*(e.compatibleBrands||[]).length},n.mvhd={},n.mvhd.encode=function(e,u,c){return u=u?u.slice(c):new t(96),o(e.ctime||new Date,u,0),o(e.mtime||new Date,u,4),u.writeUInt32BE(e.timeScale||0,8),u.writeUInt32BE(e.duration||0,12),i(e.preferredRate||0,u,16),s(e.preferredVolume||0,u,20),r(u,22,32),a(e.matrix,u,32),u.writeUInt32BE(e.previewTime||0,68),u.writeUInt32BE(e.previewDuration||0,72),u.writeUInt32BE(e.posterTime||0,76),u.writeUInt32BE(e.selectionTime||0,80),u.writeUInt32BE(e.selectionDuration||0,84),u.writeUInt32BE(e.currentTime||0,88),u.writeUInt32BE(e.nextTrackId||0,92),n.mvhd.encode.bytes=96,u},n.mvhd.decode=function(e,t){return e=e.slice(t),{ctime:f(e,0),mtime:f(e,4),timeScale:e.readUInt32BE(8),duration:e.readUInt32BE(12),preferredRate:d(e,16),preferredVolume:h(e,20),matrix:c(e.slice(32,68)),previewTime:e.readUInt32BE(68),previewDuration:e.readUInt32BE(72),posterTime:e.readUInt32BE(76),selectionTime:e.readUInt32BE(80),selectionDuration:e.readUInt32BE(84),currentTime:e.readUInt32BE(88),nextTrackId:e.readUInt32BE(92)}},n.mvhd.encodingLength=function(e){return 96},n.tkhd={},n.tkhd.encode=function(e,i,s){return i=i?i.slice(s):new t(80),o(e.ctime||new Date,i,0),o(e.mtime||new Date,i,4),i.writeUInt32BE(e.trackId||0,8),r(i,12,16),i.writeUInt32BE(e.duration||0,16),r(i,20,28),i.writeUInt16BE(e.layer||0,28),i.writeUInt16BE(e.alternateGroup||0,30),i.writeUInt16BE(e.volume||0,32),a(e.matrix,i,36),i.writeUInt32BE(e.trackWidth||0,72),i.writeUInt32BE(e.trackHeight||0,76),n.tkhd.encode.bytes=80,i},n.tkhd.decode=function(e,t){return e=e.slice(t),{ctime:f(e,0),mtime:f(e,4),trackId:e.readUInt32BE(8),duration:e.readUInt32BE(16),layer:e.readUInt16BE(28),alternateGroup:e.readUInt16BE(30),volume:e.readUInt16BE(32),matrix:c(e.slice(36,72)),trackWidth:e.readUInt32BE(72),trackHeight:e.readUInt32BE(76)}},n.tkhd.encodingLength=function(e){return 80},n.mdhd={},n.mdhd.encode=function(e,r,i){return r=r?r.slice(i):new t(20),o(e.ctime||new Date,r,0),o(e.mtime||new Date,r,4),r.writeUInt32BE(e.timeScale||0,8),r.writeUInt32BE(e.duration||0,12),r.writeUInt16BE(e.language||0,16),r.writeUInt16BE(e.quality||0,18),n.mdhd.encode.bytes=20,r},n.mdhd.decode=function(e,t){return e=e.slice(t),{ctime:f(e,0),mtime:f(e,4),timeScale:e.readUInt32BE(8),duration:e.readUInt32BE(12),language:e.readUInt16BE(16),quality:e.readUInt16BE(18)}},n.mdhd.encodingLength=function(e){return 20},n.vmhd={},n.vmhd.encode=function(e,r,o){r=r?r.slice(o):new t(8),r.writeUInt16BE(e.graphicsMode||0,0);var i=e.opcolor||[0,0,0];return r.writeUInt16BE(i[0],2),r.writeUInt16BE(i[1],4),r.writeUInt16BE(i[2],6),n.vmhd.encode.bytes=8,r},n.vmhd.decode=function(e,t){return e=e.slice(t),{graphicsMode:e.readUInt16BE(0),opcolor:[e.readUInt16BE(2),e.readUInt16BE(4),e.readUInt16BE(6)]}},n.vmhd.encodingLength=function(e){return 8},n.smhd={},n.smhd.encode=function(e,o,i){return o=o?o.slice(i):new t(4),o.writeUInt16BE(e.balance||0,0),r(o,2,4),n.smhd.encode.bytes=4,o},n.smhd.decode=function(e,t){return e=e.slice(t),{balance:e.readUInt16BE(0)}},n.smhd.encodingLength=function(e){return 4},n.stsd={},n.stsd.encode=function(e,r,o){r=r?r.slice(o):new t(n.stsd.encodingLength(e));var i=e.entries||[];r.writeUInt32BE(i.length,0);for(var s=4,a=0;a<i.length;a++){var u=i[a];p.encode(u,r,s),s+=p.encode.bytes}return n.stsd.encode.bytes=s,r},n.stsd.decode=function(e,t,n){e=e.slice(t);for(var r=e.readUInt32BE(0),o=new Array(r),i=4,s=0;s<r;s++){var a=p.decode(e,i,n);o[s]=a,i+=a.length}return{entries:o}},n.stsd.encodingLength=function(e){var t=4;if(!e.entries)return t;for(var n=0;n<e.entries.length;n++)t+=p.encodingLength(e.entries[n]);return t},n.avc1=n.VisualSampleEntry={},n.VisualSampleEntry.encode=function(e,o,i){o=o?o.slice(i):new t(n.VisualSampleEntry.encodingLength(e)),r(o,0,6),o.writeUInt16BE(e.dataReferenceIndex||0,6),r(o,8,24),o.writeUInt16BE(e.width||0,24),o.writeUInt16BE(e.height||0,26),o.writeUInt32BE(e.hResolution||4718592,28),o.writeUInt32BE(e.vResolution||4718592,32),r(o,36,40),o.writeUInt16BE(e.frameCount||1,40);var s=e.compressorName||"",a=Math.min(s.length,31);o.writeUInt8(a,42),o.write(s,43,a,"utf8"),o.writeUInt16BE(e.depth||24,74),o.writeInt16BE(-1,76);var u=78;(e.children||[]).forEach(function(e){p.encode(e,o,u),u+=p.encode.bytes}),n.VisualSampleEntry.encode.bytes=u},n.VisualSampleEntry.decode=function(e,t,n){e=e.slice(t);for(var r=n-t,o=Math.min(e.readUInt8(42),31),i={dataReferenceIndex:e.readUInt16BE(6),width:e.readUInt16BE(24),height:e.readUInt16BE(26),hResolution:e.readUInt32BE(28),vResolution:e.readUInt32BE(32),frameCount:e.readUInt16BE(40),compressorName:e.toString("utf8",43,43+o),depth:e.readUInt16BE(74),children:[]},s=78;r-s>=8;){var a=p.decode(e,s,r);i.children.push(a),i[a.type]=a,s+=a.length}return i},n.VisualSampleEntry.encodingLength=function(e){var t=78;return(e.children||[]).forEach(function(e){t+=p.encodingLength(e)}),t},n.avcC={},n.avcC.encode=function(e,r,o){r=r?r.slice(o):t(e.buffer.length),e.buffer.copy(r),n.avcC.encode.bytes=e.buffer.length},n.avcC.decode=function(e,n,r){return e=e.slice(n,r),{mimeCodec:e.toString("hex",1,4),buffer:new t(e)}},n.avcC.encodingLength=function(e){return e.buffer.length},n.mp4a=n.AudioSampleEntry={},n.AudioSampleEntry.encode=function(e,o,i){o=o?o.slice(i):new t(n.AudioSampleEntry.encodingLength(e)),r(o,0,6),o.writeUInt16BE(e.dataReferenceIndex||0,6),r(o,8,16),o.writeUInt16BE(e.channelCount||2,16),o.writeUInt16BE(e.sampleSize||16,18),r(o,20,24),o.writeUInt32BE(e.sampleRate||0,24);var s=28;(e.children||[]).forEach(function(e){p.encode(e,o,s),s+=p.encode.bytes}),n.AudioSampleEntry.encode.bytes=s},n.AudioSampleEntry.decode=function(e,t,n){e=e.slice(t,n);for(var r=n-t,o={dataReferenceIndex:e.readUInt16BE(6),channelCount:e.readUInt16BE(16),sampleSize:e.readUInt16BE(18),sampleRate:e.readUInt32BE(24),children:[]},i=28;r-i>=8;){var s=p.decode(e,i,r);o.children.push(s),o[s.type]=s,i+=s.length}return o},n.AudioSampleEntry.encodingLength=function(e){var t=28;return(e.children||[]).forEach(function(e){t+=p.encodingLength(e)}),t},n.esds={},n.esds.encode=function(e,r,o){r=r?r.slice(o):t(e.buffer.length),e.buffer.copy(r,0),n.esds.encode.bytes=e.buffer.length},n.esds.decode=function(e,n,r){e=e.slice(n,r);var o=m.Descriptor.decode(e,0,e.length),i="ESDescriptor"===o.tagName?o:{},s=i.DecoderConfigDescriptor||{},a=s.oti||0,u=s.DecoderSpecificInfo,c=u?(248&u.buffer.readUInt8(0))>>3:0,f=null;return a&&(f=a.toString(16),c&&(f+="."+c)),{mimeCodec:f,buffer:new t(e.slice(0))}},n.esds.encodingLength=function(e){return e.buffer.length},n.stsz={},n.stsz.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):t(n.stsz.encodingLength(e)),r.writeUInt32BE(0,0),r.writeUInt32BE(i.length,4);for(var s=0;s<i.length;s++)r.writeUInt32BE(i[s],4*s+8);return n.stsz.encode.bytes=8+4*i.length,r},n.stsz.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=e.readUInt32BE(4),o=new Array(r),i=0;i<r;i++)o[i]=0===n?e.readUInt32BE(4*i+8):n;return{entries:o}},n.stsz.encodingLength=function(e){return 8+4*e.entries.length},n.stss=n.stco={},n.stco.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):new t(n.stco.encodingLength(e)),r.writeUInt32BE(i.length,0);for(var s=0;s<i.length;s++)r.writeUInt32BE(i[s],4*s+4);return n.stco.encode.bytes=4+4*i.length,r},n.stco.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++)r[o]=e.readUInt32BE(4*o+4);return{entries:r}},n.stco.encodingLength=function(e){return 4+4*e.entries.length},n.stts={},n.stts.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):new t(n.stts.encodingLength(e)),r.writeUInt32BE(i.length,0);for(var s=0;s<i.length;s++){var a=8*s+4;r.writeUInt32BE(i[s].count||0,a),r.writeUInt32BE(i[s].duration||0,a+4)}return n.stts.encode.bytes=4+8*e.entries.length,r},
n.stts.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++){var i=8*o+4;r[o]={count:e.readUInt32BE(i),duration:e.readUInt32BE(i+4)}}return{entries:r}},n.stts.encodingLength=function(e){return 4+8*e.entries.length},n.ctts={},n.ctts.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):new t(n.ctts.encodingLength(e)),r.writeUInt32BE(i.length,0);for(var s=0;s<i.length;s++){var a=8*s+4;r.writeUInt32BE(i[s].count||0,a),r.writeUInt32BE(i[s].compositionOffset||0,a+4)}return n.ctts.encode.bytes=4+8*i.length,r},n.ctts.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++){var i=8*o+4;r[o]={count:e.readUInt32BE(i),compositionOffset:e.readInt32BE(i+4)}}return{entries:r}},n.ctts.encodingLength=function(e){return 4+8*e.entries.length},n.stsc={},n.stsc.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):new t(n.stsc.encodingLength(e)),r.writeUInt32BE(i.length,0);for(var s=0;s<i.length;s++){var a=12*s+4;r.writeUInt32BE(i[s].firstChunk||0,a),r.writeUInt32BE(i[s].samplesPerChunk||0,a+4),r.writeUInt32BE(i[s].sampleDescriptionId||0,a+8)}return n.stsc.encode.bytes=4+12*i.length,r},n.stsc.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++){var i=12*o+4;r[o]={firstChunk:e.readUInt32BE(i),samplesPerChunk:e.readUInt32BE(i+4),sampleDescriptionId:e.readUInt32BE(i+8)}}return{entries:r}},n.stsc.encodingLength=function(e){return 4+12*e.entries.length},n.dref={},n.dref.encode=function(e,r,o){r=r?r.slice(o):new t(n.dref.encodingLength(e));var i=e.entries||[];r.writeUInt32BE(i.length,0);for(var s=4,a=0;a<i.length;a++){var u=i[a],c=(u.buf?u.buf.length:0)+4+4;r.writeUInt32BE(c,s),s+=4,r.write(u.type,s,4,"ascii"),s+=4,u.buf&&(u.buf.copy(r,s),s+=u.buf.length)}return n.dref.encode.bytes=s,r},n.dref.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=4,i=0;i<n;i++){var s=e.readUInt32BE(o),a=e.toString("ascii",o+4,o+8),u=e.slice(o+8,o+s);o+=s,r[i]={type:a,buf:u}}return{entries:r}},n.dref.encodingLength=function(e){var t=4;if(!e.entries)return t;for(var n=0;n<e.entries.length;n++){var r=e.entries[n].buf;t+=(r?r.length:0)+4+4}return t},n.elst={},n.elst.encode=function(e,r,o){var s=e.entries||[];r=r?r.slice(o):new t(n.elst.encodingLength(e)),r.writeUInt32BE(s.length,0);for(var a=0;a<s.length;a++){var u=12*a+4;r.writeUInt32BE(s[a].trackDuration||0,u),r.writeUInt32BE(s[a].mediaTime||0,u+4),i(s[a].mediaRate||0,r,u+8)}return n.elst.encode.bytes=4+12*s.length,r},n.elst.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++){var i=12*o+4;r[o]={trackDuration:e.readUInt32BE(i),mediaTime:e.readInt32BE(i+4),mediaRate:d(e,i+8)}}return{entries:r}},n.elst.encodingLength=function(e){return 4+12*e.entries.length},n.hdlr={},n.hdlr.encode=function(e,r,o){r=r?r.slice(o):new t(n.hdlr.encodingLength(e));var i=21+(e.name||"").length;return r.fill(0,0,i),r.write(e.handlerType||"",4,4,"ascii"),u(e.name||"",r,20),n.hdlr.encode.bytes=i,r},n.hdlr.decode=function(e,t,n){return e=e.slice(t),{handlerType:e.toString("ascii",4,8),name:l(e,20,n)}},n.hdlr.encodingLength=function(e){return 21+(e.name||"").length},n.mehd={},n.mehd.encode=function(e,r,o){return r=r?r.slice(o):new t(4),r.writeUInt32BE(e.fragmentDuration||0,0),n.mehd.encode.bytes=4,r},n.mehd.decode=function(e,t){return e=e.slice(t),{fragmentDuration:e.readUInt32BE(0)}},n.mehd.encodingLength=function(e){return 4},n.trex={},n.trex.encode=function(e,r,o){return r=r?r.slice(o):new t(20),r.writeUInt32BE(e.trackId||0,0),r.writeUInt32BE(e.defaultSampleDescriptionIndex||0,4),r.writeUInt32BE(e.defaultSampleDuration||0,8),r.writeUInt32BE(e.defaultSampleSize||0,12),r.writeUInt32BE(e.defaultSampleFlags||0,16),n.trex.encode.bytes=20,r},n.trex.decode=function(e,t){return e=e.slice(t),{trackId:e.readUInt32BE(0),defaultSampleDescriptionIndex:e.readUInt32BE(4),defaultSampleDuration:e.readUInt32BE(8),defaultSampleSize:e.readUInt32BE(12),defaultSampleFlags:e.readUInt32BE(16)}},n.trex.encodingLength=function(e){return 20},n.mfhd={},n.mfhd.encode=function(e,r,o){return r=r?r.slice(o):new t(4),r.writeUInt32BE(e.sequenceNumber||0,0),n.mfhd.encode.bytes=4,r},n.mfhd.decode=function(e,t){return{sequenceNumber:e.readUint32BE(0)}},n.mfhd.encodingLength=function(e){return 4},n.tfhd={},n.tfhd.encode=function(e,r,o){return r=r?r.slice(o):new t(4),r.writeUInt32BE(e.trackId,0),n.tfhd.encode.bytes=4,r},n.tfhd.decode=function(e,t){},n.tfhd.encodingLength=function(e){return 4},n.tfdt={},n.tfdt.encode=function(e,r,o){return r=r?r.slice(o):new t(4),r.writeUInt32BE(e.baseMediaDecodeTime||0,0),n.tfdt.encode.bytes=4,r},n.tfdt.decode=function(e,t){},n.tfdt.encodingLength=function(e){return 4},n.trun={},n.trun.encode=function(e,r,o){r=r?r.slice(o):new t(8+16*e.entries.length),r.writeUInt32BE(e.entries.length,0),r.writeInt32BE(e.dataOffset,4);for(var i=8,s=0;s<e.entries.length;s++){var a=e.entries[s];r.writeUInt32BE(a.sampleDuration,i),i+=4,r.writeUInt32BE(a.sampleSize,i),i+=4,r.writeUInt32BE(a.sampleFlags,i),i+=4,r.writeUInt32BE(a.sampleCompositionTimeOffset,i),i+=4}n.trun.encode.bytes=i},n.trun.decode=function(e,t){},n.trun.encodingLength=function(e){return 8+16*e.entries.length},n.mdat={},n.mdat.encode=function(e,t,r){e.buffer?(e.buffer.copy(t,r),n.mdat.encode.bytes=e.buffer.length):n.mdat.encode.bytes=n.mdat.encodingLength(e)},n.mdat.decode=function(e,n,r){return{buffer:new t(e.slice(n,r))}},n.mdat.encodingLength=function(e){return e.buffer?e.buffer.length:e.contentLength}}).call(this,e("buffer").Buffer)},{"./descriptor":52,"./index":53,buffer:24}],52:[function(e,t,n){(function(e){var t={3:"ESDescriptor",4:"DecoderConfigDescriptor",5:"DecoderSpecificInfo",6:"SLConfigDescriptor"};n.Descriptor={},n.Descriptor.decode=function(r,o,i){var s,a=r.readUInt8(o),u=o+1,c=0;do{s=r.readUInt8(u++),c=c<<7|127&s}while(128&s);var f,d=t[a];return f=n[d]?n[d].decode(r,u,i):{buffer:new e(r.slice(u,u+c))},f.tag=a,f.tagName=d,f.length=u-o+c,f.contentsLen=c,f},n.DescriptorArray={},n.DescriptorArray.decode=function(e,r,o){for(var i=r,s={};i+2<=o;){var a=n.Descriptor.decode(e,i,o);i+=a.length;s[t[a.tag]||"Descriptor"+a.tag]=a}return s},n.ESDescriptor={},n.ESDescriptor.decode=function(e,t,r){var o=e.readUInt8(t+2),i=t+3;if(128&o&&(i+=2),64&o){i+=e.readUInt8(i)+1}return 32&o&&(i+=2),n.DescriptorArray.decode(e,i,r)},n.DecoderConfigDescriptor={},n.DecoderConfigDescriptor.decode=function(e,t,r){var o=e.readUInt8(t),i=n.DescriptorArray.decode(e,t+13,r);return i.oti=o,i}}).call(this,e("buffer").Buffer)},{buffer:24}],53:[function(e,t,n){(function(t){var r=e("uint64be"),o=e("./boxes"),i=n,s=n.containers={moov:["mvhd","meta","traks","mvex"],trak:["tkhd","tref","trgr","edts","meta","mdia","udta"],edts:["elst"],mdia:["mdhd","hdlr","elng","minf"],minf:["vmhd","smhd","hmhd","sthd","nmhd","dinf","stbl"],dinf:["dref"],stbl:["stsd","stts","ctts","cslg","stsc","stsz","stz2","stco","co64","stss","stsh","padb","stdp","sdtp","sbgps","sgpds","subss","saizs","saios"],mvex:["mehd","trexs","leva"],moof:["mfhd","meta","trafs"],traf:["tfhd","trun","sbgps","sgpds","subss","saizs","saios","tfdt","meta"]};i.encode=function(e,n,r){return i.encodingLength(e),r=r||0,n=n||new t(e.length),i._encode(e,n,r)},i._encode=function(e,t,n){var a=e.type,u=e.length;u>4294967295&&(u=1),t.writeUInt32BE(u,n),t.write(e.type,n+4,4,"ascii");var c=n+8;if(1===u&&(r.encode(e.length,t,c),c+=8),o.fullBoxes[a]&&(t.writeUInt32BE(e.flags||0,c),t.writeUInt8(e.version||0,c),c+=4),s[a]){s[a].forEach(function(n){if(5===n.length){var r=e[n]||[];n=n.substr(0,4),r.forEach(function(e){i._encode(e,t,c),c+=i.encode.bytes})}else e[n]&&(i._encode(e[n],t,c),c+=i.encode.bytes)}),e.otherBoxes&&e.otherBoxes.forEach(function(e){i._encode(e,t,c),c+=i.encode.bytes})}else if(o[a]){var f=o[a].encode;f(e,t,c),c+=f.bytes}else{if(!e.buffer)throw new Error("Either `type` must be set to a known type (not'"+a+"') or `buffer` must be set");var d=e.buffer;d.copy(t,c),c+=e.buffer.length}return i.encode.bytes=c-n,t},i.readHeaders=function(e,t,n){if(t=t||0,(n=n||e.length)-t<8)return 8;var i=e.readUInt32BE(t),s=e.toString("ascii",t+4,t+8),a=t+8;if(1===i){if(n-t<16)return 16;i=r.decode(e,a),a+=8}var u,c;return o.fullBoxes[s]&&(u=e.readUInt8(a),c=16777215&e.readUInt32BE(a),a+=4),{length:i,headersLen:a-t,contentLen:i-(a-t),type:s,version:u,flags:c}},i.decode=function(e,t,n){t=t||0,n=n||e.length;var r=i.readHeaders(e,t,n);if(!r||r.length>n-t)throw new Error("Data too short");return i.decodeWithoutHeaders(r,e,t+r.headersLen,t+r.length)},i.decodeWithoutHeaders=function(e,n,r,a){r=r||0,a=a||n.length;var u=e.type,c={};if(s[u]){c.otherBoxes=[];for(var f=s[u],d=r;a-d>=8;){var h=i.decode(n,d,a);if(d+=h.length,f.indexOf(h.type)>=0)c[h.type]=h;else if(f.indexOf(h.type+"s")>=0){var l=h.type+"s",p=c[l]=c[l]||[];p.push(h)}else c.otherBoxes.push(h)}}else if(o[u]){var m=o[u].decode;c=m(n,r,a)}else c.buffer=new t(n.slice(r,a));return c.length=e.length,c.contentLen=e.contentLen,c.type=e.type,c.version=e.version,c.flags=e.flags,c},i.encodingLength=function(e){var t=e.type,n=8;if(o.fullBoxes[t]&&(n+=4),s[t]){s[t].forEach(function(t){if(5===t.length){var r=e[t]||[];t=t.substr(0,4),r.forEach(function(e){e.type=t,n+=i.encodingLength(e)})}else if(e[t]){var o=e[t];o.type=t,n+=i.encodingLength(o)}}),e.otherBoxes&&e.otherBoxes.forEach(function(e){n+=i.encodingLength(e)})}else if(o[t])n+=o[t].encodingLength(e);else{if(!e.buffer)throw new Error("Either `type` must be set to a known type (not'"+t+"') or `buffer` must be set");n+=e.buffer.length}return n>4294967295&&(n+=8),e.length=n,n}}).call(this,e("buffer").Buffer)},{"./boxes":51,buffer:24,uint64be:109}],54:[function(e,t,n){(function(n){function r(){if(!(this instanceof r))return new r;i.Writable.call(this),this.destroyed=!1,this._pending=0,this._missing=0,this._buf=null,this._str=null,this._cb=null,this._ondrain=null,this._writeBuffer=null,this._writeCb=null,this._ondrain=null,this._kick()}function o(e){this._parent=e,this.destroyed=!1,i.PassThrough.call(this)}var i=e("readable-stream"),s=e("inherits"),a=e("next-event"),u=e("mp4-box-encoding"),c=new n(0);t.exports=r,s(r,i.Writable),r.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,e&&this.emit("error",e),this.emit("close"))},r.prototype._write=function(e,t,n){if(!this.destroyed){for(var r=!this._str||!this._str._writableState.needDrain;e.length&&!this.destroyed;){if(!this._missing)return this._writeBuffer=e,void(this._writeCb=n);var o=e.length<this._missing?e.length:this._missing;if(this._buf?e.copy(this._buf,this._buf.length-this._missing):this._str&&(r=this._str.write(o===e.length?e:e.slice(0,o))),this._missing-=o,!this._missing){var i=this._buf,s=this._cb,a=this._str;this._buf=this._cb=this._str=this._ondrain=null,r=!0,a&&a.end(),s&&s(i)}e=o===e.length?c:e.slice(o)}if(this._pending&&!this._missing)return this._writeBuffer=e,void(this._writeCb=n);r?n():this._ondrain(n)}},r.prototype._buffer=function(e,t){this._missing=e,this._buf=new n(e),this._cb=t},r.prototype._stream=function(e,t){var n=this;return this._missing=e,this._str=new o(this),this._ondrain=a(this._str,"drain"),this._pending++,this._str.on("end",function(){n._pending--,n._kick()}),this._cb=t,this._str},r.prototype._readBox=function(){function e(r,o){t._buffer(r,function(r){o=o?n.concat([o,r]):r;var i=u.readHeaders(o);"number"==typeof i?e(i-o.length,o):(t._pending++,t._headers=i,t.emit("box",i))})}var t=this;e(8)},r.prototype.stream=function(){var e=this;if(!e._headers)throw new Error("this function can only be called once after 'box' is emitted");var t=e._headers;return e._headers=null,e._stream(t.contentLen,null)},r.prototype.decode=function(e){var t=this;if(!t._headers)throw new Error("this function can only be called once after 'box' is emitted");var n=t._headers;t._headers=null,t._buffer(n.contentLen,function(r){var o=u.decodeWithoutHeaders(n,r);e(o),t._pending--,t._kick()})},r.prototype.ignore=function(){var e=this;if(!e._headers)throw new Error("this function can only be called once after 'box' is emitted");var t=e._headers;e._headers=null,this._missing=t.contentLen,this._cb=function(){e._pending--,e._kick()}},r.prototype._kick=function(){if(!this._pending&&(this._buf||this._str||this._readBox(),this._writeBuffer)){var e=this._writeCb,t=this._writeBuffer;this._writeBuffer=null,this._writeCb=null,this._write(t,null,e)}},s(o,i.PassThrough),o.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,this._parent.destroy(e),e&&this.emit("error",e),this.emit("close"))}}).call(this,e("buffer").Buffer)},{buffer:24,inherits:41,"mp4-box-encoding":53,"next-event":59,"readable-stream":82}],55:[function(e,t,n){(function(n,r){function o(){}function i(){function e(){n._want&&(n._want=!1,n._read())}function t(){n._stream=null}if(!(this instanceof i))return new i;a.Readable.call(this),this.destroyed=!1,this._reading=!1,this._stream=null,this._drain=null,this._want=!1,this._onreadable=e,this._onend=t;var n=this}function s(e){this._parent=e,this.destroyed=!1,a.PassThrough.call(this)}var a=e("readable-stream"),u=e("inherits"),c=e("mp4-box-encoding");t.exports=i,u(i,a.Readable),i.prototype.mediaData=i.prototype.mdat=function(e,t){var n=new s(this);return this.box({type:"mdat",contentLength:e,encodeBufferLen:8,stream:n},t),n},i.prototype.box=function(e,t){if(t||(t=o),this.destroyed)return t(new Error("Encoder is destroyed"));var i;if(e.encodeBufferLen&&(i=new r(e.encodeBufferLen)),e.stream)e.buffer=null,i=c.encode(e,i),this.push(i),this._stream=e.stream,this._stream.on("readable",this._onreadable),this._stream.on("end",this._onend),this._stream.on("end",t),this._forward();else{i=c.encode(e,i);if(this.push(i))return n.nextTick(t);this._drain=t}},i.prototype.destroy=function(e){if(!this.destroyed){if(this.destroyed=!0,this._stream&&this._stream.destroy&&this._stream.destroy(),this._stream=null,this._drain){var t=this._drain;this._drain=null,t(e)}e&&this.emit("error",e),this.emit("close")}},i.prototype.finalize=function(){this.push(null)},i.prototype._forward=function(){if(this._stream)for(;!this.destroyed;){var e=this._stream.read();if(!e)return void(this._want=!!this._stream);if(!this.push(e))return}},i.prototype._read=function(){if(!this._reading&&!this.destroyed){if(this._reading=!0,this._stream&&this._forward(),this._drain){var e=this._drain;this._drain=null,e()}this._reading=!1}},u(s,a.PassThrough),s.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,this._parent.destroy(e),e&&this.emit("error",e),this.emit("close"))}}).call(this,e("_process"),e("buffer").Buffer)},{_process:66,buffer:24,inherits:41,"mp4-box-encoding":53,"readable-stream":82}],56:[function(e,t,n){n.decode=e("./decode"),n.encode=e("./encode")},{"./decode":54,"./encode":55}],57:[function(e,t,n){function r(e){if(e=String(e),!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return n*d;case"days":case"day":case"d":return n*f;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*u;case"seconds":case"second":case"secs":case"sec":case"s":return n*a;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function o(e){return e>=f?Math.round(e/f)+"d":e>=c?Math.round(e/c)+"h":e>=u?Math.round(e/u)+"m":e>=a?Math.round(e/a)+"s":e+"ms"}function i(e){return s(e,f,"day")||s(e,c,"hour")||s(e,u,"minute")||s(e,a,"second")||e+" ms"}function s(e,t,n){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var a=1e3,u=60*a,c=60*u,f=24*c,d=365.25*f;t.exports=function(e,t){t=t||{};var n=typeof e;if("string"===n&&e.length>0)return r(e);if("number"===n&&!1===isNaN(e))return t.long?i(e):o(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},{}],58:[function(e,t,n){function r(e,t){var n=this;if(!(n instanceof r))return new r(e,t);s.Readable.call(n,t),n.destroyed=!1,n._drained=!1,n._forwarding=!1,n._current=null,"function"==typeof e?n._queue=e:(n._queue=e.map(o),n._queue.forEach(function(e){"function"!=typeof e&&n._attachErrorListener(e)})),n._next()}function o(e){if(!e||"function"==typeof e||e._readableState)return e;var t=(new s.Readable).wrap(e);return e.destroy&&(t.destroy=e.destroy.bind(e)),t}t.exports=r;var i=e("inherits"),s=e("readable-stream");i(r,s.Readable),r.obj=function(e){return new r(e,{objectMode:!0,highWaterMark:16})},r.prototype._read=function(){this._drained=!0,this._forward()},r.prototype._forward=function(){if(!this._forwarding&&this._drained&&this._current){this._forwarding=!0;for(var e;null!==(e=this._current.read());)this._drained=this.push(e);this._forwarding=!1}},r.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,this._current&&this._current.destroy&&this._current.destroy(),"function"!=typeof this._queue&&this._queue.forEach(function(e){e.destroy&&e.destroy()}),e&&this.emit("error",e),this.emit("close"))},r.prototype._next=function(){var e=this;if(e._current=null,"function"==typeof e._queue)e._queue(function(t,n){if(t)return e.destroy(t);n=o(n),e._attachErrorListener(n),e._gotNextStream(n)});else{var t=e._queue.shift();"function"==typeof t&&(t=o(t()),e._attachErrorListener(t)),e._gotNextStream(t)}},r.prototype._gotNextStream=function(e){function t(){o._forward()}function n(){e._readableState.ended||o.destroy()}function r(){o._current=null,e.removeListener("readable",t),e.removeListener("end",r),e.removeListener("close",n),o._next()}var o=this;if(!e)return o.push(null),void o.destroy();o._current=e,o._forward(),e.on("readable",t),e.once("end",r),e.once("close",n)},r.prototype._attachErrorListener=function(e){function t(r){e.removeListener("error",t),n.destroy(r)}var n=this;e&&e.once("error",t)}},{inherits:41,"readable-stream":82}],59:[function(e,t,n){function r(e,t){var n=null;return e.on(t,function(e){if(n){var t=n;n=null,t(e)}}),function(e){n=e}}t.exports=r},{}],60:[function(e,t,n){function r(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}function o(e){var t=function(){if(t.called)throw new Error(t.onceError);return t.called=!0,t.value=e.apply(this,arguments)},n=e.name||"Function wrapped with `once`";return t.onceError=n+" shouldn't be called more than once",t.called=!1,t}var i=e("wrappy");t.exports=i(r),t.exports.strict=i(o),r.proto=r(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return r(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return o(this)},configurable:!0})})},{wrappy:118}],61:[function(e,t,n){(function(n){function r(e){n.isBuffer(e)&&(e=u.decode(e)),a(e.info,"info"),a(e.info["name.utf-8"]||e.info.name,"info.name"),a(e.info["piece length"],"info['piece length']"),a(e.info.pieces,"info.pieces"),e.info.files?e.info.files.forEach(function(e){a("number"==typeof e.length,"info.files[0].length"),a(e["path.utf-8"]||e.path,"info.files[0].path")}):a("number"==typeof e.info.length,"info.length");var t={};t.info=e.info,t.infoBuffer=u.encode(e.info),t.infoHash=f.sync(t.infoBuffer),t.infoHashBuffer=new n(t.infoHash,"hex"),t.name=(e.info["name.utf-8"]||e.info.name).toString(),void 0!==e.info.private&&(t.private=!!e.info.private),e["creation date"]&&(t.created=new Date(1e3*e["creation date"])),e["created by"]&&(t.createdBy=e["created by"].toString()),n.isBuffer(e.comment)&&(t.comment=e.comment.toString()),t.announce=[],e["announce-list"]&&e["announce-list"].length?e["announce-list"].forEach(function(e){e.forEach(function(e){t.announce.push(e.toString())})}):e.announce&&t.announce.push(e.announce.toString()),n.isBuffer(e["url-list"])&&(e["url-list"]=e["url-list"].length>0?[e["url-list"]]:[]),t.urlList=(e["url-list"]||[]).map(function(e){return e.toString()}),d(t.announce),d(t.urlList);var r=e.info.files||[e.info];t.files=r.map(function(e,n){var o=[].concat(t.name,e["path.utf-8"]||e.path||[]).map(function(e){return e.toString()});return{path:c.join.apply(null,[c.sep].concat(o)).slice(1),name:o[o.length-1],length:e.length,offset:r.slice(0,n).reduce(i,0)}}),t.length=r.reduce(i,0);var o=t.files[t.files.length-1];return t.pieceLength=e.info["piece length"],t.lastPieceLength=(o.offset+o.length)%t.pieceLength||t.pieceLength,t.pieces=s(e.info.pieces),t}function o(e){var t={info:e.info};return t["announce-list"]=(e.announce||[]).map(function(e){return t.announce||(t.announce=e),e=new n(e,"utf8"),[e]}),t["url-list"]=e.urlList||[],e.created&&(t["creation date"]=e.created.getTime()/1e3|0),e.createdBy&&(t["created by"]=e.createdBy),e.comment&&(t.comment=e.comment),u.encode(t)}function i(e,t){return e+t.length}function s(e){for(var t=[],n=0;n<e.length;n+=20)t.push(e.slice(n,n+20).toString("hex"));return t}function a(e,t){if(!e)throw new Error("Torrent is missing required field: "+t)}t.exports=r,t.exports.decode=r,t.exports.encode=o;var u=e("bencode"),c=e("path"),f=e("simple-sha1"),d=e("uniq")}).call(this,e("buffer").Buffer)},{bencode:11,buffer:24,path:63,"simple-sha1":92,uniq:110}],62:[function(e,t,n){(function(n,r){function o(e){if("string"==typeof e&&/^(stream-)?magnet:/.test(e))return f(e);if("string"==typeof e&&(/^[a-f0-9]{40}$/i.test(e)||/^[a-z2-7]{32}$/i.test(e)))return f("magnet:?xt=urn:btih:"+e);if(r.isBuffer(e)&&20===e.length)return f("magnet:?xt=urn:btih:"+e.toString("hex"));if(r.isBuffer(e))return d(e);if(e&&e.infoHash)return e.announce||(e.announce=[]),"string"==typeof e.announce&&(e.announce=[e.announce]),e.urlList||(e.urlList=[]),e;throw new Error("Invalid torrent identifier")}function i(e,t){function r(e){try{i=o(e)}catch(e){return t(e)}i&&i.infoHash?t(null,i):t(new Error("Invalid torrent identifier"))}var i;if("function"!=typeof t)throw new Error("second argument must be a Function");try{i=o(e)}catch(e){}i&&i.infoHash?n.nextTick(function(){t(null,i)}):s(e)?a(e,function(e,n){if(e)return t(new Error("Error converting Blob: "+e.message));r(n)}):"function"==typeof c&&/^https?:/.test(e)?c.concat({url:e,timeout:3e4,headers:{"user-agent":"WebTorrent (http://webtorrent.io)"}},function(e,n,o){if(e)return t(new Error("Error downloading torrent: "+e.message));r(o)}):"function"==typeof u.readFile&&"string"==typeof e?u.readFile(e,function(e,n){if(e)return t(new Error("Invalid torrent identifier"));r(n)}):n.nextTick(function(){t(new Error("Invalid torrent identifier"))})}function s(e){return"undefined"!=typeof Blob&&e instanceof Blob}t.exports=o,t.exports.remote=i;var a=e("blob-to-buffer"),u=e("fs"),c=e("simple-get"),f=e("magnet-uri"),d=e("parse-torrent-file");t.exports.toMagnetURI=f.encode,t.exports.toTorrentFile=d.encode,function(){r.alloc(0)}()}).call(this,e("_process"),e("buffer").Buffer)},{_process:66,"blob-to-buffer":19,buffer:24,fs:22,"magnet-uri":48,"parse-torrent-file":61,"simple-get":90}],63:[function(e,t,n){(function(e){function t(e,t){for(var n=0,r=e.length-1;r>=0;r--){var o=e[r];"."===o?e.splice(r,1):".."===o?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function r(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}var o=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,i=function(e){return o.exec(e).slice(1)};n.resolve=function(){for(var n="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var s=i>=0?arguments[i]:e.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(n=s+"/"+n,o="/"===s.charAt(0))}return n=t(r(n.split("/"),function(e){return!!e}),!o).join("/"),(o?"/":"")+n||"."},n.normalize=function(e){var o=n.isAbsolute(e),i="/"===s(e,-1);return e=t(r(e.split("/"),function(e){return!!e}),!o).join("/"),e||o||(e="."),e&&i&&(e+="/"),(o?"/":"")+e},n.isAbsolute=function(e){return"/"===e.charAt(0)},n.join=function(){var e=Array.prototype.slice.call(arguments,0);return n.normalize(r(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},n.relative=function(e,t){function r(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=n.resolve(e).substr(1),t=n.resolve(t).substr(1);for(var o=r(e.split("/")),i=r(t.split("/")),s=Math.min(o.length,i.length),a=s,u=0;u<s;u++)if(o[u]!==i[u]){a=u;break}for(var c=[],u=a;u<o.length;u++)c.push("..");return c=c.concat(i.slice(a)),c.join("/")},n.sep="/",n.delimiter=":",n.dirname=function(e){var t=i(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},n.basename=function(e,t){var n=i(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},n.extname=function(e){return i(e)[3]};var s="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(this,e("_process"))},{_process:66}],64:[function(e,t,n){for(var r=e("closest-to"),o=Math.pow(2,10),i=13,s=[];i++<22;)s.push(Math.pow(2,i));t.exports=function(e){return r(e/o,s)}},{"closest-to":27}],65:[function(e,t,n){(function(e){"use strict";function n(t,n,r,o){if("function"!=typeof t)throw new TypeError('"callback" argument must be a function');var i,s,a=arguments.length;switch(a){case 0:case 1:return e.nextTick(t);case 2:return e.nextTick(function(){t.call(null,n)});case 3:return e.nextTick(function(){t.call(null,n,r)});case 4:return e.nextTick(function(){t.call(null,n,r,o)});default:for(i=new Array(a-1),s=0;s<i.length;)i[s++]=arguments[s];return e.nextTick(function(){t.apply(null,i)})}}!e.version||0===e.version.indexOf("v0.")||0===e.version.indexOf("v1.")&&0!==e.version.indexOf("v1.8.")?t.exports=n:t.exports=e.nextTick}).call(this,e("_process"))},{_process:66}],66:[function(e,t,n){function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(d===setTimeout)return setTimeout(e,0);if((d===r||!d)&&setTimeout)return d=setTimeout,setTimeout(e,0);try{return d(e,0)}catch(t){try{return d.call(null,e,0)}catch(t){return d.call(this,e,0)}}}function s(e){if(h===clearTimeout)return clearTimeout(e);if((h===o||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(e);try{return h(e)}catch(t){try{return h.call(null,e)}catch(t){return h.call(this,e)}}}function a(){g&&p&&(g=!1,p.length?m=p.concat(m):y=-1,m.length&&u())}function u(){if(!g){var e=i(a);g=!0;for(var t=m.length;t;){for(p=m,m=[];++y<t;)p&&p[y].run();y=-1,t=m.length}p=null,g=!1,s(e)}}function c(e,t){this.fun=e,this.array=t}function f(){}var d,h,l=t.exports={};!function(){try{d="function"==typeof setTimeout?setTimeout:r}catch(e){d=r}try{h="function"==typeof clearTimeout?clearTimeout:o}catch(e){h=o}}();var p,m=[],g=!1,y=-1;l.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new c(e,t)),1!==m.length||g||i(u)},c.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=f,l.addListener=f,l.once=f,l.off=f,l.removeListener=f,l.removeAllListeners=f,l.emit=f,l.binding=function(e){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(e){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},{}],67:[function(e,t,n){var r=e("once"),o=e("end-of-stream"),i=e("fs"),s=function(){},a=function(e){return"function"==typeof e},u=function(e){return!!i&&((e instanceof(i.ReadStream||s)||e instanceof(i.WriteStream||s))&&a(e.close))},c=function(e){return e.setHeader&&a(e.abort)},f=function(e,t,n,i){i=r(i);var s=!1;e.on("close",function(){s=!0}),o(e,{readable:t,writable:n},function(e){if(e)return i(e);s=!0,i()});var f=!1;return function(t){if(!s&&!f)return f=!0,u(e)?e.close():c(e)?e.abort():a(e.destroy)?e.destroy():void i(t||new Error("stream was destroyed"))}},d=function(e){e()},h=function(e,t){return e.pipe(t)},l=function(){var e=Array.prototype.slice.call(arguments),t=a(e[e.length-1]||s)&&e.pop()||s;if(Array.isArray(e[0])&&(e=e[0]),e.length<2)throw new Error("pump requires two streams per minimum");var n,r=e.map(function(o,i){var s=i<e.length-1;return f(o,s,i>0,function(e){n||(n=e),e&&r.forEach(d),s||(r.forEach(d),t(n))})});return e.reduce(h)};t.exports=l},{"end-of-stream":33,fs:21,once:60}],68:[function(t,n,r){(function(t){!function(o){function i(e){throw new RangeError(O[e])}function s(e,t){for(var n=e.length,r=[];n--;)r[n]=t(e[n]);return r}function a(e,t){var n=e.split("@"),r="";return n.length>1&&(r=n[0]+"@",e=n[1]),e=e.replace(R,"."),r+s(e.split("."),t).join(".")}function u(e){for(var t,n,r=[],o=0,i=e.length;o<i;)t=e.charCodeAt(o++),t>=55296&&t<=56319&&o<i?(n=e.charCodeAt(o++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),o--)):r.push(t);return r}function c(e){return s(e,function(e){var t="";return e>65535&&(e-=65536,t+=j(e>>>10&1023|55296),e=56320|1023&e),t+=j(e)}).join("")}function f(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:k}function d(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function h(e,t,n){var r=0;for(e=n?P(e/B):e>>1,e+=P(e/t);e>M*S>>1;r+=k)e=P(e/M);return P(r+(M+1)*e/(e+I))}function l(e){var t,n,r,o,s,a,u,d,l,p,m=[],g=e.length,y=0,_=C,v=A;for(n=e.lastIndexOf(T),n<0&&(n=0),r=0;r<n;++r)e.charCodeAt(r)>=128&&i("not-basic"),m.push(e.charCodeAt(r));for(o=n>0?n+1:0;o<g;){for(s=y,a=1,u=k;o>=g&&i("invalid-input"),d=f(e.charCodeAt(o++)),(d>=k||d>P((E-y)/a))&&i("overflow"),y+=d*a,l=u<=v?x:u>=v+S?S:u-v,!(d<l);u+=k)p=k-l,a>P(E/p)&&i("overflow"),a*=p;t=m.length+1,v=h(y-s,t,0==s),P(y/t)>E-_&&i("overflow"),_+=P(y/t),y%=t,m.splice(y++,0,_)}return c(m)}function p(e){var t,n,r,o,s,a,c,f,l,p,m,g,y,_,v,b=[];for(e=u(e),g=e.length,t=C,n=0,s=A,a=0;a<g;++a)(m=e[a])<128&&b.push(j(m));for(r=o=b.length,o&&b.push(T);r<g;){for(c=E,a=0;a<g;++a)(m=e[a])>=t&&m<c&&(c=m);for(y=r+1,c-t>P((E-n)/y)&&i("overflow"),n+=(c-t)*y,t=c,a=0;a<g;++a)if(m=e[a],m<t&&++n>E&&i("overflow"),m==t){for(f=n,l=k;p=l<=s?x:l>=s+S?S:l-s,!(f<p);l+=k)v=f-p,_=k-p,b.push(j(d(p+v%_,0))),f=P(v/_);b.push(j(d(f,0))),s=h(n,y,r==o),n=0,++r}++n,++t}return b.join("")}function m(e){return a(e,function(e){return L.test(e)?l(e.slice(4).toLowerCase()):e})}function g(e){return a(e,function(e){return U.test(e)?"xn--"+p(e):e})}var y="object"==typeof r&&r&&!r.nodeType&&r,_="object"==typeof n&&n&&!n.nodeType&&n,v="object"==typeof t&&t;v.global!==v&&v.window!==v&&v.self!==v||(o=v);var b,w,E=2147483647,k=36,x=1,S=26,I=38,B=700,A=72,C=128,T="-",L=/^xn--/,U=/[^\x20-\x7E]/,R=/[\x2E\u3002\uFF0E\uFF61]/g,O={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},M=k-x,P=Math.floor,j=String.fromCharCode;if(b={version:"1.4.1",ucs2:{decode:u,encode:c},decode:l,encode:p,toASCII:g,toUnicode:m},"function"==typeof e&&"object"==typeof e.amd&&e.amd)e("punycode",function(){return b});else if(y&&_)if(n.exports==y)_.exports=b;else for(w in b)b.hasOwnProperty(w)&&(y[w]=b[w]);else o.punycode=b}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],69:[function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,n,i){t=t||"&",n=n||"=";var s={};if("string"!=typeof e||0===e.length)return s;e=e.split(t);var a=1e3;i&&"number"==typeof i.maxKeys&&(a=i.maxKeys);var u=e.length;a>0&&u>a&&(u=a);for(var c=0;c<u;++c){var f,d,h,l,p=e[c].replace(/\+/g,"%20"),m=p.indexOf(n);m>=0?(f=p.substr(0,m),d=p.substr(m+1)):(f=p,d=""),h=decodeURIComponent(f),l=decodeURIComponent(d),r(s,h)?o(s[h])?s[h].push(l):s[h]=[s[h],l]:s[h]=l}return s};var o=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{}],70:[function(e,t,n){"use strict";function r(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));return n}var o=function(e){switch(typeof e){
case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,n,a){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?r(s(e),function(s){var a=encodeURIComponent(o(s))+n;return i(e[s])?r(e[s],function(e){return a+encodeURIComponent(o(e))}).join(t):a+encodeURIComponent(o(e[s]))}).join(t):a?encodeURIComponent(o(a))+n+encodeURIComponent(o(e)):""};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}},{}],71:[function(e,t,n){"use strict";n.decode=n.parse=e("./decode"),n.encode=n.stringify=e("./encode")},{"./decode":69,"./encode":70}],72:[function(e,t,n){var r=function(e){var t=0;return function(){if(t===e.length)return null;var n=e.length-t,r=Math.random()*n|0,o=e[t+r],i=e[t];return e[t]=o,e[t+r]=i,t++,o}};t.exports=r},{}],73:[function(e,t,n){(function(e,n,r){"use strict";function o(){throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}function i(t,o){if(t>65536)throw new Error("requested too many random bytes");var i=new n.Uint8Array(t);t>0&&s.getRandomValues(i);var a=new r(i.buffer);return"function"==typeof o?e.nextTick(function(){o(null,a)}):a}var s=n.crypto||n.msCrypto;s&&s.getRandomValues?t.exports=i:t.exports=o}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer)},{_process:66,buffer:24}],74:[function(e,t,n){function r(e,t){var n=this;if(!(n instanceof r))return new r(e);i.Writable.call(n,t),n.destroyed=!1,n._queue=[],n._position=e||0,n._cb=null,n._buffer=null,n._out=null}var o=e("inherits"),i=e("readable-stream");t.exports=r,o(r,i.Writable),r.prototype._write=function(e,t,n){for(var r=this,o=!0;;){if(r.destroyed)return;if(0===r._queue.length)return r._buffer=e,void(r._cb=n);r._buffer=null;var i=r._queue[0],s=Math.max(i.start-r._position,0),a=i.end-r._position;if(s>=e.length)return r._position+=e.length,n(null);var u;if(a>e.length){r._position+=e.length,u=0===s?e:e.slice(s),o=i.stream.write(u)&&o;break}r._position+=a,u=0===s&&a===e.length?e:e.slice(s,a),o=i.stream.write(u)&&o,i.last&&i.stream.end(),e=e.slice(a),r._queue.shift()}o?n(null):i.stream.once("drain",n.bind(null,null))},r.prototype.slice=function(e){var t=this;if(t.destroyed)return null;e instanceof Array||(e=[e]);var n=new i.PassThrough;return e.forEach(function(r,o){t._queue.push({start:r.start,end:r.end,stream:n,last:o===e.length-1})}),t._buffer&&t._write(t._buffer,null,t._cb),n},r.prototype.destroy=function(e){var t=this;t.destroyed||(t.destroyed=!0,e&&t.emit("error",e))}},{inherits:41,"readable-stream":82}],75:[function(e,t,n){"use strict";function r(e){if(!(this instanceof r))return new r(e);c.call(this,e),f.call(this,e),e&&!1===e.readable&&(this.readable=!1),e&&!1===e.writable&&(this.writable=!1),this.allowHalfOpen=!0,e&&!1===e.allowHalfOpen&&(this.allowHalfOpen=!1),this.once("end",o)}function o(){this.allowHalfOpen||this._writableState.ended||a(i,this)}function i(e){e.end()}var s=Object.keys||function(e){var t=[];for(var n in e)t.push(n);return t};t.exports=r;var a=e("process-nextick-args"),u=e("core-util-is");u.inherits=e("inherits");var c=e("./_stream_readable"),f=e("./_stream_writable");u.inherits(r,c);for(var d=s(f.prototype),h=0;h<d.length;h++){var l=d[h];r.prototype[l]||(r.prototype[l]=f.prototype[l])}},{"./_stream_readable":77,"./_stream_writable":79,"core-util-is":28,inherits:41,"process-nextick-args":65}],76:[function(e,t,n){"use strict";function r(e){if(!(this instanceof r))return new r(e);o.call(this,e)}t.exports=r;var o=e("./_stream_transform"),i=e("core-util-is");i.inherits=e("inherits"),i.inherits(r,o),r.prototype._transform=function(e,t,n){n(null,e)}},{"./_stream_transform":78,"core-util-is":28,inherits:41}],77:[function(e,t,n){(function(n){"use strict";function r(e,t,n){if("function"==typeof e.prependListener)return e.prependListener(t,n);e._events&&e._events[t]?T(e._events[t])?e._events[t].unshift(n):e._events[t]=[n,e._events[t]]:e.on(t,n)}function o(t,n){A=A||e("./_stream_duplex"),t=t||{},this.objectMode=!!t.objectMode,n instanceof A&&(this.objectMode=this.objectMode||!!t.readableObjectMode);var r=t.highWaterMark,o=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:o,this.highWaterMark=~~this.highWaterMark,this.buffer=new N,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.defaultEncoding=t.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,t.encoding&&(H||(H=e("string_decoder/").StringDecoder),this.decoder=new H(t.encoding),this.encoding=t.encoding)}function i(t){if(A=A||e("./_stream_duplex"),!(this instanceof i))return new i(t);this._readableState=new o(t,this),this.readable=!0,t&&"function"==typeof t.read&&(this._read=t.read),U.call(this)}function s(e,t,n,r,o){var i=f(t,n);if(i)e.emit("error",i);else if(null===n)t.reading=!1,d(e,t);else if(t.objectMode||n&&n.length>0)if(t.ended&&!o){var s=new Error("stream.push() after EOF");e.emit("error",s)}else if(t.endEmitted&&o){var u=new Error("stream.unshift() after end event");e.emit("error",u)}else{var c;!t.decoder||o||r||(n=t.decoder.write(n),c=!t.objectMode&&0===n.length),o||(t.reading=!1),c||(t.flowing&&0===t.length&&!t.sync?(e.emit("data",n),e.read(0)):(t.length+=t.objectMode?1:n.length,o?t.buffer.unshift(n):t.buffer.push(n),t.needReadable&&h(e))),p(e,t)}else o||(t.reading=!1);return a(t)}function a(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function u(e){return e>=D?e=D:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}function c(e,t){return e<=0||0===t.length&&t.ended?0:t.objectMode?1:e!==e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=u(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0))}function f(e,t){var n=null;return R.isBuffer(t)||"string"==typeof t||null===t||void 0===t||e.objectMode||(n=new TypeError("Invalid non-string/buffer chunk")),n}function d(e,t){if(!t.ended){if(t.decoder){var n=t.decoder.end();n&&n.length&&(t.buffer.push(n),t.length+=t.objectMode?1:n.length)}t.ended=!0,h(e)}}function h(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(j("emitReadable",t.flowing),t.emittedReadable=!0,t.sync?C(l,e):l(e))}function l(e){j("emit readable"),e.emit("readable"),b(e)}function p(e,t){t.readingMore||(t.readingMore=!0,C(m,e,t))}function m(e,t){for(var n=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(j("maybeReadMore read 0"),e.read(0),n!==t.length);)n=t.length;t.readingMore=!1}function g(e){return function(){var t=e._readableState;j("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&L(e,"data")&&(t.flowing=!0,b(e))}}function y(e){j("readable nexttick read 0"),e.read(0)}function _(e,t){t.resumeScheduled||(t.resumeScheduled=!0,C(v,e,t))}function v(e,t){t.reading||(j("resume read 0"),e.read(0)),t.resumeScheduled=!1,t.awaitDrain=0,e.emit("resume"),b(e),t.flowing&&!t.reading&&e.read(0)}function b(e){var t=e._readableState;for(j("flow",t.flowing);t.flowing&&null!==e.read(););}function w(e,t){if(0===t.length)return null;var n;return t.objectMode?n=t.buffer.shift():!e||e>=t.length?(n=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.head.data:t.buffer.concat(t.length),t.buffer.clear()):n=E(e,t.buffer,t.decoder),n}function E(e,t,n){var r;return e<t.head.data.length?(r=t.head.data.slice(0,e),t.head.data=t.head.data.slice(e)):r=e===t.head.data.length?t.shift():n?k(e,t):x(e,t),r}function k(e,t){var n=t.head,r=1,o=n.data;for(e-=o.length;n=n.next;){var i=n.data,s=e>i.length?i.length:e;if(s===i.length?o+=i:o+=i.slice(0,e),0===(e-=s)){s===i.length?(++r,n.next?t.head=n.next:t.head=t.tail=null):(t.head=n,n.data=i.slice(s));break}++r}return t.length-=r,o}function x(e,t){var n=O.allocUnsafe(e),r=t.head,o=1;for(r.data.copy(n),e-=r.data.length;r=r.next;){var i=r.data,s=e>i.length?i.length:e;if(i.copy(n,n.length-e,0,s),0===(e-=s)){s===i.length?(++o,r.next?t.head=r.next:t.head=t.tail=null):(t.head=r,r.data=i.slice(s));break}++o}return t.length-=o,n}function S(e){var t=e._readableState;if(t.length>0)throw new Error('"endReadable()" called on non-empty stream');t.endEmitted||(t.ended=!0,C(I,t,e))}function I(e,t){e.endEmitted||0!==e.length||(e.endEmitted=!0,t.readable=!1,t.emit("end"))}function B(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}t.exports=i;var A,C=e("process-nextick-args"),T=e("isarray");i.ReadableState=o;var L=(e("events").EventEmitter,function(e,t){return e.listeners(t).length}),U=e("./internal/streams/stream"),R=e("buffer").Buffer,O=e("buffer-shims"),M=e("core-util-is");M.inherits=e("inherits");var P=e("util"),j=void 0;j=P&&P.debuglog?P.debuglog("stream"):function(){};var H,N=e("./internal/streams/BufferList");M.inherits(i,U);var q=["error","close","destroy","pause","resume"];i.prototype.push=function(e,t){var n=this._readableState;return n.objectMode||"string"!=typeof e||(t=t||n.defaultEncoding)!==n.encoding&&(e=O.from(e,t),t=""),s(this,n,e,t,!1)},i.prototype.unshift=function(e){return s(this,this._readableState,e,"",!0)},i.prototype.isPaused=function(){return!1===this._readableState.flowing},i.prototype.setEncoding=function(t){return H||(H=e("string_decoder/").StringDecoder),this._readableState.decoder=new H(t),this._readableState.encoding=t,this};var D=8388608;i.prototype.read=function(e){j("read",e),e=parseInt(e,10);var t=this._readableState,n=e;if(0!==e&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return j("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?S(this):h(this),null;if(0===(e=c(e,t))&&t.ended)return 0===t.length&&S(this),null;var r=t.needReadable;j("need readable",r),(0===t.length||t.length-e<t.highWaterMark)&&(r=!0,j("length less than watermark",r)),t.ended||t.reading?(r=!1,j("reading or ended",r)):r&&(j("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,t.reading||(e=c(n,t)));var o;return o=e>0?w(e,t):null,null===o?(t.needReadable=!0,e=0):t.length-=e,0===t.length&&(t.ended||(t.needReadable=!0),n!==e&&t.ended&&S(this)),null!==o&&this.emit("data",o),o},i.prototype._read=function(e){this.emit("error",new Error("_read() is not implemented"))},i.prototype.pipe=function(e,t){function o(e){j("onunpipe"),e===h&&s()}function i(){j("onend"),e.end()}function s(){j("cleanup"),e.removeListener("close",c),e.removeListener("finish",f),e.removeListener("drain",y),e.removeListener("error",u),e.removeListener("unpipe",o),h.removeListener("end",i),h.removeListener("end",s),h.removeListener("data",a),_=!0,!l.awaitDrain||e._writableState&&!e._writableState.needDrain||y()}function a(t){j("ondata"),v=!1,!1!==e.write(t)||v||((1===l.pipesCount&&l.pipes===e||l.pipesCount>1&&-1!==B(l.pipes,e))&&!_&&(j("false write response, pause",h._readableState.awaitDrain),h._readableState.awaitDrain++,v=!0),h.pause())}function u(t){j("onerror",t),d(),e.removeListener("error",u),0===L(e,"error")&&e.emit("error",t)}function c(){e.removeListener("finish",f),d()}function f(){j("onfinish"),e.removeListener("close",c),d()}function d(){j("unpipe"),h.unpipe(e)}var h=this,l=this._readableState;switch(l.pipesCount){case 0:l.pipes=e;break;case 1:l.pipes=[l.pipes,e];break;default:l.pipes.push(e)}l.pipesCount+=1,j("pipe count=%d opts=%j",l.pipesCount,t);var p=(!t||!1!==t.end)&&e!==n.stdout&&e!==n.stderr,m=p?i:s;l.endEmitted?C(m):h.once("end",m),e.on("unpipe",o);var y=g(h);e.on("drain",y);var _=!1,v=!1;return h.on("data",a),r(e,"error",u),e.once("close",c),e.once("finish",f),e.emit("pipe",h),l.flowing||(j("pipe resume"),h.resume()),e},i.prototype.unpipe=function(e){var t=this._readableState;if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this),this);if(!e){var n=t.pipes,r=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var o=0;o<r;o++)n[o].emit("unpipe",this);return this}var i=B(t.pipes,e);return-1===i?this:(t.pipes.splice(i,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this),this)},i.prototype.on=function(e,t){var n=U.prototype.on.call(this,e,t);if("data"===e)!1!==this._readableState.flowing&&this.resume();else if("readable"===e){var r=this._readableState;r.endEmitted||r.readableListening||(r.readableListening=r.needReadable=!0,r.emittedReadable=!1,r.reading?r.length&&h(this):C(y,this))}return n},i.prototype.addListener=i.prototype.on,i.prototype.resume=function(){var e=this._readableState;return e.flowing||(j("resume"),e.flowing=!0,_(this,e)),this},i.prototype.pause=function(){return j("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(j("pause"),this._readableState.flowing=!1,this.emit("pause")),this},i.prototype.wrap=function(e){var t=this._readableState,n=!1,r=this;e.on("end",function(){if(j("wrapped end"),t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&r.push(e)}r.push(null)}),e.on("data",function(o){if(j("wrapped data"),t.decoder&&(o=t.decoder.write(o)),(!t.objectMode||null!==o&&void 0!==o)&&(t.objectMode||o&&o.length)){r.push(o)||(n=!0,e.pause())}});for(var o in e)void 0===this[o]&&"function"==typeof e[o]&&(this[o]=function(t){return function(){return e[t].apply(e,arguments)}}(o));for(var i=0;i<q.length;i++)e.on(q[i],r.emit.bind(r,q[i]));return r._read=function(t){j("wrapped _read",t),n&&(n=!1,e.resume())},r},i._fromList=w}).call(this,e("_process"))},{"./_stream_duplex":75,"./internal/streams/BufferList":80,"./internal/streams/stream":81,_process:66,buffer:24,"buffer-shims":23,"core-util-is":28,events:34,inherits:41,isarray:46,"process-nextick-args":65,"string_decoder/":102,util:21}],78:[function(e,t,n){"use strict";function r(e){this.afterTransform=function(t,n){return o(e,t,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null,this.writeencoding=null}function o(e,t,n){var r=e._transformState;r.transforming=!1;var o=r.writecb;if(!o)return e.emit("error",new Error("no writecb in Transform class"));r.writechunk=null,r.writecb=null,null!==n&&void 0!==n&&e.push(n),o(t);var i=e._readableState;i.reading=!1,(i.needReadable||i.length<i.highWaterMark)&&e._read(i.highWaterMark)}function i(e){if(!(this instanceof i))return new i(e);a.call(this,e),this._transformState=new r(this);var t=this;this._readableState.needReadable=!0,this._readableState.sync=!1,e&&("function"==typeof e.transform&&(this._transform=e.transform),"function"==typeof e.flush&&(this._flush=e.flush)),this.once("prefinish",function(){"function"==typeof this._flush?this._flush(function(e,n){s(t,e,n)}):s(t)})}function s(e,t,n){if(t)return e.emit("error",t);null!==n&&void 0!==n&&e.push(n);var r=e._writableState,o=e._transformState;if(r.length)throw new Error("Calling transform done when ws.length != 0");if(o.transforming)throw new Error("Calling transform done when still transforming");return e.push(null)}t.exports=i;var a=e("./_stream_duplex"),u=e("core-util-is");u.inherits=e("inherits"),u.inherits(i,a),i.prototype.push=function(e,t){return this._transformState.needTransform=!1,a.prototype.push.call(this,e,t)},i.prototype._transform=function(e,t,n){throw new Error("_transform() is not implemented")},i.prototype._write=function(e,t,n){var r=this._transformState;if(r.writecb=n,r.writechunk=e,r.writeencoding=t,!r.transforming){var o=this._readableState;(r.needTransform||o.needReadable||o.length<o.highWaterMark)&&this._read(o.highWaterMark)}},i.prototype._read=function(e){var t=this._transformState;null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0}},{"./_stream_duplex":75,"core-util-is":28,inherits:41}],79:[function(e,t,n){(function(n){"use strict";function r(){}function o(e,t,n){this.chunk=e,this.encoding=t,this.callback=n,this.next=null}function i(t,n){k=k||e("./_stream_duplex"),t=t||{},this.objectMode=!!t.objectMode,n instanceof k&&(this.objectMode=this.objectMode||!!t.writableObjectMode);var r=t.highWaterMark,o=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:o,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var i=!1===t.decodeStrings;this.decodeStrings=!i,this.defaultEncoding=t.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){p(n,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new E(this)}function s(t){if(k=k||e("./_stream_duplex"),!(L.call(s,this)||this instanceof k))return new s(t);this._writableState=new i(t,this),this.writable=!0,t&&("function"==typeof t.write&&(this._write=t.write),"function"==typeof t.writev&&(this._writev=t.writev)),A.call(this)}function a(e,t){var n=new Error("write after end");e.emit("error",n),x(t,n)}function u(e,t,n,r){var o=!0,i=!1;return null===n?i=new TypeError("May not write null values to stream"):"string"==typeof n||void 0===n||t.objectMode||(i=new TypeError("Invalid non-string/buffer chunk")),i&&(e.emit("error",i),x(r,i),o=!1),o}function c(e,t,n){return e.objectMode||!1===e.decodeStrings||"string"!=typeof t||(t=T.from(t,n)),t}function f(e,t,n,r,i,s){n||(r=c(t,r,i),C.isBuffer(r)&&(i="buffer"));var a=t.objectMode?1:r.length;t.length+=a;var u=t.length<t.highWaterMark;if(u||(t.needDrain=!0),t.writing||t.corked){var f=t.lastBufferedRequest;t.lastBufferedRequest=new o(r,i,s),f?f.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else d(e,t,!1,a,r,i,s);return u}function d(e,t,n,r,o,i,s){t.writelen=r,t.writecb=s,t.writing=!0,t.sync=!0,n?e._writev(o,t.onwrite):e._write(o,i,t.onwrite),t.sync=!1}function h(e,t,n,r,o){--t.pendingcb,n?x(o,r):o(r),e._writableState.errorEmitted=!0,e.emit("error",r)}function l(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function p(e,t){var n=e._writableState,r=n.sync,o=n.writecb;if(l(n),t)h(e,n,r,t,o);else{var i=_(n);i||n.corked||n.bufferProcessing||!n.bufferedRequest||y(e,n),r?S(m,e,n,i,o):m(e,n,i,o)}}function m(e,t,n,r){n||g(e,t),t.pendingcb--,r(),b(e,t)}function g(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function y(e,t){t.bufferProcessing=!0;var n=t.bufferedRequest;if(e._writev&&n&&n.next){var r=t.bufferedRequestCount,o=new Array(r),i=t.corkedRequestsFree;i.entry=n;for(var s=0;n;)o[s]=n,n=n.next,s+=1;d(e,t,!0,t.length,o,"",i.finish),t.pendingcb++,t.lastBufferedRequest=null,i.next?(t.corkedRequestsFree=i.next,i.next=null):t.corkedRequestsFree=new E(t)}else{for(;n;){var a=n.chunk,u=n.encoding,c=n.callback;if(d(e,t,!1,t.objectMode?1:a.length,a,u,c),n=n.next,t.writing)break}null===n&&(t.lastBufferedRequest=null)}t.bufferedRequestCount=0,t.bufferedRequest=n,t.bufferProcessing=!1}function _(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function v(e,t){t.prefinished||(t.prefinished=!0,e.emit("prefinish"))}function b(e,t){var n=_(t);return n&&(0===t.pendingcb?(v(e,t),t.finished=!0,e.emit("finish")):v(e,t)),n}function w(e,t,n){t.ending=!0,b(e,t),n&&(t.finished?x(n):e.once("finish",n)),t.ended=!0,e.writable=!1}function E(e){var t=this;this.next=null,this.entry=null,this.finish=function(n){var r=t.entry;for(t.entry=null;r;){var o=r.callback;e.pendingcb--,o(n),r=r.next}e.corkedRequestsFree?e.corkedRequestsFree.next=t:e.corkedRequestsFree=t}}t.exports=s;var k,x=e("process-nextick-args"),S=!n.browser&&["v0.10","v0.9."].indexOf(n.version.slice(0,5))>-1?setImmediate:x;s.WritableState=i;var I=e("core-util-is");I.inherits=e("inherits");var B={deprecate:e("util-deprecate")},A=e("./internal/streams/stream"),C=e("buffer").Buffer,T=e("buffer-shims");I.inherits(s,A),i.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(i.prototype,"buffer",{get:B.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")})}catch(e){}}();var L;"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(L=Function.prototype[Symbol.hasInstance],Object.defineProperty(s,Symbol.hasInstance,{value:function(e){return!!L.call(this,e)||e&&e._writableState instanceof i}})):L=function(e){return e instanceof this},s.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},s.prototype.write=function(e,t,n){var o=this._writableState,i=!1,s=C.isBuffer(e);return"function"==typeof t&&(n=t,t=null),s?t="buffer":t||(t=o.defaultEncoding),"function"!=typeof n&&(n=r),o.ended?a(this,n):(s||u(this,o,e,n))&&(o.pendingcb++,i=f(this,o,s,e,t,n)),i},s.prototype.cork=function(){this._writableState.corked++},s.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.finished||e.bufferProcessing||!e.bufferedRequest||y(this,e))},s.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);return this._writableState.defaultEncoding=e,this},s.prototype._write=function(e,t,n){n(new Error("_write() is not implemented"))},s.prototype._writev=null,s.prototype.end=function(e,t,n){var r=this._writableState;"function"==typeof e?(n=e,e=null,t=null):"function"==typeof t&&(n=t,t=null),null!==e&&void 0!==e&&this.write(e,t),r.corked&&(r.corked=1,this.uncork()),r.ending||r.finished||w(this,r,n)}}).call(this,e("_process"))},{"./_stream_duplex":75,"./internal/streams/stream":81,_process:66,buffer:24,"buffer-shims":23,"core-util-is":28,inherits:41,"process-nextick-args":65,"util-deprecate":115}],80:[function(e,t,n){"use strict";function r(){this.head=null,this.tail=null,this.length=0}var o=(e("buffer").Buffer,e("buffer-shims"));t.exports=r,r.prototype.push=function(e){var t={data:e,next:null};this.length>0?this.tail.next=t:this.head=t,this.tail=t,++this.length},r.prototype.unshift=function(e){var t={data:e,next:this.head};0===this.length&&(this.tail=t),this.head=t,++this.length},r.prototype.shift=function(){if(0!==this.length){var e=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,e}},r.prototype.clear=function(){this.head=this.tail=null,this.length=0},r.prototype.join=function(e){if(0===this.length)return"";for(var t=this.head,n=""+t.data;t=t.next;)n+=e+t.data;return n},r.prototype.concat=function(e){if(0===this.length)return o.alloc(0);if(1===this.length)return this.head.data;for(var t=o.allocUnsafe(e>>>0),n=this.head,r=0;n;)n.data.copy(t,r),r+=n.data.length,n=n.next;return t}},{buffer:24,"buffer-shims":23}],81:[function(e,t,n){t.exports=e("events").EventEmitter},{events:34}],82:[function(e,t,n){n=t.exports=e("./lib/_stream_readable.js"),n.Stream=n,n.Readable=n,n.Writable=e("./lib/_stream_writable.js"),n.Duplex=e("./lib/_stream_duplex.js"),n.Transform=e("./lib/_stream_transform.js"),n.PassThrough=e("./lib/_stream_passthrough.js")},{"./lib/_stream_duplex.js":75,"./lib/_stream_passthrough.js":76,"./lib/_stream_readable.js":77,"./lib/_stream_transform.js":78,"./lib/_stream_writable.js":79}],83:[function(e,t,n){function r(e,t,n,r){"function"==typeof n&&(r=n,n={}),n||(n={}),r||(r=function(){}),a(e),c(n),"string"==typeof t&&(t=document.querySelector(t)),i(e,function(n){if(t.nodeName!==n.toUpperCase()){var r=l.extname(e.name).toLowerCase();throw new Error('Cannot render "'+r+'" inside a "'+t.nodeName.toLowerCase()+'" element, expected "'+n+'"')}return t},n,r)}function o(e,t,n,r){function o(e){return"video"===e||"audio"===e?s(e):u(e)}function s(e){var r=u(e);return n.controls&&(r.controls=!0),n.autoplay&&(r.autoplay=!0),t.appendChild(r),r}function u(e){var n=document.createElement(e);return t.appendChild(n),n}function f(e,t){e&&t&&t.remove(),r(e,t)}if("function"==typeof n&&(r=n,n={}),n||(n={}),r||(r=function(){}),a(e),c(n),"string"==typeof t&&(t=document.querySelector(t)),t&&("VIDEO"===t.nodeName||"AUDIO"===t.nodeName))throw new Error("Invalid video/audio node argument. Argument must be root element that video/audio tag will be appended to.");i(e,o,n,f)}function i(e,t,n,r){function o(){p.removeEventListener("loadstart",o),n.autoplay&&p.play()}function i(){p.removeEventListener("canplay",i),r(null,p)}function a(){p=t("iframe"),s(e,function(e,t){if(e)return c(e);p.src=t,".pdf"!==_&&(p.sandbox="allow-forms allow-scripts"),r(null,p)})}function c(t){t.message='Error rendering file "'+e.name+'": '+t.message,f(t.message),r(t)}var p,_=l.extname(e.name).toLowerCase(),k=0;v.indexOf(_)>=0?function(){function r(){f("Use MediaSource API for "+e.name),v(),p.addEventListener("error",l),p.addEventListener("loadstart",o),p.addEventListener("canplay",i);var t=new h(p),n=t.createWriteStream(u(e.name));e.createReadStream().pipe(n),k&&(p.currentTime=k)}function a(){f("Use Blob URL for "+e.name),v(),p.addEventListener("error",c),p.addEventListener("loadstart",o),p.addEventListener("canplay",i),s(e,function(e,t){if(e)return c(e);p.src=t,k&&(p.currentTime=k)})}function d(e){f("videostream error: fallback to MediaSource API: %o",e.message||e),p.removeEventListener("error",d),p.removeEventListener("canplay",i),r()}function l(t){if(f("MediaSource API error: fallback to Blob URL: %o",t.message||t),"number"==typeof e.length&&e.length>n.maxBlobLength)return f("File length too large for Blob URL approach: %d (max: %d)",e.length,n.maxBlobLength),c(new Error("File length too large for Blob URL approach: "+e.length+" (max: "+n.maxBlobLength+")"));p.removeEventListener("error",l),p.removeEventListener("canplay",i),a()}function v(){p||(p=t(b),p.addEventListener("progress",function(){k=p.currentTime}))}var b=y.indexOf(_)>=0?"video":"audio";x?g.indexOf(_)>=0?function(){f("Use `videostream` package for "+e.name),v(),p.addEventListener("error",d),p.addEventListener("loadstart",o),p.addEventListener("canplay",i),m(e,p)}():r():a()}():b.indexOf(_)>=0?function(){p=t("audio"),s(e,function(e,t){if(e)return c(e);p.addEventListener("error",c),p.addEventListener("loadstart",o),p.addEventListener("canplay",i),p.src=t})}():w.indexOf(_)>=0?function(){p=t("img"),s(e,function(t,n){if(t)return c(t);p.src=n,p.alt=e.name,r(null,p)})}():E.indexOf(_)>=0?a():function(){function t(){d(n)?(f('File extension "%s" appears ascii, so will render.',_),a()):(f('File extension "%s" appears non-ascii, will not render.',_),r(new Error('Unsupported file type "'+_+'": Cannot append to DOM')))}f('Unknown file extension "%s" - will attempt to render into iframe',_);var n="";e.createReadStream({start:0,end:1e3}).setEncoding("utf8").on("data",function(e){n+=e}).on("end",t).on("error",r)}()}function s(e,t){var r=l.extname(e.name).toLowerCase();p(e.createReadStream(),n.mime[r],t)}function a(e){if(null==e)throw new Error("file cannot be null or undefined");if("string"!=typeof e.name)throw new Error("missing or invalid file.name property");if("function"!=typeof e.createReadStream)throw new Error("missing or invalid file.createReadStream property")}function u(e){return{".m4a":'audio/mp4; codecs="mp4a.40.5"',".m4v":'video/mp4; codecs="avc1.640029, mp4a.40.5"',".mkv":'video/webm; codecs="avc1.640029, mp4a.40.5"',".mp3":"audio/mpeg",".mp4":'video/mp4; codecs="avc1.640029, mp4a.40.5"',".webm":'video/webm; codecs="vorbis, vp8"'}[l.extname(e).toLowerCase()]}function c(e){null==e.autoplay&&(e.autoplay=!0),null==e.controls&&(e.controls=!0),null==e.maxBlobLength&&(e.maxBlobLength=k)}n.render=r,n.append=o,n.mime=e("./lib/mime.json");var f=e("debug")("render-media"),d=e("is-ascii"),h=e("mediasource"),l=e("path"),p=e("stream-to-blob-url"),m=e("videostream"),g=[".m4a",".m4v",".mp4"],y=[".m4v",".mkv",".mp4",".webm"],_=[".m4a",".mp3"],v=[].concat(y,_),b=[".aac",".oga",".ogg",".wav"],w=[".bmp",".gif",".jpeg",".jpg",".png",".svg"],E=[".css",".html",".js",".md",".pdf",".txt"],k=2e8,x="undefined"!=typeof window&&window.MediaSource},{"./lib/mime.json":84,debug:30,"is-ascii":42,mediasource:49,path:63,"stream-to-blob-url":99,videostream:117}],84:[function(e,t,n){t.exports={".3gp":"video/3gpp",".aac":"audio/aac",".aif":"audio/x-aiff",".aiff":"audio/x-aiff",".atom":"application/atom+xml",".avi":"video/x-msvideo",".bmp":"image/bmp",".bz2":"application/x-bzip2",".conf":"text/plain",".css":"text/css",".csv":"text/plain",".diff":"text/x-diff",".doc":"application/msword",".flv":"video/x-flv",".gif":"image/gif",".gz":"application/x-gzip",".htm":"text/html",".html":"text/html",".ico":"image/vnd.microsoft.icon",".ics":"text/calendar",".iso":"application/octet-stream",".jar":"application/java-archive",".jpeg":"image/jpeg",".jpg":"image/jpeg",".js":"application/javascript",".json":"application/json",".less":"text/css",".log":"text/plain",".m3u":"audio/x-mpegurl",".m4a":"audio/mp4",".m4v":"video/mp4",".manifest":"text/cache-manifest",".markdown":"text/x-markdown",".mathml":"application/mathml+xml",".md":"text/x-markdown",".mid":"audio/midi",".midi":"audio/midi",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".mp4v":"video/mp4",".mpeg":"video/mpeg",".mpg":"video/mpeg",".odp":"application/vnd.oasis.opendocument.presentation",".ods":"application/vnd.oasis.opendocument.spreadsheet",".odt":"application/vnd.oasis.opendocument.text",".oga":"audio/ogg",".ogg":"application/ogg",".pdf":"application/pdf",".png":"image/png",".pps":"application/vnd.ms-powerpoint",".ppt":"application/vnd.ms-powerpoint",".ps":"application/postscript",".psd":"image/vnd.adobe.photoshop",".qt":"video/quicktime",".rar":"application/x-rar-compressed",".rdf":"application/rdf+xml",".rss":"application/rss+xml",".rtf":"application/rtf",".svg":"image/svg+xml",".svgz":"image/svg+xml",".swf":"application/x-shockwave-flash",".tar":"application/x-tar",".tbz":"application/x-bzip-compressed-tar",".text":"text/plain",".tif":"image/tiff",".tiff":"image/tiff",".torrent":"application/x-bittorrent",".ttf":"application/x-font-ttf",".txt":"text/plain",".wav":"audio/wav",".webm":"video/webm",".wma":"audio/x-ms-wma",".wmv":"video/x-ms-wmv",".xls":"application/vnd.ms-excel",".xml":"application/xml",".yaml":"text/yaml",".yml":"text/yaml",".zip":"application/zip"}},{}],85:[function(e,t,n){(function(e){t.exports=function(t,n,r){function o(t){function n(){r&&r(t,s),r=null}d?e.nextTick(n):n()}function i(e,n,r){if(s[e]=r,n&&(f=!0),0==--u||n)o(n);else if(!f&&h<a){var d;c?(d=c[h],h+=1,t[d](function(e,t){i(d,e,t)})):(d=h,h+=1,t[d](function(e,t){i(d,e,t)}))}}if("number"!=typeof n)throw new Error("second argument must be a Number");var s,a,u,c,f,d=!0;Array.isArray(t)?(s=[],u=a=t.length):(c=Object.keys(t),s={},u=a=c.length);var h=n;u?c?c.some(function(e,r){if(t[e](function(t,n){i(e,t,n)}),r===n-1)return!0}):t.some(function(e,t){if(e(function(e,n){i(t,e,n)}),t===n-1)return!0}):o(null),d=!1}}).call(this,e("_process"))},{_process:66}],86:[function(e,t,n){(function(e){t.exports=function(t,n){function r(t){function r(){n&&n(t,i),n=null}u?e.nextTick(r):r()}function o(e,t,n){i[e]=n,(0==--s||t)&&r(t)}var i,s,a,u=!0;Array.isArray(t)?(i=[],s=t.length):(a=Object.keys(t),i={},s=a.length),s?a?a.forEach(function(e){t[e](function(t,n){o(e,t,n)})}):t.forEach(function(e,t){e(function(e,n){o(t,e,n)})}):r(null),u=!1}}).call(this,e("_process"))},{_process:66}],87:[function(e,t,n){(function(e){!function(){function n(e){"use strict";for(var t={fill:0},i=function(e){for(e+=9;e%64>0;e+=1);return e},s=function(e,t){var n=new Uint8Array(e.buffer),r=t%4,o=t-r;switch(r){case 0:n[o+3]=0;case 1:
n[o+2]=0;case 2:n[o+1]=0;case 3:n[o+0]=0}for(var i=1+(t>>2);i<e.length;i++)e[i]=0},a=function(e,t,n){e[t>>2]|=128<<24-(t%4<<3),e[14+(2+(t>>2)&-16)]=n/(1<<29)|0,e[15+(2+(t>>2)&-16)]=n<<3},u=function(e,t,n,r,o){var i,s=this,a=o%4,u=(r+a)%4,c=r-u;switch(a){case 0:e[o]=s.charCodeAt(n+3);case 1:e[o+1-(a<<1)|0]=s.charCodeAt(n+2);case 2:e[o+2-(a<<1)|0]=s.charCodeAt(n+1);case 3:e[o+3-(a<<1)|0]=s.charCodeAt(n)}if(!(r<u+a)){for(i=4-a;i<c;i=i+4|0)t[o+i>>2]=s.charCodeAt(n+i)<<24|s.charCodeAt(n+i+1)<<16|s.charCodeAt(n+i+2)<<8|s.charCodeAt(n+i+3);switch(u){case 3:e[o+c+1|0]=s.charCodeAt(n+c+2);case 2:e[o+c+2|0]=s.charCodeAt(n+c+1);case 1:e[o+c+3|0]=s.charCodeAt(n+c)}}},c=function(e,t,n,r,o){var i,s=this,a=o%4,u=(r+a)%4,c=r-u;switch(a){case 0:e[o]=s[n+3];case 1:e[o+1-(a<<1)|0]=s[n+2];case 2:e[o+2-(a<<1)|0]=s[n+1];case 3:e[o+3-(a<<1)|0]=s[n]}if(!(r<u+a)){for(i=4-a;i<c;i=i+4|0)t[o+i>>2|0]=s[n+i]<<24|s[n+i+1]<<16|s[n+i+2]<<8|s[n+i+3];switch(u){case 3:e[o+c+1|0]=s[n+c+2];case 2:e[o+c+2|0]=s[n+c+1];case 1:e[o+c+3|0]=s[n+c]}}},f=function(e,t,n,r,i){var s,a=this,u=i%4,c=(r+u)%4,f=r-c,d=new Uint8Array(o.readAsArrayBuffer(a.slice(n,n+r)));switch(u){case 0:e[i]=d[3];case 1:e[i+1-(u<<1)|0]=d[2];case 2:e[i+2-(u<<1)|0]=d[1];case 3:e[i+3-(u<<1)|0]=d[0]}if(!(r<c+u)){for(s=4-u;s<f;s=s+4|0)t[i+s>>2|0]=d[s]<<24|d[s+1]<<16|d[s+2]<<8|d[s+3];switch(c){case 3:e[i+f+1|0]=d[f+2];case 2:e[i+f+2|0]=d[f+1];case 1:e[i+f+3|0]=d[f]}}},d=function(e){switch(r.getDataType(e)){case"string":return u.bind(e);case"array":case"buffer":return c.bind(e);case"arraybuffer":return c.bind(new Uint8Array(e));case"view":return c.bind(new Uint8Array(e.buffer,e.byteOffset,e.byteLength));case"blob":return f.bind(e)}},h=new Array(256),l=0;l<256;l++)h[l]=(l<16?"0":"")+l.toString(16);var p=function(e){for(var t=new Uint8Array(e),n=new Array(e.byteLength),r=0;r<n.length;r++)n[r]=h[t[r]];return n.join("")},m=function(e){var t;if(e<=65536)return 65536;if(e<16777216)for(t=1;t<e;t<<=1);else for(t=16777216;t<e;t+=16777216);return t};!function(e){if(e%64>0)throw new Error("Chunk size must be a multiple of 128 bit");t.offset=0,t.maxChunkLen=e,t.padMaxChunkLen=i(e),t.heap=new ArrayBuffer(m(t.padMaxChunkLen+320+20)),t.h32=new Int32Array(t.heap),t.h8=new Int8Array(t.heap),t.core=new n._core({Int32Array:Int32Array,DataView:DataView},{},t.heap),t.buffer=null}(e||65536);var g=function(e,n){t.offset=0;var r=new Int32Array(e,n+320,5);r[0]=1732584193,r[1]=-271733879,r[2]=-1732584194,r[3]=271733878,r[4]=-1009589776},y=function(e,n){var r=i(e),o=new Int32Array(t.heap,0,r>>2);return s(o,e),a(o,e,n),r},_=function(e,n,r,o){d(e)(t.h8,t.h32,n,r,o||0)},v=function(e,n,r,o,i){var s=r;_(e,n,r),i&&(s=y(r,o)),t.core.hash(s,t.padMaxChunkLen)},b=function(e,t){var n=new Int32Array(e,t+320,5),r=new Int32Array(5),o=new DataView(r.buffer);return o.setInt32(0,n[0],!1),o.setInt32(4,n[1],!1),o.setInt32(8,n[2],!1),o.setInt32(12,n[3],!1),o.setInt32(16,n[4],!1),r},w=this.rawDigest=function(e){var n=e.byteLength||e.length||e.size||0;g(t.heap,t.padMaxChunkLen);var r=0,o=t.maxChunkLen;for(r=0;n>r+o;r+=o)v(e,r,o,n,!1);return v(e,r,n-r,n,!0),b(t.heap,t.padMaxChunkLen)};this.digest=this.digestFromString=this.digestFromBuffer=this.digestFromArrayBuffer=function(e){return p(w(e).buffer)},this.resetState=function(){return g(t.heap,t.padMaxChunkLen),this},this.append=function(e){var n,r=0,o=e.byteLength||e.length||e.size||0,i=t.offset%t.maxChunkLen;for(t.offset+=o;r<o;)n=Math.min(o-r,t.maxChunkLen-i),_(e,r,n,i),i+=n,r+=n,i===t.maxChunkLen&&(t.core.hash(t.maxChunkLen,t.padMaxChunkLen),i=0);return this},this.getState=function(){var e,n=t.offset%t.maxChunkLen;if(n)e=t.heap.slice(0);else{var r=new Int32Array(t.heap,t.padMaxChunkLen+320,5);e=r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)}return{offset:t.offset,heap:e}},this.setState=function(e){if(t.offset=e.offset,20===e.heap.byteLength){new Int32Array(t.heap,t.padMaxChunkLen+320,5).set(new Int32Array(e.heap))}else t.h32.set(new Int32Array(e.heap));return this};var E=this.rawEnd=function(){var e=t.offset,n=e%t.maxChunkLen,r=y(n,e);t.core.hash(r,t.padMaxChunkLen);var o=b(t.heap,t.padMaxChunkLen);return g(t.heap,t.padMaxChunkLen),o};this.end=function(){return p(E().buffer)}}var r={getDataType:function(t){if("string"==typeof t)return"string";if(t instanceof Array)return"array";if(void 0!==e&&e.Buffer&&e.Buffer.isBuffer(t))return"buffer";if(t instanceof ArrayBuffer)return"arraybuffer";if(t.buffer instanceof ArrayBuffer)return"view";if(t instanceof Blob)return"blob";throw new Error("Unsupported data type.")}};if(n._core=function(e,t,n){"use asm";var r=new e.Int32Array(n);function o(e,t){e=e|0;t=t|0;var n=0,o=0,i=0,s=0,a=0,u=0,c=0,f=0,d=0,h=0,l=0,p=0,m=0,g=0;i=r[t+320>>2]|0;a=r[t+324>>2]|0;c=r[t+328>>2]|0;d=r[t+332>>2]|0;l=r[t+336>>2]|0;for(n=0;(n|0)<(e|0);n=n+64|0){s=i;u=a;f=c;h=d;p=l;for(o=0;(o|0)<64;o=o+4|0){g=r[n+o>>2]|0;m=((i<<5|i>>>27)+(a&c|~a&d)|0)+((g+l|0)+1518500249|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;r[e+o>>2]=g}for(o=e+64|0;(o|0)<(e+80|0);o=o+4|0){g=(r[o-12>>2]^r[o-32>>2]^r[o-56>>2]^r[o-64>>2])<<1|(r[o-12>>2]^r[o-32>>2]^r[o-56>>2]^r[o-64>>2])>>>31;m=((i<<5|i>>>27)+(a&c|~a&d)|0)+((g+l|0)+1518500249|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;r[o>>2]=g}for(o=e+80|0;(o|0)<(e+160|0);o=o+4|0){g=(r[o-12>>2]^r[o-32>>2]^r[o-56>>2]^r[o-64>>2])<<1|(r[o-12>>2]^r[o-32>>2]^r[o-56>>2]^r[o-64>>2])>>>31;m=((i<<5|i>>>27)+(a^c^d)|0)+((g+l|0)+1859775393|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;r[o>>2]=g}for(o=e+160|0;(o|0)<(e+240|0);o=o+4|0){g=(r[o-12>>2]^r[o-32>>2]^r[o-56>>2]^r[o-64>>2])<<1|(r[o-12>>2]^r[o-32>>2]^r[o-56>>2]^r[o-64>>2])>>>31;m=((i<<5|i>>>27)+(a&c|a&d|c&d)|0)+((g+l|0)-1894007588|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;r[o>>2]=g}for(o=e+240|0;(o|0)<(e+320|0);o=o+4|0){g=(r[o-12>>2]^r[o-32>>2]^r[o-56>>2]^r[o-64>>2])<<1|(r[o-12>>2]^r[o-32>>2]^r[o-56>>2]^r[o-64>>2])>>>31;m=((i<<5|i>>>27)+(a^c^d)|0)+((g+l|0)-899497514|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;r[o>>2]=g}i=i+s|0;a=a+u|0;c=c+f|0;d=d+h|0;l=l+p|0}r[t+320>>2]=i;r[t+324>>2]=a;r[t+328>>2]=c;r[t+332>>2]=d;r[t+336>>2]=l}return{hash:o}},void 0!==t?t.exports=n:"undefined"!=typeof window&&(window.Rusha=n),"undefined"!=typeof FileReaderSync){var o=new FileReaderSync,i=new n(4194304);self.onmessage=function(e){var t,n=e.data.data;try{t=i.digest(n),self.postMessage({id:e.data.id,hash:t})}catch(t){self.postMessage({id:e.data.id,error:t.name})}}}}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],88:[function(e,t,n){t.exports=e("buffer")},{buffer:24}],89:[function(e,t,n){(function(e){t.exports=function(t,n){var r=[];t.on("data",function(e){r.push(e)}),t.once("end",function(){n&&n(null,e.concat(r)),n=null}),t.once("error",function(e){n&&n(e),n=null})}}).call(this,e("buffer").Buffer)},{buffer:24}],90:[function(e,t,n){(function(n){function r(e,t){e="string"==typeof e?{url:e}:Object.assign({},e),t=u(t),e.url&&o(e),null==e.headers&&(e.headers={}),null==e.maxRedirects&&(e.maxRedirects=10);var i;e.form&&(i="string"==typeof e.form?e.form:c.stringify(e.form)),e.body&&(i=e.json?JSON.stringify(e.body):e.body),e.json&&(e.headers.accept="application/json"),e.json&&i&&(e.headers["content-type"]="application/json"),e.form&&(e.headers["content-type"]="application/x-www-form-urlencoded"),i&&(e.headers["content-length"]=n.byteLength(i)),delete e.body,delete e.form,i&&!e.method&&(e.method="POST"),e.method&&(e.method=e.method.toUpperCase()),Object.keys(e.headers).some(function(e){return"accept-encoding"===e.toLowerCase()})||(e.headers["accept-encoding"]="gzip, deflate");var d="https:"===e.protocol?a:s,h=d.request(e,function(n){if(n.statusCode>=300&&n.statusCode<400&&"location"in n.headers)return e.url=n.headers.location,n.resume(),void(e.maxRedirects>0?(e.maxRedirects-=1,r(e,t)):t(new Error("too many redirects")));var o="function"==typeof f&&"HEAD"!==e.method;t(null,o?f(n):n)});return h.on("timeout",function(){h.abort(),t(new Error("Request timed out"))}),h.on("error",t),h.end(i),h}function o(e){var t=d.parse(e.url);t.hostname&&(e.hostname=t.hostname),t.port&&(e.port=t.port),t.protocol&&(e.protocol=t.protocol),t.auth&&(e.auth=t.auth),e.path=t.path,delete e.url}t.exports=r;var i=e("simple-concat"),s=e("http"),a=e("https"),u=e("once"),c=e("querystring"),f=e("unzip-response"),d=e("url");r.concat=function(e,t){return r(e,function(n,r){if(n)return t(n);i(r,function(n,o){if(n)return t(n);if(e.json)try{o=JSON.parse(o.toString())}catch(n){return t(n,r,o)}t(null,r,o)})})},["get","post","put","patch","head","delete"].forEach(function(e){r[e]=function(t,n){return"string"==typeof t&&(t={url:t}),t.method=e.toUpperCase(),r(t,n)}})}).call(this,e("buffer").Buffer)},{buffer:24,http:95,https:38,once:60,querystring:71,"simple-concat":89,"unzip-response":21,url:112}],91:[function(e,t,n){(function(n){function r(e){var t=this;if(!(t instanceof r))return new r(e);if(t._id=u(4).toString("hex").slice(0,7),t._debug("new peer %o",e),e=Object.assign({allowHalfOpen:!1},e),c.Duplex.call(t,e),t.channelName=e.initiator?e.channelName||u(20).toString("hex"):null,t._isChromium="undefined"!=typeof window&&!!window.webkitRTCPeerConnection,t.initiator=e.initiator||!1,t.channelConfig=e.channelConfig||r.channelConfig,t.config=e.config||r.config,t.constraints=t._transformConstraints(e.constraints||r.constraints),t.offerConstraints=t._transformConstraints(e.offerConstraints||{}),t.answerConstraints=t._transformConstraints(e.answerConstraints||{}),t.reconnectTimer=e.reconnectTimer||!1,t.sdpTransform=e.sdpTransform||function(e){return e},t.stream=e.stream||!1,t.trickle=void 0===e.trickle||e.trickle,t.destroyed=!1,t.connected=!1,t.remoteAddress=void 0,t.remoteFamily=void 0,t.remotePort=void 0,t.localAddress=void 0,t.localPort=void 0,t._wrtc=e.wrtc&&"object"==typeof e.wrtc?e.wrtc:s(),!t._wrtc)throw"undefined"==typeof window?new Error("No WebRTC support: Specify `opts.wrtc` option in this environment"):new Error("No WebRTC support: Not a supported browser");if(t._pcReady=!1,t._channelReady=!1,t._iceComplete=!1,t._channel=null,t._pendingCandidates=[],t._previousStreams=[],t._chunk=null,t._cb=null,t._interval=null,t._reconnectTimeout=null,t._pc=new t._wrtc.RTCPeerConnection(t.config,t.constraints),t._isWrtc=Array.isArray(t._pc.RTCIceConnectionStates),t._isReactNativeWebrtc="number"==typeof t._pc._peerConnectionId,t._pc.oniceconnectionstatechange=function(){t._onIceStateChange()},t._pc.onicegatheringstatechange=function(){t._onIceStateChange()},t._pc.onsignalingstatechange=function(){t._onSignalingStateChange()},t._pc.onicecandidate=function(e){t._onIceCandidate(e)},t.initiator){var n=!1;t._pc.onnegotiationneeded=function(){n||t._createOffer(),n=!0},t._setupData({channel:t._pc.createDataChannel(t.channelName,t.channelConfig)})}else t._pc.ondatachannel=function(e){t._setupData(e)};"addTrack"in t._pc?(t.stream&&t.stream.getTracks().forEach(function(e){t._pc.addTrack(e,t.stream)}),t._pc.ontrack=function(e){t._onTrack(e)}):(t.stream&&t._pc.addStream(t.stream),t._pc.onaddstream=function(e){t._onAddStream(e)}),t.initiator&&t._isWrtc&&t._pc.onnegotiationneeded(),t._onFinishBound=function(){t._onFinish()},t.once("finish",t._onFinishBound)}function o(){}t.exports=r;var i=e("debug")("simple-peer"),s=e("get-browser-rtc"),a=e("inherits"),u=e("randombytes"),c=e("readable-stream");a(r,c.Duplex),r.WEBRTC_SUPPORT=!!s(),r.config={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:global.stun.twilio.com:3478?transport=udp"}]},r.constraints={},r.channelConfig={},Object.defineProperty(r.prototype,"bufferSize",{get:function(){var e=this;return e._channel&&e._channel.bufferedAmount||0}}),r.prototype.address=function(){var e=this;return{port:e.localPort,family:"IPv4",address:e.localAddress}},r.prototype.signal=function(e){var t=this;if(t.destroyed)throw new Error("cannot signal after peer is destroyed");if("string"==typeof e)try{e=JSON.parse(e)}catch(t){e={}}t._debug("signal()"),e.candidate&&(t._pc.remoteDescription?t._addIceCandidate(e.candidate):t._pendingCandidates.push(e.candidate)),e.sdp&&t._pc.setRemoteDescription(new t._wrtc.RTCSessionDescription(e),function(){t.destroyed||(t._pendingCandidates.forEach(function(e){t._addIceCandidate(e)}),t._pendingCandidates=[],"offer"===t._pc.remoteDescription.type&&t._createAnswer())},function(e){t._destroy(e)}),e.sdp||e.candidate||t._destroy(new Error("signal() called with invalid signal data"))},r.prototype._addIceCandidate=function(e){var t=this;try{t._pc.addIceCandidate(new t._wrtc.RTCIceCandidate(e),o,function(e){t._destroy(e)})}catch(e){t._destroy(new Error("error adding candidate: "+e.message))}},r.prototype.send=function(e){var t=this;t._isWrtc&&n.isBuffer(e)&&(e=new Uint8Array(e)),t._channel.send(e)},r.prototype.destroy=function(e){this._destroy(null,e)},r.prototype._destroy=function(e,t){var n=this;if(!n.destroyed){if(t&&n.once("close",t),n._debug("destroy (error: %s)",e&&(e.message||e)),n.readable=n.writable=!1,n._readableState.ended||n.push(null),n._writableState.finished||n.end(),n.destroyed=!0,n.connected=!1,n._pcReady=!1,n._channelReady=!1,n._previousStreams=null,clearInterval(n._interval),clearTimeout(n._reconnectTimeout),n._interval=null,n._reconnectTimeout=null,n._chunk=null,n._cb=null,n._onFinishBound&&n.removeListener("finish",n._onFinishBound),n._onFinishBound=null,n._pc){try{n._pc.close()}catch(e){}n._pc.oniceconnectionstatechange=null,n._pc.onicegatheringstatechange=null,n._pc.onsignalingstatechange=null,n._pc.onicecandidate=null,"addTrack"in n._pc?n._pc.ontrack=null:n._pc.onaddstream=null,n._pc.onnegotiationneeded=null,n._pc.ondatachannel=null}if(n._channel){try{n._channel.close()}catch(e){}n._channel.onmessage=null,n._channel.onopen=null,n._channel.onclose=null,n._channel.onerror=null}n._pc=null,n._channel=null,e&&n.emit("error",e),n.emit("close")}},r.prototype._setupData=function(e){var t=this;if(!e.channel)return t._destroy(new Error("Data channel event is missing `channel` property"));t._channel=e.channel,t._channel.binaryType="arraybuffer","number"==typeof t._channel.bufferedAmountLowThreshold&&(t._channel.bufferedAmountLowThreshold=65536),t.channelName=t._channel.label,t._channel.onmessage=function(e){t._onChannelMessage(e)},t._channel.onbufferedamountlow=function(){t._onChannelBufferedAmountLow()},t._channel.onopen=function(){t._onChannelOpen()},t._channel.onclose=function(){t._onChannelClose()},t._channel.onerror=function(e){t._destroy(e)}},r.prototype._read=function(){},r.prototype._write=function(e,t,n){var r=this;if(r.destroyed)return n(new Error("cannot write after peer is destroyed"));if(r.connected){try{r.send(e)}catch(e){return r._destroy(e)}r._channel.bufferedAmount>65536?(r._debug("start backpressure: bufferedAmount %d",r._channel.bufferedAmount),r._cb=n):n(null)}else r._debug("write before connect"),r._chunk=e,r._cb=n},r.prototype._onFinish=function(){function e(){setTimeout(function(){t._destroy()},1e3)}var t=this;t.destroyed||(t.connected?e():t.once("connect",e))},r.prototype._createOffer=function(){var e=this;e.destroyed||e._pc.createOffer(function(t){function n(){e.destroyed||(e.trickle||e._iceComplete?o():e.once("_iceComplete",o))}function r(t){e._destroy(t)}function o(){var n=e._pc.localDescription||t;e._debug("signal"),e.emit("signal",{type:n.type,sdp:n.sdp})}e.destroyed||(t.sdp=e.sdpTransform(t.sdp),e._pc.setLocalDescription(t,n,r))},function(t){e._destroy(t)},e.offerConstraints)},r.prototype._createAnswer=function(){var e=this;e.destroyed||e._pc.createAnswer(function(t){function n(){e.destroyed||(e.trickle||e._iceComplete?o():e.once("_iceComplete",o))}function r(t){e._destroy(t)}function o(){var n=e._pc.localDescription||t;e._debug("signal"),e.emit("signal",{type:n.type,sdp:n.sdp})}e.destroyed||(t.sdp=e.sdpTransform(t.sdp),e._pc.setLocalDescription(t,n,r))},function(t){e._destroy(t)},e.answerConstraints)},r.prototype._onIceStateChange=function(){var e=this;if(!e.destroyed){var t=e._pc.iceConnectionState,n=e._pc.iceGatheringState;e._debug("iceStateChange (connection: %s) (gathering: %s)",t,n),e.emit("iceStateChange",t,n),"connected"!==t&&"completed"!==t||(clearTimeout(e._reconnectTimeout),e._pcReady=!0,e._maybeReady()),"disconnected"===t&&(e.reconnectTimer?(clearTimeout(e._reconnectTimeout),e._reconnectTimeout=setTimeout(function(){e._destroy()},e.reconnectTimer)):e._destroy()),"failed"===t&&e._destroy(new Error("Ice connection failed.")),"closed"===t&&e._destroy()}},r.prototype.getStats=function(e){var t=this;0===t._pc.getStats.length?t._pc.getStats().then(function(t){var n=[];t.forEach(function(e){n.push(e)}),e(null,n)},function(t){e(t)}):t._isReactNativeWebrtc?t._pc.getStats(null,function(t){var n=[];t.forEach(function(e){n.push(e)}),e(null,n)},function(t){e(t)}):t._pc.getStats.length>0?t._pc.getStats(function(t){var n=[];t.result().forEach(function(e){var t={};e.names().forEach(function(n){t[n]=e.stat(n)}),t.id=e.id,t.type=e.type,t.timestamp=e.timestamp,n.push(t)}),e(null,n)},function(t){e(t)}):e(null,[])},r.prototype._maybeReady=function(){var e=this;e._debug("maybeReady pc %s channel %s",e._pcReady,e._channelReady),!e.connected&&!e._connecting&&e._pcReady&&e._channelReady&&(e._connecting=!0,e.getStats(function(t,n){function r(t){var n=i[t.localCandidateId];n&&n.ip?(e.localAddress=n.ip,e.localPort=Number(n.port)):n&&n.ipAddress?(e.localAddress=n.ipAddress,e.localPort=Number(n.portNumber)):"string"==typeof t.googLocalAddress&&(n=t.googLocalAddress.split(":"),e.localAddress=n[0],e.localPort=Number(n[1]));var r=o[t.remoteCandidateId];r&&r.ip?(e.remoteAddress=r.ip,e.remotePort=Number(r.port)):r&&r.ipAddress?(e.remoteAddress=r.ipAddress,e.remotePort=Number(r.portNumber)):"string"==typeof t.googRemoteAddress&&(r=t.googRemoteAddress.split(":"),e.remoteAddress=r[0],e.remotePort=Number(r[1])),e.remoteFamily="IPv4",e._debug("connect local: %s:%s remote: %s:%s",e.localAddress,e.localPort,e.remoteAddress,e.remotePort)}if(!e.destroyed){t&&(n=[]),e._connecting=!1,e.connected=!0;var o={},i={},s={};if(n.forEach(function(e){"remotecandidate"!==e.type&&"remote-candidate"!==e.type||(o[e.id]=e),"localcandidate"!==e.type&&"local-candidate"!==e.type||(i[e.id]=e),"candidatepair"!==e.type&&"candidate-pair"!==e.type||(s[e.id]=e)}),n.forEach(function(e){"transport"===e.type&&r(s[e.selectedCandidatePairId]),("googCandidatePair"===e.type&&"true"===e.googActiveConnection||("candidatepair"===e.type||"candidate-pair"===e.type)&&e.selected)&&r(e)}),e._chunk){try{e.send(e._chunk)}catch(t){return e._destroy(t)}e._chunk=null,e._debug('sent chunk from "write before connect"');var a=e._cb;e._cb=null,a(null)}"number"!=typeof e._channel.bufferedAmountLowThreshold&&(e._interval=setInterval(function(){e._onInterval()},150),e._interval.unref&&e._interval.unref()),e._debug("connect"),e.emit("connect")}}))},r.prototype._onInterval=function(){!this._cb||!this._channel||this._channel.bufferedAmount>65536||this._onChannelBufferedAmountLow()},r.prototype._onSignalingStateChange=function(){var e=this;e.destroyed||(e._debug("signalingStateChange %s",e._pc.signalingState),e.emit("signalingStateChange",e._pc.signalingState))},r.prototype._onIceCandidate=function(e){var t=this;t.destroyed||(e.candidate&&t.trickle?t.emit("signal",{candidate:{candidate:e.candidate.candidate,sdpMLineIndex:e.candidate.sdpMLineIndex,sdpMid:e.candidate.sdpMid}}):e.candidate||(t._iceComplete=!0,t.emit("_iceComplete")))},r.prototype._onChannelMessage=function(e){var t=this;if(!t.destroyed){var r=e.data;r instanceof ArrayBuffer&&(r=n.from(r)),t.push(r)}},r.prototype._onChannelBufferedAmountLow=function(){var e=this;if(!e.destroyed&&e._cb){e._debug("ending backpressure: bufferedAmount %d",e._channel.bufferedAmount);var t=e._cb;e._cb=null,t(null)}},r.prototype._onChannelOpen=function(){var e=this;e.connected||e.destroyed||(e._debug("on channel open"),e._channelReady=!0,e._maybeReady())},r.prototype._onChannelClose=function(){var e=this;e.destroyed||(e._debug("on channel close"),e._destroy())},r.prototype._onAddStream=function(e){var t=this;t.destroyed||(t._debug("on add stream"),t.emit("stream",e.stream))},r.prototype._onTrack=function(e){var t=this;if(!t.destroyed){t._debug("on track");var n=e.streams[0].id;-1===t._previousStreams.indexOf(n)&&(t._previousStreams.push(n),t.emit("stream",e.streams[0]))}},r.prototype._debug=function(){var e=this,t=[].slice.call(arguments);t[0]="["+e._id+"] "+t[0],i.apply(null,t)},r.prototype._transformConstraints=function(e){var t=this;if(0===Object.keys(e).length)return e;if((e.mandatory||e.optional)&&!t._isChromium){var n=Object.assign({},e.optional,e.mandatory);return void 0!==n.OfferToReceiveVideo&&(n.offerToReceiveVideo=n.OfferToReceiveVideo,delete n.OfferToReceiveVideo),void 0!==n.OfferToReceiveAudio&&(n.offerToReceiveAudio=n.OfferToReceiveAudio,delete n.OfferToReceiveAudio),n}return e.mandatory||e.optional||!t._isChromium?e:(void 0!==e.offerToReceiveVideo&&(e.OfferToReceiveVideo=e.offerToReceiveVideo,delete e.offerToReceiveVideo),void 0!==e.offerToReceiveAudio&&(e.OfferToReceiveAudio=e.offerToReceiveAudio,delete e.offerToReceiveAudio),{mandatory:e})}}).call(this,e("buffer").Buffer)},{buffer:24,debug:30,"get-browser-rtc":37,inherits:41,randombytes:73,"readable-stream":82}],92:[function(e,t,n){function r(e){return u.digest(e)}function o(e,t){if(!d)return void setTimeout(t,0,r(e));"string"==typeof e&&(e=i(e)),d.digest({name:"sha-1"},e).then(function(e){t(s(new Uint8Array(e)))},function(n){t(r(e))})}function i(e){for(var t=e.length,n=new Uint8Array(t),r=0;r<t;r++)n[r]=e.charCodeAt(r);return n}function s(e){for(var t=e.length,n=[],r=0;r<t;r++){var o=e[r];n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")}var a=e("rusha"),u=new a,c="undefined"!=typeof window?window:self,f=c.crypto||c.msCrypto||{},d=f.subtle||f.webkitSubtle;try{d.digest({name:"sha-1"},new Uint8Array).catch(function(){d=!1})}catch(e){d=!1}t.exports=o,t.exports.sync=r},{rusha:87}],93:[function(e,t,n){(function(n){function r(e){var t=this;if(!(t instanceof r))return new r(e);if(e||(e={}),"string"==typeof e&&(e={url:e}),null==e.url&&null==e.socket)throw new Error("Missing required `url` or `socket` option");if(null!=e.url&&null!=e.socket)throw new Error("Must specify either `url` or `socket` option, not both");if(t._id=a(4).toString("hex").slice(0,7),t._debug("new websocket: %o",e),e=Object.assign({allowHalfOpen:!1},e),u.Duplex.call(t,e),t.connected=!1,t.destroyed=!1,t._chunk=null,t._cb=null,t._interval=null,e.socket)t.url=e.socket.url,t._ws=e.socket;else{t.url=e.url;try{t._ws="function"==typeof c?new f(e.url,e):new f(e.url)}catch(e){return void n.nextTick(function(){t._destroy(e)})}}t._ws.binaryType="arraybuffer",t._ws.onopen=function(){t._onOpen()},t._ws.onmessage=function(e){t._onMessage(e)},t._ws.onclose=function(){t._onClose()},t._ws.onerror=function(){t._destroy(new Error("connection error to "+t.url))},t._onFinishBound=function(){t._onFinish()},t.once("finish",t._onFinishBound)}t.exports=r;var o=e("safe-buffer").Buffer,i=e("debug")("simple-websocket"),s=e("inherits"),a=e("randombytes"),u=e("readable-stream"),c=e("ws"),f="function"!=typeof c?WebSocket:c;s(r,u.Duplex),r.WEBSOCKET_SUPPORT=!!f,r.prototype.send=function(e){this._ws.send(e)},r.prototype.destroy=function(e){this._destroy(null,e)},r.prototype._destroy=function(e,t){var n=this;if(!n.destroyed){if(t&&n.once("close",t),n._debug("destroy (error: %s)",e&&(e.message||e)),n.readable=n.writable=!1,n._readableState.ended||n.push(null),n._writableState.finished||n.end(),n.connected=!1,n.destroyed=!0,clearInterval(n._interval),n._interval=null,n._chunk=null,n._cb=null,n._onFinishBound&&n.removeListener("finish",n._onFinishBound),n._onFinishBound=null,n._ws){var r=n._ws,o=function(){r.onclose=null};if(r.readyState===f.CLOSED)o();else try{r.onclose=o,r.close()}catch(e){o()}r.onopen=null,r.onmessage=null,r.onerror=null}n._ws=null,e&&n.emit("error",e),n.emit("close")}},r.prototype._read=function(){},r.prototype._write=function(e,t,n){if(this.destroyed)return n(new Error("cannot write after socket is destroyed"));if(this.connected){try{this.send(e)}catch(e){return this._destroy(e)}"function"!=typeof c&&this._ws.bufferedAmount>65536?(this._debug("start backpressure: bufferedAmount %d",this._ws.bufferedAmount),this._cb=n):n(null)}else this._debug("write before connect"),this._chunk=e,this._cb=n},r.prototype._onFinish=function(){function e(){setTimeout(function(){t._destroy()},1e3)}var t=this;t.destroyed||(t.connected?e():t.once("connect",e))},r.prototype._onMessage=function(e){if(!this.destroyed){var t=e.data;t instanceof ArrayBuffer&&(t=o.from(t)),this.push(t)}},r.prototype._onOpen=function(){var e=this;if(!e.connected&&!e.destroyed){if(e.connected=!0,e._chunk){try{e.send(e._chunk)}catch(t){return e._destroy(t)}e._chunk=null,e._debug('sent chunk from "write before connect"');var t=e._cb;e._cb=null,t(null)}"function"!=typeof c&&(e._interval=setInterval(function(){e._onInterval()},150),e._interval.unref&&e._interval.unref()),e._debug("connect"),e.emit("connect")}},r.prototype._onInterval=function(){if(this._cb&&this._ws&&!(this._ws.bufferedAmount>65536)){this._debug("ending backpressure: bufferedAmount %d",this._ws.bufferedAmount);var e=this._cb;this._cb=null,e(null)}},r.prototype._onClose=function(){this.destroyed||(this._debug("on close"),this._destroy())},r.prototype._debug=function(){var e=[].slice.call(arguments);e[0]="["+this._id+"] "+e[0],i.apply(null,e)}}).call(this,e("_process"))},{_process:66,debug:30,inherits:41,randombytes:73,"readable-stream":82,"safe-buffer":88,ws:21}],94:[function(e,t,n){var r=1,o=function(){r=r+1&65535},i=setInterval(o,250);i.unref&&i.unref(),t.exports=function(e){var t=4*(e||5),n=[0],o=1,i=r-1&65535;return function(e){var s=r-i&65535;for(s>t&&(s=t),i=r;s--;)o===t&&(o=0),n[o]=n[0===o?t-1:o-1],o++;e&&(n[o-1]+=e);var a=n[o-1],u=n.length<t?0:n[o===t?0:o];return n.length<4?a:4*(a-u)/n.length}}},{}],95:[function(e,t,n){(function(t){var r=e("./lib/request"),o=e("xtend"),i=e("builtin-status-codes"),s=e("url"),a=n;a.request=function(e,n){e="string"==typeof e?s.parse(e):o(e);var i=-1===t.location.protocol.search(/^https?:$/)?"http:":"",a=e.protocol||i,u=e.hostname||e.host,c=e.port,f=e.path||"/";u&&-1!==u.indexOf(":")&&(u="["+u+"]"),e.url=(u?a+"//"+u:"")+(c?":"+c:"")+f,e.method=(e.method||"GET").toUpperCase(),e.headers=e.headers||{};var d=new r(e);return n&&d.on("response",n),d},a.get=function(e,t){var n=a.request(e,t);return n.end(),n},a.Agent=function(){},a.Agent.defaultMaxSockets=4,a.STATUS_CODES=i,a.METHODS=["CHECKOUT","CONNECT","COPY","DELETE","GET","HEAD","LOCK","M-SEARCH","MERGE","MKACTIVITY","MKCOL","MOVE","NOTIFY","OPTIONS","PATCH","POST","PROPFIND","PROPPATCH","PURGE","PUT","REPORT","SEARCH","SUBSCRIBE","TRACE","UNLOCK","UNSUBSCRIBE"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/request":97,"builtin-status-codes":25,url:112,xtend:119}],96:[function(e,t,n){(function(e){function t(){if(void 0!==i)return i;if(e.XMLHttpRequest){i=new e.XMLHttpRequest;try{i.open("GET",e.XDomainRequest?"/":"https://example.com")}catch(e){i=null}}else i=null;return i}function r(e){var n=t();if(!n)return!1;try{return n.responseType=e,n.responseType===e}catch(e){}return!1}function o(e){return"function"==typeof e}n.fetch=o(e.fetch)&&o(e.ReadableStream),n.blobConstructor=!1;try{new Blob([new ArrayBuffer(1)]),n.blobConstructor=!0}catch(e){}var i,s=void 0!==e.ArrayBuffer,a=s&&o(e.ArrayBuffer.prototype.slice);n.arraybuffer=n.fetch||s&&r("arraybuffer"),n.msstream=!n.fetch&&a&&r("ms-stream"),n.mozchunkedarraybuffer=!n.fetch&&s&&r("moz-chunked-arraybuffer"),n.overrideMimeType=n.fetch||!!t()&&o(t().overrideMimeType),n.vbArray=o(e.VBArray),i=null}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],97:[function(e,t,n){(function(n,r,o){function i(e,t){return a.fetch&&t?"fetch":a.mozchunkedarraybuffer?"moz-chunked-arraybuffer":a.msstream?"ms-stream":a.arraybuffer&&e?"arraybuffer":a.vbArray&&e?"text:vbarray":"text"}function s(e){try{var t=e.status;return null!==t&&0!==t}catch(e){return!1}}var a=e("./capability"),u=e("inherits"),c=e("./response"),f=e("readable-stream"),d=e("to-arraybuffer"),h=c.IncomingMessage,l=c.readyStates,p=t.exports=function(e){var t=this;f.Writable.call(t),t._opts=e,t._body=[],t._headers={},e.auth&&t.setHeader("Authorization","Basic "+new o(e.auth).toString("base64")),Object.keys(e.headers).forEach(function(n){t.setHeader(n,e.headers[n])});var n,r=!0;if("disable-fetch"===e.mode||"timeout"in e)r=!1,n=!0;else if("prefer-streaming"===e.mode)n=!1;else if("allow-wrong-content-type"===e.mode)n=!a.overrideMimeType;else{if(e.mode&&"default"!==e.mode&&"prefer-fast"!==e.mode)throw new Error("Invalid value for opts.mode");n=!0}t._mode=i(n,r),t.on("finish",function(){t._onFinish()})};u(p,f.Writable),p.prototype.setHeader=function(e,t){var n=this,r=e.toLowerCase();-1===m.indexOf(r)&&(n._headers[r]={name:e,value:t})},p.prototype.getHeader=function(e){return this._headers[e.toLowerCase()].value},p.prototype.removeHeader=function(e){delete this._headers[e.toLowerCase()]},p.prototype._onFinish=function(){var e=this;if(!e._destroyed){var t=e._opts,i=e._headers,s=null;"GET"!==t.method&&"HEAD"!==t.method&&(s=a.blobConstructor?new r.Blob(e._body.map(function(e){return d(e)}),{type:(i["content-type"]||{}).value||""}):o.concat(e._body).toString());var u=[];if(Object.keys(i).forEach(function(e){var t=i[e].name,n=i[e].value;Array.isArray(n)?n.forEach(function(e){u.push([t,e])}):u.push([t,n])}),"fetch"===e._mode)r.fetch(e._opts.url,{method:e._opts.method,headers:u,body:s||void 0,mode:"cors",credentials:t.withCredentials?"include":"same-origin"}).then(function(t){e._fetchResponse=t,e._connect()},function(t){e.emit("error",t)});else{var c=e._xhr=new r.XMLHttpRequest;try{c.open(e._opts.method,e._opts.url,!0)}catch(t){return void n.nextTick(function(){e.emit("error",t)})}"responseType"in c&&(c.responseType=e._mode.split(":")[0]),"withCredentials"in c&&(c.withCredentials=!!t.withCredentials),"text"===e._mode&&"overrideMimeType"in c&&c.overrideMimeType("text/plain; charset=x-user-defined"),"timeout"in t&&(c.timeout=t.timeout,c.ontimeout=function(){e.emit("timeout")}),u.forEach(function(e){c.setRequestHeader(e[0],e[1])}),e._response=null,c.onreadystatechange=function(){switch(c.readyState){case l.LOADING:case l.DONE:e._onXHRProgress()}},"moz-chunked-arraybuffer"===e._mode&&(c.onprogress=function(){e._onXHRProgress()}),c.onerror=function(){e._destroyed||e.emit("error",new Error("XHR error"))};try{c.send(s)}catch(t){return void n.nextTick(function(){e.emit("error",t)})}}}},p.prototype._onXHRProgress=function(){var e=this;s(e._xhr)&&!e._destroyed&&(e._response||e._connect(),e._response._onXHRProgress())},p.prototype._connect=function(){var e=this;e._destroyed||(e._response=new h(e._xhr,e._fetchResponse,e._mode),e._response.on("error",function(t){e.emit("error",t)}),e.emit("response",e._response))},p.prototype._write=function(e,t,n){this._body.push(e),n()},p.prototype.abort=p.prototype.destroy=function(){var e=this;e._destroyed=!0,e._response&&(e._response._destroyed=!0),e._xhr&&e._xhr.abort()},p.prototype.end=function(e,t,n){var r=this;"function"==typeof e&&(n=e,e=void 0),f.Writable.prototype.end.call(r,e,t,n)},p.prototype.flushHeaders=function(){},p.prototype.setTimeout=function(){},p.prototype.setNoDelay=function(){},p.prototype.setSocketKeepAlive=function(){};var m=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","date","dnt","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"]}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer)},{"./capability":96,"./response":98,_process:66,buffer:24,inherits:41,"readable-stream":82,"to-arraybuffer":105}],98:[function(e,t,n){(function(t,r,o){var i=e("./capability"),s=e("inherits"),a=e("readable-stream"),u=n.readyStates={UNSENT:0,OPENED:1,
HEADERS_RECEIVED:2,LOADING:3,DONE:4},c=n.IncomingMessage=function(e,n,r){function s(){c.read().then(function(e){if(!u._destroyed){if(e.done)return void u.push(null);u.push(new o(e.value)),s()}}).catch(function(e){u.emit("error",e)})}var u=this;if(a.Readable.call(u),u._mode=r,u.headers={},u.rawHeaders=[],u.trailers={},u.rawTrailers=[],u.on("end",function(){t.nextTick(function(){u.emit("close")})}),"fetch"===r){u._fetchResponse=n,u.url=n.url,u.statusCode=n.status,u.statusMessage=n.statusText,n.headers.forEach(function(e,t){u.headers[t.toLowerCase()]=e,u.rawHeaders.push(t,e)});var c=n.body.getReader();s()}else{u._xhr=e,u._pos=0,u.url=e.responseURL,u.statusCode=e.status,u.statusMessage=e.statusText;if(e.getAllResponseHeaders().split(/\r?\n/).forEach(function(e){var t=e.match(/^([^:]+):\s*(.*)/);if(t){var n=t[1].toLowerCase();"set-cookie"===n?(void 0===u.headers[n]&&(u.headers[n]=[]),u.headers[n].push(t[2])):void 0!==u.headers[n]?u.headers[n]+=", "+t[2]:u.headers[n]=t[2],u.rawHeaders.push(t[1],t[2])}}),u._charset="x-user-defined",!i.overrideMimeType){var f=u.rawHeaders["mime-type"];if(f){var d=f.match(/;\s*charset=([^;])(;|$)/);d&&(u._charset=d[1].toLowerCase())}u._charset||(u._charset="utf-8")}}};s(c,a.Readable),c.prototype._read=function(){},c.prototype._onXHRProgress=function(){var e=this,t=e._xhr,n=null;switch(e._mode){case"text:vbarray":if(t.readyState!==u.DONE)break;try{n=new r.VBArray(t.responseBody).toArray()}catch(e){}if(null!==n){e.push(new o(n));break}case"text":try{n=t.responseText}catch(t){e._mode="text:vbarray";break}if(n.length>e._pos){var i=n.substr(e._pos);if("x-user-defined"===e._charset){for(var s=new o(i.length),a=0;a<i.length;a++)s[a]=255&i.charCodeAt(a);e.push(s)}else e.push(i,e._charset);e._pos=n.length}break;case"arraybuffer":if(t.readyState!==u.DONE||!t.response)break;n=t.response,e.push(new o(new Uint8Array(n)));break;case"moz-chunked-arraybuffer":if(n=t.response,t.readyState!==u.LOADING||!n)break;e.push(new o(new Uint8Array(n)));break;case"ms-stream":if(n=t.response,t.readyState!==u.LOADING)break;var c=new r.MSStreamReader;c.onprogress=function(){c.result.byteLength>e._pos&&(e.push(new o(new Uint8Array(c.result.slice(e._pos)))),e._pos=c.result.byteLength)},c.onload=function(){e.push(null)},c.readAsArrayBuffer(n)}e._xhr.readyState===u.DONE&&"ms-stream"!==e._mode&&e.push(null)}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer)},{"./capability":96,_process:66,buffer:24,inherits:41,"readable-stream":82}],99:[function(e,t,n){var r=e("stream-to-blob");t.exports=function e(t,n,o){if("function"==typeof n)return e(t,null,n);r(t,n,function(e,t){if(e)return o(e);var n=URL.createObjectURL(t);o(null,n)})}},{"stream-to-blob":100}],100:[function(e,t,n){var r=e("once");t.exports=function e(t,n,o){if("function"==typeof n)return e(t,null,n);o=r(o);var i=[];t.on("data",function(e){i.push(e)}).on("end",function(){var e=n?new Blob(i,{type:n}):new Blob(i);o(null,e)}).on("error",o)}},{once:60}],101:[function(e,t,n){(function(n){var r=e("once");t.exports=function(e,t,o){o=r(o);var i=new n(t),s=0;e.on("data",function(e){e.copy(i,s),s+=e.length}).on("end",function(){o(null,i)}).on("error",o)}}).call(this,e("buffer").Buffer)},{buffer:24,once:60}],102:[function(e,t,n){"use strict";function r(e){if(!e)return"utf8";for(var t;;)switch(e){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return e;default:if(t)return;e=(""+e).toLowerCase(),t=!0}}function o(e){var t=r(e);if("string"!=typeof t&&(_.isEncoding===b||!b(e)))throw new Error("Unknown encoding: "+e);return t||e}function i(e){this.encoding=o(e);var t;switch(this.encoding){case"utf16le":this.text=h,this.end=l,t=4;break;case"utf8":this.fillLast=c,t=4;break;case"base64":this.text=p,this.end=m,t=3;break;default:return this.write=g,void(this.end=y)}this.lastNeed=0,this.lastTotal=0,this.lastChar=v.allocUnsafe(t)}function s(e){return e<=127?0:e>>5==6?2:e>>4==14?3:e>>3==30?4:-1}function a(e,t,n){var r=t.length-1;if(r<n)return 0;var o=s(t[r]);return o>=0?(o>0&&(e.lastNeed=o-1),o):--r<n?0:(o=s(t[r]))>=0?(o>0&&(e.lastNeed=o-2),o):--r<n?0:(o=s(t[r]),o>=0?(o>0&&(2===o?o=0:e.lastNeed=o-3),o):0)}function u(e,t,n){if(128!=(192&t[0]))return e.lastNeed=0,"�".repeat(n);if(e.lastNeed>1&&t.length>1){if(128!=(192&t[1]))return e.lastNeed=1,"�".repeat(n+1);if(e.lastNeed>2&&t.length>2&&128!=(192&t[2]))return e.lastNeed=2,"�".repeat(n+2)}}function c(e){var t=this.lastTotal-this.lastNeed,n=u(this,e,t);return void 0!==n?n:this.lastNeed<=e.length?(e.copy(this.lastChar,t,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(e.copy(this.lastChar,t,0,e.length),void(this.lastNeed-=e.length))}function f(e,t){var n=a(this,e,t);if(!this.lastNeed)return e.toString("utf8",t);this.lastTotal=n;var r=e.length-(n-this.lastNeed);return e.copy(this.lastChar,0,r),e.toString("utf8",t,r)}function d(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+"�".repeat(this.lastTotal-this.lastNeed):t}function h(e,t){if((e.length-t)%2==0){var n=e.toString("utf16le",t);if(n){var r=n.charCodeAt(n.length-1);if(r>=55296&&r<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1],n.slice(0,-1)}return n}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=e[e.length-1],e.toString("utf16le",t,e.length-1)}function l(e){var t=e&&e.length?this.write(e):"";if(this.lastNeed){var n=this.lastTotal-this.lastNeed;return t+this.lastChar.toString("utf16le",0,n)}return t}function p(e,t){var n=(e.length-t)%3;return 0===n?e.toString("base64",t):(this.lastNeed=3-n,this.lastTotal=3,1===n?this.lastChar[0]=e[e.length-1]:(this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1]),e.toString("base64",t,e.length-n))}function m(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+this.lastChar.toString("base64",0,3-this.lastNeed):t}function g(e){return e.toString(this.encoding)}function y(e){return e&&e.length?this.write(e):""}var _=e("buffer").Buffer,v=e("buffer-shims"),b=_.isEncoding||function(e){switch((e=""+e)&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};n.StringDecoder=i,i.prototype.write=function(e){if(0===e.length)return"";var t,n;if(this.lastNeed){if(void 0===(t=this.fillLast(e)))return"";n=this.lastNeed,this.lastNeed=0}else n=0;return n<e.length?t?t+this.text(e,n):this.text(e,n):t||""},i.prototype.end=d,i.prototype.text=f,i.prototype.fillLast=function(e){if(this.lastNeed<=e.length)return e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,e.length),this.lastNeed-=e.length}},{buffer:24,"buffer-shims":23}],103:[function(e,t,n){var r=e("./thirty-two");n.encode=r.encode,n.decode=r.decode},{"./thirty-two":104}],104:[function(e,t,n){(function(e){"use strict";function t(e){var t=Math.floor(e.length/5);return e.length%5==0?t:t+1}var r=[255,255,26,27,28,29,30,31,255,255,255,255,255,255,255,255,255,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,255,255,255,255,255,255,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,255,255,255,255,255];n.encode=function(n){e.isBuffer(n)||(n=new e(n));for(var r=0,o=0,i=0,s=0,a=new e(8*t(n));r<n.length;){var u=n[r];i>3?(s=u&255>>i,i=(i+5)%8,s=s<<i|(r+1<n.length?n[r+1]:0)>>8-i,r++):(s=u>>8-(i+5)&31,0==(i=(i+5)%8)&&r++),a[o]="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".charCodeAt(s),o++}for(r=o;r<a.length;r++)a[r]=61;return a},n.decode=function(t){var n,o=0,i=0,s=0;e.isBuffer(t)||(t=new e(t));for(var a=new e(Math.ceil(5*t.length/8)),u=0;u<t.length&&61!==t[u];u++){var c=t[u]-48;if(!(c<r.length))throw new Error("Invalid input - it is not base32 encoded string");i=r[c],o<=3?(o=(o+5)%8,0===o?(n|=i,a[s]=n,s++,n=0):n|=255&i<<8-o):(o=(o+5)%8,n|=255&i>>>o,a[s]=n,s++,n=255&i<<8-o)}return a.slice(0,s)}}).call(this,e("buffer").Buffer)},{buffer:24}],105:[function(e,t,n){var r=e("buffer").Buffer;t.exports=function(e){if(e instanceof Uint8Array){if(0===e.byteOffset&&e.byteLength===e.buffer.byteLength)return e.buffer;if("function"==typeof e.buffer.slice)return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}if(r.isBuffer(e)){for(var t=new Uint8Array(e.length),n=e.length,o=0;o<n;o++)t[o]=e[o];return t.buffer}throw new Error("Argument must be a Buffer")}},{buffer:24}],106:[function(e,t,n){(function(n){function r(e){function t(e,t){var n=new i(t);return n.on("warning",o._onWarning),n.on("error",o._onError),n.listen(e),o._internalDHT=!0,n}var o=this;if(!(o instanceof r))return new r(e);if(s.call(o),!e.peerId)throw new Error("Option `peerId` is required");if(!e.infoHash)throw new Error("Option `infoHash` is required");if(!n.browser&&!e.port)throw new Error("Option `port` is required");o.peerId="string"==typeof e.peerId?e.peerId:e.peerId.toString("hex"),o.infoHash="string"==typeof e.infoHash?e.infoHash:e.infoHash.toString("hex"),o._port=e.port,o._userAgent=e.userAgent,o.destroyed=!1,o._announce=e.announce||[],o._intervalMs=e.intervalMs||9e5,o._trackerOpts=null,o._dhtAnnouncing=!1,o._dhtTimeout=!1,o._internalDHT=!1,o._onWarning=function(e){o.emit("warning",e)},o._onError=function(e){o.emit("error",e)},o._onDHTPeer=function(e,t){t.toString("hex")===o.infoHash&&o.emit("peer",e.host+":"+e.port,"dht")},o._onTrackerPeer=function(e){o.emit("peer",e,"tracker")},o._onTrackerAnnounce=function(){o.emit("trackerAnnounce")},!1===e.tracker?o.tracker=null:e.tracker&&"object"==typeof e.tracker?(o._trackerOpts=a(e.tracker),o.tracker=o._createTracker()):o.tracker=o._createTracker(),!1===e.dht||"function"!=typeof i?o.dht=null:e.dht&&"function"==typeof e.dht.addNode?o.dht=e.dht:e.dht&&"object"==typeof e.dht?o.dht=t(e.dhtPort,e.dht):o.dht=t(e.dhtPort),o.dht&&(o.dht.on("peer",o._onDHTPeer),o._dhtAnnounce())}t.exports=r;var o=e("debug")("torrent-discovery"),i=e("bittorrent-dht/client"),s=e("events").EventEmitter,a=e("xtend"),u=e("inherits"),c=e("run-parallel"),f=e("bittorrent-tracker/client");u(r,s),r.prototype.updatePort=function(e){var t=this;e!==t._port&&(t._port=e,t.dht&&t._dhtAnnounce(),t.tracker&&(t.tracker.stop(),t.tracker.destroy(function(){t.tracker=t._createTracker()})))},r.prototype.complete=function(e){this.tracker&&this.tracker.complete(e)},r.prototype.destroy=function(e){var t=this;if(!t.destroyed){t.destroyed=!0,clearTimeout(t._dhtTimeout);var n=[];t.tracker&&(t.tracker.stop(),t.tracker.removeListener("warning",t._onWarning),t.tracker.removeListener("error",t._onError),t.tracker.removeListener("peer",t._onTrackerPeer),t.tracker.removeListener("update",t._onTrackerAnnounce),n.push(function(e){t.tracker.destroy(e)})),t.dht&&t.dht.removeListener("peer",t._onDHTPeer),t._internalDHT&&(t.dht.removeListener("warning",t._onWarning),t.dht.removeListener("error",t._onError),n.push(function(e){t.dht.destroy(e)})),c(n,e),t.dht=null,t.tracker=null,t._announce=null}},r.prototype._createTracker=function(){var e=a(this._trackerOpts,{infoHash:this.infoHash,announce:this._announce,peerId:this.peerId,port:this._port,userAgent:this._userAgent}),t=new f(e);return t.on("warning",this._onWarning),t.on("error",this._onError),t.on("peer",this._onTrackerPeer),t.on("update",this._onTrackerAnnounce),t.setInterval(this._intervalMs),t.start(),t},r.prototype._dhtAnnounce=function(){function e(){return t._intervalMs+Math.floor(Math.random()*t._intervalMs/5)}var t=this;t._dhtAnnouncing||(o("dht announce"),t._dhtAnnouncing=!0,clearTimeout(t._dhtTimeout),t.dht.announce(t.infoHash,t._port,function(n){t._dhtAnnouncing=!1,o("dht announce complete"),n&&t.emit("warning",n),t.emit("dhtAnnounce"),t.destroyed||(t._dhtTimeout=setTimeout(function(){t._dhtAnnounce()},e()),t._dhtTimeout.unref&&t._dhtTimeout.unref())}))}}).call(this,e("_process"))},{_process:66,"bittorrent-dht/client":21,"bittorrent-tracker/client":15,debug:30,events:34,inherits:41,"run-parallel":86,xtend:119}],107:[function(e,t,n){(function(e){function n(e){if(!(this instanceof n))return new n(e);this.length=e,this.missing=e,this.sources=null,this._chunks=Math.ceil(e/r),this._remainder=e%r||r,this._buffered=0,this._buffer=null,this._cancellations=null,this._reservations=0,this._flushed=!1}t.exports=n;var r=16384;n.BLOCK_LENGTH=r,n.prototype.chunkLength=function(e){return e===this._chunks-1?this._remainder:r},n.prototype.chunkLengthRemaining=function(e){return this.length-e*r},n.prototype.chunkOffset=function(e){return e*r},n.prototype.reserve=function(){return this.init()?this._cancellations.length?this._cancellations.pop():this._reservations<this._chunks?this._reservations++:-1:-1},n.prototype.reserveRemaining=function(){if(!this.init())return-1;if(this._reservations<this._chunks){var e=this._reservations;return this._reservations=this._chunks,e}return-1},n.prototype.cancel=function(e){this.init()&&this._cancellations.push(e)},n.prototype.cancelRemaining=function(e){this.init()&&(this._reservations=e)},n.prototype.get=function(e){return this.init()?this._buffer[e]:null},n.prototype.set=function(e,t,n){if(!this.init())return!1;for(var o=t.length,i=Math.ceil(o/r),s=0;s<i;s++)if(!this._buffer[e+s]){var a=s*r,u=t.slice(a,a+r);this._buffered++,this._buffer[e+s]=u,this.missing-=u.length,-1===this.sources.indexOf(n)&&this.sources.push(n)}return this._buffered===this._chunks},n.prototype.flush=function(){if(!this._buffer||this._chunks!==this._buffered)return null;var t=e.concat(this._buffer,this.length);return this._buffer=null,this._cancellations=null,this.sources=null,this._flushed=!0,t},n.prototype.init=function(){return!this._flushed&&(!!this._buffer||(this._buffer=new Array(this._chunks),this._cancellations=[],this.sources=[],!0))}}).call(this,e("buffer").Buffer)},{buffer:24}],108:[function(e,t,n){(function(n){var r=e("is-typedarray").strict;t.exports=function(e){if(r(e)){var t=new n(e.buffer);return e.byteLength!==e.buffer.byteLength&&(t=t.slice(e.byteOffset,e.byteOffset+e.byteLength)),t}return new n(e)}}).call(this,e("buffer").Buffer)},{buffer:24,"is-typedarray":45}],109:[function(e,t,n){(function(e){n.encodingLength=function(){return 8},n.encode=function(t,n,r){n||(n=new e(8)),r||(r=0);var o=Math.floor(t/4294967295),i=t-4294967295*o;return n.writeUInt32BE(o,r),n.writeUInt32BE(i,r+4),n},n.decode=function(t,n){return n||(n=0),t||(t=new e(4)),n||(n=0),4294967295*t.readUInt32BE(n)+t.readUInt32BE(n+4)},n.encode.bytes=8,n.decode.bytes=8}).call(this,e("buffer").Buffer)},{buffer:24}],110:[function(e,t,n){"use strict";function r(e,t){for(var n=1,r=e.length,o=e[0],i=e[0],s=1;s<r;++s)if(i=o,o=e[s],t(o,i)){if(s===n){n++;continue}e[n++]=o}return e.length=n,e}function o(e){for(var t=1,n=e.length,r=e[0],o=e[0],i=1;i<n;++i,o=r)if(o=r,(r=e[i])!==o){if(i===t){t++;continue}e[t++]=r}return e.length=t,e}function i(e,t,n){return 0===e.length?e:t?(n||e.sort(t),r(e,t)):(n||e.sort(),o(e))}t.exports=i},{}],111:[function(e,t,n){function r(e,t){if(!(t>=e.length||t<0)){var n=e.pop();if(t<e.length){var r=e[t];return e[t]=n,r}return n}}t.exports=r},{}],112:[function(e,t,n){"use strict";function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function o(e,t,n){if(e&&c.isObject(e)&&e instanceof r)return e;var o=new r;return o.parse(e,t,n),o}function i(e){return c.isString(e)&&(e=o(e)),e instanceof r?e.format():r.prototype.format.call(e)}function s(e,t){return o(e,!1,!0).resolve(t)}function a(e,t){return e?o(e,!1,!0).resolveObject(t):t}var u=e("punycode"),c=e("./util");n.parse=o,n.resolve=s,n.resolveObject=a,n.format=i,n.Url=r;var f=/^([a-z0-9.+-]+:)/i,d=/:[0-9]*$/,h=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,l=["<",">",'"',"`"," ","\r","\n","\t"],p=["{","}","|","\\","^","`"].concat(l),m=["'"].concat(p),g=["%","/","?",";","#"].concat(m),y=["/","?","#"],_={javascript:!0,"javascript:":!0},v={javascript:!0,"javascript:":!0},b={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},w=e("querystring");r.prototype.parse=function(e,t,n){if(!c.isString(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var r=e.indexOf("?"),o=-1!==r&&r<e.indexOf("#")?"?":"#",i=e.split(o);i[0]=i[0].replace(/\\/g,"/"),e=i.join(o);var s=e;if(s=s.trim(),!n&&1===e.split("#").length){var a=h.exec(s);if(a)return this.path=s,this.href=s,this.pathname=a[1],a[2]?(this.search=a[2],this.query=t?w.parse(this.search.substr(1)):this.search.substr(1)):t&&(this.search="",this.query={}),this}var d=f.exec(s);if(d){d=d[0];var l=d.toLowerCase();this.protocol=l,s=s.substr(d.length)}if(n||d||s.match(/^\/\/[^@\/]+@[^@\/]+/)){var p="//"===s.substr(0,2);!p||d&&v[d]||(s=s.substr(2),this.slashes=!0)}if(!v[d]&&(p||d&&!b[d])){for(var E=-1,k=0;k<y.length;k++){var x=s.indexOf(y[k]);-1!==x&&(-1===E||x<E)&&(E=x)}var S,I;I=-1===E?s.lastIndexOf("@"):s.lastIndexOf("@",E),-1!==I&&(S=s.slice(0,I),s=s.slice(I+1),this.auth=decodeURIComponent(S)),E=-1;for(var k=0;k<g.length;k++){var x=s.indexOf(g[k]);-1!==x&&(-1===E||x<E)&&(E=x)}-1===E&&(E=s.length),this.host=s.slice(0,E),s=s.slice(E),this.parseHost(),this.hostname=this.hostname||"";var B="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!B)for(var A=this.hostname.split(/\./),k=0,C=A.length;k<C;k++){var T=A[k];if(T&&!T.match(/^[+a-z0-9A-Z_-]{0,63}$/)){for(var L="",U=0,R=T.length;U<R;U++)T.charCodeAt(U)>127?L+="x":L+=T[U];if(!L.match(/^[+a-z0-9A-Z_-]{0,63}$/)){var O=A.slice(0,k),M=A.slice(k+1),P=T.match(/^([+a-z0-9A-Z_-]{0,63})(.*)$/);P&&(O.push(P[1]),M.unshift(P[2])),M.length&&(s="/"+M.join(".")+s),this.hostname=O.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),B||(this.hostname=u.toASCII(this.hostname));var j=this.port?":"+this.port:"",H=this.hostname||"";this.host=H+j,this.href+=this.host,B&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==s[0]&&(s="/"+s))}if(!_[l])for(var k=0,C=m.length;k<C;k++){var N=m[k];if(-1!==s.indexOf(N)){var q=encodeURIComponent(N);q===N&&(q=escape(N)),s=s.split(N).join(q)}}var D=s.indexOf("#");-1!==D&&(this.hash=s.substr(D),s=s.slice(0,D));var W=s.indexOf("?");if(-1!==W?(this.search=s.substr(W),this.query=s.substr(W+1),t&&(this.query=w.parse(this.query)),s=s.slice(0,W)):t&&(this.search="",this.query={}),s&&(this.pathname=s),b[l]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var j=this.pathname||"",z=this.search||"";this.path=j+z}return this.href=this.format(),this},r.prototype.format=function(){var e=this.auth||"";e&&(e=encodeURIComponent(e),e=e.replace(/%3A/i,":"),e+="@");var t=this.protocol||"",n=this.pathname||"",r=this.hash||"",o=!1,i="";this.host?o=e+this.host:this.hostname&&(o=e+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(o+=":"+this.port)),this.query&&c.isObject(this.query)&&Object.keys(this.query).length&&(i=w.stringify(this.query));var s=this.search||i&&"?"+i||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||b[t])&&!1!==o?(o="//"+(o||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),r&&"#"!==r.charAt(0)&&(r="#"+r),s&&"?"!==s.charAt(0)&&(s="?"+s),n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}),s=s.replace("#","%23"),t+o+n+s+r},r.prototype.resolve=function(e){return this.resolveObject(o(e,!1,!0)).format()},r.prototype.resolveObject=function(e){if(c.isString(e)){var t=new r;t.parse(e,!1,!0),e=t}for(var n=new r,o=Object.keys(this),i=0;i<o.length;i++){var s=o[i];n[s]=this[s]}if(n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol){for(var a=Object.keys(e),u=0;u<a.length;u++){var f=a[u];"protocol"!==f&&(n[f]=e[f])}return b[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(e.protocol&&e.protocol!==n.protocol){if(!b[e.protocol]){for(var d=Object.keys(e),h=0;h<d.length;h++){var l=d[h];n[l]=e[l]}return n.href=n.format(),n}if(n.protocol=e.protocol,e.host||v[e.protocol])n.pathname=e.pathname;else{for(var p=(e.pathname||"").split("/");p.length&&!(e.host=p.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==p[0]&&p.unshift(""),p.length<2&&p.unshift(""),n.pathname=p.join("/")}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var m=n.pathname||"",g=n.search||"";n.path=m+g}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var y=n.pathname&&"/"===n.pathname.charAt(0),_=e.host||e.pathname&&"/"===e.pathname.charAt(0),w=_||y||n.host&&e.pathname,E=w,k=n.pathname&&n.pathname.split("/")||[],p=e.pathname&&e.pathname.split("/")||[],x=n.protocol&&!b[n.protocol];if(x&&(n.hostname="",n.port=null,n.host&&(""===k[0]?k[0]=n.host:k.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===p[0]?p[0]=e.host:p.unshift(e.host)),e.host=null),w=w&&(""===p[0]||""===k[0])),_)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,k=p;else if(p.length)k||(k=[]),k.pop(),k=k.concat(p),n.search=e.search,n.query=e.query;else if(!c.isNullOrUndefined(e.search)){if(x){n.hostname=n.host=k.shift();var S=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");S&&(n.auth=S.shift(),n.host=n.hostname=S.shift())}return n.search=e.search,n.query=e.query,c.isNull(n.pathname)&&c.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!k.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var I=k.slice(-1)[0],B=(n.host||e.host||k.length>1)&&("."===I||".."===I)||""===I,A=0,C=k.length;C>=0;C--)I=k[C],"."===I?k.splice(C,1):".."===I?(k.splice(C,1),A++):A&&(k.splice(C,1),A--);if(!w&&!E)for(;A--;A)k.unshift("..");!w||""===k[0]||k[0]&&"/"===k[0].charAt(0)||k.unshift(""),B&&"/"!==k.join("/").substr(-1)&&k.push("");var T=""===k[0]||k[0]&&"/"===k[0].charAt(0);if(x){n.hostname=n.host=T?"":k.length?k.shift():"";var S=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");S&&(n.auth=S.shift(),n.host=n.hostname=S.shift())}return w=w||n.host&&k.length,w&&!T&&k.unshift(""),k.length?n.pathname=k.join("/"):(n.pathname=null,n.path=null),c.isNull(n.pathname)&&c.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var e=this.host,t=d.exec(e);t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}},{"./util":113,punycode:68,querystring:71}],113:[function(e,t,n){"use strict";t.exports={isString:function(e){return"string"==typeof e},isObject:function(e){return"object"==typeof e&&null!==e},isNull:function(e){return null===e},isNullOrUndefined:function(e){return null==e}}},{}],114:[function(e,t,n){var r=e("bencode"),o=e("bitfield"),i=e("safe-buffer").Buffer,s=e("debug")("ut_metadata"),a=e("events").EventEmitter,u=e("inherits"),c=e("simple-sha1"),f=1e3;t.exports=function(e){function t(t){a.call(this),this._wire=t,this._metadataComplete=!1,this._metadataSize=null,this._remainingRejects=null,this._fetching=!1,this._bitfield=new o(0,{grow:f}),i.isBuffer(e)&&this.setMetadata(e)}return u(t,a),t.prototype.name="ut_metadata",t.prototype.onHandshake=function(e,t,n){this._infoHash=e},t.prototype.onExtendedHandshake=function(e){return e.m&&e.m.ut_metadata?e.metadata_size?"number"!=typeof e.metadata_size||1e7<e.metadata_size||e.metadata_size<=0?this.emit("warning",new Error("Peer gave invalid metadata size")):(this._metadataSize=e.metadata_size,this._numPieces=Math.ceil(this._metadataSize/16384),this._remainingRejects=2*this._numPieces,void(this._fetching&&this._requestPieces())):this.emit("warning",new Error("Peer does not have metadata")):this.emit("warning",new Error("Peer does not support ut_metadata"))},t.prototype.onMessage=function(e){var t,n;try{var o=e.toString(),i=o.indexOf("ee")+2;t=r.decode(o.substring(0,i)),n=e.slice(i)}catch(e){return}switch(t.msg_type){case 0:this._onRequest(t.piece);break;case 1:this._onData(t.piece,n,t.total_size);break;case 2:this._onReject(t.piece)}},t.prototype.fetch=function(){this._metadataComplete||(this._fetching=!0,this._metadataSize&&this._requestPieces())},t.prototype.cancel=function(){this._fetching=!1},t.prototype.setMetadata=function(e){if(this._metadataComplete)return!0;s("set metadata");try{var t=r.decode(e).info;t&&(e=r.encode(t))}catch(e){}return(!this._infoHash||this._infoHash===c.sync(e))&&(this.cancel(),this.metadata=e,this._metadataComplete=!0,this._metadataSize=this.metadata.length,this._wire.extendedHandshake.metadata_size=this._metadataSize,this.emit("metadata",r.encode({info:r.decode(this.metadata)})),!0)},t.prototype._send=function(e,t){var n=r.encode(e);i.isBuffer(t)&&(n=i.concat([n,t])),this._wire.extended("ut_metadata",n)},t.prototype._request=function(e){this._send({msg_type:0,piece:e})},t.prototype._data=function(e,t,n){var r={msg_type:1,piece:e};"number"==typeof n&&(r.total_size=n),this._send(r,t)},t.prototype._reject=function(e){this._send({msg_type:2,piece:e})},t.prototype._onRequest=function(e){if(!this._metadataComplete)return void this._reject(e);var t=16384*e,n=t+16384;n>this._metadataSize&&(n=this._metadataSize);var r=this.metadata.slice(t,n);this._data(e,r,this._metadataSize)},t.prototype._onData=function(e,t,n){t.length>16384||(t.copy(this.metadata,16384*e),this._bitfield.set(e),this._checkDone())},t.prototype._onReject=function(e){this._remainingRejects>0&&this._fetching?(this._request(e),this._remainingRejects-=1):this.emit("warning",new Error('Peer sent "reject" too much'))},t.prototype._requestPieces=function(){this.metadata=i.alloc(this._metadataSize);for(var e=0;e<this._numPieces;e++)this._request(e)},t.prototype._checkDone=function(){for(var e=!0,t=0;t<this._numPieces;t++)if(!this._bitfield.get(t)){e=!1;break}if(e){this.setMetadata(this.metadata)||this._failedMetadata()}},t.prototype._failedMetadata=function(){this._bitfield=new o(0,{grow:f}),this._remainingRejects-=this._numPieces,this._remainingRejects>0?this._requestPieces():this.emit("warning",new Error("Peer sent invalid metadata"))},t}},{bencode:11,bitfield:13,debug:30,events:34,inherits:41,"safe-buffer":88,"simple-sha1":92}],115:[function(e,t,n){(function(e){function n(e,t){function n(){if(!o){if(r("throwDeprecation"))throw new Error(t);r("traceDeprecation")?console.trace(t):console.warn(t),o=!0}return e.apply(this,arguments)}if(r("noDeprecation"))return e;var o=!1;return n}function r(t){try{if(!e.localStorage)return!1}catch(e){return!1}var n=e.localStorage[t];return null!=n&&"true"===String(n).toLowerCase()}t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],116:[function(e,t,n){(function(n){function r(e){var t=this;a.call(t),t._tracks=[],t._fragmentSequence=1,t._file=e,t._decoder=null,t._findMoov(0)}function o(e,t){var n=this;n._entries=e,n._countName=t||"count",n._index=0,n._offset=0,n.value=n._entries[0]}function i(){return{version:0,flags:0,entries:[]}}var s=e("binary-search"),a=e("events").EventEmitter,u=e("inherits"),c=e("mp4-stream"),f=e("mp4-box-encoding"),d=e("range-slice-stream");t.exports=r,u(r,a),r.prototype._findMoov=function(e){var t=this;t._decoder&&t._decoder.destroy(),t._decoder=c.decode();var n=t._file.createReadStream({start:e});n.pipe(t._decoder),t._decoder.once("box",function(r){"moov"===r.type?t._decoder.decode(function(e){n.destroy();try{t._processMoov(e)}catch(e){e.message="Cannot parse mp4 file: "+e.message,t.emit("error",e)}}):(n.destroy(),t._findMoov(e+r.length))})},o.prototype.inc=function(){var e=this;e._offset++,e._offset>=e._entries[e._index][e._countName]&&(e._index++,e._offset=0),e.value=e._entries[e._index]},r.prototype._processMoov=function(e){var t=this,r=e.traks;t._tracks=[],t._hasVideo=!1,t._hasAudio=!1;for(var s=0;s<r.length;s++){var a,u,c=r[s],d=c.mdia.minf.stbl,h=d.stsd.entries[0],l=c.mdia.hdlr.handlerType;if("vide"===l&&"avc1"===h.type){if(t._hasVideo)continue;t._hasVideo=!0,a="avc1",h.avcC&&(a+="."+h.avcC.mimeCodec),u='video/mp4; codecs="'+a+'"'}else{if("soun"!==l||"mp4a"!==h.type)continue;if(t._hasAudio)continue;t._hasAudio=!0,a="mp4a",h.esds&&h.esds.mimeCodec&&(a+="."+h.esds.mimeCodec),u='audio/mp4; codecs="'+a+'"'}var p=[],m=0,g=0,y=0,_=0,v=0,b=0,w=new o(d.stts.entries),E=null;d.ctts&&(E=new o(d.ctts.entries));for(var k=0;;){var x=d.stsc.entries[v],S=d.stsz.entries[m],I=w.value.duration,B=E?E.value.compositionOffset:0,A=!0;if(d.stss&&(A=d.stss.entries[k]===m+1),p.push({size:S,duration:I,dts:b,presentationOffset:B,sync:A,offset:_+d.stco.entries[y]}),++m>=d.stsz.entries.length)break;if(g++,_+=S,g>=x.samplesPerChunk){g=0,_=0,y++;var C=d.stsc.entries[v+1];C&&y+1>=C.firstChunk&&v++}b+=I,w.inc(),E&&E.inc(),A&&k++}c.mdia.mdhd.duration=0,c.tkhd.duration=0;var T=x.sampleDescriptionId,L={type:"moov",mvhd:e.mvhd,traks:[{tkhd:c.tkhd,mdia:{mdhd:c.mdia.mdhd,hdlr:c.mdia.hdlr,elng:c.mdia.elng,minf:{vmhd:c.mdia.minf.vmhd,smhd:c.mdia.minf.smhd,dinf:c.mdia.minf.dinf,stbl:{stsd:d.stsd,stts:i(),ctts:i(),stsc:i(),stsz:i(),stco:i(),stss:i()}}}}],mvex:{mehd:{fragmentDuration:e.mvhd.duration},trexs:[{trackId:c.tkhd.trackId,defaultSampleDescriptionIndex:T,defaultSampleDuration:0,defaultSampleSize:0,defaultSampleFlags:0}]}};t._tracks.push({trackId:c.tkhd.trackId,timeScale:c.mdia.mdhd.timeScale,samples:p,currSample:null,currTime:null,moov:L,mime:u})}if(0===t._tracks.length)return void t.emit("error",new Error("no playable tracks"));e.mvhd.duration=0,t._ftyp={type:"ftyp",brand:"iso5",brandVersion:0,compatibleBrands:["iso5"]};var U=f.encode(t._ftyp),R=t._tracks.map(function(e){var t=f.encode(e.moov);return{mime:e.mime,init:n.concat([U,t])}});t.emit("ready",R)},r.prototype.seek=function(e){var t=this;if(!t._tracks)throw new Error("Not ready yet; wait for 'ready' event");t._fileStream&&(t._fileStream.destroy(),t._fileStream=null);var n=-1;if(t._tracks.map(function(r,o){function i(e){s.destroyed||s.box(e.moof,function(n){if(n)return t.emit("error",n);if(!s.destroyed){r.inStream.slice(e.ranges).pipe(s.mediaData(e.length,function(e){if(e)return t.emit("error",e);if(!s.destroyed){var n=t._generateFragment(o);if(!n)return s.finalize();i(n)}}))}})}r.outStream&&r.outStream.destroy(),r.inStream&&(r.inStream.destroy(),r.inStream=null);var s=r.outStream=c.encode(),a=t._generateFragment(o,e);if(!a)return s.finalize();(-1===n||a.ranges[0].start<n)&&(n=a.ranges[0].start),i(a)}),n>=0){var r=t._fileStream=t._file.createReadStream({start:n});t._tracks.forEach(function(e){e.inStream=new d(n,{highWaterMark:1e7}),r.pipe(e.inStream)})}return t._tracks.map(function(e){return e.outStream})},r.prototype._findSampleBefore=function(e,t){var n=this,r=n._tracks[e],o=Math.floor(r.timeScale*t),i=s(r.samples,o,function(e,t){return e.dts+e.presentationOffset-t});for(-1===i?i=0:i<0&&(i=-i-2);!r.samples[i].sync;)i--;return i};r.prototype._generateFragment=function(e,t){var n,r=this,o=r._tracks[e];if((n=void 0!==t?r._findSampleBefore(e,t):o.currSample)>=o.samples.length)return null;for(var i=o.samples[n].dts,s=0,a=[],u=n;u<o.samples.length;u++){var c=o.samples[u];if(c.sync&&c.dts-i>=1*o.timeScale)break;s+=c.size;var f=a.length-1;f<0||a[f].end!==c.offset?a.push({start:c.offset,end:c.offset+c.size}):a[f].end+=c.size}return o.currSample=u,{moof:r._generateMoof(e,n,u),ranges:a,length:s}},r.prototype._generateMoof=function(e,t,n){for(var r=this,o=r._tracks[e],i=[],s=t;s<n;s++){var a=o.samples[s];i.push({sampleDuration:a.duration,sampleSize:a.size,sampleFlags:a.sync?33554432:16842752,sampleCompositionTimeOffset:a.presentationOffset})}var u={type:"moof",mfhd:{sequenceNumber:r._fragmentSequence++},trafs:[{tfhd:{flags:131072,trackId:o.trackId},tfdt:{baseMediaDecodeTime:o.samples[t].dts},trun:{
flags:3841,dataOffset:8,entries:i}}]};return u.trafs[0].trun.dataOffset+=f.encodingLength(u),u}}).call(this,e("buffer").Buffer)},{"binary-search":12,buffer:24,events:34,inherits:41,"mp4-box-encoding":53,"mp4-stream":56,"range-slice-stream":74}],117:[function(e,t,n){function r(e,t,n){var i=this;if(!(this instanceof r))return new r(e,t,n);n=n||{},i.detailedError=null,i._elem=t,i._elemWrapper=new o(t),i._waitingFired=!1,i._trackMeta=null,i._file=e,i._tracks=null,"none"!==i._elem.preload&&i._createMuxer(),i._onError=function(e){i.detailedError=i._elemWrapper.detailedError,i.destroy()},i._onWaiting=function(){i._waitingFired=!0,i._muxer?i._tracks&&i._pump():i._createMuxer()},i._elem.addEventListener("waiting",i._onWaiting),i._elem.addEventListener("error",i._onError)}var o=e("mediasource"),i=e("pump"),s=e("./mp4-remuxer");t.exports=r,r.prototype._createMuxer=function(){var e=this;e._muxer=new s(e._file),e._muxer.on("ready",function(t){e._tracks=t.map(function(t){var n=e._elemWrapper.createWriteStream(t.mime);n.on("error",function(t){e._elemWrapper.error(t)});var r={muxed:null,mediaSource:n,initFlushed:!1,onInitFlushed:null};return n.write(t.init,function(e){r.initFlushed=!0,r.onInitFlushed&&r.onInitFlushed(e)}),r}),(e._waitingFired||"auto"===e._elem.preload)&&e._pump()}),e._muxer.on("error",function(t){e._elemWrapper.error(t)})},r.prototype._pump=function(){var e=this,t=e._muxer.seek(e._elem.currentTime,!e._tracks);e._tracks.forEach(function(n,r){var o=function(){n.muxed&&(n.muxed.destroy(),n.mediaSource=e._elemWrapper.createWriteStream(n.mediaSource),n.mediaSource.on("error",function(t){e._elemWrapper.error(t)})),n.muxed=t[r],i(n.muxed,n.mediaSource)};n.initFlushed?o():n.onInitFlushed=function(t){if(t)return void e._elemWrapper.error(t);o()}})},r.prototype.destroy=function(){var e=this;e.destroyed||(e.destroyed=!0,e._elem.removeEventListener("waiting",e._onWaiting),e._elem.removeEventListener("error",e._onError),e._tracks&&e._tracks.forEach(function(e){e.muxed.destroy()}),e._elem.src="")}},{"./mp4-remuxer":116,mediasource:49,pump:67}],118:[function(e,t,n){function r(e,t){function n(){for(var t=new Array(arguments.length),n=0;n<t.length;n++)t[n]=arguments[n];var r=e.apply(this,t),o=t[t.length-1];return"function"==typeof r&&r!==o&&Object.keys(o).forEach(function(e){r[e]=o[e]}),r}if(e&&t)return r(e)(t);if("function"!=typeof e)throw new TypeError("need wrapper function");return Object.keys(e).forEach(function(t){n[t]=e[t]}),n}t.exports=r},{}],119:[function(e,t,n){function r(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t];for(var r in n)o.call(n,r)&&(e[r]=n[r])}return e}t.exports=r;var o=Object.prototype.hasOwnProperty},{}],120:[function(e,t,n){function r(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)o.call(n,r)&&(e[r]=n[r])}return e}t.exports=r;var o=Object.prototype.hasOwnProperty},{}],121:[function(e,t,n){t.exports=function e(t,n,r){return void 0===n?function(n,r){return e(t,n,r)}:(void 0===r&&(r="0"),t-=n.toString().length,t>0?new Array(t+(/\./.test(n)?2:1)).join(r)+n:n+"")}},{}],122:[function(e,t,n){t.exports={version:"0.98.18"}},{}],123:[function(e,t,n){(function(n,r){function o(e){function t(){i.destroyed||(i.ready=!0,i.emit("ready"))}var i=this;if(!(i instanceof o))return new o(e);h.call(i),e||(e={}),"string"==typeof e.peerId?i.peerId=e.peerId:a.isBuffer(e.peerId)?i.peerId=e.peerId.toString("hex"):i.peerId=a.from(B+b(9).toString("base64")).toString("hex"),i.peerIdBuffer=a.from(i.peerId,"hex"),"string"==typeof e.nodeId?i.nodeId=e.nodeId:a.isBuffer(e.nodeId)?i.nodeId=e.nodeId.toString("hex"):i.nodeId=b(20).toString("hex"),i.nodeIdBuffer=a.from(i.nodeId,"hex"),i._debugId=i.peerId.toString("hex").substring(0,7),i.destroyed=!1,i.listening=!1,i.torrentPort=e.torrentPort||0,i.dhtPort=e.dhtPort||0,i.tracker=void 0!==e.tracker?e.tracker:{},i.torrents=[],i.maxConns=Number(e.maxConns)||55,i._debug("new webtorrent (peerId %s, nodeId %s, port %s)",i.peerId,i.nodeId,i.torrentPort),i.tracker&&("object"!=typeof i.tracker&&(i.tracker={}),e.rtcConfig&&(console.warn("WebTorrent: opts.rtcConfig is deprecated. Use opts.tracker.rtcConfig instead"),i.tracker.rtcConfig=e.rtcConfig),e.wrtc&&(console.warn("WebTorrent: opts.wrtc is deprecated. Use opts.tracker.wrtc instead"),i.tracker.wrtc=e.wrtc),r.WRTC&&!i.tracker.wrtc&&(i.tracker.wrtc=r.WRTC)),"function"==typeof k?i._tcpPool=new k(i):n.nextTick(function(){i._onListening()}),i._downloadSpeed=w(),i._uploadSpeed=w(),!1!==e.dht&&"function"==typeof d?(i.dht=new d(l({nodeId:i.nodeId},e.dht)),i.dht.once("error",function(e){i._destroy(e)}),i.dht.once("listening",function(){var e=i.dht.address();e&&(i.dhtPort=e.port)}),i.dht.setMaxListeners(0),i.dht.listen(i.dhtPort)):i.dht=!1,i.enableWebSeeds=!1!==e.webSeeds,"function"==typeof m&&null!=e.blocklist?m(e.blocklist,{headers:{"user-agent":"WebTorrent/"+S+" (https://webtorrent.io)"}},function(e,n){if(e)return i.error("Failed to load blocklist: "+e.message);i.blocked=n,t()}):n.nextTick(t)}function i(e){return"object"==typeof e&&null!=e&&"function"==typeof e.pipe}function s(e){return"undefined"!=typeof FileList&&e instanceof FileList}t.exports=o;var a=e("safe-buffer").Buffer,u=e("simple-concat"),c=e("create-torrent"),f=e("debug")("webtorrent"),d=e("bittorrent-dht/client"),h=e("events").EventEmitter,l=e("xtend"),p=e("inherits"),m=e("load-ip-set"),g=e("run-parallel"),y=e("parse-torrent"),_=e("path"),v=e("simple-peer"),b=e("randombytes"),w=e("speedometer"),E=e("zero-fill"),k=e("./lib/tcp-pool"),x=e("./lib/torrent"),S=e("./package.json").version,I=S.match(/([0-9]+)/g).slice(0,2).map(function(e){return E(2,e)}).join(""),B="-WW"+I+"-";p(o,h),o.WEBRTC_SUPPORT=v.WEBRTC_SUPPORT,Object.defineProperty(o.prototype,"downloadSpeed",{get:function(){return this._downloadSpeed()}}),Object.defineProperty(o.prototype,"uploadSpeed",{get:function(){return this._uploadSpeed()}}),Object.defineProperty(o.prototype,"progress",{get:function(){var e=this.torrents.filter(function(e){return 1!==e.progress});return e.reduce(function(e,t){return e+t.downloaded},0)/(e.reduce(function(e,t){return e+(t.length||0)},0)||1)}}),Object.defineProperty(o.prototype,"ratio",{get:function(){return this.torrents.reduce(function(e,t){return e+t.uploaded},0)/(this.torrents.reduce(function(e,t){return e+t.received},0)||1)}}),o.prototype.get=function(e){var t,n,r=this,o=r.torrents.length;if(e instanceof x){for(t=0;t<o;t++)if((n=r.torrents[t])===e)return n}else{var i;try{i=y(e)}catch(e){}if(!i)return null;if(!i.infoHash)throw new Error("Invalid torrent identifier");for(t=0;t<o;t++)if(n=r.torrents[t],n.infoHash===i.infoHash)return n}return null},o.prototype.download=function(e,t,n){return console.warn("WebTorrent: client.download() is deprecated. Use client.add() instead"),this.add(e,t,n)},o.prototype.add=function(e,t,n){function r(){if(!s.destroyed)for(var e=0,t=s.torrents.length;e<t;e++){var n=s.torrents[e];if(n.infoHash===a.infoHash&&n!==a)return void a._destroy(new Error("Cannot add duplicate torrent "+a.infoHash))}}function o(){s.destroyed||("function"==typeof n&&n(a),s.emit("torrent",a))}function i(){a.removeListener("_infoHash",r),a.removeListener("ready",o),a.removeListener("close",i)}var s=this;if(s.destroyed)throw new Error("client is destroyed");if("function"==typeof t)return s.add(e,null,t);s._debug("add"),t=t?l(t):{};var a=new x(e,s,t);return s.torrents.push(a),a.once("_infoHash",r),a.once("ready",o),a.once("close",i),a},o.prototype.seed=function(e,t,n){function r(e){var t=[function(t){e.load(f,t)}];a.dht&&t.push(function(t){e.once("dhtAnnounce",t)}),g(t,function(t){if(!a.destroyed)return t?e._destroy(t):void o(e)})}function o(e){a._debug("on seed"),"function"==typeof n&&n(e),e.emit("seed"),a.emit("seed",e)}var a=this;if(a.destroyed)throw new Error("client is destroyed");if("function"==typeof t)return a.seed(e,null,t);a._debug("seed"),t=t?l(t):{},"string"==typeof e&&(t.path=_.dirname(e)),t.createdBy||(t.createdBy="WebTorrent/"+I);var f,d=a.add(null,t,r);return s(e)&&(e=Array.prototype.slice.call(e)),Array.isArray(e)||(e=[e]),g(e.map(function(e){return function(t){i(e)?u(e,t):t(null,e)}}),function(e,n){if(!a.destroyed)return e?d._destroy(e):void c.parseInput(n,t,function(e,r){if(!a.destroyed){if(e)return d._destroy(e);f=r.map(function(e){return e.getStream}),c(n,t,function(e,t){if(!a.destroyed){if(e)return d._destroy(e);var n=a.get(t);n?d._destroy(new Error("Cannot add duplicate torrent "+n.infoHash)):d._onTorrentId(t)}})}})}),d},o.prototype.remove=function(e,t){if(this._debug("remove"),!this.get(e))throw new Error("No torrent with id "+e);this._remove(e,t)},o.prototype._remove=function(e,t){var n=this.get(e);n&&(this.torrents.splice(this.torrents.indexOf(n),1),n.destroy(t))},o.prototype.address=function(){return this.listening?this._tcpPool?this._tcpPool.server.address():{address:"0.0.0.0",family:"IPv4",port:0}:null},o.prototype.destroy=function(e){if(this.destroyed)throw new Error("client already destroyed");this._destroy(null,e)},o.prototype._destroy=function(e,t){var n=this;n._debug("client destroy"),n.destroyed=!0;var r=n.torrents.map(function(e){return function(t){e.destroy(t)}});n._tcpPool&&r.push(function(e){n._tcpPool.destroy(e)}),n.dht&&r.push(function(e){n.dht.destroy(e)}),g(r,t),e&&n.emit("error",e),n.torrents=[],n._tcpPool=null,n.dht=null},o.prototype._onListening=function(){if(this._debug("listening"),this.listening=!0,this._tcpPool){var e=this._tcpPool.server.address();e&&(this.torrentPort=e.port)}this.emit("listening")},o.prototype._debug=function(){var e=[].slice.call(arguments);e[0]="["+this._debugId+"] "+e[0],f.apply(null,e)}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/tcp-pool":21,"./lib/torrent":5,"./package.json":122,_process:66,"bittorrent-dht/client":21,"create-torrent":29,debug:30,events:34,inherits:41,"load-ip-set":21,"parse-torrent":62,path:63,randombytes:73,"run-parallel":86,"safe-buffer":88,"simple-concat":89,"simple-peer":91,speedometer:94,xtend:119,"zero-fill":121}]},{},[123])(123)});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ })

/******/ });
//# sourceMappingURL=app.js.map