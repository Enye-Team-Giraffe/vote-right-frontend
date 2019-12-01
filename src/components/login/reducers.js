import { LOGIN_USER } from './actionTypes';

const defaultPassword = '';
const passwordReducer = (state = defaultPassword, action) => {
    switch (action.type) {
    case LOGIN_USER:
        return action.payload;
    default:
        return state;
    }
};
// export this value
export default passwordReducer;
