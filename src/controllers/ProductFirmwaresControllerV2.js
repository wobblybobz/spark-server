// @flow

import type DeviceManager from '../managers/DeviceManager';
import type { IProductFirmwareRepository, IProductRepository } from '../types';

import Controller from './Controller';
import httpVerb from '../decorators/httpVerb';
import route from '../decorators/route';

class ProductFirmwaresControllerV2 extends Controller {
  _deviceManager: DeviceManager;
  _productFirmwareRepository: IProductFirmwareRepository;
  _productRepository: IProductRepository;

  constructor(
    deviceManager: DeviceManager,
    productFirmwareRepository: IProductFirmwareRepository,
    productRepository: IProductRepository,
  ) {
    super();

    this._deviceManager = deviceManager;
    this._productFirmwareRepository = productFirmwareRepository;
    this._productRepository = productRepository;
  }

  @httpVerb('get')
  @route('/v2/products/:productIDOrSlug/firmwares/count')
  async countFirmwares(productIDOrSlug: string): Promise<*> {
    const product = await this._productRepository.getByIDOrSlug(
      productIDOrSlug,
    );

    if (!product) {
      return this.bad(`${productIDOrSlug} does not exist`);
    }

    const count = await this._productFirmwareRepository.countByProductID(
      product.product_id,
    );

    return this.ok(count);
  }

  @httpVerb('get')
  @route('/v2/products/:productIDOrSlug/firmwares')
  async getFirmwares(productIDOrSlug: string): Promise<*> {
    const { skip, take } = this.request.query;
    const product = await this._productRepository.getByIDOrSlug(
      productIDOrSlug,
    );
    if (!product) {
      return this.bad('Product does not exist', 404);
    }

    const firmwares = await this._productFirmwareRepository.getManyByProductID(
      product.product_id,
      { skip, take },
    );

    // eslint-disable-next-line no-unused-vars
    return this.ok(firmwares.map(({ data, ...firmware }) => firmware));
  }
}

export default ProductFirmwaresControllerV2;
