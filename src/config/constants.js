import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyD-fLr00jQBO9iUx7SYOEKfMxq3-d2zzxo',
  authDomain: 'wopafoot-staging.firebaseapp.com',
  databaseURL: 'https://wopafoot-staging.firebaseio.com',
}

// const config = {
//   apiKey: 'AIzaSyC1H6htvMyLm0xBTGFBHaqgwAnohhclFaI',
//   authDomain: 'wopafoot.firebaseapp.com',
//   databaseURL: 'https://wopafoot.firebaseio.com',
// }

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
