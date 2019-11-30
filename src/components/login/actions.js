import {LOGIN_USER} from "./actionTypes";
import {AUTHENTICATE_USER} from "./actionTypes"

/**
 * Triggers request to authenticate user and log them in using firebase
 *
 * @function
 * @return {Object} The {@link actionTypes.LOGIN_USER LOGIN_USER} action.
 */
const loginUser=password=>{
    // convert the password to string for easy slicing and nomenclature
    let string_password=String(password);
    let string_password_with_countrycode=`+234${string_password}`;

    // return the actiontype and the password which has been appended with country code
    return{
        payload:string_password_with_countrycode,
        type:LOGIN_USER
    }

}


/**
 * Triggers request to NIN API and confirm that user is indeed a citizen
 *
 * @function
 * @return {Object} The {@link actionTypes.AUTHENTICATE_USER AUTHENTICATE_USER} action.
 */
const authenticateUser=payload=>{
    // convert the password to string for easy slicing and nomenclature
    let string_password=String(payload.phoneNumber);
    payload.password=`+234${string_password}`;

    // return the actiontype and the password which has been appended with country code
    return{
        payload:payload,
        type:AUTHENTICATE_USER
    }

}

// export the loginUser and authenticateUser as an object.
export default {loginUser,authenticateUser}