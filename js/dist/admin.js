module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/PermissionGrid */ "flarum/components/PermissionGrid");
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__);



flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('xelson-chat', function (app) {
  app.extensionData["for"]('xelson-chat').registerSetting({
    setting: 'xelson-chat.settings.charlimit',
    label: app.translator.trans('xelson-chat.admin.settings.charlimit'),
    type: 'number'
  }).registerSetting({
    setting: 'xelson-chat.settings.floodgate.number',
    label: app.translator.trans('xelson-chat.admin.settings.floodgate.number'),
    type: 'number'
  }).registerSetting({
    setting: 'xelson-chat.settings.floodgate.time',
    label: app.translator.trans('xelson-chat.admin.settings.floodgate.time'),
    type: 'text'
  }).registerSetting({
    setting: 'xelson-chat.settings.display.minimize',
    label: app.translator.trans('xelson-chat.admin.settings.display.minimize'),
    type: 'switch'
  }).registerSetting({
    setting: 'xelson-chat.settings.display.censor',
    label: app.translator.trans('xelson-chat.admin.settings.display.censor'),
    type: 'switch'
  })
  /*
  .registerSetting(function () {
      return (
          <div className="Form-group">
          <label>{label}</label>
          <div className="helpText">{help}</div>
          <textarea bidi={this.setting('my_setting_name')}>{this.setting('my_setting_name')()}</textarea>
          </div>
      );
      })
  */
  .registerPermission({
    icon: 'fas fa-eye',
    label: app.translator.trans('xelson-chat.admin.permissions.enabled'),
    permission: 'xelson-chat.permissions.enabled',
    allowGuest: true
  }, 'view').registerPermission({
    icon: 'fas fa-comment-medical',
    label: app.translator.trans('xelson-chat.admin.permissions.create.chat'),
    permission: 'xelson-chat.permissions.create'
  }, 'start').registerPermission({
    icon: 'fas fa-comment-medical',
    label: app.translator.trans('xelson-chat.admin.permissions.create.channel'),
    permission: 'xelson-chat.permissions.create.channel'
  }, 'start').registerPermission({
    icon: 'fas fa-comments',
    label: app.translator.trans('xelson-chat.admin.permissions.post'),
    permission: 'xelson-chat.permissions.chat'
  }, 'reply').registerPermission({
    icon: 'fas fa-pencil-alt',
    label: app.translator.trans('xelson-chat.admin.permissions.edit'),
    permission: 'xelson-chat.permissions.edit'
  }, 'reply').registerPermission({
    icon: 'far fa-trash-alt',
    label: app.translator.trans('xelson-chat.admin.permissions.delete'),
    permission: 'xelson-chat.permissions.delete'
  }, 'reply').registerPermission({
    icon: 'fas fa-eye',
    label: app.translator.trans('xelson-chat.admin.permissions.moderate.vision'),
    permission: 'xelson-chat.permissions.moderate.vision'
  }, 'moderate').registerPermission({
    icon: 'far fa-trash-alt',
    label: app.translator.trans('xelson-chat.admin.permissions.moderate.delete'),
    permission: 'xelson-chat.permissions.moderate.delete'
  }, 'moderate');
});

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/PermissionGrid":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/PermissionGrid']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/PermissionGrid'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map