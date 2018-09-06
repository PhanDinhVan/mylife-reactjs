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