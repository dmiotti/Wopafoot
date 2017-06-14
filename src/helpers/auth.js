import { ref, firebaseAuth } from '../config/constants'
import firebase from 'firebase'

export function register (name, email, password) {
	return firebaseAuth().createUserWithEmailAndPassword(email, password)
		.then((user) => saveUser({...user, name: name}))
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

export function createGame (teamA, teamB) {
	const owner = firebaseAuth().currentUser
	return getUserInfo(owner).once('value', (snapshot) => {
		const owner = snapshot.val()
		const gameRef = ref.child('games').push()
		const normTeam = (team) => ({
			score: 0,
			players: team.reduce((acc, p) => ({...acc, [p.uid]: {name: p.name, score: 0}}), {})
		})

		let updates = {}
		updates[`games/${gameRef.key}`] = {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			owner: { uid: owner.uid, name: owner.name },
			status: 'playing',
			uid: gameRef.key,
			teamA: normTeam(teamA),
			teamB: normTeam(teamB)
		}
		return ref.update(updates)
	})
}

export function resetPassword (email) {
	return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
	return ref.child(`users/${user.uid}`)
		.set({ uid: user.uid, email: user.email, name: user.name})
		.then(() => user)
}
