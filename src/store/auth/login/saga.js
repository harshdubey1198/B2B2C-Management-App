import { call, put, takeEvery, takeLatest,delay } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess ,setAuthError } from "./actions";
import { postFakeLogin, postSocialLogin } from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* loginUser({ payload: { user, history } }) {
  localStorage.setItem("planemail", user.email);

  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = yield call(fetchLogin, user);
      localStorage.setItem("authUser", JSON.stringify(response.data));
      yield put(loginSuccess(response));
      toast.success(response.message);
      history("/dashboard");
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
      history("/dashboard");
    }
  } catch (error) {
    // console.log("Error Response:", error.error.message.message);
    // console.log("Error Response:", error.error.message.redirectTo);

    const errorMessage = error?.message || error?.error?.message || error?.error?.message?.message || "Login failed";
    const redirectTo = error?.error?.message?.redirectTo;
    yield put(setAuthError(errorMessage));
    toast.error(errorMessage);
    toast.error(error.error.message.message);
    if (redirectTo) {
      yield delay(3000);
      history(redirectTo);
    }   
  }
}


function fetchLogin(user) {
  let apiUrl = `${process.env.REACT_APP_URL}/auth/login`;
  const currentPath = window.location.pathname;
  // console.log("Current path:", currentPath);

  if (currentPath === "/crm/login") {
    apiUrl = `${process.env.REACT_APP_URL}/crmuser/login-crmsuser`;
  } else if (currentPath === "/admin/login") {
    apiUrl = `${process.env.REACT_APP_URL}/auth/admin/login`;
  }

  return fetch(apiUrl, {
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
        return response.json().then((data) => {
          throw { error: { message: data.error, redirectTo: data.data?.redirectTo } };

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
