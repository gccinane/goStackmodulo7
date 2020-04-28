import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  if (productExists) {
    const amount = productExists.amount + 1;
    yield put(updateAmount(id, amount));
  } else {
    const res = yield call(api.get, `/products/${id}`);
    const data = {
      ...res.data,
      amount: 1,
      priceFormatted: formatPrice(res.data.price),
    };
    yield put(addToCartSuccess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
