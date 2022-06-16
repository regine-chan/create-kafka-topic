var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCommandProperties = exports.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issue = exports.issueCommand = void 0;
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issueCommand = void 0;
    var fs = __importStar(require("fs"));
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: "utf8"
      });
    }
    exports.issueCommand = issueCommand;
  }
});

// node_modules/@actions/http-client/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/lib/proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkBypass = exports.getProxyUrl = void 0;
    function getProxyUrl(reqUrl) {
      const usingSsl = reqUrl.protocol === "https:";
      if (checkBypass(reqUrl)) {
        return void 0;
      }
      const proxyVar = (() => {
        if (usingSsl) {
          return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        } else {
          return process.env["http_proxy"] || process.env["HTTP_PROXY"];
        }
      })();
      if (proxyVar) {
        return new URL(proxyVar);
      } else {
        return void 0;
      }
    }
    exports.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      const upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports.httpOverHttp = httpOverHttp;
    exports.httpsOverHttp = httpsOverHttp;
    exports.httpOverHttps = httpOverHttps;
    exports.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self = this;
      self.options = options || {};
      self.proxyOptions = self.options.proxy || {};
      self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
      self.requests = [];
      self.sockets = [];
      self.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self = this;
      var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options);
        return;
      }
      self.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this;
      var placeholder = {};
      self.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug("making CONNECT request");
      var connectReq = self.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug("tunneling socket could not be established, statusCode=%d", res.statusCode);
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self.removeSocket(placeholder);
          return;
        }
        debug("tunneling connection has established");
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self = this;
      TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports.debug = debug;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/lib/index.js
var require_lib = __commonJS({
  "node_modules/@actions/http-client/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
    var http = __importStar(require("http"));
    var https = __importStar(require("https"));
    var pm = __importStar(require_proxy());
    var tunnel = __importStar(require_tunnel2());
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports.Headers || (exports.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let output = Buffer.alloc(0);
            this.message.on("data", (chunk) => {
              output = Buffer.concat([output, chunk]);
            });
            this.message.on("end", () => {
              resolve(output.toString());
            });
          }));
        });
      }
    };
    exports.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      const parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
        });
      }
      get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
      }
      del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("DELETE", requestUrl, null, additionalHeaders || {});
        });
      }
      post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("POST", requestUrl, data, additionalHeaders || {});
        });
      }
      patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PATCH", requestUrl, data, additionalHeaders || {});
        });
      }
      put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
      }
      head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request("HEAD", requestUrl, null, additionalHeaders || {});
        });
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
          return this.request(verb, requestUrl, stream, additionalHeaders);
        });
      }
      getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          const res = yield this.get(requestUrl, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.post(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.put(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const data = JSON.stringify(obj, null, 2);
          additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
          additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
          const res = yield this.patch(requestUrl, data, additionalHeaders);
          return this._processResponse(res, this.requestOptions);
        });
      }
      request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._disposed) {
            throw new Error("Client has already been disposed.");
          }
          const parsedUrl = new URL(requestUrl);
          let info = this._prepareRequest(verb, parsedUrl, headers);
          const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
          let numTries = 0;
          let response;
          do {
            response = yield this.requestRaw(info, data);
            if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
              let authenticationHandler;
              for (const handler of this.handlers) {
                if (handler.canHandleAuthentication(response)) {
                  authenticationHandler = handler;
                  break;
                }
              }
              if (authenticationHandler) {
                return authenticationHandler.handleAuthentication(this, info, data);
              } else {
                return response;
              }
            }
            let redirectsRemaining = this._maxRedirects;
            while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
              const redirectUrl = response.message.headers["location"];
              if (!redirectUrl) {
                break;
              }
              const parsedRedirectUrl = new URL(redirectUrl);
              if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
                throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
              }
              yield response.readBody();
              if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                for (const header in headers) {
                  if (header.toLowerCase() === "authorization") {
                    delete headers[header];
                  }
                }
              }
              info = this._prepareRequest(verb, parsedRedirectUrl, headers);
              response = yield this.requestRaw(info, data);
              redirectsRemaining--;
            }
            if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
              return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
              yield response.readBody();
              yield this._performExponentialBackoff(numTries);
            }
          } while (numTries < maxTries);
          return response;
        });
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => {
            function callbackForResult(err, res) {
              if (err) {
                reject(err);
              } else if (!res) {
                reject(new Error("Unknown error"));
              } else {
                resolve(res);
              }
            }
            this.requestRawWithCallback(info, data, callbackForResult);
          });
        });
      }
      requestRawWithCallback(info, data, onResult) {
        if (typeof data === "string") {
          if (!info.options.headers) {
            info.options.headers = {};
          }
          info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        function handleResult(err, res) {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        }
        const req = info.httpModule.request(info.options, (msg) => {
          const res = new HttpClientResponse(msg);
          handleResult(void 0, res);
        });
        let socket;
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on("error", function(err) {
          handleResult(err);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          for (const handler of this.handlers) {
            handler.prepareRequest(info.options);
          }
        }
        return info;
      }
      _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (proxyUrl && proxyUrl.hostname) {
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
              proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
            }), { host: proxyUrl.hostname, port: proxyUrl.port })
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
          retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
          const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
          return new Promise((resolve) => setTimeout(() => resolve(), ms));
        });
      }
      _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
          return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const statusCode = res.message.statusCode || 0;
            const response = {
              statusCode,
              result: null,
              headers: {}
            };
            if (statusCode === HttpCodes.NotFound) {
              resolve(response);
            }
            function dateTimeDeserializer(key, value) {
              if (typeof value === "string") {
                const a = new Date(value);
                if (!isNaN(a.valueOf())) {
                  return a;
                }
              }
              return value;
            }
            let obj;
            let contents;
            try {
              contents = yield res.readBody();
              if (contents && contents.length > 0) {
                if (options && options.deserializeDates) {
                  obj = JSON.parse(contents, dateTimeDeserializer);
                } else {
                  obj = JSON.parse(contents);
                }
                response.result = obj;
              }
              response.headers = res.message.headers;
            } catch (err) {
            }
            if (statusCode > 299) {
              let msg;
              if (obj && obj.message) {
                msg = obj.message;
              } else if (contents && contents.length > 0) {
                msg = contents;
              } else {
                msg = `Failed request: (${statusCode})`;
              }
              const err = new HttpClientError(msg, statusCode);
              err.result = response.result;
              reject(err);
            } else {
              resolve(response);
            }
          }));
        });
      }
    };
    exports.HttpClient = HttpClient;
    var lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
  }
});

// node_modules/@actions/http-client/lib/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/lib/auth.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Bearer ${this.token}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        if (!options.headers) {
          throw Error("The request has no headers");
        }
        options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
      }
      canHandleAuthentication() {
        return false;
      }
      handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          throw new Error("not implemented");
        });
      }
    };
    exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OidcClient = void 0;
    var http_client_1 = require_lib();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS({
  "node_modules/@actions/core/lib/summary.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
    var os_1 = require("os");
    var fs_1 = require("fs");
    var { access, appendFile, writeFile } = fs_1.promises;
    exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var Summary = class {
      constructor() {
        this._buffer = "";
      }
      filePath() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      write(options) {
        return __awaiter(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      clear() {
        return __awaiter(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      stringify() {
        return this._buffer;
      }
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    };
    var _summary = new Summary();
    exports.markdownSummary = _summary;
    exports.summary = _summary;
  }
});

// node_modules/@actions/core/lib/path-utils.js
var require_path_utils = __commonJS({
  "node_modules/@actions/core/lib/path-utils.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
    var path = __importStar(require("path"));
    function toPosixPath(pth) {
      return pth.replace(/[\\]/g, "/");
    }
    exports.toPosixPath = toPosixPath;
    function toWin32Path(pth) {
      return pth.replace(/[/]/g, "\\");
    }
    exports.toWin32Path = toWin32Path;
    function toPlatformPath(pth) {
      return pth.replace(/[/\\]/g, path.sep);
    }
    exports.toPlatformPath = toPlatformPath;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar(require("os"));
    var path = __importStar(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        const delimiter = "_GitHubActionsFileCommandDelimeter_";
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand("ENV", commandValue);
      } else {
        command_1.issueCommand("set-env", { name }, convertedVal);
      }
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput;
    function getMultilineInput(name, options) {
      const inputs = getInput(name, options).split("\n").filter((x) => x !== "");
      return inputs;
    }
    exports.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      process.stdout.write(os.EOL);
      command_1.issueCommand("set-output", { name }, value);
    }
    exports.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports.isDebug = isDebug;
    function debug(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports.debug = debug;
    function error(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.error = error;
    function warning(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.notice = notice;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports.info = info;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name, value) {
      command_1.issueCommand("save-state", { name }, value);
    }
    exports.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports.getIDToken = getIDToken;
    var summary_1 = require_summary();
    Object.defineProperty(exports, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = require_summary();
    Object.defineProperty(exports, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
    var path_utils_1 = require_path_utils();
    Object.defineProperty(exports, "toPosixPath", { enumerable: true, get: function() {
      return path_utils_1.toPosixPath;
    } });
    Object.defineProperty(exports, "toWin32Path", { enumerable: true, get: function() {
      return path_utils_1.toWin32Path;
    } });
    Object.defineProperty(exports, "toPlatformPath", { enumerable: true, get: function() {
      return path_utils_1.toPlatformPath;
    } });
  }
});

// node_modules/kafkajs/src/loggers/index.js
var require_loggers = __commonJS({
  "node_modules/kafkajs/src/loggers/index.js"(exports, module2) {
    var { assign } = Object;
    var LEVELS = {
      NOTHING: 0,
      ERROR: 1,
      WARN: 2,
      INFO: 4,
      DEBUG: 5
    };
    var createLevel = (label, level, currentLevel, namespace, logFunction) => (message, extra = {}) => {
      if (level > currentLevel())
        return;
      logFunction({
        namespace,
        level,
        label,
        log: assign({
          timestamp: new Date().toISOString(),
          logger: "kafkajs",
          message
        }, extra)
      });
    };
    var evaluateLogLevel = (logLevel) => {
      const envLogLevel = (process.env.KAFKAJS_LOG_LEVEL || "").toUpperCase();
      return LEVELS[envLogLevel] == null ? logLevel : LEVELS[envLogLevel];
    };
    var createLogger = ({ level = LEVELS.INFO, logCreator } = {}) => {
      let logLevel = evaluateLogLevel(level);
      const logFunction = logCreator(logLevel);
      const createNamespace = (namespace, logLevel2 = null) => {
        const namespaceLogLevel = evaluateLogLevel(logLevel2);
        return createLogFunctions(namespace, namespaceLogLevel);
      };
      const createLogFunctions = (namespace, namespaceLogLevel = null) => {
        const currentLogLevel = () => namespaceLogLevel == null ? logLevel : namespaceLogLevel;
        const logger = {
          info: createLevel("INFO", LEVELS.INFO, currentLogLevel, namespace, logFunction),
          error: createLevel("ERROR", LEVELS.ERROR, currentLogLevel, namespace, logFunction),
          warn: createLevel("WARN", LEVELS.WARN, currentLogLevel, namespace, logFunction),
          debug: createLevel("DEBUG", LEVELS.DEBUG, currentLogLevel, namespace, logFunction)
        };
        return assign(logger, {
          namespace: createNamespace,
          setLogLevel: (newLevel) => {
            logLevel = newLevel;
          }
        });
      };
      return createLogFunctions();
    };
    module2.exports = {
      LEVELS,
      createLogger
    };
  }
});

// node_modules/kafkajs/src/instrumentation/event.js
var require_event = __commonJS({
  "node_modules/kafkajs/src/instrumentation/event.js"(exports, module2) {
    var id = 0;
    var nextId = () => {
      if (id === Number.MAX_VALUE) {
        id = 0;
      }
      return id++;
    };
    var InstrumentationEvent = class {
      constructor(type, payload) {
        this.id = nextId();
        this.type = type;
        this.timestamp = Date.now();
        this.payload = payload;
      }
    };
    module2.exports = InstrumentationEvent;
  }
});

// node_modules/kafkajs/package.json
var require_package = __commonJS({
  "node_modules/kafkajs/package.json"(exports, module2) {
    module2.exports = {
      name: "kafkajs",
      version: "2.0.2",
      description: "A modern Apache Kafka client for node.js",
      author: "Tulio Ornelas <ornelas.tulio@gmail.com>",
      main: "index.js",
      types: "types/index.d.ts",
      license: "MIT",
      keywords: [
        "kafka",
        "sasl",
        "scram"
      ],
      engines: {
        node: ">=14.0.0"
      },
      repository: {
        type: "git",
        url: "https://github.com/tulios/kafkajs.git"
      },
      bugs: {
        url: "https://github.com/tulios/kafkajs/issues"
      },
      homepage: "https://kafka.js.org",
      scripts: {
        jest: "export KAFKA_VERSION=${KAFKA_VERSION:='2.4'} && NODE_ENV=test echo \"KAFKA_VERSION: ${KAFKA_VERSION}\" && KAFKAJS_DEBUG_PROTOCOL_BUFFERS=1 jest",
        "test:local": "yarn jest --detectOpenHandles",
        "test:debug": "NODE_ENV=test KAFKAJS_DEBUG_PROTOCOL_BUFFERS=1 node --inspect-brk $(yarn bin 2>/dev/null)/jest --detectOpenHandles --runInBand --watch",
        "test:local:watch": "yarn test:local --watch",
        test: "yarn lint && JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh 'yarn jest --ci --maxWorkers=4 --no-watchman --forceExit'",
        lint: "find . -path ./node_modules -prune -o -path ./coverage -prune -o -path ./website -prune -o -name '*.js' -print0 | xargs -0 eslint",
        format: "find . -path ./node_modules -prune -o -path ./coverage -prune -o -path ./website -prune -o -name '*.js' -print0 | xargs -0 prettier --write",
        precommit: "lint-staged",
        "test:group:broker": "yarn jest --forceExit --testPathPattern 'src/broker/.*'",
        "test:group:admin": "yarn jest --forceExit --testPathPattern 'src/admin/.*'",
        "test:group:producer": "yarn jest --forceExit --testPathPattern 'src/producer/.*'",
        "test:group:consumer": "yarn jest --forceExit --testPathPattern 'src/consumer/.*.spec.js'",
        "test:group:others": "yarn jest --forceExit --testPathPattern 'src/(?!(broker|admin|producer|consumer)/).*'",
        "test:group:oauthbearer": "OAUTHBEARER_ENABLED=1 yarn jest --forceExit src/producer/index.spec.js src/broker/__tests__/connect.spec.js src/consumer/__tests__/connection.spec.js src/broker/__tests__/disconnect.spec.js src/admin/__tests__/connection.spec.js src/broker/__tests__/reauthenticate.spec.js",
        "test:group:broker:ci": 'JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh "yarn test:group:broker --ci --maxWorkers=4 --no-watchman"',
        "test:group:admin:ci": 'JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh "yarn test:group:admin --ci --maxWorkers=4 --no-watchman"',
        "test:group:producer:ci": 'JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh "yarn test:group:producer --ci --maxWorkers=4 --no-watchman"',
        "test:group:consumer:ci": 'JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh "yarn test:group:consumer --ci --maxWorkers=4 --no-watchman"',
        "test:group:others:ci": 'JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh "yarn test:group:others --ci --maxWorkers=4 --no-watchman"',
        "test:group:oauthbearer:ci": `JEST_JUNIT_OUTPUT_NAME=test-report.xml COMPOSE_FILE='docker-compose.2_4_oauthbearer.yml' ./scripts/testWithKafka.sh "yarn test:group:oauthbearer --ci --maxWorkers=4 --no-watchman"`,
        "test:types": "tsc -p types/"
      },
      devDependencies: {
        "@types/jest": "^27.4.0",
        "@types/node": "^12.0.8",
        "@typescript-eslint/typescript-estree": "^1.10.2",
        eslint: "^6.8.0",
        "eslint-config-prettier": "^6.0.0",
        "eslint-config-standard": "^13.0.1",
        "eslint-plugin-import": "^2.18.2",
        "eslint-plugin-jest": "^26.1.0",
        "eslint-plugin-node": "^11.0.0",
        "eslint-plugin-prettier": "^3.1.0",
        "eslint-plugin-promise": "^4.2.1",
        "eslint-plugin-standard": "^4.0.0",
        execa: "^2.0.3",
        glob: "^7.1.4",
        husky: "^3.0.1",
        ip: "^1.1.5",
        jest: "^25.1.0",
        "jest-circus": "^25.1.0",
        "jest-extended": "^0.11.2",
        "jest-junit": "^10.0.0",
        jsonwebtoken: "^8.5.1",
        "lint-staged": "^9.2.0",
        mockdate: "^2.0.5",
        prettier: "^1.18.2",
        semver: "^6.2.0",
        typescript: "^3.8.3",
        uuid: "^3.3.2"
      },
      dependencies: {},
      "lint-staged": {
        "*.js": [
          "prettier --write",
          "git add"
        ]
      }
    };
  }
});

// node_modules/kafkajs/src/errors.js
var require_errors = __commonJS({
  "node_modules/kafkajs/src/errors.js"(exports, module2) {
    var pkgJson = require_package();
    var { bugs } = pkgJson;
    var KafkaJSError = class extends Error {
      constructor(e, { retriable = true, cause } = {}) {
        super(e, { cause });
        Error.captureStackTrace(this, this.constructor);
        this.message = e.message || e;
        this.name = "KafkaJSError";
        this.retriable = retriable;
        this.helpUrl = e.helpUrl;
        this.cause = cause;
      }
    };
    var KafkaJSNonRetriableError = class extends KafkaJSError {
      constructor(e, { cause } = {}) {
        super(e, { retriable: false, cause });
        this.name = "KafkaJSNonRetriableError";
      }
    };
    var KafkaJSProtocolError = class extends KafkaJSError {
      constructor(e, { retriable = e.retriable } = {}) {
        super(e, { retriable });
        this.type = e.type;
        this.code = e.code;
        this.name = "KafkaJSProtocolError";
      }
    };
    var KafkaJSOffsetOutOfRange = class extends KafkaJSProtocolError {
      constructor(e, { topic, partition }) {
        super(e);
        this.topic = topic;
        this.partition = partition;
        this.name = "KafkaJSOffsetOutOfRange";
      }
    };
    var KafkaJSMemberIdRequired = class extends KafkaJSProtocolError {
      constructor(e, { memberId }) {
        super(e);
        this.memberId = memberId;
        this.name = "KafkaJSMemberIdRequired";
      }
    };
    var KafkaJSNumberOfRetriesExceeded = class extends KafkaJSNonRetriableError {
      constructor(e, { retryCount, retryTime }) {
        super(e, { cause: e });
        this.stack = `${this.name}
  Caused by: ${e.stack}`;
        this.retryCount = retryCount;
        this.retryTime = retryTime;
        this.name = "KafkaJSNumberOfRetriesExceeded";
      }
    };
    var KafkaJSConnectionError = class extends KafkaJSError {
      constructor(e, { broker, code } = {}) {
        super(e);
        this.broker = broker;
        this.code = code;
        this.name = "KafkaJSConnectionError";
      }
    };
    var KafkaJSConnectionClosedError = class extends KafkaJSConnectionError {
      constructor(e, { host, port } = {}) {
        super(e, { broker: `${host}:${port}` });
        this.host = host;
        this.port = port;
        this.name = "KafkaJSConnectionClosedError";
      }
    };
    var KafkaJSRequestTimeoutError = class extends KafkaJSError {
      constructor(e, { broker, correlationId, createdAt, sentAt, pendingDuration } = {}) {
        super(e);
        this.broker = broker;
        this.correlationId = correlationId;
        this.createdAt = createdAt;
        this.sentAt = sentAt;
        this.pendingDuration = pendingDuration;
        this.name = "KafkaJSRequestTimeoutError";
      }
    };
    var KafkaJSMetadataNotLoaded = class extends KafkaJSError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSMetadataNotLoaded";
      }
    };
    var KafkaJSTopicMetadataNotLoaded = class extends KafkaJSMetadataNotLoaded {
      constructor(e, { topic } = {}) {
        super(e);
        this.topic = topic;
        this.name = "KafkaJSTopicMetadataNotLoaded";
      }
    };
    var KafkaJSStaleTopicMetadataAssignment = class extends KafkaJSError {
      constructor(e, { topic, unknownPartitions } = {}) {
        super(e);
        this.topic = topic;
        this.unknownPartitions = unknownPartitions;
        this.name = "KafkaJSStaleTopicMetadataAssignment";
      }
    };
    var KafkaJSDeleteGroupsError = class extends KafkaJSError {
      constructor(e, groups = []) {
        super(e);
        this.groups = groups;
        this.name = "KafkaJSDeleteGroupsError";
      }
    };
    var KafkaJSServerDoesNotSupportApiKey = class extends KafkaJSNonRetriableError {
      constructor(e, { apiKey, apiName } = {}) {
        super(e);
        this.apiKey = apiKey;
        this.apiName = apiName;
        this.name = "KafkaJSServerDoesNotSupportApiKey";
      }
    };
    var KafkaJSBrokerNotFound = class extends KafkaJSError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSBrokerNotFound";
      }
    };
    var KafkaJSPartialMessageError = class extends KafkaJSNonRetriableError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSPartialMessageError";
      }
    };
    var KafkaJSSASLAuthenticationError = class extends KafkaJSNonRetriableError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSSASLAuthenticationError";
      }
    };
    var KafkaJSGroupCoordinatorNotFound = class extends KafkaJSNonRetriableError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSGroupCoordinatorNotFound";
      }
    };
    var KafkaJSNotImplemented = class extends KafkaJSNonRetriableError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSNotImplemented";
      }
    };
    var KafkaJSTimeout = class extends KafkaJSNonRetriableError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSTimeout";
      }
    };
    var KafkaJSLockTimeout = class extends KafkaJSTimeout {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSLockTimeout";
      }
    };
    var KafkaJSUnsupportedMagicByteInMessageSet = class extends KafkaJSNonRetriableError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSUnsupportedMagicByteInMessageSet";
      }
    };
    var KafkaJSDeleteTopicRecordsError = class extends KafkaJSError {
      constructor({ partitions }) {
        const retriable = partitions.filter(({ error }) => error != null).every(({ error }) => error.retriable === true);
        super("Error while deleting records", { retriable });
        this.name = "KafkaJSDeleteTopicRecordsError";
        this.partitions = partitions;
      }
    };
    var issueUrl = bugs ? bugs.url : null;
    var KafkaJSInvariantViolation = class extends KafkaJSNonRetriableError {
      constructor(e) {
        const message = e.message || e;
        super(`Invariant violated: ${message}. This is likely a bug and should be reported.`);
        this.name = "KafkaJSInvariantViolation";
        if (issueUrl !== null) {
          const issueTitle = encodeURIComponent(`Invariant violation: ${message}`);
          this.helpUrl = `${issueUrl}/new?assignees=&labels=bug&template=bug_report.md&title=${issueTitle}`;
        }
      }
    };
    var KafkaJSInvalidVarIntError = class extends KafkaJSNonRetriableError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSNonRetriableError";
      }
    };
    var KafkaJSInvalidLongError = class extends KafkaJSNonRetriableError {
      constructor() {
        super(...arguments);
        this.name = "KafkaJSNonRetriableError";
      }
    };
    var KafkaJSCreateTopicError = class extends KafkaJSProtocolError {
      constructor(e, topicName2) {
        super(e);
        this.topic = topicName2;
        this.name = "KafkaJSCreateTopicError";
      }
    };
    var KafkaJSAggregateError = class extends Error {
      constructor(message, errors) {
        super(message);
        this.errors = errors;
        this.name = "KafkaJSAggregateError";
      }
    };
    var KafkaJSFetcherRebalanceError = class extends Error {
    };
    var isRebalancing = (e) => e.type === "REBALANCE_IN_PROGRESS" || e.type === "NOT_COORDINATOR_FOR_GROUP";
    var isKafkaJSError = (e) => e instanceof KafkaJSError;
    module2.exports = {
      KafkaJSError,
      KafkaJSNonRetriableError,
      KafkaJSPartialMessageError,
      KafkaJSBrokerNotFound,
      KafkaJSProtocolError,
      KafkaJSConnectionError,
      KafkaJSConnectionClosedError,
      KafkaJSRequestTimeoutError,
      KafkaJSSASLAuthenticationError,
      KafkaJSNumberOfRetriesExceeded,
      KafkaJSOffsetOutOfRange,
      KafkaJSMemberIdRequired,
      KafkaJSGroupCoordinatorNotFound,
      KafkaJSNotImplemented,
      KafkaJSMetadataNotLoaded,
      KafkaJSTopicMetadataNotLoaded,
      KafkaJSStaleTopicMetadataAssignment,
      KafkaJSDeleteGroupsError,
      KafkaJSTimeout,
      KafkaJSLockTimeout,
      KafkaJSServerDoesNotSupportApiKey,
      KafkaJSUnsupportedMagicByteInMessageSet,
      KafkaJSDeleteTopicRecordsError,
      KafkaJSInvariantViolation,
      KafkaJSInvalidVarIntError,
      KafkaJSInvalidLongError,
      KafkaJSCreateTopicError,
      KafkaJSAggregateError,
      KafkaJSFetcherRebalanceError,
      isRebalancing,
      isKafkaJSError
    };
  }
});

// node_modules/kafkajs/src/instrumentation/emitter.js
var require_emitter = __commonJS({
  "node_modules/kafkajs/src/instrumentation/emitter.js"(exports, module2) {
    var { EventEmitter } = require("events");
    var InstrumentationEvent = require_event();
    var { KafkaJSError } = require_errors();
    module2.exports = class InstrumentationEventEmitter {
      constructor() {
        this.emitter = new EventEmitter();
      }
      emit(eventName, payload) {
        if (!eventName) {
          throw new KafkaJSError("Invalid event name", { retriable: false });
        }
        if (this.emitter.listenerCount(eventName) > 0) {
          const event = new InstrumentationEvent(eventName, payload);
          this.emitter.emit(eventName, event);
        }
      }
      addListener(eventName, listener) {
        this.emitter.addListener(eventName, listener);
        return () => this.emitter.removeListener(eventName, listener);
      }
    };
  }
});

// node_modules/kafkajs/src/loggers/console.js
var require_console = __commonJS({
  "node_modules/kafkajs/src/loggers/console.js"(exports, module2) {
    var { LEVELS: logLevel } = require_loggers();
    module2.exports = () => ({ namespace, level, label, log }) => {
      const prefix = namespace ? `[${namespace}] ` : "";
      const message = JSON.stringify(Object.assign({ level: label }, log, {
        message: `${prefix}${log.message}`
      }));
      switch (level) {
        case logLevel.INFO:
          return console.info(message);
        case logLevel.ERROR:
          return console.error(message);
        case logLevel.WARN:
          return console.warn(message);
        case logLevel.DEBUG:
          return console.log(message);
      }
    };
  }
});

// node_modules/kafkajs/src/utils/lock.js
var require_lock = __commonJS({
  "node_modules/kafkajs/src/utils/lock.js"(exports, module2) {
    var { format } = require("util");
    var { KafkaJSLockTimeout } = require_errors();
    var PRIVATE = {
      LOCKED: Symbol("private:Lock:locked"),
      TIMEOUT: Symbol("private:Lock:timeout"),
      WAITING: Symbol("private:Lock:waiting"),
      TIMEOUT_ERROR_MESSAGE: Symbol("private:Lock:timeoutErrorMessage")
    };
    var TIMEOUT_MESSAGE = "Timeout while acquiring lock (%d waiting locks)";
    module2.exports = class Lock {
      constructor({ timeout, description = null } = {}) {
        if (typeof timeout !== "number") {
          throw new TypeError(`'timeout' is not a number, received '${typeof timeout}'`);
        }
        this[PRIVATE.LOCKED] = false;
        this[PRIVATE.TIMEOUT] = timeout;
        this[PRIVATE.WAITING] = /* @__PURE__ */ new Set();
        this[PRIVATE.TIMEOUT_ERROR_MESSAGE] = () => {
          const timeoutMessage = format(TIMEOUT_MESSAGE, this[PRIVATE.WAITING].size);
          return description ? `${timeoutMessage}: "${description}"` : timeoutMessage;
        };
      }
      async acquire() {
        return new Promise((resolve, reject) => {
          if (!this[PRIVATE.LOCKED]) {
            this[PRIVATE.LOCKED] = true;
            return resolve();
          }
          let timeoutId = null;
          const tryToAcquire = async () => {
            if (!this[PRIVATE.LOCKED]) {
              this[PRIVATE.LOCKED] = true;
              clearTimeout(timeoutId);
              this[PRIVATE.WAITING].delete(tryToAcquire);
              return resolve();
            }
          };
          this[PRIVATE.WAITING].add(tryToAcquire);
          timeoutId = setTimeout(() => {
            const error = new KafkaJSLockTimeout(this[PRIVATE.TIMEOUT_ERROR_MESSAGE]());
            this[PRIVATE.WAITING].delete(tryToAcquire);
            reject(error);
          }, this[PRIVATE.TIMEOUT]);
        });
      }
      async release() {
        this[PRIVATE.LOCKED] = false;
        const waitingLock = this[PRIVATE.WAITING].values().next().value;
        if (waitingLock) {
          return waitingLock();
        }
      }
    };
  }
});

// node_modules/kafkajs/src/protocol/message/compression/gzip.js
var require_gzip = __commonJS({
  "node_modules/kafkajs/src/protocol/message/compression/gzip.js"(exports, module2) {
    var { promisify } = require("util");
    var zlib = require("zlib");
    var gzip = promisify(zlib.gzip);
    var unzip = promisify(zlib.unzip);
    module2.exports = {
      async compress(encoder) {
        return await gzip(encoder.buffer);
      },
      async decompress(buffer) {
        return await unzip(buffer);
      }
    };
  }
});

// node_modules/kafkajs/src/protocol/message/compression/index.js
var require_compression = __commonJS({
  "node_modules/kafkajs/src/protocol/message/compression/index.js"(exports, module2) {
    var { KafkaJSNotImplemented } = require_errors();
    var COMPRESSION_CODEC_MASK = 7;
    var Types = {
      None: 0,
      GZIP: 1,
      Snappy: 2,
      LZ4: 3,
      ZSTD: 4
    };
    var Codecs = {
      [Types.GZIP]: () => require_gzip(),
      [Types.Snappy]: () => {
        throw new KafkaJSNotImplemented("Snappy compression not implemented");
      },
      [Types.LZ4]: () => {
        throw new KafkaJSNotImplemented("LZ4 compression not implemented");
      },
      [Types.ZSTD]: () => {
        throw new KafkaJSNotImplemented("ZSTD compression not implemented");
      }
    };
    var lookupCodec = (type) => Codecs[type] ? Codecs[type]() : null;
    var lookupCodecByAttributes = (attributes) => {
      const codec = Codecs[attributes & COMPRESSION_CODEC_MASK];
      return codec ? codec() : null;
    };
    module2.exports = {
      Types,
      Codecs,
      lookupCodec,
      lookupCodecByAttributes,
      COMPRESSION_CODEC_MASK
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/apiKeys.js
var require_apiKeys = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/apiKeys.js"(exports, module2) {
    module2.exports = {
      Produce: 0,
      Fetch: 1,
      ListOffsets: 2,
      Metadata: 3,
      LeaderAndIsr: 4,
      StopReplica: 5,
      UpdateMetadata: 6,
      ControlledShutdown: 7,
      OffsetCommit: 8,
      OffsetFetch: 9,
      GroupCoordinator: 10,
      JoinGroup: 11,
      Heartbeat: 12,
      LeaveGroup: 13,
      SyncGroup: 14,
      DescribeGroups: 15,
      ListGroups: 16,
      SaslHandshake: 17,
      ApiVersions: 18,
      CreateTopics: 19,
      DeleteTopics: 20,
      DeleteRecords: 21,
      InitProducerId: 22,
      OffsetForLeaderEpoch: 23,
      AddPartitionsToTxn: 24,
      AddOffsetsToTxn: 25,
      EndTxn: 26,
      WriteTxnMarkers: 27,
      TxnOffsetCommit: 28,
      DescribeAcls: 29,
      CreateAcls: 30,
      DeleteAcls: 31,
      DescribeConfigs: 32,
      AlterConfigs: 33,
      AlterReplicaLogDirs: 34,
      DescribeLogDirs: 35,
      SaslAuthenticate: 36,
      CreatePartitions: 37,
      CreateDelegationToken: 38,
      RenewDelegationToken: 39,
      ExpireDelegationToken: 40,
      DescribeDelegationToken: 41,
      DeleteGroups: 42,
      ElectPreferredLeaders: 43
    };
  }
});

// node_modules/kafkajs/src/utils/long.js
var require_long = __commonJS({
  "node_modules/kafkajs/src/utils/long.js"(exports, module2) {
    var Long = class {
      constructor(value) {
        this.value = value;
      }
      static isLong(obj) {
        return typeof obj.value === "bigint";
      }
      static fromBits(value) {
        return new Long(BigInt(value));
      }
      static fromInt(value) {
        if (isNaN(value))
          return Long.ZERO;
        return new Long(BigInt.asIntN(64, BigInt(value)));
      }
      static fromNumber(value) {
        if (isNaN(value))
          return Long.ZERO;
        return new Long(BigInt(value));
      }
      static fromValue(val) {
        if (typeof val === "number")
          return this.fromNumber(val);
        if (typeof val === "string")
          return this.fromString(val);
        if (typeof val === "bigint")
          return new Long(val);
        if (this.isLong(val))
          return new Long(BigInt(val.value));
        return new Long(BigInt(val));
      }
      static fromString(str) {
        if (str.length === 0)
          throw Error("empty string");
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
          return Long.ZERO;
        return new Long(BigInt(str));
      }
      isZero() {
        return this.value === BigInt(0);
      }
      isNegative() {
        return this.value < BigInt(0);
      }
      toString() {
        return String(this.value);
      }
      toNumber() {
        return Number(this.value);
      }
      toInt() {
        return Number(BigInt.asIntN(32, this.value));
      }
      toJSON() {
        return this.toString();
      }
      shiftLeft(numBits) {
        return new Long(this.value << BigInt(numBits));
      }
      shiftRight(numBits) {
        return new Long(this.value >> BigInt(numBits));
      }
      or(other) {
        if (!Long.isLong(other))
          other = Long.fromValue(other);
        return Long.fromBits(this.value | other.value);
      }
      xor(other) {
        if (!Long.isLong(other))
          other = Long.fromValue(other);
        return new Long(this.value ^ other.value);
      }
      and(other) {
        if (!Long.isLong(other))
          other = Long.fromValue(other);
        return new Long(this.value & other.value);
      }
      not() {
        return new Long(~this.value);
      }
      shiftRightUnsigned(numBits) {
        return new Long(this.value >> BigInt.asUintN(64, BigInt(numBits)));
      }
      equals(other) {
        if (!Long.isLong(other))
          other = Long.fromValue(other);
        return this.value === other.value;
      }
      greaterThanOrEqual(other) {
        if (!Long.isLong(other))
          other = Long.fromValue(other);
        return this.value >= other.value;
      }
      gte(other) {
        return this.greaterThanOrEqual(other);
      }
      notEquals(other) {
        if (!Long.isLong(other))
          other = Long.fromValue(other);
        return !this.equals(other);
      }
      add(addend) {
        if (!Long.isLong(addend))
          addend = Long.fromValue(addend);
        return new Long(this.value + addend.value);
      }
      subtract(subtrahend) {
        if (!Long.isLong(subtrahend))
          subtrahend = Long.fromValue(subtrahend);
        return this.add(subtrahend.negate());
      }
      multiply(multiplier) {
        if (this.isZero())
          return Long.ZERO;
        if (!Long.isLong(multiplier))
          multiplier = Long.fromValue(multiplier);
        return new Long(this.value * multiplier.value);
      }
      divide(divisor) {
        if (!Long.isLong(divisor))
          divisor = Long.fromValue(divisor);
        if (divisor.isZero())
          throw Error("division by zero");
        return new Long(this.value / divisor.value);
      }
      compare(other) {
        if (!Long.isLong(other))
          other = Long.fromValue(other);
        if (this.value === other.value)
          return 0;
        if (this.value > other.value)
          return 1;
        if (other.value > this.value)
          return -1;
      }
      lessThan(other) {
        if (!Long.isLong(other))
          other = Long.fromValue(other);
        return this.value < other.value;
      }
      negate() {
        if (this.equals(Long.MIN_VALUE)) {
          return Long.MIN_VALUE;
        }
        return this.not().add(Long.ONE);
      }
      getHighBits() {
        return Number(BigInt.asIntN(32, this.value >> BigInt(32)));
      }
      getLowBits() {
        return Number(BigInt.asIntN(32, this.value));
      }
    };
    Long.MIN_VALUE = new Long(BigInt("-9223372036854775808"));
    Long.MAX_VALUE = new Long(BigInt("9223372036854775807"));
    Long.ZERO = Long.fromInt(0);
    Long.ONE = Long.fromInt(1);
    module2.exports = Long;
  }
});

// node_modules/kafkajs/src/protocol/encoder.js
var require_encoder = __commonJS({
  "node_modules/kafkajs/src/protocol/encoder.js"(exports, module2) {
    var Long = require_long();
    var INT8_SIZE = 1;
    var INT16_SIZE = 2;
    var INT32_SIZE = 4;
    var INT64_SIZE = 8;
    var DOUBLE_SIZE = 8;
    var MOST_SIGNIFICANT_BIT = 128;
    var OTHER_BITS = 127;
    var UNSIGNED_INT32_MAX_NUMBER = 4294967168;
    var UNSIGNED_INT64_MAX_NUMBER = 0xffffffffffffff80n;
    module2.exports = class Encoder {
      static encodeZigZag(value) {
        return value << 1 ^ value >> 31;
      }
      static encodeZigZag64(value) {
        const longValue = Long.fromValue(value);
        return longValue.shiftLeft(1).xor(longValue.shiftRight(63));
      }
      static sizeOfVarInt(value) {
        let encodedValue = this.encodeZigZag(value);
        let bytes = 1;
        while ((encodedValue & UNSIGNED_INT32_MAX_NUMBER) !== 0) {
          bytes += 1;
          encodedValue >>>= 7;
        }
        return bytes;
      }
      static sizeOfVarLong(value) {
        let longValue = Encoder.encodeZigZag64(value);
        let bytes = 1;
        while (longValue.and(UNSIGNED_INT64_MAX_NUMBER).notEquals(Long.fromInt(0))) {
          bytes += 1;
          longValue = longValue.shiftRightUnsigned(7);
        }
        return bytes;
      }
      static sizeOfVarIntBytes(value) {
        const size = value == null ? -1 : Buffer.byteLength(value);
        if (size < 0) {
          return Encoder.sizeOfVarInt(-1);
        }
        return Encoder.sizeOfVarInt(size) + size;
      }
      static nextPowerOfTwo(value) {
        return 1 << 31 - Math.clz32(value) + 1;
      }
      constructor(initialSize = 511) {
        this.buf = Buffer.alloc(Encoder.nextPowerOfTwo(initialSize));
        this.offset = 0;
      }
      writeBufferInternal(buffer) {
        const bufferLength = buffer.length;
        this.ensureAvailable(bufferLength);
        buffer.copy(this.buf, this.offset, 0);
        this.offset += bufferLength;
      }
      ensureAvailable(length) {
        if (this.offset + length > this.buf.length) {
          const newLength = Encoder.nextPowerOfTwo(this.offset + length);
          const newBuffer = Buffer.alloc(newLength);
          this.buf.copy(newBuffer, 0, 0, this.offset);
          this.buf = newBuffer;
        }
      }
      get buffer() {
        return this.buf.slice(0, this.offset);
      }
      writeInt8(value) {
        this.ensureAvailable(INT8_SIZE);
        this.buf.writeInt8(value, this.offset);
        this.offset += INT8_SIZE;
        return this;
      }
      writeInt16(value) {
        this.ensureAvailable(INT16_SIZE);
        this.buf.writeInt16BE(value, this.offset);
        this.offset += INT16_SIZE;
        return this;
      }
      writeInt32(value) {
        this.ensureAvailable(INT32_SIZE);
        this.buf.writeInt32BE(value, this.offset);
        this.offset += INT32_SIZE;
        return this;
      }
      writeUInt32(value) {
        this.ensureAvailable(INT32_SIZE);
        this.buf.writeUInt32BE(value, this.offset);
        this.offset += INT32_SIZE;
        return this;
      }
      writeInt64(value) {
        this.ensureAvailable(INT64_SIZE);
        const longValue = Long.fromValue(value);
        this.buf.writeInt32BE(longValue.getHighBits(), this.offset);
        this.buf.writeInt32BE(longValue.getLowBits(), this.offset + INT32_SIZE);
        this.offset += INT64_SIZE;
        return this;
      }
      writeDouble(value) {
        this.ensureAvailable(DOUBLE_SIZE);
        this.buf.writeDoubleBE(value, this.offset);
        this.offset += DOUBLE_SIZE;
        return this;
      }
      writeBoolean(value) {
        value ? this.writeInt8(1) : this.writeInt8(0);
        return this;
      }
      writeString(value) {
        if (value == null) {
          this.writeInt16(-1);
          return this;
        }
        const byteLength = Buffer.byteLength(value, "utf8");
        this.ensureAvailable(INT16_SIZE + byteLength);
        this.writeInt16(byteLength);
        this.buf.write(value, this.offset, byteLength, "utf8");
        this.offset += byteLength;
        return this;
      }
      writeVarIntString(value) {
        if (value == null) {
          this.writeVarInt(-1);
          return this;
        }
        const byteLength = Buffer.byteLength(value, "utf8");
        this.writeVarInt(byteLength);
        this.ensureAvailable(byteLength);
        this.buf.write(value, this.offset, byteLength, "utf8");
        this.offset += byteLength;
        return this;
      }
      writeUVarIntString(value) {
        if (value == null) {
          this.writeUVarInt(0);
          return this;
        }
        const byteLength = Buffer.byteLength(value, "utf8");
        this.writeUVarInt(byteLength + 1);
        this.ensureAvailable(byteLength);
        this.buf.write(value, this.offset, byteLength, "utf8");
        this.offset += byteLength;
        return this;
      }
      writeBytes(value) {
        if (value == null) {
          this.writeInt32(-1);
          return this;
        }
        if (Buffer.isBuffer(value)) {
          this.ensureAvailable(INT32_SIZE + value.length);
          this.writeInt32(value.length);
          this.writeBufferInternal(value);
        } else {
          const valueToWrite = String(value);
          const byteLength = Buffer.byteLength(valueToWrite, "utf8");
          this.ensureAvailable(INT32_SIZE + byteLength);
          this.writeInt32(byteLength);
          this.buf.write(valueToWrite, this.offset, byteLength, "utf8");
          this.offset += byteLength;
        }
        return this;
      }
      writeVarIntBytes(value) {
        if (value == null) {
          this.writeVarInt(-1);
          return this;
        }
        if (Buffer.isBuffer(value)) {
          this.writeVarInt(value.length);
          this.writeBufferInternal(value);
        } else {
          const valueToWrite = String(value);
          const byteLength = Buffer.byteLength(valueToWrite, "utf8");
          this.writeVarInt(byteLength);
          this.ensureAvailable(byteLength);
          this.buf.write(valueToWrite, this.offset, byteLength, "utf8");
          this.offset += byteLength;
        }
        return this;
      }
      writeUVarIntBytes(value) {
        if (value == null) {
          this.writeVarInt(0);
          return this;
        }
        if (Buffer.isBuffer(value)) {
          this.writeUVarInt(value.length + 1);
          this.writeBufferInternal(value);
        } else {
          const valueToWrite = String(value);
          const byteLength = Buffer.byteLength(valueToWrite, "utf8");
          this.writeUVarInt(byteLength + 1);
          this.ensureAvailable(byteLength);
          this.buf.write(valueToWrite, this.offset, byteLength, "utf8");
          this.offset += byteLength;
        }
        return this;
      }
      writeEncoder(value) {
        if (value == null || !Buffer.isBuffer(value.buf)) {
          throw new Error("value should be an instance of Encoder");
        }
        this.writeBufferInternal(value.buffer);
        return this;
      }
      writeEncoderArray(value) {
        if (!Array.isArray(value) || value.some((v) => v == null || !Buffer.isBuffer(v.buf))) {
          throw new Error("all values should be an instance of Encoder[]");
        }
        value.forEach((v) => {
          this.writeBufferInternal(v.buffer);
        });
        return this;
      }
      writeBuffer(value) {
        if (!Buffer.isBuffer(value)) {
          throw new Error("value should be an instance of Buffer");
        }
        this.writeBufferInternal(value);
        return this;
      }
      writeNullableArray(array, type) {
        const length = array.length !== 0 ? array.length : -1;
        this.writeArray(array, type, length);
        return this;
      }
      writeArray(array, type, length) {
        const arrayLength = length == null ? array.length : length;
        this.writeInt32(arrayLength);
        if (type !== void 0) {
          switch (type) {
            case "int32":
            case "number":
              array.forEach((value) => this.writeInt32(value));
              break;
            case "string":
              array.forEach((value) => this.writeString(value));
              break;
            case "object":
              this.writeEncoderArray(array);
              break;
          }
        } else {
          array.forEach((value) => {
            switch (typeof value) {
              case "number":
                this.writeInt32(value);
                break;
              case "string":
                this.writeString(value);
                break;
              case "object":
                this.writeEncoder(value);
                break;
            }
          });
        }
        return this;
      }
      writeVarIntArray(array, type) {
        if (type === "object") {
          this.writeVarInt(array.length);
          this.writeEncoderArray(array);
        } else {
          const objectArray = array.filter((v) => typeof v === "object");
          this.writeVarInt(objectArray.length);
          this.writeEncoderArray(objectArray);
        }
        return this;
      }
      writeUVarIntArray(array, type) {
        if (type === "object") {
          this.writeUVarInt(array.length + 1);
          this.writeEncoderArray(array);
        } else {
          const objectArray = array.filter((v) => typeof v === "object");
          this.writeUVarInt(objectArray.length + 1);
          this.writeEncoderArray(objectArray);
        }
        return this;
      }
      writeVarInt(value) {
        return this.writeUVarInt(Encoder.encodeZigZag(value));
      }
      writeUVarInt(value) {
        const byteArray = [];
        while ((value & UNSIGNED_INT32_MAX_NUMBER) !== 0) {
          byteArray.push(value & OTHER_BITS | MOST_SIGNIFICANT_BIT);
          value >>>= 7;
        }
        byteArray.push(value & OTHER_BITS);
        this.writeBufferInternal(Buffer.from(byteArray));
        return this;
      }
      writeVarLong(value) {
        const byteArray = [];
        let longValue = Encoder.encodeZigZag64(value);
        while (longValue.and(UNSIGNED_INT64_MAX_NUMBER).notEquals(Long.fromInt(0))) {
          byteArray.push(longValue.and(OTHER_BITS).or(MOST_SIGNIFICANT_BIT).toInt());
          longValue = longValue.shiftRightUnsigned(7);
        }
        byteArray.push(longValue.toInt());
        this.writeBufferInternal(Buffer.from(byteArray));
        return this;
      }
      size() {
        return this.offset;
      }
      toJSON() {
        return this.buffer.toJSON();
      }
    };
  }
});

// node_modules/kafkajs/src/protocol/crc32.js
var require_crc32 = __commonJS({
  "node_modules/kafkajs/src/protocol/crc32.js"(exports, module2) {
    var CRC_TABLE = new Int32Array([
      0,
      1996959894,
      3993919788,
      2567524794,
      124634137,
      1886057615,
      3915621685,
      2657392035,
      249268274,
      2044508324,
      3772115230,
      2547177864,
      162941995,
      2125561021,
      3887607047,
      2428444049,
      498536548,
      1789927666,
      4089016648,
      2227061214,
      450548861,
      1843258603,
      4107580753,
      2211677639,
      325883990,
      1684777152,
      4251122042,
      2321926636,
      335633487,
      1661365465,
      4195302755,
      2366115317,
      997073096,
      1281953886,
      3579855332,
      2724688242,
      1006888145,
      1258607687,
      3524101629,
      2768942443,
      901097722,
      1119000684,
      3686517206,
      2898065728,
      853044451,
      1172266101,
      3705015759,
      2882616665,
      651767980,
      1373503546,
      3369554304,
      3218104598,
      565507253,
      1454621731,
      3485111705,
      3099436303,
      671266974,
      1594198024,
      3322730930,
      2970347812,
      795835527,
      1483230225,
      3244367275,
      3060149565,
      1994146192,
      31158534,
      2563907772,
      4023717930,
      1907459465,
      112637215,
      2680153253,
      3904427059,
      2013776290,
      251722036,
      2517215374,
      3775830040,
      2137656763,
      141376813,
      2439277719,
      3865271297,
      1802195444,
      476864866,
      2238001368,
      4066508878,
      1812370925,
      453092731,
      2181625025,
      4111451223,
      1706088902,
      314042704,
      2344532202,
      4240017532,
      1658658271,
      366619977,
      2362670323,
      4224994405,
      1303535960,
      984961486,
      2747007092,
      3569037538,
      1256170817,
      1037604311,
      2765210733,
      3554079995,
      1131014506,
      879679996,
      2909243462,
      3663771856,
      1141124467,
      855842277,
      2852801631,
      3708648649,
      1342533948,
      654459306,
      3188396048,
      3373015174,
      1466479909,
      544179635,
      3110523913,
      3462522015,
      1591671054,
      702138776,
      2966460450,
      3352799412,
      1504918807,
      783551873,
      3082640443,
      3233442989,
      3988292384,
      2596254646,
      62317068,
      1957810842,
      3939845945,
      2647816111,
      81470997,
      1943803523,
      3814918930,
      2489596804,
      225274430,
      2053790376,
      3826175755,
      2466906013,
      167816743,
      2097651377,
      4027552580,
      2265490386,
      503444072,
      1762050814,
      4150417245,
      2154129355,
      426522225,
      1852507879,
      4275313526,
      2312317920,
      282753626,
      1742555852,
      4189708143,
      2394877945,
      397917763,
      1622183637,
      3604390888,
      2714866558,
      953729732,
      1340076626,
      3518719985,
      2797360999,
      1068828381,
      1219638859,
      3624741850,
      2936675148,
      906185462,
      1090812512,
      3747672003,
      2825379669,
      829329135,
      1181335161,
      3412177804,
      3160834842,
      628085408,
      1382605366,
      3423369109,
      3138078467,
      570562233,
      1426400815,
      3317316542,
      2998733608,
      733239954,
      1555261956,
      3268935591,
      3050360625,
      752459403,
      1541320221,
      2607071920,
      3965973030,
      1969922972,
      40735498,
      2617837225,
      3943577151,
      1913087877,
      83908371,
      2512341634,
      3803740692,
      2075208622,
      213261112,
      2463272603,
      3855990285,
      2094854071,
      198958881,
      2262029012,
      4057260610,
      1759359992,
      534414190,
      2176718541,
      4139329115,
      1873836001,
      414664567,
      2282248934,
      4279200368,
      1711684554,
      285281116,
      2405801727,
      4167216745,
      1634467795,
      376229701,
      2685067896,
      3608007406,
      1308918612,
      956543938,
      2808555105,
      3495958263,
      1231636301,
      1047427035,
      2932959818,
      3654703836,
      1088359270,
      936918e3,
      2847714899,
      3736837829,
      1202900863,
      817233897,
      3183342108,
      3401237130,
      1404277552,
      615818150,
      3134207493,
      3453421203,
      1423857449,
      601450431,
      3009837614,
      3294710456,
      1567103746,
      711928724,
      3020668471,
      3272380065,
      1510334235,
      755167117
    ]);
    module2.exports = (encoder) => {
      const { buffer } = encoder;
      const l = buffer.length;
      let crc = -1;
      for (let n = 0; n < l; n++) {
        crc = CRC_TABLE[(crc ^ buffer[n]) & 255] ^ crc >>> 8;
      }
      return crc ^ -1;
    };
  }
});

// node_modules/kafkajs/src/protocol/message/v0/index.js
var require_v0 = __commonJS({
  "node_modules/kafkajs/src/protocol/message/v0/index.js"(exports, module2) {
    var Encoder = require_encoder();
    var crc32 = require_crc32();
    var { Types: Compression, COMPRESSION_CODEC_MASK } = require_compression();
    module2.exports = ({ compression = Compression.None, key, value }) => {
      const content = new Encoder().writeInt8(0).writeInt8(compression & COMPRESSION_CODEC_MASK).writeBytes(key).writeBytes(value);
      const crc = crc32(content);
      return new Encoder().writeInt32(crc).writeEncoder(content);
    };
  }
});

// node_modules/kafkajs/src/protocol/message/v1/index.js
var require_v1 = __commonJS({
  "node_modules/kafkajs/src/protocol/message/v1/index.js"(exports, module2) {
    var Encoder = require_encoder();
    var crc32 = require_crc32();
    var { Types: Compression, COMPRESSION_CODEC_MASK } = require_compression();
    module2.exports = ({ compression = Compression.None, timestamp = Date.now(), key, value }) => {
      const content = new Encoder().writeInt8(1).writeInt8(compression & COMPRESSION_CODEC_MASK).writeInt64(timestamp).writeBytes(key).writeBytes(value);
      const crc = crc32(content);
      return new Encoder().writeInt32(crc).writeEncoder(content);
    };
  }
});

// node_modules/kafkajs/src/protocol/message/index.js
var require_message = __commonJS({
  "node_modules/kafkajs/src/protocol/message/index.js"(exports, module2) {
    var versions = {
      0: require_v0(),
      1: require_v1()
    };
    module2.exports = ({ version = 0 }) => versions[version];
  }
});

// node_modules/kafkajs/src/protocol/messageSet/index.js
var require_messageSet = __commonJS({
  "node_modules/kafkajs/src/protocol/messageSet/index.js"(exports, module2) {
    var Encoder = require_encoder();
    var MessageProtocol = require_message();
    var { Types } = require_compression();
    module2.exports = ({ messageVersion = 0, compression, entries }) => {
      const isCompressed = compression !== Types.None;
      const Message = MessageProtocol({ version: messageVersion });
      const encoder = new Encoder();
      entries.forEach((entry, i) => {
        const message = Message(entry);
        encoder.writeInt64(isCompressed ? i : -1);
        encoder.writeInt32(message.size());
        encoder.writeEncoder(message);
      });
      return encoder;
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v0/request.js
var require_request = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Produce: apiKey } = require_apiKeys();
    var MessageSet = require_messageSet();
    module2.exports = ({ acks, timeout, topicData }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "Produce",
      expectResponse: () => acks !== 0,
      encode: async () => {
        return new Encoder().writeInt16(acks).writeInt32(timeout).writeArray(topicData.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartitions));
    };
    var encodePartitions = ({ partition, messages }) => {
      const messageSet = MessageSet({ messageVersion: 0, entries: messages });
      return new Encoder().writeInt32(partition).writeInt32(messageSet.size()).writeEncoder(messageSet);
    };
  }
});

// node_modules/kafkajs/src/protocol/decoder.js
var require_decoder = __commonJS({
  "node_modules/kafkajs/src/protocol/decoder.js"(exports, module2) {
    var { KafkaJSInvalidVarIntError, KafkaJSInvalidLongError } = require_errors();
    var Long = require_long();
    var INT8_SIZE = 1;
    var INT16_SIZE = 2;
    var INT32_SIZE = 4;
    var INT64_SIZE = 8;
    var DOUBLE_SIZE = 8;
    var MOST_SIGNIFICANT_BIT = 128;
    var OTHER_BITS = 127;
    module2.exports = class Decoder {
      static int32Size() {
        return INT32_SIZE;
      }
      static decodeZigZag(value) {
        return value >>> 1 ^ -(value & 1);
      }
      static decodeZigZag64(longValue) {
        return longValue.shiftRightUnsigned(1).xor(longValue.and(Long.fromInt(1)).negate());
      }
      constructor(buffer) {
        this.buffer = buffer;
        this.offset = 0;
      }
      readInt8() {
        const value = this.buffer.readInt8(this.offset);
        this.offset += INT8_SIZE;
        return value;
      }
      canReadInt16() {
        return this.canReadBytes(INT16_SIZE);
      }
      readInt16() {
        const value = this.buffer.readInt16BE(this.offset);
        this.offset += INT16_SIZE;
        return value;
      }
      canReadInt32() {
        return this.canReadBytes(INT32_SIZE);
      }
      readInt32() {
        const value = this.buffer.readInt32BE(this.offset);
        this.offset += INT32_SIZE;
        return value;
      }
      canReadInt64() {
        return this.canReadBytes(INT64_SIZE);
      }
      readInt64() {
        const first = this.buffer[this.offset];
        const last = this.buffer[this.offset + 7];
        const low = (first << 24) + this.buffer[this.offset + 1] * 2 ** 16 + this.buffer[this.offset + 2] * 2 ** 8 + this.buffer[this.offset + 3];
        const high = this.buffer[this.offset + 4] * 2 ** 24 + this.buffer[this.offset + 5] * 2 ** 16 + this.buffer[this.offset + 6] * 2 ** 8 + last;
        this.offset += INT64_SIZE;
        return (BigInt(low) << 32n) + BigInt(high);
      }
      readDouble() {
        const value = this.buffer.readDoubleBE(this.offset);
        this.offset += DOUBLE_SIZE;
        return value;
      }
      readString() {
        const byteLength = this.readInt16();
        if (byteLength === -1) {
          return null;
        }
        const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength);
        const value = stringBuffer.toString("utf8");
        this.offset += byteLength;
        return value;
      }
      readVarIntString() {
        const byteLength = this.readVarInt();
        if (byteLength === -1) {
          return null;
        }
        const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength);
        const value = stringBuffer.toString("utf8");
        this.offset += byteLength;
        return value;
      }
      readUVarIntString() {
        const byteLength = this.readUVarInt();
        if (byteLength === 0) {
          return null;
        }
        const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength);
        const value = stringBuffer.toString("utf8");
        this.offset += byteLength;
        return value;
      }
      canReadBytes(length) {
        return Buffer.byteLength(this.buffer) - this.offset >= length;
      }
      readBytes(byteLength = this.readInt32()) {
        if (byteLength === -1) {
          return null;
        }
        const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength);
        this.offset += byteLength;
        return stringBuffer;
      }
      readVarIntBytes() {
        const byteLength = this.readVarInt();
        if (byteLength === -1) {
          return null;
        }
        const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength);
        this.offset += byteLength;
        return stringBuffer;
      }
      readUVarIntBytes() {
        const byteLength = this.readUVarInt();
        if (byteLength === 0) {
          return null;
        }
        const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength);
        this.offset += byteLength;
        return stringBuffer;
      }
      readBoolean() {
        return this.readInt8() === 1;
      }
      readAll() {
        const result = this.buffer.slice(this.offset);
        this.offset += Buffer.byteLength(this.buffer);
        return result;
      }
      readArray(reader) {
        const length = this.readInt32();
        if (length === -1) {
          return [];
        }
        const array = new Array(length);
        for (let i = 0; i < length; i++) {
          array[i] = reader(this);
        }
        return array;
      }
      readVarIntArray(reader) {
        const length = this.readVarInt();
        if (length === -1) {
          return [];
        }
        const array = new Array(length);
        for (let i = 0; i < length; i++) {
          array[i] = reader(this);
        }
        return array;
      }
      readUVarIntArray(reader) {
        const length = this.readUVarInt();
        if (length === 0) {
          return [];
        }
        const array = new Array(length - 1);
        for (let i = 0; i < length - 1; i++) {
          array[i] = reader(this);
        }
        return array;
      }
      async readArrayAsync(reader) {
        const length = this.readInt32();
        if (length === -1) {
          return [];
        }
        const array = new Array(length);
        for (let i = 0; i < length; i++) {
          array[i] = await reader(this);
        }
        return array;
      }
      readVarInt() {
        let currentByte;
        let result = 0;
        let i = 0;
        do {
          currentByte = this.buffer[this.offset++];
          result += (currentByte & OTHER_BITS) << i;
          i += 7;
        } while (currentByte >= MOST_SIGNIFICANT_BIT);
        return Decoder.decodeZigZag(result);
      }
      readUVarInt() {
        let currentByte;
        let result = 0;
        let i = 0;
        while (((currentByte = this.buffer[this.offset++]) & MOST_SIGNIFICANT_BIT) !== 0) {
          result |= (currentByte & OTHER_BITS) << i;
          i += 7;
          if (i > 28) {
            throw new KafkaJSInvalidVarIntError("Invalid VarInt, must contain 5 bytes or less");
          }
        }
        result |= currentByte << i;
        return result >>> 0;
      }
      readVarLong() {
        let currentByte;
        let result = Long.fromInt(0);
        let i = 0;
        do {
          if (i > 63) {
            throw new KafkaJSInvalidLongError("Invalid Long, must contain 9 bytes or less");
          }
          currentByte = this.buffer[this.offset++];
          result = result.add(Long.fromInt(currentByte & OTHER_BITS).shiftLeft(i));
          i += 7;
        } while (currentByte >= MOST_SIGNIFICANT_BIT);
        return Decoder.decodeZigZag64(result);
      }
      slice(size) {
        return new Decoder(this.buffer.slice(this.offset, this.offset + size));
      }
      forward(size) {
        this.offset += size;
      }
    };
  }
});

// node_modules/kafkajs/src/utils/websiteUrl.js
var require_websiteUrl = __commonJS({
  "node_modules/kafkajs/src/utils/websiteUrl.js"(exports, module2) {
    var BASE_URL = "https://kafka.js.org";
    var stripLeading = (char) => (str) => str.charAt(0) === char ? str.substring(1) : str;
    var stripLeadingSlash = stripLeading("/");
    var stripLeadingHash = stripLeading("#");
    module2.exports = (path, hash) => `${BASE_URL}/${stripLeadingSlash(path)}${hash ? "#" + stripLeadingHash(hash) : ""}`;
  }
});

// node_modules/kafkajs/src/protocol/error.js
var require_error = __commonJS({
  "node_modules/kafkajs/src/protocol/error.js"(exports, module2) {
    var { KafkaJSProtocolError } = require_errors();
    var websiteUrl = require_websiteUrl();
    var errorCodes = [
      {
        type: "UNKNOWN",
        code: -1,
        retriable: false,
        message: "The server experienced an unexpected error when processing the request"
      },
      {
        type: "OFFSET_OUT_OF_RANGE",
        code: 1,
        retriable: false,
        message: "The requested offset is not within the range of offsets maintained by the server"
      },
      {
        type: "CORRUPT_MESSAGE",
        code: 2,
        retriable: true,
        message: "This message has failed its CRC checksum, exceeds the valid size, or is otherwise corrupt"
      },
      {
        type: "UNKNOWN_TOPIC_OR_PARTITION",
        code: 3,
        retriable: true,
        message: "This server does not host this topic-partition"
      },
      {
        type: "INVALID_FETCH_SIZE",
        code: 4,
        retriable: false,
        message: "The requested fetch size is invalid"
      },
      {
        type: "LEADER_NOT_AVAILABLE",
        code: 5,
        retriable: true,
        message: "There is no leader for this topic-partition as we are in the middle of a leadership election"
      },
      {
        type: "NOT_LEADER_FOR_PARTITION",
        code: 6,
        retriable: true,
        message: "This server is not the leader for that topic-partition"
      },
      {
        type: "REQUEST_TIMED_OUT",
        code: 7,
        retriable: true,
        message: "The request timed out"
      },
      {
        type: "BROKER_NOT_AVAILABLE",
        code: 8,
        retriable: false,
        message: "The broker is not available"
      },
      {
        type: "REPLICA_NOT_AVAILABLE",
        code: 9,
        retriable: true,
        message: "The replica is not available for the requested topic-partition"
      },
      {
        type: "MESSAGE_TOO_LARGE",
        code: 10,
        retriable: false,
        message: "The request included a message larger than the max message size the server will accept"
      },
      {
        type: "STALE_CONTROLLER_EPOCH",
        code: 11,
        retriable: false,
        message: "The controller moved to another broker"
      },
      {
        type: "OFFSET_METADATA_TOO_LARGE",
        code: 12,
        retriable: false,
        message: "The metadata field of the offset request was too large"
      },
      {
        type: "NETWORK_EXCEPTION",
        code: 13,
        retriable: true,
        message: "The server disconnected before a response was received"
      },
      {
        type: "GROUP_LOAD_IN_PROGRESS",
        code: 14,
        retriable: true,
        message: "The coordinator is loading and hence can't process requests for this group"
      },
      {
        type: "GROUP_COORDINATOR_NOT_AVAILABLE",
        code: 15,
        retriable: true,
        message: "The group coordinator is not available"
      },
      {
        type: "NOT_COORDINATOR_FOR_GROUP",
        code: 16,
        retriable: true,
        message: "This is not the correct coordinator for this group"
      },
      {
        type: "INVALID_TOPIC_EXCEPTION",
        code: 17,
        retriable: false,
        message: "The request attempted to perform an operation on an invalid topic"
      },
      {
        type: "RECORD_LIST_TOO_LARGE",
        code: 18,
        retriable: false,
        message: "The request included message batch larger than the configured segment size on the server"
      },
      {
        type: "NOT_ENOUGH_REPLICAS",
        code: 19,
        retriable: true,
        message: "Messages are rejected since there are fewer in-sync replicas than required"
      },
      {
        type: "NOT_ENOUGH_REPLICAS_AFTER_APPEND",
        code: 20,
        retriable: true,
        message: "Messages are written to the log, but to fewer in-sync replicas than required"
      },
      {
        type: "INVALID_REQUIRED_ACKS",
        code: 21,
        retriable: false,
        message: "Produce request specified an invalid value for required acks"
      },
      {
        type: "ILLEGAL_GENERATION",
        code: 22,
        retriable: false,
        message: "Specified group generation id is not valid"
      },
      {
        type: "INCONSISTENT_GROUP_PROTOCOL",
        code: 23,
        retriable: false,
        message: "The group member's supported protocols are incompatible with those of existing members"
      },
      {
        type: "INVALID_GROUP_ID",
        code: 24,
        retriable: false,
        message: "The configured groupId is invalid"
      },
      {
        type: "UNKNOWN_MEMBER_ID",
        code: 25,
        retriable: false,
        message: "The coordinator is not aware of this member"
      },
      {
        type: "INVALID_SESSION_TIMEOUT",
        code: 26,
        retriable: false,
        message: "The session timeout is not within the range allowed by the broker (as configured by group.min.session.timeout.ms and group.max.session.timeout.ms)"
      },
      {
        type: "REBALANCE_IN_PROGRESS",
        code: 27,
        retriable: false,
        message: "The group is rebalancing, so a rejoin is needed",
        helpUrl: websiteUrl("docs/faq", "what-does-it-mean-to-get-rebalance-in-progress-errors")
      },
      {
        type: "INVALID_COMMIT_OFFSET_SIZE",
        code: 28,
        retriable: false,
        message: "The committing offset data size is not valid"
      },
      {
        type: "TOPIC_AUTHORIZATION_FAILED",
        code: 29,
        retriable: false,
        message: "Not authorized to access topics: [Topic authorization failed]"
      },
      {
        type: "GROUP_AUTHORIZATION_FAILED",
        code: 30,
        retriable: false,
        message: "Not authorized to access group: Group authorization failed"
      },
      {
        type: "CLUSTER_AUTHORIZATION_FAILED",
        code: 31,
        retriable: false,
        message: "Cluster authorization failed"
      },
      {
        type: "INVALID_TIMESTAMP",
        code: 32,
        retriable: false,
        message: "The timestamp of the message is out of acceptable range"
      },
      {
        type: "UNSUPPORTED_SASL_MECHANISM",
        code: 33,
        retriable: false,
        message: "The broker does not support the requested SASL mechanism"
      },
      {
        type: "ILLEGAL_SASL_STATE",
        code: 34,
        retriable: false,
        message: "Request is not valid given the current SASL state"
      },
      {
        type: "UNSUPPORTED_VERSION",
        code: 35,
        retriable: false,
        message: "The version of API is not supported"
      },
      {
        type: "TOPIC_ALREADY_EXISTS",
        code: 36,
        retriable: false,
        message: "Topic with this name already exists"
      },
      {
        type: "INVALID_PARTITIONS",
        code: 37,
        retriable: false,
        message: "Number of partitions is invalid"
      },
      {
        type: "INVALID_REPLICATION_FACTOR",
        code: 38,
        retriable: false,
        message: "Replication-factor is invalid"
      },
      {
        type: "INVALID_REPLICA_ASSIGNMENT",
        code: 39,
        retriable: false,
        message: "Replica assignment is invalid"
      },
      {
        type: "INVALID_CONFIG",
        code: 40,
        retriable: false,
        message: "Configuration is invalid"
      },
      {
        type: "NOT_CONTROLLER",
        code: 41,
        retriable: true,
        message: "This is not the correct controller for this cluster"
      },
      {
        type: "INVALID_REQUEST",
        code: 42,
        retriable: false,
        message: "This most likely occurs because of a request being malformed by the client library or the message was sent to an incompatible broker. See the broker logs for more details"
      },
      {
        type: "UNSUPPORTED_FOR_MESSAGE_FORMAT",
        code: 43,
        retriable: false,
        message: "The message format version on the broker does not support the request"
      },
      {
        type: "POLICY_VIOLATION",
        code: 44,
        retriable: false,
        message: "Request parameters do not satisfy the configured policy"
      },
      {
        type: "OUT_OF_ORDER_SEQUENCE_NUMBER",
        code: 45,
        retriable: false,
        message: "The broker received an out of order sequence number"
      },
      {
        type: "DUPLICATE_SEQUENCE_NUMBER",
        code: 46,
        retriable: false,
        message: "The broker received a duplicate sequence number"
      },
      {
        type: "INVALID_PRODUCER_EPOCH",
        code: 47,
        retriable: false,
        message: "Producer attempted an operation with an old epoch. Either there is a newer producer with the same transactionalId, or the producer's transaction has been expired by the broker"
      },
      {
        type: "INVALID_TXN_STATE",
        code: 48,
        retriable: false,
        message: "The producer attempted a transactional operation in an invalid state"
      },
      {
        type: "INVALID_PRODUCER_ID_MAPPING",
        code: 49,
        retriable: false,
        message: "The producer attempted to use a producer id which is not currently assigned to its transactional id"
      },
      {
        type: "INVALID_TRANSACTION_TIMEOUT",
        code: 50,
        retriable: false,
        message: "The transaction timeout is larger than the maximum value allowed by the broker (as configured by max.transaction.timeout.ms)"
      },
      {
        type: "CONCURRENT_TRANSACTIONS",
        code: 51,
        retriable: true,
        message: "The producer attempted to update a transaction while another concurrent operation on the same transaction was ongoing"
      },
      {
        type: "TRANSACTION_COORDINATOR_FENCED",
        code: 52,
        retriable: false,
        message: "Indicates that the transaction coordinator sending a WriteTxnMarker is no longer the current coordinator for a given producer"
      },
      {
        type: "TRANSACTIONAL_ID_AUTHORIZATION_FAILED",
        code: 53,
        retriable: false,
        message: "Transactional Id authorization failed"
      },
      {
        type: "SECURITY_DISABLED",
        code: 54,
        retriable: false,
        message: "Security features are disabled"
      },
      {
        type: "OPERATION_NOT_ATTEMPTED",
        code: 55,
        retriable: false,
        message: "The broker did not attempt to execute this operation. This may happen for batched RPCs where some operations in the batch failed, causing the broker to respond without trying the rest"
      },
      {
        type: "KAFKA_STORAGE_ERROR",
        code: 56,
        retriable: true,
        message: "Disk error when trying to access log file on the disk"
      },
      {
        type: "LOG_DIR_NOT_FOUND",
        code: 57,
        retriable: false,
        message: "The user-specified log directory is not found in the broker config"
      },
      {
        type: "SASL_AUTHENTICATION_FAILED",
        code: 58,
        retriable: false,
        message: "SASL Authentication failed",
        helpUrl: websiteUrl("docs/configuration", "sasl")
      },
      {
        type: "UNKNOWN_PRODUCER_ID",
        code: 59,
        retriable: false,
        message: "This exception is raised by the broker if it could not locate the producer metadata associated with the producerId in question. This could happen if, for instance, the producer's records were deleted because their retention time had elapsed. Once the last records of the producerId are removed, the producer's metadata is removed from the broker, and future appends by the producer will return this exception"
      },
      {
        type: "REASSIGNMENT_IN_PROGRESS",
        code: 60,
        retriable: false,
        message: "A partition reassignment is in progress"
      },
      {
        type: "DELEGATION_TOKEN_AUTH_DISABLED",
        code: 61,
        retriable: false,
        message: "Delegation Token feature is not enabled"
      },
      {
        type: "DELEGATION_TOKEN_NOT_FOUND",
        code: 62,
        retriable: false,
        message: "Delegation Token is not found on server"
      },
      {
        type: "DELEGATION_TOKEN_OWNER_MISMATCH",
        code: 63,
        retriable: false,
        message: "Specified Principal is not valid Owner/Renewer"
      },
      {
        type: "DELEGATION_TOKEN_REQUEST_NOT_ALLOWED",
        code: 64,
        retriable: false,
        message: "Delegation Token requests are not allowed on PLAINTEXT/1-way SSL channels and on delegation token authenticated channels"
      },
      {
        type: "DELEGATION_TOKEN_AUTHORIZATION_FAILED",
        code: 65,
        retriable: false,
        message: "Delegation Token authorization failed"
      },
      {
        type: "DELEGATION_TOKEN_EXPIRED",
        code: 66,
        retriable: false,
        message: "Delegation Token is expired"
      },
      {
        type: "INVALID_PRINCIPAL_TYPE",
        code: 67,
        retriable: false,
        message: "Supplied principalType is not supported"
      },
      {
        type: "NON_EMPTY_GROUP",
        code: 68,
        retriable: false,
        message: "The group is not empty"
      },
      {
        type: "GROUP_ID_NOT_FOUND",
        code: 69,
        retriable: false,
        message: "The group id was not found"
      },
      {
        type: "FETCH_SESSION_ID_NOT_FOUND",
        code: 70,
        retriable: true,
        message: "The fetch session ID was not found"
      },
      {
        type: "INVALID_FETCH_SESSION_EPOCH",
        code: 71,
        retriable: true,
        message: "The fetch session epoch is invalid"
      },
      {
        type: "LISTENER_NOT_FOUND",
        code: 72,
        retriable: true,
        message: "There is no listener on the leader broker that matches the listener on which metadata request was processed"
      },
      {
        type: "TOPIC_DELETION_DISABLED",
        code: 73,
        retriable: false,
        message: "Topic deletion is disabled"
      },
      {
        type: "FENCED_LEADER_EPOCH",
        code: 74,
        retriable: true,
        message: "The leader epoch in the request is older than the epoch on the broker"
      },
      {
        type: "UNKNOWN_LEADER_EPOCH",
        code: 75,
        retriable: true,
        message: "The leader epoch in the request is newer than the epoch on the broker"
      },
      {
        type: "UNSUPPORTED_COMPRESSION_TYPE",
        code: 76,
        retriable: false,
        message: "The requesting client does not support the compression type of given partition"
      },
      {
        type: "STALE_BROKER_EPOCH",
        code: 77,
        retriable: false,
        message: "Broker epoch has changed"
      },
      {
        type: "OFFSET_NOT_AVAILABLE",
        code: 78,
        retriable: true,
        message: "The leader high watermark has not caught up from a recent leader election so the offsets cannot be guaranteed to be monotonically increasing"
      },
      {
        type: "MEMBER_ID_REQUIRED",
        code: 79,
        retriable: false,
        message: "The group member needs to have a valid member id before actually entering a consumer group"
      },
      {
        type: "PREFERRED_LEADER_NOT_AVAILABLE",
        code: 80,
        retriable: true,
        message: "The preferred leader was not available"
      },
      {
        type: "GROUP_MAX_SIZE_REACHED",
        code: 81,
        retriable: false,
        message: "The consumer group has reached its max size. It already has the configured maximum number of members"
      },
      {
        type: "FENCED_INSTANCE_ID",
        code: 82,
        retriable: false,
        message: "The broker rejected this static consumer since another consumer with the same group instance id has registered with a different member id"
      },
      {
        type: "ELIGIBLE_LEADERS_NOT_AVAILABLE",
        code: 83,
        retriable: true,
        message: "Eligible topic partition leaders are not available"
      },
      {
        type: "ELECTION_NOT_NEEDED",
        code: 84,
        retriable: true,
        message: "Leader election not needed for topic partition"
      },
      {
        type: "NO_REASSIGNMENT_IN_PROGRESS",
        code: 85,
        retriable: false,
        message: "No partition reassignment is in progress"
      },
      {
        type: "GROUP_SUBSCRIBED_TO_TOPIC",
        code: 86,
        retriable: false,
        message: "Deleting offsets of a topic is forbidden while the consumer group is actively subscribed to it"
      },
      {
        type: "INVALID_RECORD",
        code: 87,
        retriable: false,
        message: "This record has failed the validation on broker and hence be rejected"
      },
      {
        type: "UNSTABLE_OFFSET_COMMIT",
        code: 88,
        retriable: true,
        message: "There are unstable offsets that need to be cleared"
      }
    ];
    var unknownErrorCode = (errorCode) => ({
      type: "KAFKAJS_UNKNOWN_ERROR_CODE",
      code: -99,
      retriable: false,
      message: `Unknown error code ${errorCode}`
    });
    var SUCCESS_CODE = 0;
    var UNSUPPORTED_VERSION_CODE = 35;
    var failure = (code) => code !== SUCCESS_CODE;
    var createErrorFromCode = (code) => {
      return new KafkaJSProtocolError(errorCodes.find((e) => e.code === code) || unknownErrorCode(code));
    };
    var failIfVersionNotSupported = (code) => {
      if (code === UNSUPPORTED_VERSION_CODE) {
        throw createErrorFromCode(UNSUPPORTED_VERSION_CODE);
      }
    };
    var staleMetadata = (e) => ["UNKNOWN_TOPIC_OR_PARTITION", "LEADER_NOT_AVAILABLE", "NOT_LEADER_FOR_PARTITION"].includes(e.type);
    module2.exports = {
      failure,
      errorCodes,
      createErrorFromCode,
      failIfVersionNotSupported,
      staleMetadata
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v0/response.js
var require_response = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var partition = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      offset: decoder.readInt64().toString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const topics = decoder.readArray((decoder2) => ({
        topicName: decoder2.readString(),
        partitions: decoder2.readArray(partition)
      }));
      return {
        topics
      };
    };
    var parse = async (data) => {
      const errors = data.topics.flatMap((topic) => {
        return topic.partitions.filter((partition2) => failure(partition2.errorCode));
      });
      if (errors.length > 0) {
        const { errorCode } = errors[0];
        throw createErrorFromCode(errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v1/request.js
var require_request2 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v1/request.js"(exports, module2) {
    var requestV0 = require_request();
    module2.exports = ({ acks, timeout, topicData }) => {
      return Object.assign(requestV0({ acks, timeout, topicData }), { apiVersion: 1 });
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v1/response.js
var require_response2 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response();
    var partition = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      offset: decoder.readInt64().toString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const topics = decoder.readArray((decoder2) => ({
        topicName: decoder2.readString(),
        partitions: decoder2.readArray(partition)
      }));
      const throttleTime = decoder.readInt32();
      return {
        topics,
        throttleTime
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v2/request.js
var require_request3 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v2/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Produce: apiKey } = require_apiKeys();
    var MessageSet = require_messageSet();
    var { Types, lookupCodec } = require_compression();
    module2.exports = ({ acks, timeout, compression = Types.None, topicData }) => ({
      apiKey,
      apiVersion: 2,
      apiName: "Produce",
      expectResponse: () => acks !== 0,
      encode: async () => {
        const encodeTopic = topicEncoder(compression);
        const encodedTopicData = [];
        for (const data of topicData) {
          encodedTopicData.push(await encodeTopic(data));
        }
        return new Encoder().writeInt16(acks).writeInt32(timeout).writeArray(encodedTopicData);
      }
    });
    var topicEncoder = (compression) => {
      const encodePartitions = partitionsEncoder(compression);
      return async ({ topic, partitions }) => {
        const encodedPartitions = [];
        for (const data of partitions) {
          encodedPartitions.push(await encodePartitions(data));
        }
        return new Encoder().writeString(topic).writeArray(encodedPartitions);
      };
    };
    var partitionsEncoder = (compression) => async ({ partition, messages }) => {
      const messageSet = MessageSet({ messageVersion: 1, compression, entries: messages });
      if (compression === Types.None) {
        return new Encoder().writeInt32(partition).writeInt32(messageSet.size()).writeEncoder(messageSet);
      }
      const timestamp = messages[0].timestamp || Date.now();
      const codec = lookupCodec(compression);
      const compressedValue = await codec.compress(messageSet);
      const compressedMessageSet = MessageSet({
        messageVersion: 1,
        entries: [{ compression, timestamp, value: compressedValue }]
      });
      return new Encoder().writeInt32(partition).writeInt32(compressedMessageSet.size()).writeEncoder(compressedMessageSet);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v2/response.js
var require_response3 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v2/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response();
    var partition = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      offset: decoder.readInt64().toString(),
      timestamp: decoder.readInt64().toString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const topics = decoder.readArray((decoder2) => ({
        topicName: decoder2.readString(),
        partitions: decoder2.readArray(partition)
      }));
      const throttleTime = decoder.readInt32();
      return {
        topics,
        throttleTime
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/recordBatch/header/v0/index.js
var require_v02 = __commonJS({
  "node_modules/kafkajs/src/protocol/recordBatch/header/v0/index.js"(exports, module2) {
    var Encoder = require_encoder();
    module2.exports = ({ key, value }) => {
      return new Encoder().writeVarIntString(key).writeVarIntBytes(value);
    };
  }
});

// node_modules/kafkajs/src/protocol/recordBatch/record/v0/index.js
var require_v03 = __commonJS({
  "node_modules/kafkajs/src/protocol/recordBatch/record/v0/index.js"(exports, module2) {
    var Encoder = require_encoder();
    var Header = require_v02();
    module2.exports = ({ offsetDelta = 0, timestampDelta = 0, key, value, headers = {} }) => {
      const headersArray = Object.keys(headers).flatMap((headerKey) => !Array.isArray(headers[headerKey]) ? [{ key: headerKey, value: headers[headerKey] }] : headers[headerKey].map((headerValue) => ({ key: headerKey, value: headerValue })));
      const sizeOfBody = 1 + Encoder.sizeOfVarLong(timestampDelta) + Encoder.sizeOfVarInt(offsetDelta) + Encoder.sizeOfVarIntBytes(key) + Encoder.sizeOfVarIntBytes(value) + sizeOfHeaders(headersArray);
      return new Encoder().writeVarInt(sizeOfBody).writeInt8(0).writeVarLong(timestampDelta).writeVarInt(offsetDelta).writeVarIntBytes(key).writeVarIntBytes(value).writeVarIntArray(headersArray.map(Header));
    };
    var sizeOfHeaders = (headersArray) => {
      let size = Encoder.sizeOfVarInt(headersArray.length);
      for (const header of headersArray) {
        const keySize = Buffer.byteLength(header.key);
        const valueSize = Buffer.byteLength(header.value);
        size += Encoder.sizeOfVarInt(keySize) + keySize;
        if (header.value === null) {
          size += Encoder.sizeOfVarInt(-1);
        } else {
          size += Encoder.sizeOfVarInt(valueSize) + valueSize;
        }
      }
      return size;
    };
  }
});

// node_modules/kafkajs/src/protocol/recordBatch/crc32C/crc32C.js
var require_crc32C = __commonJS({
  "node_modules/kafkajs/src/protocol/recordBatch/crc32C/crc32C.js"(exports, module2) {
    var crc32C = (buffer) => {
      let crc = 0 ^ -1;
      for (let i = 0; i < buffer.length; i++) {
        crc = T[(crc ^ buffer[i]) & 255] ^ crc >>> 8;
      }
      return (crc ^ -1) >>> 0;
    };
    module2.exports = crc32C;
    var T = new Int32Array([
      0,
      4067132163,
      3778769143,
      324072436,
      3348797215,
      904991772,
      648144872,
      3570033899,
      2329499855,
      2024987596,
      1809983544,
      2575936315,
      1296289744,
      3207089363,
      2893594407,
      1578318884,
      274646895,
      3795141740,
      4049975192,
      51262619,
      3619967088,
      632279923,
      922689671,
      3298075524,
      2592579488,
      1760304291,
      2075979607,
      2312596564,
      1562183871,
      2943781820,
      3156637768,
      1313733451,
      549293790,
      3537243613,
      3246849577,
      871202090,
      3878099393,
      357341890,
      102525238,
      4101499445,
      2858735121,
      1477399826,
      1264559846,
      3107202533,
      1845379342,
      2677391885,
      2361733625,
      2125378298,
      820201905,
      3263744690,
      3520608582,
      598981189,
      4151959214,
      85089709,
      373468761,
      3827903834,
      3124367742,
      1213305469,
      1526817161,
      2842354314,
      2107672161,
      2412447074,
      2627466902,
      1861252501,
      1098587580,
      3004210879,
      2688576843,
      1378610760,
      2262928035,
      1955203488,
      1742404180,
      2511436119,
      3416409459,
      969524848,
      714683780,
      3639785095,
      205050476,
      4266873199,
      3976438427,
      526918040,
      1361435347,
      2739821008,
      2954799652,
      1114974503,
      2529119692,
      1691668175,
      2005155131,
      2247081528,
      3690758684,
      697762079,
      986182379,
      3366744552,
      476452099,
      3993867776,
      4250756596,
      255256311,
      1640403810,
      2477592673,
      2164122517,
      1922457750,
      2791048317,
      1412925310,
      1197962378,
      3037525897,
      3944729517,
      427051182,
      170179418,
      4165941337,
      746937522,
      3740196785,
      3451792453,
      1070968646,
      1905808397,
      2213795598,
      2426610938,
      1657317369,
      3053634322,
      1147748369,
      1463399397,
      2773627110,
      4215344322,
      153784257,
      444234805,
      3893493558,
      1021025245,
      3467647198,
      3722505002,
      797665321,
      2197175160,
      1889384571,
      1674398607,
      2443626636,
      1164749927,
      3070701412,
      2757221520,
      1446797203,
      137323447,
      4198817972,
      3910406976,
      461344835,
      3484808360,
      1037989803,
      781091935,
      3705997148,
      2460548119,
      1623424788,
      1939049696,
      2180517859,
      1429367560,
      2807687179,
      3020495871,
      1180866812,
      410100952,
      3927582683,
      4182430767,
      186734380,
      3756733383,
      763408580,
      1053836080,
      3434856499,
      2722870694,
      1344288421,
      1131464017,
      2971354706,
      1708204729,
      2545590714,
      2229949006,
      1988219213,
      680717673,
      3673779818,
      3383336350,
      1002577565,
      4010310262,
      493091189,
      238226049,
      4233660802,
      2987750089,
      1082061258,
      1395524158,
      2705686845,
      1972364758,
      2279892693,
      2494862625,
      1725896226,
      952904198,
      3399985413,
      3656866545,
      731699698,
      4283874585,
      222117402,
      510512622,
      3959836397,
      3280807620,
      837199303,
      582374963,
      3504198960,
      68661723,
      4135334616,
      3844915500,
      390545967,
      1230274059,
      3141532936,
      2825850620,
      1510247935,
      2395924756,
      2091215383,
      1878366691,
      2644384480,
      3553878443,
      565732008,
      854102364,
      3229815391,
      340358836,
      3861050807,
      4117890627,
      119113024,
      1493875044,
      2875275879,
      3090270611,
      1247431312,
      2660249211,
      1828433272,
      2141937292,
      2378227087,
      3811616794,
      291187481,
      34330861,
      4032846830,
      615137029,
      3603020806,
      3314634738,
      939183345,
      1776939221,
      2609017814,
      2295496738,
      2058945313,
      2926798794,
      1545135305,
      1330124605,
      3173225534,
      4084100981,
      17165430,
      307568514,
      3762199681,
      888469610,
      3332340585,
      3587147933,
      665062302,
      2042050490,
      2346497209,
      2559330125,
      1793573966,
      3190661285,
      1279665062,
      1595330642,
      2910671697
    ]);
  }
});

// node_modules/kafkajs/src/protocol/recordBatch/crc32C/index.js
var require_crc32C2 = __commonJS({
  "node_modules/kafkajs/src/protocol/recordBatch/crc32C/index.js"(exports, module2) {
    var crc32C = require_crc32C();
    var unsigned = (value) => Uint32Array.from([value])[0];
    module2.exports = (buffer) => unsigned(crc32C(buffer));
  }
});

// node_modules/kafkajs/src/protocol/recordBatch/v0/index.js
var require_v04 = __commonJS({
  "node_modules/kafkajs/src/protocol/recordBatch/v0/index.js"(exports, module2) {
    var Long = require_long();
    var Encoder = require_encoder();
    var crc32C = require_crc32C2();
    var {
      Types: Compression,
      lookupCodec,
      COMPRESSION_CODEC_MASK
    } = require_compression();
    var MAGIC_BYTE = 2;
    var TIMESTAMP_MASK = 0;
    var TRANSACTIONAL_MASK = 16;
    var RecordBatch = async ({
      compression = Compression.None,
      firstOffset = Long.fromInt(0),
      firstTimestamp = Date.now(),
      maxTimestamp = Date.now(),
      partitionLeaderEpoch = 0,
      lastOffsetDelta = 0,
      transactional = false,
      producerId = Long.fromValue(-1),
      producerEpoch = 0,
      firstSequence = 0,
      records = []
    }) => {
      const COMPRESSION_CODEC = compression & COMPRESSION_CODEC_MASK;
      const IN_TRANSACTION = transactional ? TRANSACTIONAL_MASK : 0;
      const attributes = COMPRESSION_CODEC | TIMESTAMP_MASK | IN_TRANSACTION;
      const batchBody = new Encoder().writeInt16(attributes).writeInt32(lastOffsetDelta).writeInt64(firstTimestamp).writeInt64(maxTimestamp).writeInt64(producerId).writeInt16(producerEpoch).writeInt32(firstSequence);
      if (compression === Compression.None) {
        if (records.every((v) => typeof v === typeof records[0])) {
          batchBody.writeArray(records, typeof records[0]);
        } else {
          batchBody.writeArray(records);
        }
      } else {
        const compressedRecords = await compressRecords(compression, records);
        batchBody.writeInt32(records.length).writeBuffer(compressedRecords);
      }
      const batch = new Encoder().writeInt32(partitionLeaderEpoch).writeInt8(MAGIC_BYTE).writeUInt32(crc32C(batchBody.buffer)).writeEncoder(batchBody);
      return new Encoder().writeInt64(firstOffset).writeBytes(batch.buffer);
    };
    var compressRecords = async (compression, records) => {
      const codec = lookupCodec(compression);
      const recordsEncoder = new Encoder();
      recordsEncoder.writeEncoderArray(records);
      return codec.compress(recordsEncoder);
    };
    module2.exports = {
      RecordBatch,
      MAGIC_BYTE
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v3/request.js
var require_request4 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v3/request.js"(exports, module2) {
    var Long = require_long();
    var Encoder = require_encoder();
    var { Produce: apiKey } = require_apiKeys();
    var { Types } = require_compression();
    var Record = require_v03();
    var { RecordBatch } = require_v04();
    module2.exports = ({
      acks,
      timeout,
      transactionalId = null,
      producerId = Long.fromInt(-1),
      producerEpoch = 0,
      compression = Types.None,
      topicData
    }) => ({
      apiKey,
      apiVersion: 3,
      apiName: "Produce",
      expectResponse: () => acks !== 0,
      encode: async () => {
        const encodeTopic = topicEncoder(compression);
        const encodedTopicData = [];
        for (const data of topicData) {
          encodedTopicData.push(await encodeTopic(__spreadProps(__spreadValues({}, data), { transactionalId, producerId, producerEpoch })));
        }
        return new Encoder().writeString(transactionalId).writeInt16(acks).writeInt32(timeout).writeArray(encodedTopicData);
      }
    });
    var topicEncoder = (compression) => async ({
      topic,
      partitions,
      transactionalId,
      producerId,
      producerEpoch
    }) => {
      const encodePartitions = partitionsEncoder(compression);
      const encodedPartitions = [];
      for (const data of partitions) {
        encodedPartitions.push(await encodePartitions(__spreadProps(__spreadValues({}, data), { transactionalId, producerId, producerEpoch })));
      }
      return new Encoder().writeString(topic).writeArray(encodedPartitions);
    };
    var partitionsEncoder = (compression) => async ({
      partition,
      messages,
      transactionalId,
      firstSequence,
      producerId,
      producerEpoch
    }) => {
      const dateNow = Date.now();
      const messageTimestamps = messages.map((m) => m.timestamp).filter((timestamp) => timestamp != null).sort();
      const timestamps = messageTimestamps.length === 0 ? [dateNow] : messageTimestamps;
      const firstTimestamp = timestamps[0];
      const maxTimestamp = timestamps[timestamps.length - 1];
      const records = messages.map((message, i) => Record(__spreadProps(__spreadValues({}, message), {
        offsetDelta: i,
        timestampDelta: (message.timestamp || dateNow) - firstTimestamp
      })));
      const recordBatch = await RecordBatch({
        compression,
        records,
        firstTimestamp,
        maxTimestamp,
        producerId,
        producerEpoch,
        firstSequence,
        transactional: !!transactionalId,
        lastOffsetDelta: records.length - 1
      });
      return new Encoder().writeInt32(partition).writeInt32(recordBatch.size()).writeEncoder(recordBatch);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v3/response.js
var require_response4 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v3/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var partition = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      baseOffset: decoder.readInt64().toString(),
      logAppendTime: decoder.readInt64().toString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const topics = decoder.readArray((decoder2) => ({
        topicName: decoder2.readString(),
        partitions: decoder2.readArray(partition)
      }));
      const throttleTime = decoder.readInt32();
      return {
        topics,
        throttleTime
      };
    };
    var parse = async (data) => {
      const errors = data.topics.flatMap((response) => {
        return response.partitions.filter((partition2) => failure(partition2.errorCode));
      });
      if (errors.length > 0) {
        const { errorCode } = errors[0];
        throw createErrorFromCode(errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v4/request.js
var require_request5 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v4/request.js"(exports, module2) {
    var requestV3 = require_request4();
    module2.exports = ({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData
    }) => Object.assign(requestV3({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData
    }), { apiVersion: 4 });
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v4/response.js
var require_response5 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v4/response.js"(exports, module2) {
    var { decode, parse } = require_response4();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v5/request.js
var require_request6 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v5/request.js"(exports, module2) {
    var requestV3 = require_request4();
    module2.exports = ({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData
    }) => Object.assign(requestV3({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData
    }), { apiVersion: 5 });
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v5/response.js
var require_response6 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v5/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV3 } = require_response4();
    var partition = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      baseOffset: decoder.readInt64().toString(),
      logAppendTime: decoder.readInt64().toString(),
      logStartOffset: decoder.readInt64().toString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const topics = decoder.readArray((decoder2) => ({
        topicName: decoder2.readString(),
        partitions: decoder2.readArray(partition)
      }));
      const throttleTime = decoder.readInt32();
      return {
        topics,
        throttleTime
      };
    };
    module2.exports = {
      decode,
      parse: parseV3
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v6/request.js
var require_request7 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v6/request.js"(exports, module2) {
    var requestV5 = require_request6();
    module2.exports = ({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData
    }) => Object.assign(requestV5({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData
    }), { apiVersion: 6 });
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v6/response.js
var require_response7 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v6/response.js"(exports, module2) {
    var { parse, decode: decodeV5 } = require_response6();
    var decode = async (rawData) => {
      const decoded = await decodeV5(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v7/request.js
var require_request8 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v7/request.js"(exports, module2) {
    var requestV6 = require_request7();
    module2.exports = ({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData
    }) => Object.assign(requestV6({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData
    }), { apiVersion: 7 });
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/v7/response.js
var require_response8 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/v7/response.js"(exports, module2) {
    var { decode, parse } = require_response7();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/produce/index.js
var require_produce = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/produce/index.js"(exports, module2) {
    var versions = {
      0: ({ acks, timeout, topicData }) => {
        const request = require_request();
        const response = require_response();
        return { request: request({ acks, timeout, topicData }), response };
      },
      1: ({ acks, timeout, topicData }) => {
        const request = require_request2();
        const response = require_response2();
        return { request: request({ acks, timeout, topicData }), response };
      },
      2: ({ acks, timeout, topicData, compression }) => {
        const request = require_request3();
        const response = require_response3();
        return { request: request({ acks, timeout, compression, topicData }), response };
      },
      3: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
        const request = require_request4();
        const response = require_response4();
        return {
          request: request({
            acks,
            timeout,
            compression,
            topicData,
            transactionalId,
            producerId,
            producerEpoch
          }),
          response
        };
      },
      4: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
        const request = require_request5();
        const response = require_response5();
        return {
          request: request({
            acks,
            timeout,
            compression,
            topicData,
            transactionalId,
            producerId,
            producerEpoch
          }),
          response
        };
      },
      5: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
        const request = require_request6();
        const response = require_response6();
        return {
          request: request({
            acks,
            timeout,
            compression,
            topicData,
            transactionalId,
            producerId,
            producerEpoch
          }),
          response
        };
      },
      6: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
        const request = require_request7();
        const response = require_response7();
        return {
          request: request({
            acks,
            timeout,
            compression,
            topicData,
            transactionalId,
            producerId,
            producerEpoch
          }),
          response
        };
      },
      7: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
        const request = require_request8();
        const response = require_response8();
        return {
          request: request({
            acks,
            timeout,
            compression,
            topicData,
            transactionalId,
            producerId,
            producerEpoch
          }),
          response
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/isolationLevel.js
var require_isolationLevel = __commonJS({
  "node_modules/kafkajs/src/protocol/isolationLevel.js"(exports, module2) {
    module2.exports = {
      READ_UNCOMMITTED: 0,
      READ_COMMITTED: 1
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v0/request.js
var require_request9 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Fetch: apiKey } = require_apiKeys();
    module2.exports = ({ replicaId, maxWaitTime, minBytes, topics }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "Fetch",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeInt32(maxWaitTime).writeInt32(minBytes).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, fetchOffset, maxBytes }) => {
      return new Encoder().writeInt32(partition).writeInt64(fetchOffset).writeInt32(maxBytes);
    };
  }
});

// node_modules/kafkajs/src/protocol/message/v0/decoder.js
var require_decoder2 = __commonJS({
  "node_modules/kafkajs/src/protocol/message/v0/decoder.js"(exports, module2) {
    module2.exports = (decoder) => ({
      attributes: decoder.readInt8(),
      key: decoder.readBytes(),
      value: decoder.readBytes()
    });
  }
});

// node_modules/kafkajs/src/protocol/message/v1/decoder.js
var require_decoder3 = __commonJS({
  "node_modules/kafkajs/src/protocol/message/v1/decoder.js"(exports, module2) {
    module2.exports = (decoder) => ({
      attributes: decoder.readInt8(),
      timestamp: decoder.readInt64().toString(),
      key: decoder.readBytes(),
      value: decoder.readBytes()
    });
  }
});

// node_modules/kafkajs/src/protocol/message/decoder.js
var require_decoder4 = __commonJS({
  "node_modules/kafkajs/src/protocol/message/decoder.js"(exports, module2) {
    var {
      KafkaJSPartialMessageError,
      KafkaJSUnsupportedMagicByteInMessageSet
    } = require_errors();
    var V0Decoder = require_decoder2();
    var V1Decoder = require_decoder3();
    var decodeMessage = (decoder, magicByte) => {
      switch (magicByte) {
        case 0:
          return V0Decoder(decoder);
        case 1:
          return V1Decoder(decoder);
        default:
          throw new KafkaJSUnsupportedMagicByteInMessageSet(`Unsupported MessageSet message version, magic byte: ${magicByte}`);
      }
    };
    module2.exports = (offset, size, decoder) => {
      const remainingBytes = Buffer.byteLength(decoder.slice(size).buffer);
      if (remainingBytes < size) {
        throw new KafkaJSPartialMessageError(`Tried to decode a partial message: remainingBytes(${remainingBytes}) < messageSize(${size})`);
      }
      const crc = decoder.readInt32();
      const magicByte = decoder.readInt8();
      const message = decodeMessage(decoder, magicByte);
      return Object.assign({ offset, size, crc, magicByte }, message);
    };
  }
});

// node_modules/kafkajs/src/protocol/messageSet/decoder.js
var require_decoder5 = __commonJS({
  "node_modules/kafkajs/src/protocol/messageSet/decoder.js"(exports, module2) {
    var Long = require_long();
    var Decoder = require_decoder();
    var MessageDecoder = require_decoder4();
    var { lookupCodecByAttributes } = require_compression();
    var { KafkaJSPartialMessageError } = require_errors();
    module2.exports = async (primaryDecoder, size = null) => {
      const messages = [];
      const messageSetSize = size || primaryDecoder.readInt32();
      const messageSetDecoder = primaryDecoder.slice(messageSetSize);
      while (messageSetDecoder.offset < messageSetSize) {
        try {
          const message = EntryDecoder(messageSetDecoder);
          const codec = lookupCodecByAttributes(message.attributes);
          if (codec) {
            const buffer = await codec.decompress(message.value);
            messages.push(...EntriesDecoder(new Decoder(buffer), message));
          } else {
            messages.push(message);
          }
        } catch (e) {
          if (e.name === "KafkaJSPartialMessageError") {
            break;
          }
          if (e.name === "KafkaJSUnsupportedMagicByteInMessageSet") {
            break;
          }
          throw e;
        }
      }
      primaryDecoder.forward(messageSetSize);
      return messages;
    };
    var EntriesDecoder = (decoder, compressedMessage) => {
      const messages = [];
      while (decoder.offset < decoder.buffer.length) {
        messages.push(EntryDecoder(decoder));
      }
      if (compressedMessage.magicByte > 0 && compressedMessage.offset >= 0) {
        const compressedOffset = Long.fromValue(compressedMessage.offset);
        const lastMessageOffset = Long.fromValue(messages[messages.length - 1].offset);
        const baseOffset = compressedOffset - lastMessageOffset;
        for (const message of messages) {
          message.offset = Long.fromValue(message.offset).add(baseOffset).toString();
        }
      }
      return messages;
    };
    var EntryDecoder = (decoder) => {
      if (!decoder.canReadInt64()) {
        throw new KafkaJSPartialMessageError(`Tried to decode a partial message: There isn't enough bytes to read the offset`);
      }
      const offset = decoder.readInt64().toString();
      if (!decoder.canReadInt32()) {
        throw new KafkaJSPartialMessageError(`Tried to decode a partial message: There isn't enough bytes to read the message size`);
      }
      const size = decoder.readInt32();
      return MessageDecoder(offset, size, decoder);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v0/response.js
var require_response9 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { KafkaJSOffsetOutOfRange } = require_errors();
    var { failure, createErrorFromCode, errorCodes } = require_error();
    var MessageSetDecoder = require_decoder5();
    var decodePartition = async (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      highWatermark: decoder.readInt64().toString(),
      messages: await MessageSetDecoder(decoder)
    });
    var decodeResponse = async (decoder) => ({
      topicName: decoder.readString(),
      partitions: await decoder.readArrayAsync(decodePartition)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const responses = await decoder.readArrayAsync(decodeResponse);
      return {
        responses
      };
    };
    var { code: OFFSET_OUT_OF_RANGE_ERROR_CODE } = errorCodes.find((e) => e.type === "OFFSET_OUT_OF_RANGE");
    var parse = async (data) => {
      const errors = data.responses.flatMap(({ topicName: topicName2, partitions }) => {
        return partitions.filter((partition) => failure(partition.errorCode)).map((partition) => Object.assign({}, partition, { topic: topicName2 }));
      });
      if (errors.length > 0) {
        const { errorCode, topic, partition } = errors[0];
        if (errorCode === OFFSET_OUT_OF_RANGE_ERROR_CODE) {
          throw new KafkaJSOffsetOutOfRange(createErrorFromCode(errorCode), { topic, partition });
        }
        throw createErrorFromCode(errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v1/request.js
var require_request10 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v1/request.js"(exports, module2) {
    var requestV0 = require_request9();
    module2.exports = ({ replicaId, maxWaitTime, minBytes, topics }) => {
      return Object.assign(requestV0({ replicaId, maxWaitTime, minBytes, topics }), { apiVersion: 1 });
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v1/response.js
var require_response10 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response9();
    var MessageSetDecoder = require_decoder5();
    var decodePartition = async (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      highWatermark: decoder.readInt64().toString(),
      messages: await MessageSetDecoder(decoder)
    });
    var decodeResponse = async (decoder) => ({
      topicName: decoder.readString(),
      partitions: await decoder.readArrayAsync(decodePartition)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const responses = await decoder.readArrayAsync(decodeResponse);
      return {
        throttleTime,
        responses
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v2/request.js
var require_request11 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v2/request.js"(exports, module2) {
    var requestV0 = require_request9();
    module2.exports = ({ replicaId, maxWaitTime, minBytes, topics }) => {
      return Object.assign(requestV0({ replicaId, maxWaitTime, minBytes, topics }), { apiVersion: 2 });
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v2/response.js
var require_response11 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v2/response.js"(exports, module2) {
    var { decode, parse } = require_response10();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v3/request.js
var require_request12 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v3/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Fetch: apiKey } = require_apiKeys();
    module2.exports = ({ replicaId, maxWaitTime, minBytes, maxBytes, topics }) => ({
      apiKey,
      apiVersion: 3,
      apiName: "Fetch",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeInt32(maxWaitTime).writeInt32(minBytes).writeInt32(maxBytes).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, fetchOffset, maxBytes }) => {
      return new Encoder().writeInt32(partition).writeInt64(fetchOffset).writeInt32(maxBytes);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v3/response.js
var require_response12 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v3/response.js"(exports, module2) {
    var { decode, parse } = require_response10();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v4/request.js
var require_request13 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v4/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Fetch: apiKey } = require_apiKeys();
    var ISOLATION_LEVEL = require_isolationLevel();
    module2.exports = ({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel = ISOLATION_LEVEL.READ_COMMITTED
    }) => ({
      apiKey,
      apiVersion: 4,
      apiName: "Fetch",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeInt32(maxWaitTime).writeInt32(minBytes).writeInt32(maxBytes).writeInt8(isolationLevel).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, fetchOffset, maxBytes }) => {
      return new Encoder().writeInt32(partition).writeInt64(fetchOffset).writeInt32(maxBytes);
    };
  }
});

// node_modules/kafkajs/src/protocol/recordBatch/header/v0/decoder.js
var require_decoder6 = __commonJS({
  "node_modules/kafkajs/src/protocol/recordBatch/header/v0/decoder.js"(exports, module2) {
    module2.exports = (decoder) => ({
      key: decoder.readVarIntString(),
      value: decoder.readVarIntBytes()
    });
  }
});

// node_modules/kafkajs/src/protocol/timestampTypes.js
var require_timestampTypes = __commonJS({
  "node_modules/kafkajs/src/protocol/timestampTypes.js"(exports, module2) {
    module2.exports = {
      NO_TIMESTAMP: -1,
      CREATE_TIME: 0,
      LOG_APPEND_TIME: 1
    };
  }
});

// node_modules/kafkajs/src/protocol/recordBatch/record/v0/decoder.js
var require_decoder7 = __commonJS({
  "node_modules/kafkajs/src/protocol/recordBatch/record/v0/decoder.js"(exports, module2) {
    var Long = require_long();
    var HeaderDecoder = require_decoder6();
    var TimestampTypes = require_timestampTypes();
    module2.exports = (decoder, batchContext = {}) => {
      const {
        firstOffset,
        firstTimestamp,
        magicByte,
        isControlBatch = false,
        timestampType,
        maxTimestamp
      } = batchContext;
      const attributes = decoder.readInt8();
      const timestampDelta = decoder.readVarLong();
      const timestamp = timestampType === TimestampTypes.LOG_APPEND_TIME && maxTimestamp ? maxTimestamp : Long.fromValue(firstTimestamp).add(timestampDelta).toString();
      const offsetDelta = decoder.readVarInt();
      const offset = Long.fromValue(firstOffset).add(offsetDelta).toString();
      const key = decoder.readVarIntBytes();
      const value = decoder.readVarIntBytes();
      const headers = decoder.readVarIntArray(HeaderDecoder).reduce((obj, { key: key2, value: value2 }) => __spreadProps(__spreadValues({}, obj), {
        [key2]: obj[key2] === void 0 ? value2 : Array.isArray(obj[key2]) ? obj[key2].concat([value2]) : [obj[key2], value2]
      }), {});
      return {
        magicByte,
        attributes,
        timestamp,
        offset,
        key,
        value,
        headers,
        isControlRecord: isControlBatch,
        batchContext
      };
    };
  }
});

// node_modules/kafkajs/src/protocol/recordBatch/v0/decoder.js
var require_decoder8 = __commonJS({
  "node_modules/kafkajs/src/protocol/recordBatch/v0/decoder.js"(exports, module2) {
    var Decoder = require_decoder();
    var { KafkaJSPartialMessageError } = require_errors();
    var { lookupCodecByAttributes } = require_compression();
    var RecordDecoder = require_decoder7();
    var TimestampTypes = require_timestampTypes();
    var TIMESTAMP_TYPE_FLAG_MASK = 8;
    var TRANSACTIONAL_FLAG_MASK = 16;
    var CONTROL_FLAG_MASK = 32;
    module2.exports = async (fetchDecoder) => {
      const firstOffset = fetchDecoder.readInt64().toString();
      const length = fetchDecoder.readInt32();
      const decoder = fetchDecoder.slice(length);
      fetchDecoder.forward(length);
      const remainingBytes = Buffer.byteLength(decoder.buffer);
      if (remainingBytes < length) {
        throw new KafkaJSPartialMessageError(`Tried to decode a partial record batch: remainingBytes(${remainingBytes}) < recordBatchLength(${length})`);
      }
      const partitionLeaderEpoch = decoder.readInt32();
      const magicByte = decoder.readInt8();
      const crc = decoder.readInt32();
      const attributes = decoder.readInt16();
      const lastOffsetDelta = decoder.readInt32();
      const firstTimestamp = decoder.readInt64().toString();
      const maxTimestamp = decoder.readInt64().toString();
      const producerId = decoder.readInt64().toString();
      const producerEpoch = decoder.readInt16();
      const firstSequence = decoder.readInt32();
      const inTransaction = (attributes & TRANSACTIONAL_FLAG_MASK) > 0;
      const isControlBatch = (attributes & CONTROL_FLAG_MASK) > 0;
      const timestampType = (attributes & TIMESTAMP_TYPE_FLAG_MASK) > 0 ? TimestampTypes.LOG_APPEND_TIME : TimestampTypes.CREATE_TIME;
      const codec = lookupCodecByAttributes(attributes);
      const recordContext = {
        firstOffset,
        firstTimestamp,
        partitionLeaderEpoch,
        inTransaction,
        isControlBatch,
        lastOffsetDelta,
        producerId,
        producerEpoch,
        firstSequence,
        maxTimestamp,
        timestampType
      };
      const records = await decodeRecords(codec, decoder, __spreadProps(__spreadValues({}, recordContext), { magicByte }));
      return __spreadProps(__spreadValues({}, recordContext), {
        records
      });
    };
    var decodeRecords = async (codec, recordsDecoder, recordContext) => {
      if (!codec) {
        return recordsDecoder.readArray((decoder) => decodeRecord(decoder, recordContext));
      }
      const length = recordsDecoder.readInt32();
      if (length <= 0) {
        return [];
      }
      const compressedRecordsBuffer = recordsDecoder.readAll();
      const decompressedRecordBuffer = await codec.decompress(compressedRecordsBuffer);
      const decompressedRecordDecoder = new Decoder(decompressedRecordBuffer);
      const records = new Array(length);
      for (let i = 0; i < length; i++) {
        records[i] = decodeRecord(decompressedRecordDecoder, recordContext);
      }
      return records;
    };
    var decodeRecord = (decoder, recordContext) => {
      const recordBuffer = decoder.readVarIntBytes();
      return RecordDecoder(new Decoder(recordBuffer), recordContext);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v4/decodeMessages.js
var require_decodeMessages = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v4/decodeMessages.js"(exports, module2) {
    var Decoder = require_decoder();
    var MessageSetDecoder = require_decoder5();
    var RecordBatchDecoder = require_decoder8();
    var { MAGIC_BYTE } = require_v04();
    var MAGIC_OFFSET = 16;
    var RECORD_BATCH_OVERHEAD = 49;
    var decodeMessages = async (decoder) => {
      const messagesSize = decoder.readInt32();
      if (messagesSize <= 0 || !decoder.canReadBytes(messagesSize)) {
        return [];
      }
      const messagesBuffer = decoder.readBytes(messagesSize);
      const messagesDecoder = new Decoder(messagesBuffer);
      const magicByte = messagesBuffer.slice(MAGIC_OFFSET).readInt8(0);
      if (magicByte === MAGIC_BYTE) {
        const records = [];
        while (messagesDecoder.canReadBytes(RECORD_BATCH_OVERHEAD)) {
          try {
            const recordBatch = await RecordBatchDecoder(messagesDecoder);
            records.push(...recordBatch.records);
          } catch (e) {
            if (e.name === "KafkaJSPartialMessageError") {
              break;
            }
            throw e;
          }
        }
        return records;
      }
      return MessageSetDecoder(messagesDecoder, messagesSize);
    };
    module2.exports = decodeMessages;
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v4/response.js
var require_response13 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v4/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV1 } = require_response10();
    var decodeMessages = require_decodeMessages();
    var decodeAbortedTransactions = (decoder) => ({
      producerId: decoder.readInt64().toString(),
      firstOffset: decoder.readInt64().toString()
    });
    var decodePartition = async (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      highWatermark: decoder.readInt64().toString(),
      lastStableOffset: decoder.readInt64().toString(),
      abortedTransactions: decoder.readArray(decodeAbortedTransactions),
      messages: await decodeMessages(decoder)
    });
    var decodeResponse = async (decoder) => ({
      topicName: decoder.readString(),
      partitions: await decoder.readArrayAsync(decodePartition)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const responses = await decoder.readArrayAsync(decodeResponse);
      return {
        throttleTime,
        responses
      };
    };
    module2.exports = {
      decode,
      parse: parseV1
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v5/request.js
var require_request14 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v5/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Fetch: apiKey } = require_apiKeys();
    var ISOLATION_LEVEL = require_isolationLevel();
    module2.exports = ({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel = ISOLATION_LEVEL.READ_COMMITTED
    }) => ({
      apiKey,
      apiVersion: 5,
      apiName: "Fetch",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeInt32(maxWaitTime).writeInt32(minBytes).writeInt32(maxBytes).writeInt8(isolationLevel).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, fetchOffset, logStartOffset = -1, maxBytes }) => {
      return new Encoder().writeInt32(partition).writeInt64(fetchOffset).writeInt64(logStartOffset).writeInt32(maxBytes);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v5/response.js
var require_response14 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v5/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV1 } = require_response10();
    var decodeMessages = require_decodeMessages();
    var decodeAbortedTransactions = (decoder) => ({
      producerId: decoder.readInt64().toString(),
      firstOffset: decoder.readInt64().toString()
    });
    var decodePartition = async (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      highWatermark: decoder.readInt64().toString(),
      lastStableOffset: decoder.readInt64().toString(),
      lastStartOffset: decoder.readInt64().toString(),
      abortedTransactions: decoder.readArray(decodeAbortedTransactions),
      messages: await decodeMessages(decoder)
    });
    var decodeResponse = async (decoder) => ({
      topicName: decoder.readString(),
      partitions: await decoder.readArrayAsync(decodePartition)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const responses = await decoder.readArrayAsync(decodeResponse);
      return {
        throttleTime,
        responses
      };
    };
    module2.exports = {
      decode,
      parse: parseV1
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v6/request.js
var require_request15 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v6/request.js"(exports, module2) {
    var ISOLATION_LEVEL = require_isolationLevel();
    var requestV5 = require_request14();
    module2.exports = ({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel = ISOLATION_LEVEL.READ_COMMITTED
    }) => Object.assign(requestV5({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel
    }), { apiVersion: 6 });
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v6/response.js
var require_response15 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v6/response.js"(exports, module2) {
    var { decode, parse } = require_response14();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v7/request.js
var require_request16 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v7/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Fetch: apiKey } = require_apiKeys();
    var ISOLATION_LEVEL = require_isolationLevel();
    module2.exports = ({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
      sessionId = 0,
      sessionEpoch = -1,
      forgottenTopics = []
    }) => ({
      apiKey,
      apiVersion: 7,
      apiName: "Fetch",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeInt32(maxWaitTime).writeInt32(minBytes).writeInt32(maxBytes).writeInt8(isolationLevel).writeInt32(sessionId).writeInt32(sessionEpoch).writeArray(topics.map(encodeTopic)).writeArray(forgottenTopics.map(encodeForgottenTopics));
      }
    });
    var encodeForgottenTopics = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions);
    };
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, fetchOffset, logStartOffset = -1, maxBytes }) => {
      return new Encoder().writeInt32(partition).writeInt64(fetchOffset).writeInt64(logStartOffset).writeInt32(maxBytes);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v7/response.js
var require_response16 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v7/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV1 } = require_response10();
    var decodeMessages = require_decodeMessages();
    var decodeAbortedTransactions = (decoder) => ({
      producerId: decoder.readInt64().toString(),
      firstOffset: decoder.readInt64().toString()
    });
    var decodePartition = async (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      highWatermark: decoder.readInt64().toString(),
      lastStableOffset: decoder.readInt64().toString(),
      lastStartOffset: decoder.readInt64().toString(),
      abortedTransactions: decoder.readArray(decodeAbortedTransactions),
      messages: await decodeMessages(decoder)
    });
    var decodeResponse = async (decoder) => ({
      topicName: decoder.readString(),
      partitions: await decoder.readArrayAsync(decodePartition)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      const sessionId = decoder.readInt32();
      const responses = await decoder.readArrayAsync(decodeResponse);
      return {
        throttleTime,
        errorCode,
        sessionId,
        responses
      };
    };
    module2.exports = {
      decode,
      parse: parseV1
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v8/request.js
var require_request17 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v8/request.js"(exports, module2) {
    var ISOLATION_LEVEL = require_isolationLevel();
    var requestV7 = require_request16();
    module2.exports = ({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
      sessionId = 0,
      sessionEpoch = -1,
      forgottenTopics = []
    }) => Object.assign(requestV7({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel,
      sessionId,
      sessionEpoch,
      forgottenTopics
    }), { apiVersion: 8 });
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v8/response.js
var require_response17 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v8/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV1 } = require_response10();
    var decodeMessages = require_decodeMessages();
    var decodeAbortedTransactions = (decoder) => ({
      producerId: decoder.readInt64().toString(),
      firstOffset: decoder.readInt64().toString()
    });
    var decodePartition = async (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      highWatermark: decoder.readInt64().toString(),
      lastStableOffset: decoder.readInt64().toString(),
      lastStartOffset: decoder.readInt64().toString(),
      abortedTransactions: decoder.readArray(decodeAbortedTransactions),
      messages: await decodeMessages(decoder)
    });
    var decodeResponse = async (decoder) => ({
      topicName: decoder.readString(),
      partitions: await decoder.readArrayAsync(decodePartition)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const clientSideThrottleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      const sessionId = decoder.readInt32();
      const responses = await decoder.readArrayAsync(decodeResponse);
      return {
        throttleTime: 0,
        clientSideThrottleTime,
        errorCode,
        sessionId,
        responses
      };
    };
    module2.exports = {
      decode,
      parse: parseV1
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v9/request.js
var require_request18 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v9/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Fetch: apiKey } = require_apiKeys();
    var ISOLATION_LEVEL = require_isolationLevel();
    module2.exports = ({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
      sessionId = 0,
      sessionEpoch = -1,
      forgottenTopics = []
    }) => ({
      apiKey,
      apiVersion: 9,
      apiName: "Fetch",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeInt32(maxWaitTime).writeInt32(minBytes).writeInt32(maxBytes).writeInt8(isolationLevel).writeInt32(sessionId).writeInt32(sessionEpoch).writeArray(topics.map(encodeTopic)).writeArray(forgottenTopics.map(encodeForgottenTopics));
      }
    });
    var encodeForgottenTopics = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions);
    };
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({
      partition,
      currentLeaderEpoch = -1,
      fetchOffset,
      logStartOffset = -1,
      maxBytes
    }) => {
      return new Encoder().writeInt32(partition).writeInt32(currentLeaderEpoch).writeInt64(fetchOffset).writeInt64(logStartOffset).writeInt32(maxBytes);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v9/response.js
var require_response18 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v9/response.js"(exports, module2) {
    var { decode, parse } = require_response17();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v10/request.js
var require_request19 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v10/request.js"(exports, module2) {
    var ISOLATION_LEVEL = require_isolationLevel();
    var requestV9 = require_request18();
    module2.exports = ({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
      sessionId = 0,
      sessionEpoch = -1,
      forgottenTopics = []
    }) => Object.assign(requestV9({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel,
      sessionId,
      sessionEpoch,
      forgottenTopics
    }), { apiVersion: 10 });
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v10/response.js
var require_response19 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v10/response.js"(exports, module2) {
    var { decode, parse } = require_response18();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v11/request.js
var require_request20 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v11/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Fetch: apiKey } = require_apiKeys();
    var ISOLATION_LEVEL = require_isolationLevel();
    module2.exports = ({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      rackId = "",
      isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
      sessionId = 0,
      sessionEpoch = -1,
      forgottenTopics = []
    }) => ({
      apiKey,
      apiVersion: 11,
      apiName: "Fetch",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeInt32(maxWaitTime).writeInt32(minBytes).writeInt32(maxBytes).writeInt8(isolationLevel).writeInt32(sessionId).writeInt32(sessionEpoch).writeArray(topics.map(encodeTopic)).writeArray(forgottenTopics.map(encodeForgottenTopics)).writeString(rackId);
      }
    });
    var encodeForgottenTopics = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions);
    };
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({
      partition,
      currentLeaderEpoch = -1,
      fetchOffset,
      logStartOffset = -1,
      maxBytes
    }) => {
      return new Encoder().writeInt32(partition).writeInt32(currentLeaderEpoch).writeInt64(fetchOffset).writeInt64(logStartOffset).writeInt32(maxBytes);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/v11/response.js
var require_response20 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/v11/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV1 } = require_response10();
    var decodeMessages = require_decodeMessages();
    var decodeAbortedTransactions = (decoder) => ({
      producerId: decoder.readInt64().toString(),
      firstOffset: decoder.readInt64().toString()
    });
    var decodePartition = async (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      highWatermark: decoder.readInt64().toString(),
      lastStableOffset: decoder.readInt64().toString(),
      lastStartOffset: decoder.readInt64().toString(),
      abortedTransactions: decoder.readArray(decodeAbortedTransactions),
      preferredReadReplica: decoder.readInt32(),
      messages: await decodeMessages(decoder)
    });
    var decodeResponse = async (decoder) => ({
      topicName: decoder.readString(),
      partitions: await decoder.readArrayAsync(decodePartition)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const clientSideThrottleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      const sessionId = decoder.readInt32();
      const responses = await decoder.readArrayAsync(decodeResponse);
      return {
        throttleTime: 0,
        clientSideThrottleTime,
        errorCode,
        sessionId,
        responses
      };
    };
    module2.exports = {
      decode,
      parse: parseV1
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/fetch/index.js
var require_fetch = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/fetch/index.js"(exports, module2) {
    var ISOLATION_LEVEL = require_isolationLevel();
    var REPLICA_ID = -1;
    var NETWORK_DELAY = 100;
    var requestTimeout = (timeout) => Number.isSafeInteger(timeout + NETWORK_DELAY) ? timeout + NETWORK_DELAY : timeout;
    var versions = {
      0: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, topics }) => {
        const request = require_request9();
        const response = require_response9();
        return {
          request: request({ replicaId, maxWaitTime, minBytes, topics }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      1: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, topics }) => {
        const request = require_request10();
        const response = require_response10();
        return {
          request: request({ replicaId, maxWaitTime, minBytes, topics }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      2: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, topics }) => {
        const request = require_request11();
        const response = require_response11();
        return {
          request: request({ replicaId, maxWaitTime, minBytes, topics }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      3: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, maxBytes, topics }) => {
        const request = require_request12();
        const response = require_response12();
        return {
          request: request({ replicaId, maxWaitTime, minBytes, maxBytes, topics }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      4: ({
        replicaId = REPLICA_ID,
        isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics
      }) => {
        const request = require_request13();
        const response = require_response13();
        return {
          request: request({ replicaId, isolationLevel, maxWaitTime, minBytes, maxBytes, topics }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      5: ({
        replicaId = REPLICA_ID,
        isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics
      }) => {
        const request = require_request14();
        const response = require_response14();
        return {
          request: request({ replicaId, isolationLevel, maxWaitTime, minBytes, maxBytes, topics }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      6: ({
        replicaId = REPLICA_ID,
        isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics
      }) => {
        const request = require_request15();
        const response = require_response15();
        return {
          request: request({ replicaId, isolationLevel, maxWaitTime, minBytes, maxBytes, topics }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      7: ({
        replicaId = REPLICA_ID,
        isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
        sessionId = 0,
        sessionEpoch = -1,
        forgottenTopics = [],
        maxWaitTime,
        minBytes,
        maxBytes,
        topics
      }) => {
        const request = require_request16();
        const response = require_response16();
        return {
          request: request({
            replicaId,
            isolationLevel,
            sessionId,
            sessionEpoch,
            forgottenTopics,
            maxWaitTime,
            minBytes,
            maxBytes,
            topics
          }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      8: ({
        replicaId = REPLICA_ID,
        isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
        sessionId = 0,
        sessionEpoch = -1,
        forgottenTopics = [],
        maxWaitTime,
        minBytes,
        maxBytes,
        topics
      }) => {
        const request = require_request17();
        const response = require_response17();
        return {
          request: request({
            replicaId,
            isolationLevel,
            sessionId,
            sessionEpoch,
            forgottenTopics,
            maxWaitTime,
            minBytes,
            maxBytes,
            topics
          }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      9: ({
        replicaId = REPLICA_ID,
        isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
        sessionId = 0,
        sessionEpoch = -1,
        forgottenTopics = [],
        maxWaitTime,
        minBytes,
        maxBytes,
        topics
      }) => {
        const request = require_request18();
        const response = require_response18();
        return {
          request: request({
            replicaId,
            isolationLevel,
            sessionId,
            sessionEpoch,
            forgottenTopics,
            maxWaitTime,
            minBytes,
            maxBytes,
            topics
          }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      10: ({
        replicaId = REPLICA_ID,
        isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
        sessionId = 0,
        sessionEpoch = -1,
        forgottenTopics = [],
        maxWaitTime,
        minBytes,
        maxBytes,
        topics
      }) => {
        const request = require_request19();
        const response = require_response19();
        return {
          request: request({
            replicaId,
            isolationLevel,
            sessionId,
            sessionEpoch,
            forgottenTopics,
            maxWaitTime,
            minBytes,
            maxBytes,
            topics
          }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      },
      11: ({
        replicaId = REPLICA_ID,
        isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
        sessionId = 0,
        sessionEpoch = -1,
        forgottenTopics = [],
        maxWaitTime,
        minBytes,
        maxBytes,
        topics,
        rackId
      }) => {
        const request = require_request20();
        const response = require_response20();
        return {
          request: request({
            replicaId,
            isolationLevel,
            sessionId,
            sessionEpoch,
            forgottenTopics,
            maxWaitTime,
            minBytes,
            maxBytes,
            topics,
            rackId
          }),
          response,
          requestTimeout: requestTimeout(maxWaitTime)
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listOffsets/v0/request.js
var require_request21 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listOffsets/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { ListOffsets: apiKey } = require_apiKeys();
    module2.exports = ({ replicaId, topics }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "ListOffsets",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, timestamp = -1, maxNumOffsets = 1 }) => {
      return new Encoder().writeInt32(partition).writeInt64(timestamp).writeInt32(maxNumOffsets);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listOffsets/v0/response.js
var require_response21 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listOffsets/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        responses: decoder.readArray(decodeResponses)
      };
    };
    var decodeResponses = (decoder) => ({
      topic: decoder.readString(),
      partitions: decoder.readArray(decodePartitions)
    });
    var decodePartitions = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      offsets: decoder.readArray(decodeOffsets)
    });
    var decodeOffsets = (decoder) => decoder.readInt64().toString();
    var parse = async (data) => {
      const partitionsWithError = data.responses.flatMap((response) => response.partitions.filter((partition) => failure(partition.errorCode)));
      const partitionWithError = partitionsWithError[0];
      if (partitionWithError) {
        throw createErrorFromCode(partitionWithError.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listOffsets/v1/request.js
var require_request22 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listOffsets/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { ListOffsets: apiKey } = require_apiKeys();
    module2.exports = ({ replicaId, topics }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "ListOffsets",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, timestamp = -1 }) => {
      return new Encoder().writeInt32(partition).writeInt64(timestamp);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listOffsets/v1/response.js
var require_response22 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listOffsets/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        responses: decoder.readArray(decodeResponses)
      };
    };
    var decodeResponses = (decoder) => ({
      topic: decoder.readString(),
      partitions: decoder.readArray(decodePartitions)
    });
    var decodePartitions = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      timestamp: decoder.readInt64().toString(),
      offset: decoder.readInt64().toString()
    });
    var parse = async (data) => {
      const partitionsWithError = data.responses.flatMap((response) => response.partitions.filter((partition) => failure(partition.errorCode)));
      const partitionWithError = partitionsWithError[0];
      if (partitionWithError) {
        throw createErrorFromCode(partitionWithError.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listOffsets/v2/request.js
var require_request23 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listOffsets/v2/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { ListOffsets: apiKey } = require_apiKeys();
    module2.exports = ({ replicaId, isolationLevel, topics }) => ({
      apiKey,
      apiVersion: 2,
      apiName: "ListOffsets",
      encode: async () => {
        return new Encoder().writeInt32(replicaId).writeInt8(isolationLevel).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, timestamp = -1 }) => {
      return new Encoder().writeInt32(partition).writeInt64(timestamp);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listOffsets/v2/response.js
var require_response23 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listOffsets/v2/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        throttleTime: decoder.readInt32(),
        responses: decoder.readArray(decodeResponses)
      };
    };
    var decodeResponses = (decoder) => ({
      topic: decoder.readString(),
      partitions: decoder.readArray(decodePartitions)
    });
    var decodePartitions = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16(),
      timestamp: decoder.readInt64().toString(),
      offset: decoder.readInt64().toString()
    });
    var parse = async (data) => {
      const partitionsWithError = data.responses.flatMap((response) => response.partitions.filter((partition) => failure(partition.errorCode)));
      const partitionWithError = partitionsWithError[0];
      if (partitionWithError) {
        throw createErrorFromCode(partitionWithError.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listOffsets/v3/request.js
var require_request24 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listOffsets/v3/request.js"(exports, module2) {
    var requestV2 = require_request23();
    module2.exports = ({ replicaId, isolationLevel, topics }) => Object.assign(requestV2({ replicaId, isolationLevel, topics }), { apiVersion: 3 });
  }
});

// node_modules/kafkajs/src/protocol/requests/listOffsets/v3/response.js
var require_response24 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listOffsets/v3/response.js"(exports, module2) {
    var { parse, decode: decodeV2 } = require_response23();
    var decode = async (rawData) => {
      const decoded = await decodeV2(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listOffsets/index.js
var require_listOffsets = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listOffsets/index.js"(exports, module2) {
    var ISOLATION_LEVEL = require_isolationLevel();
    var REPLICA_ID = -1;
    var versions = {
      0: ({ replicaId = REPLICA_ID, topics }) => {
        const request = require_request21();
        const response = require_response21();
        return { request: request({ replicaId, topics }), response };
      },
      1: ({ replicaId = REPLICA_ID, topics }) => {
        const request = require_request22();
        const response = require_response22();
        return { request: request({ replicaId, topics }), response };
      },
      2: ({ replicaId = REPLICA_ID, isolationLevel = ISOLATION_LEVEL.READ_COMMITTED, topics }) => {
        const request = require_request23();
        const response = require_response23();
        return { request: request({ replicaId, isolationLevel, topics }), response };
      },
      3: ({ replicaId = REPLICA_ID, isolationLevel = ISOLATION_LEVEL.READ_COMMITTED, topics }) => {
        const request = require_request24();
        const response = require_response24();
        return { request: request({ replicaId, isolationLevel, topics }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v0/request.js
var require_request25 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Metadata: apiKey } = require_apiKeys();
    module2.exports = ({ topics }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "Metadata",
      encode: async () => {
        return new Encoder().writeArray(topics);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v0/response.js
var require_response25 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var broker = (decoder) => ({
      nodeId: decoder.readInt32(),
      host: decoder.readString(),
      port: decoder.readInt32()
    });
    var topicMetadata = (decoder) => ({
      topicErrorCode: decoder.readInt16(),
      topic: decoder.readString(),
      partitionMetadata: decoder.readArray(partitionMetadata)
    });
    var partitionMetadata = (decoder) => ({
      partitionErrorCode: decoder.readInt16(),
      partitionId: decoder.readInt32(),
      leader: decoder.readInt32(),
      replicas: decoder.readArray((d) => d.readInt32()),
      isr: decoder.readArray((d) => d.readInt32())
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        brokers: decoder.readArray(broker),
        topicMetadata: decoder.readArray(topicMetadata)
      };
    };
    var parse = async (data) => {
      const topicsWithErrors = data.topicMetadata.filter((topic) => failure(topic.topicErrorCode));
      if (topicsWithErrors.length > 0) {
        const { topicErrorCode } = topicsWithErrors[0];
        throw createErrorFromCode(topicErrorCode);
      }
      const errors = data.topicMetadata.flatMap((topic) => {
        return topic.partitionMetadata.filter((partition) => failure(partition.partitionErrorCode));
      });
      if (errors.length > 0) {
        const { partitionErrorCode } = errors[0];
        throw createErrorFromCode(partitionErrorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v1/request.js
var require_request26 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Metadata: apiKey } = require_apiKeys();
    module2.exports = ({ topics }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "Metadata",
      encode: async () => {
        return new Encoder().writeNullableArray(topics);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v1/response.js
var require_response26 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response25();
    var broker = (decoder) => ({
      nodeId: decoder.readInt32(),
      host: decoder.readString(),
      port: decoder.readInt32(),
      rack: decoder.readString()
    });
    var topicMetadata = (decoder) => ({
      topicErrorCode: decoder.readInt16(),
      topic: decoder.readString(),
      isInternal: decoder.readBoolean(),
      partitionMetadata: decoder.readArray(partitionMetadata)
    });
    var partitionMetadata = (decoder) => ({
      partitionErrorCode: decoder.readInt16(),
      partitionId: decoder.readInt32(),
      leader: decoder.readInt32(),
      replicas: decoder.readArray((d) => d.readInt32()),
      isr: decoder.readArray((d) => d.readInt32())
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        brokers: decoder.readArray(broker),
        controllerId: decoder.readInt32(),
        topicMetadata: decoder.readArray(topicMetadata)
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v2/request.js
var require_request27 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v2/request.js"(exports, module2) {
    var requestV1 = require_request26();
    module2.exports = ({ topics }) => Object.assign(requestV1({ topics }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v2/response.js
var require_response27 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v2/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response25();
    var broker = (decoder) => ({
      nodeId: decoder.readInt32(),
      host: decoder.readString(),
      port: decoder.readInt32(),
      rack: decoder.readString()
    });
    var topicMetadata = (decoder) => ({
      topicErrorCode: decoder.readInt16(),
      topic: decoder.readString(),
      isInternal: decoder.readBoolean(),
      partitionMetadata: decoder.readArray(partitionMetadata)
    });
    var partitionMetadata = (decoder) => ({
      partitionErrorCode: decoder.readInt16(),
      partitionId: decoder.readInt32(),
      leader: decoder.readInt32(),
      replicas: decoder.readArray((d) => d.readInt32()),
      isr: decoder.readArray((d) => d.readInt32())
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        brokers: decoder.readArray(broker),
        clusterId: decoder.readString(),
        controllerId: decoder.readInt32(),
        topicMetadata: decoder.readArray(topicMetadata)
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v3/request.js
var require_request28 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v3/request.js"(exports, module2) {
    var requestV1 = require_request26();
    module2.exports = ({ topics }) => Object.assign(requestV1({ topics }), { apiVersion: 3 });
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v3/response.js
var require_response28 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v3/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response25();
    var broker = (decoder) => ({
      nodeId: decoder.readInt32(),
      host: decoder.readString(),
      port: decoder.readInt32(),
      rack: decoder.readString()
    });
    var topicMetadata = (decoder) => ({
      topicErrorCode: decoder.readInt16(),
      topic: decoder.readString(),
      isInternal: decoder.readBoolean(),
      partitionMetadata: decoder.readArray(partitionMetadata)
    });
    var partitionMetadata = (decoder) => ({
      partitionErrorCode: decoder.readInt16(),
      partitionId: decoder.readInt32(),
      leader: decoder.readInt32(),
      replicas: decoder.readArray((d) => d.readInt32()),
      isr: decoder.readArray((d) => d.readInt32())
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        throttleTime: decoder.readInt32(),
        brokers: decoder.readArray(broker),
        clusterId: decoder.readString(),
        controllerId: decoder.readInt32(),
        topicMetadata: decoder.readArray(topicMetadata)
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v4/request.js
var require_request29 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v4/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Metadata: apiKey } = require_apiKeys();
    module2.exports = ({ topics, allowAutoTopicCreation = true }) => ({
      apiKey,
      apiVersion: 4,
      apiName: "Metadata",
      encode: async () => {
        return new Encoder().writeNullableArray(topics).writeBoolean(allowAutoTopicCreation);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v4/response.js
var require_response29 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v4/response.js"(exports, module2) {
    var { parse: parseV3, decode: decodeV3 } = require_response28();
    module2.exports = {
      parse: parseV3,
      decode: decodeV3
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v5/request.js
var require_request30 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v5/request.js"(exports, module2) {
    var requestV4 = require_request29();
    module2.exports = ({ topics, allowAutoTopicCreation = true }) => Object.assign(requestV4({ topics, allowAutoTopicCreation }), { apiVersion: 5 });
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v5/response.js
var require_response30 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v5/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response25();
    var broker = (decoder) => ({
      nodeId: decoder.readInt32(),
      host: decoder.readString(),
      port: decoder.readInt32(),
      rack: decoder.readString()
    });
    var topicMetadata = (decoder) => ({
      topicErrorCode: decoder.readInt16(),
      topic: decoder.readString(),
      isInternal: decoder.readBoolean(),
      partitionMetadata: decoder.readArray(partitionMetadata)
    });
    var partitionMetadata = (decoder) => ({
      partitionErrorCode: decoder.readInt16(),
      partitionId: decoder.readInt32(),
      leader: decoder.readInt32(),
      replicas: decoder.readArray((d) => d.readInt32()),
      isr: decoder.readArray((d) => d.readInt32()),
      offlineReplicas: decoder.readArray((d) => d.readInt32())
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        throttleTime: decoder.readInt32(),
        brokers: decoder.readArray(broker),
        clusterId: decoder.readString(),
        controllerId: decoder.readInt32(),
        topicMetadata: decoder.readArray(topicMetadata)
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v6/request.js
var require_request31 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v6/request.js"(exports, module2) {
    var requestV5 = require_request30();
    module2.exports = ({ topics, allowAutoTopicCreation = true }) => Object.assign(requestV5({ topics, allowAutoTopicCreation }), { apiVersion: 6 });
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/v6/response.js
var require_response31 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/v6/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response30();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/metadata/index.js
var require_metadata = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/metadata/index.js"(exports, module2) {
    var versions = {
      0: ({ topics }) => {
        const request = require_request25();
        const response = require_response25();
        return { request: request({ topics }), response };
      },
      1: ({ topics }) => {
        const request = require_request26();
        const response = require_response26();
        return { request: request({ topics }), response };
      },
      2: ({ topics }) => {
        const request = require_request27();
        const response = require_response27();
        return { request: request({ topics }), response };
      },
      3: ({ topics }) => {
        const request = require_request28();
        const response = require_response28();
        return { request: request({ topics }), response };
      },
      4: ({ topics, allowAutoTopicCreation }) => {
        const request = require_request29();
        const response = require_response29();
        return { request: request({ topics, allowAutoTopicCreation }), response };
      },
      5: ({ topics, allowAutoTopicCreation }) => {
        const request = require_request30();
        const response = require_response30();
        return { request: request({ topics, allowAutoTopicCreation }), response };
      },
      6: ({ topics, allowAutoTopicCreation }) => {
        const request = require_request31();
        const response = require_response31();
        return { request: request({ topics, allowAutoTopicCreation }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v0/request.js
var require_request32 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { OffsetCommit: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, topics }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "OffsetCommit",
      encode: async () => {
        return new Encoder().writeString(groupId).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, offset, metadata = null }) => {
      return new Encoder().writeInt32(partition).writeInt64(offset).writeString(metadata);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v0/response.js
var require_response32 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        responses: decoder.readArray(decodeResponses)
      };
    };
    var decodeResponses = (decoder) => ({
      topic: decoder.readString(),
      partitions: decoder.readArray(decodePartitions)
    });
    var decodePartitions = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16()
    });
    var parse = async (data) => {
      const partitionsWithError = data.responses.flatMap((response) => response.partitions.filter((partition) => failure(partition.errorCode)));
      const partitionWithError = partitionsWithError[0];
      if (partitionWithError) {
        throw createErrorFromCode(partitionWithError.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v1/request.js
var require_request33 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { OffsetCommit: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, groupGenerationId, memberId, topics }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "OffsetCommit",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(groupGenerationId).writeString(memberId).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, offset, timestamp = Date.now(), metadata = null }) => {
      return new Encoder().writeInt32(partition).writeInt64(offset).writeInt64(timestamp).writeString(metadata);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v1/response.js
var require_response33 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v1/response.js"(exports, module2) {
    var { parse, decode } = require_response32();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v2/request.js
var require_request34 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v2/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { OffsetCommit: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, groupGenerationId, memberId, retentionTime, topics }) => ({
      apiKey,
      apiVersion: 2,
      apiName: "OffsetCommit",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(groupGenerationId).writeString(memberId).writeInt64(retentionTime).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, offset, metadata = null }) => {
      return new Encoder().writeInt32(partition).writeInt64(offset).writeString(metadata);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v2/response.js
var require_response34 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v2/response.js"(exports, module2) {
    var { parse, decode } = require_response32();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v3/request.js
var require_request35 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v3/request.js"(exports, module2) {
    var requestV2 = require_request34();
    module2.exports = ({ groupId, groupGenerationId, memberId, retentionTime, topics }) => Object.assign(requestV2({ groupId, groupGenerationId, memberId, retentionTime, topics }), {
      apiVersion: 3
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v3/response.js
var require_response35 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v3/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response32();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        throttleTime: decoder.readInt32(),
        responses: decoder.readArray(decodeResponses)
      };
    };
    var decodeResponses = (decoder) => ({
      topic: decoder.readString(),
      partitions: decoder.readArray(decodePartitions)
    });
    var decodePartitions = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16()
    });
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v4/request.js
var require_request36 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v4/request.js"(exports, module2) {
    var requestV3 = require_request35();
    module2.exports = ({ groupId, groupGenerationId, memberId, retentionTime, topics }) => Object.assign(requestV3({ groupId, groupGenerationId, memberId, retentionTime, topics }), {
      apiVersion: 4
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v4/response.js
var require_response36 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v4/response.js"(exports, module2) {
    var { parse, decode: decodeV3 } = require_response35();
    var decode = async (rawData) => {
      const decoded = await decodeV3(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v5/request.js
var require_request37 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v5/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { OffsetCommit: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, groupGenerationId, memberId, topics }) => ({
      apiKey,
      apiVersion: 5,
      apiName: "OffsetCommit",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(groupGenerationId).writeString(memberId).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, offset, metadata = null }) => {
      return new Encoder().writeInt32(partition).writeInt64(offset).writeString(metadata);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/v5/response.js
var require_response37 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/v5/response.js"(exports, module2) {
    var { parse, decode } = require_response36();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetCommit/index.js
var require_offsetCommit = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetCommit/index.js"(exports, module2) {
    var RETENTION_TIME = -1;
    var versions = {
      0: ({ groupId, topics }) => {
        const request = require_request32();
        const response = require_response32();
        return { request: request({ groupId, topics }), response };
      },
      1: ({ groupId, groupGenerationId, memberId, topics }) => {
        const request = require_request33();
        const response = require_response33();
        return { request: request({ groupId, groupGenerationId, memberId, topics }), response };
      },
      2: ({ groupId, groupGenerationId, memberId, retentionTime = RETENTION_TIME, topics }) => {
        const request = require_request34();
        const response = require_response34();
        return {
          request: request({
            groupId,
            groupGenerationId,
            memberId,
            retentionTime,
            topics
          }),
          response
        };
      },
      3: ({ groupId, groupGenerationId, memberId, retentionTime = RETENTION_TIME, topics }) => {
        const request = require_request35();
        const response = require_response35();
        return {
          request: request({
            groupId,
            groupGenerationId,
            memberId,
            retentionTime,
            topics
          }),
          response
        };
      },
      4: ({ groupId, groupGenerationId, memberId, retentionTime = RETENTION_TIME, topics }) => {
        const request = require_request36();
        const response = require_response36();
        return {
          request: request({
            groupId,
            groupGenerationId,
            memberId,
            retentionTime,
            topics
          }),
          response
        };
      },
      5: ({ groupId, groupGenerationId, memberId, topics }) => {
        const request = require_request37();
        const response = require_response37();
        return {
          request: request({
            groupId,
            groupGenerationId,
            memberId,
            topics
          }),
          response
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetFetch/v1/request.js
var require_request38 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetFetch/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { OffsetFetch: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, topics }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "OffsetFetch",
      encode: async () => {
        return new Encoder().writeString(groupId).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition }) => {
      return new Encoder().writeInt32(partition);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetFetch/v1/response.js
var require_response38 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetFetch/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        responses: decoder.readArray(decodeResponses)
      };
    };
    var decodeResponses = (decoder) => ({
      topic: decoder.readString(),
      partitions: decoder.readArray(decodePartitions)
    });
    var decodePartitions = (decoder) => ({
      partition: decoder.readInt32(),
      offset: decoder.readInt64().toString(),
      metadata: decoder.readString(),
      errorCode: decoder.readInt16()
    });
    var parse = async (data) => {
      const partitionsWithError = data.responses.flatMap((response) => response.partitions.filter((partition) => failure(partition.errorCode)));
      const partitionWithError = partitionsWithError[0];
      if (partitionWithError) {
        throw createErrorFromCode(partitionWithError.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetFetch/v2/request.js
var require_request39 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetFetch/v2/request.js"(exports, module2) {
    var requestV1 = require_request38();
    module2.exports = ({ groupId, topics }) => Object.assign(requestV1({ groupId, topics }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetFetch/v2/response.js
var require_response39 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetFetch/v2/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        responses: decoder.readArray(decodeResponses),
        errorCode: decoder.readInt16()
      };
    };
    var decodeResponses = (decoder) => ({
      topic: decoder.readString(),
      partitions: decoder.readArray(decodePartitions)
    });
    var decodePartitions = (decoder) => ({
      partition: decoder.readInt32(),
      offset: decoder.readInt64().toString(),
      metadata: decoder.readString(),
      errorCode: decoder.readInt16()
    });
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      const partitionsWithError = data.responses.flatMap((response) => response.partitions.filter((partition) => failure(partition.errorCode)));
      const partitionWithError = partitionsWithError[0];
      if (partitionWithError) {
        throw createErrorFromCode(partitionWithError.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetFetch/v3/request.js
var require_request40 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetFetch/v3/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { OffsetFetch: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, topics }) => ({
      apiKey,
      apiVersion: 3,
      apiName: "OffsetFetch",
      encode: async () => {
        return new Encoder().writeString(groupId).writeNullableArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition }) => {
      return new Encoder().writeInt32(partition);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetFetch/v3/response.js
var require_response40 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetFetch/v3/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV2 } = require_response39();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        throttleTime: decoder.readInt32(),
        responses: decoder.readArray(decodeResponses),
        errorCode: decoder.readInt16()
      };
    };
    var decodeResponses = (decoder) => ({
      topic: decoder.readString(),
      partitions: decoder.readArray(decodePartitions)
    });
    var decodePartitions = (decoder) => ({
      partition: decoder.readInt32(),
      offset: decoder.readInt64().toString(),
      metadata: decoder.readString(),
      errorCode: decoder.readInt16()
    });
    module2.exports = {
      decode,
      parse: parseV2
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetFetch/v4/request.js
var require_request41 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetFetch/v4/request.js"(exports, module2) {
    var requestV3 = require_request40();
    module2.exports = ({ groupId, topics }) => Object.assign(requestV3({ groupId, topics }), { apiVersion: 4 });
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetFetch/v4/response.js
var require_response41 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetFetch/v4/response.js"(exports, module2) {
    var { parse, decode: decodeV3 } = require_response40();
    var decode = async (rawData) => {
      const decoded = await decodeV3(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/offsetFetch/index.js
var require_offsetFetch = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/offsetFetch/index.js"(exports, module2) {
    var versions = {
      1: ({ groupId, topics }) => {
        const request = require_request38();
        const response = require_response38();
        return { request: request({ groupId, topics }), response };
      },
      2: ({ groupId, topics }) => {
        const request = require_request39();
        const response = require_response39();
        return { request: request({ groupId, topics }), response };
      },
      3: ({ groupId, topics }) => {
        const request = require_request40();
        const response = require_response40();
        return { request: request({ groupId, topics }), response };
      },
      4: ({ groupId, topics }) => {
        const request = require_request41();
        const response = require_response41();
        return { request: request({ groupId, topics }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/coordinatorTypes.js
var require_coordinatorTypes = __commonJS({
  "node_modules/kafkajs/src/protocol/coordinatorTypes.js"(exports, module2) {
    module2.exports = {
      GROUP: 0,
      TRANSACTION: 1
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/findCoordinator/v0/request.js
var require_request42 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/findCoordinator/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { GroupCoordinator: apiKey } = require_apiKeys();
    module2.exports = ({ groupId }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "GroupCoordinator",
      encode: async () => {
        return new Encoder().writeString(groupId);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/findCoordinator/v0/response.js
var require_response42 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/findCoordinator/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      const coordinator = {
        nodeId: decoder.readInt32(),
        host: decoder.readString(),
        port: decoder.readInt32()
      };
      return {
        errorCode,
        coordinator
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/findCoordinator/v1/request.js
var require_request43 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/findCoordinator/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { GroupCoordinator: apiKey } = require_apiKeys();
    module2.exports = ({ coordinatorKey, coordinatorType }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "GroupCoordinator",
      encode: async () => {
        return new Encoder().writeString(coordinatorKey).writeInt8(coordinatorType);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/findCoordinator/v1/response.js
var require_response43 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/findCoordinator/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      const errorMessage = decoder.readString();
      const coordinator = {
        nodeId: decoder.readInt32(),
        host: decoder.readString(),
        port: decoder.readInt32()
      };
      return {
        throttleTime,
        errorCode,
        errorMessage,
        coordinator
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/findCoordinator/v2/request.js
var require_request44 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/findCoordinator/v2/request.js"(exports, module2) {
    var requestV1 = require_request43();
    module2.exports = ({ coordinatorKey, coordinatorType }) => Object.assign(requestV1({ coordinatorKey, coordinatorType }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/findCoordinator/v2/response.js
var require_response44 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/findCoordinator/v2/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response43();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/findCoordinator/index.js
var require_findCoordinator = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/findCoordinator/index.js"(exports, module2) {
    var COORDINATOR_TYPES = require_coordinatorTypes();
    var versions = {
      0: ({ groupId }) => {
        const request = require_request42();
        const response = require_response42();
        return { request: request({ groupId }), response };
      },
      1: ({ groupId, coordinatorType = COORDINATOR_TYPES.GROUP }) => {
        const request = require_request43();
        const response = require_response43();
        return { request: request({ coordinatorKey: groupId, coordinatorType }), response };
      },
      2: ({ groupId, coordinatorType = COORDINATOR_TYPES.GROUP }) => {
        const request = require_request44();
        const response = require_response44();
        return { request: request({ coordinatorKey: groupId, coordinatorType }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v0/request.js
var require_request45 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { JoinGroup: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, sessionTimeout, memberId, protocolType, groupProtocols }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "JoinGroup",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(sessionTimeout).writeString(memberId).writeString(protocolType).writeArray(groupProtocols.map(encodeGroupProtocols));
      }
    });
    var encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
      return new Encoder().writeString(name).writeBytes(metadata);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v0/response.js
var require_response45 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        errorCode,
        generationId: decoder.readInt32(),
        groupProtocol: decoder.readString(),
        leaderId: decoder.readString(),
        memberId: decoder.readString(),
        members: decoder.readArray((decoder2) => ({
          memberId: decoder2.readString(),
          memberMetadata: decoder2.readBytes()
        }))
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v1/request.js
var require_request46 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { JoinGroup: apiKey } = require_apiKeys();
    module2.exports = ({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols
    }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "JoinGroup",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(sessionTimeout).writeInt32(rebalanceTimeout).writeString(memberId).writeString(protocolType).writeArray(groupProtocols.map(encodeGroupProtocols));
      }
    });
    var encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
      return new Encoder().writeString(name).writeBytes(metadata);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v1/response.js
var require_response46 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v1/response.js"(exports, module2) {
    var { parse, decode } = require_response45();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v2/request.js
var require_request47 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v2/request.js"(exports, module2) {
    var requestV1 = require_request46();
    module2.exports = ({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols
    }) => Object.assign(requestV1({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols
    }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v2/response.js
var require_response47 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v2/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failIfVersionNotSupported } = require_error();
    var { parse: parseV0 } = require_response45();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        throttleTime,
        errorCode,
        generationId: decoder.readInt32(),
        groupProtocol: decoder.readString(),
        leaderId: decoder.readString(),
        memberId: decoder.readString(),
        members: decoder.readArray((decoder2) => ({
          memberId: decoder2.readString(),
          memberMetadata: decoder2.readBytes()
        }))
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v3/request.js
var require_request48 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v3/request.js"(exports, module2) {
    var requestV2 = require_request47();
    module2.exports = ({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols
    }) => Object.assign(requestV2({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols
    }), { apiVersion: 3 });
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v3/response.js
var require_response48 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v3/response.js"(exports, module2) {
    var { parse, decode: decodeV2 } = require_response47();
    var decode = async (rawData) => {
      const decoded = await decodeV2(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v4/request.js
var require_request49 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v4/request.js"(exports, module2) {
    var requestV3 = require_request48();
    module2.exports = ({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols
    }) => Object.assign(requestV3({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols
    }), { apiVersion: 4 });
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v4/response.js
var require_response49 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v4/response.js"(exports, module2) {
    var { decode } = require_response48();
    var { KafkaJSMemberIdRequired } = require_errors();
    var { failure, createErrorFromCode, errorCodes } = require_error();
    var { code: MEMBER_ID_REQUIRED_ERROR_CODE } = errorCodes.find((e) => e.type === "MEMBER_ID_REQUIRED");
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        if (data.errorCode === MEMBER_ID_REQUIRED_ERROR_CODE) {
          throw new KafkaJSMemberIdRequired(createErrorFromCode(data.errorCode), {
            memberId: data.memberId
          });
        }
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v5/request.js
var require_request50 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v5/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { JoinGroup: apiKey } = require_apiKeys();
    module2.exports = ({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      groupInstanceId = null,
      protocolType,
      groupProtocols
    }) => ({
      apiKey,
      apiVersion: 5,
      apiName: "JoinGroup",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(sessionTimeout).writeInt32(rebalanceTimeout).writeString(memberId).writeString(groupInstanceId).writeString(protocolType).writeArray(groupProtocols.map(encodeGroupProtocols));
      }
    });
    var encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
      return new Encoder().writeString(name).writeBytes(metadata);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/v5/response.js
var require_response50 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/v5/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { KafkaJSMemberIdRequired } = require_errors();
    var {
      failure,
      createErrorFromCode,
      errorCodes,
      failIfVersionNotSupported
    } = require_error();
    var { code: MEMBER_ID_REQUIRED_ERROR_CODE } = errorCodes.find((e) => e.type === "MEMBER_ID_REQUIRED");
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        if (data.errorCode === MEMBER_ID_REQUIRED_ERROR_CODE) {
          throw new KafkaJSMemberIdRequired(createErrorFromCode(data.errorCode), {
            memberId: data.memberId
          });
        }
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        throttleTime: 0,
        clientSideThrottleTime: throttleTime,
        errorCode,
        generationId: decoder.readInt32(),
        groupProtocol: decoder.readString(),
        leaderId: decoder.readString(),
        memberId: decoder.readString(),
        members: decoder.readArray((decoder2) => ({
          memberId: decoder2.readString(),
          groupInstanceId: decoder2.readString(),
          memberMetadata: decoder2.readBytes()
        }))
      };
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/joinGroup/index.js
var require_joinGroup = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/joinGroup/index.js"(exports, module2) {
    var NETWORK_DELAY = 5e3;
    var requestTimeout = ({ rebalanceTimeout, sessionTimeout }) => {
      const timeout = rebalanceTimeout || sessionTimeout;
      return Number.isSafeInteger(timeout + NETWORK_DELAY) ? timeout + NETWORK_DELAY : timeout;
    };
    var logResponseError = (memberId) => memberId != null && memberId !== "";
    var versions = {
      0: ({ groupId, sessionTimeout, memberId, protocolType, groupProtocols }) => {
        const request = require_request45();
        const response = require_response45();
        return {
          request: request({
            groupId,
            sessionTimeout,
            memberId,
            protocolType,
            groupProtocols
          }),
          response,
          requestTimeout: requestTimeout({ rebalanceTimeout: null, sessionTimeout })
        };
      },
      1: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
        const request = require_request46();
        const response = require_response46();
        return {
          request: request({
            groupId,
            sessionTimeout,
            rebalanceTimeout,
            memberId,
            protocolType,
            groupProtocols
          }),
          response,
          requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout })
        };
      },
      2: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
        const request = require_request47();
        const response = require_response47();
        return {
          request: request({
            groupId,
            sessionTimeout,
            rebalanceTimeout,
            memberId,
            protocolType,
            groupProtocols
          }),
          response,
          requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout })
        };
      },
      3: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
        const request = require_request48();
        const response = require_response48();
        return {
          request: request({
            groupId,
            sessionTimeout,
            rebalanceTimeout,
            memberId,
            protocolType,
            groupProtocols
          }),
          response,
          requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout })
        };
      },
      4: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
        const request = require_request49();
        const response = require_response49();
        return {
          request: request({
            groupId,
            sessionTimeout,
            rebalanceTimeout,
            memberId,
            protocolType,
            groupProtocols
          }),
          response,
          requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
          logResponseError: logResponseError(memberId)
        };
      },
      5: ({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        groupInstanceId,
        protocolType,
        groupProtocols
      }) => {
        const request = require_request50();
        const response = require_response50();
        return {
          request: request({
            groupId,
            sessionTimeout,
            rebalanceTimeout,
            memberId,
            groupInstanceId,
            protocolType,
            groupProtocols
          }),
          response,
          requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
          logResponseError: logResponseError(memberId)
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/heartbeat/v0/request.js
var require_request51 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/heartbeat/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Heartbeat: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, groupGenerationId, memberId }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "Heartbeat",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(groupGenerationId).writeString(memberId);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/heartbeat/v0/response.js
var require_response51 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/heartbeat/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return { errorCode };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/heartbeat/v1/request.js
var require_request52 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/heartbeat/v1/request.js"(exports, module2) {
    var requestV0 = require_request51();
    module2.exports = ({ groupId, groupGenerationId, memberId }) => Object.assign(requestV0({ groupId, groupGenerationId, memberId }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/heartbeat/v1/response.js
var require_response52 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/heartbeat/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failIfVersionNotSupported } = require_error();
    var { parse: parseV0 } = require_response51();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return { throttleTime, errorCode };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/heartbeat/v2/request.js
var require_request53 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/heartbeat/v2/request.js"(exports, module2) {
    var requestV1 = require_request52();
    module2.exports = ({ groupId, groupGenerationId, memberId }) => Object.assign(requestV1({ groupId, groupGenerationId, memberId }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/heartbeat/v2/response.js
var require_response53 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/heartbeat/v2/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response52();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/heartbeat/v3/request.js
var require_request54 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/heartbeat/v3/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { Heartbeat: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, groupGenerationId, memberId, groupInstanceId }) => ({
      apiKey,
      apiVersion: 3,
      apiName: "Heartbeat",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(groupGenerationId).writeString(memberId).writeString(groupInstanceId);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/heartbeat/v3/response.js
var require_response54 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/heartbeat/v3/response.js"(exports, module2) {
    var { parse, decode } = require_response53();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/heartbeat/index.js
var require_heartbeat = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/heartbeat/index.js"(exports, module2) {
    var versions = {
      0: ({ groupId, groupGenerationId, memberId }) => {
        const request = require_request51();
        const response = require_response51();
        return {
          request: request({ groupId, groupGenerationId, memberId }),
          response
        };
      },
      1: ({ groupId, groupGenerationId, memberId }) => {
        const request = require_request52();
        const response = require_response52();
        return {
          request: request({ groupId, groupGenerationId, memberId }),
          response
        };
      },
      2: ({ groupId, groupGenerationId, memberId }) => {
        const request = require_request53();
        const response = require_response53();
        return {
          request: request({ groupId, groupGenerationId, memberId }),
          response
        };
      },
      3: ({ groupId, groupGenerationId, memberId, groupInstanceId }) => {
        const request = require_request54();
        const response = require_response54();
        return {
          request: request({ groupId, groupGenerationId, memberId, groupInstanceId }),
          response
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/leaveGroup/v0/request.js
var require_request55 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/leaveGroup/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { LeaveGroup: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, memberId }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "LeaveGroup",
      encode: async () => {
        return new Encoder().writeString(groupId).writeString(memberId);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/leaveGroup/v0/response.js
var require_response55 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/leaveGroup/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return { errorCode };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/leaveGroup/v1/request.js
var require_request56 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/leaveGroup/v1/request.js"(exports, module2) {
    var requestV0 = require_request55();
    module2.exports = ({ groupId, memberId }) => Object.assign(requestV0({ groupId, memberId }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/leaveGroup/v1/response.js
var require_response56 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/leaveGroup/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failIfVersionNotSupported } = require_error();
    var { parse: parseV0 } = require_response55();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return { throttleTime, errorCode };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/leaveGroup/v2/request.js
var require_request57 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/leaveGroup/v2/request.js"(exports, module2) {
    var requestV1 = require_request56();
    module2.exports = ({ groupId, memberId }) => Object.assign(requestV1({ groupId, memberId }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/leaveGroup/v2/response.js
var require_response57 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/leaveGroup/v2/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response56();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/leaveGroup/v3/request.js
var require_request58 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/leaveGroup/v3/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { LeaveGroup: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, members }) => ({
      apiKey,
      apiVersion: 3,
      apiName: "LeaveGroup",
      encode: async () => {
        return new Encoder().writeString(groupId).writeArray(members.map((member) => encodeMember(member)));
      }
    });
    var encodeMember = ({ memberId, groupInstanceId = null }) => {
      return new Encoder().writeString(memberId).writeString(groupInstanceId);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/leaveGroup/v3/response.js
var require_response58 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/leaveGroup/v3/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failIfVersionNotSupported, failure, createErrorFromCode } = require_error();
    var { parse: parseV2 } = require_response57();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      const members = decoder.readArray(decodeMembers);
      failIfVersionNotSupported(errorCode);
      return { throttleTime: 0, clientSideThrottleTime: throttleTime, errorCode, members };
    };
    var decodeMembers = (decoder) => ({
      memberId: decoder.readString(),
      groupInstanceId: decoder.readString(),
      errorCode: decoder.readInt16()
    });
    var parse = async (data) => {
      const parsed = parseV2(data);
      const memberWithError = data.members.find((member) => failure(member.errorCode));
      if (memberWithError) {
        throw createErrorFromCode(memberWithError.errorCode);
      }
      return parsed;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/leaveGroup/index.js
var require_leaveGroup = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/leaveGroup/index.js"(exports, module2) {
    var versions = {
      0: ({ groupId, memberId }) => {
        const request = require_request55();
        const response = require_response55();
        return {
          request: request({ groupId, memberId }),
          response
        };
      },
      1: ({ groupId, memberId }) => {
        const request = require_request56();
        const response = require_response56();
        return {
          request: request({ groupId, memberId }),
          response
        };
      },
      2: ({ groupId, memberId }) => {
        const request = require_request57();
        const response = require_response57();
        return {
          request: request({ groupId, memberId }),
          response
        };
      },
      3: ({ groupId, memberId, groupInstanceId }) => {
        const request = require_request58();
        const response = require_response58();
        return {
          request: request({ groupId, members: [{ memberId, groupInstanceId }] }),
          response
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/syncGroup/v0/request.js
var require_request59 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/syncGroup/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { SyncGroup: apiKey } = require_apiKeys();
    module2.exports = ({ groupId, generationId, memberId, groupAssignment }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "SyncGroup",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(generationId).writeString(memberId).writeArray(groupAssignment.map(encodeGroupAssignment));
      }
    });
    var encodeGroupAssignment = ({ memberId, memberAssignment }) => {
      return new Encoder().writeString(memberId).writeBytes(memberAssignment);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/syncGroup/v0/response.js
var require_response59 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/syncGroup/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        errorCode,
        memberAssignment: decoder.readBytes()
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/syncGroup/v1/request.js
var require_request60 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/syncGroup/v1/request.js"(exports, module2) {
    var requestV0 = require_request59();
    module2.exports = ({ groupId, generationId, memberId, groupAssignment }) => Object.assign(requestV0({ groupId, generationId, memberId, groupAssignment }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/syncGroup/v1/response.js
var require_response60 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/syncGroup/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failIfVersionNotSupported } = require_error();
    var { parse: parseV0 } = require_response59();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        throttleTime,
        errorCode,
        memberAssignment: decoder.readBytes()
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/syncGroup/v2/request.js
var require_request61 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/syncGroup/v2/request.js"(exports, module2) {
    var requestV1 = require_request60();
    module2.exports = ({ groupId, generationId, memberId, groupAssignment }) => Object.assign(requestV1({ groupId, generationId, memberId, groupAssignment }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/syncGroup/v2/response.js
var require_response61 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/syncGroup/v2/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response60();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/syncGroup/v3/request.js
var require_request62 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/syncGroup/v3/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { SyncGroup: apiKey } = require_apiKeys();
    module2.exports = ({
      groupId,
      generationId,
      memberId,
      groupInstanceId = null,
      groupAssignment
    }) => ({
      apiKey,
      apiVersion: 3,
      apiName: "SyncGroup",
      encode: async () => {
        return new Encoder().writeString(groupId).writeInt32(generationId).writeString(memberId).writeString(groupInstanceId).writeArray(groupAssignment.map(encodeGroupAssignment));
      }
    });
    var encodeGroupAssignment = ({ memberId, memberAssignment }) => {
      return new Encoder().writeString(memberId).writeBytes(memberAssignment);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/syncGroup/v3/response.js
var require_response62 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/syncGroup/v3/response.js"(exports, module2) {
    var { decode, parse } = require_response61();
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/syncGroup/index.js
var require_syncGroup = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/syncGroup/index.js"(exports, module2) {
    var versions = {
      0: ({ groupId, generationId, memberId, groupAssignment }) => {
        const request = require_request59();
        const response = require_response59();
        return {
          request: request({ groupId, generationId, memberId, groupAssignment }),
          response
        };
      },
      1: ({ groupId, generationId, memberId, groupAssignment }) => {
        const request = require_request60();
        const response = require_response60();
        return {
          request: request({ groupId, generationId, memberId, groupAssignment }),
          response
        };
      },
      2: ({ groupId, generationId, memberId, groupAssignment }) => {
        const request = require_request61();
        const response = require_response61();
        return {
          request: request({ groupId, generationId, memberId, groupAssignment }),
          response
        };
      },
      3: ({ groupId, generationId, memberId, groupInstanceId, groupAssignment }) => {
        const request = require_request62();
        const response = require_response62();
        return {
          request: request({ groupId, generationId, memberId, groupInstanceId, groupAssignment }),
          response
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeGroups/v0/request.js
var require_request63 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeGroups/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DescribeGroups: apiKey } = require_apiKeys();
    module2.exports = ({ groupIds }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "DescribeGroups",
      encode: async () => {
        return new Encoder().writeArray(groupIds);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/describeGroups/v0/response.js
var require_response63 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeGroups/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decoderMember = (decoder) => ({
      memberId: decoder.readString(),
      clientId: decoder.readString(),
      clientHost: decoder.readString(),
      memberMetadata: decoder.readBytes(),
      memberAssignment: decoder.readBytes()
    });
    var decodeGroup = (decoder) => ({
      errorCode: decoder.readInt16(),
      groupId: decoder.readString(),
      state: decoder.readString(),
      protocolType: decoder.readString(),
      protocol: decoder.readString(),
      members: decoder.readArray(decoderMember)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const groups = decoder.readArray(decodeGroup);
      return {
        groups
      };
    };
    var parse = async (data) => {
      const groupsWithError = data.groups.filter(({ errorCode }) => failure(errorCode));
      if (groupsWithError.length > 0) {
        throw createErrorFromCode(groupsWithError[0].errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeGroups/v1/request.js
var require_request64 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeGroups/v1/request.js"(exports, module2) {
    var requestV0 = require_request63();
    module2.exports = ({ groupIds }) => Object.assign(requestV0({ groupIds }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/describeGroups/v1/response.js
var require_response64 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeGroups/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response63();
    var decoderMember = (decoder) => ({
      memberId: decoder.readString(),
      clientId: decoder.readString(),
      clientHost: decoder.readString(),
      memberMetadata: decoder.readBytes(),
      memberAssignment: decoder.readBytes()
    });
    var decodeGroup = (decoder) => ({
      errorCode: decoder.readInt16(),
      groupId: decoder.readString(),
      state: decoder.readString(),
      protocolType: decoder.readString(),
      protocol: decoder.readString(),
      members: decoder.readArray(decoderMember)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const groups = decoder.readArray(decodeGroup);
      return {
        throttleTime,
        groups
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeGroups/v2/request.js
var require_request65 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeGroups/v2/request.js"(exports, module2) {
    var requestV1 = require_request64();
    module2.exports = ({ groupIds }) => Object.assign(requestV1({ groupIds }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/describeGroups/v2/response.js
var require_response65 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeGroups/v2/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response64();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeGroups/index.js
var require_describeGroups = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeGroups/index.js"(exports, module2) {
    var versions = {
      0: ({ groupIds }) => {
        const request = require_request63();
        const response = require_response63();
        return { request: request({ groupIds }), response };
      },
      1: ({ groupIds }) => {
        const request = require_request64();
        const response = require_response64();
        return { request: request({ groupIds }), response };
      },
      2: ({ groupIds }) => {
        const request = require_request65();
        const response = require_response65();
        return { request: request({ groupIds }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listGroups/v0/request.js
var require_request66 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listGroups/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { ListGroups: apiKey } = require_apiKeys();
    module2.exports = () => ({
      apiKey,
      apiVersion: 0,
      apiName: "ListGroups",
      encode: async () => {
        return new Encoder();
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/listGroups/v0/response.js
var require_response66 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listGroups/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decodeGroup = (decoder) => ({
      groupId: decoder.readString(),
      protocolType: decoder.readString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      const groups = decoder.readArray(decodeGroup);
      return {
        errorCode,
        groups
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decodeGroup,
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listGroups/v1/request.js
var require_request67 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listGroups/v1/request.js"(exports, module2) {
    var requestV0 = require_request66();
    module2.exports = () => Object.assign(requestV0(), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/listGroups/v1/response.js
var require_response67 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listGroups/v1/response.js"(exports, module2) {
    var responseV0 = require_response66();
    var Decoder = require_decoder();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      const groups = decoder.readArray(responseV0.decodeGroup);
      return {
        throttleTime,
        errorCode,
        groups
      };
    };
    module2.exports = {
      decode,
      parse: responseV0.parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listGroups/v2/request.js
var require_request68 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listGroups/v2/request.js"(exports, module2) {
    var requestV1 = require_request67();
    module2.exports = () => Object.assign(requestV1(), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/listGroups/v2/response.js
var require_response68 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listGroups/v2/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response67();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/listGroups/index.js
var require_listGroups = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/listGroups/index.js"(exports, module2) {
    var versions = {
      0: () => {
        const request = require_request66();
        const response = require_response66();
        return { request: request(), response };
      },
      1: () => {
        const request = require_request67();
        const response = require_response67();
        return { request: request(), response };
      },
      2: () => {
        const request = require_request68();
        const response = require_response68();
        return { request: request(), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/saslHandshake/v0/request.js
var require_request69 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslHandshake/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { SaslHandshake: apiKey } = require_apiKeys();
    module2.exports = ({ mechanism }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "SaslHandshake",
      encode: async () => new Encoder().writeString(mechanism)
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/saslHandshake/v0/response.js
var require_response69 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslHandshake/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        errorCode,
        enabledMechanisms: decoder.readArray((decoder2) => decoder2.readString())
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/saslHandshake/v1/request.js
var require_request70 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslHandshake/v1/request.js"(exports, module2) {
    var requestV0 = require_request69();
    module2.exports = ({ mechanism }) => __spreadProps(__spreadValues({}, requestV0({ mechanism })), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/saslHandshake/v1/response.js
var require_response70 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslHandshake/v1/response.js"(exports, module2) {
    var { decode: decodeV0, parse: parseV0 } = require_response69();
    module2.exports = {
      decode: decodeV0,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/saslHandshake/index.js
var require_saslHandshake = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslHandshake/index.js"(exports, module2) {
    var versions = {
      0: ({ mechanism }) => {
        const request = require_request69();
        const response = require_response69();
        return { request: request({ mechanism }), response };
      },
      1: ({ mechanism }) => {
        const request = require_request70();
        const response = require_response70();
        return { request: request({ mechanism }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/apiVersions/v0/request.js
var require_request71 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/apiVersions/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { ApiVersions: apiKey } = require_apiKeys();
    module2.exports = () => ({
      apiKey,
      apiVersion: 0,
      apiName: "ApiVersions",
      encode: async () => new Encoder()
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/apiVersions/v0/response.js
var require_response71 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/apiVersions/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var apiVersion = (decoder) => ({
      apiKey: decoder.readInt16(),
      minVersion: decoder.readInt16(),
      maxVersion: decoder.readInt16()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        errorCode,
        apiVersions: decoder.readArray(apiVersion)
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/apiVersions/v1/request.js
var require_request72 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/apiVersions/v1/request.js"(exports, module2) {
    var requestV0 = require_request71();
    module2.exports = () => __spreadProps(__spreadValues({}, requestV0()), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/apiVersions/v1/response.js
var require_response72 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/apiVersions/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failIfVersionNotSupported } = require_error();
    var { parse: parseV0 } = require_response71();
    var apiVersion = (decoder) => ({
      apiKey: decoder.readInt16(),
      minVersion: decoder.readInt16(),
      maxVersion: decoder.readInt16()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      const apiVersions = decoder.readArray(apiVersion);
      const throttleTime = decoder.canReadInt32() ? decoder.readInt32() : 0;
      return {
        errorCode,
        apiVersions,
        throttleTime
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/apiVersions/v2/request.js
var require_request73 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/apiVersions/v2/request.js"(exports, module2) {
    var requestV0 = require_request71();
    module2.exports = () => __spreadProps(__spreadValues({}, requestV0()), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/apiVersions/v2/response.js
var require_response73 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/apiVersions/v2/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response72();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/apiVersions/index.js
var require_apiVersions = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/apiVersions/index.js"(exports, module2) {
    var logResponseError = false;
    var versions = {
      0: () => {
        const request = require_request71();
        const response = require_response71();
        return { request: request(), response, logResponseError: true };
      },
      1: () => {
        const request = require_request72();
        const response = require_response72();
        return { request: request(), response, logResponseError };
      },
      2: () => {
        const request = require_request73();
        const response = require_response73();
        return { request: request(), response, logResponseError };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createTopics/v0/request.js
var require_request74 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createTopics/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { CreateTopics: apiKey } = require_apiKeys();
    module2.exports = ({ topics, timeout = 5e3 }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "CreateTopics",
      encode: async () => {
        return new Encoder().writeArray(topics.map(encodeTopics)).writeInt32(timeout);
      }
    });
    var encodeTopics = ({
      topic,
      numPartitions = -1,
      replicationFactor = -1,
      replicaAssignment = [],
      configEntries = []
    }) => {
      return new Encoder().writeString(topic).writeInt32(numPartitions).writeInt16(replicationFactor).writeArray(replicaAssignment.map(encodeReplicaAssignment)).writeArray(configEntries.map(encodeConfigEntries));
    };
    var encodeReplicaAssignment = ({ partition, replicas }) => {
      return new Encoder().writeInt32(partition).writeArray(replicas);
    };
    var encodeConfigEntries = ({ name, value }) => {
      return new Encoder().writeString(name).writeString(value);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createTopics/v0/response.js
var require_response74 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createTopics/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var { KafkaJSAggregateError, KafkaJSCreateTopicError } = require_errors();
    var topicNameComparator = (a, b) => a.topic.localeCompare(b.topic);
    var topicErrors = (decoder) => ({
      topic: decoder.readString(),
      errorCode: decoder.readInt16()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator)
      };
    };
    var parse = async (data) => {
      const topicsWithError = data.topicErrors.filter(({ errorCode }) => failure(errorCode));
      if (topicsWithError.length > 0) {
        throw new KafkaJSAggregateError("Topic creation errors", topicsWithError.map((error) => new KafkaJSCreateTopicError(createErrorFromCode(error.errorCode), error.topic)));
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createTopics/v1/request.js
var require_request75 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createTopics/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { CreateTopics: apiKey } = require_apiKeys();
    module2.exports = ({ topics, validateOnly = false, timeout = 5e3 }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "CreateTopics",
      encode: async () => {
        return new Encoder().writeArray(topics.map(encodeTopics)).writeInt32(timeout).writeBoolean(validateOnly);
      }
    });
    var encodeTopics = ({
      topic,
      numPartitions = -1,
      replicationFactor = -1,
      replicaAssignment = [],
      configEntries = []
    }) => {
      return new Encoder().writeString(topic).writeInt32(numPartitions).writeInt16(replicationFactor).writeArray(replicaAssignment.map(encodeReplicaAssignment)).writeArray(configEntries.map(encodeConfigEntries));
    };
    var encodeReplicaAssignment = ({ partition, replicas }) => {
      return new Encoder().writeInt32(partition).writeArray(replicas);
    };
    var encodeConfigEntries = ({ name, value }) => {
      return new Encoder().writeString(name).writeString(value);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createTopics/v1/response.js
var require_response75 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createTopics/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response74();
    var topicNameComparator = (a, b) => a.topic.localeCompare(b.topic);
    var topicErrors = (decoder) => ({
      topic: decoder.readString(),
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator)
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createTopics/v2/request.js
var require_request76 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createTopics/v2/request.js"(exports, module2) {
    var requestV1 = require_request75();
    module2.exports = ({ topics, validateOnly, timeout }) => Object.assign(requestV1({ topics, validateOnly, timeout }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/createTopics/v2/response.js
var require_response76 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createTopics/v2/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV1 } = require_response75();
    var topicNameComparator = (a, b) => a.topic.localeCompare(b.topic);
    var topicErrors = (decoder) => ({
      topic: decoder.readString(),
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        throttleTime: decoder.readInt32(),
        topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator)
      };
    };
    module2.exports = {
      decode,
      parse: parseV1
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createTopics/v3/request.js
var require_request77 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createTopics/v3/request.js"(exports, module2) {
    var requestV2 = require_request76();
    module2.exports = ({ topics, validateOnly, timeout }) => Object.assign(requestV2({ topics, validateOnly, timeout }), { apiVersion: 3 });
  }
});

// node_modules/kafkajs/src/protocol/requests/createTopics/v3/response.js
var require_response77 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createTopics/v3/response.js"(exports, module2) {
    var { parse, decode: decodeV2 } = require_response76();
    var decode = async (rawData) => {
      const decoded = await decodeV2(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createTopics/index.js
var require_createTopics = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createTopics/index.js"(exports, module2) {
    var versions = {
      0: ({ topics, timeout }) => {
        const request = require_request74();
        const response = require_response74();
        return { request: request({ topics, timeout }), response };
      },
      1: ({ topics, validateOnly, timeout }) => {
        const request = require_request75();
        const response = require_response75();
        return { request: request({ topics, validateOnly, timeout }), response };
      },
      2: ({ topics, validateOnly, timeout }) => {
        const request = require_request76();
        const response = require_response76();
        return { request: request({ topics, validateOnly, timeout }), response };
      },
      3: ({ topics, validateOnly, timeout }) => {
        const request = require_request77();
        const response = require_response77();
        return { request: request({ topics, validateOnly, timeout }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteTopics/v0/request.js
var require_request78 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteTopics/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DeleteTopics: apiKey } = require_apiKeys();
    module2.exports = ({ topics, timeout = 5e3 }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "DeleteTopics",
      encode: async () => {
        return new Encoder().writeArray(topics).writeInt32(timeout);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteTopics/v0/response.js
var require_response78 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteTopics/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var topicNameComparator = (a, b) => a.topic.localeCompare(b.topic);
    var topicErrors = (decoder) => ({
      topic: decoder.readString(),
      errorCode: decoder.readInt16()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator)
      };
    };
    var parse = async (data) => {
      const topicsWithError = data.topicErrors.filter(({ errorCode }) => failure(errorCode));
      if (topicsWithError.length > 0) {
        throw createErrorFromCode(topicsWithError[0].errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteTopics/v1/request.js
var require_request79 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteTopics/v1/request.js"(exports, module2) {
    var requestV0 = require_request78();
    module2.exports = ({ topics, timeout }) => Object.assign(requestV0({ topics, timeout }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteTopics/v1/response.js
var require_response79 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteTopics/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response78();
    var topicNameComparator = (a, b) => a.topic.localeCompare(b.topic);
    var topicErrors = (decoder) => ({
      topic: decoder.readString(),
      errorCode: decoder.readInt16()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      return {
        throttleTime: 0,
        clientSideThrottleTime: throttleTime,
        topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator)
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteTopics/index.js
var require_deleteTopics = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteTopics/index.js"(exports, module2) {
    var versions = {
      0: ({ topics, timeout }) => {
        const request = require_request78();
        const response = require_response78();
        return { request: request({ topics, timeout }), response };
      },
      1: ({ topics, timeout }) => {
        const request = require_request79();
        const response = require_response79();
        return { request: request({ topics, timeout }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteRecords/v0/request.js
var require_request80 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteRecords/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DeleteRecords: apiKey } = require_apiKeys();
    module2.exports = ({ topics, timeout = 5e3 }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "DeleteRecords",
      encode: async () => {
        return new Encoder().writeArray(topics.map(({ topic, partitions }) => {
          return new Encoder().writeString(topic).writeArray(partitions.map(({ partition, offset }) => {
            return new Encoder().writeInt32(partition).writeInt64(offset);
          }));
        })).writeInt32(timeout);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteRecords/v0/response.js
var require_response80 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteRecords/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { KafkaJSDeleteTopicRecordsError } = require_errors();
    var { failure, createErrorFromCode } = require_error();
    var topicNameComparator = (a, b) => a.topic.localeCompare(b.topic);
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      return {
        throttleTime: decoder.readInt32(),
        topics: decoder.readArray((decoder2) => ({
          topic: decoder2.readString(),
          partitions: decoder2.readArray((decoder3) => ({
            partition: decoder3.readInt32(),
            lowWatermark: decoder3.readInt64(),
            errorCode: decoder3.readInt16()
          }))
        })).sort(topicNameComparator)
      };
    };
    var parse = (requestTopics) => async (data) => {
      const topicsWithErrors = data.topics.map(({ partitions }) => ({
        partitionsWithErrors: partitions.filter(({ errorCode }) => failure(errorCode))
      })).filter(({ partitionsWithErrors }) => partitionsWithErrors.length);
      if (topicsWithErrors.length > 0) {
        const [{ topic }] = data.topics;
        const [{ partitions: requestPartitions }] = requestTopics;
        const [{ partitionsWithErrors }] = topicsWithErrors;
        throw new KafkaJSDeleteTopicRecordsError({
          topic,
          partitions: partitionsWithErrors.map(({ partition, errorCode }) => ({
            partition,
            error: createErrorFromCode(errorCode),
            offset: requestPartitions.find((p) => p.partition === partition).offset
          }))
        });
      }
      return data;
    };
    module2.exports = ({ topics }) => ({
      decode,
      parse: parse(topics)
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteRecords/v1/request.js
var require_request81 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteRecords/v1/request.js"(exports, module2) {
    var requestV0 = require_request80();
    module2.exports = ({ topics, timeout }) => Object.assign(requestV0({ topics, timeout }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteRecords/v1/response.js
var require_response81 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteRecords/v1/response.js"(exports, module2) {
    var responseV0 = require_response80();
    module2.exports = ({ topics }) => {
      const { parse, decode: decodeV0 } = responseV0({ topics });
      const decode = async (rawData) => {
        const decoded = await decodeV0(rawData);
        return __spreadProps(__spreadValues({}, decoded), {
          throttleTime: 0,
          clientSideThrottleTime: decoded.throttleTime
        });
      };
      return {
        decode,
        parse
      };
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteRecords/index.js
var require_deleteRecords = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteRecords/index.js"(exports, module2) {
    var versions = {
      0: ({ topics, timeout }) => {
        const request = require_request80();
        const response = require_response80();
        return { request: request({ topics, timeout }), response: response({ topics }) };
      },
      1: ({ topics, timeout }) => {
        const request = require_request81();
        const response = require_response81();
        return { request: request({ topics, timeout }), response: response({ topics }) };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/initProducerId/v0/request.js
var require_request82 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/initProducerId/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { InitProducerId: apiKey } = require_apiKeys();
    module2.exports = ({ transactionalId, transactionTimeout }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "InitProducerId",
      encode: async () => {
        return new Encoder().writeString(transactionalId).writeInt32(transactionTimeout);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/initProducerId/v0/response.js
var require_response82 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/initProducerId/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        throttleTime,
        errorCode,
        producerId: decoder.readInt64().toString(),
        producerEpoch: decoder.readInt16()
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/initProducerId/v1/request.js
var require_request83 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/initProducerId/v1/request.js"(exports, module2) {
    var requestV0 = require_request82();
    module2.exports = ({ transactionalId, transactionTimeout }) => Object.assign(requestV0({ transactionalId, transactionTimeout }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/initProducerId/v1/response.js
var require_response83 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/initProducerId/v1/response.js"(exports, module2) {
    var { parse, decode: decodeV0 } = require_response82();
    var decode = async (rawData) => {
      const decoded = await decodeV0(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/initProducerId/index.js
var require_initProducerId = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/initProducerId/index.js"(exports, module2) {
    var versions = {
      0: ({ transactionalId, transactionTimeout = 5e3 }) => {
        const request = require_request82();
        const response = require_response82();
        return { request: request({ transactionalId, transactionTimeout }), response };
      },
      1: ({ transactionalId, transactionTimeout = 5e3 }) => {
        const request = require_request83();
        const response = require_response83();
        return { request: request({ transactionalId, transactionTimeout }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/v0/request.js
var require_request84 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { AddPartitionsToTxn: apiKey } = require_apiKeys();
    module2.exports = ({ transactionalId, producerId, producerEpoch, topics }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "AddPartitionsToTxn",
      encode: async () => {
        return new Encoder().writeString(transactionalId).writeInt64(producerId).writeInt16(producerEpoch).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = (partition) => {
      return new Encoder().writeInt32(partition);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/v0/response.js
var require_response84 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errors = await decoder.readArrayAsync(decodeError);
      return {
        throttleTime,
        errors
      };
    };
    var decodeError = async (decoder) => ({
      topic: decoder.readString(),
      partitionErrors: await decoder.readArrayAsync(decodePartitionError)
    });
    var decodePartitionError = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16()
    });
    var parse = async (data) => {
      const topicsWithErrors = data.errors.map(({ partitionErrors }) => ({
        partitionsWithErrors: partitionErrors.filter(({ errorCode }) => failure(errorCode))
      })).filter(({ partitionsWithErrors }) => partitionsWithErrors.length);
      if (topicsWithErrors.length > 0) {
        throw createErrorFromCode(topicsWithErrors[0].partitionsWithErrors[0].errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/v1/request.js
var require_request85 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/v1/request.js"(exports, module2) {
    var requestV0 = require_request84();
    module2.exports = ({ transactionalId, producerId, producerEpoch, topics }) => Object.assign(requestV0({
      transactionalId,
      producerId,
      producerEpoch,
      topics
    }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/v1/response.js
var require_response85 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/v1/response.js"(exports, module2) {
    var { parse, decode: decodeV0 } = require_response84();
    var decode = async (rawData) => {
      const decoded = await decodeV0(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/index.js
var require_addPartitionsToTxn = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addPartitionsToTxn/index.js"(exports, module2) {
    var versions = {
      0: ({ transactionalId, producerId, producerEpoch, topics }) => {
        const request = require_request84();
        const response = require_response84();
        return { request: request({ transactionalId, producerId, producerEpoch, topics }), response };
      },
      1: ({ transactionalId, producerId, producerEpoch, topics }) => {
        const request = require_request85();
        const response = require_response85();
        return { request: request({ transactionalId, producerId, producerEpoch, topics }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/v0/request.js
var require_request86 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { AddOffsetsToTxn: apiKey } = require_apiKeys();
    module2.exports = ({ transactionalId, producerId, producerEpoch, groupId }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "AddOffsetsToTxn",
      encode: async () => {
        return new Encoder().writeString(transactionalId).writeInt64(producerId).writeInt16(producerEpoch).writeString(groupId);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/v0/response.js
var require_response86 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        throttleTime,
        errorCode
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/v1/request.js
var require_request87 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/v1/request.js"(exports, module2) {
    var requestV0 = require_request86();
    module2.exports = ({ transactionalId, producerId, producerEpoch, groupId }) => Object.assign(requestV0({
      transactionalId,
      producerId,
      producerEpoch,
      groupId
    }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/v1/response.js
var require_response87 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/v1/response.js"(exports, module2) {
    var { parse, decode: decodeV0 } = require_response86();
    var decode = async (rawData) => {
      const decoded = await decodeV0(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/index.js
var require_addOffsetsToTxn = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/addOffsetsToTxn/index.js"(exports, module2) {
    var versions = {
      0: ({ transactionalId, producerId, producerEpoch, groupId }) => {
        const request = require_request86();
        const response = require_response86();
        return { request: request({ transactionalId, producerId, producerEpoch, groupId }), response };
      },
      1: ({ transactionalId, producerId, producerEpoch, groupId }) => {
        const request = require_request87();
        const response = require_response87();
        return { request: request({ transactionalId, producerId, producerEpoch, groupId }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/endTxn/v0/request.js
var require_request88 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/endTxn/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { EndTxn: apiKey } = require_apiKeys();
    module2.exports = ({ transactionalId, producerId, producerEpoch, transactionResult }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "EndTxn",
      encode: async () => {
        return new Encoder().writeString(transactionalId).writeInt64(producerId).writeInt16(producerEpoch).writeBoolean(transactionResult);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/endTxn/v0/response.js
var require_response88 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/endTxn/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode, failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      return {
        throttleTime,
        errorCode
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/endTxn/v1/request.js
var require_request89 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/endTxn/v1/request.js"(exports, module2) {
    var requestV0 = require_request88();
    module2.exports = ({ transactionalId, producerId, producerEpoch, transactionResult }) => Object.assign(requestV0({ transactionalId, producerId, producerEpoch, transactionResult }), {
      apiVersion: 1
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/endTxn/v1/response.js
var require_response89 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/endTxn/v1/response.js"(exports, module2) {
    var { parse, decode: decodeV0 } = require_response88();
    var decode = async (rawData) => {
      const decoded = await decodeV0(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/endTxn/index.js
var require_endTxn = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/endTxn/index.js"(exports, module2) {
    var versions = {
      0: ({ transactionalId, producerId, producerEpoch, transactionResult }) => {
        const request = require_request88();
        const response = require_response88();
        return {
          request: request({ transactionalId, producerId, producerEpoch, transactionResult }),
          response
        };
      },
      1: ({ transactionalId, producerId, producerEpoch, transactionResult }) => {
        const request = require_request89();
        const response = require_response89();
        return {
          request: request({ transactionalId, producerId, producerEpoch, transactionResult }),
          response
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/v0/request.js
var require_request90 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { TxnOffsetCommit: apiKey } = require_apiKeys();
    module2.exports = ({ transactionalId, groupId, producerId, producerEpoch, topics }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "TxnOffsetCommit",
      encode: async () => {
        return new Encoder().writeString(transactionalId).writeString(groupId).writeInt64(producerId).writeInt16(producerEpoch).writeArray(topics.map(encodeTopic));
      }
    });
    var encodeTopic = ({ topic, partitions }) => {
      return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition));
    };
    var encodePartition = ({ partition, offset, metadata }) => {
      return new Encoder().writeInt32(partition).writeInt64(offset).writeString(metadata);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/v0/response.js
var require_response90 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const topics = await decoder.readArrayAsync(decodeTopic);
      return {
        throttleTime,
        topics
      };
    };
    var decodeTopic = async (decoder) => ({
      topic: decoder.readString(),
      partitions: await decoder.readArrayAsync(decodePartition)
    });
    var decodePartition = (decoder) => ({
      partition: decoder.readInt32(),
      errorCode: decoder.readInt16()
    });
    var parse = async (data) => {
      const topicsWithErrors = data.topics.map(({ partitions }) => ({
        partitionsWithErrors: partitions.filter(({ errorCode }) => failure(errorCode))
      })).filter(({ partitionsWithErrors }) => partitionsWithErrors.length);
      if (topicsWithErrors.length > 0) {
        throw createErrorFromCode(topicsWithErrors[0].partitionsWithErrors[0].errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/v1/request.js
var require_request91 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/v1/request.js"(exports, module2) {
    var requestV0 = require_request90();
    module2.exports = ({ transactionalId, groupId, producerId, producerEpoch, topics }) => Object.assign(requestV0({ transactionalId, groupId, producerId, producerEpoch, topics }), {
      apiVersion: 1
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/v1/response.js
var require_response91 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/v1/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response90();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/index.js
var require_txnOffsetCommit = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/txnOffsetCommit/index.js"(exports, module2) {
    var versions = {
      0: ({ transactionalId, groupId, producerId, producerEpoch, topics }) => {
        const request = require_request90();
        const response = require_response90();
        return {
          request: request({ transactionalId, groupId, producerId, producerEpoch, topics }),
          response
        };
      },
      1: ({ transactionalId, groupId, producerId, producerEpoch, topics }) => {
        const request = require_request91();
        const response = require_response91();
        return {
          request: request({ transactionalId, groupId, producerId, producerEpoch, topics }),
          response
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeAcls/v0/request.js
var require_request92 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeAcls/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DescribeAcls: apiKey } = require_apiKeys();
    module2.exports = ({ resourceType, resourceName, principal, host, operation, permissionType }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "DescribeAcls",
      encode: async () => {
        return new Encoder().writeInt8(resourceType).writeString(resourceName).writeString(principal).writeString(host).writeInt8(operation).writeInt8(permissionType);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/describeAcls/v0/response.js
var require_response92 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeAcls/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decodeAcls = (decoder) => ({
      principal: decoder.readString(),
      host: decoder.readString(),
      operation: decoder.readInt8(),
      permissionType: decoder.readInt8()
    });
    var decodeResources = (decoder) => ({
      resourceType: decoder.readInt8(),
      resourceName: decoder.readString(),
      acls: decoder.readArray(decodeAcls)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      const errorMessage = decoder.readString();
      const resources = decoder.readArray(decodeResources);
      return {
        throttleTime,
        errorCode,
        errorMessage,
        resources
      };
    };
    var parse = async (data) => {
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeAcls/v1/request.js
var require_request93 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeAcls/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DescribeAcls: apiKey } = require_apiKeys();
    module2.exports = ({
      resourceType,
      resourceName,
      resourcePatternType,
      principal,
      host,
      operation,
      permissionType
    }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "DescribeAcls",
      encode: async () => {
        return new Encoder().writeInt8(resourceType).writeString(resourceName).writeInt8(resourcePatternType).writeString(principal).writeString(host).writeInt8(operation).writeInt8(permissionType);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/describeAcls/v1/response.js
var require_response93 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeAcls/v1/response.js"(exports, module2) {
    var { parse } = require_response92();
    var Decoder = require_decoder();
    var decodeAcls = (decoder) => ({
      principal: decoder.readString(),
      host: decoder.readString(),
      operation: decoder.readInt8(),
      permissionType: decoder.readInt8()
    });
    var decodeResources = (decoder) => ({
      resourceType: decoder.readInt8(),
      resourceName: decoder.readString(),
      resourcePatternType: decoder.readInt8(),
      acls: decoder.readArray(decodeAcls)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const errorCode = decoder.readInt16();
      const errorMessage = decoder.readString();
      const resources = decoder.readArray(decodeResources);
      return {
        throttleTime: 0,
        clientSideThrottleTime: throttleTime,
        errorCode,
        errorMessage,
        resources
      };
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeAcls/index.js
var require_describeAcls = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeAcls/index.js"(exports, module2) {
    var versions = {
      0: ({ resourceType, resourceName, principal, host, operation, permissionType }) => {
        const request = require_request92();
        const response = require_response92();
        return {
          request: request({ resourceType, resourceName, principal, host, operation, permissionType }),
          response
        };
      },
      1: ({
        resourceType,
        resourceName,
        resourcePatternType,
        principal,
        host,
        operation,
        permissionType
      }) => {
        const request = require_request93();
        const response = require_response93();
        return {
          request: request({
            resourceType,
            resourceName,
            resourcePatternType,
            principal,
            host,
            operation,
            permissionType
          }),
          response
        };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createAcls/v0/request.js
var require_request94 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createAcls/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { CreateAcls: apiKey } = require_apiKeys();
    var encodeCreations = ({
      resourceType,
      resourceName,
      principal,
      host,
      operation,
      permissionType
    }) => {
      return new Encoder().writeInt8(resourceType).writeString(resourceName).writeString(principal).writeString(host).writeInt8(operation).writeInt8(permissionType);
    };
    module2.exports = ({ creations }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "CreateAcls",
      encode: async () => {
        return new Encoder().writeArray(creations.map(encodeCreations));
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/createAcls/v0/response.js
var require_response94 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createAcls/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decodeCreationResponse = (decoder) => ({
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const creationResponses = decoder.readArray(decodeCreationResponse);
      return {
        throttleTime,
        creationResponses
      };
    };
    var parse = async (data) => {
      const creationResponsesWithError = data.creationResponses.filter(({ errorCode }) => failure(errorCode));
      if (creationResponsesWithError.length > 0) {
        throw createErrorFromCode(creationResponsesWithError[0].errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createAcls/v1/request.js
var require_request95 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createAcls/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { CreateAcls: apiKey } = require_apiKeys();
    var encodeCreations = ({
      resourceType,
      resourceName,
      resourcePatternType,
      principal,
      host,
      operation,
      permissionType
    }) => {
      return new Encoder().writeInt8(resourceType).writeString(resourceName).writeInt8(resourcePatternType).writeString(principal).writeString(host).writeInt8(operation).writeInt8(permissionType);
    };
    module2.exports = ({ creations }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "CreateAcls",
      encode: async () => {
        return new Encoder().writeArray(creations.map(encodeCreations));
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/createAcls/v1/response.js
var require_response95 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createAcls/v1/response.js"(exports, module2) {
    var { parse, decode: decodeV0 } = require_response94();
    var decode = async (rawData) => {
      const decoded = await decodeV0(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createAcls/index.js
var require_createAcls = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createAcls/index.js"(exports, module2) {
    var versions = {
      0: ({ creations }) => {
        const request = require_request94();
        const response = require_response94();
        return { request: request({ creations }), response };
      },
      1: ({ creations }) => {
        const request = require_request95();
        const response = require_response95();
        return { request: request({ creations }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteAcls/v0/request.js
var require_request96 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteAcls/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DeleteAcls: apiKey } = require_apiKeys();
    var encodeFilters = ({
      resourceType,
      resourceName,
      principal,
      host,
      operation,
      permissionType
    }) => {
      return new Encoder().writeInt8(resourceType).writeString(resourceName).writeString(principal).writeString(host).writeInt8(operation).writeInt8(permissionType);
    };
    module2.exports = ({ filters }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "DeleteAcls",
      encode: async () => {
        return new Encoder().writeArray(filters.map(encodeFilters));
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteAcls/v0/response.js
var require_response96 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteAcls/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decodeMatchingAcls = (decoder) => ({
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString(),
      resourceType: decoder.readInt8(),
      resourceName: decoder.readString(),
      principal: decoder.readString(),
      host: decoder.readString(),
      operation: decoder.readInt8(),
      permissionType: decoder.readInt8()
    });
    var decodeFilterResponse = (decoder) => ({
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString(),
      matchingAcls: decoder.readArray(decodeMatchingAcls)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const filterResponses = decoder.readArray(decodeFilterResponse);
      return {
        throttleTime,
        filterResponses
      };
    };
    var parse = async (data) => {
      const filterResponsesWithError = data.filterResponses.filter(({ errorCode }) => failure(errorCode));
      if (filterResponsesWithError.length > 0) {
        throw createErrorFromCode(filterResponsesWithError[0].errorCode);
      }
      for (const filterResponse of data.filterResponses) {
        const matchingAcls = filterResponse.matchingAcls;
        const matchingAclsWithError = matchingAcls.filter(({ errorCode }) => failure(errorCode));
        if (matchingAclsWithError.length > 0) {
          throw createErrorFromCode(matchingAclsWithError[0].errorCode);
        }
      }
      return data;
    };
    module2.exports = {
      decodeMatchingAcls,
      decodeFilterResponse,
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteAcls/v1/request.js
var require_request97 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteAcls/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DeleteAcls: apiKey } = require_apiKeys();
    var encodeFilters = ({
      resourceType,
      resourceName,
      resourcePatternType,
      principal,
      host,
      operation,
      permissionType
    }) => {
      return new Encoder().writeInt8(resourceType).writeString(resourceName).writeInt8(resourcePatternType).writeString(principal).writeString(host).writeInt8(operation).writeInt8(permissionType);
    };
    module2.exports = ({ filters }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "DeleteAcls",
      encode: async () => {
        return new Encoder().writeArray(filters.map(encodeFilters));
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteAcls/v1/response.js
var require_response97 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteAcls/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response96();
    var decodeMatchingAcls = (decoder) => ({
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString(),
      resourceType: decoder.readInt8(),
      resourceName: decoder.readString(),
      resourcePatternType: decoder.readInt8(),
      principal: decoder.readString(),
      host: decoder.readString(),
      operation: decoder.readInt8(),
      permissionType: decoder.readInt8()
    });
    var decodeFilterResponse = (decoder) => ({
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString(),
      matchingAcls: decoder.readArray(decodeMatchingAcls)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const filterResponses = decoder.readArray(decodeFilterResponse);
      return {
        throttleTime: 0,
        clientSideThrottleTime: throttleTime,
        filterResponses
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteAcls/index.js
var require_deleteAcls = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteAcls/index.js"(exports, module2) {
    var versions = {
      0: ({ filters }) => {
        const request = require_request96();
        const response = require_response96();
        return { request: request({ filters }), response };
      },
      1: ({ filters }) => {
        const request = require_request97();
        const response = require_response97();
        return { request: request({ filters }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeConfigs/v0/request.js
var require_request98 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeConfigs/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DescribeConfigs: apiKey } = require_apiKeys();
    module2.exports = ({ resources }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "DescribeConfigs",
      encode: async () => {
        return new Encoder().writeArray(resources.map(encodeResource));
      }
    });
    var encodeResource = ({ type, name, configNames = [] }) => {
      return new Encoder().writeInt8(type).writeString(name).writeNullableArray(configNames);
    };
  }
});

// node_modules/kafkajs/src/protocol/configSource.js
var require_configSource = __commonJS({
  "node_modules/kafkajs/src/protocol/configSource.js"(exports, module2) {
    module2.exports = {
      UNKNOWN: 0,
      TOPIC_CONFIG: 1,
      DYNAMIC_BROKER_CONFIG: 2,
      DYNAMIC_DEFAULT_BROKER_CONFIG: 3,
      STATIC_BROKER_CONFIG: 4,
      DEFAULT_CONFIG: 5,
      DYNAMIC_BROKER_LOGGER_CONFIG: 6
    };
  }
});

// node_modules/kafkajs/src/protocol/configResourceTypes.js
var require_configResourceTypes = __commonJS({
  "node_modules/kafkajs/src/protocol/configResourceTypes.js"(exports, module2) {
    module2.exports = {
      UNKNOWN: 0,
      TOPIC: 2,
      BROKER: 4,
      BROKER_LOGGER: 8
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeConfigs/v0/response.js
var require_response98 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeConfigs/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var ConfigSource = require_configSource();
    var ConfigResourceTypes = require_configResourceTypes();
    var decodeConfigEntries = (decoder, resourceType) => {
      const configName = decoder.readString();
      const configValue = decoder.readString();
      const readOnly = decoder.readBoolean();
      const isDefault = decoder.readBoolean();
      const isSensitive = decoder.readBoolean();
      let configSource;
      if (isDefault) {
        configSource = ConfigSource.DEFAULT_CONFIG;
      } else {
        switch (resourceType) {
          case ConfigResourceTypes.BROKER:
            configSource = ConfigSource.STATIC_BROKER_CONFIG;
            break;
          case ConfigResourceTypes.TOPIC:
            configSource = ConfigSource.TOPIC_CONFIG;
            break;
          default:
            configSource = ConfigSource.UNKNOWN;
        }
      }
      return {
        configName,
        configValue,
        readOnly,
        isDefault,
        configSource,
        isSensitive
      };
    };
    var decodeResources = (decoder) => {
      const errorCode = decoder.readInt16();
      const errorMessage = decoder.readString();
      const resourceType = decoder.readInt8();
      const resourceName = decoder.readString();
      const configEntries = decoder.readArray((decoder2) => decodeConfigEntries(decoder2, resourceType));
      return {
        errorCode,
        errorMessage,
        resourceType,
        resourceName,
        configEntries
      };
    };
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const resources = decoder.readArray(decodeResources);
      return {
        throttleTime,
        resources
      };
    };
    var parse = async (data) => {
      const resourcesWithError = data.resources.filter(({ errorCode }) => failure(errorCode));
      if (resourcesWithError.length > 0) {
        throw createErrorFromCode(resourcesWithError[0].errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeConfigs/v1/request.js
var require_request99 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeConfigs/v1/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DescribeConfigs: apiKey } = require_apiKeys();
    module2.exports = ({ resources, includeSynonyms = false }) => ({
      apiKey,
      apiVersion: 1,
      apiName: "DescribeConfigs",
      encode: async () => {
        return new Encoder().writeArray(resources.map(encodeResource)).writeBoolean(includeSynonyms);
      }
    });
    var encodeResource = ({ type, name, configNames = [] }) => {
      return new Encoder().writeInt8(type).writeString(name).writeNullableArray(configNames);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeConfigs/v1/response.js
var require_response99 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeConfigs/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { parse: parseV0 } = require_response98();
    var { DEFAULT_CONFIG } = require_configSource();
    var decodeSynonyms = (decoder) => ({
      configName: decoder.readString(),
      configValue: decoder.readString(),
      configSource: decoder.readInt8()
    });
    var decodeConfigEntries = (decoder) => {
      const configName = decoder.readString();
      const configValue = decoder.readString();
      const readOnly = decoder.readBoolean();
      const configSource = decoder.readInt8();
      const isSensitive = decoder.readBoolean();
      const configSynonyms = decoder.readArray(decodeSynonyms);
      return {
        configName,
        configValue,
        readOnly,
        isDefault: configSource === DEFAULT_CONFIG,
        configSource,
        isSensitive,
        configSynonyms
      };
    };
    var decodeResources = (decoder) => ({
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString(),
      resourceType: decoder.readInt8(),
      resourceName: decoder.readString(),
      configEntries: decoder.readArray(decodeConfigEntries)
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const resources = decoder.readArray(decodeResources);
      return {
        throttleTime,
        resources
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeConfigs/v2/request.js
var require_request100 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeConfigs/v2/request.js"(exports, module2) {
    var requestV1 = require_request99();
    module2.exports = ({ resources, includeSynonyms }) => Object.assign(requestV1({ resources, includeSynonyms }), { apiVersion: 2 });
  }
});

// node_modules/kafkajs/src/protocol/requests/describeConfigs/v2/response.js
var require_response100 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeConfigs/v2/response.js"(exports, module2) {
    var { parse, decode: decodeV1 } = require_response99();
    var decode = async (rawData) => {
      const decoded = await decodeV1(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/describeConfigs/index.js
var require_describeConfigs = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/describeConfigs/index.js"(exports, module2) {
    var versions = {
      0: ({ resources }) => {
        const request = require_request98();
        const response = require_response98();
        return { request: request({ resources }), response };
      },
      1: ({ resources, includeSynonyms }) => {
        const request = require_request99();
        const response = require_response99();
        return { request: request({ resources, includeSynonyms }), response };
      },
      2: ({ resources, includeSynonyms }) => {
        const request = require_request100();
        const response = require_response100();
        return { request: request({ resources, includeSynonyms }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/alterConfigs/v0/request.js
var require_request101 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/alterConfigs/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { AlterConfigs: apiKey } = require_apiKeys();
    module2.exports = ({ resources, validateOnly = false }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "AlterConfigs",
      encode: async () => {
        return new Encoder().writeArray(resources.map(encodeResource)).writeBoolean(validateOnly);
      }
    });
    var encodeResource = ({ type, name, configEntries }) => {
      return new Encoder().writeInt8(type).writeString(name).writeArray(configEntries.map(encodeConfigEntries));
    };
    var encodeConfigEntries = ({ name, value }) => {
      return new Encoder().writeString(name).writeString(value);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/alterConfigs/v0/response.js
var require_response101 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/alterConfigs/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decodeResources = (decoder) => ({
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString(),
      resourceType: decoder.readInt8(),
      resourceName: decoder.readString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      const resources = decoder.readArray(decodeResources);
      return {
        throttleTime,
        resources
      };
    };
    var parse = async (data) => {
      const resourcesWithError = data.resources.filter(({ errorCode }) => failure(errorCode));
      if (resourcesWithError.length > 0) {
        throw createErrorFromCode(resourcesWithError[0].errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/alterConfigs/v1/request.js
var require_request102 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/alterConfigs/v1/request.js"(exports, module2) {
    var requestV0 = require_request101();
    module2.exports = ({ resources, validateOnly }) => Object.assign(requestV0({
      resources,
      validateOnly
    }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/alterConfigs/v1/response.js
var require_response102 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/alterConfigs/v1/response.js"(exports, module2) {
    var { parse, decode: decodeV0 } = require_response101();
    var decode = async (rawData) => {
      const decoded = await decodeV0(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/alterConfigs/index.js
var require_alterConfigs = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/alterConfigs/index.js"(exports, module2) {
    var versions = {
      0: ({ resources, validateOnly }) => {
        const request = require_request101();
        const response = require_response101();
        return { request: request({ resources, validateOnly }), response };
      },
      1: ({ resources, validateOnly }) => {
        const request = require_request102();
        const response = require_response102();
        return { request: request({ resources, validateOnly }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/saslAuthenticate/v0/request.js
var require_request103 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslAuthenticate/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { SaslAuthenticate: apiKey } = require_apiKeys();
    module2.exports = ({ authBytes }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "SaslAuthenticate",
      encode: async () => {
        return new Encoder().writeBuffer(authBytes);
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/requests/saslAuthenticate/v0/response.js
var require_response103 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslAuthenticate/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var Encoder = require_encoder();
    var {
      failure,
      createErrorFromCode,
      failIfVersionNotSupported,
      errorCodes
    } = require_error();
    var { KafkaJSProtocolError } = require_errors();
    var SASL_AUTHENTICATION_FAILED = 58;
    var protocolAuthError = errorCodes.find((e) => e.code === SASL_AUTHENTICATION_FAILED);
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      const errorMessage = decoder.readString();
      const authBytesEncoder = new Encoder().writeBytes(decoder.readBytes());
      const authBytes = authBytesEncoder.buffer;
      return {
        errorCode,
        errorMessage,
        authBytes
      };
    };
    var parse = async (data) => {
      if (data.errorCode === SASL_AUTHENTICATION_FAILED && data.errorMessage) {
        throw new KafkaJSProtocolError(__spreadProps(__spreadValues({}, protocolAuthError), {
          message: data.errorMessage
        }));
      }
      if (failure(data.errorCode)) {
        throw createErrorFromCode(data.errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/saslAuthenticate/v1/request.js
var require_request104 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslAuthenticate/v1/request.js"(exports, module2) {
    var requestV0 = require_request103();
    module2.exports = ({ authBytes }) => Object.assign(requestV0({ authBytes }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/saslAuthenticate/v1/response.js
var require_response104 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslAuthenticate/v1/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var Encoder = require_encoder();
    var { parse: parseV0 } = require_response103();
    var { failIfVersionNotSupported } = require_error();
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const errorCode = decoder.readInt16();
      failIfVersionNotSupported(errorCode);
      const errorMessage = decoder.readString();
      const authBytesEncoder = new Encoder().writeBytes(decoder.readBytes());
      const authBytes = authBytesEncoder.buffer;
      const sessionLifetimeMs = decoder.readInt64().toString();
      return {
        errorCode,
        errorMessage,
        authBytes,
        sessionLifetimeMs
      };
    };
    module2.exports = {
      decode,
      parse: parseV0
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/saslAuthenticate/index.js
var require_saslAuthenticate = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/saslAuthenticate/index.js"(exports, module2) {
    var versions = {
      0: ({ authBytes }) => {
        const request = require_request103();
        const response = require_response103();
        return { request: request({ authBytes }), response };
      },
      1: ({ authBytes }) => {
        const request = require_request104();
        const response = require_response104();
        return { request: request({ authBytes }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createPartitions/v0/request.js
var require_request105 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createPartitions/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { CreatePartitions: apiKey } = require_apiKeys();
    module2.exports = ({ topicPartitions, validateOnly = false, timeout = 5e3 }) => ({
      apiKey,
      apiVersion: 0,
      apiName: "CreatePartitions",
      encode: async () => {
        return new Encoder().writeArray(topicPartitions.map(encodeTopicPartitions)).writeInt32(timeout).writeBoolean(validateOnly);
      }
    });
    var encodeTopicPartitions = ({ topic, count, assignments = [] }) => {
      return new Encoder().writeString(topic).writeInt32(count).writeNullableArray(assignments.map(encodeAssignments));
    };
    var encodeAssignments = (brokerIds) => {
      return new Encoder().writeNullableArray(brokerIds);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createPartitions/v0/response.js
var require_response105 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createPartitions/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var topicNameComparator = (a, b) => a.topic.localeCompare(b.topic);
    var topicErrors = (decoder) => ({
      topic: decoder.readString(),
      errorCode: decoder.readInt16(),
      errorMessage: decoder.readString()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTime = decoder.readInt32();
      return {
        throttleTime,
        topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator)
      };
    };
    var parse = async (data) => {
      const topicsWithError = data.topicErrors.filter(({ errorCode }) => failure(errorCode));
      if (topicsWithError.length > 0) {
        throw createErrorFromCode(topicsWithError[0].errorCode);
      }
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createPartitions/v1/request.js
var require_request106 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createPartitions/v1/request.js"(exports, module2) {
    var requestV0 = require_request105();
    module2.exports = ({ topicPartitions, validateOnly, timeout }) => Object.assign(requestV0({ topicPartitions, validateOnly, timeout }), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/createPartitions/v1/response.js
var require_response106 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createPartitions/v1/response.js"(exports, module2) {
    var { parse, decode: decodeV0 } = require_response105();
    var decode = async (rawData) => {
      const decoded = await decodeV0(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/createPartitions/index.js
var require_createPartitions = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/createPartitions/index.js"(exports, module2) {
    var versions = {
      0: ({ topicPartitions, timeout, validateOnly }) => {
        const request = require_request105();
        const response = require_response105();
        return { request: request({ topicPartitions, timeout, validateOnly }), response };
      },
      1: ({ topicPartitions, validateOnly, timeout }) => {
        const request = require_request106();
        const response = require_response106();
        return { request: request({ topicPartitions, validateOnly, timeout }), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteGroups/v0/request.js
var require_request107 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteGroups/v0/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var { DeleteGroups: apiKey } = require_apiKeys();
    module2.exports = (groupIds) => ({
      apiKey,
      apiVersion: 0,
      apiName: "DeleteGroups",
      encode: async () => {
        return new Encoder().writeArray(groupIds.map(encodeGroups));
      }
    });
    var encodeGroups = (group) => {
      return new Encoder().writeString(group);
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteGroups/v0/response.js
var require_response107 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteGroups/v0/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var { failure, createErrorFromCode } = require_error();
    var decodeGroup = (decoder) => ({
      groupId: decoder.readString(),
      errorCode: decoder.readInt16()
    });
    var decode = async (rawData) => {
      const decoder = new Decoder(rawData);
      const throttleTimeMs = decoder.readInt32();
      const results = decoder.readArray(decodeGroup);
      for (const result of results) {
        if (failure(result.errorCode)) {
          result.error = createErrorFromCode(result.errorCode);
        }
      }
      return {
        throttleTimeMs,
        results
      };
    };
    var parse = async (data) => {
      return data;
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteGroups/v1/request.js
var require_request108 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteGroups/v1/request.js"(exports, module2) {
    var requestV0 = require_request107();
    module2.exports = (groupIds) => Object.assign(requestV0(groupIds), { apiVersion: 1 });
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteGroups/v1/response.js
var require_response108 = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteGroups/v1/response.js"(exports, module2) {
    var { parse, decode: decodeV0 } = require_response107();
    var decode = async (rawData) => {
      const decoded = await decodeV0(rawData);
      return __spreadProps(__spreadValues({}, decoded), {
        throttleTime: 0,
        clientSideThrottleTime: decoded.throttleTime
      });
    };
    module2.exports = {
      decode,
      parse
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/deleteGroups/index.js
var require_deleteGroups = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/deleteGroups/index.js"(exports, module2) {
    var versions = {
      0: (groupIds) => {
        const request = require_request107();
        const response = require_response107();
        return { request: request(groupIds), response };
      },
      1: (groupIds) => {
        const request = require_request108();
        const response = require_response108();
        return { request: request(groupIds), response };
      }
    };
    module2.exports = {
      versions: Object.keys(versions),
      protocol: ({ version }) => versions[version]
    };
  }
});

// node_modules/kafkajs/src/protocol/requests/index.js
var require_requests = __commonJS({
  "node_modules/kafkajs/src/protocol/requests/index.js"(exports, module2) {
    var apiKeys = require_apiKeys();
    var { KafkaJSServerDoesNotSupportApiKey, KafkaJSNotImplemented } = require_errors();
    var noImplementedRequestDefinitions = {
      versions: [],
      protocol: () => {
        throw new KafkaJSNotImplemented();
      }
    };
    var requests = {
      Produce: require_produce(),
      Fetch: require_fetch(),
      ListOffsets: require_listOffsets(),
      Metadata: require_metadata(),
      LeaderAndIsr: noImplementedRequestDefinitions,
      StopReplica: noImplementedRequestDefinitions,
      UpdateMetadata: noImplementedRequestDefinitions,
      ControlledShutdown: noImplementedRequestDefinitions,
      OffsetCommit: require_offsetCommit(),
      OffsetFetch: require_offsetFetch(),
      GroupCoordinator: require_findCoordinator(),
      JoinGroup: require_joinGroup(),
      Heartbeat: require_heartbeat(),
      LeaveGroup: require_leaveGroup(),
      SyncGroup: require_syncGroup(),
      DescribeGroups: require_describeGroups(),
      ListGroups: require_listGroups(),
      SaslHandshake: require_saslHandshake(),
      ApiVersions: require_apiVersions(),
      CreateTopics: require_createTopics(),
      DeleteTopics: require_deleteTopics(),
      DeleteRecords: require_deleteRecords(),
      InitProducerId: require_initProducerId(),
      OffsetForLeaderEpoch: noImplementedRequestDefinitions,
      AddPartitionsToTxn: require_addPartitionsToTxn(),
      AddOffsetsToTxn: require_addOffsetsToTxn(),
      EndTxn: require_endTxn(),
      WriteTxnMarkers: noImplementedRequestDefinitions,
      TxnOffsetCommit: require_txnOffsetCommit(),
      DescribeAcls: require_describeAcls(),
      CreateAcls: require_createAcls(),
      DeleteAcls: require_deleteAcls(),
      DescribeConfigs: require_describeConfigs(),
      AlterConfigs: require_alterConfigs(),
      AlterReplicaLogDirs: noImplementedRequestDefinitions,
      DescribeLogDirs: noImplementedRequestDefinitions,
      SaslAuthenticate: require_saslAuthenticate(),
      CreatePartitions: require_createPartitions(),
      CreateDelegationToken: noImplementedRequestDefinitions,
      RenewDelegationToken: noImplementedRequestDefinitions,
      ExpireDelegationToken: noImplementedRequestDefinitions,
      DescribeDelegationToken: noImplementedRequestDefinitions,
      DeleteGroups: require_deleteGroups()
    };
    var names = Object.keys(apiKeys);
    var keys = Object.values(apiKeys);
    var findApiName = (apiKey) => names[keys.indexOf(apiKey)];
    var lookup = (versions) => (apiKey, definition) => {
      const version = versions[apiKey];
      const availableVersions = definition.versions.map(Number);
      const bestImplementedVersion = Math.max(...availableVersions);
      if (!version || version.maxVersion == null) {
        throw new KafkaJSServerDoesNotSupportApiKey(`The Kafka server does not support the requested API version`, { apiKey, apiName: findApiName(apiKey) });
      }
      const bestSupportedVersion = Math.min(bestImplementedVersion, version.maxVersion);
      return definition.protocol({ version: bestSupportedVersion });
    };
    module2.exports = {
      requests,
      lookup
    };
  }
});

// node_modules/kafkajs/src/utils/shuffle.js
var require_shuffle = __commonJS({
  "node_modules/kafkajs/src/utils/shuffle.js"(exports, module2) {
    module2.exports = (array) => {
      if (!Array.isArray(array)) {
        throw new TypeError("'array' is not an array");
      }
      if (array.length < 2) {
        return array;
      }
      const copy = array.slice();
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
      return copy;
    };
  }
});

// node_modules/kafkajs/src/broker/index.js
var require_broker = __commonJS({
  "node_modules/kafkajs/src/broker/index.js"(exports, module2) {
    var Lock = require_lock();
    var { Types: Compression } = require_compression();
    var { requests, lookup } = require_requests();
    var { KafkaJSNonRetriableError } = require_errors();
    var apiKeys = require_apiKeys();
    var shuffle = require_shuffle();
    var PRIVATE = {
      SEND_REQUEST: Symbol("private:Broker:sendRequest")
    };
    var notInitializedLookup = () => {
      throw new Error("Broker not connected");
    };
    module2.exports = class Broker {
      constructor({
        connectionPool,
        logger,
        nodeId = null,
        versions = null,
        authenticationTimeout = 1e4,
        allowAutoTopicCreation = true
      }) {
        this.connectionPool = connectionPool;
        this.nodeId = nodeId;
        this.rootLogger = logger;
        this.logger = logger.namespace("Broker");
        this.versions = versions;
        this.authenticationTimeout = authenticationTimeout;
        this.allowAutoTopicCreation = allowAutoTopicCreation;
        const lockTimeout = 2 * this.connectionPool.connectionTimeout + this.authenticationTimeout;
        this.brokerAddress = `${this.connectionPool.host}:${this.connectionPool.port}`;
        this.lock = new Lock({
          timeout: lockTimeout,
          description: `connect to broker ${this.brokerAddress}`
        });
        this.lookupRequest = notInitializedLookup;
      }
      isConnected() {
        return this.connectionPool.sasl ? this.connectionPool.isConnected() && this.connectionPool.isAuthenticated() : this.connectionPool.isConnected();
      }
      async connect() {
        try {
          await this.lock.acquire();
          if (this.isConnected()) {
            return;
          }
          const connection = await this.connectionPool.getConnection();
          if (!this.versions) {
            this.versions = await this.apiVersions();
          }
          this.connectionPool.setVersions(this.versions);
          this.lookupRequest = lookup(this.versions);
          if (connection.getSupportAuthenticationProtocol() === null) {
            let supportAuthenticationProtocol = false;
            try {
              this.lookupRequest(apiKeys.SaslAuthenticate, requests.SaslAuthenticate);
              supportAuthenticationProtocol = true;
            } catch (_) {
              supportAuthenticationProtocol = false;
            }
            this.connectionPool.setSupportAuthenticationProtocol(supportAuthenticationProtocol);
            this.logger.debug(`Verified support for SaslAuthenticate`, {
              broker: this.brokerAddress,
              supportAuthenticationProtocol
            });
          }
          await connection.authenticate();
        } finally {
          await this.lock.release();
        }
      }
      async disconnect() {
        await this.connectionPool.destroy();
      }
      async apiVersions() {
        let response;
        const availableVersions = requests.ApiVersions.versions.map(Number).sort().reverse();
        for (const candidateVersion of availableVersions) {
          try {
            const apiVersions = requests.ApiVersions.protocol({ version: candidateVersion });
            response = await this[PRIVATE.SEND_REQUEST](__spreadProps(__spreadValues({}, apiVersions()), {
              requestTimeout: this.connectionPool.connectionTimeout
            }));
            break;
          } catch (e) {
            if (e.type !== "UNSUPPORTED_VERSION") {
              throw e;
            }
          }
        }
        if (!response) {
          throw new KafkaJSNonRetriableError("API Versions not supported");
        }
        return response.apiVersions.reduce((obj, version) => Object.assign(obj, {
          [version.apiKey]: {
            minVersion: version.minVersion,
            maxVersion: version.maxVersion
          }
        }), {});
      }
      async metadata(topics = []) {
        const metadata = this.lookupRequest(apiKeys.Metadata, requests.Metadata);
        const shuffledTopics = shuffle(topics);
        return await this[PRIVATE.SEND_REQUEST](metadata({ topics: shuffledTopics, allowAutoTopicCreation: this.allowAutoTopicCreation }));
      }
      async produce({
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
        acks = -1,
        timeout = 3e4,
        compression = Compression.None
      }) {
        const produce = this.lookupRequest(apiKeys.Produce, requests.Produce);
        return await this[PRIVATE.SEND_REQUEST](produce({
          acks,
          timeout,
          compression,
          topicData,
          transactionalId,
          producerId,
          producerEpoch
        }));
      }
      async fetch({
        replicaId,
        isolationLevel,
        maxWaitTime = 5e3,
        minBytes = 1,
        maxBytes = 10485760,
        topics,
        rackId = ""
      }) {
        const fetch = this.lookupRequest(apiKeys.Fetch, requests.Fetch);
        const flattenedTopicPartitions = topics.reduce((topicPartitions, { topic, partitions }) => {
          partitions.forEach((partition) => {
            topicPartitions.push({ topic, partition });
          });
          return topicPartitions;
        }, []);
        const shuffledTopicPartitions = shuffle(flattenedTopicPartitions);
        const consolidatedTopicPartitions = shuffledTopicPartitions.reduce((topicPartitions, { topic, partition }) => {
          const last = topicPartitions[topicPartitions.length - 1];
          if (last != null && last.topic === topic) {
            topicPartitions[topicPartitions.length - 1].partitions.push(partition);
          } else {
            topicPartitions.push({ topic, partitions: [partition] });
          }
          return topicPartitions;
        }, []);
        return await this[PRIVATE.SEND_REQUEST](fetch({
          replicaId,
          isolationLevel,
          maxWaitTime,
          minBytes,
          maxBytes,
          topics: consolidatedTopicPartitions,
          rackId
        }));
      }
      async heartbeat({ groupId, groupGenerationId, memberId }) {
        const heartbeat = this.lookupRequest(apiKeys.Heartbeat, requests.Heartbeat);
        return await this[PRIVATE.SEND_REQUEST](heartbeat({ groupId, groupGenerationId, memberId }));
      }
      async findGroupCoordinator({ groupId, coordinatorType }) {
        const findCoordinator = this.lookupRequest(apiKeys.GroupCoordinator, requests.GroupCoordinator);
        return await this[PRIVATE.SEND_REQUEST](findCoordinator({ groupId, coordinatorType }));
      }
      async joinGroup({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId = "",
        protocolType = "consumer",
        groupProtocols
      }) {
        const joinGroup = this.lookupRequest(apiKeys.JoinGroup, requests.JoinGroup);
        const makeRequest = (assignedMemberId = memberId) => this[PRIVATE.SEND_REQUEST](joinGroup({
          groupId,
          sessionTimeout,
          rebalanceTimeout,
          memberId: assignedMemberId,
          protocolType,
          groupProtocols
        }));
        try {
          return await makeRequest();
        } catch (error) {
          if (error.name === "KafkaJSMemberIdRequired") {
            return makeRequest(error.memberId);
          }
          throw error;
        }
      }
      async leaveGroup({ groupId, memberId }) {
        const leaveGroup = this.lookupRequest(apiKeys.LeaveGroup, requests.LeaveGroup);
        return await this[PRIVATE.SEND_REQUEST](leaveGroup({ groupId, memberId }));
      }
      async syncGroup({ groupId, generationId, memberId, groupAssignment }) {
        const syncGroup = this.lookupRequest(apiKeys.SyncGroup, requests.SyncGroup);
        return await this[PRIVATE.SEND_REQUEST](syncGroup({
          groupId,
          generationId,
          memberId,
          groupAssignment
        }));
      }
      async listOffsets({ replicaId, isolationLevel, topics }) {
        const listOffsets = this.lookupRequest(apiKeys.ListOffsets, requests.ListOffsets);
        const result = await this[PRIVATE.SEND_REQUEST](listOffsets({ replicaId, isolationLevel, topics }));
        for (const response of result.responses) {
          response.partitions = response.partitions.map((_a) => {
            var _b = _a, { offsets } = _b, partitionData = __objRest(_b, ["offsets"]);
            return offsets ? __spreadProps(__spreadValues({}, partitionData), { offset: offsets.pop() }) : partitionData;
          });
        }
        return result;
      }
      async offsetCommit({ groupId, groupGenerationId, memberId, retentionTime, topics }) {
        const offsetCommit = this.lookupRequest(apiKeys.OffsetCommit, requests.OffsetCommit);
        return await this[PRIVATE.SEND_REQUEST](offsetCommit({
          groupId,
          groupGenerationId,
          memberId,
          retentionTime,
          topics
        }));
      }
      async offsetFetch({ groupId, topics }) {
        const offsetFetch = this.lookupRequest(apiKeys.OffsetFetch, requests.OffsetFetch);
        return await this[PRIVATE.SEND_REQUEST](offsetFetch({ groupId, topics }));
      }
      async describeGroups({ groupIds }) {
        const describeGroups = this.lookupRequest(apiKeys.DescribeGroups, requests.DescribeGroups);
        return await this[PRIVATE.SEND_REQUEST](describeGroups({ groupIds }));
      }
      async createTopics({ topics, validateOnly = false, timeout = 5e3 }) {
        const createTopics = this.lookupRequest(apiKeys.CreateTopics, requests.CreateTopics);
        return await this[PRIVATE.SEND_REQUEST](createTopics({ topics, validateOnly, timeout }));
      }
      async createPartitions({ topicPartitions, validateOnly = false, timeout = 5e3 }) {
        const createPartitions = this.lookupRequest(apiKeys.CreatePartitions, requests.CreatePartitions);
        return await this[PRIVATE.SEND_REQUEST](createPartitions({ topicPartitions, validateOnly, timeout }));
      }
      async deleteTopics({ topics, timeout = 5e3 }) {
        const deleteTopics = this.lookupRequest(apiKeys.DeleteTopics, requests.DeleteTopics);
        return await this[PRIVATE.SEND_REQUEST](deleteTopics({ topics, timeout }));
      }
      async describeConfigs({ resources, includeSynonyms = false }) {
        const describeConfigs = this.lookupRequest(apiKeys.DescribeConfigs, requests.DescribeConfigs);
        return await this[PRIVATE.SEND_REQUEST](describeConfigs({ resources, includeSynonyms }));
      }
      async alterConfigs({ resources, validateOnly = false }) {
        const alterConfigs = this.lookupRequest(apiKeys.AlterConfigs, requests.AlterConfigs);
        return await this[PRIVATE.SEND_REQUEST](alterConfigs({ resources, validateOnly }));
      }
      async initProducerId({ transactionalId, transactionTimeout }) {
        const initProducerId = this.lookupRequest(apiKeys.InitProducerId, requests.InitProducerId);
        return await this[PRIVATE.SEND_REQUEST](initProducerId({ transactionalId, transactionTimeout }));
      }
      async addPartitionsToTxn({ transactionalId, producerId, producerEpoch, topics }) {
        const addPartitionsToTxn = this.lookupRequest(apiKeys.AddPartitionsToTxn, requests.AddPartitionsToTxn);
        return await this[PRIVATE.SEND_REQUEST](addPartitionsToTxn({ transactionalId, producerId, producerEpoch, topics }));
      }
      async addOffsetsToTxn({ transactionalId, producerId, producerEpoch, groupId }) {
        const addOffsetsToTxn = this.lookupRequest(apiKeys.AddOffsetsToTxn, requests.AddOffsetsToTxn);
        return await this[PRIVATE.SEND_REQUEST](addOffsetsToTxn({ transactionalId, producerId, producerEpoch, groupId }));
      }
      async txnOffsetCommit({ transactionalId, groupId, producerId, producerEpoch, topics }) {
        const txnOffsetCommit = this.lookupRequest(apiKeys.TxnOffsetCommit, requests.TxnOffsetCommit);
        return await this[PRIVATE.SEND_REQUEST](txnOffsetCommit({ transactionalId, groupId, producerId, producerEpoch, topics }));
      }
      async endTxn({ transactionalId, producerId, producerEpoch, transactionResult }) {
        const endTxn = this.lookupRequest(apiKeys.EndTxn, requests.EndTxn);
        return await this[PRIVATE.SEND_REQUEST](endTxn({ transactionalId, producerId, producerEpoch, transactionResult }));
      }
      async listGroups() {
        const listGroups = this.lookupRequest(apiKeys.ListGroups, requests.ListGroups);
        return await this[PRIVATE.SEND_REQUEST](listGroups());
      }
      async deleteGroups(groupIds) {
        const deleteGroups = this.lookupRequest(apiKeys.DeleteGroups, requests.DeleteGroups);
        return await this[PRIVATE.SEND_REQUEST](deleteGroups(groupIds));
      }
      async deleteRecords({ topics }) {
        const deleteRecords = this.lookupRequest(apiKeys.DeleteRecords, requests.DeleteRecords);
        return await this[PRIVATE.SEND_REQUEST](deleteRecords({ topics }));
      }
      async createAcls({ acl }) {
        const createAcls = this.lookupRequest(apiKeys.CreateAcls, requests.CreateAcls);
        return await this[PRIVATE.SEND_REQUEST](createAcls({ creations: acl }));
      }
      async describeAcls({
        resourceType,
        resourceName,
        resourcePatternType,
        principal,
        host,
        operation,
        permissionType
      }) {
        const describeAcls = this.lookupRequest(apiKeys.DescribeAcls, requests.DescribeAcls);
        return await this[PRIVATE.SEND_REQUEST](describeAcls({
          resourceType,
          resourceName,
          resourcePatternType,
          principal,
          host,
          operation,
          permissionType
        }));
      }
      async deleteAcls({ filters }) {
        const deleteAcls = this.lookupRequest(apiKeys.DeleteAcls, requests.DeleteAcls);
        return await this[PRIVATE.SEND_REQUEST](deleteAcls({ filters }));
      }
      async [PRIVATE.SEND_REQUEST](protocolRequest) {
        try {
          return await this.connectionPool.send(protocolRequest);
        } catch (e) {
          if (e.name === "KafkaJSConnectionClosedError") {
            await this.disconnect();
          }
          throw e;
        }
      }
    };
  }
});

// node_modules/kafkajs/src/retry/defaults.test.js
var require_defaults_test = __commonJS({
  "node_modules/kafkajs/src/retry/defaults.test.js"(exports, module2) {
    module2.exports = {
      maxRetryTime: 1e3,
      initialRetryTime: 50,
      factor: 0.02,
      multiplier: 1.5,
      retries: 15
    };
  }
});

// node_modules/kafkajs/src/retry/defaults.js
var require_defaults = __commonJS({
  "node_modules/kafkajs/src/retry/defaults.js"(exports, module2) {
    module2.exports = {
      maxRetryTime: 30 * 1e3,
      initialRetryTime: 300,
      factor: 0.2,
      multiplier: 2,
      retries: 5
    };
  }
});

// node_modules/kafkajs/src/retry/index.js
var require_retry = __commonJS({
  "node_modules/kafkajs/src/retry/index.js"(exports, module2) {
    var { KafkaJSNumberOfRetriesExceeded, KafkaJSNonRetriableError } = require_errors();
    var isTestMode = process.env.NODE_ENV === "test";
    var RETRY_DEFAULT = isTestMode ? require_defaults_test() : require_defaults();
    var random = (min, max) => {
      return Math.random() * (max - min) + min;
    };
    var randomFromRetryTime = (factor, retryTime) => {
      const delta = factor * retryTime;
      return Math.ceil(random(retryTime - delta, retryTime + delta));
    };
    var UNRECOVERABLE_ERRORS = ["RangeError", "ReferenceError", "SyntaxError", "TypeError"];
    var isErrorUnrecoverable = (e) => UNRECOVERABLE_ERRORS.includes(e.name);
    var isErrorRetriable = (error) => (error.retriable || error.retriable !== false) && !isErrorUnrecoverable(error);
    var createRetriable = (configs, resolve, reject, fn) => {
      let aborted = false;
      const { factor, multiplier, maxRetryTime, retries } = configs;
      const bail = (error) => {
        aborted = true;
        reject(error || new Error("Aborted"));
      };
      const calculateExponentialRetryTime = (retryTime) => {
        return Math.min(randomFromRetryTime(factor, retryTime) * multiplier, maxRetryTime);
      };
      const retry = (retryTime, retryCount = 0) => {
        if (aborted)
          return;
        const nextRetryTime = calculateExponentialRetryTime(retryTime);
        const shouldRetry = retryCount < retries;
        const scheduleRetry = () => {
          setTimeout(() => retry(nextRetryTime, retryCount + 1), retryTime);
        };
        fn(bail, retryCount, retryTime).then(resolve).catch((e) => {
          if (isErrorRetriable(e)) {
            if (shouldRetry) {
              scheduleRetry();
            } else {
              reject(new KafkaJSNumberOfRetriesExceeded(e, { retryCount, retryTime, cause: e.cause || e }));
            }
          } else {
            reject(new KafkaJSNonRetriableError(e, { cause: e.cause || e }));
          }
        });
      };
      return retry;
    };
    module2.exports = (opts = {}) => (fn) => {
      return new Promise((resolve, reject) => {
        const configs = Object.assign({}, RETRY_DEFAULT, opts);
        const start = createRetriable(configs, resolve, reject, fn);
        start(randomFromRetryTime(configs.factor, configs.initialRetryTime));
      });
    };
  }
});

// node_modules/kafkajs/src/utils/arrayDiff.js
var require_arrayDiff = __commonJS({
  "node_modules/kafkajs/src/utils/arrayDiff.js"(exports, module2) {
    module2.exports = (a, b) => {
      const result = [];
      const length = a.length;
      let i = 0;
      while (i < length) {
        if (b.indexOf(a[i]) === -1) {
          result.push(a[i]);
        }
        i += 1;
      }
      return result;
    };
  }
});

// node_modules/kafkajs/src/cluster/brokerPool.js
var require_brokerPool = __commonJS({
  "node_modules/kafkajs/src/cluster/brokerPool.js"(exports, module2) {
    var Broker = require_broker();
    var createRetry = require_retry();
    var shuffle = require_shuffle();
    var arrayDiff = require_arrayDiff();
    var { KafkaJSBrokerNotFound, KafkaJSProtocolError } = require_errors();
    var { keys, assign, values } = Object;
    var hasBrokerBeenReplaced = (broker, { host, port, rack }) => broker.connectionPool.host !== host || broker.connectionPool.port !== port || broker.connectionPool.rack !== rack;
    module2.exports = class BrokerPool {
      constructor({
        connectionPoolBuilder,
        logger,
        retry,
        allowAutoTopicCreation,
        authenticationTimeout,
        metadataMaxAge
      }) {
        this.rootLogger = logger;
        this.connectionPoolBuilder = connectionPoolBuilder;
        this.metadataMaxAge = metadataMaxAge || 0;
        this.logger = logger.namespace("BrokerPool");
        this.retrier = createRetry(assign({}, retry));
        this.createBroker = (options) => new Broker(__spreadValues({
          allowAutoTopicCreation,
          authenticationTimeout
        }, options));
        this.brokers = {};
        this.seedBroker = void 0;
        this.metadata = null;
        this.metadataExpireAt = null;
        this.versions = null;
      }
      hasConnectedBrokers() {
        const brokers = values(this.brokers);
        return !!brokers.find((broker) => broker.isConnected()) || (this.seedBroker ? this.seedBroker.isConnected() : false);
      }
      async createSeedBroker() {
        if (this.seedBroker) {
          await this.seedBroker.disconnect();
        }
        const connectionPool = await this.connectionPoolBuilder.build();
        this.seedBroker = this.createBroker({
          connectionPool,
          logger: this.rootLogger
        });
      }
      async connect() {
        if (this.hasConnectedBrokers()) {
          return;
        }
        if (!this.seedBroker) {
          await this.createSeedBroker();
        }
        return this.retrier(async (bail, retryCount, retryTime) => {
          try {
            await this.seedBroker.connect();
            this.versions = this.seedBroker.versions;
          } catch (e) {
            if (e.name === "KafkaJSConnectionError" || e.type === "ILLEGAL_SASL_STATE") {
              await this.createSeedBroker();
              this.logger.error(`Failed to connect to seed broker, trying another broker from the list: ${e.message}`, { retryCount, retryTime });
            } else {
              this.logger.error(e.message, { retryCount, retryTime });
            }
            if (e.retriable)
              throw e;
            bail(e);
          }
        });
      }
      async disconnect() {
        this.seedBroker && await this.seedBroker.disconnect();
        await Promise.all(values(this.brokers).map((broker) => broker.disconnect()));
        this.brokers = {};
        this.metadata = null;
        this.versions = null;
      }
      removeBroker({ host, port }) {
        const removedBroker = values(this.brokers).find((broker) => broker.connectionPool.host === host && broker.connectionPool.port === port);
        if (removedBroker) {
          delete this.brokers[removedBroker.nodeId];
          this.metadataExpireAt = null;
          if (this.seedBroker.nodeId === removedBroker.nodeId) {
            this.seedBroker = shuffle(values(this.brokers))[0];
          }
        }
      }
      async refreshMetadata(topics) {
        const broker = await this.findConnectedBroker();
        const { host: seedHost, port: seedPort } = this.seedBroker.connectionPool;
        return this.retrier(async (bail, retryCount, retryTime) => {
          try {
            this.metadata = await broker.metadata(topics);
            this.metadataExpireAt = Date.now() + this.metadataMaxAge;
            const replacedBrokers = [];
            this.brokers = await this.metadata.brokers.reduce(async (resultPromise, { nodeId, host, port, rack }) => {
              const result = await resultPromise;
              if (result[nodeId]) {
                if (!hasBrokerBeenReplaced(result[nodeId], { host, port, rack })) {
                  return result;
                }
                replacedBrokers.push(result[nodeId]);
              }
              if (host === seedHost && port === seedPort) {
                this.seedBroker.nodeId = nodeId;
                this.seedBroker.connectionPool.rack = rack;
                return assign(result, {
                  [nodeId]: this.seedBroker
                });
              }
              return assign(result, {
                [nodeId]: this.createBroker({
                  logger: this.rootLogger,
                  versions: this.versions,
                  connectionPool: await this.connectionPoolBuilder.build({ host, port, rack }),
                  nodeId
                })
              });
            }, this.brokers);
            const freshBrokerIds = this.metadata.brokers.map(({ nodeId }) => `${nodeId}`).sort();
            const currentBrokerIds = keys(this.brokers).sort();
            const unusedBrokerIds = arrayDiff(currentBrokerIds, freshBrokerIds);
            const brokerDisconnects = unusedBrokerIds.map((nodeId) => {
              const broker2 = this.brokers[nodeId];
              return broker2.disconnect().then(() => {
                delete this.brokers[nodeId];
              });
            });
            const replacedBrokersDisconnects = replacedBrokers.map((broker2) => broker2.disconnect());
            await Promise.all([...brokerDisconnects, ...replacedBrokersDisconnects]);
          } catch (e) {
            if (e.type === "LEADER_NOT_AVAILABLE") {
              throw e;
            }
            bail(e);
          }
        });
      }
      async refreshMetadataIfNecessary(topics) {
        const shouldRefresh = this.metadata == null || this.metadataExpireAt == null || Date.now() > this.metadataExpireAt || !topics.every((topic) => this.metadata.topicMetadata.some((topicMetadata) => topicMetadata.topic === topic));
        if (shouldRefresh) {
          return this.refreshMetadata(topics);
        }
      }
      getNodeIds() {
        return keys(this.brokers);
      }
      async findBroker({ nodeId }) {
        const broker = this.brokers[nodeId];
        if (!broker) {
          throw new KafkaJSBrokerNotFound(`Broker ${nodeId} not found in the cached metadata`);
        }
        await this.connectBroker(broker);
        return broker;
      }
      async withBroker(callback) {
        const brokers = shuffle(keys(this.brokers));
        if (brokers.length === 0) {
          throw new KafkaJSBrokerNotFound("No brokers in the broker pool");
        }
        for (const nodeId of brokers) {
          const broker = await this.findBroker({ nodeId });
          try {
            return await callback({ nodeId, broker });
          } catch (e) {
          }
        }
        return null;
      }
      async findConnectedBroker() {
        const nodeIds = shuffle(keys(this.brokers));
        const connectedBrokerId = nodeIds.find((nodeId) => this.brokers[nodeId].isConnected());
        if (connectedBrokerId) {
          return await this.findBroker({ nodeId: connectedBrokerId });
        }
        for (const nodeId of nodeIds) {
          try {
            return await this.findBroker({ nodeId });
          } catch (e) {
          }
        }
        await this.connect();
        return this.seedBroker;
      }
      async connectBroker(broker) {
        if (broker.isConnected()) {
          return;
        }
        return this.retrier(async (bail, retryCount, retryTime) => {
          try {
            await broker.connect();
          } catch (e) {
            if (e.name === "KafkaJSConnectionError" || e.type === "ILLEGAL_SASL_STATE") {
              await broker.disconnect();
            }
            if (e.name === "KafkaJSConnectionError") {
              return bail(e);
            }
            if (e.type === "ILLEGAL_SASL_STATE") {
              broker.connectionPool = await this.connectionPoolBuilder.build({
                host: broker.connectionPool.host,
                port: broker.connectionPool.port,
                rack: broker.connectionPool.rack
              });
              this.logger.error(`Failed to connect to broker, reconnecting`, { retryCount, retryTime });
              throw new KafkaJSProtocolError(e, { retriable: true });
            }
            if (e.retriable)
              throw e;
            this.logger.error(e, { retryCount, retryTime, stack: e.stack });
            bail(e);
          }
        });
      }
    };
  }
});

// node_modules/kafkajs/src/utils/sharedPromiseTo.js
var require_sharedPromiseTo = __commonJS({
  "node_modules/kafkajs/src/utils/sharedPromiseTo.js"(exports, module2) {
    module2.exports = (asyncFunction) => {
      let promise = null;
      return (...args) => {
        if (promise == null) {
          promise = asyncFunction(...args).finally(() => promise = null);
        }
        return promise;
      };
    };
  }
});

// node_modules/kafkajs/src/network/socket.js
var require_socket = __commonJS({
  "node_modules/kafkajs/src/network/socket.js"(exports, module2) {
    module2.exports = ({
      socketFactory,
      host,
      port,
      ssl,
      onConnect,
      onData,
      onEnd,
      onError,
      onTimeout
    }) => {
      const socket = socketFactory({ host, port, ssl, onConnect });
      socket.on("data", onData);
      socket.on("end", onEnd);
      socket.on("error", onError);
      socket.on("timeout", onTimeout);
      return socket;
    };
  }
});

// node_modules/kafkajs/src/protocol/request.js
var require_request109 = __commonJS({
  "node_modules/kafkajs/src/protocol/request.js"(exports, module2) {
    var Encoder = require_encoder();
    module2.exports = async ({ correlationId, clientId, request: { apiKey, apiVersion, encode } }) => {
      const payload = await encode();
      const requestPayload = new Encoder().writeInt16(apiKey).writeInt16(apiVersion).writeInt32(correlationId).writeString(clientId).writeEncoder(payload);
      return new Encoder().writeInt32(requestPayload.size()).writeEncoder(requestPayload);
    };
  }
});

// node_modules/kafkajs/src/constants.js
var require_constants = __commonJS({
  "node_modules/kafkajs/src/constants.js"(exports, module2) {
    var EARLIEST_OFFSET = -2;
    var LATEST_OFFSET = -1;
    var INT_32_MAX_VALUE = Math.pow(2, 31) - 1;
    module2.exports = {
      EARLIEST_OFFSET,
      LATEST_OFFSET,
      INT_32_MAX_VALUE
    };
  }
});

// node_modules/kafkajs/src/env.js
var require_env = __commonJS({
  "node_modules/kafkajs/src/env.js"(exports, module2) {
    module2.exports = () => ({
      KAFKAJS_DEBUG_PROTOCOL_BUFFERS: process.env.KAFKAJS_DEBUG_PROTOCOL_BUFFERS,
      KAFKAJS_DEBUG_EXTENDED_PROTOCOL_BUFFERS: process.env.KAFKAJS_DEBUG_EXTENDED_PROTOCOL_BUFFERS
    });
  }
});

// node_modules/kafkajs/src/instrumentation/eventType.js
var require_eventType = __commonJS({
  "node_modules/kafkajs/src/instrumentation/eventType.js"(exports, module2) {
    module2.exports = (namespace) => (type) => `${namespace}.${type}`;
  }
});

// node_modules/kafkajs/src/network/instrumentationEvents.js
var require_instrumentationEvents = __commonJS({
  "node_modules/kafkajs/src/network/instrumentationEvents.js"(exports, module2) {
    var InstrumentationEventType = require_eventType();
    var eventType = InstrumentationEventType("network");
    module2.exports = {
      NETWORK_REQUEST: eventType("request"),
      NETWORK_REQUEST_TIMEOUT: eventType("request_timeout"),
      NETWORK_REQUEST_QUEUE_SIZE: eventType("request_queue_size")
    };
  }
});

// node_modules/kafkajs/src/network/requestQueue/socketRequest.js
var require_socketRequest = __commonJS({
  "node_modules/kafkajs/src/network/requestQueue/socketRequest.js"(exports, module2) {
    var { KafkaJSRequestTimeoutError, KafkaJSNonRetriableError } = require_errors();
    var events = require_instrumentationEvents();
    var PRIVATE = {
      STATE: Symbol("private:SocketRequest:state"),
      EMIT_EVENT: Symbol("private:SocketRequest:emitEvent")
    };
    var REQUEST_STATE = {
      PENDING: Symbol("PENDING"),
      SENT: Symbol("SENT"),
      COMPLETED: Symbol("COMPLETED"),
      REJECTED: Symbol("REJECTED")
    };
    module2.exports = class SocketRequest {
      constructor({
        requestTimeout,
        broker,
        clientId,
        entry,
        expectResponse,
        send,
        timeout,
        instrumentationEmitter = null
      }) {
        this.createdAt = Date.now();
        this.requestTimeout = requestTimeout;
        this.broker = broker;
        this.clientId = clientId;
        this.entry = entry;
        this.correlationId = entry.correlationId;
        this.expectResponse = expectResponse;
        this.sendRequest = send;
        this.timeoutHandler = timeout;
        this.sentAt = null;
        this.duration = null;
        this.pendingDuration = null;
        this[PRIVATE.STATE] = REQUEST_STATE.PENDING;
        this[PRIVATE.EMIT_EVENT] = (eventName, payload) => instrumentationEmitter && instrumentationEmitter.emit(eventName, payload);
      }
      send() {
        this.throwIfInvalidState({
          accepted: [REQUEST_STATE.PENDING],
          next: REQUEST_STATE.SENT
        });
        this.sendRequest();
        this.sentAt = Date.now();
        this.pendingDuration = this.sentAt - this.createdAt;
        this[PRIVATE.STATE] = REQUEST_STATE.SENT;
      }
      timeoutRequest() {
        const { apiName, apiKey, apiVersion } = this.entry;
        const requestInfo = `${apiName}(key: ${apiKey}, version: ${apiVersion})`;
        const eventData = {
          broker: this.broker,
          clientId: this.clientId,
          correlationId: this.correlationId,
          createdAt: this.createdAt,
          sentAt: this.sentAt,
          pendingDuration: this.pendingDuration
        };
        this.timeoutHandler();
        this.rejected(new KafkaJSRequestTimeoutError(`Request ${requestInfo} timed out`, eventData));
        this[PRIVATE.EMIT_EVENT](events.NETWORK_REQUEST_TIMEOUT, __spreadProps(__spreadValues({}, eventData), {
          apiName,
          apiKey,
          apiVersion
        }));
      }
      completed({ size, payload }) {
        this.throwIfInvalidState({
          accepted: [REQUEST_STATE.SENT],
          next: REQUEST_STATE.COMPLETED
        });
        const { entry, correlationId, broker, clientId, createdAt, sentAt, pendingDuration } = this;
        this[PRIVATE.STATE] = REQUEST_STATE.COMPLETED;
        this.duration = Date.now() - this.sentAt;
        entry.resolve({ correlationId, entry, size, payload });
        this[PRIVATE.EMIT_EVENT](events.NETWORK_REQUEST, {
          broker,
          clientId,
          correlationId,
          size,
          createdAt,
          sentAt,
          pendingDuration,
          duration: this.duration,
          apiName: entry.apiName,
          apiKey: entry.apiKey,
          apiVersion: entry.apiVersion
        });
      }
      rejected(error) {
        this.throwIfInvalidState({
          accepted: [REQUEST_STATE.PENDING, REQUEST_STATE.SENT],
          next: REQUEST_STATE.REJECTED
        });
        this[PRIVATE.STATE] = REQUEST_STATE.REJECTED;
        this.duration = Date.now() - this.sentAt;
        this.entry.reject(error);
      }
      throwIfInvalidState({ accepted, next }) {
        if (accepted.includes(this[PRIVATE.STATE])) {
          return;
        }
        const current = this[PRIVATE.STATE].toString();
        throw new KafkaJSNonRetriableError(`Invalid state, can't transition from ${current} to ${next.toString()}`);
      }
    };
  }
});

// node_modules/kafkajs/src/network/requestQueue/index.js
var require_requestQueue = __commonJS({
  "node_modules/kafkajs/src/network/requestQueue/index.js"(exports, module2) {
    var { EventEmitter } = require("events");
    var SocketRequest = require_socketRequest();
    var events = require_instrumentationEvents();
    var { KafkaJSInvariantViolation } = require_errors();
    var PRIVATE = {
      EMIT_QUEUE_SIZE_EVENT: Symbol("private:RequestQueue:emitQueueSizeEvent"),
      EMIT_REQUEST_QUEUE_EMPTY: Symbol("private:RequestQueue:emitQueueEmpty")
    };
    var REQUEST_QUEUE_EMPTY = "requestQueueEmpty";
    module2.exports = class RequestQueue extends EventEmitter {
      constructor({
        instrumentationEmitter = null,
        maxInFlightRequests,
        requestTimeout,
        enforceRequestTimeout,
        clientId,
        broker,
        logger,
        isConnected = () => true
      }) {
        super();
        this.instrumentationEmitter = instrumentationEmitter;
        this.maxInFlightRequests = maxInFlightRequests;
        this.requestTimeout = requestTimeout;
        this.enforceRequestTimeout = enforceRequestTimeout;
        this.clientId = clientId;
        this.broker = broker;
        this.logger = logger;
        this.isConnected = isConnected;
        this.inflight = /* @__PURE__ */ new Map();
        this.pending = [];
        this.throttledUntil = -1;
        this.throttleCheckTimeoutId = null;
        this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY] = () => {
          if (this.pending.length === 0 && this.inflight.size === 0) {
            this.emit(REQUEST_QUEUE_EMPTY);
          }
        };
        this[PRIVATE.EMIT_QUEUE_SIZE_EVENT] = () => {
          instrumentationEmitter && instrumentationEmitter.emit(events.NETWORK_REQUEST_QUEUE_SIZE, {
            broker: this.broker,
            clientId: this.clientId,
            queueSize: this.pending.length
          });
          this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY]();
        };
      }
      scheduleRequestTimeoutCheck() {
        if (this.enforceRequestTimeout) {
          this.destroy();
          this.requestTimeoutIntervalId = setInterval(() => {
            this.inflight.forEach((request) => {
              if (Date.now() - request.sentAt > request.requestTimeout) {
                request.timeoutRequest();
              }
            });
            if (!this.isConnected()) {
              this.destroy();
            }
          }, Math.min(this.requestTimeout, 100));
        }
      }
      maybeThrottle(clientSideThrottleTime) {
        if (clientSideThrottleTime) {
          const minimumThrottledUntil = Date.now() + clientSideThrottleTime;
          this.throttledUntil = Math.max(minimumThrottledUntil, this.throttledUntil);
        }
      }
      push(pushedRequest) {
        const { correlationId } = pushedRequest.entry;
        const defaultRequestTimeout = this.requestTimeout;
        const customRequestTimeout = pushedRequest.requestTimeout;
        const requestTimeout = Math.max(defaultRequestTimeout, customRequestTimeout || 0);
        const socketRequest = new SocketRequest({
          entry: pushedRequest.entry,
          expectResponse: pushedRequest.expectResponse,
          broker: this.broker,
          clientId: this.clientId,
          instrumentationEmitter: this.instrumentationEmitter,
          requestTimeout,
          send: () => {
            if (this.inflight.has(correlationId)) {
              throw new KafkaJSInvariantViolation("Correlation id already exists");
            }
            this.inflight.set(correlationId, socketRequest);
            pushedRequest.sendRequest();
          },
          timeout: () => {
            this.inflight.delete(correlationId);
            this.checkPendingRequests();
            this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY]();
          }
        });
        if (this.canSendSocketRequestImmediately()) {
          this.sendSocketRequest(socketRequest);
          return;
        }
        this.pending.push(socketRequest);
        this.scheduleCheckPendingRequests();
        this.logger.debug(`Request enqueued`, {
          clientId: this.clientId,
          broker: this.broker,
          correlationId
        });
        this[PRIVATE.EMIT_QUEUE_SIZE_EVENT]();
      }
      sendSocketRequest(socketRequest) {
        socketRequest.send();
        if (!socketRequest.expectResponse) {
          this.logger.debug(`Request does not expect a response, resolving immediately`, {
            clientId: this.clientId,
            broker: this.broker,
            correlationId: socketRequest.correlationId
          });
          this.inflight.delete(socketRequest.correlationId);
          socketRequest.completed({ size: 0, payload: null });
        }
      }
      fulfillRequest({ correlationId, payload, size }) {
        const socketRequest = this.inflight.get(correlationId);
        this.inflight.delete(correlationId);
        this.checkPendingRequests();
        if (socketRequest) {
          socketRequest.completed({ size, payload });
        } else {
          this.logger.warn(`Response without match`, {
            clientId: this.clientId,
            broker: this.broker,
            correlationId
          });
        }
        this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY]();
      }
      rejectAll(error) {
        const requests = [...this.inflight.values(), ...this.pending];
        for (const socketRequest of requests) {
          socketRequest.rejected(error);
          this.inflight.delete(socketRequest.correlationId);
        }
        this.pending = [];
        this.inflight.clear();
        this[PRIVATE.EMIT_QUEUE_SIZE_EVENT]();
      }
      waitForPendingRequests() {
        return new Promise((resolve) => {
          if (this.pending.length === 0 && this.inflight.size === 0) {
            return resolve();
          }
          this.logger.debug("Waiting for pending requests", {
            clientId: this.clientId,
            broker: this.broker,
            currentInflightRequests: this.inflight.size,
            currentPendingQueueSize: this.pending.length
          });
          this.once(REQUEST_QUEUE_EMPTY, () => resolve());
        });
      }
      destroy() {
        clearInterval(this.requestTimeoutIntervalId);
        clearTimeout(this.throttleCheckTimeoutId);
        this.throttleCheckTimeoutId = null;
      }
      canSendSocketRequestImmediately() {
        const shouldEnqueue = this.maxInFlightRequests != null && this.inflight.size >= this.maxInFlightRequests || this.throttledUntil > Date.now();
        return !shouldEnqueue;
      }
      checkPendingRequests() {
        while (this.pending.length > 0 && this.canSendSocketRequestImmediately()) {
          const pendingRequest = this.pending.shift();
          this.sendSocketRequest(pendingRequest);
          this.logger.debug(`Consumed pending request`, {
            clientId: this.clientId,
            broker: this.broker,
            correlationId: pendingRequest.correlationId,
            pendingDuration: pendingRequest.pendingDuration,
            currentPendingQueueSize: this.pending.length
          });
          this[PRIVATE.EMIT_QUEUE_SIZE_EVENT]();
        }
        this.scheduleCheckPendingRequests();
      }
      scheduleCheckPendingRequests() {
        const timeUntilUnthrottled = this.throttledUntil - Date.now();
        if (timeUntilUnthrottled > 0 && !this.throttleCheckTimeoutId) {
          this.throttleCheckTimeoutId = setTimeout(() => {
            this.throttleCheckTimeoutId = null;
            this.checkPendingRequests();
          }, timeUntilUnthrottled);
        }
      }
    };
  }
});

// node_modules/kafkajs/src/network/connectionStatus.js
var require_connectionStatus = __commonJS({
  "node_modules/kafkajs/src/network/connectionStatus.js"(exports, module2) {
    var CONNECTION_STATUS = {
      CONNECTED: "connected",
      DISCONNECTING: "disconnecting",
      DISCONNECTED: "disconnected"
    };
    var CONNECTED_STATUS = [CONNECTION_STATUS.CONNECTED, CONNECTION_STATUS.DISCONNECTING];
    module2.exports = {
      CONNECTION_STATUS,
      CONNECTED_STATUS
    };
  }
});

// node_modules/kafkajs/src/protocol/sasl/plain/request.js
var require_request110 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/plain/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var US_ASCII_NULL_CHAR = "\0";
    module2.exports = ({ authorizationIdentity = null, username, password }) => ({
      encode: async () => {
        return new Encoder().writeBytes([authorizationIdentity, username, password].join(US_ASCII_NULL_CHAR));
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/sasl/plain/response.js
var require_response109 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/plain/response.js"(exports, module2) {
    module2.exports = {
      decode: async () => true,
      parse: async () => true
    };
  }
});

// node_modules/kafkajs/src/protocol/sasl/plain/index.js
var require_plain = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/plain/index.js"(exports, module2) {
    module2.exports = {
      request: require_request110(),
      response: require_response109()
    };
  }
});

// node_modules/kafkajs/src/broker/saslAuthenticator/plain.js
var require_plain2 = __commonJS({
  "node_modules/kafkajs/src/broker/saslAuthenticator/plain.js"(exports, module2) {
    var plain = require_plain();
    var { KafkaJSSASLAuthenticationError } = require_errors();
    module2.exports = class PlainAuthenticator {
      constructor(connection, logger, saslAuthenticate) {
        this.connection = connection;
        this.logger = logger.namespace("SASLPlainAuthenticator");
        this.saslAuthenticate = saslAuthenticate;
      }
      async authenticate() {
        const { sasl } = this.connection;
        if (sasl.username == null || sasl.password == null) {
          throw new KafkaJSSASLAuthenticationError("SASL Plain: Invalid username or password");
        }
        const request = plain.request(sasl);
        const response = plain.response;
        const { host, port } = this.connection;
        const broker = `${host}:${port}`;
        try {
          this.logger.debug("Authenticate with SASL PLAIN", { broker });
          await this.saslAuthenticate({ request, response });
          this.logger.debug("SASL PLAIN authentication successful", { broker });
        } catch (e) {
          const error = new KafkaJSSASLAuthenticationError(`SASL PLAIN authentication failed: ${e.message}`);
          this.logger.error(error.message, { broker });
          throw error;
        }
      }
    };
  }
});

// node_modules/kafkajs/src/protocol/sasl/scram/firstMessage/request.js
var require_request111 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/scram/firstMessage/request.js"(exports, module2) {
    var Encoder = require_encoder();
    module2.exports = ({ clientFirstMessage }) => ({
      encode: async () => new Encoder().writeBytes(clientFirstMessage)
    });
  }
});

// node_modules/kafkajs/src/protocol/sasl/scram/firstMessage/response.js
var require_response110 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/scram/firstMessage/response.js"(exports, module2) {
    var Decoder = require_decoder();
    var ENTRY_REGEX = /^([rsiev])=(.*)$/;
    module2.exports = {
      decode: async (rawData) => {
        return new Decoder(rawData).readBytes();
      },
      parse: async (data) => {
        const processed = data.toString().split(",").map((str) => {
          const [_, key, value] = str.match(ENTRY_REGEX);
          return [key, value];
        }).reduce((obj, entry) => __spreadProps(__spreadValues({}, obj), { [entry[0]]: entry[1] }), {});
        return __spreadValues({ original: data.toString() }, processed);
      }
    };
  }
});

// node_modules/kafkajs/src/protocol/sasl/scram/finalMessage/request.js
var require_request112 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/scram/finalMessage/request.js"(exports, module2) {
    var Encoder = require_encoder();
    module2.exports = ({ finalMessage }) => ({
      encode: async () => new Encoder().writeBytes(finalMessage)
    });
  }
});

// node_modules/kafkajs/src/protocol/sasl/scram/finalMessage/response.js
var require_response111 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/scram/finalMessage/response.js"(exports, module2) {
    module2.exports = require_response110();
  }
});

// node_modules/kafkajs/src/protocol/sasl/scram/index.js
var require_scram = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/scram/index.js"(exports, module2) {
    module2.exports = {
      firstMessage: {
        request: require_request111(),
        response: require_response110()
      },
      finalMessage: {
        request: require_request112(),
        response: require_response111()
      }
    };
  }
});

// node_modules/kafkajs/src/broker/saslAuthenticator/scram.js
var require_scram2 = __commonJS({
  "node_modules/kafkajs/src/broker/saslAuthenticator/scram.js"(exports, module2) {
    var crypto = require("crypto");
    var scram = require_scram();
    var { KafkaJSSASLAuthenticationError, KafkaJSNonRetriableError } = require_errors();
    var GS2_HEADER = "n,,";
    var EQUAL_SIGN_REGEX = /=/g;
    var COMMA_SIGN_REGEX = /,/g;
    var URLSAFE_BASE64_PLUS_REGEX = /\+/g;
    var URLSAFE_BASE64_SLASH_REGEX = /\//g;
    var URLSAFE_BASE64_TRAILING_EQUAL_REGEX = /=+$/;
    var HMAC_CLIENT_KEY = "Client Key";
    var HMAC_SERVER_KEY = "Server Key";
    var DIGESTS = {
      SHA256: {
        length: 32,
        type: "sha256",
        minIterations: 4096
      },
      SHA512: {
        length: 64,
        type: "sha512",
        minIterations: 4096
      }
    };
    var encode64 = (str) => Buffer.from(str).toString("base64");
    var SCRAM = class {
      static sanitizeString(str) {
        return str.replace(EQUAL_SIGN_REGEX, "=3D").replace(COMMA_SIGN_REGEX, "=2C");
      }
      static nonce() {
        return crypto.randomBytes(16).toString("base64").replace(URLSAFE_BASE64_PLUS_REGEX, "-").replace(URLSAFE_BASE64_SLASH_REGEX, "_").replace(URLSAFE_BASE64_TRAILING_EQUAL_REGEX, "").toString("ascii");
      }
      static hi(password, salt, iterations, digestDefinition) {
        return new Promise((resolve, reject) => {
          crypto.pbkdf2(password, salt, iterations, digestDefinition.length, digestDefinition.type, (err, derivedKey) => err ? reject(err) : resolve(derivedKey));
        });
      }
      static xor(left, right) {
        const bufferA = Buffer.from(left);
        const bufferB = Buffer.from(right);
        const length = Buffer.byteLength(bufferA);
        if (length !== Buffer.byteLength(bufferB)) {
          throw new KafkaJSNonRetriableError("Buffers must be of the same length");
        }
        const result = [];
        for (let i = 0; i < length; i++) {
          result.push(bufferA[i] ^ bufferB[i]);
        }
        return Buffer.from(result);
      }
      constructor(connection, logger, saslAuthenticate, digestDefinition) {
        this.connection = connection;
        this.logger = logger;
        this.saslAuthenticate = saslAuthenticate;
        this.digestDefinition = digestDefinition;
        const digestType = digestDefinition.type.toUpperCase();
        this.PREFIX = `SASL SCRAM ${digestType} authentication`;
        this.currentNonce = SCRAM.nonce();
      }
      async authenticate() {
        const { PREFIX } = this;
        const { host, port, sasl } = this.connection;
        const broker = `${host}:${port}`;
        if (sasl.username == null || sasl.password == null) {
          throw new KafkaJSSASLAuthenticationError(`${this.PREFIX}: Invalid username or password`);
        }
        try {
          this.logger.debug("Exchanging first client message", { broker });
          const clientMessageResponse = await this.sendClientFirstMessage();
          this.logger.debug("Sending final message", { broker });
          const finalResponse = await this.sendClientFinalMessage(clientMessageResponse);
          if (finalResponse.e) {
            throw new Error(finalResponse.e);
          }
          const serverKey = await this.serverKey(clientMessageResponse);
          const serverSignature = this.serverSignature(serverKey, clientMessageResponse);
          if (finalResponse.v !== serverSignature) {
            throw new Error("Invalid server signature in server final message");
          }
          this.logger.debug(`${PREFIX} successful`, { broker });
        } catch (e) {
          const error = new KafkaJSSASLAuthenticationError(`${PREFIX} failed: ${e.message}`);
          this.logger.error(error.message, { broker });
          throw error;
        }
      }
      async sendClientFirstMessage() {
        const clientFirstMessage = `${GS2_HEADER}${this.firstMessageBare()}`;
        const request = scram.firstMessage.request({ clientFirstMessage });
        const response = scram.firstMessage.response;
        return this.saslAuthenticate({
          authExpectResponse: true,
          request,
          response
        });
      }
      async sendClientFinalMessage(clientMessageResponse) {
        const { PREFIX } = this;
        const iterations = parseInt(clientMessageResponse.i, 10);
        const { minIterations } = this.digestDefinition;
        if (!clientMessageResponse.r.startsWith(this.currentNonce)) {
          throw new KafkaJSSASLAuthenticationError(`${PREFIX} failed: Invalid server nonce, it does not start with the client nonce`);
        }
        if (iterations < minIterations) {
          throw new KafkaJSSASLAuthenticationError(`${PREFIX} failed: Requested iterations ${iterations} is less than the minimum ${minIterations}`);
        }
        const finalMessageWithoutProof = this.finalMessageWithoutProof(clientMessageResponse);
        const clientProof = await this.clientProof(clientMessageResponse);
        const finalMessage = `${finalMessageWithoutProof},p=${clientProof}`;
        const request = scram.finalMessage.request({ finalMessage });
        const response = scram.finalMessage.response;
        return this.saslAuthenticate({
          authExpectResponse: true,
          request,
          response
        });
      }
      async clientProof(clientMessageResponse) {
        const clientKey = await this.clientKey(clientMessageResponse);
        const storedKey = this.H(clientKey);
        const clientSignature = this.clientSignature(storedKey, clientMessageResponse);
        return encode64(SCRAM.xor(clientKey, clientSignature));
      }
      async clientKey(clientMessageResponse) {
        const saltedPassword = await this.saltPassword(clientMessageResponse);
        return this.HMAC(saltedPassword, HMAC_CLIENT_KEY);
      }
      async serverKey(clientMessageResponse) {
        const saltedPassword = await this.saltPassword(clientMessageResponse);
        return this.HMAC(saltedPassword, HMAC_SERVER_KEY);
      }
      clientSignature(storedKey, clientMessageResponse) {
        return this.HMAC(storedKey, this.authMessage(clientMessageResponse));
      }
      serverSignature(serverKey, clientMessageResponse) {
        return encode64(this.HMAC(serverKey, this.authMessage(clientMessageResponse)));
      }
      authMessage(clientMessageResponse) {
        return [
          this.firstMessageBare(),
          clientMessageResponse.original,
          this.finalMessageWithoutProof(clientMessageResponse)
        ].join(",");
      }
      async saltPassword(clientMessageResponse) {
        const salt = Buffer.from(clientMessageResponse.s, "base64");
        const iterations = parseInt(clientMessageResponse.i, 10);
        return SCRAM.hi(this.encodedPassword(), salt, iterations, this.digestDefinition);
      }
      firstMessageBare() {
        return `n=${this.encodedUsername()},r=${this.currentNonce}`;
      }
      finalMessageWithoutProof(clientMessageResponse) {
        const rnonce = clientMessageResponse.r;
        return `c=${encode64(GS2_HEADER)},r=${rnonce}`;
      }
      encodedUsername() {
        const { username } = this.connection.sasl;
        return SCRAM.sanitizeString(username).toString("utf-8");
      }
      encodedPassword() {
        const { password } = this.connection.sasl;
        return password.toString("utf-8");
      }
      H(data) {
        return crypto.createHash(this.digestDefinition.type).update(data).digest();
      }
      HMAC(key, data) {
        return crypto.createHmac(this.digestDefinition.type, key).update(data).digest();
      }
    };
    module2.exports = {
      DIGESTS,
      SCRAM
    };
  }
});

// node_modules/kafkajs/src/broker/saslAuthenticator/scram256.js
var require_scram256 = __commonJS({
  "node_modules/kafkajs/src/broker/saslAuthenticator/scram256.js"(exports, module2) {
    var { SCRAM, DIGESTS } = require_scram2();
    module2.exports = class SCRAM256Authenticator extends SCRAM {
      constructor(connection, logger, saslAuthenticate) {
        super(connection, logger.namespace("SCRAM256Authenticator"), saslAuthenticate, DIGESTS.SHA256);
      }
    };
  }
});

// node_modules/kafkajs/src/broker/saslAuthenticator/scram512.js
var require_scram512 = __commonJS({
  "node_modules/kafkajs/src/broker/saslAuthenticator/scram512.js"(exports, module2) {
    var { SCRAM, DIGESTS } = require_scram2();
    module2.exports = class SCRAM512Authenticator extends SCRAM {
      constructor(connection, logger, saslAuthenticate) {
        super(connection, logger.namespace("SCRAM512Authenticator"), saslAuthenticate, DIGESTS.SHA512);
      }
    };
  }
});

// node_modules/kafkajs/src/protocol/sasl/awsIam/request.js
var require_request113 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/awsIam/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var US_ASCII_NULL_CHAR = "\0";
    module2.exports = ({ authorizationIdentity, accessKeyId, secretAccessKey, sessionToken = "" }) => ({
      encode: async () => {
        return new Encoder().writeBytes([authorizationIdentity, accessKeyId, secretAccessKey, sessionToken].join(US_ASCII_NULL_CHAR));
      }
    });
  }
});

// node_modules/kafkajs/src/protocol/sasl/awsIam/response.js
var require_response112 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/awsIam/response.js"(exports, module2) {
    module2.exports = {
      decode: async () => true,
      parse: async () => true
    };
  }
});

// node_modules/kafkajs/src/protocol/sasl/awsIam/index.js
var require_awsIam = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/awsIam/index.js"(exports, module2) {
    module2.exports = {
      request: require_request113(),
      response: require_response112()
    };
  }
});

// node_modules/kafkajs/src/broker/saslAuthenticator/awsIam.js
var require_awsIam2 = __commonJS({
  "node_modules/kafkajs/src/broker/saslAuthenticator/awsIam.js"(exports, module2) {
    var awsIam = require_awsIam();
    var { KafkaJSSASLAuthenticationError } = require_errors();
    module2.exports = class AWSIAMAuthenticator {
      constructor(connection, logger, saslAuthenticate) {
        this.connection = connection;
        this.logger = logger.namespace("SASLAWSIAMAuthenticator");
        this.saslAuthenticate = saslAuthenticate;
      }
      async authenticate() {
        const { sasl } = this.connection;
        if (!sasl.authorizationIdentity) {
          throw new KafkaJSSASLAuthenticationError("SASL AWS-IAM: Missing authorizationIdentity");
        }
        if (!sasl.accessKeyId) {
          throw new KafkaJSSASLAuthenticationError("SASL AWS-IAM: Missing accessKeyId");
        }
        if (!sasl.secretAccessKey) {
          throw new KafkaJSSASLAuthenticationError("SASL AWS-IAM: Missing secretAccessKey");
        }
        if (!sasl.sessionToken) {
          sasl.sessionToken = "";
        }
        const request = awsIam.request(sasl);
        const response = awsIam.response;
        const { host, port } = this.connection;
        const broker = `${host}:${port}`;
        try {
          this.logger.debug("Authenticate with SASL AWS-IAM", { broker });
          await this.saslAuthenticate({ request, response });
          this.logger.debug("SASL AWS-IAM authentication successful", { broker });
        } catch (e) {
          const error = new KafkaJSSASLAuthenticationError(`SASL AWS-IAM authentication failed: ${e.message}`);
          this.logger.error(error.message, { broker });
          throw error;
        }
      }
    };
  }
});

// node_modules/kafkajs/src/protocol/sasl/oauthBearer/request.js
var require_request114 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/oauthBearer/request.js"(exports, module2) {
    var Encoder = require_encoder();
    var SEPARATOR = "";
    function formatExtensions(extensions) {
      let msg = "";
      if (extensions == null) {
        return msg;
      }
      let prefix = "";
      for (const k in extensions) {
        msg += `${prefix}${k}=${extensions[k]}`;
        prefix = SEPARATOR;
      }
      return msg;
    }
    module2.exports = async ({ authorizationIdentity = null }, oauthBearerToken) => {
      const authzid = authorizationIdentity == null ? "" : `"a=${authorizationIdentity}`;
      let ext = formatExtensions(oauthBearerToken.extensions);
      if (ext.length > 0) {
        ext = `${SEPARATOR}${ext}`;
      }
      const oauthMsg = `n,${authzid},${SEPARATOR}auth=Bearer ${oauthBearerToken.value}${ext}${SEPARATOR}${SEPARATOR}`;
      return {
        encode: async () => {
          return new Encoder().writeBytes(Buffer.from(oauthMsg));
        }
      };
    };
  }
});

// node_modules/kafkajs/src/protocol/sasl/oauthBearer/response.js
var require_response113 = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/oauthBearer/response.js"(exports, module2) {
    module2.exports = {
      decode: async () => true,
      parse: async () => true
    };
  }
});

// node_modules/kafkajs/src/protocol/sasl/oauthBearer/index.js
var require_oauthBearer = __commonJS({
  "node_modules/kafkajs/src/protocol/sasl/oauthBearer/index.js"(exports, module2) {
    module2.exports = {
      request: require_request114(),
      response: require_response113()
    };
  }
});

// node_modules/kafkajs/src/broker/saslAuthenticator/oauthBearer.js
var require_oauthBearer2 = __commonJS({
  "node_modules/kafkajs/src/broker/saslAuthenticator/oauthBearer.js"(exports, module2) {
    var oauthBearer = require_oauthBearer();
    var { KafkaJSSASLAuthenticationError } = require_errors();
    module2.exports = class OAuthBearerAuthenticator {
      constructor(connection, logger, saslAuthenticate) {
        this.connection = connection;
        this.logger = logger.namespace("SASLOAuthBearerAuthenticator");
        this.saslAuthenticate = saslAuthenticate;
      }
      async authenticate() {
        const { sasl } = this.connection;
        if (sasl.oauthBearerProvider == null) {
          throw new KafkaJSSASLAuthenticationError("SASL OAUTHBEARER: Missing OAuth bearer token provider");
        }
        const { oauthBearerProvider } = sasl;
        const oauthBearerToken = await oauthBearerProvider();
        if (oauthBearerToken.value == null) {
          throw new KafkaJSSASLAuthenticationError("SASL OAUTHBEARER: Invalid OAuth bearer token");
        }
        const request = await oauthBearer.request(sasl, oauthBearerToken);
        const response = oauthBearer.response;
        const { host, port } = this.connection;
        const broker = `${host}:${port}`;
        try {
          this.logger.debug("Authenticate with SASL OAUTHBEARER", { broker });
          await this.saslAuthenticate({ request, response });
          this.logger.debug("SASL OAUTHBEARER authentication successful", { broker });
        } catch (e) {
          const error = new KafkaJSSASLAuthenticationError(`SASL OAUTHBEARER authentication failed: ${e.message}`);
          this.logger.error(error.message, { broker });
          throw error;
        }
      }
    };
  }
});

// node_modules/kafkajs/src/broker/saslAuthenticator/index.js
var require_saslAuthenticator = __commonJS({
  "node_modules/kafkajs/src/broker/saslAuthenticator/index.js"(exports, module2) {
    var { requests, lookup } = require_requests();
    var apiKeys = require_apiKeys();
    var PlainAuthenticator = require_plain2();
    var SCRAM256Authenticator = require_scram256();
    var SCRAM512Authenticator = require_scram512();
    var AWSIAMAuthenticator = require_awsIam2();
    var OAuthBearerAuthenticator = require_oauthBearer2();
    var { KafkaJSSASLAuthenticationError } = require_errors();
    var AUTHENTICATORS = {
      PLAIN: PlainAuthenticator,
      "SCRAM-SHA-256": SCRAM256Authenticator,
      "SCRAM-SHA-512": SCRAM512Authenticator,
      AWS: AWSIAMAuthenticator,
      OAUTHBEARER: OAuthBearerAuthenticator
    };
    var SUPPORTED_MECHANISMS = Object.keys(AUTHENTICATORS);
    var UNLIMITED_SESSION_LIFETIME = "0";
    module2.exports = class SASLAuthenticator {
      constructor(connection, logger, versions, supportAuthenticationProtocol) {
        this.connection = connection;
        this.logger = logger;
        this.sessionLifetime = UNLIMITED_SESSION_LIFETIME;
        const lookupRequest = lookup(versions);
        this.saslHandshake = lookupRequest(apiKeys.SaslHandshake, requests.SaslHandshake);
        this.protocolAuthentication = supportAuthenticationProtocol ? lookupRequest(apiKeys.SaslAuthenticate, requests.SaslAuthenticate) : null;
      }
      async authenticate() {
        const mechanism = this.connection.sasl.mechanism.toUpperCase();
        if (!SUPPORTED_MECHANISMS.includes(mechanism)) {
          throw new KafkaJSSASLAuthenticationError(`SASL ${mechanism} mechanism is not supported by the client`);
        }
        const handshake = await this.connection.send(this.saslHandshake({ mechanism }));
        if (!handshake.enabledMechanisms.includes(mechanism)) {
          throw new KafkaJSSASLAuthenticationError(`SASL ${mechanism} mechanism is not supported by the server`);
        }
        const saslAuthenticate = async ({ request, response, authExpectResponse }) => {
          if (this.protocolAuthentication) {
            const { buffer: requestAuthBytes } = await request.encode();
            const authResponse = await this.connection.send(this.protocolAuthentication({ authBytes: requestAuthBytes }));
            this.sessionLifetime = authResponse.sessionLifetimeMs || UNLIMITED_SESSION_LIFETIME;
            if (!authExpectResponse) {
              return;
            }
            const { authBytes: responseAuthBytes } = authResponse;
            const payloadDecoded = await response.decode(responseAuthBytes);
            return response.parse(payloadDecoded);
          }
          return this.connection.sendAuthRequest({ request, response, authExpectResponse });
        };
        const Authenticator = AUTHENTICATORS[mechanism];
        await new Authenticator(this.connection, this.logger, saslAuthenticate).authenticate();
      }
    };
  }
});

// node_modules/kafkajs/src/network/connection.js
var require_connection = __commonJS({
  "node_modules/kafkajs/src/network/connection.js"(exports, module2) {
    var createSocket = require_socket();
    var createRequest = require_request109();
    var Decoder = require_decoder();
    var { KafkaJSConnectionError, KafkaJSConnectionClosedError } = require_errors();
    var { INT_32_MAX_VALUE } = require_constants();
    var getEnv = require_env();
    var RequestQueue = require_requestQueue();
    var { CONNECTION_STATUS, CONNECTED_STATUS } = require_connectionStatus();
    var sharedPromiseTo = require_sharedPromiseTo();
    var Long = require_long();
    var SASLAuthenticator = require_saslAuthenticator();
    var apiKeys = require_apiKeys();
    var requestInfo = ({ apiName, apiKey, apiVersion }) => `${apiName}(key: ${apiKey}, version: ${apiVersion})`;
    var isAuthenticatedRequest = (request) => {
      return ![apiKeys.ApiVersions, apiKeys.SaslHandshake, apiKeys.SaslAuthenticate].includes(request.apiKey);
    };
    var PRIVATE = {
      SHOULD_REAUTHENTICATE: Symbol("private:Connection:shouldReauthenticate"),
      AUTHENTICATE: Symbol("private:Connection:authenticate")
    };
    module2.exports = class Connection {
      constructor({
        host,
        port,
        logger,
        socketFactory,
        requestTimeout,
        reauthenticationThreshold = 1e4,
        rack = null,
        ssl = null,
        sasl = null,
        clientId = "kafkajs",
        connectionTimeout,
        enforceRequestTimeout = true,
        maxInFlightRequests = null,
        instrumentationEmitter = null
      }) {
        this.host = host;
        this.port = port;
        this.rack = rack;
        this.clientId = clientId;
        this.broker = `${this.host}:${this.port}`;
        this.logger = logger.namespace("Connection");
        this.socketFactory = socketFactory;
        this.ssl = ssl;
        this.sasl = sasl;
        this.requestTimeout = requestTimeout;
        this.connectionTimeout = connectionTimeout;
        this.reauthenticationThreshold = reauthenticationThreshold;
        this.bytesBuffered = 0;
        this.bytesNeeded = Decoder.int32Size();
        this.chunks = [];
        this.connectionStatus = CONNECTION_STATUS.DISCONNECTED;
        this.correlationId = 0;
        this.requestQueue = new RequestQueue({
          instrumentationEmitter,
          maxInFlightRequests,
          requestTimeout,
          enforceRequestTimeout,
          clientId,
          broker: this.broker,
          logger: logger.namespace("RequestQueue"),
          isConnected: () => this.isConnected()
        });
        this.versions = null;
        this.authHandlers = null;
        this.authExpectResponse = false;
        const log = (level) => (message, extra = {}) => {
          const logFn = this.logger[level];
          logFn(message, __spreadValues({ broker: this.broker, clientId }, extra));
        };
        this.logDebug = log("debug");
        this.logError = log("error");
        const env = getEnv();
        this.shouldLogBuffers = env.KAFKAJS_DEBUG_PROTOCOL_BUFFERS === "1";
        this.shouldLogFetchBuffer = this.shouldLogBuffers && env.KAFKAJS_DEBUG_EXTENDED_PROTOCOL_BUFFERS === "1";
        this.authenticatedAt = null;
        this.sessionLifetime = Long.ZERO;
        this.supportAuthenticationProtocol = null;
        this[PRIVATE.AUTHENTICATE] = sharedPromiseTo(async () => {
          if (this.sasl && !this.isAuthenticated()) {
            const authenticator = new SASLAuthenticator(this, this.logger, this.versions, this.supportAuthenticationProtocol);
            await authenticator.authenticate();
            this.authenticatedAt = process.hrtime();
            this.sessionLifetime = Long.fromValue(authenticator.sessionLifetime);
          }
        });
      }
      getSupportAuthenticationProtocol() {
        return this.supportAuthenticationProtocol;
      }
      setSupportAuthenticationProtocol(isSupported) {
        this.supportAuthenticationProtocol = isSupported;
      }
      setVersions(versions) {
        this.versions = versions;
      }
      isConnected() {
        return CONNECTED_STATUS.includes(this.connectionStatus);
      }
      connect() {
        return new Promise((resolve, reject) => {
          if (this.isConnected()) {
            return resolve(true);
          }
          this.authenticatedAt = null;
          let timeoutId;
          const onConnect = () => {
            clearTimeout(timeoutId);
            this.connectionStatus = CONNECTION_STATUS.CONNECTED;
            this.requestQueue.scheduleRequestTimeoutCheck();
            resolve(true);
          };
          const onData = (data) => {
            this.processData(data);
          };
          const onEnd = async () => {
            clearTimeout(timeoutId);
            const wasConnected = this.isConnected();
            if (this.authHandlers) {
              this.authHandlers.onError();
            } else if (wasConnected) {
              this.logDebug("Kafka server has closed connection");
              this.rejectRequests(new KafkaJSConnectionClosedError("Closed connection", {
                host: this.host,
                port: this.port
              }));
            }
            await this.disconnect();
          };
          const onError = async (e) => {
            clearTimeout(timeoutId);
            const error = new KafkaJSConnectionError(`Connection error: ${e.message}`, {
              broker: `${this.host}:${this.port}`,
              code: e.code
            });
            this.logError(error.message, { stack: e.stack });
            this.rejectRequests(error);
            await this.disconnect();
            reject(error);
          };
          const onTimeout = async () => {
            const error = new KafkaJSConnectionError("Connection timeout", {
              broker: `${this.host}:${this.port}`
            });
            this.logError(error.message);
            this.rejectRequests(error);
            await this.disconnect();
            reject(error);
          };
          this.logDebug(`Connecting`, {
            ssl: !!this.ssl,
            sasl: !!this.sasl
          });
          try {
            timeoutId = setTimeout(onTimeout, this.connectionTimeout);
            this.socket = createSocket({
              socketFactory: this.socketFactory,
              host: this.host,
              port: this.port,
              ssl: this.ssl,
              onConnect,
              onData,
              onEnd,
              onError,
              onTimeout
            });
          } catch (e) {
            clearTimeout(timeoutId);
            reject(new KafkaJSConnectionError(`Failed to connect: ${e.message}`, {
              broker: `${this.host}:${this.port}`
            }));
          }
        });
      }
      async disconnect() {
        this.authenticatedAt = null;
        this.connectionStatus = CONNECTION_STATUS.DISCONNECTING;
        this.logDebug("disconnecting...");
        await this.requestQueue.waitForPendingRequests();
        this.requestQueue.destroy();
        if (this.socket) {
          this.socket.end();
          this.socket.unref();
        }
        this.connectionStatus = CONNECTION_STATUS.DISCONNECTED;
        this.logDebug("disconnected");
        return true;
      }
      isAuthenticated() {
        return this.authenticatedAt != null && !this[PRIVATE.SHOULD_REAUTHENTICATE]();
      }
      [PRIVATE.SHOULD_REAUTHENTICATE]() {
        if (this.sessionLifetime.equals(Long.ZERO)) {
          return false;
        }
        if (this.authenticatedAt == null) {
          return true;
        }
        const [secondsSince, remainingNanosSince] = process.hrtime(this.authenticatedAt);
        const millisSince = Long.fromValue(secondsSince).multiply(1e3).add(Long.fromValue(remainingNanosSince).divide(1e6));
        const reauthenticateAt = millisSince.add(this.reauthenticationThreshold);
        return reauthenticateAt.greaterThanOrEqual(this.sessionLifetime);
      }
      async authenticate() {
        await this[PRIVATE.AUTHENTICATE]();
      }
      sendAuthRequest({ authExpectResponse = false, request, response }) {
        this.authExpectResponse = authExpectResponse;
        return new Promise(async (resolve, reject) => {
          this.authHandlers = {
            onSuccess: (rawData) => {
              this.authHandlers = null;
              this.authExpectResponse = false;
              response.decode(rawData).then((data) => response.parse(data)).then(resolve).catch(reject);
            },
            onError: () => {
              this.authHandlers = null;
              this.authExpectResponse = false;
              reject(new KafkaJSConnectionError("Connection closed by the server", {
                broker: `${this.host}:${this.port}`
              }));
            }
          };
          try {
            const requestPayload = await request.encode();
            this.failIfNotConnected();
            this.socket.write(requestPayload.buffer, "binary");
          } catch (e) {
            reject(e);
          }
        });
      }
      async send({ request, response, requestTimeout = null, logResponseError = true }) {
        if (!this.isAuthenticated() && isAuthenticatedRequest(request)) {
          await this[PRIVATE.AUTHENTICATE]();
        }
        this.failIfNotConnected();
        const expectResponse = !request.expectResponse || request.expectResponse();
        const sendRequest = async () => {
          const { clientId } = this;
          const correlationId2 = this.nextCorrelationId();
          const requestPayload = await createRequest({ request, correlationId: correlationId2, clientId });
          const { apiKey, apiName, apiVersion } = request;
          this.logDebug(`Request ${requestInfo(request)}`, {
            correlationId: correlationId2,
            expectResponse,
            size: Buffer.byteLength(requestPayload.buffer)
          });
          return new Promise((resolve, reject) => {
            try {
              this.failIfNotConnected();
              const entry2 = { apiKey, apiName, apiVersion, correlationId: correlationId2, resolve, reject };
              this.requestQueue.push({
                entry: entry2,
                expectResponse,
                requestTimeout,
                sendRequest: () => {
                  this.socket.write(requestPayload.buffer, "binary");
                }
              });
            } catch (e) {
              reject(e);
            }
          });
        };
        const { correlationId, size, entry, payload } = await sendRequest();
        if (!expectResponse) {
          return;
        }
        try {
          const payloadDecoded = await response.decode(payload);
          this.requestQueue.maybeThrottle(payloadDecoded.clientSideThrottleTime);
          const data = await response.parse(payloadDecoded);
          const isFetchApi = entry.apiName === "Fetch";
          this.logDebug(`Response ${requestInfo(entry)}`, {
            correlationId,
            size,
            data: isFetchApi && !this.shouldLogFetchBuffer ? "[filtered]" : data
          });
          return data;
        } catch (e) {
          if (logResponseError) {
            this.logError(`Response ${requestInfo(entry)}`, {
              error: e.message,
              correlationId,
              size
            });
          }
          const isBuffer = Buffer.isBuffer(payload);
          this.logDebug(`Response ${requestInfo(entry)}`, {
            error: e.message,
            correlationId,
            payload: isBuffer && !this.shouldLogBuffers ? { type: "Buffer", data: "[filtered]" } : payload
          });
          throw e;
        }
      }
      failIfNotConnected() {
        if (!this.isConnected()) {
          throw new KafkaJSConnectionError("Not connected", {
            broker: `${this.host}:${this.port}`
          });
        }
      }
      nextCorrelationId() {
        if (this.correlationId >= INT_32_MAX_VALUE) {
          this.correlationId = 0;
        }
        return this.correlationId++;
      }
      processData(rawData) {
        if (this.authHandlers && !this.authExpectResponse) {
          return this.authHandlers.onSuccess(rawData);
        }
        this.chunks.push(rawData);
        this.bytesBuffered += Buffer.byteLength(rawData);
        while (this.bytesNeeded <= this.bytesBuffered) {
          const buffer = this.chunks.length > 1 ? Buffer.concat(this.chunks) : this.chunks[0];
          const decoder = new Decoder(buffer);
          const expectedResponseSize = decoder.readInt32();
          if (!decoder.canReadBytes(expectedResponseSize)) {
            this.chunks = [buffer];
            this.bytesBuffered = Buffer.byteLength(buffer);
            this.bytesNeeded = Decoder.int32Size() + expectedResponseSize;
            return;
          }
          const response = new Decoder(decoder.readBytes(expectedResponseSize));
          const remainderBuffer = decoder.readAll();
          this.chunks = [remainderBuffer];
          this.bytesBuffered = Buffer.byteLength(remainderBuffer);
          this.bytesNeeded = Decoder.int32Size();
          if (this.authHandlers) {
            const rawResponseSize = Decoder.int32Size() + expectedResponseSize;
            const rawResponseBuffer = buffer.slice(0, rawResponseSize);
            return this.authHandlers.onSuccess(rawResponseBuffer);
          }
          const correlationId = response.readInt32();
          const payload = response.readAll();
          this.requestQueue.fulfillRequest({
            size: expectedResponseSize,
            correlationId,
            payload
          });
        }
      }
      rejectRequests(error) {
        this.requestQueue.rejectAll(error);
      }
    };
  }
});

// node_modules/kafkajs/src/network/connectionPool.js
var require_connectionPool = __commonJS({
  "node_modules/kafkajs/src/network/connectionPool.js"(exports, module2) {
    var apiKeys = require_apiKeys();
    var Connection = require_connection();
    module2.exports = class ConnectionPool {
      constructor(options) {
        this.logger = options.logger.namespace("ConnectionPool");
        this.connectionTimeout = options.connectionTimeout;
        this.host = options.host;
        this.port = options.port;
        this.rack = options.rack;
        this.ssl = options.ssl;
        this.sasl = options.sasl;
        this.clientId = options.clientId;
        this.socketFactory = options.socketFactory;
        this.pool = new Array(2).fill().map(() => new Connection(options));
      }
      isConnected() {
        return this.pool.some((c) => c.isConnected());
      }
      isAuthenticated() {
        return this.pool.some((c) => c.isAuthenticated());
      }
      setSupportAuthenticationProtocol(isSupported) {
        this.map((c) => c.setSupportAuthenticationProtocol(isSupported));
      }
      setVersions(versions) {
        this.map((c) => c.setVersions(versions));
      }
      map(callback) {
        return this.pool.map((c) => callback(c));
      }
      async send(protocolRequest) {
        const connection = await this.getConnectionByRequest(protocolRequest);
        return connection.send(protocolRequest);
      }
      getConnectionByRequest({ request: { apiKey } }) {
        const index = { [apiKeys.Fetch]: 1 }[apiKey] || 0;
        return this.getConnection(index);
      }
      async getConnection(index = 0) {
        const connection = this.pool[index];
        if (!connection.isConnected()) {
          await connection.connect();
        }
        return connection;
      }
      async destroy() {
        await Promise.all(this.map((c) => c.disconnect()));
      }
    };
  }
});

// node_modules/kafkajs/src/cluster/connectionPoolBuilder.js
var require_connectionPoolBuilder = __commonJS({
  "node_modules/kafkajs/src/cluster/connectionPoolBuilder.js"(exports, module2) {
    var { KafkaJSConnectionError, KafkaJSNonRetriableError } = require_errors();
    var ConnectionPool = require_connectionPool();
    module2.exports = ({
      socketFactory,
      brokers,
      ssl,
      sasl,
      clientId,
      requestTimeout,
      enforceRequestTimeout,
      connectionTimeout,
      maxInFlightRequests,
      logger,
      instrumentationEmitter = null,
      reauthenticationThreshold
    }) => {
      let index = 0;
      const isValidBroker = (broker) => {
        return broker && typeof broker === "string" && broker.length > 0;
      };
      const validateBrokers = (brokers2) => {
        if (!brokers2) {
          throw new KafkaJSNonRetriableError(`Failed to connect: brokers should not be null`);
        }
        if (Array.isArray(brokers2)) {
          if (!brokers2.length) {
            throw new KafkaJSNonRetriableError(`Failed to connect: brokers array is empty`);
          }
          brokers2.forEach((broker, index2) => {
            if (!isValidBroker(broker)) {
              throw new KafkaJSNonRetriableError(`Failed to connect: broker at index ${index2} is invalid "${typeof broker}"`);
            }
          });
        }
      };
      const getBrokers = async () => {
        let list;
        if (typeof brokers === "function") {
          try {
            list = await brokers();
          } catch (e) {
            const wrappedError = new KafkaJSConnectionError(`Failed to connect: "config.brokers" threw: ${e.message}`);
            wrappedError.stack = `${wrappedError.name}
  Caused by: ${e.stack}`;
            throw wrappedError;
          }
        } else {
          list = brokers;
        }
        validateBrokers(list);
        return list;
      };
      return {
        build: async ({ host, port, rack } = {}) => {
          if (!host) {
            const list = await getBrokers();
            const randomBroker = list[index++ % list.length];
            host = randomBroker.split(":")[0];
            port = Number(randomBroker.split(":")[1]);
          }
          return new ConnectionPool({
            host,
            port,
            rack,
            sasl,
            ssl,
            clientId,
            socketFactory,
            connectionTimeout,
            requestTimeout,
            enforceRequestTimeout,
            maxInFlightRequests,
            instrumentationEmitter,
            logger,
            reauthenticationThreshold
          });
        }
      };
    };
  }
});

// node_modules/kafkajs/src/cluster/index.js
var require_cluster = __commonJS({
  "node_modules/kafkajs/src/cluster/index.js"(exports, module2) {
    var BrokerPool = require_brokerPool();
    var Lock = require_lock();
    var sharedPromiseTo = require_sharedPromiseTo();
    var createRetry = require_retry();
    var connectionPoolBuilder = require_connectionPoolBuilder();
    var { EARLIEST_OFFSET, LATEST_OFFSET } = require_constants();
    var {
      KafkaJSError,
      KafkaJSBrokerNotFound,
      KafkaJSMetadataNotLoaded,
      KafkaJSTopicMetadataNotLoaded,
      KafkaJSGroupCoordinatorNotFound
    } = require_errors();
    var COORDINATOR_TYPES = require_coordinatorTypes();
    var { keys } = Object;
    var mergeTopics = (obj, { topic, partitions }) => __spreadProps(__spreadValues({}, obj), {
      [topic]: [...obj[topic] || [], ...partitions]
    });
    var PRIVATE = {
      CONNECT: Symbol("private:Cluster:connect"),
      REFRESH_METADATA: Symbol("private:Cluster:refreshMetadata"),
      REFRESH_METADATA_IF_NECESSARY: Symbol("private:Cluster:refreshMetadataIfNecessary"),
      FIND_CONTROLLER_BROKER: Symbol("private:Cluster:findControllerBroker")
    };
    module2.exports = class Cluster {
      constructor({
        logger: rootLogger,
        socketFactory,
        brokers,
        ssl,
        sasl,
        clientId,
        connectionTimeout,
        authenticationTimeout,
        reauthenticationThreshold,
        requestTimeout = 3e4,
        enforceRequestTimeout,
        metadataMaxAge,
        retry,
        allowAutoTopicCreation,
        maxInFlightRequests,
        isolationLevel,
        instrumentationEmitter = null,
        offsets = /* @__PURE__ */ new Map()
      }) {
        this.rootLogger = rootLogger;
        this.logger = rootLogger.namespace("Cluster");
        this.retrier = createRetry(retry);
        this.connectionPoolBuilder = connectionPoolBuilder({
          logger: rootLogger,
          instrumentationEmitter,
          socketFactory,
          brokers,
          ssl,
          sasl,
          clientId,
          connectionTimeout,
          requestTimeout,
          enforceRequestTimeout,
          maxInFlightRequests,
          reauthenticationThreshold
        });
        this.targetTopics = /* @__PURE__ */ new Set();
        this.mutatingTargetTopics = new Lock({
          description: `updating target topics`,
          timeout: requestTimeout
        });
        this.isolationLevel = isolationLevel;
        this.brokerPool = new BrokerPool({
          connectionPoolBuilder: this.connectionPoolBuilder,
          logger: this.rootLogger,
          retry,
          allowAutoTopicCreation,
          authenticationTimeout,
          metadataMaxAge
        });
        this.committedOffsetsByGroup = offsets;
        this[PRIVATE.CONNECT] = sharedPromiseTo(async () => {
          return await this.brokerPool.connect();
        });
        this[PRIVATE.REFRESH_METADATA] = sharedPromiseTo(async () => {
          return await this.brokerPool.refreshMetadata(Array.from(this.targetTopics));
        });
        this[PRIVATE.REFRESH_METADATA_IF_NECESSARY] = sharedPromiseTo(async () => {
          return await this.brokerPool.refreshMetadataIfNecessary(Array.from(this.targetTopics));
        });
        this[PRIVATE.FIND_CONTROLLER_BROKER] = sharedPromiseTo(async () => {
          const { metadata } = this.brokerPool;
          if (!metadata || metadata.controllerId == null) {
            throw new KafkaJSMetadataNotLoaded("Topic metadata not loaded");
          }
          const broker = await this.findBroker({ nodeId: metadata.controllerId });
          if (!broker) {
            throw new KafkaJSBrokerNotFound(`Controller broker with id ${metadata.controllerId} not found in the cached metadata`);
          }
          return broker;
        });
      }
      isConnected() {
        return this.brokerPool.hasConnectedBrokers();
      }
      async connect() {
        await this[PRIVATE.CONNECT]();
      }
      async disconnect() {
        await this.brokerPool.disconnect();
      }
      removeBroker({ host, port }) {
        this.brokerPool.removeBroker({ host, port });
      }
      async refreshMetadata() {
        await this[PRIVATE.REFRESH_METADATA]();
      }
      async refreshMetadataIfNecessary() {
        await this[PRIVATE.REFRESH_METADATA_IF_NECESSARY]();
      }
      async metadata({ topics = [] } = {}) {
        return this.retrier(async (bail, retryCount, retryTime) => {
          try {
            await this.brokerPool.refreshMetadataIfNecessary(topics);
            return this.brokerPool.withBroker(async ({ broker }) => broker.metadata(topics));
          } catch (e) {
            if (e.type === "LEADER_NOT_AVAILABLE") {
              throw e;
            }
            bail(e);
          }
        });
      }
      async addTargetTopic(topic) {
        return this.addMultipleTargetTopics([topic]);
      }
      async addMultipleTargetTopics(topics) {
        await this.mutatingTargetTopics.acquire();
        try {
          const previousSize = this.targetTopics.size;
          const previousTopics = new Set(this.targetTopics);
          for (const topic of topics) {
            this.targetTopics.add(topic);
          }
          const hasChanged = previousSize !== this.targetTopics.size || !this.brokerPool.metadata;
          if (hasChanged) {
            try {
              await this.refreshMetadata();
            } catch (e) {
              if (e.type === "INVALID_TOPIC_EXCEPTION" || e.type === "UNKNOWN_TOPIC_OR_PARTITION") {
                this.targetTopics = previousTopics;
              }
              throw e;
            }
          }
        } finally {
          await this.mutatingTargetTopics.release();
        }
      }
      getNodeIds() {
        return this.brokerPool.getNodeIds();
      }
      async findBroker({ nodeId }) {
        try {
          return await this.brokerPool.findBroker({ nodeId });
        } catch (e) {
          if (e.name === "KafkaJSBrokerNotFound" || e.name === "KafkaJSLockTimeout" || e.name === "KafkaJSConnectionError") {
            await this.refreshMetadata();
          }
          throw e;
        }
      }
      async findControllerBroker() {
        return await this[PRIVATE.FIND_CONTROLLER_BROKER]();
      }
      findTopicPartitionMetadata(topic) {
        const { metadata } = this.brokerPool;
        if (!metadata || !metadata.topicMetadata) {
          throw new KafkaJSTopicMetadataNotLoaded("Topic metadata not loaded", { topic });
        }
        const topicMetadata = metadata.topicMetadata.find((t) => t.topic === topic);
        return topicMetadata ? topicMetadata.partitionMetadata : [];
      }
      findLeaderForPartitions(topic, partitions) {
        const partitionMetadata = this.findTopicPartitionMetadata(topic);
        return partitions.reduce((result, id) => {
          const partitionId = parseInt(id, 10);
          const metadata = partitionMetadata.find((p) => p.partitionId === partitionId);
          if (!metadata) {
            return result;
          }
          if (metadata.leader === null || metadata.leader === void 0) {
            throw new KafkaJSError("Invalid partition metadata", { topic, partitionId, metadata });
          }
          const { leader } = metadata;
          const current = result[leader] || [];
          return __spreadProps(__spreadValues({}, result), { [leader]: [...current, partitionId] });
        }, {});
      }
      async findGroupCoordinator({ groupId, coordinatorType = COORDINATOR_TYPES.GROUP }) {
        return this.retrier(async (bail, retryCount, retryTime) => {
          try {
            const { coordinator } = await this.findGroupCoordinatorMetadata({
              groupId,
              coordinatorType
            });
            return await this.findBroker({ nodeId: coordinator.nodeId });
          } catch (e) {
            if (e.name === "KafkaJSBrokerNotFound" || e.type === "GROUP_COORDINATOR_NOT_AVAILABLE") {
              this.logger.debug(`${e.message}, refreshing metadata and trying again...`, {
                groupId,
                retryCount,
                retryTime
              });
              await this.refreshMetadata();
              throw e;
            }
            if (e.code === "ECONNREFUSED") {
              throw e;
            }
            bail(e);
          }
        });
      }
      async findGroupCoordinatorMetadata({ groupId, coordinatorType }) {
        const brokerMetadata = await this.brokerPool.withBroker(async ({ nodeId, broker }) => {
          return await this.retrier(async (bail, retryCount, retryTime) => {
            try {
              const brokerMetadata2 = await broker.findGroupCoordinator({ groupId, coordinatorType });
              this.logger.debug("Found group coordinator", {
                broker: brokerMetadata2.host,
                nodeId: brokerMetadata2.coordinator.nodeId
              });
              return brokerMetadata2;
            } catch (e) {
              this.logger.debug("Tried to find group coordinator", {
                nodeId,
                error: e
              });
              if (e.type === "GROUP_COORDINATOR_NOT_AVAILABLE") {
                this.logger.debug("Group coordinator not available, retrying...", {
                  nodeId,
                  retryCount,
                  retryTime
                });
                throw e;
              }
              bail(e);
            }
          });
        });
        if (brokerMetadata) {
          return brokerMetadata;
        }
        throw new KafkaJSGroupCoordinatorNotFound("Failed to find group coordinator");
      }
      defaultOffset({ fromBeginning }) {
        return fromBeginning ? EARLIEST_OFFSET : LATEST_OFFSET;
      }
      async fetchTopicsOffset(topics) {
        const partitionsPerBroker = {};
        const topicConfigurations = {};
        const addDefaultOffset = (topic) => (partition) => {
          const { timestamp } = topicConfigurations[topic];
          return __spreadProps(__spreadValues({}, partition), { timestamp });
        };
        for (const topicData of topics) {
          const { topic, partitions, fromBeginning, fromTimestamp } = topicData;
          const partitionsPerLeader = this.findLeaderForPartitions(topic, partitions.map((p) => p.partition));
          const timestamp = fromTimestamp != null ? fromTimestamp : this.defaultOffset({ fromBeginning });
          topicConfigurations[topic] = { timestamp };
          keys(partitionsPerLeader).forEach((nodeId) => {
            partitionsPerBroker[nodeId] = partitionsPerBroker[nodeId] || {};
            partitionsPerBroker[nodeId][topic] = partitions.filter((p) => partitionsPerLeader[nodeId].includes(p.partition));
          });
        }
        const requests = keys(partitionsPerBroker).map(async (nodeId) => {
          const broker = await this.findBroker({ nodeId });
          const partitions = partitionsPerBroker[nodeId];
          const { responses: topicOffsets } = await broker.listOffsets({
            isolationLevel: this.isolationLevel,
            topics: keys(partitions).map((topic) => ({
              topic,
              partitions: partitions[topic].map(addDefaultOffset(topic))
            }))
          });
          return topicOffsets;
        });
        const responses = await Promise.all(requests);
        const partitionsPerTopic = responses.flat().reduce(mergeTopics, {});
        return keys(partitionsPerTopic).map((topic) => ({
          topic,
          partitions: partitionsPerTopic[topic].map(({ partition, offset }) => ({
            partition,
            offset
          }))
        }));
      }
      committedOffsets({ groupId }) {
        if (!this.committedOffsetsByGroup.has(groupId)) {
          this.committedOffsetsByGroup.set(groupId, {});
        }
        return this.committedOffsetsByGroup.get(groupId);
      }
      markOffsetAsCommitted({ groupId, topic, partition, offset }) {
        const committedOffsets = this.committedOffsets({ groupId });
        committedOffsets[topic] = committedOffsets[topic] || {};
        committedOffsets[topic][partition] = offset;
      }
    };
  }
});

// node_modules/kafkajs/src/producer/partitioners/default/murmur2.js
var require_murmur2 = __commonJS({
  "node_modules/kafkajs/src/producer/partitioners/default/murmur2.js"(exports, module2) {
    var Long = require_long();
    var SEED = Long.fromValue(2538058380);
    var M = Long.fromValue(1540483477);
    var R = Long.fromValue(24);
    module2.exports = (key) => {
      const data = Buffer.isBuffer(key) ? key : Buffer.from(String(key));
      const length = data.length;
      let h = Long.fromValue(SEED.xor(length));
      let length4 = Math.floor(length / 4);
      for (let i = 0; i < length4; i++) {
        const i4 = i * 4;
        let k = (data[i4 + 0] & 255) + ((data[i4 + 1] & 255) << 8) + ((data[i4 + 2] & 255) << 16) + ((data[i4 + 3] & 255) << 24);
        k = Long.fromValue(k);
        k = k.multiply(M);
        k = k.xor(k.toInt() >>> R);
        k = Long.fromValue(k).multiply(M);
        h = h.multiply(M);
        h = h.xor(k);
      }
      switch (length % 4) {
        case 3:
          h = h.xor((data[(length & ~3) + 2] & 255) << 16);
        case 2:
          h = h.xor((data[(length & ~3) + 1] & 255) << 8);
        case 1:
          h = h.xor(data[length & ~3] & 255);
          h = h.multiply(M);
      }
      h = h.xor(h.toInt() >>> 13);
      h = h.multiply(M);
      h = h.xor(h.toInt() >>> 15);
      return h.toInt();
    };
  }
});

// node_modules/kafkajs/src/producer/partitioners/legacy/randomBytes.js
var require_randomBytes = __commonJS({
  "node_modules/kafkajs/src/producer/partitioners/legacy/randomBytes.js"(exports, module2) {
    var { KafkaJSNonRetriableError } = require_errors();
    var toNodeCompatible = (crypto) => ({
      randomBytes: (size) => crypto.getRandomValues(Buffer.allocUnsafe(size))
    });
    var cryptoImplementation = null;
    if (global && global.crypto) {
      cryptoImplementation = global.crypto.randomBytes === void 0 ? toNodeCompatible(global.crypto) : global.crypto;
    } else if (global && global.msCrypto) {
      cryptoImplementation = toNodeCompatible(global.msCrypto);
    } else if (global && !global.crypto) {
      cryptoImplementation = require("crypto");
    }
    var MAX_BYTES = 65536;
    module2.exports = (size) => {
      if (size > MAX_BYTES) {
        throw new KafkaJSNonRetriableError(`Byte length (${size}) exceeds the max number of bytes of entropy available (${MAX_BYTES})`);
      }
      if (!cryptoImplementation) {
        throw new KafkaJSNonRetriableError("No available crypto implementation");
      }
      return cryptoImplementation.randomBytes(size);
    };
  }
});

// node_modules/kafkajs/src/producer/partitioners/legacy/partitioner.js
var require_partitioner = __commonJS({
  "node_modules/kafkajs/src/producer/partitioners/legacy/partitioner.js"(exports, module2) {
    var randomBytes = require_randomBytes();
    var toPositive = (x) => x & 2147483647;
    module2.exports = (murmur2) => () => {
      const counters = {};
      return ({ topic, partitionMetadata, message }) => {
        if (!(topic in counters)) {
          counters[topic] = randomBytes(32).readUInt32BE(0);
        }
        const numPartitions = partitionMetadata.length;
        const availablePartitions = partitionMetadata.filter((p) => p.leader >= 0);
        const numAvailablePartitions = availablePartitions.length;
        if (message.partition !== null && message.partition !== void 0) {
          return message.partition;
        }
        if (message.key !== null && message.key !== void 0) {
          return toPositive(murmur2(message.key)) % numPartitions;
        }
        if (numAvailablePartitions > 0) {
          const i = toPositive(++counters[topic]) % numAvailablePartitions;
          return availablePartitions[i].partitionId;
        }
        return toPositive(++counters[topic]) % numPartitions;
      };
    };
  }
});

// node_modules/kafkajs/src/producer/partitioners/default/index.js
var require_default = __commonJS({
  "node_modules/kafkajs/src/producer/partitioners/default/index.js"(exports, module2) {
    var murmur2 = require_murmur2();
    var createDefaultPartitioner = require_partitioner();
    module2.exports = createDefaultPartitioner(murmur2);
  }
});

// node_modules/kafkajs/src/producer/partitioners/legacy/murmur2.js
var require_murmur22 = __commonJS({
  "node_modules/kafkajs/src/producer/partitioners/legacy/murmur2.js"(exports, module2) {
    var SEED = 2538058380;
    var M = 1540483477;
    var R = 24;
    module2.exports = (key) => {
      const data = Buffer.isBuffer(key) ? key : Buffer.from(String(key));
      const length = data.length;
      let h = SEED ^ length;
      let length4 = length / 4;
      for (let i = 0; i < length4; i++) {
        const i4 = i * 4;
        let k = (data[i4 + 0] & 255) + ((data[i4 + 1] & 255) << 8) + ((data[i4 + 2] & 255) << 16) + ((data[i4 + 3] & 255) << 24);
        k *= M;
        k ^= k >>> R;
        k *= M;
        h *= M;
        h ^= k;
      }
      switch (length % 4) {
        case 3:
          h ^= (data[(length & ~3) + 2] & 255) << 16;
        case 2:
          h ^= (data[(length & ~3) + 1] & 255) << 8;
        case 1:
          h ^= data[length & ~3] & 255;
          h *= M;
      }
      h ^= h >>> 13;
      h *= M;
      h ^= h >>> 15;
      return h;
    };
  }
});

// node_modules/kafkajs/src/producer/partitioners/legacy/index.js
var require_legacy = __commonJS({
  "node_modules/kafkajs/src/producer/partitioners/legacy/index.js"(exports, module2) {
    var murmur2 = require_murmur22();
    var createLegacyPartitioner = require_partitioner();
    module2.exports = createLegacyPartitioner(murmur2);
  }
});

// node_modules/kafkajs/src/producer/partitioners/index.js
var require_partitioners = __commonJS({
  "node_modules/kafkajs/src/producer/partitioners/index.js"(exports, module2) {
    var DefaultPartitioner = require_default();
    var LegacyPartitioner = require_legacy();
    module2.exports = {
      DefaultPartitioner,
      LegacyPartitioner,
      JavaCompatiblePartitioner: DefaultPartitioner
    };
  }
});

// node_modules/kafkajs/src/producer/eosManager/transactionStates.js
var require_transactionStates = __commonJS({
  "node_modules/kafkajs/src/producer/eosManager/transactionStates.js"(exports, module2) {
    module2.exports = {
      UNINITIALIZED: "UNINITIALIZED",
      READY: "READY",
      TRANSACTING: "TRANSACTING",
      COMMITTING: "COMMITTING",
      ABORTING: "ABORTING"
    };
  }
});

// node_modules/kafkajs/src/producer/eosManager/transactionStateMachine.js
var require_transactionStateMachine = __commonJS({
  "node_modules/kafkajs/src/producer/eosManager/transactionStateMachine.js"(exports, module2) {
    var { EventEmitter } = require("events");
    var { KafkaJSNonRetriableError } = require_errors();
    var STATES = require_transactionStates();
    var VALID_STATE_TRANSITIONS = {
      [STATES.UNINITIALIZED]: [STATES.READY],
      [STATES.READY]: [STATES.READY, STATES.TRANSACTING],
      [STATES.TRANSACTING]: [STATES.COMMITTING, STATES.ABORTING],
      [STATES.COMMITTING]: [STATES.READY],
      [STATES.ABORTING]: [STATES.READY]
    };
    module2.exports = ({ logger, initialState = STATES.UNINITIALIZED }) => {
      let currentState = initialState;
      const guard = (object, method, { legalStates, async: isAsync = true }) => {
        if (!object[method]) {
          throw new KafkaJSNonRetriableError(`Cannot add guard on missing method "${method}"`);
        }
        return (...args) => {
          const fn = object[method];
          if (!legalStates.includes(currentState)) {
            const error = new KafkaJSNonRetriableError(`Transaction state exception: Cannot call "${method}" in state "${currentState}"`);
            if (isAsync) {
              return Promise.reject(error);
            } else {
              throw error;
            }
          }
          return fn.apply(object, args);
        };
      };
      const stateMachine = Object.assign(new EventEmitter(), {
        createGuarded(object, methodStateMapping) {
          const guardedMethods = Object.keys(methodStateMapping).reduce((guards, method) => {
            guards[method] = guard(object, method, methodStateMapping[method]);
            return guards;
          }, {});
          return __spreadValues(__spreadValues({}, object), guardedMethods);
        },
        transitionTo(state) {
          logger.debug(`Transaction state transition ${currentState} --> ${state}`);
          if (!VALID_STATE_TRANSITIONS[currentState].includes(state)) {
            throw new KafkaJSNonRetriableError(`Transaction state exception: Invalid transition ${currentState} --> ${state}`);
          }
          stateMachine.emit("transition", { to: state, from: currentState });
          currentState = state;
        },
        state() {
          return currentState;
        }
      });
      return stateMachine;
    };
  }
});

// node_modules/kafkajs/src/producer/eosManager/index.js
var require_eosManager = __commonJS({
  "node_modules/kafkajs/src/producer/eosManager/index.js"(exports, module2) {
    var createRetry = require_retry();
    var Lock = require_lock();
    var { KafkaJSNonRetriableError } = require_errors();
    var COORDINATOR_TYPES = require_coordinatorTypes();
    var createStateMachine = require_transactionStateMachine();
    var { INT_32_MAX_VALUE } = require_constants();
    var assert = require("assert");
    var STATES = require_transactionStates();
    var NO_PRODUCER_ID = -1;
    var SEQUENCE_START = 0;
    var INIT_PRODUCER_RETRIABLE_PROTOCOL_ERRORS = [
      "NOT_COORDINATOR_FOR_GROUP",
      "GROUP_COORDINATOR_NOT_AVAILABLE",
      "GROUP_LOAD_IN_PROGRESS",
      "CONCURRENT_TRANSACTIONS"
    ];
    var COMMIT_RETRIABLE_PROTOCOL_ERRORS = [
      "UNKNOWN_TOPIC_OR_PARTITION",
      "COORDINATOR_LOAD_IN_PROGRESS"
    ];
    var COMMIT_STALE_COORDINATOR_PROTOCOL_ERRORS = ["COORDINATOR_NOT_AVAILABLE", "NOT_COORDINATOR"];
    module2.exports = ({
      logger,
      cluster,
      transactionTimeout = 6e4,
      transactional,
      transactionalId
    }) => {
      if (transactional && !transactionalId) {
        throw new KafkaJSNonRetriableError("Cannot manage transactions without a transactionalId");
      }
      const retrier = createRetry(cluster.retry);
      let producerId = NO_PRODUCER_ID;
      let producerEpoch = 0;
      let producerSequence = {};
      let brokerMutexLocks = {};
      let transactionTopicPartitions = {};
      const stateMachine = createStateMachine({ logger });
      stateMachine.on("transition", ({ to }) => {
        if (to === STATES.READY) {
          transactionTopicPartitions = {};
        }
      });
      const findTransactionCoordinator = () => {
        return cluster.findGroupCoordinator({
          groupId: transactionalId,
          coordinatorType: COORDINATOR_TYPES.TRANSACTION
        });
      };
      const transactionalGuard = () => {
        if (!transactional) {
          throw new KafkaJSNonRetriableError("Method unavailable if non-transactional");
        }
      };
      const eosManager = stateMachine.createGuarded({
        getProducerId() {
          return producerId;
        },
        getProducerEpoch() {
          return producerEpoch;
        },
        getTransactionalId() {
          return transactionalId;
        },
        async initProducerId() {
          return retrier(async (bail, retryCount, retryTime) => {
            try {
              await cluster.refreshMetadataIfNecessary();
              const broker = await (transactional ? findTransactionCoordinator() : cluster.findControllerBroker());
              const result = await broker.initProducerId({
                transactionalId: transactional ? transactionalId : void 0,
                transactionTimeout
              });
              stateMachine.transitionTo(STATES.READY);
              producerId = result.producerId;
              producerEpoch = result.producerEpoch;
              producerSequence = {};
              brokerMutexLocks = {};
              logger.debug("Initialized producer id & epoch", { producerId, producerEpoch });
            } catch (e) {
              if (INIT_PRODUCER_RETRIABLE_PROTOCOL_ERRORS.includes(e.type)) {
                if (e.type === "CONCURRENT_TRANSACTIONS") {
                  logger.debug("There is an ongoing transaction on this transactionId, retrying", {
                    error: e.message,
                    stack: e.stack,
                    transactionalId,
                    retryCount,
                    retryTime
                  });
                }
                throw e;
              }
              bail(e);
            }
          });
        },
        getSequence(topic, partition) {
          if (!eosManager.isInitialized()) {
            return SEQUENCE_START;
          }
          producerSequence[topic] = producerSequence[topic] || {};
          producerSequence[topic][partition] = producerSequence[topic][partition] || SEQUENCE_START;
          return producerSequence[topic][partition];
        },
        updateSequence(topic, partition, increment) {
          if (!eosManager.isInitialized()) {
            return;
          }
          const previous = eosManager.getSequence(topic, partition);
          let sequence = previous + increment;
          if (sequence >= INT_32_MAX_VALUE) {
            logger.debug(`Sequence for ${topic} ${partition} exceeds max value (${sequence}). Rotating to 0.`);
            sequence = 0;
          }
          producerSequence[topic][partition] = sequence;
        },
        beginTransaction() {
          transactionalGuard();
          stateMachine.transitionTo(STATES.TRANSACTING);
        },
        async addPartitionsToTransaction(topicData) {
          transactionalGuard();
          const newTopicPartitions = {};
          topicData.forEach(({ topic, partitions }) => {
            transactionTopicPartitions[topic] = transactionTopicPartitions[topic] || {};
            partitions.forEach(({ partition }) => {
              if (!transactionTopicPartitions[topic][partition]) {
                newTopicPartitions[topic] = newTopicPartitions[topic] || [];
                newTopicPartitions[topic].push(partition);
              }
            });
          });
          const topics = Object.keys(newTopicPartitions).map((topic) => ({
            topic,
            partitions: newTopicPartitions[topic]
          }));
          if (topics.length) {
            const broker = await findTransactionCoordinator();
            await broker.addPartitionsToTxn({ transactionalId, producerId, producerEpoch, topics });
          }
          topics.forEach(({ topic, partitions }) => {
            partitions.forEach((partition) => {
              transactionTopicPartitions[topic][partition] = true;
            });
          });
        },
        async commit() {
          transactionalGuard();
          stateMachine.transitionTo(STATES.COMMITTING);
          const broker = await findTransactionCoordinator();
          await broker.endTxn({
            producerId,
            producerEpoch,
            transactionalId,
            transactionResult: true
          });
          stateMachine.transitionTo(STATES.READY);
        },
        async abort() {
          transactionalGuard();
          stateMachine.transitionTo(STATES.ABORTING);
          const broker = await findTransactionCoordinator();
          await broker.endTxn({
            producerId,
            producerEpoch,
            transactionalId,
            transactionResult: false
          });
          stateMachine.transitionTo(STATES.READY);
        },
        isInitialized() {
          return producerId !== NO_PRODUCER_ID;
        },
        isTransactional() {
          return transactional;
        },
        isInTransaction() {
          return stateMachine.state() === STATES.TRANSACTING;
        },
        async acquireBrokerLock(broker) {
          if (this.isInitialized()) {
            brokerMutexLocks[broker.nodeId] = brokerMutexLocks[broker.nodeId] || new Lock({ timeout: 65535 });
            await brokerMutexLocks[broker.nodeId].acquire();
          }
        },
        releaseBrokerLock(broker) {
          if (this.isInitialized())
            brokerMutexLocks[broker.nodeId].release();
        },
        async sendOffsets({ consumerGroupId, topics }) {
          assert(consumerGroupId, "Missing consumerGroupId");
          assert(topics, "Missing offset topics");
          const transactionCoordinator = await findTransactionCoordinator();
          await transactionCoordinator.addOffsetsToTxn({
            transactionalId,
            producerId,
            producerEpoch,
            groupId: consumerGroupId
          });
          let groupCoordinator = await cluster.findGroupCoordinator({
            groupId: consumerGroupId,
            coordinatorType: COORDINATOR_TYPES.GROUP
          });
          return retrier(async (bail, retryCount, retryTime) => {
            try {
              await groupCoordinator.txnOffsetCommit({
                transactionalId,
                producerId,
                producerEpoch,
                groupId: consumerGroupId,
                topics
              });
            } catch (e) {
              if (COMMIT_RETRIABLE_PROTOCOL_ERRORS.includes(e.type)) {
                logger.debug("Group coordinator is not ready yet, retrying", {
                  error: e.message,
                  stack: e.stack,
                  transactionalId,
                  retryCount,
                  retryTime
                });
                throw e;
              }
              if (COMMIT_STALE_COORDINATOR_PROTOCOL_ERRORS.includes(e.type) || e.code === "ECONNREFUSED") {
                logger.debug("Invalid group coordinator, finding new group coordinator and retrying", {
                  error: e.message,
                  stack: e.stack,
                  transactionalId,
                  retryCount,
                  retryTime
                });
                groupCoordinator = await cluster.findGroupCoordinator({
                  groupId: consumerGroupId,
                  coordinatorType: COORDINATOR_TYPES.GROUP
                });
                throw e;
              }
              bail(e);
            }
          });
        }
      }, {
        initProducerId: { legalStates: [STATES.UNINITIALIZED, STATES.READY] },
        beginTransaction: { legalStates: [STATES.READY], async: false },
        addPartitionsToTransaction: { legalStates: [STATES.TRANSACTING] },
        sendOffsets: { legalStates: [STATES.TRANSACTING] },
        commit: { legalStates: [STATES.TRANSACTING] },
        abort: { legalStates: [STATES.TRANSACTING] }
      });
      return eosManager;
    };
  }
});

// node_modules/kafkajs/src/producer/groupMessagesPerPartition.js
var require_groupMessagesPerPartition = __commonJS({
  "node_modules/kafkajs/src/producer/groupMessagesPerPartition.js"(exports, module2) {
    module2.exports = ({ topic, partitionMetadata, messages, partitioner }) => {
      if (partitionMetadata.length === 0) {
        return {};
      }
      return messages.reduce((result, message) => {
        const partition = partitioner({ topic, partitionMetadata, message });
        const current = result[partition] || [];
        return Object.assign(result, { [partition]: [...current, message] });
      }, {});
    };
  }
});

// node_modules/kafkajs/src/producer/createTopicData.js
var require_createTopicData = __commonJS({
  "node_modules/kafkajs/src/producer/createTopicData.js"(exports, module2) {
    module2.exports = (topicDataForBroker) => {
      return topicDataForBroker.map(({ topic, partitions, messagesPerPartition, sequencePerPartition }) => ({
        topic,
        partitions: partitions.map((partition) => ({
          partition,
          messages: messagesPerPartition[partition]
        }))
      }));
    };
  }
});

// node_modules/kafkajs/src/producer/responseSerializer.js
var require_responseSerializer = __commonJS({
  "node_modules/kafkajs/src/producer/responseSerializer.js"(exports, module2) {
    module2.exports = ({ topics }) => topics.flatMap(({ topicName: topicName2, partitions }) => partitions.map((partition) => __spreadValues({ topicName: topicName2 }, partition)));
  }
});

// node_modules/kafkajs/src/producer/sendMessages.js
var require_sendMessages = __commonJS({
  "node_modules/kafkajs/src/producer/sendMessages.js"(exports, module2) {
    var { KafkaJSMetadataNotLoaded } = require_errors();
    var { staleMetadata } = require_error();
    var groupMessagesPerPartition = require_groupMessagesPerPartition();
    var createTopicData = require_createTopicData();
    var responseSerializer = require_responseSerializer();
    var { keys } = Object;
    module2.exports = ({ logger, cluster, partitioner, eosManager, retrier }) => {
      return async ({ acks, timeout, compression, topicMessages }) => {
        const responsePerBroker = /* @__PURE__ */ new Map();
        const createProducerRequests = async (responsePerBroker2) => {
          const topicMetadata = /* @__PURE__ */ new Map();
          await cluster.refreshMetadataIfNecessary();
          for (const { topic, messages } of topicMessages) {
            const partitionMetadata = cluster.findTopicPartitionMetadata(topic);
            if (partitionMetadata.length === 0) {
              logger.debug("Producing to topic without metadata", {
                topic,
                targetTopics: Array.from(cluster.targetTopics)
              });
              throw new KafkaJSMetadataNotLoaded("Producing to topic without metadata");
            }
            const messagesPerPartition = groupMessagesPerPartition({
              topic,
              partitionMetadata,
              messages,
              partitioner
            });
            const partitions = keys(messagesPerPartition);
            const partitionsPerLeader = cluster.findLeaderForPartitions(topic, partitions);
            const leaders = keys(partitionsPerLeader);
            topicMetadata.set(topic, {
              partitionsPerLeader,
              messagesPerPartition
            });
            for (const nodeId of leaders) {
              const broker = await cluster.findBroker({ nodeId });
              if (!responsePerBroker2.has(broker)) {
                responsePerBroker2.set(broker, null);
              }
            }
          }
          const brokers = Array.from(responsePerBroker2.keys());
          const brokersWithoutResponse = brokers.filter((broker) => !responsePerBroker2.get(broker));
          return brokersWithoutResponse.map(async (broker) => {
            const entries = Array.from(topicMetadata.entries());
            const topicDataForBroker = entries.filter(([_, { partitionsPerLeader }]) => !!partitionsPerLeader[broker.nodeId]).map(([topic, { partitionsPerLeader, messagesPerPartition, sequencePerPartition }]) => ({
              topic,
              partitions: partitionsPerLeader[broker.nodeId],
              messagesPerPartition
            }));
            const topicData = createTopicData(topicDataForBroker);
            await eosManager.acquireBrokerLock(broker);
            try {
              if (eosManager.isTransactional()) {
                await eosManager.addPartitionsToTransaction(topicData);
              }
              topicData.forEach(({ topic, partitions }) => {
                partitions.forEach((entry) => {
                  entry["firstSequence"] = eosManager.getSequence(topic, entry.partition);
                  eosManager.updateSequence(topic, entry.partition, entry.messages.length);
                });
              });
              let response;
              try {
                response = await broker.produce({
                  transactionalId: eosManager.isTransactional() ? eosManager.getTransactionalId() : void 0,
                  producerId: eosManager.getProducerId(),
                  producerEpoch: eosManager.getProducerEpoch(),
                  acks,
                  timeout,
                  compression,
                  topicData
                });
              } catch (e) {
                topicData.forEach(({ topic, partitions }) => {
                  partitions.forEach((entry) => {
                    eosManager.updateSequence(topic, entry.partition, -entry.messages.length);
                  });
                });
                throw e;
              }
              const expectResponse = acks !== 0;
              const formattedResponse = expectResponse ? responseSerializer(response) : [];
              responsePerBroker2.set(broker, formattedResponse);
            } catch (e) {
              responsePerBroker2.delete(broker);
              throw e;
            } finally {
              await eosManager.releaseBrokerLock(broker);
            }
          });
        };
        return retrier(async (bail, retryCount, retryTime) => {
          const topics = topicMessages.map(({ topic }) => topic);
          await cluster.addMultipleTargetTopics(topics);
          try {
            const requests = await createProducerRequests(responsePerBroker);
            await Promise.all(requests);
            return Array.from(responsePerBroker.values()).flat();
          } catch (e) {
            if (e.name === "KafkaJSConnectionClosedError") {
              cluster.removeBroker({ host: e.host, port: e.port });
            }
            if (!cluster.isConnected()) {
              logger.debug(`Cluster has disconnected, reconnecting: ${e.message}`, {
                retryCount,
                retryTime
              });
              await cluster.connect();
              await cluster.refreshMetadata();
              throw e;
            }
            if (staleMetadata(e) || e.name === "KafkaJSMetadataNotLoaded" || e.name === "KafkaJSConnectionError" || e.name === "KafkaJSConnectionClosedError" || e.name === "KafkaJSProtocolError" && e.retriable) {
              logger.error(`Failed to send messages: ${e.message}`, { retryCount, retryTime });
              await cluster.refreshMetadata();
              throw e;
            }
            logger.error(`${e.message}`, { retryCount, retryTime });
            if (e.retriable)
              throw e;
            bail(e);
          }
        });
      };
    };
  }
});

// node_modules/kafkajs/src/producer/messageProducer.js
var require_messageProducer = __commonJS({
  "node_modules/kafkajs/src/producer/messageProducer.js"(exports, module2) {
    var createSendMessages = require_sendMessages();
    var { KafkaJSError, KafkaJSNonRetriableError } = require_errors();
    var { CONNECTION_STATUS } = require_connectionStatus();
    module2.exports = ({
      logger,
      cluster,
      partitioner,
      eosManager,
      idempotent,
      retrier,
      getConnectionStatus
    }) => {
      const sendMessages = createSendMessages({
        logger,
        cluster,
        retrier,
        partitioner,
        eosManager
      });
      const validateConnectionStatus = () => {
        const connectionStatus = getConnectionStatus();
        switch (connectionStatus) {
          case CONNECTION_STATUS.DISCONNECTING:
            throw new KafkaJSNonRetriableError(`The producer is disconnecting; therefore, it can't safely accept messages anymore`);
          case CONNECTION_STATUS.DISCONNECTED:
            throw new KafkaJSError("The producer is disconnected");
        }
      };
      const sendBatch = async ({ acks = -1, timeout, compression, topicMessages = [] }) => {
        if (topicMessages.some(({ topic }) => !topic)) {
          throw new KafkaJSNonRetriableError(`Invalid topic`);
        }
        if (idempotent && acks !== -1) {
          throw new KafkaJSNonRetriableError(`Not requiring ack for all messages invalidates the idempotent producer's EoS guarantees`);
        }
        for (const { topic, messages } of topicMessages) {
          if (!messages) {
            throw new KafkaJSNonRetriableError(`Invalid messages array [${messages}] for topic "${topic}"`);
          }
          const messageWithoutValue = messages.find((message) => message.value === void 0);
          if (messageWithoutValue) {
            throw new KafkaJSNonRetriableError(`Invalid message without value for topic "${topic}": ${JSON.stringify(messageWithoutValue)}`);
          }
        }
        validateConnectionStatus();
        const mergedTopicMessages = topicMessages.reduce((merged, { topic, messages }) => {
          const index = merged.findIndex(({ topic: mergedTopic }) => topic === mergedTopic);
          if (index === -1) {
            merged.push({ topic, messages });
          } else {
            merged[index].messages = [...merged[index].messages, ...messages];
          }
          return merged;
        }, []);
        return await sendMessages({
          acks,
          timeout,
          compression,
          topicMessages: mergedTopicMessages
        });
      };
      const send = async ({ acks, timeout, compression, topic, messages }) => {
        const topicMessage = { topic, messages };
        return sendBatch({
          acks,
          timeout,
          compression,
          topicMessages: [topicMessage]
        });
      };
      return {
        send,
        sendBatch
      };
    };
  }
});

// node_modules/kafkajs/src/utils/swapObject.js
var require_swapObject = __commonJS({
  "node_modules/kafkajs/src/utils/swapObject.js"(exports, module2) {
    var { keys } = Object;
    module2.exports = (object) => keys(object).reduce((result, key) => __spreadProps(__spreadValues({}, result), { [object[key]]: key }), {});
  }
});

// node_modules/kafkajs/src/producer/instrumentationEvents.js
var require_instrumentationEvents2 = __commonJS({
  "node_modules/kafkajs/src/producer/instrumentationEvents.js"(exports, module2) {
    var swapObject = require_swapObject();
    var networkEvents = require_instrumentationEvents();
    var InstrumentationEventType = require_eventType();
    var producerType = InstrumentationEventType("producer");
    var events = {
      CONNECT: producerType("connect"),
      DISCONNECT: producerType("disconnect"),
      REQUEST: producerType(networkEvents.NETWORK_REQUEST),
      REQUEST_TIMEOUT: producerType(networkEvents.NETWORK_REQUEST_TIMEOUT),
      REQUEST_QUEUE_SIZE: producerType(networkEvents.NETWORK_REQUEST_QUEUE_SIZE)
    };
    var wrappedEvents = {
      [events.REQUEST]: networkEvents.NETWORK_REQUEST,
      [events.REQUEST_TIMEOUT]: networkEvents.NETWORK_REQUEST_TIMEOUT,
      [events.REQUEST_QUEUE_SIZE]: networkEvents.NETWORK_REQUEST_QUEUE_SIZE
    };
    var reversedWrappedEvents = swapObject(wrappedEvents);
    var unwrap = (eventName) => wrappedEvents[eventName] || eventName;
    var wrap = (eventName) => reversedWrappedEvents[eventName] || eventName;
    module2.exports = {
      events,
      wrap,
      unwrap
    };
  }
});

// node_modules/kafkajs/src/producer/index.js
var require_producer = __commonJS({
  "node_modules/kafkajs/src/producer/index.js"(exports, module2) {
    var createRetry = require_retry();
    var { CONNECTION_STATUS } = require_connectionStatus();
    var { DefaultPartitioner } = require_partitioners();
    var InstrumentationEventEmitter = require_emitter();
    var createEosManager = require_eosManager();
    var createMessageProducer = require_messageProducer();
    var { events, wrap: wrapEvent, unwrap: unwrapEvent } = require_instrumentationEvents2();
    var { KafkaJSNonRetriableError } = require_errors();
    var { values, keys } = Object;
    var eventNames = values(events);
    var eventKeys = keys(events).map((key) => `producer.events.${key}`).join(", ");
    var { CONNECT, DISCONNECT } = events;
    module2.exports = ({
      cluster,
      logger: rootLogger,
      createPartitioner = DefaultPartitioner,
      retry,
      idempotent = false,
      transactionalId,
      transactionTimeout,
      instrumentationEmitter: rootInstrumentationEmitter
    }) => {
      let connectionStatus = CONNECTION_STATUS.DISCONNECTED;
      retry = retry || { retries: idempotent ? Number.MAX_SAFE_INTEGER : 5 };
      if (idempotent && retry.retries < 1) {
        throw new KafkaJSNonRetriableError("Idempotent producer must allow retries to protect against transient errors");
      }
      const logger = rootLogger.namespace("Producer");
      if (idempotent && retry.retries < Number.MAX_SAFE_INTEGER) {
        logger.warn("Limiting retries for the idempotent producer may invalidate EoS guarantees");
      }
      const partitioner = createPartitioner();
      const retrier = createRetry(Object.assign({}, cluster.retry, retry));
      const instrumentationEmitter = rootInstrumentationEmitter || new InstrumentationEventEmitter();
      const idempotentEosManager = createEosManager({
        logger,
        cluster,
        transactionTimeout,
        transactional: false,
        transactionalId
      });
      const { send, sendBatch } = createMessageProducer({
        logger,
        cluster,
        partitioner,
        eosManager: idempotentEosManager,
        idempotent,
        retrier,
        getConnectionStatus: () => connectionStatus
      });
      let transactionalEosManager;
      const on = (eventName, listener) => {
        if (!eventNames.includes(eventName)) {
          throw new KafkaJSNonRetriableError(`Event name should be one of ${eventKeys}`);
        }
        return instrumentationEmitter.addListener(unwrapEvent(eventName), (event) => {
          event.type = wrapEvent(event.type);
          Promise.resolve(listener(event)).catch((e) => {
            logger.error(`Failed to execute listener: ${e.message}`, {
              eventName,
              stack: e.stack
            });
          });
        });
      };
      const transaction = async () => {
        if (!transactionalId) {
          throw new KafkaJSNonRetriableError("Must provide transactional id for transactional producer");
        }
        let transactionDidEnd = false;
        transactionalEosManager = transactionalEosManager || createEosManager({
          logger,
          cluster,
          transactionTimeout,
          transactional: true,
          transactionalId
        });
        if (transactionalEosManager.isInTransaction()) {
          throw new KafkaJSNonRetriableError("There is already an ongoing transaction for this producer. Please end the transaction before beginning another.");
        }
        if (!transactionalEosManager.isInitialized()) {
          await transactionalEosManager.initProducerId();
        }
        transactionalEosManager.beginTransaction();
        const { send: sendTxn, sendBatch: sendBatchTxn } = createMessageProducer({
          logger,
          cluster,
          partitioner,
          retrier,
          eosManager: transactionalEosManager,
          idempotent: true,
          getConnectionStatus: () => connectionStatus
        });
        const isActive = () => transactionalEosManager.isInTransaction() && !transactionDidEnd;
        const transactionGuard = (fn) => (...args) => {
          if (!isActive()) {
            return Promise.reject(new KafkaJSNonRetriableError("Cannot continue to use transaction once ended"));
          }
          return fn(...args);
        };
        return {
          sendBatch: transactionGuard(sendBatchTxn),
          send: transactionGuard(sendTxn),
          abort: transactionGuard(async () => {
            await transactionalEosManager.abort();
            transactionDidEnd = true;
          }),
          commit: transactionGuard(async () => {
            await transactionalEosManager.commit();
            transactionDidEnd = true;
          }),
          sendOffsets: transactionGuard(async ({ consumerGroupId, topics }) => {
            await transactionalEosManager.sendOffsets({ consumerGroupId, topics });
            for (const topicOffsets of topics) {
              const { topic, partitions } = topicOffsets;
              for (const { partition, offset } of partitions) {
                cluster.markOffsetAsCommitted({
                  groupId: consumerGroupId,
                  topic,
                  partition,
                  offset
                });
              }
            }
          }),
          isActive
        };
      };
      const getLogger = () => logger;
      return {
        connect: async () => {
          await cluster.connect();
          connectionStatus = CONNECTION_STATUS.CONNECTED;
          instrumentationEmitter.emit(CONNECT);
          if (idempotent && !idempotentEosManager.isInitialized()) {
            await idempotentEosManager.initProducerId();
          }
        },
        disconnect: async () => {
          connectionStatus = CONNECTION_STATUS.DISCONNECTING;
          await cluster.disconnect();
          connectionStatus = CONNECTION_STATUS.DISCONNECTED;
          instrumentationEmitter.emit(DISCONNECT);
        },
        isIdempotent: () => {
          return idempotent;
        },
        events,
        on,
        send,
        sendBatch,
        transaction,
        logger: getLogger
      };
    };
  }
});

// node_modules/kafkajs/src/utils/sleep.js
var require_sleep = __commonJS({
  "node_modules/kafkajs/src/utils/sleep.js"(exports, module2) {
    module2.exports = (timeInMs) => new Promise((resolve) => {
      setTimeout(resolve, timeInMs);
    });
  }
});

// node_modules/kafkajs/src/consumer/offsetManager/isInvalidOffset.js
var require_isInvalidOffset = __commonJS({
  "node_modules/kafkajs/src/consumer/offsetManager/isInvalidOffset.js"(exports, module2) {
    var Long = require_long();
    module2.exports = (offset) => !offset && offset !== 0 || Long.fromValue(offset).isNegative();
  }
});

// node_modules/kafkajs/src/consumer/offsetManager/initializeConsumerOffsets.js
var require_initializeConsumerOffsets = __commonJS({
  "node_modules/kafkajs/src/consumer/offsetManager/initializeConsumerOffsets.js"(exports, module2) {
    var isInvalidOffset = require_isInvalidOffset();
    var { keys, assign } = Object;
    var indexPartitions = (obj, { partition, offset }) => assign(obj, { [partition]: offset });
    var indexTopics = (obj, { topic, partitions }) => assign(obj, { [topic]: partitions.reduce(indexPartitions, {}) });
    module2.exports = (consumerOffsets, topicOffsets) => {
      const indexedConsumerOffsets = consumerOffsets.reduce(indexTopics, {});
      const indexedTopicOffsets = topicOffsets.reduce(indexTopics, {});
      return keys(indexedConsumerOffsets).map((topic) => {
        const partitions = indexedConsumerOffsets[topic];
        return {
          topic,
          partitions: keys(partitions).map((partition) => {
            const offset = partitions[partition];
            const resolvedOffset = isInvalidOffset(offset) ? indexedTopicOffsets[topic][partition] : offset;
            return { partition: Number(partition), offset: resolvedOffset };
          })
        };
      });
    };
  }
});

// node_modules/kafkajs/src/consumer/instrumentationEvents.js
var require_instrumentationEvents3 = __commonJS({
  "node_modules/kafkajs/src/consumer/instrumentationEvents.js"(exports, module2) {
    var swapObject = require_swapObject();
    var InstrumentationEventType = require_eventType();
    var networkEvents = require_instrumentationEvents();
    var consumerType = InstrumentationEventType("consumer");
    var events = {
      HEARTBEAT: consumerType("heartbeat"),
      COMMIT_OFFSETS: consumerType("commit_offsets"),
      GROUP_JOIN: consumerType("group_join"),
      FETCH: consumerType("fetch"),
      FETCH_START: consumerType("fetch_start"),
      START_BATCH_PROCESS: consumerType("start_batch_process"),
      END_BATCH_PROCESS: consumerType("end_batch_process"),
      CONNECT: consumerType("connect"),
      DISCONNECT: consumerType("disconnect"),
      STOP: consumerType("stop"),
      CRASH: consumerType("crash"),
      REBALANCING: consumerType("rebalancing"),
      RECEIVED_UNSUBSCRIBED_TOPICS: consumerType("received_unsubscribed_topics"),
      REQUEST: consumerType(networkEvents.NETWORK_REQUEST),
      REQUEST_TIMEOUT: consumerType(networkEvents.NETWORK_REQUEST_TIMEOUT),
      REQUEST_QUEUE_SIZE: consumerType(networkEvents.NETWORK_REQUEST_QUEUE_SIZE)
    };
    var wrappedEvents = {
      [events.REQUEST]: networkEvents.NETWORK_REQUEST,
      [events.REQUEST_TIMEOUT]: networkEvents.NETWORK_REQUEST_TIMEOUT,
      [events.REQUEST_QUEUE_SIZE]: networkEvents.NETWORK_REQUEST_QUEUE_SIZE
    };
    var reversedWrappedEvents = swapObject(wrappedEvents);
    var unwrap = (eventName) => wrappedEvents[eventName] || eventName;
    var wrap = (eventName) => reversedWrappedEvents[eventName] || eventName;
    module2.exports = {
      events,
      wrap,
      unwrap
    };
  }
});

// node_modules/kafkajs/src/consumer/offsetManager/index.js
var require_offsetManager = __commonJS({
  "node_modules/kafkajs/src/consumer/offsetManager/index.js"(exports, module2) {
    var Long = require_long();
    var isInvalidOffset = require_isInvalidOffset();
    var initializeConsumerOffsets = require_initializeConsumerOffsets();
    var {
      events: { COMMIT_OFFSETS }
    } = require_instrumentationEvents3();
    var { keys, assign } = Object;
    var indexTopics = (topics) => topics.reduce((obj, topic) => assign(obj, { [topic]: {} }), {});
    var PRIVATE = {
      COMMITTED_OFFSETS: Symbol("private:OffsetManager:committedOffsets")
    };
    module2.exports = class OffsetManager {
      constructor({
        cluster,
        coordinator,
        memberAssignment,
        autoCommit,
        autoCommitInterval,
        autoCommitThreshold,
        topicConfigurations,
        instrumentationEmitter,
        groupId,
        generationId,
        memberId
      }) {
        this.cluster = cluster;
        this.coordinator = coordinator;
        this.memberAssignment = memberAssignment;
        this.topicConfigurations = topicConfigurations;
        this.instrumentationEmitter = instrumentationEmitter;
        this.groupId = groupId;
        this.generationId = generationId;
        this.memberId = memberId;
        this.autoCommit = autoCommit;
        this.autoCommitInterval = autoCommitInterval;
        this.autoCommitThreshold = autoCommitThreshold;
        this.lastCommit = Date.now();
        this.topics = keys(memberAssignment);
        this.clearAllOffsets();
      }
      nextOffset(topic, partition) {
        if (!this.resolvedOffsets[topic][partition]) {
          this.resolvedOffsets[topic][partition] = this.committedOffsets()[topic][partition];
        }
        let offset = this.resolvedOffsets[topic][partition];
        if (isInvalidOffset(offset)) {
          offset = "0";
        }
        return Long.fromValue(offset);
      }
      async getCoordinator() {
        if (!this.coordinator.isConnected()) {
          this.coordinator = await this.cluster.findBroker(this.coordinator);
        }
        return this.coordinator;
      }
      resetOffset({ topic, partition }) {
        this.resolvedOffsets[topic][partition] = this.committedOffsets()[topic][partition];
      }
      resolveOffset({ topic, partition, offset }) {
        this.resolvedOffsets[topic][partition] = Long.fromValue(offset).add(1).toString();
      }
      countResolvedOffsets() {
        const committedOffsets = this.committedOffsets();
        const subtractOffsets = (resolvedOffset, committedOffset) => {
          const resolvedOffsetLong = Long.fromValue(resolvedOffset);
          return isInvalidOffset(committedOffset) ? resolvedOffsetLong : resolvedOffsetLong.subtract(Long.fromValue(committedOffset));
        };
        const subtractPartitionOffsets = (resolvedTopicOffsets, committedTopicOffsets) => keys(resolvedTopicOffsets).map((partition) => subtractOffsets(resolvedTopicOffsets[partition], committedTopicOffsets[partition]));
        const subtractTopicOffsets = (topic) => subtractPartitionOffsets(this.resolvedOffsets[topic], committedOffsets[topic]);
        const offsetsDiff = this.topics.flatMap(subtractTopicOffsets);
        return offsetsDiff.reduce((sum, offset) => sum.add(offset), Long.fromValue(0));
      }
      async setDefaultOffset({ topic, partition }) {
        const { groupId, generationId, memberId } = this;
        const defaultOffset = this.cluster.defaultOffset(this.topicConfigurations[topic]);
        const coordinator = await this.getCoordinator();
        await coordinator.offsetCommit({
          groupId,
          memberId,
          groupGenerationId: generationId,
          topics: [
            {
              topic,
              partitions: [{ partition, offset: defaultOffset }]
            }
          ]
        });
        this.clearOffsets({ topic, partition });
      }
      async seek({ topic, partition, offset }) {
        if (!this.memberAssignment[topic] || !this.memberAssignment[topic].includes(partition)) {
          return;
        }
        if (!this.autoCommit) {
          this.resolveOffset({
            topic,
            partition,
            offset: Long.fromValue(offset).subtract(1).toString()
          });
          return;
        }
        const { groupId, generationId, memberId } = this;
        const coordinator = await this.getCoordinator();
        await coordinator.offsetCommit({
          groupId,
          memberId,
          groupGenerationId: generationId,
          topics: [
            {
              topic,
              partitions: [{ partition, offset }]
            }
          ]
        });
        this.clearOffsets({ topic, partition });
      }
      async commitOffsetsIfNecessary() {
        const now = Date.now();
        const timeoutReached = this.autoCommitInterval != null && now >= this.lastCommit + this.autoCommitInterval;
        const thresholdReached = this.autoCommitThreshold != null && this.countResolvedOffsets().gte(Long.fromValue(this.autoCommitThreshold));
        if (timeoutReached || thresholdReached) {
          return this.commitOffsets();
        }
      }
      uncommittedOffsets() {
        const offsets = (topic) => keys(this.resolvedOffsets[topic]);
        const emptyPartitions = ({ partitions }) => partitions.length > 0;
        const toPartitions = (topic) => (partition) => ({
          partition,
          offset: this.resolvedOffsets[topic][partition]
        });
        const changedOffsets = (topic) => ({ partition, offset }) => {
          return offset !== this.committedOffsets()[topic][partition] && Long.fromValue(offset).greaterThanOrEqual(0);
        };
        const topicsWithPartitionsToCommit = this.topics.map((topic) => ({
          topic,
          partitions: offsets(topic).map(toPartitions(topic)).filter(changedOffsets(topic))
        })).filter(emptyPartitions);
        return { topics: topicsWithPartitionsToCommit };
      }
      async commitOffsets(offsets = {}) {
        const { groupId, generationId, memberId } = this;
        const { topics = this.uncommittedOffsets().topics } = offsets;
        if (topics.length === 0) {
          this.lastCommit = Date.now();
          return;
        }
        const payload = {
          groupId,
          memberId,
          groupGenerationId: generationId,
          topics
        };
        try {
          const coordinator = await this.getCoordinator();
          await coordinator.offsetCommit(payload);
          this.instrumentationEmitter.emit(COMMIT_OFFSETS, payload);
          topics.forEach(({ topic, partitions }) => {
            const updatedOffsets = partitions.reduce((obj, { partition, offset }) => assign(obj, { [partition]: offset }), {});
            this[PRIVATE.COMMITTED_OFFSETS][topic] = assign({}, this.committedOffsets()[topic], updatedOffsets);
          });
          this.lastCommit = Date.now();
        } catch (e) {
          if (e.type === "NOT_COORDINATOR_FOR_GROUP") {
            await this.cluster.refreshMetadata();
          }
          throw e;
        }
      }
      async resolveOffsets() {
        const { groupId } = this;
        const invalidOffset = (topic) => (partition) => {
          return isInvalidOffset(this.committedOffsets()[topic][partition]);
        };
        const pendingPartitions = this.topics.map((topic) => ({
          topic,
          partitions: this.memberAssignment[topic].filter(invalidOffset(topic)).map((partition) => ({ partition }))
        })).filter((t) => t.partitions.length > 0);
        if (pendingPartitions.length === 0) {
          return;
        }
        const coordinator = await this.getCoordinator();
        const { responses: consumerOffsets } = await coordinator.offsetFetch({
          groupId,
          topics: pendingPartitions
        });
        const unresolvedPartitions = consumerOffsets.map(({ topic, partitions }) => assign({
          topic,
          partitions: partitions.filter(({ offset }) => isInvalidOffset(offset)).map(({ partition }) => assign({ partition }))
        }, this.topicConfigurations[topic]));
        const indexPartitions = (obj, { partition, offset }) => {
          return assign(obj, { [partition]: offset });
        };
        const hasUnresolvedPartitions = () => unresolvedPartitions.some((t) => t.partitions.length > 0);
        let offsets = consumerOffsets;
        if (hasUnresolvedPartitions()) {
          const topicOffsets = await this.cluster.fetchTopicsOffset(unresolvedPartitions);
          offsets = initializeConsumerOffsets(consumerOffsets, topicOffsets);
        }
        offsets.forEach(({ topic, partitions }) => {
          this.committedOffsets()[topic] = partitions.reduce(indexPartitions, __spreadValues({}, this.committedOffsets()[topic]));
        });
      }
      clearOffsets({ topic, partition }) {
        delete this.committedOffsets()[topic][partition];
        delete this.resolvedOffsets[topic][partition];
      }
      clearAllOffsets() {
        const committedOffsets = this.committedOffsets();
        for (const topic in committedOffsets) {
          delete committedOffsets[topic];
        }
        for (const topic of this.topics) {
          committedOffsets[topic] = {};
        }
        this.resolvedOffsets = indexTopics(this.topics);
      }
      committedOffsets() {
        if (!this[PRIVATE.COMMITTED_OFFSETS]) {
          this[PRIVATE.COMMITTED_OFFSETS] = this.groupId ? this.cluster.committedOffsets({ groupId: this.groupId }) : {};
        }
        return this[PRIVATE.COMMITTED_OFFSETS];
      }
    };
  }
});

// node_modules/kafkajs/src/consumer/filterAbortedMessages.js
var require_filterAbortedMessages = __commonJS({
  "node_modules/kafkajs/src/consumer/filterAbortedMessages.js"(exports, module2) {
    var Long = require_long();
    var ABORTED_MESSAGE_KEY = Buffer.from([0, 0, 0, 0]);
    var isAbortMarker = ({ key }) => {
      if (!key)
        return false;
      return Buffer.from(key).equals(ABORTED_MESSAGE_KEY);
    };
    module2.exports = ({ messages, abortedTransactions }) => {
      const currentAbortedTransactions = /* @__PURE__ */ new Map();
      if (!abortedTransactions || !abortedTransactions.length) {
        return messages;
      }
      const remainingAbortedTransactions = [...abortedTransactions];
      return messages.filter((message) => {
        if (remainingAbortedTransactions.length && Long.fromValue(message.offset).gte(remainingAbortedTransactions[0].firstOffset)) {
          const { producerId: producerId2 } = remainingAbortedTransactions.shift();
          currentAbortedTransactions.set(producerId2, true);
        }
        const { producerId, inTransaction } = message.batchContext;
        if (isAbortMarker(message)) {
          currentAbortedTransactions.delete(producerId);
        } else if (currentAbortedTransactions.has(producerId) && inTransaction) {
          return false;
        }
        return true;
      });
    };
  }
});

// node_modules/kafkajs/src/consumer/batch.js
var require_batch = __commonJS({
  "node_modules/kafkajs/src/consumer/batch.js"(exports, module2) {
    var Long = require_long();
    var filterAbortedMessages = require_filterAbortedMessages();
    module2.exports = class Batch {
      constructor(topic, fetchedOffset, partitionData) {
        this.fetchedOffset = fetchedOffset;
        const longFetchedOffset = Long.fromValue(this.fetchedOffset);
        const { abortedTransactions, messages } = partitionData;
        this.topic = topic;
        this.partition = partitionData.partition;
        this.highWatermark = partitionData.highWatermark;
        this.rawMessages = messages;
        this.messagesWithinOffset = this.rawMessages.filter((message) => Long.fromValue(message.offset).gte(longFetchedOffset));
        this.messages = filterAbortedMessages({
          messages: this.messagesWithinOffset,
          abortedTransactions
        }).filter((message) => !message.isControlRecord);
      }
      isEmpty() {
        return this.messages.length === 0;
      }
      isEmptyIncludingFiltered() {
        return this.messagesWithinOffset.length === 0;
      }
      isEmptyDueToFiltering() {
        return this.isEmpty() && this.rawMessages.length > 0;
      }
      isEmptyControlRecord() {
        return this.isEmpty() && this.messagesWithinOffset.some(({ isControlRecord }) => isControlRecord);
      }
      isEmptyDueToLogCompactedMessages() {
        const hasMessages = this.rawMessages.length > 0;
        return hasMessages && this.isEmptyIncludingFiltered();
      }
      firstOffset() {
        return this.isEmptyIncludingFiltered() ? null : this.messagesWithinOffset[0].offset;
      }
      lastOffset() {
        if (this.isEmptyDueToLogCompactedMessages()) {
          return this.fetchedOffset;
        }
        if (this.isEmptyIncludingFiltered()) {
          return Long.fromValue(this.highWatermark).add(-1).toString();
        }
        return this.messagesWithinOffset[this.messagesWithinOffset.length - 1].offset;
      }
      offsetLag() {
        const lastOffsetOfPartition = Long.fromValue(this.highWatermark).add(-1);
        const lastConsumedOffset = Long.fromValue(this.lastOffset());
        return lastOffsetOfPartition.add(lastConsumedOffset.multiply(-1)).toString();
      }
      offsetLagLow() {
        if (this.isEmptyIncludingFiltered()) {
          return "0";
        }
        const lastOffsetOfPartition = Long.fromValue(this.highWatermark).add(-1);
        const firstConsumedOffset = Long.fromValue(this.firstOffset());
        return lastOffsetOfPartition.add(firstConsumedOffset.multiply(-1)).toString();
      }
    };
  }
});

// node_modules/kafkajs/src/consumer/seekOffsets.js
var require_seekOffsets = __commonJS({
  "node_modules/kafkajs/src/consumer/seekOffsets.js"(exports, module2) {
    module2.exports = class SeekOffsets extends Map {
      getKey(topic, partition) {
        return JSON.stringify([topic, partition]);
      }
      set(topic, partition, offset) {
        const key = this.getKey(topic, partition);
        super.set(key, offset);
      }
      has(topic, partition) {
        const key = this.getKey(topic, partition);
        return super.has(key);
      }
      pop(topic, partition) {
        if (this.size === 0 || !this.has(topic, partition)) {
          return;
        }
        const key = this.getKey(topic, partition);
        const offset = this.get(key);
        this.delete(key);
        return { topic, partition, offset };
      }
    };
  }
});

// node_modules/kafkajs/src/consumer/subscriptionState.js
var require_subscriptionState = __commonJS({
  "node_modules/kafkajs/src/consumer/subscriptionState.js"(exports, module2) {
    var createState = (topic) => ({
      topic,
      paused: /* @__PURE__ */ new Set(),
      pauseAll: false,
      resumed: /* @__PURE__ */ new Set()
    });
    module2.exports = class SubscriptionState {
      constructor() {
        this.assignedPartitionsByTopic = {};
        this.subscriptionStatesByTopic = {};
      }
      assign(topicPartitions = []) {
        this.assignedPartitionsByTopic = topicPartitions.reduce((assigned, { topic, partitions = [] }) => {
          return __spreadProps(__spreadValues({}, assigned), { [topic]: { topic, partitions } });
        }, {});
      }
      pause(topicPartitions = []) {
        topicPartitions.forEach(({ topic, partitions }) => {
          const state = this.subscriptionStatesByTopic[topic] || createState(topic);
          if (typeof partitions === "undefined") {
            state.paused.clear();
            state.resumed.clear();
            state.pauseAll = true;
          } else if (Array.isArray(partitions)) {
            partitions.forEach((partition) => {
              state.paused.add(partition);
              state.resumed.delete(partition);
            });
            state.pauseAll = false;
          }
          this.subscriptionStatesByTopic[topic] = state;
        });
      }
      resume(topicPartitions = []) {
        topicPartitions.forEach(({ topic, partitions }) => {
          const state = this.subscriptionStatesByTopic[topic] || createState(topic);
          if (typeof partitions === "undefined") {
            state.paused.clear();
            state.resumed.clear();
            state.pauseAll = false;
          } else if (Array.isArray(partitions)) {
            partitions.forEach((partition) => {
              state.paused.delete(partition);
              if (state.pauseAll) {
                state.resumed.add(partition);
              }
            });
          }
          this.subscriptionStatesByTopic[topic] = state;
        });
      }
      assigned() {
        return Object.values(this.assignedPartitionsByTopic).map(({ topic, partitions }) => ({
          topic,
          partitions: partitions.sort()
        }));
      }
      active() {
        return Object.values(this.assignedPartitionsByTopic).map(({ topic, partitions }) => ({
          topic,
          partitions: partitions.filter((partition) => !this.isPaused(topic, partition)).sort()
        }));
      }
      paused() {
        return Object.values(this.assignedPartitionsByTopic).map(({ topic, partitions }) => ({
          topic,
          partitions: partitions.filter((partition) => this.isPaused(topic, partition)).sort()
        })).filter(({ partitions }) => partitions.length !== 0);
      }
      isPaused(topic, partition) {
        const state = this.subscriptionStatesByTopic[topic];
        if (!state) {
          return false;
        }
        const partitionResumed = state.resumed.has(partition);
        const partitionPaused = state.paused.has(partition);
        return state.pauseAll && !partitionResumed || partitionPaused;
      }
    };
  }
});

// node_modules/kafkajs/src/consumer/assignerProtocol.js
var require_assignerProtocol = __commonJS({
  "node_modules/kafkajs/src/consumer/assignerProtocol.js"(exports, module2) {
    var Encoder = require_encoder();
    var Decoder = require_decoder();
    var MemberMetadata = {
      encode({ version, topics, userData = Buffer.alloc(0) }) {
        return new Encoder().writeInt16(version).writeArray(topics).writeBytes(userData).buffer;
      },
      decode(buffer) {
        const decoder = new Decoder(buffer);
        return {
          version: decoder.readInt16(),
          topics: decoder.readArray((d) => d.readString()),
          userData: decoder.readBytes()
        };
      }
    };
    var MemberAssignment = {
      encode({ version, assignment, userData = Buffer.alloc(0) }) {
        return new Encoder().writeInt16(version).writeArray(Object.keys(assignment).map((topic) => new Encoder().writeString(topic).writeArray(assignment[topic]))).writeBytes(userData).buffer;
      },
      decode(buffer) {
        const decoder = new Decoder(buffer);
        const decodePartitions = (d) => d.readInt32();
        const decodeAssignment = (d) => ({
          topic: d.readString(),
          partitions: d.readArray(decodePartitions)
        });
        const indexAssignment = (obj, { topic, partitions }) => Object.assign(obj, { [topic]: partitions });
        if (!decoder.canReadInt16()) {
          return null;
        }
        return {
          version: decoder.readInt16(),
          assignment: decoder.readArray(decodeAssignment).reduce(indexAssignment, {}),
          userData: decoder.readBytes()
        };
      }
    };
    module2.exports = {
      MemberMetadata,
      MemberAssignment
    };
  }
});

// node_modules/kafkajs/src/consumer/consumerGroup.js
var require_consumerGroup = __commonJS({
  "node_modules/kafkajs/src/consumer/consumerGroup.js"(exports, module2) {
    var sleep = require_sleep();
    var websiteUrl = require_websiteUrl();
    var arrayDiff = require_arrayDiff();
    var createRetry = require_retry();
    var sharedPromiseTo = require_sharedPromiseTo();
    var OffsetManager = require_offsetManager();
    var Batch = require_batch();
    var SeekOffsets = require_seekOffsets();
    var SubscriptionState = require_subscriptionState();
    var {
      events: { GROUP_JOIN, HEARTBEAT, CONNECT, RECEIVED_UNSUBSCRIBED_TOPICS }
    } = require_instrumentationEvents3();
    var { MemberAssignment } = require_assignerProtocol();
    var {
      KafkaJSError,
      KafkaJSNonRetriableError,
      KafkaJSStaleTopicMetadataAssignment,
      isRebalancing
    } = require_errors();
    var { keys } = Object;
    var STALE_METADATA_ERRORS = [
      "LEADER_NOT_AVAILABLE",
      "NOT_LEADER_FOR_PARTITION",
      "FENCED_LEADER_EPOCH",
      "UNKNOWN_LEADER_EPOCH",
      "UNKNOWN_TOPIC_OR_PARTITION"
    ];
    var PRIVATE = {
      JOIN: Symbol("private:ConsumerGroup:join"),
      SYNC: Symbol("private:ConsumerGroup:sync"),
      SHARED_HEARTBEAT: Symbol("private:ConsumerGroup:sharedHeartbeat")
    };
    module2.exports = class ConsumerGroup {
      constructor({
        retry,
        cluster,
        groupId,
        topics,
        topicConfigurations,
        logger,
        instrumentationEmitter,
        assigners,
        sessionTimeout,
        rebalanceTimeout,
        maxBytesPerPartition,
        minBytes,
        maxBytes,
        maxWaitTimeInMs,
        autoCommit,
        autoCommitInterval,
        autoCommitThreshold,
        isolationLevel,
        rackId,
        metadataMaxAge
      }) {
        this.cluster = cluster;
        this.groupId = groupId;
        this.topics = topics;
        this.topicsSubscribed = topics;
        this.topicConfigurations = topicConfigurations;
        this.logger = logger.namespace("ConsumerGroup");
        this.instrumentationEmitter = instrumentationEmitter;
        this.retrier = createRetry(Object.assign({}, retry));
        this.assigners = assigners;
        this.sessionTimeout = sessionTimeout;
        this.rebalanceTimeout = rebalanceTimeout;
        this.maxBytesPerPartition = maxBytesPerPartition;
        this.minBytes = minBytes;
        this.maxBytes = maxBytes;
        this.maxWaitTime = maxWaitTimeInMs;
        this.autoCommit = autoCommit;
        this.autoCommitInterval = autoCommitInterval;
        this.autoCommitThreshold = autoCommitThreshold;
        this.isolationLevel = isolationLevel;
        this.rackId = rackId;
        this.metadataMaxAge = metadataMaxAge;
        this.seekOffset = new SeekOffsets();
        this.coordinator = null;
        this.generationId = null;
        this.leaderId = null;
        this.memberId = null;
        this.members = null;
        this.groupProtocol = null;
        this.partitionsPerSubscribedTopic = null;
        this.preferredReadReplicasPerTopicPartition = {};
        this.offsetManager = null;
        this.subscriptionState = new SubscriptionState();
        this.lastRequest = Date.now();
        this[PRIVATE.SHARED_HEARTBEAT] = sharedPromiseTo(async ({ interval }) => {
          const { groupId: groupId2, generationId, memberId } = this;
          const now = Date.now();
          if (memberId && now >= this.lastRequest + interval) {
            const payload = {
              groupId: groupId2,
              memberId,
              groupGenerationId: generationId
            };
            await this.coordinator.heartbeat(payload);
            this.instrumentationEmitter.emit(HEARTBEAT, payload);
            this.lastRequest = Date.now();
          }
        });
      }
      isLeader() {
        return this.leaderId && this.memberId === this.leaderId;
      }
      getNodeIds() {
        return this.cluster.getNodeIds();
      }
      async connect() {
        await this.cluster.connect();
        this.instrumentationEmitter.emit(CONNECT);
        await this.cluster.refreshMetadataIfNecessary();
      }
      async [PRIVATE.JOIN]() {
        const { groupId, sessionTimeout, rebalanceTimeout } = this;
        this.coordinator = await this.cluster.findGroupCoordinator({ groupId });
        const groupData = await this.coordinator.joinGroup({
          groupId,
          sessionTimeout,
          rebalanceTimeout,
          memberId: this.memberId || "",
          groupProtocols: this.assigners.map((assigner) => assigner.protocol({
            topics: this.topicsSubscribed
          }))
        });
        this.generationId = groupData.generationId;
        this.leaderId = groupData.leaderId;
        this.memberId = groupData.memberId;
        this.members = groupData.members;
        this.groupProtocol = groupData.groupProtocol;
      }
      async leave() {
        const { groupId, memberId } = this;
        if (memberId) {
          await this.coordinator.leaveGroup({ groupId, memberId });
          this.memberId = null;
        }
      }
      async [PRIVATE.SYNC]() {
        let assignment = [];
        const {
          groupId,
          generationId,
          memberId,
          members,
          groupProtocol,
          topics,
          topicsSubscribed,
          coordinator
        } = this;
        if (this.isLeader()) {
          this.logger.debug("Chosen as group leader", { groupId, generationId, memberId, topics });
          const assigner = this.assigners.find(({ name }) => name === groupProtocol);
          if (!assigner) {
            throw new KafkaJSNonRetriableError(`Unsupported partition assigner "${groupProtocol}", the assigner wasn't found in the assigners list`);
          }
          await this.cluster.refreshMetadata();
          assignment = await assigner.assign({ members, topics: topicsSubscribed });
          this.logger.debug("Group assignment", {
            groupId,
            generationId,
            groupProtocol,
            assignment,
            topics: topicsSubscribed
          });
        }
        this.partitionsPerSubscribedTopic = this.generatePartitionsPerSubscribedTopic();
        const { memberAssignment } = await this.coordinator.syncGroup({
          groupId,
          generationId,
          memberId,
          groupAssignment: assignment
        });
        const decodedMemberAssignment = MemberAssignment.decode(memberAssignment);
        const decodedAssignment = decodedMemberAssignment != null ? decodedMemberAssignment.assignment : {};
        this.logger.debug("Received assignment", {
          groupId,
          generationId,
          memberId,
          memberAssignment: decodedAssignment
        });
        const assignedTopics = keys(decodedAssignment);
        const topicsNotSubscribed = arrayDiff(assignedTopics, topicsSubscribed);
        if (topicsNotSubscribed.length > 0) {
          const payload = {
            groupId,
            generationId,
            memberId,
            assignedTopics,
            topicsSubscribed,
            topicsNotSubscribed
          };
          this.instrumentationEmitter.emit(RECEIVED_UNSUBSCRIBED_TOPICS, payload);
          this.logger.warn("Consumer group received unsubscribed topics", __spreadProps(__spreadValues({}, payload), {
            helpUrl: websiteUrl("docs/faq", "why-am-i-receiving-messages-for-topics-i-m-not-subscribed-to")
          }));
        }
        const safeAssignment = arrayDiff(assignedTopics, topicsNotSubscribed);
        const currentMemberAssignment = safeAssignment.map((topic) => ({
          topic,
          partitions: decodedAssignment[topic]
        }));
        for (const assignment2 of currentMemberAssignment) {
          const { topic, partitions: assignedPartitions } = assignment2;
          const knownPartitions = this.partitionsPerSubscribedTopic.get(topic);
          const isAwareOfAllAssignedPartitions = assignedPartitions.every((partition) => knownPartitions.includes(partition));
          if (!isAwareOfAllAssignedPartitions) {
            this.logger.warn("Consumer is not aware of all assigned partitions, refreshing metadata", {
              groupId,
              generationId,
              memberId,
              topic,
              knownPartitions,
              assignedPartitions
            });
            await this.cluster.refreshMetadata();
            this.partitionsPerSubscribedTopic = this.generatePartitionsPerSubscribedTopic();
            break;
          }
        }
        this.topics = currentMemberAssignment.map(({ topic }) => topic);
        this.subscriptionState.assign(currentMemberAssignment);
        this.offsetManager = new OffsetManager({
          cluster: this.cluster,
          topicConfigurations: this.topicConfigurations,
          instrumentationEmitter: this.instrumentationEmitter,
          memberAssignment: currentMemberAssignment.reduce((partitionsByTopic, { topic, partitions }) => __spreadProps(__spreadValues({}, partitionsByTopic), {
            [topic]: partitions
          }), {}),
          autoCommit: this.autoCommit,
          autoCommitInterval: this.autoCommitInterval,
          autoCommitThreshold: this.autoCommitThreshold,
          coordinator,
          groupId,
          generationId,
          memberId
        });
      }
      joinAndSync() {
        const startJoin = Date.now();
        return this.retrier(async (bail) => {
          try {
            await this[PRIVATE.JOIN]();
            await this[PRIVATE.SYNC]();
            const memberAssignment = this.assigned().reduce((result, { topic, partitions }) => __spreadProps(__spreadValues({}, result), { [topic]: partitions }), {});
            const payload = {
              groupId: this.groupId,
              memberId: this.memberId,
              leaderId: this.leaderId,
              isLeader: this.isLeader(),
              memberAssignment,
              groupProtocol: this.groupProtocol,
              duration: Date.now() - startJoin
            };
            this.instrumentationEmitter.emit(GROUP_JOIN, payload);
            this.logger.info("Consumer has joined the group", payload);
          } catch (e) {
            if (isRebalancing(e)) {
              throw new KafkaJSError(e);
            }
            if (e.type === "UNKNOWN_MEMBER_ID") {
              this.memberId = null;
              throw new KafkaJSError(e);
            }
            bail(e);
          }
        });
      }
      resetOffset({ topic, partition }) {
        this.offsetManager.resetOffset({ topic, partition });
      }
      resolveOffset({ topic, partition, offset }) {
        this.offsetManager.resolveOffset({ topic, partition, offset });
      }
      seek({ topic, partition, offset }) {
        this.seekOffset.set(topic, partition, offset);
      }
      pause(topicPartitions) {
        this.logger.info(`Pausing fetching from ${topicPartitions.length} topics`, {
          topicPartitions
        });
        this.subscriptionState.pause(topicPartitions);
      }
      resume(topicPartitions) {
        this.logger.info(`Resuming fetching from ${topicPartitions.length} topics`, {
          topicPartitions
        });
        this.subscriptionState.resume(topicPartitions);
      }
      assigned() {
        return this.subscriptionState.assigned();
      }
      paused() {
        return this.subscriptionState.paused();
      }
      async commitOffsetsIfNecessary() {
        await this.offsetManager.commitOffsetsIfNecessary();
      }
      async commitOffsets(offsets) {
        await this.offsetManager.commitOffsets(offsets);
      }
      uncommittedOffsets() {
        return this.offsetManager.uncommittedOffsets();
      }
      async heartbeat({ interval }) {
        return this[PRIVATE.SHARED_HEARTBEAT]({ interval });
      }
      async fetch(nodeId) {
        try {
          await this.cluster.refreshMetadataIfNecessary();
          this.checkForStaleAssignment();
          let topicPartitions = this.subscriptionState.assigned();
          topicPartitions = this.filterPartitionsByNode(nodeId, topicPartitions);
          await this.seekOffsets(topicPartitions);
          const committedOffsets = this.offsetManager.committedOffsets();
          const activeTopicPartitions = this.getActiveTopicPartitions();
          const requests = topicPartitions.map(({ topic, partitions }) => ({
            topic,
            partitions: partitions.filter((partition) => committedOffsets[topic][partition] != null && activeTopicPartitions[topic].has(partition)).map((partition) => ({
              partition,
              fetchOffset: this.offsetManager.nextOffset(topic, partition).toString(),
              maxBytes: this.maxBytesPerPartition
            }))
          })).filter(({ partitions }) => partitions.length);
          if (!requests.length) {
            await sleep(this.maxWaitTime);
            return [];
          }
          const broker = await this.cluster.findBroker({ nodeId });
          const { responses } = await broker.fetch({
            maxWaitTime: this.maxWaitTime,
            minBytes: this.minBytes,
            maxBytes: this.maxBytes,
            isolationLevel: this.isolationLevel,
            topics: requests,
            rackId: this.rackId
          });
          return responses.flatMap(({ topicName: topicName2, partitions }) => {
            const topicRequestData = requests.find(({ topic }) => topic === topicName2);
            let preferredReadReplicas = this.preferredReadReplicasPerTopicPartition[topicName2];
            if (!preferredReadReplicas) {
              this.preferredReadReplicasPerTopicPartition[topicName2] = preferredReadReplicas = {};
            }
            return partitions.filter(({ partition }) => !this.seekOffset.has(topicName2, partition) && !this.subscriptionState.isPaused(topicName2, partition)).map((partitionData) => {
              const { partition, preferredReadReplica } = partitionData;
              if (preferredReadReplica != null && preferredReadReplica !== -1) {
                const { nodeId: currentPreferredReadReplica } = preferredReadReplicas[partition] || {};
                if (currentPreferredReadReplica !== preferredReadReplica) {
                  this.logger.info(`Preferred read replica is now ${preferredReadReplica}`, {
                    groupId: this.groupId,
                    memberId: this.memberId,
                    topic: topicName2,
                    partition
                  });
                }
                preferredReadReplicas[partition] = {
                  nodeId: preferredReadReplica,
                  expireAt: Date.now() + this.metadataMaxAge
                };
              }
              const partitionRequestData = topicRequestData.partitions.find(({ partition: partition2 }) => partition2 === partitionData.partition);
              const fetchedOffset = partitionRequestData.fetchOffset;
              return new Batch(topicName2, fetchedOffset, partitionData);
            });
          });
        } catch (e) {
          await this.recoverFromFetch(e);
          return [];
        }
      }
      async recoverFromFetch(e) {
        if (STALE_METADATA_ERRORS.includes(e.type) || e.name === "KafkaJSTopicMetadataNotLoaded") {
          this.logger.debug("Stale cluster metadata, refreshing...", {
            groupId: this.groupId,
            memberId: this.memberId,
            error: e.message
          });
          await this.cluster.refreshMetadata();
          await this.joinAndSync();
          return;
        }
        if (e.name === "KafkaJSStaleTopicMetadataAssignment") {
          this.logger.warn(`${e.message}, resync group`, {
            groupId: this.groupId,
            memberId: this.memberId,
            topic: e.topic,
            unknownPartitions: e.unknownPartitions
          });
          await this.joinAndSync();
          return;
        }
        if (e.name === "KafkaJSOffsetOutOfRange") {
          await this.recoverFromOffsetOutOfRange(e);
          return;
        }
        if (e.name === "KafkaJSConnectionClosedError") {
          this.cluster.removeBroker({ host: e.host, port: e.port });
          return;
        }
        if (e.name === "KafkaJSBrokerNotFound" || e.name === "KafkaJSConnectionClosedError") {
          this.logger.debug(`${e.message}, refreshing metadata and retrying...`);
          await this.cluster.refreshMetadata();
          return;
        }
        throw e;
      }
      async recoverFromOffsetOutOfRange(e) {
        const preferredReadReplicas = this.preferredReadReplicasPerTopicPartition[e.topic];
        if (preferredReadReplicas && typeof preferredReadReplicas[e.partition] === "number") {
          this.logger.info("Offset out of range while fetching from follower, retrying with leader", {
            topic: e.topic,
            partition: e.partition,
            groupId: this.groupId,
            memberId: this.memberId
          });
          delete preferredReadReplicas[e.partition];
        } else {
          this.logger.error("Offset out of range, resetting to default offset", {
            topic: e.topic,
            partition: e.partition,
            groupId: this.groupId,
            memberId: this.memberId
          });
          await this.offsetManager.setDefaultOffset({
            topic: e.topic,
            partition: e.partition
          });
        }
      }
      generatePartitionsPerSubscribedTopic() {
        const map = /* @__PURE__ */ new Map();
        for (const topic of this.topicsSubscribed) {
          const partitions = this.cluster.findTopicPartitionMetadata(topic).map((m) => m.partitionId).sort();
          map.set(topic, partitions);
        }
        return map;
      }
      checkForStaleAssignment() {
        if (!this.partitionsPerSubscribedTopic) {
          return;
        }
        const newPartitionsPerSubscribedTopic = this.generatePartitionsPerSubscribedTopic();
        for (const [topic, partitions] of newPartitionsPerSubscribedTopic) {
          const diff = arrayDiff(partitions, this.partitionsPerSubscribedTopic.get(topic));
          if (diff.length > 0) {
            throw new KafkaJSStaleTopicMetadataAssignment("Topic has been updated", {
              topic,
              unknownPartitions: diff
            });
          }
        }
      }
      async seekOffsets(topicPartitions) {
        for (const { topic, partitions } of topicPartitions) {
          for (const partition of partitions) {
            const seekEntry = this.seekOffset.pop(topic, partition);
            if (!seekEntry) {
              continue;
            }
            this.logger.debug("Seek offset", {
              groupId: this.groupId,
              memberId: this.memberId,
              seek: seekEntry
            });
            await this.offsetManager.seek(seekEntry);
          }
        }
        await this.offsetManager.resolveOffsets();
      }
      hasSeekOffset({ topic, partition }) {
        return this.seekOffset.has(topic, partition);
      }
      findReadReplicaForPartitions(topic, partitions) {
        const partitionMetadata = this.cluster.findTopicPartitionMetadata(topic);
        const preferredReadReplicas = this.preferredReadReplicasPerTopicPartition[topic];
        return partitions.reduce((result, id) => {
          const partitionId = parseInt(id, 10);
          const metadata = partitionMetadata.find((p) => p.partitionId === partitionId);
          if (!metadata) {
            return result;
          }
          if (metadata.leader == null) {
            throw new KafkaJSError("Invalid partition metadata", { topic, partitionId, metadata });
          }
          let nodeId = metadata.leader;
          if (preferredReadReplicas) {
            const { nodeId: preferredReadReplica, expireAt } = preferredReadReplicas[partitionId] || {};
            if (Date.now() >= expireAt) {
              this.logger.debug("Preferred read replica information has expired, using leader", {
                topic,
                partitionId,
                groupId: this.groupId,
                memberId: this.memberId,
                preferredReadReplica,
                leader: metadata.leader
              });
              delete preferredReadReplicas[partitionId];
            } else if (preferredReadReplica != null) {
              const offlineReplicas = metadata.offlineReplicas;
              if (Array.isArray(offlineReplicas) && offlineReplicas.includes(nodeId)) {
                this.logger.debug("Preferred read replica is offline, using leader", {
                  topic,
                  partitionId,
                  groupId: this.groupId,
                  memberId: this.memberId,
                  preferredReadReplica,
                  leader: metadata.leader
                });
              } else {
                nodeId = preferredReadReplica;
              }
            }
          }
          const current = result[nodeId] || [];
          return __spreadProps(__spreadValues({}, result), { [nodeId]: [...current, partitionId] });
        }, {});
      }
      filterPartitionsByNode(nodeId, topicPartitions) {
        return topicPartitions.map(({ topic, partitions }) => ({
          topic,
          partitions: this.findReadReplicaForPartitions(topic, partitions)[nodeId] || []
        }));
      }
      getActiveTopicPartitions() {
        return this.subscriptionState.active().reduce((acc, { topic, partitions }) => __spreadProps(__spreadValues({}, acc), { [topic]: new Set(partitions) }), {});
      }
    };
  }
});

// node_modules/kafkajs/src/utils/seq.js
var require_seq = __commonJS({
  "node_modules/kafkajs/src/utils/seq.js"(exports, module2) {
    var seq = (count, callback = (x) => x) => new Array(count).fill(0).map((_, index) => callback(index));
    module2.exports = seq;
  }
});

// node_modules/kafkajs/src/consumer/fetcher.js
var require_fetcher = __commonJS({
  "node_modules/kafkajs/src/consumer/fetcher.js"(exports, module2) {
    var EventEmitter = require("events");
    var createFetcher = ({
      nodeId,
      workerQueue,
      partitionAssignments,
      fetch,
      logger: rootLogger
    }) => {
      const logger = rootLogger.namespace(`Fetcher ${nodeId}`);
      const emitter = new EventEmitter();
      let isRunning = false;
      const getWorkerQueue = () => workerQueue;
      const assignmentKey = ({ topic, partition }) => `${topic}|${partition}`;
      const getAssignedFetcher = (batch) => partitionAssignments.get(assignmentKey(batch));
      const assignTopicPartition = (batch) => partitionAssignments.set(assignmentKey(batch), nodeId);
      const unassignTopicPartition = (batch) => partitionAssignments.delete(assignmentKey(batch));
      const filterUnassignedBatches = (batches) => batches.filter((batch) => {
        const assignedFetcher = getAssignedFetcher(batch);
        if (assignedFetcher != null && assignedFetcher !== nodeId) {
          logger.info("Filtering out batch due to partition already being processed by another fetcher", {
            topic: batch.topic,
            partition: batch.partition,
            assignedFetcher,
            fetcher: nodeId
          });
          return false;
        }
        return true;
      });
      const start = async () => {
        if (isRunning)
          return;
        isRunning = true;
        while (isRunning) {
          try {
            const batches = await fetch(nodeId);
            if (isRunning) {
              const availableBatches = filterUnassignedBatches(batches);
              if (availableBatches.length > 0) {
                availableBatches.forEach(assignTopicPartition);
                try {
                  await workerQueue.push(...availableBatches);
                } finally {
                  availableBatches.forEach(unassignTopicPartition);
                }
              }
            }
          } catch (error) {
            isRunning = false;
            emitter.emit("end");
            throw error;
          }
        }
        emitter.emit("end");
      };
      const stop = async () => {
        if (!isRunning)
          return;
        isRunning = false;
        await new Promise((resolve) => emitter.once("end", () => resolve()));
      };
      return { start, stop, getWorkerQueue };
    };
    module2.exports = createFetcher;
  }
});

// node_modules/kafkajs/src/consumer/worker.js
var require_worker = __commonJS({
  "node_modules/kafkajs/src/consumer/worker.js"(exports, module2) {
    var sharedPromiseTo = require_sharedPromiseTo();
    var createWorker = ({ handler, workerId }) => {
      const run = sharedPromiseTo(async ({ next }) => {
        while (true) {
          const item = next();
          if (!item)
            break;
          const { batch, resolve, reject } = item;
          try {
            await handler(batch, { workerId });
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      });
      return { run };
    };
    module2.exports = createWorker;
  }
});

// node_modules/kafkajs/src/consumer/workerQueue.js
var require_workerQueue = __commonJS({
  "node_modules/kafkajs/src/consumer/workerQueue.js"(exports, module2) {
    var createWorkerQueue = ({ workers }) => {
      const queue = [];
      const getWorkers = () => workers;
      const push = async (...batches) => {
        const promises = batches.map((batch) => new Promise((resolve, reject) => queue.push({ batch, resolve, reject })));
        workers.forEach((worker) => worker.run({ next: () => queue.shift() }));
        const results = await Promise.allSettled(promises);
        const rejected = results.find((result) => result.status === "rejected");
        if (rejected) {
          throw rejected.reason;
        }
      };
      return { push, getWorkers };
    };
    module2.exports = createWorkerQueue;
  }
});

// node_modules/kafkajs/src/consumer/fetchManager.js
var require_fetchManager = __commonJS({
  "node_modules/kafkajs/src/consumer/fetchManager.js"(exports, module2) {
    var seq = require_seq();
    var createFetcher = require_fetcher();
    var createWorker = require_worker();
    var createWorkerQueue = require_workerQueue();
    var { KafkaJSFetcherRebalanceError } = require_errors();
    var createFetchManager = ({
      logger: rootLogger,
      getNodeIds,
      fetch,
      handler,
      concurrency = 1
    }) => {
      const logger = rootLogger.namespace("FetchManager");
      const workers = seq(concurrency, (workerId) => createWorker({ handler, workerId }));
      const workerQueue = createWorkerQueue({ workers });
      let fetchers = [];
      const getFetchers = () => fetchers;
      const createFetchers = () => {
        const nodeIds = getNodeIds();
        const partitionAssignments = /* @__PURE__ */ new Map();
        const validateShouldRebalance = () => {
          const current = getNodeIds();
          const hasChanged = nodeIds.length !== current.length || nodeIds.some((nodeId) => !current.includes(nodeId));
          if (hasChanged) {
            throw new KafkaJSFetcherRebalanceError();
          }
        };
        const fetchers2 = nodeIds.map((nodeId) => createFetcher({
          nodeId,
          workerQueue,
          partitionAssignments,
          fetch: async (nodeId2) => {
            validateShouldRebalance();
            return fetch(nodeId2);
          },
          logger
        }));
        logger.debug(`Created ${fetchers2.length} fetchers`, { nodeIds, concurrency });
        return fetchers2;
      };
      const start = async () => {
        logger.debug("Starting...");
        while (true) {
          fetchers = createFetchers();
          try {
            await Promise.all(fetchers.map((fetcher) => fetcher.start()));
          } catch (error) {
            await stop();
            if (error instanceof KafkaJSFetcherRebalanceError) {
              logger.debug("Rebalancing fetchers...");
              continue;
            }
            throw error;
          }
          break;
        }
      };
      const stop = async () => {
        logger.debug("Stopping fetchers...");
        await Promise.all(fetchers.map((fetcher) => fetcher.stop()));
        logger.debug("Stopped fetchers");
      };
      return { start, stop, getFetchers };
    };
    module2.exports = createFetchManager;
  }
});

// node_modules/kafkajs/src/consumer/runner.js
var require_runner = __commonJS({
  "node_modules/kafkajs/src/consumer/runner.js"(exports, module2) {
    var { EventEmitter } = require("events");
    var Long = require_long();
    var createRetry = require_retry();
    var { isKafkaJSError, isRebalancing } = require_errors();
    var {
      events: { FETCH, FETCH_START, START_BATCH_PROCESS, END_BATCH_PROCESS, REBALANCING }
    } = require_instrumentationEvents3();
    var createFetchManager = require_fetchManager();
    var isSameOffset = (offsetA, offsetB) => Long.fromValue(offsetA).equals(Long.fromValue(offsetB));
    var CONSUMING_START = "consuming-start";
    var CONSUMING_STOP = "consuming-stop";
    module2.exports = class Runner extends EventEmitter {
      constructor({
        logger,
        consumerGroup,
        instrumentationEmitter,
        eachBatchAutoResolve = true,
        concurrency,
        eachBatch,
        eachMessage,
        heartbeatInterval,
        onCrash,
        retry,
        autoCommit = true
      }) {
        super();
        this.logger = logger.namespace("Runner");
        this.consumerGroup = consumerGroup;
        this.instrumentationEmitter = instrumentationEmitter;
        this.eachBatchAutoResolve = eachBatchAutoResolve;
        this.eachBatch = eachBatch;
        this.eachMessage = eachMessage;
        this.heartbeatInterval = heartbeatInterval;
        this.retrier = createRetry(Object.assign({}, retry));
        this.onCrash = onCrash;
        this.autoCommit = autoCommit;
        this.fetchManager = createFetchManager({
          logger: this.logger,
          getNodeIds: () => this.consumerGroup.getNodeIds(),
          fetch: (nodeId) => this.fetch(nodeId),
          handler: (batch) => this.handleBatch(batch),
          concurrency
        });
        this.running = false;
        this.consuming = false;
      }
      get consuming() {
        return this._consuming;
      }
      set consuming(value) {
        if (this._consuming !== value) {
          this._consuming = value;
          this.emit(value ? CONSUMING_START : CONSUMING_STOP);
        }
      }
      async start() {
        if (this.running) {
          return;
        }
        try {
          await this.consumerGroup.connect();
          await this.consumerGroup.joinAndSync();
        } catch (e) {
          return this.onCrash(e);
        }
        this.running = true;
        this.scheduleFetchManager();
      }
      async scheduleFetchManager() {
        this.consuming = true;
        while (this.running) {
          try {
            await this.fetchManager.start();
          } catch (e) {
            if (isRebalancing(e)) {
              this.logger.warn("The group is rebalancing, re-joining", {
                groupId: this.consumerGroup.groupId,
                memberId: this.consumerGroup.memberId,
                error: e.message
              });
              this.instrumentationEmitter.emit(REBALANCING, {
                groupId: this.consumerGroup.groupId,
                memberId: this.consumerGroup.memberId
              });
              await this.consumerGroup.joinAndSync();
              continue;
            }
            if (e.type === "UNKNOWN_MEMBER_ID") {
              this.logger.error("The coordinator is not aware of this member, re-joining the group", {
                groupId: this.consumerGroup.groupId,
                memberId: this.consumerGroup.memberId,
                error: e.message
              });
              this.consumerGroup.memberId = null;
              await this.consumerGroup.joinAndSync();
              continue;
            }
            this.onCrash(e);
            break;
          }
        }
        this.consuming = false;
        this.running = false;
      }
      async stop() {
        if (!this.running) {
          return;
        }
        this.logger.debug("stop consumer group", {
          groupId: this.consumerGroup.groupId,
          memberId: this.consumerGroup.memberId
        });
        this.running = false;
        try {
          await this.fetchManager.stop();
          await this.waitForConsumer();
          await this.consumerGroup.leave();
        } catch (e) {
        }
      }
      waitForConsumer() {
        return new Promise((resolve) => {
          if (!this.consuming) {
            return resolve();
          }
          this.logger.debug("waiting for consumer to finish...", {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId
          });
          this.once(CONSUMING_STOP, () => resolve());
        });
      }
      async heartbeat() {
        try {
          await this.consumerGroup.heartbeat({ interval: this.heartbeatInterval });
        } catch (e) {
          if (isRebalancing(e)) {
            await this.autoCommitOffsets();
          }
          throw e;
        }
      }
      async processEachMessage(batch) {
        const { topic, partition } = batch;
        for (const message of batch.messages) {
          if (!this.running || this.consumerGroup.hasSeekOffset({ topic, partition })) {
            break;
          }
          try {
            await this.eachMessage({
              topic,
              partition,
              message,
              heartbeat: () => this.heartbeat()
            });
          } catch (e) {
            if (!isKafkaJSError(e)) {
              this.logger.error(`Error when calling eachMessage`, {
                topic,
                partition,
                offset: message.offset,
                stack: e.stack,
                error: e
              });
            }
            await this.autoCommitOffsets();
            throw e;
          }
          this.consumerGroup.resolveOffset({ topic, partition, offset: message.offset });
          await this.heartbeat();
          await this.autoCommitOffsetsIfNecessary();
        }
      }
      async processEachBatch(batch) {
        const { topic, partition } = batch;
        const lastFilteredMessage = batch.messages[batch.messages.length - 1];
        try {
          await this.eachBatch({
            batch,
            resolveOffset: (offset) => {
              const offsetToResolve = lastFilteredMessage && isSameOffset(offset, lastFilteredMessage.offset) ? batch.lastOffset() : offset;
              this.consumerGroup.resolveOffset({ topic, partition, offset: offsetToResolve });
            },
            heartbeat: () => this.heartbeat(),
            commitOffsetsIfNecessary: async (offsets) => {
              return offsets ? this.consumerGroup.commitOffsets(offsets) : this.consumerGroup.commitOffsetsIfNecessary();
            },
            uncommittedOffsets: () => this.consumerGroup.uncommittedOffsets(),
            isRunning: () => this.running,
            isStale: () => this.consumerGroup.hasSeekOffset({ topic, partition })
          });
        } catch (e) {
          if (!isKafkaJSError(e)) {
            this.logger.error(`Error when calling eachBatch`, {
              topic,
              partition,
              offset: batch.firstOffset(),
              stack: e.stack,
              error: e
            });
          }
          await this.autoCommitOffsets();
          throw e;
        }
        if (this.eachBatchAutoResolve) {
          this.consumerGroup.resolveOffset({ topic, partition, offset: batch.lastOffset() });
        }
      }
      async fetch(nodeId) {
        if (!this.running) {
          this.logger.debug("consumer not running, exiting", {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId
          });
          return [];
        }
        const startFetch = Date.now();
        this.instrumentationEmitter.emit(FETCH_START, { nodeId });
        const batches = await this.consumerGroup.fetch(nodeId);
        this.instrumentationEmitter.emit(FETCH, {
          numberOfBatches: 0,
          duration: Date.now() - startFetch,
          nodeId
        });
        if (batches.length === 0) {
          await this.heartbeat();
        }
        return batches;
      }
      async handleBatch(batch) {
        if (!this.running) {
          this.logger.debug("consumer not running, exiting", {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId
          });
          return;
        }
        const onBatch = async (batch2) => {
          const startBatchProcess = Date.now();
          const payload = {
            topic: batch2.topic,
            partition: batch2.partition,
            highWatermark: batch2.highWatermark,
            offsetLag: batch2.offsetLag(),
            offsetLagLow: batch2.offsetLagLow(),
            batchSize: batch2.messages.length,
            firstOffset: batch2.firstOffset(),
            lastOffset: batch2.lastOffset()
          };
          if (batch2.isEmptyDueToFiltering()) {
            this.instrumentationEmitter.emit(START_BATCH_PROCESS, payload);
            this.consumerGroup.resolveOffset({
              topic: batch2.topic,
              partition: batch2.partition,
              offset: batch2.lastOffset()
            });
            await this.autoCommitOffsetsIfNecessary();
            this.instrumentationEmitter.emit(END_BATCH_PROCESS, __spreadProps(__spreadValues({}, payload), {
              duration: Date.now() - startBatchProcess
            }));
            await this.heartbeat();
            return;
          }
          if (batch2.isEmpty()) {
            await this.heartbeat();
            return;
          }
          this.instrumentationEmitter.emit(START_BATCH_PROCESS, payload);
          if (this.eachMessage) {
            await this.processEachMessage(batch2);
          } else if (this.eachBatch) {
            await this.processEachBatch(batch2);
          }
          this.instrumentationEmitter.emit(END_BATCH_PROCESS, __spreadProps(__spreadValues({}, payload), {
            duration: Date.now() - startBatchProcess
          }));
          await this.autoCommitOffsets();
          await this.heartbeat();
        };
        return this.retrier(async (bail, retryCount, retryTime) => {
          try {
            await onBatch(batch);
          } catch (e) {
            if (!this.running) {
              this.logger.debug("consumer not running, exiting", {
                error: e.message,
                groupId: this.consumerGroup.groupId,
                memberId: this.consumerGroup.memberId
              });
              return;
            }
            if (isRebalancing(e) || e.type === "UNKNOWN_MEMBER_ID" || e.name === "KafkaJSNotImplemented") {
              return bail(e);
            }
            this.logger.debug("Error while fetching data, trying again...", {
              groupId: this.consumerGroup.groupId,
              memberId: this.consumerGroup.memberId,
              error: e.message,
              stack: e.stack,
              retryCount,
              retryTime
            });
            throw e;
          }
        });
      }
      autoCommitOffsets() {
        if (this.autoCommit) {
          return this.consumerGroup.commitOffsets();
        }
      }
      autoCommitOffsetsIfNecessary() {
        if (this.autoCommit) {
          return this.consumerGroup.commitOffsetsIfNecessary();
        }
      }
      commitOffsets(offsets) {
        if (!this.running) {
          this.logger.debug("consumer not running, exiting", {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
            offsets
          });
          return;
        }
        return this.retrier(async (bail, retryCount, retryTime) => {
          try {
            await this.consumerGroup.commitOffsets(offsets);
          } catch (e) {
            if (!this.running) {
              this.logger.debug("consumer not running, exiting", {
                error: e.message,
                groupId: this.consumerGroup.groupId,
                memberId: this.consumerGroup.memberId,
                offsets
              });
              return;
            }
            if (e.name === "KafkaJSNotImplemented") {
              return bail(e);
            }
            this.logger.debug("Error while committing offsets, trying again...", {
              groupId: this.consumerGroup.groupId,
              memberId: this.consumerGroup.memberId,
              error: e.message,
              stack: e.stack,
              retryCount,
              retryTime,
              offsets
            });
            throw e;
          }
        });
      }
    };
  }
});

// node_modules/kafkajs/src/consumer/assigners/roundRobinAssigner/index.js
var require_roundRobinAssigner = __commonJS({
  "node_modules/kafkajs/src/consumer/assigners/roundRobinAssigner/index.js"(exports, module2) {
    var { MemberMetadata, MemberAssignment } = require_assignerProtocol();
    module2.exports = ({ cluster }) => ({
      name: "RoundRobinAssigner",
      version: 1,
      async assign({ members, topics }) {
        const membersCount = members.length;
        const sortedMembers = members.map(({ memberId }) => memberId).sort();
        const assignment = {};
        const topicsPartitions = topics.flatMap((topic) => {
          const partitionMetadata = cluster.findTopicPartitionMetadata(topic);
          return partitionMetadata.map((m) => ({ topic, partitionId: m.partitionId }));
        });
        topicsPartitions.forEach((topicPartition, i) => {
          const assignee = sortedMembers[i % membersCount];
          if (!assignment[assignee]) {
            assignment[assignee] = /* @__PURE__ */ Object.create(null);
          }
          if (!assignment[assignee][topicPartition.topic]) {
            assignment[assignee][topicPartition.topic] = [];
          }
          assignment[assignee][topicPartition.topic].push(topicPartition.partitionId);
        });
        return Object.keys(assignment).map((memberId) => ({
          memberId,
          memberAssignment: MemberAssignment.encode({
            version: this.version,
            assignment: assignment[memberId]
          })
        }));
      },
      protocol({ topics }) {
        return {
          name: this.name,
          metadata: MemberMetadata.encode({
            version: this.version,
            topics
          })
        };
      }
    });
  }
});

// node_modules/kafkajs/src/consumer/assigners/index.js
var require_assigners = __commonJS({
  "node_modules/kafkajs/src/consumer/assigners/index.js"(exports, module2) {
    var roundRobin = require_roundRobinAssigner();
    module2.exports = {
      roundRobin
    };
  }
});

// node_modules/kafkajs/src/consumer/index.js
var require_consumer = __commonJS({
  "node_modules/kafkajs/src/consumer/index.js"(exports, module2) {
    var Long = require_long();
    var createRetry = require_retry();
    var { initialRetryTime } = require_defaults();
    var ConsumerGroup = require_consumerGroup();
    var Runner = require_runner();
    var { events, wrap: wrapEvent, unwrap: unwrapEvent } = require_instrumentationEvents3();
    var InstrumentationEventEmitter = require_emitter();
    var { KafkaJSNonRetriableError } = require_errors();
    var { roundRobin } = require_assigners();
    var { EARLIEST_OFFSET, LATEST_OFFSET } = require_constants();
    var ISOLATION_LEVEL = require_isolationLevel();
    var sharedPromiseTo = require_sharedPromiseTo();
    var { keys, values } = Object;
    var { CONNECT, DISCONNECT, STOP, CRASH } = events;
    var eventNames = values(events);
    var eventKeys = keys(events).map((key) => `consumer.events.${key}`).join(", ");
    var specialOffsets = [
      Long.fromValue(EARLIEST_OFFSET).toString(),
      Long.fromValue(LATEST_OFFSET).toString()
    ];
    module2.exports = ({
      cluster,
      groupId,
      retry,
      logger: rootLogger,
      partitionAssigners = [roundRobin],
      sessionTimeout = 3e4,
      rebalanceTimeout = 6e4,
      heartbeatInterval = 3e3,
      maxBytesPerPartition = 1048576,
      minBytes = 1,
      maxBytes = 10485760,
      maxWaitTimeInMs = 5e3,
      isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
      rackId = "",
      instrumentationEmitter: rootInstrumentationEmitter,
      metadataMaxAge
    }) => {
      if (!groupId) {
        throw new KafkaJSNonRetriableError("Consumer groupId must be a non-empty string.");
      }
      const logger = rootLogger.namespace("Consumer");
      const instrumentationEmitter = rootInstrumentationEmitter || new InstrumentationEventEmitter();
      const assigners = partitionAssigners.map((createAssigner) => createAssigner({ groupId, logger, cluster }));
      const topics = {};
      let runner = null;
      let consumerGroup = null;
      let restartTimeout = null;
      if (heartbeatInterval >= sessionTimeout) {
        throw new KafkaJSNonRetriableError(`Consumer heartbeatInterval (${heartbeatInterval}) must be lower than sessionTimeout (${sessionTimeout}). It is recommended to set heartbeatInterval to approximately a third of the sessionTimeout.`);
      }
      const connect = async () => {
        await cluster.connect();
        instrumentationEmitter.emit(CONNECT);
      };
      const disconnect = async () => {
        try {
          await stop();
          logger.debug("consumer has stopped, disconnecting", { groupId });
          await cluster.disconnect();
          instrumentationEmitter.emit(DISCONNECT);
        } catch (e) {
          logger.error(`Caught error when disconnecting the consumer: ${e.message}`, {
            stack: e.stack,
            groupId
          });
          throw e;
        }
      };
      const stop = sharedPromiseTo(async () => {
        try {
          if (runner) {
            await runner.stop();
            runner = null;
            consumerGroup = null;
            instrumentationEmitter.emit(STOP);
          }
          clearTimeout(restartTimeout);
          logger.info("Stopped", { groupId });
        } catch (e) {
          logger.error(`Caught error when stopping the consumer: ${e.message}`, {
            stack: e.stack,
            groupId
          });
          throw e;
        }
      });
      const subscribe = async ({ topic, topics: subscriptionTopics, fromBeginning = false }) => {
        if (consumerGroup) {
          throw new KafkaJSNonRetriableError("Cannot subscribe to topic while consumer is running");
        }
        if (!topic && !subscriptionTopics) {
          throw new KafkaJSNonRetriableError('Missing required argument "topics"');
        }
        if (subscriptionTopics != null && !Array.isArray(subscriptionTopics)) {
          throw new KafkaJSNonRetriableError('Argument "topics" must be an array');
        }
        const subscriptions = subscriptionTopics || [topic];
        for (const subscription of subscriptions) {
          if (typeof subscription !== "string" && !(subscription instanceof RegExp)) {
            throw new KafkaJSNonRetriableError(`Invalid topic ${subscription} (${typeof subscription}), the topic name has to be a String or a RegExp`);
          }
        }
        const hasRegexSubscriptions = subscriptions.some((subscription) => subscription instanceof RegExp);
        const metadata = hasRegexSubscriptions ? await cluster.metadata() : void 0;
        const topicsToSubscribe = [];
        for (const subscription of subscriptions) {
          const isRegExp = subscription instanceof RegExp;
          if (isRegExp) {
            const topicRegExp = subscription;
            const matchedTopics = metadata.topicMetadata.map(({ topic: topicName2 }) => topicName2).filter((topicName2) => topicRegExp.test(topicName2));
            logger.debug("Subscription based on RegExp", {
              groupId,
              topicRegExp: topicRegExp.toString(),
              matchedTopics
            });
            topicsToSubscribe.push(...matchedTopics);
          } else {
            topicsToSubscribe.push(subscription);
          }
        }
        for (const t of topicsToSubscribe) {
          topics[t] = { fromBeginning };
        }
        await cluster.addMultipleTargetTopics(topicsToSubscribe);
      };
      const run = async ({
        autoCommit = true,
        autoCommitInterval = null,
        autoCommitThreshold = null,
        eachBatchAutoResolve = true,
        partitionsConsumedConcurrently: concurrency = 1,
        eachBatch = null,
        eachMessage = null
      } = {}) => {
        if (consumerGroup) {
          logger.warn("consumer#run was called, but the consumer is already running", { groupId });
          return;
        }
        const start = async (onCrash2) => {
          logger.info("Starting", { groupId });
          consumerGroup = new ConsumerGroup({
            logger: rootLogger,
            topics: keys(topics),
            topicConfigurations: topics,
            retry,
            cluster,
            groupId,
            assigners,
            sessionTimeout,
            rebalanceTimeout,
            maxBytesPerPartition,
            minBytes,
            maxBytes,
            maxWaitTimeInMs,
            instrumentationEmitter,
            isolationLevel,
            rackId,
            metadataMaxAge,
            autoCommit,
            autoCommitInterval,
            autoCommitThreshold
          });
          runner = new Runner({
            logger: rootLogger,
            consumerGroup,
            instrumentationEmitter,
            heartbeatInterval,
            retry,
            autoCommit,
            eachBatchAutoResolve,
            eachBatch,
            eachMessage,
            onCrash: onCrash2,
            concurrency
          });
          await runner.start();
        };
        const onCrash = async (e) => {
          logger.error(`Crash: ${e.name}: ${e.message}`, {
            groupId,
            retryCount: e.retryCount,
            stack: e.stack
          });
          if (e.name === "KafkaJSConnectionClosedError") {
            cluster.removeBroker({ host: e.host, port: e.port });
          }
          await disconnect();
          const getOriginalCause = (error) => {
            if (error.cause) {
              return getOriginalCause(error.cause);
            }
            return error;
          };
          const isErrorRetriable = e.name === "KafkaJSNumberOfRetriesExceeded" || getOriginalCause(e).retriable === true;
          const shouldRestart = isErrorRetriable && (!retry || !retry.restartOnFailure || await retry.restartOnFailure(e).catch((error) => {
            logger.error('Caught error when invoking user-provided "restartOnFailure" callback. Defaulting to restarting.', {
              error: error.message || error,
              cause: e.message || e,
              groupId
            });
            return true;
          }));
          instrumentationEmitter.emit(CRASH, {
            error: e,
            groupId,
            restart: shouldRestart
          });
          if (shouldRestart) {
            const retryTime = e.retryTime || retry && retry.initialRetryTime || initialRetryTime;
            logger.error(`Restarting the consumer in ${retryTime}ms`, {
              retryCount: e.retryCount,
              retryTime,
              groupId
            });
            restartTimeout = setTimeout(() => start(onCrash), retryTime);
          }
        };
        await start(onCrash);
      };
      const on = (eventName, listener) => {
        if (!eventNames.includes(eventName)) {
          throw new KafkaJSNonRetriableError(`Event name should be one of ${eventKeys}`);
        }
        return instrumentationEmitter.addListener(unwrapEvent(eventName), (event) => {
          event.type = wrapEvent(event.type);
          Promise.resolve(listener(event)).catch((e) => {
            logger.error(`Failed to execute listener: ${e.message}`, {
              eventName,
              stack: e.stack
            });
          });
        });
      };
      const commitOffsets = async (topicPartitions = []) => {
        const commitsByTopic = topicPartitions.reduce((payload, { topic, partition, offset, metadata = null }) => {
          if (!topic) {
            throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`);
          }
          if (isNaN(partition)) {
            throw new KafkaJSNonRetriableError(`Invalid partition, expected a number received ${partition}`);
          }
          let commitOffset;
          try {
            commitOffset = Long.fromValue(offset);
          } catch (_) {
            throw new KafkaJSNonRetriableError(`Invalid offset, expected a long received ${offset}`);
          }
          if (commitOffset.lessThan(0)) {
            throw new KafkaJSNonRetriableError("Offset must not be a negative number");
          }
          if (metadata !== null && typeof metadata !== "string") {
            throw new KafkaJSNonRetriableError(`Invalid offset metadata, expected string or null, received ${metadata}`);
          }
          const topicCommits = payload[topic] || [];
          topicCommits.push({ partition, offset: commitOffset, metadata });
          return __spreadProps(__spreadValues({}, payload), { [topic]: topicCommits });
        }, {});
        if (!consumerGroup) {
          throw new KafkaJSNonRetriableError("Consumer group was not initialized, consumer#run must be called first");
        }
        const topics2 = Object.keys(commitsByTopic);
        return runner.commitOffsets({
          topics: topics2.map((topic) => {
            return {
              topic,
              partitions: commitsByTopic[topic]
            };
          })
        });
      };
      const seek = ({ topic, partition, offset }) => {
        if (!topic) {
          throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`);
        }
        if (isNaN(partition)) {
          throw new KafkaJSNonRetriableError(`Invalid partition, expected a number received ${partition}`);
        }
        let seekOffset;
        try {
          seekOffset = Long.fromValue(offset);
        } catch (_) {
          throw new KafkaJSNonRetriableError(`Invalid offset, expected a long received ${offset}`);
        }
        if (seekOffset.lessThan(0) && !specialOffsets.includes(seekOffset.toString())) {
          throw new KafkaJSNonRetriableError("Offset must not be a negative number");
        }
        if (!consumerGroup) {
          throw new KafkaJSNonRetriableError("Consumer group was not initialized, consumer#run must be called first");
        }
        consumerGroup.seek({ topic, partition, offset: seekOffset.toString() });
      };
      const describeGroup = async () => {
        const coordinator = await cluster.findGroupCoordinator({ groupId });
        const retrier = createRetry(retry);
        return retrier(async () => {
          const { groups } = await coordinator.describeGroups({ groupIds: [groupId] });
          return groups.find((group) => group.groupId === groupId);
        });
      };
      const pause = (topicPartitions = []) => {
        for (const topicPartition of topicPartitions) {
          if (!topicPartition || !topicPartition.topic) {
            throw new KafkaJSNonRetriableError(`Invalid topic ${topicPartition && topicPartition.topic || topicPartition}`);
          } else if (typeof topicPartition.partitions !== "undefined" && (!Array.isArray(topicPartition.partitions) || topicPartition.partitions.some(isNaN))) {
            throw new KafkaJSNonRetriableError(`Array of valid partitions required to pause specific partitions instead of ${topicPartition.partitions}`);
          }
        }
        if (!consumerGroup) {
          throw new KafkaJSNonRetriableError("Consumer group was not initialized, consumer#run must be called first");
        }
        consumerGroup.pause(topicPartitions);
      };
      const paused = () => {
        if (!consumerGroup) {
          return [];
        }
        return consumerGroup.paused();
      };
      const resume = (topicPartitions = []) => {
        for (const topicPartition of topicPartitions) {
          if (!topicPartition || !topicPartition.topic) {
            throw new KafkaJSNonRetriableError(`Invalid topic ${topicPartition && topicPartition.topic || topicPartition}`);
          } else if (typeof topicPartition.partitions !== "undefined" && (!Array.isArray(topicPartition.partitions) || topicPartition.partitions.some(isNaN))) {
            throw new KafkaJSNonRetriableError(`Array of valid partitions required to resume specific partitions instead of ${topicPartition.partitions}`);
          }
        }
        if (!consumerGroup) {
          throw new KafkaJSNonRetriableError("Consumer group was not initialized, consumer#run must be called first");
        }
        consumerGroup.resume(topicPartitions);
      };
      const getLogger = () => logger;
      return {
        connect,
        disconnect,
        subscribe,
        stop,
        run,
        commitOffsets,
        seek,
        describeGroup,
        pause,
        paused,
        resume,
        on,
        events,
        logger: getLogger
      };
    };
  }
});

// node_modules/kafkajs/src/utils/waitFor.js
var require_waitFor = __commonJS({
  "node_modules/kafkajs/src/utils/waitFor.js"(exports, module2) {
    var sleep = require_sleep();
    var { KafkaJSTimeout } = require_errors();
    module2.exports = (fn, { delay = 50, maxWait = 1e4, timeoutMessage = "Timeout", ignoreTimeout = false } = {}) => {
      let timeoutId;
      let totalWait = 0;
      let fulfilled = false;
      const checkCondition = async (resolve, reject) => {
        totalWait += delay;
        if (fulfilled) {
          return;
        }
        await sleep(delay);
        try {
          const result = await fn(totalWait);
          if (result) {
            fulfilled = true;
            clearTimeout(timeoutId);
            return resolve(result);
          }
          checkCondition(resolve, reject);
        } catch (e) {
          fulfilled = true;
          clearTimeout(timeoutId);
          reject(e);
        }
      };
      return new Promise((resolve, reject) => {
        checkCondition(resolve, reject);
        if (ignoreTimeout) {
          return;
        }
        timeoutId = setTimeout(() => {
          if (!fulfilled) {
            fulfilled = true;
            return reject(new KafkaJSTimeout(timeoutMessage));
          }
        }, maxWait);
      });
    };
  }
});

// node_modules/kafkajs/src/utils/groupBy.js
var require_groupBy = __commonJS({
  "node_modules/kafkajs/src/utils/groupBy.js"(exports, module2) {
    module2.exports = async (array, groupFn) => {
      const result = /* @__PURE__ */ new Map();
      for (const item of array) {
        const group = await Promise.resolve(groupFn(item));
        result.set(group, result.has(group) ? [...result.get(group), item] : [item]);
      }
      return result;
    };
  }
});

// node_modules/kafkajs/src/admin/instrumentationEvents.js
var require_instrumentationEvents4 = __commonJS({
  "node_modules/kafkajs/src/admin/instrumentationEvents.js"(exports, module2) {
    var swapObject = require_swapObject();
    var networkEvents = require_instrumentationEvents();
    var InstrumentationEventType = require_eventType();
    var adminType = InstrumentationEventType("admin");
    var events = {
      CONNECT: adminType("connect"),
      DISCONNECT: adminType("disconnect"),
      REQUEST: adminType(networkEvents.NETWORK_REQUEST),
      REQUEST_TIMEOUT: adminType(networkEvents.NETWORK_REQUEST_TIMEOUT),
      REQUEST_QUEUE_SIZE: adminType(networkEvents.NETWORK_REQUEST_QUEUE_SIZE)
    };
    var wrappedEvents = {
      [events.REQUEST]: networkEvents.NETWORK_REQUEST,
      [events.REQUEST_TIMEOUT]: networkEvents.NETWORK_REQUEST_TIMEOUT,
      [events.REQUEST_QUEUE_SIZE]: networkEvents.NETWORK_REQUEST_QUEUE_SIZE
    };
    var reversedWrappedEvents = swapObject(wrappedEvents);
    var unwrap = (eventName) => wrappedEvents[eventName] || eventName;
    var wrap = (eventName) => reversedWrappedEvents[eventName] || eventName;
    module2.exports = {
      events,
      wrap,
      unwrap
    };
  }
});

// node_modules/kafkajs/src/protocol/aclResourceTypes.js
var require_aclResourceTypes = __commonJS({
  "node_modules/kafkajs/src/protocol/aclResourceTypes.js"(exports, module2) {
    module2.exports = {
      UNKNOWN: 0,
      ANY: 1,
      TOPIC: 2,
      GROUP: 3,
      CLUSTER: 4,
      TRANSACTIONAL_ID: 5,
      DELEGATION_TOKEN: 6
    };
  }
});

// node_modules/kafkajs/src/protocol/aclOperationTypes.js
var require_aclOperationTypes = __commonJS({
  "node_modules/kafkajs/src/protocol/aclOperationTypes.js"(exports, module2) {
    module2.exports = {
      UNKNOWN: 0,
      ANY: 1,
      ALL: 2,
      READ: 3,
      WRITE: 4,
      CREATE: 5,
      DELETE: 6,
      ALTER: 7,
      DESCRIBE: 8,
      CLUSTER_ACTION: 9,
      DESCRIBE_CONFIGS: 10,
      ALTER_CONFIGS: 11,
      IDEMPOTENT_WRITE: 12
    };
  }
});

// node_modules/kafkajs/src/protocol/aclPermissionTypes.js
var require_aclPermissionTypes = __commonJS({
  "node_modules/kafkajs/src/protocol/aclPermissionTypes.js"(exports, module2) {
    module2.exports = {
      UNKNOWN: 0,
      ANY: 1,
      DENY: 2,
      ALLOW: 3
    };
  }
});

// node_modules/kafkajs/src/protocol/resourcePatternTypes.js
var require_resourcePatternTypes = __commonJS({
  "node_modules/kafkajs/src/protocol/resourcePatternTypes.js"(exports, module2) {
    module2.exports = {
      UNKNOWN: 0,
      ANY: 1,
      MATCH: 2,
      LITERAL: 3,
      PREFIXED: 4
    };
  }
});

// node_modules/kafkajs/src/admin/index.js
var require_admin = __commonJS({
  "node_modules/kafkajs/src/admin/index.js"(exports, module2) {
    var createRetry = require_retry();
    var waitFor = require_waitFor();
    var groupBy = require_groupBy();
    var createConsumer = require_consumer();
    var InstrumentationEventEmitter = require_emitter();
    var { events, wrap: wrapEvent, unwrap: unwrapEvent } = require_instrumentationEvents4();
    var { LEVELS } = require_loggers();
    var {
      KafkaJSNonRetriableError,
      KafkaJSDeleteGroupsError,
      KafkaJSBrokerNotFound,
      KafkaJSDeleteTopicRecordsError,
      KafkaJSAggregateError
    } = require_errors();
    var { staleMetadata } = require_error();
    var CONFIG_RESOURCE_TYPES = require_configResourceTypes();
    var ACL_RESOURCE_TYPES = require_aclResourceTypes();
    var ACL_OPERATION_TYPES = require_aclOperationTypes();
    var ACL_PERMISSION_TYPES = require_aclPermissionTypes();
    var RESOURCE_PATTERN_TYPES = require_resourcePatternTypes();
    var { EARLIEST_OFFSET, LATEST_OFFSET } = require_constants();
    var { CONNECT, DISCONNECT } = events;
    var NO_CONTROLLER_ID = -1;
    var { values, keys, entries } = Object;
    var eventNames = values(events);
    var eventKeys = keys(events).map((key) => `admin.events.${key}`).join(", ");
    var retryOnLeaderNotAvailable = (fn, opts = {}) => {
      const callback = async () => {
        try {
          return await fn();
        } catch (e) {
          if (e.type !== "LEADER_NOT_AVAILABLE") {
            throw e;
          }
          return false;
        }
      };
      return waitFor(callback, opts);
    };
    var isConsumerGroupRunning = (description) => ["Empty", "Dead"].includes(description.state);
    var findTopicPartitions = async (cluster, topic) => {
      await cluster.addTargetTopic(topic);
      await cluster.refreshMetadataIfNecessary();
      return cluster.findTopicPartitionMetadata(topic).map(({ partitionId }) => partitionId).sort();
    };
    var indexByPartition = (array) => array.reduce((obj, _a) => {
      var _b = _a, { partition } = _b, props = __objRest(_b, ["partition"]);
      return Object.assign(obj, { [partition]: __spreadValues({}, props) });
    }, {});
    module2.exports = ({
      logger: rootLogger,
      instrumentationEmitter: rootInstrumentationEmitter,
      retry,
      cluster
    }) => {
      const logger = rootLogger.namespace("Admin");
      const instrumentationEmitter = rootInstrumentationEmitter || new InstrumentationEventEmitter();
      const connect = async () => {
        await cluster.connect();
        instrumentationEmitter.emit(CONNECT);
      };
      const disconnect = async () => {
        await cluster.disconnect();
        instrumentationEmitter.emit(DISCONNECT);
      };
      const listTopics = async () => {
        const { topicMetadata } = await cluster.metadata();
        const topics = topicMetadata.map((t) => t.topic);
        return topics;
      };
      const createTopics = async ({ topics, validateOnly, timeout, waitForLeaders = true }) => {
        if (!topics || !Array.isArray(topics)) {
          throw new KafkaJSNonRetriableError(`Invalid topics array ${topics}`);
        }
        if (topics.filter(({ topic }) => typeof topic !== "string").length > 0) {
          throw new KafkaJSNonRetriableError("Invalid topics array, the topic names have to be a valid string");
        }
        const topicNames = new Set(topics.map(({ topic }) => topic));
        if (topicNames.size < topics.length) {
          throw new KafkaJSNonRetriableError("Invalid topics array, it cannot have multiple entries for the same topic");
        }
        for (const { topic, configEntries } of topics) {
          if (configEntries == null) {
            continue;
          }
          if (!Array.isArray(configEntries)) {
            throw new KafkaJSNonRetriableError(`Invalid configEntries for topic "${topic}", must be an array`);
          }
          configEntries.forEach((entry, index) => {
            if (typeof entry !== "object" || entry == null) {
              throw new KafkaJSNonRetriableError(`Invalid configEntries for topic "${topic}". Entry ${index} must be an object`);
            }
            for (const requiredProperty of ["name", "value"]) {
              if (!Object.prototype.hasOwnProperty.call(entry, requiredProperty) || typeof entry[requiredProperty] !== "string") {
                throw new KafkaJSNonRetriableError(`Invalid configEntries for topic "${topic}". Entry ${index} must have a valid "${requiredProperty}" property`);
              }
            }
          });
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadata();
            const broker = await cluster.findControllerBroker();
            await broker.createTopics({ topics, validateOnly, timeout });
            if (waitForLeaders) {
              const topicNamesArray = Array.from(topicNames.values());
              await retryOnLeaderNotAvailable(async () => await broker.metadata(topicNamesArray), {
                delay: 100,
                maxWait: timeout,
                timeoutMessage: "Timed out while waiting for topic leaders"
              });
            }
            return true;
          } catch (e) {
            if (e.type === "NOT_CONTROLLER") {
              logger.warn("Could not create topics", { error: e.message, retryCount, retryTime });
              throw e;
            }
            if (e instanceof KafkaJSAggregateError) {
              if (e.errors.every((error) => error.type === "TOPIC_ALREADY_EXISTS")) {
                return false;
              }
            }
            bail(e);
          }
        });
      };
      const createPartitions = async ({ topicPartitions, validateOnly, timeout }) => {
        if (!topicPartitions || !Array.isArray(topicPartitions)) {
          throw new KafkaJSNonRetriableError(`Invalid topic partitions array ${topicPartitions}`);
        }
        if (topicPartitions.length === 0) {
          throw new KafkaJSNonRetriableError(`Empty topic partitions array`);
        }
        if (topicPartitions.filter(({ topic }) => typeof topic !== "string").length > 0) {
          throw new KafkaJSNonRetriableError("Invalid topic partitions array, the topic names have to be a valid string");
        }
        const topicNames = new Set(topicPartitions.map(({ topic }) => topic));
        if (topicNames.size < topicPartitions.length) {
          throw new KafkaJSNonRetriableError("Invalid topic partitions array, it cannot have multiple entries for the same topic");
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadata();
            const broker = await cluster.findControllerBroker();
            await broker.createPartitions({ topicPartitions, validateOnly, timeout });
          } catch (e) {
            if (e.type === "NOT_CONTROLLER") {
              logger.warn("Could not create topics", { error: e.message, retryCount, retryTime });
              throw e;
            }
            bail(e);
          }
        });
      };
      const deleteTopics = async ({ topics, timeout }) => {
        if (!topics || !Array.isArray(topics)) {
          throw new KafkaJSNonRetriableError(`Invalid topics array ${topics}`);
        }
        if (topics.filter((topic) => typeof topic !== "string").length > 0) {
          throw new KafkaJSNonRetriableError("Invalid topics array, the names must be a valid string");
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadata();
            const broker = await cluster.findControllerBroker();
            await broker.deleteTopics({ topics, timeout });
            for (const topic of topics) {
              cluster.targetTopics.delete(topic);
            }
            await cluster.refreshMetadata();
          } catch (e) {
            if (["NOT_CONTROLLER", "UNKNOWN_TOPIC_OR_PARTITION"].includes(e.type)) {
              logger.warn("Could not delete topics", { error: e.message, retryCount, retryTime });
              throw e;
            }
            if (e.type === "REQUEST_TIMED_OUT") {
              logger.error('Could not delete topics, check if "delete.topic.enable" is set to "true" (the default value is "false") or increase the timeout', {
                error: e.message,
                retryCount,
                retryTime
              });
            }
            bail(e);
          }
        });
      };
      const fetchTopicOffsets = async (topic) => {
        if (!topic || typeof topic !== "string") {
          throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`);
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.addTargetTopic(topic);
            await cluster.refreshMetadataIfNecessary();
            const metadata = cluster.findTopicPartitionMetadata(topic);
            const high = await cluster.fetchTopicsOffset([
              {
                topic,
                fromBeginning: false,
                partitions: metadata.map((p) => ({ partition: p.partitionId }))
              }
            ]);
            const low = await cluster.fetchTopicsOffset([
              {
                topic,
                fromBeginning: true,
                partitions: metadata.map((p) => ({ partition: p.partitionId }))
              }
            ]);
            const { partitions: highPartitions } = high.pop();
            const { partitions: lowPartitions } = low.pop();
            return highPartitions.map(({ partition, offset }) => ({
              partition,
              offset,
              high: offset,
              low: lowPartitions.find(({ partition: lowPartition }) => lowPartition === partition).offset
            }));
          } catch (e) {
            if (e.type === "UNKNOWN_TOPIC_OR_PARTITION") {
              await cluster.refreshMetadata();
              throw e;
            }
            bail(e);
          }
        });
      };
      const fetchTopicOffsetsByTimestamp = async (topic, timestamp) => {
        if (!topic || typeof topic !== "string") {
          throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`);
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.addTargetTopic(topic);
            await cluster.refreshMetadataIfNecessary();
            const metadata = cluster.findTopicPartitionMetadata(topic);
            const partitions = metadata.map((p) => ({ partition: p.partitionId }));
            const high = await cluster.fetchTopicsOffset([
              {
                topic,
                fromBeginning: false,
                partitions
              }
            ]);
            const { partitions: highPartitions } = high.pop();
            const offsets = await cluster.fetchTopicsOffset([
              {
                topic,
                fromTimestamp: timestamp,
                partitions
              }
            ]);
            const { partitions: lowPartitions } = offsets.pop();
            return lowPartitions.map(({ partition, offset }) => ({
              partition,
              offset: parseInt(offset, 10) >= 0 ? offset : highPartitions.find(({ partition: highPartition }) => highPartition === partition).offset
            }));
          } catch (e) {
            if (e.type === "UNKNOWN_TOPIC_OR_PARTITION") {
              await cluster.refreshMetadata();
              throw e;
            }
            bail(e);
          }
        });
      };
      const fetchOffsets = async ({ groupId, topics, resolveOffsets = false }) => {
        if (!groupId) {
          throw new KafkaJSNonRetriableError(`Invalid groupId ${groupId}`);
        }
        if (!topics) {
          topics = [];
        }
        if (!Array.isArray(topics)) {
          throw new KafkaJSNonRetriableError("Expected topics array to be set");
        }
        const coordinator = await cluster.findGroupCoordinator({ groupId });
        const topicsToFetch = await Promise.all(topics.map(async (topic) => {
          const partitions = await findTopicPartitions(cluster, topic);
          const partitionsToFetch = partitions.map((partition) => ({ partition }));
          return { topic, partitions: partitionsToFetch };
        }));
        let { responses: consumerOffsets } = await coordinator.offsetFetch({
          groupId,
          topics: topicsToFetch
        });
        if (resolveOffsets) {
          consumerOffsets = await Promise.all(consumerOffsets.map(async ({ topic, partitions }) => {
            const indexedOffsets = indexByPartition(await fetchTopicOffsets(topic));
            const recalculatedPartitions = partitions.map((_a) => {
              var _b = _a, { offset, partition } = _b, props = __objRest(_b, ["offset", "partition"]);
              let resolvedOffset = offset;
              if (Number(offset) === EARLIEST_OFFSET) {
                resolvedOffset = indexedOffsets[partition].low;
              }
              if (Number(offset) === LATEST_OFFSET) {
                resolvedOffset = indexedOffsets[partition].high;
              }
              return __spreadValues({
                partition,
                offset: resolvedOffset
              }, props);
            });
            await setOffsets({ groupId, topic, partitions: recalculatedPartitions });
            return {
              topic,
              partitions: recalculatedPartitions
            };
          }));
        }
        return consumerOffsets.map(({ topic, partitions }) => {
          const completePartitions = partitions.map(({ partition, offset, metadata }) => ({
            partition,
            offset,
            metadata: metadata || null
          }));
          return { topic, partitions: completePartitions };
        });
      };
      const resetOffsets = async ({ groupId, topic, earliest = false }) => {
        if (!groupId) {
          throw new KafkaJSNonRetriableError(`Invalid groupId ${groupId}`);
        }
        if (!topic) {
          throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`);
        }
        const partitions = await findTopicPartitions(cluster, topic);
        const partitionsToSeek = partitions.map((partition) => ({
          partition,
          offset: cluster.defaultOffset({ fromBeginning: earliest })
        }));
        return setOffsets({ groupId, topic, partitions: partitionsToSeek });
      };
      const setOffsets = async ({ groupId, topic, partitions }) => {
        if (!groupId) {
          throw new KafkaJSNonRetriableError(`Invalid groupId ${groupId}`);
        }
        if (!topic) {
          throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`);
        }
        if (!partitions || partitions.length === 0) {
          throw new KafkaJSNonRetriableError(`Invalid partitions`);
        }
        const consumer = createConsumer({
          logger: rootLogger.namespace("Admin", LEVELS.NOTHING),
          cluster,
          groupId
        });
        await consumer.subscribe({ topic, fromBeginning: true });
        const description = await consumer.describeGroup();
        if (!isConsumerGroupRunning(description)) {
          throw new KafkaJSNonRetriableError(`The consumer group must have no running instances, current state: ${description.state}`);
        }
        return new Promise((resolve, reject) => {
          consumer.on(consumer.events.FETCH, async () => consumer.stop().then(resolve).catch(reject));
          consumer.run({
            eachBatchAutoResolve: false,
            eachBatch: async () => true
          }).catch(reject);
          consumer.pause([{ topic }]);
          for (const seekData of partitions) {
            consumer.seek(__spreadValues({ topic }, seekData));
          }
        });
      };
      const isBrokerConfig = (type) => [CONFIG_RESOURCE_TYPES.BROKER, CONFIG_RESOURCE_TYPES.BROKER_LOGGER].includes(type);
      const groupResourcesByBroker = ({ resources, defaultBroker }) => groupBy(resources, async ({ type, name: nodeId }) => {
        return isBrokerConfig(type) ? await cluster.findBroker({ nodeId: String(nodeId) }) : defaultBroker;
      });
      const describeConfigs = async ({ resources, includeSynonyms }) => {
        if (!resources || !Array.isArray(resources)) {
          throw new KafkaJSNonRetriableError(`Invalid resources array ${resources}`);
        }
        if (resources.length === 0) {
          throw new KafkaJSNonRetriableError("Resources array cannot be empty");
        }
        const validResourceTypes = Object.values(CONFIG_RESOURCE_TYPES);
        const invalidType = resources.find((r) => !validResourceTypes.includes(r.type));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid resource type ${invalidType.type}: ${JSON.stringify(invalidType)}`);
        }
        const invalidName = resources.find((r) => !r.name || typeof r.name !== "string");
        if (invalidName) {
          throw new KafkaJSNonRetriableError(`Invalid resource name ${invalidName.name}: ${JSON.stringify(invalidName)}`);
        }
        const invalidConfigs = resources.find((r) => !Array.isArray(r.configNames) && r.configNames != null);
        if (invalidConfigs) {
          const { configNames } = invalidConfigs;
          throw new KafkaJSNonRetriableError(`Invalid resource configNames ${configNames}: ${JSON.stringify(invalidConfigs)}`);
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadata();
            const controller = await cluster.findControllerBroker();
            const resourcerByBroker = await groupResourcesByBroker({
              resources,
              defaultBroker: controller
            });
            const describeConfigsAction = async (broker) => {
              const targetBroker = broker || controller;
              return targetBroker.describeConfigs({
                resources: resourcerByBroker.get(targetBroker),
                includeSynonyms
              });
            };
            const brokers = Array.from(resourcerByBroker.keys());
            const responses = await Promise.all(brokers.map(describeConfigsAction));
            const responseResources = responses.reduce((result, { resources: resources2 }) => [...result, ...resources2], []);
            return { resources: responseResources };
          } catch (e) {
            if (e.type === "NOT_CONTROLLER") {
              logger.warn("Could not describe configs", { error: e.message, retryCount, retryTime });
              throw e;
            }
            bail(e);
          }
        });
      };
      const alterConfigs = async ({ resources, validateOnly }) => {
        if (!resources || !Array.isArray(resources)) {
          throw new KafkaJSNonRetriableError(`Invalid resources array ${resources}`);
        }
        if (resources.length === 0) {
          throw new KafkaJSNonRetriableError("Resources array cannot be empty");
        }
        const validResourceTypes = Object.values(CONFIG_RESOURCE_TYPES);
        const invalidType = resources.find((r) => !validResourceTypes.includes(r.type));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid resource type ${invalidType.type}: ${JSON.stringify(invalidType)}`);
        }
        const invalidName = resources.find((r) => !r.name || typeof r.name !== "string");
        if (invalidName) {
          throw new KafkaJSNonRetriableError(`Invalid resource name ${invalidName.name}: ${JSON.stringify(invalidName)}`);
        }
        const invalidConfigs = resources.find((r) => !Array.isArray(r.configEntries));
        if (invalidConfigs) {
          const { configEntries } = invalidConfigs;
          throw new KafkaJSNonRetriableError(`Invalid resource configEntries ${configEntries}: ${JSON.stringify(invalidConfigs)}`);
        }
        const invalidConfigValue = resources.find((r) => r.configEntries.some((e) => typeof e.name !== "string" || typeof e.value !== "string"));
        if (invalidConfigValue) {
          throw new KafkaJSNonRetriableError(`Invalid resource config value: ${JSON.stringify(invalidConfigValue)}`);
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadata();
            const controller = await cluster.findControllerBroker();
            const resourcerByBroker = await groupResourcesByBroker({
              resources,
              defaultBroker: controller
            });
            const alterConfigsAction = async (broker) => {
              const targetBroker = broker || controller;
              return targetBroker.alterConfigs({
                resources: resourcerByBroker.get(targetBroker),
                validateOnly: !!validateOnly
              });
            };
            const brokers = Array.from(resourcerByBroker.keys());
            const responses = await Promise.all(brokers.map(alterConfigsAction));
            const responseResources = responses.reduce((result, { resources: resources2 }) => [...result, ...resources2], []);
            return { resources: responseResources };
          } catch (e) {
            if (e.type === "NOT_CONTROLLER") {
              logger.warn("Could not alter configs", { error: e.message, retryCount, retryTime });
              throw e;
            }
            bail(e);
          }
        });
      };
      const fetchTopicMetadata = async ({ topics = [] } = {}) => {
        if (topics) {
          topics.forEach((topic) => {
            if (!topic || typeof topic !== "string") {
              throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`);
            }
          });
        }
        const metadata = await cluster.metadata({ topics });
        return {
          topics: metadata.topicMetadata.map((topicMetadata) => ({
            name: topicMetadata.topic,
            partitions: topicMetadata.partitionMetadata
          }))
        };
      };
      const describeCluster = async () => {
        const { brokers: nodes, clusterId, controllerId } = await cluster.metadata({ topics: [] });
        const brokers = nodes.map(({ nodeId, host, port }) => ({
          nodeId,
          host,
          port
        }));
        const controller = controllerId == null || controllerId === NO_CONTROLLER_ID ? null : controllerId;
        return {
          brokers,
          controller,
          clusterId
        };
      };
      const listGroups = async () => {
        await cluster.refreshMetadata();
        let groups = [];
        for (var nodeId in cluster.brokerPool.brokers) {
          const broker = await cluster.findBroker({ nodeId });
          const response = await broker.listGroups();
          groups = groups.concat(response.groups);
        }
        return { groups };
      };
      const describeGroups = async (groupIds) => {
        const coordinatorsForGroup = await Promise.all(groupIds.map(async (groupId) => {
          const coordinator = await cluster.findGroupCoordinator({ groupId });
          return {
            coordinator,
            groupId
          };
        }));
        const groupsByCoordinator = Object.values(coordinatorsForGroup.reduce((coordinators, { coordinator, groupId }) => {
          const group = coordinators[coordinator.nodeId];
          if (group) {
            coordinators[coordinator.nodeId] = __spreadProps(__spreadValues({}, group), {
              groupIds: [...group.groupIds, groupId]
            });
          } else {
            coordinators[coordinator.nodeId] = { coordinator, groupIds: [groupId] };
          }
          return coordinators;
        }, {}));
        const responses = await Promise.all(groupsByCoordinator.map(async ({ coordinator, groupIds: groupIds2 }) => {
          const retrier = createRetry(retry);
          const { groups: groups2 } = await retrier(() => coordinator.describeGroups({ groupIds: groupIds2 }));
          return groups2;
        }));
        const groups = [].concat.apply([], responses);
        return { groups };
      };
      const deleteGroups = async (groupIds) => {
        if (!groupIds || !Array.isArray(groupIds)) {
          throw new KafkaJSNonRetriableError(`Invalid groupIds array ${groupIds}`);
        }
        const invalidGroupId = groupIds.some((g) => typeof g !== "string");
        if (invalidGroupId) {
          throw new KafkaJSNonRetriableError(`Invalid groupId name: ${JSON.stringify(invalidGroupId)}`);
        }
        const retrier = createRetry(retry);
        let results = [];
        let clonedGroupIds = groupIds.slice();
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            if (clonedGroupIds.length === 0)
              return [];
            await cluster.refreshMetadata();
            const brokersPerGroups = {};
            const brokersPerNode = {};
            for (const groupId of clonedGroupIds) {
              const broker = await cluster.findGroupCoordinator({ groupId });
              if (brokersPerGroups[broker.nodeId] === void 0)
                brokersPerGroups[broker.nodeId] = [];
              brokersPerGroups[broker.nodeId].push(groupId);
              brokersPerNode[broker.nodeId] = broker;
            }
            const res = await Promise.all(Object.keys(brokersPerNode).map(async (nodeId) => await brokersPerNode[nodeId].deleteGroups(brokersPerGroups[nodeId])));
            const errors = res.flatMap(({ results: results2 }) => results2.map(({ groupId, errorCode, error }) => {
              return { groupId, errorCode, error };
            })).filter(({ errorCode }) => errorCode !== 0);
            clonedGroupIds = errors.map(({ groupId }) => groupId);
            if (errors.length > 0)
              throw new KafkaJSDeleteGroupsError("Error in DeleteGroups", errors);
            results = res.flatMap(({ results: results2 }) => results2);
            return results;
          } catch (e) {
            if (e.type === "NOT_CONTROLLER" || e.type === "COORDINATOR_NOT_AVAILABLE") {
              logger.warn("Could not delete groups", { error: e.message, retryCount, retryTime });
              throw e;
            }
            bail(e);
          }
        });
      };
      const deleteTopicRecords = async ({ topic, partitions }) => {
        if (!topic || typeof topic !== "string") {
          throw new KafkaJSNonRetriableError(`Invalid topic "${topic}"`);
        }
        if (!partitions || partitions.length === 0) {
          throw new KafkaJSNonRetriableError(`Invalid partitions`);
        }
        const partitionsByBroker = cluster.findLeaderForPartitions(topic, partitions.map((p) => p.partition));
        const partitionsFound = values(partitionsByBroker).flat();
        const topicOffsets = await fetchTopicOffsets(topic);
        const leaderNotFoundErrors = [];
        partitions.forEach(({ partition, offset }) => {
          if (!partitionsFound.includes(partition)) {
            leaderNotFoundErrors.push({
              partition,
              offset,
              error: new KafkaJSBrokerNotFound("Could not find the leader for the partition", {
                retriable: false
              })
            });
            return;
          }
          const { low } = topicOffsets.find((p) => p.partition === partition) || {
            high: void 0,
            low: void 0
          };
          if (parseInt(offset) < parseInt(low) && parseInt(offset) !== -1) {
            logger.warn("The requested offset is before the earliest offset maintained on the partition - no records will be deleted from this partition", {
              topic,
              partition,
              offset
            });
          }
        });
        if (leaderNotFoundErrors.length > 0) {
          throw new KafkaJSDeleteTopicRecordsError({ topic, partitions: leaderNotFoundErrors });
        }
        const seekEntriesByBroker = entries(partitionsByBroker).reduce((obj, [nodeId, nodePartitions]) => {
          obj[nodeId] = {
            topic,
            partitions: partitions.filter((p) => nodePartitions.includes(p.partition))
          };
          return obj;
        }, {});
        const retrier = createRetry(retry);
        return retrier(async (bail) => {
          try {
            const partitionErrors = [];
            const brokerRequests = entries(seekEntriesByBroker).map(([nodeId, { topic: topic2, partitions: partitions2 }]) => async () => {
              const broker = await cluster.findBroker({ nodeId });
              await broker.deleteRecords({ topics: [{ topic: topic2, partitions: partitions2 }] });
              delete seekEntriesByBroker[nodeId];
            });
            await Promise.all(brokerRequests.map((request) => request().catch((e) => {
              if (e.name === "KafkaJSDeleteTopicRecordsError") {
                e.partitions.forEach(({ partition, offset, error }) => {
                  partitionErrors.push({
                    partition,
                    offset,
                    error
                  });
                });
              } else {
                throw e;
              }
            })));
            if (partitionErrors.length > 0) {
              throw new KafkaJSDeleteTopicRecordsError({
                topic,
                partitions: partitionErrors
              });
            }
          } catch (e) {
            if (e.retriable && e.partitions.some(({ error }) => staleMetadata(error) || error.name === "KafkaJSMetadataNotLoaded")) {
              await cluster.refreshMetadata();
            }
            throw e;
          }
        });
      };
      const createAcls = async ({ acl }) => {
        if (!acl || !Array.isArray(acl)) {
          throw new KafkaJSNonRetriableError(`Invalid ACL array ${acl}`);
        }
        if (acl.length === 0) {
          throw new KafkaJSNonRetriableError("Empty ACL array");
        }
        if (acl.some(({ principal }) => typeof principal !== "string")) {
          throw new KafkaJSNonRetriableError("Invalid ACL array, the principals have to be a valid string");
        }
        if (acl.some(({ host }) => typeof host !== "string")) {
          throw new KafkaJSNonRetriableError("Invalid ACL array, the hosts have to be a valid string");
        }
        if (acl.some(({ resourceName }) => typeof resourceName !== "string")) {
          throw new KafkaJSNonRetriableError("Invalid ACL array, the resourceNames have to be a valid string");
        }
        let invalidType;
        const validOperationTypes = Object.values(ACL_OPERATION_TYPES);
        invalidType = acl.find((i) => !validOperationTypes.includes(i.operation));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid operation type ${invalidType.operation}: ${JSON.stringify(invalidType)}`);
        }
        const validResourcePatternTypes = Object.values(RESOURCE_PATTERN_TYPES);
        invalidType = acl.find((i) => !validResourcePatternTypes.includes(i.resourcePatternType));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid resource pattern type ${invalidType.resourcePatternType}: ${JSON.stringify(invalidType)}`);
        }
        const validPermissionTypes = Object.values(ACL_PERMISSION_TYPES);
        invalidType = acl.find((i) => !validPermissionTypes.includes(i.permissionType));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid permission type ${invalidType.permissionType}: ${JSON.stringify(invalidType)}`);
        }
        const validResourceTypes = Object.values(ACL_RESOURCE_TYPES);
        invalidType = acl.find((i) => !validResourceTypes.includes(i.resourceType));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid resource type ${invalidType.resourceType}: ${JSON.stringify(invalidType)}`);
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadata();
            const broker = await cluster.findControllerBroker();
            await broker.createAcls({ acl });
            return true;
          } catch (e) {
            if (e.type === "NOT_CONTROLLER") {
              logger.warn("Could not create ACL", { error: e.message, retryCount, retryTime });
              throw e;
            }
            bail(e);
          }
        });
      };
      const describeAcls = async ({
        resourceType,
        resourceName,
        resourcePatternType,
        principal,
        host,
        operation,
        permissionType
      }) => {
        if (typeof principal !== "string" && typeof principal !== "undefined") {
          throw new KafkaJSNonRetriableError("Invalid principal, the principal have to be a valid string");
        }
        if (typeof host !== "string" && typeof host !== "undefined") {
          throw new KafkaJSNonRetriableError("Invalid host, the host have to be a valid string");
        }
        if (typeof resourceName !== "string" && typeof resourceName !== "undefined") {
          throw new KafkaJSNonRetriableError("Invalid resourceName, the resourceName have to be a valid string");
        }
        const validOperationTypes = Object.values(ACL_OPERATION_TYPES);
        if (!validOperationTypes.includes(operation)) {
          throw new KafkaJSNonRetriableError(`Invalid operation type ${operation}`);
        }
        const validResourcePatternTypes = Object.values(RESOURCE_PATTERN_TYPES);
        if (!validResourcePatternTypes.includes(resourcePatternType)) {
          throw new KafkaJSNonRetriableError(`Invalid resource pattern filter type ${resourcePatternType}`);
        }
        const validPermissionTypes = Object.values(ACL_PERMISSION_TYPES);
        if (!validPermissionTypes.includes(permissionType)) {
          throw new KafkaJSNonRetriableError(`Invalid permission type ${permissionType}`);
        }
        const validResourceTypes = Object.values(ACL_RESOURCE_TYPES);
        if (!validResourceTypes.includes(resourceType)) {
          throw new KafkaJSNonRetriableError(`Invalid resource type ${resourceType}`);
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadata();
            const broker = await cluster.findControllerBroker();
            const { resources } = await broker.describeAcls({
              resourceType,
              resourceName,
              resourcePatternType,
              principal,
              host,
              operation,
              permissionType
            });
            return { resources };
          } catch (e) {
            if (e.type === "NOT_CONTROLLER") {
              logger.warn("Could not describe ACL", { error: e.message, retryCount, retryTime });
              throw e;
            }
            bail(e);
          }
        });
      };
      const deleteAcls = async ({ filters }) => {
        if (!filters || !Array.isArray(filters)) {
          throw new KafkaJSNonRetriableError(`Invalid ACL Filter array ${filters}`);
        }
        if (filters.length === 0) {
          throw new KafkaJSNonRetriableError("Empty ACL Filter array");
        }
        if (filters.some(({ principal }) => typeof principal !== "string" && typeof principal !== "undefined")) {
          throw new KafkaJSNonRetriableError("Invalid ACL Filter array, the principals have to be a valid string");
        }
        if (filters.some(({ host }) => typeof host !== "string" && typeof host !== "undefined")) {
          throw new KafkaJSNonRetriableError("Invalid ACL Filter array, the hosts have to be a valid string");
        }
        if (filters.some(({ resourceName }) => typeof resourceName !== "string" && typeof resourceName !== "undefined")) {
          throw new KafkaJSNonRetriableError("Invalid ACL Filter array, the resourceNames have to be a valid string");
        }
        let invalidType;
        const validOperationTypes = Object.values(ACL_OPERATION_TYPES);
        invalidType = filters.find((i) => !validOperationTypes.includes(i.operation));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid operation type ${invalidType.operation}: ${JSON.stringify(invalidType)}`);
        }
        const validResourcePatternTypes = Object.values(RESOURCE_PATTERN_TYPES);
        invalidType = filters.find((i) => !validResourcePatternTypes.includes(i.resourcePatternType));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid resource pattern type ${invalidType.resourcePatternType}: ${JSON.stringify(invalidType)}`);
        }
        const validPermissionTypes = Object.values(ACL_PERMISSION_TYPES);
        invalidType = filters.find((i) => !validPermissionTypes.includes(i.permissionType));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid permission type ${invalidType.permissionType}: ${JSON.stringify(invalidType)}`);
        }
        const validResourceTypes = Object.values(ACL_RESOURCE_TYPES);
        invalidType = filters.find((i) => !validResourceTypes.includes(i.resourceType));
        if (invalidType) {
          throw new KafkaJSNonRetriableError(`Invalid resource type ${invalidType.resourceType}: ${JSON.stringify(invalidType)}`);
        }
        const retrier = createRetry(retry);
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadata();
            const broker = await cluster.findControllerBroker();
            const { filterResponses } = await broker.deleteAcls({ filters });
            return { filterResponses };
          } catch (e) {
            if (e.type === "NOT_CONTROLLER") {
              logger.warn("Could not delete ACL", { error: e.message, retryCount, retryTime });
              throw e;
            }
            bail(e);
          }
        });
      };
      const on = (eventName, listener) => {
        if (!eventNames.includes(eventName)) {
          throw new KafkaJSNonRetriableError(`Event name should be one of ${eventKeys}`);
        }
        return instrumentationEmitter.addListener(unwrapEvent(eventName), (event) => {
          event.type = wrapEvent(event.type);
          Promise.resolve(listener(event)).catch((e) => {
            logger.error(`Failed to execute listener: ${e.message}`, {
              eventName,
              stack: e.stack
            });
          });
        });
      };
      const getLogger = () => logger;
      return {
        connect,
        disconnect,
        listTopics,
        createTopics,
        deleteTopics,
        createPartitions,
        fetchTopicMetadata,
        describeCluster,
        events,
        fetchOffsets,
        fetchTopicOffsets,
        fetchTopicOffsetsByTimestamp,
        setOffsets,
        resetOffsets,
        describeConfigs,
        alterConfigs,
        on,
        logger: getLogger,
        listGroups,
        describeGroups,
        deleteGroups,
        describeAcls,
        deleteAcls,
        createAcls,
        deleteTopicRecords
      };
    };
  }
});

// node_modules/kafkajs/src/network/socketFactory.js
var require_socketFactory = __commonJS({
  "node_modules/kafkajs/src/network/socketFactory.js"(exports, module2) {
    var KEEP_ALIVE_DELAY = 6e4;
    module2.exports = () => {
      const net = require("net");
      const tls = require("tls");
      return ({ host, port, ssl, onConnect }) => {
        const socket = ssl ? tls.connect(Object.assign({ host, port, servername: host }, ssl), onConnect) : net.connect({ host, port }, onConnect);
        socket.setKeepAlive(true, KEEP_ALIVE_DELAY);
        return socket;
      };
    };
  }
});

// node_modules/kafkajs/src/utils/once.js
var require_once = __commonJS({
  "node_modules/kafkajs/src/utils/once.js"(exports, module2) {
    module2.exports = (fn) => {
      let called = false;
      return (...args) => {
        if (!called) {
          called = true;
          return fn(...args);
        }
      };
    };
  }
});

// node_modules/kafkajs/src/index.js
var require_src = __commonJS({
  "node_modules/kafkajs/src/index.js"(exports, module2) {
    var {
      createLogger,
      LEVELS: { INFO }
    } = require_loggers();
    var InstrumentationEventEmitter = require_emitter();
    var LoggerConsole = require_console();
    var Cluster = require_cluster();
    var createProducer = require_producer();
    var createConsumer = require_consumer();
    var createAdmin = require_admin();
    var ISOLATION_LEVEL = require_isolationLevel();
    var defaultSocketFactory = require_socketFactory();
    var once = require_once();
    var websiteUrl = require_websiteUrl();
    var PRIVATE = {
      CREATE_CLUSTER: Symbol("private:Kafka:createCluster"),
      CLUSTER_RETRY: Symbol("private:Kafka:clusterRetry"),
      LOGGER: Symbol("private:Kafka:logger"),
      OFFSETS: Symbol("private:Kafka:offsets")
    };
    var DEFAULT_METADATA_MAX_AGE = 3e5;
    var warnOfDefaultPartitioner = once((logger) => {
      if (process.env.KAFKAJS_NO_PARTITIONER_WARNING == null) {
        logger.warn(`KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option "createPartitioner: Partitioners.LegacyPartitioner". See the migration guide at ${websiteUrl("docs/migration-guide-v2.0.0", "producer-new-default-partitioner")} for details. Silence this warning by setting the environment variable "KAFKAJS_NO_PARTITIONER_WARNING=1"`);
      }
    });
    module2.exports = class Client {
      constructor({
        brokers,
        ssl,
        sasl,
        clientId,
        connectionTimeout = 1e3,
        authenticationTimeout,
        reauthenticationThreshold,
        requestTimeout,
        enforceRequestTimeout = true,
        retry,
        socketFactory = defaultSocketFactory(),
        logLevel = INFO,
        logCreator = LoggerConsole
      }) {
        this[PRIVATE.OFFSETS] = /* @__PURE__ */ new Map();
        this[PRIVATE.LOGGER] = createLogger({ level: logLevel, logCreator });
        this[PRIVATE.CLUSTER_RETRY] = retry;
        this[PRIVATE.CREATE_CLUSTER] = ({
          metadataMaxAge,
          allowAutoTopicCreation = true,
          maxInFlightRequests = null,
          instrumentationEmitter = null,
          isolationLevel
        }) => new Cluster({
          logger: this[PRIVATE.LOGGER],
          retry: this[PRIVATE.CLUSTER_RETRY],
          offsets: this[PRIVATE.OFFSETS],
          socketFactory,
          brokers,
          ssl,
          sasl,
          clientId,
          connectionTimeout,
          authenticationTimeout,
          reauthenticationThreshold,
          requestTimeout,
          enforceRequestTimeout,
          metadataMaxAge,
          instrumentationEmitter,
          allowAutoTopicCreation,
          maxInFlightRequests,
          isolationLevel
        });
      }
      producer({
        createPartitioner,
        retry,
        metadataMaxAge = DEFAULT_METADATA_MAX_AGE,
        allowAutoTopicCreation,
        idempotent,
        transactionalId,
        transactionTimeout,
        maxInFlightRequests
      } = {}) {
        const instrumentationEmitter = new InstrumentationEventEmitter();
        const cluster = this[PRIVATE.CREATE_CLUSTER]({
          metadataMaxAge,
          allowAutoTopicCreation,
          maxInFlightRequests,
          instrumentationEmitter
        });
        if (createPartitioner == null) {
          warnOfDefaultPartitioner(this[PRIVATE.LOGGER]);
        }
        return createProducer({
          retry: __spreadValues(__spreadValues({}, this[PRIVATE.CLUSTER_RETRY]), retry),
          logger: this[PRIVATE.LOGGER],
          cluster,
          createPartitioner,
          idempotent,
          transactionalId,
          transactionTimeout,
          instrumentationEmitter
        });
      }
      consumer({
        groupId,
        partitionAssigners,
        metadataMaxAge = DEFAULT_METADATA_MAX_AGE,
        sessionTimeout,
        rebalanceTimeout,
        heartbeatInterval,
        maxBytesPerPartition,
        minBytes,
        maxBytes,
        maxWaitTimeInMs,
        retry = { retries: 5 },
        allowAutoTopicCreation,
        maxInFlightRequests,
        readUncommitted = false,
        rackId = ""
      } = {}) {
        const isolationLevel = readUncommitted ? ISOLATION_LEVEL.READ_UNCOMMITTED : ISOLATION_LEVEL.READ_COMMITTED;
        const instrumentationEmitter = new InstrumentationEventEmitter();
        const cluster = this[PRIVATE.CREATE_CLUSTER]({
          metadataMaxAge,
          allowAutoTopicCreation,
          maxInFlightRequests,
          isolationLevel,
          instrumentationEmitter
        });
        return createConsumer({
          retry: __spreadValues(__spreadValues({}, this[PRIVATE.CLUSTER_RETRY]), retry),
          logger: this[PRIVATE.LOGGER],
          cluster,
          groupId,
          partitionAssigners,
          sessionTimeout,
          rebalanceTimeout,
          heartbeatInterval,
          maxBytesPerPartition,
          minBytes,
          maxBytes,
          maxWaitTimeInMs,
          isolationLevel,
          instrumentationEmitter,
          rackId,
          metadataMaxAge
        });
      }
      admin({ retry } = {}) {
        const instrumentationEmitter = new InstrumentationEventEmitter();
        const cluster = this[PRIVATE.CREATE_CLUSTER]({
          allowAutoTopicCreation: false,
          instrumentationEmitter
        });
        return createAdmin({
          retry: __spreadValues(__spreadValues({}, this[PRIVATE.CLUSTER_RETRY]), retry),
          logger: this[PRIVATE.LOGGER],
          instrumentationEmitter,
          cluster
        });
      }
      logger() {
        return this[PRIVATE.LOGGER];
      }
    };
  }
});

// node_modules/kafkajs/index.js
var require_kafkajs = __commonJS({
  "node_modules/kafkajs/index.js"(exports, module2) {
    var Kafka2 = require_src();
    var PartitionAssigners = require_assigners();
    var AssignerProtocol = require_assignerProtocol();
    var Partitioners = require_partitioners();
    var Compression = require_compression();
    var ConfigResourceTypes = require_configResourceTypes();
    var ConfigSource = require_configSource();
    var AclResourceTypes = require_aclResourceTypes();
    var AclOperationTypes = require_aclOperationTypes();
    var AclPermissionTypes = require_aclPermissionTypes();
    var ResourcePatternTypes = require_resourcePatternTypes();
    var _a = require_errors(), { isRebalancing, isKafkaJSError } = _a, errors = __objRest(_a, ["isRebalancing", "isKafkaJSError"]);
    var { LEVELS } = require_loggers();
    module2.exports = __spreadValues({
      Kafka: Kafka2,
      PartitionAssigners,
      AssignerProtocol,
      Partitioners,
      logLevel: LEVELS,
      CompressionTypes: Compression.Types,
      CompressionCodecs: Compression.Codecs,
      ConfigResourceTypes,
      AclResourceTypes,
      AclOperationTypes,
      AclPermissionTypes,
      ResourcePatternTypes,
      ConfigSource
    }, errors);
  }
});

// index.js
var core = require_core();
var { Kafka } = require_kafkajs();
(async () => {
  try {
    const KAFKA_BROKER_URL = core.getInput("KAFKA_BROKER_URL");
    const KAFKA_SSL_CA = core.getInput("KAFKA_SSL_CA");
    const KAFKA_SSL_KEY = core.getInput("KAFKA_SSL_KEY");
    const KAFKA_SSL_CERT = core.getInput("KAFKA_SSL_CERT");
    const TOPIC = core.getInput("TOPIC");
    const REPLICATION_FACTOR = core.getInput("REPLICATION_FACTOR");
    const NUM_PARTITIONS = core.getInput("NUM_PARTITIONS");
    const CLEANUP_POLICY = core.getInput("CLEANUP_POLICY");
    const adminClient = new Kafka({
      clientId: "create-kafka-topic-gha",
      brokers: [KAFKA_BROKER_URL],
      ssl: {
        ca: [KAFKA_SSL_CA],
        key: KAFKA_SSL_KEY,
        cert: KAFKA_SSL_CERT
      }
    }).admin();
    await adminClient.connect();
    await adminClient.createTopics({
      topics: [{
        topic: topicName,
        replicationFactor: REPLICATION_FACTOR,
        numPartitions: NUM_PARTITIONS,
        configEntries: [
          { name: "cleanup.policy", value: CLEANUP_POLICY }
        ]
      }]
    });
    await adminClient.disconnect();
  } catch (e) {
    core.setFailed(e.message);
  }
})();
