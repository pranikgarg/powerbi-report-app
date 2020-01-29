"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _powerbiClient = require("powerbi-client");

var _Embed = _interopRequireDefault(require("./Embed"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createConfig = function createConfig(props) {
  if (props) {
    var embedType = props.embedType,
        tokenType = props.tokenType,
        accessToken = props.accessToken,
        embedUrl = props.embedUrl,
        embedId = props.embedId,
        permissions = props.permissions,
        pageName = props.pageName,
        extraSettings = props.extraSettings,
        dashboardId = props.dashboardId;
    return (0, _utils.clean)({
      type: embedType,
      tokenType: _powerbiClient.models.TokenType[tokenType],
      accessToken: accessToken,
      embedUrl: embedUrl,
      id: embedId,
      pageName: pageName,
      dashboardId: dashboardId,
      permissions: _powerbiClient.models.Permissions[permissions],
      settings: _objectSpread({
        filterPaneEnabled: true,
        navContentPaneEnabled: true
      }, extraSettings)
    });
  }

  return null;
};

var Report =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Report, _PureComponent);

  function Report(props) {
    var _this;

    _classCallCheck(this, Report);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Report).call(this, props));
    _this.state = {
      currentConfig: null
    };
    _this.performOnEmbed = _this.performOnEmbed.bind(_assertThisInitialized(_this));
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Report, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateState(this.props);
    }
  }, {
    key: "performOnEmbed",
    value: function performOnEmbed(report, reportRef) {
      var _this$props = this.props,
          embedType = _this$props.embedType,
          onLoad = _this$props.onLoad,
          onRender = _this$props.onRender,
          onSelectData = _this$props.onSelectData,
          onPageChange = _this$props.onPageChange,
          onTileClicked = _this$props.onTileClicked,
          onButtonClicked = _this$props.onButtonClicked,
          onFiltersApplied = _this$props.onFiltersApplied,
          onCommandTriggered = _this$props.onCommandTriggered;

      if (embedType === 'report') {
        report.on('loaded', function () {
          if (onLoad) onLoad(report);
        });
        report.on('rendered', function () {
          if (onRender) onRender(report);
        });
        report.on('dataSelected', function (event) {
          if (onSelectData) {
            onSelectData(event.detail);
          }
        });
        report.on('pageChanged', function (event) {
          if (onPageChange) {
            onPageChange(event.detail);
          }
        });
        report.on('buttonClicked', function (event) {
          if (onButtonClicked) {
            onButtonClicked(event.detail);
          }
        });
        report.on('filtersApplied', function (event) {
          if (onFiltersApplied) {
            onFiltersApplied(event.detail);
          }
        });
        report.on('commandTriggered', function (event) {
          if (onCommandTriggered) {
            onCommandTriggered(event.detail);
          }
        });
      } else if (embedType === 'dashboard') {
        if (onLoad) onLoad(report, powerbi.get(reportRef));
        report.on('tileClicked', function (event) {
          if (onTileClicked) {
            onTileClicked(event.detail);
          }
        });
      }
    }
  }, {
    key: "updateState",
    value: function updateState(props) {
      this.setState({
        currentConfig: createConfig(props)
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.currentConfig) {
        return _react["default"].createElement("div", null, " Error ");
      }

      return _react["default"].createElement(_Embed["default"], {
        config: this.state.currentConfig,
        performOnEmbed: this.performOnEmbed,
        style: this.props.style
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      return {
        currentConfig: createConfig(props)
      };
    }
  }]);

  return Report;
}(_react.PureComponent);

Report.propTypes = {
  embedType: _propTypes["default"].string.isRequired,
  tokenType: _propTypes["default"].string.isRequired,
  accessToken: _propTypes["default"].string.isRequired,
  embedUrl: _propTypes["default"].string.isRequired,
  embedId: _propTypes["default"].string.isRequired,
  pageName: _propTypes["default"].string,
  extraSettings: _propTypes["default"].object,
  permissions: _propTypes["default"].string.isRequired,
  onLoad: _propTypes["default"].func,
  onSelectData: _propTypes["default"].func,
  onPageChange: _propTypes["default"].func,
  onTileClicked: _propTypes["default"].func,
  style: _propTypes["default"].object
};
var _default = Report;
exports["default"] = _default;