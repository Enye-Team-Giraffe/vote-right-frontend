import { PUSH_ELECTIONS } from "./actionTypes"
const pushElections = (state =[],action)=>{
    switch(action.type){
        case PUSH_ELECTIONS:
            return [...action.payload]
        default:
            return state
    }
}
export default {pushElections}