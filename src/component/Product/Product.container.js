import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    ProductContainer as SourceProductContainer
} from 'SourceComponent/Product/Product.container';
import { getNewParameters, getVariantIndex } from 'Util/Product';

export {
    mapDispatchToProps,
    mapStateToProps
};

/** @namespace myApp/Component/Product/Container */
export class ProductContainer extends SourceProductContainer {
    // TODO implement logic
    containerFunctions = {
        addToCart: this.addToCart.bind(this),

        // Used to update entered and selected state values
        updateSelectedValues: this.updateSelectedValues.bind(this),
        setDownloadableLinks: this.setStateOptions.bind(this, 'downloadableLinks'),
        setQuantity: this.setQuantity.bind(this),
        setAdjustedPrice: this.setAdjustedPrice.bind(this),

        getActiveProduct: this.getActiveProduct.bind(this),
        setActiveProduct: this.updateConfigurableVariant.bind(this),
        setFirstConfig: this.setFirstConfig.bind(this),
        getMagentoProduct: this.getMagentoProduct.bind(this),
        setValidator: this.setValidator.bind(this)
    };

    updateConfigurableVariant(key, value, checkEmptyValue = false) {
        const { parameters: prevParameters } = this.state;

        const newParameters = getNewParameters(prevParameters, key, value);
        const { [key]: oldValue, ...currentParameters } = newParameters;
        const parameters = oldValue === '' && checkEmptyValue ? currentParameters : newParameters;

        this.setState({ parameters });

        const { product: { variants, configurable_options } } = this.props;
        const { selectedProduct } = this.state;

        const newIndex = Object.keys(parameters).length === Object.keys(configurable_options).length
            ? getVariantIndex(variants, parameters)
            // Not all parameters are selected yet, therefore variantIndex must be invalid
            : -1;

        const newProduct = newIndex === -1 ? null : variants[newIndex];

        if (newProduct !== selectedProduct) {
            this.setState({
                selectedProduct: newProduct,
                parameters
            });
        }
    }

    setFirstConfig(arr) {
        const abc = {};
        arr.forEach((item) => {
            abc[item.attribute_code] = item.attribute_value;
        });
        this.setState({ parameters: abc });
        const { product: { variants, configurable_options } } = this.props;
        const { selectedProduct } = this.state;

        const newIndex = Object.keys(arr).length === Object.keys(configurable_options).length
            ? getVariantIndex(variants, arr)
            // Not all parameters are selected yet, therefore variantIndex must be invalid
            : -1;

        const newProduct = newIndex === -1 ? null : variants[newIndex];

        if (newProduct !== selectedProduct) {
            this.setState({
                selectedProduct: newProduct,
                parameters: arr
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
