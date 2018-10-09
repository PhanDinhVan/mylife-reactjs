import * as actionTypes from './booking-mamager-action-types';
import axios from '../../config/axios';

const fetchBookingManagerSuccess = (bookingManagers) => {
    return {
        type: actionTypes.FETCH_BOOKING_MANAGER,
        bookingManagers: bookingManagers
    };
};

export const fetchBookingManger = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('booking_manager');
            dispatch(fetchBookingManagerSuccess(data.booking_manager));
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}


const fetchUserBookingSuccess = (userBookings) => {
    return {
        type: actionTypes.FETCH_USER_BOOKING,
        userBookings: userBookings
    };
};

export const fetchUserBooking = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('user_booking');
            dispatch(fetchUserBookingSuccess(data.user_booking));
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}


const addBookingManagerSuccess = (userBooking) => {
    return {
      type: actionTypes.ADD_BOOKING_MANAGER,
      userBooking: userBooking
    }
  }
  
  export const addBookingManager = (userBooking) => {
    return async dispatch => {
      try {
        const { data } = await axios.post('booking_manager', userBooking);
        console.log("success"+data)
        dispatch(addBookingManagerSuccess(data));
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }

  const updateBookingManagerSuccess = (updateBookingM) => {
    return {
      type: actionTypes.UPDATE_BOOKING_MANAGER,
      updateBookingM: updateBookingM
    }
  }
  
  export const updateBookingManager = (updateBookingM) => {
    let id = updateBookingM.userId;
    return async dispatch => {
      try {
        const { data } = await axios.patch('booking_manager/'+id, updateBookingM);
        console.log("success"+data)
        dispatch(updateBookingManagerSuccess(data));
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }

  const deleteBookingManagerSuccess = () => {
    return {
      type: actionTypes.DELETE_BOOKING_MANAGER
    }
  }
  
  export const deleteBookingManager = (idDelete) => {
    return async dispatch => {
      try {
        const { data } = await axios.delete('booking_manager/delete/'+idDelete);
        dispatch(deleteBookingManagerSuccess(data));
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
  
  

