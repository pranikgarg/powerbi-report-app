"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _powerbiClient = _interopRequireDefault(require("powerbi-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// powerbi object is global
var validateConfig = function validateConfig(config) {
  switch (config.type) {
    case 'report':
      return _powerbiClient["default"].models.validateReportLoad(config);

    case 'dashboard':
      return _powerbiClient["default"].models.validateDashboardLoad(config);

    default:
      return 'Unknown config type';
  }
};

var Embed =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Embed, _PureComponent);

  function Embed(props) {
    var _this;

    _classCallCheck(this, Embed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Embed).call(this, props));
    _this.state = {};
    _this.component = null;
    _this.reportRef = _react["default"].createRef();
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Embed, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateState(this.props.config);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var errors = validateConfig(this.state);

      if (!errors) {
        return this.embed(this.state);
      } else if (this.component !== null) {
        this.reset();
      }

      return null;
    }
  }, {
    key: "embed",
    value: function embed(config) {
      this.component = powerbi.embed(this.reportRef.current, config);

      if (this.props.performOnEmbed) {
        this.props.performOnEmbed(this.component, this.reportRef.current);
      }

      return this.component;
    }
  }, {
    key: "updateState",
    value: function updateState(config) {
      var nextState = Object.assign({}, this.state, config);
      this.setState(nextState);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "report",
        style: this.props.style,
        ref: this.reportRef
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return _objectSpread({}, props.config);
    }
  }]);

  return Embed;
}(_react.PureComponent);

Embed.propTypes = {
  config: _propTypes["default"].object.isRequired,
  performOnEmbed: _propTypes["default"].func.isRequired,
  style: _propTypes["default"].object
};
var _default = Embed;
exports["default"] = _default;