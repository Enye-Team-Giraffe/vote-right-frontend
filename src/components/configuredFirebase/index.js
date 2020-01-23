// this file contains an already configured instance fo our firebase app
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';
import firebaseConfig from './config';

const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const storage = firebase.storage();
export {
    app, firebase, storage, analytics
};
