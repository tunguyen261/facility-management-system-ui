import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ current, totalPage }) => {
  return (
    <div className='ca_row ca_mt_2 ca_show_table_page'>
      <div className='ca_col_6'>
        <p>
          Show {current}/{totalPage} records
        </p>
      </div>
      <div className='ca_col_6 ca_flex ca_justify_content_right ca_align_items_center'>
        <div className='ca_nav_table'>
          <button className={current === 0 ? 'ca_active' : null}>
            <span className='fi fi-rr-angle-small-left'></span>
          </button>
          <input type='number' value='1' step='1' />
          <span className='ca_all_page'>
            {current} / {totalPage}
          </span>
          <button className={current === totalPage ? 'ca_active' : null}>
            <span className='fi fi-rr-angle-small-right'></span>
          </button>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  current: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
};

Footer.defaultProps = {
  current: 1,
  totalPage: 1,
};

export default Footer;
