import * as actionTypes from './review-bmanager-action-types';
import axios from '../../config/axios';

const fetchReviewBManagerSuccess = (reviewBManager) => {
    return {
        type: actionTypes.FETCH_REVIEW_BMANAGERS,
        reviewBManager: reviewBManager
    };
};

export const fetchReviewBManager = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('review_bmanager');
            dispatch(fetchReviewBManagerSuccess(data.review_bmanagers));
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

const addReviewManagerSuccess = (reviewBManager) => {
  return {
    type: actionTypes.ADD_REVIEW_BMANAGERS,
    reviewBManager: reviewBManager
  }
}

export const addReviewManager = (reviewBManager) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('review_bmanager', reviewBManager);
      dispatch(addReviewManagerSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const updateStatusSuccess = (updateReview) => {
  return {
    type: actionTypes.UPDATE_REVIEW_BMANAGERS,
    updateReview: updateReview
  }
}

export const updateReviewManager = (updateReview) => {
  let id = updateReview.id;
  return async dispatch => {
    try {
      const { data } = await axios.patch('review_bmanager/'+id, updateReview);
      if(data === "exits") {
        let err = data;
        return Promise.reject(err);
      }
      dispatch(updateStatusSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const deleteReviewManagerSuccess = () => {
  return {
    type: actionTypes.DELETE_REVIEW_BMANAGERS
  }
}

export const deleteReviewManager = (idDelete) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete('review_bmanager/delete/'+idDelete);
      dispatch(deleteReviewManagerSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

