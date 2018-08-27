import * as actionTypes from './new-action-types';
import axios from '../../config/axios';

const fetchNewSuccess = (news) => {
  return {
    type: actionTypes.FETCH_NEWS,
    news: news
  };
};

export const fetchNew = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('news');
      dispatch(fetchNewSuccess(data.data));
      console.log(data.data)
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const addNewSuccess = (newsAdd) => {
  return {
    type: actionTypes.ADD_NEWS,
    newsAdd: newsAdd
  }
}

export const addNew = (newsAdd) => {
  return async dispatch => {
    try {
      const fd = new FormData();
      fd.append('photo', newsAdd.photo);
      fd.append('name', newsAdd.name);
      fd.append('content', newsAdd.content);
      fd.append('status', newsAdd.status);
      fd.append('url', newsAdd.url);
      fd.append('publishDate', newsAdd.publishedDate);

      const { data } = await axios.post('news', fd)
      dispatch(addNewSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const updateNewSuccess = (newsUpdate) => {
  return {
    type: actionTypes.UPDATE_NEWS,
    newsUpdate: newsUpdate
  }
}

export const updateNew = (newsUpdate) => {
  return async dispatch => {
    try {
      let publist_date = newsUpdate.publishedDate._d.toISOString().slice(0,10);
      const fd = new FormData();
      fd.append('id', newsUpdate.id);
      fd.append('photo', newsUpdate.photo);
      fd.append('name', newsUpdate.name);
      fd.append('content', newsUpdate.content);
      fd.append('status', newsUpdate.status);
      fd.append('url', newsUpdate.url);
      fd.append('publishDate', publist_date);

      const { data } = await axios.post('update', fd)
      dispatch(updateNewSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const deleteNewSuccess = () => {
  return {
    type: actionTypes.DELETE_NEWS
  }
}

export const deleteNew = (idNewsDelete) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete('delete/'+idNewsDelete);
      dispatch(deleteNewSuccess(data));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}