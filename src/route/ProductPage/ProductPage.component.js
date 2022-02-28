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

/** @namespace myApp/Route/ProductPage/Component */
export class ProductPageComponent extends SourceProductPage {
  // TODO implement logic
  //   tabMap = {
  //       [PRODUCT_INFORMATION]: {
  //           name: __('About'),
  //           shouldTabRender: () => {
  //               const { isInformationTabEmpty } = this.props;
  //               return isInformationTabEmpty;
  //           },
  //           render: (key) => this.renderProductInformationTab(key)
  //       },
  //       [PRODUCT_ATTRIBUTES]: {
  //           name: __('Details'),
  //           shouldTabRender: () => {
  //               const { isAttributesTabEmpty } = this.props;
  //               return isAttributesTabEmpty;
  //           },
  //           render: (key) => this.renderProductAttributesTab(key)
  //       },
  //       GUARANTEE_TAB: { // <-- we added a new tab here
  //           name: __('Guarantee'),
  //           shouldTabRender: () => false,
  //           render: (key) => this.renderGuarantee(key)
  //       },
  //       [PRODUCT_REVIEWS]: {
  //           name: __('Reviews'),
  //           shouldTabRender: () => false,
  //           render: (key) => this.renderProductReviewsTab(key)
  //       }
  //   };
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
          shouldTabRender: () => true,
          render: (key) => this.renderGuarantee(key)
      }
  };

  // the function responsible for rendering the tab content
  renderGuarantee(key) {
      console.log(key);
      return (
      <section block="ProductPage" elem="Guarantee" key={ key }>
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </table>
      </section>
      );
  }
}

export default ProductPageComponent;
