import * as actionTypes from './review-action-types';
import axios from '../../config/axios';

const fetchReviewSuccess = (reviews) => {
    return {
        type: actionTypes.FETCH_REVIEWS,
        reviews: reviews
    };
};

export const fetchReviews = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('review');
            console.log(data)
            dispatch(fetchReviewSuccess(data.reviews));
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

const deleteReviewSuccess = () => {
  return {
    type: actionTypes.DELETE_REVIEWS
  }
}

export const deleteReview = (idDelete) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete('review/delete/'+idDelete);
      dispatch(deleteReviewSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

