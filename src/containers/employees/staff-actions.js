import * as actionTypes from './staff-action-types';
import axios from '../../config/axios';

const fetchStaffSuccess = (staffs) => {
  return {
    type: actionTypes.FETCH_STAFF,
    staffs: staffs
  };
};

export const fetchStaff = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('admin/employee');
      dispatch(fetchStaffSuccess(data.employees));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
};


const deleteStaffSuccess = () => {
  return {
    type: actionTypes.DELETE_STAFF
  }
}

export const deleteStaff = (idStaffDelete) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete('admin/employee/delete/'+idStaffDelete);
      dispatch(deleteStaffSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const updateStaffSuccess = (staffUpdate) => {
  return {
    type: actionTypes.UPDATE_STAFF,
    staffUpdate: staffUpdate
  }
}

export const updateStaff = (staffUpdate) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/admin/employee/update', staffUpdate)
      dispatch(updateStaffSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const addStaffSuccess = (staffAdd) => {
  return {
    type: actionTypes.ADD_STAFF,
    staffAdd: staffAdd
  }
}

export const addStaff = (staffAdd) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('admin/employee/create', staffAdd)
      dispatch(addStaffSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}