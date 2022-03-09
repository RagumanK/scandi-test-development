/* eslint-disable no-unreachable */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader/Loader.component';
import { AttributeType } from 'Type/ProductList.type';

import './PriceBreakup.style';

/** @namespace myApp/Component/PriceBreakup/Component */
export class PriceBreakupComponent extends PureComponent {
  static propTypes = {
      // eslint-disable-next-line react/boolean-prop-naming
      areDetailsLoaded: PropTypes.bool.isRequired,
      attributesWithValues: AttributeType.isRequired,
      priceBreakupValues: PropTypes.isRequired,
      load: PropTypes.isRequired,
      loadConfig: PropTypes.isRequired,
      productType: PropTypes.isRequired
  };

  // eslint-disable-next-line lines-between-class-members
  renderDetails(data) {
      console.log('dataaa', data);
      return data.map((group) => (
      <tr>
        <td>{ group.name }</td>
        <td>{ group.rate }</td>
        <td>{ group.weight }</td>
        <td>{ group.value }</td>
        <td>{ group.discount }</td>
        <td>{ group.fval }</td>
      </tr>
      ));
  }

  renderDetailsBold(data) {
      return data.map((group) => (
      <tr>
        <td>
          <b>{ group.name }</b>
        </td>
        <td>{ group.rate }</td>
        <td>{ group.weight }</td>
        <td>{ group.value }</td>
        <td>{ group.discount }</td>
        <td>{ group.fval }</td>
      </tr>
      ));
  }

  renderPriceDetails(label, value) {
      return (
      <tr>
        <td>
          <b>{ label }</b>
        </td>
        <td />
        <td />
        <td>{ value }</td>
        <td />
        <td>{ value }</td>
      </tr>
      );
  }

  renderContent() {
      // eslint-disable-next-line react/destructuring-assignment
      console.log(this.props, '3');
      // eslint-disable-next-line react/destructuring-assignment
      const priceBreakupValues = this.props.priceBreakupValues[0];
      // eslint-disable-next-line react/destructuring-assignment
      return (
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Rate</th>
            <th>Approx Weight</th>
            <th>Value</th>
            <th>Discount</th>
            <th>Final Value</th>
          </tr>
        </thead>
        <tbody>
          { priceBreakupValues.metal.values.length > 0 ? (
              <>
              <tr>
                <td>
                  <b>Metals</b>
                </td>
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
              { this.renderDetails(priceBreakupValues.metal.values) }
              { this.renderPriceDetails('Total Metal Values', priceBreakupValues.metal.total_metal_value) }
              </>
          ) : (
              ''
          ) }
          { priceBreakupValues.diamond.values.length > 0 ? (
              <>
              <tr>
                <td>
                  <b>Diamonds</b>
                </td>
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
              { this.renderDetails(priceBreakupValues.diamond.values) }
              { this.renderPriceDetails('Total Daimond Values', priceBreakupValues.diamond.total_dia_value) }
              </>
          ) : (
              ''
          ) }
          { priceBreakupValues.stone.values.length > 0 ? (
              <>
              <tr>
                <td>
                  <b>Stones</b>
                </td>
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
              { this.renderDetails(priceBreakupValues.stone.values) }
              { this.renderPriceDetails('Total Stone Values', priceBreakupValues.stone.total_stone_value) }
              </>
          ) : (
              ''
          ) }
          { this.renderDetailsBold(priceBreakupValues.making_charges.values) }
          { this.renderDetailsBold(priceBreakupValues.subtotal.values) }
          { this.renderDetailsBold(priceBreakupValues.grand_total.values) }
        </tbody>
      </table>
      );
  }

  renderContent2() {
      return <h4>Please Select Config</h4>;
  }

  render() {
      const { load, loadConfig } = this.props;
      // eslint-disable-next-line react/destructuring-assignment
      if (!load) {
          return <Loader isLoading={ !load } />;
      }
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props.productType === 'simple' && load) {
          return this.renderContent();
      }
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props.productType === 'configurable' && loadConfig) {
          return this.renderContent();
      }

      // return this.renderContent();
      return this.renderContent2();
  }
}

export default PriceBreakupComponent;
