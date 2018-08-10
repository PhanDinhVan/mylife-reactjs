import * as actionTypes from './user-action-types';
import { updatedObject } from '../../utility';

const initalState = {
  users: []
};

const fetchUser = (state, action) => updatedObject(state, { users: action.users });

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER: return fetchUser(state, action);
    default: return state;
  }
};

export default reducer;
