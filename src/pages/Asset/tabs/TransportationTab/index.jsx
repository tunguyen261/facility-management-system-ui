import React, { useState, useCallback, useEffect } from 'react';
import Filter from './Filter';
import Table from './Table';
import { showToast } from 'utils/helpers';
import { getRepairationList } from 'pages/Repairation/services/call-api';
import { getAssetRepairation, getAssetReplacement, getAssetTransportation } from 'pages/Asset/services/call-api';
import { useParams } from 'react-router-dom/cjs/react-router-dom';



const ReplaceHistoryTab = () => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 25,
  });
  const [dataList, setDataList] = useState({
    data: [],
    page_size: 0,
    total_count: 0,
    total_pages: 0,
    page: 0,
  });
  const {  id  } = useParams();
  const [loading, setLoading] = useState(true);

  const { data, page, page_size, total_count, total_pages } = dataList;

const loadData = useCallback(() => {
    if(id){
        setLoading(true);
        getAssetTransportation(id)
        .then(setDataList)
        .catch((err) => {
            // showToast.error(err?.message ?? 'Có lỗi xảy ra');
        })
        .finally(() => {
            setLoading(false);
        });
    }
    
}, [params]);
useEffect(loadData, [loadData]);

return (
    <React.Fragment>
    <div className='ca_main_wrapp'>
        <Filter
        onChange={(e) => {
            setParams((prev) => {
            return {
                ...prev,
                ...e,
            };
            });
        }}
        />
        <Table
        id={id}
        loading={loading}
        onChangePage={(page) => {
            setParams({
            ...params,
            page,
            });
        }}
        data={data}
        totalPages={total_pages}
        itemsPerPage={page_size}
        page={page}
        totalItems={total_count}
        onRefresh={loadData}
        />
    </div>
    </React.Fragment>
);
};

export default ReplaceHistoryTab;
