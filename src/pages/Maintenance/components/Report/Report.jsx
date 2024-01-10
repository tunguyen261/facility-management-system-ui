
import CAAccordion from 'components/shared/CAAccordion';
import FormItem from 'components/shared/CAFormControl/FormItem';
import CAImage from 'components/shared/CAImage';
import React from 'react'

function Report({ disabled, title , reportedUser, reporterdData }) {

  return (
    <CAAccordion title={title}>
    <div className='ca_col_12'>
      <div className='ca_row'>
        </div>
            <div className='ca_image_view_banner'>
              <CAImage src={reporterdData?.uri} />
            </div>
            {reporterdData?.is_reject ? <FormItem className='ca_col_12' label='Lý do bị từ chối trước: ' disabled={true}>
            <div className='ca_row'>
                <input
                    rows={3}
                    className={'form-control ca_col_12'}
                    disabled={true}
                    value={reporterdData?.reject_reason}
                />
            </div>
            </FormItem> : null}
            <FormItem className='ca_col_12' label='Nội dung báo cáo: ' disabled={true}>
            <div className='ca_row'>
                <textarea
                    rows={3}
                    className={'form-control ca_col_12'}
                    disabled={true}
                    value={reporterdData?.content}
                />
            </div>
            </FormItem>
        </div>
        </CAAccordion>
  )
}

export default Report