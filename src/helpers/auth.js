import { ref, firebaseAuth } from '../config/constants'

export function register (email, password) {
	return firebaseAuth().createUserWithEmailAndPassword(email, password)
		.then(saveUser)
}

export function logout () {
	return firebaseAuth().signOut()
}

export function login (email, password) {
	return firebaseAuth().signInWithEmailAndPassword(email, password)
}

export function resetPassword (email) {
	return firebaseAuth().sendPasswordResetEmail(email)
}

export function getPlayers() {
	return ref.child('users')
}

export function saveUser (user) {
	return ref.child(`users/${user.uid}`)
		.set({
			email: user.email,
			uid: user.uid
		})
		.then(() => user)
}
