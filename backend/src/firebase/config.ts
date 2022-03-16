import firebase from 'firebase-admin'
import 'firebase-admin/auth'
import "dotenv/config";



if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
    })
}

export default firebase