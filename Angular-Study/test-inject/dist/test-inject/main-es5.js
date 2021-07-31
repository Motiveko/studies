(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0: function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! /Users/donggi/Desktop/Programing/Angular Study/test-inject/src/main.ts */
      "zUnb");
      /***/
    },

    /***/
    "0np6": function np6(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "config", function () {
        return config;
      });
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");

      var config = {
        endPoint: src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].endPoint
      };
      /***/
    },

    /***/
    "0ooZ": function ooZ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Data1Component", function () {
        return Data1Component;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../data.service */
      "R7Hv");

      var Data1Component = /*#__PURE__*/function () {
        function Data1Component(dataService) {
          _classCallCheck(this, Data1Component);

          this.dataService = dataService;
        }

        _createClass(Data1Component, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "message",
          get: function get() {
            return this.dataService.message;
          },
          set: function set(newMessage) {
            this.dataService.message = newMessage;
          }
        }]);

        return Data1Component;
      }();

      Data1Component.ɵfac = function Data1Component_Factory(t) {
        return new (t || Data1Component)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]));
      };

      Data1Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: Data1Component,
        selectors: [["app-data1"]],
        decls: 6,
        vars: 1,
        consts: [[2, "background-color", "aliceblue", "padding", "10px"], ["type", "text", "placeholder", "message", 3, "input"]],
        template: function Data1Component_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Data - 1");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function Data1Component_Template_input_input_5_listener($event) {
              return ctx.message = $event.target.value;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.message);
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RhdGExL2RhdGExLmNvbXBvbmVudC5jc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Data1Component, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-data1',
            templateUrl: './data1.component.html',
            styleUrls: ['./data1.component.css']
          }]
        }], function () {
          return [{
            type: _data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "82Lo": function Lo(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "InMemHeroService", function () {
        return InMemHeroService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! faker/locale/ko */
      "l+Ld");
      /* harmony import */


      var faker_locale_ko__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /**
       * Http Client의 Api호출을 Mocking하기위한 InMemoryDbService 구현체
       */


      var InMemHeroService = /*#__PURE__*/function () {
        function InMemHeroService() {
          _classCallCheck(this, InMemHeroService);

          this.onePerson = function () {
            return {
              id: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["datatype"].uuid(),
              phone: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["phone"].phoneNumber(),
              phoneNumberFormat: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["phone"].phoneNumberFormat(),
              firstName: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["name"].firstName(),
              lastName: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["name"].lastName(),
              email: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["internet"].email(),
              zipCode: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["address"].zipCode(),
              city: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["address"].city(),
              streetName: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["address"].streetName(),
              streetAddress: faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["address"].streetAddress()
            };
          };
        }

        _createClass(InMemHeroService, [{
          key: "persons",
          value: function persons() {
            var res = [];
            Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["range"])(faker_locale_ko__WEBPACK_IMPORTED_MODULE_2__["datatype"].number(1000)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.onePerson)).subscribe(function (person) {
              return res.push(person);
            }, function (err) {
              return console.log(err);
            }, function () {
              return console.log('mockData complete!');
            });
            return res;
          }
        }, {
          key: "createDb",
          value: function createDb(reqInfo) {
            var heros = [{
              id: 1,
              name: "아이언맨"
            }, {
              id: 2,
              name: "토르"
            }, {
              id: 3,
              name: "헐크"
            }, {
              id: 4,
              name: "블랙 위도우"
            }];
            return {
              heros: heros,
              persons: this.persons()
            }; // return from(heros)
          }
        }]);

        return InMemHeroService;
      }();

      InMemHeroService.ɵfac = function InMemHeroService_Factory(t) {
        return new (t || InMemHeroService)();
      };

      InMemHeroService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: InMemHeroService,
        factory: InMemHeroService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](InMemHeroService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "AytR": function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false,
        endPoint: 'http://localhost:8080'
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "R7Hv": function R7Hv(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DataService", function () {
        return DataService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var DataService = function DataService() {
        _classCallCheck(this, DataService);
      };

      DataService.ɵfac = function DataService_Factory(t) {
        return new (t || DataService)();
      };

      DataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: DataService,
        factory: DataService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DataService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "Sy1n": function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _AppConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./AppConfig */
      "lnOu");
      /* harmony import */


      var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./api.service */
      "yTNM");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var _c0 = function _c0() {
        return ["/child"];
      };

      var _c1 = function _c1() {
        return ["/lazy"];
      };

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent(appConfig, apiService, router, route) {
          _classCallCheck(this, AppComponent);

          this.appConfig = appConfig;
          this.apiService = apiService;
          this.router = router;
          this.route = route;
          this.title = 'test-inject';
          console.log('home component:');
          console.log(appConfig);
        }

        _createClass(AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {// console.log(environment.production)
            // this.apiService.get('heros').subscribe(
            //   (res) => console.log(res),
            //   (err) => console.log(err),
            //   () => console.log('call heros api complete')
            // )
            // this.apiService.get('persons').subscribe(
            //   (res) => console.log(res),
            //   (err) => console.log(err),
            //   () => console.log('call persons api complete')      
            // )
            // this.route.params.subscribe(
            // )
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_AppConfig__WEBPACK_IMPORTED_MODULE_1__["APP_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]));
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 5,
        vars: 4,
        consts: [[3, "routerLink"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "child\uB85C");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "child\uB85C");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c1));
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
          }]
        }], function () {
          return [{
            type: _AppConfig__WEBPACK_IMPORTED_MODULE_1__["AppConfig"],
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
              args: [_AppConfig__WEBPACK_IMPORTED_MODULE_1__["APP_CONFIG"]]
            }]
          }, {
            type: _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "XA72": function XA72(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Data2Component", function () {
        return Data2Component;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../data.service */
      "R7Hv");

      var Data2Component = /*#__PURE__*/function () {
        function Data2Component(dataService) {
          _classCallCheck(this, Data2Component);

          this.dataService = dataService;
        }

        _createClass(Data2Component, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "message",
          get: function get() {
            return this.dataService.message;
          },
          set: function set(newMessage) {
            this.dataService.message = newMessage;
          }
        }, {
          key: "checkInput",
          value: function checkInput($event) {
            console.log($event);
          }
        }]);

        return Data2Component;
      }();

      Data2Component.ɵfac = function Data2Component_Factory(t) {
        return new (t || Data2Component)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]));
      };

      Data2Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: Data2Component,
        selectors: [["app-data2"]],
        decls: 6,
        vars: 1,
        consts: [[2, "adding", "10px", "background-color", "blanchedalmond"], ["type", "text", "placeholder", "message", 3, "input"]],
        template: function Data2Component_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Data - 2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function Data2Component_Template_input_input_5_listener($event) {
              return ctx.message = ctx.checkInput($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.message);
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RhdGEyL2RhdGEyLmNvbXBvbmVudC5jc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Data2Component, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-data2',
            templateUrl: './data2.component.html',
            styleUrls: ['./data2.component.css']
          }]
        }], function () {
          return [{
            type: _data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "ZAI4": function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _data1_data1_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./data1/data1.component */
      "0ooZ");
      /* harmony import */


      var _data2_data2_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./data2/data2.component */
      "XA72");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");
      /* harmony import */


      var angular_in_memory_web_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! angular-in-memory-web-api */
      "koPj");
      /* harmony import */


      var _in_mem_hero_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./in-mem-hero.service */
      "82Lo");
      /* harmony import */


      var _child_child_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./child/child.module */
      "utsK");

      var inMemoryOptions = {
        // apiBase: '/api',
        host: 'http://localhost:8082',
        delay: 1000
      };

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        factory: function AppModule_Factory(t) {
          return new (t || AppModule)();
        },
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"], src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].production ? [] : angular_in_memory_web_api__WEBPACK_IMPORTED_MODULE_8__["HttpClientInMemoryWebApiModule"].forRoot(_in_mem_hero_service__WEBPACK_IMPORTED_MODULE_9__["InMemHeroService"], inMemoryOptions), _child_child_module__WEBPACK_IMPORTED_MODULE_10__["ChildModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _data1_data1_component__WEBPACK_IMPORTED_MODULE_4__["Data1Component"], _data2_data2_component__WEBPACK_IMPORTED_MODULE_5__["Data2Component"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"], angular_in_memory_web_api__WEBPACK_IMPORTED_MODULE_8__["HttpClientInMemoryWebApiModule"], _child_child_module__WEBPACK_IMPORTED_MODULE_10__["ChildModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
          args: [{
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _data1_data1_component__WEBPACK_IMPORTED_MODULE_4__["Data1Component"], _data2_data2_component__WEBPACK_IMPORTED_MODULE_5__["Data2Component"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"], src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].production ? [] : angular_in_memory_web_api__WEBPACK_IMPORTED_MODULE_8__["HttpClientInMemoryWebApiModule"].forRoot(_in_mem_hero_service__WEBPACK_IMPORTED_MODULE_9__["InMemHeroService"], inMemoryOptions), _child_child_module__WEBPACK_IMPORTED_MODULE_10__["ChildModule"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "lnOu": function lnOu(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppConfig", function () {
        return AppConfig;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MY_APP_CONFIG", function () {
        return MY_APP_CONFIG;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "APP_CONFIG", function () {
        return APP_CONFIG;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppConfigProvider", function () {
        return AppConfigProvider;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AppConfig = function AppConfig(url, port, others) {
        _classCallCheck(this, AppConfig);

        console.log('AppConfig 생성 port:' + port);
        this.url = url;
        this.port = port;
      };

      var MY_APP_CONFIG = new AppConfig('hello', 'hello'); // export const YOUR_APP_CONFIG: AppConfig = new AppConfig('YOUR_APP_COINFG','5050') 
      // export const APP_CONFIG = new InjectionToken<AppConfig>('')
      // 이런식으로 InjectionToken 인스턴스 생성하면서 providedIn: root 해주고 factory값에 인스턴스 생성 메소드를 넣어주면 APP_CONFIG라는 key로 전역에서 의존성 주입이 가능하다

      var APP_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('', {
        providedIn: "root",
        factory: function factory() {
          return new AppConfig('니앱이다임마', '1234');
        }
      });
      var AppConfigProvider = {
        provide: "hello",
        useValue: MY_APP_CONFIG
      };
      /***/
    },

    /***/
    "oQjV": function oQjV(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ChildComponent", function () {
        return ChildComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var ChildComponent = /*#__PURE__*/function () {
        function ChildComponent() {
          _classCallCheck(this, ChildComponent);
        }

        _createClass(ChildComponent, [{
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            console.log('ChildComponent Destroied');
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return ChildComponent;
      }();

      ChildComponent.ɵfac = function ChildComponent_Factory(t) {
        return new (t || ChildComponent)();
      };

      ChildComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: ChildComponent,
        selectors: [["app-child"]],
        decls: 2,
        vars: 0,
        template: function ChildComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\uCC28\uC77C\uB4DC \uBAA8\uB4C8 \uB098\uC654\uAE14\uAE14\uAE14");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoaWxkL2NoaWxkL2NoaWxkLmNvbXBvbmVudC5jc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChildComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-child',
            templateUrl: './child.component.html',
            styleUrls: ['./child.component.css']
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "utsK": function utsK(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ChildModule", function () {
        return ChildModule;
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


      var _child_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./child-routing.module */
      "zurR");
      /* harmony import */


      var _child_child_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./child/child.component */
      "oQjV");

      var ChildModule = function ChildModule() {
        _classCallCheck(this, ChildModule);
      };

      ChildModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: ChildModule
      });
      ChildModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function ChildModule_Factory(t) {
          return new (t || ChildModule)();
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _child_routing_module__WEBPACK_IMPORTED_MODULE_2__["ChildRoutingModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ChildModule, {
          declarations: [_child_child_component__WEBPACK_IMPORTED_MODULE_3__["ChildComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _child_routing_module__WEBPACK_IMPORTED_MODULE_2__["ChildRoutingModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChildModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            declarations: [_child_child_component__WEBPACK_IMPORTED_MODULE_3__["ChildComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _child_routing_module__WEBPACK_IMPORTED_MODULE_2__["ChildRoutingModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "vY5A": function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var routes = [{
        path: '',
        children: [{
          path: 'child',
          loadChildren: function loadChildren() {
            return Promise.resolve().then(__webpack_require__.bind(null,
            /*! ./child/child.module */
            "utsK")).then(function (m) {
              return m.ChildModule;
            });
          }
        }, {
          path: 'lazy',
          loadChildren: function loadChildren() {
            return __webpack_require__.e(
            /*! import() | lazy-loading-lazy-loading-module */
            "lazy-loading-lazy-loading-module").then(__webpack_require__.bind(null,
            /*! ./lazy-loading/lazy-loading.module */
            "JJ6r")).then(function (m) {
              return m.LazyLoadingModule;
            });
          }
        }]
      }, {
        path: 'customers',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | lazy-loading-customers-customers-module */
          "lazy-loading-customers-customers-module").then(__webpack_require__.bind(null,
          /*! ./lazy-loading/customers/customers.module */
          "LXAe")).then(function (m) {
            return m.CustomersModule;
          });
        }
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function AppRoutingModule_Factory(t) {
          return new (t || AppRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "yTNM": function yTNM(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ApiService", function () {
        return ApiService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");
      /* harmony import */


      var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./config/config */
      "0np6");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");

      var ApiService = /*#__PURE__*/function () {
        function ApiService(http) {
          _classCallCheck(this, ApiService);

          this.http = http;
        }

        _createClass(ApiService, [{
          key: "get",
          value: function get(url) {
            return this.http.get("".concat(_config_config__WEBPACK_IMPORTED_MODULE_3__["config"].endPoint, "/api/").concat(url)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(this.handleResponse));
          }
        }, {
          key: "handleResponse",
          value: function handleResponse(res) {
            if (src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
              return res ? res.body : null;
            } else {
              return res;
            }
          }
        }]);

        return ApiService;
      }();

      ApiService.ɵfac = function ApiService_Factory(t) {
        return new (t || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]));
      };

      ApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: ApiService,
        factory: ApiService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApiService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "zUnb": function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P": function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    },

    /***/
    "zurR": function zurR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ChildRoutingModule", function () {
        return ChildRoutingModule;
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


      var _child_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./child/child.component */
      "oQjV");

      var routes = [{
        path: "",
        component: _child_child_component__WEBPACK_IMPORTED_MODULE_2__["ChildComponent"]
      }];

      var ChildRoutingModule = function ChildRoutingModule() {
        _classCallCheck(this, ChildRoutingModule);
      };

      ChildRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: ChildRoutingModule
      });
      ChildRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function ChildRoutingModule_Factory(t) {
          return new (t || ChildRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ChildRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChildRoutingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
          }]
        }], null, null);
      })();
      /***/

    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map