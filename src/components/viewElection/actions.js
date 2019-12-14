import { LOAD_ELECTIONS,PUSH_ELECTIONS } from "./actionTypes";

const loadElections = () =>({
    type:LOAD_ELECTIONS
})

const pushElections = (electionsArray) =>({
    type:PUSH_ELECTIONS,
    payload:electionsArray
})

export default {
    loadElections,
    pushElections
}