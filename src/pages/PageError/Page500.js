import React from 'react';
import _500img from 'assets/502.png';

function Page500(props) {
  return (
    <div className="ca_main_wrapp ca_main_404 ca_flex ca_align_items_center ca_justify_content_center">
      <div className='ca_text_center'>
        <img src={_500img} alt={2} style={{width: '70%'}}/>
        <h2>Bạn không có quyền truy cập</h2>
        <p>Vui lòng liên hệ quản trị viên để được cấp quyền!</p>
      </div>
    </div>
  );
}

export default Page500;
