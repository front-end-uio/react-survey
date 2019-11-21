import firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyA3Y2UVOB3dYui3afdMucE89pEMdIR6_qI",
  authDomain: "slido-829f1.firebaseapp.com",
  databaseURL: "https://slido-829f1.firebaseio.com",
  projectId: "slido-829f1",
  storageBucket: "slido-829f1.appspot.com",
  messagingSenderId: "458481185230",
  appId: "1:458481185230:web:a8d4a535b25d5db1947b9f"
};

firebaseApp.initializeApp(config);

export default firebaseApp;
