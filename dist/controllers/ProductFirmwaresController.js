'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _desc, _value, _class;

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

var _httpVerb = require('../decorators/httpVerb');

var _httpVerb2 = _interopRequireDefault(_httpVerb);

var _binaryVersionReader = require('binary-version-reader');

var _allowUpload = require('../decorators/allowUpload');

var _allowUpload2 = _interopRequireDefault(_allowUpload);

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

var ProductFirmwaresController = (_dec = (0, _httpVerb2.default)('get'), _dec2 = (0, _route2.default)('/v1/products/:productIDOrSlug/firmware'), _dec3 = (0, _httpVerb2.default)('get'), _dec4 = (0, _route2.default)('/v1/products/:productIDOrSlug/firmware/:version'), _dec5 = (0, _httpVerb2.default)('post'), _dec6 = (0, _route2.default)('/v1/products/:productIDOrSlug/firmware'), _dec7 = (0, _allowUpload2.default)('binary', 1), _dec8 = (0, _httpVerb2.default)('put'), _dec9 = (0, _route2.default)('/v1/products/:productIDOrSlug/firmware/:version'), _dec10 = (0, _httpVerb2.default)('delete'), _dec11 = (0, _route2.default)('/v1/products/:productIDOrSlug/firmware/:version'), (_class = function (_Controller) {
  (0, _inherits3.default)(ProductFirmwaresController, _Controller);

  function ProductFirmwaresController(deviceManager, productFirmwareRepository, productRepository) {
    (0, _classCallCheck3.default)(this, ProductFirmwaresController);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProductFirmwaresController.__proto__ || (0, _getPrototypeOf2.default)(ProductFirmwaresController)).call(this));

    _this._deviceManager = deviceManager;
    _this._productFirmwareRepository = productFirmwareRepository;
    _this._productRepository = productRepository;
    return _this;
  }

  (0, _createClass3.default)(ProductFirmwaresController, [{
    key: 'getFirmwares',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(productIDOrSlug) {
        var product, firmwares;
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

                return _context.abrupt('return', this.bad('Product does not exist', 404));

              case 5:
                _context.next = 7;
                return this._productFirmwareRepository.getManyByProductID(product.product_id);

              case 7:
                firmwares = _context.sent;
                return _context.abrupt('return', this.ok(firmwares.map(function (_ref2) {
                  var data = _ref2.data,
                      firmware = (0, _objectWithoutProperties3.default)(_ref2, ['data']);
                  return firmware;
                })));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getFirmwares(_x) {
        return _ref.apply(this, arguments);
      }

      return getFirmwares;
    }()
  }, {
    key: 'getSingleFirmware',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(productIDOrSlug, version) {
        var product, firmwareList, existingFirmware, data, id, output;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 2:
                product = _context2.sent;

                if (product) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 5:
                _context2.next = 7;
                return this._productFirmwareRepository.getManyByProductID(product.product_id);

              case 7:
                firmwareList = _context2.sent;
                existingFirmware = firmwareList.find(function (firmware) {
                  return firmware.version === parseInt(version, 10);
                });

                if (existingFirmware) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('return', this.bad('Firmware version ' + version + ' does not exist'));

              case 11:

                // eslint-disable-next-line no-unused-vars
                data = existingFirmware.data, id = existingFirmware.id, output = (0, _objectWithoutProperties3.default)(existingFirmware, ['data', 'id']);
                return _context2.abrupt('return', this.ok(output));

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSingleFirmware(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return getSingleFirmware;
    }()
  }, {
    key: 'addFirmware',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(productIDOrSlug, body) {
        var missingFields, product, parser, moduleInfo, firmwarePlatformID, _moduleInfo$suffixInf, productId, productVersion, version, firmwareList, maxExistingFirmwareVersion, firmware, data, id, output;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                missingFields = ['binary', 'description', 'title', 'version'].filter(function (key) {
                  return !body[key];
                });

                if (!missingFields.length) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt('return', this.bad('Missing fields: ' + missingFields.join(', ')));

              case 3:

                // eslint-disable-next-line no-param-reassign
                body.current = this._stringToBoolean(body.current);

                _context3.next = 6;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 6:
                product = _context3.sent;

                if (product) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 9:
                parser = new _binaryVersionReader.HalModuleParser();
                _context3.next = 12;
                return new _promise2.default(function (resolve, reject) {
                  return parser.parseBuffer({ fileBuffer: body.binary.buffer }).then(resolve, reject);
                });

              case 12:
                moduleInfo = _context3.sent;

                if (!(moduleInfo.crc.ok !== 1)) {
                  _context3.next = 15;
                  break;
                }

                return _context3.abrupt('return', this.bad('Invalid CRC. Try recompiling the firmware'));

              case 15:
                firmwarePlatformID = moduleInfo.prefixInfo.platformID;

                if (!(firmwarePlatformID !== product.platform_id)) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt('return', this.bad('Firmware had incorrect platform ID ' + firmwarePlatformID + '. Expected ' + product.platform_id + ' '));

              case 18:
                _moduleInfo$suffixInf = moduleInfo.suffixInfo, productId = _moduleInfo$suffixInf.productId, productVersion = _moduleInfo$suffixInf.productVersion;

                if (!(productId !== parseInt(product.product_id, 10))) {
                  _context3.next = 21;
                  break;
                }

                return _context3.abrupt('return', this.bad('Firmware had incorrect product ID ' + productId + '. Expected  ' + product.product_id));

              case 21:
                version = parseInt(body.version, 10);

                if (!(productVersion !== version)) {
                  _context3.next = 24;
                  break;
                }

                return _context3.abrupt('return', this.bad('Firmware had incorrect product version ' + productVersion + '. Expected ' + product.product_id));

              case 24:
                _context3.next = 26;
                return this._productFirmwareRepository.getManyByProductID(product.product_id);

              case 26:
                firmwareList = _context3.sent;
                maxExistingFirmwareVersion = Math.max.apply(Math, (0, _toConsumableArray3.default)(firmwareList.map(function (firmware) {
                  return parseInt(firmware.version, 10);
                })));

                if (!(version <= maxExistingFirmwareVersion)) {
                  _context3.next = 30;
                  break;
                }

                return _context3.abrupt('return', this.bad('version must be greater than ' + maxExistingFirmwareVersion));

              case 30:
                if (!body.current) {
                  _context3.next = 33;
                  break;
                }

                _context3.next = 33;
                return this._findAndUnreleaseCurrentFirmware(firmwareList);

              case 33:
                _context3.next = 35;
                return this._productFirmwareRepository.create({
                  current: body.current,
                  data: body.binary.buffer,
                  description: body.description,
                  device_count: 0,
                  name: body.binary.originalname,
                  product_id: product.product_id,
                  size: body.binary.size,
                  title: body.title,
                  version: version
                });

              case 35:
                firmware = _context3.sent;


                if (body.current) {
                  this._deviceManager.flashProductFirmware(product.product_id);
                }

                // eslint-disable-next-line no-unused-vars
                data = firmware.data, id = firmware.id, output = (0, _objectWithoutProperties3.default)(firmware, ['data', 'id']);
                return _context3.abrupt('return', this.ok(output));

              case 39:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addFirmware(_x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return addFirmware;
    }()
  }, {
    key: 'updateFirmware',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(productIDOrSlug, version, body) {
        var _body, current, description, title, product, firmwareList, existingFirmware, firmware, data, id, output;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _body = body, current = _body.current, description = _body.description, title = _body.title;
                // eslint-disable-next-line no-param-reassign

                body = {
                  current: this._stringToBoolean(current),
                  description: description,
                  title: title
                };
                _context4.next = 4;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 4:
                product = _context4.sent;

                if (product) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 7:
                _context4.next = 9;
                return this._productFirmwareRepository.getManyByProductID(product.product_id);

              case 9:
                firmwareList = _context4.sent;
                existingFirmware = firmwareList.find(function (firmware) {
                  return firmware.version === parseInt(version, 10);
                });

                if (existingFirmware) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt('return', this.bad('Firmware version ' + version + ' does not exist'));

              case 13:
                if (!body.current) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 16;
                return this._findAndUnreleaseCurrentFirmware(firmwareList);

              case 16:
                _context4.next = 18;
                return this._productFirmwareRepository.updateByID(existingFirmware.id, (0, _extends3.default)({}, existingFirmware, body));

              case 18:
                firmware = _context4.sent;


                // eslint-disable-next-line no-unused-vars
                data = firmware.data, id = firmware.id, output = (0, _objectWithoutProperties3.default)(firmware, ['data', 'id']);


                if (current) {
                  this._deviceManager.flashProductFirmware(product.product_id);
                }
                return _context4.abrupt('return', this.ok(output));

              case 22:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateFirmware(_x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
      }

      return updateFirmware;
    }()
  }, {
    key: 'deleteFirmware',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(productIDOrSlug, version) {
        var product, firmwareList, existingFirmware;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 2:
                product = _context5.sent;

                if (product) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 5:
                _context5.next = 7;
                return this._productFirmwareRepository.getManyByProductID(product.product_id);

              case 7:
                firmwareList = _context5.sent;
                existingFirmware = firmwareList.find(function (firmware) {
                  return firmware.version === parseInt(version, 10);
                });

                if (existingFirmware) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt('return', this.bad('Firmware version ' + version + ' does not exist'));

              case 11:
                _context5.next = 13;
                return this._productFirmwareRepository.deleteByID(existingFirmware.id);

              case 13:
                return _context5.abrupt('return', this.ok());

              case 14:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteFirmware(_x9, _x10) {
        return _ref6.apply(this, arguments);
      }

      return deleteFirmware;
    }()
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
  return ProductFirmwaresController;
}(_Controller3.default), (_applyDecoratedDescriptor(_class.prototype, 'getFirmwares', [_dec, _dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getFirmwares'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getSingleFirmware', [_dec3, _dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getSingleFirmware'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addFirmware', [_dec5, _dec6, _dec7], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'addFirmware'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateFirmware', [_dec8, _dec9], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateFirmware'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'deleteFirmware', [_dec10, _dec11], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'deleteFirmware'), _class.prototype)), _class));
exports.default = ProductFirmwaresController;