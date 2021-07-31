(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["lazy-loading-lazy-loading-module"], {
    /***/
    "+skE": function skE(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LazyLoadingRoutingModule", function () {
        return LazyLoadingRoutingModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./lazy-loading/lazy-loading.component */
      "zMYf");

      var routes = [{
        path: "",
        component: _lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_2__["LazyLoadingComponent"]
      }];

      var LazyLoadingRoutingModule = function LazyLoadingRoutingModule() {
        _classCallCheck(this, LazyLoadingRoutingModule);
      };

      LazyLoadingRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: LazyLoadingRoutingModule
      });
      LazyLoadingRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function LazyLoadingRoutingModule_Factory(t) {
          return new (t || LazyLoadingRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LazyLoadingRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LazyLoadingRoutingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "JJ6r": function JJ6r(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LazyLoadingModule", function () {
        return LazyLoadingModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _lazy_loading_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./lazy-loading-routing.module */
      "+skE");
      /* harmony import */


      var _lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./lazy-loading/lazy-loading.component */
      "zMYf");

      var LazyLoadingModule = function LazyLoadingModule() {
        _classCallCheck(this, LazyLoadingModule);
      };

      LazyLoadingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: LazyLoadingModule
      });
      LazyLoadingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function LazyLoadingModule_Factory(t) {
          return new (t || LazyLoadingModule)();
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _lazy_loading_routing_module__WEBPACK_IMPORTED_MODULE_2__["LazyLoadingRoutingModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LazyLoadingModule, {
          declarations: [_lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_3__["LazyLoadingComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _lazy_loading_routing_module__WEBPACK_IMPORTED_MODULE_2__["LazyLoadingRoutingModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LazyLoadingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            declarations: [_lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_3__["LazyLoadingComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _lazy_loading_routing_module__WEBPACK_IMPORTED_MODULE_2__["LazyLoadingRoutingModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "zMYf": function zMYf(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LazyLoadingComponent", function () {
        return LazyLoadingComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var LazyLoadingComponent = /*#__PURE__*/function () {
        function LazyLoadingComponent() {
          _classCallCheck(this, LazyLoadingComponent);
        }

        _createClass(LazyLoadingComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return LazyLoadingComponent;
      }();

      LazyLoadingComponent.ɵfac = function LazyLoadingComponent_Factory(t) {
        return new (t || LazyLoadingComponent)();
      };

      LazyLoadingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: LazyLoadingComponent,
        selectors: [["app-lazy-loading"]],
        decls: 2,
        vars: 0,
        template: function LazyLoadingComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "lazy-loading works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xhenktbG9hZGluZy9sYXp5LWxvYWRpbmcvbGF6eS1sb2FkaW5nLmNvbXBvbmVudC5jc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LazyLoadingComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-lazy-loading',
            templateUrl: './lazy-loading.component.html',
            styleUrls: ['./lazy-loading.component.css']
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    }
  }]);
})();
//# sourceMappingURL=lazy-loading-lazy-loading-module-es5.js.map