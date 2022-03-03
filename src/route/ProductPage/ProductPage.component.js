import { lazy, Suspense } from 'react';

import Loader from 'Component/Loader/Loader.component';
import { PRODUCT_ATTRIBUTES, PRODUCT_INFORMATION, PRODUCT_REVIEWS } from 'Route/ProductPage/ProductPage.config';
import {
    ProductAttributes,
    ProductGallery,
    ProductInformation,
    ProductPage as SourceProductPage,
    ProductReviews
} from 'SourceRoute/ProductPage/ProductPage.component';

import './ProductPage.override.style';

export {
    ProductGallery,
    ProductInformation,
    ProductReviews,
    ProductAttributes
};

export const PriceBreakup = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "price-breakup" */
    'Component/PriceBreakup'
));

/** @namespace myApp/Route/ProductPage/Component */
export class ProductPageComponent extends SourceProductPage {
  // TODO implement logic
  tabMap = {
      [PRODUCT_INFORMATION]: {
          name: __('About'),
          shouldTabRender: () => {
              const { isInformationTabEmpty } = this.props;

              return !isInformationTabEmpty;
          },
          render: (key) => this.renderProductInformationTab(key)
      },
      [PRODUCT_ATTRIBUTES]: {
          name: __('Details'),
          shouldTabRender: () => {
              const { isAttributesTabEmpty } = this.props;

              return !isAttributesTabEmpty;
          },
          render: (key) => this.renderProductAttributesTab(key)
      },
      [PRODUCT_REVIEWS]: {
          name: __('Reviews'),
          // Return true since we always show 'Add review' button
          shouldTabRender: () => true,
          render: (key) => this.renderProductReviewsTab(key)
      },
      PRICE_BREAKUP: {
      // <-- we added a new tab here
          name: __('Price Breakup'),

          shouldTabRender: () => {
              const { isAttributesTabEmpty } = this.props;

              return !isAttributesTabEmpty;
          },
          render: (key) => this.renderPriceBreakupTab(key)
      }
  };

  renderPriceBreakupTab(key) {
      const { activeProduct, areDetailsLoaded } = this.props;

      return (
      <Suspense fallback={ <Loader /> } key={ key }>
        <PriceBreakup product={ activeProduct } areDetailsLoaded={ areDetailsLoaded } key={ key } />
      </Suspense>
      );
  }
}

export default ProductPageComponent;
