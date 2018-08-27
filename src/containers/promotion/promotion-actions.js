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

const addPromotionSuccess = (promotionAdd) => {
  return {
    type: actionTypes.ADD_PROMOTION,
    promotionAdd: promotionAdd
  }
}

export const addPromotion = (promotionAdd) => {
  return async dispatch => {
    try {
      const fd = new FormData();
      fd.append('photo', promotionAdd.photo);
      fd.append('name', promotionAdd.name);
      fd.append('startDate', promotionAdd.startDate);
      fd.append('endDate', promotionAdd.endDate);
      fd.append('status', promotionAdd.status);
      fd.append('url', promotionAdd.url);
      // console.log("formdata----"+fd)
      const { data } = await axios.post('promotion', fd)
      dispatch(addPromotionSuccess(data));
      console.log(data)
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}