import React, { useState, useCallback, useEffect } from 'react';
import Filter from './components/Filter';
import Table from './components/Table';
import { getAssetTypeList } from './services/call-api';
import { showToast } from 'utils/helpers';

const AssetPage = () => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 25,
  });
  const [dataList, setDataList] = useState({
    data: [],
    items_per_page: 0,
    total_count: 0,
    total_pages: 0,
    page_size: 50,
    page: 0,
  });
  const [loading, setLoading] = useState(true);

  const { data, page, page_size, total_count, total_pages } = dataList;

const loadData = useCallback(() => {
    setLoading(true);
    getAssetTypeList(params)
    .then(setDataList)
    .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
    })
    .finally(() => {
        setLoading(false);
    });
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

export default AssetPage;
