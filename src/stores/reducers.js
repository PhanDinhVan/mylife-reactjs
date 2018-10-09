import { combineReducers } from 'redux';
import { userReducers } from '../containers/users';
import { authReducers } from '../containers/auth';
import { companyReducers } from '../containers/companies';
import { restaurantReducers } from '../containers/restaurants';
import { bookingReducers } from '../containers/booking';
import { promotionReducers } from '../containers/promotion';
import { menuSuShiReducers } from '../containers/menus_sushi_yen';
import { newReducers } from '../containers/news';
import { roleReducers }from '../containers/roles';
import { staffReducers } from '../containers/employees';
import { bookingManagerReducers } from '../containers/booking_manager';
import { reviewReducers } from '../containers/reviews';
import { reviewBManagerReducers } from '../containers/review_booking_manager';

const reducers = combineReducers({
  restaurantState: restaurantReducers,
  authState: authReducers,
  userState: userReducers,
  companyState: companyReducers,
  bookingState: bookingReducers,
  promotionState: promotionReducers,
  menusushiState: menuSuShiReducers,
  newState: newReducers,
  roleState: roleReducers,
  staffState: staffReducers,
  bookingMangerState: bookingManagerReducers,
  reviewState: reviewReducers,
  reviewBManagerState: reviewBManagerReducers,
});

export default reducers;