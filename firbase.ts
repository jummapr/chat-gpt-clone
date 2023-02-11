import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDYE5g1tgsGR7cn487zvz836lGOQMkd62c",
    authDomain: "chat-gpt-aa547.firebaseapp.com",
    projectId: "chat-gpt-aa547",
    storageBucket: "chat-gpt-aa547.appspot.com",
    messagingSenderId: "652597070052",
    appId: "1:652597070052:web:4fa9e501e4913a75ec04f1",
    measurementId: "G-9VYWXGSS88"
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export {db}