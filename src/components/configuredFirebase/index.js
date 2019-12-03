// this file contains an already configured instance fo our firebase app
import firebase from 'firebase/app';
import firebaseConfig from './config';
import 'firebase/auth';

const app = firebase.initializeApp(firebaseConfig);

export { app, firebase };
