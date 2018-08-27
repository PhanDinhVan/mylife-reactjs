import * as actionTypes from './new-action-types';
import { updatedObject } from '../../utility';

const initalState = {
    news: []
};

const fetchNew = (state, action) => updatedObject(state, { news: action.news });

const reducer = (state = initalState, action) => {
  switch (action.type) {
      case actionTypes.FETCH_NEWS: return fetchNew(state, action);
      default: return state;
  }
}

export default reducer;