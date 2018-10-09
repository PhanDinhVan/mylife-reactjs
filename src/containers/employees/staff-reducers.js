import * as actionTypes from './staff-action-types';
import { updatedObject } from '../../utility';

const initalState = {
  staffs: []
};

const fetchStaff = (state, action) => updatedObject(state, { staffs: action.staffs });

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STAFF: return fetchStaff(state, action);
    default: return state;
  }
};

export default reducer;