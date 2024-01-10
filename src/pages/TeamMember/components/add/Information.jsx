import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { getListUser } from 'pages/Users/services/call-api';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { getTeamList } from 'pages/Team/services/call-api';

const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 9999,
  });
  const [memberList, setMemberList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  const loadMember = useCallback(()=>{
    getListUser(params)
    .then((res)=> setMemberList(res?.data))
    .catch(err=>showToast(err.message || 'Có lỗi xảy ra'))
  },[params])
  const loadTeam = useCallback(()=>{
    getTeamList(params)
    .then((res)=> setTeamList(res?.data))
    .catch(err=>showToast(err.message || 'Có lỗi xảy ra'))
  },[params])

  useEffect(loadMember,[loadMember]);
  useEffect(loadTeam,[loadTeam]);
  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
        <FormItem className='ca_col_6' label='Team' isRequired disabled={disabled}>
            <FormSelect
              field='team_id'
              list={mapDataOptions4Select(teamList, 'id', 'team_name')}
              validation={{
                required: 'Team là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_6' label='Nhân sự' isRequired disabled={disabled}>
            <FormSelect
              field='member_id'
              list={mapDataOptions4Select(memberList, 'id', 'fullname')}
              validation={{
                required: 'Nhân sự là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
        </div>
        <div className='ca_row'>
        <div className='ca_col_12'>
          <div className='ca_frm_box'>
            <div className='ca_flex ca_align_items_center ca_lb_sex'>
                <label className='ca_checkbox'>
                  <FormInput disabled={disabled} type='checkbox' field='is_lead' />
                  <span />
                  Leader
                </label>
            </div>
          </div>
          </div>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
