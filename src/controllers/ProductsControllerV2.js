// @flow
/* eslint-disable */

import type { File } from 'express';
import type DeviceManager from '../managers/DeviceManager';
import type {
  IDeviceAttributeRepository,
  IOrganizationRepository,
  IProductConfigRepository,
  IProductDeviceRepository,
  IProductFirmwareRepository,
  IProductRepository,
  Product,
  ProductFirmware,
} from '../types';

import Controller from './Controller';
import allowUpload from '../decorators/allowUpload';
import { HalModuleParser } from 'binary-version-reader';
import csv from 'csv';
import httpVerb from '../decorators/httpVerb';
import nullthrows from 'nullthrows';
import route from '../decorators/route';
import HttpError from '../lib/HttpError';
import formatDeviceAttributesToApi from '../lib/deviceToAPI';

type ProductFirmwareUpload = {
  current: boolean,
  description: string,
  binary: File,
  title: string,
  version: number,
};

class ProductsControllerV2 extends Controller {
  _deviceAttributeRepository: IDeviceAttributeRepository;
  _deviceManager: DeviceManager;
  _organizationRepository: IOrganizationRepository;
  _productConfigRepository: IProductConfigRepository;
  _productDeviceRepository: IProductDeviceRepository;
  _productFirmwareRepository: IProductFirmwareRepository;
  _productRepository: IProductRepository;

  constructor(
    deviceManager: DeviceManager,
    deviceAttributeRepository: IDeviceAttributeRepository,
    organizationRepository: IOrganizationRepository,
    productRepository: IProductRepository,
    productConfigRepository: IProductConfigRepository,
    productDeviceRepository: IProductDeviceRepository,
    productFirmwareRepository: IProductFirmwareRepository,
  ) {
    super();

    this._deviceManager = deviceManager;
    this._deviceAttributeRepository = deviceAttributeRepository;
    this._organizationRepository = organizationRepository;
    this._productConfigRepository = productConfigRepository;
    this._productDeviceRepository = productDeviceRepository;
    this._productFirmwareRepository = productFirmwareRepository;
    this._productRepository = productRepository;
  }

  @httpVerb('get')
  @route('/v2/products/count')
  async countProducts(): Promise<*> {
    const count = await this._productRepository.count();
    return this.ok(count);
  }

  @httpVerb('get')
  @route('/v2/products')
  async getProducts(): Promise<*> {
    const { skip, take } = this.request.query;
    const products = await this._productRepository.getMany(null, {
      skip,
      take,
    });
    return this.ok(products.map(this._formatProduct));
  }

  @httpVerb('post')
  @route('/v2/products')
  async createProduct(productModel: $Shape<Product>): Promise<*> {
    if (!productModel) {
      return this.bad('You must provide a product');
    }

    const missingFields = [
      'description',
      'hardware_version',
      'name',
      'platform_id',
      'type',
    ].filter(key => !productModel[key] && productModel[key] !== 0);
    if (missingFields.length) {
      return this.bad(`Missing fields: ${missingFields.join(', ')}`);
    }

    const organizations = await this._organizationRepository.getByUserID(
      this.user.id,
    );
    if (!organizations.length) {
      return this.bad("You don't have access to any organizations");
    }

    const organizationID = organizations[0].id;
    productModel.organization = organizationID;
    const product = await this._productRepository.create(productModel);
    const config = await this._productConfigRepository.create({
      org_id: organizationID,
      product_id: product.id,
    });
    product.config_id = config.id;
    await this._productRepository.updateByID(product.id, product);

    return this.ok(this._formatProduct(product));
  }

  @httpVerb('get')
  @route('/v2/products/:productIDOrSlug')
  async getProduct(productIDOrSlug: string): Promise<*> {
    const product = await this._productRepository.getByIDOrSlug(
      productIDOrSlug,
    );
    if (!product) {
      return this.bad('Product does not exist', 404);
    }

    return this.ok(this._formatProduct(product));
  }

  @httpVerb('put')
  @route('/v2/products/:productIDOrSlug')
  async updateProduct(
    productIDOrSlug: string,
    productModel: $Shape<Product>,
  ): Promise<*> {
    if (!productModel) {
      return this.bad('You must provide a product');
    }

    const missingFields = [
      'config_id',
      'description',
      'hardware_version',
      'id',
      'name',
      'organization',
      'platform_id',
      'type',
    ].filter(key => !productModel[key] && productModel[key] !== 0);
    if (missingFields.length) {
      return this.bad(`Missing fields: ${missingFields.join(', ')}`);
    }

    let product = await this._productRepository.getByIDOrSlug(productIDOrSlug);
    if (!product) {
      return this.bad(`Product ${productIDOrSlug} doesn't exist`);
    }
    product = await this._productRepository.updateByID(product.id, {
      ...product,
      ...productModel,
    });

    return this.ok(this._formatProduct(product));
  }

  @httpVerb('get')
  @route('/v2/products/:productIDOrSlug/devices/count')
  async countDevices(productIDOrSlug: string): Promise<*> {
    const product = await this._productRepository.getByIDOrSlug(
      productIDOrSlug,
    );

    if (!product) {
      return this.bad(`${productIDOrSlug} does not exist`);
    }

    const count = await this._productDeviceRepository.countByProductID(
      product.product_id,
    );

    return this.ok(count);
  }

  @httpVerb('get')
  @route('/v2/products/:productIDOrSlug/devices')
  async getDevices(productIDOrSlug: string): Promise<*> {
    const { skip, take } = this.request.query;
    const product = await this._productRepository.getByIDOrSlug(
      productIDOrSlug,
    );
    if (!product) {
      return this.bad(`${productIDOrSlug} does not exist`);
    }

    const productDevices = await this._productDeviceRepository.getManyByProductID(
      product.product_id,
      { skip, take },
    );

    const deviceIDs = productDevices.map(
      productDevice => productDevice.deviceID,
    );

    const deviceAttributesList = await this._deviceAttributeRepository.getManyFromIDs(
      deviceIDs,
    );

    const devices = productDevices.map(
      ({ denied, development, deviceID, productID, quarantined }) => {
        const deviceAttributes = deviceAttributesList.find(
          item => deviceID === item.deviceID,
        );
        return {
          ...formatDeviceAttributesToApi(deviceAttributes),
          denied,
          development,
          id: deviceID,
          product_id: product.product_id,
          quarantined,
        };
      },
    );

    return this.ok(devices);
  }

  _formatProduct(product: Product): $Shape<Product> {
    const { product_id, ...output } = product;
    output.id = product_id.toString();
    return output;
  }

  _findAndUnreleaseCurrentFirmware(
    productFirmwareList: Array<ProductFirmware>,
  ): Promise<*> {
    return Promise.all(
      productFirmwareList
        .filter(
          (firmware: ProductFirmware): boolean => firmware.current === true,
        )
        .map(
          (releasedFirmware: ProductFirmware): Promise<ProductFirmware> =>
            this._productFirmwareRepository.updateByID(releasedFirmware.id, {
              ...releasedFirmware,
              current: false,
            }),
        ),
    );
  }

  _stringToBoolean(input: string | boolean): boolean {
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
}

export default ProductsControllerV2;
/* eslint-enable */
