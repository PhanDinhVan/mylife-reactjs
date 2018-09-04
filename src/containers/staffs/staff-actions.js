import * as actionTypes from './user-action-types';
import axios from '../../config/axios';

const fetchUserSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USER,
    users: users
  };
};

export const fetchUser = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('admin/users');
      dispatch(fetchUserSuccess(data.users));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

const deleteUserSuccess = () => {
  return {
    type: actionTypes.DELETE_USER
  }
}

export const deleteUser = (idUserDelete) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete('admin/delete/'+idUserDelete);
      dispatch(deleteUserSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const updateUserSuccess = (userUpdate) => {
  return {
    type: actionTypes.UPDATE_USER,
    userUpdate: userUpdate
  }
}

export const updateUser = (userUpdate) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('admin/update', userUpdate)
      dispatch(updateUserSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const addUserSuccess = (userAdd) => {
  return {
    type: actionTypes.ADD_USER,
    userAdd: userAdd
  }
}

export const addUser = (userAdd) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('admin/create', userAdd)
      dispatch(addUserSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
