import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

 
const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APPID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
 
class Firebase {
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
		this.db = app.firestore();
	}
	
	get getUser() {
		const user = localStorage.getItem('user')
		return JSON.parse(user)
	}

	setUser = () => {
		const user = JSON.stringify(this.auth.currentUser)
		localStorage.setItem('user', user)
	}

	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) =>
	this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);
	
	doSignOut = () => {
		localStorage.setItem('user', null)
		return this.auth.signOut();
	}
	
	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
	
	doPasswordUpdate = password =>
		this.auth.currentUser.updatePassword(password);

	// **** Firestore API ***
	getCountdownPageData = async (countDownId) => {
		try {
			const doc = await this.db.collection("countdownpagedata").doc(countDownId).get()

			return doc.data() ? doc.data() : null
		} catch (err) {
			return null
		}
	}

	getCountdownPagesData = async () => {
		try {
			const data = await this.db.collection("countdownpagedata")
							.where('isShared', '==', true).get()
			return data.docs
		} catch (err) {
			return null
		}
	}

	getUserCountdownPagesData = async () => {
		const userId = this.getUser.uid

		try {
			const data = await this.db.collection("countdownpagedata")
						.where('user', '==', userId)
						.get()

			return data.docs
		} catch (err) {
			return null
		}
	}
	
	setCountdownPageData = async (countDownId, data) => {
		try {
			await this.db.collection("countdownpagedata").doc(countDownId).set(data)
			return  true
		} catch (error) {
			return false
		}
	}
}
 
export default Firebase;