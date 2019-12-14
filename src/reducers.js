import { combineReducers } from 'redux';
import { reducers as userReducer } from './components/login';
import { reducers as adminReducer } from './components/adminLoginPage';
import { reducers as createElectionReducer } from './components/createElection';
import { reducers as pushElectionReducer } from "./components/viewElection";

// combine all the reducers in the project into one reducer
const allReducers = combineReducers({
    adminAuthenticated: adminReducer.authenticateAdminReducer,
    adminLoading: adminReducer.loginAdminReducer,
    confirmationCode: userReducer.confirmReducer,
    createElectionLoading: createElectionReducer.createUserLoading,
    userAuthenticated: userReducer.authenticateUserReducer,
    userLoading: userReducer.loginLoandingReducer,
    elections:pushElectionReducer.pushElections,
    electionListLoading:pushElectionReducer.loadingElections
});

// export this reducer
export default allReducers;
