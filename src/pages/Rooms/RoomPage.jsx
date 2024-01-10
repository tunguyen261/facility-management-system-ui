import React, { useState, useCallback, useEffect } from 'react';
import Filter from './components/Filter';
import Table from './components/Table';
import { getRoomList } from 'services/room.service';
import { showToast } from 'utils/helpers';

const RoomPage = () => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 15,
  });
  const [dataList, setDataList] = useState({
    data: [],
    page_size: 0,
    page: 0,
    total_pages: 0,
    total_count: 0,
  });

  const [loading, setLoading] = useState(true);
  const { data, page_size, page, total_pages, total_count } = dataList;

  const loadData = useCallback(() => {
    setLoading(true);
    getRoomList(params)
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

export default RoomPage;
