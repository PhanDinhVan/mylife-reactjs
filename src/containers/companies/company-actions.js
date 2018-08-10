import * as actionTypes from './company-action-types';
import axios from '../../config/axios';

const fetchCompanySuccess = (companies) => {
  return {
    type: actionTypes.FETCH_COMPANY,
    companies: companies
  };
};

export const fetchCompany = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('companies');
      dispatch(fetchCompanySuccess(data.companies));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
