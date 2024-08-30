import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postFakeLogin, postJwtLogin, postSocialLogin } from "../../../helpers/fakebackend_helper";
import axios from "axios";
import { toast } from 'react-toastify';

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      response = yield call(fireBaseBackend.loginUser, user.email, user.password);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = yield call(axios.post, `${process.env.REACT_APP_URL}/auth/login`, {
        email: user.email,
        password: user.password,
        role: user.role
      });
      localStorage.setItem("authUser", JSON.stringify(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password
      });
      localStorage.setItem("authUser", JSON.stringify(response));
    }
    yield put(loginSuccess(response));
    history.push("/dashboard");
  } catch (error) {
    yield put(apiError(error.message));
    toast.error("Login failed! Please check your credentials.");
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      yield call(fireBaseBackend.logout);
    }
    yield put(logoutUserSuccess());
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend_ = getFirebaseBackend();
      const response = yield call(fireBaseBackend_.socialLoginUser, data, type);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
      history.push("/dashboard");
    } else {
      const response = yield call(postSocialLogin, data);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
      history.push("/dashboard");
    }
  } catch (error) {
    yield put(apiError(error));
    toast.error("Social login failed!");
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(SOCIAL_LOGIN, socialLogin);
}

export default authSaga;
