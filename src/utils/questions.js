import firebase from "../config/firebase";

export const createQuestion = (autor, evento, pregunta) => {
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("Pregunta")
      .add({
        Autor: autor,
        Evento: evento,
        Pregunta: pregunta,
        Puntaje: 0,
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

export const deleteQuestion = id => {
  console.log(id);
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("Pregunta")
      .doc(id)
      .update({ Active: false });
    resolve();
  });
};

export const upvoteQuestion = (id, puntaje) => {
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("Pregunta")
      .doc(id)
      .update({ Puntaje: puntaje });
    resolve();
  });
};

export const editQuestion = (id, pregunta) => {
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("Pregunta")
      .doc(id)
      .update({ Pregunta: pregunta, Puntaje: 0 });
    resolve();
  });
};

export const getQuestionsByEvent = event => {
  let questions = [];
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("Pregunta")
      .where("Evento", "==", event)
      .where("Active", "==", true)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
        }

        snapshot.forEach(doc => {
          questions.push({ ...doc.data(), id: doc.id });
        });
        resolve(questions);
      })
      .catch(error => {
        resolve("Error getting documents: ", error);
      });
  });
};
