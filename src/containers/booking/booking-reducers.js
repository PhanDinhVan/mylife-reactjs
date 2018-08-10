import * as actionTypes from './booking-action-types';
import { updatedObject } from '../../utility';

const initalState = {
    bookings: []
};

const fetchBooking = (state, action) => updatedObject(state, { bookings: action.bookings });

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOKING: return fetchBooking(state, action);
        default: return state;
    }
};

export default reducer;