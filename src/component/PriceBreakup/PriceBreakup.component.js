/* eslint-disable react/no-unused-prop-types */
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { AttributeType } from 'Type/ProductList.type';

import './PriceBreakup.style';

/** @namespace myApp/Component/PriceBreakup/Component */
export class PriceBreakupComponent extends PureComponent {
  static propTypes = {
      // eslint-disable-next-line react/boolean-prop-naming
      areDetailsLoaded: PropTypes.bool.isRequired,
      attributesWithValues: AttributeType.isRequired
  };

  renderContent() {
      console.log(this.props);
      return (
        <div block="PriceBreakup">
          <h2>Hello World</h2>
          <p>{ __('Today, I am brimming with energy and overflowing with joy.') }</p>
          <p>{ __('I live in the moment while learning from the past and preparing for the future.') }</p>
          <p>{ __('Life is beautiful.') }</p>
          { /* TODO: Implement render method */ }
        </div>
      );
  }

  render() {
      return this.renderContent();
  }
}

export default PriceBreakupComponent;
