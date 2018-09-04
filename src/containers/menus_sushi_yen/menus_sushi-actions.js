import * as actionTypes from './menus_sushi-actions-type';
import axios from '../../config/axios';

const fetchMenuSushiYenSuccess = (menus_sushi) => {
    return {
        type: actionTypes.FETCH_MENUSUSHI,
        menus_sushi
    };
};

export const fetchMenuSushiYen = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('get-menu');
      dispatch(fetchMenuSushiYenSuccess(data.menus));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}