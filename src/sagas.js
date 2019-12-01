import { all } from 'redux-saga/effects';
import { sagas as userLoginSaga } from './components/login';
import { sagas as adminLoginSaga } from './components/adminLoginPage';

// export all of our sagas
export default function* rootSaga() {
    yield all([
        userLoginSaga(), // the saga for login users
        adminLoginSaga(), // the saga for admin login
    ]);
}
