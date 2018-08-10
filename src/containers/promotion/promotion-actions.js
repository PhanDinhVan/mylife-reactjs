import * as actionTypes from './promotion-action-types';
import axios from '../../config/axios';

const fetchPromotionSuccess = (promotions) => {
    return {
        type: actionTypes.FETCH_PROMOTION,
        promotions: promotions
    };
};

export const fetchPromotion = () => {
  return async dispatch => {
      try {
        const { data } = await axios.get('promotion');
        dispatch(fetchPromotionSuccess(data.data));
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
  };
};