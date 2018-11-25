// @flow

import type { Device, DeviceAttributes } from '../types';

export type DeviceAPIType = {|
  cellular: boolean,
  connected: boolean,
  current_build_target: string,
  functions?: ?Array<string>,
  id: string,
  imei?: string,
  last_app: ?string,
  last_heard: ?Date,
  last_iccid?: string,
  last_ip_address: ?string,
  name: string,
  platform_id: number,
  product_firmware_version: number,
  product_id: number,
  return_value?: mixed,
  status: string,
  variables?: ?Object,
|};

const DEVICE_DEFAULT = {
  connected: false,
  current_build_target: -1,
  deviceID: '',
  functions: null,
  imei: '',
  ip: null,
  isCellular: false,
  last_iccid: '',
  lastFlashedAppName: null,
  lastHeard: null,
  name: '',
  particleProductId: -1,
  platformId: -1,
  productFirmwareVersion: -1,
  variables: null,
};

const deviceToAPI = (
  device: ?Device | ?DeviceAttributes,
  result?: mixed,
): DeviceAPIType => {
  const mergedDevice = {
    ...DEVICE_DEFAULT,
    ...device,
  };

  return {
    cellular: mergedDevice.isCellular,
    connected: (mergedDevice: any).connected || false,
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
    variables: mergedDevice.variables || null,
  };
};

export default deviceToAPI;
