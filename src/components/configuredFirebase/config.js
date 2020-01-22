const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};
// because the script breaks during testing as the environmental variables are not yet set
// thus this section only takes place during testing and a dummy value is assigned.
if (firebaseConfig['measurementId'] === undefined){
    firebaseConfig['measurementId']="1234"
}

export default firebaseConfig;
