/* eslint-disable prefer-const */
/* eslint-disable @scandipwa/scandipwa-guidelines/derived-class-names */
import {
    Product as SourceProduct
} from 'SourceComponent/Product/Product.component';
import ProductPrice from 'SourceComponent/ProductPrice';

/** @namespace myApp/Component/Product/Component */
export class Product extends SourceProduct {
    // TODO implement logic
    renderPrice2(isPreview = false) {
        // eslint-disable-next-line fp/no-let
        let { getActiveProduct, productPrice } = this.props;
        if (this.props.customPrice) {
            productPrice = {
                price: {
                    finalPrice: {
                        value: this.props.customPrice,
                        currency: 'INR',
                        valueFormatted: `₹${this.props.customPrice}`
                    },
                    finalPriceExclTax: {
                        value: this.props.customPrice,
                        currency: 'INR',
                        valueFormatted: `₹${this.props.customPrice}`
                    },
                    originalPrice: {
                        value: this.props.customPrice,
                        currency: 'INR',
                        valueFormatted: `₹${this.props.customPrice}`
                    },
                    originalPriceExclTax: {
                        value: this.props.customPrice,
                        currency: 'INR',
                        valueFormatted: `₹${this.props.customPrice}`
                    },
                    discount: {
                        percentOff: 0
                    }
                },
                originalPrice: {
                    minRegularPrice: {
                        currency: 'INR',
                        value: this.props.customPrice,
                        valueFormatted: `₹${this.props.customPrice}`
                    },
                    minFinalPrice: {
                        currency: 'INR',
                        value: this.props.customPrice,
                        valueFormatted: `₹${this.props.customPrice}`
                    },
                    minFinalPriceExclTax: {
                        currency: 'INR',
                        value: this.props.customPrice,
                        valueFormatted: `₹${this.props.customPrice}`
                    },
                    maxRegularPrice: {
                        currency: 'INR',
                        value: this.props.customPrice,
                        valueFormatted: `₹${this.props.customPrice}`
                    },
                    maxFinalPrice: {
                        currency: 'INR',
                        value: this.props.customPrice,
                        valueFormatted: `₹${this.props.customPrice}`
                    },
                    maxFinalPriceExclTax: {
                        currency: 'INR',
                        value: this.props.customPrice,
                        valueFormatted: `₹${this.props.customPrice}`
                    }
                },
                configuration: {
                    containsOptions: false,
                    containsOptionsWithPrice: false,
                    containsRequiredOptions: false,
                    containsRequiredOptionsWithPrice: false
                }
            };
        }
        const product = getActiveProduct();

        const { type_id: type, price_tiers: priceTiers } = product;

        if (!productPrice) {
            return null;
        }

        return (
      <div block={ this.className } elem="PriceWrapper">
        <ProductPrice
          meta
          price={ productPrice }
          priceType={ type }
          tierPrices={ priceTiers }
          isPreview={ isPreview }
          mix={ { block: this.className, elem: 'Price' } }
        />
      </div>
        );
    }
}

export default Product;
