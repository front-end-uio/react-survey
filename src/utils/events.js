import firebase from "../config/firebase";

export const createEvent = (hashtag, user) => {
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("Eventos")
      .add({
        Hashtag: hashtag,
        User: user,
        Active: true
      })
      .then(docRef => {
        resolve();
      })
      .catch(error => {
        resolve("Error: ", error);
      });
  });
};

export const getEventsByUser = user => {
  let events = [];
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("Eventos")
      .where("User", "==", user)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
        }

        snapshot.forEach(doc => {
          events.push({ ...doc.data(), id: doc.id });
        });
        resolve(events);
      })
      .catch(error => {
        resolve("Error getting documents: ", error);
      });
  });
};

export const deleteEvent = id => {
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("Eventos")
      .doc(id)
      .update({ Active: false });
    resolve();
  });
};

export const getEventByHashtag = hashtag => {
  let event = null;
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("Eventos")
      .where("Hashtag", "==", hashtag)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
        }

        snapshot.forEach(doc => {
          event = { ...doc.data(), id: doc.id };
        });
        console.log(event);
        resolve(event);
      })
      .catch(error => {
        resolve("Error getting documents: ", error);
      });
  });
};
