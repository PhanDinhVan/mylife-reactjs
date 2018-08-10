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