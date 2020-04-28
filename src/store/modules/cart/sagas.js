import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess } from './reducer';

function* addToCart({ id }) {
  const res = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(res.data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
