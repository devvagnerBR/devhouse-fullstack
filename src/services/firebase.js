//firebase-app
import { initializeApp } from 'firebase/app'
//firebase real-time
import { getDatabase } from 'firebase/database'
//firebase Auth
import { getAuth } from 'firebase/auth'


//MODULAR


const firebaseConfig = {

    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,


};

const app = initializeApp( firebaseConfig );
export const auth = getAuth( app );
export const db = getDatabase( app );
