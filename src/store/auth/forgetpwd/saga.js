import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from '../../../helpers/firebase_helper';

import {
  postFakeForgetPwd,
} from "../../../helpers/fakebackend_helper"
import axios from "axios";
import { toast } from "react-toastify";


const fireBaseBackend = getFirebaseBackend()

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.forgetPassword, user.email)
      if (response.status === 200) {
        yield put(userForgetPasswordSuccess("Reset link has been sent to your email."));
      } else {
        yield put(userForgetPasswordError("Failed to send reset link. Please try again."));
      }
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(axios.post, `${process.env.REACT_APP_URL}/auth/forget-password`,{
        email: user.email,
      })
      if (response) {
        toast.success("Password reset link has been sent to your email.")
        yield put(
          userForgetPasswordSuccess(
            "Password reset link has been sent to your email.")
         
          )
        }
    } else {
      const response = yield call(postFakeForgetPwd, "/fake-forget-pwd", {
        email: user.email,
      })
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            "Password reset link has been sent to your email."
          )
        )
      }
    }
  } catch (error) {
    toast.error("Check your email")
    yield put(userForgetPasswordError(error))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga;
