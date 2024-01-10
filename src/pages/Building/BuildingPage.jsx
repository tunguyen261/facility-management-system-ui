import React, { useState, useCallback, useEffect } from 'react';
import Filter from './components/BuildingFilter';
import Table from './components/BuildingTable';
import { getBuildingList } from 'services/building.service';
import { showToast } from 'utils/helpers';

const BuildingPage = () => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 25,
  });
  const [dataList, setDataList] = useState({
    data: [],
    total_count: 0,
    total_pages: 0,
    page_size: 50,
    offset: 0,
  });
  const [loading, setLoading] = useState(true);

  const { data, page, page_size, total_count, total_pages } = dataList;

  const loadData = useCallback(() => {
    setLoading(true);
    getBuildingList(params)
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
          itemsPerPage={total_count}
          page={page}
          totalItems={page_size}
          onRefresh={loadData}
        />
      </div>
    </React.Fragment>
  );
};

export default BuildingPage;
