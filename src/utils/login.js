import firebase from "../config/firebase";

export const userValidation = (email, password) => {
  return new Promise(resolve => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        resolve(error.message);
      })
      .then(res => {
        if (typeof res === "undefined") {
          resolve("Usuario no existe");
        } else {
          resolve({ email, id: res.user.uid });
        }
      });
  });
};

export const createUser = (email, password) => {
  return new Promise(resolve => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        resolve(error.message);
      })
      .then(res => {
        if (typeof res === "undefined") {
          resolve("Usuario no existe");
        } else {
          resolve({ email, id: res.user.uid });
        }
      });
  });
};

export const facebookUserValidation = () => {
  return new Promise(resolve => {
    var provider = new firebase.auth.FacebookAuthProvider();

    provider.addScope("user_birthday");

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(authData) {
        console.log(authData);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};
