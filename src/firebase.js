import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyC0QcGgPhNlZ3-9CDsUCKM8Lcep7tjFtoY",
  authDomain: "aji-de-fideo.firebaseapp.com",
  databaseURL: "https://aji-de-fideo.firebaseio.com",
  projectId: "aji-de-fideo",
  storageBucket: "aji-de-fideo.appspot.com",
  messagingSenderId: "37028574794",
  appId: "1:37028574794:web:520f728507bee258ac58b3"
};
firebase.initializeApp(firebaseConfig);
export default firebase;