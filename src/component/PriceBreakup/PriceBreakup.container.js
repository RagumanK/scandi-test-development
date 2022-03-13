/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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

  componentDidMount() {
      // eslint-disable-next-line react/destructuring-assignment
      //   this.restApiCall(this.props.product.id, this.props.product.type_id);
      if (this.props.product.type_id === 'simple') {
          this.getPriceBreakup(true, this.props.product.attributes.sku);
      } else {
          this.getPriceBreakup(false, this.props.product.variants[0].sku);
      }
  }

  componentDidUpdate(prevProps) {
      if (this.props.product.attributes.sku.attribute_value !== prevProps.product.attributes.sku.attribute_value) {
          this.getPriceBreakup(false, this.props.product.attributes.sku.attribute_value);
      }
  }

  __construct(props) {
      super.__construct(props);
      this.state = { dataLoaded: false, isLoad: false, data: {} };
  }

  getPriceBreakup(isSimpleProduct, id) {
      if (isSimpleProduct) {
          this.setState({
              isLoad: true,
              data: this.props.data[0]
          });
      } else {
          this.setState({
              isLoad: true,
              data: this.props.data[0].variants[id]
          });
      }
  }

  containerProps() {
      const { areDetailsLoaded, product } = this.props;
      return {
          areDetailsLoaded,
          attributesWithValues: getAttributesWithValues(product),
          productType: product.type_id,
          priceBreakupValues: this.state.data,
          isLoaded: this.state.isLoad

      };
  }

  render() {
      return <PriceBreakup { ...this.containerProps() } />;
  }
}

export default PriceBreakupContainer;
