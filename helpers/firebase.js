// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWs0mwqxoH9VVQOSOyO4dH07eZUw4OFIM",
  authDomain: "orano-mesure-epaisseur.firebaseapp.com",
  databaseURL: "https://orano-mesure-epaisseur.firebaseio.com",
  projectId: "orano-mesure-epaisseur",
  storageBucket: "orano-mesure-epaisseur.appspot.com",
  messagingSenderId: "1026883795724",
  appId: "1:1026883795724:web:2e40df3792cefab5a76729",
  measurementId: "G-NFJJ8R6NRW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

/**
 * insert document dans collection avec l'id
 * @param {Strine} collection
 * @param {String} id
 * @param {Object} document
 */
export const addDocument = async (collection, id, document) => {
  const col = firestore.collection(collection);
  if (id) {
    const doc = col.doc(id);
    return await doc.set(document, { merge: true });
  }
  return await col.add(document);
};

/**
 * retourne le document avec l'id depuis la collection
 * @param {String} collection
 * @param {String} id
 */
export const getDocument = async (collection, id) => {
  const snapshot = firestore.collection(collection).doc(id);
  const doc = await snapshot.get();
  if (!doc.exists) {
    return {};
  } else {
    return doc.data;
  }
};

/**
 * Retourne tous les documents de la collection
 * @param {String} collection
 * @param {String} filtre - optionnel
 */
export const getDocuments = async (collection, filtre) => {
  const doc = firestore.collection(collection);
  let res;
  if (filtre) {
    res = await doc.where(...filtre).get();
  } else {
    res = await doc.get();
  }
  if (res.empty) return [];
  const map = [];
  res.forEach((r) => map.push({ id: r.id, ...r.data() }));
  return map;
};
