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
		this.timeStamp = app.firestore.FieldValue.serverTimestamp
	}
	
	get getUser() {
		const user = localStorage.getItem('user')
		return JSON.parse(user)
	}

	setUser = () => {
		const user = JSON.stringify(this.auth.currentUser)
		localStorage.setItem('user', user)
	}

	get countDownPagesQuerry() {
		return this.db.collection("countdownpagedata")
		.where('isShared', '==', true)
		.orderBy('id', 'desc')
	}


	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) =>
	this.auth.createUserWithEmailAndPassword(email, password)
	.then(() => this.auth.currentUser.sendEmailVerification());

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);
	
	doPasswordReset = (email) => 
		this.auth.sendPasswordResetEmail(email)

	doSignOut = () => {
		localStorage.setItem('user', null)
		return this.auth.signOut();
	}
	
	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
	
	doPasswordUpdate = password =>
		this.auth.currentUser.updatePassword(password);

	// **** Firestore API ***
	// get one countdown page
	getCountdownPageData = async (countDownId) => {
		try {
			const doc = await this.db.collection("countdownpagedata").doc(countDownId).get()

			return doc.data() ? doc.data() : null
		} catch (err) {
			return null
		}
	}

	// get 15 initial documents under countdownpagedata
	getCountdownPagesData = async () => {
		try {
			const data = await this.countDownPagesQuerry
			.limit(15)
			.get()
			return data.docs
		} catch (err) {
			return null
		}
	}

	// get rest of documents under countdownpagedata
	getMoreCountdownPagesData = async (latestCountDownPageId) => {
		try {
			const data = await this.countDownPagesQuerry
								.startAt(latestCountDownPageId)
								.limit(15)
								.get()
			return data.docs
		} catch (err) {
			return null
		}
	}

	//query use created countdown page
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
	
	// write pagedata
	setCountdownPageData = async (countDownId, data) => {
		try {
			await this.db.collection("countdownpagedata").doc(countDownId).set(data)
			return  true
		} catch (error) {
			return false
		}
	}

	// post feedback
	sendFeedbackData = async (feedback, id) => {
		const user = this.getUser

		const data = {
			feedback,
			user: user ? user.uid : 'anonymous'
		}
		try {
			await this.db.collection("feedback").doc(id).set(data)
			return  true
		} catch (error) {
			return false
		}
	}
}
 
export default Firebase;