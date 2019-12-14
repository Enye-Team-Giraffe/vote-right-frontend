import {
    LOAD_ELECTIONS, PUSH_ELECTIONS,
    LOADING_ELECTION
} from './actionTypes';

const loadElections = () => ({
    type: LOAD_ELECTIONS,
});

const pushElections = electionsArray => ({
    payload: electionsArray,
    type: PUSH_ELECTIONS,
});

const loadingElections = truthyValue => ({
    payload: truthyValue,
    type: LOADING_ELECTION,
});

export default {
    loadElections,
    loadingElections,
    pushElections,
};
