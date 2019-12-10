import { CREATE_ELECTION } from "./actionTypes"

/**
 * Triggers request to send details to an API to create an election
 *
 * @function
 * @return {Object} The {@link actionTypes.CREATE_ELECTION CREATE_ELECTION} action.
 */
const createElection = electionDetails =>({
    type:CREATE_ELECTION,
    payload:electionDetails
})


export default {
    createElection
}