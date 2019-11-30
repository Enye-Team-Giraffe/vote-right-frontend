import {combineReducers} from "redux";
import {reducers as passwordReducer} from "./components/login";

// combine all the reducers in the project into one reducer
const allReducers=combineReducers({
    password:passwordReducer
})

// export this reducer
export default allReducers