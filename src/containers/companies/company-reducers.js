import * as actionTypes from './company-action-types';
import { updatedObject } from '../../utility';

const initalState = {
  companies: []
};

const fetchUser = (state, action) => updatedObject(state, { companies: action.companies });

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMPANY: return fetchUser(state, action);
    default: return state;
  }
};

export default reducer;
