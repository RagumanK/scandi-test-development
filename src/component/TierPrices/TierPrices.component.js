import {
    TierPrices as SourceTierPrices
} from 'SourceComponent/TierPrices/TierPrices.component';
import { formatPrice, getLowestPriceTiersPrice } from 'SourceUtil/Price';

import './TierPrices.override.style';

/** @namespace myApp/Component/TierPrices/Component */
export class TierPricesComponent extends SourceTierPrices {
    renderDetailedTierPrice({ discount: { percent_off }, final_price: { value, currency }, quantity }) {
        const {
            product: {
                price_range: {
                    minimum_price: {
                        final_price: { value: minPriceForOneUnit }
                    }
                }
            }
        } = this.props;

        // Don't show offers that make no sense
        if (value >= minPriceForOneUnit) {
            return null;
        }
        const formattedPrice = formatPrice(value, currency);

        return (
      <li block="TierPrices" elem="Item" key={ quantity }>
        { __('Buy %s for %s each and ', quantity, formattedPrice) }
        <strong>{ __('save %s%', Math.round(percent_off)) }</strong>
      </li>
        );
    }

    renderLowestTierPrice() {
        const {
            product: {
                price_tiers,
                price_range: {
                    minimum_price: {
                        final_price: { currency }
                    }
                }
            }
        } = this.props;

        const formattedPrice = getLowestPriceTiersPrice(price_tiers, currency);

        return (
      <span block="TierPrices" elem="Item" mods={ { isLowest: true } }>
        { __('As low as ') }
        <span block="TierPrices" elem="ItemPrice">
          { `${formattedPrice}` }
        </span>
      </span>
        );
    }

    renderDetailedTierPriceList() {
        const {
            product: { price_tiers }
        } = this.props;

        return price_tiers.map(this.renderDetailedTierPrice.bind(this));
    }

    renderTierPrice() {
        const { isLowestPrice } = this.props;

        if (isLowestPrice) {
            return this.renderLowestTierPrice();
        }

        return this.renderDetailedTierPriceList();
    }

    render() {
        const {
            product,
            product: { price_tiers = [] }
        } = this.props;

        if (!price_tiers || Object.keys(product).length <= 0 || !price_tiers.length) {
            return null;
        }

        return <div block="TierPrices">{ this.renderTierPrice() }</div>;
    }
}

export default TierPricesComponent;
