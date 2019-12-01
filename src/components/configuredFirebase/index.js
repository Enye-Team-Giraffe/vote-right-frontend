// this file contains an already configured instance fo our firebase app
import firebase from 'firebase';
import firebaseConfig from './config';

const app = firebase.initializeApp(firebaseConfig);

export { app, firebase };
