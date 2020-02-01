const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '1234',
    appId: process.env.REACT_APP_FIREBASE_APP_ID || '1234',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '1234',
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || '1234',
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || '1234',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '1234',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '1234',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '1234',
};

export default firebaseConfig;
