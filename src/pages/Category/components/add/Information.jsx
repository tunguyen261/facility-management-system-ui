import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { getTeamList } from 'pages/Team/services/call-api';

const Information = ({ disabled, title }) => {
    const [teamList, setTeamList] = useState();
    const [params, setParams] = useState({
        is_active: 1,
        page: 1,
        page_size: 25,
      });
    const loadTeamList = useCallback(()=>{
        getTeamList(params)
        .then((res)=>setTeamList(res?.data))
        .catch((err) => {
            showToast.error(err?.message ?? 'Có lỗi xảy ra');
        })
      .finally(() => {

      });
    },[])

    useEffect(loadTeamList,[loadTeamList]);
  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='Tên nhóm trang thiết bị' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='category_name'
              placeholder='Nhập tên nhóm trang thiết bị'
              validation={{
                required: 'Tên nhóm trang thiết bị là bắt buộc',
              }}
            />
          </FormItem>

          <FormItem className='ca_col_4' label='Team quản lý' isRequired disabled={disabled}>
            <FormSelect
             field='team_id'
             list={mapDataOptions4Select(teamList, 'id', 'team_name')}
             validation={{
               required: 'Team quản lý là bắt buộc',
             }}
             disabled={disabled}
            />
          </FormItem>
        </div>
        <div className='ca_row'>
          <FormItem className='ca_col_12' label='Mô tả'>
            <FormTextArea field='description' rows={3} placeholder='Mô tả' disabled={disabled} />
          </FormItem>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
