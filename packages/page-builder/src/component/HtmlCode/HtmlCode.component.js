import Html from 'SourceComponent/Html';

export class HtmlCode extends React.PureComponent {
  render() {
    const {
      BaseHtmlCode
    } = this.props.elements;

    const html = BaseHtmlCode.childEleBag[0]

    return (
      <BaseHtmlCode.Ele>
        {/* {!!html ? <Html content={html} /> : null} */}
        {!!html && typeof html === "string" ? <Html content={html} /> : html}
      </BaseHtmlCode.Ele>
    );
  }
}

export default HtmlCode
