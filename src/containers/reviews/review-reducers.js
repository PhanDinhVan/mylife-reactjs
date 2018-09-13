import * as actionTypes from './review-action-types';
import { updatedObject } from '../../utility';

const initalState = {
    reviews: []
};

const fetchReviews = (state, action) => updatedObject(state, { reviews: action.reviews });

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REVIEWS: return fetchReviews(state, action);
        default: return state;
    }
};

export default reducer;