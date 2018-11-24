'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEVICE_DEFAULT = {
  connected: false,
  current_build_target: -1,
  deviceID: '',
  functions: null,
  imei: null,
  ip: null,
  isCellular: false,
  last_iccid: null,
  lastFlashedAppName: null,
  lastHeard: null,
  name: null,
  particleProductId: -1,
  platformId: -1,
  productFirmwareVersion: -1,
  variables: null
};

var deviceToAPI = function deviceToAPI(device, result) {
  var mergedDevice = (0, _extends3.default)({}, DEVICE_DEFAULT, device);

  return {
    cellular: mergedDevice.isCellular,
    connected: mergedDevice.connected || false,
    current_build_target: mergedDevice.currentBuildTarget,
    functions: mergedDevice.functions || null,
    id: mergedDevice.deviceID,
    imei: mergedDevice.imei,
    last_app: mergedDevice.lastFlashedAppName,
    last_heard: mergedDevice.lastHeard,
    last_iccid: mergedDevice.last_iccid,
    last_ip_address: mergedDevice.ip,
    name: mergedDevice.name,
    platform_id: mergedDevice.platformId,
    product_firmware_version: mergedDevice.productFirmwareVersion,
    product_id: mergedDevice.particleProductId,
    return_value: result,
    status: 'normal',
    variables: mergedDevice.variables || null
  };
};

exports.default = deviceToAPI;