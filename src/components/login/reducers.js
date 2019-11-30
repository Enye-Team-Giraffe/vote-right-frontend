import {LOGIN_USER} from "./actionTypes";

// define the default state of the password

const defaultPassword="";

// make the current state of password be the payload
const passwordReducer=(state=defaultPassword,action)=>{
    console.log(action)
    switch(action.type){
        case LOGIN_USER:
            return action.payload
        default:
            return state
    }

    
}

// export this value
export default passwordReducer