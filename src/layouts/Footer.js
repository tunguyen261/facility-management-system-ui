import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <div className='globalFooter'>
      Copyright © {new Date().getFullYear()}{' '}
      <a href='#' target={'_blank'} rel='noreferrer'>
        Dona Nguyen
      </a>
    </div>
  </Footer>
);
export default FooterView;
