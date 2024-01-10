import React, { useState, useCallback, useEffect } from 'react';
import Filter from './components/Filter';
import Table from './components/Table';
import { exportExcel, getAssetList } from './services/call-api';
import { showToast } from 'utils/helpers';
import ImportExcel from './components/modal/ImportExcel';
import ImportError from './components/modal/ImportError';
import moment from 'moment';
const AssetPage = () => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 15,
  });
  const [dataList, setDataList] = useState({
    data: [],
    page_size: 0,
    total_count: 0,
    total_pages: 0,
    page: 0,
  });
  const [loading, setLoading] = useState(true);
  const [loadingExport, setLoadingExport] = useState(false);
  const { data, page, page_size, total_count, total_pages } = dataList;

  const [openModalImport, setOpenModalImport] = useState(null);
  const [openModalErrorImport, setOpenModalErrorImport] = useState(false);
  const [errorImport, setErrorImport] = useState(null);

  const loadData = useCallback(() => {
    setLoading(true);
    getAssetList(params)
      .then(setDataList)
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadData, [loadData]);

  const handleCloseModalImport = (isReload = false) => {
    setOpenModalImport(false);
    if (isReload) loadData();
  };
  const handleSetErrorImport = (errorsImport) => {
    setErrorImport(errorsImport);
    setOpenModalImport(false);
    setOpenModalErrorImport(true);
  };
  const handleExportExcel = () => {
    setLoadingExport(true);
    exportExcel(params)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response?.data]));
        const link = document.createElement('a');
        link.href = url;
        const createdDate = moment().format('DDMMYYYY');
        link.setAttribute('download', `DS_Trang_thiet_bi${createdDate}.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => showToast.error(error.message ?? 'Lỗi tải tập tin.'))
      .finally(() => setLoadingExport(false));
  };
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
          exportExcel={handleExportExcel}
          data={data}
          totalPages={total_pages}
          itemsPerPage={page_size}
          page={page}
          totalItems={total_count}
          onRefresh={loadData}
          importExcel={() => setOpenModalImport(true)}
        />
      </div>
      {openModalImport && <ImportExcel onClose={handleCloseModalImport} handleSetErrorImport={handleSetErrorImport} />}
      {openModalErrorImport && <ImportError errors={errorImport} onClose={() => setOpenModalErrorImport(false)} />}
    </React.Fragment>
  );
};

export default AssetPage;
