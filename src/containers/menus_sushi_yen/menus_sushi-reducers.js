import * as actionTypes from './menus_sushi-actions-type';
import { updatedObject } from '../../utility';

const initalState = {
    menus_sushi: []
};

const  fetchMenuSushi = (state, action) => updatedObject(state, {menus_sushi: action.menus_sushi});

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MENUSUSHI: return fetchMenuSushi(state, action);
        default: return state;
    }
}

export default reducer;