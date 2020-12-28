import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCC2gnaz43EjnsKuxMHjjWS-wfFrKq_6wo",
  authDomain: "todolist-f2182.firebaseapp.com",
  databaseURL: "https://todolist-f2182-default-rtdb.firebaseio.com",
  projectId: "todolist-f2182",
  storageBucket: "todolist-f2182.appspot.com",
  messagingSenderId: "802144666291",
  appId: "1:802144666291:web:84ab812e91b33319c526c6"
};

class Fire {
  constructor() {

    firebase.initializeApp(firebaseConfig);
  }

  get firestore() {
    return firebase.firestore();
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
