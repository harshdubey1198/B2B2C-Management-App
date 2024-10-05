import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess ,setAuthError } from "./actions";
import { postFakeLogin, postSocialLogin } from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* loginUser({ payload: { user, history } }) {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = yield call(fetchLogin, user);
      history("/dashboard");
      localStorage.setItem("authUser", JSON.stringify(response.data));
      yield put(loginSuccess(response));
      toast.success(response.message);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history("/dashboard");
  } catch (error) {
    const errorMessage = error?.message || error?.error || "Login failed";
    console.log("Error message:", errorMessage);
    yield put(setAuthError(errorMessage)); 
    toast.error(errorMessage);
  }
}

function fetchLogin(user) {
  return fetch(`${process.env.REACT_APP_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.error || "Login failed");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}

function* logoutUser() {
  try {
    localStorage.removeItem("authUser");
    yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    console.log("Logout error:", error?.message || error?.error); // Log the error message
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
    console.log("Social login error:", error?.message || error?.error); // Log the error message
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
