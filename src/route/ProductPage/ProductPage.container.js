import Loader from '@scandipwa/scandipwa/src/component/Loader/Loader.component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { LOADING_TIME } from 'SourceRoute/CategoryPage/CategoryPage.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    ProductPageContainer as SourceProductPageContainer
} from 'SourceRoute/ProductPage/ProductPage.container';
import ProductReducer from 'SourceStore/Product/Product.reducer';
import { scrollToTop } from 'SourceUtil/Browser';
import { debounce } from 'SourceUtil/Request';
import { withReducers } from 'Util/DynamicReducer';

import ProductPage from './ProductPage.component';

/** @namespace myApp/Route/ProductPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state)
    // TODO extend mapStateToProps
});

/** @namespace myApp/Route/ProductPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
    // TODO extend mapDispatchToProps
});

/** @namespace myApp/Route/ProductPage/Container */
export class ProductPageContainer extends SourceProductPageContainer {
    componentDidMount() {
        this.restApiCall(this.props.productID);
        /**
     * Always make sure the navigation switches into the MENU tab
     * */
        this.updateNavigationState();

        /**
     * Ensure transition PDP => homepage => PDP always having proper meta
     */
        this.updateMeta();

        /**
     * Make sure to update header state, the data-source will
     * define the correct information to use for update
     * (it can be a product, history state product or an empty object).
     */
        this.updateHeaderState();
        this.updateBreadcrumbs();

        /**
     * Scroll page top in order to display it from the start
     */
        scrollToTop();
    }

    componentDidUpdate(prevProps) {
        const {
            isOffline,
            productSKU,
            product: { sku }
        } = this.props;

        const {
            productSKU: prevProductSKU,
            product: { sku: prevSku }
        } = prevProps;

        const { sku: stateSKU } = history?.state?.state?.product || {};

        if (isOffline) {
            debounce(this.setOfflineNoticeSize, LOADING_TIME)();
        }

        /**
     * We should also update product based data if, the URL
     * rewrite SKU has changed to matching the product history SKU
     * one. At this point there could be sufficient data for
     * some updates (i.e. header state).
     */
        if (productSKU !== prevProductSKU && stateSKU === productSKU) {
            this.updateHeaderState();
        }

        /**
     * If the currently loaded category ID does not match the ID of
     * category ID from URL rewrite, request category.
     */
        if (productSKU !== sku) {
            this.requestProduct();
        }

        /**
     * If product ID was changed => it is loaded => we need to
     * update product specific information, i.e. breadcrumbs.
     */
        if (sku !== prevSku) {
            this.updateBreadcrumbs();
            this.updateHeaderState();
            this.updateMeta();
        }

        this._addToRecentlyViewedProducts();
    }

    async restApiCall(id) {
        try {
            // eslint-disable-next-line quotes
            const response = await fetch(`https://magento.aayke.com/rest/V1/pricebreakup?param[product_id]=${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            this.setState({
                // eslint-disable-next-line react/no-unused-state
                dataLoaded: true,
                data
            });
        } catch (error) {
            console.log(error);
            this.setState({ dataLoaded: false });
        }

    //   return data;
    }

    render() {
        if (!this.state.dataLoaded) {
            return <Loader />;
        }

        // eslint-disable-next-line max-len
        return <ProductPage { ...this.containerFunctions } { ...this.containerProps() } data={ this.state.data } />;
    }
}

export default withReducers({
    ProductReducer
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPageContainer)));
