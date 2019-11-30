import { all } from 'redux-saga/effects';
import {sagas as loginSaga} from "./components/login"

// export all of our sagas
export default function* rootSaga(){
    yield all([
        loginSaga()//the saga for login users
    ])
}