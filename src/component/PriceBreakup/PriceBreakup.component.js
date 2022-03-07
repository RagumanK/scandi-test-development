/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { AttributeType } from 'Type/ProductList.type';

import './PriceBreakup.style';

/** @namespace myApp/Component/PriceBreakup/Component */
export class PriceBreakupComponent extends PureComponent {
  static propTypes = {
      // eslint-disable-next-line react/boolean-prop-naming
      areDetailsLoaded: PropTypes.bool.isRequired,
      attributesWithValues: AttributeType.isRequired,
      priceBreakupValues: PropTypes.isRequired
  };

  // eslint-disable-next-line lines-between-class-members
  renderMetalDetails2(data) {
      return data.map((group) => (
        <table>
          <tr>
          <td>{ group.name }</td>
          <td>{ group.rate }</td>
          <td>{ group.weight }</td>
          <td>{ group.value }</td>
          <td>{ group.discount }</td>
          <td>{ group.fval }</td>
          </tr>
        </table>
      ));
  }

  renderPriceDetails(label, value) {
      return (
      <table>
        <tr>
          <td><b>{ label }</b></td>
          <td />
          <td />
          <td>{ value }</td>
          <td />
          <td>{ value }</td>
        </tr>
      </table>
      );
  }

  renderMetalDetails(attribs) {
      return attribs.map((group) => (
          <>
            <td>{ group.name }</td>
            <td>{ group.rate }</td>
            <td>{ group.weight }</td>
            <td>{ group.value }</td>
          </>
      ));
  }

  renderContent2() {
      const { priceBreakupValues } = this.props;

      return (
          <>
          <table>
            <tr>
              <th>Component</th>
              <th>Rate</th>
              <th>Approx Weight</th>
              <th>Value</th>
              <th>Discount</th>
              <th>Final Value</th>
            </tr>
          </table>
          <br />
          { priceBreakupValues.data.metal.values.length > 0 ? (
              <>
              <h3>Metals</h3>
              { this.renderMetalDetails2(priceBreakupValues.data.metal.values) }
              { this.renderPriceDetails('Total Metal Values', priceBreakupValues.data.metal.total_metal_value) }
              </>
          ) : (
              ''
          ) }
          { priceBreakupValues.data.diamond.values.length > 0 ? (
              <>
              <h3>Daimonds</h3>
              { this.renderMetalDetails2(priceBreakupValues.data.diamond.values) }
              { this.renderPriceDetails('Total Daimond Values', priceBreakupValues.data.metal.total_metal_value) }
              </>
          ) : (
              ''
          ) }
          { priceBreakupValues.data.stone.values.length > 0 ? (
              <>
              <h3>Stones</h3>
              { this.renderMetalDetails2(priceBreakupValues.data.stone.values) }
              { this.renderPriceDetails('Total Stone Values', priceBreakupValues.data.metal.total_metal_value) }
              </>
          ) : (
              ''
          ) }
          { this.renderPriceDetails('Making Charge', priceBreakupValues.data.making_charges) }
          { this.renderPriceDetails('Subtotal', priceBreakupValues.data.subtotal) }
          { this.renderPriceDetails('Grand Total', priceBreakupValues.data.grand_total) }

          </>
      );
  }

  renderContent() {
      const { priceBreakupValues } = this.props;
      if (priceBreakupValues.hasMetalValues) {
          return (
          <div block="PriceBreakup">
            <h2>Hello World</h2>
            <table>
              <tr>
                <td>Component</td>
                <td>Rate</td>
                <td>Approx. Weight</td>
                <td>Value</td>
                <td>Final Value</td>
              </tr>
              <tr>
                { this.renderMetalDetails(priceBreakupValues.metalAttributes) }
              </tr>
            </table>
            <h4>
              Total Metal Values:
              { ' ' }
              { priceBreakupValues.totalMetalValue }
            </h4>
            <br />
            <br />

            <table>
              <tr>
                { this.renderMetalDetails(priceBreakupValues.diamondAttributes) }
              </tr>
              <h4>
              Total Daimond Values:
              { ' ' }
              { priceBreakupValues.totalDaimondValue }
              </h4>
            </table>

          </div>
          );
      }

      return (
        <p />
      );
  }

  render() {
      const { areDetailsLoaded } = this.props;
      console.log(this.props);
      // eslint-disable-next-line react/destructuring-assignment
      if (!areDetailsLoaded) {
          return null;
      }

      return this.renderContent2();
  }
}

export default PriceBreakupComponent;
