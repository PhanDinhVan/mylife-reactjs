import * as actionTypes from './auth-action-types';
import { updatedObject } from '../../utility';

const initalState = {
  token: null,
  userData: null,
  expiresIn: null,
  registerData: null
};

const login = (state, action) => updatedObject(state, { token: action.token, userData: action.userData, expiresIn: action.expiresIn });

const logout = (state, action) => updatedObject(state, { token: false, userData: null });

const checkToken = (state, action) => updatedObject(state, { token: action.token, expiresIn: action.expiresIn });

const register = (state, action) => updatedObject(state, { token: action.token, registerData: action.registerData, expiresIn: action.expiresIn });

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN: return login(state, action);
    case actionTypes.AUTH_LOGOUT: return logout(state, action);
    case actionTypes.AUTH_CHECK_TOKEN: return checkToken(state, action);
    case actionTypes.AUTH_REGISTER: return register(state, action);
    default: return state;
  }
};

export default reducer;
