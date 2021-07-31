(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["lazy-loading-lazy-loading-module"],{

/***/ "+skE":
/*!*************************************************************!*\
  !*** ./src/app/lazy-loading/lazy-loading-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: LazyLoadingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadingRoutingModule", function() { return LazyLoadingRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-loading/lazy-loading.component */ "zMYf");





const routes = [
    {
        path: "",
        component: _lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_2__["LazyLoadingComponent"]
    }
];
class LazyLoadingRoutingModule {
}
LazyLoadingRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LazyLoadingRoutingModule });
LazyLoadingRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LazyLoadingRoutingModule_Factory(t) { return new (t || LazyLoadingRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LazyLoadingRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LazyLoadingRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "JJ6r":
/*!*****************************************************!*\
  !*** ./src/app/lazy-loading/lazy-loading.module.ts ***!
  \*****************************************************/
/*! exports provided: LazyLoadingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadingModule", function() { return LazyLoadingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _lazy_loading_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-loading-routing.module */ "+skE");
/* harmony import */ var _lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-loading/lazy-loading.component */ "zMYf");





class LazyLoadingModule {
}
LazyLoadingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LazyLoadingModule });
LazyLoadingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LazyLoadingModule_Factory(t) { return new (t || LazyLoadingModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _lazy_loading_routing_module__WEBPACK_IMPORTED_MODULE_2__["LazyLoadingRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LazyLoadingModule, { declarations: [_lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_3__["LazyLoadingComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _lazy_loading_routing_module__WEBPACK_IMPORTED_MODULE_2__["LazyLoadingRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LazyLoadingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_lazy_loading_lazy_loading_component__WEBPACK_IMPORTED_MODULE_3__["LazyLoadingComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _lazy_loading_routing_module__WEBPACK_IMPORTED_MODULE_2__["LazyLoadingRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "zMYf":
/*!*********************************************************************!*\
  !*** ./src/app/lazy-loading/lazy-loading/lazy-loading.component.ts ***!
  \*********************************************************************/
/*! exports provided: LazyLoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadingComponent", function() { return LazyLoadingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class LazyLoadingComponent {
    constructor() { }
    ngOnInit() {
    }
}
LazyLoadingComponent.ɵfac = function LazyLoadingComponent_Factory(t) { return new (t || LazyLoadingComponent)(); };
LazyLoadingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LazyLoadingComponent, selectors: [["app-lazy-loading"]], decls: 2, vars: 0, template: function LazyLoadingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "lazy-loading works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xhenktbG9hZGluZy9sYXp5LWxvYWRpbmcvbGF6eS1sb2FkaW5nLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LazyLoadingComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-lazy-loading',
                templateUrl: './lazy-loading.component.html',
                styleUrls: ['./lazy-loading.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ })

}]);
//# sourceMappingURL=lazy-loading-lazy-loading-module-es2015.js.map