import * as actionTypes from './review-bmanager-action-types';
import { updatedObject } from '../../utility';

const initalState = {
    reviewBManager: []
};

const fetchReviewBManager = (state, action) => updatedObject(state, { reviewBManager: action.reviewBManager });

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REVIEW_BMANAGERS: return fetchReviewBManager(state, action);
        default: return state;
    }
};

export default reducer;