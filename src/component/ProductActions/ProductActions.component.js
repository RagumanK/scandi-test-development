import { PRODUCT_TYPE } from 'SourceComponent/Product/Product.config';
import {
    ProductActions as SourceProductActions
} from 'SourceComponent/ProductActions/ProductActions.component';
import TierPrices from 'SourceComponent/TierPrices';

/** @namespace myApp/Component/ProductActions/Component */
export class ProductActionsComponent extends SourceProductActions {
    // TODO implement logic
    renderPrice() {
        const {
            getActiveProduct, inStock, product: { type_id: baseType } = {}, isPricePreview
        } = this.props;
        const { type_id: activeType } = getActiveProduct();

        const notConfigured = baseType === PRODUCT_TYPE.configurable && activeType === baseType;

        return super.renderPrice2(!inStock || notConfigured || isPricePreview);
    }

    renderTierPrices() {
        const { getActiveProduct, customPrice, isPriceSet } = this.props;

        return (
      <div block="ProductActions" elem="TierPrices">
        <TierPrices product={ getActiveProduct() } isPriceSet={ isPriceSet } customPrice={ customPrice } />
      </div>
        );
    }
}

export default ProductActionsComponent;
