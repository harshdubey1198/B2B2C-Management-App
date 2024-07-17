import { all, fork } from "redux-saga/effects";

import LayoutSaga from "./layout/saga";
import accountSaga from "./auth/register/saga";
import ProfileSaga from "./auth/profile/saga";
import authSaga from "./auth/login/saga";
import forgetPasswordSaga from "./auth/forgetpwd/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(accountSaga),
    fork(ProfileSaga),
    fork(authSaga),
    fork(forgetPasswordSaga)
  ]);
}
