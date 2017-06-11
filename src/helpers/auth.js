import { ref, firebaseAuth } from '../config/constants'

export function register (nickname, email, password) {
	return firebaseAuth().createUserWithEmailAndPassword(email, password)
		.then((user) => {
			user.nickname = nickname
			saveUser(user)
		})
}

export function logout () {
	return firebaseAuth().signOut()
}

export function login (email, password) {
	return firebaseAuth().signInWithEmailAndPassword(email, password)
}

export function getUserInfo (user) {
	return ref.child(`users/${user.uid}`)
}

export function resetPassword (email) {
	return firebaseAuth().sendPasswordResetEmail(email)
}

export function getPlayers () {
	return ref.child('users')
}

export function createGame(aTeam, bTeam) { }

export function saveUser (user) {
	return ref.child(`users/${user.uid}`)
		.set({
			email: user.email,
			uid: user.uid,
			nickname: user.nickname
		})
		.then(() => user)
}
