import { connect } from 'react-redux';

import {
    mapDispatchToProps
} from 'Component/Product/Product.container';
import {
    mapStateToProps as sourceMapStateToProps,
    ProductActionsContainer as SourceProductActionsContainer
} from 'SourceComponent/ProductActions/ProductActions.container';

import ProductActions from './ProductActions.component';
/** @namespace myApp/Component/ProductActions/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state)
    // TODO extend mapStateToProps
});

/** @namespace myApp/Component/ProductActions/Container */
export class ProductActionsContainer extends SourceProductActionsContainer {
    // TODO implement logic
    componentDidMount() {
        if (this.props.product.type_id === 'simple') {
            this.setCalculatedPrice(true, this.props.product.attributes.sku);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);

        const { selectedProduct: prevSelectedProduct } = prevState;
        const { selectedProduct } = this.state;
        const { setActiveProduct } = this.props;

        // Updates ProductPages active product state, to
        // match selected product variant
        if (selectedProduct !== prevSelectedProduct) {
            setActiveProduct(selectedProduct);
            if (selectedProduct) {
                this.setCalculatedPrice(false, selectedProduct.sku);
            }
        }
    }

    setCalculatedPrice(isSimpleProduct, id) {
        if (isSimpleProduct) {
            this.setState({
                isPriceSet: true,
                customPrice: this.props.data[0].grand_total.values[0].value
            });
        } else {
            this.setState({
                isPriceSet: true,
                customPrice: this.props.data[0].variants[id].grand_total.values[0].value
            });
        }
    }

    render() {
        // eslint-disable-next-line max-len
        return <ProductActions { ...this.containerProps() } { ...this.containerFunctions } customPrice={ this.state.customPrice } isPriceSet={ this.state.isPriceSet } />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);
