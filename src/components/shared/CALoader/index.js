import React from 'react';
import PropTypes from 'prop-types';
//import 'assets/ca_css/uicons-regular-rounded.scss'
// /import './style.scss';

function CALoader({ isPage }) {
  return (
    <div className={`ca_loader ${isPage ? 'page' : 'content'}`}>
      <div className='warpper'>
        <div className='inner' />
        <div className='text'>LOADING</div>
      </div>
    </div>
  );
}
CALoader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool,
};
export default CALoader;
