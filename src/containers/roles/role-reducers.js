import * as actionTypes from './role-action-types';
import { updatedObject } from '../../utility';

const initalState = {
    roles: []
};

const fetchRole = (state, action) => updatedObject(state, { roles: action.roles });

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROLE: return fetchRole(state, action);
        default: return state;
    }
};

export default reducer;