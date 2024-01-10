import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOptionsGlobal } from 'actions/global';
import { capitalizedString, mapDataOptions } from 'utils/helpers';
import isEqual from 'lodash/isEqual';

function useGetOptions(optionName, funcOptions = {}) {
  const dispatch = useDispatch();
  const {
    valueName = 'id',
    labelName = 'name',
    valueAsString = false,
    params = { is_active: 1 },
    checkParams = true,
  } = funcOptions;

  const storedOptions = useSelector((state) => state.global[`${optionName}Data`]);
  const storedParams = useSelector((state) => state.global[`${optionName}Params`]);
  const isFetching = useSelector((state) => state.global[`get${capitalizedString(optionName)}Loading`]);

  useEffect(() => {
    if (isFetching || !checkParams) return
    if (!storedOptions || !isEqual(storedParams, params)) {
      dispatch(getOptionsGlobal(optionName, params));
    }
  }, [params, checkParams, isFetching]);

  const options = useMemo(() => {
    return mapDataOptions(storedOptions, { valueName, labelName, valueAsString });
  }, [storedOptions, valueName, labelName, valueAsString]);

  return options?.length ? options : [];
}


/**
 * this list ref to: api-portal/app/modules/global/utils/constants.js
 */
export const optionType = {
  supplier: 'supplier',
  purchaseRequisition: 'purchaseRequisition',
  store: 'store',
  company: 'company',
  department: 'department',
  purchaseOrder: 'purchaseOrder',
  business: 'business',
  area: 'area',
  taskWorkFlow: 'taskWorkFlow',
  productModel: 'productModel',
  conditionDb: 'conditionDb',
  source: 'source',
  customerType: 'customerType',
  poReviewLevel: 'poReviewLevel',
  user: 'user',
  discountProgram: 'discountProgram',
  poDivisionReviewLevel: 'poDivisionReviewLevel',
  taskType: 'taskType',
  taskTypeAuto: 'taskTypeAuto',
  order: 'order',
  stocksInType: 'stocksInType',
  stocksCompany: 'stocksCompany',
  bank: 'bank',
  province: 'province',
  block: 'block',
  hobbiesForUser: 'hobbiesForUser',
  cluster: 'cluster',
};

export default useGetOptions;
