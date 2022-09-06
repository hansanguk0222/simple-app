import {
  isServerStyletron,
  styletron,
  STYLETRON_CLASSNAME,
  GlobalResetStyle
} from '@simple-app/ui-feature/index';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import { Sheet } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

class CustomDocument extends Document<{
  stylesheets: Sheet[];
}> {
  static async getInitialProps(context: DocumentContext) {
    const renderPage = () =>
      context.renderPage({
        enhanceApp: App => props =>
          (
            <StyletronProvider value={styletron}>
              <App {...props} />
            </StyletronProvider>
          ),
      });

    const initialProps = await Document.getInitialProps({
      ...context,
      renderPage,
    });
    let stylesheets: Sheet[] = [];

    if (isServerStyletron(styletron)) {
      stylesheets = styletron.getStylesheets() || [];
    }

    return { ...initialProps, stylesheets };
  }

  render() {
    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: GlobalResetStyle }} />
          {this.props.stylesheets.map(({ css, attrs }, i) => (
            <style
              className={STYLETRON_CLASSNAME}
              dangerouslySetInnerHTML={{ __html: css }}
              media={attrs.media}
              data-hydrate={attrs['data-hydrate']}
              key={i}
            />
          ))}
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
