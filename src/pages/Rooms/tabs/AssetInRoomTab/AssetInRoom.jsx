import { getAssetInRoom } from 'pages/Rooms/utils/call.api';
import React from 'react';
import AssetTable from './AssetTable';
import { useState } from 'react';
import { useCallback } from 'react';
import { showToast } from 'utils/helpers';
import { useEffect } from 'react';
import Filter from './AssetFilter';

function AssetInRoom({ id }) {
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
    offset: 0,
  });
  const [loading, setLoading] = useState(true);

  const { data, page, page_size, total_count, total_pages } = dataList;

  const loadData = useCallback(() => {
    setLoading(true);
    getAssetInRoom(id, params)
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
      <AssetTable
        loading={loading}
        onChangePage={(page) => {
          setParams({
            ...params,
            page,
          });
        }}
        roomId={id}
        data={data}
        totalPages={total_pages}
        itemsPerPage={page_size}
        page={page}
        totalItems={total_count}
        onRefresh={loadData}
      />
    </div>
  );
}

export default AssetInRoom;
