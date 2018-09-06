import * as actionTypes from './booking-mamager-action-types';
import { updatedObject } from '../../utility';

const initalState = {
    bookingManagers: []
};

const fetchBookingManger = (state, action) => updatedObject(state, { bookingManagers: action.bookingManagers });

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOKING_MANAGER: return fetchBookingManger(state, action);
        default: return state;
    }
};

export default reducer;