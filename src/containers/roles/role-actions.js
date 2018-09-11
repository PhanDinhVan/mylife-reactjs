import * as actionTypes from './role-action-types';
import axios from '../../config/axios';

const fetchRoleSuccess = (roles) => {
  return {
    type: actionTypes.FETCH_ROLE,
    roles: roles
  };
};

export const fetchRole = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('roles');
      dispatch(fetchRoleSuccess(data.data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

const addRoleSuccess = (roleAdd) => {
  return {
    type: actionTypes.ADD_ROLE,
    roleAdd: roleAdd
  }
}

export const addRole = (roleAdd) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('roles', roleAdd)
      dispatch(addRoleSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}


const deleteRoleSuccess = () => {
  return {
    type: actionTypes.DELETE_ROLE
  }
}

export const deleteRole = (idRoleDelete) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete('roles/delete/'+idRoleDelete);
      dispatch(deleteRoleSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const updateRoleSuccess = (roleUpdate) => {
  return {
    type: actionTypes.UPDATE_ROLE,
    roleUpdate: roleUpdate
  }
}

export const updateRole = (roleUpdate) => {
  let id = roleUpdate.id;
  return async dispatch => {
    try {
      const { data } = await axios.patch('roles/'+id, roleUpdate)
      dispatch(updateRoleSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

