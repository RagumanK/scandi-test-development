import ProductAttributeValue from 'Component/ProductAttributeValue';
import {
    ProductConfigurableAttributes as SourceProductConfigurableAttributes
} from 'SourceComponent/ProductConfigurableAttributes/ProductConfigurableAttributes.component';
/** @namespace myApp/Component/ProductConfigurableAttributes/Component */
export class ProductConfigurableAttributesComponent extends SourceProductConfigurableAttributes {
    // TODO implement logic

    renderConfigurableAttributeValue(attribute) {
        const {
            getIsConfigurableAttributeAvailable,
            handleOptionClick,
            getLink,
            isSelected,
            showProductAttributeAsLink,
            inStock
        } = this.props;

        const { attribute_value } = attribute;

        return (
      <ProductAttributeValue
        key={ attribute_value }
        attribute={ attribute }
        isSelected={ isSelected(attribute) }
        isAvailable={ getIsConfigurableAttributeAvailable(attribute) && inStock }
        onClick={ handleOptionClick }
        getLink={ getLink }
        showProductAttributeAsLink={ showProductAttributeAsLink }
      />
        );
    }
}

export default ProductConfigurableAttributesComponent;
