import {
    ProductConfigurableAttributesContainer as SourceProductConfigurableAttributesContainer
} from 'SourceComponent/ProductConfigurableAttributes/ProductConfigurableAttributes.container';

/** @namespace myApp/Component/ProductConfigurableAttributes/Container */
export class ProductConfigurableAttributesContainer extends SourceProductConfigurableAttributesContainer {
    // TODO implement logic
    handleOptionClickCustom(arr) {
        if (arr.length > 0) {
            const { setFirstConfig } = this.props;
            setFirstConfig(arr);
        }
    }

    componentDidMount() {
        if (this.props.configurable_options) {
            const arr = Object.keys(this.props.configurable_options).map((item) => {
                if (this.props.configurable_options[item].attribute_values[0]) {
                    const obj = {
                        attribute_code: item,
                        attribute_value: this.props.configurable_options[item].attribute_values[0]
                    };

                    return obj;
                }

                return null;
            });

            this.handleOptionClickCustom(arr);
        }
    }
}

export default ProductConfigurableAttributesContainer;
