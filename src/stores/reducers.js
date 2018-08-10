import { combineReducers } from 'redux';
import { userReducers } from '../containers/users';
import { authReducers } from '../containers/auth';
import { companyReducers } from '../containers/companies';
import { restaurantReducers } from '../containers/restaurants';
import { bookingReducers } from '../containers/booking';
import { promotionReducers } from '../containers/promotion';

const reducers = combineReducers({
  restaurantState: restaurantReducers,
  authState: authReducers,
  userState: userReducers,
  companyState: companyReducers,
  bookingState: bookingReducers,
  promotionState: promotionReducers
});

export default reducers;