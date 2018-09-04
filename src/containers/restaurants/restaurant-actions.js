import * as actionTypes from './restaurant-action-types';
import axios from '../../config/axios';

const fetchRestaurantSuccess = (restaurants) => {
  return {
    type: actionTypes.FETCH_RESTAURANT,
    restaurants
  };
};

export const fetchRestaurant = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('shop');
      dispatch(fetchRestaurantSuccess(data.shops));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
