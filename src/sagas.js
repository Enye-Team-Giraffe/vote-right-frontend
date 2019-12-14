import { all } from 'redux-saga/effects';
import { sagas as userLoginSaga } from './components/login';
import { sagas as adminLoginSaga } from './components/adminLoginPage';
import { sagas as createElectionSaga } from './components/createElection';
import { sagas as dashboardSaga } from './components/dashboard';
import { sagas as viewElectionSaga } from './components/viewElection';
import { sagas as loadVotersSaga } from "./components/viewStats"

// export all of our sagas
export default function* rootSaga() {
    yield all([
        userLoginSaga(), // the saga for login users
        adminLoginSaga(), // the saga for admin login
        createElectionSaga(), // the saga for creating elections
        dashboardSaga(), // saga to logout
        viewElectionSaga(), // the saga which helps to load data about the elections from the server
        loadVotersSaga(), //saga for loading voters from API
    ]);
}
