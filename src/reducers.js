import { combineReducers } from 'redux';
import { reducers as userReducer } from './components/login';
import { reducers as adminReducer } from './components/adminLoginPage';
import { reducers as createElectionReducer } from './components/createElection';
import { reducers as pushElectionReducer } from './components/viewElection';
import { reducers as pushVoterReducer } from './components/viewStats';
import { reducers as addCandidateReducer } from './components/addCandidate';
import { reducers as votingReducer } from './components/userViewCandidates';

// combine all the reducers in the project into one reducer
const allReducers = combineReducers({
    addCandidateLoading: addCandidateReducer.addCandidateLoading,
    adminAuthenticated: adminReducer.authenticateAdminReducer,
    adminLoading: adminReducer.loginAdminReducer,
    candidates: pushVoterReducer.pushCandidates,
    candidatesLoading: pushVoterReducer.loadingCandidates,
    confirmationCode: userReducer.confirmReducer,
    createElectionLoading: createElectionReducer.createUserLoading,
    electionListLoading: pushElectionReducer.loadingElections,
    elections: pushElectionReducer.pushElections,
    statistics: pushElectionReducer.pushStatistics,
    user: userReducer.pushPhoneNumberReducer,
    userAuthenticated: userReducer.authenticateUserReducer,
    userDetails: userReducer.pushUserDetails,
    userLoading: userReducer.loginLoandingReducer,
    voters: pushVoterReducer.pushVoters,
    votersListLoading: pushVoterReducer.loadingVoters,
    votingLoading: votingReducer.loadingVotingReducer,
});

// export this reducer
export default allReducers;
