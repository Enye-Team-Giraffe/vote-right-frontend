import {LOAD_ELECTIONS,PUSH_ELECTIONS,
        LOADING_ELECTION
} from "./actionTypes";

const loadElections = () =>({
    type:LOAD_ELECTIONS
})

const pushElections = (electionsArray) =>({
    type:PUSH_ELECTIONS,
    payload:electionsArray
})

const loadingElections = (truthyValue) =>({
    type:LOADING_ELECTION,
    payload:truthyValue
})

export default {
    loadElections,
    loadingElections,
    pushElections
}