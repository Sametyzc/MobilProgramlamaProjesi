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

  addPost = async ({ text, localUri, userName, email, scheduleName, material }) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);
    return new Promise((res, rej) => {
      firebase
        .database()
        .ref('/posts')
        .push({
          text: text.trim(),
          image: remoteUri,
          uid: this.uid,
          timestamp: this.timestamp,
          user: userName,
          email: email,
          scheduleName: scheduleName,
          material: material,
          //like: 0,
          id: Math.floor(Math.random() * 100000000000),
        })
        .then(ref => {
          res(ref);
        })
        .catch(err => {
          rej(err);
        });
    });
  };
  addPostNoImage = async ({ text, userName, email, scheduleName, material }) => {
    return new Promise((res, rej) => {
      firebase
        .database()
        .ref('/posts')
        .push({
          text: text.trim(),
          uid: this.uid,
          timestamp: this.timestamp,
          user: userName,
          email: email,
          scheduleName: scheduleName,
          material: material,
          //like: 0,
          id: Math.floor(Math.random() * 100000000000),
        })
        .then(ref => {
          res(ref);
        })
        .catch(err => {
          rej(err);
        });
    });
  };

  uploadPhotoAsync = async uri => {
    const path = `photos/${this.uid}/${Date.now()}.jpg`;
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(path)
        .put(file);

      upload.on(
        'state_changed',
        snapshot => { },
        err => {
          rej(err);
        },
        async () => {
          // eslint-disable-next-line no-shadow
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        },
      );
    });
  };

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
