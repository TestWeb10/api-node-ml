"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCalendar = exports.deleteRoutesBySpecificDate = exports.deleteRoutesByDate = exports.deleteInvoicesByDate = exports.deleteFigureTransport = exports.deleteAutoTransport = exports.addRoutesByDate = exports.addFigureTransport = exports.addAutoTransport = void 0;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/* 
Estructura:
    {
        calendar: [
            {
                "<date>",
                "routes": [
                    "<route_id>",
                    ...
                ]
            },
            ...
        ]
    }
*/

var setCalendar = exports.setCalendar = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var calendar, _req$decodedJwtToken, userId, mlToken, sicofiToken, jwtToken, _req$userData, user, usersModel, updatedUser;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          calendar = req.body.calendar;
          if (!calendar) {
            _context.next = 21;
            break;
          }
          _req$decodedJwtToken = req.decodedJwtToken, userId = _req$decodedJwtToken.userId, mlToken = _req$decodedJwtToken.mlToken, sicofiToken = _req$decodedJwtToken.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData = req.userData, user = _req$userData.user, usersModel = _req$userData.usersModel;
          _context.prev = 5;
          _context.next = 8;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "calendar": calendar
          }, {
            "new": true
          }).select({
            "_id": 0,
            "calendar": 1
          });
        case 8:
          updatedUser = _context.sent;
          if (!updatedUser) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            error: "",
            message: "La operacion fue exitosa en la base de datos.",
            calendar: updatedUser.calendar
          }));
        case 13:
          return _context.abrupt("return", res.status(400).json({
            error: "",
            message: "La operacion no fue exitosa en la base de datos."
          }));
        case 14:
          _context.next = 19;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", res.status(409).json({
            error: _context.t0,
            message: "Ha ocurrido un problema en la base de datos."
          }));
        case 19:
          _context.next = 22;
          break;
        case 21:
          return _context.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 16]]);
  }));
  return function setCalendar(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/* 
Formato fecha:
    "AAAA-MM-DD"

Estructura:
    {
        date: "<date>",
        routes: [
            "<route_id>",
            ...
        ]
    }

    - Si la fecha no existe se agrega un elemento nuevo a la lista
    - Si la fecha existe entonces se sobreescribe dicho elemento
*/

var addRoutesByDate = exports.addRoutesByDate = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, replace, date, routes, _req$decodedJwtToken2, userId, mlToken, sicofiToken, jwtToken, _req$userData2, user, usersModel, updatedUser, oldRegistries, newRoutes;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, replace = _req$body.replace, date = _req$body.date, routes = _req$body.routes;
          if (!(date && routes)) {
            _context2.next = 40;
            break;
          }
          _req$decodedJwtToken2 = req.decodedJwtToken, userId = _req$decodedJwtToken2.userId, mlToken = _req$decodedJwtToken2.mlToken, sicofiToken = _req$decodedJwtToken2.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData2 = req.userData, user = _req$userData2.user, usersModel = _req$userData2.usersModel;
          _context2.prev = 5;
          if (!replace) {
            _context2.next = 16;
            break;
          }
          _context2.next = 9;
          return usersModel.findOneAndUpdate({
            "_id": userId,
            "calendar.date": date
          }, {
            "$set": {
              "calendar.$.routes": routes
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "calendar": 1
          });
        case 9:
          updatedUser = _context2.sent;
          if (updatedUser) {
            _context2.next = 14;
            break;
          }
          _context2.next = 13;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "$push": {
              "calendar": {
                "date": date,
                "routes": routes
              }
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "calendar": 1
          });
        case 13:
          updatedUser = _context2.sent;
        case 14:
          _context2.next = 28;
          break;
        case 16:
          oldRegistries = user.calendar.filter(function (elem) {
            return elem.date == date;
          });
          if (!(oldRegistries.length == 0)) {
            _context2.next = 23;
            break;
          }
          _context2.next = 20;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "$push": {
              "calendar": {
                "date": date,
                "routes": routes
              }
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "calendar": 1
          });
        case 20:
          updatedUser = _context2.sent;
          _context2.next = 28;
          break;
        case 23:
          // Significa que ya existe un registro, por tanto solo expandimos la lista de rutas
          newRoutes = oldRegistries[0].routes;
          newRoutes.push.apply(newRoutes, _toConsumableArray(routes));
          _context2.next = 27;
          return usersModel.findOneAndUpdate({
            "_id": userId,
            "calendar.date": date
          }, {
            "$set": {
              "calendar.$.routes": newRoutes
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "calendar": 1
          });
        case 27:
          updatedUser = _context2.sent;
        case 28:
          if (!updatedUser) {
            _context2.next = 32;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            error: "",
            message: "La operacion fue exitosa en la base de datos.",
            calendar: updatedUser.calendar
          }));
        case 32:
          return _context2.abrupt("return", res.status(400).json({
            error: "",
            message: "La operacion no fue exitosa en la base de datos."
          }));
        case 33:
          _context2.next = 38;
          break;
        case 35:
          _context2.prev = 35;
          _context2.t0 = _context2["catch"](5);
          return _context2.abrupt("return", res.status(409).json({
            error: _context2.t0,
            message: "Ha ocurrido un problema en la base de datos."
          }));
        case 38:
          _context2.next = 41;
          break;
        case 40:
          return _context2.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 41:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 35]]);
  }));
  return function addRoutesByDate(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/* 
Se recibe hasta que fecha se elimina del calendario

Fecha que se recibe <= Fecha actual
*/

var deleteRoutesByDate = exports.deleteRoutesByDate = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var date, _req$decodedJwtToken3, userId, mlToken, sicofiToken, jwtToken, _req$userData3, user, usersModel, calendar, newCalendar, d, updatedUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          date = req.body.date;
          if (!date) {
            _context3.next = 25;
            break;
          }
          _req$decodedJwtToken3 = req.decodedJwtToken, userId = _req$decodedJwtToken3.userId, mlToken = _req$decodedJwtToken3.mlToken, sicofiToken = _req$decodedJwtToken3.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData3 = req.userData, user = _req$userData3.user, usersModel = _req$userData3.usersModel;
          _context3.prev = 5;
          calendar = user.calendar;
          newCalendar = [];
          d = new Date(date);
          calendar.forEach(function (element) {
            var ed = new Date(element.date);
            if (ed > d) {
              newCalendar.push(element);
            }
          });
          _context3.next = 12;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "calendar": newCalendar
          }, {
            "new": true
          }).select({
            "_id": 0,
            "calendar": 1
          });
        case 12:
          updatedUser = _context3.sent;
          if (!updatedUser) {
            _context3.next = 17;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            error: "",
            message: "La operacion fue exitosa en la base de datos.",
            calendar: updatedUser.calendar
          }));
        case 17:
          return _context3.abrupt("return", res.status(400).json({
            error: "",
            message: "La operacion no fue exitosa en la base de datos."
          }));
        case 18:
          _context3.next = 23;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](5);
          return _context3.abrupt("return", res.status(409).json({
            error: _context3.t0,
            message: "Ha ocurrido un problema en la base de datos."
          }));
        case 23:
          _context3.next = 26;
          break;
        case 25:
          return _context3.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 26:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[5, 20]]);
  }));
  return function deleteRoutesByDate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/* 
Se recibe la fecha a eliminar
*/

