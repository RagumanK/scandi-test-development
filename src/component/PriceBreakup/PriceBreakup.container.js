/* eslint-disable dot-notation */
/* eslint-disable fp/no-let */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { ProductType } from 'Type/ProductList.type';
import { getAttributesWithValues } from 'Util/Product';

import PriceBreakup from './PriceBreakup.component';

/** @namespace myApp/Component/PriceBreakup/Container */
export class PriceBreakupContainer extends PureComponent {
  static propTypes = {
      product: ProductType.isRequired,
      // eslint-disable-next-line react/boolean-prop-naming
      areDetailsLoaded: PropTypes.bool.isRequired

  };

  async restApiCall(id, sku) {
      const payload = {
          param: {
              product_id: id,
              sku
          }
      };

      console.log(payload);
      const response = await fetch('https://magento.aayke.com/rest/V1/pricebreakup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });
      const data = await response.json();
      return Promise.resolve(data);
  }

  generatePriceBreakupData(product) {
      console.log(product);
      // eslint-disable-next-line prefer-const
      let arr = {};
      //   this.restApiCall(product.id, product.sku).then(
      //       /** @namespace myApp/Component/PriceBreakup/Container/PriceBreakupContainer/generatePriceBreakupData/restApiCall/then */
      //       (value) => {
      //           arr.data = value;
      //       }
      //   );
      arr.data = {
          metal: {
              values: [
                  {
                      name: 'Yellow Gold 18K',
                      rate: '4350',
                      weight: '30.72',
                      value: 133632,
                      discount: 10,
                      fval: 120268.8
                  },
                  {
                      name: 'Yellow Gold 22K',
                      rate: '4420',
                      weight: '8.16',
                      value: 36067.2,
                      discount: 10,
                      fval: 32460.48
                  }
              ],
              total_metal_value: 169699.2
          },
          diamond: {
              values: [
                  {
                      name: 'Yellow Gold 18K',
                      rate: '4350',
                      weight: '30.72',
                      value: 133632,
                      discount: 10,
                      fval: 120268.8
                  },
                  {
                      name: 'Yellow Gold 22K',
                      rate: '4420',
                      weight: '8.16',
                      value: 36067.2,
                      discount: 10,
                      fval: 32460.48
                  }
              ],
              total_metal_value: 169699.2
          },
          stone: {
              values: [
                  {
                      name: 'Yellow Gold 18K',
                      rate: '4350',
                      weight: '30.72',
                      value: 133632,
                      discount: 10,
                      fval: 120268.8
                  },
                  {
                      name: 'Yellow Gold 22K',
                      rate: '4420',
                      weight: '8.16',
                      value: 36067.2,
                      discount: 10,
                      fval: 32460.48
                  }
              ],
              total_metal_value: 169699.2
          },
          making_charges: 1010,
          subtotal: 1010,
          grand_total: 101010,
          type: 'simple',
          name: 'Pride Diamond Necklace'
      };

      const { attributes } = product;
      let metalAttributes = Object.keys(attributes).map((item) => {
          if (/(metal_)\d$/gm.test(item)) {
              return {
                  name: attributes[`metal_${item.split('_')[1]}`]['attribute_value'],
                  weight: attributes[`metal_${item.split('_')[1]}_weight`]['attribute_value'],
                  rate: attributes[`metal_${item.split('_')[1]}_rate`]['attribute_value'],
                  // eslint-disable-next-line max-len
                  value: attributes[`metal_${item.split('_')[1]}_rate`]['attribute_value'] * attributes[`metal_${item.split('_')[1]}_weight`]['attribute_value']
              };
          }

          return null;
      });
      let diamondAttributes = Object.keys(attributes).map((item) => {
          if (/(diamond_)\d(_name)/gm.test(item)) {
              return {
                  name: attributes[`diamond_${item.split('_')[1]}_name`]['attribute_value'],
                  weight: attributes[`diamond_${item.split('_')[1]}_weight`]['attribute_value'],
                  rate: attributes[`diamond_${item.split('_')[1]}_rate`]['attribute_value'],
                  // eslint-disable-next-line max-len
                  value: attributes[`diamond_${item.split('_')[1]}_rate`]['attribute_value'] * attributes[`diamond_${item.split('_')[1]}_weight`]['attribute_value']
              };
          }

          return null;
      });

      metalAttributes = metalAttributes.filter((e) => e != null);
      diamondAttributes = diamondAttributes.filter((e) => e != null);
      //   stoneAttributes = stoneAttributes.filter((e) => e != null);

      if (metalAttributes.length > 0) {
          arr.hasMetalValues = true;
          let totalMetalValue = 0;
          metalAttributes.forEach((item) => {
              totalMetalValue += parseFloat(item.value);
          });
          arr.metalAttributes = metalAttributes;
          arr.totalMetalValue = totalMetalValue;
      }
      if (diamondAttributes.length > 0) {
          arr.hasDaimondlValues = true;
          let totalDaimondValue = 0;
          diamondAttributes.forEach((item) => {
              totalDaimondValue += parseFloat(item.value);
          });
          arr.diamondAttributes = diamondAttributes;
          arr.totalDaimondValue = totalDaimondValue;
      }

      return arr;
  }

  containerProps() {
      const { areDetailsLoaded, product } = this.props;
      return {
          areDetailsLoaded,
          attributesWithValues: getAttributesWithValues(product),
          productType: product.type_id,
          priceBreakupValues: this.generatePriceBreakupData(product)
      };
  }

  render() {
      return <PriceBreakup { ...this.containerProps() } />;
  }
}

export default PriceBreakupContainer;
