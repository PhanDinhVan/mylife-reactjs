import * as actionTypes from './promotion-action-types';
import { updatedObject } from '../../utility';

const initalState = {
    promotions: []
};

const fetchPromotion = (state, action) => updatedObject(state, { promotions: action.promotions });

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROMOTION: return fetchPromotion(state, action);
        default: return state;
    }
};

export default reducer;