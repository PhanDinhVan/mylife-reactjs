import * as actionTypes from './booking-action-types';
import axios from '../../config/axios';

const fetchBookingSuccess = (bookings) => {
    return {
        type: actionTypes.FETCH_BOOKING,
        bookings: bookings
    };
};

export const fetchBooking = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('booking');
            dispatch(fetchBookingSuccess(data.booking));
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

const updateStatusSuccess = (statusUpdate) => {
  return {
    type: actionTypes.UPDATE_STATUS,
    statusUpdate: statusUpdate
  }
}

export const updateStatus = (statusUpdate) => {
  console.log(statusUpdate)
  let id = statusUpdate.id;
  return async dispatch => {
    try {
      const { data } = await axios.patch('booking/'+id, statusUpdate);
      dispatch(updateStatusSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const addBookingSuccess = (bookingAdd) => {
  return {
    type: actionTypes.ADD_BOOKING,
    bookingAdd: bookingAdd
  }
}

export const addBooking = (bookingAdd) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('booking', bookingAdd);
      dispatch(addBookingSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const deleteBookingSuccess = () => {
  return {
    type: actionTypes.DELETE_BOOKING
  }
}

export const deleteBooking = (idBookingDelete) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete('booking/delete/'+idBookingDelete);
      dispatch(deleteBookingSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}