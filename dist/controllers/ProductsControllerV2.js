'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _desc, _value, _class;
/* eslint-disable */

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

var _allowUpload = require('../decorators/allowUpload');

var _allowUpload2 = _interopRequireDefault(_allowUpload);

var _binaryVersionReader = require('binary-version-reader');

var _csv = require('csv');

var _csv2 = _interopRequireDefault(_csv);

var _httpVerb = require('../decorators/httpVerb');

var _httpVerb2 = _interopRequireDefault(_httpVerb);

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

var _route = require('../decorators/route');

var _route2 = _interopRequireDefault(_route);

var _HttpError = require('../lib/HttpError');

var _HttpError2 = _interopRequireDefault(_HttpError);

var _deviceToAPI = require('../lib/deviceToAPI');

var _deviceToAPI2 = _interopRequireDefault(_deviceToAPI);

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

var ProductsControllerV2 = (_dec = (0, _httpVerb2.default)('get'), _dec2 = (0, _route2.default)('/v2/products/count'), _dec3 = (0, _httpVerb2.default)('get'), _dec4 = (0, _route2.default)('/v2/products'), _dec5 = (0, _httpVerb2.default)('post'), _dec6 = (0, _route2.default)('/v2/products'), _dec7 = (0, _httpVerb2.default)('get'), _dec8 = (0, _route2.default)('/v2/products/:productIDOrSlug'), _dec9 = (0, _httpVerb2.default)('put'), _dec10 = (0, _route2.default)('/v2/products/:productIDOrSlug'), _dec11 = (0, _httpVerb2.default)('get'), _dec12 = (0, _route2.default)('/v2/products/:productIDOrSlug/devices/count'), _dec13 = (0, _httpVerb2.default)('get'), _dec14 = (0, _route2.default)('/v2/products/:productIDOrSlug/devices'), (_class = function (_Controller) {
  (0, _inherits3.default)(ProductsControllerV2, _Controller);

  function ProductsControllerV2(deviceManager, deviceAttributeRepository, organizationRepository, productRepository, productConfigRepository, productDeviceRepository, productFirmwareRepository) {
    (0, _classCallCheck3.default)(this, ProductsControllerV2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProductsControllerV2.__proto__ || (0, _getPrototypeOf2.default)(ProductsControllerV2)).call(this));

    _this._deviceManager = deviceManager;
    _this._deviceAttributeRepository = deviceAttributeRepository;
    _this._organizationRepository = organizationRepository;
    _this._productConfigRepository = productConfigRepository;
    _this._productDeviceRepository = productDeviceRepository;
    _this._productFirmwareRepository = productFirmwareRepository;
    _this._productRepository = productRepository;
    return _this;
  }

  (0, _createClass3.default)(ProductsControllerV2, [{
    key: 'countProducts',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var count;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._productRepository.count();

              case 2:
                count = _context.sent;
                return _context.abrupt('return', this.ok(count));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function countProducts() {
        return _ref.apply(this, arguments);
      }

      return countProducts;
    }()
  }, {
    key: 'getProducts',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _request$query, skip, take, products;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _request$query = this.request.query, skip = _request$query.skip, take = _request$query.take;
                _context2.next = 3;
                return this._productRepository.getMany(null, {
                  skip: skip,
                  take: take
                });

              case 3:
                products = _context2.sent;
                return _context2.abrupt('return', this.ok(products.map(this._formatProduct)));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getProducts() {
        return _ref2.apply(this, arguments);
      }

      return getProducts;
    }()
  }, {
    key: 'createProduct',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(productModel) {
        var missingFields, organizations, organizationID, product, config;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (productModel) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', this.bad('You must provide a product'));

              case 2:
                missingFields = ['description', 'hardware_version', 'name', 'platform_id', 'type'].filter(function (key) {
                  return !productModel[key] && productModel[key] !== 0;
                });

                if (!missingFields.length) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt('return', this.bad('Missing fields: ' + missingFields.join(', ')));

              case 5:
                _context3.next = 7;
                return this._organizationRepository.getByUserID(this.user.id);

              case 7:
                organizations = _context3.sent;

                if (organizations.length) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt('return', this.bad("You don't have access to any organizations"));

              case 10:
                organizationID = organizations[0].id;

                productModel.organization = organizationID;
                _context3.next = 14;
                return this._productRepository.create(productModel);

              case 14:
                product = _context3.sent;
                _context3.next = 17;
                return this._productConfigRepository.create({
                  org_id: organizationID,
                  product_id: product.id
                });

              case 17:
                config = _context3.sent;

                product.config_id = config.id;
                _context3.next = 21;
                return this._productRepository.updateByID(product.id, product);

              case 21:
                return _context3.abrupt('return', this.ok(this._formatProduct(product)));

              case 22:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createProduct(_x) {
        return _ref3.apply(this, arguments);
      }

      return createProduct;
    }()
  }, {
    key: 'getProduct',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(productIDOrSlug) {
        var product;
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

                return _context4.abrupt('return', this.bad('Product does not exist', 404));

              case 5:
                return _context4.abrupt('return', this.ok(this._formatProduct(product)));

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getProduct(_x2) {
        return _ref4.apply(this, arguments);
      }

      return getProduct;
    }()
  }, {
    key: 'updateProduct',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(productIDOrSlug, productModel) {
        var missingFields, product;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (productModel) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return', this.bad('You must provide a product'));

              case 2:
                missingFields = ['config_id', 'description', 'hardware_version', 'id', 'name', 'organization', 'platform_id', 'type'].filter(function (key) {
                  return !productModel[key] && productModel[key] !== 0;
                });

                if (!missingFields.length) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt('return', this.bad('Missing fields: ' + missingFields.join(', ')));

              case 5:
                _context5.next = 7;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 7:
                product = _context5.sent;

                if (product) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt('return', this.bad('Product ' + productIDOrSlug + ' doesn\'t exist'));

              case 10:
                _context5.next = 12;
                return this._productRepository.updateByID(product.id, (0, _extends3.default)({}, product, productModel));

              case 12:
                product = _context5.sent;
                return _context5.abrupt('return', this.ok(this._formatProduct(product)));

              case 14:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateProduct(_x3, _x4) {
        return _ref5.apply(this, arguments);
      }

      return updateProduct;
    }()
  }, {
    key: 'countDevices',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(productIDOrSlug) {
        var product, count;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 2:
                product = _context6.sent;

                if (product) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 5:
                _context6.next = 7;
                return this._productDeviceRepository.countByProductID(product.product_id);

              case 7:
                count = _context6.sent;
                return _context6.abrupt('return', this.ok(count));

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function countDevices(_x5) {
        return _ref6.apply(this, arguments);
      }

      return countDevices;
    }()
  }, {
    key: 'getDevices',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(productIDOrSlug) {
        var _request$query2, skip, take, product, productDevices, deviceIDs, deviceAttributesList, devices;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _request$query2 = this.request.query, skip = _request$query2.skip, take = _request$query2.take;
                _context7.next = 3;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 3:
                product = _context7.sent;

                if (product) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 6:
                _context7.next = 8;
                return this._productDeviceRepository.getManyByProductID(product.product_id, { skip: skip, take: take });

              case 8:
                productDevices = _context7.sent;
                deviceIDs = productDevices.map(function (productDevice) {
                  return productDevice.deviceID;
                });
                _context7.next = 12;
                return this._deviceAttributeRepository.getManyFromIDs(deviceIDs);

              case 12:
                deviceAttributesList = _context7.sent;
                devices = productDevices.map(function (_ref8) {
                  var deviceID = _ref8.deviceID,
                      other = (0, _objectWithoutProperties3.default)(_ref8, ['deviceID']);

                  var deviceAttributes = deviceAttributesList.find(function (item) {
                    return deviceID === item.deviceID;
                  });
                  return (0, _extends3.default)({}, (0, _deviceToAPI2.default)(deviceAttributes), other, {
                    id: deviceID,
                    product_id: product.product_id
                  });
                });
                return _context7.abrupt('return', this.ok(devices));

              case 15:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getDevices(_x6) {
        return _ref7.apply(this, arguments);
      }

      return getDevices;
    }()
  }, {
    key: '_formatProduct',
    value: function _formatProduct(product) {
      var product_id = product.product_id,
          output = (0, _objectWithoutProperties3.default)(product, ['product_id']);

      output.id = product_id.toString();
      return output;
    }
  }, {
    key: '_findAndUnreleaseCurrentFirmware',
    value: function _findAndUnreleaseCurrentFirmware(productFirmwareList) {
      var _this2 = this;

      return _promise2.default.all(productFirmwareList.filter(function (firmware) {
        return firmware.current === true;
      }).map(function (releasedFirmware) {
        return _this2._productFirmwareRepository.updateByID(releasedFirmware.id, (0, _extends3.default)({}, releasedFirmware, {
          current: false
        }));
      }));
    }
  }, {
    key: '_stringToBoolean',
    value: function _stringToBoolean(input) {
      if (input === true || input === false) {
        return input;
      }

      switch (input.toLowerCase().trim()) {
        case 'true':
        case 'yes':
        case '1':
          return true;
        case 'false':
        case 'no':
        case '0':
        case null:
          return false;
        default:
          return Boolean(input);
      }
    }
  }]);
  return ProductsControllerV2;
}(_Controller3.default), (_applyDecoratedDescriptor(_class.prototype, 'countProducts', [_dec, _dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'countProducts'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getProducts', [_dec3, _dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getProducts'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'createProduct', [_dec5, _dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'createProduct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getProduct', [_dec7, _dec8], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getProduct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateProduct', [_dec9, _dec10], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateProduct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'countDevices', [_dec11, _dec12], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'countDevices'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getDevices', [_dec13, _dec14], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getDevices'), _class.prototype)), _class));
exports.default = ProductsControllerV2;
/* eslint-enable */