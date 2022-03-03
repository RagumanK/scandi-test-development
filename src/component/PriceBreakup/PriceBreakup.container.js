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

  containerProps() {
      const { areDetailsLoaded, product } = this.props;

      return {
          areDetailsLoaded,
          attributesWithValues: getAttributesWithValues(product)
      };
  }

  render() {
      return <PriceBreakup { ...this.containerProps() } />;
  }
}

export default PriceBreakupContainer;
