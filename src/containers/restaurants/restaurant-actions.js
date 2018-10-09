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

const fetchRestaurantBookingSuccess = (restaurantBooking) => {
  return {
    type: actionTypes.FETCH_RESTAURANT_BOOKING,
    restaurantBooking
  };
};

export const fetchRestaurantBooking = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('shopBooking');
      dispatch(fetchRestaurantBookingSuccess(data.userbookings));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
