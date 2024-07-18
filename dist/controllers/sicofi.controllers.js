"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cfdiTrasladoCP = exports.cfdiTraslado = exports.cfdiIngresoCP = exports.cfdiIngreso = void 0;
var _Users = _interopRequireDefault(require("../models/Users"));
var _config = _interopRequireDefault(require("../config"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _crossFetch = _interopRequireDefault(require("cross-fetch"));
var _tokens = _interopRequireDefault(require("./tokens"));
var _formData = _interopRequireDefault(require("form-data"));
var _promises = _interopRequireDefault(require("fs/promises"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var cfdiTraslado = exports.cfdiTraslado = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI, _req$decodedJwtToken, userId, mlToken, sicofiToken, jwtToken, _req$userData, user, usersModel, userType, _loop, _ret, it;
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, invoiceInformation = _req$body.invoiceInformation, DatosCFDI = _req$body.DatosCFDI, ReceptorCFDI = _req$body.ReceptorCFDI, ConceptosCFDI = _req$body.ConceptosCFDI;
          if (!(invoiceInformation && DatosCFDI && ReceptorCFDI && ConceptosCFDI)) {
            _context2.next = 20;
            break;
          }
          _req$decodedJwtToken = req.decodedJwtToken, userId = _req$decodedJwtToken.userId, mlToken = _req$decodedJwtToken.mlToken, sicofiToken = _req$decodedJwtToken.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData = req.userData, user = _req$userData.user, usersModel = _req$userData.usersModel;
          userType = user.user_type;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var body, headers, URI, response, band, resJson, _message, invoiceText, obj, updatedUser, message;
            return _regeneratorRuntime().wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  body = {
                    'Usuario': _Users["default"].decodeUsernameSicofi(user.username_sic),
                    'Contrasena': _Users["default"].decodePasswordSicofi(user.password_sic)
                  };
                  body["DatosCFDI".concat(_config["default"].CFDI_VERSION)] = DatosCFDI;
                  body["ReceptorCFDI".concat(_config["default"].CFDI_VERSION)] = ReceptorCFDI;
                  body["ConceptosCFDI".concat(_config["default"].CFDI_VERSION)] = ConceptosCFDI;
                  headers = {
                    'Authorization': "Bearer " + sicofiToken,
                    'Content-Type': 'application/json'
                  };
                  URI = userType == "demo" ? _config["default"].URI_DEMO_SICOFI + _config["default"].URI_INVOICE : _config["default"].URI_PRODUCTION_SICOFI + _config["default"].URI_INVOICE;
                  _context.next = 9;
                  return (0, _crossFetch["default"])(URI, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                  });
                case 9:
                  response = _context.sent;
                  // Para guardar el contenido de la peticion
                  // try {
                  //     await fs.writeFile(`/home/chuy/Descargas/${userType}_traslado_body.json`, JSON.stringify(body));
                  //     console.log(`URI: ${URI}`);
                  //     console.log(`(${userType}) Saved traslado body`);
                  // } catch (err) {
                  //     console.log(err);
                  // }
                  band = false;
                  if (!(response.status == 401 && it == 0)) {
                    _context.next = 17;
                    break;
                  }
                  _context.next = 14;
                  return _tokens["default"].getSicofiToken(_Users["default"].decodeUsernameSicofi(user.username_sic), _Users["default"].decodePasswordSicofi(user.password_sic), userType);
                case 14:
                  sicofiToken = _context.sent;
                  jwtToken = _jsonwebtoken["default"].sign({
                    userId: userId,
                    mlToken: mlToken,
                    sicofiToken: sicofiToken
                  }, _config["default"].JWT_SECRET, {
                    expiresIn: "1d"
                  });
                  band = true;
                case 17:
                  if (!(band && it == 0)) {
                    _context.next = 19;
                    break;
                  }
                  return _context.abrupt("return", 0);
                case 19:
                  if (!(response.status == 401)) {
                    _context.next = 21;
                    break;
                  }
                  return _context.abrupt("return", {
                    v: res.status(401).json({
                      error: "",
                      message: "Se ha vencido el token de 'Sicofi' y no fue posible renovarlo.",
                      jwtToken: jwtToken
                    })
                  });
                case 21:
                  if (!(response.status == 400)) {
                    _context.next = 29;
                    break;
                  }
                  _context.next = 24;
                  return response.json();
                case 24:
                  resJson = _context.sent;
                  // console.log(resJson);
                  _message = "Ha ocurrido un problema al realizar la peticion. Los datos enviados a Sicofi estan mal.";
                  if (resJson.errors) {
                    _message += "\n\nERRORES (Sicofi)";
                    Object.keys(resJson.errors).forEach(function (key) {
                      var descriptionErrors = resJson.errors[key];
                      _message += "\n".concat(key, ":");
                      descriptionErrors.forEach(function (description) {
                        _message += "\n\t * ".concat(description);
                      });
                    });
                  }
                  if (resJson.message) {
                    _message += "\n\nERRORES (Sicofi)\n".concat(resJson.message);
                  }
                  return _context.abrupt("return", {
                    v: res.status(400).json({
                      error: "",
                      message: _message,
                      jwtToken: jwtToken
                    })
                  });
                case 29:
                  if (!(response.status == 200)) {
                    _context.next = 44;
                    break;
                  }
                  _context.next = 32;
                  return response.text();
                case 32:
                  invoiceText = _context.sent;
                  _context.prev = 33;
                  obj = {
                    initial_date: invoiceInformation.initialDate,
                    final_date: invoiceInformation.finalDate,
                    subtotal: invoiceInformation.subtotal,
                    total_routes: invoiceInformation.totalRoutes
                  };
                  _context.next = 37;
                  return usersModel.findOneAndUpdate({
                    "_id": userId
                  }, {
                    "$push": {
                      "invoices": obj
                    }
                  }, {
                    "new": true
                  }).select({
                    "_id": 0,
                    "invoices": 1
                  });
                case 37:
                  updatedUser = _context.sent;
                  return _context.abrupt("return", {
                    v: res.status(200).json({
                      error: "",
                      message: "Los datos se enviaron correctamente a Sicofi. Ademas se ha guardado en la base de datos correctamente.",
                      jwtToken: jwtToken,
                      invoices: updatedUser.invoices,
                      invoiceText: invoiceText
                    })
                  });
                case 41:
                  _context.prev = 41;
                  _context.t0 = _context["catch"](33);
                  return _context.abrupt("return", {
                    v: res.status(200).json({
                      error: "",
                      message: "Los datos se enviaron correctamente a Sicofi. Con el inconveniente de que no fue posible guardar en la base de datos correctamente.",
                      jwtToken: jwtToken,
                      invoices: user.invoices
                    })
                  });
                case 44:
                  message = "La peticion no fue satisfactoria.";
                  if (response.status == 504) {
                    // Se agoto el tiempo (suele suceder cuando se envia mucha informacion o cuando Sicofi esta muy saturado, es decir, esta lento)
                    message += "\nSicofi ha rechazado la peticion.\nPuede ser que Sicofi este muy saturado o enviar menos informacion puede funcionar.";
                  }
                  return _context.abrupt("return", {
                    v: res.status(response.status).json({
                      error: "",
                      message: message,
                      jwtToken: jwtToken
                    })
                  });
                case 49:
                  _context.prev = 49;
                  _context.t1 = _context["catch"](0);
                  return _context.abrupt("return", {
                    v: res.status(400).json({
                      error: "",
                      message: "Ha ocurrido un problema al realizar la peticion.",
                      jwtToken: jwtToken
                    })
                  });
                case 52:
                case "end":
                  return _context.stop();
              }
            }, _loop, null, [[0, 49], [33, 41]]);
          });
          it = 0;
        case 8:
          if (!(it < 2)) {
            _context2.next = 18;
            break;
          }
          return _context2.delegateYield(_loop(), "t0", 10);
        case 10:
          _ret = _context2.t0;
          if (!(_ret === 0)) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("continue", 15);
        case 13:
          if (!_ret) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("return", _ret.v);
        case 15:
          it++;
          _context2.next = 8;
          break;
        case 18:
          _context2.next = 21;
          break;
        case 20:
          return _context2.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee);
  }));
  return function cfdiTraslado(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var cfdiIngreso = exports.cfdiIngreso = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI, _req$decodedJwtToken2, userId, mlToken, sicofiToken, jwtToken, _req$userData2, user, usersModel, userType, _loop2, _ret2, it;
    return _regeneratorRuntime().wrap(function _callee2$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, invoiceInformation = _req$body2.invoiceInformation, DatosCFDI = _req$body2.DatosCFDI, ReceptorCFDI = _req$body2.ReceptorCFDI, ConceptosCFDI = _req$body2.ConceptosCFDI;
          if (!(invoiceInformation && DatosCFDI && ReceptorCFDI && ConceptosCFDI)) {
            _context4.next = 20;
            break;
          }
          _req$decodedJwtToken2 = req.decodedJwtToken, userId = _req$decodedJwtToken2.userId, mlToken = _req$decodedJwtToken2.mlToken, sicofiToken = _req$decodedJwtToken2.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData2 = req.userData, user = _req$userData2.user, usersModel = _req$userData2.usersModel;
          userType = user.user_type;
          _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
            var body, headers, URI, response, band, resJson, _message2, invoiceText, obj, updatedUser, message;
            return _regeneratorRuntime().wrap(function _loop2$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  body = {
                    'Usuario': _Users["default"].decodeUsernameSicofi(user.username_sic),
                    'Contrasena': _Users["default"].decodePasswordSicofi(user.password_sic)
                  };
                  body["DatosCFDI".concat(_config["default"].CFDI_VERSION)] = DatosCFDI;
                  body["ReceptorCFDI".concat(_config["default"].CFDI_VERSION)] = ReceptorCFDI;
                  body["ConceptosCFDI".concat(_config["default"].CFDI_VERSION)] = ConceptosCFDI;
                  headers = {
                    'Authorization': "Bearer " + sicofiToken,
                    'Content-Type': 'application/json'
                  };
                  URI = userType == "demo" ? _config["default"].URI_DEMO_SICOFI + _config["default"].URI_INVOICE : _config["default"].URI_PRODUCTION_SICOFI + _config["default"].URI_INVOICE;
                  _context3.next = 9;
                  return (0, _crossFetch["default"])(URI, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                  });
                case 9:
                  response = _context3.sent;
                  // Para guardar el contenido de la peticion
                  // try {
                  //     await fs.writeFile(`/home/chuy/Descargas/${userType}_ingreso_body.json`, JSON.stringify(body));
                  //     console.log(`URI: ${URI}`);
                  //     console.log(`(${userType}) Saved ingreso body`);
                  // } catch (err) {
                  //     console.log(err);
                  // }
                  band = false;
                  if (!(response.status == 401 && it == 0)) {
                    _context3.next = 17;
                    break;
                  }
                  _context3.next = 14;
                  return _tokens["default"].getSicofiToken(_Users["default"].decodeUsernameSicofi(user.username_sic), _Users["default"].decodePasswordSicofi(user.password_sic), userType);
                case 14:
                  sicofiToken = _context3.sent;
                  jwtToken = _jsonwebtoken["default"].sign({
                    userId: userId,
                    mlToken: mlToken,
                    sicofiToken: sicofiToken
                  }, _config["default"].JWT_SECRET, {
                    expiresIn: "1d"
                  });
                  band = true;
                case 17:
                  if (!(band && it == 0)) {
                    _context3.next = 19;
                    break;
                  }
                  return _context3.abrupt("return", 0);
                case 19:
                  if (!(response.status == 401)) {
                    _context3.next = 21;
                    break;
                  }
                  return _context3.abrupt("return", {
                    v: res.status(401).json({
                      error: "",
                      message: "Se ha vencido el token de 'Sicofi' y no fue posible renovarlo.",
                      jwtToken: jwtToken
                    })
                  });
                case 21:
                  if (!(response.status == 400)) {
                    _context3.next = 29;
                    break;
                  }
                  _context3.next = 24;
                  return response.json();
                case 24:
                  resJson = _context3.sent;
                  // console.log(resJson);
                  _message2 = "Ha ocurrido un problema al realizar la peticion. Los datos enviados a Sicofi estan mal.";
                  if (resJson.errors) {
                    _message2 += "\n\nERRORES (Sicofi)";
                    Object.keys(resJson.errors).forEach(function (key) {
                      var descriptionErrors = resJson.errors[key];
                      _message2 += "\n".concat(key, ":");
                      descriptionErrors.forEach(function (description) {
                        _message2 += "\n\t * ".concat(description);
                      });
                    });
                  }
                  if (resJson.message) {
                    _message2 += "\n\nERRORES (Sicofi)\n".concat(resJson.message);
                  }
                  return _context3.abrupt("return", {
                    v: res.status(400).json({
                      error: "",
                      message: _message2,
                      jwtToken: jwtToken
                    })
                  });
                case 29:
                  if (!(response.status == 200)) {
                    _context3.next = 44;
                    break;
                  }
                  _context3.next = 32;
                  return response.text();
                case 32:
                  invoiceText = _context3.sent;
                  _context3.prev = 33;
                  obj = {
                    initial_date: invoiceInformation.initialDate,
                    final_date: invoiceInformation.finalDate,
                    subtotal: invoiceInformation.subtotal,
                    total_routes: invoiceInformation.totalRoutes
                  };
                  _context3.next = 37;
                  return usersModel.findOneAndUpdate({
                    "_id": userId
                  }, {
                    "$push": {
                      "invoices": obj
                    }
                  }, {
                    "new": true
                  }).select({
                    "_id": 0,
                    "invoices": 1
                  });
                case 37:
                  updatedUser = _context3.sent;
                  return _context3.abrupt("return", {
                    v: res.status(200).json({
                      error: "",
                      message: "Los datos se enviaron correctamente a Sicofi. Ademas se ha guardado en la base de datos correctamente.",
                      jwtToken: jwtToken,
                      invoices: updatedUser.invoices,
                      invoiceText: invoiceText
                    })
                  });
                case 41:
                  _context3.prev = 41;
                  _context3.t0 = _context3["catch"](33);
                  return _context3.abrupt("return", {
                    v: res.status(200).json({
                      error: "",
                      message: "Los datos se enviaron correctamente a Sicofi. Con el inconveniente de que no fue posible guardar en la base de datos correctamente.",
                      jwtToken: jwtToken,
                      invoices: user.invoices
                    })
                  });
                case 44:
                  message = "La peticion no fue satisfactoria.";
                  if (response.status == 504) {
                    // Se agoto el tiempo (suele suceder cuando se envia mucha informacion o cuando Sicofi esta muy saturado, es decir, esta lento)
                    message += "\nSicofi ha rechazado la peticion.\nPuede ser que Sicofi este muy saturado o enviar menos informacion puede funcionar.";
                  }
                  return _context3.abrupt("return", {
                    v: res.status(response.status).json({
                      error: "",
                      message: message,
                      jwtToken: jwtToken
                    })
                  });
                case 49:
                  _context3.prev = 49;
                  _context3.t1 = _context3["catch"](0);
                  console.log(_context3.t1);
                  return _context3.abrupt("return", {
                    v: res.status(400).json({
                      error: "",
                      message: "Ha ocurrido un problema al realizar la peticion.",
                      jwtToken: jwtToken
                    })
                  });
                case 53:
                case "end":
                  return _context3.stop();
              }
            }, _loop2, null, [[0, 49], [33, 41]]);
          });
          it = 0;
        case 8:
          if (!(it < 2)) {
            _context4.next = 18;
            break;
          }
          return _context4.delegateYield(_loop2(), "t0", 10);
        case 10:
          _ret2 = _context4.t0;
          if (!(_ret2 === 0)) {
            _context4.next = 13;
            break;
          }
          return _context4.abrupt("continue", 15);
        case 13:
          if (!_ret2) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", _ret2.v);
        case 15:
          it++;
          _context4.next = 8;
          break;
        case 18:
          _context4.next = 21;
          break;
        case 20:
          return _context4.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee2);
  }));
  return function cfdiIngreso(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var cfdiTrasladoCP = exports.cfdiTrasladoCP = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body3, invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI, CartaPorte, _req$decodedJwtToken3, userId, mlToken, sicofiToken, jwtToken, _req$userData3, user, usersModel, userType, _loop3, _ret3, it;
    return _regeneratorRuntime().wrap(function _callee3$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, invoiceInformation = _req$body3.invoiceInformation, DatosCFDI = _req$body3.DatosCFDI, ReceptorCFDI = _req$body3.ReceptorCFDI, ConceptosCFDI = _req$body3.ConceptosCFDI, CartaPorte = _req$body3.CartaPorte;
          if (!(invoiceInformation && DatosCFDI && ReceptorCFDI && ConceptosCFDI && CartaPorte)) {
            _context6.next = 20;
            break;
          }
          _req$decodedJwtToken3 = req.decodedJwtToken, userId = _req$decodedJwtToken3.userId, mlToken = _req$decodedJwtToken3.mlToken, sicofiToken = _req$decodedJwtToken3.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData3 = req.userData, user = _req$userData3.user, usersModel = _req$userData3.usersModel;
          userType = user.user_type;
          _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3() {
            var body, headers, URI, response, band, resJson, _message3, invoiceText, obj, updatedUser, message;
            return _regeneratorRuntime().wrap(function _loop3$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  body = {
                    'Usuario': _Users["default"].decodeUsernameSicofi(user.username_sic),
                    'Contrasena': _Users["default"].decodePasswordSicofi(user.password_sic)
                  };
                  body["DatosCFDI".concat(_config["default"].CFDI_VERSION)] = DatosCFDI;
                  body["ReceptorCFDI".concat(_config["default"].CFDI_VERSION)] = ReceptorCFDI;
                  body["ConceptosCFDI".concat(_config["default"].CFDI_VERSION)] = ConceptosCFDI;
                  body["CartaPorte".concat(_config["default"].CP_VERSION)] = CartaPorte;
                  headers = {
                    'Authorization': "Bearer " + sicofiToken,
                    'Content-Type': 'application/json'
                  };
                  URI = userType == "demo" ? _config["default"].URI_DEMO_SICOFI + _config["default"].URI_INVOICE : _config["default"].URI_PRODUCTION_SICOFI + _config["default"].URI_INVOICE;
                  _context5.next = 10;
                  return (0, _crossFetch["default"])(URI, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                  });
                case 10:
                  response = _context5.sent;
                  // Para guardar el contenido de la peticion
                  // try {
                  //     await fs.writeFile(`/home/chuy/Descargas/${userType}_traslado_body.json`, JSON.stringify(body));
                  //     console.log(`URI: ${URI}`);
                  //     console.log(`(${userType}) Saved traslado body`);
                  // } catch (err) {
                  //     console.log(err);
                  // }
                  band = false;
                  if (!(response.status == 401 && it == 0)) {
                    _context5.next = 18;
                    break;
                  }
                  _context5.next = 15;
                  return _tokens["default"].getSicofiToken(_Users["default"].decodeUsernameSicofi(user.username_sic), _Users["default"].decodePasswordSicofi(user.password_sic), userType);
                case 15:
                  sicofiToken = _context5.sent;
                  jwtToken = _jsonwebtoken["default"].sign({
                    userId: userId,
                    mlToken: mlToken,
                    sicofiToken: sicofiToken
                  }, _config["default"].JWT_SECRET, {
                    expiresIn: "1d"
                  });
                  band = true;
                case 18:
                  if (!(band && it == 0)) {
                    _context5.next = 20;
                    break;
                  }
                  return _context5.abrupt("return", 0);
                case 20:
                  if (!(response.status == 401)) {
                    _context5.next = 22;
                    break;
                  }
                  return _context5.abrupt("return", {
                    v: res.status(401).json({
                      error: "",
                      message: "Se ha vencido el token de 'Sicofi' y no fue posible renovarlo.",
                      jwtToken: jwtToken
                    })
                  });
                case 22:
                  if (!(response.status == 400)) {
                    _context5.next = 30;
                    break;
                  }
                  _context5.next = 25;
                  return response.json();
                case 25:
                  resJson = _context5.sent;
                  // console.log(resJson);
                  _message3 = "Ha ocurrido un problema al realizar la peticion. Los datos enviados a Sicofi estan mal.";
                  if (resJson.errors) {
                    _message3 += "\n\nERRORES (Sicofi)";
                    Object.keys(resJson.errors).forEach(function (key) {
                      var descriptionErrors = resJson.errors[key];
                      _message3 += "\n".concat(key, ":");
                      descriptionErrors.forEach(function (description) {
                        _message3 += "\n\t * ".concat(description);
                      });
                    });
                  }
                  if (resJson.message) {
                    _message3 += "\n\nERRORES (Sicofi)\n".concat(resJson.message);
                  }
                  return _context5.abrupt("return", {
                    v: res.status(400).json({
                      error: "",
                      message: _message3,
                      jwtToken: jwtToken
                    })
                  });
                case 30:
                  if (!(response.status == 200)) {
                    _context5.next = 45;
                    break;
                  }
                  _context5.next = 33;
                  return response.text();
                case 33:
                  invoiceText = _context5.sent;
                  _context5.prev = 34;
                  obj = {
                    initial_date: invoiceInformation.initialDate,
                    final_date: invoiceInformation.finalDate,
                    subtotal: invoiceInformation.subtotal,
                    total_routes: invoiceInformation.totalRoutes
                  };
                  _context5.next = 38;
                  return usersModel.findOneAndUpdate({
                    "_id": userId
                  }, {
                    "$push": {
                      "invoices": obj
                    }
                  }, {
                    "new": true
                  }).select({
                    "_id": 0,
                    "invoices": 1
                  });
                case 38:
                  updatedUser = _context5.sent;
                  return _context5.abrupt("return", {
                    v: res.status(200).json({
                      error: "",
                      message: "Los datos se enviaron correctamente a Sicofi. Ademas se ha guardado en la base de datos correctamente.",
                      jwtToken: jwtToken,
                      invoices: updatedUser.invoices,
                      invoiceText: invoiceText
                    })
                  });
                case 42:
                  _context5.prev = 42;
                  _context5.t0 = _context5["catch"](34);
                  return _context5.abrupt("return", {
                    v: res.status(200).json({
                      error: "",
                      message: "Los datos se enviaron correctamente a Sicofi. Con el inconveniente de que no fue posible guardar en la base de datos correctamente.",
                      jwtToken: jwtToken,
                      invoices: user.invoices
                    })
                  });
                case 45:
                  message = "La peticion no fue satisfactoria.";
                  if (response.status == 504) {
                    // Se agoto el tiempo (suele suceder cuando se envia mucha informacion o cuando Sicofi esta muy saturado, es decir, esta lento)
                    message += "\nSicofi ha rechazado la peticion.\nPuede ser que Sicofi este muy saturado o enviar menos informacion puede funcionar.";
                  }
                  return _context5.abrupt("return", {
                    v: res.status(response.status).json({
                      error: "",
                      message: message,
                      jwtToken: jwtToken
                    })
                  });
                case 50:
                  _context5.prev = 50;
                  _context5.t1 = _context5["catch"](0);
                  return _context5.abrupt("return", {
                    v: res.status(400).json({
                      error: "",
                      message: "Ha ocurrido un problema al realizar la peticion.",
                      jwtToken: jwtToken
                    })
                  });
                case 53:
                case "end":
                  return _context5.stop();
              }
            }, _loop3, null, [[0, 50], [34, 42]]);
          });
          it = 0;
        case 8:
          if (!(it < 2)) {
            _context6.next = 18;
            break;
          }
          return _context6.delegateYield(_loop3(), "t0", 10);
        case 10:
          _ret3 = _context6.t0;
          if (!(_ret3 === 0)) {
            _context6.next = 13;
            break;
          }
          return _context6.abrupt("continue", 15);
        case 13:
          if (!_ret3) {
            _context6.next = 15;
            break;
          }
          return _context6.abrupt("return", _ret3.v);
        case 15:
          it++;
          _context6.next = 8;
          break;
        case 18:
          _context6.next = 21;
          break;
        case 20:
          return _context6.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee3);
  }));
  return function cfdiTrasladoCP(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var cfdiIngresoCP = exports.cfdiIngresoCP = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body4, invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI, CartaPorte, _req$decodedJwtToken4, userId, mlToken, sicofiToken, jwtToken, _req$userData4, user, usersModel, userType, _loop4, _ret4, it;
    return _regeneratorRuntime().wrap(function _callee4$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$body4 = req.body, invoiceInformation = _req$body4.invoiceInformation, DatosCFDI = _req$body4.DatosCFDI, ReceptorCFDI = _req$body4.ReceptorCFDI, ConceptosCFDI = _req$body4.ConceptosCFDI, CartaPorte = _req$body4.CartaPorte;
          if (!(invoiceInformation && DatosCFDI && ReceptorCFDI && ConceptosCFDI && CartaPorte)) {
            _context8.next = 20;
            break;
          }
          _req$decodedJwtToken4 = req.decodedJwtToken, userId = _req$decodedJwtToken4.userId, mlToken = _req$decodedJwtToken4.mlToken, sicofiToken = _req$decodedJwtToken4.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData4 = req.userData, user = _req$userData4.user, usersModel = _req$userData4.usersModel;
          userType = user.user_type;
          _loop4 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop4() {
            var body, headers, URI, response, band, resJson, _message4, invoiceText, obj, updatedUser, message;
            return _regeneratorRuntime().wrap(function _loop4$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  body = {
                    'Usuario': _Users["default"].decodeUsernameSicofi(user.username_sic),
                    'Contrasena': _Users["default"].decodePasswordSicofi(user.password_sic)
                  };
                  body["DatosCFDI".concat(_config["default"].CFDI_VERSION)] = DatosCFDI;
                  body["ReceptorCFDI".concat(_config["default"].CFDI_VERSION)] = ReceptorCFDI;
                  body["ConceptosCFDI".concat(_config["default"].CFDI_VERSION)] = ConceptosCFDI;
                  body["CartaPorte".concat(_config["default"].CP_VERSION)] = CartaPorte;
                  headers = {
                    'Authorization': "Bearer " + sicofiToken,
                    'Content-Type': 'application/json'
                  };
                  URI = userType == "demo" ? _config["default"].URI_DEMO_SICOFI + _config["default"].URI_INVOICE : _config["default"].URI_PRODUCTION_SICOFI + _config["default"].URI_INVOICE;
                  _context7.next = 10;
                  return (0, _crossFetch["default"])(URI, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                  });
                case 10:
                  response = _context7.sent;
                  // Para guardar el contenido de la peticion
                  // try {
                  //     await fs.writeFile(`/home/chuy/Descargas/${userType}_ingreso_body.json`, JSON.stringify(body));
                  //     console.log(`URI: ${URI}`);
                  //     console.log(`(${userType}) Saved ingreso body`);
                  // } catch (err) {
                  //     console.log(err);
                  // }
                  band = false;
                  if (!(response.status == 401 && it == 0)) {
                    _context7.next = 18;
                    break;
                  }
                  _context7.next = 15;
                  return _tokens["default"].getSicofiToken(_Users["default"].decodeUsernameSicofi(user.username_sic), _Users["default"].decodePasswordSicofi(user.password_sic), userType);
                case 15:
                  sicofiToken = _context7.sent;
                  jwtToken = _jsonwebtoken["default"].sign({
                    userId: userId,
                    mlToken: mlToken,
                    sicofiToken: sicofiToken
                  }, _config["default"].JWT_SECRET, {
                    expiresIn: "1d"
                  });
                  band = true;
                case 18:
                  if (!(band && it == 0)) {
                    _context7.next = 20;
                    break;
                  }
                  return _context7.abrupt("return", 0);
                case 20:
                  if (!(response.status == 401)) {
                    _context7.next = 22;
                    break;
                  }
                  return _context7.abrupt("return", {
                    v: res.status(401).json({
                      error: "",
                      message: "Se ha vencido el token de 'Sicofi' y no fue posible renovarlo.",
                      jwtToken: jwtToken
                    })
                  });
                case 22:
                  if (!(response.status == 400)) {
                    _context7.next = 30;
                    break;
                  }
                  _context7.next = 25;
                  return response.json();
                case 25:
                  resJson = _context7.sent;
                  // console.log(resJson);
                  _message4 = "Ha ocurrido un problema al realizar la peticion. Los datos enviados a Sicofi estan mal.";
                  if (resJson.errors) {
                    _message4 += "\n\nERRORES (Sicofi)";
                    Object.keys(resJson.errors).forEach(function (key) {
                      var descriptionErrors = resJson.errors[key];
                      _message4 += "\n".concat(key, ":");
                      descriptionErrors.forEach(function (description) {
                        _message4 += "\n\t * ".concat(description);
                      });
                    });
                  }
                  if (resJson.message) {
                    _message4 += "\n\nERRORES (Sicofi)\n".concat(resJson.message);
                  }
                  return _context7.abrupt("return", {
                    v: res.status(400).json({
                      error: "",
                      message: _message4,
                      jwtToken: jwtToken
                    })
                  });
                case 30:
                  if (!(response.status == 200)) {
                    _context7.next = 45;
                    break;
                  }
                  _context7.next = 33;
                  return response.text();
                case 33:
                  invoiceText = _context7.sent;
                  _context7.prev = 34;
                  obj = {
                    initial_date: invoiceInformation.initialDate,
                    final_date: invoiceInformation.finalDate,
                    subtotal: invoiceInformation.subtotal,
                    total_routes: invoiceInformation.totalRoutes
                  };
                  _context7.next = 38;
                  return usersModel.findOneAndUpdate({
                    "_id": userId
                  }, {
                    "$push": {
                      "invoices": obj
                    }
                  }, {
                    "new": true
                  }).select({
                    "_id": 0,
                    "invoices": 1
                  });
                case 38:
                  updatedUser = _context7.sent;
                  return _context7.abrupt("return", {
                    v: res.status(200).json({
                      error: "",
                      message: "Los datos se enviaron correctamente a Sicofi. Ademas se ha guardado en la base de datos correctamente.",
                      jwtToken: jwtToken,
                      invoices: updatedUser.invoices,
                      invoiceText: invoiceText
                    })
                  });
                case 42:
                  _context7.prev = 42;
                  _context7.t0 = _context7["catch"](34);
                  return _context7.abrupt("return", {
                    v: res.status(200).json({
                      error: "",
                      message: "Los datos se enviaron correctamente a Sicofi. Con el inconveniente de que no fue posible guardar en la base de datos correctamente.",
                      jwtToken: jwtToken,
                      invoices: user.invoices
                    })
                  });
                case 45:
                  message = "La peticion no fue satisfactoria.";
                  if (response.status == 504) {
                    // Se agoto el tiempo (suele suceder cuando se envia mucha informacion o cuando Sicofi esta muy saturado, es decir, esta lento)
                    message += "\nSicofi ha rechazado la peticion.\nPuede ser que Sicofi este muy saturado o enviar menos informacion puede funcionar.";
                  }
                  return _context7.abrupt("return", {
                    v: res.status(response.status).json({
                      error: "",
                      message: message,
                      jwtToken: jwtToken
                    })
                  });
                case 50:
                  _context7.prev = 50;
                  _context7.t1 = _context7["catch"](0);
                  console.log(_context7.t1);
                  return _context7.abrupt("return", {
                    v: res.status(400).json({
                      error: "",
                      message: "Ha ocurrido un problema al realizar la peticion.",
                      jwtToken: jwtToken
                    })
                  });
                case 54:
                case "end":
                  return _context7.stop();
              }
            }, _loop4, null, [[0, 50], [34, 42]]);
          });
          it = 0;
        case 8:
          if (!(it < 2)) {
            _context8.next = 18;
            break;
          }
          return _context8.delegateYield(_loop4(), "t0", 10);
        case 10:
          _ret4 = _context8.t0;
          if (!(_ret4 === 0)) {
            _context8.next = 13;
            break;
          }
          return _context8.abrupt("continue", 15);
        case 13:
          if (!_ret4) {
            _context8.next = 15;
            break;
          }
          return _context8.abrupt("return", _ret4.v);
        case 15:
          it++;
          _context8.next = 8;
          break;
        case 18:
          _context8.next = 21;
          break;
        case 20:
          return _context8.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 21:
        case "end":
          return _context8.stop();
      }
    }, _callee4);
  }));
  return function cfdiIngresoCP(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();