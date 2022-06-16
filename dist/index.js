/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5604:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(1245);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 5127:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(5604);
const file_command_1 = __nccwpck_require__(7352);
const utils_1 = __nccwpck_require__(1245);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const oidc_utils_1 = __nccwpck_require__(4457);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(9124);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(9124);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(7169);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 7352:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(1245);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 4457:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(6227);
const auth_1 = __nccwpck_require__(5181);
const core_1 = __nccwpck_require__(5127);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 7169:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(1017));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 9124:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(2037);
const fs_1 = __nccwpck_require__(7147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
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
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 1245:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
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
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 6227:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(3685));
const https = __importStar(__nccwpck_require__(5687));
const pm = __importStar(__nccwpck_require__(603));
const tunnel = __importStar(__nccwpck_require__(7265));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
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
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
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
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
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
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
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
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
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
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
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
            return new Promise(resolve => setTimeout(() => resolve(), ms));
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
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
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
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 603:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        return new URL(proxyVar);
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 3494:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Kafka = __nccwpck_require__(8609)
const PartitionAssigners = __nccwpck_require__(9299)
const AssignerProtocol = __nccwpck_require__(1976)
const Partitioners = __nccwpck_require__(9097)
const Compression = __nccwpck_require__(9719)
const ConfigResourceTypes = __nccwpck_require__(430)
const ConfigSource = __nccwpck_require__(4277)
const AclResourceTypes = __nccwpck_require__(5297)
const AclOperationTypes = __nccwpck_require__(7906)
const AclPermissionTypes = __nccwpck_require__(961)
const ResourcePatternTypes = __nccwpck_require__(8589)
const { isRebalancing, isKafkaJSError, ...errors } = __nccwpck_require__(5073)
const { LEVELS } = __nccwpck_require__(1203)

module.exports = {
  Kafka,
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
  ConfigSource,
  ...errors,
}


/***/ }),

/***/ 599:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const createRetry = __nccwpck_require__(1862)
const waitFor = __nccwpck_require__(8840)
const groupBy = __nccwpck_require__(1958)
const createConsumer = __nccwpck_require__(4148)
const InstrumentationEventEmitter = __nccwpck_require__(4491)
const { events, wrap: wrapEvent, unwrap: unwrapEvent } = __nccwpck_require__(1802)
const { LEVELS } = __nccwpck_require__(1203)
const {
  KafkaJSNonRetriableError,
  KafkaJSDeleteGroupsError,
  KafkaJSBrokerNotFound,
  KafkaJSDeleteTopicRecordsError,
  KafkaJSAggregateError,
} = __nccwpck_require__(5073)
const { staleMetadata } = __nccwpck_require__(5903)
const CONFIG_RESOURCE_TYPES = __nccwpck_require__(430)
const ACL_RESOURCE_TYPES = __nccwpck_require__(5297)
const ACL_OPERATION_TYPES = __nccwpck_require__(7906)
const ACL_PERMISSION_TYPES = __nccwpck_require__(961)
const RESOURCE_PATTERN_TYPES = __nccwpck_require__(8589)
const { EARLIEST_OFFSET, LATEST_OFFSET } = __nccwpck_require__(7368)

const { CONNECT, DISCONNECT } = events

const NO_CONTROLLER_ID = -1

const { values, keys, entries } = Object
const eventNames = values(events)
const eventKeys = keys(events)
  .map(key => `admin.events.${key}`)
  .join(', ')

const retryOnLeaderNotAvailable = (fn, opts = {}) => {
  const callback = async () => {
    try {
      return await fn()
    } catch (e) {
      if (e.type !== 'LEADER_NOT_AVAILABLE') {
        throw e
      }
      return false
    }
  }

  return waitFor(callback, opts)
}

const isConsumerGroupRunning = description => ['Empty', 'Dead'].includes(description.state)
const findTopicPartitions = async (cluster, topic) => {
  await cluster.addTargetTopic(topic)
  await cluster.refreshMetadataIfNecessary()

  return cluster
    .findTopicPartitionMetadata(topic)
    .map(({ partitionId }) => partitionId)
    .sort()
}
const indexByPartition = array =>
  array.reduce(
    (obj, { partition, ...props }) => Object.assign(obj, { [partition]: { ...props } }),
    {}
  )

/**
 *
 * @param {Object} params
 * @param {import("../../types").Logger} params.logger
 * @param {InstrumentationEventEmitter} [params.instrumentationEmitter]
 * @param {import('../../types').RetryOptions} params.retry
 * @param {import("../../types").Cluster} params.cluster
 *
 * @returns {import("../../types").Admin}
 */
module.exports = ({
  logger: rootLogger,
  instrumentationEmitter: rootInstrumentationEmitter,
  retry,
  cluster,
}) => {
  const logger = rootLogger.namespace('Admin')
  const instrumentationEmitter = rootInstrumentationEmitter || new InstrumentationEventEmitter()

  /**
   * @returns {Promise}
   */
  const connect = async () => {
    await cluster.connect()
    instrumentationEmitter.emit(CONNECT)
  }

  /**
   * @return {Promise}
   */
  const disconnect = async () => {
    await cluster.disconnect()
    instrumentationEmitter.emit(DISCONNECT)
  }

  /**
   * @return {Promise}
   */
  const listTopics = async () => {
    const { topicMetadata } = await cluster.metadata()
    const topics = topicMetadata.map(t => t.topic)
    return topics
  }

  /**
   * @param {Object} request
   * @param {array} request.topics
   * @param {boolean} [request.validateOnly=false]
   * @param {number} [request.timeout=5000]
   * @param {boolean} [request.waitForLeaders=true]
   * @return {Promise}
   */
  const createTopics = async ({ topics, validateOnly, timeout, waitForLeaders = true }) => {
    if (!topics || !Array.isArray(topics)) {
      throw new KafkaJSNonRetriableError(`Invalid topics array ${topics}`)
    }

    if (topics.filter(({ topic }) => typeof topic !== 'string').length > 0) {
      throw new KafkaJSNonRetriableError(
        'Invalid topics array, the topic names have to be a valid string'
      )
    }

    const topicNames = new Set(topics.map(({ topic }) => topic))
    if (topicNames.size < topics.length) {
      throw new KafkaJSNonRetriableError(
        'Invalid topics array, it cannot have multiple entries for the same topic'
      )
    }

    for (const { topic, configEntries } of topics) {
      if (configEntries == null) {
        continue
      }

      if (!Array.isArray(configEntries)) {
        throw new KafkaJSNonRetriableError(
          `Invalid configEntries for topic "${topic}", must be an array`
        )
      }

      configEntries.forEach((entry, index) => {
        if (typeof entry !== 'object' || entry == null) {
          throw new KafkaJSNonRetriableError(
            `Invalid configEntries for topic "${topic}". Entry ${index} must be an object`
          )
        }

        for (const requiredProperty of ['name', 'value']) {
          if (
            !Object.prototype.hasOwnProperty.call(entry, requiredProperty) ||
            typeof entry[requiredProperty] !== 'string'
          ) {
            throw new KafkaJSNonRetriableError(
              `Invalid configEntries for topic "${topic}". Entry ${index} must have a valid "${requiredProperty}" property`
            )
          }
        }
      })
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        await broker.createTopics({ topics, validateOnly, timeout })

        if (waitForLeaders) {
          const topicNamesArray = Array.from(topicNames.values())
          await retryOnLeaderNotAvailable(async () => await broker.metadata(topicNamesArray), {
            delay: 100,
            maxWait: timeout,
            timeoutMessage: 'Timed out while waiting for topic leaders',
          })
        }

        return true
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not create topics', { error: e.message, retryCount, retryTime })
          throw e
        }

        if (e instanceof KafkaJSAggregateError) {
          if (e.errors.every(error => error.type === 'TOPIC_ALREADY_EXISTS')) {
            return false
          }
        }

        bail(e)
      }
    })
  }
  /**
   * @param {array} topicPartitions
   * @param {boolean} [validateOnly=false]
   * @param {number} [timeout=5000]
   * @return {Promise<void>}
   */
  const createPartitions = async ({ topicPartitions, validateOnly, timeout }) => {
    if (!topicPartitions || !Array.isArray(topicPartitions)) {
      throw new KafkaJSNonRetriableError(`Invalid topic partitions array ${topicPartitions}`)
    }
    if (topicPartitions.length === 0) {
      throw new KafkaJSNonRetriableError(`Empty topic partitions array`)
    }

    if (topicPartitions.filter(({ topic }) => typeof topic !== 'string').length > 0) {
      throw new KafkaJSNonRetriableError(
        'Invalid topic partitions array, the topic names have to be a valid string'
      )
    }

    const topicNames = new Set(topicPartitions.map(({ topic }) => topic))
    if (topicNames.size < topicPartitions.length) {
      throw new KafkaJSNonRetriableError(
        'Invalid topic partitions array, it cannot have multiple entries for the same topic'
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        await broker.createPartitions({ topicPartitions, validateOnly, timeout })
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not create topics', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {string[]} topics
   * @param {number} [timeout=5000]
   * @return {Promise}
   */
  const deleteTopics = async ({ topics, timeout }) => {
    if (!topics || !Array.isArray(topics)) {
      throw new KafkaJSNonRetriableError(`Invalid topics array ${topics}`)
    }

    if (topics.filter(topic => typeof topic !== 'string').length > 0) {
      throw new KafkaJSNonRetriableError('Invalid topics array, the names must be a valid string')
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        await broker.deleteTopics({ topics, timeout })

        // Remove deleted topics
        for (const topic of topics) {
          cluster.targetTopics.delete(topic)
        }

        await cluster.refreshMetadata()
      } catch (e) {
        if (['NOT_CONTROLLER', 'UNKNOWN_TOPIC_OR_PARTITION'].includes(e.type)) {
          logger.warn('Could not delete topics', { error: e.message, retryCount, retryTime })
          throw e
        }

        if (e.type === 'REQUEST_TIMED_OUT') {
          logger.error(
            'Could not delete topics, check if "delete.topic.enable" is set to "true" (the default value is "false") or increase the timeout',
            {
              error: e.message,
              retryCount,
              retryTime,
            }
          )
        }

        bail(e)
      }
    })
  }

  /**
   * @param {string} topic
   */

  const fetchTopicOffsets = async topic => {
    if (!topic || typeof topic !== 'string') {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.addTargetTopic(topic)
        await cluster.refreshMetadataIfNecessary()

        const metadata = cluster.findTopicPartitionMetadata(topic)
        const high = await cluster.fetchTopicsOffset([
          {
            topic,
            fromBeginning: false,
            partitions: metadata.map(p => ({ partition: p.partitionId })),
          },
        ])

        const low = await cluster.fetchTopicsOffset([
          {
            topic,
            fromBeginning: true,
            partitions: metadata.map(p => ({ partition: p.partitionId })),
          },
        ])

        const { partitions: highPartitions } = high.pop()
        const { partitions: lowPartitions } = low.pop()
        return highPartitions.map(({ partition, offset }) => ({
          partition,
          offset,
          high: offset,
          low: lowPartitions.find(({ partition: lowPartition }) => lowPartition === partition)
            .offset,
        }))
      } catch (e) {
        if (e.type === 'UNKNOWN_TOPIC_OR_PARTITION') {
          await cluster.refreshMetadata()
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {string} topic
   * @param {number} [timestamp]
   */

  const fetchTopicOffsetsByTimestamp = async (topic, timestamp) => {
    if (!topic || typeof topic !== 'string') {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.addTargetTopic(topic)
        await cluster.refreshMetadataIfNecessary()

        const metadata = cluster.findTopicPartitionMetadata(topic)
        const partitions = metadata.map(p => ({ partition: p.partitionId }))

        const high = await cluster.fetchTopicsOffset([
          {
            topic,
            fromBeginning: false,
            partitions,
          },
        ])
        const { partitions: highPartitions } = high.pop()

        const offsets = await cluster.fetchTopicsOffset([
          {
            topic,
            fromTimestamp: timestamp,
            partitions,
          },
        ])
        const { partitions: lowPartitions } = offsets.pop()

        return lowPartitions.map(({ partition, offset }) => ({
          partition,
          offset:
            parseInt(offset, 10) >= 0
              ? offset
              : highPartitions.find(({ partition: highPartition }) => highPartition === partition)
                  .offset,
        }))
      } catch (e) {
        if (e.type === 'UNKNOWN_TOPIC_OR_PARTITION') {
          await cluster.refreshMetadata()
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * Fetch offsets for a topic or multiple topics
   *
   * Note: set either topic or topics but not both.
   *
   * @param {string} groupId
   * @param {string[]} topics - list of topics to fetch offsets for, defaults to `[]` which fetches all topics for `groupId`.
   * @param {boolean} [resolveOffsets=false]
   * @return {Promise}
   */
  const fetchOffsets = async ({ groupId, topics, resolveOffsets = false }) => {
    if (!groupId) {
      throw new KafkaJSNonRetriableError(`Invalid groupId ${groupId}`)
    }

    if (!topics) {
      topics = []
    }

    if (!Array.isArray(topics)) {
      throw new KafkaJSNonRetriableError('Expected topics array to be set')
    }

    const coordinator = await cluster.findGroupCoordinator({ groupId })
    const topicsToFetch = await Promise.all(
      topics.map(async topic => {
        const partitions = await findTopicPartitions(cluster, topic)
        const partitionsToFetch = partitions.map(partition => ({ partition }))
        return { topic, partitions: partitionsToFetch }
      })
    )
    let { responses: consumerOffsets } = await coordinator.offsetFetch({
      groupId,
      topics: topicsToFetch,
    })

    if (resolveOffsets) {
      consumerOffsets = await Promise.all(
        consumerOffsets.map(async ({ topic, partitions }) => {
          const indexedOffsets = indexByPartition(await fetchTopicOffsets(topic))
          const recalculatedPartitions = partitions.map(({ offset, partition, ...props }) => {
            let resolvedOffset = offset
            if (Number(offset) === EARLIEST_OFFSET) {
              resolvedOffset = indexedOffsets[partition].low
            }
            if (Number(offset) === LATEST_OFFSET) {
              resolvedOffset = indexedOffsets[partition].high
            }
            return {
              partition,
              offset: resolvedOffset,
              ...props,
            }
          })

          await setOffsets({ groupId, topic, partitions: recalculatedPartitions })

          return {
            topic,
            partitions: recalculatedPartitions,
          }
        })
      )
    }

    return consumerOffsets.map(({ topic, partitions }) => {
      const completePartitions = partitions.map(({ partition, offset, metadata }) => ({
        partition,
        offset,
        metadata: metadata || null,
      }))

      return { topic, partitions: completePartitions }
    })
  }

  /**
   * @param {string} groupId
   * @param {string} topic
   * @param {boolean} [earliest=false]
   * @return {Promise}
   */
  const resetOffsets = async ({ groupId, topic, earliest = false }) => {
    if (!groupId) {
      throw new KafkaJSNonRetriableError(`Invalid groupId ${groupId}`)
    }

    if (!topic) {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    const partitions = await findTopicPartitions(cluster, topic)
    const partitionsToSeek = partitions.map(partition => ({
      partition,
      offset: cluster.defaultOffset({ fromBeginning: earliest }),
    }))

    return setOffsets({ groupId, topic, partitions: partitionsToSeek })
  }

  /**
   * @param {string} groupId
   * @param {string} topic
   * @param {Array<SeekEntry>} partitions
   * @return {Promise}
   *
   * @typedef {Object} SeekEntry
   * @property {number} partition
   * @property {string} offset
   */
  const setOffsets = async ({ groupId, topic, partitions }) => {
    if (!groupId) {
      throw new KafkaJSNonRetriableError(`Invalid groupId ${groupId}`)
    }

    if (!topic) {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    if (!partitions || partitions.length === 0) {
      throw new KafkaJSNonRetriableError(`Invalid partitions`)
    }

    const consumer = createConsumer({
      logger: rootLogger.namespace('Admin', LEVELS.NOTHING),
      cluster,
      groupId,
    })

    await consumer.subscribe({ topic, fromBeginning: true })
    const description = await consumer.describeGroup()

    if (!isConsumerGroupRunning(description)) {
      throw new KafkaJSNonRetriableError(
        `The consumer group must have no running instances, current state: ${description.state}`
      )
    }

    return new Promise((resolve, reject) => {
      consumer.on(consumer.events.FETCH, async () =>
        consumer
          .stop()
          .then(resolve)
          .catch(reject)
      )

      consumer
        .run({
          eachBatchAutoResolve: false,
          eachBatch: async () => true,
        })
        .catch(reject)

      // This consumer doesn't need to consume any data
      consumer.pause([{ topic }])

      for (const seekData of partitions) {
        consumer.seek({ topic, ...seekData })
      }
    })
  }

  const isBrokerConfig = type =>
    [CONFIG_RESOURCE_TYPES.BROKER, CONFIG_RESOURCE_TYPES.BROKER_LOGGER].includes(type)

  /**
   * Broker configs can only be returned by the target broker
   *
   * @see
   * https://github.com/apache/kafka/blob/821c1ac6641845aeca96a43bc2b946ecec5cba4f/clients/src/main/java/org/apache/kafka/clients/admin/KafkaAdminClient.java#L3783
   * https://github.com/apache/kafka/blob/821c1ac6641845aeca96a43bc2b946ecec5cba4f/clients/src/main/java/org/apache/kafka/clients/admin/KafkaAdminClient.java#L2027
   *
   * @param {Broker} defaultBroker. Broker used in case the configuration is not a broker config
   */
  const groupResourcesByBroker = ({ resources, defaultBroker }) =>
    groupBy(resources, async ({ type, name: nodeId }) => {
      return isBrokerConfig(type)
        ? await cluster.findBroker({ nodeId: String(nodeId) })
        : defaultBroker
    })

  /**
   * @param {Array<ResourceConfigQuery>} resources
   * @param {boolean} [includeSynonyms=false]
   * @return {Promise}
   *
   * @typedef {Object} ResourceConfigQuery
   * @property {ConfigResourceType} type
   * @property {string} name
   * @property {Array<String>} [configNames=[]]
   */
  const describeConfigs = async ({ resources, includeSynonyms }) => {
    if (!resources || !Array.isArray(resources)) {
      throw new KafkaJSNonRetriableError(`Invalid resources array ${resources}`)
    }

    if (resources.length === 0) {
      throw new KafkaJSNonRetriableError('Resources array cannot be empty')
    }

    const validResourceTypes = Object.values(CONFIG_RESOURCE_TYPES)
    const invalidType = resources.find(r => !validResourceTypes.includes(r.type))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource type ${invalidType.type}: ${JSON.stringify(invalidType)}`
      )
    }

    const invalidName = resources.find(r => !r.name || typeof r.name !== 'string')

    if (invalidName) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource name ${invalidName.name}: ${JSON.stringify(invalidName)}`
      )
    }

    const invalidConfigs = resources.find(
      r => !Array.isArray(r.configNames) && r.configNames != null
    )

    if (invalidConfigs) {
      const { configNames } = invalidConfigs
      throw new KafkaJSNonRetriableError(
        `Invalid resource configNames ${configNames}: ${JSON.stringify(invalidConfigs)}`
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const controller = await cluster.findControllerBroker()
        const resourcerByBroker = await groupResourcesByBroker({
          resources,
          defaultBroker: controller,
        })

        const describeConfigsAction = async broker => {
          const targetBroker = broker || controller
          return targetBroker.describeConfigs({
            resources: resourcerByBroker.get(targetBroker),
            includeSynonyms,
          })
        }

        const brokers = Array.from(resourcerByBroker.keys())
        const responses = await Promise.all(brokers.map(describeConfigsAction))
        const responseResources = responses.reduce(
          (result, { resources }) => [...result, ...resources],
          []
        )

        return { resources: responseResources }
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not describe configs', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {Array<ResourceConfig>} resources
   * @param {boolean} [validateOnly=false]
   * @return {Promise}
   *
   * @typedef {Object} ResourceConfig
   * @property {ConfigResourceType} type
   * @property {string} name
   * @property {Array<ResourceConfigEntry>} configEntries
   *
   * @typedef {Object} ResourceConfigEntry
   * @property {string} name
   * @property {string} value
   */
  const alterConfigs = async ({ resources, validateOnly }) => {
    if (!resources || !Array.isArray(resources)) {
      throw new KafkaJSNonRetriableError(`Invalid resources array ${resources}`)
    }

    if (resources.length === 0) {
      throw new KafkaJSNonRetriableError('Resources array cannot be empty')
    }

    const validResourceTypes = Object.values(CONFIG_RESOURCE_TYPES)
    const invalidType = resources.find(r => !validResourceTypes.includes(r.type))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource type ${invalidType.type}: ${JSON.stringify(invalidType)}`
      )
    }

    const invalidName = resources.find(r => !r.name || typeof r.name !== 'string')

    if (invalidName) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource name ${invalidName.name}: ${JSON.stringify(invalidName)}`
      )
    }

    const invalidConfigs = resources.find(r => !Array.isArray(r.configEntries))

    if (invalidConfigs) {
      const { configEntries } = invalidConfigs
      throw new KafkaJSNonRetriableError(
        `Invalid resource configEntries ${configEntries}: ${JSON.stringify(invalidConfigs)}`
      )
    }

    const invalidConfigValue = resources.find(r =>
      r.configEntries.some(e => typeof e.name !== 'string' || typeof e.value !== 'string')
    )

    if (invalidConfigValue) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource config value: ${JSON.stringify(invalidConfigValue)}`
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const controller = await cluster.findControllerBroker()
        const resourcerByBroker = await groupResourcesByBroker({
          resources,
          defaultBroker: controller,
        })

        const alterConfigsAction = async broker => {
          const targetBroker = broker || controller
          return targetBroker.alterConfigs({
            resources: resourcerByBroker.get(targetBroker),
            validateOnly: !!validateOnly,
          })
        }

        const brokers = Array.from(resourcerByBroker.keys())
        const responses = await Promise.all(brokers.map(alterConfigsAction))
        const responseResources = responses.reduce(
          (result, { resources }) => [...result, ...resources],
          []
        )

        return { resources: responseResources }
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not alter configs', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * Fetch metadata for provided topics.
   *
   * If no topics are provided fetch metadata for all topics.
   * @see https://kafka.apache.org/protocol#The_Messages_Metadata
   *
   * @param {Object} [options]
   * @param {string[]} [options.topics]
   * @return {Promise<TopicsMetadata>}
   *
   * @typedef {Object} TopicsMetadata
   * @property {Array<TopicMetadata>} topics
   *
   * @typedef {Object} TopicMetadata
   * @property {String} name
   * @property {Array<PartitionMetadata>} partitions
   *
   * @typedef {Object} PartitionMetadata
   * @property {number} partitionErrorCode Response error code
   * @property {number} partitionId Topic partition id
   * @property {number} leader  The id of the broker acting as leader for this partition.
   * @property {Array<number>} replicas The set of all nodes that host this partition.
   * @property {Array<number>} isr The set of nodes that are in sync with the leader for this partition.
   */
  const fetchTopicMetadata = async ({ topics = [] } = {}) => {
    if (topics) {
      topics.forEach(topic => {
        if (!topic || typeof topic !== 'string') {
          throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
        }
      })
    }

    const metadata = await cluster.metadata({ topics })

    return {
      topics: metadata.topicMetadata.map(topicMetadata => ({
        name: topicMetadata.topic,
        partitions: topicMetadata.partitionMetadata,
      })),
    }
  }

  /**
   * Describe cluster
   *
   * @return {Promise<ClusterMetadata>}
   *
   * @typedef {Object} ClusterMetadata
   * @property {Array<Broker>} brokers
   * @property {Number} controller Current controller id. Returns null if unknown.
   * @property {String} clusterId
   *
   * @typedef {Object} Broker
   * @property {Number} nodeId
   * @property {String} host
   * @property {Number} port
   */
  const describeCluster = async () => {
    const { brokers: nodes, clusterId, controllerId } = await cluster.metadata({ topics: [] })
    const brokers = nodes.map(({ nodeId, host, port }) => ({
      nodeId,
      host,
      port,
    }))
    const controller =
      controllerId == null || controllerId === NO_CONTROLLER_ID ? null : controllerId

    return {
      brokers,
      controller,
      clusterId,
    }
  }

  /**
   * List groups in a broker
   *
   * @return {Promise<ListGroups>}
   *
   * @typedef {Object} ListGroups
   * @property {Array<ListGroup>} groups
   *
   * @typedef {Object} ListGroup
   * @property {string} groupId
   * @property {string} protocolType
   */
  const listGroups = async () => {
    await cluster.refreshMetadata()
    let groups = []
    for (var nodeId in cluster.brokerPool.brokers) {
      const broker = await cluster.findBroker({ nodeId })
      const response = await broker.listGroups()
      groups = groups.concat(response.groups)
    }

    return { groups }
  }

  /**
   * Describe groups by group ids
   * @param {Array<string>} groupIds
   *
   * @typedef {Object} GroupDescriptions
   * @property {Array<GroupDescription>} groups
   *
   * @return {Promise<GroupDescriptions>}
   */
  const describeGroups = async groupIds => {
    const coordinatorsForGroup = await Promise.all(
      groupIds.map(async groupId => {
        const coordinator = await cluster.findGroupCoordinator({ groupId })
        return {
          coordinator,
          groupId,
        }
      })
    )

    const groupsByCoordinator = Object.values(
      coordinatorsForGroup.reduce((coordinators, { coordinator, groupId }) => {
        const group = coordinators[coordinator.nodeId]

        if (group) {
          coordinators[coordinator.nodeId] = {
            ...group,
            groupIds: [...group.groupIds, groupId],
          }
        } else {
          coordinators[coordinator.nodeId] = { coordinator, groupIds: [groupId] }
        }
        return coordinators
      }, {})
    )

    const responses = await Promise.all(
      groupsByCoordinator.map(async ({ coordinator, groupIds }) => {
        const retrier = createRetry(retry)
        const { groups } = await retrier(() => coordinator.describeGroups({ groupIds }))
        return groups
      })
    )

    const groups = [].concat.apply([], responses)

    return { groups }
  }

  /**
   * Delete groups in a broker
   *
   * @param {string[]} [groupIds]
   * @return {Promise<DeleteGroups>}
   *
   * @typedef {Array} DeleteGroups
   * @property {string} groupId
   * @property {number} errorCode
   */
  const deleteGroups = async groupIds => {
    if (!groupIds || !Array.isArray(groupIds)) {
      throw new KafkaJSNonRetriableError(`Invalid groupIds array ${groupIds}`)
    }

    const invalidGroupId = groupIds.some(g => typeof g !== 'string')

    if (invalidGroupId) {
      throw new KafkaJSNonRetriableError(`Invalid groupId name: ${JSON.stringify(invalidGroupId)}`)
    }

    const retrier = createRetry(retry)

    let results = []

    let clonedGroupIds = groupIds.slice()

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        if (clonedGroupIds.length === 0) return []

        await cluster.refreshMetadata()

        const brokersPerGroups = {}
        const brokersPerNode = {}
        for (const groupId of clonedGroupIds) {
          const broker = await cluster.findGroupCoordinator({ groupId })
          if (brokersPerGroups[broker.nodeId] === undefined) brokersPerGroups[broker.nodeId] = []
          brokersPerGroups[broker.nodeId].push(groupId)
          brokersPerNode[broker.nodeId] = broker
        }

        const res = await Promise.all(
          Object.keys(brokersPerNode).map(
            async nodeId => await brokersPerNode[nodeId].deleteGroups(brokersPerGroups[nodeId])
          )
        )

        const errors = res
          .flatMap(({ results }) =>
            results.map(({ groupId, errorCode, error }) => {
              return { groupId, errorCode, error }
            })
          )
          .filter(({ errorCode }) => errorCode !== 0)

        clonedGroupIds = errors.map(({ groupId }) => groupId)

        if (errors.length > 0) throw new KafkaJSDeleteGroupsError('Error in DeleteGroups', errors)

        results = res.flatMap(({ results }) => results)

        return results
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER' || e.type === 'COORDINATOR_NOT_AVAILABLE') {
          logger.warn('Could not delete groups', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * Delete topic records up to the selected partition offsets
   *
   * @param {string} topic
   * @param {Array<SeekEntry>} partitions
   * @return {Promise}
   *
   * @typedef {Object} SeekEntry
   * @property {number} partition
   * @property {string} offset
   */
  const deleteTopicRecords = async ({ topic, partitions }) => {
    if (!topic || typeof topic !== 'string') {
      throw new KafkaJSNonRetriableError(`Invalid topic "${topic}"`)
    }

    if (!partitions || partitions.length === 0) {
      throw new KafkaJSNonRetriableError(`Invalid partitions`)
    }

    const partitionsByBroker = cluster.findLeaderForPartitions(
      topic,
      partitions.map(p => p.partition)
    )

    const partitionsFound = values(partitionsByBroker).flat()
    const topicOffsets = await fetchTopicOffsets(topic)

    const leaderNotFoundErrors = []
    partitions.forEach(({ partition, offset }) => {
      // throw if no leader found for partition
      if (!partitionsFound.includes(partition)) {
        leaderNotFoundErrors.push({
          partition,
          offset,
          error: new KafkaJSBrokerNotFound('Could not find the leader for the partition', {
            retriable: false,
          }),
        })
        return
      }
      const { low } = topicOffsets.find(p => p.partition === partition) || {
        high: undefined,
        low: undefined,
      }
      // warn in case of offset below low watermark
      if (parseInt(offset) < parseInt(low) && parseInt(offset) !== -1) {
        logger.warn(
          'The requested offset is before the earliest offset maintained on the partition - no records will be deleted from this partition',
          {
            topic,
            partition,
            offset,
          }
        )
      }
    })

    if (leaderNotFoundErrors.length > 0) {
      throw new KafkaJSDeleteTopicRecordsError({ topic, partitions: leaderNotFoundErrors })
    }

    const seekEntriesByBroker = entries(partitionsByBroker).reduce(
      (obj, [nodeId, nodePartitions]) => {
        obj[nodeId] = {
          topic,
          partitions: partitions.filter(p => nodePartitions.includes(p.partition)),
        }
        return obj
      },
      {}
    )

    const retrier = createRetry(retry)
    return retrier(async bail => {
      try {
        const partitionErrors = []

        const brokerRequests = entries(seekEntriesByBroker).map(
          ([nodeId, { topic, partitions }]) => async () => {
            const broker = await cluster.findBroker({ nodeId })
            await broker.deleteRecords({ topics: [{ topic, partitions }] })
            // remove successful entry so it's ignored on retry
            delete seekEntriesByBroker[nodeId]
          }
        )

        await Promise.all(
          brokerRequests.map(request =>
            request().catch(e => {
              if (e.name === 'KafkaJSDeleteTopicRecordsError') {
                e.partitions.forEach(({ partition, offset, error }) => {
                  partitionErrors.push({
                    partition,
                    offset,
                    error,
                  })
                })
              } else {
                // then it's an unknown error, not from the broker response
                throw e
              }
            })
          )
        )

        if (partitionErrors.length > 0) {
          throw new KafkaJSDeleteTopicRecordsError({
            topic,
            partitions: partitionErrors,
          })
        }
      } catch (e) {
        if (
          e.retriable &&
          e.partitions.some(
            ({ error }) => staleMetadata(error) || error.name === 'KafkaJSMetadataNotLoaded'
          )
        ) {
          await cluster.refreshMetadata()
        }
        throw e
      }
    })
  }

  /**
   * @param {Array<ACLEntry>} acl
   * @return {Promise<void>}
   *
   * @typedef {Object} ACLEntry
   */
  const createAcls = async ({ acl }) => {
    if (!acl || !Array.isArray(acl)) {
      throw new KafkaJSNonRetriableError(`Invalid ACL array ${acl}`)
    }
    if (acl.length === 0) {
      throw new KafkaJSNonRetriableError('Empty ACL array')
    }

    // Validate principal
    if (acl.some(({ principal }) => typeof principal !== 'string')) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL array, the principals have to be a valid string'
      )
    }

    // Validate host
    if (acl.some(({ host }) => typeof host !== 'string')) {
      throw new KafkaJSNonRetriableError('Invalid ACL array, the hosts have to be a valid string')
    }

    // Validate resourceName
    if (acl.some(({ resourceName }) => typeof resourceName !== 'string')) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL array, the resourceNames have to be a valid string'
      )
    }

    let invalidType
    // Validate operation
    const validOperationTypes = Object.values(ACL_OPERATION_TYPES)
    invalidType = acl.find(i => !validOperationTypes.includes(i.operation))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid operation type ${invalidType.operation}: ${JSON.stringify(invalidType)}`
      )
    }

    // Validate resourcePatternTypes
    const validResourcePatternTypes = Object.values(RESOURCE_PATTERN_TYPES)
    invalidType = acl.find(i => !validResourcePatternTypes.includes(i.resourcePatternType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource pattern type ${invalidType.resourcePatternType}: ${JSON.stringify(
          invalidType
        )}`
      )
    }

    // Validate permissionTypes
    const validPermissionTypes = Object.values(ACL_PERMISSION_TYPES)
    invalidType = acl.find(i => !validPermissionTypes.includes(i.permissionType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid permission type ${invalidType.permissionType}: ${JSON.stringify(invalidType)}`
      )
    }

    // Validate resourceTypes
    const validResourceTypes = Object.values(ACL_RESOURCE_TYPES)
    invalidType = acl.find(i => !validResourceTypes.includes(i.resourceType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource type ${invalidType.resourceType}: ${JSON.stringify(invalidType)}`
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        await broker.createAcls({ acl })

        return true
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not create ACL', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {ACLResourceTypes} resourceType The type of resource
   * @param {string} resourceName The name of the resource
   * @param {ACLResourcePatternTypes} resourcePatternType The resource pattern type filter
   * @param {string} principal The principal name
   * @param {string} host The hostname
   * @param {ACLOperationTypes} operation The type of operation
   * @param {ACLPermissionTypes} permissionType The type of permission
   * @return {Promise<void>}
   *
   * @typedef {number} ACLResourceTypes
   * @typedef {number} ACLResourcePatternTypes
   * @typedef {number} ACLOperationTypes
   * @typedef {number} ACLPermissionTypes
   */
  const describeAcls = async ({
    resourceType,
    resourceName,
    resourcePatternType,
    principal,
    host,
    operation,
    permissionType,
  }) => {
    // Validate principal
    if (typeof principal !== 'string' && typeof principal !== 'undefined') {
      throw new KafkaJSNonRetriableError(
        'Invalid principal, the principal have to be a valid string'
      )
    }

    // Validate host
    if (typeof host !== 'string' && typeof host !== 'undefined') {
      throw new KafkaJSNonRetriableError('Invalid host, the host have to be a valid string')
    }

    // Validate resourceName
    if (typeof resourceName !== 'string' && typeof resourceName !== 'undefined') {
      throw new KafkaJSNonRetriableError(
        'Invalid resourceName, the resourceName have to be a valid string'
      )
    }

    // Validate operation
    const validOperationTypes = Object.values(ACL_OPERATION_TYPES)
    if (!validOperationTypes.includes(operation)) {
      throw new KafkaJSNonRetriableError(`Invalid operation type ${operation}`)
    }

    // Validate resourcePatternType
    const validResourcePatternTypes = Object.values(RESOURCE_PATTERN_TYPES)
    if (!validResourcePatternTypes.includes(resourcePatternType)) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource pattern filter type ${resourcePatternType}`
      )
    }

    // Validate permissionType
    const validPermissionTypes = Object.values(ACL_PERMISSION_TYPES)
    if (!validPermissionTypes.includes(permissionType)) {
      throw new KafkaJSNonRetriableError(`Invalid permission type ${permissionType}`)
    }

    // Validate resourceType
    const validResourceTypes = Object.values(ACL_RESOURCE_TYPES)
    if (!validResourceTypes.includes(resourceType)) {
      throw new KafkaJSNonRetriableError(`Invalid resource type ${resourceType}`)
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        const { resources } = await broker.describeAcls({
          resourceType,
          resourceName,
          resourcePatternType,
          principal,
          host,
          operation,
          permissionType,
        })
        return { resources }
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not describe ACL', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @param {Array<ACLFilter>} filters
   * @return {Promise<void>}
   *
   * @typedef {Object} ACLFilter
   */
  const deleteAcls = async ({ filters }) => {
    if (!filters || !Array.isArray(filters)) {
      throw new KafkaJSNonRetriableError(`Invalid ACL Filter array ${filters}`)
    }

    if (filters.length === 0) {
      throw new KafkaJSNonRetriableError('Empty ACL Filter array')
    }

    // Validate principal
    if (
      filters.some(
        ({ principal }) => typeof principal !== 'string' && typeof principal !== 'undefined'
      )
    ) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL Filter array, the principals have to be a valid string'
      )
    }

    // Validate host
    if (filters.some(({ host }) => typeof host !== 'string' && typeof host !== 'undefined')) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL Filter array, the hosts have to be a valid string'
      )
    }

    // Validate resourceName
    if (
      filters.some(
        ({ resourceName }) =>
          typeof resourceName !== 'string' && typeof resourceName !== 'undefined'
      )
    ) {
      throw new KafkaJSNonRetriableError(
        'Invalid ACL Filter array, the resourceNames have to be a valid string'
      )
    }

    let invalidType
    // Validate operation
    const validOperationTypes = Object.values(ACL_OPERATION_TYPES)
    invalidType = filters.find(i => !validOperationTypes.includes(i.operation))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid operation type ${invalidType.operation}: ${JSON.stringify(invalidType)}`
      )
    }

    // Validate resourcePatternTypes
    const validResourcePatternTypes = Object.values(RESOURCE_PATTERN_TYPES)
    invalidType = filters.find(i => !validResourcePatternTypes.includes(i.resourcePatternType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource pattern type ${invalidType.resourcePatternType}: ${JSON.stringify(
          invalidType
        )}`
      )
    }

    // Validate permissionTypes
    const validPermissionTypes = Object.values(ACL_PERMISSION_TYPES)
    invalidType = filters.find(i => !validPermissionTypes.includes(i.permissionType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid permission type ${invalidType.permissionType}: ${JSON.stringify(invalidType)}`
      )
    }

    // Validate resourceTypes
    const validResourceTypes = Object.values(ACL_RESOURCE_TYPES)
    invalidType = filters.find(i => !validResourceTypes.includes(i.resourceType))

    if (invalidType) {
      throw new KafkaJSNonRetriableError(
        `Invalid resource type ${invalidType.resourceType}: ${JSON.stringify(invalidType)}`
      )
    }

    const retrier = createRetry(retry)

    return retrier(async (bail, retryCount, retryTime) => {
      try {
        await cluster.refreshMetadata()
        const broker = await cluster.findControllerBroker()
        const { filterResponses } = await broker.deleteAcls({ filters })
        return { filterResponses }
      } catch (e) {
        if (e.type === 'NOT_CONTROLLER') {
          logger.warn('Could not delete ACL', { error: e.message, retryCount, retryTime })
          throw e
        }

        bail(e)
      }
    })
  }

  /** @type {import("../../types").Admin["on"]} */
  const on = (eventName, listener) => {
    if (!eventNames.includes(eventName)) {
      throw new KafkaJSNonRetriableError(`Event name should be one of ${eventKeys}`)
    }

    return instrumentationEmitter.addListener(unwrapEvent(eventName), event => {
      event.type = wrapEvent(event.type)
      Promise.resolve(listener(event)).catch(e => {
        logger.error(`Failed to execute listener: ${e.message}`, {
          eventName,
          stack: e.stack,
        })
      })
    })
  }

  /**
   * @return {Object} logger
   */
  const getLogger = () => logger

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
    deleteTopicRecords,
  }
}


/***/ }),

/***/ 1802:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const swapObject = __nccwpck_require__(2256)
const networkEvents = __nccwpck_require__(6304)
const InstrumentationEventType = __nccwpck_require__(5352)
const adminType = InstrumentationEventType('admin')

const events = {
  CONNECT: adminType('connect'),
  DISCONNECT: adminType('disconnect'),
  REQUEST: adminType(networkEvents.NETWORK_REQUEST),
  REQUEST_TIMEOUT: adminType(networkEvents.NETWORK_REQUEST_TIMEOUT),
  REQUEST_QUEUE_SIZE: adminType(networkEvents.NETWORK_REQUEST_QUEUE_SIZE),
}

const wrappedEvents = {
  [events.REQUEST]: networkEvents.NETWORK_REQUEST,
  [events.REQUEST_TIMEOUT]: networkEvents.NETWORK_REQUEST_TIMEOUT,
  [events.REQUEST_QUEUE_SIZE]: networkEvents.NETWORK_REQUEST_QUEUE_SIZE,
}

const reversedWrappedEvents = swapObject(wrappedEvents)
const unwrap = eventName => wrappedEvents[eventName] || eventName
const wrap = eventName => reversedWrappedEvents[eventName] || eventName

module.exports = {
  events,
  wrap,
  unwrap,
}


/***/ }),

/***/ 7839:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Lock = __nccwpck_require__(7146)
const { Types: Compression } = __nccwpck_require__(9719)
const { requests, lookup } = __nccwpck_require__(5489)
const { KafkaJSNonRetriableError } = __nccwpck_require__(5073)
const apiKeys = __nccwpck_require__(686)
const shuffle = __nccwpck_require__(4544)

const PRIVATE = {
  SEND_REQUEST: Symbol('private:Broker:sendRequest'),
}

/** @type {import("../protocol/requests").Lookup} */
const notInitializedLookup = () => {
  throw new Error('Broker not connected')
}

/**
 * Each node in a Kafka cluster is called broker. This class contains
 * the high-level operations a node can perform.
 *
 * @type {import("../../types").Broker}
 */
module.exports = class Broker {
  /**
   * @param {Object} options
   * @param {import("../network/connectionPool")} options.connectionPool
   * @param {import("../../types").Logger} options.logger
   * @param {number} [options.nodeId]
   * @param {import("../../types").ApiVersions} [options.versions=null] The object with all available versions and APIs
   *                                 supported by this cluster. The output of broker#apiVersions
   * @param {number} [options.authenticationTimeout=10000]
   * @param {boolean} [options.allowAutoTopicCreation=true] If this and the broker config 'auto.create.topics.enable'
   *                                                are true, topics that don't exist will be created when
   *                                                fetching metadata.
   */
  constructor({
    connectionPool,
    logger,
    nodeId = null,
    versions = null,
    authenticationTimeout = 10000,
    allowAutoTopicCreation = true,
  }) {
    this.connectionPool = connectionPool
    this.nodeId = nodeId
    this.rootLogger = logger
    this.logger = logger.namespace('Broker')
    this.versions = versions
    this.authenticationTimeout = authenticationTimeout
    this.allowAutoTopicCreation = allowAutoTopicCreation

    // The lock timeout has twice the connectionTimeout because the same timeout is used
    // for the first apiVersions call
    const lockTimeout = 2 * this.connectionPool.connectionTimeout + this.authenticationTimeout
    this.brokerAddress = `${this.connectionPool.host}:${this.connectionPool.port}`

    this.lock = new Lock({
      timeout: lockTimeout,
      description: `connect to broker ${this.brokerAddress}`,
    })

    this.lookupRequest = notInitializedLookup
  }

  /**
   * @public
   * @returns {boolean}
   */
  isConnected() {
    return this.connectionPool.sasl
      ? this.connectionPool.isConnected() && this.connectionPool.isAuthenticated()
      : this.connectionPool.isConnected()
  }

  /**
   * @public
   * @returns {Promise}
   */
  async connect() {
    try {
      await this.lock.acquire()
      if (this.isConnected()) {
        return
      }

      const connection = await this.connectionPool.getConnection()

      if (!this.versions) {
        this.versions = await this.apiVersions()
      }
      this.connectionPool.setVersions(this.versions)

      this.lookupRequest = lookup(this.versions)

      if (connection.getSupportAuthenticationProtocol() === null) {
        let supportAuthenticationProtocol = false
        try {
          this.lookupRequest(apiKeys.SaslAuthenticate, requests.SaslAuthenticate)
          supportAuthenticationProtocol = true
        } catch (_) {
          supportAuthenticationProtocol = false
        }
        this.connectionPool.setSupportAuthenticationProtocol(supportAuthenticationProtocol)

        this.logger.debug(`Verified support for SaslAuthenticate`, {
          broker: this.brokerAddress,
          supportAuthenticationProtocol,
        })
      }

      await connection.authenticate()
    } finally {
      await this.lock.release()
    }
  }

  /**
   * @public
   * @returns {Promise}
   */
  async disconnect() {
    await this.connectionPool.destroy()
  }

  /**
   * @public
   * @returns {Promise<import("../../types").ApiVersions>}
   */
  async apiVersions() {
    let response
    const availableVersions = requests.ApiVersions.versions
      .map(Number)
      .sort()
      .reverse()

    // Find the best version implemented by the server
    for (const candidateVersion of availableVersions) {
      try {
        const apiVersions = requests.ApiVersions.protocol({ version: candidateVersion })
        response = await this[PRIVATE.SEND_REQUEST]({
          ...apiVersions(),
          requestTimeout: this.connectionPool.connectionTimeout,
        })
        break
      } catch (e) {
        if (e.type !== 'UNSUPPORTED_VERSION') {
          throw e
        }
      }
    }

    if (!response) {
      throw new KafkaJSNonRetriableError('API Versions not supported')
    }

    return response.apiVersions.reduce(
      (obj, version) =>
        Object.assign(obj, {
          [version.apiKey]: {
            minVersion: version.minVersion,
            maxVersion: version.maxVersion,
          },
        }),
      {}
    )
  }

  /**
   * @public
   * @type {import("../../types").Broker['metadata']}
   * @param {string[]} [topics=[]] An array of topics to fetch metadata for.
   *                            If no topics are specified fetch metadata for all topics
   */
  async metadata(topics = []) {
    const metadata = this.lookupRequest(apiKeys.Metadata, requests.Metadata)
    const shuffledTopics = shuffle(topics)
    return await this[PRIVATE.SEND_REQUEST](
      metadata({ topics: shuffledTopics, allowAutoTopicCreation: this.allowAutoTopicCreation })
    )
  }

  /**
   * @public
   * @param {Object} request
   * @param {Array} request.topicData An array of messages per topic and per partition, example:
   *                          [
   *                            {
   *                              topic: 'test-topic-1',
   *                              partitions: [
   *                                {
   *                                  partition: 0,
   *                                  firstSequence: 0,
   *                                  messages: [
   *                                    { key: '1', value: 'A' },
   *                                    { key: '2', value: 'B' },
   *                                  ]
   *                                },
   *                                {
   *                                  partition: 1,
   *                                  firstSequence: 0,
   *                                  messages: [
   *                                    { key: '3', value: 'C' },
   *                                  ]
   *                                }
   *                              ]
   *                            },
   *                            {
   *                              topic: 'test-topic-2',
   *                              partitions: [
   *                                {
   *                                  partition: 4,
   *                                  firstSequence: 0,
   *                                  messages: [
   *                                    { key: '32', value: 'E' },
   *                                  ]
   *                                },
   *                              ]
   *                            },
   *                          ]
   * @param {number} [request.acks=-1] Control the number of required acks.
   *                           -1 = all replicas must acknowledge
   *                            0 = no acknowledgments
   *                            1 = only waits for the leader to acknowledge
   * @param {number} [request.timeout=30000] The time to await a response in ms
   * @param {string} [request.transactionalId=null]
   * @param {number} [request.producerId=-1] Broker assigned producerId
   * @param {number} [request.producerEpoch=0] Broker assigned producerEpoch
   * @param {import("../../types").CompressionTypes} [request.compression=CompressionTypes.None] Compression codec
   * @returns {Promise}
   */
  async produce({
    topicData,
    transactionalId,
    producerId,
    producerEpoch,
    acks = -1,
    timeout = 30000,
    compression = Compression.None,
  }) {
    const produce = this.lookupRequest(apiKeys.Produce, requests.Produce)
    return await this[PRIVATE.SEND_REQUEST](
      produce({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      })
    )
  }

  /**
   * @public
   * @param {Object} request
   * @param {number} [request.replicaId=-1] Broker id of the follower. For normal consumers, use -1
   * @param {number} [request.isolationLevel=1] This setting controls the visibility of transactional records. Default READ_COMMITTED.
   * @param {number} [request.maxWaitTime=5000] Maximum time in ms to wait for the response
   * @param {number} [request.minBytes=1] Minimum bytes to accumulate in the response
   * @param {number} [request.maxBytes=10485760] Maximum bytes to accumulate in the response. Note that this is
   *                                   not an absolute maximum, if the first message in the first non-empty
   *                                   partition of the fetch is larger than this value, the message will still
   *                                   be returned to ensure that progress can be made. Default 10MB.
   * @param {Array} request.topics Topics to fetch
   *                        [
   *                          {
   *                            topic: 'topic-name',
   *                            partitions: [
   *                              {
   *                                partition: 0,
   *                                fetchOffset: '4124',
   *                                maxBytes: 2048
   *                              }
   *                            ]
   *                          }
   *                        ]
   * @param {string} [request.rackId=''] A rack identifier for this client. This can be any string value which indicates where this
   *                           client is physically located. It corresponds with the broker config `broker.rack`.
   * @returns {Promise}
   */
  async fetch({
    replicaId,
    isolationLevel,
    maxWaitTime = 5000,
    minBytes = 1,
    maxBytes = 10485760,
    topics,
    rackId = '',
  }) {
    // TODO: validate topics not null/empty
    const fetch = this.lookupRequest(apiKeys.Fetch, requests.Fetch)

    // Shuffle topic-partitions to ensure fair response allocation across partitions (KIP-74)
    const flattenedTopicPartitions = topics.reduce((topicPartitions, { topic, partitions }) => {
      partitions.forEach(partition => {
        topicPartitions.push({ topic, partition })
      })
      return topicPartitions
    }, [])

    const shuffledTopicPartitions = shuffle(flattenedTopicPartitions)

    // Consecutive partitions for the same topic can be combined into a single `topic` entry
    const consolidatedTopicPartitions = shuffledTopicPartitions.reduce(
      (topicPartitions, { topic, partition }) => {
        const last = topicPartitions[topicPartitions.length - 1]

        if (last != null && last.topic === topic) {
          topicPartitions[topicPartitions.length - 1].partitions.push(partition)
        } else {
          topicPartitions.push({ topic, partitions: [partition] })
        }

        return topicPartitions
      },
      []
    )

    return await this[PRIVATE.SEND_REQUEST](
      fetch({
        replicaId,
        isolationLevel,
        maxWaitTime,
        minBytes,
        maxBytes,
        topics: consolidatedTopicPartitions,
        rackId,
      })
    )
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId The group id
   * @param {number} request.groupGenerationId The generation of the group
   * @param {string} request.memberId The member id assigned by the group coordinator
   * @returns {Promise}
   */
  async heartbeat({ groupId, groupGenerationId, memberId }) {
    const heartbeat = this.lookupRequest(apiKeys.Heartbeat, requests.Heartbeat)
    return await this[PRIVATE.SEND_REQUEST](heartbeat({ groupId, groupGenerationId, memberId }))
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId The unique group id
   * @param {import("../protocol/coordinatorTypes").CoordinatorType} request.coordinatorType The type of coordinator to find
   * @returns {Promise}
   */
  async findGroupCoordinator({ groupId, coordinatorType }) {
    // TODO: validate groupId, mandatory
    const findCoordinator = this.lookupRequest(apiKeys.GroupCoordinator, requests.GroupCoordinator)
    return await this[PRIVATE.SEND_REQUEST](findCoordinator({ groupId, coordinatorType }))
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId The unique group id
   * @param {number} request.sessionTimeout The coordinator considers the consumer dead if it receives
   *                                no heartbeat after this timeout in ms
   * @param {number} request.rebalanceTimeout The maximum time that the coordinator will wait for each member
   *                                  to rejoin when rebalancing the group
   * @param {string} [request.memberId=""] The assigned consumer id or an empty string for a new consumer
   * @param {string} [request.protocolType="consumer"] Unique name for class of protocols implemented by group
   * @param {Array} request.groupProtocols List of protocols that the member supports (assignment strategy)
   *                                [{ name: 'AssignerName', metadata: '{"version": 1, "topics": []}' }]
   * @returns {Promise}
   */
  async joinGroup({
    groupId,
    sessionTimeout,
    rebalanceTimeout,
    memberId = '',
    protocolType = 'consumer',
    groupProtocols,
  }) {
    const joinGroup = this.lookupRequest(apiKeys.JoinGroup, requests.JoinGroup)
    const makeRequest = (assignedMemberId = memberId) =>
      this[PRIVATE.SEND_REQUEST](
        joinGroup({
          groupId,
          sessionTimeout,
          rebalanceTimeout,
          memberId: assignedMemberId,
          protocolType,
          groupProtocols,
        })
      )

    try {
      return await makeRequest()
    } catch (error) {
      if (error.name === 'KafkaJSMemberIdRequired') {
        return makeRequest(error.memberId)
      }

      throw error
    }
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId
   * @param {string} request.memberId
   * @returns {Promise}
   */
  async leaveGroup({ groupId, memberId }) {
    const leaveGroup = this.lookupRequest(apiKeys.LeaveGroup, requests.LeaveGroup)
    return await this[PRIVATE.SEND_REQUEST](leaveGroup({ groupId, memberId }))
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId
   * @param {number} request.generationId
   * @param {string} request.memberId
   * @param {object} request.groupAssignment
   * @returns {Promise}
   */
  async syncGroup({ groupId, generationId, memberId, groupAssignment }) {
    const syncGroup = this.lookupRequest(apiKeys.SyncGroup, requests.SyncGroup)
    return await this[PRIVATE.SEND_REQUEST](
      syncGroup({
        groupId,
        generationId,
        memberId,
        groupAssignment,
      })
    )
  }

  /**
   * @public
   * @param {object} request
   * @param {number} request.replicaId=-1 Broker id of the follower. For normal consumers, use -1
   * @param {number} request.isolationLevel=1 This setting controls the visibility of transactional records (default READ_COMMITTED, Kafka >0.11 only)
   * @param {TopicPartitionOffset[]} request.topics e.g:
   *
   * @typedef {Object} TopicPartitionOffset
   * @property {string} topic
   * @property {PartitionOffset[]} partitions
   *
   * @typedef {Object} PartitionOffset
   * @property {number} partition
   * @property {number} [timestamp=-1]
   *
   *
   * @returns {Promise}
   */
  async listOffsets({ replicaId, isolationLevel, topics }) {
    const listOffsets = this.lookupRequest(apiKeys.ListOffsets, requests.ListOffsets)
    const result = await this[PRIVATE.SEND_REQUEST](
      listOffsets({ replicaId, isolationLevel, topics })
    )

    // ListOffsets >= v1 will return a single `offset` rather than an array of `offsets` (ListOffsets V0).
    // Normalize to just return `offset`.
    for (const response of result.responses) {
      response.partitions = response.partitions.map(({ offsets, ...partitionData }) => {
        return offsets ? { ...partitionData, offset: offsets.pop() } : partitionData
      })
    }

    return result
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId
   * @param {number} request.groupGenerationId
   * @param {string} request.memberId
   * @param {number} [request.retentionTime=-1] -1 signals to the broker that its default configuration
   *                                    should be used.
   * @param {object} request.topics Topics to commit offsets, e.g:
   *                  [
   *                    {
   *                      topic: 'topic-name',
   *                      partitions: [
   *                        { partition: 0, offset: '11' }
   *                      ]
   *                    }
   *                  ]
   * @returns {Promise}
   */
  async offsetCommit({ groupId, groupGenerationId, memberId, retentionTime, topics }) {
    const offsetCommit = this.lookupRequest(apiKeys.OffsetCommit, requests.OffsetCommit)
    return await this[PRIVATE.SEND_REQUEST](
      offsetCommit({
        groupId,
        groupGenerationId,
        memberId,
        retentionTime,
        topics,
      })
    )
  }

  /**
   * @public
   * @param {object} request
   * @param {string} request.groupId
   * @param {object} request.topics - If the topic array is null fetch offsets for all topics. e.g:
   *                  [
   *                    {
   *                      topic: 'topic-name',
   *                      partitions: [
   *                        { partition: 0 }
   *                      ]
   *                    }
   *                  ]
   * @returns {Promise}
   */
  async offsetFetch({ groupId, topics }) {
    const offsetFetch = this.lookupRequest(apiKeys.OffsetFetch, requests.OffsetFetch)
    return await this[PRIVATE.SEND_REQUEST](offsetFetch({ groupId, topics }))
  }

  /**
   * @public
   * @param {object} request
   * @param {Array} request.groupIds
   * @returns {Promise}
   */
  async describeGroups({ groupIds }) {
    const describeGroups = this.lookupRequest(apiKeys.DescribeGroups, requests.DescribeGroups)
    return await this[PRIVATE.SEND_REQUEST](describeGroups({ groupIds }))
  }

  /**
   * @public
   * @param {object} request
   * @param {Array} request.topics e.g:
   *                 [
   *                   {
   *                     topic: 'topic-name',
   *                     numPartitions: 1,
   *                     replicationFactor: 1
   *                   }
   *                 ]
   * @param {boolean} [request.validateOnly=false] If this is true, the request will be validated, but the topic
   *                                       won't be created
   * @param {number} [request.timeout=5000] The time in ms to wait for a topic to be completely created
   *                                on the controller node
   * @returns {Promise}
   */
  async createTopics({ topics, validateOnly = false, timeout = 5000 }) {
    const createTopics = this.lookupRequest(apiKeys.CreateTopics, requests.CreateTopics)
    return await this[PRIVATE.SEND_REQUEST](createTopics({ topics, validateOnly, timeout }))
  }

  /**
   * @public
   * @param {object} request
   * @param {Array} request.topicPartitions e.g:
   *                 [
   *                   {
   *                     topic: 'topic-name',
   *                     count: 3,
   *                     assignments: []
   *                   }
   *                 ]
   * @param {boolean} [request.validateOnly=false] If this is true, the request will be validated, but the topic
   *                                       won't be created
   * @param {number} [request.timeout=5000] The time in ms to wait for a topic to be completely created
   *                                on the controller node
   * @returns {Promise<void>}
   */
  async createPartitions({ topicPartitions, validateOnly = false, timeout = 5000 }) {
    const createPartitions = this.lookupRequest(apiKeys.CreatePartitions, requests.CreatePartitions)
    return await this[PRIVATE.SEND_REQUEST](
      createPartitions({ topicPartitions, validateOnly, timeout })
    )
  }

  /**
   * @public
   * @param {object} request
   * @param {string[]} request.topics An array of topics to be deleted
   * @param {number} [request.timeout=5000] The time in ms to wait for a topic to be completely deleted on the
   *                                controller node. Values <= 0 will trigger topic deletion and return
   *                                immediately
   * @returns {Promise}
   */
  async deleteTopics({ topics, timeout = 5000 }) {
    const deleteTopics = this.lookupRequest(apiKeys.DeleteTopics, requests.DeleteTopics)
    return await this[PRIVATE.SEND_REQUEST](deleteTopics({ topics, timeout }))
  }

  /**
   * @public
   * @param {object} request
   * @param {import("../../types").ResourceConfigQuery[]} request.resources
   *                                 [{
   *                                   type: RESOURCE_TYPES.TOPIC,
   *                                   name: 'topic-name',
   *                                   configNames: ['compression.type', 'retention.ms']
   *                                 }]
   * @param {boolean} [request.includeSynonyms=false]
   * @returns {Promise}
   */
  async describeConfigs({ resources, includeSynonyms = false }) {
    const describeConfigs = this.lookupRequest(apiKeys.DescribeConfigs, requests.DescribeConfigs)
    return await this[PRIVATE.SEND_REQUEST](describeConfigs({ resources, includeSynonyms }))
  }

  /**
   * @public
   * @param {object} request
   * @param {import("../../types").IResourceConfig[]} request.resources
   *                                 [{
   *                                  type: RESOURCE_TYPES.TOPIC,
   *                                  name: 'topic-name',
   *                                  configEntries: [
   *                                    {
   *                                      name: 'cleanup.policy',
   *                                      value: 'compact'
   *                                    }
   *                                  ]
   *                                 }]
   * @param {boolean} [request.validateOnly=false]
   * @returns {Promise}
   */
  async alterConfigs({ resources, validateOnly = false }) {
    const alterConfigs = this.lookupRequest(apiKeys.AlterConfigs, requests.AlterConfigs)
    return await this[PRIVATE.SEND_REQUEST](alterConfigs({ resources, validateOnly }))
  }

  /**
   * Send an `InitProducerId` request to fetch a PID and bump the producer epoch.
   *
   * Request should be made to the transaction coordinator.
   * @public
   * @param {object} request
   * @param {number} request.transactionTimeout The time in ms to wait for before aborting idle transactions
   * @param {number} [request.transactionalId] The transactional id or null if the producer is not transactional
   * @returns {Promise}
   */
  async initProducerId({ transactionalId, transactionTimeout }) {
    const initProducerId = this.lookupRequest(apiKeys.InitProducerId, requests.InitProducerId)
    return await this[PRIVATE.SEND_REQUEST](initProducerId({ transactionalId, transactionTimeout }))
  }

  /**
   * Send an `AddPartitionsToTxn` request to mark a TopicPartition as participating in the transaction.
   *
   * Request should be made to the transaction coordinator.
   * @public
   * @param {object} request
   * @param {string} request.transactionalId The transactional id corresponding to the transaction.
   * @param {number} request.producerId Current producer id in use by the transactional id.
   * @param {number} request.producerEpoch Current epoch associated with the producer id.
   * @param {object[]} request.topics e.g:
   *                  [
   *                    {
   *                      topic: 'topic-name',
   *                      partitions: [ 0, 1]
   *                    }
   *                  ]
   * @returns {Promise}
   */
  async addPartitionsToTxn({ transactionalId, producerId, producerEpoch, topics }) {
    const addPartitionsToTxn = this.lookupRequest(
      apiKeys.AddPartitionsToTxn,
      requests.AddPartitionsToTxn
    )
    return await this[PRIVATE.SEND_REQUEST](
      addPartitionsToTxn({ transactionalId, producerId, producerEpoch, topics })
    )
  }

  /**
   * Send an `AddOffsetsToTxn` request.
   *
   * Request should be made to the transaction coordinator.
   * @public
   * @param {object} request
   * @param {string} request.transactionalId The transactional id corresponding to the transaction.
   * @param {number} request.producerId Current producer id in use by the transactional id.
   * @param {number} request.producerEpoch Current epoch associated with the producer id.
   * @param {string} request.groupId The unique group identifier (for the consumer group)
   * @returns {Promise}
   */
  async addOffsetsToTxn({ transactionalId, producerId, producerEpoch, groupId }) {
    const addOffsetsToTxn = this.lookupRequest(apiKeys.AddOffsetsToTxn, requests.AddOffsetsToTxn)
    return await this[PRIVATE.SEND_REQUEST](
      addOffsetsToTxn({ transactionalId, producerId, producerEpoch, groupId })
    )
  }

  /**
   * Send a `TxnOffsetCommit` request to persist the offsets in the `__consumer_offsets` topics.
   *
   * Request should be made to the consumer coordinator.
   * @public
   * @param {object} request
   * @param {OffsetCommitTopic[]} request.topics
   * @param {string} request.transactionalId The transactional id corresponding to the transaction.
   * @param {string} request.groupId The unique group identifier (for the consumer group)
   * @param {number} request.producerId Current producer id in use by the transactional id.
   * @param {number} request.producerEpoch Current epoch associated with the producer id.
   * @param {OffsetCommitTopic[]} request.topics
   *
   * @typedef {Object} OffsetCommitTopic
   * @property {string} topic
   * @property {OffsetCommitTopicPartition[]} partitions
   *
   * @typedef {Object} OffsetCommitTopicPartition
   * @property {number} partition
   * @property {number} offset
   * @property {string} [metadata]
   *
   * @returns {Promise}
   */
  async txnOffsetCommit({ transactionalId, groupId, producerId, producerEpoch, topics }) {
    const txnOffsetCommit = this.lookupRequest(apiKeys.TxnOffsetCommit, requests.TxnOffsetCommit)
    return await this[PRIVATE.SEND_REQUEST](
      txnOffsetCommit({ transactionalId, groupId, producerId, producerEpoch, topics })
    )
  }

  /**
   * Send an `EndTxn` request to indicate transaction should be committed or aborted.
   *
   * Request should be made to the transaction coordinator.
   * @public
   * @param {object} request
   * @param {string} request.transactionalId The transactional id corresponding to the transaction.
   * @param {number} request.producerId Current producer id in use by the transactional id.
   * @param {number} request.producerEpoch Current epoch associated with the producer id.
   * @param {boolean} request.transactionResult The result of the transaction (false = ABORT, true = COMMIT)
   * @returns {Promise}
   */
  async endTxn({ transactionalId, producerId, producerEpoch, transactionResult }) {
    const endTxn = this.lookupRequest(apiKeys.EndTxn, requests.EndTxn)
    return await this[PRIVATE.SEND_REQUEST](
      endTxn({ transactionalId, producerId, producerEpoch, transactionResult })
    )
  }

  /**
   * Send request for list of groups
   * @public
   * @returns {Promise}
   */
  async listGroups() {
    const listGroups = this.lookupRequest(apiKeys.ListGroups, requests.ListGroups)
    return await this[PRIVATE.SEND_REQUEST](listGroups())
  }

  /**
   * Send request to delete groups
   * @param {string[]} groupIds
   * @public
   * @returns {Promise}
   */
  async deleteGroups(groupIds) {
    const deleteGroups = this.lookupRequest(apiKeys.DeleteGroups, requests.DeleteGroups)
    return await this[PRIVATE.SEND_REQUEST](deleteGroups(groupIds))
  }

  /**
   * Send request to delete records
   * @public
   * @param {object} request
   * @param {TopicPartitionRecords[]} request.topics
   *                          [
   *                            {
   *                              topic: 'my-topic-name',
   *                              partitions: [
   *                                { partition: 0, offset 2 },
   *                                { partition: 1, offset 4 },
   *                              ],
   *                            }
   *                          ]
   * @returns {Promise<Array>} example:
   *                          {
   *                            throttleTime: 0
   *                           [
   *                              {
   *                                topic: 'my-topic-name',
   *                                partitions: [
   *                                 { partition: 0, lowWatermark: '2n', errorCode: 0 },
   *                                 { partition: 1, lowWatermark: '4n', errorCode: 0 },
   *                               ],
   *                             },
   *                           ]
   *                          }
   *
   * @typedef {object} TopicPartitionRecords
   * @property {string} topic
   * @property {PartitionRecord[]} partitions
   *
   * @typedef {object} PartitionRecord
   * @property {number} partition
   * @property {number} offset
   */
  async deleteRecords({ topics }) {
    const deleteRecords = this.lookupRequest(apiKeys.DeleteRecords, requests.DeleteRecords)
    return await this[PRIVATE.SEND_REQUEST](deleteRecords({ topics }))
  }

  /**
   * @public
   * @param {object} request
   * @param {import("../../types").AclEntry[]} request.acl e.g:
   *                 [
   *                   {
   *                     resourceType: AclResourceTypes.TOPIC,
   *                     resourceName: 'topic-name',
   *                     resourcePatternType: ResourcePatternTypes.LITERAL,
   *                     principal: 'User:bob',
   *                     host: '*',
   *                     operation: AclOperationTypes.ALL,
   *                     permissionType: AclPermissionTypes.DENY,
   *                   }
   *                 ]
   * @returns {Promise<void>}
   */
  async createAcls({ acl }) {
    const createAcls = this.lookupRequest(apiKeys.CreateAcls, requests.CreateAcls)
    return await this[PRIVATE.SEND_REQUEST](createAcls({ creations: acl }))
  }

  /**
   * @public
   * @param {import("../../types").AclEntry} aclEntry
   * @returns {Promise<void>}
   */
  async describeAcls({
    resourceType,
    resourceName,
    resourcePatternType,
    principal,
    host,
    operation,
    permissionType,
  }) {
    const describeAcls = this.lookupRequest(apiKeys.DescribeAcls, requests.DescribeAcls)
    return await this[PRIVATE.SEND_REQUEST](
      describeAcls({
        resourceType,
        resourceName,
        resourcePatternType,
        principal,
        host,
        operation,
        permissionType,
      })
    )
  }

  /**
   * @public
   * @param {Object} request
   * @param {import("../../types").AclEntry[]} request.filters
   * @returns {Promise<void>}
   */
  async deleteAcls({ filters }) {
    const deleteAcls = this.lookupRequest(apiKeys.DeleteAcls, requests.DeleteAcls)
    return await this[PRIVATE.SEND_REQUEST](deleteAcls({ filters }))
  }

  /**
   * @private
   */
  async [PRIVATE.SEND_REQUEST](protocolRequest) {
    try {
      return await this.connectionPool.send(protocolRequest)
    } catch (e) {
      if (e.name === 'KafkaJSConnectionClosedError') {
        await this.disconnect()
      }

      throw e
    }
  }
}


/***/ }),

/***/ 1721:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const awsIam = __nccwpck_require__(8125)
const { KafkaJSSASLAuthenticationError } = __nccwpck_require__(5073)

module.exports = class AWSIAMAuthenticator {
  constructor(connection, logger, saslAuthenticate) {
    this.connection = connection
    this.logger = logger.namespace('SASLAWSIAMAuthenticator')
    this.saslAuthenticate = saslAuthenticate
  }

  async authenticate() {
    const { sasl } = this.connection
    if (!sasl.authorizationIdentity) {
      throw new KafkaJSSASLAuthenticationError('SASL AWS-IAM: Missing authorizationIdentity')
    }
    if (!sasl.accessKeyId) {
      throw new KafkaJSSASLAuthenticationError('SASL AWS-IAM: Missing accessKeyId')
    }
    if (!sasl.secretAccessKey) {
      throw new KafkaJSSASLAuthenticationError('SASL AWS-IAM: Missing secretAccessKey')
    }
    if (!sasl.sessionToken) {
      sasl.sessionToken = ''
    }

    const request = awsIam.request(sasl)
    const response = awsIam.response
    const { host, port } = this.connection
    const broker = `${host}:${port}`

    try {
      this.logger.debug('Authenticate with SASL AWS-IAM', { broker })
      await this.saslAuthenticate({ request, response })
      this.logger.debug('SASL AWS-IAM authentication successful', { broker })
    } catch (e) {
      const error = new KafkaJSSASLAuthenticationError(
        `SASL AWS-IAM authentication failed: ${e.message}`
      )
      this.logger.error(error.message, { broker })
      throw error
    }
  }
}


/***/ }),

/***/ 866:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { requests, lookup } = __nccwpck_require__(5489)
const apiKeys = __nccwpck_require__(686)
const PlainAuthenticator = __nccwpck_require__(4059)
const SCRAM256Authenticator = __nccwpck_require__(3602)
const SCRAM512Authenticator = __nccwpck_require__(7097)
const AWSIAMAuthenticator = __nccwpck_require__(1721)
const OAuthBearerAuthenticator = __nccwpck_require__(7676)
const { KafkaJSSASLAuthenticationError } = __nccwpck_require__(5073)

const AUTHENTICATORS = {
  PLAIN: PlainAuthenticator,
  'SCRAM-SHA-256': SCRAM256Authenticator,
  'SCRAM-SHA-512': SCRAM512Authenticator,
  AWS: AWSIAMAuthenticator,
  OAUTHBEARER: OAuthBearerAuthenticator,
}

const SUPPORTED_MECHANISMS = Object.keys(AUTHENTICATORS)
const UNLIMITED_SESSION_LIFETIME = '0'

module.exports = class SASLAuthenticator {
  constructor(connection, logger, versions, supportAuthenticationProtocol) {
    this.connection = connection
    this.logger = logger
    this.sessionLifetime = UNLIMITED_SESSION_LIFETIME

    const lookupRequest = lookup(versions)
    this.saslHandshake = lookupRequest(apiKeys.SaslHandshake, requests.SaslHandshake)
    this.protocolAuthentication = supportAuthenticationProtocol
      ? lookupRequest(apiKeys.SaslAuthenticate, requests.SaslAuthenticate)
      : null
  }

  async authenticate() {
    const mechanism = this.connection.sasl.mechanism.toUpperCase()
    if (!SUPPORTED_MECHANISMS.includes(mechanism)) {
      throw new KafkaJSSASLAuthenticationError(
        `SASL ${mechanism} mechanism is not supported by the client`
      )
    }

    const handshake = await this.connection.send(this.saslHandshake({ mechanism }))
    if (!handshake.enabledMechanisms.includes(mechanism)) {
      throw new KafkaJSSASLAuthenticationError(
        `SASL ${mechanism} mechanism is not supported by the server`
      )
    }

    const saslAuthenticate = async ({ request, response, authExpectResponse }) => {
      if (this.protocolAuthentication) {
        const { buffer: requestAuthBytes } = await request.encode()
        const authResponse = await this.connection.send(
          this.protocolAuthentication({ authBytes: requestAuthBytes })
        )

        // `0` is a string because `sessionLifetimeMs` is an int64 encoded as string.
        // This is not present in SaslAuthenticateV0, so we default to `"0"`
        this.sessionLifetime = authResponse.sessionLifetimeMs || UNLIMITED_SESSION_LIFETIME

        if (!authExpectResponse) {
          return
        }

        const { authBytes: responseAuthBytes } = authResponse
        const payloadDecoded = await response.decode(responseAuthBytes)
        return response.parse(payloadDecoded)
      }

      return this.connection.sendAuthRequest({ request, response, authExpectResponse })
    }

    const Authenticator = AUTHENTICATORS[mechanism]
    await new Authenticator(this.connection, this.logger, saslAuthenticate).authenticate()
  }
}


/***/ }),

/***/ 7676:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * The sasl object must include a property named oauthBearerProvider, an
 * async function that is used to return the OAuth bearer token.
 *
 * The OAuth bearer token must be an object with properties value and
 * (optionally) extensions, that will be sent during the SASL/OAUTHBEARER
 * request.
 *
 * The implementation of the oauthBearerProvider must take care that tokens are
 * reused and refreshed when appropriate.
 */

const oauthBearer = __nccwpck_require__(6099)
const { KafkaJSSASLAuthenticationError } = __nccwpck_require__(5073)

module.exports = class OAuthBearerAuthenticator {
  constructor(connection, logger, saslAuthenticate) {
    this.connection = connection
    this.logger = logger.namespace('SASLOAuthBearerAuthenticator')
    this.saslAuthenticate = saslAuthenticate
  }

  async authenticate() {
    const { sasl } = this.connection
    if (sasl.oauthBearerProvider == null) {
      throw new KafkaJSSASLAuthenticationError(
        'SASL OAUTHBEARER: Missing OAuth bearer token provider'
      )
    }

    const { oauthBearerProvider } = sasl

    const oauthBearerToken = await oauthBearerProvider()

    if (oauthBearerToken.value == null) {
      throw new KafkaJSSASLAuthenticationError('SASL OAUTHBEARER: Invalid OAuth bearer token')
    }

    const request = await oauthBearer.request(sasl, oauthBearerToken)
    const response = oauthBearer.response
    const { host, port } = this.connection
    const broker = `${host}:${port}`

    try {
      this.logger.debug('Authenticate with SASL OAUTHBEARER', { broker })
      await this.saslAuthenticate({ request, response })
      this.logger.debug('SASL OAUTHBEARER authentication successful', { broker })
    } catch (e) {
      const error = new KafkaJSSASLAuthenticationError(
        `SASL OAUTHBEARER authentication failed: ${e.message}`
      )
      this.logger.error(error.message, { broker })
      throw error
    }
  }
}


/***/ }),

/***/ 4059:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const plain = __nccwpck_require__(1770)
const { KafkaJSSASLAuthenticationError } = __nccwpck_require__(5073)

module.exports = class PlainAuthenticator {
  constructor(connection, logger, saslAuthenticate) {
    this.connection = connection
    this.logger = logger.namespace('SASLPlainAuthenticator')
    this.saslAuthenticate = saslAuthenticate
  }

  async authenticate() {
    const { sasl } = this.connection
    if (sasl.username == null || sasl.password == null) {
      throw new KafkaJSSASLAuthenticationError('SASL Plain: Invalid username or password')
    }

    const request = plain.request(sasl)
    const response = plain.response
    const { host, port } = this.connection
    const broker = `${host}:${port}`

    try {
      this.logger.debug('Authenticate with SASL PLAIN', { broker })
      await this.saslAuthenticate({ request, response })
      this.logger.debug('SASL PLAIN authentication successful', { broker })
    } catch (e) {
      const error = new KafkaJSSASLAuthenticationError(
        `SASL PLAIN authentication failed: ${e.message}`
      )
      this.logger.error(error.message, { broker })
      throw error
    }
  }
}


/***/ }),

/***/ 4131:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const crypto = __nccwpck_require__(6113)
const scram = __nccwpck_require__(5631)
const { KafkaJSSASLAuthenticationError, KafkaJSNonRetriableError } = __nccwpck_require__(5073)

const GS2_HEADER = 'n,,'

const EQUAL_SIGN_REGEX = /=/g
const COMMA_SIGN_REGEX = /,/g

const URLSAFE_BASE64_PLUS_REGEX = /\+/g
const URLSAFE_BASE64_SLASH_REGEX = /\//g
const URLSAFE_BASE64_TRAILING_EQUAL_REGEX = /=+$/

const HMAC_CLIENT_KEY = 'Client Key'
const HMAC_SERVER_KEY = 'Server Key'

const DIGESTS = {
  SHA256: {
    length: 32,
    type: 'sha256',
    minIterations: 4096,
  },
  SHA512: {
    length: 64,
    type: 'sha512',
    minIterations: 4096,
  },
}

const encode64 = str => Buffer.from(str).toString('base64')

class SCRAM {
  /**
   * From https://tools.ietf.org/html/rfc5802#section-5.1
   *
   * The characters ',' or '=' in usernames are sent as '=2C' and
   * '=3D' respectively.  If the server receives a username that
   * contains '=' not followed by either '2C' or '3D', then the
   * server MUST fail the authentication.
   *
   * @returns {String}
   */
  static sanitizeString(str) {
    return str.replace(EQUAL_SIGN_REGEX, '=3D').replace(COMMA_SIGN_REGEX, '=2C')
  }

  /**
   * In cryptography, a nonce is an arbitrary number that can be used just once.
   * It is similar in spirit to a nonce * word, hence the name. It is often a random or pseudo-random
   * number issued in an authentication protocol to * ensure that old communications cannot be reused
   * in replay attacks.
   *
   * @returns {String}
   */
  static nonce() {
    return crypto
      .randomBytes(16)
      .toString('base64')
      .replace(URLSAFE_BASE64_PLUS_REGEX, '-') // make it url safe
      .replace(URLSAFE_BASE64_SLASH_REGEX, '_')
      .replace(URLSAFE_BASE64_TRAILING_EQUAL_REGEX, '')
      .toString('ascii')
  }

  /**
   * Hi() is, essentially, PBKDF2 [RFC2898] with HMAC() as the
   * pseudorandom function (PRF) and with dkLen == output length of
   * HMAC() == output length of H()
   *
   * @returns {Promise<Buffer>}
   */
  static hi(password, salt, iterations, digestDefinition) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        iterations,
        digestDefinition.length,
        digestDefinition.type,
        (err, derivedKey) => (err ? reject(err) : resolve(derivedKey))
      )
    })
  }

  /**
   * Apply the exclusive-or operation to combine the octet string
   * on the left of this operator with the octet string on the right of
   * this operator.  The length of the output and each of the two
   * inputs will be the same for this use
   *
   * @returns {Buffer}
   */
  static xor(left, right) {
    const bufferA = Buffer.from(left)
    const bufferB = Buffer.from(right)
    const length = Buffer.byteLength(bufferA)

    if (length !== Buffer.byteLength(bufferB)) {
      throw new KafkaJSNonRetriableError('Buffers must be of the same length')
    }

    const result = []
    for (let i = 0; i < length; i++) {
      result.push(bufferA[i] ^ bufferB[i])
    }

    return Buffer.from(result)
  }

  /**
   * @param {Connection} connection
   * @param {Logger} logger
   * @param {Function} saslAuthenticate
   * @param {DigestDefinition} digestDefinition
   */
  constructor(connection, logger, saslAuthenticate, digestDefinition) {
    this.connection = connection
    this.logger = logger
    this.saslAuthenticate = saslAuthenticate
    this.digestDefinition = digestDefinition

    const digestType = digestDefinition.type.toUpperCase()
    this.PREFIX = `SASL SCRAM ${digestType} authentication`

    this.currentNonce = SCRAM.nonce()
  }

  async authenticate() {
    const { PREFIX } = this
    const { host, port, sasl } = this.connection
    const broker = `${host}:${port}`

    if (sasl.username == null || sasl.password == null) {
      throw new KafkaJSSASLAuthenticationError(`${this.PREFIX}: Invalid username or password`)
    }

    try {
      this.logger.debug('Exchanging first client message', { broker })
      const clientMessageResponse = await this.sendClientFirstMessage()

      this.logger.debug('Sending final message', { broker })
      const finalResponse = await this.sendClientFinalMessage(clientMessageResponse)

      if (finalResponse.e) {
        throw new Error(finalResponse.e)
      }

      const serverKey = await this.serverKey(clientMessageResponse)
      const serverSignature = this.serverSignature(serverKey, clientMessageResponse)

      if (finalResponse.v !== serverSignature) {
        throw new Error('Invalid server signature in server final message')
      }

      this.logger.debug(`${PREFIX} successful`, { broker })
    } catch (e) {
      const error = new KafkaJSSASLAuthenticationError(`${PREFIX} failed: ${e.message}`)
      this.logger.error(error.message, { broker })
      throw error
    }
  }

  /**
   * @private
   */
  async sendClientFirstMessage() {
    const clientFirstMessage = `${GS2_HEADER}${this.firstMessageBare()}`
    const request = scram.firstMessage.request({ clientFirstMessage })
    const response = scram.firstMessage.response

    return this.saslAuthenticate({
      authExpectResponse: true,
      request,
      response,
    })
  }

  /**
   * @private
   */
  async sendClientFinalMessage(clientMessageResponse) {
    const { PREFIX } = this
    const iterations = parseInt(clientMessageResponse.i, 10)
    const { minIterations } = this.digestDefinition

    if (!clientMessageResponse.r.startsWith(this.currentNonce)) {
      throw new KafkaJSSASLAuthenticationError(
        `${PREFIX} failed: Invalid server nonce, it does not start with the client nonce`
      )
    }

    if (iterations < minIterations) {
      throw new KafkaJSSASLAuthenticationError(
        `${PREFIX} failed: Requested iterations ${iterations} is less than the minimum ${minIterations}`
      )
    }

    const finalMessageWithoutProof = this.finalMessageWithoutProof(clientMessageResponse)
    const clientProof = await this.clientProof(clientMessageResponse)
    const finalMessage = `${finalMessageWithoutProof},p=${clientProof}`
    const request = scram.finalMessage.request({ finalMessage })
    const response = scram.finalMessage.response

    return this.saslAuthenticate({
      authExpectResponse: true,
      request,
      response,
    })
  }

  /**
   * @private
   */
  async clientProof(clientMessageResponse) {
    const clientKey = await this.clientKey(clientMessageResponse)
    const storedKey = this.H(clientKey)
    const clientSignature = this.clientSignature(storedKey, clientMessageResponse)
    return encode64(SCRAM.xor(clientKey, clientSignature))
  }

  /**
   * @private
   */
  async clientKey(clientMessageResponse) {
    const saltedPassword = await this.saltPassword(clientMessageResponse)
    return this.HMAC(saltedPassword, HMAC_CLIENT_KEY)
  }

  /**
   * @private
   */
  async serverKey(clientMessageResponse) {
    const saltedPassword = await this.saltPassword(clientMessageResponse)
    return this.HMAC(saltedPassword, HMAC_SERVER_KEY)
  }

  /**
   * @private
   */
  clientSignature(storedKey, clientMessageResponse) {
    return this.HMAC(storedKey, this.authMessage(clientMessageResponse))
  }

  /**
   * @private
   */
  serverSignature(serverKey, clientMessageResponse) {
    return encode64(this.HMAC(serverKey, this.authMessage(clientMessageResponse)))
  }

  /**
   * @private
   */
  authMessage(clientMessageResponse) {
    return [
      this.firstMessageBare(),
      clientMessageResponse.original,
      this.finalMessageWithoutProof(clientMessageResponse),
    ].join(',')
  }

  /**
   * @private
   */
  async saltPassword(clientMessageResponse) {
    const salt = Buffer.from(clientMessageResponse.s, 'base64')
    const iterations = parseInt(clientMessageResponse.i, 10)
    return SCRAM.hi(this.encodedPassword(), salt, iterations, this.digestDefinition)
  }

  /**
   * @private
   */
  firstMessageBare() {
    return `n=${this.encodedUsername()},r=${this.currentNonce}`
  }

  /**
   * @private
   */
  finalMessageWithoutProof(clientMessageResponse) {
    const rnonce = clientMessageResponse.r
    return `c=${encode64(GS2_HEADER)},r=${rnonce}`
  }

  /**
   * @private
   */
  encodedUsername() {
    const { username } = this.connection.sasl
    return SCRAM.sanitizeString(username).toString('utf-8')
  }

  /**
   * @private
   */
  encodedPassword() {
    const { password } = this.connection.sasl
    return password.toString('utf-8')
  }

  /**
   * @private
   */
  H(data) {
    return crypto
      .createHash(this.digestDefinition.type)
      .update(data)
      .digest()
  }

  /**
   * @private
   */
  HMAC(key, data) {
    return crypto
      .createHmac(this.digestDefinition.type, key)
      .update(data)
      .digest()
  }
}

module.exports = {
  DIGESTS,
  SCRAM,
}


/***/ }),

/***/ 3602:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { SCRAM, DIGESTS } = __nccwpck_require__(4131)

module.exports = class SCRAM256Authenticator extends SCRAM {
  constructor(connection, logger, saslAuthenticate) {
    super(connection, logger.namespace('SCRAM256Authenticator'), saslAuthenticate, DIGESTS.SHA256)
  }
}


/***/ }),

/***/ 7097:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { SCRAM, DIGESTS } = __nccwpck_require__(4131)

module.exports = class SCRAM512Authenticator extends SCRAM {
  constructor(connection, logger, saslAuthenticate) {
    super(connection, logger.namespace('SCRAM512Authenticator'), saslAuthenticate, DIGESTS.SHA512)
  }
}


/***/ }),

/***/ 4624:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Broker = __nccwpck_require__(7839)
const createRetry = __nccwpck_require__(1862)
const shuffle = __nccwpck_require__(4544)
const arrayDiff = __nccwpck_require__(1262)
const { KafkaJSBrokerNotFound, KafkaJSProtocolError } = __nccwpck_require__(5073)

const { keys, assign, values } = Object
const hasBrokerBeenReplaced = (broker, { host, port, rack }) =>
  broker.connectionPool.host !== host ||
  broker.connectionPool.port !== port ||
  broker.connectionPool.rack !== rack

module.exports = class BrokerPool {
  /**
   * @param {object} options
   * @param {import("./connectionPoolBuilder").ConnectionPoolBuilder} options.connectionPoolBuilder
   * @param {import("../../types").Logger} options.logger
   * @param {import("../../types").RetryOptions} [options.retry]
   * @param {boolean} [options.allowAutoTopicCreation]
   * @param {number} [options.authenticationTimeout]
   * @param {number} [options.metadataMaxAge]
   */
  constructor({
    connectionPoolBuilder,
    logger,
    retry,
    allowAutoTopicCreation,
    authenticationTimeout,
    metadataMaxAge,
  }) {
    this.rootLogger = logger
    this.connectionPoolBuilder = connectionPoolBuilder
    this.metadataMaxAge = metadataMaxAge || 0
    this.logger = logger.namespace('BrokerPool')
    this.retrier = createRetry(assign({}, retry))

    this.createBroker = options =>
      new Broker({
        allowAutoTopicCreation,
        authenticationTimeout,
        ...options,
      })

    this.brokers = {}
    /** @type {Broker | undefined} */
    this.seedBroker = undefined
    /** @type {import("../../types").BrokerMetadata | null} */
    this.metadata = null
    this.metadataExpireAt = null
    this.versions = null
  }

  /**
   * @public
   * @returns {Boolean}
   */
  hasConnectedBrokers() {
    const brokers = values(this.brokers)
    return (
      !!brokers.find(broker => broker.isConnected()) ||
      (this.seedBroker ? this.seedBroker.isConnected() : false)
    )
  }

  async createSeedBroker() {
    if (this.seedBroker) {
      await this.seedBroker.disconnect()
    }

    const connectionPool = await this.connectionPoolBuilder.build()

    this.seedBroker = this.createBroker({
      connectionPool,
      logger: this.rootLogger,
    })
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async connect() {
    if (this.hasConnectedBrokers()) {
      return
    }

    if (!this.seedBroker) {
      await this.createSeedBroker()
    }

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        await this.seedBroker.connect()
        this.versions = this.seedBroker.versions
      } catch (e) {
        if (e.name === 'KafkaJSConnectionError' || e.type === 'ILLEGAL_SASL_STATE') {
          // Connection builder will always rotate the seed broker
          await this.createSeedBroker()
          this.logger.error(
            `Failed to connect to seed broker, trying another broker from the list: ${e.message}`,
            { retryCount, retryTime }
          )
        } else {
          this.logger.error(e.message, { retryCount, retryTime })
        }

        if (e.retriable) throw e
        bail(e)
      }
    })
  }

  /**
   * @public
   * @returns {Promise}
   */
  async disconnect() {
    this.seedBroker && (await this.seedBroker.disconnect())
    await Promise.all(values(this.brokers).map(broker => broker.disconnect()))

    this.brokers = {}
    this.metadata = null
    this.versions = null
  }

  /**
   * @public
   * @param {Object} destination
   * @param {string} destination.host
   * @param {number} destination.port
   */
  removeBroker({ host, port }) {
    const removedBroker = values(this.brokers).find(
      broker => broker.connectionPool.host === host && broker.connectionPool.port === port
    )

    if (removedBroker) {
      delete this.brokers[removedBroker.nodeId]
      this.metadataExpireAt = null

      if (this.seedBroker.nodeId === removedBroker.nodeId) {
        this.seedBroker = shuffle(values(this.brokers))[0]
      }
    }
  }

  /**
   * @public
   * @param {Array<String>} topics
   * @returns {Promise<null>}
   */
  async refreshMetadata(topics) {
    const broker = await this.findConnectedBroker()
    const { host: seedHost, port: seedPort } = this.seedBroker.connectionPool

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        this.metadata = await broker.metadata(topics)
        this.metadataExpireAt = Date.now() + this.metadataMaxAge

        const replacedBrokers = []

        this.brokers = await this.metadata.brokers.reduce(
          async (resultPromise, { nodeId, host, port, rack }) => {
            const result = await resultPromise

            if (result[nodeId]) {
              if (!hasBrokerBeenReplaced(result[nodeId], { host, port, rack })) {
                return result
              }

              replacedBrokers.push(result[nodeId])
            }

            if (host === seedHost && port === seedPort) {
              this.seedBroker.nodeId = nodeId
              this.seedBroker.connectionPool.rack = rack
              return assign(result, {
                [nodeId]: this.seedBroker,
              })
            }

            return assign(result, {
              [nodeId]: this.createBroker({
                logger: this.rootLogger,
                versions: this.versions,
                connectionPool: await this.connectionPoolBuilder.build({ host, port, rack }),
                nodeId,
              }),
            })
          },
          this.brokers
        )

        const freshBrokerIds = this.metadata.brokers.map(({ nodeId }) => `${nodeId}`).sort()
        const currentBrokerIds = keys(this.brokers).sort()
        const unusedBrokerIds = arrayDiff(currentBrokerIds, freshBrokerIds)

        const brokerDisconnects = unusedBrokerIds.map(nodeId => {
          const broker = this.brokers[nodeId]
          return broker.disconnect().then(() => {
            delete this.brokers[nodeId]
          })
        })

        const replacedBrokersDisconnects = replacedBrokers.map(broker => broker.disconnect())
        await Promise.all([...brokerDisconnects, ...replacedBrokersDisconnects])
      } catch (e) {
        if (e.type === 'LEADER_NOT_AVAILABLE') {
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * Only refreshes metadata if the data is stale according to the `metadataMaxAge` param or does not contain information about the provided topics
   *
   * @public
   * @param {Array<String>} topics
   * @returns {Promise<null>}
   */
  async refreshMetadataIfNecessary(topics) {
    const shouldRefresh =
      this.metadata == null ||
      this.metadataExpireAt == null ||
      Date.now() > this.metadataExpireAt ||
      !topics.every(topic =>
        this.metadata.topicMetadata.some(topicMetadata => topicMetadata.topic === topic)
      )

    if (shouldRefresh) {
      return this.refreshMetadata(topics)
    }
  }

  /** @type {() => string[]} */
  getNodeIds() {
    return keys(this.brokers)
  }

  /**
   * @public
   * @param {object} options
   * @param {string} options.nodeId
   * @returns {Promise<Broker>}
   */
  async findBroker({ nodeId }) {
    const broker = this.brokers[nodeId]

    if (!broker) {
      throw new KafkaJSBrokerNotFound(`Broker ${nodeId} not found in the cached metadata`)
    }

    await this.connectBroker(broker)
    return broker
  }

  /**
   * @public
   * @param {(params: { nodeId: string, broker: Broker }) => Promise<T>} callback
   * @returns {Promise<T>}
   * @template T
   */
  async withBroker(callback) {
    const brokers = shuffle(keys(this.brokers))
    if (brokers.length === 0) {
      throw new KafkaJSBrokerNotFound('No brokers in the broker pool')
    }

    for (const nodeId of brokers) {
      const broker = await this.findBroker({ nodeId })
      try {
        return await callback({ nodeId, broker })
      } catch (e) {}
    }

    return null
  }

  /**
   * @public
   * @returns {Promise<Broker>}
   */
  async findConnectedBroker() {
    const nodeIds = shuffle(keys(this.brokers))
    const connectedBrokerId = nodeIds.find(nodeId => this.brokers[nodeId].isConnected())

    if (connectedBrokerId) {
      return await this.findBroker({ nodeId: connectedBrokerId })
    }

    // Cycle through the nodes until one connects
    for (const nodeId of nodeIds) {
      try {
        return await this.findBroker({ nodeId })
      } catch (e) {}
    }

    // Failed to connect to all known brokers, metadata might be old
    await this.connect()
    return this.seedBroker
  }

  /**
   * @private
   * @param {Broker} broker
   * @returns {Promise<null>}
   */
  async connectBroker(broker) {
    if (broker.isConnected()) {
      return
    }

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        await broker.connect()
      } catch (e) {
        if (e.name === 'KafkaJSConnectionError' || e.type === 'ILLEGAL_SASL_STATE') {
          await broker.disconnect()
        }

        // To avoid reconnecting to an unavailable host, we bail on connection errors
        // and refresh metadata on a higher level before reconnecting
        if (e.name === 'KafkaJSConnectionError') {
          return bail(e)
        }

        if (e.type === 'ILLEGAL_SASL_STATE') {
          // Rebuild the connection pool since it can't recover from illegal SASL state
          broker.connectionPool = await this.connectionPoolBuilder.build({
            host: broker.connectionPool.host,
            port: broker.connectionPool.port,
            rack: broker.connectionPool.rack,
          })

          this.logger.error(`Failed to connect to broker, reconnecting`, { retryCount, retryTime })
          throw new KafkaJSProtocolError(e, { retriable: true })
        }

        if (e.retriable) throw e
        this.logger.error(e, { retryCount, retryTime, stack: e.stack })
        bail(e)
      }
    })
  }
}


/***/ }),

/***/ 2783:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { KafkaJSConnectionError, KafkaJSNonRetriableError } = __nccwpck_require__(5073)
const ConnectionPool = __nccwpck_require__(1888)

/**
 * @typedef {Object} ConnectionPoolBuilder
 * @property {(destination?: { host?: string, port?: number, rack?: string }) => Promise<ConnectionPool>} build
 */

/**
 * @param {Object} options
 * @param {import("../../types").ISocketFactory} [options.socketFactory]
 * @param {string[]|(() => string[])} options.brokers
 * @param {Object} [options.ssl]
 * @param {Object} [options.sasl]
 * @param {string} options.clientId
 * @param {number} options.requestTimeout
 * @param {boolean} [options.enforceRequestTimeout]
 * @param {number} [options.connectionTimeout]
 * @param {number} [options.maxInFlightRequests]
 * @param {import("../../types").RetryOptions} [options.retry]
 * @param {import("../../types").Logger} options.logger
 * @param {import("../instrumentation/emitter")} [options.instrumentationEmitter]
 * @param {number} [options.reauthenticationThreshold]
 * @returns {ConnectionPoolBuilder}
 */
module.exports = ({
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
  reauthenticationThreshold,
}) => {
  let index = 0

  const isValidBroker = broker => {
    return broker && typeof broker === 'string' && broker.length > 0
  }

  const validateBrokers = brokers => {
    if (!brokers) {
      throw new KafkaJSNonRetriableError(`Failed to connect: brokers should not be null`)
    }

    if (Array.isArray(brokers)) {
      if (!brokers.length) {
        throw new KafkaJSNonRetriableError(`Failed to connect: brokers array is empty`)
      }

      brokers.forEach((broker, index) => {
        if (!isValidBroker(broker)) {
          throw new KafkaJSNonRetriableError(
            `Failed to connect: broker at index ${index} is invalid "${typeof broker}"`
          )
        }
      })
    }
  }

  const getBrokers = async () => {
    let list

    if (typeof brokers === 'function') {
      try {
        list = await brokers()
      } catch (e) {
        const wrappedError = new KafkaJSConnectionError(
          `Failed to connect: "config.brokers" threw: ${e.message}`
        )
        wrappedError.stack = `${wrappedError.name}\n  Caused by: ${e.stack}`
        throw wrappedError
      }
    } else {
      list = brokers
    }

    validateBrokers(list)

    return list
  }

  return {
    build: async ({ host, port, rack } = {}) => {
      if (!host) {
        const list = await getBrokers()

        const randomBroker = list[index++ % list.length]

        host = randomBroker.split(':')[0]
        port = Number(randomBroker.split(':')[1])
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
        reauthenticationThreshold,
      })
    },
  }
}


/***/ }),

/***/ 3140:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const BrokerPool = __nccwpck_require__(4624)
const Lock = __nccwpck_require__(7146)
const sharedPromiseTo = __nccwpck_require__(7326)
const createRetry = __nccwpck_require__(1862)
const connectionPoolBuilder = __nccwpck_require__(2783)
const { EARLIEST_OFFSET, LATEST_OFFSET } = __nccwpck_require__(7368)
const {
  KafkaJSError,
  KafkaJSBrokerNotFound,
  KafkaJSMetadataNotLoaded,
  KafkaJSTopicMetadataNotLoaded,
  KafkaJSGroupCoordinatorNotFound,
} = __nccwpck_require__(5073)
const COORDINATOR_TYPES = __nccwpck_require__(466)

const { keys } = Object

const mergeTopics = (obj, { topic, partitions }) => ({
  ...obj,
  [topic]: [...(obj[topic] || []), ...partitions],
})

const PRIVATE = {
  CONNECT: Symbol('private:Cluster:connect'),
  REFRESH_METADATA: Symbol('private:Cluster:refreshMetadata'),
  REFRESH_METADATA_IF_NECESSARY: Symbol('private:Cluster:refreshMetadataIfNecessary'),
  FIND_CONTROLLER_BROKER: Symbol('private:Cluster:findControllerBroker'),
}

module.exports = class Cluster {
  /**
   * @param {Object} options
   * @param {Array<string>} options.brokers example: ['127.0.0.1:9092', '127.0.0.1:9094']
   * @param {Object} options.ssl
   * @param {Object} options.sasl
   * @param {string} options.clientId
   * @param {number} options.connectionTimeout - in milliseconds
   * @param {number} options.authenticationTimeout - in milliseconds
   * @param {number} options.reauthenticationThreshold - in milliseconds
   * @param {number} [options.requestTimeout=30000] - in milliseconds
   * @param {boolean} [options.enforceRequestTimeout]
   * @param {number} options.metadataMaxAge - in milliseconds
   * @param {boolean} options.allowAutoTopicCreation
   * @param {number} options.maxInFlightRequests
   * @param {number} options.isolationLevel
   * @param {import("../../types").RetryOptions} options.retry
   * @param {import("../../types").Logger} options.logger
   * @param {import("../../types").ISocketFactory} options.socketFactory
   * @param {Map} [options.offsets]
   * @param {import("../instrumentation/emitter")} [options.instrumentationEmitter=null]
   */
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
    requestTimeout = 30000,
    enforceRequestTimeout,
    metadataMaxAge,
    retry,
    allowAutoTopicCreation,
    maxInFlightRequests,
    isolationLevel,
    instrumentationEmitter = null,
    offsets = new Map(),
  }) {
    this.rootLogger = rootLogger
    this.logger = rootLogger.namespace('Cluster')
    this.retrier = createRetry(retry)
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
      reauthenticationThreshold,
    })

    this.targetTopics = new Set()
    this.mutatingTargetTopics = new Lock({
      description: `updating target topics`,
      timeout: requestTimeout,
    })
    this.isolationLevel = isolationLevel
    this.brokerPool = new BrokerPool({
      connectionPoolBuilder: this.connectionPoolBuilder,
      logger: this.rootLogger,
      retry,
      allowAutoTopicCreation,
      authenticationTimeout,
      metadataMaxAge,
    })
    this.committedOffsetsByGroup = offsets

    this[PRIVATE.CONNECT] = sharedPromiseTo(async () => {
      return await this.brokerPool.connect()
    })

    this[PRIVATE.REFRESH_METADATA] = sharedPromiseTo(async () => {
      return await this.brokerPool.refreshMetadata(Array.from(this.targetTopics))
    })

    this[PRIVATE.REFRESH_METADATA_IF_NECESSARY] = sharedPromiseTo(async () => {
      return await this.brokerPool.refreshMetadataIfNecessary(Array.from(this.targetTopics))
    })

    this[PRIVATE.FIND_CONTROLLER_BROKER] = sharedPromiseTo(async () => {
      const { metadata } = this.brokerPool

      if (!metadata || metadata.controllerId == null) {
        throw new KafkaJSMetadataNotLoaded('Topic metadata not loaded')
      }

      const broker = await this.findBroker({ nodeId: metadata.controllerId })

      if (!broker) {
        throw new KafkaJSBrokerNotFound(
          `Controller broker with id ${metadata.controllerId} not found in the cached metadata`
        )
      }

      return broker
    })
  }

  isConnected() {
    return this.brokerPool.hasConnectedBrokers()
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async connect() {
    await this[PRIVATE.CONNECT]()
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async disconnect() {
    await this.brokerPool.disconnect()
  }

  /**
   * @public
   * @param {object} destination
   * @param {String} destination.host
   * @param {Number} destination.port
   */
  removeBroker({ host, port }) {
    this.brokerPool.removeBroker({ host, port })
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async refreshMetadata() {
    await this[PRIVATE.REFRESH_METADATA]()
  }

  /**
   * @public
   * @returns {Promise<void>}
   */
  async refreshMetadataIfNecessary() {
    await this[PRIVATE.REFRESH_METADATA_IF_NECESSARY]()
  }

  /**
   * @public
   * @returns {Promise<import("../../types").BrokerMetadata>}
   */
  async metadata({ topics = [] } = {}) {
    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        await this.brokerPool.refreshMetadataIfNecessary(topics)
        return this.brokerPool.withBroker(async ({ broker }) => broker.metadata(topics))
      } catch (e) {
        if (e.type === 'LEADER_NOT_AVAILABLE') {
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @public
   * @param {string} topic
   * @return {Promise}
   */
  async addTargetTopic(topic) {
    return this.addMultipleTargetTopics([topic])
  }

  /**
   * @public
   * @param {string[]} topics
   * @return {Promise}
   */
  async addMultipleTargetTopics(topics) {
    await this.mutatingTargetTopics.acquire()

    try {
      const previousSize = this.targetTopics.size
      const previousTopics = new Set(this.targetTopics)
      for (const topic of topics) {
        this.targetTopics.add(topic)
      }

      const hasChanged = previousSize !== this.targetTopics.size || !this.brokerPool.metadata

      if (hasChanged) {
        try {
          await this.refreshMetadata()
        } catch (e) {
          if (e.type === 'INVALID_TOPIC_EXCEPTION' || e.type === 'UNKNOWN_TOPIC_OR_PARTITION') {
            this.targetTopics = previousTopics
          }

          throw e
        }
      }
    } finally {
      await this.mutatingTargetTopics.release()
    }
  }

  /** @type {() => string[]} */
  getNodeIds() {
    return this.brokerPool.getNodeIds()
  }

  /**
   * @public
   * @param {object} options
   * @param {string} options.nodeId
   * @returns {Promise<import("../../types").Broker>}
   */
  async findBroker({ nodeId }) {
    try {
      return await this.brokerPool.findBroker({ nodeId })
    } catch (e) {
      // The client probably has stale metadata
      if (
        e.name === 'KafkaJSBrokerNotFound' ||
        e.name === 'KafkaJSLockTimeout' ||
        e.name === 'KafkaJSConnectionError'
      ) {
        await this.refreshMetadata()
      }

      throw e
    }
  }

  /**
   * @public
   * @returns {Promise<import("../../types").Broker>}
   */
  async findControllerBroker() {
    return await this[PRIVATE.FIND_CONTROLLER_BROKER]()
  }

  /**
   * @public
   * @param {string} topic
   * @returns {import("../../types").PartitionMetadata[]} Example:
   *                   [{
   *                     isr: [2],
   *                     leader: 2,
   *                     partitionErrorCode: 0,
   *                     partitionId: 0,
   *                     replicas: [2],
   *                   }]
   */
  findTopicPartitionMetadata(topic) {
    const { metadata } = this.brokerPool
    if (!metadata || !metadata.topicMetadata) {
      throw new KafkaJSTopicMetadataNotLoaded('Topic metadata not loaded', { topic })
    }

    const topicMetadata = metadata.topicMetadata.find(t => t.topic === topic)
    return topicMetadata ? topicMetadata.partitionMetadata : []
  }

  /**
   * @public
   * @param {string} topic
   * @param {(number|string)[]} partitions
   * @returns {Object} Object with leader and partitions. For partitions 0 and 5
   *                   the result could be:
   *                     { '0': [0], '2': [5] }
   *
   *                   where the key is the nodeId.
   */
  findLeaderForPartitions(topic, partitions) {
    const partitionMetadata = this.findTopicPartitionMetadata(topic)
    return partitions.reduce((result, id) => {
      const partitionId = parseInt(id, 10)
      const metadata = partitionMetadata.find(p => p.partitionId === partitionId)

      if (!metadata) {
        return result
      }

      if (metadata.leader === null || metadata.leader === undefined) {
        throw new KafkaJSError('Invalid partition metadata', { topic, partitionId, metadata })
      }

      const { leader } = metadata
      const current = result[leader] || []
      return { ...result, [leader]: [...current, partitionId] }
    }, {})
  }

  /**
   * @public
   * @param {object} params
   * @param {string} params.groupId
   * @param {import("../protocol/coordinatorTypes").CoordinatorType} [params.coordinatorType=0]
   * @returns {Promise<import("../../types").Broker>}
   */
  async findGroupCoordinator({ groupId, coordinatorType = COORDINATOR_TYPES.GROUP }) {
    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        const { coordinator } = await this.findGroupCoordinatorMetadata({
          groupId,
          coordinatorType,
        })
        return await this.findBroker({ nodeId: coordinator.nodeId })
      } catch (e) {
        // A new broker can join the cluster before we have the chance
        // to refresh metadata
        if (e.name === 'KafkaJSBrokerNotFound' || e.type === 'GROUP_COORDINATOR_NOT_AVAILABLE') {
          this.logger.debug(`${e.message}, refreshing metadata and trying again...`, {
            groupId,
            retryCount,
            retryTime,
          })

          await this.refreshMetadata()
          throw e
        }

        if (e.code === 'ECONNREFUSED') {
          // During maintenance the current coordinator can go down; findBroker will
          // refresh metadata and re-throw the error. findGroupCoordinator has to re-throw
          // the error to go through the retry cycle.
          throw e
        }

        bail(e)
      }
    })
  }

  /**
   * @public
   * @param {object} params
   * @param {string} params.groupId
   * @param {import("../protocol/coordinatorTypes").CoordinatorType} [params.coordinatorType=0]
   * @returns {Promise<Object>}
   */
  async findGroupCoordinatorMetadata({ groupId, coordinatorType }) {
    const brokerMetadata = await this.brokerPool.withBroker(async ({ nodeId, broker }) => {
      return await this.retrier(async (bail, retryCount, retryTime) => {
        try {
          const brokerMetadata = await broker.findGroupCoordinator({ groupId, coordinatorType })
          this.logger.debug('Found group coordinator', {
            broker: brokerMetadata.host,
            nodeId: brokerMetadata.coordinator.nodeId,
          })
          return brokerMetadata
        } catch (e) {
          this.logger.debug('Tried to find group coordinator', {
            nodeId,
            error: e,
          })

          if (e.type === 'GROUP_COORDINATOR_NOT_AVAILABLE') {
            this.logger.debug('Group coordinator not available, retrying...', {
              nodeId,
              retryCount,
              retryTime,
            })

            throw e
          }

          bail(e)
        }
      })
    })

    if (brokerMetadata) {
      return brokerMetadata
    }

    throw new KafkaJSGroupCoordinatorNotFound('Failed to find group coordinator')
  }

  /**
   * @param {object} topicConfiguration
   * @returns {number}
   */
  defaultOffset({ fromBeginning }) {
    return fromBeginning ? EARLIEST_OFFSET : LATEST_OFFSET
  }

  /**
   * @public
   * @param {Array<Object>} topics
   *                          [
   *                            {
   *                              topic: 'my-topic-name',
   *                              partitions: [{ partition: 0 }],
   *                              fromBeginning: false
   *                            }
   *                          ]
   * @returns {Promise<import("../../types").TopicOffsets[]>} example:
   *                          [
   *                            {
   *                              topic: 'my-topic-name',
   *                              partitions: [
   *                                { partition: 0, offset: '1' },
   *                                { partition: 1, offset: '2' },
   *                                { partition: 2, offset: '1' },
   *                              ],
   *                            },
   *                          ]
   */
  async fetchTopicsOffset(topics) {
    const partitionsPerBroker = {}
    const topicConfigurations = {}

    const addDefaultOffset = topic => partition => {
      const { timestamp } = topicConfigurations[topic]
      return { ...partition, timestamp }
    }

    // Index all topics and partitions per leader (nodeId)
    for (const topicData of topics) {
      const { topic, partitions, fromBeginning, fromTimestamp } = topicData
      const partitionsPerLeader = this.findLeaderForPartitions(
        topic,
        partitions.map(p => p.partition)
      )
      const timestamp =
        fromTimestamp != null ? fromTimestamp : this.defaultOffset({ fromBeginning })

      topicConfigurations[topic] = { timestamp }

      keys(partitionsPerLeader).forEach(nodeId => {
        partitionsPerBroker[nodeId] = partitionsPerBroker[nodeId] || {}
        partitionsPerBroker[nodeId][topic] = partitions.filter(p =>
          partitionsPerLeader[nodeId].includes(p.partition)
        )
      })
    }

    // Create a list of requests to fetch the offset of all partitions
    const requests = keys(partitionsPerBroker).map(async nodeId => {
      const broker = await this.findBroker({ nodeId })
      const partitions = partitionsPerBroker[nodeId]

      const { responses: topicOffsets } = await broker.listOffsets({
        isolationLevel: this.isolationLevel,
        topics: keys(partitions).map(topic => ({
          topic,
          partitions: partitions[topic].map(addDefaultOffset(topic)),
        })),
      })

      return topicOffsets
    })

    // Execute all requests, merge and normalize the responses
    const responses = await Promise.all(requests)
    const partitionsPerTopic = responses.flat().reduce(mergeTopics, {})

    return keys(partitionsPerTopic).map(topic => ({
      topic,
      partitions: partitionsPerTopic[topic].map(({ partition, offset }) => ({
        partition,
        offset,
      })),
    }))
  }

  /**
   * Retrieve the object mapping for committed offsets for a single consumer group
   * @param {object} options
   * @param {string} options.groupId
   * @returns {Object}
   */
  committedOffsets({ groupId }) {
    if (!this.committedOffsetsByGroup.has(groupId)) {
      this.committedOffsetsByGroup.set(groupId, {})
    }

    return this.committedOffsetsByGroup.get(groupId)
  }

  /**
   * Mark offset as committed for a single consumer group's topic-partition
   * @param {object} options
   * @param {string} options.groupId
   * @param {string} options.topic
   * @param {string|number} options.partition
   * @param {string} options.offset
   */
  markOffsetAsCommitted({ groupId, topic, partition, offset }) {
    const committedOffsets = this.committedOffsets({ groupId })

    committedOffsets[topic] = committedOffsets[topic] || {}
    committedOffsets[topic][partition] = offset
  }
}


/***/ }),

/***/ 7368:
/***/ ((module) => {

const EARLIEST_OFFSET = -2
const LATEST_OFFSET = -1
const INT_32_MAX_VALUE = Math.pow(2, 31) - 1

module.exports = {
  EARLIEST_OFFSET,
  LATEST_OFFSET,
  INT_32_MAX_VALUE,
}


/***/ }),

/***/ 1976:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const Decoder = __nccwpck_require__(9991)

const MemberMetadata = {
  /**
   * @param {Object} metadata
   * @param {number} metadata.version
   * @param {Array<string>} metadata.topics
   * @param {Buffer} [metadata.userData=Buffer.alloc(0)]
   *
   * @returns Buffer
   */
  encode({ version, topics, userData = Buffer.alloc(0) }) {
    return new Encoder()
      .writeInt16(version)
      .writeArray(topics)
      .writeBytes(userData).buffer
  },

  /**
   * @param {Buffer} buffer
   * @returns {Object}
   */
  decode(buffer) {
    const decoder = new Decoder(buffer)
    return {
      version: decoder.readInt16(),
      topics: decoder.readArray(d => d.readString()),
      userData: decoder.readBytes(),
    }
  },
}

const MemberAssignment = {
  /**
   * @param {object} options
   * @param {number} options.version
   * @param {Object<String,Array>} options.assignment, example:
   *                               {
   *                                 'topic-A': [0, 2, 4, 6],
   *                                 'topic-B': [0, 2],
   *                               }
   * @param {Buffer} [options.userData=Buffer.alloc(0)]
   *
   * @returns Buffer
   */
  encode({ version, assignment, userData = Buffer.alloc(0) }) {
    return new Encoder()
      .writeInt16(version)
      .writeArray(
        Object.keys(assignment).map(topic =>
          new Encoder().writeString(topic).writeArray(assignment[topic])
        )
      )
      .writeBytes(userData).buffer
  },

  /**
   * @param {Buffer} buffer
   * @returns {Object|null}
   */
  decode(buffer) {
    const decoder = new Decoder(buffer)
    const decodePartitions = d => d.readInt32()
    const decodeAssignment = d => ({
      topic: d.readString(),
      partitions: d.readArray(decodePartitions),
    })
    const indexAssignment = (obj, { topic, partitions }) =>
      Object.assign(obj, { [topic]: partitions })

    if (!decoder.canReadInt16()) {
      return null
    }

    return {
      version: decoder.readInt16(),
      assignment: decoder.readArray(decodeAssignment).reduce(indexAssignment, {}),
      userData: decoder.readBytes(),
    }
  },
}

module.exports = {
  MemberMetadata,
  MemberAssignment,
}


/***/ }),

/***/ 9299:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const roundRobin = __nccwpck_require__(948)

module.exports = {
  roundRobin,
}


/***/ }),

/***/ 948:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { MemberMetadata, MemberAssignment } = __nccwpck_require__(1976)

/**
 * RoundRobinAssigner
 * @type {import('types').PartitionAssigner}
 */
module.exports = ({ cluster }) => ({
  name: 'RoundRobinAssigner',
  version: 1,

  /**
   * Assign the topics to the provided members.
   *
   * The members array contains information about each member, `memberMetadata` is the result of the
   * `protocol` operation.
   *
   * @param {object} group
   * @param {import('types').GroupMember[]} group.members array of members, e.g:
                              [{ memberId: 'test-5f93f5a3', memberMetadata: Buffer }]
   * @param {string[]} group.topics
   * @returns {Promise<import('types').GroupMemberAssignment[]>} object partitions per topic per member, e.g:
   *                   [
   *                     {
   *                       memberId: 'test-5f93f5a3',
   *                       memberAssignment: {
   *                         'topic-A': [0, 2, 4, 6],
   *                         'topic-B': [1],
   *                       },
   *                     },
   *                     {
   *                       memberId: 'test-3d3d5341',
   *                       memberAssignment: {
   *                         'topic-A': [1, 3, 5],
   *                         'topic-B': [0, 2],
   *                       },
   *                     }
   *                   ]
   */
  async assign({ members, topics }) {
    const membersCount = members.length
    const sortedMembers = members.map(({ memberId }) => memberId).sort()
    const assignment = {}

    const topicsPartitions = topics.flatMap(topic => {
      const partitionMetadata = cluster.findTopicPartitionMetadata(topic)
      return partitionMetadata.map(m => ({ topic: topic, partitionId: m.partitionId }))
    })

    topicsPartitions.forEach((topicPartition, i) => {
      const assignee = sortedMembers[i % membersCount]

      if (!assignment[assignee]) {
        assignment[assignee] = Object.create(null)
      }

      if (!assignment[assignee][topicPartition.topic]) {
        assignment[assignee][topicPartition.topic] = []
      }

      assignment[assignee][topicPartition.topic].push(topicPartition.partitionId)
    })

    return Object.keys(assignment).map(memberId => ({
      memberId,
      memberAssignment: MemberAssignment.encode({
        version: this.version,
        assignment: assignment[memberId],
      }),
    }))
  },

  protocol({ topics }) {
    return {
      name: this.name,
      metadata: MemberMetadata.encode({
        version: this.version,
        topics,
      }),
    }
  },
})


/***/ }),

/***/ 7217:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)
const filterAbortedMessages = __nccwpck_require__(3859)

/**
 * A batch collects messages returned from a single fetch call.
 *
 * A batch could contain _multiple_ Kafka RecordBatches.
 */
module.exports = class Batch {
  constructor(topic, fetchedOffset, partitionData) {
    this.fetchedOffset = fetchedOffset
    const longFetchedOffset = Long.fromValue(this.fetchedOffset)
    const { abortedTransactions, messages } = partitionData

    this.topic = topic
    this.partition = partitionData.partition
    this.highWatermark = partitionData.highWatermark

    this.rawMessages = messages
    // Apparently fetch can return different offsets than the target offset provided to the fetch API.
    // Discard messages that are not in the requested offset
    // https://github.com/apache/kafka/blob/bf237fa7c576bd141d78fdea9f17f65ea269c290/clients/src/main/java/org/apache/kafka/clients/consumer/internals/Fetcher.java#L912
    this.messagesWithinOffset = this.rawMessages.filter(message =>
      Long.fromValue(message.offset).gte(longFetchedOffset)
    )

    // 1. Don't expose aborted messages
    // 2. Don't expose control records
    // @see https://kafka.apache.org/documentation/#controlbatch
    this.messages = filterAbortedMessages({
      messages: this.messagesWithinOffset,
      abortedTransactions,
    }).filter(message => !message.isControlRecord)
  }

  isEmpty() {
    return this.messages.length === 0
  }

  isEmptyIncludingFiltered() {
    return this.messagesWithinOffset.length === 0
  }

  /**
   * If the batch contained raw messages (i.e was not truly empty) but all messages were filtered out due to
   * log compaction, control records or other reasons
   */
  isEmptyDueToFiltering() {
    return this.isEmpty() && this.rawMessages.length > 0
  }

  isEmptyControlRecord() {
    return (
      this.isEmpty() && this.messagesWithinOffset.some(({ isControlRecord }) => isControlRecord)
    )
  }

  /**
   * With compressed messages, it's possible for the returned messages to have offsets smaller than the starting offset.
   * These messages will be filtered out (i.e. they are not even included in this.messagesWithinOffset)
   * If these are the only messages, the batch will appear as an empty batch.
   *
   * isEmpty() and isEmptyIncludingFiltered() will always return true if the batch is empty,
   * but this method will only return true if the batch is empty due to log compacted messages.
   *
   * @returns boolean True if the batch is empty, because of log compacted messages in the partition.
   */
  isEmptyDueToLogCompactedMessages() {
    const hasMessages = this.rawMessages.length > 0
    return hasMessages && this.isEmptyIncludingFiltered()
  }

  firstOffset() {
    return this.isEmptyIncludingFiltered() ? null : this.messagesWithinOffset[0].offset
  }

  lastOffset() {
    if (this.isEmptyDueToLogCompactedMessages()) {
      return this.fetchedOffset
    }

    if (this.isEmptyIncludingFiltered()) {
      return Long.fromValue(this.highWatermark)
        .add(-1)
        .toString()
    }

    return this.messagesWithinOffset[this.messagesWithinOffset.length - 1].offset
  }

  /**
   * Returns the lag based on the last offset in the batch (also known as "high")
   */
  offsetLag() {
    const lastOffsetOfPartition = Long.fromValue(this.highWatermark).add(-1)
    const lastConsumedOffset = Long.fromValue(this.lastOffset())
    return lastOffsetOfPartition.add(lastConsumedOffset.multiply(-1)).toString()
  }

  /**
   * Returns the lag based on the first offset in the batch
   */
  offsetLagLow() {
    if (this.isEmptyIncludingFiltered()) {
      return '0'
    }

    const lastOffsetOfPartition = Long.fromValue(this.highWatermark).add(-1)
    const firstConsumedOffset = Long.fromValue(this.firstOffset())
    return lastOffsetOfPartition.add(firstConsumedOffset.multiply(-1)).toString()
  }
}


/***/ }),

/***/ 3508:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const sleep = __nccwpck_require__(4946)
const websiteUrl = __nccwpck_require__(7274)
const arrayDiff = __nccwpck_require__(1262)
const createRetry = __nccwpck_require__(1862)
const sharedPromiseTo = __nccwpck_require__(7326)

const OffsetManager = __nccwpck_require__(3142)
const Batch = __nccwpck_require__(7217)
const SeekOffsets = __nccwpck_require__(1261)
const SubscriptionState = __nccwpck_require__(3388)
const {
  events: { GROUP_JOIN, HEARTBEAT, CONNECT, RECEIVED_UNSUBSCRIBED_TOPICS },
} = __nccwpck_require__(3877)
const { MemberAssignment } = __nccwpck_require__(1976)
const {
  KafkaJSError,
  KafkaJSNonRetriableError,
  KafkaJSStaleTopicMetadataAssignment,
  isRebalancing,
} = __nccwpck_require__(5073)

const { keys } = Object

const STALE_METADATA_ERRORS = [
  'LEADER_NOT_AVAILABLE',
  // Fetch before v9 uses NOT_LEADER_FOR_PARTITION
  'NOT_LEADER_FOR_PARTITION',
  // Fetch after v9 uses {FENCED,UNKNOWN}_LEADER_EPOCH
  'FENCED_LEADER_EPOCH',
  'UNKNOWN_LEADER_EPOCH',
  'UNKNOWN_TOPIC_OR_PARTITION',
]

const PRIVATE = {
  JOIN: Symbol('private:ConsumerGroup:join'),
  SYNC: Symbol('private:ConsumerGroup:sync'),
  SHARED_HEARTBEAT: Symbol('private:ConsumerGroup:sharedHeartbeat'),
}

module.exports = class ConsumerGroup {
  /**
   * @param {object} options
   * @param {import('../../types').RetryOptions} options.retry
   * @param {import('../../types').Cluster} options.cluster
   * @param {string} options.groupId
   * @param {string[]} options.topics
   * @param {Record<string, { fromBeginning?: boolean }>} options.topicConfigurations
   * @param {import('../../types').Logger} options.logger
   * @param {import('../instrumentation/emitter')} options.instrumentationEmitter
   * @param {import('../../types').Assigner[]} options.assigners
   * @param {number} options.sessionTimeout
   * @param {number} options.rebalanceTimeout
   * @param {number} options.maxBytesPerPartition
   * @param {number} options.minBytes
   * @param {number} options.maxBytes
   * @param {number} options.maxWaitTimeInMs
   * @param {boolean} options.autoCommit
   * @param {number} options.autoCommitInterval
   * @param {number} options.autoCommitThreshold
   * @param {number} options.isolationLevel
   * @param {string} options.rackId
   * @param {number} options.metadataMaxAge
   */
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
    metadataMaxAge,
  }) {
    /** @type {import("../../types").Cluster} */
    this.cluster = cluster
    this.groupId = groupId
    this.topics = topics
    this.topicsSubscribed = topics
    this.topicConfigurations = topicConfigurations
    this.logger = logger.namespace('ConsumerGroup')
    this.instrumentationEmitter = instrumentationEmitter
    this.retrier = createRetry(Object.assign({}, retry))
    this.assigners = assigners
    this.sessionTimeout = sessionTimeout
    this.rebalanceTimeout = rebalanceTimeout
    this.maxBytesPerPartition = maxBytesPerPartition
    this.minBytes = minBytes
    this.maxBytes = maxBytes
    this.maxWaitTime = maxWaitTimeInMs
    this.autoCommit = autoCommit
    this.autoCommitInterval = autoCommitInterval
    this.autoCommitThreshold = autoCommitThreshold
    this.isolationLevel = isolationLevel
    this.rackId = rackId
    this.metadataMaxAge = metadataMaxAge

    this.seekOffset = new SeekOffsets()
    this.coordinator = null
    this.generationId = null
    this.leaderId = null
    this.memberId = null
    this.members = null
    this.groupProtocol = null

    this.partitionsPerSubscribedTopic = null
    /**
     * Preferred read replica per topic and partition
     *
     * Each of the partitions tracks the preferred read replica (`nodeId`) and a timestamp
     * until when that preference is valid.
     *
     * @type {{[topicName: string]: {[partition: number]: {nodeId: number, expireAt: number}}}}
     */
    this.preferredReadReplicasPerTopicPartition = {}
    this.offsetManager = null
    this.subscriptionState = new SubscriptionState()

    this.lastRequest = Date.now()

    this[PRIVATE.SHARED_HEARTBEAT] = sharedPromiseTo(async ({ interval }) => {
      const { groupId, generationId, memberId } = this
      const now = Date.now()

      if (memberId && now >= this.lastRequest + interval) {
        const payload = {
          groupId,
          memberId,
          groupGenerationId: generationId,
        }

        await this.coordinator.heartbeat(payload)
        this.instrumentationEmitter.emit(HEARTBEAT, payload)
        this.lastRequest = Date.now()
      }
    })
  }

  isLeader() {
    return this.leaderId && this.memberId === this.leaderId
  }

  getNodeIds() {
    return this.cluster.getNodeIds()
  }

  async connect() {
    await this.cluster.connect()
    this.instrumentationEmitter.emit(CONNECT)
    await this.cluster.refreshMetadataIfNecessary()
  }

  async [PRIVATE.JOIN]() {
    const { groupId, sessionTimeout, rebalanceTimeout } = this

    this.coordinator = await this.cluster.findGroupCoordinator({ groupId })

    const groupData = await this.coordinator.joinGroup({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId: this.memberId || '',
      groupProtocols: this.assigners.map(assigner =>
        assigner.protocol({
          topics: this.topicsSubscribed,
        })
      ),
    })

    this.generationId = groupData.generationId
    this.leaderId = groupData.leaderId
    this.memberId = groupData.memberId
    this.members = groupData.members
    this.groupProtocol = groupData.groupProtocol
  }

  async leave() {
    const { groupId, memberId } = this
    if (memberId) {
      await this.coordinator.leaveGroup({ groupId, memberId })
      this.memberId = null
    }
  }

  async [PRIVATE.SYNC]() {
    let assignment = []
    const {
      groupId,
      generationId,
      memberId,
      members,
      groupProtocol,
      topics,
      topicsSubscribed,
      coordinator,
    } = this

    if (this.isLeader()) {
      this.logger.debug('Chosen as group leader', { groupId, generationId, memberId, topics })
      const assigner = this.assigners.find(({ name }) => name === groupProtocol)

      if (!assigner) {
        throw new KafkaJSNonRetriableError(
          `Unsupported partition assigner "${groupProtocol}", the assigner wasn't found in the assigners list`
        )
      }

      await this.cluster.refreshMetadata()
      assignment = await assigner.assign({ members, topics: topicsSubscribed })

      this.logger.debug('Group assignment', {
        groupId,
        generationId,
        groupProtocol,
        assignment,
        topics: topicsSubscribed,
      })
    }

    // Keep track of the partitions for the subscribed topics
    this.partitionsPerSubscribedTopic = this.generatePartitionsPerSubscribedTopic()
    const { memberAssignment } = await this.coordinator.syncGroup({
      groupId,
      generationId,
      memberId,
      groupAssignment: assignment,
    })

    const decodedMemberAssignment = MemberAssignment.decode(memberAssignment)
    const decodedAssignment =
      decodedMemberAssignment != null ? decodedMemberAssignment.assignment : {}

    this.logger.debug('Received assignment', {
      groupId,
      generationId,
      memberId,
      memberAssignment: decodedAssignment,
    })

    const assignedTopics = keys(decodedAssignment)
    const topicsNotSubscribed = arrayDiff(assignedTopics, topicsSubscribed)

    if (topicsNotSubscribed.length > 0) {
      const payload = {
        groupId,
        generationId,
        memberId,
        assignedTopics,
        topicsSubscribed,
        topicsNotSubscribed,
      }

      this.instrumentationEmitter.emit(RECEIVED_UNSUBSCRIBED_TOPICS, payload)
      this.logger.warn('Consumer group received unsubscribed topics', {
        ...payload,
        helpUrl: websiteUrl(
          'docs/faq',
          'why-am-i-receiving-messages-for-topics-i-m-not-subscribed-to'
        ),
      })
    }

    // Remove unsubscribed topics from the list
    const safeAssignment = arrayDiff(assignedTopics, topicsNotSubscribed)
    const currentMemberAssignment = safeAssignment.map(topic => ({
      topic,
      partitions: decodedAssignment[topic],
    }))

    // Check if the consumer is aware of all assigned partitions
    for (const assignment of currentMemberAssignment) {
      const { topic, partitions: assignedPartitions } = assignment
      const knownPartitions = this.partitionsPerSubscribedTopic.get(topic)
      const isAwareOfAllAssignedPartitions = assignedPartitions.every(partition =>
        knownPartitions.includes(partition)
      )

      if (!isAwareOfAllAssignedPartitions) {
        this.logger.warn('Consumer is not aware of all assigned partitions, refreshing metadata', {
          groupId,
          generationId,
          memberId,
          topic,
          knownPartitions,
          assignedPartitions,
        })

        // If the consumer is not aware of all assigned partitions, refresh metadata
        // and update the list of partitions per subscribed topic. It's enough to perform
        // this operation once since refresh metadata will update metadata for all topics
        await this.cluster.refreshMetadata()
        this.partitionsPerSubscribedTopic = this.generatePartitionsPerSubscribedTopic()
        break
      }
    }

    this.topics = currentMemberAssignment.map(({ topic }) => topic)
    this.subscriptionState.assign(currentMemberAssignment)
    this.offsetManager = new OffsetManager({
      cluster: this.cluster,
      topicConfigurations: this.topicConfigurations,
      instrumentationEmitter: this.instrumentationEmitter,
      memberAssignment: currentMemberAssignment.reduce(
        (partitionsByTopic, { topic, partitions }) => ({
          ...partitionsByTopic,
          [topic]: partitions,
        }),
        {}
      ),
      autoCommit: this.autoCommit,
      autoCommitInterval: this.autoCommitInterval,
      autoCommitThreshold: this.autoCommitThreshold,
      coordinator,
      groupId,
      generationId,
      memberId,
    })
  }

  joinAndSync() {
    const startJoin = Date.now()
    return this.retrier(async bail => {
      try {
        await this[PRIVATE.JOIN]()
        await this[PRIVATE.SYNC]()

        const memberAssignment = this.assigned().reduce(
          (result, { topic, partitions }) => ({ ...result, [topic]: partitions }),
          {}
        )

        const payload = {
          groupId: this.groupId,
          memberId: this.memberId,
          leaderId: this.leaderId,
          isLeader: this.isLeader(),
          memberAssignment,
          groupProtocol: this.groupProtocol,
          duration: Date.now() - startJoin,
        }

        this.instrumentationEmitter.emit(GROUP_JOIN, payload)
        this.logger.info('Consumer has joined the group', payload)
      } catch (e) {
        if (isRebalancing(e)) {
          // Rebalance in progress isn't a retriable protocol error since the consumer
          // has to go through find coordinator and join again before it can
          // actually retry the operation. We wrap the original error in a retriable error
          // here instead in order to restart the join + sync sequence using the retrier.
          throw new KafkaJSError(e)
        }

        if (e.type === 'UNKNOWN_MEMBER_ID') {
          this.memberId = null
          throw new KafkaJSError(e)
        }

        bail(e)
      }
    })
  }

  /**
   * @param {import("../../types").TopicPartition} topicPartition
   */
  resetOffset({ topic, partition }) {
    this.offsetManager.resetOffset({ topic, partition })
  }

  /**
   * @param {import("../../types").TopicPartitionOffset} topicPartitionOffset
   */
  resolveOffset({ topic, partition, offset }) {
    this.offsetManager.resolveOffset({ topic, partition, offset })
  }

  /**
   * Update the consumer offset for the given topic/partition. This will be used
   * on the next fetch. If this API is invoked for the same topic/partition more
   * than once, the latest offset will be used on the next fetch.
   *
   * @param {import("../../types").TopicPartitionOffset} topicPartitionOffset
   */
  seek({ topic, partition, offset }) {
    this.seekOffset.set(topic, partition, offset)
  }

  pause(topicPartitions) {
    this.logger.info(`Pausing fetching from ${topicPartitions.length} topics`, {
      topicPartitions,
    })
    this.subscriptionState.pause(topicPartitions)
  }

  resume(topicPartitions) {
    this.logger.info(`Resuming fetching from ${topicPartitions.length} topics`, {
      topicPartitions,
    })
    this.subscriptionState.resume(topicPartitions)
  }

  assigned() {
    return this.subscriptionState.assigned()
  }

  paused() {
    return this.subscriptionState.paused()
  }

  async commitOffsetsIfNecessary() {
    await this.offsetManager.commitOffsetsIfNecessary()
  }

  async commitOffsets(offsets) {
    await this.offsetManager.commitOffsets(offsets)
  }

  uncommittedOffsets() {
    return this.offsetManager.uncommittedOffsets()
  }

  async heartbeat({ interval }) {
    return this[PRIVATE.SHARED_HEARTBEAT]({ interval })
  }

  async fetch(nodeId) {
    try {
      await this.cluster.refreshMetadataIfNecessary()
      this.checkForStaleAssignment()

      let topicPartitions = this.subscriptionState.assigned()
      topicPartitions = this.filterPartitionsByNode(nodeId, topicPartitions)

      await this.seekOffsets(topicPartitions)

      const committedOffsets = this.offsetManager.committedOffsets()
      const activeTopicPartitions = this.getActiveTopicPartitions()

      const requests = topicPartitions
        .map(({ topic, partitions }) => ({
          topic,
          partitions: partitions
            .filter(
              partition =>
                /**
                 * When recovering from OffsetOutOfRange, each partition can recover
                 * concurrently, which invalidates resolved and committed offsets as part
                 * of the recovery mechanism (see OffsetManager.clearOffsets). In concurrent
                 * scenarios this can initiate a new fetch with invalid offsets.
                 *
                 * This was further highlighted by https://github.com/tulios/kafkajs/pull/570,
                 * which increased concurrency, making this more likely to happen.
                 *
                 * This is solved by only making requests for partitions with initialized offsets.
                 *
                 * See the following pull request which explains the context of the problem:
                 * @issue https://github.com/tulios/kafkajs/pull/578
                 */
                committedOffsets[topic][partition] != null &&
                activeTopicPartitions[topic].has(partition)
            )
            .map(partition => ({
              partition,
              fetchOffset: this.offsetManager.nextOffset(topic, partition).toString(),
              maxBytes: this.maxBytesPerPartition,
            })),
        }))
        .filter(({ partitions }) => partitions.length)

      if (!requests.length) {
        await sleep(this.maxWaitTime)
        return []
      }

      const broker = await this.cluster.findBroker({ nodeId })

      const { responses } = await broker.fetch({
        maxWaitTime: this.maxWaitTime,
        minBytes: this.minBytes,
        maxBytes: this.maxBytes,
        isolationLevel: this.isolationLevel,
        topics: requests,
        rackId: this.rackId,
      })

      return responses.flatMap(({ topicName, partitions }) => {
        const topicRequestData = requests.find(({ topic }) => topic === topicName)

        let preferredReadReplicas = this.preferredReadReplicasPerTopicPartition[topicName]
        if (!preferredReadReplicas) {
          this.preferredReadReplicasPerTopicPartition[topicName] = preferredReadReplicas = {}
        }

        return partitions
          .filter(
            ({ partition }) =>
              !this.seekOffset.has(topicName, partition) &&
              !this.subscriptionState.isPaused(topicName, partition)
          )
          .map(partitionData => {
            const { partition, preferredReadReplica } = partitionData

            if (preferredReadReplica != null && preferredReadReplica !== -1) {
              const { nodeId: currentPreferredReadReplica } = preferredReadReplicas[partition] || {}
              if (currentPreferredReadReplica !== preferredReadReplica) {
                this.logger.info(`Preferred read replica is now ${preferredReadReplica}`, {
                  groupId: this.groupId,
                  memberId: this.memberId,
                  topic: topicName,
                  partition,
                })
              }
              preferredReadReplicas[partition] = {
                nodeId: preferredReadReplica,
                expireAt: Date.now() + this.metadataMaxAge,
              }
            }

            const partitionRequestData = topicRequestData.partitions.find(
              ({ partition }) => partition === partitionData.partition
            )

            const fetchedOffset = partitionRequestData.fetchOffset
            return new Batch(topicName, fetchedOffset, partitionData)
          })
      })
    } catch (e) {
      await this.recoverFromFetch(e)
      return []
    }
  }

  async recoverFromFetch(e) {
    if (STALE_METADATA_ERRORS.includes(e.type) || e.name === 'KafkaJSTopicMetadataNotLoaded') {
      this.logger.debug('Stale cluster metadata, refreshing...', {
        groupId: this.groupId,
        memberId: this.memberId,
        error: e.message,
      })

      await this.cluster.refreshMetadata()
      await this.joinAndSync()
      return
    }

    if (e.name === 'KafkaJSStaleTopicMetadataAssignment') {
      this.logger.warn(`${e.message}, resync group`, {
        groupId: this.groupId,
        memberId: this.memberId,
        topic: e.topic,
        unknownPartitions: e.unknownPartitions,
      })

      await this.joinAndSync()
      return
    }

    if (e.name === 'KafkaJSOffsetOutOfRange') {
      await this.recoverFromOffsetOutOfRange(e)
      return
    }

    if (e.name === 'KafkaJSConnectionClosedError') {
      this.cluster.removeBroker({ host: e.host, port: e.port })
      return
    }

    if (e.name === 'KafkaJSBrokerNotFound' || e.name === 'KafkaJSConnectionClosedError') {
      this.logger.debug(`${e.message}, refreshing metadata and retrying...`)
      await this.cluster.refreshMetadata()
      return
    }

    throw e
  }

  async recoverFromOffsetOutOfRange(e) {
    // If we are fetching from a follower try with the leader before resetting offsets
    const preferredReadReplicas = this.preferredReadReplicasPerTopicPartition[e.topic]
    if (preferredReadReplicas && typeof preferredReadReplicas[e.partition] === 'number') {
      this.logger.info('Offset out of range while fetching from follower, retrying with leader', {
        topic: e.topic,
        partition: e.partition,
        groupId: this.groupId,
        memberId: this.memberId,
      })
      delete preferredReadReplicas[e.partition]
    } else {
      this.logger.error('Offset out of range, resetting to default offset', {
        topic: e.topic,
        partition: e.partition,
        groupId: this.groupId,
        memberId: this.memberId,
      })

      await this.offsetManager.setDefaultOffset({
        topic: e.topic,
        partition: e.partition,
      })
    }
  }

  generatePartitionsPerSubscribedTopic() {
    const map = new Map()

    for (const topic of this.topicsSubscribed) {
      const partitions = this.cluster
        .findTopicPartitionMetadata(topic)
        .map(m => m.partitionId)
        .sort()

      map.set(topic, partitions)
    }

    return map
  }

  checkForStaleAssignment() {
    if (!this.partitionsPerSubscribedTopic) {
      return
    }

    const newPartitionsPerSubscribedTopic = this.generatePartitionsPerSubscribedTopic()

    for (const [topic, partitions] of newPartitionsPerSubscribedTopic) {
      const diff = arrayDiff(partitions, this.partitionsPerSubscribedTopic.get(topic))

      if (diff.length > 0) {
        throw new KafkaJSStaleTopicMetadataAssignment('Topic has been updated', {
          topic,
          unknownPartitions: diff,
        })
      }
    }
  }

  async seekOffsets(topicPartitions) {
    for (const { topic, partitions } of topicPartitions) {
      for (const partition of partitions) {
        const seekEntry = this.seekOffset.pop(topic, partition)
        if (!seekEntry) {
          continue
        }

        this.logger.debug('Seek offset', {
          groupId: this.groupId,
          memberId: this.memberId,
          seek: seekEntry,
        })
        await this.offsetManager.seek(seekEntry)
      }
    }

    await this.offsetManager.resolveOffsets()
  }

  hasSeekOffset({ topic, partition }) {
    return this.seekOffset.has(topic, partition)
  }

  /**
   * For each of the partitions find the best nodeId to read it from
   *
   * @param {string} topic
   * @param {number[]} partitions
   * @returns {{[nodeId: number]: number[]}} per-node assignment of partitions
   * @see Cluster~findLeaderForPartitions
   */
  // Invariant: The resulting object has each partition referenced exactly once
  findReadReplicaForPartitions(topic, partitions) {
    const partitionMetadata = this.cluster.findTopicPartitionMetadata(topic)
    const preferredReadReplicas = this.preferredReadReplicasPerTopicPartition[topic]
    return partitions.reduce((result, id) => {
      const partitionId = parseInt(id, 10)
      const metadata = partitionMetadata.find(p => p.partitionId === partitionId)
      if (!metadata) {
        return result
      }

      if (metadata.leader == null) {
        throw new KafkaJSError('Invalid partition metadata', { topic, partitionId, metadata })
      }

      // Pick the preferred replica if there is one, and it isn't known to be offline, otherwise the leader.
      let nodeId = metadata.leader
      if (preferredReadReplicas) {
        const { nodeId: preferredReadReplica, expireAt } = preferredReadReplicas[partitionId] || {}
        if (Date.now() >= expireAt) {
          this.logger.debug('Preferred read replica information has expired, using leader', {
            topic,
            partitionId,
            groupId: this.groupId,
            memberId: this.memberId,
            preferredReadReplica,
            leader: metadata.leader,
          })
          // Drop the entry
          delete preferredReadReplicas[partitionId]
        } else if (preferredReadReplica != null) {
          // Valid entry, check whether it is not offline
          // Note that we don't delete the preference here, and rather hope that eventually that replica comes online again
          const offlineReplicas = metadata.offlineReplicas
          if (Array.isArray(offlineReplicas) && offlineReplicas.includes(nodeId)) {
            this.logger.debug('Preferred read replica is offline, using leader', {
              topic,
              partitionId,
              groupId: this.groupId,
              memberId: this.memberId,
              preferredReadReplica,
              leader: metadata.leader,
            })
          } else {
            nodeId = preferredReadReplica
          }
        }
      }
      const current = result[nodeId] || []
      return { ...result, [nodeId]: [...current, partitionId] }
    }, {})
  }

  filterPartitionsByNode(nodeId, topicPartitions) {
    return topicPartitions.map(({ topic, partitions }) => ({
      topic,
      partitions: this.findReadReplicaForPartitions(topic, partitions)[nodeId] || [],
    }))
  }

  getActiveTopicPartitions() {
    return this.subscriptionState
      .active()
      .reduce((acc, { topic, partitions }) => ({ ...acc, [topic]: new Set(partitions) }), {})
  }
}


/***/ }),

/***/ 9582:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const seq = __nccwpck_require__(5435)
const createFetcher = __nccwpck_require__(1413)
const createWorker = __nccwpck_require__(9548)
const createWorkerQueue = __nccwpck_require__(4490)
const { KafkaJSFetcherRebalanceError } = __nccwpck_require__(5073)

/** @typedef {ReturnType<typeof createFetchManager>} FetchManager */

/**
 * @param {object} options
 * @param {import('../../types').Logger} options.logger
 * @param {() => number[]} options.getNodeIds
 * @param {(nodeId: number) => Promise<import('../../types').Batch[]>} options.fetch
 * @param {import('./worker').Handler<T>} options.handler
 * @param {number} [options.concurrency]
 * @template T
 */
const createFetchManager = ({
  logger: rootLogger,
  getNodeIds,
  fetch,
  handler,
  concurrency = 1,
}) => {
  const logger = rootLogger.namespace('FetchManager')
  const workers = seq(concurrency, workerId => createWorker({ handler, workerId }))
  const workerQueue = createWorkerQueue({ workers })

  let fetchers = []

  const getFetchers = () => fetchers

  const createFetchers = () => {
    const nodeIds = getNodeIds()
    const partitionAssignments = new Map()

    const validateShouldRebalance = () => {
      const current = getNodeIds()
      const hasChanged =
        nodeIds.length !== current.length || nodeIds.some(nodeId => !current.includes(nodeId))
      if (hasChanged) {
        throw new KafkaJSFetcherRebalanceError()
      }
    }

    const fetchers = nodeIds.map(nodeId =>
      createFetcher({
        nodeId,
        workerQueue,
        partitionAssignments,
        fetch: async nodeId => {
          validateShouldRebalance()
          return fetch(nodeId)
        },
        logger,
      })
    )

    logger.debug(`Created ${fetchers.length} fetchers`, { nodeIds, concurrency })
    return fetchers
  }

  const start = async () => {
    logger.debug('Starting...')

    while (true) {
      fetchers = createFetchers()

      try {
        await Promise.all(fetchers.map(fetcher => fetcher.start()))
      } catch (error) {
        await stop()

        if (error instanceof KafkaJSFetcherRebalanceError) {
          logger.debug('Rebalancing fetchers...')
          continue
        }

        throw error
      }

      break
    }
  }

  const stop = async () => {
    logger.debug('Stopping fetchers...')
    await Promise.all(fetchers.map(fetcher => fetcher.stop()))
    logger.debug('Stopped fetchers')
  }

  return { start, stop, getFetchers }
}

module.exports = createFetchManager


/***/ }),

/***/ 1413:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const EventEmitter = __nccwpck_require__(2361)

/**
 * Fetches data from all assigned nodes, waits for workerQueue to drain and repeats.
 *
 * @param {object} options
 * @param {number} options.nodeId
 * @param {import('./workerQueue').WorkerQueue} options.workerQueue
 * @param {Map<string, string[]>} options.partitionAssignments
 * @param {(nodeId: number) => Promise<T[]>} options.fetch
 * @param {import('../../types').Logger} options.logger
 * @template T
 */
const createFetcher = ({
  nodeId,
  workerQueue,
  partitionAssignments,
  fetch,
  logger: rootLogger,
}) => {
  const logger = rootLogger.namespace(`Fetcher ${nodeId}`)
  const emitter = new EventEmitter()
  let isRunning = false

  const getWorkerQueue = () => workerQueue
  const assignmentKey = ({ topic, partition }) => `${topic}|${partition}`
  const getAssignedFetcher = batch => partitionAssignments.get(assignmentKey(batch))
  const assignTopicPartition = batch => partitionAssignments.set(assignmentKey(batch), nodeId)
  const unassignTopicPartition = batch => partitionAssignments.delete(assignmentKey(batch))
  const filterUnassignedBatches = batches =>
    batches.filter(batch => {
      const assignedFetcher = getAssignedFetcher(batch)
      if (assignedFetcher != null && assignedFetcher !== nodeId) {
        logger.info(
          'Filtering out batch due to partition already being processed by another fetcher',
          {
            topic: batch.topic,
            partition: batch.partition,
            assignedFetcher: assignedFetcher,
            fetcher: nodeId,
          }
        )
        return false
      }

      return true
    })

  const start = async () => {
    if (isRunning) return
    isRunning = true

    while (isRunning) {
      try {
        const batches = await fetch(nodeId)
        if (isRunning) {
          const availableBatches = filterUnassignedBatches(batches)

          if (availableBatches.length > 0) {
            availableBatches.forEach(assignTopicPartition)
            try {
              await workerQueue.push(...availableBatches)
            } finally {
              availableBatches.forEach(unassignTopicPartition)
            }
          }
        }
      } catch (error) {
        isRunning = false
        emitter.emit('end')
        throw error
      }
    }
    emitter.emit('end')
  }

  const stop = async () => {
    if (!isRunning) return
    isRunning = false
    await new Promise(resolve => emitter.once('end', () => resolve()))
  }

  return { start, stop, getWorkerQueue }
}

module.exports = createFetcher


/***/ }),

/***/ 3859:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)
const ABORTED_MESSAGE_KEY = Buffer.from([0, 0, 0, 0])

const isAbortMarker = ({ key }) => {
  // Handle null/undefined keys.
  if (!key) return false
  // Cast key to buffer defensively
  return Buffer.from(key).equals(ABORTED_MESSAGE_KEY)
}

/**
 * Remove messages marked as aborted according to the aborted transactions list.
 *
 * Start of an aborted transaction is determined by message offset.
 * End of an aborted transaction is determined by control messages.
 * @param {Message[]} messages
 * @param {Transaction[]} [abortedTransactions]
 * @returns {Message[]} Messages which did not participate in an aborted transaction
 *
 * @typedef {object} Message
 * @param {Buffer} key
 * @param {lastOffset} key  Int64
 * @param {RecordBatch}  batchContext
 *
 * @typedef {object} Transaction
 * @param {string} firstOffset  Int64
 * @param {string} producerId  Int64
 *
 * @typedef {object} RecordBatch
 * @param {string}  producerId  Int64
 * @param {boolean}  inTransaction
 */
module.exports = ({ messages, abortedTransactions }) => {
  const currentAbortedTransactions = new Map()

  if (!abortedTransactions || !abortedTransactions.length) {
    return messages
  }

  const remainingAbortedTransactions = [...abortedTransactions]

  return messages.filter(message => {
    // If the message offset is GTE the first offset of the next aborted transaction
    // then we have stepped into an aborted transaction.
    if (
      remainingAbortedTransactions.length &&
      Long.fromValue(message.offset).gte(remainingAbortedTransactions[0].firstOffset)
    ) {
      const { producerId } = remainingAbortedTransactions.shift()
      currentAbortedTransactions.set(producerId, true)
    }

    const { producerId, inTransaction } = message.batchContext

    if (isAbortMarker(message)) {
      // Transaction is over, we no longer need to ignore messages from this producer
      currentAbortedTransactions.delete(producerId)
    } else if (currentAbortedTransactions.has(producerId) && inTransaction) {
      return false
    }

    return true
  })
}


/***/ }),

/***/ 4148:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)
const createRetry = __nccwpck_require__(1862)
const { initialRetryTime } = __nccwpck_require__(9695)
const ConsumerGroup = __nccwpck_require__(3508)
const Runner = __nccwpck_require__(9132)
const { events, wrap: wrapEvent, unwrap: unwrapEvent } = __nccwpck_require__(3877)
const InstrumentationEventEmitter = __nccwpck_require__(4491)
const { KafkaJSNonRetriableError } = __nccwpck_require__(5073)
const { roundRobin } = __nccwpck_require__(9299)
const { EARLIEST_OFFSET, LATEST_OFFSET } = __nccwpck_require__(7368)
const ISOLATION_LEVEL = __nccwpck_require__(4596)
const sharedPromiseTo = __nccwpck_require__(7326)

const { keys, values } = Object
const { CONNECT, DISCONNECT, STOP, CRASH } = events

const eventNames = values(events)
const eventKeys = keys(events)
  .map(key => `consumer.events.${key}`)
  .join(', ')

const specialOffsets = [
  Long.fromValue(EARLIEST_OFFSET).toString(),
  Long.fromValue(LATEST_OFFSET).toString(),
]

/**
 * @param {Object} params
 * @param {import("../../types").Cluster} params.cluster
 * @param {String} params.groupId
 * @param {import('../../types').RetryOptions} [params.retry]
 * @param {import('../../types').Logger} params.logger
 * @param {import('../../types').PartitionAssigner[]} [params.partitionAssigners]
 * @param {number} [params.sessionTimeout]
 * @param {number} [params.rebalanceTimeout]
 * @param {number} [params.heartbeatInterval]
 * @param {number} [params.maxBytesPerPartition]
 * @param {number} [params.minBytes]
 * @param {number} [params.maxBytes]
 * @param {number} [params.maxWaitTimeInMs]
 * @param {number} [params.isolationLevel]
 * @param {string} [params.rackId]
 * @param {InstrumentationEventEmitter} [params.instrumentationEmitter]
 * @param {number} params.metadataMaxAge
 *
 * @returns {import("../../types").Consumer}
 */
module.exports = ({
  cluster,
  groupId,
  retry,
  logger: rootLogger,
  partitionAssigners = [roundRobin],
  sessionTimeout = 30000,
  rebalanceTimeout = 60000,
  heartbeatInterval = 3000,
  maxBytesPerPartition = 1048576, // 1MB
  minBytes = 1,
  maxBytes = 10485760, // 10MB
  maxWaitTimeInMs = 5000,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  rackId = '',
  instrumentationEmitter: rootInstrumentationEmitter,
  metadataMaxAge,
}) => {
  if (!groupId) {
    throw new KafkaJSNonRetriableError('Consumer groupId must be a non-empty string.')
  }

  const logger = rootLogger.namespace('Consumer')
  const instrumentationEmitter = rootInstrumentationEmitter || new InstrumentationEventEmitter()
  const assigners = partitionAssigners.map(createAssigner =>
    createAssigner({ groupId, logger, cluster })
  )

  /** @type {Record<string, { fromBeginning?: boolean }>} */
  const topics = {}
  let runner = null
  /** @type {ConsumerGroup} */
  let consumerGroup = null
  let restartTimeout = null

  if (heartbeatInterval >= sessionTimeout) {
    throw new KafkaJSNonRetriableError(
      `Consumer heartbeatInterval (${heartbeatInterval}) must be lower than sessionTimeout (${sessionTimeout}). It is recommended to set heartbeatInterval to approximately a third of the sessionTimeout.`
    )
  }

  /** @type {import("../../types").Consumer["connect"]} */
  const connect = async () => {
    await cluster.connect()
    instrumentationEmitter.emit(CONNECT)
  }

  /** @type {import("../../types").Consumer["disconnect"]} */
  const disconnect = async () => {
    try {
      await stop()
      logger.debug('consumer has stopped, disconnecting', { groupId })
      await cluster.disconnect()
      instrumentationEmitter.emit(DISCONNECT)
    } catch (e) {
      logger.error(`Caught error when disconnecting the consumer: ${e.message}`, {
        stack: e.stack,
        groupId,
      })
      throw e
    }
  }

  /** @type {import("../../types").Consumer["stop"]} */
  const stop = sharedPromiseTo(async () => {
    try {
      if (runner) {
        await runner.stop()
        runner = null
        consumerGroup = null
        instrumentationEmitter.emit(STOP)
      }

      clearTimeout(restartTimeout)
      logger.info('Stopped', { groupId })
    } catch (e) {
      logger.error(`Caught error when stopping the consumer: ${e.message}`, {
        stack: e.stack,
        groupId,
      })

      throw e
    }
  })

  /** @type {import("../../types").Consumer["subscribe"]} */
  const subscribe = async ({ topic, topics: subscriptionTopics, fromBeginning = false }) => {
    if (consumerGroup) {
      throw new KafkaJSNonRetriableError('Cannot subscribe to topic while consumer is running')
    }

    if (!topic && !subscriptionTopics) {
      throw new KafkaJSNonRetriableError('Missing required argument "topics"')
    }

    if (subscriptionTopics != null && !Array.isArray(subscriptionTopics)) {
      throw new KafkaJSNonRetriableError('Argument "topics" must be an array')
    }

    const subscriptions = subscriptionTopics || [topic]

    for (const subscription of subscriptions) {
      if (typeof subscription !== 'string' && !(subscription instanceof RegExp)) {
        throw new KafkaJSNonRetriableError(
          `Invalid topic ${subscription} (${typeof subscription}), the topic name has to be a String or a RegExp`
        )
      }
    }

    const hasRegexSubscriptions = subscriptions.some(subscription => subscription instanceof RegExp)
    const metadata = hasRegexSubscriptions ? await cluster.metadata() : undefined

    const topicsToSubscribe = []
    for (const subscription of subscriptions) {
      const isRegExp = subscription instanceof RegExp
      if (isRegExp) {
        const topicRegExp = subscription
        const matchedTopics = metadata.topicMetadata
          .map(({ topic: topicName }) => topicName)
          .filter(topicName => topicRegExp.test(topicName))

        logger.debug('Subscription based on RegExp', {
          groupId,
          topicRegExp: topicRegExp.toString(),
          matchedTopics,
        })

        topicsToSubscribe.push(...matchedTopics)
      } else {
        topicsToSubscribe.push(subscription)
      }
    }

    for (const t of topicsToSubscribe) {
      topics[t] = { fromBeginning }
    }

    await cluster.addMultipleTargetTopics(topicsToSubscribe)
  }

  /** @type {import("../../types").Consumer["run"]} */
  const run = async ({
    autoCommit = true,
    autoCommitInterval = null,
    autoCommitThreshold = null,
    eachBatchAutoResolve = true,
    partitionsConsumedConcurrently: concurrency = 1,
    eachBatch = null,
    eachMessage = null,
  } = {}) => {
    if (consumerGroup) {
      logger.warn('consumer#run was called, but the consumer is already running', { groupId })
      return
    }

    const start = async onCrash => {
      logger.info('Starting', { groupId })

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
        autoCommitThreshold,
      })

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
        onCrash,
        concurrency,
      })

      await runner.start()
    }

    const onCrash = async e => {
      logger.error(`Crash: ${e.name}: ${e.message}`, {
        groupId,
        retryCount: e.retryCount,
        stack: e.stack,
      })

      if (e.name === 'KafkaJSConnectionClosedError') {
        cluster.removeBroker({ host: e.host, port: e.port })
      }

      await disconnect()

      const getOriginalCause = error => {
        if (error.cause) {
          return getOriginalCause(error.cause)
        }

        return error
      }

      const isErrorRetriable =
        e.name === 'KafkaJSNumberOfRetriesExceeded' || getOriginalCause(e).retriable === true
      const shouldRestart =
        isErrorRetriable &&
        (!retry ||
          !retry.restartOnFailure ||
          (await retry.restartOnFailure(e).catch(error => {
            logger.error(
              'Caught error when invoking user-provided "restartOnFailure" callback. Defaulting to restarting.',
              {
                error: error.message || error,
                cause: e.message || e,
                groupId,
              }
            )

            return true
          })))

      instrumentationEmitter.emit(CRASH, {
        error: e,
        groupId,
        restart: shouldRestart,
      })

      if (shouldRestart) {
        const retryTime = e.retryTime || (retry && retry.initialRetryTime) || initialRetryTime
        logger.error(`Restarting the consumer in ${retryTime}ms`, {
          retryCount: e.retryCount,
          retryTime,
          groupId,
        })

        restartTimeout = setTimeout(() => start(onCrash), retryTime)
      }
    }

    await start(onCrash)
  }

  /** @type {import("../../types").Consumer["on"]} */
  const on = (eventName, listener) => {
    if (!eventNames.includes(eventName)) {
      throw new KafkaJSNonRetriableError(`Event name should be one of ${eventKeys}`)
    }

    return instrumentationEmitter.addListener(unwrapEvent(eventName), event => {
      event.type = wrapEvent(event.type)
      Promise.resolve(listener(event)).catch(e => {
        logger.error(`Failed to execute listener: ${e.message}`, {
          eventName,
          stack: e.stack,
        })
      })
    })
  }

  /**
   * @type {import("../../types").Consumer["commitOffsets"]}
   * @param topicPartitions
   *   Example: [{ topic: 'topic-name', partition: 0, offset: '1', metadata: 'event-id-3' }]
   */
  const commitOffsets = async (topicPartitions = []) => {
    const commitsByTopic = topicPartitions.reduce(
      (payload, { topic, partition, offset, metadata = null }) => {
        if (!topic) {
          throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
        }

        if (isNaN(partition)) {
          throw new KafkaJSNonRetriableError(
            `Invalid partition, expected a number received ${partition}`
          )
        }

        let commitOffset
        try {
          commitOffset = Long.fromValue(offset)
        } catch (_) {
          throw new KafkaJSNonRetriableError(`Invalid offset, expected a long received ${offset}`)
        }

        if (commitOffset.lessThan(0)) {
          throw new KafkaJSNonRetriableError('Offset must not be a negative number')
        }

        if (metadata !== null && typeof metadata !== 'string') {
          throw new KafkaJSNonRetriableError(
            `Invalid offset metadata, expected string or null, received ${metadata}`
          )
        }

        const topicCommits = payload[topic] || []

        topicCommits.push({ partition, offset: commitOffset, metadata })

        return { ...payload, [topic]: topicCommits }
      },
      {}
    )

    if (!consumerGroup) {
      throw new KafkaJSNonRetriableError(
        'Consumer group was not initialized, consumer#run must be called first'
      )
    }

    const topics = Object.keys(commitsByTopic)

    return runner.commitOffsets({
      topics: topics.map(topic => {
        return {
          topic,
          partitions: commitsByTopic[topic],
        }
      }),
    })
  }

  /** @type {import("../../types").Consumer["seek"]} */
  const seek = ({ topic, partition, offset }) => {
    if (!topic) {
      throw new KafkaJSNonRetriableError(`Invalid topic ${topic}`)
    }

    if (isNaN(partition)) {
      throw new KafkaJSNonRetriableError(
        `Invalid partition, expected a number received ${partition}`
      )
    }

    let seekOffset
    try {
      seekOffset = Long.fromValue(offset)
    } catch (_) {
      throw new KafkaJSNonRetriableError(`Invalid offset, expected a long received ${offset}`)
    }

    if (seekOffset.lessThan(0) && !specialOffsets.includes(seekOffset.toString())) {
      throw new KafkaJSNonRetriableError('Offset must not be a negative number')
    }

    if (!consumerGroup) {
      throw new KafkaJSNonRetriableError(
        'Consumer group was not initialized, consumer#run must be called first'
      )
    }

    consumerGroup.seek({ topic, partition, offset: seekOffset.toString() })
  }

  /** @type {import("../../types").Consumer["describeGroup"]} */
  const describeGroup = async () => {
    const coordinator = await cluster.findGroupCoordinator({ groupId })
    const retrier = createRetry(retry)
    return retrier(async () => {
      const { groups } = await coordinator.describeGroups({ groupIds: [groupId] })
      return groups.find(group => group.groupId === groupId)
    })
  }

  /**
   * @type {import("../../types").Consumer["pause"]}
   * @param topicPartitions
   *   Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  const pause = (topicPartitions = []) => {
    for (const topicPartition of topicPartitions) {
      if (!topicPartition || !topicPartition.topic) {
        throw new KafkaJSNonRetriableError(
          `Invalid topic ${(topicPartition && topicPartition.topic) || topicPartition}`
        )
      } else if (
        typeof topicPartition.partitions !== 'undefined' &&
        (!Array.isArray(topicPartition.partitions) || topicPartition.partitions.some(isNaN))
      ) {
        throw new KafkaJSNonRetriableError(
          `Array of valid partitions required to pause specific partitions instead of ${topicPartition.partitions}`
        )
      }
    }

    if (!consumerGroup) {
      throw new KafkaJSNonRetriableError(
        'Consumer group was not initialized, consumer#run must be called first'
      )
    }

    consumerGroup.pause(topicPartitions)
  }

  /**
   * Returns the list of topic partitions paused on this consumer
   *
   * @type {import("../../types").Consumer["paused"]}
   */
  const paused = () => {
    if (!consumerGroup) {
      return []
    }

    return consumerGroup.paused()
  }

  /**
   * @type {import("../../types").Consumer["resume"]}
   * @param topicPartitions
   *  Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  const resume = (topicPartitions = []) => {
    for (const topicPartition of topicPartitions) {
      if (!topicPartition || !topicPartition.topic) {
        throw new KafkaJSNonRetriableError(
          `Invalid topic ${(topicPartition && topicPartition.topic) || topicPartition}`
        )
      } else if (
        typeof topicPartition.partitions !== 'undefined' &&
        (!Array.isArray(topicPartition.partitions) || topicPartition.partitions.some(isNaN))
      ) {
        throw new KafkaJSNonRetriableError(
          `Array of valid partitions required to resume specific partitions instead of ${topicPartition.partitions}`
        )
      }
    }

    if (!consumerGroup) {
      throw new KafkaJSNonRetriableError(
        'Consumer group was not initialized, consumer#run must be called first'
      )
    }

    consumerGroup.resume(topicPartitions)
  }

  /**
   * @return {Object} logger
   */
  const getLogger = () => logger

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
    logger: getLogger,
  }
}


/***/ }),

/***/ 3877:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const swapObject = __nccwpck_require__(2256)
const InstrumentationEventType = __nccwpck_require__(5352)
const networkEvents = __nccwpck_require__(6304)
const consumerType = InstrumentationEventType('consumer')

/** @type {import('types').ConsumerEvents} */
const events = {
  HEARTBEAT: consumerType('heartbeat'),
  COMMIT_OFFSETS: consumerType('commit_offsets'),
  GROUP_JOIN: consumerType('group_join'),
  FETCH: consumerType('fetch'),
  FETCH_START: consumerType('fetch_start'),
  START_BATCH_PROCESS: consumerType('start_batch_process'),
  END_BATCH_PROCESS: consumerType('end_batch_process'),
  CONNECT: consumerType('connect'),
  DISCONNECT: consumerType('disconnect'),
  STOP: consumerType('stop'),
  CRASH: consumerType('crash'),
  REBALANCING: consumerType('rebalancing'),
  RECEIVED_UNSUBSCRIBED_TOPICS: consumerType('received_unsubscribed_topics'),
  REQUEST: consumerType(networkEvents.NETWORK_REQUEST),
  REQUEST_TIMEOUT: consumerType(networkEvents.NETWORK_REQUEST_TIMEOUT),
  REQUEST_QUEUE_SIZE: consumerType(networkEvents.NETWORK_REQUEST_QUEUE_SIZE),
}

const wrappedEvents = {
  [events.REQUEST]: networkEvents.NETWORK_REQUEST,
  [events.REQUEST_TIMEOUT]: networkEvents.NETWORK_REQUEST_TIMEOUT,
  [events.REQUEST_QUEUE_SIZE]: networkEvents.NETWORK_REQUEST_QUEUE_SIZE,
}

const reversedWrappedEvents = swapObject(wrappedEvents)
const unwrap = eventName => wrappedEvents[eventName] || eventName
const wrap = eventName => reversedWrappedEvents[eventName] || eventName

module.exports = {
  events,
  wrap,
  unwrap,
}


/***/ }),

/***/ 3142:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)
const isInvalidOffset = __nccwpck_require__(3621)
const initializeConsumerOffsets = __nccwpck_require__(5539)
const {
  events: { COMMIT_OFFSETS },
} = __nccwpck_require__(3877)

const { keys, assign } = Object
const indexTopics = topics => topics.reduce((obj, topic) => assign(obj, { [topic]: {} }), {})

const PRIVATE = {
  COMMITTED_OFFSETS: Symbol('private:OffsetManager:committedOffsets'),
}
module.exports = class OffsetManager {
  /**
   * @param {Object} options
   * @param {import("../../../types").Cluster} options.cluster
   * @param {import("../../../types").Broker} options.coordinator
   * @param {import("../../../types").IMemberAssignment} options.memberAssignment
   * @param {boolean} options.autoCommit
   * @param {number | null} options.autoCommitInterval
   * @param {number | null} options.autoCommitThreshold
   * @param {{[topic: string]: { fromBeginning: boolean }}} options.topicConfigurations
   * @param {import("../../instrumentation/emitter")} options.instrumentationEmitter
   * @param {string} options.groupId
   * @param {number} options.generationId
   * @param {string} options.memberId
   */
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
    memberId,
  }) {
    this.cluster = cluster
    this.coordinator = coordinator

    // memberAssignment format:
    // {
    //   'topic1': [0, 1, 2, 3],
    //   'topic2': [0, 1, 2, 3, 4, 5],
    // }
    this.memberAssignment = memberAssignment

    this.topicConfigurations = topicConfigurations
    this.instrumentationEmitter = instrumentationEmitter
    this.groupId = groupId
    this.generationId = generationId
    this.memberId = memberId

    this.autoCommit = autoCommit
    this.autoCommitInterval = autoCommitInterval
    this.autoCommitThreshold = autoCommitThreshold
    this.lastCommit = Date.now()

    this.topics = keys(memberAssignment)
    this.clearAllOffsets()
  }

  /**
   * @param {string} topic
   * @param {number} partition
   * @returns {Long}
   */
  nextOffset(topic, partition) {
    if (!this.resolvedOffsets[topic][partition]) {
      this.resolvedOffsets[topic][partition] = this.committedOffsets()[topic][partition]
    }

    let offset = this.resolvedOffsets[topic][partition]
    if (isInvalidOffset(offset)) {
      offset = '0'
    }

    return Long.fromValue(offset)
  }

  /**
   * @returns {Promise<import("../../../types").Broker>}
   */
  async getCoordinator() {
    if (!this.coordinator.isConnected()) {
      this.coordinator = await this.cluster.findBroker(this.coordinator)
    }

    return this.coordinator
  }

  /**
   * @param {import("../../../types").TopicPartition} topicPartition
   */
  resetOffset({ topic, partition }) {
    this.resolvedOffsets[topic][partition] = this.committedOffsets()[topic][partition]
  }

  /**
   * @param {import("../../../types").TopicPartitionOffset} topicPartitionOffset
   */
  resolveOffset({ topic, partition, offset }) {
    this.resolvedOffsets[topic][partition] = Long.fromValue(offset)
      .add(1)
      .toString()
  }

  /**
   * @returns {Long}
   */
  countResolvedOffsets() {
    const committedOffsets = this.committedOffsets()

    const subtractOffsets = (resolvedOffset, committedOffset) => {
      const resolvedOffsetLong = Long.fromValue(resolvedOffset)
      return isInvalidOffset(committedOffset)
        ? resolvedOffsetLong
        : resolvedOffsetLong.subtract(Long.fromValue(committedOffset))
    }

    const subtractPartitionOffsets = (resolvedTopicOffsets, committedTopicOffsets) =>
      keys(resolvedTopicOffsets).map(partition =>
        subtractOffsets(resolvedTopicOffsets[partition], committedTopicOffsets[partition])
      )

    const subtractTopicOffsets = topic =>
      subtractPartitionOffsets(this.resolvedOffsets[topic], committedOffsets[topic])

    const offsetsDiff = this.topics.flatMap(subtractTopicOffsets)
    return offsetsDiff.reduce((sum, offset) => sum.add(offset), Long.fromValue(0))
  }

  /**
   * @param {import("../../../types").TopicPartition} topicPartition
   */
  async setDefaultOffset({ topic, partition }) {
    const { groupId, generationId, memberId } = this
    const defaultOffset = this.cluster.defaultOffset(this.topicConfigurations[topic])
    const coordinator = await this.getCoordinator()

    await coordinator.offsetCommit({
      groupId,
      memberId,
      groupGenerationId: generationId,
      topics: [
        {
          topic,
          partitions: [{ partition, offset: defaultOffset }],
        },
      ],
    })

    this.clearOffsets({ topic, partition })
  }

  /**
   * Commit the given offset to the topic/partition. If the consumer isn't assigned to the given
   * topic/partition this method will be a NO-OP.
   *
   * @param {import("../../../types").TopicPartitionOffset} topicPartitionOffset
   */
  async seek({ topic, partition, offset }) {
    if (!this.memberAssignment[topic] || !this.memberAssignment[topic].includes(partition)) {
      return
    }

    if (!this.autoCommit) {
      this.resolveOffset({
        topic,
        partition,
        offset: Long.fromValue(offset)
          .subtract(1)
          .toString(),
      })
      return
    }

    const { groupId, generationId, memberId } = this
    const coordinator = await this.getCoordinator()

    await coordinator.offsetCommit({
      groupId,
      memberId,
      groupGenerationId: generationId,
      topics: [
        {
          topic,
          partitions: [{ partition, offset }],
        },
      ],
    })

    this.clearOffsets({ topic, partition })
  }

  async commitOffsetsIfNecessary() {
    const now = Date.now()

    const timeoutReached =
      this.autoCommitInterval != null && now >= this.lastCommit + this.autoCommitInterval

    const thresholdReached =
      this.autoCommitThreshold != null &&
      this.countResolvedOffsets().gte(Long.fromValue(this.autoCommitThreshold))

    if (timeoutReached || thresholdReached) {
      return this.commitOffsets()
    }
  }

  /**
   * Return all locally resolved offsets which are not marked as committed, by topic-partition.
   * @returns {import('../../../types').OffsetsByTopicPartition}
   */
  uncommittedOffsets() {
    const offsets = topic => keys(this.resolvedOffsets[topic])
    const emptyPartitions = ({ partitions }) => partitions.length > 0
    const toPartitions = topic => partition => ({
      partition,
      offset: this.resolvedOffsets[topic][partition],
    })
    const changedOffsets = topic => ({ partition, offset }) => {
      return (
        offset !== this.committedOffsets()[topic][partition] &&
        Long.fromValue(offset).greaterThanOrEqual(0)
      )
    }

    // Select and format updated partitions
    const topicsWithPartitionsToCommit = this.topics
      .map(topic => ({
        topic,
        partitions: offsets(topic)
          .map(toPartitions(topic))
          .filter(changedOffsets(topic)),
      }))
      .filter(emptyPartitions)

    return { topics: topicsWithPartitionsToCommit }
  }

  async commitOffsets(offsets = {}) {
    const { groupId, generationId, memberId } = this
    const { topics = this.uncommittedOffsets().topics } = offsets

    if (topics.length === 0) {
      this.lastCommit = Date.now()
      return
    }

    const payload = {
      groupId,
      memberId,
      groupGenerationId: generationId,
      topics,
    }

    try {
      const coordinator = await this.getCoordinator()
      await coordinator.offsetCommit(payload)
      this.instrumentationEmitter.emit(COMMIT_OFFSETS, payload)

      // Update local reference of committed offsets
      topics.forEach(({ topic, partitions }) => {
        const updatedOffsets = partitions.reduce(
          (obj, { partition, offset }) => assign(obj, { [partition]: offset }),
          {}
        )

        this[PRIVATE.COMMITTED_OFFSETS][topic] = assign(
          {},
          this.committedOffsets()[topic],
          updatedOffsets
        )
      })

      this.lastCommit = Date.now()
    } catch (e) {
      // metadata is stale, the coordinator has changed due to a restart or
      // broker reassignment
      if (e.type === 'NOT_COORDINATOR_FOR_GROUP') {
        await this.cluster.refreshMetadata()
      }

      throw e
    }
  }

  async resolveOffsets() {
    const { groupId } = this
    const invalidOffset = topic => partition => {
      return isInvalidOffset(this.committedOffsets()[topic][partition])
    }

    const pendingPartitions = this.topics
      .map(topic => ({
        topic,
        partitions: this.memberAssignment[topic]
          .filter(invalidOffset(topic))
          .map(partition => ({ partition })),
      }))
      .filter(t => t.partitions.length > 0)

    if (pendingPartitions.length === 0) {
      return
    }

    const coordinator = await this.getCoordinator()
    const { responses: consumerOffsets } = await coordinator.offsetFetch({
      groupId,
      topics: pendingPartitions,
    })

    const unresolvedPartitions = consumerOffsets.map(({ topic, partitions }) =>
      assign(
        {
          topic,
          partitions: partitions
            .filter(({ offset }) => isInvalidOffset(offset))
            .map(({ partition }) => assign({ partition })),
        },
        this.topicConfigurations[topic]
      )
    )

    const indexPartitions = (obj, { partition, offset }) => {
      return assign(obj, { [partition]: offset })
    }

    const hasUnresolvedPartitions = () => unresolvedPartitions.some(t => t.partitions.length > 0)

    let offsets = consumerOffsets
    if (hasUnresolvedPartitions()) {
      const topicOffsets = await this.cluster.fetchTopicsOffset(unresolvedPartitions)
      offsets = initializeConsumerOffsets(consumerOffsets, topicOffsets)
    }

    offsets.forEach(({ topic, partitions }) => {
      this.committedOffsets()[topic] = partitions.reduce(indexPartitions, {
        ...this.committedOffsets()[topic],
      })
    })
  }

  /**
   * @private
   * @param {import("../../../types").TopicPartition} topicPartition
   */
  clearOffsets({ topic, partition }) {
    delete this.committedOffsets()[topic][partition]
    delete this.resolvedOffsets[topic][partition]
  }

  /**
   * @private
   */
  clearAllOffsets() {
    const committedOffsets = this.committedOffsets()

    for (const topic in committedOffsets) {
      delete committedOffsets[topic]
    }

    for (const topic of this.topics) {
      committedOffsets[topic] = {}
    }

    this.resolvedOffsets = indexTopics(this.topics)
  }

  committedOffsets() {
    if (!this[PRIVATE.COMMITTED_OFFSETS]) {
      this[PRIVATE.COMMITTED_OFFSETS] = this.groupId
        ? this.cluster.committedOffsets({ groupId: this.groupId })
        : {}
    }

    return this[PRIVATE.COMMITTED_OFFSETS]
  }
}


/***/ }),

/***/ 5539:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const isInvalidOffset = __nccwpck_require__(3621)
const { keys, assign } = Object

const indexPartitions = (obj, { partition, offset }) => assign(obj, { [partition]: offset })
const indexTopics = (obj, { topic, partitions }) =>
  assign(obj, { [topic]: partitions.reduce(indexPartitions, {}) })

module.exports = (consumerOffsets, topicOffsets) => {
  const indexedConsumerOffsets = consumerOffsets.reduce(indexTopics, {})
  const indexedTopicOffsets = topicOffsets.reduce(indexTopics, {})

  return keys(indexedConsumerOffsets).map(topic => {
    const partitions = indexedConsumerOffsets[topic]
    return {
      topic,
      partitions: keys(partitions).map(partition => {
        const offset = partitions[partition]
        const resolvedOffset = isInvalidOffset(offset)
          ? indexedTopicOffsets[topic][partition]
          : offset

        return { partition: Number(partition), offset: resolvedOffset }
      }),
    }
  })
}


/***/ }),

/***/ 3621:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)

module.exports = offset => (!offset && offset !== 0) || Long.fromValue(offset).isNegative()


/***/ }),

/***/ 9132:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { EventEmitter } = __nccwpck_require__(2361)
const Long = __nccwpck_require__(3368)
const createRetry = __nccwpck_require__(1862)
const { isKafkaJSError, isRebalancing } = __nccwpck_require__(5073)

const {
  events: { FETCH, FETCH_START, START_BATCH_PROCESS, END_BATCH_PROCESS, REBALANCING },
} = __nccwpck_require__(3877)
const createFetchManager = __nccwpck_require__(9582)

const isSameOffset = (offsetA, offsetB) => Long.fromValue(offsetA).equals(Long.fromValue(offsetB))
const CONSUMING_START = 'consuming-start'
const CONSUMING_STOP = 'consuming-stop'

module.exports = class Runner extends EventEmitter {
  /**
   * @param {object} options
   * @param {import("../../types").Logger} options.logger
   * @param {import("./consumerGroup")} options.consumerGroup
   * @param {import("../instrumentation/emitter")} options.instrumentationEmitter
   * @param {boolean} [options.eachBatchAutoResolve=true]
   * @param {number} options.concurrency
   * @param {(payload: import("../../types").EachBatchPayload) => Promise<void>} [options.eachBatch]
   * @param {(payload: import("../../types").EachMessagePayload) => Promise<void>} [options.eachMessage]
   * @param {number} [options.heartbeatInterval]
   * @param {(reason: Error) => void} options.onCrash
   * @param {import("../../types").RetryOptions} [options.retry]
   * @param {boolean} [options.autoCommit=true]
   */
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
    autoCommit = true,
  }) {
    super()
    this.logger = logger.namespace('Runner')
    this.consumerGroup = consumerGroup
    this.instrumentationEmitter = instrumentationEmitter
    this.eachBatchAutoResolve = eachBatchAutoResolve
    this.eachBatch = eachBatch
    this.eachMessage = eachMessage
    this.heartbeatInterval = heartbeatInterval
    this.retrier = createRetry(Object.assign({}, retry))
    this.onCrash = onCrash
    this.autoCommit = autoCommit
    this.fetchManager = createFetchManager({
      logger: this.logger,
      getNodeIds: () => this.consumerGroup.getNodeIds(),
      fetch: nodeId => this.fetch(nodeId),
      handler: batch => this.handleBatch(batch),
      concurrency,
    })

    this.running = false
    this.consuming = false
  }

  get consuming() {
    return this._consuming
  }

  set consuming(value) {
    if (this._consuming !== value) {
      this._consuming = value
      this.emit(value ? CONSUMING_START : CONSUMING_STOP)
    }
  }

  async start() {
    if (this.running) {
      return
    }

    try {
      await this.consumerGroup.connect()
      await this.consumerGroup.joinAndSync()
    } catch (e) {
      return this.onCrash(e)
    }

    this.running = true
    this.scheduleFetchManager()
  }

  async scheduleFetchManager() {
    this.consuming = true

    while (this.running) {
      try {
        await this.fetchManager.start()
      } catch (e) {
        if (isRebalancing(e)) {
          this.logger.warn('The group is rebalancing, re-joining', {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
            error: e.message,
          })

          this.instrumentationEmitter.emit(REBALANCING, {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
          })

          await this.consumerGroup.joinAndSync()
          continue
        }

        if (e.type === 'UNKNOWN_MEMBER_ID') {
          this.logger.error('The coordinator is not aware of this member, re-joining the group', {
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
            error: e.message,
          })

          this.consumerGroup.memberId = null
          await this.consumerGroup.joinAndSync()
          continue
        }

        this.onCrash(e)
        break
      }
    }

    this.consuming = false
    this.running = false
  }

  async stop() {
    if (!this.running) {
      return
    }

    this.logger.debug('stop consumer group', {
      groupId: this.consumerGroup.groupId,
      memberId: this.consumerGroup.memberId,
    })

    this.running = false

    try {
      await this.fetchManager.stop()
      await this.waitForConsumer()
      await this.consumerGroup.leave()
    } catch (e) {}
  }

  waitForConsumer() {
    return new Promise(resolve => {
      if (!this.consuming) {
        return resolve()
      }

      this.logger.debug('waiting for consumer to finish...', {
        groupId: this.consumerGroup.groupId,
        memberId: this.consumerGroup.memberId,
      })

      this.once(CONSUMING_STOP, () => resolve())
    })
  }

  async heartbeat() {
    try {
      await this.consumerGroup.heartbeat({ interval: this.heartbeatInterval })
    } catch (e) {
      if (isRebalancing(e)) {
        await this.autoCommitOffsets()
      }
      throw e
    }
  }

  async processEachMessage(batch) {
    const { topic, partition } = batch

    for (const message of batch.messages) {
      if (!this.running || this.consumerGroup.hasSeekOffset({ topic, partition })) {
        break
      }

      try {
        await this.eachMessage({
          topic,
          partition,
          message,
          heartbeat: () => this.heartbeat(),
        })
      } catch (e) {
        if (!isKafkaJSError(e)) {
          this.logger.error(`Error when calling eachMessage`, {
            topic,
            partition,
            offset: message.offset,
            stack: e.stack,
            error: e,
          })
        }

        // In case of errors, commit the previously consumed offsets unless autoCommit is disabled
        await this.autoCommitOffsets()
        throw e
      }

      this.consumerGroup.resolveOffset({ topic, partition, offset: message.offset })
      await this.heartbeat()
      await this.autoCommitOffsetsIfNecessary()
    }
  }

  async processEachBatch(batch) {
    const { topic, partition } = batch
    const lastFilteredMessage = batch.messages[batch.messages.length - 1]

    try {
      await this.eachBatch({
        batch,
        resolveOffset: offset => {
          /**
           * The transactional producer generates a control record after committing the transaction.
           * The control record is the last record on the RecordBatch, and it is filtered before it
           * reaches the eachBatch callback. When disabling auto-resolve, the user-land code won't
           * be able to resolve the control record offset, since it never reaches the callback,
           * causing stuck consumers as the consumer will never move the offset marker.
           *
           * When the last offset of the batch is resolved, we should automatically resolve
           * the control record offset as this entry doesn't have any meaning to the user-land code,
           * and won't interfere with the stream processing.
           *
           * @see https://github.com/apache/kafka/blob/9aa660786e46c1efbf5605a6a69136a1dac6edb9/clients/src/main/java/org/apache/kafka/clients/consumer/internals/Fetcher.java#L1499-L1505
           */
          const offsetToResolve =
            lastFilteredMessage && isSameOffset(offset, lastFilteredMessage.offset)
              ? batch.lastOffset()
              : offset

          this.consumerGroup.resolveOffset({ topic, partition, offset: offsetToResolve })
        },
        heartbeat: () => this.heartbeat(),
        /**
         * Commit offsets if provided. Otherwise commit most recent resolved offsets
         * if the autoCommit conditions are met.
         *
         * @param {import('../../types').OffsetsByTopicPartition} [offsets] Optional.
         */
        commitOffsetsIfNecessary: async offsets => {
          return offsets
            ? this.consumerGroup.commitOffsets(offsets)
            : this.consumerGroup.commitOffsetsIfNecessary()
        },
        uncommittedOffsets: () => this.consumerGroup.uncommittedOffsets(),
        isRunning: () => this.running,
        isStale: () => this.consumerGroup.hasSeekOffset({ topic, partition }),
      })
    } catch (e) {
      if (!isKafkaJSError(e)) {
        this.logger.error(`Error when calling eachBatch`, {
          topic,
          partition,
          offset: batch.firstOffset(),
          stack: e.stack,
          error: e,
        })
      }

      // eachBatch has a special resolveOffset which can be used
      // to keep track of the messages
      await this.autoCommitOffsets()
      throw e
    }

    // resolveOffset for the last offset can be disabled to allow the users of eachBatch to
    // stop their consumers without resolving unprocessed offsets (issues/18)
    if (this.eachBatchAutoResolve) {
      this.consumerGroup.resolveOffset({ topic, partition, offset: batch.lastOffset() })
    }
  }

  async fetch(nodeId) {
    if (!this.running) {
      this.logger.debug('consumer not running, exiting', {
        groupId: this.consumerGroup.groupId,
        memberId: this.consumerGroup.memberId,
      })

      return []
    }

    const startFetch = Date.now()

    this.instrumentationEmitter.emit(FETCH_START, { nodeId })

    const batches = await this.consumerGroup.fetch(nodeId)

    this.instrumentationEmitter.emit(FETCH, {
      /**
       * PR #570 removed support for the number of batches in this instrumentation event;
       * The new implementation uses an async generation to deliver the batches, which makes
       * this number impossible to get. The number is set to 0 to keep the event backward
       * compatible until we bump KafkaJS to version 2, following the end of node 8 LTS.
       *
       * @since 2019-11-29
       */
      numberOfBatches: 0,
      duration: Date.now() - startFetch,
      nodeId,
    })

    if (batches.length === 0) {
      await this.heartbeat()
    }

    return batches
  }

  async handleBatch(batch) {
    if (!this.running) {
      this.logger.debug('consumer not running, exiting', {
        groupId: this.consumerGroup.groupId,
        memberId: this.consumerGroup.memberId,
      })

      return
    }

    /** @param {import('./batch')} batch */
    const onBatch = async batch => {
      const startBatchProcess = Date.now()
      const payload = {
        topic: batch.topic,
        partition: batch.partition,
        highWatermark: batch.highWatermark,
        offsetLag: batch.offsetLag(),
        /**
         * @since 2019-06-24 (>= 1.8.0)
         *
         * offsetLag returns the lag based on the latest offset in the batch, to
         * keep the event backward compatible we just introduced "offsetLagLow"
         * which calculates the lag based on the first offset in the batch
         */
        offsetLagLow: batch.offsetLagLow(),
        batchSize: batch.messages.length,
        firstOffset: batch.firstOffset(),
        lastOffset: batch.lastOffset(),
      }

      /**
       * If the batch contained only control records or only aborted messages then we still
       * need to resolve and auto-commit to ensure the consumer can move forward.
       *
       * We also need to emit batch instrumentation events to allow any listeners keeping
       * track of offsets to know about the latest point of consumption.
       *
       * Added in #1256
       *
       * @see https://github.com/apache/kafka/blob/9aa660786e46c1efbf5605a6a69136a1dac6edb9/clients/src/main/java/org/apache/kafka/clients/consumer/internals/Fetcher.java#L1499-L1505
       */
      if (batch.isEmptyDueToFiltering()) {
        this.instrumentationEmitter.emit(START_BATCH_PROCESS, payload)

        this.consumerGroup.resolveOffset({
          topic: batch.topic,
          partition: batch.partition,
          offset: batch.lastOffset(),
        })
        await this.autoCommitOffsetsIfNecessary()

        this.instrumentationEmitter.emit(END_BATCH_PROCESS, {
          ...payload,
          duration: Date.now() - startBatchProcess,
        })

        await this.heartbeat()
        return
      }

      if (batch.isEmpty()) {
        await this.heartbeat()
        return
      }

      this.instrumentationEmitter.emit(START_BATCH_PROCESS, payload)

      if (this.eachMessage) {
        await this.processEachMessage(batch)
      } else if (this.eachBatch) {
        await this.processEachBatch(batch)
      }

      this.instrumentationEmitter.emit(END_BATCH_PROCESS, {
        ...payload,
        duration: Date.now() - startBatchProcess,
      })

      await this.autoCommitOffsets()
      await this.heartbeat()
    }

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        await onBatch(batch)
      } catch (e) {
        if (!this.running) {
          this.logger.debug('consumer not running, exiting', {
            error: e.message,
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
          })
          return
        }

        if (
          isRebalancing(e) ||
          e.type === 'UNKNOWN_MEMBER_ID' ||
          e.name === 'KafkaJSNotImplemented'
        ) {
          return bail(e)
        }

        this.logger.debug('Error while fetching data, trying again...', {
          groupId: this.consumerGroup.groupId,
          memberId: this.consumerGroup.memberId,
          error: e.message,
          stack: e.stack,
          retryCount,
          retryTime,
        })

        throw e
      }
    })
  }

  autoCommitOffsets() {
    if (this.autoCommit) {
      return this.consumerGroup.commitOffsets()
    }
  }

  autoCommitOffsetsIfNecessary() {
    if (this.autoCommit) {
      return this.consumerGroup.commitOffsetsIfNecessary()
    }
  }

  commitOffsets(offsets) {
    if (!this.running) {
      this.logger.debug('consumer not running, exiting', {
        groupId: this.consumerGroup.groupId,
        memberId: this.consumerGroup.memberId,
        offsets,
      })
      return
    }

    return this.retrier(async (bail, retryCount, retryTime) => {
      try {
        await this.consumerGroup.commitOffsets(offsets)
      } catch (e) {
        if (!this.running) {
          this.logger.debug('consumer not running, exiting', {
            error: e.message,
            groupId: this.consumerGroup.groupId,
            memberId: this.consumerGroup.memberId,
            offsets,
          })
          return
        }

        if (e.name === 'KafkaJSNotImplemented') {
          return bail(e)
        }

        this.logger.debug('Error while committing offsets, trying again...', {
          groupId: this.consumerGroup.groupId,
          memberId: this.consumerGroup.memberId,
          error: e.message,
          stack: e.stack,
          retryCount,
          retryTime,
          offsets,
        })

        throw e
      }
    })
  }
}


/***/ }),

/***/ 1261:
/***/ ((module) => {

module.exports = class SeekOffsets extends Map {
  getKey(topic, partition) {
    return JSON.stringify([topic, partition])
  }

  set(topic, partition, offset) {
    const key = this.getKey(topic, partition)
    super.set(key, offset)
  }

  has(topic, partition) {
    const key = this.getKey(topic, partition)
    return super.has(key)
  }

  pop(topic, partition) {
    if (this.size === 0 || !this.has(topic, partition)) {
      return
    }

    const key = this.getKey(topic, partition)
    const offset = this.get(key)

    this.delete(key)
    return { topic, partition, offset }
  }
}


/***/ }),

/***/ 3388:
/***/ ((module) => {

const createState = topic => ({
  topic,
  paused: new Set(),
  pauseAll: false,
  resumed: new Set(),
})

module.exports = class SubscriptionState {
  constructor() {
    this.assignedPartitionsByTopic = {}
    this.subscriptionStatesByTopic = {}
  }

  /**
   * Replace the current assignment with a new set of assignments
   *
   * @param {Array<TopicPartitions>} topicPartitions Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  assign(topicPartitions = []) {
    this.assignedPartitionsByTopic = topicPartitions.reduce(
      (assigned, { topic, partitions = [] }) => {
        return { ...assigned, [topic]: { topic, partitions } }
      },
      {}
    )
  }

  /**
   * @param {Array<TopicPartitions>} topicPartitions Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  pause(topicPartitions = []) {
    topicPartitions.forEach(({ topic, partitions }) => {
      const state = this.subscriptionStatesByTopic[topic] || createState(topic)

      if (typeof partitions === 'undefined') {
        state.paused.clear()
        state.resumed.clear()
        state.pauseAll = true
      } else if (Array.isArray(partitions)) {
        partitions.forEach(partition => {
          state.paused.add(partition)
          state.resumed.delete(partition)
        })
        state.pauseAll = false
      }

      this.subscriptionStatesByTopic[topic] = state
    })
  }

  /**
   * @param {Array<TopicPartitions>} topicPartitions Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  resume(topicPartitions = []) {
    topicPartitions.forEach(({ topic, partitions }) => {
      const state = this.subscriptionStatesByTopic[topic] || createState(topic)

      if (typeof partitions === 'undefined') {
        state.paused.clear()
        state.resumed.clear()
        state.pauseAll = false
      } else if (Array.isArray(partitions)) {
        partitions.forEach(partition => {
          state.paused.delete(partition)

          if (state.pauseAll) {
            state.resumed.add(partition)
          }
        })
      }

      this.subscriptionStatesByTopic[topic] = state
    })
  }

  /**
   * @returns {Array<import("../../types").TopicPartitions>} topicPartitions
   * Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  assigned() {
    return Object.values(this.assignedPartitionsByTopic).map(({ topic, partitions }) => ({
      topic,
      partitions: partitions.sort(),
    }))
  }

  /**
   * @returns {Array<import("../../types").TopicPartitions>} topicPartitions
   * Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  active() {
    return Object.values(this.assignedPartitionsByTopic).map(({ topic, partitions }) => ({
      topic,
      partitions: partitions.filter(partition => !this.isPaused(topic, partition)).sort(),
    }))
  }

  /**
   * @returns {Array<import("../../types").TopicPartitions>} topicPartitions
   * Example: [{ topic: 'topic-name', partitions: [1, 2] }]
   */
  paused() {
    return Object.values(this.assignedPartitionsByTopic)
      .map(({ topic, partitions }) => ({
        topic,
        partitions: partitions.filter(partition => this.isPaused(topic, partition)).sort(),
      }))
      .filter(({ partitions }) => partitions.length !== 0)
  }

  isPaused(topic, partition) {
    const state = this.subscriptionStatesByTopic[topic]

    if (!state) {
      return false
    }

    const partitionResumed = state.resumed.has(partition)
    const partitionPaused = state.paused.has(partition)

    return (state.pauseAll && !partitionResumed) || partitionPaused
  }
}


/***/ }),

/***/ 9548:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * @typedef {(batch: T, metadata: { workerId: number }) => Promise<void>} Handler
 * @template T
 *
 * @typedef {ReturnType<typeof createWorker>} Worker
 */

const sharedPromiseTo = __nccwpck_require__(7326)

/**
 * @param {{ handler: Handler<T>, workerId: number }} options
 * @template T
 */
const createWorker = ({ handler, workerId }) => {
  /**
   * Takes batches from next() until it returns undefined.
   *
   * @param {{ next: () => { batch: T, resolve: () => void, reject: (e: Error) => void } | undefined }} param0
   * @returns {Promise<void>}
   */
  const run = sharedPromiseTo(async ({ next }) => {
    while (true) {
      const item = next()
      if (!item) break

      const { batch, resolve, reject } = item

      try {
        await handler(batch, { workerId })
        resolve()
      } catch (error) {
        reject(error)
      }
    }
  })

  return { run }
}

module.exports = createWorker


/***/ }),

/***/ 4490:
/***/ ((module) => {

/**
 * @typedef {ReturnType<typeof createWorkerQueue>} WorkerQueue
 */

/**
 * @param {object} options
 * @param {import('./worker').Worker<T>[]} options.workers
 * @template T
 */
const createWorkerQueue = ({ workers }) => {
  /** @type {{ batch: T, resolve: (value?: any) => void, reject: (e: Error) => void}[]} */
  const queue = []

  const getWorkers = () => workers

  /**
   * Waits until workers have processed all batches in the queue.
   *
   * @param {...T} batches
   * @returns {Promise<void>}
   */
  const push = async (...batches) => {
    const promises = batches.map(
      batch => new Promise((resolve, reject) => queue.push({ batch, resolve, reject }))
    )

    workers.forEach(worker => worker.run({ next: () => queue.shift() }))

    const results = await Promise.allSettled(promises)
    const rejected = results.find(result => result.status === 'rejected')
    if (rejected) {
      // @ts-ignore
      throw rejected.reason
    }
  }

  return { push, getWorkers }
}

module.exports = createWorkerQueue


/***/ }),

/***/ 140:
/***/ ((module) => {

module.exports = () => ({
  KAFKAJS_DEBUG_PROTOCOL_BUFFERS: process.env.KAFKAJS_DEBUG_PROTOCOL_BUFFERS,
  KAFKAJS_DEBUG_EXTENDED_PROTOCOL_BUFFERS: process.env.KAFKAJS_DEBUG_EXTENDED_PROTOCOL_BUFFERS,
})


/***/ }),

/***/ 5073:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const pkgJson = __nccwpck_require__(5557)
const { bugs } = pkgJson

class KafkaJSError extends Error {
  constructor(e, { retriable = true, cause } = {}) {
    super(e, { cause })
    Error.captureStackTrace(this, this.constructor)
    this.message = e.message || e
    this.name = 'KafkaJSError'
    this.retriable = retriable
    this.helpUrl = e.helpUrl
    this.cause = cause
  }
}

class KafkaJSNonRetriableError extends KafkaJSError {
  constructor(e, { cause } = {}) {
    super(e, { retriable: false, cause })
    this.name = 'KafkaJSNonRetriableError'
  }
}

class KafkaJSProtocolError extends KafkaJSError {
  constructor(e, { retriable = e.retriable } = {}) {
    super(e, { retriable })
    this.type = e.type
    this.code = e.code
    this.name = 'KafkaJSProtocolError'
  }
}

class KafkaJSOffsetOutOfRange extends KafkaJSProtocolError {
  constructor(e, { topic, partition }) {
    super(e)
    this.topic = topic
    this.partition = partition
    this.name = 'KafkaJSOffsetOutOfRange'
  }
}

class KafkaJSMemberIdRequired extends KafkaJSProtocolError {
  constructor(e, { memberId }) {
    super(e)
    this.memberId = memberId
    this.name = 'KafkaJSMemberIdRequired'
  }
}

class KafkaJSNumberOfRetriesExceeded extends KafkaJSNonRetriableError {
  constructor(e, { retryCount, retryTime }) {
    super(e, { cause: e })
    this.stack = `${this.name}\n  Caused by: ${e.stack}`
    this.retryCount = retryCount
    this.retryTime = retryTime
    this.name = 'KafkaJSNumberOfRetriesExceeded'
  }
}

class KafkaJSConnectionError extends KafkaJSError {
  /**
   * @param {string} e
   * @param {object} options
   * @param {string} [options.broker]
   * @param {string} [options.code]
   */
  constructor(e, { broker, code } = {}) {
    super(e)
    this.broker = broker
    this.code = code
    this.name = 'KafkaJSConnectionError'
  }
}

class KafkaJSConnectionClosedError extends KafkaJSConnectionError {
  constructor(e, { host, port } = {}) {
    super(e, { broker: `${host}:${port}` })
    this.host = host
    this.port = port
    this.name = 'KafkaJSConnectionClosedError'
  }
}

class KafkaJSRequestTimeoutError extends KafkaJSError {
  constructor(e, { broker, correlationId, createdAt, sentAt, pendingDuration } = {}) {
    super(e)
    this.broker = broker
    this.correlationId = correlationId
    this.createdAt = createdAt
    this.sentAt = sentAt
    this.pendingDuration = pendingDuration
    this.name = 'KafkaJSRequestTimeoutError'
  }
}

class KafkaJSMetadataNotLoaded extends KafkaJSError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSMetadataNotLoaded'
  }
}
class KafkaJSTopicMetadataNotLoaded extends KafkaJSMetadataNotLoaded {
  constructor(e, { topic } = {}) {
    super(e)
    this.topic = topic
    this.name = 'KafkaJSTopicMetadataNotLoaded'
  }
}
class KafkaJSStaleTopicMetadataAssignment extends KafkaJSError {
  constructor(e, { topic, unknownPartitions } = {}) {
    super(e)
    this.topic = topic
    this.unknownPartitions = unknownPartitions
    this.name = 'KafkaJSStaleTopicMetadataAssignment'
  }
}

class KafkaJSDeleteGroupsError extends KafkaJSError {
  constructor(e, groups = []) {
    super(e)
    this.groups = groups
    this.name = 'KafkaJSDeleteGroupsError'
  }
}

class KafkaJSServerDoesNotSupportApiKey extends KafkaJSNonRetriableError {
  constructor(e, { apiKey, apiName } = {}) {
    super(e)
    this.apiKey = apiKey
    this.apiName = apiName
    this.name = 'KafkaJSServerDoesNotSupportApiKey'
  }
}

class KafkaJSBrokerNotFound extends KafkaJSError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSBrokerNotFound'
  }
}

class KafkaJSPartialMessageError extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSPartialMessageError'
  }
}

class KafkaJSSASLAuthenticationError extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSSASLAuthenticationError'
  }
}

class KafkaJSGroupCoordinatorNotFound extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSGroupCoordinatorNotFound'
  }
}

class KafkaJSNotImplemented extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSNotImplemented'
  }
}

class KafkaJSTimeout extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSTimeout'
  }
}

class KafkaJSLockTimeout extends KafkaJSTimeout {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSLockTimeout'
  }
}

class KafkaJSUnsupportedMagicByteInMessageSet extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSUnsupportedMagicByteInMessageSet'
  }
}

class KafkaJSDeleteTopicRecordsError extends KafkaJSError {
  constructor({ partitions }) {
    /*
     * This error is retriable if all the errors were retriable
     */
    const retriable = partitions
      .filter(({ error }) => error != null)
      .every(({ error }) => error.retriable === true)

    super('Error while deleting records', { retriable })
    this.name = 'KafkaJSDeleteTopicRecordsError'
    this.partitions = partitions
  }
}

const issueUrl = bugs ? bugs.url : null

class KafkaJSInvariantViolation extends KafkaJSNonRetriableError {
  constructor(e) {
    const message = e.message || e
    super(`Invariant violated: ${message}. This is likely a bug and should be reported.`)
    this.name = 'KafkaJSInvariantViolation'

    if (issueUrl !== null) {
      const issueTitle = encodeURIComponent(`Invariant violation: ${message}`)
      this.helpUrl = `${issueUrl}/new?assignees=&labels=bug&template=bug_report.md&title=${issueTitle}`
    }
  }
}

class KafkaJSInvalidVarIntError extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSNonRetriableError'
  }
}

class KafkaJSInvalidLongError extends KafkaJSNonRetriableError {
  constructor() {
    super(...arguments)
    this.name = 'KafkaJSNonRetriableError'
  }
}

class KafkaJSCreateTopicError extends KafkaJSProtocolError {
  constructor(e, topicName) {
    super(e)
    this.topic = topicName
    this.name = 'KafkaJSCreateTopicError'
  }
}
class KafkaJSAggregateError extends Error {
  constructor(message, errors) {
    super(message)
    this.errors = errors
    this.name = 'KafkaJSAggregateError'
  }
}

class KafkaJSFetcherRebalanceError extends Error {}

const isRebalancing = e =>
  e.type === 'REBALANCE_IN_PROGRESS' || e.type === 'NOT_COORDINATOR_FOR_GROUP'

const isKafkaJSError = e => e instanceof KafkaJSError

module.exports = {
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
  isKafkaJSError,
}


/***/ }),

/***/ 8609:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {
  createLogger,
  LEVELS: { INFO },
} = __nccwpck_require__(1203)

const InstrumentationEventEmitter = __nccwpck_require__(4491)
const LoggerConsole = __nccwpck_require__(9523)
const Cluster = __nccwpck_require__(3140)
const createProducer = __nccwpck_require__(5995)
const createConsumer = __nccwpck_require__(4148)
const createAdmin = __nccwpck_require__(599)
const ISOLATION_LEVEL = __nccwpck_require__(4596)
const defaultSocketFactory = __nccwpck_require__(2456)
const once = __nccwpck_require__(9563)
const websiteUrl = __nccwpck_require__(7274)

const PRIVATE = {
  CREATE_CLUSTER: Symbol('private:Kafka:createCluster'),
  CLUSTER_RETRY: Symbol('private:Kafka:clusterRetry'),
  LOGGER: Symbol('private:Kafka:logger'),
  OFFSETS: Symbol('private:Kafka:offsets'),
}

const DEFAULT_METADATA_MAX_AGE = 300000
const warnOfDefaultPartitioner = once(logger => {
  if (process.env.KAFKAJS_NO_PARTITIONER_WARNING == null) {
    logger.warn(
      `KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option "createPartitioner: Partitioners.LegacyPartitioner". See the migration guide at ${websiteUrl(
        'docs/migration-guide-v2.0.0',
        'producer-new-default-partitioner'
      )} for details. Silence this warning by setting the environment variable "KAFKAJS_NO_PARTITIONER_WARNING=1"`
    )
  }
})

module.exports = class Client {
  /**
   * @param {Object} options
   * @param {Array<string>} options.brokers example: ['127.0.0.1:9092', '127.0.0.1:9094']
   * @param {Object} options.ssl
   * @param {Object} options.sasl
   * @param {string} options.clientId
   * @param {number} [options.connectionTimeout=1000] - in milliseconds
   * @param {number} options.authenticationTimeout - in milliseconds
   * @param {number} options.reauthenticationThreshold - in milliseconds
   * @param {number} [options.requestTimeout=30000] - in milliseconds
   * @param {boolean} [options.enforceRequestTimeout]
   * @param {import("../types").RetryOptions} [options.retry]
   * @param {import("../types").ISocketFactory} [options.socketFactory]
   */
  constructor({
    brokers,
    ssl,
    sasl,
    clientId,
    connectionTimeout = 1000,
    authenticationTimeout,
    reauthenticationThreshold,
    requestTimeout,
    enforceRequestTimeout = true,
    retry,
    socketFactory = defaultSocketFactory(),
    logLevel = INFO,
    logCreator = LoggerConsole,
  }) {
    this[PRIVATE.OFFSETS] = new Map()
    this[PRIVATE.LOGGER] = createLogger({ level: logLevel, logCreator })
    this[PRIVATE.CLUSTER_RETRY] = retry
    this[PRIVATE.CREATE_CLUSTER] = ({
      metadataMaxAge,
      allowAutoTopicCreation = true,
      maxInFlightRequests = null,
      instrumentationEmitter = null,
      isolationLevel,
    }) =>
      new Cluster({
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
        isolationLevel,
      })
  }

  /**
   * @public
   */
  producer({
    createPartitioner,
    retry,
    metadataMaxAge = DEFAULT_METADATA_MAX_AGE,
    allowAutoTopicCreation,
    idempotent,
    transactionalId,
    transactionTimeout,
    maxInFlightRequests,
  } = {}) {
    const instrumentationEmitter = new InstrumentationEventEmitter()
    const cluster = this[PRIVATE.CREATE_CLUSTER]({
      metadataMaxAge,
      allowAutoTopicCreation,
      maxInFlightRequests,
      instrumentationEmitter,
    })

    if (createPartitioner == null) {
      warnOfDefaultPartitioner(this[PRIVATE.LOGGER])
    }

    return createProducer({
      retry: { ...this[PRIVATE.CLUSTER_RETRY], ...retry },
      logger: this[PRIVATE.LOGGER],
      cluster,
      createPartitioner,
      idempotent,
      transactionalId,
      transactionTimeout,
      instrumentationEmitter,
    })
  }

  /**
   * @public
   */
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
    rackId = '',
  } = {}) {
    const isolationLevel = readUncommitted
      ? ISOLATION_LEVEL.READ_UNCOMMITTED
      : ISOLATION_LEVEL.READ_COMMITTED

    const instrumentationEmitter = new InstrumentationEventEmitter()
    const cluster = this[PRIVATE.CREATE_CLUSTER]({
      metadataMaxAge,
      allowAutoTopicCreation,
      maxInFlightRequests,
      isolationLevel,
      instrumentationEmitter,
    })

    return createConsumer({
      retry: { ...this[PRIVATE.CLUSTER_RETRY], ...retry },
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
      metadataMaxAge,
    })
  }

  /**
   * @public
   */
  admin({ retry } = {}) {
    const instrumentationEmitter = new InstrumentationEventEmitter()
    const cluster = this[PRIVATE.CREATE_CLUSTER]({
      allowAutoTopicCreation: false,
      instrumentationEmitter,
    })

    return createAdmin({
      retry: { ...this[PRIVATE.CLUSTER_RETRY], ...retry },
      logger: this[PRIVATE.LOGGER],
      instrumentationEmitter,
      cluster,
    })
  }

  /**
   * @public
   */
  logger() {
    return this[PRIVATE.LOGGER]
  }
}


/***/ }),

/***/ 4491:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { EventEmitter } = __nccwpck_require__(2361)
const InstrumentationEvent = __nccwpck_require__(639)
const { KafkaJSError } = __nccwpck_require__(5073)

module.exports = class InstrumentationEventEmitter {
  constructor() {
    this.emitter = new EventEmitter()
  }

  /**
   * @param {string} eventName
   * @param {Object} payload
   */
  emit(eventName, payload) {
    if (!eventName) {
      throw new KafkaJSError('Invalid event name', { retriable: false })
    }

    if (this.emitter.listenerCount(eventName) > 0) {
      const event = new InstrumentationEvent(eventName, payload)
      this.emitter.emit(eventName, event)
    }
  }

  /**
   * @param {string} eventName
   * @param {(...args: any[]) => void} listener
   * @returns {import("../../types").RemoveInstrumentationEventListener<string>} removeListener
   */
  addListener(eventName, listener) {
    this.emitter.addListener(eventName, listener)
    return () => this.emitter.removeListener(eventName, listener)
  }
}


/***/ }),

/***/ 639:
/***/ ((module) => {

let id = 0
const nextId = () => {
  if (id === Number.MAX_VALUE) {
    id = 0
  }

  return id++
}

class InstrumentationEvent {
  /**
   * @param {String} type
   * @param {Object} payload
   */
  constructor(type, payload) {
    this.id = nextId()
    this.type = type
    this.timestamp = Date.now()
    this.payload = payload
  }
}

module.exports = InstrumentationEvent


/***/ }),

/***/ 5352:
/***/ ((module) => {

/** @type {<T1 extends string>(namespace: T1) => <T2 extends string>(type: T2) => `${T1}.${T2}`} */
module.exports = namespace => type => `${namespace}.${type}`


/***/ }),

/***/ 9523:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { LEVELS: logLevel } = __nccwpck_require__(1203)

module.exports = () => ({ namespace, level, label, log }) => {
  const prefix = namespace ? `[${namespace}] ` : ''
  const message = JSON.stringify(
    Object.assign({ level: label }, log, {
      message: `${prefix}${log.message}`,
    })
  )

  switch (level) {
    case logLevel.INFO:
      return console.info(message)
    case logLevel.ERROR:
      return console.error(message)
    case logLevel.WARN:
      return console.warn(message)
    case logLevel.DEBUG:
      return console.log(message)
  }
}


/***/ }),

/***/ 1203:
/***/ ((module) => {

const { assign } = Object

const LEVELS = {
  NOTHING: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 4,
  DEBUG: 5,
}

const createLevel = (label, level, currentLevel, namespace, logFunction) => (
  message,
  extra = {}
) => {
  if (level > currentLevel()) return
  logFunction({
    namespace,
    level,
    label,
    log: assign(
      {
        timestamp: new Date().toISOString(),
        logger: 'kafkajs',
        message,
      },
      extra
    ),
  })
}

const evaluateLogLevel = logLevel => {
  const envLogLevel = (process.env.KAFKAJS_LOG_LEVEL || '').toUpperCase()
  return LEVELS[envLogLevel] == null ? logLevel : LEVELS[envLogLevel]
}

const createLogger = ({ level = LEVELS.INFO, logCreator } = {}) => {
  let logLevel = evaluateLogLevel(level)
  const logFunction = logCreator(logLevel)

  const createNamespace = (namespace, logLevel = null) => {
    const namespaceLogLevel = evaluateLogLevel(logLevel)
    return createLogFunctions(namespace, namespaceLogLevel)
  }

  const createLogFunctions = (namespace, namespaceLogLevel = null) => {
    const currentLogLevel = () => (namespaceLogLevel == null ? logLevel : namespaceLogLevel)
    const logger = {
      info: createLevel('INFO', LEVELS.INFO, currentLogLevel, namespace, logFunction),
      error: createLevel('ERROR', LEVELS.ERROR, currentLogLevel, namespace, logFunction),
      warn: createLevel('WARN', LEVELS.WARN, currentLogLevel, namespace, logFunction),
      debug: createLevel('DEBUG', LEVELS.DEBUG, currentLogLevel, namespace, logFunction),
    }

    return assign(logger, {
      namespace: createNamespace,
      setLogLevel: newLevel => {
        logLevel = newLevel
      },
    })
  }

  return createLogFunctions()
}

module.exports = {
  LEVELS,
  createLogger,
}


/***/ }),

/***/ 9276:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const createSocket = __nccwpck_require__(4463)
const createRequest = __nccwpck_require__(9964)
const Decoder = __nccwpck_require__(9991)
const { KafkaJSConnectionError, KafkaJSConnectionClosedError } = __nccwpck_require__(5073)
const { INT_32_MAX_VALUE } = __nccwpck_require__(7368)
const getEnv = __nccwpck_require__(140)
const RequestQueue = __nccwpck_require__(2270)
const { CONNECTION_STATUS, CONNECTED_STATUS } = __nccwpck_require__(2632)
const sharedPromiseTo = __nccwpck_require__(7326)
const Long = __nccwpck_require__(3368)
const SASLAuthenticator = __nccwpck_require__(866)
const apiKeys = __nccwpck_require__(686)

const requestInfo = ({ apiName, apiKey, apiVersion }) =>
  `${apiName}(key: ${apiKey}, version: ${apiVersion})`

/**
 * @param request - request from protocol
 * @returns {boolean}
 */
const isAuthenticatedRequest = request => {
  return ![apiKeys.ApiVersions, apiKeys.SaslHandshake, apiKeys.SaslAuthenticate].includes(
    request.apiKey
  )
}

const PRIVATE = {
  SHOULD_REAUTHENTICATE: Symbol('private:Connection:shouldReauthenticate'),
  AUTHENTICATE: Symbol('private:Connection:authenticate'),
}

module.exports = class Connection {
  /**
   * @param {Object} options
   * @param {string} options.host
   * @param {number} options.port
   * @param {import("../../types").Logger} options.logger
   * @param {import("../../types").ISocketFactory} options.socketFactory
   * @param {string} [options.clientId='kafkajs']
   * @param {number} options.requestTimeout The maximum amount of time the client will wait for the response of a request,
   *                                in milliseconds
   * @param {string} [options.rack=null]
   * @param {Object} [options.ssl=null] Options for the TLS Secure Context. It accepts all options,
   *                            usually "cert", "key" and "ca". More information at
   *                            https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
   * @param {Object} [options.sasl=null] Attributes used for SASL authentication. Options based on the
   *                             key "mechanism". Connection is not actively using the SASL attributes
   *                             but acting as a data object for this information
   * @param {number} [options.reauthenticationThreshold=10000]
   * @param {number} options.connectionTimeout The connection timeout, in milliseconds
   * @param {boolean} [options.enforceRequestTimeout]
   * @param {number} [options.maxInFlightRequests=null] The maximum number of unacknowledged requests on a connection before
   *                                            enqueuing
   * @param {import("../instrumentation/emitter")} [options.instrumentationEmitter=null]
   */
  constructor({
    host,
    port,
    logger,
    socketFactory,
    requestTimeout,
    reauthenticationThreshold = 10000,
    rack = null,
    ssl = null,
    sasl = null,
    clientId = 'kafkajs',
    connectionTimeout,
    enforceRequestTimeout = true,
    maxInFlightRequests = null,
    instrumentationEmitter = null,
  }) {
    this.host = host
    this.port = port
    this.rack = rack
    this.clientId = clientId
    this.broker = `${this.host}:${this.port}`
    this.logger = logger.namespace('Connection')

    this.socketFactory = socketFactory
    this.ssl = ssl
    this.sasl = sasl

    this.requestTimeout = requestTimeout
    this.connectionTimeout = connectionTimeout
    this.reauthenticationThreshold = reauthenticationThreshold

    this.bytesBuffered = 0
    this.bytesNeeded = Decoder.int32Size()
    this.chunks = []

    this.connectionStatus = CONNECTION_STATUS.DISCONNECTED
    this.correlationId = 0
    this.requestQueue = new RequestQueue({
      instrumentationEmitter,
      maxInFlightRequests,
      requestTimeout,
      enforceRequestTimeout,
      clientId,
      broker: this.broker,
      logger: logger.namespace('RequestQueue'),
      isConnected: () => this.isConnected(),
    })

    this.versions = null

    this.authHandlers = null
    this.authExpectResponse = false

    const log = level => (message, extra = {}) => {
      const logFn = this.logger[level]
      logFn(message, { broker: this.broker, clientId, ...extra })
    }

    this.logDebug = log('debug')
    this.logError = log('error')

    const env = getEnv()
    this.shouldLogBuffers = env.KAFKAJS_DEBUG_PROTOCOL_BUFFERS === '1'
    this.shouldLogFetchBuffer =
      this.shouldLogBuffers && env.KAFKAJS_DEBUG_EXTENDED_PROTOCOL_BUFFERS === '1'

    this.authenticatedAt = null
    this.sessionLifetime = Long.ZERO
    this.supportAuthenticationProtocol = null

    /**
     * @private
     * @returns {Promise}
     */
    this[PRIVATE.AUTHENTICATE] = sharedPromiseTo(async () => {
      if (this.sasl && !this.isAuthenticated()) {
        const authenticator = new SASLAuthenticator(
          this,
          this.logger,
          this.versions,
          this.supportAuthenticationProtocol
        )

        await authenticator.authenticate()
        this.authenticatedAt = process.hrtime()
        this.sessionLifetime = Long.fromValue(authenticator.sessionLifetime)
      }
    })
  }

  getSupportAuthenticationProtocol() {
    return this.supportAuthenticationProtocol
  }

  setSupportAuthenticationProtocol(isSupported) {
    this.supportAuthenticationProtocol = isSupported
  }

  setVersions(versions) {
    this.versions = versions
  }

  isConnected() {
    return CONNECTED_STATUS.includes(this.connectionStatus)
  }

  /**
   * @public
   * @returns {Promise}
   */
  connect() {
    return new Promise((resolve, reject) => {
      if (this.isConnected()) {
        return resolve(true)
      }

      this.authenticatedAt = null

      let timeoutId

      const onConnect = () => {
        clearTimeout(timeoutId)
        this.connectionStatus = CONNECTION_STATUS.CONNECTED
        this.requestQueue.scheduleRequestTimeoutCheck()
        resolve(true)
      }

      const onData = data => {
        this.processData(data)
      }

      const onEnd = async () => {
        clearTimeout(timeoutId)

        const wasConnected = this.isConnected()

        if (this.authHandlers) {
          this.authHandlers.onError()
        } else if (wasConnected) {
          this.logDebug('Kafka server has closed connection')
          this.rejectRequests(
            new KafkaJSConnectionClosedError('Closed connection', {
              host: this.host,
              port: this.port,
            })
          )
        }

        await this.disconnect()
      }

      const onError = async e => {
        clearTimeout(timeoutId)

        const error = new KafkaJSConnectionError(`Connection error: ${e.message}`, {
          broker: `${this.host}:${this.port}`,
          code: e.code,
        })

        this.logError(error.message, { stack: e.stack })
        this.rejectRequests(error)
        await this.disconnect()

        reject(error)
      }

      const onTimeout = async () => {
        const error = new KafkaJSConnectionError('Connection timeout', {
          broker: `${this.host}:${this.port}`,
        })

        this.logError(error.message)
        this.rejectRequests(error)
        await this.disconnect()
        reject(error)
      }

      this.logDebug(`Connecting`, {
        ssl: !!this.ssl,
        sasl: !!this.sasl,
      })

      try {
        timeoutId = setTimeout(onTimeout, this.connectionTimeout)
        this.socket = createSocket({
          socketFactory: this.socketFactory,
          host: this.host,
          port: this.port,
          ssl: this.ssl,
          onConnect,
          onData,
          onEnd,
          onError,
          onTimeout,
        })
      } catch (e) {
        clearTimeout(timeoutId)
        reject(
          new KafkaJSConnectionError(`Failed to connect: ${e.message}`, {
            broker: `${this.host}:${this.port}`,
          })
        )
      }
    })
  }

  /**
   * @public
   * @returns {Promise}
   */
  async disconnect() {
    this.authenticatedAt = null
    this.connectionStatus = CONNECTION_STATUS.DISCONNECTING
    this.logDebug('disconnecting...')

    await this.requestQueue.waitForPendingRequests()
    this.requestQueue.destroy()

    if (this.socket) {
      this.socket.end()
      this.socket.unref()
    }

    this.connectionStatus = CONNECTION_STATUS.DISCONNECTED
    this.logDebug('disconnected')
    return true
  }

  /**
   * @public
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.authenticatedAt != null && !this[PRIVATE.SHOULD_REAUTHENTICATE]()
  }

  /***
   * @private
   */
  [PRIVATE.SHOULD_REAUTHENTICATE]() {
    if (this.sessionLifetime.equals(Long.ZERO)) {
      return false
    }

    if (this.authenticatedAt == null) {
      return true
    }

    const [secondsSince, remainingNanosSince] = process.hrtime(this.authenticatedAt)
    const millisSince = Long.fromValue(secondsSince)
      .multiply(1000)
      .add(Long.fromValue(remainingNanosSince).divide(1000000))

    const reauthenticateAt = millisSince.add(this.reauthenticationThreshold)
    return reauthenticateAt.greaterThanOrEqual(this.sessionLifetime)
  }

  /** @public */
  async authenticate() {
    await this[PRIVATE.AUTHENTICATE]()
  }

  /**
   * @public
   * @returns {Promise}
   */
  sendAuthRequest({ authExpectResponse = false, request, response }) {
    this.authExpectResponse = authExpectResponse

    /**
     * TODO: rewrite removing the async promise executor
     */

    /* eslint-disable no-async-promise-executor */
    return new Promise(async (resolve, reject) => {
      this.authHandlers = {
        onSuccess: rawData => {
          this.authHandlers = null
          this.authExpectResponse = false

          response
            .decode(rawData)
            .then(data => response.parse(data))
            .then(resolve)
            .catch(reject)
        },
        onError: () => {
          this.authHandlers = null
          this.authExpectResponse = false

          reject(
            new KafkaJSConnectionError('Connection closed by the server', {
              broker: `${this.host}:${this.port}`,
            })
          )
        },
      }

      try {
        const requestPayload = await request.encode()

        this.failIfNotConnected()
        this.socket.write(requestPayload.buffer, 'binary')
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * @public
   * @param {object} protocol
   * @param {object} protocol.request It is defined by the protocol and consists of an object with "apiKey",
   *                         "apiVersion", "apiName" and an "encode" function. The encode function
   *                         must return an instance of Encoder
   *
   * @param {object} protocol.response It is defined by the protocol and consists of an object with two functions:
   *                          "decode" and "parse"
   *
   * @param {number} [protocol.requestTimeout=null] Override for the default requestTimeout
   * @param {boolean} [protocol.logResponseError=true] Whether to log errors
   * @returns {Promise<data>} where data is the return of "response#parse"
   */
  async send({ request, response, requestTimeout = null, logResponseError = true }) {
    if (!this.isAuthenticated() && isAuthenticatedRequest(request)) {
      await this[PRIVATE.AUTHENTICATE]()
    }

    this.failIfNotConnected()

    const expectResponse = !request.expectResponse || request.expectResponse()
    const sendRequest = async () => {
      const { clientId } = this
      const correlationId = this.nextCorrelationId()

      const requestPayload = await createRequest({ request, correlationId, clientId })
      const { apiKey, apiName, apiVersion } = request
      this.logDebug(`Request ${requestInfo(request)}`, {
        correlationId,
        expectResponse,
        size: Buffer.byteLength(requestPayload.buffer),
      })

      return new Promise((resolve, reject) => {
        try {
          this.failIfNotConnected()
          const entry = { apiKey, apiName, apiVersion, correlationId, resolve, reject }

          this.requestQueue.push({
            entry,
            expectResponse,
            requestTimeout,
            sendRequest: () => {
              this.socket.write(requestPayload.buffer, 'binary')
            },
          })
        } catch (e) {
          reject(e)
        }
      })
    }

    const { correlationId, size, entry, payload } = await sendRequest()

    if (!expectResponse) {
      return
    }

    try {
      const payloadDecoded = await response.decode(payload)

      /**
       * @see KIP-219
       * If the response indicates that the client-side needs to throttle, do that.
       */
      this.requestQueue.maybeThrottle(payloadDecoded.clientSideThrottleTime)

      const data = await response.parse(payloadDecoded)
      const isFetchApi = entry.apiName === 'Fetch'
      this.logDebug(`Response ${requestInfo(entry)}`, {
        correlationId,
        size,
        data: isFetchApi && !this.shouldLogFetchBuffer ? '[filtered]' : data,
      })

      return data
    } catch (e) {
      if (logResponseError) {
        this.logError(`Response ${requestInfo(entry)}`, {
          error: e.message,
          correlationId,
          size,
        })
      }

      const isBuffer = Buffer.isBuffer(payload)
      this.logDebug(`Response ${requestInfo(entry)}`, {
        error: e.message,
        correlationId,
        payload:
          isBuffer && !this.shouldLogBuffers ? { type: 'Buffer', data: '[filtered]' } : payload,
      })

      throw e
    }
  }

  /**
   * @private
   */
  failIfNotConnected() {
    if (!this.isConnected()) {
      throw new KafkaJSConnectionError('Not connected', {
        broker: `${this.host}:${this.port}`,
      })
    }
  }

  /**
   * @private
   */
  nextCorrelationId() {
    if (this.correlationId >= INT_32_MAX_VALUE) {
      this.correlationId = 0
    }

    return this.correlationId++
  }

  /**
   * @private
   */
  processData(rawData) {
    if (this.authHandlers && !this.authExpectResponse) {
      return this.authHandlers.onSuccess(rawData)
    }

    // Accumulate the new chunk
    this.chunks.push(rawData)
    this.bytesBuffered += Buffer.byteLength(rawData)

    // Process data if there are enough bytes to read the expected response size,
    // otherwise keep buffering
    while (this.bytesNeeded <= this.bytesBuffered) {
      const buffer = this.chunks.length > 1 ? Buffer.concat(this.chunks) : this.chunks[0]
      const decoder = new Decoder(buffer)
      const expectedResponseSize = decoder.readInt32()

      // Return early if not enough bytes to read the full response
      if (!decoder.canReadBytes(expectedResponseSize)) {
        this.chunks = [buffer]
        this.bytesBuffered = Buffer.byteLength(buffer)
        this.bytesNeeded = Decoder.int32Size() + expectedResponseSize
        return
      }

      const response = new Decoder(decoder.readBytes(expectedResponseSize))

      // Reset the buffered chunks as the rest of the bytes
      const remainderBuffer = decoder.readAll()
      this.chunks = [remainderBuffer]
      this.bytesBuffered = Buffer.byteLength(remainderBuffer)
      this.bytesNeeded = Decoder.int32Size()

      if (this.authHandlers) {
        const rawResponseSize = Decoder.int32Size() + expectedResponseSize
        const rawResponseBuffer = buffer.slice(0, rawResponseSize)
        return this.authHandlers.onSuccess(rawResponseBuffer)
      }

      const correlationId = response.readInt32()
      const payload = response.readAll()

      this.requestQueue.fulfillRequest({
        size: expectedResponseSize,
        correlationId,
        payload,
      })
    }
  }

  /**
   * @private
   */
  rejectRequests(error) {
    this.requestQueue.rejectAll(error)
  }
}


/***/ }),

/***/ 1888:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const apiKeys = __nccwpck_require__(686)
const Connection = __nccwpck_require__(9276)

module.exports = class ConnectionPool {
  /**
   * @param {ConstructorParameters<typeof Connection>[0]} options
   */
  constructor(options) {
    this.logger = options.logger.namespace('ConnectionPool')
    this.connectionTimeout = options.connectionTimeout
    this.host = options.host
    this.port = options.port
    this.rack = options.rack
    this.ssl = options.ssl
    this.sasl = options.sasl
    this.clientId = options.clientId
    this.socketFactory = options.socketFactory

    this.pool = new Array(2).fill().map(() => new Connection(options))
  }

  isConnected() {
    return this.pool.some(c => c.isConnected())
  }

  isAuthenticated() {
    return this.pool.some(c => c.isAuthenticated())
  }

  setSupportAuthenticationProtocol(isSupported) {
    this.map(c => c.setSupportAuthenticationProtocol(isSupported))
  }

  setVersions(versions) {
    this.map(c => c.setVersions(versions))
  }

  map(callback) {
    return this.pool.map(c => callback(c))
  }

  async send(protocolRequest) {
    const connection = await this.getConnectionByRequest(protocolRequest)
    return connection.send(protocolRequest)
  }

  getConnectionByRequest({ request: { apiKey } }) {
    const index = { [apiKeys.Fetch]: 1 }[apiKey] || 0
    return this.getConnection(index)
  }

  async getConnection(index = 0) {
    const connection = this.pool[index]

    if (!connection.isConnected()) {
      await connection.connect()
    }

    return connection
  }

  async destroy() {
    await Promise.all(this.map(c => c.disconnect()))
  }
}


/***/ }),

/***/ 2632:
/***/ ((module) => {

const CONNECTION_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTING: 'disconnecting',
  DISCONNECTED: 'disconnected',
}

const CONNECTED_STATUS = [CONNECTION_STATUS.CONNECTED, CONNECTION_STATUS.DISCONNECTING]

module.exports = {
  CONNECTION_STATUS,
  CONNECTED_STATUS,
}


/***/ }),

/***/ 6304:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const InstrumentationEventType = __nccwpck_require__(5352)
const eventType = InstrumentationEventType('network')

module.exports = {
  NETWORK_REQUEST: eventType('request'),
  NETWORK_REQUEST_TIMEOUT: eventType('request_timeout'),
  NETWORK_REQUEST_QUEUE_SIZE: eventType('request_queue_size'),
}


/***/ }),

/***/ 2270:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { EventEmitter } = __nccwpck_require__(2361)
const SocketRequest = __nccwpck_require__(7104)
const events = __nccwpck_require__(6304)
const { KafkaJSInvariantViolation } = __nccwpck_require__(5073)

const PRIVATE = {
  EMIT_QUEUE_SIZE_EVENT: Symbol('private:RequestQueue:emitQueueSizeEvent'),
  EMIT_REQUEST_QUEUE_EMPTY: Symbol('private:RequestQueue:emitQueueEmpty'),
}

const REQUEST_QUEUE_EMPTY = 'requestQueueEmpty'

module.exports = class RequestQueue extends EventEmitter {
  /**
   * @param {Object} options
   * @param {number} options.maxInFlightRequests
   * @param {number} options.requestTimeout
   * @param {boolean} options.enforceRequestTimeout
   * @param {string} options.clientId
   * @param {string} options.broker
   * @param {import("../../../types").Logger} options.logger
   * @param {import("../../instrumentation/emitter")} [options.instrumentationEmitter=null]
   * @param {() => boolean} [options.isConnected]
   */
  constructor({
    instrumentationEmitter = null,
    maxInFlightRequests,
    requestTimeout,
    enforceRequestTimeout,
    clientId,
    broker,
    logger,
    isConnected = () => true,
  }) {
    super()
    this.instrumentationEmitter = instrumentationEmitter
    this.maxInFlightRequests = maxInFlightRequests
    this.requestTimeout = requestTimeout
    this.enforceRequestTimeout = enforceRequestTimeout
    this.clientId = clientId
    this.broker = broker
    this.logger = logger
    this.isConnected = isConnected

    this.inflight = new Map()
    this.pending = []

    /**
     * Until when this request queue is throttled and shouldn't send requests
     *
     * The value represents the timestamp of the end of the throttling in ms-since-epoch. If the value
     * is smaller than the current timestamp no throttling is active.
     *
     * @type {number}
     */
    this.throttledUntil = -1

    /**
     * Timeout id if we have scheduled a check for pending requests due to client-side throttling
     *
     * @type {null|NodeJS.Timeout}
     */
    this.throttleCheckTimeoutId = null

    this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY] = () => {
      if (this.pending.length === 0 && this.inflight.size === 0) {
        this.emit(REQUEST_QUEUE_EMPTY)
      }
    }

    this[PRIVATE.EMIT_QUEUE_SIZE_EVENT] = () => {
      instrumentationEmitter &&
        instrumentationEmitter.emit(events.NETWORK_REQUEST_QUEUE_SIZE, {
          broker: this.broker,
          clientId: this.clientId,
          queueSize: this.pending.length,
        })

      this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY]()
    }
  }

  /**
   * @public
   */
  scheduleRequestTimeoutCheck() {
    if (this.enforceRequestTimeout) {
      this.destroy()

      this.requestTimeoutIntervalId = setInterval(() => {
        this.inflight.forEach(request => {
          if (Date.now() - request.sentAt > request.requestTimeout) {
            request.timeoutRequest()
          }
        })

        if (!this.isConnected()) {
          this.destroy()
        }
      }, Math.min(this.requestTimeout, 100))
    }
  }

  maybeThrottle(clientSideThrottleTime) {
    if (clientSideThrottleTime) {
      const minimumThrottledUntil = Date.now() + clientSideThrottleTime
      this.throttledUntil = Math.max(minimumThrottledUntil, this.throttledUntil)
    }
  }

  /**
   * @typedef {Object} PushedRequest
   * @property {import("./socketRequest").RequestEntry} entry
   * @property {boolean} expectResponse
   * @property {Function} sendRequest
   * @property {number} [requestTimeout]
   *
   * @public
   * @param {PushedRequest} pushedRequest
   */
  push(pushedRequest) {
    const { correlationId } = pushedRequest.entry
    const defaultRequestTimeout = this.requestTimeout
    const customRequestTimeout = pushedRequest.requestTimeout

    // Some protocol requests have custom request timeouts (e.g JoinGroup, Fetch, etc). The custom
    // timeouts are influenced by user configurations, which can be lower than the default requestTimeout
    const requestTimeout = Math.max(defaultRequestTimeout, customRequestTimeout || 0)

    const socketRequest = new SocketRequest({
      entry: pushedRequest.entry,
      expectResponse: pushedRequest.expectResponse,
      broker: this.broker,
      clientId: this.clientId,
      instrumentationEmitter: this.instrumentationEmitter,
      requestTimeout,
      send: () => {
        if (this.inflight.has(correlationId)) {
          throw new KafkaJSInvariantViolation('Correlation id already exists')
        }
        this.inflight.set(correlationId, socketRequest)
        pushedRequest.sendRequest()
      },
      timeout: () => {
        this.inflight.delete(correlationId)
        this.checkPendingRequests()
        // Try to emit REQUEST_QUEUE_EMPTY. Otherwise, waitForPendingRequests may stuck forever
        this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY]()
      },
    })

    if (this.canSendSocketRequestImmediately()) {
      this.sendSocketRequest(socketRequest)
      return
    }

    this.pending.push(socketRequest)
    this.scheduleCheckPendingRequests()

    this.logger.debug(`Request enqueued`, {
      clientId: this.clientId,
      broker: this.broker,
      correlationId,
    })

    this[PRIVATE.EMIT_QUEUE_SIZE_EVENT]()
  }

  /**
   * @param {SocketRequest} socketRequest
   */
  sendSocketRequest(socketRequest) {
    socketRequest.send()

    if (!socketRequest.expectResponse) {
      this.logger.debug(`Request does not expect a response, resolving immediately`, {
        clientId: this.clientId,
        broker: this.broker,
        correlationId: socketRequest.correlationId,
      })

      this.inflight.delete(socketRequest.correlationId)
      socketRequest.completed({ size: 0, payload: null })
    }
  }

  /**
   * @public
   * @param {object} response
   * @param {number} response.correlationId
   * @param {Buffer} response.payload
   * @param {number} response.size
   */
  fulfillRequest({ correlationId, payload, size }) {
    const socketRequest = this.inflight.get(correlationId)
    this.inflight.delete(correlationId)
    this.checkPendingRequests()

    if (socketRequest) {
      socketRequest.completed({ size, payload })
    } else {
      this.logger.warn(`Response without match`, {
        clientId: this.clientId,
        broker: this.broker,
        correlationId,
      })
    }

    this[PRIVATE.EMIT_REQUEST_QUEUE_EMPTY]()
  }

  /**
   * @public
   * @param {Error} error
   */
  rejectAll(error) {
    const requests = [...this.inflight.values(), ...this.pending]

    for (const socketRequest of requests) {
      socketRequest.rejected(error)
      this.inflight.delete(socketRequest.correlationId)
    }

    this.pending = []
    this.inflight.clear()
    this[PRIVATE.EMIT_QUEUE_SIZE_EVENT]()
  }

  /**
   * @public
   */
  waitForPendingRequests() {
    return new Promise(resolve => {
      if (this.pending.length === 0 && this.inflight.size === 0) {
        return resolve()
      }

      this.logger.debug('Waiting for pending requests', {
        clientId: this.clientId,
        broker: this.broker,
        currentInflightRequests: this.inflight.size,
        currentPendingQueueSize: this.pending.length,
      })

      this.once(REQUEST_QUEUE_EMPTY, () => resolve())
    })
  }

  /**
   * @public
   */
  destroy() {
    clearInterval(this.requestTimeoutIntervalId)
    clearTimeout(this.throttleCheckTimeoutId)
    this.throttleCheckTimeoutId = null
  }

  canSendSocketRequestImmediately() {
    const shouldEnqueue =
      (this.maxInFlightRequests != null && this.inflight.size >= this.maxInFlightRequests) ||
      this.throttledUntil > Date.now()

    return !shouldEnqueue
  }

  /**
   * Check and process pending requests either now or in the future
   *
   * This function will send out as many pending requests as possible taking throttling and
   * in-flight limits into account.
   */
  checkPendingRequests() {
    while (this.pending.length > 0 && this.canSendSocketRequestImmediately()) {
      const pendingRequest = this.pending.shift() // first in first out
      this.sendSocketRequest(pendingRequest)

      this.logger.debug(`Consumed pending request`, {
        clientId: this.clientId,
        broker: this.broker,
        correlationId: pendingRequest.correlationId,
        pendingDuration: pendingRequest.pendingDuration,
        currentPendingQueueSize: this.pending.length,
      })

      this[PRIVATE.EMIT_QUEUE_SIZE_EVENT]()
    }

    this.scheduleCheckPendingRequests()
  }

  /**
   * Ensure that pending requests will be checked in the future
   *
   * If there is a client-side throttling in place this will ensure that we will check
   * the pending request queue eventually.
   */
  scheduleCheckPendingRequests() {
    // If we're throttled: Schedule checkPendingRequests when the throttle
    // should be resolved. If there is already something scheduled we assume that that
    // will be fine, and potentially fix up a new timeout if needed at that time.
    // Note that if we're merely "overloaded" by having too many inflight requests
    // we will anyways check the queue when one of them gets fulfilled.
    const timeUntilUnthrottled = this.throttledUntil - Date.now()
    if (timeUntilUnthrottled > 0 && !this.throttleCheckTimeoutId) {
      this.throttleCheckTimeoutId = setTimeout(() => {
        this.throttleCheckTimeoutId = null
        this.checkPendingRequests()
      }, timeUntilUnthrottled)
    }
  }
}


/***/ }),

/***/ 7104:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { KafkaJSRequestTimeoutError, KafkaJSNonRetriableError } = __nccwpck_require__(5073)
const events = __nccwpck_require__(6304)

const PRIVATE = {
  STATE: Symbol('private:SocketRequest:state'),
  EMIT_EVENT: Symbol('private:SocketRequest:emitEvent'),
}

const REQUEST_STATE = {
  PENDING: Symbol('PENDING'),
  SENT: Symbol('SENT'),
  COMPLETED: Symbol('COMPLETED'),
  REJECTED: Symbol('REJECTED'),
}

/**
 * SocketRequest abstracts the life cycle of a socket request, making it easier to track
 * request durations and to have individual timeouts per request.
 *
 * @typedef {Object} SocketRequest
 * @property {number} createdAt
 * @property {number} sentAt
 * @property {number} pendingDuration
 * @property {number} duration
 * @property {number} requestTimeout
 * @property {string} broker
 * @property {string} clientId
 * @property {RequestEntry} entry
 * @property {boolean} expectResponse
 * @property {Function} send
 * @property {Function} timeout
 *
 * @typedef {Object} RequestEntry
 * @property {string} apiKey
 * @property {string} apiName
 * @property {number} apiVersion
 * @property {number} correlationId
 * @property {Function} resolve
 * @property {Function} reject
 */
module.exports = class SocketRequest {
  /**
   * @param {Object} options
   * @param {number} options.requestTimeout
   * @param {string} options.broker - e.g: 127.0.0.1:9092
   * @param {string} options.clientId
   * @param {RequestEntry} options.entry
   * @param {boolean} options.expectResponse
   * @param {Function} options.send
   * @param {() => void} options.timeout
   * @param {import("../../instrumentation/emitter")} [options.instrumentationEmitter=null]
   */
  constructor({
    requestTimeout,
    broker,
    clientId,
    entry,
    expectResponse,
    send,
    timeout,
    instrumentationEmitter = null,
  }) {
    this.createdAt = Date.now()
    this.requestTimeout = requestTimeout
    this.broker = broker
    this.clientId = clientId
    this.entry = entry
    this.correlationId = entry.correlationId
    this.expectResponse = expectResponse
    this.sendRequest = send
    this.timeoutHandler = timeout

    this.sentAt = null
    this.duration = null
    this.pendingDuration = null

    this[PRIVATE.STATE] = REQUEST_STATE.PENDING
    this[PRIVATE.EMIT_EVENT] = (eventName, payload) =>
      instrumentationEmitter && instrumentationEmitter.emit(eventName, payload)
  }

  send() {
    this.throwIfInvalidState({
      accepted: [REQUEST_STATE.PENDING],
      next: REQUEST_STATE.SENT,
    })

    this.sendRequest()
    this.sentAt = Date.now()
    this.pendingDuration = this.sentAt - this.createdAt
    this[PRIVATE.STATE] = REQUEST_STATE.SENT
  }

  timeoutRequest() {
    const { apiName, apiKey, apiVersion } = this.entry
    const requestInfo = `${apiName}(key: ${apiKey}, version: ${apiVersion})`
    const eventData = {
      broker: this.broker,
      clientId: this.clientId,
      correlationId: this.correlationId,
      createdAt: this.createdAt,
      sentAt: this.sentAt,
      pendingDuration: this.pendingDuration,
    }

    this.timeoutHandler()
    this.rejected(new KafkaJSRequestTimeoutError(`Request ${requestInfo} timed out`, eventData))
    this[PRIVATE.EMIT_EVENT](events.NETWORK_REQUEST_TIMEOUT, {
      ...eventData,
      apiName,
      apiKey,
      apiVersion,
    })
  }

  completed({ size, payload }) {
    this.throwIfInvalidState({
      accepted: [REQUEST_STATE.SENT],
      next: REQUEST_STATE.COMPLETED,
    })

    const { entry, correlationId, broker, clientId, createdAt, sentAt, pendingDuration } = this

    this[PRIVATE.STATE] = REQUEST_STATE.COMPLETED
    this.duration = Date.now() - this.sentAt
    entry.resolve({ correlationId, entry, size, payload })

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
      apiVersion: entry.apiVersion,
    })
  }

  rejected(error) {
    this.throwIfInvalidState({
      accepted: [REQUEST_STATE.PENDING, REQUEST_STATE.SENT],
      next: REQUEST_STATE.REJECTED,
    })

    this[PRIVATE.STATE] = REQUEST_STATE.REJECTED
    this.duration = Date.now() - this.sentAt
    this.entry.reject(error)
  }

  /**
   * @private
   */
  throwIfInvalidState({ accepted, next }) {
    if (accepted.includes(this[PRIVATE.STATE])) {
      return
    }

    const current = this[PRIVATE.STATE].toString()

    throw new KafkaJSNonRetriableError(
      `Invalid state, can't transition from ${current} to ${next.toString()}`
    )
  }
}


/***/ }),

/***/ 4463:
/***/ ((module) => {

/**
 * @param {Object} options
 * @param {import("../../types").ISocketFactory} options.socketFactory
 * @param {string} options.host
 * @param {number} options.port
 * @param {Object} options.ssl
 * @param {() => void} options.onConnect
 * @param {(data: Buffer) => void} options.onData
 * @param {() => void} options.onEnd
 * @param {(err: Error) => void} options.onError
 * @param {() => void} options.onTimeout
 */
module.exports = ({
  socketFactory,
  host,
  port,
  ssl,
  onConnect,
  onData,
  onEnd,
  onError,
  onTimeout,
}) => {
  const socket = socketFactory({ host, port, ssl, onConnect })

  socket.on('data', onData)
  socket.on('end', onEnd)
  socket.on('error', onError)
  socket.on('timeout', onTimeout)

  return socket
}


/***/ }),

/***/ 2456:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const KEEP_ALIVE_DELAY = 60000 // in ms

/**
 * @returns {import("../../types").ISocketFactory}
 */
module.exports = () => {
  const net = __nccwpck_require__(1808)
  const tls = __nccwpck_require__(4404)

  return ({ host, port, ssl, onConnect }) => {
    const socket = ssl
      ? tls.connect(Object.assign({ host, port, servername: host }, ssl), onConnect)
      : net.connect({ host, port }, onConnect)

    socket.setKeepAlive(true, KEEP_ALIVE_DELAY)

    return socket
  }
}


/***/ }),

/***/ 92:
/***/ ((module) => {

module.exports = topicDataForBroker => {
  return topicDataForBroker.map(
    ({ topic, partitions, messagesPerPartition, sequencePerPartition }) => ({
      topic,
      partitions: partitions.map(partition => ({
        partition,
        messages: messagesPerPartition[partition],
      })),
    })
  )
}


/***/ }),

/***/ 6156:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const createRetry = __nccwpck_require__(1862)
const Lock = __nccwpck_require__(7146)
const { KafkaJSNonRetriableError } = __nccwpck_require__(5073)
const COORDINATOR_TYPES = __nccwpck_require__(466)
const createStateMachine = __nccwpck_require__(2663)
const { INT_32_MAX_VALUE } = __nccwpck_require__(7368)
const assert = __nccwpck_require__(9491)

const STATES = __nccwpck_require__(5704)
const NO_PRODUCER_ID = -1
const SEQUENCE_START = 0
const INIT_PRODUCER_RETRIABLE_PROTOCOL_ERRORS = [
  'NOT_COORDINATOR_FOR_GROUP',
  'GROUP_COORDINATOR_NOT_AVAILABLE',
  'GROUP_LOAD_IN_PROGRESS',
  /**
   * The producer might have crashed and never committed the transaction; retry the
   * request so Kafka can abort the current transaction
   * @see https://github.com/apache/kafka/blob/201da0542726472d954080d54bc585b111aaf86f/clients/src/main/java/org/apache/kafka/clients/producer/internals/TransactionManager.java#L1001-L1002
   */
  'CONCURRENT_TRANSACTIONS',
]
const COMMIT_RETRIABLE_PROTOCOL_ERRORS = [
  'UNKNOWN_TOPIC_OR_PARTITION',
  'COORDINATOR_LOAD_IN_PROGRESS',
]
const COMMIT_STALE_COORDINATOR_PROTOCOL_ERRORS = ['COORDINATOR_NOT_AVAILABLE', 'NOT_COORDINATOR']

/**
 * @typedef {Object} EosManager
 */

/**
 * Manage behavior for an idempotent producer and transactions.
 *
 * @returns {EosManager}
 */
module.exports = ({
  logger,
  cluster,
  transactionTimeout = 60000,
  transactional,
  transactionalId,
}) => {
  if (transactional && !transactionalId) {
    throw new KafkaJSNonRetriableError('Cannot manage transactions without a transactionalId')
  }

  const retrier = createRetry(cluster.retry)

  /**
   * Current producer ID
   */
  let producerId = NO_PRODUCER_ID

  /**
   * Current producer epoch
   */
  let producerEpoch = 0

  /**
   * Idempotent production requires that the producer track the sequence number of messages.
   *
   * Sequences are sent with every Record Batch and tracked per Topic-Partition
   */
  let producerSequence = {}

  /**
   * Idempotent production requires a mutex lock per broker to serialize requests with sequence number handling
   */
  let brokerMutexLocks = {}

  /**
   * Topic partitions already participating in the transaction
   */
  let transactionTopicPartitions = {}

  const stateMachine = createStateMachine({ logger })
  stateMachine.on('transition', ({ to }) => {
    if (to === STATES.READY) {
      transactionTopicPartitions = {}
    }
  })

  const findTransactionCoordinator = () => {
    return cluster.findGroupCoordinator({
      groupId: transactionalId,
      coordinatorType: COORDINATOR_TYPES.TRANSACTION,
    })
  }

  const transactionalGuard = () => {
    if (!transactional) {
      throw new KafkaJSNonRetriableError('Method unavailable if non-transactional')
    }
  }

  const eosManager = stateMachine.createGuarded(
    {
      /**
       * Get the current producer id
       * @returns {number}
       */
      getProducerId() {
        return producerId
      },

      /**
       * Get the current producer epoch
       * @returns {number}
       */
      getProducerEpoch() {
        return producerEpoch
      },

      getTransactionalId() {
        return transactionalId
      },

      /**
       * Initialize the idempotent producer by making an `InitProducerId` request.
       * Overwrites any existing state in this transaction manager
       */
      async initProducerId() {
        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await cluster.refreshMetadataIfNecessary()

            // If non-transactional we can request the PID from any broker
            const broker = await (transactional
              ? findTransactionCoordinator()
              : cluster.findControllerBroker())

            const result = await broker.initProducerId({
              transactionalId: transactional ? transactionalId : undefined,
              transactionTimeout,
            })

            stateMachine.transitionTo(STATES.READY)
            producerId = result.producerId
            producerEpoch = result.producerEpoch
            producerSequence = {}
            brokerMutexLocks = {}

            logger.debug('Initialized producer id & epoch', { producerId, producerEpoch })
          } catch (e) {
            if (INIT_PRODUCER_RETRIABLE_PROTOCOL_ERRORS.includes(e.type)) {
              if (e.type === 'CONCURRENT_TRANSACTIONS') {
                logger.debug('There is an ongoing transaction on this transactionId, retrying', {
                  error: e.message,
                  stack: e.stack,
                  transactionalId,
                  retryCount,
                  retryTime,
                })
              }

              throw e
            }

            bail(e)
          }
        })
      },

      /**
       * Get the current sequence for a given Topic-Partition. Defaults to 0.
       *
       * @param {string} topic
       * @param {string} partition
       * @returns {number}
       */
      getSequence(topic, partition) {
        if (!eosManager.isInitialized()) {
          return SEQUENCE_START
        }

        producerSequence[topic] = producerSequence[topic] || {}
        producerSequence[topic][partition] = producerSequence[topic][partition] || SEQUENCE_START

        return producerSequence[topic][partition]
      },

      /**
       * Update the sequence for a given Topic-Partition.
       *
       * Do nothing if not yet initialized (not idempotent)
       * @param {string} topic
       * @param {string} partition
       * @param {number} increment
       */
      updateSequence(topic, partition, increment) {
        if (!eosManager.isInitialized()) {
          return
        }

        const previous = eosManager.getSequence(topic, partition)
        let sequence = previous + increment

        // Sequence is defined as Int32 in the Record Batch,
        // so theoretically should need to rotate here
        if (sequence >= INT_32_MAX_VALUE) {
          logger.debug(
            `Sequence for ${topic} ${partition} exceeds max value (${sequence}). Rotating to 0.`
          )
          sequence = 0
        }

        producerSequence[topic][partition] = sequence
      },

      /**
       * Begin a transaction
       */
      beginTransaction() {
        transactionalGuard()
        stateMachine.transitionTo(STATES.TRANSACTING)
      },

      /**
       * Add partitions to a transaction if they are not already marked as participating.
       *
       * Should be called prior to sending any messages during a transaction
       * @param {TopicData[]} topicData
       *
       * @typedef {Object} TopicData
       * @property {string} topic
       * @property {object[]} partitions
       * @property {number} partitions[].partition
       */
      async addPartitionsToTransaction(topicData) {
        transactionalGuard()
        const newTopicPartitions = {}

        topicData.forEach(({ topic, partitions }) => {
          transactionTopicPartitions[topic] = transactionTopicPartitions[topic] || {}

          partitions.forEach(({ partition }) => {
            if (!transactionTopicPartitions[topic][partition]) {
              newTopicPartitions[topic] = newTopicPartitions[topic] || []
              newTopicPartitions[topic].push(partition)
            }
          })
        })

        const topics = Object.keys(newTopicPartitions).map(topic => ({
          topic,
          partitions: newTopicPartitions[topic],
        }))

        if (topics.length) {
          const broker = await findTransactionCoordinator()
          await broker.addPartitionsToTxn({ transactionalId, producerId, producerEpoch, topics })
        }

        topics.forEach(({ topic, partitions }) => {
          partitions.forEach(partition => {
            transactionTopicPartitions[topic][partition] = true
          })
        })
      },

      /**
       * Commit the ongoing transaction
       */
      async commit() {
        transactionalGuard()
        stateMachine.transitionTo(STATES.COMMITTING)

        const broker = await findTransactionCoordinator()
        await broker.endTxn({
          producerId,
          producerEpoch,
          transactionalId,
          transactionResult: true,
        })

        stateMachine.transitionTo(STATES.READY)
      },

      /**
       * Abort the ongoing transaction
       */
      async abort() {
        transactionalGuard()
        stateMachine.transitionTo(STATES.ABORTING)

        const broker = await findTransactionCoordinator()
        await broker.endTxn({
          producerId,
          producerEpoch,
          transactionalId,
          transactionResult: false,
        })

        stateMachine.transitionTo(STATES.READY)
      },

      /**
       * Whether the producer id has already been initialized
       */
      isInitialized() {
        return producerId !== NO_PRODUCER_ID
      },

      isTransactional() {
        return transactional
      },

      isInTransaction() {
        return stateMachine.state() === STATES.TRANSACTING
      },

      async acquireBrokerLock(broker) {
        if (this.isInitialized()) {
          brokerMutexLocks[broker.nodeId] =
            brokerMutexLocks[broker.nodeId] || new Lock({ timeout: 0xffff })
          await brokerMutexLocks[broker.nodeId].acquire()
        }
      },

      releaseBrokerLock(broker) {
        if (this.isInitialized()) brokerMutexLocks[broker.nodeId].release()
      },

      /**
       * Mark the provided offsets as participating in the transaction for the given consumer group.
       *
       * This allows us to commit an offset as consumed only if the transaction passes.
       * @param {string} consumerGroupId The unique group identifier
       * @param {OffsetCommitTopic[]} topics The unique group identifier
       * @returns {Promise}
       *
       * @typedef {Object} OffsetCommitTopic
       * @property {string} topic
       * @property {OffsetCommitTopicPartition[]} partitions
       *
       * @typedef {Object} OffsetCommitTopicPartition
       * @property {number} partition
       * @property {number} offset
       */
      async sendOffsets({ consumerGroupId, topics }) {
        assert(consumerGroupId, 'Missing consumerGroupId')
        assert(topics, 'Missing offset topics')

        const transactionCoordinator = await findTransactionCoordinator()

        // Do we need to add offsets if we've already done so for this consumer group?
        await transactionCoordinator.addOffsetsToTxn({
          transactionalId,
          producerId,
          producerEpoch,
          groupId: consumerGroupId,
        })

        let groupCoordinator = await cluster.findGroupCoordinator({
          groupId: consumerGroupId,
          coordinatorType: COORDINATOR_TYPES.GROUP,
        })

        return retrier(async (bail, retryCount, retryTime) => {
          try {
            await groupCoordinator.txnOffsetCommit({
              transactionalId,
              producerId,
              producerEpoch,
              groupId: consumerGroupId,
              topics,
            })
          } catch (e) {
            if (COMMIT_RETRIABLE_PROTOCOL_ERRORS.includes(e.type)) {
              logger.debug('Group coordinator is not ready yet, retrying', {
                error: e.message,
                stack: e.stack,
                transactionalId,
                retryCount,
                retryTime,
              })

              throw e
            }

            if (
              COMMIT_STALE_COORDINATOR_PROTOCOL_ERRORS.includes(e.type) ||
              e.code === 'ECONNREFUSED'
            ) {
              logger.debug(
                'Invalid group coordinator, finding new group coordinator and retrying',
                {
                  error: e.message,
                  stack: e.stack,
                  transactionalId,
                  retryCount,
                  retryTime,
                }
              )

              groupCoordinator = await cluster.findGroupCoordinator({
                groupId: consumerGroupId,
                coordinatorType: COORDINATOR_TYPES.GROUP,
              })

              throw e
            }

            bail(e)
          }
        })
      },
    },

    /**
     * Transaction state guards
     */
    {
      initProducerId: { legalStates: [STATES.UNINITIALIZED, STATES.READY] },
      beginTransaction: { legalStates: [STATES.READY], async: false },
      addPartitionsToTransaction: { legalStates: [STATES.TRANSACTING] },
      sendOffsets: { legalStates: [STATES.TRANSACTING] },
      commit: { legalStates: [STATES.TRANSACTING] },
      abort: { legalStates: [STATES.TRANSACTING] },
    }
  )

  return eosManager
}


/***/ }),

/***/ 2663:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { EventEmitter } = __nccwpck_require__(2361)
const { KafkaJSNonRetriableError } = __nccwpck_require__(5073)
const STATES = __nccwpck_require__(5704)

const VALID_STATE_TRANSITIONS = {
  [STATES.UNINITIALIZED]: [STATES.READY],
  [STATES.READY]: [STATES.READY, STATES.TRANSACTING],
  [STATES.TRANSACTING]: [STATES.COMMITTING, STATES.ABORTING],
  [STATES.COMMITTING]: [STATES.READY],
  [STATES.ABORTING]: [STATES.READY],
}

module.exports = ({ logger, initialState = STATES.UNINITIALIZED }) => {
  let currentState = initialState

  const guard = (object, method, { legalStates, async: isAsync = true }) => {
    if (!object[method]) {
      throw new KafkaJSNonRetriableError(`Cannot add guard on missing method "${method}"`)
    }

    return (...args) => {
      const fn = object[method]

      if (!legalStates.includes(currentState)) {
        const error = new KafkaJSNonRetriableError(
          `Transaction state exception: Cannot call "${method}" in state "${currentState}"`
        )

        if (isAsync) {
          return Promise.reject(error)
        } else {
          throw error
        }
      }

      return fn.apply(object, args)
    }
  }

  const stateMachine = Object.assign(new EventEmitter(), {
    /**
     * Create a clone of "object" where we ensure state machine is in correct state
     * prior to calling any of the configured methods
     * @param {Object} object The object whose methods we will guard
     * @param {Object} methodStateMapping Keys are method names on "object"
     * @param {string[]} methodStateMapping.legalStates Legal states for this method
     * @param {boolean=true} methodStateMapping.async Whether this method is async (throw vs reject)
     */
    createGuarded(object, methodStateMapping) {
      const guardedMethods = Object.keys(methodStateMapping).reduce((guards, method) => {
        guards[method] = guard(object, method, methodStateMapping[method])
        return guards
      }, {})

      return { ...object, ...guardedMethods }
    },
    /**
     * Transition safely to a new state
     */
    transitionTo(state) {
      logger.debug(`Transaction state transition ${currentState} --> ${state}`)

      if (!VALID_STATE_TRANSITIONS[currentState].includes(state)) {
        throw new KafkaJSNonRetriableError(
          `Transaction state exception: Invalid transition ${currentState} --> ${state}`
        )
      }

      stateMachine.emit('transition', { to: state, from: currentState })
      currentState = state
    },

    state() {
      return currentState
    },
  })

  return stateMachine
}


/***/ }),

/***/ 5704:
/***/ ((module) => {

module.exports = {
  UNINITIALIZED: 'UNINITIALIZED',
  READY: 'READY',
  TRANSACTING: 'TRANSACTING',
  COMMITTING: 'COMMITTING',
  ABORTING: 'ABORTING',
}


/***/ }),

/***/ 2641:
/***/ ((module) => {

module.exports = ({ topic, partitionMetadata, messages, partitioner }) => {
  if (partitionMetadata.length === 0) {
    return {}
  }

  return messages.reduce((result, message) => {
    const partition = partitioner({ topic, partitionMetadata, message })
    const current = result[partition] || []
    return Object.assign(result, { [partition]: [...current, message] })
  }, {})
}


/***/ }),

/***/ 5995:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const createRetry = __nccwpck_require__(1862)
const { CONNECTION_STATUS } = __nccwpck_require__(2632)
const { DefaultPartitioner } = __nccwpck_require__(9097)
const InstrumentationEventEmitter = __nccwpck_require__(4491)
const createEosManager = __nccwpck_require__(6156)
const createMessageProducer = __nccwpck_require__(3289)
const { events, wrap: wrapEvent, unwrap: unwrapEvent } = __nccwpck_require__(8270)
const { KafkaJSNonRetriableError } = __nccwpck_require__(5073)

const { values, keys } = Object
const eventNames = values(events)
const eventKeys = keys(events)
  .map(key => `producer.events.${key}`)
  .join(', ')

const { CONNECT, DISCONNECT } = events

/**
 *
 * @param {Object} params
 * @param {import('../../types').Cluster} params.cluster
 * @param {import('../../types').Logger} params.logger
 * @param {import('../../types').ICustomPartitioner} [params.createPartitioner]
 * @param {import('../../types').RetryOptions} [params.retry]
 * @param {boolean} [params.idempotent]
 * @param {string} [params.transactionalId]
 * @param {number} [params.transactionTimeout]
 * @param {InstrumentationEventEmitter} [params.instrumentationEmitter]
 *
 * @returns {import('../../types').Producer}
 */
module.exports = ({
  cluster,
  logger: rootLogger,
  createPartitioner = DefaultPartitioner,
  retry,
  idempotent = false,
  transactionalId,
  transactionTimeout,
  instrumentationEmitter: rootInstrumentationEmitter,
}) => {
  let connectionStatus = CONNECTION_STATUS.DISCONNECTED
  retry = retry || { retries: idempotent ? Number.MAX_SAFE_INTEGER : 5 }

  if (idempotent && retry.retries < 1) {
    throw new KafkaJSNonRetriableError(
      'Idempotent producer must allow retries to protect against transient errors'
    )
  }

  const logger = rootLogger.namespace('Producer')

  if (idempotent && retry.retries < Number.MAX_SAFE_INTEGER) {
    logger.warn('Limiting retries for the idempotent producer may invalidate EoS guarantees')
  }

  const partitioner = createPartitioner()
  const retrier = createRetry(Object.assign({}, cluster.retry, retry))
  const instrumentationEmitter = rootInstrumentationEmitter || new InstrumentationEventEmitter()
  const idempotentEosManager = createEosManager({
    logger,
    cluster,
    transactionTimeout,
    transactional: false,
    transactionalId,
  })

  const { send, sendBatch } = createMessageProducer({
    logger,
    cluster,
    partitioner,
    eosManager: idempotentEosManager,
    idempotent,
    retrier,
    getConnectionStatus: () => connectionStatus,
  })

  let transactionalEosManager

  /** @type {import("../../types").Producer["on"]} */
  const on = (eventName, listener) => {
    if (!eventNames.includes(eventName)) {
      throw new KafkaJSNonRetriableError(`Event name should be one of ${eventKeys}`)
    }

    return instrumentationEmitter.addListener(unwrapEvent(eventName), event => {
      event.type = wrapEvent(event.type)
      Promise.resolve(listener(event)).catch(e => {
        logger.error(`Failed to execute listener: ${e.message}`, {
          eventName,
          stack: e.stack,
        })
      })
    })
  }

  /**
   * Begin a transaction. The returned object contains methods to send messages
   * to the transaction and end the transaction by committing or aborting.
   *
   * Only messages sent on the transaction object will participate in the transaction.
   *
   * Calling any of the transactional methods after the transaction has ended
   * will raise an exception (use `isActive` to ascertain if ended).
   * @returns {Promise<Transaction>}
   *
   * @typedef {Object} Transaction
   * @property {Function} send  Identical to the producer "send" method
   * @property {Function} sendBatch Identical to the producer "sendBatch" method
   * @property {Function} abort Abort the transaction
   * @property {Function} commit  Commit the transaction
   * @property {Function} isActive  Whether the transaction is active
   */
  const transaction = async () => {
    if (!transactionalId) {
      throw new KafkaJSNonRetriableError('Must provide transactional id for transactional producer')
    }

    let transactionDidEnd = false
    transactionalEosManager =
      transactionalEosManager ||
      createEosManager({
        logger,
        cluster,
        transactionTimeout,
        transactional: true,
        transactionalId,
      })

    if (transactionalEosManager.isInTransaction()) {
      throw new KafkaJSNonRetriableError(
        'There is already an ongoing transaction for this producer. Please end the transaction before beginning another.'
      )
    }

    // We only initialize the producer id once
    if (!transactionalEosManager.isInitialized()) {
      await transactionalEosManager.initProducerId()
    }
    transactionalEosManager.beginTransaction()

    const { send: sendTxn, sendBatch: sendBatchTxn } = createMessageProducer({
      logger,
      cluster,
      partitioner,
      retrier,
      eosManager: transactionalEosManager,
      idempotent: true,
      getConnectionStatus: () => connectionStatus,
    })

    const isActive = () => transactionalEosManager.isInTransaction() && !transactionDidEnd

    const transactionGuard = fn => (...args) => {
      if (!isActive()) {
        return Promise.reject(
          new KafkaJSNonRetriableError('Cannot continue to use transaction once ended')
        )
      }

      return fn(...args)
    }

    return {
      sendBatch: transactionGuard(sendBatchTxn),
      send: transactionGuard(sendTxn),
      /**
       * Abort the ongoing transaction.
       *
       * @throws {KafkaJSNonRetriableError} If transaction has ended
       */
      abort: transactionGuard(async () => {
        await transactionalEosManager.abort()
        transactionDidEnd = true
      }),
      /**
       * Commit the ongoing transaction.
       *
       * @throws {KafkaJSNonRetriableError} If transaction has ended
       */
      commit: transactionGuard(async () => {
        await transactionalEosManager.commit()
        transactionDidEnd = true
      }),
      /**
       * Sends a list of specified offsets to the consumer group coordinator, and also marks those offsets as part of the current transaction.
       *
       * @throws {KafkaJSNonRetriableError} If transaction has ended
       */
      sendOffsets: transactionGuard(async ({ consumerGroupId, topics }) => {
        await transactionalEosManager.sendOffsets({ consumerGroupId, topics })

        for (const topicOffsets of topics) {
          const { topic, partitions } = topicOffsets
          for (const { partition, offset } of partitions) {
            cluster.markOffsetAsCommitted({
              groupId: consumerGroupId,
              topic,
              partition,
              offset,
            })
          }
        }
      }),
      isActive,
    }
  }

  /**
   * @returns {Object} logger
   */
  const getLogger = () => logger

  return {
    /**
     * @returns {Promise}
     */
    connect: async () => {
      await cluster.connect()
      connectionStatus = CONNECTION_STATUS.CONNECTED
      instrumentationEmitter.emit(CONNECT)

      if (idempotent && !idempotentEosManager.isInitialized()) {
        await idempotentEosManager.initProducerId()
      }
    },
    /**
     * @return {Promise}
     */
    disconnect: async () => {
      connectionStatus = CONNECTION_STATUS.DISCONNECTING
      await cluster.disconnect()
      connectionStatus = CONNECTION_STATUS.DISCONNECTED
      instrumentationEmitter.emit(DISCONNECT)
    },
    isIdempotent: () => {
      return idempotent
    },
    events,
    on,
    send,
    sendBatch,
    transaction,
    logger: getLogger,
  }
}


/***/ }),

/***/ 8270:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const swapObject = __nccwpck_require__(2256)
const networkEvents = __nccwpck_require__(6304)
const InstrumentationEventType = __nccwpck_require__(5352)
const producerType = InstrumentationEventType('producer')

const events = {
  CONNECT: producerType('connect'),
  DISCONNECT: producerType('disconnect'),
  REQUEST: producerType(networkEvents.NETWORK_REQUEST),
  REQUEST_TIMEOUT: producerType(networkEvents.NETWORK_REQUEST_TIMEOUT),
  REQUEST_QUEUE_SIZE: producerType(networkEvents.NETWORK_REQUEST_QUEUE_SIZE),
}

const wrappedEvents = {
  [events.REQUEST]: networkEvents.NETWORK_REQUEST,
  [events.REQUEST_TIMEOUT]: networkEvents.NETWORK_REQUEST_TIMEOUT,
  [events.REQUEST_QUEUE_SIZE]: networkEvents.NETWORK_REQUEST_QUEUE_SIZE,
}

const reversedWrappedEvents = swapObject(wrappedEvents)
const unwrap = eventName => wrappedEvents[eventName] || eventName
const wrap = eventName => reversedWrappedEvents[eventName] || eventName

module.exports = {
  events,
  wrap,
  unwrap,
}


/***/ }),

/***/ 3289:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const createSendMessages = __nccwpck_require__(1215)
const { KafkaJSError, KafkaJSNonRetriableError } = __nccwpck_require__(5073)
const { CONNECTION_STATUS } = __nccwpck_require__(2632)

module.exports = ({
  logger,
  cluster,
  partitioner,
  eosManager,
  idempotent,
  retrier,
  getConnectionStatus,
}) => {
  const sendMessages = createSendMessages({
    logger,
    cluster,
    retrier,
    partitioner,
    eosManager,
  })

  const validateConnectionStatus = () => {
    const connectionStatus = getConnectionStatus()

    switch (connectionStatus) {
      case CONNECTION_STATUS.DISCONNECTING:
        throw new KafkaJSNonRetriableError(
          `The producer is disconnecting; therefore, it can't safely accept messages anymore`
        )
      case CONNECTION_STATUS.DISCONNECTED:
        throw new KafkaJSError('The producer is disconnected')
    }
  }

  /**
   * @typedef {Object} TopicMessages
   * @property {string} topic
   * @property {Array} messages An array of objects with "key" and "value", example:
   *                         [{ key: 'my-key', value: 'my-value'}]
   *
   * @typedef {Object} SendBatchRequest
   * @property {Array<TopicMessages>} topicMessages
   * @property {number} [acks=-1] Control the number of required acks.
   *                           -1 = all replicas must acknowledge
   *                            0 = no acknowledgments
   *                            1 = only waits for the leader to acknowledge
   *
   * @property {number} [timeout=30000] The time to await a response in ms
   * @property {Compression.Types} [compression=Compression.Types.None] Compression codec
   *
   * @param {SendBatchRequest}
   * @returns {Promise}
   */
  const sendBatch = async ({ acks = -1, timeout, compression, topicMessages = [] }) => {
    if (topicMessages.some(({ topic }) => !topic)) {
      throw new KafkaJSNonRetriableError(`Invalid topic`)
    }

    if (idempotent && acks !== -1) {
      throw new KafkaJSNonRetriableError(
        `Not requiring ack for all messages invalidates the idempotent producer's EoS guarantees`
      )
    }

    for (const { topic, messages } of topicMessages) {
      if (!messages) {
        throw new KafkaJSNonRetriableError(
          `Invalid messages array [${messages}] for topic "${topic}"`
        )
      }

      const messageWithoutValue = messages.find(message => message.value === undefined)
      if (messageWithoutValue) {
        throw new KafkaJSNonRetriableError(
          `Invalid message without value for topic "${topic}": ${JSON.stringify(
            messageWithoutValue
          )}`
        )
      }
    }

    validateConnectionStatus()
    const mergedTopicMessages = topicMessages.reduce((merged, { topic, messages }) => {
      const index = merged.findIndex(({ topic: mergedTopic }) => topic === mergedTopic)

      if (index === -1) {
        merged.push({ topic, messages })
      } else {
        merged[index].messages = [...merged[index].messages, ...messages]
      }

      return merged
    }, [])

    return await sendMessages({
      acks,
      timeout,
      compression,
      topicMessages: mergedTopicMessages,
    })
  }

  /**
   * @param {ProduceRequest} ProduceRequest
   * @returns {Promise}
   *
   * @typedef {Object} ProduceRequest
   * @property {string} topic
   * @property {Array} messages An array of objects with "key" and "value", example:
   *                         [{ key: 'my-key', value: 'my-value'}]
   * @property {number} [acks=-1] Control the number of required acks.
   *                           -1 = all replicas must acknowledge
   *                            0 = no acknowledgments
   *                            1 = only waits for the leader to acknowledge
   * @property {number} [timeout=30000] The time to await a response in ms
   * @property {Compression.Types} [compression=Compression.Types.None] Compression codec
   */
  const send = async ({ acks, timeout, compression, topic, messages }) => {
    const topicMessage = { topic, messages }
    return sendBatch({
      acks,
      timeout,
      compression,
      topicMessages: [topicMessage],
    })
  }

  return {
    send,
    sendBatch,
  }
}


/***/ }),

/***/ 5615:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const murmur2 = __nccwpck_require__(6245)
const createDefaultPartitioner = __nccwpck_require__(3154)

module.exports = createDefaultPartitioner(murmur2)


/***/ }),

/***/ 6245:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/* eslint-disable */
const Long = __nccwpck_require__(3368)

// Based on the kafka client 0.10.2 murmur2 implementation
// https://github.com/apache/kafka/blob/0.10.2/clients/src/main/java/org/apache/kafka/common/utils/Utils.java#L364

const SEED = Long.fromValue(0x9747b28c)

// 'm' and 'r' are mixing constants generated offline.
// They're not really 'magic', they just happen to work well.
const M = Long.fromValue(0x5bd1e995)
const R = Long.fromValue(24)

module.exports = key => {
  const data = Buffer.isBuffer(key) ? key : Buffer.from(String(key))
  const length = data.length

  // Initialize the hash to a random value
  let h = Long.fromValue(SEED.xor(length))
  let length4 = Math.floor(length / 4)

  for (let i = 0; i < length4; i++) {
    const i4 = i * 4
    let k =
      (data[i4 + 0] & 0xff) +
      ((data[i4 + 1] & 0xff) << 8) +
      ((data[i4 + 2] & 0xff) << 16) +
      ((data[i4 + 3] & 0xff) << 24)
    k = Long.fromValue(k)
    k = k.multiply(M)
    k = k.xor(k.toInt() >>> R)
    k = Long.fromValue(k).multiply(M)
    h = h.multiply(M)
    h = h.xor(k)
  }

  // Handle the last few bytes of the input array
  switch (length % 4) {
    case 3:
      h = h.xor((data[(length & ~3) + 2] & 0xff) << 16)
    case 2:
      h = h.xor((data[(length & ~3) + 1] & 0xff) << 8)
    case 1:
      h = h.xor(data[length & ~3] & 0xff)
      h = h.multiply(M)
  }

  h = h.xor(h.toInt() >>> 13)
  h = h.multiply(M)
  h = h.xor(h.toInt() >>> 15)

  return h.toInt()
}


/***/ }),

/***/ 9097:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const DefaultPartitioner = __nccwpck_require__(5615)
const LegacyPartitioner = __nccwpck_require__(2545)

module.exports = {
  DefaultPartitioner,
  LegacyPartitioner,
  /**
   * @deprecated Use DefaultPartitioner instead
   *
   * The JavaCompatiblePartitioner was renamed DefaultPartitioner
   * and made to be the default in 2.0.0.
   */
  JavaCompatiblePartitioner: DefaultPartitioner,
}


/***/ }),

/***/ 2545:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const murmur2 = __nccwpck_require__(8988)
const createLegacyPartitioner = __nccwpck_require__(3154)

module.exports = createLegacyPartitioner(murmur2)


/***/ }),

/***/ 8988:
/***/ ((module) => {

/* eslint-disable */

// Based on the kafka client 0.10.2 murmur2 implementation
// https://github.com/apache/kafka/blob/0.10.2/clients/src/main/java/org/apache/kafka/common/utils/Utils.java#L364

const SEED = 0x9747b28c

// 'm' and 'r' are mixing constants generated offline.
// They're not really 'magic', they just happen to work well.
const M = 0x5bd1e995
const R = 24

module.exports = key => {
  const data = Buffer.isBuffer(key) ? key : Buffer.from(String(key))
  const length = data.length

  // Initialize the hash to a random value
  let h = SEED ^ length
  let length4 = length / 4

  for (let i = 0; i < length4; i++) {
    const i4 = i * 4
    let k =
      (data[i4 + 0] & 0xff) +
      ((data[i4 + 1] & 0xff) << 8) +
      ((data[i4 + 2] & 0xff) << 16) +
      ((data[i4 + 3] & 0xff) << 24)
    k *= M
    k ^= k >>> R
    k *= M
    h *= M
    h ^= k
  }

  // Handle the last few bytes of the input array
  switch (length % 4) {
    case 3:
      h ^= (data[(length & ~3) + 2] & 0xff) << 16
    case 2:
      h ^= (data[(length & ~3) + 1] & 0xff) << 8
    case 1:
      h ^= data[length & ~3] & 0xff
      h *= M
  }

  h ^= h >>> 13
  h *= M
  h ^= h >>> 15

  return h
}


/***/ }),

/***/ 3154:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const randomBytes = __nccwpck_require__(9085)

// Based on the java client 0.10.2
// https://github.com/apache/kafka/blob/0.10.2/clients/src/main/java/org/apache/kafka/clients/producer/internals/DefaultPartitioner.java

/**
 * A cheap way to deterministically convert a number to a positive value. When the input is
 * positive, the original value is returned. When the input number is negative, the returned
 * positive value is the original value bit AND against 0x7fffffff which is not its absolutely
 * value.
 */
const toPositive = x => x & 0x7fffffff

/**
 * The default partitioning strategy:
 *  - If a partition is specified in the message, use it
 *  - If no partition is specified but a key is present choose a partition based on a hash of the key
 *  - If no partition or key is present choose a partition in a round-robin fashion
 */
module.exports = murmur2 => () => {
  const counters = {}

  return ({ topic, partitionMetadata, message }) => {
    if (!(topic in counters)) {
      counters[topic] = randomBytes(32).readUInt32BE(0)
    }
    const numPartitions = partitionMetadata.length
    const availablePartitions = partitionMetadata.filter(p => p.leader >= 0)
    const numAvailablePartitions = availablePartitions.length

    if (message.partition !== null && message.partition !== undefined) {
      return message.partition
    }

    if (message.key !== null && message.key !== undefined) {
      return toPositive(murmur2(message.key)) % numPartitions
    }

    if (numAvailablePartitions > 0) {
      const i = toPositive(++counters[topic]) % numAvailablePartitions
      return availablePartitions[i].partitionId
    }

    // no partitions are available, give a non-available partition
    return toPositive(++counters[topic]) % numPartitions
  }
}


/***/ }),

/***/ 9085:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { KafkaJSNonRetriableError } = __nccwpck_require__(5073)

const toNodeCompatible = crypto => ({
  randomBytes: size => crypto.getRandomValues(Buffer.allocUnsafe(size)),
})

let cryptoImplementation = null
if (global && global.crypto) {
  cryptoImplementation =
    global.crypto.randomBytes === undefined ? toNodeCompatible(global.crypto) : global.crypto
} else if (global && global.msCrypto) {
  cryptoImplementation = toNodeCompatible(global.msCrypto)
} else if (global && !global.crypto) {
  cryptoImplementation = __nccwpck_require__(6113)
}

const MAX_BYTES = 65536

module.exports = size => {
  if (size > MAX_BYTES) {
    throw new KafkaJSNonRetriableError(
      `Byte length (${size}) exceeds the max number of bytes of entropy available (${MAX_BYTES})`
    )
  }

  if (!cryptoImplementation) {
    throw new KafkaJSNonRetriableError('No available crypto implementation')
  }

  return cryptoImplementation.randomBytes(size)
}


/***/ }),

/***/ 7668:
/***/ ((module) => {

module.exports = ({ topics }) =>
  topics.flatMap(({ topicName, partitions }) =>
    partitions.map(partition => ({ topicName, ...partition }))
  )


/***/ }),

/***/ 1215:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { KafkaJSMetadataNotLoaded } = __nccwpck_require__(5073)
const { staleMetadata } = __nccwpck_require__(5903)
const groupMessagesPerPartition = __nccwpck_require__(2641)
const createTopicData = __nccwpck_require__(92)
const responseSerializer = __nccwpck_require__(7668)

const { keys } = Object

/**
 * @param {Object} options
 * @param {import("../../types").Logger} options.logger
 * @param {import("../../types").Cluster} options.cluster
 * @param {ReturnType<import("../../types").ICustomPartitioner>} options.partitioner
 * @param {import("./eosManager").EosManager} options.eosManager
 * @param {import("../retry").Retrier} options.retrier
 */
module.exports = ({ logger, cluster, partitioner, eosManager, retrier }) => {
  return async ({ acks, timeout, compression, topicMessages }) => {
    /** @type {Map<import("../../types").Broker, any[]>} */
    const responsePerBroker = new Map()

    /** @param {Map<import("../../types").Broker, any[]>} responsePerBroker */
    const createProducerRequests = async responsePerBroker => {
      const topicMetadata = new Map()

      await cluster.refreshMetadataIfNecessary()

      for (const { topic, messages } of topicMessages) {
        const partitionMetadata = cluster.findTopicPartitionMetadata(topic)

        if (partitionMetadata.length === 0) {
          logger.debug('Producing to topic without metadata', {
            topic,
            targetTopics: Array.from(cluster.targetTopics),
          })

          throw new KafkaJSMetadataNotLoaded('Producing to topic without metadata')
        }

        const messagesPerPartition = groupMessagesPerPartition({
          topic,
          partitionMetadata,
          messages,
          partitioner,
        })

        const partitions = keys(messagesPerPartition)
        const partitionsPerLeader = cluster.findLeaderForPartitions(topic, partitions)
        const leaders = keys(partitionsPerLeader)

        topicMetadata.set(topic, {
          partitionsPerLeader,
          messagesPerPartition,
        })

        for (const nodeId of leaders) {
          const broker = await cluster.findBroker({ nodeId })
          if (!responsePerBroker.has(broker)) {
            responsePerBroker.set(broker, null)
          }
        }
      }

      const brokers = Array.from(responsePerBroker.keys())
      const brokersWithoutResponse = brokers.filter(broker => !responsePerBroker.get(broker))

      return brokersWithoutResponse.map(async broker => {
        const entries = Array.from(topicMetadata.entries())
        const topicDataForBroker = entries
          .filter(([_, { partitionsPerLeader }]) => !!partitionsPerLeader[broker.nodeId])
          .map(([topic, { partitionsPerLeader, messagesPerPartition, sequencePerPartition }]) => ({
            topic,
            partitions: partitionsPerLeader[broker.nodeId],
            messagesPerPartition,
          }))

        const topicData = createTopicData(topicDataForBroker)

        await eosManager.acquireBrokerLock(broker)
        try {
          if (eosManager.isTransactional()) {
            await eosManager.addPartitionsToTransaction(topicData)
          }

          topicData.forEach(({ topic, partitions }) => {
            partitions.forEach(entry => {
              entry['firstSequence'] = eosManager.getSequence(topic, entry.partition)
              eosManager.updateSequence(topic, entry.partition, entry.messages.length)
            })
          })

          let response
          try {
            response = await broker.produce({
              transactionalId: eosManager.isTransactional()
                ? eosManager.getTransactionalId()
                : undefined,
              producerId: eosManager.getProducerId(),
              producerEpoch: eosManager.getProducerEpoch(),
              acks,
              timeout,
              compression,
              topicData,
            })
          } catch (e) {
            topicData.forEach(({ topic, partitions }) => {
              partitions.forEach(entry => {
                eosManager.updateSequence(topic, entry.partition, -entry.messages.length)
              })
            })
            throw e
          }

          const expectResponse = acks !== 0
          const formattedResponse = expectResponse ? responseSerializer(response) : []

          responsePerBroker.set(broker, formattedResponse)
        } catch (e) {
          responsePerBroker.delete(broker)
          throw e
        } finally {
          await eosManager.releaseBrokerLock(broker)
        }
      })
    }

    return retrier(async (bail, retryCount, retryTime) => {
      const topics = topicMessages.map(({ topic }) => topic)
      await cluster.addMultipleTargetTopics(topics)

      try {
        const requests = await createProducerRequests(responsePerBroker)
        await Promise.all(requests)
        return Array.from(responsePerBroker.values()).flat()
      } catch (e) {
        if (e.name === 'KafkaJSConnectionClosedError') {
          cluster.removeBroker({ host: e.host, port: e.port })
        }

        if (!cluster.isConnected()) {
          logger.debug(`Cluster has disconnected, reconnecting: ${e.message}`, {
            retryCount,
            retryTime,
          })
          await cluster.connect()
          await cluster.refreshMetadata()
          throw e
        }

        // This is necessary in case the metadata is stale and the number of partitions
        // for this topic has increased in the meantime
        if (
          staleMetadata(e) ||
          e.name === 'KafkaJSMetadataNotLoaded' ||
          e.name === 'KafkaJSConnectionError' ||
          e.name === 'KafkaJSConnectionClosedError' ||
          (e.name === 'KafkaJSProtocolError' && e.retriable)
        ) {
          logger.error(`Failed to send messages: ${e.message}`, { retryCount, retryTime })
          await cluster.refreshMetadata()
          throw e
        }

        logger.error(`${e.message}`, { retryCount, retryTime })
        if (e.retriable) throw e
        bail(e)
      }
    })
  }
}


/***/ }),

/***/ 7906:
/***/ ((module) => {

// From:
// https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/acl/AclOperation.java#L44

/**
 * @typedef {number} ACLOperationTypes
 *
 * Enum for ACL Operations Types
 * @readonly
 * @enum {ACLOperationTypes}
 */
module.exports = {
  /**
   * Represents any AclOperation which this client cannot understand, perhaps because this
   * client is too old.
   */
  UNKNOWN: 0,
  /**
   * In a filter, matches any AclOperation.
   */
  ANY: 1,
  /**
   * ALL operation.
   */
  ALL: 2,
  /**
   * READ operation.
   */
  READ: 3,
  /**
   * WRITE operation.
   */
  WRITE: 4,
  /**
   * CREATE operation.
   */
  CREATE: 5,
  /**
   * DELETE operation.
   */
  DELETE: 6,
  /**
   * ALTER operation.
   */
  ALTER: 7,
  /**
   * DESCRIBE operation.
   */
  DESCRIBE: 8,
  /**
   * CLUSTER_ACTION operation.
   */
  CLUSTER_ACTION: 9,
  /**
   * DESCRIBE_CONFIGS operation.
   */
  DESCRIBE_CONFIGS: 10,
  /**
   * ALTER_CONFIGS operation.
   */
  ALTER_CONFIGS: 11,
  /**
   * IDEMPOTENT_WRITE operation.
   */
  IDEMPOTENT_WRITE: 12,
}


/***/ }),

/***/ 961:
/***/ ((module) => {

// From:
// https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/acl/AclPermissionType.java/#L31

/**
 * @typedef {number} ACLPermissionTypes
 *
 * Enum for Permission Types
 * @readonly
 * @enum {ACLPermissionTypes}
 */
module.exports = {
  /**
   * Represents any AclPermissionType which this client cannot understand,
   * perhaps because this client is too old.
   */
  UNKNOWN: 0,
  /**
   * In a filter, matches any AclPermissionType.
   */
  ANY: 1,
  /**
   * Disallows access.
   */
  DENY: 2,
  /**
   * Grants access.
   */
  ALLOW: 3,
}


/***/ }),

/***/ 5297:
/***/ ((module) => {

/**
 * @see https://github.com/apache/kafka/blob/a15387f34d142684859c2a57fcbef25edcdce25a/clients/src/main/java/org/apache/kafka/common/resource/ResourceType.java#L25-L31
 * @typedef {number} ACLResourceTypes
 *
 * Enum for ACL Resource Types
 * @readonly
 * @enum {ACLResourceTypes}
 */

module.exports = {
  /**
   * Represents any ResourceType which this client cannot understand,
   * perhaps because this client is too old.
   */
  UNKNOWN: 0,
  /**
   * In a filter, matches any ResourceType.
   */
  ANY: 1,
  /**
   * A Kafka topic.
   * @see http://kafka.apache.org/documentation/#topicconfigs
   */
  TOPIC: 2,
  /**
   * A consumer group.
   * @see http://kafka.apache.org/documentation/#consumerconfigs
   */
  GROUP: 3,
  /**
   * The cluster as a whole.
   */
  CLUSTER: 4,
  /**
   * A transactional ID.
   */
  TRANSACTIONAL_ID: 5,
  /**
   * A token ID.
   */
  DELEGATION_TOKEN: 6,
}


/***/ }),

/***/ 430:
/***/ ((module) => {

/**
 * @see https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/config/ConfigResource.java
 */
module.exports = {
  UNKNOWN: 0,
  TOPIC: 2,
  BROKER: 4,
  BROKER_LOGGER: 8,
}


/***/ }),

/***/ 4277:
/***/ ((module) => {

/**
 * @see https://github.com/apache/kafka/blob/1f240ce1793cab09e1c4823e17436d2b030df2bc/clients/src/main/java/org/apache/kafka/common/requests/DescribeConfigsResponse.java#L115-L122
 */
module.exports = {
  UNKNOWN: 0,
  TOPIC_CONFIG: 1,
  DYNAMIC_BROKER_CONFIG: 2,
  DYNAMIC_DEFAULT_BROKER_CONFIG: 3,
  STATIC_BROKER_CONFIG: 4,
  DEFAULT_CONFIG: 5,
  DYNAMIC_BROKER_LOGGER_CONFIG: 6,
}


/***/ }),

/***/ 466:
/***/ ((module) => {

// From: https://kafka.apache.org/protocol.html#The_Messages_FindCoordinator

/**
 * @typedef {number} CoordinatorType
 *
 * Enum for the types of coordinator to find.
 * @enum {CoordinatorType}
 */
module.exports = {
  GROUP: 0,
  TRANSACTION: 1,
}


/***/ }),

/***/ 5677:
/***/ ((module) => {

// Based on https://github.com/brianloveswords/buffer-crc32/blob/master/index.js

var CRC_TABLE = new Int32Array([
  0x00000000,
  0x77073096,
  0xee0e612c,
  0x990951ba,
  0x076dc419,
  0x706af48f,
  0xe963a535,
  0x9e6495a3,
  0x0edb8832,
  0x79dcb8a4,
  0xe0d5e91e,
  0x97d2d988,
  0x09b64c2b,
  0x7eb17cbd,
  0xe7b82d07,
  0x90bf1d91,
  0x1db71064,
  0x6ab020f2,
  0xf3b97148,
  0x84be41de,
  0x1adad47d,
  0x6ddde4eb,
  0xf4d4b551,
  0x83d385c7,
  0x136c9856,
  0x646ba8c0,
  0xfd62f97a,
  0x8a65c9ec,
  0x14015c4f,
  0x63066cd9,
  0xfa0f3d63,
  0x8d080df5,
  0x3b6e20c8,
  0x4c69105e,
  0xd56041e4,
  0xa2677172,
  0x3c03e4d1,
  0x4b04d447,
  0xd20d85fd,
  0xa50ab56b,
  0x35b5a8fa,
  0x42b2986c,
  0xdbbbc9d6,
  0xacbcf940,
  0x32d86ce3,
  0x45df5c75,
  0xdcd60dcf,
  0xabd13d59,
  0x26d930ac,
  0x51de003a,
  0xc8d75180,
  0xbfd06116,
  0x21b4f4b5,
  0x56b3c423,
  0xcfba9599,
  0xb8bda50f,
  0x2802b89e,
  0x5f058808,
  0xc60cd9b2,
  0xb10be924,
  0x2f6f7c87,
  0x58684c11,
  0xc1611dab,
  0xb6662d3d,
  0x76dc4190,
  0x01db7106,
  0x98d220bc,
  0xefd5102a,
  0x71b18589,
  0x06b6b51f,
  0x9fbfe4a5,
  0xe8b8d433,
  0x7807c9a2,
  0x0f00f934,
  0x9609a88e,
  0xe10e9818,
  0x7f6a0dbb,
  0x086d3d2d,
  0x91646c97,
  0xe6635c01,
  0x6b6b51f4,
  0x1c6c6162,
  0x856530d8,
  0xf262004e,
  0x6c0695ed,
  0x1b01a57b,
  0x8208f4c1,
  0xf50fc457,
  0x65b0d9c6,
  0x12b7e950,
  0x8bbeb8ea,
  0xfcb9887c,
  0x62dd1ddf,
  0x15da2d49,
  0x8cd37cf3,
  0xfbd44c65,
  0x4db26158,
  0x3ab551ce,
  0xa3bc0074,
  0xd4bb30e2,
  0x4adfa541,
  0x3dd895d7,
  0xa4d1c46d,
  0xd3d6f4fb,
  0x4369e96a,
  0x346ed9fc,
  0xad678846,
  0xda60b8d0,
  0x44042d73,
  0x33031de5,
  0xaa0a4c5f,
  0xdd0d7cc9,
  0x5005713c,
  0x270241aa,
  0xbe0b1010,
  0xc90c2086,
  0x5768b525,
  0x206f85b3,
  0xb966d409,
  0xce61e49f,
  0x5edef90e,
  0x29d9c998,
  0xb0d09822,
  0xc7d7a8b4,
  0x59b33d17,
  0x2eb40d81,
  0xb7bd5c3b,
  0xc0ba6cad,
  0xedb88320,
  0x9abfb3b6,
  0x03b6e20c,
  0x74b1d29a,
  0xead54739,
  0x9dd277af,
  0x04db2615,
  0x73dc1683,
  0xe3630b12,
  0x94643b84,
  0x0d6d6a3e,
  0x7a6a5aa8,
  0xe40ecf0b,
  0x9309ff9d,
  0x0a00ae27,
  0x7d079eb1,
  0xf00f9344,
  0x8708a3d2,
  0x1e01f268,
  0x6906c2fe,
  0xf762575d,
  0x806567cb,
  0x196c3671,
  0x6e6b06e7,
  0xfed41b76,
  0x89d32be0,
  0x10da7a5a,
  0x67dd4acc,
  0xf9b9df6f,
  0x8ebeeff9,
  0x17b7be43,
  0x60b08ed5,
  0xd6d6a3e8,
  0xa1d1937e,
  0x38d8c2c4,
  0x4fdff252,
  0xd1bb67f1,
  0xa6bc5767,
  0x3fb506dd,
  0x48b2364b,
  0xd80d2bda,
  0xaf0a1b4c,
  0x36034af6,
  0x41047a60,
  0xdf60efc3,
  0xa867df55,
  0x316e8eef,
  0x4669be79,
  0xcb61b38c,
  0xbc66831a,
  0x256fd2a0,
  0x5268e236,
  0xcc0c7795,
  0xbb0b4703,
  0x220216b9,
  0x5505262f,
  0xc5ba3bbe,
  0xb2bd0b28,
  0x2bb45a92,
  0x5cb36a04,
  0xc2d7ffa7,
  0xb5d0cf31,
  0x2cd99e8b,
  0x5bdeae1d,
  0x9b64c2b0,
  0xec63f226,
  0x756aa39c,
  0x026d930a,
  0x9c0906a9,
  0xeb0e363f,
  0x72076785,
  0x05005713,
  0x95bf4a82,
  0xe2b87a14,
  0x7bb12bae,
  0x0cb61b38,
  0x92d28e9b,
  0xe5d5be0d,
  0x7cdcefb7,
  0x0bdbdf21,
  0x86d3d2d4,
  0xf1d4e242,
  0x68ddb3f8,
  0x1fda836e,
  0x81be16cd,
  0xf6b9265b,
  0x6fb077e1,
  0x18b74777,
  0x88085ae6,
  0xff0f6a70,
  0x66063bca,
  0x11010b5c,
  0x8f659eff,
  0xf862ae69,
  0x616bffd3,
  0x166ccf45,
  0xa00ae278,
  0xd70dd2ee,
  0x4e048354,
  0x3903b3c2,
  0xa7672661,
  0xd06016f7,
  0x4969474d,
  0x3e6e77db,
  0xaed16a4a,
  0xd9d65adc,
  0x40df0b66,
  0x37d83bf0,
  0xa9bcae53,
  0xdebb9ec5,
  0x47b2cf7f,
  0x30b5ffe9,
  0xbdbdf21c,
  0xcabac28a,
  0x53b39330,
  0x24b4a3a6,
  0xbad03605,
  0xcdd70693,
  0x54de5729,
  0x23d967bf,
  0xb3667a2e,
  0xc4614ab8,
  0x5d681b02,
  0x2a6f2b94,
  0xb40bbe37,
  0xc30c8ea1,
  0x5a05df1b,
  0x2d02ef8d,
])

module.exports = encoder => {
  const { buffer } = encoder
  const l = buffer.length
  let crc = -1
  for (let n = 0; n < l; n++) {
    crc = CRC_TABLE[(crc ^ buffer[n]) & 0xff] ^ (crc >>> 8)
  }
  return crc ^ -1
}


/***/ }),

/***/ 9991:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { KafkaJSInvalidVarIntError, KafkaJSInvalidLongError } = __nccwpck_require__(5073)
const Long = __nccwpck_require__(3368)

const INT8_SIZE = 1
const INT16_SIZE = 2
const INT32_SIZE = 4
const INT64_SIZE = 8
const DOUBLE_SIZE = 8

const MOST_SIGNIFICANT_BIT = 0x80 // 128
const OTHER_BITS = 0x7f // 127

module.exports = class Decoder {
  static int32Size() {
    return INT32_SIZE
  }

  static decodeZigZag(value) {
    return (value >>> 1) ^ -(value & 1)
  }

  static decodeZigZag64(longValue) {
    return longValue.shiftRightUnsigned(1).xor(longValue.and(Long.fromInt(1)).negate())
  }

  constructor(buffer) {
    this.buffer = buffer
    this.offset = 0
  }

  readInt8() {
    const value = this.buffer.readInt8(this.offset)
    this.offset += INT8_SIZE
    return value
  }

  canReadInt16() {
    return this.canReadBytes(INT16_SIZE)
  }

  readInt16() {
    const value = this.buffer.readInt16BE(this.offset)
    this.offset += INT16_SIZE
    return value
  }

  canReadInt32() {
    return this.canReadBytes(INT32_SIZE)
  }

  readInt32() {
    const value = this.buffer.readInt32BE(this.offset)
    this.offset += INT32_SIZE
    return value
  }

  canReadInt64() {
    return this.canReadBytes(INT64_SIZE)
  }

  readInt64() {
    const first = this.buffer[this.offset]
    const last = this.buffer[this.offset + 7]

    const low =
      (first << 24) + // Overflow
      this.buffer[this.offset + 1] * 2 ** 16 +
      this.buffer[this.offset + 2] * 2 ** 8 +
      this.buffer[this.offset + 3]
    const high =
      this.buffer[this.offset + 4] * 2 ** 24 +
      this.buffer[this.offset + 5] * 2 ** 16 +
      this.buffer[this.offset + 6] * 2 ** 8 +
      last
    this.offset += INT64_SIZE

    return (BigInt(low) << 32n) + BigInt(high)
  }

  readDouble() {
    const value = this.buffer.readDoubleBE(this.offset)
    this.offset += DOUBLE_SIZE
    return value
  }

  readString() {
    const byteLength = this.readInt16()

    if (byteLength === -1) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    const value = stringBuffer.toString('utf8')
    this.offset += byteLength
    return value
  }

  readVarIntString() {
    const byteLength = this.readVarInt()

    if (byteLength === -1) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    const value = stringBuffer.toString('utf8')
    this.offset += byteLength
    return value
  }

  readUVarIntString() {
    const byteLength = this.readUVarInt()

    if (byteLength === 0) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    const value = stringBuffer.toString('utf8')
    this.offset += byteLength
    return value
  }

  canReadBytes(length) {
    return Buffer.byteLength(this.buffer) - this.offset >= length
  }

  readBytes(byteLength = this.readInt32()) {
    if (byteLength === -1) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    this.offset += byteLength
    return stringBuffer
  }

  readVarIntBytes() {
    const byteLength = this.readVarInt()

    if (byteLength === -1) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    this.offset += byteLength
    return stringBuffer
  }

  readUVarIntBytes() {
    const byteLength = this.readUVarInt()

    if (byteLength === 0) {
      return null
    }

    const stringBuffer = this.buffer.slice(this.offset, this.offset + byteLength)
    this.offset += byteLength
    return stringBuffer
  }

  readBoolean() {
    return this.readInt8() === 1
  }

  readAll() {
    const result = this.buffer.slice(this.offset)
    this.offset += Buffer.byteLength(this.buffer)
    return result
  }

  readArray(reader) {
    const length = this.readInt32()

    if (length === -1) {
      return []
    }

    const array = new Array(length)
    for (let i = 0; i < length; i++) {
      array[i] = reader(this)
    }

    return array
  }

  readVarIntArray(reader) {
    const length = this.readVarInt()

    if (length === -1) {
      return []
    }

    const array = new Array(length)
    for (let i = 0; i < length; i++) {
      array[i] = reader(this)
    }

    return array
  }

  readUVarIntArray(reader) {
    const length = this.readUVarInt()

    if (length === 0) {
      return []
    }

    const array = new Array(length - 1)
    for (let i = 0; i < length - 1; i++) {
      array[i] = reader(this)
    }

    return array
  }

  async readArrayAsync(reader) {
    const length = this.readInt32()

    if (length === -1) {
      return []
    }

    const array = new Array(length)
    for (let i = 0; i < length; i++) {
      array[i] = await reader(this)
    }

    return array
  }

  readVarInt() {
    let currentByte
    let result = 0
    let i = 0

    do {
      currentByte = this.buffer[this.offset++]
      result += (currentByte & OTHER_BITS) << i
      i += 7
    } while (currentByte >= MOST_SIGNIFICANT_BIT)

    return Decoder.decodeZigZag(result)
  }

  // By default JavaScript's numbers are of type float64, performing bitwise operations converts the numbers to a signed 32-bit integer
  // Unsigned Right Shift Operator >>> ensures the returned value is an unsigned 32-bit integer
  readUVarInt() {
    let currentByte
    let result = 0
    let i = 0
    while (((currentByte = this.buffer[this.offset++]) & MOST_SIGNIFICANT_BIT) !== 0) {
      result |= (currentByte & OTHER_BITS) << i
      i += 7
      if (i > 28) {
        throw new KafkaJSInvalidVarIntError('Invalid VarInt, must contain 5 bytes or less')
      }
    }
    result |= currentByte << i
    return result >>> 0
  }

  readVarLong() {
    let currentByte
    let result = Long.fromInt(0)
    let i = 0

    do {
      if (i > 63) {
        throw new KafkaJSInvalidLongError('Invalid Long, must contain 9 bytes or less')
      }
      currentByte = this.buffer[this.offset++]
      result = result.add(Long.fromInt(currentByte & OTHER_BITS).shiftLeft(i))
      i += 7
    } while (currentByte >= MOST_SIGNIFICANT_BIT)

    return Decoder.decodeZigZag64(result)
  }

  slice(size) {
    return new Decoder(this.buffer.slice(this.offset, this.offset + size))
  }

  forward(size) {
    this.offset += size
  }
}


/***/ }),

/***/ 843:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)

const INT8_SIZE = 1
const INT16_SIZE = 2
const INT32_SIZE = 4
const INT64_SIZE = 8
const DOUBLE_SIZE = 8

const MOST_SIGNIFICANT_BIT = 0x80 // 128
const OTHER_BITS = 0x7f // 127
const UNSIGNED_INT32_MAX_NUMBER = 0xffffff80
const UNSIGNED_INT64_MAX_NUMBER = 0xffffffffffffff80n

module.exports = class Encoder {
  static encodeZigZag(value) {
    return (value << 1) ^ (value >> 31)
  }

  static encodeZigZag64(value) {
    const longValue = Long.fromValue(value)
    return longValue.shiftLeft(1).xor(longValue.shiftRight(63))
  }

  static sizeOfVarInt(value) {
    let encodedValue = this.encodeZigZag(value)
    let bytes = 1

    while ((encodedValue & UNSIGNED_INT32_MAX_NUMBER) !== 0) {
      bytes += 1
      encodedValue >>>= 7
    }

    return bytes
  }

  static sizeOfVarLong(value) {
    let longValue = Encoder.encodeZigZag64(value)
    let bytes = 1

    while (longValue.and(UNSIGNED_INT64_MAX_NUMBER).notEquals(Long.fromInt(0))) {
      bytes += 1
      longValue = longValue.shiftRightUnsigned(7)
    }

    return bytes
  }

  static sizeOfVarIntBytes(value) {
    const size = value == null ? -1 : Buffer.byteLength(value)

    if (size < 0) {
      return Encoder.sizeOfVarInt(-1)
    }

    return Encoder.sizeOfVarInt(size) + size
  }

  static nextPowerOfTwo(value) {
    return 1 << (31 - Math.clz32(value) + 1)
  }

  /**
   * Construct a new encoder with the given initial size
   *
   * @param {number} [initialSize] initial size
   */
  constructor(initialSize = 511) {
    this.buf = Buffer.alloc(Encoder.nextPowerOfTwo(initialSize))
    this.offset = 0
  }

  /**
   * @param {Buffer} buffer
   */
  writeBufferInternal(buffer) {
    const bufferLength = buffer.length
    this.ensureAvailable(bufferLength)
    buffer.copy(this.buf, this.offset, 0)
    this.offset += bufferLength
  }

  ensureAvailable(length) {
    if (this.offset + length > this.buf.length) {
      const newLength = Encoder.nextPowerOfTwo(this.offset + length)
      const newBuffer = Buffer.alloc(newLength)
      this.buf.copy(newBuffer, 0, 0, this.offset)
      this.buf = newBuffer
    }
  }

  get buffer() {
    return this.buf.slice(0, this.offset)
  }

  writeInt8(value) {
    this.ensureAvailable(INT8_SIZE)
    this.buf.writeInt8(value, this.offset)
    this.offset += INT8_SIZE
    return this
  }

  writeInt16(value) {
    this.ensureAvailable(INT16_SIZE)
    this.buf.writeInt16BE(value, this.offset)
    this.offset += INT16_SIZE
    return this
  }

  writeInt32(value) {
    this.ensureAvailable(INT32_SIZE)
    this.buf.writeInt32BE(value, this.offset)
    this.offset += INT32_SIZE
    return this
  }

  writeUInt32(value) {
    this.ensureAvailable(INT32_SIZE)
    this.buf.writeUInt32BE(value, this.offset)
    this.offset += INT32_SIZE
    return this
  }

  writeInt64(value) {
    this.ensureAvailable(INT64_SIZE)
    const longValue = Long.fromValue(value)
    this.buf.writeInt32BE(longValue.getHighBits(), this.offset)
    this.buf.writeInt32BE(longValue.getLowBits(), this.offset + INT32_SIZE)
    this.offset += INT64_SIZE
    return this
  }

  writeDouble(value) {
    this.ensureAvailable(DOUBLE_SIZE)
    this.buf.writeDoubleBE(value, this.offset)
    this.offset += DOUBLE_SIZE
    return this
  }

  writeBoolean(value) {
    value ? this.writeInt8(1) : this.writeInt8(0)
    return this
  }

  writeString(value) {
    if (value == null) {
      this.writeInt16(-1)
      return this
    }

    const byteLength = Buffer.byteLength(value, 'utf8')
    this.ensureAvailable(INT16_SIZE + byteLength)
    this.writeInt16(byteLength)
    this.buf.write(value, this.offset, byteLength, 'utf8')
    this.offset += byteLength
    return this
  }

  writeVarIntString(value) {
    if (value == null) {
      this.writeVarInt(-1)
      return this
    }

    const byteLength = Buffer.byteLength(value, 'utf8')
    this.writeVarInt(byteLength)
    this.ensureAvailable(byteLength)
    this.buf.write(value, this.offset, byteLength, 'utf8')
    this.offset += byteLength
    return this
  }

  writeUVarIntString(value) {
    if (value == null) {
      this.writeUVarInt(0)
      return this
    }

    const byteLength = Buffer.byteLength(value, 'utf8')
    this.writeUVarInt(byteLength + 1)
    this.ensureAvailable(byteLength)
    this.buf.write(value, this.offset, byteLength, 'utf8')
    this.offset += byteLength
    return this
  }

  writeBytes(value) {
    if (value == null) {
      this.writeInt32(-1)
      return this
    }

    if (Buffer.isBuffer(value)) {
      // raw bytes
      this.ensureAvailable(INT32_SIZE + value.length)
      this.writeInt32(value.length)
      this.writeBufferInternal(value)
    } else {
      const valueToWrite = String(value)
      const byteLength = Buffer.byteLength(valueToWrite, 'utf8')
      this.ensureAvailable(INT32_SIZE + byteLength)
      this.writeInt32(byteLength)
      this.buf.write(valueToWrite, this.offset, byteLength, 'utf8')
      this.offset += byteLength
    }

    return this
  }

  writeVarIntBytes(value) {
    if (value == null) {
      this.writeVarInt(-1)
      return this
    }

    if (Buffer.isBuffer(value)) {
      // raw bytes
      this.writeVarInt(value.length)
      this.writeBufferInternal(value)
    } else {
      const valueToWrite = String(value)
      const byteLength = Buffer.byteLength(valueToWrite, 'utf8')
      this.writeVarInt(byteLength)
      this.ensureAvailable(byteLength)
      this.buf.write(valueToWrite, this.offset, byteLength, 'utf8')
      this.offset += byteLength
    }

    return this
  }

  writeUVarIntBytes(value) {
    if (value == null) {
      this.writeVarInt(0)
      return this
    }

    if (Buffer.isBuffer(value)) {
      // raw bytes
      this.writeUVarInt(value.length + 1)
      this.writeBufferInternal(value)
    } else {
      const valueToWrite = String(value)
      const byteLength = Buffer.byteLength(valueToWrite, 'utf8')
      this.writeUVarInt(byteLength + 1)
      this.ensureAvailable(byteLength)
      this.buf.write(valueToWrite, this.offset, byteLength, 'utf8')
      this.offset += byteLength
    }

    return this
  }

  writeEncoder(value) {
    if (value == null || !Buffer.isBuffer(value.buf)) {
      throw new Error('value should be an instance of Encoder')
    }

    this.writeBufferInternal(value.buffer)
    return this
  }

  writeEncoderArray(value) {
    if (!Array.isArray(value) || value.some(v => v == null || !Buffer.isBuffer(v.buf))) {
      throw new Error('all values should be an instance of Encoder[]')
    }

    value.forEach(v => {
      this.writeBufferInternal(v.buffer)
    })
    return this
  }

  writeBuffer(value) {
    if (!Buffer.isBuffer(value)) {
      throw new Error('value should be an instance of Buffer')
    }

    this.writeBufferInternal(value)
    return this
  }

  /**
   * @param {any[]} array
   * @param {'int32'|'number'|'string'|'object'} [type]
   */
  writeNullableArray(array, type) {
    // A null value is encoded with length of -1 and there are no following bytes
    // On the context of this library, empty array and null are the same thing
    const length = array.length !== 0 ? array.length : -1
    this.writeArray(array, type, length)
    return this
  }

  /**
   * @param {any[]} array
   * @param {'int32'|'number'|'string'|'object'} [type]
   * @param {number} [length]
   */
  writeArray(array, type, length) {
    const arrayLength = length == null ? array.length : length
    this.writeInt32(arrayLength)
    if (type !== undefined) {
      switch (type) {
        case 'int32':
        case 'number':
          array.forEach(value => this.writeInt32(value))
          break
        case 'string':
          array.forEach(value => this.writeString(value))
          break
        case 'object':
          this.writeEncoderArray(array)
          break
      }
    } else {
      array.forEach(value => {
        switch (typeof value) {
          case 'number':
            this.writeInt32(value)
            break
          case 'string':
            this.writeString(value)
            break
          case 'object':
            this.writeEncoder(value)
            break
        }
      })
    }
    return this
  }

  writeVarIntArray(array, type) {
    if (type === 'object') {
      this.writeVarInt(array.length)
      this.writeEncoderArray(array)
    } else {
      const objectArray = array.filter(v => typeof v === 'object')
      this.writeVarInt(objectArray.length)
      this.writeEncoderArray(objectArray)
    }
    return this
  }

  writeUVarIntArray(array, type) {
    if (type === 'object') {
      this.writeUVarInt(array.length + 1)
      this.writeEncoderArray(array)
    } else {
      const objectArray = array.filter(v => typeof v === 'object')
      this.writeUVarInt(objectArray.length + 1)
      this.writeEncoderArray(objectArray)
    }
    return this
  }

  // Based on:
  // https://en.wikipedia.org/wiki/LEB128 Using LEB128 format similar to VLQ.
  // https://github.com/addthis/stream-lib/blob/master/src/main/java/com/clearspring/analytics/util/Varint.java#L106
  writeVarInt(value) {
    return this.writeUVarInt(Encoder.encodeZigZag(value))
  }

  writeUVarInt(value) {
    const byteArray = []
    while ((value & UNSIGNED_INT32_MAX_NUMBER) !== 0) {
      byteArray.push((value & OTHER_BITS) | MOST_SIGNIFICANT_BIT)
      value >>>= 7
    }
    byteArray.push(value & OTHER_BITS)
    this.writeBufferInternal(Buffer.from(byteArray))
    return this
  }

  writeVarLong(value) {
    const byteArray = []
    let longValue = Encoder.encodeZigZag64(value)

    while (longValue.and(UNSIGNED_INT64_MAX_NUMBER).notEquals(Long.fromInt(0))) {
      byteArray.push(
        longValue
          .and(OTHER_BITS)
          .or(MOST_SIGNIFICANT_BIT)
          .toInt()
      )
      longValue = longValue.shiftRightUnsigned(7)
    }

    byteArray.push(longValue.toInt())

    this.writeBufferInternal(Buffer.from(byteArray))
    return this
  }

  size() {
    // We can use the offset here directly, because we anyways will not re-encode the buffer when writing
    return this.offset
  }

  toJSON() {
    return this.buffer.toJSON()
  }
}


/***/ }),

/***/ 5903:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { KafkaJSProtocolError } = __nccwpck_require__(5073)
const websiteUrl = __nccwpck_require__(7274)

const errorCodes = [
  {
    type: 'UNKNOWN',
    code: -1,
    retriable: false,
    message: 'The server experienced an unexpected error when processing the request',
  },
  {
    type: 'OFFSET_OUT_OF_RANGE',
    code: 1,
    retriable: false,
    message: 'The requested offset is not within the range of offsets maintained by the server',
  },
  {
    type: 'CORRUPT_MESSAGE',
    code: 2,
    retriable: true,
    message:
      'This message has failed its CRC checksum, exceeds the valid size, or is otherwise corrupt',
  },
  {
    type: 'UNKNOWN_TOPIC_OR_PARTITION',
    code: 3,
    retriable: true,
    message: 'This server does not host this topic-partition',
  },
  {
    type: 'INVALID_FETCH_SIZE',
    code: 4,
    retriable: false,
    message: 'The requested fetch size is invalid',
  },
  {
    type: 'LEADER_NOT_AVAILABLE',
    code: 5,
    retriable: true,
    message:
      'There is no leader for this topic-partition as we are in the middle of a leadership election',
  },
  {
    type: 'NOT_LEADER_FOR_PARTITION',
    code: 6,
    retriable: true,
    message: 'This server is not the leader for that topic-partition',
  },
  {
    type: 'REQUEST_TIMED_OUT',
    code: 7,
    retriable: true,
    message: 'The request timed out',
  },
  {
    type: 'BROKER_NOT_AVAILABLE',
    code: 8,
    retriable: false,
    message: 'The broker is not available',
  },
  {
    type: 'REPLICA_NOT_AVAILABLE',
    code: 9,
    retriable: true,
    message: 'The replica is not available for the requested topic-partition',
  },
  {
    type: 'MESSAGE_TOO_LARGE',
    code: 10,
    retriable: false,
    message:
      'The request included a message larger than the max message size the server will accept',
  },
  {
    type: 'STALE_CONTROLLER_EPOCH',
    code: 11,
    retriable: false,
    message: 'The controller moved to another broker',
  },
  {
    type: 'OFFSET_METADATA_TOO_LARGE',
    code: 12,
    retriable: false,
    message: 'The metadata field of the offset request was too large',
  },
  {
    type: 'NETWORK_EXCEPTION',
    code: 13,
    retriable: true,
    message: 'The server disconnected before a response was received',
  },
  {
    type: 'GROUP_LOAD_IN_PROGRESS',
    code: 14,
    retriable: true,
    message: "The coordinator is loading and hence can't process requests for this group",
  },
  {
    type: 'GROUP_COORDINATOR_NOT_AVAILABLE',
    code: 15,
    retriable: true,
    message: 'The group coordinator is not available',
  },
  {
    type: 'NOT_COORDINATOR_FOR_GROUP',
    code: 16,
    retriable: true,
    message: 'This is not the correct coordinator for this group',
  },
  {
    type: 'INVALID_TOPIC_EXCEPTION',
    code: 17,
    retriable: false,
    message: 'The request attempted to perform an operation on an invalid topic',
  },
  {
    type: 'RECORD_LIST_TOO_LARGE',
    code: 18,
    retriable: false,
    message:
      'The request included message batch larger than the configured segment size on the server',
  },
  {
    type: 'NOT_ENOUGH_REPLICAS',
    code: 19,
    retriable: true,
    message: 'Messages are rejected since there are fewer in-sync replicas than required',
  },
  {
    type: 'NOT_ENOUGH_REPLICAS_AFTER_APPEND',
    code: 20,
    retriable: true,
    message: 'Messages are written to the log, but to fewer in-sync replicas than required',
  },
  {
    type: 'INVALID_REQUIRED_ACKS',
    code: 21,
    retriable: false,
    message: 'Produce request specified an invalid value for required acks',
  },
  {
    type: 'ILLEGAL_GENERATION',
    code: 22,
    retriable: false,
    message: 'Specified group generation id is not valid',
  },
  {
    type: 'INCONSISTENT_GROUP_PROTOCOL',
    code: 23,
    retriable: false,
    message:
      "The group member's supported protocols are incompatible with those of existing members",
  },
  {
    type: 'INVALID_GROUP_ID',
    code: 24,
    retriable: false,
    message: 'The configured groupId is invalid',
  },
  {
    type: 'UNKNOWN_MEMBER_ID',
    code: 25,
    retriable: false,
    message: 'The coordinator is not aware of this member',
  },
  {
    type: 'INVALID_SESSION_TIMEOUT',
    code: 26,
    retriable: false,
    message:
      'The session timeout is not within the range allowed by the broker (as configured by group.min.session.timeout.ms and group.max.session.timeout.ms)',
  },
  {
    type: 'REBALANCE_IN_PROGRESS',
    code: 27,
    retriable: false,
    message: 'The group is rebalancing, so a rejoin is needed',
    helpUrl: websiteUrl('docs/faq', 'what-does-it-mean-to-get-rebalance-in-progress-errors'),
  },
  {
    type: 'INVALID_COMMIT_OFFSET_SIZE',
    code: 28,
    retriable: false,
    message: 'The committing offset data size is not valid',
  },
  {
    type: 'TOPIC_AUTHORIZATION_FAILED',
    code: 29,
    retriable: false,
    message: 'Not authorized to access topics: [Topic authorization failed]',
  },
  {
    type: 'GROUP_AUTHORIZATION_FAILED',
    code: 30,
    retriable: false,
    message: 'Not authorized to access group: Group authorization failed',
  },
  {
    type: 'CLUSTER_AUTHORIZATION_FAILED',
    code: 31,
    retriable: false,
    message: 'Cluster authorization failed',
  },
  {
    type: 'INVALID_TIMESTAMP',
    code: 32,
    retriable: false,
    message: 'The timestamp of the message is out of acceptable range',
  },
  {
    type: 'UNSUPPORTED_SASL_MECHANISM',
    code: 33,
    retriable: false,
    message: 'The broker does not support the requested SASL mechanism',
  },
  {
    type: 'ILLEGAL_SASL_STATE',
    code: 34,
    retriable: false,
    message: 'Request is not valid given the current SASL state',
  },
  {
    type: 'UNSUPPORTED_VERSION',
    code: 35,
    retriable: false,
    message: 'The version of API is not supported',
  },
  {
    type: 'TOPIC_ALREADY_EXISTS',
    code: 36,
    retriable: false,
    message: 'Topic with this name already exists',
  },
  {
    type: 'INVALID_PARTITIONS',
    code: 37,
    retriable: false,
    message: 'Number of partitions is invalid',
  },
  {
    type: 'INVALID_REPLICATION_FACTOR',
    code: 38,
    retriable: false,
    message: 'Replication-factor is invalid',
  },
  {
    type: 'INVALID_REPLICA_ASSIGNMENT',
    code: 39,
    retriable: false,
    message: 'Replica assignment is invalid',
  },
  {
    type: 'INVALID_CONFIG',
    code: 40,
    retriable: false,
    message: 'Configuration is invalid',
  },
  {
    type: 'NOT_CONTROLLER',
    code: 41,
    retriable: true,
    message: 'This is not the correct controller for this cluster',
  },
  {
    type: 'INVALID_REQUEST',
    code: 42,
    retriable: false,
    message:
      'This most likely occurs because of a request being malformed by the client library or the message was sent to an incompatible broker. See the broker logs for more details',
  },
  {
    type: 'UNSUPPORTED_FOR_MESSAGE_FORMAT',
    code: 43,
    retriable: false,
    message: 'The message format version on the broker does not support the request',
  },
  {
    type: 'POLICY_VIOLATION',
    code: 44,
    retriable: false,
    message: 'Request parameters do not satisfy the configured policy',
  },
  {
    type: 'OUT_OF_ORDER_SEQUENCE_NUMBER',
    code: 45,
    retriable: false,
    message: 'The broker received an out of order sequence number',
  },
  {
    type: 'DUPLICATE_SEQUENCE_NUMBER',
    code: 46,
    retriable: false,
    message: 'The broker received a duplicate sequence number',
  },
  {
    type: 'INVALID_PRODUCER_EPOCH',
    code: 47,
    retriable: false,
    message:
      "Producer attempted an operation with an old epoch. Either there is a newer producer with the same transactionalId, or the producer's transaction has been expired by the broker",
  },
  {
    type: 'INVALID_TXN_STATE',
    code: 48,
    retriable: false,
    message: 'The producer attempted a transactional operation in an invalid state',
  },
  {
    type: 'INVALID_PRODUCER_ID_MAPPING',
    code: 49,
    retriable: false,
    message:
      'The producer attempted to use a producer id which is not currently assigned to its transactional id',
  },
  {
    type: 'INVALID_TRANSACTION_TIMEOUT',
    code: 50,
    retriable: false,
    message:
      'The transaction timeout is larger than the maximum value allowed by the broker (as configured by max.transaction.timeout.ms)',
  },
  {
    type: 'CONCURRENT_TRANSACTIONS',
    code: 51,
    /**
     * The concurrent transactions error has "retriable" set to false on the protocol documentation (https://kafka.apache.org/protocol.html#protocol_error_codes)
     * but the server expects the clients to retry. PR #223
     * @see https://github.com/apache/kafka/blob/12f310d50e7f5b1c18c4f61a119a6cd830da3bc0/core/src/main/scala/kafka/coordinator/transaction/TransactionCoordinator.scala#L153
     */
    retriable: true,
    message:
      'The producer attempted to update a transaction while another concurrent operation on the same transaction was ongoing',
  },
  {
    type: 'TRANSACTION_COORDINATOR_FENCED',
    code: 52,
    retriable: false,
    message:
      'Indicates that the transaction coordinator sending a WriteTxnMarker is no longer the current coordinator for a given producer',
  },
  {
    type: 'TRANSACTIONAL_ID_AUTHORIZATION_FAILED',
    code: 53,
    retriable: false,
    message: 'Transactional Id authorization failed',
  },
  {
    type: 'SECURITY_DISABLED',
    code: 54,
    retriable: false,
    message: 'Security features are disabled',
  },
  {
    type: 'OPERATION_NOT_ATTEMPTED',
    code: 55,
    retriable: false,
    message:
      'The broker did not attempt to execute this operation. This may happen for batched RPCs where some operations in the batch failed, causing the broker to respond without trying the rest',
  },
  {
    type: 'KAFKA_STORAGE_ERROR',
    code: 56,
    retriable: true,
    message: 'Disk error when trying to access log file on the disk',
  },
  {
    type: 'LOG_DIR_NOT_FOUND',
    code: 57,
    retriable: false,
    message: 'The user-specified log directory is not found in the broker config',
  },
  {
    type: 'SASL_AUTHENTICATION_FAILED',
    code: 58,
    retriable: false,
    message: 'SASL Authentication failed',
    helpUrl: websiteUrl('docs/configuration', 'sasl'),
  },
  {
    type: 'UNKNOWN_PRODUCER_ID',
    code: 59,
    retriable: false,
    message:
      "This exception is raised by the broker if it could not locate the producer metadata associated with the producerId in question. This could happen if, for instance, the producer's records were deleted because their retention time had elapsed. Once the last records of the producerId are removed, the producer's metadata is removed from the broker, and future appends by the producer will return this exception",
  },
  {
    type: 'REASSIGNMENT_IN_PROGRESS',
    code: 60,
    retriable: false,
    message: 'A partition reassignment is in progress',
  },
  {
    type: 'DELEGATION_TOKEN_AUTH_DISABLED',
    code: 61,
    retriable: false,
    message: 'Delegation Token feature is not enabled',
  },
  {
    type: 'DELEGATION_TOKEN_NOT_FOUND',
    code: 62,
    retriable: false,
    message: 'Delegation Token is not found on server',
  },
  {
    type: 'DELEGATION_TOKEN_OWNER_MISMATCH',
    code: 63,
    retriable: false,
    message: 'Specified Principal is not valid Owner/Renewer',
  },
  {
    type: 'DELEGATION_TOKEN_REQUEST_NOT_ALLOWED',
    code: 64,
    retriable: false,
    message:
      'Delegation Token requests are not allowed on PLAINTEXT/1-way SSL channels and on delegation token authenticated channels',
  },
  {
    type: 'DELEGATION_TOKEN_AUTHORIZATION_FAILED',
    code: 65,
    retriable: false,
    message: 'Delegation Token authorization failed',
  },
  {
    type: 'DELEGATION_TOKEN_EXPIRED',
    code: 66,
    retriable: false,
    message: 'Delegation Token is expired',
  },
  {
    type: 'INVALID_PRINCIPAL_TYPE',
    code: 67,
    retriable: false,
    message: 'Supplied principalType is not supported',
  },
  {
    type: 'NON_EMPTY_GROUP',
    code: 68,
    retriable: false,
    message: 'The group is not empty',
  },
  {
    type: 'GROUP_ID_NOT_FOUND',
    code: 69,
    retriable: false,
    message: 'The group id was not found',
  },
  {
    type: 'FETCH_SESSION_ID_NOT_FOUND',
    code: 70,
    retriable: true,
    message: 'The fetch session ID was not found',
  },
  {
    type: 'INVALID_FETCH_SESSION_EPOCH',
    code: 71,
    retriable: true,
    message: 'The fetch session epoch is invalid',
  },
  {
    type: 'LISTENER_NOT_FOUND',
    code: 72,
    retriable: true,
    message:
      'There is no listener on the leader broker that matches the listener on which metadata request was processed',
  },
  {
    type: 'TOPIC_DELETION_DISABLED',
    code: 73,
    retriable: false,
    message: 'Topic deletion is disabled',
  },
  {
    type: 'FENCED_LEADER_EPOCH',
    code: 74,
    retriable: true,
    message: 'The leader epoch in the request is older than the epoch on the broker',
  },
  {
    type: 'UNKNOWN_LEADER_EPOCH',
    code: 75,
    retriable: true,
    message: 'The leader epoch in the request is newer than the epoch on the broker',
  },
  {
    type: 'UNSUPPORTED_COMPRESSION_TYPE',
    code: 76,
    retriable: false,
    message: 'The requesting client does not support the compression type of given partition',
  },
  {
    type: 'STALE_BROKER_EPOCH',
    code: 77,
    retriable: false,
    message: 'Broker epoch has changed',
  },
  {
    type: 'OFFSET_NOT_AVAILABLE',
    code: 78,
    retriable: true,
    message:
      'The leader high watermark has not caught up from a recent leader election so the offsets cannot be guaranteed to be monotonically increasing',
  },
  {
    type: 'MEMBER_ID_REQUIRED',
    code: 79,
    retriable: false,
    message:
      'The group member needs to have a valid member id before actually entering a consumer group',
  },
  {
    type: 'PREFERRED_LEADER_NOT_AVAILABLE',
    code: 80,
    retriable: true,
    message: 'The preferred leader was not available',
  },
  {
    type: 'GROUP_MAX_SIZE_REACHED',
    code: 81,
    retriable: false,
    message:
      'The consumer group has reached its max size. It already has the configured maximum number of members',
  },
  {
    type: 'FENCED_INSTANCE_ID',
    code: 82,
    retriable: false,
    message:
      'The broker rejected this static consumer since another consumer with the same group instance id has registered with a different member id',
  },
  {
    type: 'ELIGIBLE_LEADERS_NOT_AVAILABLE',
    code: 83,
    retriable: true,
    message: 'Eligible topic partition leaders are not available',
  },
  {
    type: 'ELECTION_NOT_NEEDED',
    code: 84,
    retriable: true,
    message: 'Leader election not needed for topic partition',
  },
  {
    type: 'NO_REASSIGNMENT_IN_PROGRESS',
    code: 85,
    retriable: false,
    message: 'No partition reassignment is in progress',
  },
  {
    type: 'GROUP_SUBSCRIBED_TO_TOPIC',
    code: 86,
    retriable: false,
    message:
      'Deleting offsets of a topic is forbidden while the consumer group is actively subscribed to it',
  },
  {
    type: 'INVALID_RECORD',
    code: 87,
    retriable: false,
    message: 'This record has failed the validation on broker and hence be rejected',
  },
  {
    type: 'UNSTABLE_OFFSET_COMMIT',
    code: 88,
    retriable: true,
    message: 'There are unstable offsets that need to be cleared',
  },
]

const unknownErrorCode = errorCode => ({
  type: 'KAFKAJS_UNKNOWN_ERROR_CODE',
  code: -99,
  retriable: false,
  message: `Unknown error code ${errorCode}`,
})

const SUCCESS_CODE = 0
const UNSUPPORTED_VERSION_CODE = 35

const failure = code => code !== SUCCESS_CODE
const createErrorFromCode = code => {
  return new KafkaJSProtocolError(errorCodes.find(e => e.code === code) || unknownErrorCode(code))
}

const failIfVersionNotSupported = code => {
  if (code === UNSUPPORTED_VERSION_CODE) {
    throw createErrorFromCode(UNSUPPORTED_VERSION_CODE)
  }
}

const staleMetadata = e =>
  ['UNKNOWN_TOPIC_OR_PARTITION', 'LEADER_NOT_AVAILABLE', 'NOT_LEADER_FOR_PARTITION'].includes(
    e.type
  )

module.exports = {
  failure,
  errorCodes,
  createErrorFromCode,
  failIfVersionNotSupported,
  staleMetadata,
}


/***/ }),

/***/ 4596:
/***/ ((module) => {

/**
 * Enum for isolation levels
 * @readonly
 * @enum {number}
 */
module.exports = {
  // Makes all records visible
  READ_UNCOMMITTED: 0,

  // non-transactional and COMMITTED transactional records are visible. It returns all data
  // from offsets smaller than the current LSO (last stable offset), and enables the inclusion of
  // the list of aborted transactions in the result, which allows consumers to discard ABORTED
  // transactional records
  READ_COMMITTED: 1,
}


/***/ }),

/***/ 7106:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { promisify } = __nccwpck_require__(3837)
const zlib = __nccwpck_require__(9796)

const gzip = promisify(zlib.gzip)
const unzip = promisify(zlib.unzip)

module.exports = {
  /**
   * @param {Encoder} encoder
   * @returns {Promise}
   */
  async compress(encoder) {
    return await gzip(encoder.buffer)
  },

  /**
   * @param {Buffer} buffer
   * @returns {Promise}
   */
  async decompress(buffer) {
    return await unzip(buffer)
  },
}


/***/ }),

/***/ 9719:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { KafkaJSNotImplemented } = __nccwpck_require__(5073)

const COMPRESSION_CODEC_MASK = 0x07

const Types = {
  None: 0,
  GZIP: 1,
  Snappy: 2,
  LZ4: 3,
  ZSTD: 4,
}

const Codecs = {
  [Types.GZIP]: () => __nccwpck_require__(7106),
  [Types.Snappy]: () => {
    throw new KafkaJSNotImplemented('Snappy compression not implemented')
  },
  [Types.LZ4]: () => {
    throw new KafkaJSNotImplemented('LZ4 compression not implemented')
  },
  [Types.ZSTD]: () => {
    throw new KafkaJSNotImplemented('ZSTD compression not implemented')
  },
}

const lookupCodec = type => (Codecs[type] ? Codecs[type]() : null)
const lookupCodecByAttributes = attributes => {
  const codec = Codecs[attributes & COMPRESSION_CODEC_MASK]
  return codec ? codec() : null
}

module.exports = {
  Types,
  Codecs,
  lookupCodec,
  lookupCodecByAttributes,
  COMPRESSION_CODEC_MASK,
}


/***/ }),

/***/ 7066:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {
  KafkaJSPartialMessageError,
  KafkaJSUnsupportedMagicByteInMessageSet,
} = __nccwpck_require__(5073)

const V0Decoder = __nccwpck_require__(8080)
const V1Decoder = __nccwpck_require__(6782)

const decodeMessage = (decoder, magicByte) => {
  switch (magicByte) {
    case 0:
      return V0Decoder(decoder)
    case 1:
      return V1Decoder(decoder)
    default:
      throw new KafkaJSUnsupportedMagicByteInMessageSet(
        `Unsupported MessageSet message version, magic byte: ${magicByte}`
      )
  }
}

module.exports = (offset, size, decoder) => {
  // Don't decrement decoder.offset because slice is already considering the current
  // offset of the decoder
  const remainingBytes = Buffer.byteLength(decoder.slice(size).buffer)

  if (remainingBytes < size) {
    throw new KafkaJSPartialMessageError(
      `Tried to decode a partial message: remainingBytes(${remainingBytes}) < messageSize(${size})`
    )
  }

  const crc = decoder.readInt32()
  const magicByte = decoder.readInt8()
  const message = decodeMessage(decoder, magicByte)
  return Object.assign({ offset, size, crc, magicByte }, message)
}


/***/ }),

/***/ 1102:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: __nccwpck_require__(5233),
  1: __nccwpck_require__(2792),
}

module.exports = ({ version = 0 }) => versions[version]


/***/ }),

/***/ 8080:
/***/ ((module) => {

module.exports = decoder => ({
  attributes: decoder.readInt8(),
  key: decoder.readBytes(),
  value: decoder.readBytes(),
})


/***/ }),

/***/ 5233:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const crc32 = __nccwpck_require__(5677)
const { Types: Compression, COMPRESSION_CODEC_MASK } = __nccwpck_require__(9719)

/**
 * v0
 * Message => Crc MagicByte Attributes Key Value
 *   Crc => int32
 *   MagicByte => int8
 *   Attributes => int8
 *   Key => bytes
 *   Value => bytes
 */

module.exports = ({ compression = Compression.None, key, value }) => {
  const content = new Encoder()
    .writeInt8(0) // magicByte
    .writeInt8(compression & COMPRESSION_CODEC_MASK)
    .writeBytes(key)
    .writeBytes(value)

  const crc = crc32(content)
  return new Encoder().writeInt32(crc).writeEncoder(content)
}


/***/ }),

/***/ 6782:
/***/ ((module) => {

module.exports = decoder => ({
  attributes: decoder.readInt8(),
  timestamp: decoder.readInt64().toString(),
  key: decoder.readBytes(),
  value: decoder.readBytes(),
})


/***/ }),

/***/ 2792:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const crc32 = __nccwpck_require__(5677)
const { Types: Compression, COMPRESSION_CODEC_MASK } = __nccwpck_require__(9719)

/**
 * v1 (supported since 0.10.0)
 * Message => Crc MagicByte Attributes Key Value
 *   Crc => int32
 *   MagicByte => int8
 *   Attributes => int8
 *   Timestamp => int64
 *   Key => bytes
 *   Value => bytes
 */

module.exports = ({ compression = Compression.None, timestamp = Date.now(), key, value }) => {
  const content = new Encoder()
    .writeInt8(1) // magicByte
    .writeInt8(compression & COMPRESSION_CODEC_MASK)
    .writeInt64(timestamp)
    .writeBytes(key)
    .writeBytes(value)

  const crc = crc32(content)
  return new Encoder().writeInt32(crc).writeEncoder(content)
}


/***/ }),

/***/ 6159:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)
const Decoder = __nccwpck_require__(9991)
const MessageDecoder = __nccwpck_require__(7066)
const { lookupCodecByAttributes } = __nccwpck_require__(9719)
const { KafkaJSPartialMessageError } = __nccwpck_require__(5073)

/**
 * MessageSet => [Offset MessageSize Message]
 *  Offset => int64
 *  MessageSize => int32
 *  Message => Bytes
 */

module.exports = async (primaryDecoder, size = null) => {
  const messages = []
  const messageSetSize = size || primaryDecoder.readInt32()
  const messageSetDecoder = primaryDecoder.slice(messageSetSize)

  while (messageSetDecoder.offset < messageSetSize) {
    try {
      const message = EntryDecoder(messageSetDecoder)
      const codec = lookupCodecByAttributes(message.attributes)

      if (codec) {
        const buffer = await codec.decompress(message.value)
        messages.push(...EntriesDecoder(new Decoder(buffer), message))
      } else {
        messages.push(message)
      }
    } catch (e) {
      if (e.name === 'KafkaJSPartialMessageError') {
        // We tried to decode a partial message, it means that minBytes
        // is probably too low
        break
      }

      if (e.name === 'KafkaJSUnsupportedMagicByteInMessageSet') {
        // Received a MessageSet and a RecordBatch on the same response, the cluster is probably
        // upgrading the message format from 0.10 to 0.11. Stop processing this message set to
        // receive the full record batch on the next request
        break
      }

      throw e
    }
  }

  primaryDecoder.forward(messageSetSize)
  return messages
}

const EntriesDecoder = (decoder, compressedMessage) => {
  const messages = []

  while (decoder.offset < decoder.buffer.length) {
    messages.push(EntryDecoder(decoder))
  }

  if (compressedMessage.magicByte > 0 && compressedMessage.offset >= 0) {
    const compressedOffset = Long.fromValue(compressedMessage.offset)
    const lastMessageOffset = Long.fromValue(messages[messages.length - 1].offset)
    const baseOffset = compressedOffset - lastMessageOffset

    for (const message of messages) {
      message.offset = Long.fromValue(message.offset)
        .add(baseOffset)
        .toString()
    }
  }

  return messages
}

const EntryDecoder = decoder => {
  if (!decoder.canReadInt64()) {
    throw new KafkaJSPartialMessageError(
      `Tried to decode a partial message: There isn't enough bytes to read the offset`
    )
  }

  const offset = decoder.readInt64().toString()

  if (!decoder.canReadInt32()) {
    throw new KafkaJSPartialMessageError(
      `Tried to decode a partial message: There isn't enough bytes to read the message size`
    )
  }

  const size = decoder.readInt32()
  return MessageDecoder(offset, size, decoder)
}


/***/ }),

/***/ 7911:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const MessageProtocol = __nccwpck_require__(1102)
const { Types } = __nccwpck_require__(9719)

/**
 * MessageSet => [Offset MessageSize Message]
 *  Offset => int64
 *  MessageSize => int32
 *  Message => Bytes
 */

/**
 * [
 *   { key: "<value>", value: "<value>" },
 *   { key: "<value>", value: "<value>" },
 * ]
 */
module.exports = ({ messageVersion = 0, compression, entries }) => {
  const isCompressed = compression !== Types.None
  const Message = MessageProtocol({ version: messageVersion })
  const encoder = new Encoder()

  // Messages in a message set are __not__ encoded as an array.
  // They are written in sequence.
  // https://cwiki.apache.org/confluence/display/KAFKA/A+Guide+To+The+Kafka+Protocol#AGuideToTheKafkaProtocol-Messagesets

  entries.forEach((entry, i) => {
    const message = Message(entry)

    // This is the offset used in kafka as the log sequence number.
    // When the producer is sending non compressed messages, it can set the offsets to anything
    // When the producer is sending compressed messages, to avoid server side recompression, each compressed message
    // should have offset starting from 0 and increasing by one for each inner message in the compressed message
    encoder.writeInt64(isCompressed ? i : -1)
    encoder.writeInt32(message.size())

    encoder.writeEncoder(message)
  })

  return encoder
}


/***/ }),

/***/ 3053:
/***/ ((module) => {

/**
 * A javascript implementation of the CRC32 checksum that uses
 * the CRC32-C polynomial, the same polynomial used by iSCSI
 *
 * also known as CRC32 Castagnoli
 * based on: https://github.com/ashi009/node-fast-crc32c/blob/master/impls/js_crc32c.js
 */
const crc32C = buffer => {
  let crc = 0 ^ -1
  for (let i = 0; i < buffer.length; i++) {
    crc = T[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8)
  }

  return (crc ^ -1) >>> 0
}

module.exports = crc32C

// prettier-ignore
var T = new Int32Array([
  0x00000000, 0xf26b8303, 0xe13b70f7, 0x1350f3f4,
  0xc79a971f, 0x35f1141c, 0x26a1e7e8, 0xd4ca64eb,
  0x8ad958cf, 0x78b2dbcc, 0x6be22838, 0x9989ab3b,
  0x4d43cfd0, 0xbf284cd3, 0xac78bf27, 0x5e133c24,
  0x105ec76f, 0xe235446c, 0xf165b798, 0x030e349b,
  0xd7c45070, 0x25afd373, 0x36ff2087, 0xc494a384,
  0x9a879fa0, 0x68ec1ca3, 0x7bbcef57, 0x89d76c54,
  0x5d1d08bf, 0xaf768bbc, 0xbc267848, 0x4e4dfb4b,
  0x20bd8ede, 0xd2d60ddd, 0xc186fe29, 0x33ed7d2a,
  0xe72719c1, 0x154c9ac2, 0x061c6936, 0xf477ea35,
  0xaa64d611, 0x580f5512, 0x4b5fa6e6, 0xb93425e5,
  0x6dfe410e, 0x9f95c20d, 0x8cc531f9, 0x7eaeb2fa,
  0x30e349b1, 0xc288cab2, 0xd1d83946, 0x23b3ba45,
  0xf779deae, 0x05125dad, 0x1642ae59, 0xe4292d5a,
  0xba3a117e, 0x4851927d, 0x5b016189, 0xa96ae28a,
  0x7da08661, 0x8fcb0562, 0x9c9bf696, 0x6ef07595,
  0x417b1dbc, 0xb3109ebf, 0xa0406d4b, 0x522bee48,
  0x86e18aa3, 0x748a09a0, 0x67dafa54, 0x95b17957,
  0xcba24573, 0x39c9c670, 0x2a993584, 0xd8f2b687,
  0x0c38d26c, 0xfe53516f, 0xed03a29b, 0x1f682198,
  0x5125dad3, 0xa34e59d0, 0xb01eaa24, 0x42752927,
  0x96bf4dcc, 0x64d4cecf, 0x77843d3b, 0x85efbe38,
  0xdbfc821c, 0x2997011f, 0x3ac7f2eb, 0xc8ac71e8,
  0x1c661503, 0xee0d9600, 0xfd5d65f4, 0x0f36e6f7,
  0x61c69362, 0x93ad1061, 0x80fde395, 0x72966096,
  0xa65c047d, 0x5437877e, 0x4767748a, 0xb50cf789,
  0xeb1fcbad, 0x197448ae, 0x0a24bb5a, 0xf84f3859,
  0x2c855cb2, 0xdeeedfb1, 0xcdbe2c45, 0x3fd5af46,
  0x7198540d, 0x83f3d70e, 0x90a324fa, 0x62c8a7f9,
  0xb602c312, 0x44694011, 0x5739b3e5, 0xa55230e6,
  0xfb410cc2, 0x092a8fc1, 0x1a7a7c35, 0xe811ff36,
  0x3cdb9bdd, 0xceb018de, 0xdde0eb2a, 0x2f8b6829,
  0x82f63b78, 0x709db87b, 0x63cd4b8f, 0x91a6c88c,
  0x456cac67, 0xb7072f64, 0xa457dc90, 0x563c5f93,
  0x082f63b7, 0xfa44e0b4, 0xe9141340, 0x1b7f9043,
  0xcfb5f4a8, 0x3dde77ab, 0x2e8e845f, 0xdce5075c,
  0x92a8fc17, 0x60c37f14, 0x73938ce0, 0x81f80fe3,
  0x55326b08, 0xa759e80b, 0xb4091bff, 0x466298fc,
  0x1871a4d8, 0xea1a27db, 0xf94ad42f, 0x0b21572c,
  0xdfeb33c7, 0x2d80b0c4, 0x3ed04330, 0xccbbc033,
  0xa24bb5a6, 0x502036a5, 0x4370c551, 0xb11b4652,
  0x65d122b9, 0x97baa1ba, 0x84ea524e, 0x7681d14d,
  0x2892ed69, 0xdaf96e6a, 0xc9a99d9e, 0x3bc21e9d,
  0xef087a76, 0x1d63f975, 0x0e330a81, 0xfc588982,
  0xb21572c9, 0x407ef1ca, 0x532e023e, 0xa145813d,
  0x758fe5d6, 0x87e466d5, 0x94b49521, 0x66df1622,
  0x38cc2a06, 0xcaa7a905, 0xd9f75af1, 0x2b9cd9f2,
  0xff56bd19, 0x0d3d3e1a, 0x1e6dcdee, 0xec064eed,
  0xc38d26c4, 0x31e6a5c7, 0x22b65633, 0xd0ddd530,
  0x0417b1db, 0xf67c32d8, 0xe52cc12c, 0x1747422f,
  0x49547e0b, 0xbb3ffd08, 0xa86f0efc, 0x5a048dff,
  0x8ecee914, 0x7ca56a17, 0x6ff599e3, 0x9d9e1ae0,
  0xd3d3e1ab, 0x21b862a8, 0x32e8915c, 0xc083125f,
  0x144976b4, 0xe622f5b7, 0xf5720643, 0x07198540,
  0x590ab964, 0xab613a67, 0xb831c993, 0x4a5a4a90,
  0x9e902e7b, 0x6cfbad78, 0x7fab5e8c, 0x8dc0dd8f,
  0xe330a81a, 0x115b2b19, 0x020bd8ed, 0xf0605bee,
  0x24aa3f05, 0xd6c1bc06, 0xc5914ff2, 0x37faccf1,
  0x69e9f0d5, 0x9b8273d6, 0x88d28022, 0x7ab90321,
  0xae7367ca, 0x5c18e4c9, 0x4f48173d, 0xbd23943e,
  0xf36e6f75, 0x0105ec76, 0x12551f82, 0xe03e9c81,
  0x34f4f86a, 0xc69f7b69, 0xd5cf889d, 0x27a40b9e,
  0x79b737ba, 0x8bdcb4b9, 0x988c474d, 0x6ae7c44e,
  0xbe2da0a5, 0x4c4623a6, 0x5f16d052, 0xad7d5351
]);


/***/ }),

/***/ 1466:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const crc32C = __nccwpck_require__(3053)
const unsigned = value => Uint32Array.from([value])[0]

module.exports = buffer => unsigned(crc32C(buffer))


/***/ }),

/***/ 5081:
/***/ ((module) => {

module.exports = decoder => ({
  key: decoder.readVarIntString(),
  value: decoder.readVarIntBytes(),
})


/***/ }),

/***/ 7001:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)

/**
 * v0
 * Header => Key Value
 *   Key => varInt|string
 *   Value => varInt|bytes
 */

module.exports = ({ key, value }) => {
  return new Encoder().writeVarIntString(key).writeVarIntBytes(value)
}


/***/ }),

/***/ 1725:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)
const HeaderDecoder = __nccwpck_require__(5081)
const TimestampTypes = __nccwpck_require__(5070)

/**
 * v0
 * Record =>
 *   Length => Varint
 *   Attributes => Int8
 *   TimestampDelta => Varlong
 *   OffsetDelta => Varint
 *   Key => varInt|Bytes
 *   Value => varInt|Bytes
 *   Headers => [HeaderKey HeaderValue]
 *     HeaderKey => VarInt|String
 *     HeaderValue => VarInt|Bytes
 */

module.exports = (decoder, batchContext = {}) => {
  const {
    firstOffset,
    firstTimestamp,
    magicByte,
    isControlBatch = false,
    timestampType,
    maxTimestamp,
  } = batchContext
  const attributes = decoder.readInt8()

  const timestampDelta = decoder.readVarLong()
  const timestamp =
    timestampType === TimestampTypes.LOG_APPEND_TIME && maxTimestamp
      ? maxTimestamp
      : Long.fromValue(firstTimestamp)
          .add(timestampDelta)
          .toString()

  const offsetDelta = decoder.readVarInt()
  const offset = Long.fromValue(firstOffset)
    .add(offsetDelta)
    .toString()

  const key = decoder.readVarIntBytes()
  const value = decoder.readVarIntBytes()
  const headers = decoder.readVarIntArray(HeaderDecoder).reduce(
    (obj, { key, value }) => ({
      ...obj,
      [key]:
        obj[key] === undefined
          ? value
          : Array.isArray(obj[key])
          ? obj[key].concat([value])
          : [obj[key], value],
    }),
    {}
  )

  return {
    magicByte,
    attributes, // Record level attributes are presently unused
    timestamp,
    offset,
    key,
    value,
    headers,
    isControlRecord: isControlBatch,
    batchContext,
  }
}


/***/ }),

/***/ 502:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const Header = __nccwpck_require__(7001)

/**
 * v0
 * Record =>
 *   Length => Varint
 *   Attributes => Int8
 *   TimestampDelta => Varlong
 *   OffsetDelta => Varint
 *   Key => varInt|Bytes
 *   Value => varInt|Bytes
 *   Headers => [HeaderKey HeaderValue]
 *     HeaderKey => VarInt|String
 *     HeaderValue => VarInt|Bytes
 */

/**
 * @param [offsetDelta=0] {Integer}
 * @param [timestampDelta=0] {Long}
 * @param key {Buffer}
 * @param value {Buffer}
 * @param [headers={}] {Object}
 */
module.exports = ({ offsetDelta = 0, timestampDelta = 0, key, value, headers = {} }) => {
  const headersArray = Object.keys(headers).flatMap(headerKey =>
    !Array.isArray(headers[headerKey])
      ? [{ key: headerKey, value: headers[headerKey] }]
      : headers[headerKey].map(headerValue => ({ key: headerKey, value: headerValue }))
  )

  const sizeOfBody =
    1 + // always one byte for attributes
    Encoder.sizeOfVarLong(timestampDelta) +
    Encoder.sizeOfVarInt(offsetDelta) +
    Encoder.sizeOfVarIntBytes(key) +
    Encoder.sizeOfVarIntBytes(value) +
    sizeOfHeaders(headersArray)

  return new Encoder()
    .writeVarInt(sizeOfBody)
    .writeInt8(0) // no used record attributes at the moment
    .writeVarLong(timestampDelta)
    .writeVarInt(offsetDelta)
    .writeVarIntBytes(key)
    .writeVarIntBytes(value)
    .writeVarIntArray(headersArray.map(Header))
}

const sizeOfHeaders = headersArray => {
  let size = Encoder.sizeOfVarInt(headersArray.length)

  for (const header of headersArray) {
    const keySize = Buffer.byteLength(header.key)
    const valueSize = Buffer.byteLength(header.value)

    size += Encoder.sizeOfVarInt(keySize) + keySize

    if (header.value === null) {
      size += Encoder.sizeOfVarInt(-1)
    } else {
      size += Encoder.sizeOfVarInt(valueSize) + valueSize
    }
  }

  return size
}


/***/ }),

/***/ 9099:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { KafkaJSPartialMessageError } = __nccwpck_require__(5073)
const { lookupCodecByAttributes } = __nccwpck_require__(9719)
const RecordDecoder = __nccwpck_require__(1725)
const TimestampTypes = __nccwpck_require__(5070)

const TIMESTAMP_TYPE_FLAG_MASK = 0x8
const TRANSACTIONAL_FLAG_MASK = 0x10
const CONTROL_FLAG_MASK = 0x20

/**
 * v0
 * RecordBatch =>
 *  FirstOffset => int64
 *  Length => int32
 *  PartitionLeaderEpoch => int32
 *  Magic => int8
 *  CRC => int32
 *  Attributes => int16
 *  LastOffsetDelta => int32
 *  FirstTimestamp => int64
 *  MaxTimestamp => int64
 *  ProducerId => int64
 *  ProducerEpoch => int16
 *  FirstSequence => int32
 *  Records => [Record]
 */

module.exports = async fetchDecoder => {
  const firstOffset = fetchDecoder.readInt64().toString()
  const length = fetchDecoder.readInt32()
  const decoder = fetchDecoder.slice(length)
  fetchDecoder.forward(length)

  const remainingBytes = Buffer.byteLength(decoder.buffer)

  if (remainingBytes < length) {
    throw new KafkaJSPartialMessageError(
      `Tried to decode a partial record batch: remainingBytes(${remainingBytes}) < recordBatchLength(${length})`
    )
  }

  const partitionLeaderEpoch = decoder.readInt32()

  // The magic byte was read by the Fetch protocol to distinguish between
  // the record batch and the legacy message set. It's not used here but
  // it has to be read.
  const magicByte = decoder.readInt8() // eslint-disable-line no-unused-vars

  // The library is currently not performing CRC validations
  const crc = decoder.readInt32() // eslint-disable-line no-unused-vars

  const attributes = decoder.readInt16()
  const lastOffsetDelta = decoder.readInt32()
  const firstTimestamp = decoder.readInt64().toString()
  const maxTimestamp = decoder.readInt64().toString()
  const producerId = decoder.readInt64().toString()
  const producerEpoch = decoder.readInt16()
  const firstSequence = decoder.readInt32()

  const inTransaction = (attributes & TRANSACTIONAL_FLAG_MASK) > 0
  const isControlBatch = (attributes & CONTROL_FLAG_MASK) > 0
  const timestampType =
    (attributes & TIMESTAMP_TYPE_FLAG_MASK) > 0
      ? TimestampTypes.LOG_APPEND_TIME
      : TimestampTypes.CREATE_TIME

  const codec = lookupCodecByAttributes(attributes)

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
    timestampType,
  }

  const records = await decodeRecords(codec, decoder, { ...recordContext, magicByte })

  return {
    ...recordContext,
    records,
  }
}

const decodeRecords = async (codec, recordsDecoder, recordContext) => {
  if (!codec) {
    return recordsDecoder.readArray(decoder => decodeRecord(decoder, recordContext))
  }

  const length = recordsDecoder.readInt32()

  if (length <= 0) {
    return []
  }

  const compressedRecordsBuffer = recordsDecoder.readAll()
  const decompressedRecordBuffer = await codec.decompress(compressedRecordsBuffer)
  const decompressedRecordDecoder = new Decoder(decompressedRecordBuffer)
  const records = new Array(length)

  for (let i = 0; i < length; i++) {
    records[i] = decodeRecord(decompressedRecordDecoder, recordContext)
  }

  return records
}

const decodeRecord = (decoder, recordContext) => {
  const recordBuffer = decoder.readVarIntBytes()
  return RecordDecoder(new Decoder(recordBuffer), recordContext)
}


/***/ }),

/***/ 1015:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)
const Encoder = __nccwpck_require__(843)
const crc32C = __nccwpck_require__(1466)
const {
  Types: Compression,
  lookupCodec,
  COMPRESSION_CODEC_MASK,
} = __nccwpck_require__(9719)

const MAGIC_BYTE = 2
const TIMESTAMP_MASK = 0 // The fourth lowest bit, always set this bit to 0 (since 0.10.0)
const TRANSACTIONAL_MASK = 16 // The fifth lowest bit

/**
 * v0
 * RecordBatch =>
 *  FirstOffset => int64
 *  Length => int32
 *  PartitionLeaderEpoch => int32
 *  Magic => int8
 *  CRC => int32
 *  Attributes => int16
 *  LastOffsetDelta => int32
 *  FirstTimestamp => int64
 *  MaxTimestamp => int64
 *  ProducerId => int64
 *  ProducerEpoch => int16
 *  FirstSequence => int32
 *  Records => [Record]
 */

const RecordBatch = async ({
  compression = Compression.None,
  firstOffset = Long.fromInt(0),
  firstTimestamp = Date.now(),
  maxTimestamp = Date.now(),
  partitionLeaderEpoch = 0,
  lastOffsetDelta = 0,
  transactional = false,
  producerId = Long.fromValue(-1), // for idempotent messages
  producerEpoch = 0, // for idempotent messages
  firstSequence = 0, // for idempotent messages
  records = [],
}) => {
  const COMPRESSION_CODEC = compression & COMPRESSION_CODEC_MASK
  const IN_TRANSACTION = transactional ? TRANSACTIONAL_MASK : 0
  const attributes = COMPRESSION_CODEC | TIMESTAMP_MASK | IN_TRANSACTION

  const batchBody = new Encoder()
    .writeInt16(attributes)
    .writeInt32(lastOffsetDelta)
    .writeInt64(firstTimestamp)
    .writeInt64(maxTimestamp)
    .writeInt64(producerId)
    .writeInt16(producerEpoch)
    .writeInt32(firstSequence)

  if (compression === Compression.None) {
    if (records.every(v => typeof v === typeof records[0])) {
      batchBody.writeArray(records, typeof records[0])
    } else {
      batchBody.writeArray(records)
    }
  } else {
    const compressedRecords = await compressRecords(compression, records)
    batchBody.writeInt32(records.length).writeBuffer(compressedRecords)
  }

  // CRC32C validation is happening here:
  // https://github.com/apache/kafka/blob/0.11.0.1/clients/src/main/java/org/apache/kafka/common/record/DefaultRecordBatch.java#L148

  const batch = new Encoder()
    .writeInt32(partitionLeaderEpoch)
    .writeInt8(MAGIC_BYTE)
    .writeUInt32(crc32C(batchBody.buffer))
    .writeEncoder(batchBody)

  return new Encoder().writeInt64(firstOffset).writeBytes(batch.buffer)
}

const compressRecords = async (compression, records) => {
  const codec = lookupCodec(compression)
  const recordsEncoder = new Encoder()

  recordsEncoder.writeEncoderArray(records)

  return codec.compress(recordsEncoder)
}

module.exports = {
  RecordBatch,
  MAGIC_BYTE,
}


/***/ }),

/***/ 9964:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)

module.exports = async ({ correlationId, clientId, request: { apiKey, apiVersion, encode } }) => {
  const payload = await encode()
  const requestPayload = new Encoder()
    .writeInt16(apiKey)
    .writeInt16(apiVersion)
    .writeInt32(correlationId)
    .writeString(clientId)
    .writeEncoder(payload)

  return new Encoder().writeInt32(requestPayload.size()).writeEncoder(requestPayload)
}


/***/ }),

/***/ 6158:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ transactionalId, producerId, producerEpoch, groupId }) => {
    const request = __nccwpck_require__(6931)
    const response = __nccwpck_require__(2021)
    return { request: request({ transactionalId, producerId, producerEpoch, groupId }), response }
  },
  1: ({ transactionalId, producerId, producerEpoch, groupId }) => {
    const request = __nccwpck_require__(9151)
    const response = __nccwpck_require__(4035)
    return { request: request({ transactionalId, producerId, producerEpoch, groupId }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 6931:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { AddOffsetsToTxn: apiKey } = __nccwpck_require__(686)

/**
 * AddOffsetsToTxn Request (Version: 0) => transactional_id producer_id producer_epoch group_id
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   group_id => STRING
 */

module.exports = ({ transactionalId, producerId, producerEpoch, groupId }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'AddOffsetsToTxn',
  encode: async () => {
    return new Encoder()
      .writeString(transactionalId)
      .writeInt64(producerId)
      .writeInt16(producerEpoch)
      .writeString(groupId)
  },
})


/***/ }),

/***/ 2021:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * AddOffsetsToTxn Response (Version: 0) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 9151:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(6931)

/**
 * AddOffsetsToTxn Request (Version: 1) => transactional_id producer_id producer_epoch group_id
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   group_id => STRING
 */

module.exports = ({ transactionalId, producerId, producerEpoch, groupId }) =>
  Object.assign(
    requestV0({
      transactionalId,
      producerId,
      producerEpoch,
      groupId,
    }),
    { apiVersion: 1 }
  )


/***/ }),

/***/ 4035:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV0 } = __nccwpck_require__(2021)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * AddOffsetsToTxn Response (Version: 1) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6796:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ transactionalId, producerId, producerEpoch, topics }) => {
    const request = __nccwpck_require__(7918)
    const response = __nccwpck_require__(1739)
    return { request: request({ transactionalId, producerId, producerEpoch, topics }), response }
  },
  1: ({ transactionalId, producerId, producerEpoch, topics }) => {
    const request = __nccwpck_require__(486)
    const response = __nccwpck_require__(7398)
    return { request: request({ transactionalId, producerId, producerEpoch, topics }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 7918:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { AddPartitionsToTxn: apiKey } = __nccwpck_require__(686)

/**
 * AddPartitionsToTxn Request (Version: 0) => transactional_id producer_id producer_epoch [topics]
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({ transactionalId, producerId, producerEpoch, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'AddPartitionsToTxn',
  encode: async () => {
    return new Encoder()
      .writeString(transactionalId)
      .writeInt64(producerId)
      .writeInt16(producerEpoch)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = partition => {
  return new Encoder().writeInt32(partition)
}


/***/ }),

/***/ 1739:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * AddPartitionsToTxn Response (Version: 0) => throttle_time_ms [errors]
 *   throttle_time_ms => INT32
 *   errors => topic [partition_errors]
 *     topic => STRING
 *     partition_errors => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errors = await decoder.readArrayAsync(decodeError)

  return {
    throttleTime,
    errors,
  }
}

const decodeError = async decoder => ({
  topic: decoder.readString(),
  partitionErrors: await decoder.readArrayAsync(decodePartitionError),
})

const decodePartitionError = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const topicsWithErrors = data.errors
    .map(({ partitionErrors }) => ({
      partitionsWithErrors: partitionErrors.filter(({ errorCode }) => failure(errorCode)),
    }))
    .filter(({ partitionsWithErrors }) => partitionsWithErrors.length)

  if (topicsWithErrors.length > 0) {
    throw createErrorFromCode(topicsWithErrors[0].partitionsWithErrors[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 486:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(7918)

/**
 * AddPartitionsToTxn Request (Version: 1) => transactional_id producer_id producer_epoch [topics]
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({ transactionalId, producerId, producerEpoch, topics }) =>
  Object.assign(
    requestV0({
      transactionalId,
      producerId,
      producerEpoch,
      topics,
    }),
    { apiVersion: 1 }
  )


/***/ }),

/***/ 7398:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV0 } = __nccwpck_require__(1739)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * AddPartitionsToTxn Response (Version: 1) => throttle_time_ms [errors]
 *   throttle_time_ms => INT32
 *   errors => topic [partition_errors]
 *     topic => STRING
 *     partition_errors => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */
const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 9200:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ resources, validateOnly }) => {
    const request = __nccwpck_require__(6493)
    const response = __nccwpck_require__(7943)
    return { request: request({ resources, validateOnly }), response }
  },
  1: ({ resources, validateOnly }) => {
    const request = __nccwpck_require__(8794)
    const response = __nccwpck_require__(8034)
    return { request: request({ resources, validateOnly }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 6493:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { AlterConfigs: apiKey } = __nccwpck_require__(686)

/**
 * AlterConfigs Request (Version: 0) => [resources] validate_only
 *   resources => resource_type resource_name [config_entries]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   validate_only => BOOLEAN
 */

/**
 * @param {Array} resources An array of resources to change
 * @param {boolean} [validateOnly=false]
 */
module.exports = ({ resources, validateOnly = false }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'AlterConfigs',
  encode: async () => {
    return new Encoder().writeArray(resources.map(encodeResource)).writeBoolean(validateOnly)
  },
})

const encodeResource = ({ type, name, configEntries }) => {
  return new Encoder()
    .writeInt8(type)
    .writeString(name)
    .writeArray(configEntries.map(encodeConfigEntries))
}

const encodeConfigEntries = ({ name, value }) => {
  return new Encoder().writeString(name).writeString(value)
}


/***/ }),

/***/ 7943:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * AlterConfigs Response (Version: 0) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 */

const decodeResources = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime,
    resources,
  }
}

const parse = async data => {
  const resourcesWithError = data.resources.filter(({ errorCode }) => failure(errorCode))
  if (resourcesWithError.length > 0) {
    throw createErrorFromCode(resourcesWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 8794:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(6493)

/**
 * AlterConfigs Request (Version: 1) => [resources] validate_only
 *   resources => resource_type resource_name [config_entries]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   validate_only => BOOLEAN
 */

/**
 * @param {Array} resources An array of resources to change
 * @param {boolean} [validateOnly=false]
 */
module.exports = ({ resources, validateOnly }) =>
  Object.assign(
    requestV0({
      resources,
      validateOnly,
    }),
    { apiVersion: 1 }
  )


/***/ }),

/***/ 8034:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV0 } = __nccwpck_require__(7943)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * AlterConfigs Response (Version: 1) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 686:
/***/ ((module) => {

module.exports = {
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
  ApiVersions: 18, // ApiVersions v0 on Kafka 0.10
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
  AlterConfigs: 33, // ApiVersions v0 and v1 on Kafka 0.11
  AlterReplicaLogDirs: 34,
  DescribeLogDirs: 35,
  SaslAuthenticate: 36,
  CreatePartitions: 37,
  CreateDelegationToken: 38,
  RenewDelegationToken: 39,
  ExpireDelegationToken: 40,
  DescribeDelegationToken: 41,
  DeleteGroups: 42, // ApiVersions v2 on Kafka 1.0
  ElectPreferredLeaders: 43,
}


/***/ }),

/***/ 7836:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logResponseError = false

const versions = {
  0: () => {
    const request = __nccwpck_require__(4333)
    const response = __nccwpck_require__(5663)
    return { request: request(), response, logResponseError: true }
  },
  1: () => {
    const request = __nccwpck_require__(1869)
    const response = __nccwpck_require__(2523)
    return { request: request(), response, logResponseError }
  },
  2: () => {
    const request = __nccwpck_require__(6636)
    const response = __nccwpck_require__(7204)
    return { request: request(), response, logResponseError }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 4333:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { ApiVersions: apiKey } = __nccwpck_require__(686)

/**
 * ApiVersionRequest => ApiKeys
 */

module.exports = () => ({
  apiKey,
  apiVersion: 0,
  apiName: 'ApiVersions',
  encode: async () => new Encoder(),
})


/***/ }),

/***/ 5663:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * ApiVersionResponse => ApiVersions
 *   ErrorCode = INT16
 *   ApiVersions = [ApiVersion]
 *     ApiVersion = ApiKey MinVersion MaxVersion
 *       ApiKey = INT16
 *       MinVersion = INT16
 *       MaxVersion = INT16
 */

const apiVersion = decoder => ({
  apiKey: decoder.readInt16(),
  minVersion: decoder.readInt16(),
  maxVersion: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    errorCode,
    apiVersions: decoder.readArray(apiVersion),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 1869:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(4333)

// ApiVersions Request after v1 indicates the client can parse throttle_time_ms

module.exports = () => ({ ...requestV0(), apiVersion: 1 })


/***/ }),

/***/ 2523:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failIfVersionNotSupported } = __nccwpck_require__(5903)
const { parse: parseV0 } = __nccwpck_require__(5663)

/**
 * ApiVersions Response (Version: 1) => error_code [api_versions] throttle_time_ms
 *   error_code => INT16
 *   api_versions => api_key min_version max_version
 *     api_key => INT16
 *     min_version => INT16
 *     max_version => INT16
 *   throttle_time_ms => INT32
 */

const apiVersion = decoder => ({
  apiKey: decoder.readInt16(),
  minVersion: decoder.readInt16(),
  maxVersion: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  const apiVersions = decoder.readArray(apiVersion)

  /**
   * The Java client defaults this value to 0 if not present,
   * even though it is required in the protocol. This is to
   * work around https://github.com/tulios/kafkajs/issues/491
   *
   * See:
   * https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/protocol/CommonFields.java#L23-L25
   */
  const throttleTime = decoder.canReadInt32() ? decoder.readInt32() : 0

  return {
    errorCode,
    apiVersions,
    throttleTime,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 6636:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(4333)

// ApiVersions Request after v1 indicates the client can parse throttle_time_ms

module.exports = () => ({ ...requestV0(), apiVersion: 2 })


/***/ }),

/***/ 7204:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(2523)

/**
 * Starting in version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * ApiVersions Response (Version: 2) => error_code [api_versions] throttle_time_ms
 *   error_code => INT16
 *   api_versions => api_key min_version max_version
 *     api_key => INT16
 *     min_version => INT16
 *     max_version => INT16
 *   throttle_time_ms => INT32
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 3110:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ creations }) => {
    const request = __nccwpck_require__(3996)
    const response = __nccwpck_require__(1650)
    return { request: request({ creations }), response }
  },
  1: ({ creations }) => {
    const request = __nccwpck_require__(5582)
    const response = __nccwpck_require__(3279)
    return { request: request({ creations }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 3996:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { CreateAcls: apiKey } = __nccwpck_require__(686)

/**
 * CreateAcls Request (Version: 0) => [creations]
 *   creations => resource_type resource_name principal host operation permission_type
 *     resource_type => INT8
 *     resource_name => STRING
 *     principal => STRING
 *     host => STRING
 *     operation => INT8
 *     permission_type => INT8
 */

const encodeCreations = ({
  resourceType,
  resourceName,
  principal,
  host,
  operation,
  permissionType,
}) => {
  return new Encoder()
    .writeInt8(resourceType)
    .writeString(resourceName)
    .writeString(principal)
    .writeString(host)
    .writeInt8(operation)
    .writeInt8(permissionType)
}

module.exports = ({ creations }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'CreateAcls',
  encode: async () => {
    return new Encoder().writeArray(creations.map(encodeCreations))
  },
})


/***/ }),

/***/ 1650:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * CreateAcls Response (Version: 0) => throttle_time_ms [creation_responses]
 *   throttle_time_ms => INT32
 *   creation_responses => error_code error_message
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const decodeCreationResponse = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const creationResponses = decoder.readArray(decodeCreationResponse)

  return {
    throttleTime,
    creationResponses,
  }
}

const parse = async data => {
  const creationResponsesWithError = data.creationResponses.filter(({ errorCode }) =>
    failure(errorCode)
  )

  if (creationResponsesWithError.length > 0) {
    throw createErrorFromCode(creationResponsesWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 5582:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { CreateAcls: apiKey } = __nccwpck_require__(686)

/**
 * CreateAcls Request (Version: 1) => [creations]
 *   creations => resource_type resource_name resource_pattern_type principal host operation permission_type
 *     resource_type => INT8
 *     resource_name => STRING
 *     resource_pattern_type => INT8
 *     principal => STRING
 *     host => STRING
 *     operation => INT8
 *     permission_type => INT8
 */

const encodeCreations = ({
  resourceType,
  resourceName,
  resourcePatternType,
  principal,
  host,
  operation,
  permissionType,
}) => {
  return new Encoder()
    .writeInt8(resourceType)
    .writeString(resourceName)
    .writeInt8(resourcePatternType)
    .writeString(principal)
    .writeString(host)
    .writeInt8(operation)
    .writeInt8(permissionType)
}

module.exports = ({ creations }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'CreateAcls',
  encode: async () => {
    return new Encoder().writeArray(creations.map(encodeCreations))
  },
})


/***/ }),

/***/ 3279:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV0 } = __nccwpck_require__(1650)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * CreateAcls Response (Version: 1) => throttle_time_ms [creation_responses]
 *   throttle_time_ms => INT32
 *   creation_responses => error_code error_message
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 2540:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ topicPartitions, timeout, validateOnly }) => {
    const request = __nccwpck_require__(1385)
    const response = __nccwpck_require__(3827)
    return { request: request({ topicPartitions, timeout, validateOnly }), response }
  },
  1: ({ topicPartitions, validateOnly, timeout }) => {
    const request = __nccwpck_require__(8035)
    const response = __nccwpck_require__(9298)
    return { request: request({ topicPartitions, validateOnly, timeout }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 1385:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { CreatePartitions: apiKey } = __nccwpck_require__(686)

/**
 * CreatePartitions Request (Version: 0) => [topic_partitions] timeout validate_only
 *   topic_partitions => topic new_partitions
 *     topic => STRING
 *     new_partitions => count [assignment]
 *       count => INT32
 *       assignment => ARRAY(INT32)
 *   timeout => INT32
 *   validate_only => BOOLEAN
 */

module.exports = ({ topicPartitions, validateOnly = false, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'CreatePartitions',
  encode: async () => {
    return new Encoder()
      .writeArray(topicPartitions.map(encodeTopicPartitions))
      .writeInt32(timeout)
      .writeBoolean(validateOnly)
  },
})

const encodeTopicPartitions = ({ topic, count, assignments = [] }) => {
  return new Encoder()
    .writeString(topic)
    .writeInt32(count)
    .writeNullableArray(assignments.map(encodeAssignments))
}

const encodeAssignments = brokerIds => {
  return new Encoder().writeNullableArray(brokerIds)
}


/***/ }),

/***/ 3827:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/*
 * CreatePartitions Response (Version: 0) => throttle_time_ms [topic_errors]
 *   throttle_time_ms => INT32
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  return {
    throttleTime,
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

const parse = async data => {
  const topicsWithError = data.topicErrors.filter(({ errorCode }) => failure(errorCode))
  if (topicsWithError.length > 0) {
    throw createErrorFromCode(topicsWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 8035:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(1385)

/**
 * CreatePartitions Request (Version: 1) => [topic_partitions] timeout validate_only
 *   topic_partitions => topic new_partitions
 *     topic => STRING
 *     new_partitions => count [assignment]
 *       count => INT32
 *       assignment => ARRAY(INT32)
 *   timeout => INT32
 *   validate_only => BOOLEAN
 */

module.exports = ({ topicPartitions, validateOnly, timeout }) =>
  Object.assign(requestV0({ topicPartitions, validateOnly, timeout }), { apiVersion: 1 })


/***/ }),

/***/ 9298:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV0 } = __nccwpck_require__(3827)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * CreatePartitions Response (Version: 0) => throttle_time_ms [topic_errors]
 *   throttle_time_ms => INT32
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 3244:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ topics, timeout }) => {
    const request = __nccwpck_require__(7581)
    const response = __nccwpck_require__(1594)
    return { request: request({ topics, timeout }), response }
  },
  1: ({ topics, validateOnly, timeout }) => {
    const request = __nccwpck_require__(5483)
    const response = __nccwpck_require__(6269)
    return { request: request({ topics, validateOnly, timeout }), response }
  },
  2: ({ topics, validateOnly, timeout }) => {
    const request = __nccwpck_require__(821)
    const response = __nccwpck_require__(6894)
    return { request: request({ topics, validateOnly, timeout }), response }
  },
  3: ({ topics, validateOnly, timeout }) => {
    const request = __nccwpck_require__(9908)
    const response = __nccwpck_require__(4757)
    return { request: request({ topics, validateOnly, timeout }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 7581:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { CreateTopics: apiKey } = __nccwpck_require__(686)

/**
 * CreateTopics Request (Version: 0) => [create_topic_requests] timeout
 *   create_topic_requests => topic num_partitions replication_factor [replica_assignment] [config_entries]
 *     topic => STRING
 *     num_partitions => INT32
 *     replication_factor => INT16
 *     replica_assignment => partition [replicas]
 *       partition => INT32
 *       replicas => INT32
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   timeout => INT32
 */

module.exports = ({ topics, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'CreateTopics',
  encode: async () => {
    return new Encoder().writeArray(topics.map(encodeTopics)).writeInt32(timeout)
  },
})

const encodeTopics = ({
  topic,
  numPartitions = -1,
  replicationFactor = -1,
  replicaAssignment = [],
  configEntries = [],
}) => {
  return new Encoder()
    .writeString(topic)
    .writeInt32(numPartitions)
    .writeInt16(replicationFactor)
    .writeArray(replicaAssignment.map(encodeReplicaAssignment))
    .writeArray(configEntries.map(encodeConfigEntries))
}

const encodeReplicaAssignment = ({ partition, replicas }) => {
  return new Encoder().writeInt32(partition).writeArray(replicas)
}

const encodeConfigEntries = ({ name, value }) => {
  return new Encoder().writeString(name).writeString(value)
}


/***/ }),

/***/ 1594:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)
const { KafkaJSAggregateError, KafkaJSCreateTopicError } = __nccwpck_require__(5073)

/**
 * CreateTopics Response (Version: 0) => [topic_errors]
 *   topic_errors => topic error_code
 *     topic => STRING
 *     error_code => INT16
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

const parse = async data => {
  const topicsWithError = data.topicErrors.filter(({ errorCode }) => failure(errorCode))
  if (topicsWithError.length > 0) {
    throw new KafkaJSAggregateError(
      'Topic creation errors',
      topicsWithError.map(
        error => new KafkaJSCreateTopicError(createErrorFromCode(error.errorCode), error.topic)
      )
    )
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 5483:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { CreateTopics: apiKey } = __nccwpck_require__(686)

/**
 *CreateTopics Request (Version: 1) => [create_topic_requests] timeout validate_only
 *  create_topic_requests => topic num_partitions replication_factor [replica_assignment] [config_entries]
 *    topic => STRING
 *    num_partitions => INT32
 *    replication_factor => INT16
 *    replica_assignment => partition [replicas]
 *      partition => INT32
 *      replicas => INT32
 *    config_entries => config_name config_value
 *      config_name => STRING
 *      config_value => NULLABLE_STRING
 *  timeout => INT32
 *  validate_only => BOOLEAN
 */

module.exports = ({ topics, validateOnly = false, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'CreateTopics',
  encode: async () => {
    return new Encoder()
      .writeArray(topics.map(encodeTopics))
      .writeInt32(timeout)
      .writeBoolean(validateOnly)
  },
})

const encodeTopics = ({
  topic,
  numPartitions = -1,
  replicationFactor = -1,
  replicaAssignment = [],
  configEntries = [],
}) => {
  return new Encoder()
    .writeString(topic)
    .writeInt32(numPartitions)
    .writeInt16(replicationFactor)
    .writeArray(replicaAssignment.map(encodeReplicaAssignment))
    .writeArray(configEntries.map(encodeConfigEntries))
}

const encodeReplicaAssignment = ({ partition, replicas }) => {
  return new Encoder().writeInt32(partition).writeArray(replicas)
}

const encodeConfigEntries = ({ name, value }) => {
  return new Encoder().writeString(name).writeString(value)
}


/***/ }),

/***/ 6269:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(1594)

/**
 * CreateTopics Response (Version: 1) => [topic_errors]
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 821:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(5483)

/**
 * CreateTopics Request (Version: 2) => [create_topic_requests] timeout validate_only
 *   create_topic_requests => topic num_partitions replication_factor [replica_assignment] [config_entries]
 *     topic => STRING
 *     num_partitions => INT32
 *     replication_factor => INT16
 *     replica_assignment => partition [replicas]
 *       partition => INT32
 *       replicas => INT32
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   timeout => INT32
 *   validate_only => BOOLEAN
 */

module.exports = ({ topics, validateOnly, timeout }) =>
  Object.assign(requestV1({ topics, validateOnly, timeout }), { apiVersion: 2 })


/***/ }),

/***/ 6894:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV1 } = __nccwpck_require__(6269)

/**
 * CreateTopics Response (Version: 2) => throttle_time_ms [topic_errors]
 *   throttle_time_ms => INT32
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),

/***/ 9908:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV2 = __nccwpck_require__(821)

/**
 * CreateTopics Request (Version: 3) => [create_topic_requests] timeout validate_only
 *   create_topic_requests => topic num_partitions replication_factor [replica_assignment] [config_entries]
 *     topic => STRING
 *     num_partitions => INT32
 *     replication_factor => INT16
 *     replica_assignment => partition [replicas]
 *       partition => INT32
 *       replicas => INT32
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   timeout => INT32
 *   validate_only => BOOLEAN
 */

module.exports = ({ topics, validateOnly, timeout }) =>
  Object.assign(requestV2({ topics, validateOnly, timeout }), { apiVersion: 3 })


/***/ }),

/***/ 4757:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV2 } = __nccwpck_require__(6894)

/**
 * Starting in version 3, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * CreateTopics Response (Version: 3) => throttle_time_ms [topic_errors]
 *   throttle_time_ms => INT32
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

const decode = async rawData => {
  const decoded = await decodeV2(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 8926:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ filters }) => {
    const request = __nccwpck_require__(7717)
    const response = __nccwpck_require__(4638)
    return { request: request({ filters }), response }
  },
  1: ({ filters }) => {
    const request = __nccwpck_require__(546)
    const response = __nccwpck_require__(9062)
    return { request: request({ filters }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 7717:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DeleteAcls: apiKey } = __nccwpck_require__(686)

/**
 * DeleteAcls Request (Version: 0) => [filters]
 *   filters => resource_type resource_name principal host operation permission_type
 *     resource_type => INT8
 *     resource_name => NULLABLE_STRING
 *     principal => NULLABLE_STRING
 *     host => NULLABLE_STRING
 *     operation => INT8
 *     permission_type => INT8
 */

const encodeFilters = ({
  resourceType,
  resourceName,
  principal,
  host,
  operation,
  permissionType,
}) => {
  return new Encoder()
    .writeInt8(resourceType)
    .writeString(resourceName)
    .writeString(principal)
    .writeString(host)
    .writeInt8(operation)
    .writeInt8(permissionType)
}

module.exports = ({ filters }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DeleteAcls',
  encode: async () => {
    return new Encoder().writeArray(filters.map(encodeFilters))
  },
})


/***/ }),

/***/ 4638:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * DeleteAcls Response (Version: 0) => throttle_time_ms [filter_responses]
 *   throttle_time_ms => INT32
 *   filter_responses => error_code error_message [matching_acls]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     matching_acls => error_code error_message resource_type resource_name principal host operation permission_type
 *       error_code => INT16
 *       error_message => NULLABLE_STRING
 *       resource_type => INT8
 *       resource_name => STRING
 *       principal => STRING
 *       host => STRING
 *       operation => INT8
 *       permission_type => INT8
 */

const decodeMatchingAcls = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  principal: decoder.readString(),
  host: decoder.readString(),
  operation: decoder.readInt8(),
  permissionType: decoder.readInt8(),
})

const decodeFilterResponse = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  matchingAcls: decoder.readArray(decodeMatchingAcls),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const filterResponses = decoder.readArray(decodeFilterResponse)

  return {
    throttleTime,
    filterResponses,
  }
}

const parse = async data => {
  const filterResponsesWithError = data.filterResponses.filter(({ errorCode }) =>
    failure(errorCode)
  )

  if (filterResponsesWithError.length > 0) {
    throw createErrorFromCode(filterResponsesWithError[0].errorCode)
  }

  for (const filterResponse of data.filterResponses) {
    const matchingAcls = filterResponse.matchingAcls
    const matchingAclsWithError = matchingAcls.filter(({ errorCode }) => failure(errorCode))

    if (matchingAclsWithError.length > 0) {
      throw createErrorFromCode(matchingAclsWithError[0].errorCode)
    }
  }

  return data
}

module.exports = {
  decodeMatchingAcls,
  decodeFilterResponse,
  decode,
  parse,
}


/***/ }),

/***/ 546:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DeleteAcls: apiKey } = __nccwpck_require__(686)

/**
 * DeleteAcls Request (Version: 1) => [filters]
 *   filters => resource_type resource_name resource_pattern_type_filter principal host operation permission_type
 *     resource_type => INT8
 *     resource_name => NULLABLE_STRING
 *     resource_pattern_type_filter => INT8
 *     principal => NULLABLE_STRING
 *     host => NULLABLE_STRING
 *     operation => INT8
 *     permission_type => INT8
 */

const encodeFilters = ({
  resourceType,
  resourceName,
  resourcePatternType,
  principal,
  host,
  operation,
  permissionType,
}) => {
  return new Encoder()
    .writeInt8(resourceType)
    .writeString(resourceName)
    .writeInt8(resourcePatternType)
    .writeString(principal)
    .writeString(host)
    .writeInt8(operation)
    .writeInt8(permissionType)
}

module.exports = ({ filters }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'DeleteAcls',
  encode: async () => {
    return new Encoder().writeArray(filters.map(encodeFilters))
  },
})


/***/ }),

/***/ 9062:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(4638)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 * Version 1 also introduces a new resource pattern type field.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-290%3A+Support+for+Prefixed+ACLs
 *
 * DeleteAcls Response (Version: 1) => throttle_time_ms [filter_responses]
 *   throttle_time_ms => INT32
 *   filter_responses => error_code error_message [matching_acls]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     matching_acls => error_code error_message resource_type resource_name resource_pattern_type principal host operation permission_type
 *       error_code => INT16
 *       error_message => NULLABLE_STRING
 *       resource_type => INT8
 *       resource_name => STRING
 *       resource_pattern_type => INT8
 *       principal => STRING
 *       host => STRING
 *       operation => INT8
 *       permission_type => INT8
 */

const decodeMatchingAcls = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  resourcePatternType: decoder.readInt8(),
  principal: decoder.readString(),
  host: decoder.readString(),
  operation: decoder.readInt8(),
  permissionType: decoder.readInt8(),
})

const decodeFilterResponse = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  matchingAcls: decoder.readArray(decodeMatchingAcls),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const filterResponses = decoder.readArray(decodeFilterResponse)

  return {
    throttleTime: 0,
    clientSideThrottleTime: throttleTime,
    filterResponses,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 3867:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: groupIds => {
    const request = __nccwpck_require__(2959)
    const response = __nccwpck_require__(3068)
    return { request: request(groupIds), response }
  },
  1: groupIds => {
    const request = __nccwpck_require__(6392)
    const response = __nccwpck_require__(1700)
    return { request: request(groupIds), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 2959:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DeleteGroups: apiKey } = __nccwpck_require__(686)

/**
 * DeleteGroups Request (Version: 0) => [groups_names]
 *   groups_names => STRING
 */

/**
 */
module.exports = groupIds => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DeleteGroups',
  encode: async () => {
    return new Encoder().writeArray(groupIds.map(encodeGroups))
  },
})

const encodeGroups = group => {
  return new Encoder().writeString(group)
}


/***/ }),

/***/ 3068:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)
/**
 * DeleteGroups Response (Version: 0) => throttle_time_ms [results]
 *  throttle_time_ms => INT32
 *  results => group_id error_code
 *    group_id => STRING
 *    error_code => INT16
 */

const decodeGroup = decoder => ({
  groupId: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTimeMs = decoder.readInt32()
  const results = decoder.readArray(decodeGroup)

  for (const result of results) {
    if (failure(result.errorCode)) {
      result.error = createErrorFromCode(result.errorCode)
    }
  }
  return {
    throttleTimeMs,
    results,
  }
}

const parse = async data => {
  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6392:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(2959)

/**
 * DeleteGroups Request (Version: 1)
 */

module.exports = groupIds => Object.assign(requestV0(groupIds), { apiVersion: 1 })


/***/ }),

/***/ 1700:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV0 } = __nccwpck_require__(3068)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DeleteGroups Response (Version: 1) => throttle_time_ms [results]
 *  throttle_time_ms => INT32
 *  results => group_id error_code
 *    group_id => STRING
 *    error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 9127:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ topics, timeout }) => {
    const request = __nccwpck_require__(3853)
    const response = __nccwpck_require__(4948)
    return { request: request({ topics, timeout }), response: response({ topics }) }
  },
  1: ({ topics, timeout }) => {
    const request = __nccwpck_require__(1756)
    const response = __nccwpck_require__(3214)
    return { request: request({ topics, timeout }), response: response({ topics }) }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 3853:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DeleteRecords: apiKey } = __nccwpck_require__(686)

/**
 * DeleteRecords Request (Version: 0) => [topics] timeout_ms
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset
 *       partition => INT32
 *       offset => INT64
 *   timeout => INT32
 */
module.exports = ({ topics, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DeleteRecords',
  encode: async () => {
    return new Encoder()
      .writeArray(
        topics.map(({ topic, partitions }) => {
          return new Encoder().writeString(topic).writeArray(
            partitions.map(({ partition, offset }) => {
              return new Encoder().writeInt32(partition).writeInt64(offset)
            })
          )
        })
      )
      .writeInt32(timeout)
  },
})


/***/ }),

/***/ 4948:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { KafkaJSDeleteTopicRecordsError } = __nccwpck_require__(5073)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * DeleteRecords Response (Version: 0) => throttle_time_ms [topics]
 *  throttle_time_ms => INT32
 *  topics => name [partitions]
 *    name => STRING
 *    partitions => partition low_watermark error_code
 *      partition => INT32
 *      low_watermark => INT64
 *      error_code => INT16
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    topics: decoder
      .readArray(decoder => ({
        topic: decoder.readString(),
        partitions: decoder.readArray(decoder => ({
          partition: decoder.readInt32(),
          lowWatermark: decoder.readInt64(),
          errorCode: decoder.readInt16(),
        })),
      }))
      .sort(topicNameComparator),
  }
}

const parse = requestTopics => async data => {
  const topicsWithErrors = data.topics
    .map(({ partitions }) => ({
      partitionsWithErrors: partitions.filter(({ errorCode }) => failure(errorCode)),
    }))
    .filter(({ partitionsWithErrors }) => partitionsWithErrors.length)

  if (topicsWithErrors.length > 0) {
    // at present we only ever request one topic at a time, so can destructure the arrays
    const [{ topic }] = data.topics // topic name
    const [{ partitions: requestPartitions }] = requestTopics // requested offset(s)
    const [{ partitionsWithErrors }] = topicsWithErrors // partition(s) + error(s)

    throw new KafkaJSDeleteTopicRecordsError({
      topic,
      partitions: partitionsWithErrors.map(({ partition, errorCode }) => ({
        partition,
        error: createErrorFromCode(errorCode),
        // attach the original offset from the request, onto the error response
        offset: requestPartitions.find(p => p.partition === partition).offset,
      })),
    })
  }

  return data
}

module.exports = ({ topics }) => ({
  decode,
  parse: parse(topics),
})


/***/ }),

/***/ 1756:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(3853)

/**
 * DeleteRecords Request (Version: 1) => [topics] timeout_ms
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset
 *       partition => INT32
 *       offset => INT64
 *   timeout => INT32
 */
module.exports = ({ topics, timeout }) =>
  Object.assign(requestV0({ topics, timeout }), { apiVersion: 1 })


/***/ }),

/***/ 3214:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const responseV0 = __nccwpck_require__(4948)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DeleteRecords Response (Version: 1) => throttle_time_ms [topics]
 *  throttle_time_ms => INT32
 *  topics => name [partitions]
 *    name => STRING
 *    partitions => partition_index low_watermark error_code
 *      partition_index => INT32
 *      low_watermark => INT64
 *      error_code => INT16
 */

module.exports = ({ topics }) => {
  const { parse, decode: decodeV0 } = responseV0({ topics })

  const decode = async rawData => {
    const decoded = await decodeV0(rawData)

    return {
      ...decoded,
      throttleTime: 0,
      clientSideThrottleTime: decoded.throttleTime,
    }
  }

  return {
    decode,
    parse,
  }
}


/***/ }),

/***/ 8910:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ topics, timeout }) => {
    const request = __nccwpck_require__(3281)
    const response = __nccwpck_require__(3706)
    return { request: request({ topics, timeout }), response }
  },
  1: ({ topics, timeout }) => {
    const request = __nccwpck_require__(2473)
    const response = __nccwpck_require__(8624)
    return { request: request({ topics, timeout }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 3281:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DeleteTopics: apiKey } = __nccwpck_require__(686)

/**
 * DeleteTopics Request (Version: 0) => [topics] timeout
 *   topics => STRING
 *   timeout => INT32
 */
module.exports = ({ topics, timeout = 5000 }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DeleteTopics',
  encode: async () => {
    return new Encoder().writeArray(topics).writeInt32(timeout)
  },
})


/***/ }),

/***/ 3706:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * DeleteTopics Response (Version: 0) => [topic_error_codes]
 *   topic_error_codes => topic error_code
 *     topic => STRING
 *     error_code => INT16
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

const parse = async data => {
  const topicsWithError = data.topicErrors.filter(({ errorCode }) => failure(errorCode))
  if (topicsWithError.length > 0) {
    throw createErrorFromCode(topicsWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 2473:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(3281)

/**
 * DeleteTopics Request (Version: 1) => [topics] timeout
 *   topics => STRING
 *   timeout => INT32
 */

module.exports = ({ topics, timeout }) =>
  Object.assign(requestV0({ topics, timeout }), { apiVersion: 1 })


/***/ }),

/***/ 8624:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(3706)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DeleteTopics Response (Version: 1) => throttle_time_ms [topic_error_codes]
 *   throttle_time_ms => INT32
 *   topic_error_codes => topic error_code
 *     topic => STRING
 *     error_code => INT16
 */

const topicNameComparator = (a, b) => a.topic.localeCompare(b.topic)

const topicErrors = decoder => ({
  topic: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()

  return {
    throttleTime: 0,
    clientSideThrottleTime: throttleTime,
    topicErrors: decoder.readArray(topicErrors).sort(topicNameComparator),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 6434:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ resourceType, resourceName, principal, host, operation, permissionType }) => {
    const request = __nccwpck_require__(3857)
    const response = __nccwpck_require__(8435)
    return {
      request: request({ resourceType, resourceName, principal, host, operation, permissionType }),
      response,
    }
  },
  1: ({
    resourceType,
    resourceName,
    resourcePatternType,
    principal,
    host,
    operation,
    permissionType,
  }) => {
    const request = __nccwpck_require__(5573)
    const response = __nccwpck_require__(8447)
    return {
      request: request({
        resourceType,
        resourceName,
        resourcePatternType,
        principal,
        host,
        operation,
        permissionType,
      }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 3857:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DescribeAcls: apiKey } = __nccwpck_require__(686)

/**
 * DescribeAcls Request (Version: 0) => resource_type resource_name principal host operation permission_type
 *   resource_type => INT8
 *   resource_name => NULLABLE_STRING
 *   principal => NULLABLE_STRING
 *   host => NULLABLE_STRING
 *   operation => INT8
 *   permission_type => INT8
 */

module.exports = ({ resourceType, resourceName, principal, host, operation, permissionType }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DescribeAcls',
  encode: async () => {
    return new Encoder()
      .writeInt8(resourceType)
      .writeString(resourceName)
      .writeString(principal)
      .writeString(host)
      .writeInt8(operation)
      .writeInt8(permissionType)
  },
})


/***/ }),

/***/ 8435:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * DescribeAcls Response (Version: 0) => throttle_time_ms error_code error_message [resources]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   resources => resource_type resource_name [acls]
 *     resource_type => INT8
 *     resource_name => STRING
 *     acls => principal host operation permission_type
 *       principal => STRING
 *       host => STRING
 *       operation => INT8
 *       permission_type => INT8
 */

const decodeAcls = decoder => ({
  principal: decoder.readString(),
  host: decoder.readString(),
  operation: decoder.readInt8(),
  permissionType: decoder.readInt8(),
})

const decodeResources = decoder => ({
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  acls: decoder.readArray(decodeAcls),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const errorMessage = decoder.readString()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime,
    errorCode,
    errorMessage,
    resources,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 5573:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DescribeAcls: apiKey } = __nccwpck_require__(686)

/**
 * DescribeAcls Request (Version: 1) => resource_type resource_name resource_pattern_type_filter principal host operation permission_type
 *   resource_type => INT8
 *   resource_name => NULLABLE_STRING
 *   resource_pattern_type_filter => INT8
 *   principal => NULLABLE_STRING
 *   host => NULLABLE_STRING
 *   operation => INT8
 *   permission_type => INT8
 */

module.exports = ({
  resourceType,
  resourceName,
  resourcePatternType,
  principal,
  host,
  operation,
  permissionType,
}) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'DescribeAcls',
  encode: async () => {
    return new Encoder()
      .writeInt8(resourceType)
      .writeString(resourceName)
      .writeInt8(resourcePatternType)
      .writeString(principal)
      .writeString(host)
      .writeInt8(operation)
      .writeInt8(permissionType)
  },
})


/***/ }),

/***/ 8447:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse } = __nccwpck_require__(8435)
const Decoder = __nccwpck_require__(9991)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 * Version 1 also introduces a new resource pattern type field.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-290%3A+Support+for+Prefixed+ACLs
 *
 * DescribeAcls Response (Version: 1) => throttle_time_ms error_code error_message [resources]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   resources => resource_type resource_name resource_pattern_type [acls]
 *     resource_type => INT8
 *     resource_name => STRING
 *     resource_pattern_type => INT8
 *     acls => principal host operation permission_type
 *       principal => STRING
 *       host => STRING
 *       operation => INT8
 *       permission_type => INT8
 */
const decodeAcls = decoder => ({
  principal: decoder.readString(),
  host: decoder.readString(),
  operation: decoder.readInt8(),
  permissionType: decoder.readInt8(),
})

const decodeResources = decoder => ({
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  resourcePatternType: decoder.readInt8(),
  acls: decoder.readArray(decodeAcls),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const errorMessage = decoder.readString()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime: 0,
    clientSideThrottleTime: throttleTime,
    errorCode,
    errorMessage,
    resources,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 7786:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ resources }) => {
    const request = __nccwpck_require__(7556)
    const response = __nccwpck_require__(1642)
    return { request: request({ resources }), response }
  },
  1: ({ resources, includeSynonyms }) => {
    const request = __nccwpck_require__(9555)
    const response = __nccwpck_require__(967)
    return { request: request({ resources, includeSynonyms }), response }
  },
  2: ({ resources, includeSynonyms }) => {
    const request = __nccwpck_require__(4559)
    const response = __nccwpck_require__(2057)
    return { request: request({ resources, includeSynonyms }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 7556:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DescribeConfigs: apiKey } = __nccwpck_require__(686)

/**
 * DescribeConfigs Request (Version: 0) => [resources]
 *   resources => resource_type resource_name [config_names]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_names => STRING
 */

/**
 * @param {Array} resources An array of config resources to be returned
 */
module.exports = ({ resources }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DescribeConfigs',
  encode: async () => {
    return new Encoder().writeArray(resources.map(encodeResource))
  },
})

const encodeResource = ({ type, name, configNames = [] }) => {
  return new Encoder()
    .writeInt8(type)
    .writeString(name)
    .writeNullableArray(configNames)
}


/***/ }),

/***/ 1642:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)
const ConfigSource = __nccwpck_require__(4277)
const ConfigResourceTypes = __nccwpck_require__(430)

/**
 * DescribeConfigs Response (Version: 0) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name [config_entries]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value read_only is_default is_sensitive
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *       read_only => BOOLEAN
 *       is_default => BOOLEAN
 *       is_sensitive => BOOLEAN
 */

const decodeConfigEntries = (decoder, resourceType) => {
  const configName = decoder.readString()
  const configValue = decoder.readString()
  const readOnly = decoder.readBoolean()
  const isDefault = decoder.readBoolean()
  const isSensitive = decoder.readBoolean()

  /**
   * Backporting ConfigSource value to v0
   * @see https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/requests/DescribeConfigsResponse.java#L232-L242
   */
  let configSource
  if (isDefault) {
    configSource = ConfigSource.DEFAULT_CONFIG
  } else {
    switch (resourceType) {
      case ConfigResourceTypes.BROKER:
        configSource = ConfigSource.STATIC_BROKER_CONFIG
        break
      case ConfigResourceTypes.TOPIC:
        configSource = ConfigSource.TOPIC_CONFIG
        break
      default:
        configSource = ConfigSource.UNKNOWN
    }
  }

  return {
    configName,
    configValue,
    readOnly,
    isDefault,
    configSource,
    isSensitive,
  }
}

const decodeResources = decoder => {
  const errorCode = decoder.readInt16()
  const errorMessage = decoder.readString()
  const resourceType = decoder.readInt8()
  const resourceName = decoder.readString()
  const configEntries = decoder.readArray(decoder => decodeConfigEntries(decoder, resourceType))

  return {
    errorCode,
    errorMessage,
    resourceType,
    resourceName,
    configEntries,
  }
}

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime,
    resources,
  }
}

const parse = async data => {
  const resourcesWithError = data.resources.filter(({ errorCode }) => failure(errorCode))
  if (resourcesWithError.length > 0) {
    throw createErrorFromCode(resourcesWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 9555:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DescribeConfigs: apiKey } = __nccwpck_require__(686)

/**
 * DescribeConfigs Request (Version: 1) => [resources] include_synonyms
 *   resources => resource_type resource_name [config_names]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_names => STRING
 *   include_synonyms => BOOLEAN
 */

/**
 * @param {Array} resources An array of config resources to be returned
 * @param [includeSynonyms=false]
 */
module.exports = ({ resources, includeSynonyms = false }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'DescribeConfigs',
  encode: async () => {
    return new Encoder().writeArray(resources.map(encodeResource)).writeBoolean(includeSynonyms)
  },
})

const encodeResource = ({ type, name, configNames = [] }) => {
  return new Encoder()
    .writeInt8(type)
    .writeString(name)
    .writeNullableArray(configNames)
}


/***/ }),

/***/ 967:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(1642)
const { DEFAULT_CONFIG } = __nccwpck_require__(4277)

/**
 * DescribeConfigs Response (Version: 1) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name [config_entries]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value read_only config_source is_sensitive [config_synonyms]
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *       read_only => BOOLEAN
 *       config_source => INT8
 *       is_sensitive => BOOLEAN
 *       config_synonyms => config_name config_value config_source
 *         config_name => STRING
 *         config_value => NULLABLE_STRING
 *         config_source => INT8
 */

const decodeSynonyms = decoder => ({
  configName: decoder.readString(),
  configValue: decoder.readString(),
  configSource: decoder.readInt8(),
})

const decodeConfigEntries = decoder => {
  const configName = decoder.readString()
  const configValue = decoder.readString()
  const readOnly = decoder.readBoolean()
  const configSource = decoder.readInt8()
  const isSensitive = decoder.readBoolean()
  const configSynonyms = decoder.readArray(decodeSynonyms)

  return {
    configName,
    configValue,
    readOnly,
    isDefault: configSource === DEFAULT_CONFIG,
    configSource,
    isSensitive,
    configSynonyms,
  }
}

const decodeResources = decoder => ({
  errorCode: decoder.readInt16(),
  errorMessage: decoder.readString(),
  resourceType: decoder.readInt8(),
  resourceName: decoder.readString(),
  configEntries: decoder.readArray(decodeConfigEntries),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const resources = decoder.readArray(decodeResources)

  return {
    throttleTime,
    resources,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 4559:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(9555)

/**
 * DescribeConfigs Request (Version: 1) => [resources] include_synonyms
 *   resources => resource_type resource_name [config_names]
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_names => STRING
 *   include_synonyms => BOOLEAN
 */

/**
 * @param {Array} resources An array of config resources to be returned
 * @param [includeSynonyms=false]
 */
module.exports = ({ resources, includeSynonyms }) =>
  Object.assign(requestV1({ resources, includeSynonyms }), { apiVersion: 2 })


/***/ }),

/***/ 2057:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(967)

/**
 * Starting in version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DescribeConfigs Response (Version: 2) => throttle_time_ms [resources]
 *   throttle_time_ms => INT32
 *   resources => error_code error_message resource_type resource_name [config_entries]
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 *     resource_type => INT8
 *     resource_name => STRING
 *     config_entries => config_name config_value read_only config_source is_sensitive [config_synonyms]
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *       read_only => BOOLEAN
 *       config_source => INT8
 *       is_sensitive => BOOLEAN
 *       config_synonyms => config_name config_value config_source
 *         config_name => STRING
 *         config_value => NULLABLE_STRING
 *         config_source => INT8
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 1177:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ groupIds }) => {
    const request = __nccwpck_require__(8320)
    const response = __nccwpck_require__(4692)
    return { request: request({ groupIds }), response }
  },
  1: ({ groupIds }) => {
    const request = __nccwpck_require__(6485)
    const response = __nccwpck_require__(19)
    return { request: request({ groupIds }), response }
  },
  2: ({ groupIds }) => {
    const request = __nccwpck_require__(2719)
    const response = __nccwpck_require__(5988)
    return { request: request({ groupIds }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 8320:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { DescribeGroups: apiKey } = __nccwpck_require__(686)

/**
 * DescribeGroups Request (Version: 0) => [group_ids]
 *   group_ids => STRING
 */

/**
 * @param {Array} groupIds List of groupIds to request metadata for (an empty groupId array will return empty group metadata)
 */
module.exports = ({ groupIds }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'DescribeGroups',
  encode: async () => {
    return new Encoder().writeArray(groupIds)
  },
})


/***/ }),

/***/ 4692:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * DescribeGroups Response (Version: 0) => [groups]
 *   groups => error_code group_id state protocol_type protocol [members]
 *     error_code => INT16
 *     group_id => STRING
 *     state => STRING
 *     protocol_type => STRING
 *     protocol => STRING
 *     members => member_id client_id client_host member_metadata member_assignment
 *       member_id => STRING
 *       client_id => STRING
 *       client_host => STRING
 *       member_metadata => BYTES
 *       member_assignment => BYTES
 */

const decoderMember = decoder => ({
  memberId: decoder.readString(),
  clientId: decoder.readString(),
  clientHost: decoder.readString(),
  memberMetadata: decoder.readBytes(),
  memberAssignment: decoder.readBytes(),
})

const decodeGroup = decoder => ({
  errorCode: decoder.readInt16(),
  groupId: decoder.readString(),
  state: decoder.readString(),
  protocolType: decoder.readString(),
  protocol: decoder.readString(),
  members: decoder.readArray(decoderMember),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const groups = decoder.readArray(decodeGroup)

  return {
    groups,
  }
}

const parse = async data => {
  const groupsWithError = data.groups.filter(({ errorCode }) => failure(errorCode))
  if (groupsWithError.length > 0) {
    throw createErrorFromCode(groupsWithError[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6485:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(8320)

/**
 * DescribeGroups Request (Version: 1) => [group_ids]
 *   group_ids => STRING
 */

module.exports = ({ groupIds }) => Object.assign(requestV0({ groupIds }), { apiVersion: 1 })


/***/ }),

/***/ 19:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(4692)

/**
 * DescribeGroups Response (Version: 1) => throttle_time_ms [groups]
 *   throttle_time_ms => INT32
 *   groups => error_code group_id state protocol_type protocol [members]
 *     error_code => INT16
 *     group_id => STRING
 *     state => STRING
 *     protocol_type => STRING
 *     protocol => STRING
 *     members => member_id client_id client_host member_metadata member_assignment
 *       member_id => STRING
 *       client_id => STRING
 *       client_host => STRING
 *       member_metadata => BYTES
 *       member_assignment => BYTES
 */

const decoderMember = decoder => ({
  memberId: decoder.readString(),
  clientId: decoder.readString(),
  clientHost: decoder.readString(),
  memberMetadata: decoder.readBytes(),
  memberAssignment: decoder.readBytes(),
})

const decodeGroup = decoder => ({
  errorCode: decoder.readInt16(),
  groupId: decoder.readString(),
  state: decoder.readString(),
  protocolType: decoder.readString(),
  protocol: decoder.readString(),
  members: decoder.readArray(decoderMember),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const groups = decoder.readArray(decodeGroup)

  return {
    throttleTime,
    groups,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 2719:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(6485)

/**
 * DescribeGroups Request (Version: 2) => [group_ids]
 *   group_ids => STRING
 */

module.exports = ({ groupIds }) => Object.assign(requestV1({ groupIds }), { apiVersion: 2 })


/***/ }),

/***/ 5988:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(19)

/**
 * Starting in version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * DescribeGroups Response (Version: 2) => throttle_time_ms [groups]
 *   throttle_time_ms => INT32
 *   groups => error_code group_id state protocol_type protocol [members]
 *     error_code => INT16
 *     group_id => STRING
 *     state => STRING
 *     protocol_type => STRING
 *     protocol => STRING
 *     members => member_id client_id client_host member_metadata member_assignment
 *       member_id => STRING
 *       client_id => STRING
 *       client_host => STRING
 *       member_metadata => BYTES
 *       member_assignment => BYTES
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 4558:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ transactionalId, producerId, producerEpoch, transactionResult }) => {
    const request = __nccwpck_require__(1737)
    const response = __nccwpck_require__(7693)
    return {
      request: request({ transactionalId, producerId, producerEpoch, transactionResult }),
      response,
    }
  },
  1: ({ transactionalId, producerId, producerEpoch, transactionResult }) => {
    const request = __nccwpck_require__(986)
    const response = __nccwpck_require__(1718)
    return {
      request: request({ transactionalId, producerId, producerEpoch, transactionResult }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 1737:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { EndTxn: apiKey } = __nccwpck_require__(686)

/**
 * EndTxn Request (Version: 0) => transactional_id producer_id producer_epoch transaction_result
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   transaction_result => BOOLEAN
 */

module.exports = ({ transactionalId, producerId, producerEpoch, transactionResult }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'EndTxn',
  encode: async () => {
    return new Encoder()
      .writeString(transactionalId)
      .writeInt64(producerId)
      .writeInt16(producerEpoch)
      .writeBoolean(transactionResult)
  },
})


/***/ }),

/***/ 7693:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * EndTxn Response (Version: 0) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 986:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(1737)

/**
 * EndTxn Request (Version: 1) => transactional_id producer_id producer_epoch transaction_result
 *   transactional_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   transaction_result => BOOLEAN
 */

module.exports = ({ transactionalId, producerId, producerEpoch, transactionResult }) =>
  Object.assign(requestV0({ transactionalId, producerId, producerEpoch, transactionResult }), {
    apiVersion: 1,
  })


/***/ }),

/***/ 1718:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV0 } = __nccwpck_require__(7693)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * EndTxn Response (Version: 1) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 8708:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const ISOLATION_LEVEL = __nccwpck_require__(4596)

// For normal consumers, use -1
const REPLICA_ID = -1
const NETWORK_DELAY = 100

/**
 * The FETCH request can block up to maxWaitTime, which can be bigger than the configured
 * request timeout. It's safer to always use the maxWaitTime
 **/
const requestTimeout = timeout =>
  Number.isSafeInteger(timeout + NETWORK_DELAY) ? timeout + NETWORK_DELAY : timeout

const versions = {
  0: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, topics }) => {
    const request = __nccwpck_require__(1375)
    const response = __nccwpck_require__(8865)
    return {
      request: request({ replicaId, maxWaitTime, minBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  1: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, topics }) => {
    const request = __nccwpck_require__(6825)
    const response = __nccwpck_require__(6152)
    return {
      request: request({ replicaId, maxWaitTime, minBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  2: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, topics }) => {
    const request = __nccwpck_require__(9331)
    const response = __nccwpck_require__(5657)
    return {
      request: request({ replicaId, maxWaitTime, minBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  3: ({ replicaId = REPLICA_ID, maxWaitTime, minBytes, maxBytes, topics }) => {
    const request = __nccwpck_require__(2107)
    const response = __nccwpck_require__(9670)
    return {
      request: request({ replicaId, maxWaitTime, minBytes, maxBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  4: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __nccwpck_require__(5195)
    const response = __nccwpck_require__(5950)
    return {
      request: request({ replicaId, isolationLevel, maxWaitTime, minBytes, maxBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  5: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __nccwpck_require__(1212)
    const response = __nccwpck_require__(6666)
    return {
      request: request({ replicaId, isolationLevel, maxWaitTime, minBytes, maxBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
  6: ({
    replicaId = REPLICA_ID,
    isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
    maxWaitTime,
    minBytes,
    maxBytes,
    topics,
  }) => {
    const request = __nccwpck_require__(2830)
    const response = __nccwpck_require__(5313)
    return {
      request: request({ replicaId, isolationLevel, maxWaitTime, minBytes, maxBytes, topics }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
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
    topics,
  }) => {
    const request = __nccwpck_require__(7724)
    const response = __nccwpck_require__(5261)
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
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
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
    topics,
  }) => {
    const request = __nccwpck_require__(6196)
    const response = __nccwpck_require__(191)
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
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
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
    topics,
  }) => {
    const request = __nccwpck_require__(2519)
    const response = __nccwpck_require__(6968)
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
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
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
    topics,
  }) => {
    const request = __nccwpck_require__(2840)
    const response = __nccwpck_require__(5224)
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
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
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
    rackId,
  }) => {
    const request = __nccwpck_require__(1790)
    const response = __nccwpck_require__(4678)
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
        rackId,
      }),
      response,
      requestTimeout: requestTimeout(maxWaitTime),
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 1375:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Fetch: apiKey } = __nccwpck_require__(686)

/**
 * Fetch Request (Version: 0) => replica_id max_wait_time min_bytes [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       max_bytes => INT32
 */

/**
 * @param {number} replicaId Broker id of the follower
 * @param {number} maxWaitTime Maximum time in ms to wait for the response
 * @param {number} minBytes Minimum bytes to accumulate in the response.
 * @param {Array} topics Topics to fetch
 *                        [
 *                          {
 *                            topic: 'topic-name',
 *                            partitions: [
 *                              {
 *                                partition: 0,
 *                                fetchOffset: '4124',
 *                                maxBytes: 2048
 *                              }
 *                            ]
 *                          }
 *                        ]
 */
module.exports = ({ replicaId, maxWaitTime, minBytes, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt32(maxBytes)
}


/***/ }),

/***/ 8865:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { KafkaJSOffsetOutOfRange } = __nccwpck_require__(5073)
const { failure, createErrorFromCode, errorCodes } = __nccwpck_require__(5903)
const MessageSetDecoder = __nccwpck_require__(6159)

/**
 * Fetch Response (Version: 0) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *       record_set => RECORDS
 */

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  messages: await MessageSetDecoder(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    responses,
  }
}

const { code: OFFSET_OUT_OF_RANGE_ERROR_CODE } = errorCodes.find(
  e => e.type === 'OFFSET_OUT_OF_RANGE'
)

const parse = async data => {
  const errors = data.responses.flatMap(({ topicName, partitions }) => {
    return partitions
      .filter(partition => failure(partition.errorCode))
      .map(partition => Object.assign({}, partition, { topic: topicName }))
  })

  if (errors.length > 0) {
    const { errorCode, topic, partition } = errors[0]
    if (errorCode === OFFSET_OUT_OF_RANGE_ERROR_CODE) {
      throw new KafkaJSOffsetOutOfRange(createErrorFromCode(errorCode), { topic, partition })
    }

    throw createErrorFromCode(errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6825:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(1375)

module.exports = ({ replicaId, maxWaitTime, minBytes, topics }) => {
  return Object.assign(requestV0({ replicaId, maxWaitTime, minBytes, topics }), { apiVersion: 1 })
}


/***/ }),

/***/ 6152:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(8865)
const MessageSetDecoder = __nccwpck_require__(6159)

/**
 * Fetch Response (Version: 1) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *       record_set => RECORDS
 */

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  messages: await MessageSetDecoder(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    throttleTime,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 2840:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const ISOLATION_LEVEL = __nccwpck_require__(4596)
const requestV9 = __nccwpck_require__(2519)

/**
 * ZStd Compression
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-110%3A+Add+Codec+for+ZStandard+Compression
 */

/**
 * Fetch Request (Version: 10) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition current_leader_epoch fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       current_leader_epoch => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) =>
  Object.assign(
    requestV9({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel,
      sessionId,
      sessionEpoch,
      forgottenTopics,
    }),
    { apiVersion: 10 }
  )


/***/ }),

/***/ 5224:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode, parse } = __nccwpck_require__(6968)

/**
 * Fetch Response (Version: 10) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 1790:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Fetch: apiKey } = __nccwpck_require__(686)
const ISOLATION_LEVEL = __nccwpck_require__(4596)

/**
 * Allow consumers to fetch from closest replica
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-392%3A+Allow+consumers+to+fetch+from+closest+replica
 */

/**
 * Fetch Request (Version: 11) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition current_leader_epoch fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       current_leader_epoch => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 *   rack_id => STRING
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  rackId = '',
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) => ({
  apiKey,
  apiVersion: 11,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeInt32(sessionId)
      .writeInt32(sessionEpoch)
      .writeArray(topics.map(encodeTopic))
      .writeArray(forgottenTopics.map(encodeForgottenTopics))
      .writeString(rackId)
  },
})

const encodeForgottenTopics = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions)
}

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({
  partition,
  currentLeaderEpoch = -1,
  fetchOffset,
  logStartOffset = -1,
  maxBytes,
}) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt32(currentLeaderEpoch)
    .writeInt64(fetchOffset)
    .writeInt64(logStartOffset)
    .writeInt32(maxBytes)
}


/***/ }),

/***/ 4678:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV1 } = __nccwpck_require__(6152)
const decodeMessages = __nccwpck_require__(3546)

/**
 * Fetch Response (Version: 11) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *         preferred_read_replica => INT32
 *       record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  lastStartOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  preferredReadReplica: decoder.readInt32(),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const clientSideThrottleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const sessionId = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  // Report a `throttleTime` of 0: The broker will not have throttled
  // this request, but if the `clientSideThrottleTime` is >0 then it
  // expects us to do that -- and it will ignore requests.
  return {
    throttleTime: 0,
    clientSideThrottleTime,
    errorCode,
    sessionId,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),

/***/ 9331:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(1375)

module.exports = ({ replicaId, maxWaitTime, minBytes, topics }) => {
  return Object.assign(requestV0({ replicaId, maxWaitTime, minBytes, topics }), { apiVersion: 2 })
}


/***/ }),

/***/ 5657:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode, parse } = __nccwpck_require__(6152)

/**
 * Fetch Response (Version: 2) => throttle_time_ms [responses]
 *  throttle_time_ms => INT32
 *  responses => topic [partition_responses]
 *    topic => STRING
 *    partition_responses => partition_header record_set
 *      partition_header => partition error_code high_watermark
 *        partition => INT32
 *        error_code => INT16
 *        high_watermark => INT64
 *      record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 2107:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Fetch: apiKey } = __nccwpck_require__(686)

/**
 * Fetch Request (Version: 3) => replica_id max_wait_time min_bytes max_bytes [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       max_bytes => INT32
 */

/**
 * @param {number} replicaId Broker id of the follower
 * @param {number} maxWaitTime Maximum time in ms to wait for the response
 * @param {number} minBytes Minimum bytes to accumulate in the response.
 * @param {number} maxBytes Maximum bytes to accumulate in the response. Note that this is not an absolute maximum,
 *                          if the first message in the first non-empty partition of the fetch is larger than this value,
 *                          the message will still be returned to ensure that progress can be made.
 * @param {Array} topics Topics to fetch
 *                        [
 *                          {
 *                            topic: 'topic-name',
 *                            partitions: [
 *                              {
 *                                partition: 0,
 *                                fetchOffset: '4124',
 *                                maxBytes: 2048
 *                              }
 *                            ]
 *                          }
 *                        ]
 */
module.exports = ({ replicaId, maxWaitTime, minBytes, maxBytes, topics }) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt32(maxBytes)
}


/***/ }),

/***/ 9670:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode, parse } = __nccwpck_require__(6152)

/**
 * Fetch Response (Version: 3) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *       record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 3546:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const MessageSetDecoder = __nccwpck_require__(6159)
const RecordBatchDecoder = __nccwpck_require__(9099)
const { MAGIC_BYTE } = __nccwpck_require__(1015)

// the magic offset is at the same offset for all current message formats, but the 4 bytes
// between the size and the magic is dependent on the version.
const MAGIC_OFFSET = 16
const RECORD_BATCH_OVERHEAD = 49

const decodeMessages = async decoder => {
  const messagesSize = decoder.readInt32()

  if (messagesSize <= 0 || !decoder.canReadBytes(messagesSize)) {
    return []
  }

  const messagesBuffer = decoder.readBytes(messagesSize)
  const messagesDecoder = new Decoder(messagesBuffer)
  const magicByte = messagesBuffer.slice(MAGIC_OFFSET).readInt8(0)

  if (magicByte === MAGIC_BYTE) {
    const records = []

    while (messagesDecoder.canReadBytes(RECORD_BATCH_OVERHEAD)) {
      try {
        const recordBatch = await RecordBatchDecoder(messagesDecoder)
        records.push(...recordBatch.records)
      } catch (e) {
        // The tail of the record batches can have incomplete records
        // due to how maxBytes works. See https://cwiki.apache.org/confluence/display/KAFKA/A+Guide+To+The+Kafka+Protocol#AGuideToTheKafkaProtocol-FetchAPI
        if (e.name === 'KafkaJSPartialMessageError') {
          break
        }

        throw e
      }
    }

    return records
  }

  return MessageSetDecoder(messagesDecoder, messagesSize)
}

module.exports = decodeMessages


/***/ }),

/***/ 5195:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Fetch: apiKey } = __nccwpck_require__(686)
const ISOLATION_LEVEL = __nccwpck_require__(4596)

/**
 * Fetch Request (Version: 4) => replica_id max_wait_time min_bytes max_bytes isolation_level [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       max_bytes => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
}) => ({
  apiKey,
  apiVersion: 4,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt32(maxBytes)
}


/***/ }),

/***/ 5950:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV1 } = __nccwpck_require__(6152)
const decodeMessages = __nccwpck_require__(3546)

/**
 * Fetch Response (Version: 4) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    throttleTime,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),

/***/ 1212:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Fetch: apiKey } = __nccwpck_require__(686)
const ISOLATION_LEVEL = __nccwpck_require__(4596)

/**
 * Fetch Request (Version: 5) => replica_id max_wait_time min_bytes max_bytes isolation_level [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
}) => ({
  apiKey,
  apiVersion: 5,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, logStartOffset = -1, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt64(logStartOffset)
    .writeInt32(maxBytes)
}


/***/ }),

/***/ 6666:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV1 } = __nccwpck_require__(6152)
const decodeMessages = __nccwpck_require__(3546)

/**
 * Fetch Response (Version: 5) => throttle_time_ms [responses]
 *  throttle_time_ms => INT32
 *  responses => topic [partition_responses]
 *    topic => STRING
 *    partition_responses => partition_header record_set
 *      partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *        partition => INT32
 *        error_code => INT16
 *        high_watermark => INT64
 *        last_stable_offset => INT64
 *        log_start_offset => INT64
 *        aborted_transactions => producer_id first_offset
 *          producer_id => INT64
 *          first_offset => INT64
 *      record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  lastStartOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    throttleTime,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),

/***/ 2830:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const ISOLATION_LEVEL = __nccwpck_require__(4596)
const requestV5 = __nccwpck_require__(1212)

/**
 * Fetch Request (Version: 6) => replica_id max_wait_time min_bytes max_bytes isolation_level [topics]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
}) =>
  Object.assign(
    requestV5({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel,
    }),
    { apiVersion: 6 }
  )


/***/ }),

/***/ 5313:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode, parse } = __nccwpck_require__(6666)

/**
 * Fetch Response (Version: 6) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 7724:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Fetch: apiKey } = __nccwpck_require__(686)
const ISOLATION_LEVEL = __nccwpck_require__(4596)

/**
 * Sessions are only used by followers
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-227%3A+Introduce+Incremental+FetchRequests+to+Increase+Partition+Scalability
 */

/**
 * Fetch Request (Version: 7) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) => ({
  apiKey,
  apiVersion: 7,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeInt32(sessionId)
      .writeInt32(sessionEpoch)
      .writeArray(topics.map(encodeTopic))
      .writeArray(forgottenTopics.map(encodeForgottenTopics))
  },
})

const encodeForgottenTopics = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions)
}

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, fetchOffset, logStartOffset = -1, maxBytes }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(fetchOffset)
    .writeInt64(logStartOffset)
    .writeInt32(maxBytes)
}


/***/ }),

/***/ 5261:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV1 } = __nccwpck_require__(6152)
const decodeMessages = __nccwpck_require__(3546)

/**
 * Fetch Response (Version: 7) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  lastStartOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const sessionId = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  return {
    throttleTime,
    errorCode,
    sessionId,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),

/***/ 6196:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const ISOLATION_LEVEL = __nccwpck_require__(4596)
const requestV7 = __nccwpck_require__(7724)

/**
 * Quota violation brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 */

/**
 * Fetch Request (Version: 8) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) =>
  Object.assign(
    requestV7({
      replicaId,
      maxWaitTime,
      minBytes,
      maxBytes,
      topics,
      isolationLevel,
      sessionId,
      sessionEpoch,
      forgottenTopics,
    }),
    { apiVersion: 8 }
  )


/***/ }),

/***/ 191:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV1 } = __nccwpck_require__(6152)
const decodeMessages = __nccwpck_require__(3546)

/**
 * Fetch Response (Version: 8) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

const decodeAbortedTransactions = decoder => ({
  producerId: decoder.readInt64().toString(),
  firstOffset: decoder.readInt64().toString(),
})

const decodePartition = async decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  highWatermark: decoder.readInt64().toString(),
  lastStableOffset: decoder.readInt64().toString(),
  lastStartOffset: decoder.readInt64().toString(),
  abortedTransactions: decoder.readArray(decodeAbortedTransactions),
  messages: await decodeMessages(decoder),
})

const decodeResponse = async decoder => ({
  topicName: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const clientSideThrottleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const sessionId = decoder.readInt32()
  const responses = await decoder.readArrayAsync(decodeResponse)

  // Report a `throttleTime` of 0: The broker will not have throttled
  // this request, but if the `clientSideThrottleTime` is >0 then it
  // expects us to do that -- and it will ignore requests.
  return {
    throttleTime: 0,
    clientSideThrottleTime,
    errorCode,
    sessionId,
    responses,
  }
}

module.exports = {
  decode,
  parse: parseV1,
}


/***/ }),

/***/ 2519:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Fetch: apiKey } = __nccwpck_require__(686)
const ISOLATION_LEVEL = __nccwpck_require__(4596)

/**
 * Allow fetchers to detect and handle log truncation
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-320%3A+Allow+fetchers+to+detect+and+handle+log+truncation
 */

/**
 * Fetch Request (Version: 9) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition current_leader_epoch fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       current_leader_epoch => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

module.exports = ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,
  forgottenTopics = [], // Topics to remove from the fetch session
}) => ({
  apiKey,
  apiVersion: 9,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeInt32(sessionId)
      .writeInt32(sessionEpoch)
      .writeArray(topics.map(encodeTopic))
      .writeArray(forgottenTopics.map(encodeForgottenTopics))
  },
})

const encodeForgottenTopics = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions)
}

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({
  partition,
  currentLeaderEpoch = -1,
  fetchOffset,
  logStartOffset = -1,
  maxBytes,
}) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt32(currentLeaderEpoch)
    .writeInt64(fetchOffset)
    .writeInt64(logStartOffset)
    .writeInt32(maxBytes)
}


/***/ }),

/***/ 6968:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode, parse } = __nccwpck_require__(191)

/**
 * Fetch Response (Version: 9) => throttle_time_ms error_code session_id [responses]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   session_id => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition_header record_set
 *       partition_header => partition error_code high_watermark last_stable_offset log_start_offset [aborted_transactions]
 *         partition => INT32
 *         error_code => INT16
 *         high_watermark => INT64
 *         last_stable_offset => INT64
 *         log_start_offset => INT64
 *         aborted_transactions => producer_id first_offset
 *           producer_id => INT64
 *           first_offset => INT64
 *       record_set => RECORDS
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 8770:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const COORDINATOR_TYPES = __nccwpck_require__(466)

const versions = {
  0: ({ groupId }) => {
    const request = __nccwpck_require__(720)
    const response = __nccwpck_require__(2509)
    return { request: request({ groupId }), response }
  },
  1: ({ groupId, coordinatorType = COORDINATOR_TYPES.GROUP }) => {
    const request = __nccwpck_require__(1676)
    const response = __nccwpck_require__(6726)
    return { request: request({ coordinatorKey: groupId, coordinatorType }), response }
  },
  2: ({ groupId, coordinatorType = COORDINATOR_TYPES.GROUP }) => {
    const request = __nccwpck_require__(5299)
    const response = __nccwpck_require__(7792)
    return { request: request({ coordinatorKey: groupId, coordinatorType }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 720:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { GroupCoordinator: apiKey } = __nccwpck_require__(686)

/**
 * FindCoordinator Request (Version: 0) => group_id
 *   group_id => STRING
 */

module.exports = ({ groupId }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'GroupCoordinator',
  encode: async () => {
    return new Encoder().writeString(groupId)
  },
})


/***/ }),

/***/ 2509:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * FindCoordinator Response (Version: 0) => error_code coordinator
 *  error_code => INT16
 *  coordinator => node_id host port
 *    node_id => INT32
 *    host => STRING
 *    port => INT32
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  const coordinator = {
    nodeId: decoder.readInt32(),
    host: decoder.readString(),
    port: decoder.readInt32(),
  }

  return {
    errorCode,
    coordinator,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 1676:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { GroupCoordinator: apiKey } = __nccwpck_require__(686)

/**
 * FindCoordinator Request (Version: 1) => coordinator_key coordinator_type
 *   coordinator_key => STRING
 *   coordinator_type => INT8
 */

module.exports = ({ coordinatorKey, coordinatorType }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'GroupCoordinator',
  encode: async () => {
    return new Encoder().writeString(coordinatorKey).writeInt8(coordinatorType)
  },
})


/***/ }),

/***/ 6726:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * FindCoordinator Response (Version: 1) => throttle_time_ms error_code error_message coordinator
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   coordinator => node_id host port
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  const errorMessage = decoder.readString()
  const coordinator = {
    nodeId: decoder.readInt32(),
    host: decoder.readString(),
    port: decoder.readInt32(),
  }

  return {
    throttleTime,
    errorCode,
    errorMessage,
    coordinator,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 5299:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(1676)

/**
 * FindCoordinator Request (Version: 2) => coordinator_key coordinator_type
 *   coordinator_key => STRING
 *   coordinator_type => INT8
 */

module.exports = ({ coordinatorKey, coordinatorType }) =>
  Object.assign(requestV1({ coordinatorKey, coordinatorType }), { apiVersion: 2 })


/***/ }),

/***/ 7792:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(6726)

/**
 * Starting in version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * FindCoordinator Response (Version: 1) => throttle_time_ms error_code error_message coordinator
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   coordinator => node_id host port
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 9114:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ groupId, groupGenerationId, memberId }) => {
    const request = __nccwpck_require__(7988)
    const response = __nccwpck_require__(3640)
    return {
      request: request({ groupId, groupGenerationId, memberId }),
      response,
    }
  },
  1: ({ groupId, groupGenerationId, memberId }) => {
    const request = __nccwpck_require__(81)
    const response = __nccwpck_require__(568)
    return {
      request: request({ groupId, groupGenerationId, memberId }),
      response,
    }
  },
  2: ({ groupId, groupGenerationId, memberId }) => {
    const request = __nccwpck_require__(4372)
    const response = __nccwpck_require__(2228)
    return {
      request: request({ groupId, groupGenerationId, memberId }),
      response,
    }
  },
  3: ({ groupId, groupGenerationId, memberId, groupInstanceId }) => {
    const request = __nccwpck_require__(6914)
    const response = __nccwpck_require__(4119)
    return {
      request: request({ groupId, groupGenerationId, memberId, groupInstanceId }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 7988:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Heartbeat: apiKey } = __nccwpck_require__(686)

/**
 * Heartbeat Request (Version: 0) => group_id group_generation_id member_id
 *   group_id => STRING
 *   group_generation_id => INT32
 *   member_id => STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'Heartbeat',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
  },
})


/***/ }),

/***/ 3640:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * Heartbeat Response (Version: 0) => error_code
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return { errorCode }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 81:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(7988)

/**
 * Heartbeat Request (Version: 1) => group_id generation_id member_id
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId }) =>
  Object.assign(requestV0({ groupId, groupGenerationId, memberId }), { apiVersion: 1 })


/***/ }),

/***/ 568:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failIfVersionNotSupported } = __nccwpck_require__(5903)
const { parse: parseV0 } = __nccwpck_require__(3640)

/**
 * Heartbeat Response (Version: 1) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return { throttleTime, errorCode }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 4372:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(81)

/**
 * Heartbeat Request (Version: 2) => group_id generation_id member_id
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId }) =>
  Object.assign(requestV1({ groupId, groupGenerationId, memberId }), { apiVersion: 2 })


/***/ }),

/***/ 2228:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(568)

/**
 * In version 2 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * Heartbeat Response (Version: 2) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6914:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Heartbeat: apiKey } = __nccwpck_require__(686)

/**
 * Version 3 adds group_instance_id to indicate member identity across restarts.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-345%3A+Introduce+static+membership+protocol+to+reduce+consumer+rebalances
 *
 * Heartbeat Request (Version: 3) => group_id generation_id member_id group_instance_id
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_instance_id => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, groupInstanceId }) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'Heartbeat',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
      .writeString(groupInstanceId)
  },
})


/***/ }),

/***/ 4119:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode } = __nccwpck_require__(2228)

/**
 * Heartbeat Response (Version: 3) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 5489:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const apiKeys = __nccwpck_require__(686)
const { KafkaJSServerDoesNotSupportApiKey, KafkaJSNotImplemented } = __nccwpck_require__(5073)

/**
 * @typedef {(options?: Object) => { request: any, response: any, logResponseErrors?: boolean }} Request
 */

/**
 * @typedef {Object} RequestDefinitions
 * @property {string[]} versions
 * @property {({ version: number }) => Request} protocol
 */

/**
 * @typedef {(apiKey: number, definitions: RequestDefinitions) => Request} Lookup
 */

/** @type {RequestDefinitions} */
const noImplementedRequestDefinitions = {
  versions: [],
  protocol: () => {
    throw new KafkaJSNotImplemented()
  },
}

/**
 * @type {{[apiName: string]: RequestDefinitions}}
 */
const requests = {
  Produce: __nccwpck_require__(3753),
  Fetch: __nccwpck_require__(8708),
  ListOffsets: __nccwpck_require__(4620),
  Metadata: __nccwpck_require__(3931),
  LeaderAndIsr: noImplementedRequestDefinitions,
  StopReplica: noImplementedRequestDefinitions,
  UpdateMetadata: noImplementedRequestDefinitions,
  ControlledShutdown: noImplementedRequestDefinitions,
  OffsetCommit: __nccwpck_require__(59),
  OffsetFetch: __nccwpck_require__(2380),
  GroupCoordinator: __nccwpck_require__(8770),
  JoinGroup: __nccwpck_require__(2484),
  Heartbeat: __nccwpck_require__(9114),
  LeaveGroup: __nccwpck_require__(5272),
  SyncGroup: __nccwpck_require__(3641),
  DescribeGroups: __nccwpck_require__(1177),
  ListGroups: __nccwpck_require__(3092),
  SaslHandshake: __nccwpck_require__(609),
  ApiVersions: __nccwpck_require__(7836),
  CreateTopics: __nccwpck_require__(3244),
  DeleteTopics: __nccwpck_require__(8910),
  DeleteRecords: __nccwpck_require__(9127),
  InitProducerId: __nccwpck_require__(5434),
  OffsetForLeaderEpoch: noImplementedRequestDefinitions,
  AddPartitionsToTxn: __nccwpck_require__(6796),
  AddOffsetsToTxn: __nccwpck_require__(6158),
  EndTxn: __nccwpck_require__(4558),
  WriteTxnMarkers: noImplementedRequestDefinitions,
  TxnOffsetCommit: __nccwpck_require__(6983),
  DescribeAcls: __nccwpck_require__(6434),
  CreateAcls: __nccwpck_require__(3110),
  DeleteAcls: __nccwpck_require__(8926),
  DescribeConfigs: __nccwpck_require__(7786),
  AlterConfigs: __nccwpck_require__(9200),
  AlterReplicaLogDirs: noImplementedRequestDefinitions,
  DescribeLogDirs: noImplementedRequestDefinitions,
  SaslAuthenticate: __nccwpck_require__(8847),
  CreatePartitions: __nccwpck_require__(2540),
  CreateDelegationToken: noImplementedRequestDefinitions,
  RenewDelegationToken: noImplementedRequestDefinitions,
  ExpireDelegationToken: noImplementedRequestDefinitions,
  DescribeDelegationToken: noImplementedRequestDefinitions,
  DeleteGroups: __nccwpck_require__(3867),
}

const names = Object.keys(apiKeys)
const keys = Object.values(apiKeys)
const findApiName = apiKey => names[keys.indexOf(apiKey)]

/**
 * @param {import("../../../types").ApiVersions} versions
 * @returns {Lookup}
 */
const lookup = versions => (apiKey, definition) => {
  const version = versions[apiKey]
  const availableVersions = definition.versions.map(Number)
  const bestImplementedVersion = Math.max(...availableVersions)

  if (!version || version.maxVersion == null) {
    throw new KafkaJSServerDoesNotSupportApiKey(
      `The Kafka server does not support the requested API version`,
      { apiKey, apiName: findApiName(apiKey) }
    )
  }

  const bestSupportedVersion = Math.min(bestImplementedVersion, version.maxVersion)
  return definition.protocol({ version: bestSupportedVersion })
}

module.exports = {
  requests,
  lookup,
}


/***/ }),

/***/ 5434:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ transactionalId, transactionTimeout = 5000 }) => {
    const request = __nccwpck_require__(2608)
    const response = __nccwpck_require__(4809)
    return { request: request({ transactionalId, transactionTimeout }), response }
  },
  1: ({ transactionalId, transactionTimeout = 5000 }) => {
    const request = __nccwpck_require__(4921)
    const response = __nccwpck_require__(5847)
    return { request: request({ transactionalId, transactionTimeout }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 2608:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { InitProducerId: apiKey } = __nccwpck_require__(686)

/**
 * InitProducerId Request (Version: 0) => transactional_id transaction_timeout_ms
 *   transactional_id => NULLABLE_STRING
 *   transaction_timeout_ms => INT32
 */

module.exports = ({ transactionalId, transactionTimeout }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'InitProducerId',
  encode: async () => {
    return new Encoder().writeString(transactionalId).writeInt32(transactionTimeout)
  },
})


/***/ }),

/***/ 4809:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * InitProducerId Response (Version: 0) => throttle_time_ms error_code producer_id producer_epoch
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   producer_id => INT64
 *   producer_epoch => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
    producerId: decoder.readInt64().toString(),
    producerEpoch: decoder.readInt16(),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 4921:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(2608)

/**
 * InitProducerId Request (Version: 1) => transactional_id transaction_timeout_ms
 *   transactional_id => NULLABLE_STRING
 *   transaction_timeout_ms => INT32
 */

module.exports = ({ transactionalId, transactionTimeout }) =>
  Object.assign(requestV0({ transactionalId, transactionTimeout }), { apiVersion: 1 })


/***/ }),

/***/ 5847:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV0 } = __nccwpck_require__(4809)

/**
 * Starting in version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * InitProducerId Response (Version: 0) => throttle_time_ms error_code producer_id producer_epoch
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   producer_id => INT64
 *   producer_epoch => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV0(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 2484:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const NETWORK_DELAY = 5000

/**
 * @see https://github.com/apache/kafka/pull/5203
 * The JOIN_GROUP request may block up to sessionTimeout (or rebalanceTimeout in JoinGroupV1),
 * so we should override the requestTimeout to be a bit more than the sessionTimeout
 * NOTE: the sessionTimeout can be configured as Number.MAX_SAFE_INTEGER and overflow when
 * increased, so we have to check for potential overflows
 **/
const requestTimeout = ({ rebalanceTimeout, sessionTimeout }) => {
  const timeout = rebalanceTimeout || sessionTimeout
  return Number.isSafeInteger(timeout + NETWORK_DELAY) ? timeout + NETWORK_DELAY : timeout
}

const logResponseError = memberId => memberId != null && memberId !== ''

const versions = {
  0: ({ groupId, sessionTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __nccwpck_require__(7059)
    const response = __nccwpck_require__(8054)

    return {
      request: request({
        groupId,
        sessionTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout: null, sessionTimeout }),
    }
  },
  1: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __nccwpck_require__(4225)
    const response = __nccwpck_require__(4986)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
    }
  },
  2: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __nccwpck_require__(5862)
    const response = __nccwpck_require__(9480)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
    }
  },
  3: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __nccwpck_require__(642)
    const response = __nccwpck_require__(2333)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
    }
  },
  4: ({ groupId, sessionTimeout, rebalanceTimeout, memberId, protocolType, groupProtocols }) => {
    const request = __nccwpck_require__(3356)
    const response = __nccwpck_require__(6015)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
      logResponseError: logResponseError(memberId),
    }
  },
  5: ({
    groupId,
    sessionTimeout,
    rebalanceTimeout,
    memberId,
    groupInstanceId,
    protocolType,
    groupProtocols,
  }) => {
    const request = __nccwpck_require__(1653)
    const response = __nccwpck_require__(6224)

    return {
      request: request({
        groupId,
        sessionTimeout,
        rebalanceTimeout,
        memberId,
        groupInstanceId,
        protocolType,
        groupProtocols,
      }),
      response,
      requestTimeout: requestTimeout({ rebalanceTimeout, sessionTimeout }),
      logResponseError: logResponseError(memberId),
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 7059:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { JoinGroup: apiKey } = __nccwpck_require__(686)

/**
 * JoinGroup Request (Version: 0) => group_id session_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({ groupId, sessionTimeout, memberId, protocolType, groupProtocols }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'JoinGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(sessionTimeout)
      .writeString(memberId)
      .writeString(protocolType)
      .writeArray(groupProtocols.map(encodeGroupProtocols))
  },
})

const encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
  return new Encoder().writeString(name).writeBytes(metadata)
}


/***/ }),

/***/ 8054:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * JoinGroup Response (Version: 0) => error_code generation_id group_protocol leader_id member_id [members]
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    errorCode,
    generationId: decoder.readInt32(),
    groupProtocol: decoder.readString(),
    leaderId: decoder.readString(),
    memberId: decoder.readString(),
    members: decoder.readArray(decoder => ({
      memberId: decoder.readString(),
      memberMetadata: decoder.readBytes(),
    })),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 4225:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { JoinGroup: apiKey } = __nccwpck_require__(686)

/**
 * JoinGroup Request (Version: 1) => group_id session_timeout rebalance_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  protocolType,
  groupProtocols,
}) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'JoinGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(sessionTimeout)
      .writeInt32(rebalanceTimeout)
      .writeString(memberId)
      .writeString(protocolType)
      .writeArray(groupProtocols.map(encodeGroupProtocols))
  },
})

const encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
  return new Encoder().writeString(name).writeBytes(metadata)
}


/***/ }),

/***/ 4986:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode } = __nccwpck_require__(8054)

/**
 * JoinGroup Response (Version: 1) => error_code generation_id group_protocol leader_id member_id [members]
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 5862:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(4225)

/**
 * JoinGroup Request (Version: 2) => group_id session_timeout rebalance_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  protocolType,
  groupProtocols,
}) =>
  Object.assign(
    requestV1({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols,
    }),
    { apiVersion: 2 }
  )


/***/ }),

/***/ 9480:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failIfVersionNotSupported } = __nccwpck_require__(5903)
const { parse: parseV0 } = __nccwpck_require__(8054)

/**
 * JoinGroup Response (Version: 2) => throttle_time_ms error_code generation_id group_protocol leader_id member_id [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
    generationId: decoder.readInt32(),
    groupProtocol: decoder.readString(),
    leaderId: decoder.readString(),
    memberId: decoder.readString(),
    members: decoder.readArray(decoder => ({
      memberId: decoder.readString(),
      memberMetadata: decoder.readBytes(),
    })),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 642:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV2 = __nccwpck_require__(5862)

/**
 * JoinGroup Request (Version: 3) => group_id session_timeout rebalance_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  protocolType,
  groupProtocols,
}) =>
  Object.assign(
    requestV2({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols,
    }),
    { apiVersion: 3 }
  )


/***/ }),

/***/ 2333:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV2 } = __nccwpck_require__(9480)

/**
 * Starting in version 3, on quota violation, brokers send out responses
 * before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * JoinGroup Response (Version: 3) => throttle_time_ms error_code generation_id group_protocol leader_id member_id [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */
const decode = async rawData => {
  const decoded = await decodeV2(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 3356:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV3 = __nccwpck_require__(642)

/**
 * Starting in version 4, the client needs to issue a second request to join group
 * with assigned id.
 *
 * JoinGroup Request (Version: 4) => group_id session_timeout rebalance_timeout member_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  protocolType,
  groupProtocols,
}) =>
  Object.assign(
    requestV3({
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      protocolType,
      groupProtocols,
    }),
    { apiVersion: 4 }
  )


/***/ }),

/***/ 6015:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode } = __nccwpck_require__(2333)
const { KafkaJSMemberIdRequired } = __nccwpck_require__(5073)
const { failure, createErrorFromCode, errorCodes } = __nccwpck_require__(5903)

/**
 * JoinGroup Response (Version: 4) => throttle_time_ms error_code generation_id group_protocol leader_id member_id [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id member_metadata
 *     member_id => STRING
 *     member_metadata => BYTES
 */

const { code: MEMBER_ID_REQUIRED_ERROR_CODE } = errorCodes.find(
  e => e.type === 'MEMBER_ID_REQUIRED'
)

const parse = async data => {
  if (failure(data.errorCode)) {
    if (data.errorCode === MEMBER_ID_REQUIRED_ERROR_CODE) {
      throw new KafkaJSMemberIdRequired(createErrorFromCode(data.errorCode), {
        memberId: data.memberId,
      })
    }

    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 1653:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { JoinGroup: apiKey } = __nccwpck_require__(686)

/**
 * Version 5 adds group_instance_id to identify members across restarts.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-345%3A+Introduce+static+membership+protocol+to+reduce+consumer+rebalances
 *
 * JoinGroup Request (Version: 5) => group_id session_timeout rebalance_timeout member_id group_instance_id protocol_type [group_protocols]
 *   group_id => STRING
 *   session_timeout => INT32
 *   rebalance_timeout => INT32
 *   member_id => STRING
 *   group_instance_id => NULLABLE_STRING
 *   protocol_type => STRING
 *   group_protocols => protocol_name protocol_metadata
 *     protocol_name => STRING
 *     protocol_metadata => BYTES
 */

module.exports = ({
  groupId,
  sessionTimeout,
  rebalanceTimeout,
  memberId,
  groupInstanceId = null,
  protocolType,
  groupProtocols,
}) => ({
  apiKey,
  apiVersion: 5,
  apiName: 'JoinGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(sessionTimeout)
      .writeInt32(rebalanceTimeout)
      .writeString(memberId)
      .writeString(groupInstanceId)
      .writeString(protocolType)
      .writeArray(groupProtocols.map(encodeGroupProtocols))
  },
})

const encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
  return new Encoder().writeString(name).writeBytes(metadata)
}


/***/ }),

/***/ 6224:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { KafkaJSMemberIdRequired } = __nccwpck_require__(5073)
const {
  failure,
  createErrorFromCode,
  errorCodes,
  failIfVersionNotSupported,
} = __nccwpck_require__(5903)

/**
 * JoinGroup Response (Version: 5) => throttle_time_ms error_code generation_id group_protocol leader_id member_id [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   generation_id => INT32
 *   group_protocol => STRING
 *   leader_id => STRING
 *   member_id => STRING
 *   members => member_id group_instance_id metadata
 *     member_id => STRING
 *     group_instance_id => NULLABLE_STRING
 *     member_metadata => BYTES
 */
const { code: MEMBER_ID_REQUIRED_ERROR_CODE } = errorCodes.find(
  e => e.type === 'MEMBER_ID_REQUIRED'
)

const parse = async data => {
  if (failure(data.errorCode)) {
    if (data.errorCode === MEMBER_ID_REQUIRED_ERROR_CODE) {
      throw new KafkaJSMemberIdRequired(createErrorFromCode(data.errorCode), {
        memberId: data.memberId,
      })
    }

    throw createErrorFromCode(data.errorCode)
  }

  return data
}

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime: 0,
    clientSideThrottleTime: throttleTime,
    errorCode,
    generationId: decoder.readInt32(),
    groupProtocol: decoder.readString(),
    leaderId: decoder.readString(),
    memberId: decoder.readString(),
    members: decoder.readArray(decoder => ({
      memberId: decoder.readString(),
      groupInstanceId: decoder.readString(),
      memberMetadata: decoder.readBytes(),
    })),
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 5272:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ groupId, memberId }) => {
    const request = __nccwpck_require__(7590)
    const response = __nccwpck_require__(9458)
    return {
      request: request({ groupId, memberId }),
      response,
    }
  },
  1: ({ groupId, memberId }) => {
    const request = __nccwpck_require__(6130)
    const response = __nccwpck_require__(5805)
    return {
      request: request({ groupId, memberId }),
      response,
    }
  },
  2: ({ groupId, memberId }) => {
    const request = __nccwpck_require__(672)
    const response = __nccwpck_require__(6389)
    return {
      request: request({ groupId, memberId }),
      response,
    }
  },
  3: ({ groupId, memberId, groupInstanceId }) => {
    const request = __nccwpck_require__(2621)
    const response = __nccwpck_require__(5032)
    return {
      request: request({ groupId, members: [{ memberId, groupInstanceId }] }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 7590:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { LeaveGroup: apiKey } = __nccwpck_require__(686)

/**
 * LeaveGroup Request (Version: 0) => group_id member_id
 *   group_id => STRING
 *   member_id => STRING
 */

module.exports = ({ groupId, memberId }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'LeaveGroup',
  encode: async () => {
    return new Encoder().writeString(groupId).writeString(memberId)
  },
})


/***/ }),

/***/ 9458:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * LeaveGroup Response (Version: 0) => error_code
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return { errorCode }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6130:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(7590)

/**
 * LeaveGroup Request (Version: 1) => group_id member_id
 *   group_id => STRING
 *   member_id => STRING
 */

module.exports = ({ groupId, memberId }) =>
  Object.assign(requestV0({ groupId, memberId }), { apiVersion: 1 })


/***/ }),

/***/ 5805:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failIfVersionNotSupported } = __nccwpck_require__(5903)
const { parse: parseV0 } = __nccwpck_require__(9458)

/**
 * LeaveGroup Response (Version: 1) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return { throttleTime, errorCode }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 672:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(6130)

/**
 * LeaveGroup Request (Version: 2) => group_id member_id
 *   group_id => STRING
 *   member_id => STRING
 */

module.exports = ({ groupId, memberId }) =>
  Object.assign(requestV1({ groupId, memberId }), { apiVersion: 2 })


/***/ }),

/***/ 6389:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(5805)

/**
 * In version 2 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * LeaveGroup Response (Version: 2) => throttle_time_ms error_code
 *   throttle_time_ms => INT32
 *   error_code => INT16
 */
const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 2621:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { LeaveGroup: apiKey } = __nccwpck_require__(686)

/**
 * Version 3 changes leavegroup to operate on a batch of members
 * and adds group_instance_id to identify members across restarts.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-345%3A+Introduce+static+membership+protocol+to+reduce+consumer+rebalances
 *
 * LeaveGroup Request (Version: 3) => group_id [members]
 *   group_id => STRING
 *   members => member_id group_instance_id
 *     member_id => STRING
 *     group_instance_id => NULLABLE_STRING
 */

module.exports = ({ groupId, members }) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'LeaveGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeArray(members.map(member => encodeMember(member)))
  },
})

const encodeMember = ({ memberId, groupInstanceId = null }) => {
  return new Encoder().writeString(memberId).writeString(groupInstanceId)
}


/***/ }),

/***/ 5032:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failIfVersionNotSupported, failure, createErrorFromCode } = __nccwpck_require__(5903)
const { parse: parseV2 } = __nccwpck_require__(6389)

/**
 * LeaveGroup Response (Version: 3) => throttle_time_ms error_code [members]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   members => member_id group_instance_id error_code
 *     member_id => STRING
 *     group_instance_id => NULLABLE_STRING
 *     error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const members = decoder.readArray(decodeMembers)

  failIfVersionNotSupported(errorCode)

  return { throttleTime: 0, clientSideThrottleTime: throttleTime, errorCode, members }
}

const decodeMembers = decoder => ({
  memberId: decoder.readString(),
  groupInstanceId: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const parsed = parseV2(data)

  const memberWithError = data.members.find(member => failure(member.errorCode))
  if (memberWithError) {
    throw createErrorFromCode(memberWithError.errorCode)
  }

  return parsed
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 3092:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: () => {
    const request = __nccwpck_require__(7571)
    const response = __nccwpck_require__(6997)
    return { request: request(), response }
  },
  1: () => {
    const request = __nccwpck_require__(607)
    const response = __nccwpck_require__(722)
    return { request: request(), response }
  },
  2: () => {
    const request = __nccwpck_require__(1850)
    const response = __nccwpck_require__(1733)
    return { request: request(), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 7571:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { ListGroups: apiKey } = __nccwpck_require__(686)

/**
 * ListGroups Request (Version: 0)
 */

/**
 */
module.exports = () => ({
  apiKey,
  apiVersion: 0,
  apiName: 'ListGroups',
  encode: async () => {
    return new Encoder()
  },
})


/***/ }),

/***/ 6997:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * ListGroups Response (Version: 0) => error_code [groups]
 *   error_code => INT16
 *   groups => group_id protocol_type
 *     group_id => STRING
 *     protocol_type => STRING
 */

const decodeGroup = decoder => ({
  groupId: decoder.readString(),
  protocolType: decoder.readString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()
  const groups = decoder.readArray(decodeGroup)

  return {
    errorCode,
    groups,
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decodeGroup,
  decode,
  parse,
}


/***/ }),

/***/ 607:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(7571)

/**
 * ListGroups Request (Version: 1)
 */

module.exports = () => Object.assign(requestV0(), { apiVersion: 1 })


/***/ }),

/***/ 722:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const responseV0 = __nccwpck_require__(6997)

const Decoder = __nccwpck_require__(9991)

/**
 * ListGroups Response (Version: 1) => error_code [groups]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   groups => group_id protocol_type
 *     group_id => STRING
 *     protocol_type => STRING
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  const groups = decoder.readArray(responseV0.decodeGroup)

  return {
    throttleTime,
    errorCode,
    groups,
  }
}

module.exports = {
  decode,
  parse: responseV0.parse,
}


/***/ }),

/***/ 1850:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(607)

/**
 * ListGroups Request (Version: 2)
 */

module.exports = () => Object.assign(requestV1(), { apiVersion: 2 })


/***/ }),

/***/ 1733:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(722)

/**
 * In version 2 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * ListGroups Response (Version: 2) => error_code [groups]
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   groups => group_id protocol_type
 *     group_id => STRING
 *     protocol_type => STRING
 */
const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 4620:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const ISOLATION_LEVEL = __nccwpck_require__(4596)

// For normal consumers, use -1
const REPLICA_ID = -1

const versions = {
  0: ({ replicaId = REPLICA_ID, topics }) => {
    const request = __nccwpck_require__(5424)
    const response = __nccwpck_require__(4450)
    return { request: request({ replicaId, topics }), response }
  },
  1: ({ replicaId = REPLICA_ID, topics }) => {
    const request = __nccwpck_require__(4957)
    const response = __nccwpck_require__(8112)
    return { request: request({ replicaId, topics }), response }
  },
  2: ({ replicaId = REPLICA_ID, isolationLevel = ISOLATION_LEVEL.READ_COMMITTED, topics }) => {
    const request = __nccwpck_require__(9040)
    const response = __nccwpck_require__(5170)
    return { request: request({ replicaId, isolationLevel, topics }), response }
  },
  3: ({ replicaId = REPLICA_ID, isolationLevel = ISOLATION_LEVEL.READ_COMMITTED, topics }) => {
    const request = __nccwpck_require__(6554)
    const response = __nccwpck_require__(2955)
    return { request: request({ replicaId, isolationLevel, topics }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 5424:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { ListOffsets: apiKey } = __nccwpck_require__(686)

/**
 * ListOffsets Request (Version: 0) => replica_id [topics]
 *   replica_id => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition timestamp max_num_offsets
 *       partition => INT32
 *       timestamp => INT64
 *       max_num_offsets => INT32
 */

/**
 * @param {number} replicaId
 * @param {object} topics use timestamp=-1 for latest offsets and timestamp=-2 for earliest.
 *                        Default timestamp=-1. Example:
 *                          {
 *                            topics: [
 *                              {
 *                                topic: 'topic-name',
 *                                partitions: [{ partition: 0, timestamp: -1 }]
 *                              }
 *                            ]
 *                          }
 */
module.exports = ({ replicaId, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'ListOffsets',
  encode: async () => {
    return new Encoder().writeInt32(replicaId).writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, timestamp = -1, maxNumOffsets = 1 }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(timestamp)
    .writeInt32(maxNumOffsets)
}


/***/ }),

/***/ 4450:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * Offsets Response (Version: 0) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code [offsets]
 *       partition => INT32
 *       error_code => INT16
 *       offsets => INT64
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  offsets: decoder.readArray(decodeOffsets),
})

const decodeOffsets = decoder => decoder.readInt64().toString()

const parse = async data => {
  const partitionsWithError = data.responses.flatMap(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = partitionsWithError[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 4957:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { ListOffsets: apiKey } = __nccwpck_require__(686)

/**
 * ListOffsets Request (Version: 1) => replica_id [topics]
 *   replica_id => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition timestamp
 *       partition => INT32
 *       timestamp => INT64
 */
module.exports = ({ replicaId, topics }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'ListOffsets',
  encode: async () => {
    return new Encoder().writeInt32(replicaId).writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, timestamp = -1 }) => {
  return new Encoder().writeInt32(partition).writeInt64(timestamp)
}


/***/ }),

/***/ 8112:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * ListOffsets Response (Version: 1) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code timestamp offset
 *       partition => INT32
 *       error_code => INT16
 *       timestamp => INT64
 *       offset => INT64
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)

  return {
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  timestamp: decoder.readInt64().toString(),
  offset: decoder.readInt64().toString(),
})

const parse = async data => {
  const partitionsWithError = data.responses.flatMap(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = partitionsWithError[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 9040:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { ListOffsets: apiKey } = __nccwpck_require__(686)

/**
 * ListOffsets Request (Version: 2) => replica_id isolation_level [topics]
 *   replica_id => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition timestamp
 *       partition => INT32
 *       timestamp => INT64
 */
module.exports = ({ replicaId, isolationLevel, topics }) => ({
  apiKey,
  apiVersion: 2,
  apiName: 'ListOffsets',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt8(isolationLevel)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, timestamp = -1 }) => {
  return new Encoder().writeInt32(partition).writeInt64(timestamp)
}


/***/ }),

/***/ 5170:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * ListOffsets Response (Version: 2) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code timestamp offset
 *       partition => INT32
 *       error_code => INT16
 *       timestamp => INT64
 *       offset => INT64
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)

  return {
    throttleTime: decoder.readInt32(),
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  timestamp: decoder.readInt64().toString(),
  offset: decoder.readInt64().toString(),
})

const parse = async data => {
  const partitionsWithError = data.responses.flatMap(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = partitionsWithError[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6554:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV2 = __nccwpck_require__(9040)

/**
 * ListOffsets Request (Version: 3) => replica_id isolation_level [topics]
 *   replica_id => INT32
 *   isolation_level => INT8
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition timestamp
 *       partition => INT32
 *       timestamp => INT64
 */
module.exports = ({ replicaId, isolationLevel, topics }) =>
  Object.assign(requestV2({ replicaId, isolationLevel, topics }), { apiVersion: 3 })


/***/ }),

/***/ 2955:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV2 } = __nccwpck_require__(5170)

/**
 * In version 3 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * ListOffsets Response (Version: 3) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code timestamp offset
 *       partition => INT32
 *       error_code => INT16
 *       timestamp => INT64
 *       offset => INT64
 */
const decode = async rawData => {
  const decoded = await decodeV2(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 3931:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ topics }) => {
    const request = __nccwpck_require__(1781)
    const response = __nccwpck_require__(706)
    return { request: request({ topics }), response }
  },
  1: ({ topics }) => {
    const request = __nccwpck_require__(9645)
    const response = __nccwpck_require__(9024)
    return { request: request({ topics }), response }
  },
  2: ({ topics }) => {
    const request = __nccwpck_require__(9698)
    const response = __nccwpck_require__(1478)
    return { request: request({ topics }), response }
  },
  3: ({ topics }) => {
    const request = __nccwpck_require__(711)
    const response = __nccwpck_require__(4997)
    return { request: request({ topics }), response }
  },
  4: ({ topics, allowAutoTopicCreation }) => {
    const request = __nccwpck_require__(4722)
    const response = __nccwpck_require__(5667)
    return { request: request({ topics, allowAutoTopicCreation }), response }
  },
  5: ({ topics, allowAutoTopicCreation }) => {
    const request = __nccwpck_require__(2767)
    const response = __nccwpck_require__(2368)
    return { request: request({ topics, allowAutoTopicCreation }), response }
  },
  6: ({ topics, allowAutoTopicCreation }) => {
    const request = __nccwpck_require__(6695)
    const response = __nccwpck_require__(6308)
    return { request: request({ topics, allowAutoTopicCreation }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 1781:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Metadata: apiKey } = __nccwpck_require__(686)

/**
 * Metadata Request (Version: 0) => [topics]
 *   topics => STRING
 */

module.exports = ({ topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'Metadata',
  encode: async () => {
    return new Encoder().writeArray(topics)
  },
})


/***/ }),

/***/ 706:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * Metadata Response (Version: 0) => [brokers] [topic_metadata]
 *   brokers => node_id host port
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *   topic_metadata => topic_error_code topic [partition_metadata]
 *     topic_error_code => INT16
 *     topic => STRING
 *     partition_metadata => partition_error_code partition_id leader [replicas] [isr]
 *       partition_error_code => INT16
 *       partition_id => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  // leader: The node id for the kafka broker currently acting as leader
  // for this partition
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    brokers: decoder.readArray(broker),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

const parse = async data => {
  const topicsWithErrors = data.topicMetadata.filter(topic => failure(topic.topicErrorCode))
  if (topicsWithErrors.length > 0) {
    const { topicErrorCode } = topicsWithErrors[0]
    throw createErrorFromCode(topicErrorCode)
  }

  const errors = data.topicMetadata.flatMap(topic => {
    return topic.partitionMetadata.filter(partition => failure(partition.partitionErrorCode))
  })

  if (errors.length > 0) {
    const { partitionErrorCode } = errors[0]
    throw createErrorFromCode(partitionErrorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 9645:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Metadata: apiKey } = __nccwpck_require__(686)

/**
 * Metadata Request (Version: 1) => [topics]
 *   topics => STRING
 */

module.exports = ({ topics }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'Metadata',
  encode: async () => {
    return new Encoder().writeNullableArray(topics)
  },
})


/***/ }),

/***/ 9024:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(706)

/**
 * Metadata Response (Version: 1) => [brokers] controller_id [topic_metadata]
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => topic_error_code topic is_internal [partition_metadata]
 *     topic_error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => partition_error_code partition_id leader [replicas] [isr]
 *       partition_error_code => INT16
 *       partition_id => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
  rack: decoder.readString(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  isInternal: decoder.readBoolean(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    brokers: decoder.readArray(broker),
    controllerId: decoder.readInt32(),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 9698:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(9645)

/**
 * Metadata Request (Version: 2) => [topics]
 *   topics => STRING
 */

module.exports = ({ topics }) => Object.assign(requestV1({ topics }), { apiVersion: 2 })


/***/ }),

/***/ 1478:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(706)

/**
 * Metadata Response (Version: 2) => [brokers] cluster_id controller_id [topic_metadata]
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => topic_error_code topic is_internal [partition_metadata]
 *     topic_error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => partition_error_code partition_id leader [replicas] [isr]
 *       partition_error_code => INT16
 *       partition_id => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
  rack: decoder.readString(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  isInternal: decoder.readBoolean(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    brokers: decoder.readArray(broker),
    clusterId: decoder.readString(),
    controllerId: decoder.readInt32(),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 711:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(9645)

/**
 * Metadata Request (Version: 3) => [topics]
 *   topics => STRING
 */

module.exports = ({ topics }) => Object.assign(requestV1({ topics }), { apiVersion: 3 })


/***/ }),

/***/ 4997:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(706)

/**
 * Metadata Response (Version: 3) => throttle_time_ms [brokers] cluster_id controller_id [topic_metadata]
 *   throttle_time_ms => INT32
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => error_code topic is_internal [partition_metadata]
 *     error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => error_code partition leader [replicas] [isr]
 *       error_code => INT16
 *       partition => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
  rack: decoder.readString(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  isInternal: decoder.readBoolean(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    brokers: decoder.readArray(broker),
    clusterId: decoder.readString(),
    controllerId: decoder.readInt32(),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 4722:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Metadata: apiKey } = __nccwpck_require__(686)

/**
 * Metadata Request (Version: 4) => [topics] allow_auto_topic_creation
 *   topics => STRING
 *   allow_auto_topic_creation => BOOLEAN
 */

module.exports = ({ topics, allowAutoTopicCreation = true }) => ({
  apiKey,
  apiVersion: 4,
  apiName: 'Metadata',
  encode: async () => {
    return new Encoder().writeNullableArray(topics).writeBoolean(allowAutoTopicCreation)
  },
})


/***/ }),

/***/ 5667:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse: parseV3, decode: decodeV3 } = __nccwpck_require__(4997)

/**
 * Metadata Response (Version: 4) => throttle_time_ms [brokers] cluster_id controller_id [topic_metadata]
 *   throttle_time_ms => INT32
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => error_code topic is_internal [partition_metadata]
 *     error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => error_code partition leader [replicas] [isr]
 *       error_code => INT16
 *       partition => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

module.exports = {
  parse: parseV3,
  decode: decodeV3,
}


/***/ }),

/***/ 2767:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV4 = __nccwpck_require__(4722)

/**
 * Metadata Request (Version: 5) => [topics] allow_auto_topic_creation
 *   topics => STRING
 *   allow_auto_topic_creation => BOOLEAN
 */

module.exports = ({ topics, allowAutoTopicCreation = true }) =>
  Object.assign(requestV4({ topics, allowAutoTopicCreation }), { apiVersion: 5 })


/***/ }),

/***/ 2368:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(706)

/**
 * Metadata Response (Version: 5) => throttle_time_ms [brokers] cluster_id controller_id [topic_metadata]
 *   throttle_time_ms => INT32
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => error_code topic is_internal [partition_metadata]
 *     error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => error_code partition leader [replicas] [isr] [offline_replicas]
 *       error_code => INT16
 *       partition => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 *       offline_replicas => INT32
 */

const broker = decoder => ({
  nodeId: decoder.readInt32(),
  host: decoder.readString(),
  port: decoder.readInt32(),
  rack: decoder.readString(),
})

const topicMetadata = decoder => ({
  topicErrorCode: decoder.readInt16(),
  topic: decoder.readString(),
  isInternal: decoder.readBoolean(),
  partitionMetadata: decoder.readArray(partitionMetadata),
})

const partitionMetadata = decoder => ({
  partitionErrorCode: decoder.readInt16(),
  partitionId: decoder.readInt32(),
  leader: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
  isr: decoder.readArray(d => d.readInt32()),
  offlineReplicas: decoder.readArray(d => d.readInt32()),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    brokers: decoder.readArray(broker),
    clusterId: decoder.readString(),
    controllerId: decoder.readInt32(),
    topicMetadata: decoder.readArray(topicMetadata),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 6695:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV5 = __nccwpck_require__(2767)

/**
 * Metadata Request (Version: 6) => [topics] allow_auto_topic_creation
 *   topics => STRING
 *   allow_auto_topic_creation => BOOLEAN
 */

module.exports = ({ topics, allowAutoTopicCreation = true }) =>
  Object.assign(requestV5({ topics, allowAutoTopicCreation }), { apiVersion: 6 })


/***/ }),

/***/ 6308:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(2368)

/**
 * In version 6 on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * Metadata Response (Version: 6) => throttle_time_ms [brokers] cluster_id controller_id [topic_metadata]
 *   throttle_time_ms => INT32
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => error_code topic is_internal [partition_metadata]
 *     error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => error_code partition leader [replicas] [isr] [offline_replicas]
 *       error_code => INT16
 *       partition => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 *       offline_replicas => INT32
 */
const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 59:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// This value signals to the broker that its default configuration should be used.
const RETENTION_TIME = -1

const versions = {
  0: ({ groupId, topics }) => {
    const request = __nccwpck_require__(7213)
    const response = __nccwpck_require__(6169)
    return { request: request({ groupId, topics }), response }
  },
  1: ({ groupId, groupGenerationId, memberId, topics }) => {
    const request = __nccwpck_require__(1551)
    const response = __nccwpck_require__(4250)
    return { request: request({ groupId, groupGenerationId, memberId, topics }), response }
  },
  2: ({ groupId, groupGenerationId, memberId, retentionTime = RETENTION_TIME, topics }) => {
    const request = __nccwpck_require__(9985)
    const response = __nccwpck_require__(6371)
    return {
      request: request({
        groupId,
        groupGenerationId,
        memberId,
        retentionTime,
        topics,
      }),
      response,
    }
  },
  3: ({ groupId, groupGenerationId, memberId, retentionTime = RETENTION_TIME, topics }) => {
    const request = __nccwpck_require__(6197)
    const response = __nccwpck_require__(9784)
    return {
      request: request({
        groupId,
        groupGenerationId,
        memberId,
        retentionTime,
        topics,
      }),
      response,
    }
  },
  4: ({ groupId, groupGenerationId, memberId, retentionTime = RETENTION_TIME, topics }) => {
    const request = __nccwpck_require__(8503)
    const response = __nccwpck_require__(9781)
    return {
      request: request({
        groupId,
        groupGenerationId,
        memberId,
        retentionTime,
        topics,
      }),
      response,
    }
  },
  5: ({ groupId, groupGenerationId, memberId, topics }) => {
    const request = __nccwpck_require__(5937)
    const response = __nccwpck_require__(604)
    return {
      request: request({
        groupId,
        groupGenerationId,
        memberId,
        topics,
      }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 7213:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { OffsetCommit: apiKey } = __nccwpck_require__(686)

/**
 * OffsetCommit Request (Version: 0) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'OffsetCommit',
  encode: async () => {
    return new Encoder().writeString(groupId).writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, metadata = null }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeString(metadata)
}


/***/ }),

/***/ 6169:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * OffsetCommit Response (Version: 0) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const partitionsWithError = data.responses.flatMap(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = partitionsWithError[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 1551:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { OffsetCommit: apiKey } = __nccwpck_require__(686)

/**
 * OffsetCommit Request (Version: 1) => group_id group_generation_id member_id [topics]
 *   group_id => STRING
 *   group_generation_id => INT32
 *   member_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset timestamp metadata
 *       partition => INT32
 *       offset => INT64
 *       timestamp => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, topics }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'OffsetCommit',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, timestamp = Date.now(), metadata = null }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeInt64(timestamp)
    .writeString(metadata)
}


/***/ }),

/***/ 4250:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode } = __nccwpck_require__(6169)

/**
 * OffsetCommit Response (Version: 1) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 9985:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { OffsetCommit: apiKey } = __nccwpck_require__(686)

/**
 * OffsetCommit Request (Version: 2) => group_id group_generation_id member_id retention_time [topics]
 *   group_id => STRING
 *   group_generation_id => INT32
 *   member_id => STRING
 *   retention_time => INT64
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, retentionTime, topics }) => ({
  apiKey,
  apiVersion: 2,
  apiName: 'OffsetCommit',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
      .writeInt64(retentionTime)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, metadata = null }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeString(metadata)
}


/***/ }),

/***/ 6371:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode } = __nccwpck_require__(6169)

/**
 * OffsetCommit Response (Version: 1) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6197:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV2 = __nccwpck_require__(9985)

/**
 * OffsetCommit Request (Version: 3) => group_id generation_id member_id retention_time [topics]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   retention_time => INT64
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, retentionTime, topics }) =>
  Object.assign(requestV2({ groupId, groupGenerationId, memberId, retentionTime, topics }), {
    apiVersion: 3,
  })


/***/ }),

/***/ 9784:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(6169)

/**
 * OffsetCommit Response (Version: 3) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
})

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 8503:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV3 = __nccwpck_require__(6197)

/**
 * OffsetCommit Request (Version: 4) => group_id generation_id member_id retention_time [topics]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   retention_time => INT64
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, retentionTime, topics }) =>
  Object.assign(requestV3({ groupId, groupGenerationId, memberId, retentionTime, topics }), {
    apiVersion: 4,
  })


/***/ }),

/***/ 9781:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV3 } = __nccwpck_require__(9784)

/**
 * Starting in version 4, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * OffsetCommit Response (Version: 4) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV3(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 5937:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { OffsetCommit: apiKey } = __nccwpck_require__(686)

/**
 * Version 5 removes retention_time, as this is controlled by a broker setting
 *
 * OffsetCommit Request (Version: 4) => group_id generation_id member_id [topics]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, topics }) => ({
  apiKey,
  apiVersion: 5,
  apiName: 'OffsetCommit',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, metadata = null }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeString(metadata)
}


/***/ }),

/***/ 604:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode } = __nccwpck_require__(9781)

/**
 * OffsetCommit Response (Version: 5) => throttle_time_ms [responses]
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */
module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 2380:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  1: ({ groupId, topics }) => {
    const request = __nccwpck_require__(2184)
    const response = __nccwpck_require__(3470)
    return { request: request({ groupId, topics }), response }
  },
  2: ({ groupId, topics }) => {
    const request = __nccwpck_require__(6420)
    const response = __nccwpck_require__(4539)
    return { request: request({ groupId, topics }), response }
  },
  3: ({ groupId, topics }) => {
    const request = __nccwpck_require__(181)
    const response = __nccwpck_require__(8590)
    return { request: request({ groupId, topics }), response }
  },
  4: ({ groupId, topics }) => {
    const request = __nccwpck_require__(3644)
    const response = __nccwpck_require__(3276)
    return { request: request({ groupId, topics }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 2184:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { OffsetFetch: apiKey } = __nccwpck_require__(686)

/**
 * OffsetFetch Request (Version: 1) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition
 *       partition => INT32
 */

module.exports = ({ groupId, topics }) => ({
  apiKey,
  apiVersion: 1,
  apiName: 'OffsetFetch',
  encode: async () => {
    return new Encoder().writeString(groupId).writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition }) => {
  return new Encoder().writeInt32(partition)
}


/***/ }),

/***/ 3470:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * OffsetFetch Response (Version: 1) => [responses]
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition offset metadata error_code
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    responses: decoder.readArray(decodeResponses),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  offset: decoder.readInt64().toString(),
  metadata: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const partitionsWithError = data.responses.flatMap(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = partitionsWithError[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6420:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(2184)

/**
 * OffsetFetch Request (Version: 2) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition
 *       partition => INT32
 */

module.exports = ({ groupId, topics }) =>
  Object.assign(requestV1({ groupId, topics }), { apiVersion: 2 })


/***/ }),

/***/ 4539:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * OffsetFetch Response (Version: 2) => [responses] error_code
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition offset metadata error_code
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 *       error_code => INT16
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    responses: decoder.readArray(decodeResponses),
    errorCode: decoder.readInt16(),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  offset: decoder.readInt64().toString(),
  metadata: decoder.readString(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  const partitionsWithError = data.responses.flatMap(response =>
    response.partitions.filter(partition => failure(partition.errorCode))
  )
  const partitionWithError = partitionsWithError[0]
  if (partitionWithError) {
    throw createErrorFromCode(partitionWithError.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 181:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { OffsetFetch: apiKey } = __nccwpck_require__(686)

/**
 * OffsetFetch Request (Version: 3) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition
 *       partition => INT32
 */

module.exports = ({ groupId, topics }) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'OffsetFetch',
  encode: async () => {
    return new Encoder().writeString(groupId).writeNullableArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition }) => {
  return new Encoder().writeInt32(partition)
}


/***/ }),

/***/ 8590:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV2 } = __nccwpck_require__(4539)

/**
 * OffsetFetch Response (Version: 3) => throttle_time_ms [responses] error_code
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition offset metadata error_code
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 *       error_code => INT16
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  return {
    throttleTime: decoder.readInt32(),
    responses: decoder.readArray(decodeResponses),
    errorCode: decoder.readInt16(),
  }
}

const decodeResponses = decoder => ({
  topic: decoder.readString(),
  partitions: decoder.readArray(decodePartitions),
})

const decodePartitions = decoder => ({
  partition: decoder.readInt32(),
  offset: decoder.readInt64().toString(),
  metadata: decoder.readString(),
  errorCode: decoder.readInt16(),
})

module.exports = {
  decode,
  parse: parseV2,
}


/***/ }),

/***/ 3644:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV3 = __nccwpck_require__(181)

/**
 * OffsetFetch Request (Version: 4) => group_id [topics]
 *   group_id => STRING
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition
 *       partition => INT32
 */

module.exports = ({ groupId, topics }) =>
  Object.assign(requestV3({ groupId, topics }), { apiVersion: 4 })


/***/ }),

/***/ 3276:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV3 } = __nccwpck_require__(8590)

/**
 * Starting in version 4, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * OffsetFetch Response (Version: 4) => throttle_time_ms [responses] error_code
 *   throttle_time_ms => INT32
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition offset metadata error_code
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 *       error_code => INT16
 *   error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV3(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 3753:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ acks, timeout, topicData }) => {
    const request = __nccwpck_require__(3220)
    const response = __nccwpck_require__(3458)
    return { request: request({ acks, timeout, topicData }), response }
  },
  1: ({ acks, timeout, topicData }) => {
    const request = __nccwpck_require__(3512)
    const response = __nccwpck_require__(8170)
    return { request: request({ acks, timeout, topicData }), response }
  },
  2: ({ acks, timeout, topicData, compression }) => {
    const request = __nccwpck_require__(8158)
    const response = __nccwpck_require__(1804)
    return { request: request({ acks, timeout, compression, topicData }), response }
  },
  3: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __nccwpck_require__(9904)
    const response = __nccwpck_require__(835)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
  4: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __nccwpck_require__(4096)
    const response = __nccwpck_require__(3748)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
  5: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __nccwpck_require__(2622)
    const response = __nccwpck_require__(5852)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
  6: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __nccwpck_require__(717)
    const response = __nccwpck_require__(1966)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
  7: ({ acks, timeout, compression, topicData, transactionalId, producerId, producerEpoch }) => {
    const request = __nccwpck_require__(6644)
    const response = __nccwpck_require__(9531)
    return {
      request: request({
        acks,
        timeout,
        compression,
        topicData,
        transactionalId,
        producerId,
        producerEpoch,
      }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 3220:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Produce: apiKey } = __nccwpck_require__(686)
const MessageSet = __nccwpck_require__(7911)

/**
 * Produce Request (Version: 0) => acks timeout [topic_data]
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set record_set_size
 *       partition => INT32
 *       record_set_size => INT32
 *       record_set => RECORDS
 */

/**
 * MessageV0:
 * {
 *   key: bytes,
 *   value: bytes
 * }
 *
 * MessageSet:
 * [
 *   { key: "<value>", value: "<value>" },
 *   { key: "<value>", value: "<value>" },
 * ]
 *
 * TopicData:
 * [
 *   {
 *     topic: 'name1',
 *     partitions: [
 *       {
 *         partition: 0,
 *         messages: [<MessageSet>]
 *       }
 *     ]
 *   }
 * ]
 */

/**
 * @param acks {Integer} This field indicates how many acknowledgements the servers should receive before
 *                       responding to the request. If it is 0 the server will not send any response
 *                       (this is the only case where the server will not reply to a request). If it is 1,
 *                       the server will wait the data is written to the local log before sending a response.
 *                       If it is -1 the server will block until the message is committed by all in sync replicas
 *                       before sending a response.
 *
 * @param timeout {Integer} This provides a maximum time in milliseconds the server can await the receipt of the number
 *                          of acknowledgements in RequiredAcks. The timeout is not an exact limit on the request time
 *                          for a few reasons:
 *                          (1) it does not include network latency,
 *                          (2) the timer begins at the beginning of the processing of this request so if many requests are
 *                              queued due to server overload that wait time will not be included,
 *                          (3) we will not terminate a local write so if the local write time exceeds this timeout it will not
 *                              be respected. To get a hard timeout of this type the client should use the socket timeout.
 *
 * @param topicData {Array}
 */
module.exports = ({ acks, timeout, topicData }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'Produce',
  expectResponse: () => acks !== 0,
  encode: async () => {
    return new Encoder()
      .writeInt16(acks)
      .writeInt32(timeout)
      .writeArray(topicData.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartitions))
}

const encodePartitions = ({ partition, messages }) => {
  const messageSet = MessageSet({ messageVersion: 0, entries: messages })
  return new Encoder()
    .writeInt32(partition)
    .writeInt32(messageSet.size())
    .writeEncoder(messageSet)
}


/***/ }),

/***/ 3458:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * v0
 * ProduceResponse => [TopicName [Partition ErrorCode Offset]]
 *   TopicName => string
 *   Partition => int32
 *   ErrorCode => int16
 *   Offset => int64
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  offset: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  return {
    topics,
  }
}

const parse = async data => {
  const errors = data.topics.flatMap(topic => {
    return topic.partitions.filter(partition => failure(partition.errorCode))
  })

  if (errors.length > 0) {
    const { errorCode } = errors[0]
    throw createErrorFromCode(errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 3512:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(3220)

// Produce Request on or after v1 indicates the client can parse the quota throttle time
// in the Produce Response.

module.exports = ({ acks, timeout, topicData }) => {
  return Object.assign(requestV0({ acks, timeout, topicData }), { apiVersion: 1 })
}


/***/ }),

/***/ 8170:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(3458)

/**
 * v1 (supported in 0.9.0 or later)
 * ProduceResponse => [TopicName [Partition ErrorCode Offset]] ThrottleTime
 *   TopicName => string
 *   Partition => int32
 *   ErrorCode => int16
 *   Offset => int64
 *   ThrottleTime => int32
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  offset: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  const throttleTime = decoder.readInt32()

  return {
    topics,
    throttleTime,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 8158:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { Produce: apiKey } = __nccwpck_require__(686)
const MessageSet = __nccwpck_require__(7911)
const { Types, lookupCodec } = __nccwpck_require__(9719)

// Produce Request on or after v2 indicates the client can parse the timestamp field
// in the produce Response.

module.exports = ({ acks, timeout, compression = Types.None, topicData }) => ({
  apiKey,
  apiVersion: 2,
  apiName: 'Produce',
  expectResponse: () => acks !== 0,
  encode: async () => {
    const encodeTopic = topicEncoder(compression)
    const encodedTopicData = []

    for (const data of topicData) {
      encodedTopicData.push(await encodeTopic(data))
    }

    return new Encoder()
      .writeInt16(acks)
      .writeInt32(timeout)
      .writeArray(encodedTopicData)
  },
})

const topicEncoder = compression => {
  const encodePartitions = partitionsEncoder(compression)

  return async ({ topic, partitions }) => {
    const encodedPartitions = []

    for (const data of partitions) {
      encodedPartitions.push(await encodePartitions(data))
    }

    return new Encoder().writeString(topic).writeArray(encodedPartitions)
  }
}

const partitionsEncoder = compression => async ({ partition, messages }) => {
  const messageSet = MessageSet({ messageVersion: 1, compression, entries: messages })

  if (compression === Types.None) {
    return new Encoder()
      .writeInt32(partition)
      .writeInt32(messageSet.size())
      .writeEncoder(messageSet)
  }

  const timestamp = messages[0].timestamp || Date.now()

  const codec = lookupCodec(compression)
  const compressedValue = await codec.compress(messageSet)
  const compressedMessageSet = MessageSet({
    messageVersion: 1,
    entries: [{ compression, timestamp, value: compressedValue }],
  })

  return new Encoder()
    .writeInt32(partition)
    .writeInt32(compressedMessageSet.size())
    .writeEncoder(compressedMessageSet)
}


/***/ }),

/***/ 1804:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV0 } = __nccwpck_require__(3458)

/**
 * v2 (supported in 0.10.0 or later)
 * ProduceResponse => [TopicName [Partition ErrorCode Offset Timestamp]] ThrottleTime
 *   TopicName => string
 *   Partition => int32
 *   ErrorCode => int16
 *   Offset => int64
 *   Timestamp => int64
 *   ThrottleTime => int32
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  offset: decoder.readInt64().toString(),
  timestamp: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  const throttleTime = decoder.readInt32()

  return {
    topics,
    throttleTime,
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 9904:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Long = __nccwpck_require__(3368)
const Encoder = __nccwpck_require__(843)
const { Produce: apiKey } = __nccwpck_require__(686)
const { Types } = __nccwpck_require__(9719)
const Record = __nccwpck_require__(502)
const { RecordBatch } = __nccwpck_require__(1015)

/**
 * Produce Request (Version: 3) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

/**
 * @param [transactionalId=null] {String} The transactional id or null if the producer is not transactional
 * @param acks {Integer} See producer request v0
 * @param timeout {Integer} See producer request v0
 * @param [compression=CompressionTypes.None] {CompressionTypes}
 * @param topicData {Array}
 */
module.exports = ({
  acks,
  timeout,
  transactionalId = null,
  producerId = Long.fromInt(-1),
  producerEpoch = 0,
  compression = Types.None,
  topicData,
}) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'Produce',
  expectResponse: () => acks !== 0,
  encode: async () => {
    const encodeTopic = topicEncoder(compression)
    const encodedTopicData = []

    for (const data of topicData) {
      encodedTopicData.push(
        await encodeTopic({ ...data, transactionalId, producerId, producerEpoch })
      )
    }

    return new Encoder()
      .writeString(transactionalId)
      .writeInt16(acks)
      .writeInt32(timeout)
      .writeArray(encodedTopicData)
  },
})

const topicEncoder = compression => async ({
  topic,
  partitions,
  transactionalId,
  producerId,
  producerEpoch,
}) => {
  const encodePartitions = partitionsEncoder(compression)
  const encodedPartitions = []

  for (const data of partitions) {
    encodedPartitions.push(
      await encodePartitions({ ...data, transactionalId, producerId, producerEpoch })
    )
  }

  return new Encoder().writeString(topic).writeArray(encodedPartitions)
}

const partitionsEncoder = compression => async ({
  partition,
  messages,
  transactionalId,
  firstSequence,
  producerId,
  producerEpoch,
}) => {
  const dateNow = Date.now()
  const messageTimestamps = messages
    .map(m => m.timestamp)
    .filter(timestamp => timestamp != null)
    .sort()

  const timestamps = messageTimestamps.length === 0 ? [dateNow] : messageTimestamps
  const firstTimestamp = timestamps[0]
  const maxTimestamp = timestamps[timestamps.length - 1]

  const records = messages.map((message, i) =>
    Record({
      ...message,
      offsetDelta: i,
      timestampDelta: (message.timestamp || dateNow) - firstTimestamp,
    })
  )

  const recordBatch = await RecordBatch({
    compression,
    records,
    firstTimestamp,
    maxTimestamp,
    producerId,
    producerEpoch,
    firstSequence,
    transactional: !!transactionalId,
    lastOffsetDelta: records.length - 1,
  })

  return new Encoder()
    .writeInt32(partition)
    .writeInt32(recordBatch.size())
    .writeEncoder(recordBatch)
}


/***/ }),

/***/ 835:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * Produce Response (Version: 3) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *   throttle_time_ms => INT32
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  baseOffset: decoder.readInt64().toString(),
  logAppendTime: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  const throttleTime = decoder.readInt32()

  return {
    topics,
    throttleTime,
  }
}

const parse = async data => {
  const errors = data.topics.flatMap(response => {
    return response.partitions.filter(partition => failure(partition.errorCode))
  })

  if (errors.length > 0) {
    const { errorCode } = errors[0]
    throw createErrorFromCode(errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 4096:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV3 = __nccwpck_require__(9904)

/**
 * Produce Request (Version: 4) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

module.exports = ({
  acks,
  timeout,
  transactionalId,
  producerId,
  producerEpoch,
  compression,
  topicData,
}) =>
  Object.assign(
    requestV3({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData,
    }),
    { apiVersion: 4 }
  )


/***/ }),

/***/ 3748:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode, parse } = __nccwpck_require__(835)

/**
 * Produce Response (Version: 4) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *   throttle_time_ms => INT32
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 2622:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV3 = __nccwpck_require__(9904)

/**
 * Produce Request (Version: 5) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

module.exports = ({
  acks,
  timeout,
  transactionalId,
  producerId,
  producerEpoch,
  compression,
  topicData,
}) =>
  Object.assign(
    requestV3({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData,
    }),
    { apiVersion: 5 }
  )


/***/ }),

/***/ 5852:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { parse: parseV3 } = __nccwpck_require__(835)

/**
 * Produce Response (Version: 5) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time log_start_offset
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *       log_start_offset => INT64
 *   throttle_time_ms => INT32
 */

const partition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
  baseOffset: decoder.readInt64().toString(),
  logAppendTime: decoder.readInt64().toString(),
  logStartOffset: decoder.readInt64().toString(),
})

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const topics = decoder.readArray(decoder => ({
    topicName: decoder.readString(),
    partitions: decoder.readArray(partition),
  }))

  const throttleTime = decoder.readInt32()

  return {
    topics,
    throttleTime,
  }
}

module.exports = {
  decode,
  parse: parseV3,
}


/***/ }),

/***/ 717:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV5 = __nccwpck_require__(2622)

/**
 * The version number is bumped to indicate that on quota violation brokers send out responses before throttling.
 * @see https://github.com/apache/kafka/blob/9c8f75c4b624084c954b4da69f092211a9ac4689/clients/src/main/java/org/apache/kafka/common/requests/ProduceRequest.java#L113-L117
 *
 * Produce Request (Version: 6) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

module.exports = ({
  acks,
  timeout,
  transactionalId,
  producerId,
  producerEpoch,
  compression,
  topicData,
}) =>
  Object.assign(
    requestV5({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData,
    }),
    { apiVersion: 6 }
  )


/***/ }),

/***/ 1966:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV5 } = __nccwpck_require__(5852)

/**
 * The version number is bumped to indicate that on quota violation brokers send out responses before throttling.
 * @see https://github.com/apache/kafka/blob/9c8f75c4b624084c954b4da69f092211a9ac4689/clients/src/main/java/org/apache/kafka/common/requests/ProduceResponse.java#L152-L156
 *
 * Produce Response (Version: 6) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time log_start_offset
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *       log_start_offset => INT64
 *   throttle_time_ms => INT32
 */

const decode = async rawData => {
  const decoded = await decodeV5(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6644:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV6 = __nccwpck_require__(717)

/**
 * V7 indicates ZStandard capability (see KIP-110)
 * @see https://github.com/apache/kafka/blob/9c8f75c4b624084c954b4da69f092211a9ac4689/clients/src/main/java/org/apache/kafka/common/requests/ProduceRequest.java#L118-L121
 *
 * Produce Request (Version: 7) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

module.exports = ({
  acks,
  timeout,
  transactionalId,
  producerId,
  producerEpoch,
  compression,
  topicData,
}) =>
  Object.assign(
    requestV6({
      acks,
      timeout,
      transactionalId,
      producerId,
      producerEpoch,
      compression,
      topicData,
    }),
    { apiVersion: 7 }
  )


/***/ }),

/***/ 9531:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode, parse } = __nccwpck_require__(1966)

/**
 * Produce Response (Version: 7) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time log_start_offset
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *       log_start_offset => INT64
 *   throttle_time_ms => INT32
 */

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 8847:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ authBytes }) => {
    const request = __nccwpck_require__(9181)
    const response = __nccwpck_require__(4340)
    return { request: request({ authBytes }), response }
  },
  1: ({ authBytes }) => {
    const request = __nccwpck_require__(6176)
    const response = __nccwpck_require__(1182)
    return { request: request({ authBytes }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 9181:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { SaslAuthenticate: apiKey } = __nccwpck_require__(686)

/**
 * SaslAuthenticate Request (Version: 0) => sasl_auth_bytes
 *   sasl_auth_bytes => BYTES
 */

/**
 * @param {Buffer} authBytes - SASL authentication bytes from client as defined by the SASL mechanism
 */
module.exports = ({ authBytes }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'SaslAuthenticate',
  encode: async () => {
    return new Encoder().writeBuffer(authBytes)
  },
})


/***/ }),

/***/ 4340:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const Encoder = __nccwpck_require__(843)
const {
  failure,
  createErrorFromCode,
  failIfVersionNotSupported,
  errorCodes,
} = __nccwpck_require__(5903)

const { KafkaJSProtocolError } = __nccwpck_require__(5073)
const SASL_AUTHENTICATION_FAILED = 58
const protocolAuthError = errorCodes.find(e => e.code === SASL_AUTHENTICATION_FAILED)

/**
 * SaslAuthenticate Response (Version: 0) => error_code error_message sasl_auth_bytes
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   sasl_auth_bytes => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)
  const errorMessage = decoder.readString()

  // This is necessary to make the response compatible with the original
  // mechanism protocols. They expect a byte response, which starts with
  // the size
  const authBytesEncoder = new Encoder().writeBytes(decoder.readBytes())
  const authBytes = authBytesEncoder.buffer

  return {
    errorCode,
    errorMessage,
    authBytes,
  }
}

const parse = async data => {
  if (data.errorCode === SASL_AUTHENTICATION_FAILED && data.errorMessage) {
    throw new KafkaJSProtocolError({
      ...protocolAuthError,
      message: data.errorMessage,
    })
  }

  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6176:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(9181)

/**
 * SaslAuthenticate Request (Version: 1) => sasl_auth_bytes
 *   sasl_auth_bytes => BYTES
 */

/**
 * @param {Buffer} authBytes - SASL authentication bytes from client as defined by the SASL mechanism
 */
module.exports = ({ authBytes }) => Object.assign(requestV0({ authBytes }), { apiVersion: 1 })


/***/ }),

/***/ 1182:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const Encoder = __nccwpck_require__(843)
const { parse: parseV0 } = __nccwpck_require__(4340)
const { failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * SaslAuthenticate Response (Version: 1) => error_code error_message sasl_auth_bytes
 *   error_code => INT16
 *   error_message => NULLABLE_STRING
 *   sasl_auth_bytes => BYTES
 *   session_lifetime_ms => INT64
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)
  const errorMessage = decoder.readString()

  // This is necessary to make the response compatible with the original
  // mechanism protocols. They expect a byte response, which starts with
  // the size
  const authBytesEncoder = new Encoder().writeBytes(decoder.readBytes())
  const authBytes = authBytesEncoder.buffer
  const sessionLifetimeMs = decoder.readInt64().toString()

  return {
    errorCode,
    errorMessage,
    authBytes,
    sessionLifetimeMs,
  }
}
module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 609:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ mechanism }) => {
    const request = __nccwpck_require__(6533)
    const response = __nccwpck_require__(1961)
    return { request: request({ mechanism }), response }
  },
  1: ({ mechanism }) => {
    const request = __nccwpck_require__(9139)
    const response = __nccwpck_require__(4077)
    return { request: request({ mechanism }), response }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 6533:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { SaslHandshake: apiKey } = __nccwpck_require__(686)

/**
 * SaslHandshake Request (Version: 0) => mechanism
 *    mechanism => STRING
 */

/**
 * @param {string} mechanism - SASL Mechanism chosen by the client
 */
module.exports = ({ mechanism }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'SaslHandshake',
  encode: async () => new Encoder().writeString(mechanism),
})


/***/ }),

/***/ 1961:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * SaslHandshake Response (Version: 0) => error_code [enabled_mechanisms]
 *    error_code => INT16
 *    enabled_mechanisms => STRING
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    errorCode,
    enabledMechanisms: decoder.readArray(decoder => decoder.readString()),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 9139:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(6533)

module.exports = ({ mechanism }) => ({ ...requestV0({ mechanism }), apiVersion: 1 })


/***/ }),

/***/ 4077:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode: decodeV0, parse: parseV0 } = __nccwpck_require__(1961)

module.exports = {
  decode: decodeV0,
  parse: parseV0,
}


/***/ }),

/***/ 3641:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ groupId, generationId, memberId, groupAssignment }) => {
    const request = __nccwpck_require__(3491)
    const response = __nccwpck_require__(8533)
    return {
      request: request({ groupId, generationId, memberId, groupAssignment }),
      response,
    }
  },
  1: ({ groupId, generationId, memberId, groupAssignment }) => {
    const request = __nccwpck_require__(4530)
    const response = __nccwpck_require__(4947)
    return {
      request: request({ groupId, generationId, memberId, groupAssignment }),
      response,
    }
  },
  2: ({ groupId, generationId, memberId, groupAssignment }) => {
    const request = __nccwpck_require__(6121)
    const response = __nccwpck_require__(9928)
    return {
      request: request({ groupId, generationId, memberId, groupAssignment }),
      response,
    }
  },
  3: ({ groupId, generationId, memberId, groupInstanceId, groupAssignment }) => {
    const request = __nccwpck_require__(7284)
    const response = __nccwpck_require__(2409)
    return {
      request: request({ groupId, generationId, memberId, groupInstanceId, groupAssignment }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 3491:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { SyncGroup: apiKey } = __nccwpck_require__(686)

/**
 * SyncGroup Request (Version: 0) => group_id generation_id member_id [group_assignment]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_assignment => member_id member_assignment
 *     member_id => STRING
 *     member_assignment => BYTES
 */

module.exports = ({ groupId, generationId, memberId, groupAssignment }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'SyncGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(generationId)
      .writeString(memberId)
      .writeArray(groupAssignment.map(encodeGroupAssignment))
  },
})

const encodeGroupAssignment = ({ memberId, memberAssignment }) => {
  return new Encoder().writeString(memberId).writeBytes(memberAssignment)
}


/***/ }),

/***/ 8533:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode, failIfVersionNotSupported } = __nccwpck_require__(5903)

/**
 * SyncGroup Response (Version: 0) => error_code member_assignment
 *   error_code => INT16
 *   member_assignment => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    errorCode,
    memberAssignment: decoder.readBytes(),
  }
}

const parse = async data => {
  if (failure(data.errorCode)) {
    throw createErrorFromCode(data.errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 4530:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(3491)

/**
 * SyncGroup Request (Version: 1) => group_id generation_id member_id [group_assignment]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_assignment => member_id member_assignment
 *     member_id => STRING
 *     member_assignment => BYTES
 */

module.exports = ({ groupId, generationId, memberId, groupAssignment }) =>
  Object.assign(requestV0({ groupId, generationId, memberId, groupAssignment }), { apiVersion: 1 })


/***/ }),

/***/ 4947:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failIfVersionNotSupported } = __nccwpck_require__(5903)
const { parse: parseV0 } = __nccwpck_require__(8533)

/**
 * SyncGroup Response (Version: 1) => throttle_time_ms error_code member_assignment
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   member_assignment => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
    memberAssignment: decoder.readBytes(),
  }
}

module.exports = {
  decode,
  parse: parseV0,
}


/***/ }),

/***/ 6121:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV1 = __nccwpck_require__(4530)

/**
 * SyncGroup Request (Version: 2) => group_id generation_id member_id [group_assignment]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_assignment => member_id member_assignment
 *     member_id => STRING
 *     member_assignment => BYTES
 */

module.exports = ({ groupId, generationId, memberId, groupAssignment }) =>
  Object.assign(requestV1({ groupId, generationId, memberId, groupAssignment }), { apiVersion: 2 })


/***/ }),

/***/ 9928:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(4947)

/**
 * In version 2, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * SyncGroup Response (Version: 2) => throttle_time_ms error_code member_assignment
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   member_assignment => BYTES
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 7284:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { SyncGroup: apiKey } = __nccwpck_require__(686)

/**
 * Version 3 adds group_instance_id to indicate member identity across restarts.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-345%3A+Introduce+static+membership+protocol+to+reduce+consumer+rebalances
 *
 * SyncGroup Request (Version: 3) => group_id generation_id member_id group_instance_id [group_assignment]
 *   group_id => STRING
 *   generation_id => INT32
 *   member_id => STRING
 *   group_instance_id => NULLABLE_STRING
 *   group_assignment => member_id member_assignment
 *     member_id => STRING
 *     member_assignment => BYTES
 */

module.exports = ({
  groupId,
  generationId,
  memberId,
  groupInstanceId = null,
  groupAssignment,
}) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'SyncGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(generationId)
      .writeString(memberId)
      .writeString(groupInstanceId)
      .writeArray(groupAssignment.map(encodeGroupAssignment))
  },
})

const encodeGroupAssignment = ({ memberId, memberAssignment }) => {
  return new Encoder().writeString(memberId).writeBytes(memberAssignment)
}


/***/ }),

/***/ 2409:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { decode, parse } = __nccwpck_require__(9928)

/**
 * SyncGroup Response (Version: 2) => throttle_time_ms error_code member_assignment
 *   throttle_time_ms => INT32
 *   error_code => INT16
 *   member_assignment => BYTES
 */
module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 6983:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const versions = {
  0: ({ transactionalId, groupId, producerId, producerEpoch, topics }) => {
    const request = __nccwpck_require__(1167)
    const response = __nccwpck_require__(2299)
    return {
      request: request({ transactionalId, groupId, producerId, producerEpoch, topics }),
      response,
    }
  },
  1: ({ transactionalId, groupId, producerId, producerEpoch, topics }) => {
    const request = __nccwpck_require__(2511)
    const response = __nccwpck_require__(8522)
    return {
      request: request({ transactionalId, groupId, producerId, producerEpoch, topics }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}


/***/ }),

/***/ 1167:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)
const { TxnOffsetCommit: apiKey } = __nccwpck_require__(686)

/**
 * TxnOffsetCommit Request (Version: 0) => transactional_id group_id producer_id producer_epoch [topics]
 *   transactional_id => STRING
 *   group_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ transactionalId, groupId, producerId, producerEpoch, topics }) => ({
  apiKey,
  apiVersion: 0,
  apiName: 'TxnOffsetCommit',
  encode: async () => {
    return new Encoder()
      .writeString(transactionalId)
      .writeString(groupId)
      .writeInt64(producerId)
      .writeInt16(producerEpoch)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, metadata }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeString(metadata)
}


/***/ }),

/***/ 2299:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Decoder = __nccwpck_require__(9991)
const { failure, createErrorFromCode } = __nccwpck_require__(5903)

/**
 * TxnOffsetCommit Response (Version: 0) => throttle_time_ms [topics]
 *   throttle_time_ms => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */
const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const topics = await decoder.readArrayAsync(decodeTopic)

  return {
    throttleTime,
    topics,
  }
}

const decodeTopic = async decoder => ({
  topic: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodePartition),
})

const decodePartition = decoder => ({
  partition: decoder.readInt32(),
  errorCode: decoder.readInt16(),
})

const parse = async data => {
  const topicsWithErrors = data.topics
    .map(({ partitions }) => ({
      partitionsWithErrors: partitions.filter(({ errorCode }) => failure(errorCode)),
    }))
    .filter(({ partitionsWithErrors }) => partitionsWithErrors.length)

  if (topicsWithErrors.length > 0) {
    throw createErrorFromCode(topicsWithErrors[0].partitionsWithErrors[0].errorCode)
  }

  return data
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 2511:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const requestV0 = __nccwpck_require__(1167)

/**
 * TxnOffsetCommit Request (Version: 1) => transactional_id group_id producer_id producer_epoch [topics]
 *   transactional_id => STRING
 *   group_id => STRING
 *   producer_id => INT64
 *   producer_epoch => INT16
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ transactionalId, groupId, producerId, producerEpoch, topics }) =>
  Object.assign(requestV0({ transactionalId, groupId, producerId, producerEpoch, topics }), {
    apiVersion: 1,
  })


/***/ }),

/***/ 8522:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { parse, decode: decodeV1 } = __nccwpck_require__(2299)

/**
 * In version 1, on quota violation, brokers send out responses before throttling.
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-219+-+Improve+quota+communication
 *
 * TxnOffsetCommit Response (Version: 1) => throttle_time_ms [topics]
 *   throttle_time_ms => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition error_code
 *       partition => INT32
 *       error_code => INT16
 */

const decode = async rawData => {
  const decoded = await decodeV1(rawData)

  return {
    ...decoded,
    throttleTime: 0,
    clientSideThrottleTime: decoded.throttleTime,
  }
}

module.exports = {
  decode,
  parse,
}


/***/ }),

/***/ 8589:
/***/ ((module) => {

// From:
// https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/resource/PatternType.java#L32

/**
 * @typedef {number} ACLResourcePatternTypes
 *
 * Enum for ACL Resource Pattern Type
 * @readonly
 * @enum {ACLResourcePatternTypes}
 */
module.exports = {
  /**
   * Represents any PatternType which this client cannot understand, perhaps because this client is too old.
   */
  UNKNOWN: 0,
  /**
   * In a filter, matches any resource pattern type.
   */
  ANY: 1,
  /**
   * In a filter, will perform pattern matching.
   *
   * e.g. Given a filter of {@code ResourcePatternFilter(TOPIC, "payments.received", MATCH)`}, the filter match
   * any {@link ResourcePattern} that matches topic 'payments.received'. This might include:
   * <ul>
   *     <li>A Literal pattern with the same type and name, e.g. {@code ResourcePattern(TOPIC, "payments.received", LITERAL)}</li>
   *     <li>A Wildcard pattern with the same type, e.g. {@code ResourcePattern(TOPIC, "*", LITERAL)}</li>
   *     <li>A Prefixed pattern with the same type and where the name is a matching prefix, e.g. {@code ResourcePattern(TOPIC, "payments.", PREFIXED)}</li>
   * </ul>
   */
  MATCH: 2,
  /**
   * A literal resource name.
   *
   * A literal name defines the full name of a resource, e.g. topic with name 'foo', or group with name 'bob'.
   *
   * The special wildcard character {@code *} can be used to represent a resource with any name.
   */
  LITERAL: 3,
  /**
   * A prefixed resource name.
   *
   * A prefixed name defines a prefix for a resource, e.g. topics with names that start with 'foo'.
   */
  PREFIXED: 4,
}


/***/ }),

/***/ 8125:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = {
  request: __nccwpck_require__(595),
  response: __nccwpck_require__(6861),
}


/***/ }),

/***/ 595:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)

const US_ASCII_NULL_CHAR = '\u0000'

module.exports = ({ authorizationIdentity, accessKeyId, secretAccessKey, sessionToken = '' }) => ({
  encode: async () => {
    return new Encoder().writeBytes(
      [authorizationIdentity, accessKeyId, secretAccessKey, sessionToken].join(US_ASCII_NULL_CHAR)
    )
  },
})


/***/ }),

/***/ 6861:
/***/ ((module) => {

module.exports = {
  decode: async () => true,
  parse: async () => true,
}


/***/ }),

/***/ 6099:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = {
  request: __nccwpck_require__(676),
  response: __nccwpck_require__(3980),
}


/***/ }),

/***/ 676:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * http://www.ietf.org/rfc/rfc5801.txt
 *
 * See org.apache.kafka.common.security.oauthbearer.internals.OAuthBearerClientInitialResponse
 * for official Java client implementation.
 *
 * The mechanism consists of a message from the client to the server.
 * The client sends the "n,"" GS header, followed by the authorizationIdentitty
 * prefixed by "a=" (if present), followed by ",", followed by a US-ASCII SOH
 * character, followed by "auth=Bearer ", followed by the token value, followed
 * by US-ASCII SOH character, followed by SASL extensions in OAuth "friendly"
 * format and then closed by two additionals US-ASCII SOH characters.
 *
 * SASL extensions are optional an must be expressed as key-value pairs in an
 * object. Each expression is converted as, the extension entry key, followed
 * by "=", followed by extension entry value. Each extension is separated by a
 * US-ASCII SOH character. If extensions are not present, their relative part
 * in the message, including the US-ASCII SOH character, is omitted.
 *
 * The client may leave the authorization identity empty to
 * indicate that it is the same as the authentication identity.
 *
 * The server will verify the authentication token and verify that the
 * authentication credentials permit the client to login as the authorization
 * identity. If both steps succeed, the user is logged in.
 */

const Encoder = __nccwpck_require__(843)

const SEPARATOR = '\u0001' // SOH - Start Of Header ASCII

function formatExtensions(extensions) {
  let msg = ''

  if (extensions == null) {
    return msg
  }

  let prefix = ''
  for (const k in extensions) {
    msg += `${prefix}${k}=${extensions[k]}`
    prefix = SEPARATOR
  }

  return msg
}

module.exports = async ({ authorizationIdentity = null }, oauthBearerToken) => {
  const authzid = authorizationIdentity == null ? '' : `"a=${authorizationIdentity}`
  let ext = formatExtensions(oauthBearerToken.extensions)
  if (ext.length > 0) {
    ext = `${SEPARATOR}${ext}`
  }

  const oauthMsg = `n,${authzid},${SEPARATOR}auth=Bearer ${oauthBearerToken.value}${ext}${SEPARATOR}${SEPARATOR}`

  return {
    encode: async () => {
      return new Encoder().writeBytes(Buffer.from(oauthMsg))
    },
  }
}


/***/ }),

/***/ 3980:
/***/ ((module) => {

module.exports = {
  decode: async () => true,
  parse: async () => true,
}


/***/ }),

/***/ 1770:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = {
  request: __nccwpck_require__(7521),
  response: __nccwpck_require__(2731),
}


/***/ }),

/***/ 7521:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * http://www.ietf.org/rfc/rfc2595.txt
 *
 * The mechanism consists of a single message from the client to the
 * server.  The client sends the authorization identity (identity to
 * login as), followed by a US-ASCII NUL character, followed by the
 * authentication identity (identity whose password will be used),
 * followed by a US-ASCII NUL character, followed by the clear-text
 * password.  The client may leave the authorization identity empty to
 * indicate that it is the same as the authentication identity.
 *
 * The server will verify the authentication identity and password with
 * the system authentication database and verify that the authentication
 * credentials permit the client to login as the authorization identity.
 * If both steps succeed, the user is logged in.
 */

const Encoder = __nccwpck_require__(843)

const US_ASCII_NULL_CHAR = '\u0000'

module.exports = ({ authorizationIdentity = null, username, password }) => ({
  encode: async () => {
    return new Encoder().writeBytes(
      [authorizationIdentity, username, password].join(US_ASCII_NULL_CHAR)
    )
  },
})


/***/ }),

/***/ 2731:
/***/ ((module) => {

module.exports = {
  decode: async () => true,
  parse: async () => true,
}


/***/ }),

/***/ 3749:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Encoder = __nccwpck_require__(843)

module.exports = ({ finalMessage }) => ({
  encode: async () => new Encoder().writeBytes(finalMessage),
})


/***/ }),

/***/ 4509:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(2439)


/***/ }),

/***/ 1250:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * https://tools.ietf.org/html/rfc5802
 *
 * First, the client sends the "client-first-message" containing:
 *
 *  -> a GS2 header consisting of a flag indicating whether channel
 * binding is supported-but-not-used, not supported, or used, and an
 * optional SASL authorization identity;
 *
 *  -> SCRAM username and a random, unique nonce attributes.
 *
 * Note that the client's first message will always start with "n", "y",
 * or "p"; otherwise, the message is invalid and authentication MUST
 * fail.  This is important, as it allows for GS2 extensibility (e.g.,
 * to add support for security layers).
 */

const Encoder = __nccwpck_require__(843)

module.exports = ({ clientFirstMessage }) => ({
  encode: async () => new Encoder().writeBytes(clientFirstMessage),
})


/***/ }),

/***/ 2439:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "_" }] */

const Decoder = __nccwpck_require__(9991)

const ENTRY_REGEX = /^([rsiev])=(.*)$/

module.exports = {
  decode: async rawData => {
    return new Decoder(rawData).readBytes()
  },
  parse: async data => {
    const processed = data
      .toString()
      .split(',')
      .map(str => {
        const [_, key, value] = str.match(ENTRY_REGEX)
        return [key, value]
      })
      .reduce((obj, entry) => ({ ...obj, [entry[0]]: entry[1] }), {})

    return { original: data.toString(), ...processed }
  },
}


/***/ }),

/***/ 5631:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = {
  firstMessage: {
    request: __nccwpck_require__(1250),
    response: __nccwpck_require__(2439),
  },
  finalMessage: {
    request: __nccwpck_require__(3749),
    response: __nccwpck_require__(4509),
  },
}


/***/ }),

/***/ 5070:
/***/ ((module) => {

/**
 * Enum for timestamp types
 * @readonly
 * @enum {TimestampType}
 */
module.exports = {
  // Timestamp type is unknown
  NO_TIMESTAMP: -1,

  // Timestamp relates to message creation time as set by a Kafka client
  CREATE_TIME: 0,

  // Timestamp relates to the time a message was appended to a Kafka log
  LOG_APPEND_TIME: 1,
}


/***/ }),

/***/ 9695:
/***/ ((module) => {

module.exports = {
  maxRetryTime: 30 * 1000,
  initialRetryTime: 300,
  factor: 0.2, // randomization factor
  multiplier: 2, // exponential factor
  retries: 5, // max retries
}


/***/ }),

/***/ 6860:
/***/ ((module) => {

module.exports = {
  maxRetryTime: 1000,
  initialRetryTime: 50,
  factor: 0.02, // randomization factor
  multiplier: 1.5, // exponential factor
  retries: 15, // max retries
}


/***/ }),

/***/ 1862:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { KafkaJSNumberOfRetriesExceeded, KafkaJSNonRetriableError } = __nccwpck_require__(5073)

const isTestMode = process.env.NODE_ENV === 'test'
const RETRY_DEFAULT = isTestMode ? __nccwpck_require__(6860) : __nccwpck_require__(9695)

const random = (min, max) => {
  return Math.random() * (max - min) + min
}

const randomFromRetryTime = (factor, retryTime) => {
  const delta = factor * retryTime
  return Math.ceil(random(retryTime - delta, retryTime + delta))
}

const UNRECOVERABLE_ERRORS = ['RangeError', 'ReferenceError', 'SyntaxError', 'TypeError']
const isErrorUnrecoverable = e => UNRECOVERABLE_ERRORS.includes(e.name)
const isErrorRetriable = error =>
  (error.retriable || error.retriable !== false) && !isErrorUnrecoverable(error)

const createRetriable = (configs, resolve, reject, fn) => {
  let aborted = false
  const { factor, multiplier, maxRetryTime, retries } = configs

  const bail = error => {
    aborted = true
    reject(error || new Error('Aborted'))
  }

  const calculateExponentialRetryTime = retryTime => {
    return Math.min(randomFromRetryTime(factor, retryTime) * multiplier, maxRetryTime)
  }

  const retry = (retryTime, retryCount = 0) => {
    if (aborted) return

    const nextRetryTime = calculateExponentialRetryTime(retryTime)
    const shouldRetry = retryCount < retries

    const scheduleRetry = () => {
      setTimeout(() => retry(nextRetryTime, retryCount + 1), retryTime)
    }

    fn(bail, retryCount, retryTime)
      .then(resolve)
      .catch(e => {
        if (isErrorRetriable(e)) {
          if (shouldRetry) {
            scheduleRetry()
          } else {
            reject(
              new KafkaJSNumberOfRetriesExceeded(e, { retryCount, retryTime, cause: e.cause || e })
            )
          }
        } else {
          reject(new KafkaJSNonRetriableError(e, { cause: e.cause || e }))
        }
      })
  }

  return retry
}

/**
 * @typedef {(fn: (bail: (err: Error) => void, retryCount: number, retryTime: number) => any) => Promise<ReturnType<fn>>} Retrier
 */

/**
 * @param {import("../../types").RetryOptions} [opts]
 * @returns {Retrier}
 */
module.exports = (opts = {}) => fn => {
  return new Promise((resolve, reject) => {
    const configs = Object.assign({}, RETRY_DEFAULT, opts)
    const start = createRetriable(configs, resolve, reject, fn)
    start(randomFromRetryTime(configs.factor, configs.initialRetryTime))
  })
}


/***/ }),

/***/ 1262:
/***/ ((module) => {

module.exports = (a, b) => {
  const result = []
  const length = a.length
  let i = 0

  while (i < length) {
    if (b.indexOf(a[i]) === -1) {
      result.push(a[i])
    }
    i += 1
  }

  return result
}


/***/ }),

/***/ 1958:
/***/ ((module) => {

module.exports = async (array, groupFn) => {
  const result = new Map()

  for (const item of array) {
    const group = await Promise.resolve(groupFn(item))
    result.set(group, result.has(group) ? [...result.get(group), item] : [item])
  }

  return result
}


/***/ }),

/***/ 7146:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { format } = __nccwpck_require__(3837)
const { KafkaJSLockTimeout } = __nccwpck_require__(5073)

const PRIVATE = {
  LOCKED: Symbol('private:Lock:locked'),
  TIMEOUT: Symbol('private:Lock:timeout'),
  WAITING: Symbol('private:Lock:waiting'),
  TIMEOUT_ERROR_MESSAGE: Symbol('private:Lock:timeoutErrorMessage'),
}

const TIMEOUT_MESSAGE = 'Timeout while acquiring lock (%d waiting locks)'

module.exports = class Lock {
  constructor({ timeout, description = null } = {}) {
    if (typeof timeout !== 'number') {
      throw new TypeError(`'timeout' is not a number, received '${typeof timeout}'`)
    }

    this[PRIVATE.LOCKED] = false
    this[PRIVATE.TIMEOUT] = timeout
    this[PRIVATE.WAITING] = new Set()
    this[PRIVATE.TIMEOUT_ERROR_MESSAGE] = () => {
      const timeoutMessage = format(TIMEOUT_MESSAGE, this[PRIVATE.WAITING].size)
      return description ? `${timeoutMessage}: "${description}"` : timeoutMessage
    }
  }

  async acquire() {
    return new Promise((resolve, reject) => {
      if (!this[PRIVATE.LOCKED]) {
        this[PRIVATE.LOCKED] = true
        return resolve()
      }

      let timeoutId = null
      const tryToAcquire = async () => {
        if (!this[PRIVATE.LOCKED]) {
          this[PRIVATE.LOCKED] = true
          clearTimeout(timeoutId)
          this[PRIVATE.WAITING].delete(tryToAcquire)
          return resolve()
        }
      }

      this[PRIVATE.WAITING].add(tryToAcquire)
      timeoutId = setTimeout(() => {
        // The message should contain the number of waiters _including_ this one
        const error = new KafkaJSLockTimeout(this[PRIVATE.TIMEOUT_ERROR_MESSAGE]())
        this[PRIVATE.WAITING].delete(tryToAcquire)
        reject(error)
      }, this[PRIVATE.TIMEOUT])
    })
  }

  async release() {
    this[PRIVATE.LOCKED] = false
    const waitingLock = this[PRIVATE.WAITING].values().next().value

    if (waitingLock) {
      return waitingLock()
    }
  }
}


/***/ }),

/***/ 3368:
/***/ ((module) => {

/**
 * @exports Long
 * @class A Long class for representing a 64 bit int (BigInt)
 * @param {bigint} value The value of the 64 bit int
 * @constructor
 */
class Long {
  constructor(value) {
    this.value = value
  }

  /**
   * @function isLong
   * @param {*} obj Object
   * @returns {boolean}
   * @inner
   */
  static isLong(obj) {
    return typeof obj.value === 'bigint'
  }

  /**
   * @param {number} value
   * @returns {!Long}
   * @inner
   */
  static fromBits(value) {
    return new Long(BigInt(value))
  }

  /**
   * @param {number} value
   * @returns {!Long}
   * @inner
   */
  static fromInt(value) {
    if (isNaN(value)) return Long.ZERO

    return new Long(BigInt.asIntN(64, BigInt(value)))
  }

  /**
   * @param {number} value
   * @returns {!Long}
   * @inner
   */
  static fromNumber(value) {
    if (isNaN(value)) return Long.ZERO

    return new Long(BigInt(value))
  }

  /**
   * @function
   * @param {bigint|number|string|Long} val
   * @returns {!Long}
   * @inner
   */
  static fromValue(val) {
    if (typeof val === 'number') return this.fromNumber(val)
    if (typeof val === 'string') return this.fromString(val)
    if (typeof val === 'bigint') return new Long(val)
    if (this.isLong(val)) return new Long(BigInt(val.value))

    return new Long(BigInt(val))
  }

  /**
   * @param {string} str
   * @returns {!Long}
   * @inner
   */
  static fromString(str) {
    if (str.length === 0) throw Error('empty string')
    if (str === 'NaN' || str === 'Infinity' || str === '+Infinity' || str === '-Infinity')
      return Long.ZERO
    return new Long(BigInt(str))
  }

  /**
   * Tests if this Long's value equals zero.
   * @returns {boolean}
   */
  isZero() {
    return this.value === BigInt(0)
  }

  /**
   * Tests if this Long's value is negative.
   * @returns {boolean}
   */
  isNegative() {
    return this.value < BigInt(0)
  }

  /**
   * Converts the Long to a string.
   * @returns {string}
   * @override
   */
  toString() {
    return String(this.value)
  }

  /**
   * Converts the Long to the nearest floating-point representation (double, 53-bit mantissa)
   * @returns {number}
   * @override
   */
  toNumber() {
    return Number(this.value)
  }

  /**
   * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
   * @returns {number}
   */
  toInt() {
    return Number(BigInt.asIntN(32, this.value))
  }

  /**
   * Converts the Long to JSON
   * @returns {string}
   * @override
   */
  toJSON() {
    return this.toString()
  }

  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number|bigint} numBits Number of bits
   * @returns {!Long} Shifted bigint
   */
  shiftLeft(numBits) {
    return new Long(this.value << BigInt(numBits))
  }

  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   * @param {number|bigint} numBits Number of bits
   * @returns {!Long} Shifted bigint
   */
  shiftRight(numBits) {
    return new Long(this.value >> BigInt(numBits))
  }

  /**
   * Returns the bitwise OR of this Long and the specified.
   * @param {bigint|number|string} other Other Long
   * @returns {!Long}
   */
  or(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return Long.fromBits(this.value | other.value)
  }

  /**
   * Returns the bitwise XOR of this Long and the given one.
   * @param {bigint|number|string} other Other Long
   * @returns {!Long}
   */
  xor(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return new Long(this.value ^ other.value)
  }

  /**
   * Returns the bitwise AND of this Long and the specified.
   * @param {bigint|number|string} other Other Long
   * @returns {!Long}
   */
  and(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return new Long(this.value & other.value)
  }

  /**
   * Returns the bitwise NOT of this Long.
   * @returns {!Long}
   */
  not() {
    return new Long(~this.value)
  }

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   * @param {number|bigint} numBits Number of bits
   * @returns {!Long} Shifted bigint
   */
  shiftRightUnsigned(numBits) {
    return new Long(this.value >> BigInt.asUintN(64, BigInt(numBits)))
  }

  /**
   * Tests if this Long's value equals the specified's.
   * @param {bigint|number|string} other Other value
   * @returns {boolean}
   */
  equals(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return this.value === other.value
  }

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  greaterThanOrEqual(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return this.value >= other.value
  }

  gte(other) {
    return this.greaterThanOrEqual(other)
  }

  notEquals(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return !this.equals(/* validates */ other)
  }

  /**
   * Returns the sum of this and the specified Long.
   * @param {!Long|number|string} addend Addend
   * @returns {!Long} Sum
   */
  add(addend) {
    if (!Long.isLong(addend)) addend = Long.fromValue(addend)
    return new Long(this.value + addend.value)
  }

  /**
   * Returns the difference of this and the specified Long.
   * @param {!Long|number|string} subtrahend Subtrahend
   * @returns {!Long} Difference
   */
  subtract(subtrahend) {
    if (!Long.isLong(subtrahend)) subtrahend = Long.fromValue(subtrahend)
    return this.add(subtrahend.negate())
  }

  /**
   * Returns the product of this and the specified Long.
   * @param {!Long|number|string} multiplier Multiplier
   * @returns {!Long} Product
   */
  multiply(multiplier) {
    if (this.isZero()) return Long.ZERO
    if (!Long.isLong(multiplier)) multiplier = Long.fromValue(multiplier)
    return new Long(this.value * multiplier.value)
  }

  /**
   * Returns this Long divided by the specified. The result is signed if this Long is signed or
   *  unsigned if this Long is unsigned.
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Quotient
   */
  divide(divisor) {
    if (!Long.isLong(divisor)) divisor = Long.fromValue(divisor)
    if (divisor.isZero()) throw Error('division by zero')
    return new Long(this.value / divisor.value)
  }

  /**
   * Compares this Long's value with the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {number} 0 if they are the same, 1 if the this is greater and -1
   *  if the given one is greater
   */
  compare(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    if (this.value === other.value) return 0
    if (this.value > other.value) return 1
    if (other.value > this.value) return -1
  }

  /**
   * Tests if this Long's value is less than the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  lessThan(other) {
    if (!Long.isLong(other)) other = Long.fromValue(other)
    return this.value < other.value
  }

  /**
   * Negates this Long's value.
   * @returns {!Long} Negated Long
   */
  negate() {
    if (this.equals(Long.MIN_VALUE)) {
      return Long.MIN_VALUE
    }
    return this.not().add(Long.ONE)
  }

  /**
   * Gets the high 32 bits as a signed integer.
   * @returns {number} Signed high bits
   */
  getHighBits() {
    return Number(BigInt.asIntN(32, this.value >> BigInt(32)))
  }

  /**
   * Gets the low 32 bits as a signed integer.
   * @returns {number} Signed low bits
   */
  getLowBits() {
    return Number(BigInt.asIntN(32, this.value))
  }
}

/**
 * Minimum signed value.
 * @type {bigint}
 */
Long.MIN_VALUE = new Long(BigInt('-9223372036854775808'))

/**
 * Maximum signed value.
 * @type {bigint}
 */
Long.MAX_VALUE = new Long(BigInt('9223372036854775807'))

/**
 * Signed zero.
 * @type {Long}
 */
Long.ZERO = Long.fromInt(0)

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = Long.fromInt(1)

module.exports = Long


/***/ }),

/***/ 9563:
/***/ ((module) => {

module.exports = fn => {
  let called = false

  return (...args) => {
    if (!called) {
      called = true
      return fn(...args)
    }
  }
}


/***/ }),

/***/ 5435:
/***/ ((module) => {

/**
 * @param {number} count
 * @param {(index: number) => T} [callback]
 * @template T
 */
const seq = (count, callback = x => x) =>
  new Array(count).fill(0).map((_, index) => callback(index))

module.exports = seq


/***/ }),

/***/ 7326:
/***/ ((module) => {

/**
 * @template T
 * @param { (...args: any) => Promise<T> } [asyncFunction]
 * Promise returning function that will only ever be invoked sequentially.
 * @returns { (...args: any) => Promise<T> }
 * Function that may invoke asyncFunction if there is not a currently executing invocation.
 * Returns promise from the currently executing invocation.
 */
module.exports = asyncFunction => {
  let promise = null

  return (...args) => {
    if (promise == null) {
      promise = asyncFunction(...args).finally(() => (promise = null))
    }
    return promise
  }
}


/***/ }),

/***/ 4544:
/***/ ((module) => {

/**
 * @param {T[]} array
 * @returns T[]
 * @template T
 */
module.exports = array => {
  if (!Array.isArray(array)) {
    throw new TypeError("'array' is not an array")
  }

  if (array.length < 2) {
    return array
  }

  const copy = array.slice()

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copy[i]
    copy[i] = copy[j]
    copy[j] = temp
  }

  return copy
}


/***/ }),

/***/ 4946:
/***/ ((module) => {

module.exports = timeInMs =>
  new Promise(resolve => {
    setTimeout(resolve, timeInMs)
  })


/***/ }),

/***/ 2256:
/***/ ((module) => {

const { keys } = Object
module.exports = object =>
  keys(object).reduce((result, key) => ({ ...result, [object[key]]: key }), {})


/***/ }),

/***/ 8840:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const sleep = __nccwpck_require__(4946)
const { KafkaJSTimeout } = __nccwpck_require__(5073)

module.exports = (
  fn,
  { delay = 50, maxWait = 10000, timeoutMessage = 'Timeout', ignoreTimeout = false } = {}
) => {
  let timeoutId
  let totalWait = 0
  let fulfilled = false

  const checkCondition = async (resolve, reject) => {
    totalWait += delay
    if (fulfilled) {
      return
    }

    await sleep(delay)

    try {
      const result = await fn(totalWait)
      if (result) {
        fulfilled = true
        clearTimeout(timeoutId)
        return resolve(result)
      }

      checkCondition(resolve, reject)
    } catch (e) {
      fulfilled = true
      clearTimeout(timeoutId)
      reject(e)
    }
  }

  return new Promise((resolve, reject) => {
    checkCondition(resolve, reject)

    if (ignoreTimeout) {
      return
    }

    timeoutId = setTimeout(() => {
      if (!fulfilled) {
        fulfilled = true
        return reject(new KafkaJSTimeout(timeoutMessage))
      }
    }, maxWait)
  })
}


/***/ }),

/***/ 7274:
/***/ ((module) => {

const BASE_URL = 'https://kafka.js.org'
const stripLeading = char => str => (str.charAt(0) === char ? str.substring(1) : str)
const stripLeadingSlash = stripLeading('/')
const stripLeadingHash = stripLeading('#')

module.exports = (path, hash) =>
  `${BASE_URL}/${stripLeadingSlash(path)}${hash ? '#' + stripLeadingHash(hash) : ''}`


/***/ }),

/***/ 7265:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(2686);


/***/ }),

/***/ 2686:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(1808);
var tls = __nccwpck_require__(4404);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var events = __nccwpck_require__(2361);
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);


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

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
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
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
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
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 9796:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 5557:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"kafkajs","version":"2.0.2","description":"A modern Apache Kafka client for node.js","author":"Tulio Ornelas <ornelas.tulio@gmail.com>","main":"index.js","types":"types/index.d.ts","license":"MIT","keywords":["kafka","sasl","scram"],"engines":{"node":">=14.0.0"},"repository":{"type":"git","url":"https://github.com/tulios/kafkajs.git"},"bugs":{"url":"https://github.com/tulios/kafkajs/issues"},"homepage":"https://kafka.js.org","scripts":{"jest":"export KAFKA_VERSION=${KAFKA_VERSION:=\'2.4\'} && NODE_ENV=test echo \\"KAFKA_VERSION: ${KAFKA_VERSION}\\" && KAFKAJS_DEBUG_PROTOCOL_BUFFERS=1 jest","test:local":"yarn jest --detectOpenHandles","test:debug":"NODE_ENV=test KAFKAJS_DEBUG_PROTOCOL_BUFFERS=1 node --inspect-brk $(yarn bin 2>/dev/null)/jest --detectOpenHandles --runInBand --watch","test:local:watch":"yarn test:local --watch","test":"yarn lint && JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \'yarn jest --ci --maxWorkers=4 --no-watchman --forceExit\'","lint":"find . -path ./node_modules -prune -o -path ./coverage -prune -o -path ./website -prune -o -name \'*.js\' -print0 | xargs -0 eslint","format":"find . -path ./node_modules -prune -o -path ./coverage -prune -o -path ./website -prune -o -name \'*.js\' -print0 | xargs -0 prettier --write","precommit":"lint-staged","test:group:broker":"yarn jest --forceExit --testPathPattern \'src/broker/.*\'","test:group:admin":"yarn jest --forceExit --testPathPattern \'src/admin/.*\'","test:group:producer":"yarn jest --forceExit --testPathPattern \'src/producer/.*\'","test:group:consumer":"yarn jest --forceExit --testPathPattern \'src/consumer/.*.spec.js\'","test:group:others":"yarn jest --forceExit --testPathPattern \'src/(?!(broker|admin|producer|consumer)/).*\'","test:group:oauthbearer":"OAUTHBEARER_ENABLED=1 yarn jest --forceExit src/producer/index.spec.js src/broker/__tests__/connect.spec.js src/consumer/__tests__/connection.spec.js src/broker/__tests__/disconnect.spec.js src/admin/__tests__/connection.spec.js src/broker/__tests__/reauthenticate.spec.js","test:group:broker:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:broker --ci --maxWorkers=4 --no-watchman\\"","test:group:admin:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:admin --ci --maxWorkers=4 --no-watchman\\"","test:group:producer:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:producer --ci --maxWorkers=4 --no-watchman\\"","test:group:consumer:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:consumer --ci --maxWorkers=4 --no-watchman\\"","test:group:others:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml ./scripts/testWithKafka.sh \\"yarn test:group:others --ci --maxWorkers=4 --no-watchman\\"","test:group:oauthbearer:ci":"JEST_JUNIT_OUTPUT_NAME=test-report.xml COMPOSE_FILE=\'docker-compose.2_4_oauthbearer.yml\' ./scripts/testWithKafka.sh \\"yarn test:group:oauthbearer --ci --maxWorkers=4 --no-watchman\\"","test:types":"tsc -p types/"},"devDependencies":{"@types/jest":"^27.4.0","@types/node":"^12.0.8","@typescript-eslint/typescript-estree":"^1.10.2","eslint":"^6.8.0","eslint-config-prettier":"^6.0.0","eslint-config-standard":"^13.0.1","eslint-plugin-import":"^2.18.2","eslint-plugin-jest":"^26.1.0","eslint-plugin-node":"^11.0.0","eslint-plugin-prettier":"^3.1.0","eslint-plugin-promise":"^4.2.1","eslint-plugin-standard":"^4.0.0","execa":"^2.0.3","glob":"^7.1.4","husky":"^3.0.1","ip":"^1.1.5","jest":"^25.1.0","jest-circus":"^25.1.0","jest-extended":"^0.11.2","jest-junit":"^10.0.0","jsonwebtoken":"^8.5.1","lint-staged":"^9.2.0","mockdate":"^2.0.5","prettier":"^1.18.2","semver":"^6.2.0","typescript":"^3.8.3","uuid":"^3.3.2"},"dependencies":{},"lint-staged":{"*.js":["prettier --write","git add"]}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(5127);
const {Kafka} = __nccwpck_require__(3494);

(async () => {
    try {
        const KAFKA_BROKER_URL = core.getInput("KAFKA_BROKER_URL")
        const KAFKA_SSL_CA = core.getInput("KAFKA_SSL_CA")
        const KAFKA_SSL_KEY = core.getInput("KAFKA_SSL_KEY")
        const KAFKA_SSL_CERT = core.getInput("KAFKA_SSL_CERT")
        const TOPIC = core.getInput("TOPIC")
        const REPLICATION_FACTOR = core.getInput("REPLICATION_FACTOR")
        const NUM_PARTITIONS = core.getInput("NUM_PARTITIONS")
        const CLEANUP_POLICY = core.getInput("CLEANUP_POLICY")
    
        createTopic(
            TOPIC,
            kafkaClient(KAFKA_BROKER_URL, KAFKA_SSL_CA, KAFKA_SSL_KEY, KAFKA_SSL_CERT)
        )
    
        const adminClient = new Kafka({
            clientId: 'create-kafka-topic-gha',
            brokers: [KAFKA_BROKER_URL],
            ssl: {
                ca: [KAFKA_SSL_CA],
                key: KAFKA_SSL_KEY,
                cert: KAFKA_SSL_CERT
            }
        }).admin()
        
        await adminClient.connect()
        await adminClient.createTopics({
            topics: [{
                topic: topicName,
                replicationFactor: REPLICATION_FACTOR,
                numPartitions: NUM_PARTITIONS,
                configEntries: [
                    {name: "cleanup.policy", value: CLEANUP_POLICY},
                ],
            }],
        })
        await adminClient.disconnect()
    } catch (e) {
        core.setFailed(e.message)
    }
})()


})();

module.exports = __webpack_exports__;
/******/ })()
;