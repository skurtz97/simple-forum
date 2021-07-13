import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const db = app.firestore();
export const auth = app.auth();

export const addUser = async (email, name, password, uid) => {
  return db.collection("users").add({
    email: email,
    name: name,
    password,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const addThread = async (username, subject, initialPost) => {
  return db
    .collection("threads")
    .add({
      subject: subject,
      createdBy: username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      docRef.collection("posts").add({
        subject: subject,
        createdBy: username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        content: initialPost,
      });
    });
};

export const addPostToThread = (username, subject, content, threadId) => {
  return db
    .collection("threads")
    .doc(threadId)
    .collection("posts")
    .add({
      subject: subject,
      createdBy: username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      content: content,
    })
    .catch((err) => console.error(err));
};

export const getPostsByThreadId = (threadId) => {
  return db
    .collection("threads")
    .doc(threadId)
    .collection("posts")
    .orderBy("createdAt", "asc")
    .get()
    .then((querySnapshot) => {
      let posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      return posts;
    })
    .catch((err) => console.error(err));
};
export const getThreads = async () => {
  return db.collection("threads").orderBy("createdAt", "desc").get();
};

export const getThreadsAfter = async (doc, lim) => {
  return db
    .collection("threads")
    .limit(lim)
    .orderBy("createdAt", "desc")
    .startAfter(doc);
};

export const getThreadsBefore = async (doc, lim) => {
  return db
    .collection("threads")
    .limitToLast(lim)
    .orderBy("createdAt", "desc")
    .endBefore(doc);
};
