webpackJsonp([1],{

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(152);


/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils__ = __webpack_require__(92);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var mockData = Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["c" /* mockTree */])(3);

var Test = function (_PureComponent) {
  _inherits(Test, _PureComponent);

  function Test() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Test);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Test.__proto__ || Object.getPrototypeOf(Test)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dataSource: mockData,
      selectedKey: mockData[0].children[0].key,
      selectedData: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Test, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dataSource = this.state.dataSource;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__src__["a" /* default */], {
          dataSource: dataSource,
          renderItem: function renderItem(_ref2) {
            var data = _ref2.data,
                isLeaf = _ref2.isLeaf;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              data.key,
              ' ',
              !isLeaf && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { style: { float: 'right' } },
                '>'
              )
            );
          },
          selectedKey: this.state.selectedKey,
          onSelect: function onSelect(selectedKey, _ref3) {
            var data = _ref3.data;

            _this2.setState({ selectedKey: selectedKey, selectedData: data });
            var nodeData = Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["b" /* findInTree */])(dataSource, function (node) {
              return node.key === selectedKey;
            }, { withAppendData: true });
            if (nodeData) {
              console.log('selected node', Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["a" /* atTreePath */])(dataSource, nodeData.loc));
            }
          }
        }),
        'selectedKey: ',
        this.state.selectedKey
      );
    }
  }]);

  return Test;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Test, null), document.getElementById('__react-content'));

/***/ })

},[151]);
//# sourceMappingURL=basic.js.map