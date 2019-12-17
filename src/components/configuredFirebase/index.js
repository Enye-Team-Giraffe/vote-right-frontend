// this file contains an already configured instance fo our firebase app
import firebase from 'firebase/app';
import firebaseConfig from './config';
import 'firebase/auth';
import 'firebase/storage';

const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { app, firebase, storage };
