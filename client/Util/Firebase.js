import firebase from 'firebase/app'
import 'firebase/firestore'
import { initFirestorter, Collection } from 'firestorter'

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

firebase.firestore().settings({
  timestampsInSnapshots: true
})

initFirestorter({ firebase: firebase })

export { Collection, firebase }
