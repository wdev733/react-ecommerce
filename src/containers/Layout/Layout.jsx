import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import FooterWithCopyright from '../../components/FooterWithCopyright/FooterWithCopyright';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>{this.props.children}</main>
        <FooterWithCopyright />
      </div>
    );
  }
}

export default Layout;
