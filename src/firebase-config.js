
import firebase from 'firebase';

// Configuracion de firebase
var firebaseConfig = {
    apiKey: "AIzaSyCjm4eTTGjUHMO5HF9_WC7FdOrFyebnWkY",
    authDomain: "proyecto-topicos-fire.firebaseapp.com",
    projectId: "proyecto-topicos-fire",
    storageBucket: "proyecto-topicos-fire.appspot.com",
    messagingSenderId: "312812758642",
    appId: "1:312812758642:web:3dfe986e5b2139147504eb",
    measurementId: "G-VLJC50098K"
};

const fb = firebase.initializeApp(firebaseConfig);

export default fb;
