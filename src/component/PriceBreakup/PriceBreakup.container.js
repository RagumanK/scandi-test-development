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
      this.restApiCall(this.props.product.id, this.props.product.type_id);
  }

  componentDidUpdate(prevProps) {
      if (this.props.product.attributes.sku.attribute_value !== prevProps.product.attributes.sku.attribute_value) {
          this.getConfigPriceBreakup(this.props.product.attributes.sku.attribute_value);
      }
  }

  __construct(props) {
      super.__construct(props);
      this.state = { dataLoaded: false, dataLoadedConfig: false, data: {} };
  }

  getConfigPriceBreakup(id) {
      if (this.state.configData) {
          // eslint-disable-next-line react/no-access-state-in-setstate
          const data = [];
          data.push(this.state.configData[0].variants[id]);
          this.setState({
              data,
              dataLoadedConfig: true
          });
      }
  }

  async restApiCall(id, type) {
      try {
          // eslint-disable-next-line quotes
          const response = await fetch(`https://magento.aayke.com/rest/V1/pricebreakup?param[product_id]=${id}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
          });
          const data = await response.json();
          if (type === 'simple') {
              this.setState({
              // eslint-disable-next-line react/no-unused-state
                  dataLoaded: true,
                  data
              });
          }
          if (type === 'configurable') {
              this.setState({
                  // eslint-disable-next-line react/no-unused-state
                  configData: data,
                  dataLoaded: true
              });
          }
      } catch (error) {
          console.log(error);
          this.setState({ dataLoaded: false });
      }

      //   return data;
  }

  containerProps() {
      const { areDetailsLoaded, product } = this.props;
      return {
          areDetailsLoaded,
          attributesWithValues: getAttributesWithValues(product),
          productType: product.type_id,
          // eslint-disable-next-line react/destructuring-assignment
          priceBreakupValues: this.state.data,
          // eslint-disable-next-line react/destructuring-assignment
          load: this.state.dataLoaded,
          // eslint-disable-next-line react/destructuring-assignment
          loadConfig: this.state.dataLoadedConfig

      };
  }

  render() {
      return <PriceBreakup { ...this.containerProps() } />;
  }
}

export default PriceBreakupContainer;
