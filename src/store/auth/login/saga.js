import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

import {
  postFakeLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(fetchLogin, user);
      history("/dashboard");
      localStorage.setItem("authUser", JSON.stringify(response.data));
      // console.log(response?.data);
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history("/dashboard");
  } catch (error) {
    yield put(apiError("Please check your email and password"));
  }
}

function fetchLogin(user) {
  return fetch(`${process.env.REACT_APP_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password
    }),
  })
    .then(response => response.json())
    .catch(error => { throw error });
}

function* logoutUser() {
  try {
    localStorage.removeItem("authUser");
    yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* socialLogin({ payload: { data, history } }) {
  try {
    const response = yield call(postSocialLogin, data);
    localStorage.setItem("authUser", JSON.stringify(response));
    yield put(loginSuccess(response));
    history("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