var deleteRoutesBySpecificDate = exports.deleteRoutesBySpecificDate = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var date, _req$decodedJwtToken4, userId, mlToken, sicofiToken, jwtToken, _req$userData4, user, usersModel, newCalendar, updatedUser;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          date = req.body.date;
          if (!date) {
            _context4.next = 22;
            break;
          }
          _req$decodedJwtToken4 = req.decodedJwtToken, userId = _req$decodedJwtToken4.userId, mlToken = _req$decodedJwtToken4.mlToken, sicofiToken = _req$decodedJwtToken4.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData4 = req.userData, user = _req$userData4.user, usersModel = _req$userData4.usersModel;
          _context4.prev = 5;
          newCalendar = user.calendar.filter(function (elem) {
            return elem.date != date;
          });
          _context4.next = 9;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "calendar": newCalendar
          }, {
            "new": true
          }).select({
            "_id": 0,
            "calendar": 1
          });
        case 9:
          updatedUser = _context4.sent;
          if (!updatedUser) {
            _context4.next = 14;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            error: "",
            message: "La operacion fue exitosa en la base de datos.",
            calendar: updatedUser.calendar
          }));
        case 14:
          return _context4.abrupt("return", res.status(400).json({
            error: "",
            message: "La operacion no fue exitosa en la base de datos."
          }));
        case 15:
          _context4.next = 20;
          break;
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](5);
          return _context4.abrupt("return", res.status(409).json({
            error: _context4.t0,
            message: "Ha ocurrido un problema en la base de datos."
          }));
        case 20:
          _context4.next = 23;
          break;
        case 22:
          return _context4.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 17]]);
  }));
  return function deleteRoutesBySpecificDate(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/* 
Se recibe hasta que fecha se elimina del calendario

Fecha que se recibe <= Fecha actual
*/
var deleteInvoicesByDate = exports.deleteInvoicesByDate = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var date, _req$decodedJwtToken5, userId, mlToken, sicofiToken, jwtToken, _req$userData5, user, usersModel, invoices, newInvoices, d, updatedUser;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          date = req.body.date;
          if (!date) {
            _context5.next = 25;
            break;
          }
          _req$decodedJwtToken5 = req.decodedJwtToken, userId = _req$decodedJwtToken5.userId, mlToken = _req$decodedJwtToken5.mlToken, sicofiToken = _req$decodedJwtToken5.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData5 = req.userData, user = _req$userData5.user, usersModel = _req$userData5.usersModel;
          _context5.prev = 5;
          invoices = user.invoices;
          newInvoices = [];
          d = new Date(date);
          invoices.forEach(function (element) {
            var initialDate = new Date(element.initial_date);
            var finalDate = new Date(element.final_date);
            if (initialDate > d && finalDate > d) {
              newInvoices.push(element);
            }
          });
          _context5.next = 12;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "invoices": newInvoices
          }, {
            "new": true
          }).select({
            "_id": 0,
            "invoices": 1
          });
        case 12:
          updatedUser = _context5.sent;
          if (!updatedUser) {
            _context5.next = 17;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            error: "",
            message: "La operacion fue exitosa en la base de datos.",
            invoices: updatedUser.invoices
          }));
        case 17:
          return _context5.abrupt("return", res.status(400).json({
            error: "",
            message: "La operacion no fue exitosa en la base de datos."
          }));
        case 18:
          _context5.next = 23;
          break;
        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](5);
          return _context5.abrupt("return", res.status(409).json({
            error: _context5.t0,
            message: "Ha ocurrido un problema en la base de datos."
          }));
        case 23:
          _context5.next = 26;
          break;
        case 25:
          return _context5.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[5, 20]]);
  }));
  return function deleteInvoicesByDate(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/* 
Estructura:
    Todo de tipo STRING

    {
        "oldName": "Auto transport 2 new",              // Opcional (para actualizar)
        "name": "Auto transport 2 new new",
        "permsct": "TPXX00",
        "numpermisosct": "XX00",
        "IdentificacionVehicularCartaPorte30": {
            "configvehicular": "VL",
            "placavm": "NB4712B",
            "aniomodelovm": "2009",
            "PesoBrutoVehicular": "3500.00"
        },
        "Seguros": {
            "asegurarespcivil": "GENERAL DE SEGUROS",
            "polizarespcivil": "1/721/62143"
        }
    }
*/

var addAutoTransport = exports.addAutoTransport = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body2, oldName, name, permsct, numpermisosct, IdentificacionVehicularCartaPorte30, Seguros, _req$decodedJwtToken6, userId, mlToken, sicofiToken, jwtToken, _req$userData6, user, usersModel, obj, updatedUser;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, oldName = _req$body2.oldName, name = _req$body2.name, permsct = _req$body2.permsct, numpermisosct = _req$body2.numpermisosct, IdentificacionVehicularCartaPorte30 = _req$body2.IdentificacionVehicularCartaPorte30, Seguros = _req$body2.Seguros;
          if (!(name, permsct && numpermisosct && IdentificacionVehicularCartaPorte30 && Seguros)) {
            _context6.next = 42;
            break;
          }
          _req$decodedJwtToken6 = req.decodedJwtToken, userId = _req$decodedJwtToken6.userId, mlToken = _req$decodedJwtToken6.mlToken, sicofiToken = _req$decodedJwtToken6.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData6 = req.userData, user = _req$userData6.user, usersModel = _req$userData6.usersModel;
          obj = {
            name: name,
            permsct: permsct,
            numpermisosct: numpermisosct,
            IdentificacionVehicularCartaPorte30: IdentificacionVehicularCartaPorte30,
            Seguros: Seguros
          };
          _context6.prev = 6;
          if (!oldName) {
            _context6.next = 23;
            break;
          }
          if (!(oldName == name)) {
            _context6.next = 14;
            break;
          }
          _context6.next = 11;
          return usersModel.findOneAndUpdate({
            "_id": userId,
            "auto_transport.name": oldName
          }, {
            "$set": {
              "auto_transport.$": obj
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "auto_transport": 1
          });
        case 11:
          updatedUser = _context6.sent;
          _context6.next = 21;
          break;
        case 14:
          if (!(user.auto_transport.filter(function (elem) {
            return elem.name == name;
          }).length == 0)) {
            _context6.next = 20;
            break;
          }
          _context6.next = 17;
          return usersModel.findOneAndUpdate({
            "_id": userId,
            "auto_transport.name": oldName
          }, {
            "$set": {
              "auto_transport.$": obj
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "auto_transport": 1
          });
        case 17:
          updatedUser = _context6.sent;
          _context6.next = 21;
          break;
        case 20:
          return _context6.abrupt("return", res.status(400).json({
            error: "",
            message: "El nombre '".concat(name, "' para el apartado 'auto transporte' ya existe. Favor de elegir otro nombre.")
          }));
        case 21:
          _context6.next = 30;
          break;
        case 23:
          if (!(user.auto_transport.filter(function (elem) {
            return elem.name == name;
          }).length == 0)) {
            _context6.next = 29;
            break;
          }
          _context6.next = 26;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "$push": {
              "auto_transport": obj
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "auto_transport": 1
          });
        case 26:
          updatedUser = _context6.sent;
          _context6.next = 30;
          break;
        case 29:
          return _context6.abrupt("return", res.status(400).json({
            error: "",
            message: "El nombre '".concat(name, "' para el apartado 'auto transporte' ya existe. Favor de elegir otro nombre.")
          }));
        case 30:
          if (!updatedUser) {
            _context6.next = 34;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            error: "",
            message: "La operacion fue exitosa en la base de datos.",
            auto_transport: updatedUser.auto_transport
          }));
        case 34:
          return _context6.abrupt("return", res.status(400).json({
            error: "",
            message: "La operacion no fue exitosa en la base de datos."
          }));
        case 35:
          _context6.next = 40;
          break;
        case 37:
          _context6.prev = 37;
          _context6.t0 = _context6["catch"](6);
          return _context6.abrupt("return", res.status(409).json({
            error: _context6.t0,
            message: "Ha ocurrido un problema en la base de datos."
          }));
        case 40:
          _context6.next = 43;
          break;
        case 42:
          return _context6.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 43:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[6, 37]]);
  }));
  return function addAutoTransport(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/* 
Estructura:
    Todo de tipo STRING

    {
        "name": "Auto transport"
    }
*/

var deleteAutoTransport = exports.deleteAutoTransport = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var name, _req$decodedJwtToken7, userId, mlToken, sicofiToken, jwtToken, _req$userData7, user, usersModel, newAutoTransport, deleteddUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          name = req.body.name;
          if (!name) {
            _context7.next = 26;
            break;
          }
          _req$decodedJwtToken7 = req.decodedJwtToken, userId = _req$decodedJwtToken7.userId, mlToken = _req$decodedJwtToken7.mlToken, sicofiToken = _req$decodedJwtToken7.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData7 = req.userData, user = _req$userData7.user, usersModel = _req$userData7.usersModel;
          newAutoTransport = user.auto_transport.filter(function (elem) {
            return elem.name != name;
          });
          if (!(newAutoTransport.length != user.auto_transport.length)) {
            _context7.next = 23;
            break;
          }
          _context7.prev = 7;
          _context7.next = 10;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "auto_transport": newAutoTransport
          }, {
            "new": true
          }).select({
            "_id": 0,
            "auto_transport": 1
          });
        case 10:
          deleteddUser = _context7.sent;
          if (!deleteddUser) {
            _context7.next = 15;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            error: "",
            message: "La operacion fue exitosa en la base de datos.",
            auto_transport: deleteddUser.auto_transport
          }));
        case 15:
          return _context7.abrupt("return", res.status(400).json({
            error: "",
            message: "La operacion no fue exitosa en la base de datos."
          }));
        case 16:
          _context7.next = 21;
          break;
        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](7);
          return _context7.abrupt("return", res.status(409).json({
            error: _context7.t0,
            message: "Ha ocurrido un problema en la base de datos."
          }));
        case 21:
          _context7.next = 24;
          break;
        case 23:
          return _context7.abrupt("return", res.status(400).json({
            error: "",
            message: "El nombre '".concat(name, "' para el apartado 'auto transporte' no existe.")
          }));
        case 24:
          _context7.next = 27;
          break;
        case 26:
          return _context7.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 27:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[7, 18]]);
  }));
  return function deleteAutoTransport(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

/* 
Estructura:
    Todo de tipo STRING

    {
        "oldRfcfigura": "123456789123",                // Opcional (para actualizar)
        "tipofigura": "01",
        "rfcfigura": "123456789123",
        "numlicencia": "1236547890",
        "nombrefigura": "Juan Perez"
    }
*/

var addFigureTransport = exports.addFigureTransport = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body3, oldRfcfigura, tipofigura, rfcfigura, numlicencia, nombrefigura, _req$decodedJwtToken8, userId, mlToken, sicofiToken, jwtToken, _req$userData8, user, usersModel, obj, updatedUser;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$body3 = req.body, oldRfcfigura = _req$body3.oldRfcfigura, tipofigura = _req$body3.tipofigura, rfcfigura = _req$body3.rfcfigura, numlicencia = _req$body3.numlicencia, nombrefigura = _req$body3.nombrefigura;
          if (!(tipofigura && rfcfigura && numlicencia && nombrefigura)) {
            _context8.next = 42;
            break;
          }
          _req$decodedJwtToken8 = req.decodedJwtToken, userId = _req$decodedJwtToken8.userId, mlToken = _req$decodedJwtToken8.mlToken, sicofiToken = _req$decodedJwtToken8.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData8 = req.userData, user = _req$userData8.user, usersModel = _req$userData8.usersModel;
          obj = {
            tipofigura: tipofigura,
            rfcfigura: rfcfigura,
            numlicencia: numlicencia,
            nombrefigura: nombrefigura
          };
          _context8.prev = 6;
          if (!oldRfcfigura) {
            _context8.next = 23;
            break;
          }
          if (!(oldRfcfigura == rfcfigura)) {
            _context8.next = 14;
            break;
          }
          _context8.next = 11;
          return usersModel.findOneAndUpdate({
            "_id": userId,
            "figure_transport.rfcfigura": oldRfcfigura
          }, {
            "$set": {
              "figure_transport.$": obj
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "figure_transport": 1
          });
        case 11:
          updatedUser = _context8.sent;
          _context8.next = 21;
          break;
        case 14:
          if (!(user.figure_transport.filter(function (elem) {
            return elem.rfcfigura == rfcfigura;
          }).length == 0)) {
            _context8.next = 20;
            break;
          }
          _context8.next = 17;
          return usersModel.findOneAndUpdate({
            "_id": userId,
            "figure_transport.rfcfigura": oldRfcfigura
          }, {
            "$set": {
              "figure_transport.$": obj
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "figure_transport": 1
          });
        case 17:
          updatedUser = _context8.sent;
          _context8.next = 21;
          break;
        case 20:
          return _context8.abrupt("return", res.status(400).json({
            error: "",
            message: "El RFC '".concat(rfcfigura, "' para el apartado 'figura transporte' ya existe.")
          }));
        case 21:
          _context8.next = 30;
          break;
        case 23:
          if (!(user.figure_transport.filter(function (elem) {
            return elem.rfcfigura == rfcfigura;
          }).length == 0)) {
            _context8.next = 29;
            break;
          }
          _context8.next = 26;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "$push": {
              "figure_transport": obj
            }
          }, {
            "new": true
          }).select({
            "_id": 0,
            "figure_transport": 1
          });
        case 26:
          updatedUser = _context8.sent;
          _context8.next = 30;
          break;
        case 29:
          return _context8.abrupt("return", res.status(400).json({
            error: "",
            message: "El RFC '".concat(rfcfigura, "' para el apartado 'figura transporte' ya existe.")
          }));
        case 30:
          if (!updatedUser) {
            _context8.next = 34;
            break;
          }
          return _context8.abrupt("return", res.status(200).json({
            error: "",
            message: "La operacion fue exitosa en la base de datos.",
            figure_transport: updatedUser.figure_transport
          }));
        case 34:
          return _context8.abrupt("return", res.status(400).json({
            error: "",
            message: "La operacion no fue exitosa en la base de datos."
          }));
        case 35:
          _context8.next = 40;
          break;
        case 37:
          _context8.prev = 37;
          _context8.t0 = _context8["catch"](6);
          return _context8.abrupt("return", res.status(409).json({
            error: _context8.t0,
            message: "Ha ocurrido un problema en la base de datos."
          }));
        case 40:
          _context8.next = 43;
          break;
        case 42:
          return _context8.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 43:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[6, 37]]);
  }));
  return function addFigureTransport(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

/* 
Estructura:
    Todo de tipo STRING

    {
        "rfcfigura": "123456789123",
    }
*/

var deleteFigureTransport = exports.deleteFigureTransport = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var rfcfigura, _req$decodedJwtToken9, userId, mlToken, sicofiToken, jwtToken, _req$userData9, user, usersModel, newFigureTransport, deleteddUser;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          rfcfigura = req.body.rfcfigura;
          if (!rfcfigura) {
            _context9.next = 26;
            break;
          }
          _req$decodedJwtToken9 = req.decodedJwtToken, userId = _req$decodedJwtToken9.userId, mlToken = _req$decodedJwtToken9.mlToken, sicofiToken = _req$decodedJwtToken9.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData9 = req.userData, user = _req$userData9.user, usersModel = _req$userData9.usersModel;
          newFigureTransport = user.figure_transport.filter(function (elem) {
            return elem.rfcfigura != rfcfigura;
          });
          if (!(newFigureTransport.length != user.figure_transport.length)) {
            _context9.next = 23;
            break;
          }
          _context9.prev = 7;
          _context9.next = 10;
          return usersModel.findOneAndUpdate({
            "_id": userId
          }, {
            "figure_transport": newFigureTransport
          }, {
            "new": true
          }).select({
            "_id": 0,
            "figure_transport": 1
          });
        case 10:
          deleteddUser = _context9.sent;
          if (!deleteddUser) {
            _context9.next = 15;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            error: "",
            message: "La operacion fue exitosa en la base de datos.",
            figure_transport: deleteddUser.figure_transport
          }));
        case 15:
          return _context9.abrupt("return", res.status(400).json({
            error: "",
            message: "La operacion no fue exitosa en la base de datos."
          }));
        case 16:
          _context9.next = 21;
          break;
        case 18:
          _context9.prev = 18;
          _context9.t0 = _context9["catch"](7);
          return _context9.abrupt("return", res.status(409).json({
            error: _context9.t0,
            message: "Ha ocurrido un problema en la base de datos."
          }));
        case 21:
          _context9.next = 24;
          break;
        case 23:
          return _context9.abrupt("return", res.status(400).json({
            error: "",
            message: "El RFC '".concat(rfcfigura, "' para el apartado 'figura transporte' no existe.")
          }));
        case 24:
          _context9.next = 27;
          break;
        case 26:
          return _context9.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 27:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[7, 18]]);
  }));
  return function deleteFigureTransport(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();