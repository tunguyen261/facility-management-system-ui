import React from 'react';
import { Image } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import defaultImage from 'assets/ca_image/default_img.png';

const ImageStyled = styled(Image)`
  :where(.css-dev-only-do-not-override-12upa3x).ant-image .ant-image-mask:hover {
    opacity: 1 !important;
  }
`;

function CAImage({ src, fallbackSrc, className, alt, ...props }) {
  if (Array.isArray(src)) {
    return (
      <Image.PreviewGroup visible={true} items={src} {...props}>
        <ImageStyled src={src[0]} fallback={fallbackSrc} alt={alt} className={className} />
      </Image.PreviewGroup>
    );
  }
  return <Image src={src} fallback={fallbackSrc} alt={alt} className={className} {...props} />;
}

CAImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fallbackSrc: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
};

CAImage.defaultProps = {
  src: null,
  fallbackSrc: defaultImage,
  className: '',
  alt: '',
};
export default CAImage;
