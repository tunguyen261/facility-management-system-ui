import React from 'react';
import CAButton from 'components/shared/CAButton';

const Header = () => {
  return (
    <div className='ca_row ca_mb_2 ca_align_items_center'>
      <div className='ca_col_6'>
        <div className='ca_show_record'></div>
      </div>
      <div className='ca_col_6 ca_flex ca_justify_content_right ca_align_items_center'>
        <CAButton outline content='Thêm mới ca' type='danger' />
      </div>
    </div>
  );
};

export default Header;
