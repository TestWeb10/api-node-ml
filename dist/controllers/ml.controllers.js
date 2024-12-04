"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShipments = void 0;
var _config = _interopRequireDefault(require("../config"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _crossFetch = _interopRequireDefault(require("cross-fetch"));
var _tokens = _interopRequireDefault(require("./tokens"));
var _CatalogosCartaPorte = _interopRequireDefault(require("../public/CatalogosCartaPorte30/CatalogosCartaPorte30.json"));
var _promises = _interopRequireDefault(require("fs/promises"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var lowercaseAndRemoveAccents = function lowercaseAndRemoveAccents(cad) {
  return cad.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};
var makePretty = function makePretty(cad) {
  var newCad = cad.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9 ]/g, "").trim().split(/[\s,\t,\n]+/).join(' ');
  newCad = newCad == "" ? "VACIO" : newCad;
  return newCad;
};

/* 
Estructura:
    {
        routes: [
            "<route_id>",
            ...
        ]
    }

    - 'fetch' es mucho mas rapido que 'axios'
*/

var getShipments = exports.getShipments = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var routes, _req$decodedJwtToken, userId, mlToken, sicofiToken, jwtToken, _req$userData, user, usersModel, it, shipments, unauthorizedRoutes, invalidRoutes, uris, i, URI, responsesRoutes, statusRoutes, band, _i, promisesRoutes, responseRoutes, _loop, _i2;
    return _regeneratorRuntime().wrap(function _callee$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          routes = req.body.routes;
          if (!routes) {
            _context3.next = 64;
            break;
          }
          if (!(routes.length > 0)) {
            _context3.next = 61;
            break;
          }
          _req$decodedJwtToken = req.decodedJwtToken, userId = _req$decodedJwtToken.userId, mlToken = _req$decodedJwtToken.mlToken, sicofiToken = _req$decodedJwtToken.sicofiToken;
          jwtToken = req.jwtToken;
          _req$userData = req.userData, user = _req$userData.user, usersModel = _req$userData.usersModel;
          it = 0;
        case 7:
          if (!(it < 2)) {
            _context3.next = 59;
            break;
          }
          _context3.prev = 8;
          shipments = [];
          unauthorizedRoutes = [];
          invalidRoutes = [];
          uris = [];
          for (i = 0; i < routes.length; i++) {
            URI = _config["default"].URI_ML + "/routes/" + routes[i] + "/carta-porte-details?access_token=" + mlToken;
            uris.push((0, _crossFetch["default"])(URI, {
              method: 'GET'
            }));
          }
          _context3.next = 16;
          return Promise.all(uris);
        case 16:
          responsesRoutes = _context3.sent;
          statusRoutes = responsesRoutes.map(function (elem) {
            return elem.status;
          });
          band = false;
          _i = 0;
        case 20:
          if (!(_i < statusRoutes.length)) {
            _context3.next = 31;
            break;
          }
          if (!(statusRoutes[_i] == 401 && it == 0)) {
            _context3.next = 28;
            break;
          }
          _context3.next = 24;
          return _tokens["default"].getMLToken(user.client_id, user.client_secret, user.grant_type);
        case 24:
          mlToken = _context3.sent;
          jwtToken = _jsonwebtoken["default"].sign({
            userId: userId,
            mlToken: mlToken,
            sicofiToken: sicofiToken
          }, _config["default"].JWT_SECRET, {
            expiresIn: "1d"
          });
          band = true;
          return _context3.abrupt("break", 31);
        case 28:
          _i++;
          _context3.next = 20;
          break;
        case 31:
          if (!(band && it == 0)) {
            _context3.next = 33;
            break;
          }
          return _context3.abrupt("continue", 56);
        case 33:
          promisesRoutes = responsesRoutes.map(function (elem) {
            return elem.json();
          });
          _context3.next = 36;
          return Promise.all(promisesRoutes);
        case 36:
          responseRoutes = _context3.sent;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var obj, _uris, j, _URI, responsesShipments, statusShipments, promisesShipments, responseShipments, _obj, _loop2, _j;
            return _regeneratorRuntime().wrap(function _loop$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(statusRoutes[_i2] != 200)) {
                    _context2.next = 7;
                    break;
                  }
                  if (statusRoutes[_i2] == 401) {
                    unauthorizedRoutes.push(routes[_i2]);
                  }
                  if (statusRoutes[_i2] == 404) {
                    invalidRoutes.push(routes[_i2]);
                  }
                  obj = {
                    "entity_id": routes[_i2],
                    "status": statusRoutes[_i2],
                    "error": ""
                  };
                  shipments.push(obj);
                  _context2.next = 26;
                  break;
                case 7:
                  _uris = [];
                  for (j = 0; j < responseRoutes[_i2].shipments.length; j++) {
                    _URI = _config["default"].URI_ML + responseRoutes[_i2].shipments[j].url + "?access_token=" + mlToken;
                    _uris.push((0, _crossFetch["default"])(_URI, {
                      method: 'GET'
                    }));
                  }
                  _context2.next = 11;
                  return Promise.all(_uris);
                case 11:
                  responsesShipments = _context2.sent;
                  statusShipments = responsesShipments.map(function (elem) {
                    return elem.status;
                  });
                  promisesShipments = responsesShipments.map(function (elem) {
                    return elem.json();
                  });
                  _context2.next = 16;
                  return Promise.all(promisesShipments);
                case 16:
                  responseShipments = _context2.sent;
                  _obj = responseRoutes[_i2];
                  _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2(_j) {
                    var shipmentKeys, k, categorySat, dangerousMaterial;
                    return _regeneratorRuntime().wrap(function _loop2$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          if (statusShipments[_j] != 200) {
                            // Significa que no hay informacion para dicho envio
                            _obj.shipments[_j].shipment = {
                              "status": statusShipments[_j],
                              "error": "error"
                            };
                          } else {
                            _obj.shipments[_j].shipment = responseShipments[_j];

                            // PRE-PROCESAMIENTO
                            // Arreglamos el texto para que sea adecuado
                            _obj.shipments[_j].shipment.recipient.full_name = makePretty(_obj.shipments[_j].shipment.recipient.full_name);
                            shipmentKeys = ["origin", "destination"];
                            shipmentKeys.forEach(function (shipmentKey) {
                              // Agregamos la siguiente informacion (importante a la hora de timbrar con complemento carta porte) (colonia, localidad, municipio, pais, estado)
                              if (shipmentKey == "destination") {
                                // Codigos postales para utilizar: 44100 45100 45200 45500 45400
                                _obj.shipments[_j].shipment[shipmentKey].address.zip_code = "44100"; // Guadalajara Centro
                                var estado = "JAL";
                                var colonia = "0003";
                                var localidad = "03";
                                var municipio = "039";
                                var pais = "MEX";
                                _obj.shipments[_j].shipment[shipmentKey].address.catalogKey = {
                                  "estado": estado,
                                  "colonia": colonia,
                                  "localidad": localidad,
                                  "municipio": municipio,
                                  "pais": pais
                                };
                              }
                              if (shipmentKey == "destination") {
                                _obj.shipments[_j].shipment[shipmentKey].fiscal_information.rfc = "XAXX010101000"; // RFC generico
                              }
                              // Arreglamos los textos para que sean adecuados
                              _obj.shipments[_j].shipment[shipmentKey].fiscal_information.full_name = makePretty(_obj.shipments[_j].shipment[shipmentKey].fiscal_information.full_name);
                              _obj.shipments[_j].shipment[shipmentKey].address.address_line = makePretty(_obj.shipments[_j].shipment[shipmentKey].address.address_line);
                              _obj.shipments[_j].shipment[shipmentKey].address.street_name = makePretty(_obj.shipments[_j].shipment[shipmentKey].address.street_name);
                              _obj.shipments[_j].shipment[shipmentKey].address.street_number = makePretty(_obj.shipments[_j].shipment[shipmentKey].address.street_number);
                              _obj.shipments[_j].shipment[shipmentKey].address.city.name = makePretty(_obj.shipments[_j].shipment[shipmentKey].address.city.name);
                              _obj.shipments[_j].shipment[shipmentKey].address.state.name = makePretty(_obj.shipments[_j].shipment[shipmentKey].address.state.name);
                              _obj.shipments[_j].shipment[shipmentKey].address.country.name = makePretty(_obj.shipments[_j].shipment[shipmentKey].address.country.name);
                              _obj.shipments[_j].shipment[shipmentKey].address.neighborhood.name = makePretty(_obj.shipments[_j].shipment[shipmentKey].address.neighborhood.name);
                              _obj.shipments[_j].shipment[shipmentKey].address.municipality.name = makePretty(_obj.shipments[_j].shipment[shipmentKey].address.municipality.name);
                            });

                            // Modificamos para cada item el atributo 'dangerous_material' (mercado libre no concuerda en algunos con el sat)
                            for (k = 0; k < _obj.shipments[_j].shipment["package"].items.length; k++) {
                              categorySat = _obj.shipments[_j].shipment["package"].items[k].category_sat; // A veces no viene la categoria
                              if (!categorySat) {
                                _obj.shipments[_j].shipment["package"].items[k].category_sat = "01010101";
                                categorySat = _obj.shipments[_j].shipment["package"].items[k].category_sat;
                              }
                              // Existen categorias como las siguientes que no son validas: "1010101"
                              if (categorySat.length < 8) {
                                categorySat = categorySat.padStart(8, '0');
                              }
                              dangerousMaterial = _CatalogosCartaPorte["default"]["c_ClaveProdServCP"][categorySat]["Material Peligroso"];
                              _obj.shipments[_j].shipment["package"].items[k].dangerous_material = dangerousMaterial;
                              // Arreglamos los textos del item para que sean adecuados
                              _obj.shipments[_j].shipment["package"].items[k].description = makePretty(_obj.shipments[_j].shipment["package"].items[k].description).substring(0, 1000);
                              _obj.shipments[_j].shipment["package"].items[k].package_description = makePretty(_obj.shipments[_j].shipment["package"].items[k].package_description);
                            }
                          }
                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }, _loop2);
                  });
                  _j = 0;
                case 20:
                  if (!(_j < responseShipments.length)) {
                    _context2.next = 25;
                    break;
                  }
                  return _context2.delegateYield(_loop2(_j), "t0", 22);
                case 22:
                  _j++;
                  _context2.next = 20;
                  break;
                case 25:
                  shipments.push(_obj);
                case 26:
                case "end":
                  return _context2.stop();
              }
            }, _loop);
          });
          _i2 = 0;
        case 39:
          if (!(_i2 < responseRoutes.length)) {
            _context3.next = 44;
            break;
          }
          return _context3.delegateYield(_loop(), "t0", 41);
        case 41:
          _i2++;
          _context3.next = 39;
          break;
        case 44:
          if (!(unauthorizedRoutes.length != 0)) {
            _context3.next = 46;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            error: "",
            message: "Rutas que no se pudieron obtener debido a que no se tenia autorizacion: " + unauthorizedRoutes.join(", "),
            jwtToken: jwtToken
          }));
        case 46:
          if (!(invalidRoutes.length != 0)) {
            _context3.next = 50;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            error: "",
            message: "Rutas no existentes: " + invalidRoutes.join(", "),
            jwtToken: jwtToken
          }));
        case 50:
          return _context3.abrupt("return", res.status(200).json({
            error: "",
            message: "La peticion fue satisfactoria.",
            jwtToken: jwtToken,
            shipments: shipments
          }));
        case 51:
          _context3.next = 56;
          break;
        case 53:
          _context3.prev = 53;
          _context3.t1 = _context3["catch"](8);
          return _context3.abrupt("return", res.status(400).json({
            error: "",
            message: "Ha ocurrido un problema al realizar la peticion.",
            jwtToken: jwtToken
          }));
        case 56:
          it++;
          _context3.next = 7;
          break;
        case 59:
          _context3.next = 62;
          break;
        case 61:
          return _context3.abrupt("return", res.status(400).json({
            error: "",
            message: "La lista de rutas esta vacia."
          }));
        case 62:
          _context3.next = 65;
          break;
        case 64:
          return _context3.abrupt("return", res.status(400).json({
            error: "",
            message: "No se recibieron los datos completos."
          }));
        case 65:
        case "end":
          return _context3.stop();
      }
    }, _callee, null, [[8, 53]]);
  }));
  return function getShipments(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();