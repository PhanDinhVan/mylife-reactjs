import * as actionTypes from './booking-mamager-action-types';
import { updatedObject } from '../../utility';

const initalState = {
    bookingManagers: [],
    userBookings: []
};

const fetchBookingManger = (state, action) => updatedObject(state, { bookingManagers: action.bookingManagers });
const fetchUserBooking = (state, action) => updatedObject(state, { userBookings: action.userBookings });

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOKING_MANAGER: return fetchBookingManger(state, action);
        case actionTypes.FETCH_USER_BOOKING: return fetchUserBooking(state, action);
        default: return state;
    }
};

export default reducer;