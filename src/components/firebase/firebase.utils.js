import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAvUcPSwYNfN_QWE5GsaxYuvS_f_2p2QQ4",
    authDomain: "crwn-db-5d0ff.firebaseapp.com",
    databaseURL: "https://crwn-db-5d0ff.firebaseio.com",
    projectId: "crwn-db-5d0ff",
    storageBucket: "",
    messagingSenderId: "273327182984",
    appId: "1:273327182984:web:4bb86a7af6884242097b3d"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ promt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;