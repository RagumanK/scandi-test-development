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
      this.restApiCall(this.props.product.id);
  }

  componentDidUpdate(prevProps) {
      // eslint-disable-next-line react/destructuring-assignment
      console.log(this.props.product, prevProps.product);
  }

  __construct(props) {
      super.__construct(props);
      this.state = { dataLoaded: false, data: {} };
  }

  async restApiCall(id) {
      try {
          // eslint-disable-next-line quotes
          const response = await fetch(`https://magento.aayke.com/rest/V1/pricebreakup?param[product_id]=${id}`, {
          // eslint-disable-next-line quotes
          // const response = await fetch(`https://catfact.ninja/fact`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
          });
          const data = await response.json();
          this.setState({
          // eslint-disable-next-line react/no-unused-state
              dataLoaded: true,
              data
          });
      } catch (error) {
          console.log(error);
          this.setState({ dataLoaded: false });
      }

      //   return data;
  }

  //   generatePriceBreakupData(product) {
  //       // eslint-disable-next-line prefer-const
  //       let arr = {};
  //       this.restApiCall(product.id).then(
  //           /** @namespace myApp/Component/PriceBreakup/Container/PriceBreakupContainer/generatePriceBreakupData/restApiCall/then */
  //           (value) => {
  //               arr.data = value;
  //               return arr;
  //           }
  //       );
  //   }

  //   generatePriceBreakupData2(product) {
  //       // eslint-disable-next-line prefer-const
  //       let arr = {};
  //       arr.data = this.restApiCall(product.id);
  //       return arr;
  //   }

  containerProps() {
      const { areDetailsLoaded, product } = this.props;
      return {
          areDetailsLoaded,
          attributesWithValues: getAttributesWithValues(product),
          productType: product.type_id,
          // eslint-disable-next-line react/destructuring-assignment
          priceBreakupValues: this.state.data,
          // eslint-disable-next-line react/destructuring-assignment
          load: this.state.dataLoaded
      };
  }

  render() {
      return <PriceBreakup { ...this.containerProps() } />;
  }
}

export default PriceBreakupContainer;
