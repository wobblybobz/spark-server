'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class;

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

var _httpVerb = require('../decorators/httpVerb');

var _httpVerb2 = _interopRequireDefault(_httpVerb);

var _route = require('../decorators/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var ProductFirmwaresControllerV2 = (_dec = (0, _httpVerb2.default)('get'), _dec2 = (0, _route2.default)('/v2/products/:productIDOrSlug/firmwares/count'), _dec3 = (0, _httpVerb2.default)('get'), _dec4 = (0, _route2.default)('/v2/products/:productIDOrSlug/firmwares'), _dec5 = (0, _httpVerb2.default)('get'), _dec6 = (0, _route2.default)('/v2/products/:productIDOrSlug/firmwares/:firmwareID'), (_class = function (_Controller) {
  (0, _inherits3.default)(ProductFirmwaresControllerV2, _Controller);

  function ProductFirmwaresControllerV2(deviceManager, productDeviceRepository, productFirmwareRepository, productRepository) {
    (0, _classCallCheck3.default)(this, ProductFirmwaresControllerV2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProductFirmwaresControllerV2.__proto__ || (0, _getPrototypeOf2.default)(ProductFirmwaresControllerV2)).call(this));

    _this._deviceManager = deviceManager;
    _this._productDeviceRepository = productDeviceRepository;
    _this._productFirmwareRepository = productFirmwareRepository;
    _this._productRepository = productRepository;
    return _this;
  }

  (0, _createClass3.default)(ProductFirmwaresControllerV2, [{
    key: 'countFirmwares',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(productIDOrSlug) {
        var product, count;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 2:
                product = _context.sent;

                if (product) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 5:
                _context.next = 7;
                return this._productFirmwareRepository.countByProductID(product.product_id);

              case 7:
                count = _context.sent;
                return _context.abrupt('return', this.ok(count));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function countFirmwares(_x) {
        return _ref.apply(this, arguments);
      }

      return countFirmwares;
    }()
  }, {
    key: 'getFirmwares',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(productIDOrSlug) {
        var _this2 = this;

        var _request$query, skip, take, product, firmwares, mappedFirmware;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _request$query = this.request.query, skip = _request$query.skip, take = _request$query.take;
                _context3.next = 3;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 3:
                product = _context3.sent;

                if (product) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt('return', this.bad('Product does not exist', 404));

              case 6:
                _context3.next = 8;
                return this._productFirmwareRepository.getManyByProductID(product.product_id, { skip: skip, take: take });

              case 8:
                firmwares = _context3.sent;
                _context3.next = 11;
                return _promise2.default.all(
                // eslint-disable-next-line no-unused-vars
                firmwares.map(function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
                    var data = _ref4.data,
                        firmware = (0, _objectWithoutProperties3.default)(_ref4, ['data']);
                    var deviceCount;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return _this2._productDeviceRepository.countByProductID(product.product_id, {
                              productFirmwareVersion: firmware.version
                            });

                          case 2:
                            deviceCount = _context2.sent;
                            return _context2.abrupt('return', (0, _extends3.default)({}, firmware, {
                              device_count: deviceCount
                            }));

                          case 4:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function (_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 11:
                mappedFirmware = _context3.sent;
                return _context3.abrupt('return', this.ok(mappedFirmware));

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getFirmwares(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getFirmwares;
    }()
  }, {
    key: 'getFirmware',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(productIDOrSlug, firmwareID) {
        var product, firmware, deviceCount, data, restFirmware;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 2:
                product = _context4.sent;

                if (product) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 5:
                _context4.next = 7;
                return this._productFirmwareRepository.getByID(firmwareID);

              case 7:
                firmware = _context4.sent;

                if (firmware) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt('return', this.bad('Firmware ' + firmwareID + ' doesn\'t exist.'));

              case 10:
                _context4.next = 12;
                return this._productDeviceRepository.countByProductID(product.product_id, {
                  productFirmwareVersion: firmware.version
                });

              case 12:
                deviceCount = _context4.sent;


                // eslint-disable-next-line no-unused-vars
                data = firmware.data, restFirmware = (0, _objectWithoutProperties3.default)(firmware, ['data']);
                return _context4.abrupt('return', this.ok((0, _extends3.default)({}, restFirmware, {
                  device_count: deviceCount
                })));

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getFirmware(_x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return getFirmware;
    }()
  }]);
  return ProductFirmwaresControllerV2;
}(_Controller3.default), (_applyDecoratedDescriptor(_class.prototype, 'countFirmwares', [_dec, _dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'countFirmwares'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getFirmwares', [_dec3, _dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getFirmwares'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getFirmware', [_dec5, _dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getFirmware'), _class.prototype)), _class));
exports.default = ProductFirmwaresControllerV2;