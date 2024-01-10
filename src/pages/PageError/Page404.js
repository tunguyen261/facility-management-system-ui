import React from 'react';
import _404img from 'assets/404.png';

function Page404() {
  return (
  <div className="ca_main_wrapp ca_main_404 ca_flex ca_align_items_center ca_justify_content_center">
    <div className="ca_text_center">
      <img src={_404img} alt={2} />
      <h2>Trang không tìm thấy</h2>
      <p>Vui lòng kiểm tra lại đường dẫn của bạn!</p>
    </div>
  </div>

  );
}

export default Page404;
